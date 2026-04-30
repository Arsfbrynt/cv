<template>
  <div class="relative min-h-screen bg-dark-950">
    <div class="scanlines" />
    <NavBar />
    <main>
      <HeroSection />
      <div class="relative h-px max-w-6xl mx-auto px-6">
        <div
          class="h-full bg-gradient-to-r from-transparent via-neon-magenta/20 to-transparent"
        />
      </div>
      <ExperienceSection />
      <div class="relative h-px max-w-6xl mx-auto px-6">
        <div
          class="h-full bg-gradient-to-r from-transparent via-neon-teal/20 to-transparent"
        />
      </div>
      <SkillsSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import FooterSection from "./components/FooterSection.vue";

onMounted(async () => {
  await nextTick();

  const splash = document.getElementById("splash");
  if (!splash) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.overflow = "";
      splash.classList.add("hidden");
      splash.addEventListener("transitionend", () => splash.remove(), {
        once: true,
      });
    });
  });
});
</script>
