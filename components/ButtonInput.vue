<template>
  <button
    class="flex-1 rounded-full px-4 py-1.5 text-center transition-all"
    :aria-label="label"
    :class="
      active
        ? 'bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-xl shadow-indigo-800/40 dark:shadow-black/40'
        : 'bg-transparent text-indigo-900/60 shadow-none hover:bg-white hover:shadow-lg dark:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-200'
    ">
    {{ label }}
  </button>
</template>

<script setup>
  defineProps({
    active: {
      type: Boolean
    },
    label: {
      type: String
    }
  })
</script>
