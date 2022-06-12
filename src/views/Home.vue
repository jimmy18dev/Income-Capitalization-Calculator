<template>
  <div class="p-10">
    <h1>Income Capitalization</h1>
    <div class="flex flex-col">
      <div class="flex">
        <div>ค่าเช่าต่อเดือน</div>
        <input type="text" placeholder="ค่าเช่าต่อเดือน" v-model="noi">
        <div>({{ yearNoi }} ต่อปี)</div>
      </div>
      <div class="flex">
        <div>ผลตอบแทน</div>
        <input type="text" placeholder="ผลตอบแทน" v-model="capRate">
        <div>%</div>
      </div>
      <div>ราคาทรัพย์: {{ propertyValue }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent, ref, onBeforeUnmount, computed } from 'vue'
import numeral from 'numeral'

export default defineComponent({
  name: 'Home',
  components: {},
  setup () {
    const noi = ref(0)
    const capRate = ref(0)

    const yearNoi = computed(() => {
      const v = noi.value * 12
      return isFinite(v) ? Math.round(v) : 0
    })

    const propertyValue = computed(() => {
      const v = (yearNoi.value * 100) / capRate.value
      return isFinite(v) ? numeral(Math.round(v)).format() : 0
    })
    // onMounted(init)

    return {
      noi,
      yearNoi,
      capRate,
      propertyValue,
    }
  }
})
</script>