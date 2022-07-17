<template>
  <div class="flex flex-col items-center p-6">
    <h1 class="text-4xl">{{ head }}</h1>
    <p class="text-gray-500 mt-3 font-kanit-regular text-lg">{{ description }}</p>
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