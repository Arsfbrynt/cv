<template>
  <div class="scroll-progress" :style="{ width: progress + '%' }" />

  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      scrolled
        ? 'bg-dark-900/95 backdrop-blur-md border-b border-neon-magenta/10'
        : 'bg-transparent'
    "
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a
        href="#about"
        class="flex items-center gap-2 group"
        @click.prevent="scrollTo('about')"
      >
        <img
          src="/images/logo.png"
          alt="Logo"
          class="w-8 h-6"
          @error="
            (e) => ((e.target as HTMLImageElement).style.display = 'none')
          "
        />
        <span class="font-display font-bold text-lg tracking-tight">
          <span class="text-white">Ars</span
          ><span class="text-neon-magenta">.</span
          ><span class="text-neon-teal">Dev</span>
        </span>
      </a>
      <button
        @click="toggleTheme"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        :aria-label="
          theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        "
      >
        <span v-if="theme === 'dark'">☀️</span>
        <span v-else>🌙</span>
      </button>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="item in menu"
          :key="item.section"
          :href="'#' + item.section"
          class="nav-item"
          :class="{ active: activeSection === item.section }"
          @click.prevent="scrollTo(item.section)"
        >
          <span class="text-neon-magenta/40 mr-1">0{{ idx(item) }}.</span>
          {{ item.name }}
        </a>
        <a
          href="mailto:arsfbrynt@gmail.com"
          class="btn-magenta text-xs px-4 py-2 ml-2"
        >
          <span>Hire Me</span>
        </a>
      </div>

      <button
        class="md:hidden flex flex-col gap-1.5 p-2 group"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <span
          v-for="i in 3"
          :key="i"
          class="block h-px bg-white/60 transition-all duration-300 group-hover:bg-neon-magenta"
          :class="{
            'w-6': i === 1,
            'w-4 group-hover:w-6': i === 2,
            'w-5 group-hover:w-6': i === 3,
          }"
        />
      </button>
    </div>
  </nav>

  <Transition name="mobile-nav">
    <div
      v-if="mobileOpen"
      class="mobile-nav-overlay fixed inset-0 z-40 flex flex-col pt-20 px-6 md:hidden"
      @click.self="mobileOpen = false"
    >
      <div class="flex flex-col gap-6 mt-8">
        <a
          v-for="(item, i) in menu"
          :key="item.section"
          :href="'#' + item.section"
          class="flex items-center gap-4 group"
          :style="{ animationDelay: i * 0.07 + 's' }"
          @click.prevent="mobileNav(item.section)"
        >
          <span class="font-mono text-xs text-neon-magenta/40"
            >0{{ i + 1 }}.</span
          >
          <span
            class="font-display text-2xl font-bold text-white/70 group-hover:text-white transition-colors"
            :class="{ 'text-white': activeSection === item.section }"
            >{{ item.name }}</span
          >
          <i
            class="fa-solid fa-arrow-right text-neon-magenta text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </a>
      </div>

      <div class="mt-auto mb-12 flex gap-4">
        <a
          v-for="social in socials"
          :key="social.platform"
          :href="social.url"
          target="_blank"
          class="w-10 h-10 flex items-center justify-center border border-white/10 rounded hover:border-neon-magenta/50 hover:text-neon-magenta text-white/50 transition-all duration-200"
        >
          <i :class="social.icon + ' text-sm'" />
        </a>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { MenuItem, Social } from "../types";
import { useTheme } from "../composables/useTheme";
import menuData from "../mock/menu.json";
import socialsData from "../mock/socials.json";
import {
  useScrollProgress,
  useActiveSection,
} from "../composables/useScrollReveal";

const menu = menuData as MenuItem[];
const socials = socialsData as Social[];
const { theme, toggleTheme } = useTheme();

const scrolled = ref<boolean>(false);
const mobileOpen = ref<boolean>(false);
const { progress } = useScrollProgress();
const { activeSection } = useActiveSection(menu.map((m) => m.section));

function idx(item: MenuItem): number {
  return menu.indexOf(item) + 1;
}

function scrollTo(section: string): void {
  document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
}

function mobileNav(section: string): void {
  mobileOpen.value = false;
  setTimeout(() => scrollTo(section), 200);
}

function onScroll(): void {
  scrolled.value = window.scrollY > 20;
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style lang="scss" scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
