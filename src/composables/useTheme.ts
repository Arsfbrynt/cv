import { ref, watch } from "vue";

const theme = ref<"light" | "dark">(
  (localStorage.getItem("theme") as "light" | "dark") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
);

function applyTheme(value: "light" | "dark") {
  document.documentElement.classList.toggle("dark", value === "dark");
  localStorage.setItem("theme", value);
}

// apply on init
applyTheme(theme.value);

watch(theme, (val) => applyTheme(val));

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }

  return { theme, toggleTheme };
}
