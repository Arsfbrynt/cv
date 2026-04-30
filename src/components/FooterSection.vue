<template>
  <footer
    class="relative py-12 border-t border-neon-magenta/10 overflow-hidden"
  >
    <div class="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-center md:text-left">
          <div class="font-display font-bold text-xl mb-1">
            <span class="text-white">Ars</span
            ><span class="text-neon-magenta">.</span
            ><span class="text-neon-teal">Dev</span>
          </div>
          <p class="font-mono text-xs text-white/25 tracking-widest">
            {{ profile.subtitle }} — {{ profile.location }}
          </p>
        </div>

        <div class="flex gap-3">
          <a
            v-for="social in socials"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            :title="social.platform"
            class="group flex items-center gap-2 px-3 py-1.5 border border-white/8 hover:border-neon-magenta/40 rounded-sm transition-all duration-200"
          >
            <i
              :class="[
                social.icon,
                'text-sm text-white/30 group-hover:text-neon-magenta transition-colors',
              ]"
            />
            <span
              class="font-mono text-xs text-white/30 group-hover:text-white/60 transition-colors hidden sm:block"
              >{{ social.username }}</span
            >
          </a>
        </div>
      </div>

      <div
        class="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2"
      >
        <p class="font-mono text-xs text-white/20">
          Built with <span class="text-neon-teal">Vue 3</span> +
          <span class="text-neon-magenta">Vite</span> +
          <span class="text-white/40">Tailwind</span>
        </p>
        <p class="font-mono text-xs text-white/20">
          © {{ currentYear }} Ars Febry. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Profile, Social } from "../types";
import profileData from "../mock/profile.json";
import socialsData from "../mock/socials.json";

const profile = profileData as Profile;
const socials = socialsData as Social[];
const currentYear = new Date().getFullYear();
</script>
