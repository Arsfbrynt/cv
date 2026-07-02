<template>
  <section
    id="about"
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    style="padding-top: 4rem"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style="background: radial-gradient(circle, #ff00aa, transparent 70%)"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style="background: radial-gradient(circle, #00f5d4, transparent 70%)"
      />
    </div>
    <canvas ref="canvasRef" class="absolute inset-0 z-0" />

    <div class="relative z-10 max-w-6xl mx-auto px-6 py-20">
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <!-- Left: Text -->
        <div
          class="flex-1 text-center lg:text-left"
          :class="{ 'animate-fade-up': visible }"
        >
          <div
            class="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm border border-neon-teal/20 bg-neon-teal/5"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-neon-teal animate-pulse" />
            <span
              class="font-mono text-neon-teal text-xs tracking-widest"
              :class="!isDark && 'text-teal-700'"
              >{{ profile.availableText }}</span
            >
          </div>

          <h1 class="section-title mb-2">
            <span
              class="text-white/80 font-mono text-sm block mb-2 font-normal tracking-widest"
              >Assalamu'alaikum, I'm</span
            >
            <span
              class="glitch gradient-text block"
              :data-text="profile.name"
              >{{ profile.name }}</span
            >
          </h1>

          <div
            class="flex items-center justify-center lg:justify-start gap-3 mt-4 mb-6"
          >
            <div class="h-px w-8 bg-neon-magenta/40" />
            <p
              class="font-mono text-sm text-neon-magenta tracking-widest uppercase"
            >
              {{ profile.title }}
            </p>
            <div class="h-px w-8 bg-neon-magenta/40" />
          </div>

          <p
            class="text-white/55 text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
            v-html="highlightedSummary"
          ></p>

          <div class="flex gap-8 justify-center lg:justify-start mb-8">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center lg:text-left"
            >
              <div class="font-display font-bold text-2xl neon-text-magenta">
                {{ stat.value }}
              </div>
              <div
                class="font-mono text-xs text-white/50 tracking-widest uppercase mt-0.5"
              >
                {{ stat.label }}
              </div>
            </div>
          </div>

          <div class="flex gap-4 justify-center lg:justify-start flex-wrap">
            <button class="btn-magenta" @click="scrollTo('experience')">
              <span>View Work</span>
            </button>
            <a
              href="mailto:arsfbrynt@gmail.com"
              class="font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white flex items-center gap-2 transition-colors py-2"
            >
              <i class="fa-solid fa-envelope text-neon-teal" />
              Get in touch
            </a>
          </div>
        </div>

        <!-- Right: Avatar -->
        <div class="flex-shrink-0 flex flex-col items-center gap-6">
          <div class="relative">
            <div
              class="avatar-ring w-48 h-48 md:w-56 md:h-56 rounded-full relative z-0"
            >
              <div
                class="absolute inset-1 rounded-full overflow-hidden z-10 bg-dark-800"
              >
                <img
                  :src="isDark ? profile.avatar : profile.avatarWhite"
                  :alt="profile.name"
                  class="w-full h-[130%] object-cover"
                  @error="handleAvatarError"
                />
                <div
                  v-if="avatarError"
                  class="absolute inset-0 w-full h-full flex items-center justify-center"
                  style="background: linear-gradient(135deg, #1a1a2e, #0f0f1a)"
                >
                  <span
                    class="font-display font-bold text-5xl gradient-text select-none"
                    >AF</span
                  >
                </div>
              </div>
            </div>

            <div class="group relative inline-flex w-full">
              <div
                class="absolute bottom-2 -right-10 z-20 bg-dark-800 border border-neon-magenta/30 px-3 py-1.5 rounded-sm flex items-center gap-2 shadow-neon-magenta"
              >
                <i class="fa-solid fa-user-graduate text-neon-teal text-xs" />
                <span class="font-mono text-xs text-white/70"
                  >B.Sc.Inf.Eng.</span
                >
              </div>

              <!-- Tooltip -->
              <div
                class="pointer-events-none z-[99] absolute bottom-6 mb-2 -right-10 w-max opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 bg-dark-900 border border-neon-magenta/40 text-xs text-white/80 font-mono px-2 py-1 rounded-sm shadow-lg"
              >
                Bachelor of Science <br class="relative md:hidden" />
                in Informatics Engineering
              </div>
            </div>
            <div
              class="absolute -top-2 -left-4 z-20 bg-dark-800 border border-neon-teal/30 px-3 py-1.5 rounded-sm flex items-center gap-2 shadow-neon-teal"
            >
              <i class="fa-solid fa-code text-neon-magenta text-xs" />
              <span class="font-mono text-xs text-white/70">Frontend</span>
            </div>
          </div>

          <div class="flex items-center gap-2 text-white/50">
            <i class="fa-solid fa-location-dot text-neon-magenta text-xs" />
            <span class="font-mono text-xs">{{ profile.location }}</span>
          </div>

          <div class="flex gap-3">
            <template v-for="social in socials" :key="social.platform">
              <!-- JIKA PUNYA CHILD: Jadi Dropdown Keluar Samping Kiri -->
              <div
                v-if="social.child && social.child.length > 0"
                class="relative group/social cursor-pointer w-9 h-9 flex items-center justify-center border border-white/8 hover:border-neon-magenta/50 text-white/50 hover:text-neon-magenta transition-all duration-200 rounded-sm hover:shadow-neon-magenta"
              >
                <i :class="social.icon + ' text-sm'" />

                <!-- Invisible Bridge (pr-2) + Animasi Keluar Samping Kiri -->
                <div
                  class="absolute right-full top-0 pr-2 pointer-events-none group-hover/social:pointer-events-auto opacity-0 scale-95 translate-x-2 group-hover/social:opacity-100 group-hover/social:scale-100 group-hover/social:translate-x-0 transition-all duration-200 origin-right z-50 min-w-[150px]"
                >
                  <!-- Kotak Dropdown List Akun -->
                  <div
                    class="flex flex-col bg-dynamic-white/95 backdrop-blur-md border border-white/10 rounded-sm shadow-xl overflow-hidden shadow-neon-magenta/5"
                  >
                    <a
                      v-for="sub in social.child"
                      :key="sub.url"
                      :href="sub.url"
                      target="_blank"
                      class="flex items-center gap-2 px-3 py-2 text-left font-mono text-xs text-white/40 hover:text-white hover:bg-neon-magenta/10 border-b border-white/5 last:border-b-0 transition-all"
                    >
                      <i :class="[social.icon, 'text-xs text-white/20']" />
                      {{ sub.username }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- JIKA TIDAK PUNYA CHILD: Link Biasa -->
              <a
                v-else
                :href="social.url"
                target="_blank"
                :title="social.platform"
                class="w-9 h-9 flex items-center justify-center border border-white/8 hover:border-neon-magenta/50 text-white/50 hover:text-neon-magenta transition-all duration-200 rounded-sm hover:shadow-neon-magenta"
              >
                <i :class="social.icon + ' text-sm'" />
              </a>
            </template>
          </div>
        </div>
      </div>

      <div
        class="hidden md:flex absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float"
      >
        <span class="font-mono text-xs text-white/50 tracking-widest"
          >SCROLL</span
        >
        <div
          class="w-px h-12 bg-gradient-to-b from-neon-magenta/30 to-transparent"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Profile, Social, Stat } from "../types";
