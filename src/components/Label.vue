<template>
  <div class="text-gray-900 font-kanit-regular text-xl">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Label',
})
</script>