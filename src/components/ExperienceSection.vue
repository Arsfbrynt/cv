<template>
  <section id="experience" class="relative py-24 overflow-hidden">
    <div
      class="absolute top-0 right-0 w-96 h-96 opacity-5 blur-3xl pointer-events-none"
      style="background: radial-gradient(circle, #ff00aa, transparent 70%)"
    />

    <div class="max-w-6xl mx-auto px-6">
      <div class="mb-16" ref="headerRef">
        <p class="section-label mb-3">Work & Projects</p>
        <h2 class="section-title">
          Experience <span class="neon-text-magenta">&</span> <br /><span
            class="gradient-text"
            >What I've Built</span
          >
        </h2>
        <p class="text-dark-300/40 mt-4 max-w-lg font-body text-sm">
          A timeline of my professional journey — each role includes the
          projects built during that time.
        </p>
      </div>

      <div class="relative">
        <div
          class="hidden md:block absolute left-[200px] top-0 bottom-0 w-px"
          style="
            background: linear-gradient(
              to bottom,
              #ff00aa33,
              #00f5d433,
              transparent
            );
          "
        />

        <div class="flex flex-col gap-16">
          <div
            v-for="(exp, i) in experience"
            :key="exp.id"
            :ref="
              (el) => {
                if (el) expRefs[i] = el as HTMLElement;
              }
            "
          >
            <div class="flex flex-col md:flex-row gap-6 md:gap-0">
              <!-- Left column -->
              <div
                class="md:w-[200px] md:pr-10 flex md:flex-col gap-4 md:gap-2 items-start md:items-end md:text-right flex-shrink-0 items-center"
              >
                <div
                  v-if="exp.startDate !== '-'"
                  class="flex items-center gap-3 md:gap-0 md:flex-col md:items-end"
                >
                  <div
                    class="md:hidden timeline-dot"
                    :class="{ active: !exp.endDate }"
                  />
                  <p class="font-mono text-xs text-dark-300/40 md:hidden">
                    {{ formatDate(exp.startDate) }} —
                    {{ exp.endDate ? formatDate(exp.endDate) : "Present" }}
                  </p>
                </div>

                <!-- Company logo -->

                <div class="hidden md:flex justify-end">
                  <div class="relative">
                    <div
                      class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div
                        class="absolute w-32 h-32 rounded-full blur-2xl bg-[#ff00aa]/50"
                      ></div>
                      <div
                        class="absolute w-40 h-40 rounded-full blur-3xl bg-[#00ffe0]/30"
                      ></div>
                    </div>
                    <div
                      class="relative flex items-center justify-center overflow-hidden"
                    >
                      <img
                        v-if="exp.image"
                        :src="exp.image"
                        :alt="exp.company"
                        loading="lazy"
                        decoding="async"
                        class="w-full h-full object-cover"
                        @error="
                          (e) => {
                            (e.target as HTMLImageElement).remove();
                          }
                        "
                      />
                      <i
                        v-else
                        class="fa-solid fa-building text-dark-300/40 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right column -->
              <div class="md:pl-10 flex-1 min-w-0">
                <div
                  class="nexus-card rounded-sm p-5 mb-5 relative overflow-hidden group"
                >
                  <div class="corner-tl" />
                  <div class="corner-br" />

                  <div class="flex items-start gap-4">
                    <div
                      class="md:hidden absolute w-30 h-30 max-w-[6em] max-h-[6em] opacity-30 rounded-lg right-2 top-2"
                    >
                      <img
                        v-if="exp.image"
                        :src="exp.image"
                        :alt="exp.company"
                        loading="lazy"
                        decoding="async"
                        class="w-full h-full object-cover"
                        @error="
                          (e) => {
                            (e.target as HTMLImageElement).remove();
                          }
                        "
                      />
                      <i
                        v-else
                        class="fa-solid fa-building text-dark-300/40 text-xs"
                      />
                    </div>

                    <div class="flex-1 min-w-0">
                      <div class="flex flex-wrap items-center gap-2 mb-1">
                        <h3
                          class="font-display font-bold text-lg text-dark-300/50"
                        >
                          {{ exp.role }}
                        </h3>
                        <span
                          class="hidden md:flex tech-tag tag-magenta capitalize"
                          style="font-size: 0.6rem"
                        >
                          {{ exp.type }}
                        </span>
                        <span
                          v-if="!exp.endDate"
                          class="tech-tag"
                          style="font-size: 0.6rem; color: #00f5d4"
                          >● Active</span
                        >
                      </div>
                      <div class="flex items-center gap-2 mb-3">
                        <span class="font-mono text-xs text-neon-magenta">{{
                          exp.company
                        }}</span>

                        <span class="text-dark-300/40">·</span>
                        <span
                          v-if="exp.startDate !== '-'"
                          class="hidden md:block font-mono text-xs text-dark-300/40"
                        >
                          {{ formatDate(exp.startDate) }} —
                          {{
                            exp.endDate ? formatDate(exp.endDate) : "Present"
                          }}
                        </span>
                      </div>
                      <p class="text-dark-300/50 text-sm leading-relaxed">
                        {{ exp.description }}
                      </p>
                      <div
                        class="mt-4 space-y-3 transition-all duration-300 ease-in-out"
                      >
                        <div
                          v-for="group in getVisibleTech(
                            exp.id,
                            exp.technologies,
                          )"
                          :key="group.title"
                        >
                          <p
                            class="text-[10px] text-neon-magenta/80 font-mono mb-1 uppercase tracking-wider"
                          >
                            {{ group.title }}
                          </p>
                          <div class="flex flex-wrap gap-1.5">
                            <span
                              v-for="tech in group.items"
                              :key="tech"
                              class="tech-tag"
                              style="font-size: 0.6rem"
                            >
                              {{ tech }}
                            </span>
                          </div>
                        </div>

                        <button
                          v-if="exp.technologies.length > 1"
                          @click="toggleTech(exp.id)"
                          class="mt-2 text-[10px] font-mono text-neon-teal hover:text-dark-400 transition"
                        >
                          {{
                            expandedTech[exp.id] ? "- Minimize" : "+ Show More"
                          }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Projects carousel -->
                <div v-if="exp.projects?.length" class="ml-0 md:ml-4">
                  <p
                    class="section-label mb-4"
                    style="font-size: 0.65rem; color: rgba(0, 245, 212, 0.6)"
                  >
                    Projects during this role
                  </p>

                  <div
                    class="relative w-full"
                    @mouseenter="hoveredCarousel[exp.id] = true"
                    @mouseleave="hoveredCarousel[exp.id] = false"
                  >
                    <!-- Carousel track -->
                    <div
                      class="flex pt-4 gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 no-scrollbar"
                      :ref="(el) => setCarouselRef(exp.id, el)"
                      @scroll="onCarouselScroll(exp.id, exp.projects!.length)"
                    >
                      <div
                        v-for="proj in exp.projects"
                        :key="proj.name"
                        class="w-full flex-shrink-0 snap-start project-card nexus-card-teal rounded-sm overflow-hidden group cursor-pointer"
                        @click="proj.link && openLink(proj.link)"
                      >
                        <!-- Image -->
                        <div
                          class="project-img h-56 md:h-72 relative"
                          style="
                            background: linear-gradient(
                              135deg,
                              #0f0f1a,
                              #1a1a2e
                            );
                          "
                        >
                          <img
                            v-if="proj.image"
                            :src="proj.image"
                            :alt="proj.name"
                            class="w-full h-full object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                          <div class="absolute inset-0" />
                          <div
                            v-if="proj.link"
                            class="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style="background: rgba(0, 0, 0, 0.5)"
                          >
                            <div
                              class="flex items-center gap-2 text-neon-teal font-mono text-sm"
                            >
                              <i
                                class="fa-solid fa-arrow-up-right-from-square"
                              />
                              View Project
                            </div>
                          </div>
                        </div>

                        <!-- Content -->
                        <div class="p-6">
                          <h4
                            class="font-display font-bold text-base text-dark-300 mb-2 group-hover:text-neon-teal transition-colors"
                          >
                            {{ proj.name }}
                          </h4>
                          <p
                            class="text-dark-300/40 text-sm leading-relaxed mb-4"
                          >
                            {{ proj.description }}
                          </p>
                          <div class="flex flex-wrap gap-1">
                            <span
                              v-for="t in proj.tech"
                              :key="t"
                              class="tech-tag"
                              style="font-size: 0.65rem"
                              >{{ t }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Nav: dots + buttons -->
                    <div
                      class="flex items-center justify-between mt-3 px-0.5"
                      v-if="exp.projects.length > 1"
                    >
                      <!-- Dot indicators -->
                      <div class="flex items-center gap-1.5">
                        <button
                          v-for="(_, pi) in exp.projects"
                          :key="pi"
                          @click="goToSlide(exp.id, pi)"
                          class="carousel-dot transition-all duration-200"
                          :class="carouselIndex[exp.id] === pi ? 'active' : ''"
                          :aria-label="`Go to project ${pi + 1}`"
                        />
                      </div>

                      <!-- Prev / Next buttons -->
                      <div class="flex items-center gap-2">
                        <button
                          class="carousel-nav-btn"
                          :class="{
                            'opacity-30 cursor-not-allowed':
                              carouselIndex[exp.id] === 0,
                          }"
                          :disabled="carouselIndex[exp.id] === 0"
                          @click="scrollCarousel(exp.id, -1)"
                          aria-label="Previous"
                        >
                          ‹
                        </button>
                        <button
                          class="carousel-nav-btn"
                          :class="{
                            'opacity-30 cursor-not-allowed':
                              carouselIndex[exp.id] >= exp.projects.length - 1,
                          }"
                          :disabled="
                            carouselIndex[exp.id] >= exp.projects.length - 1
                          "
                          @click="scrollCarousel(exp.id, 1)"
                          aria-label="Next"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { Experience } from "../types";
