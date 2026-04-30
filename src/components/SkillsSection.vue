<template>
  <section id="skills" class="relative py-24 overflow-hidden">
    <div
      class="absolute bottom-0 left-0 w-96 h-96 opacity-5 blur-3xl pointer-events-none"
      style="background: radial-gradient(circle, #00f5d4, transparent 70%)"
    />

    <div class="max-w-6xl mx-auto px-6">
      <div class="mb-16" ref="headerRef">
        <p class="section-label mb-3">Capabilities</p>
        <h2 class="section-title">
          Skills & <span class="gradient-text-reverse">Expertise</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-3">
          <p
            class="font-mono text-xs text-neon-teal/60 tracking-widest uppercase mb-6"
          >
            Technical Proficiency
          </p>

          <div class="flex flex-col gap-5">
            <div
              v-for="(skill, i) in skills.technical"
              :key="skill.name"
              class="group"
              :ref="
                (el) => {
                  if (el) skillRefs[i] = el as HTMLElement;
                }
              "
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <i :class="[skill.icon, 'text-xs text-neon-magenta/60']" />
                  <span
                    class="font-mono text-sm text-white/80"
                    :class="skill.small && '!text-[9px]'"
                    >{{ skill.name }}</span
                  >
                  <span
                    class="tech-tag"
                    style="font-size: 0.55rem; padding: 0.1rem 0.4rem"
                    >{{ skill.category }}</span
                  >
                </div>
                <span class="font-mono text-xs text-neon-teal"
                  >{{ skill.level }}%</span
                >
              </div>

              <div class="skill-bar">
                <div
                  class="skill-fill"
                  :style="{
                    width: revealed.has('skill-' + i)
                      ? skill.level + '%'
                      : '0%',
                  }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 flex flex-col gap-6">
          <div class="nexus-card rounded-sm p-5 relative overflow-hidden">
            <div class="corner-tl" />
            <div class="corner-br" />
            <p
              class="font-mono text-xs text-neon-magenta/60 tracking-widest uppercase mb-4"
            >
              Soft Skills
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="s in skills.soft"
                :key="s"
                class="tech-tag tag-magenta"
                ><i :class="s.icon"></i> <span>{{ s.text }}</span></span
              >
            </div>
          </div>

          <div class="nexus-card rounded-sm p-5 relative overflow-hidden">
            <div class="corner-tl" />
            <div class="corner-br" />
            <p
              class="font-mono text-xs text-neon-teal/60 tracking-widest uppercase mb-4"
            >
              Course | Education
            </p>

            <div class="flex flex-col gap-3">
              <a
                v-for="cert in skills.certifications"
                :key="cert.name"
                :href="cert.url"
                target="_blank"
                class="flex items-start gap-3 group"
              >
                <div
                  class="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-sm bg-neon-teal/5 border border-neon-teal/15 group-hover:border-neon-teal/40 transition-colors"
                >
                  <i
                    :class="[
                      'fa-solid',
                      cert.icon,
                      'text-xs text-neon-teal/60 group-hover:text-neon-teal transition-colors',
                    ]"
                  />
                </div>
                <div>
                  <p
                    class="text-white/80 text-xs font-medium group-hover:text-neon-teal transition-colors leading-tight"
                  >
                    {{ cert.name }}
                  </p>
                  <p class="text-white/30 text-xs mt-0.5 font-mono">
                    {{ cert.issuer }} · {{ cert.year }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Skills } from "../types";
import skillsData from "../mock/skills.json";

const skills = skillsData as Skills;

const headerRef = ref<HTMLElement | null>(null);
const skillRefs = ref<HTMLElement[]>([]);
const revealed = ref<Set<string>>(new Set());

onMounted(() => {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const i = parseInt((e.target as HTMLElement).dataset.idx ?? "0");
          setTimeout(() => {
            revealed.value = new Set([...revealed.value, "skill-" + i]);
          }, i * 80);
        }
      });
    },
    { threshold: 0.3 },
  );

  if (headerRef.value) {
    headerRef.value.style.opacity = "0";
    headerRef.value.style.transform = "translateY(20px)";
    headerRef.value.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeObserver.observe(headerRef.value);
  }

  skillRefs.value.filter(Boolean).forEach((el, i) => {
    el.dataset.idx = String(i);
    skillObserver.observe(el);
  });
});
</script>
