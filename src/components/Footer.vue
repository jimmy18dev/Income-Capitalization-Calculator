<template>
  <div class="m-5 flex justify-center text-sm font-kanit-regular text-gray-700">
    <div>เวอร์ชั่น: {{ version }}</div>
    <span class="mx-2">·</span>
    <a href="https://github.com/jimmy18dev/Income-Capitalization-Calculator" target="_blank" rel="noopener noreferrer" class="underline">Github Project</a>
    <span class="mx-2">·</span>
    <a href="https://github.com/jimmy18dev/Income-Capitalization-Calculator/issues" target="_blank" rel="noopener noreferrer" class="underline">แจ้งปัญหา</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
  props: {
    head: String,
    description: String,
  },
  setup () {
    const version = import.meta.env.VITE_APP_VERSION
    return {
      version,
    }
  }
})
</script>