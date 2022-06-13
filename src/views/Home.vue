<template>
  <div class="p-10">
    <h1>Income Capitalization</h1>
    <div class="flex mb-4">
      <div class="flex">
        <div>ค่าเช่าต่อเดือน</div>
        <input type="text" class="bg-gray-100 mx-3 text-right" placeholder="ค่าเช่าต่อเดือน" v-model="rentPerMonth">
      </div>
      <div class="flex">
        <div>ผลตอบแทน</div>
        <input type="text" class="bg-gray-100 mx-3 text-right" placeholder="ผลตอบแทน" v-model="capitalisationRate">
        <div>%</div>
      </div>
    </div>
    <h2>ช่วงค่าเช่า (บาท/เดือน)</h2>
    <div v-if="propertyValueByRentRanges.length" class="flex flex-col mb-4">
      <div v-for="(item, index) in propertyValueByRentRanges" :key="index" class="flex" :class="{'bg-yellow-100': item.rentPerMonth == rentPerMonth}">
        <div class="mr-2">{{ item.rentPerMonth }} ต่อเดือน</div>
        <div class="mr-2">({{ item.rentPerYear }} ต่อปี)</div>
        <div class="mr-2">ตอบแทน {{ item.capitalisationRate }} % ต่อปี</div>
        <div class="mr-2">ราคา {{ item.propertyValue }} บาท</div>
      </div>
    </div>

    <h2>ช่วงผลตอบแทน (% / ปี)</h2>
    <div v-if="propertyValueBycapRate.length" class="flex flex-col">
      <div v-for="(item, index) in propertyValueBycapRate" :key="index" class="flex" :class="{'bg-yellow-100': item.capitalisationRate == capitalisationRate}">
        <div class="mr-2">{{ item.rentPerMonth }} ต่อเดือน</div>
        <div class="mr-2">({{ item.rentPerYear }} ต่อปี)</div>
        <div class="mr-2">ตอบแทน {{ item.capitalisationRate }} % ต่อปี</div>
        <div class="mr-2">ราคา {{ item.propertyValue }} บาท</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent, ref, onBeforeUnmount, computed, watch } from 'vue'
import numeral from 'numeral'
import DatasetModel from '../models/dataset'

export default defineComponent({
  name: 'Home',
  components: {},
  setup () {
    const rentPerMonth = ref(0)
    const capitalisationRate = ref(0)
    let propertyValueByRentRanges = reactive([] as DatasetModel[])
    let propertyValueBycapRate = reactive([] as DatasetModel[])

    watch(() => rentPerMonth.value, () => {
      Object.assign(propertyValueByRentRanges, generatePropertyValueDataset('RENT'))
      Object.assign(propertyValueBycapRate, generatePropertyValueDataset('CAP'))
    })

    watch(() => capitalisationRate.value, () => {
      Object.assign(propertyValueByRentRanges, generatePropertyValueDataset('RENT'))
      Object.assign(propertyValueBycapRate, generatePropertyValueDataset('CAP'))
    })

    const generatePropertyValueDataset = (mode: string): DatasetModel[] => {
      let result = [] as DatasetModel[]
      if (mode === 'RENT') {
        let step = Number(rentPerMonth.value) - 500
        while (step <= Number(rentPerMonth.value) + 500) {
          result.push(new DatasetModel({
            rentPerMonth: step,
            rentPerYear: calRentPerYear(step),
            capitalisationRate: capitalisationRate.value,
            propertyValue: calPropertyValue(calRentPerYear(step), capitalisationRate.value)
          }))
          step += 100
        }
      } else if (mode === 'CAP') {
        let step = Number(capitalisationRate.value) - 3
        while (step <= Number(capitalisationRate.value) + 3) {
          result.push(new DatasetModel({
            rentPerMonth: rentPerMonth.value,
            rentPerYear: calRentPerYear(rentPerMonth.value),
            capitalisationRate: step,
            propertyValue: calPropertyValue(calRentPerYear(rentPerMonth.value), step)
          }))
          step += 0.5
        }
      }
      return result
    }

    const calRentPerYear = (rentPerMonth: number): number => {
      return isFinite(rentPerMonth * 12) ? Math.round(rentPerMonth * 12) : 0
    }

    const calPropertyValue = (rentPerYear: number, capitalisationRate: number): number => {
      const v = (rentPerYear * 100) / capitalisationRate
      return isFinite(v) ? numeral(Math.round(v)).format() : 0
    }

    return {
      rentPerMonth,
      capitalisationRate,
      propertyValueByRentRanges,
      propertyValueBycapRate,
    }
  }
})
</script>