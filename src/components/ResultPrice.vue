<template>
  <div
    class="flex justify-end items-baseline"
    :class="{
      'text-red-700': price <= 0,
      'text-purple-700': price > 0 && price <= 2000000,
      'text-green-600': price > 2000000,
    }"
  >
    <div v-if="prefix" class="mr-2 text-gray-500">{{ prefix }}</div>
    <div class="font-kanit-regular text-xl w-36 text-right">{{ toBaht(price) }}</div>
    <div class="w-9 text-right">บาท</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toBaht } from '../utils/currency'

export default defineComponent({
  name: 'ResultPrice',
  props: {
    price: Number,
    prefix: String,
  },
  methods: {
    toBaht,
  }
})
</script>