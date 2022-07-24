<template>
  <div
    class="flex items-baseline"
    :class="{
      'text-red-700': price <= 0,
      'text-purple-800': price > 0 && price <= 2000000,
      'text-emerald-600': price > 2000000,
    }"
  >
    <div class="font-kanit-medium flex-1 text-right text-2xl">{{ toBaht(price) }}</div>
    <div class="w-10 text-xl text-right font-kanit-regular">บาท</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toBaht } from '../utils/currency'

export default defineComponent({
  name: 'ResultPrice',
  props: {
    price: {
      type: Number,
      default: 0
    },
  },
  methods: {
    toBaht,
  }
})
</script>