<template>
  <div class="flex border-b border-gray-500 mx-5 mb-4 pb-1">
    <h2 class="text-2xl text-gray-900"><slot></slot></h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Topic',
})
</script>