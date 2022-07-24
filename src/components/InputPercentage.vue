<template>
  <div class="flex flex-col">
    <div class="flex relative">
      <input
      class="font-kanit-medium text-2xl leading-none text-right w-full bg-transparent outline-none border-b border-dotted border-gray-300 focus:border-gray-700 pr-10 rounded-none"
        type="text"
        placeholder="0.0"
        v-cleave="{
          numeral: true,
          numeralPositiveOnly: true,
          numeralDecimalScale: 1,
          numeralIntegerScale: 2
        }"
        :value="value"
        @input="onInputChange"
      >
      <div class="absolute inset-y-0 right-0 text-lg w-10 pl-2 pb-1 flex items-end text-gray-600">%</div>
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
    value: [String, Number],
  },
  emits: ['update:value'],
  setup (_, { emit }) {
    const onInputChange = (e: any): void => {
      emit('update:value', e.target.value)
    }
    return {
      onInputChange,
    }
  },
})
</script>