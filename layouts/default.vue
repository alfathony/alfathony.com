<script setup lang="ts">
declare const process: any;
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
}

onMounted(() => {
  if (process.client) {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode === 'true') {
      isDark.value = true
    } else if (savedDarkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true
    }
  }
})

watch(isDark, (newValue) => {
  if (process.client) {
    if (newValue) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }
}, { immediate: true })
</script>

<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
    <slot :isDark="isDark" :toggleDarkMode="toggleDarkMode"/>
  </div>
</template>
