<template>
  <div class="flex flex-col">
    <div class="flex relative">
      <input
      class="font-kanit-regular text-2xl leading-none text-right w-full bg-transparent outline-none border-b border-dotted border-gray-200 focus:border-gray-600 pr-9"
        type="tel"
        :placeholder="placeholder"
        :value="value"
        v-cleave="{
          numeral: true,
          numeralPositiveOnly: true,
          numeralDecimalScale: 1,
          numeralIntegerScale: 2
        }"
        @input="$emit('update:value', $event.target.value)"
      >
      <div class="absolute inset-y-0 right-0 font-kanit-regular w-8 pl-1 pb-1 flex items-end">{{ unit }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Label from './Label.vue'

export default defineComponent({
  name: 'InputPercentage',
  components: {
    Label,
  },
  props: {
    value: String,
    label: String,
    unit: String,
    note: String,
    placeholder: String
  },
  emits: ['update:value']
})
</script>