import experienceData from "../mock/experience.json";

const experience = experienceData as Experience[];

const headerRef = ref<HTMLElement | null>(null);
const expRefs = ref<HTMLElement[]>([]);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const expandedTech = ref<Record<string, boolean>>({});
const carouselRefs = ref<Record<string, HTMLElement | null>>({});
const carouselIndex = ref<Record<string, number>>({});
const autoSlideTimers = ref<Record<string, ReturnType<typeof setInterval>>>({});
const hoveredCarousel = ref<Record<string, boolean>>({});

const AUTO_SLIDE_INTERVAL = 3500;

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  return `${MONTHS[parseInt(month) - 1]} ${year}`;
}

function openLink(url: string): void {
  window.open(url, "_blank", "noopener");
}

function getVisibleTech(expId: string, technologies: any[]) {
  return expandedTech.value[expId] ? technologies : technologies.slice(0, 1);
}

function toggleTech(expId: string) {
  expandedTech.value[expId] = !expandedTech.value[expId];
}

function setCarouselRef(id: string, el: Element | null) {
  if (el) carouselRefs.value[id] = el as HTMLElement;
}

function getTotal(id: string): number {
  return experience.find((e) => e.id === id)?.projects?.length ?? 0;
}

function goToSlide(id: string, index: number) {
  const el = carouselRefs.value[id];
  if (!el) return;
  const total = getTotal(id);
  const clamped = Math.max(0, Math.min(index, total - 1));
  carouselIndex.value[id] = clamped;

  const cardWidth = el.firstElementChild
    ? (el.firstElementChild as HTMLElement).offsetWidth
    : el.offsetWidth;

  el.scrollTo({ left: clamped * (cardWidth + 16), behavior: "smooth" });
}