import profileData from "../mock/profile.json";
import socialsData from "../mock/socials.json";

const profile = profileData as Profile;
const socials = socialsData as Social[];
const isDark = ref(true);
const visible = ref<boolean>(false);
const avatarError = ref<boolean>(false);

const stats: Stat[] = [
  { value: "4+", label: "Years Exp" },
  { value: "10+", label: "Projects" },
  { value: "40+", label: "Modules Built" },
];

const highlightKeywords = [
  "Experienced",
  "translating design",
  "innovative",
  "efficient",
  "user-friendly",
  "clean code",
  "user experiences",
  "industry trends",
  "client expectations",
];

const updateThemeStatus = () => {
  isDark.value = document.documentElement.classList.contains("dark");
};

const highlightedSummary = computed(() => {
  let text = profile.summary;
  const sorted = [...highlightKeywords].sort((a, b) => b.length - a.length);
  for (const keyword of sorted) {
    const regex = new RegExp(
      `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    text = text.replace(regex, `<span class="highlight-text">$1</span>`);
  }
  return text;
});

function handleAvatarError(): void {
  avatarError.value = true;
}

function scrollTo(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// canvas
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  setTimeout(() => (visible.value = true), 100);
  updateThemeStatus();
  visible.value = true;
  const observer = new MutationObserver(updateThemeStatus);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  const canvas = canvasRef.value!;
  const ctx = canvas.getContext("2d")!;

  let boids: any[] = [];
  const mouse = { x: 0, y: 0 };

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resize();

  // init boids
  for (let i = 0; i < 40; i++) {
    boids.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
    });
  }

  const limitSpeed = (b: any, max = 2) => {
    const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    if (speed > max) {
      b.vx = (b.vx / speed) * max;
      b.vy = (b.vy / speed) * max;
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boids.forEach((b, i) => {
      let alignX = 0,
        alignY = 0,
        cohX = 0,
        cohY = 0,
        sepX = 0,
        sepY = 0,
        count = 0;

      boids.forEach((other, j) => {
        if (i === j) return;

        const dx = other.x - b.x;
        const dy = other.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          // alignment
          alignX += other.vx;
          alignY += other.vy;

          // cohesion
          cohX += other.x;
          cohY += other.y;

          // separation
          if (dist < 25) {
            sepX -= dx;
            sepY -= dy;
          }

          count++;
        }
      });

      if (count > 0) {
        alignX /= count;
        alignY /= count;

        cohX = cohX / count - b.x;
        cohY = cohY / count - b.y;

        // apply forces (ini magic tuning-nya)
        b.vx += alignX * 0.05 + cohX * 0.002 + sepX * 0.05;
        b.vy += alignY * 0.05 + cohY * 0.002 + sepY * 0.05;
      }

      // mouse attract (halus banget)
      const mdx = mouse.x - b.x;
      const mdy = mouse.y - b.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mdist < 150) {
        b.vx += mdx * 0.0005;
        b.vy += mdy * 0.0005;
      }

      limitSpeed(b);

      b.x += b.vx;
      b.y += b.vy;

      // wrap around screen (biar kayak laut infinite)
      if (b.x < 0) b.x = canvas.width;
      if (b.x > canvas.width) b.x = 0;
      if (b.y < 0) b.y = canvas.height;
      if (b.y > canvas.height) b.y = 0;

      // draw (glow neon subtle)
      ctx.beginPath();
      ctx.arc(b.x, b.y, 2.2, 0, Math.PI * 2);

      const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 6);
      gradient.addColorStop(0, "#ff00aa");
      gradient.addColorStop(1, "#00f5d4");

      ctx.fillStyle = gradient;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  draw();
});
</script>

<style>
.highlight-text {
  background: rgba(0, 245, 212, 0.02);
  color: var(--text-primary);
  font-weight: 500;
  padding: 0 4px;
  border-radius: 4px;
  transition: background 0.2s;
}
</style>
