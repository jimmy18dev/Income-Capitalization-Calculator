<template>
  <div
    class="flex justify-end items-baseline"
    :class="{
      'text-red-700': cashflow <= 0,
      'text-green-600': cashflow > 0 && cashflow <= 10000,
      'text-purple-700': cashflow > 10000,
    }"
  >
    <div v-if="prefix" class="mr-2 text-gray-500">{{ prefix }}</div>
    <div class="text-2xl w-36 text-right">{{ toBaht(cashflow) }}</div>
    <div class="ml-1">บาท</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toBaht } from '../utils/currency'

export default defineComponent({
  name: 'ResultCashflow',
  props: {
    cashflow: Number,
    prefix: String,
  },
  methods: {
    toBaht,
  }
})
</script>