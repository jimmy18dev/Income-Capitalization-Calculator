<template>
  <div class="flex border-b mx-6 mb-3 pb-3">
    <h2 class="text-2xl"><slot></slot></h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Topic',
})
</script>