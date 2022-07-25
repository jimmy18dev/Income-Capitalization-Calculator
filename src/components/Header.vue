<template>
  <div class="flex flex-col items-start p-5">
    <div class="flex items-center">
      <h1 class="text-2xl text-gray-900 flex-1 mr-5">{{ head }}</h1>
      <div class="bg-purple-100 rounded-full w-20 h-20 flex justify-center items-center relative">
        <font-awesome-icon class="text-4xl text-purple-600" :icon="['fas', 'building']" />
        <font-awesome-icon class="absolute animate-bounce right-0 bottom-0 text-2xl text-yellow-500" :icon="['fas', 'sack-dollar']" />
      </div>
    </div>
    <p class="text-gray-700 mt-3 text-lg">{{ description }}</p>
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