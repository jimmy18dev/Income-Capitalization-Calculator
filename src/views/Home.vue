<template>
  <div class="flex flex-col bg-gray-100">
    <h1>Income Capitalization</h1>
    <div class="flex flex-col mb-4">
      <div class="flex flex-col mr-2">
        <div>ค่าเช่าต่อเดือน</div>
        <!-- <input type="text" class="bg-gray-100 text-right" placeholder="ค่าเช่าต่อเดือน" v-model="user.rentPerMonth"> -->
        <input
          type="tel"
          placeholder="ค่าเช่าต่อเดือน"
          v-model="user.rentPerMonth"
          v-cleave="{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
          }"
        >
        <div>{{ toBaht(perYear(user.rentPerMonth)) }} บาท/ปี</div>
        <div>ราคาประมาณ {{ toBaht(user.propertyValue) }} บาท</div>
      </div>
      <div class="flex flex-col mr-2">
        <div>ค่าใช้จ่ายต่อปี</div>
        <input type="text" class="bg-gray-100 text-right" placeholder="ค่าใช้จ่ายต่อปี" v-model="user.expensesPerYear">
      </div>
      <div class="flex flex-col mr-2">
        <div>ผลตอบแทน</div>
        <input type="text" class="bg-gray-100 text-right" placeholder="ผลตอบแทน" v-model="user.capitalisationRate">
      </div>
      <div class="flex flex-col mr-2">
        <div>ผ่อนธนาคารต่อเดือน</div>
        <input type="text" class="bg-gray-100 text-right" placeholder="ผ่อนธนาคารต่อเดือน" v-model="toBankPerMonth">
      </div>
      <div class="flex flex-col mr-2">
        <div>ต้นทุนเพิ่มเติม</div>
        <input type="text" class="bg-gray-100 text-right" placeholder="ต้นทุนเพิ่มเติม" v-model="additionalPropertyValue">
        <div class=" text-sm">(ค่าแต่ง เงินจอง เงินดาวน์)</div>
      </div>
      <div class="flex flex-col mr-2">
        <div>ราคาทรัพย์</div>
        <input type="text" class="bg-gray-100 text-right" placeholder="ต้นทุนเพิ่มเติม" v-model="propertyPrice">
        <div>Net Rental Yield: {{ netRentalYield }}%</div>
        <div>Cash on Cash Rental Yield: {{ cashOnCashRentalYield }}%</div>
        <div>Cashflow/Month: {{ toBaht(cashflowPerMonth) }}</div>
        <div>Cashflow/Year: {{ toBaht(cashflowPerYear) }}</div>
      </div>
    </div>
    <!-- <h2>ช่วงค่าเช่า (บาท/เดือน)</h2>
    <div v-if="propertyValueByRentRanges.length" class="flex flex-col mb-4">
      <div v-for="(item, index) in propertyValueByRentRanges" :key="index" class="flex" :class="{'bg-yellow-100': item.rentPerMonth == rentPerMonth}">
        <div class="mr-2">{{ toBaht(item.rentPerMonth) }} ต่อเดือน</div>
        <div class="mr-2">(ต่อปี {{ toBaht(item.rentPerYear) }})</div>
        <div class="mr-2">ตอบแทน {{ percentages(item.capitalisationRate) }}% ต่อปี</div>
        <div class="mr-2">ราคาทรัพย์ {{ toBaht(item.propertyValue) }} บาท</div>
      </div>
    </div> -->

    <!-- <h2>ช่วงผลตอบแทน (% / ปี)</h2>
    <div v-if="propertyValueBycapRate.length" class="flex flex-col">
      <div v-for="(item, index) in propertyValueBycapRate" :key="index" class="flex" :class="{'bg-yellow-100': item.capitalisationRate == capitalisationRate}">
        <div class="mr-2">ตอบแทน {{ percentages(item.capitalisationRate) }}% ต่อปี</div>
        <div class="mr-2">{{ toBaht(item.rentPerMonth) }} ต่อเดือน</div>
        <div class="mr-2">(ต่อปี {{ toBaht(item.rentPerYear) }})</div>
        <div class="mr-2">ราคาทรัพย์ {{ toBaht(item.propertyValue) }} บาท</div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent, ref, onBeforeUnmount, computed, watch } from 'vue'
import DatasetModel from '../models/dataset'
import { toBaht, percentages } from '../utils/currency'
import numeral from 'numeral'


import User from '../interface/user'

