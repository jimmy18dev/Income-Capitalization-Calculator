<template>
  <div class="flex flex-col items-center p-5">
    <img width="200" height="200" class="mb-3" src="../assets/images/pyramid.gif" alt="Income Capitalization Calculator">
    <h1 class="text-3xl text-gray-900">{{ head }}</h1>
    <p class="text-gray-700 mt-3 font-kanit-regular text-lg">{{ description }}</p>
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