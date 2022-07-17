<template>
  <div class="flex flex-col">
    <div class="flex relative">
      <input
        class="font-kanit-regular text-2xl leading-none text-right w-full bg-transparent outline-none border-b border-dotted border-gray-300 focus:border-gray-700 rounded-none pr-10"
        type="tel"
        placeholder="0.00"
        v-cleave="{
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
          numeralPositiveOnly: true,
          numeralDecimalScale: 0,
          numeralIntegerScale: 8,
        }"
        :value="value"
        @input="onInputChange"
      >
      <div class="absolute inset-y-0 right-0 font-kanit-regular w-10 pb-1 flex text-xl justify-end items-end">บาท</div>
    </div>
    <div v-if="note" class="text-sm font-kanit-regular mt-1 text-gray-700 text-right">{{ note }}</div>
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
    value: [String, Number],
    note: String,
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