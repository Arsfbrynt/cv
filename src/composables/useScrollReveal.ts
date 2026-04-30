import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollProgress() {
  const progress = ref<number>(0)

  function update(): void {
    const doc = document.documentElement
    const scrolled = doc.scrollTop
    const total = doc.scrollHeight - doc.clientHeight
    progress.value = total > 0 ? (scrolled / total) * 100 : 0
  }

  onMounted(() => window.addEventListener('scroll', update, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', update))

  return { progress }
}

export function useActiveSection(sections: string[]) {
  const activeSection = ref<string>('about')

  function update(): void {
    const scrollY = window.scrollY + 100
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= scrollY) {
        activeSection.value = id
        break
      }
    }
  }

  onMounted(() => window.addEventListener('scroll', update, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', update))

  return { activeSection }
}

export function useScrollReveal() {
  const revealed = ref<Set<string>>(new Set())
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.id
            if (id) revealed.value = new Set([...revealed.value, id])
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
  })

  function observe(el: HTMLElement | null, id: string): void {
    if (!el) return
    el.dataset.id = id
    observer?.observe(el)
  }

  onUnmounted(() => observer?.disconnect())

  return { revealed, observe }
}
