<template>
  <div class="flex flex-col">
    <Label class="flex-1">{{ label }}</Label>
    <div class="flex relative">
      <input
      class="font-kanit-regular text-3xl leading-none text-right w-full bg-transparent outline-none border-b border-gray-200 focus:border-gray-600 pr-9"
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
      <div class="absolute inset-y-0 right-0 font-kanit-regular w-9 pb-2 flex justify-end items-end">{{ unit }}</div>
    </div>
    <!-- class="font-kanit-regular text-right flex-1 px-0 m-0 text-2xl bg-transparent outline-none border-b border-gray-300 pr-9 focus:border-gray-600" -->
    <!-- <div v-if="note" class="text-xs mt-1 text-gray-500 text-right">{{ note }}</div> -->
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