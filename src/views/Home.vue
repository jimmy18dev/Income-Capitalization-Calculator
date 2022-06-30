<template>
  <div class="flex flex-col bg-gray-100">
    <h1>Income Capitalization</h1>
    <div class="flex flex-col mb-4">
      <div class="flex flex-col mr-2">
        <div>ค่าใช้จ่ายต่อปี</div>
        <input
          type="tel"
          placeholder="ค่าใช้จ่ายต่อปี"
          v-model="user.expensesPerYear"
          v-cleave="{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
          }"
        >
      </div>
      <div class="flex flex-col mr-2">
        <div>ผลตอบแทน</div>
        <input
          type="tel"
          placeholder="ผลตอบแทน (%)"
          v-model="user.capitalisationRate"
          v-cleave="{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
          }"
        >
      </div>
      <div class="flex flex-col mr-2">
        <div>ค่าเช่าต่อเดือน</div>
        <input
          type="tel"
          placeholder="ค่าเช่าต่อเดือน"
          v-model="user.rentPerMonth"
          v-cleave="{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
          }"
        >
        <div class="text-sm text-gray-500">{{ toBaht(user.rentPerYear) }} บาท/ปี</div>
      </div>
      <div>ราคาประมาณ {{ toBaht(user.propertyValue) }} บาท (property value)</div>

      <div class="flex flex-col mr-2">
        <div>ผ่อนธนาคารต่อเดือน</div>
        <input
          type="tel"
          placeholder="ผ่อนธนาคารต่อเดือน"
          v-model="user.toBankPerMonth"
          v-cleave="{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
          }"
        >
      </div>
      <div class="flex flex-col mr-2">
        <div>ต้นทุนเพิ่มเติม</div>
        <input
          type="tel"
          placeholder="ต้นทุนเพิ่มเติม"
          v-model="user.additionalPropertyValue"
          v-cleave="{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
          }"
        >
        <div class=" text-sm">(ค่าแต่ง เงินจอง เงินดาวน์)</div>
      </div>
      <div class="flex flex-col mr-2">
        <div>ราคาทรัพย์</div>
        <input
          type="tel"
          placeholder="ราคาทรัพย์"
          v-model="user.propertyPrice"
          v-cleave="{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
          }"
        >
      </div>
      <div class="border-t">Net Rental Yield: {{ user.netRentalYield }}%</div>
      <div>Cash on Cash Rental Yield: {{ user.cashOnCashRentalYield }}%</div>
      <div>Cashflow/Month: {{ toBaht(user.cashflowPerMonth) }}</div>
      <div>Cashflow/Year: {{ toBaht(user.cashflowPerYear) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent, ref, onBeforeUnmount, computed, watch } from 'vue'
import { toBaht, percentages } from '../utils/currency'
import numeral from 'numeral'

import User from '../interface/user'

export default defineComponent({
  name: 'Home',
  components: {},
  setup () {
    const user: User = reactive({
      rentPerMonth: 6500,
      rentPerYear: 0,
      expensesPerYear: 12000,
      capitalisationRate: 5.5,
      propertyValue: 0,
      toBankPerMonth: 0,
      additionalPropertyValue: 0,
      propertyPrice: 0,
      netRentalYield: 0,
      cashOnCashRentalYield: 0,
      cashflowPerMonth: 0,
      cashflowPerYear: 0,
    })

    watch(() => user, () => {
      const expensesPerYear = numeral(user.expensesPerYear).value() || 0
      const rentPerMonth = numeral(user.rentPerMonth).value() || 0
      const capitalisationRate = numeral(user.capitalisationRate).value() || 0
      const additionalPropertyValue = numeral(user.additionalPropertyValue).value() || 0
      const propertyPrice = numeral(user.propertyPrice).value() || 0
      user.rentPerYear = perYear(rentPerMonth)
      const toBankPerMonth = numeral(user.toBankPerMonth).value() || 0

      user.propertyValue = calPropertyValue(user.rentPerYear, expensesPerYear, capitalisationRate)
      user.netRentalYield = calNetRentalYield(user.rentPerYear, expensesPerYear, additionalPropertyValue, propertyPrice)
      user.cashOnCashRentalYield = calCashOnCashRentalYield(user.rentPerYear, expensesPerYear, toBankPerMonth, additionalPropertyValue)
      user.cashflowPerMonth = calCashflowPerMonth(rentPerMonth, expensesPerYear, toBankPerMonth)
      user.cashflowPerYear = perYear(user.cashflowPerMonth)
    }, { deep: true })

    const perYear = (value: number): number => {
      return isFinite(value * 12) ? Math.round(value * 12) : 0
    }

    const calPropertyValue = (rentPerYear: number, expensesPerYear: number, capitalisationRate: number): number => {
      const v = ((rentPerYear - expensesPerYear) * 100) / capitalisationRate
      return isFinite(v) ? Math.round(v) : 0
    }

    const calNetRentalYield = (rentPerYear: number, expensesPerYear: number, additionalPropertyValue: number, propertyPrice: number): number => {
      const v = ((rentPerYear - expensesPerYear) * 100) / (propertyPrice + additionalPropertyValue)
      return isFinite(v) ? Number(v.toFixed(2)) : 0
    }

    const calCashOnCashRentalYield = (rentPerYear: number, expensesPerYear: number, toBankPerMonth: number, additionalPropertyValue: number): number => {
      const v = ((rentPerYear - expensesPerYear - (toBankPerMonth * 12)) * 100) / (additionalPropertyValue)
      return isFinite(v) ? Number(v.toFixed(2)) : 0
    }

    const calCashflowPerMonth = (rentPerMonth: number, expensesPerYear: number, toBankPerMonth: number): number => {
      const v = rentPerMonth - toBankPerMonth - (expensesPerYear / 12)
      return isFinite(v) ? Math.round(v) : 0
    }

    return {
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