<template>
  <div class="flex items-baseline mb-4">
    <div class="flex flex-col flex-1">
      <Label>{{ head }}</Label>
      <div v-if="description" class="text-xs text-gray-500">{{ description }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Label from './Label.vue'

export default defineComponent({
  name: 'Section',
  components: {
    Label,
  },
  props: {
    head: String,
    description: String,
  },
})
</script>