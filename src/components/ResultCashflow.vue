<template>
  <div
    class="flex items-baseline"
    :class="{
      'text-red-700': cashflow <= 0,
      'text-emerald-600': cashflow > 0 && cashflow <= 10000,
      'text-purple-800': cashflow > 10000,
    }"
  >
    <div class="font-kanit-medium flex-1 text-right text-2xl">{{ toBaht(cashflow, true) }}</div>
    <div class="w-10 text-lg text-right">บาท</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toBaht } from '../utils/currency'

export default defineComponent({
  name: 'ResultCashflow',
  props: {
    cashflow: {
      type: Number,
      default: 0
    },
  },
  methods: {
    toBaht,
  }
})
</script>