<template>
  <div
    class="flex items-baseline"
    :class="{
      'text-red-700': percentages < 0,
      'text-green-600': percentages > 0 && percentages <= 7,
      'text-purple-700': percentages > 7
    }"
  >
    <div v-if="percentages >= 1000" class="font-kanit-medium flex-1 text-right text-2xl">+1000</div>
    <div v-else-if="percentages < -100" class="font-kanit-medium flex-1 text-right text-2xl">-100</div>
    <div v-else class="font-kanit-medium flex-1 text-right text-2xl">{{ toPercentages(percentages, true) }}</div>
    <div class="w-8 pl-1 font-kanit-regular">%</div>
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