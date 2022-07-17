<template>
  <div class="flex flex-col items-center p-5">
    <img class="w-32 h-32 mr-auto" src="../assets/images/pyramid.gif" alt="">
    <h1 class="text-4xl text-gray-900">{{ head }}</h1>
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