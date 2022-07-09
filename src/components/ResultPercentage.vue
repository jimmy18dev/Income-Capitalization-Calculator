<template>
  <div v-if="percentages > 1000" class="flex justify-end items-baseline text-purple-700">
          <div class="mr-2 text-gray-500">มากกว่า</div>
          <div class="text-2xl">1,000</div>
          <div class="ml-2">%</div>
        </div>
        <div
          v-else
          class="flex justify-end items-baseline"
          :class="{
            'text-red-700': percentages < 0,
            'text-green-600': percentages > 0 && percentages <= 7,
            'text-purple-700': percentages > 7
          }"
        >
          <div class="text-2xl">{{ toPercentages(percentages) }}</div>
          <div class="ml-1">%</div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toPercentages } from '../utils/currency'

export default defineComponent({
  name: 'ResultPercentage',
  props: {
    percentages: Number,
  },
  methods: {
    toPercentages,
  }
})
</script>