export default defineComponent({
  name: 'Home',
  components: {},
  setup () {
    const rentPerMonth = ref(6500)
    const expensesPerYear = ref(12000)
    const capitalisationRate = ref(5.5)
    const toBankPerMonth = ref(6000)
    const additionalPropertyValue = ref(50000)
    const propertyPrice = ref(1200000)
    const netRentalYield = ref(0)
    const cashOnCashRentalYield = ref(0)
    const cashflowPerMonth = ref(0)
    const cashflowPerYear = ref(0)

    const user: User = reactive({
      rentPerMonth: 6500,
      expensesPerYear: 12000,
      capitalisationRate: 5.5,
      propertyValue: 0,
    })

    let propertyValueByRentRanges = reactive([] as DatasetModel[])
    let propertyValueBycapRate = reactive([] as DatasetModel[])

    watch(() => user, () => {
      user.propertyValue = calPropertyValue(perYear(user.rentPerMonth), user.expensesPerYear, user.capitalisationRate)
    }, { deep: true })

    // watch(() => rentPerMonth.value, () => {
    //   Object.assign(propertyValueByRentRanges, generatePropertyValueDataset('RENT'))
    //   Object.assign(propertyValueBycapRate, generatePropertyValueDataset('CAP'))

    //   netRentalYield.value = calNetRentalYield(calRentPerYear(rentPerMonth.value), expensesPerYear.value, additionalPropertyValue.value, propertyPrice.value)

    //   cashOnCashRentalYield.value = calCashOnCashRentalYield(calRentPerYear(rentPerMonth.value), expensesPerYear.value, toBankPerMonth.value, additionalPropertyValue.value, propertyPrice.value)

    //   cashflowPerMonth.value = calCashflowPerMonth(rentPerMonth.value, expensesPerYear.value, toBankPerMonth.value)
    //   cashflowPerYear.value = cashflowPerMonth.value * 12
    // })

    // watch(() => capitalisationRate.value, () => {
    //   Object.assign(propertyValueByRentRanges, generatePropertyValueDataset('RENT'))
    //   Object.assign(propertyValueBycapRate, generatePropertyValueDataset('CAP'))
    // })

    // watch(() => expensesPerYear.value, () => {
    //   Object.assign(propertyValueByRentRanges, generatePropertyValueDataset('RENT'))
    //   Object.assign(propertyValueBycapRate, generatePropertyValueDataset('CAP'))
    // })

    // const generatePropertyValueDataset = (mode: string): DatasetModel[] => {
    //   let result = [] as DatasetModel[]
    //   if (mode === 'RENT') {
    //     let step = Number(rentPerMonth.value) - 500
    //     while (step <= Number(rentPerMonth.value) + 500) {
    //       result.push(new DatasetModel({
    //         rentPerMonth: step,
    //         rentPerYear: calRentPerYear(step),
    //         expensesPerYear: Number(expensesPerYear.value),
    //         capitalisationRate: capitalisationRate.value,
    //         propertyValue: calPropertyValue(calRentPerYear(step), Number(expensesPerYear.value), capitalisationRate.value)
    //       }))
    //       step += 100
    //     }
    //   } else if (mode === 'CAP') {
    //     let step = Number(capitalisationRate.value) - 3
    //     while (step <= Number(capitalisationRate.value) + 3) {
    //       result.push(new DatasetModel({
    //         rentPerMonth: rentPerMonth.value,
    //         rentPerYear: calRentPerYear(rentPerMonth.value),
    //         expensesPerYear: Number(expensesPerYear.value),
    //         capitalisationRate: step,
    //         propertyValue: calPropertyValue(calRentPerYear(rentPerMonth.value), Number(expensesPerYear.value), step)
    //       }))
    //       step += 0.5
    //     }
    //   }
    //   return result
    // }

    // const calRentPerYear = (rentPerMonth: number): number => {
    //   return isFinite(rentPerMonth * 12) ? Math.round(rentPerMonth * 12) : 0
    // }

    const perYear = (value: string | number): number => {
      const v = numeral(value).value() || 0
      return isFinite(v * 12) ? Math.round(v * 12) : 0
    }

    const calPropertyValue = (rentPerYear: number, expensesPerYear: number, capitalisationRate: number): number => {
      const v = ((rentPerYear - expensesPerYear) * 100) / capitalisationRate
      return isFinite(v) ? Math.round(v) : 0
    }

    const calNetRentalYield = (rentPerYear: number, expensesPerYear: number, additionalPropertyValue: number, propertyPrice: number): number => {
      const v = ((rentPerYear - expensesPerYear) * 100) / (propertyPrice + additionalPropertyValue)
      // console.log(rentPerYear, expensesPerYear, propertyPrice, additionalPropertyValue, v)
      return isFinite(v) ? Number(v.toFixed(2)) : 0
    }

    const calCashOnCashRentalYield = (rentPerYear: number, expensesPerYear: number, toBankPerMonth: number, additionalPropertyValue: number, propertyPrice: number): number => {
      const v = ((rentPerYear - expensesPerYear - (toBankPerMonth * 12)) * 100) / (additionalPropertyValue)
      return isFinite(v) ? Number(v.toFixed(2)) : 0
    }

    const calCashflowPerMonth = (rentPerMonth: number, expensesPerYear: number, toBankPerMonth: number): number => {
      const v = rentPerMonth - toBankPerMonth - (expensesPerYear / 12)
      return isFinite(v) ? Math.round(v) : 0
    }

    return {
      rentPerMonth,
      capitalisationRate,
      expensesPerYear,
      propertyValueByRentRanges,
      propertyValueBycapRate,
      toBankPerMonth,
      additionalPropertyValue,
      propertyPrice,
      netRentalYield,
      cashOnCashRentalYield,
      cashflowPerMonth,
      cashflowPerYear,
      user,
      perYear,
    }
  },
  methods: {
    toBaht,
    percentages,
  }
})
</script>