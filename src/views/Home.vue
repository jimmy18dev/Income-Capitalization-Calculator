<template>
  <div class="p-10">
    <h1>Income Capitalization</h1>
    <div class="flex mb-4">
      <div class="flex">
        <div>ค่าเช่าต่อเดือน</div>
        <input type="text" class="bg-gray-100 mx-3 text-right" placeholder="ค่าเช่าต่อเดือน" v-model="rentPerMonth">
      </div>
      <div class="flex">
        <div>ค่าใช้จ่ายต่อปี</div>
        <input type="text" class="bg-gray-100 mx-3 text-right" placeholder="ค่าใช้จ่ายต่อปี" v-model="expensesPerYear">
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
        <div class="mr-2">{{ toBaht(item.rentPerMonth) }} ต่อเดือน</div>
        <div class="mr-2">(ต่อปี {{ toBaht(item.rentPerYear) }})</div>
        <div class="mr-2">ตอบแทน {{ percentages(item.capitalisationRate) }}% ต่อปี</div>
        <div class="mr-2">ราคาทรัพย์ {{ toBaht(item.propertyValue) }} บาท</div>
      </div>
    </div>

    <h2>ช่วงผลตอบแทน (% / ปี)</h2>
    <div v-if="propertyValueBycapRate.length" class="flex flex-col">
      <div v-for="(item, index) in propertyValueBycapRate" :key="index" class="flex" :class="{'bg-yellow-100': item.capitalisationRate == capitalisationRate}">
        <div class="mr-2">ตอบแทน {{ percentages(item.capitalisationRate) }}% ต่อปี</div>
        <div class="mr-2">{{ toBaht(item.rentPerMonth) }} ต่อเดือน</div>
        <div class="mr-2">(ต่อปี {{ toBaht(item.rentPerYear) }})</div>
        <div class="mr-2">ราคาทรัพย์ {{ toBaht(item.propertyValue) }} บาท</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent, ref, onBeforeUnmount, computed, watch } from 'vue'
import DatasetModel from '../models/dataset'
import { toBaht, percentages } from '../utils/currency'


export default defineComponent({
  name: 'Home',
  components: {},
  setup () {
    const rentPerMonth = ref(0)
    const capitalisationRate = ref(5.5)
    const expensesPerYear = ref(0)
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

    watch(() => expensesPerYear.value, () => {
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
            expensesPerYear: Number(expensesPerYear.value),
            capitalisationRate: capitalisationRate.value,
            propertyValue: calPropertyValue(calRentPerYear(step), Number(expensesPerYear.value), capitalisationRate.value)
          }))
          step += 100
        }
      } else if (mode === 'CAP') {
        let step = Number(capitalisationRate.value) - 3
        while (step <= Number(capitalisationRate.value) + 3) {
          result.push(new DatasetModel({
            rentPerMonth: rentPerMonth.value,
            rentPerYear: calRentPerYear(rentPerMonth.value),
            expensesPerYear: Number(expensesPerYear.value),
            capitalisationRate: step,
            propertyValue: calPropertyValue(calRentPerYear(rentPerMonth.value), Number(expensesPerYear.value), step)
          }))
          step += 0.5
        }
      }
      return result
    }

    const calRentPerYear = (rentPerMonth: number): number => {
      return isFinite(rentPerMonth * 12) ? Math.round(rentPerMonth * 12) : 0
    }

    const calPropertyValue = (rentPerYear: number, expensesPerYear: number, capitalisationRate: number): number => {
      console.log('rentPerYear - expensesPerYear', rentPerYear, expensesPerYear)
      const v = ((rentPerYear - expensesPerYear) * 100) / capitalisationRate
      return isFinite(v) ? Math.round(v) : 0
    }

    return {
      rentPerMonth,
      capitalisationRate,
      expensesPerYear,
      propertyValueByRentRanges,
      propertyValueBycapRate,
    }
  },
  methods: {
    toBaht,
    percentages,
  }
})
</script>