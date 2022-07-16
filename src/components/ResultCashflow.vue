<template>
  <div
    class="flex items-baseline"
    :class="{
      'text-red-700': cashflow <= 0,
      'text-green-600': cashflow > 0 && cashflow <= 10000,
      'text-purple-700': cashflow > 10000,
    }"
  >
    <div class="font-kanit-medium flex-1 text-right text-3xl">{{ toBaht(cashflow, true) }}</div>
    <div class="w-9 text-right font-kanit-regular">บาท</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toBaht } from '../utils/currency'

export default defineComponent({
  name: 'ResultCashflow',
  props: {
    cashflow: Number,
  },
  methods: {
    toBaht,
  }
})
</script>