function scrollCarousel(id: string, direction: number) {
  const current = carouselIndex.value[id] ?? 0;
  goToSlide(id, current + direction);
}

function onCarouselScroll(id: string, total: number) {
  const el = carouselRefs.value[id];
  if (!el) return;

  const cardWidth = el.firstElementChild
    ? (el.firstElementChild as HTMLElement).offsetWidth
    : el.offsetWidth;

  const idx = Math.round(el.scrollLeft / (cardWidth + 16));
  carouselIndex.value[id] = Math.max(0, Math.min(idx, total - 1));
}

function startAutoSlide(id: string) {
  stopAutoSlide(id);
  const total = getTotal(id);
  if (total <= 1) return;
  autoSlideTimers.value[id] = setInterval(() => {
    if (hoveredCarousel.value[id]) return;
    const current = carouselIndex.value[id] ?? 0;
    const next = current >= total - 1 ? 0 : current + 1;
    goToSlide(id, next);
  }, AUTO_SLIDE_INTERVAL);
}

function stopAutoSlide(id: string) {
  if (autoSlideTimers.value[id]) {
    clearInterval(autoSlideTimers.value[id]);
    delete autoSlideTimers.value[id];
  }
}

onMounted(() => {
  experience.forEach((e) => {
    expandedTech.value[e.id] = false;
    carouselIndex.value[e.id] = 0;
    hoveredCarousel.value[e.id] = false;
    if (e.projects && e.projects.length > 1) {
      startAutoSlide(e.id);
    }
  });

  requestAnimationFrame(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = [headerRef.value, ...expRefs.value].filter(
      (el): el is HTMLElement => el !== null,
    );

    elements.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
      observer.observe(el);
    });
  });
});

onUnmounted(() => {
  experience.forEach((e) => stopAutoSlide(e.id));
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.carousel-dot {
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: var(--text-primary);
  border: none;
  padding: 0;
  cursor: pointer;
}

.carousel-dot.active {
  width: 16px;
  background: #00f5d4;
}

.carousel-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
}

.carousel-nav-btn:not(:disabled):hover {
  background: rgba(0, 245, 212, 0.08);
  border-color: rgba(0, 245, 212, 0.3);
  color: #00f5d4;
}
</style>
