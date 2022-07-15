<template>
  <div
    v-if="percentages > 1000"
    class="flex justify-end items-baseline text-purple-700"
  >
    <div class="font-kanit-regular text-xl">+1,000</div>
    <div class="w-9 text-right">%</div>
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
    <div class="font-kanit-regular text-xl">{{ toPercentages(percentages) }}</div>
    <div class="w-9 text-right">%</div>
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