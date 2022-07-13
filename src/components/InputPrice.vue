<template>
  <div class="flex flex-col">
    <Label>{{ label }}</Label>
    <div class="flex relative">
      <input
        class="font-kanit-regular text-right flex-1 px-0 m-0 text-2xl bg-transparent outline-none border-b border-gray-300 pr-9 focus:border-gray-600"
        type="tel"
        :placeholder="placeholder"
        :value="value"
        v-cleave="{
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
          numeralPositiveOnly: true,
          numeralDecimalScale: 0,
          numeralIntegerScale: 8
        }"
        @input="$emit('update:value', $event.target.value)"
      >
      <!-- v-cleave="{
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
          numeralPositiveOnly: true,
          numeralDecimalScale: 0,
          numeralIntegerScale: 8
        }" -->
      <div class="absolute inset-y-0 right-0 left-auto w-9 flex items-center justify-end">{{ unit }}</div>
    </div>
    <div v-if="note" class="text-xs mt-1 text-gray-500 text-right">{{ note }}</div>
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