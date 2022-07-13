<template>
  <div class="flex flex-col">
    <h1 class="text-3xl mb-1">{{ head }}</h1>
    <p class="text-gray-500">{{ description }}</p>
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