<template>
  <div class="flex items-baseline border-b border-gray-400">
    <input
      class="text-right flex-1 px-0 m-0 text-2xl bg-transparent outline-none"
      type="tel"
      :placeholder="placeholder"
      :value="value"
      v-cleave="{
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
      }"
      @input="$emit('update:value', $event.target.value)"
    >
    <div class="ml-2">{{ unit }}</div>
  </div>
  <div class=" text-sm mt-1 text-gray-500 text-right">{{ note }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputPercentage',
  props: {
    value: String,
    unit: String,
    note: String,
    placeholder: String
  },
  emits: ['update:value']
})

</script>