<template>
  <div class="flex flex-col items-start p-5">
    <div class="flex items-start">
      <h1 class="text-2xl text-gray-900 flex-1">{{ head }}</h1>
      <img class="w-24" width="96" height="58" src="../assets/images/cover.jpg" alt="Income Capitalization Calculator" loading="lazy">
    </div>
    <p class="text-gray-700 mt-3 text-lg">{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
  props: {
    head: String,
    description: String,
  },
})
</script>