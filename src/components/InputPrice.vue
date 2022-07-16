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
          numeralThousandsGroupStyle: 'thousand',
          numeralPositiveOnly: true,
          numeralDecimalScale: 0,
          numeralIntegerScale: 8,
        }"
          @input="$emit('update:value', $event.target.value)"
        >
        <div class="absolute inset-y-0 right-0 font-kanit-regular w-9 pb-2 flex justify-end items-end">{{ unit }}</div>
    </div>
    <div v-if="note" class="text-sm font-kanit-regular mt-1 text-gray-400 text-right">{{ note }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Label from './Label.vue'

export default defineComponent({
  name: 'InputPrice',
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