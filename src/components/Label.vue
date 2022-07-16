<template>
  <div class="font-kanit-regular text-lg">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Label',
})
</script>