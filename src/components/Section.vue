<template>
  <div class="flex flex-col mb-6">
    <div class="flex flex-col mb-4">
      <h2 class="text-2xl">{{ head }}</h2>
      <div v-if="note" class="text-sm text-gray-500">{{ note }}</div>
    </div>
    <p v-if="description" class="mb-3">{{ description }}</p>
    <div class="flex flex-col">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Section',
  props: {
    head: String,
    description: String,
    note: String,
  },
})
</script>