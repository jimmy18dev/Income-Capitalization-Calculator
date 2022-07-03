<template>
  <div class="flex flex-col my-12">
    <h1 class="text-2xl mb-3">คำนวณราคาทรัพย์กับการลงทุนเพื่อปล่อยเช่า</h1>
    <p class="mb-4">ห้องที่กำลังจะตัดสินใจซื้อคุ้มค่ากับการลงทุนเพื่อปล่อยเช่าหรือไม่ ต้องการประเมินราคาค่าเช่าเมื่อเทียบกับราคาขาย ถือว่าสูงหรือต่ำ</p>

    <div class="flex flex-col border p-6 rounded-xl mb-4 shadow">
      <h2 class="text-lg mb-3">ราคาทรัพย์ที่ซื้อได้</h2>
      <div class="flex flex-col mb-4">
        <div>ผลตอบแทนที่ต้องการต่อปี</div>
        <InputPercentage
          v-model:value="user.capitalisationRate"
          note="หรือใช้อัตราดอกเบี้ย สินเชื่อบ้าน-คอนโด (MRR)"
          placeholder="0.0"
          unit="%"
        />
      </div>
      <div class="flex flex-col mb-4">
        <div>ค่าส่วนกลางต่อปี (ถ้ามี)</div>
        <InputPrice
          v-model:value="user.expensesPerYear"
          placeholder="0.00"
          unit="บาท"
        />
      </div>
      <div class="flex flex-col mb-4">
        <div>ค่าเช่าต่อเดือน</div>
        <InputPrice
          v-model:value="user.rentPerMonth"
          :note="`${toBaht(user.rentPerYear)} บาทต่อปี`"
          placeholder="0.00"
          unit="บาท"
        />
      </div>
      <div class="flex flex-col">
        <div class="flex-1">ราคาทรัพย์ที่ซื้อได้:</div>
        <div class="flex justify-end items-baseline">
          <div class="mr-2 text-gray-500">ไม่เกิน</div>
          <div class="text-2xl">{{ toBaht(user.propertyValue) }}</div>
          <div class="ml-2">บาท</div>
        </div>
      </div>
    </div>

    <div class="flex flex-col border p-6 rounded-xl mb-4 shadow">
      <div class="flex flex-col mb-3">
        <h2 class="text-lg">ผลตอบแทนการให้เช่าต่อปี</h2>
        <div>สำหรับผู้ที่กู้ธนาคาร</div>
      </div>
      <p class="mb-3">คำนวณจากค่าส่วนกลางต่อปีและค่าเช่าต่อเดือน จากฟอร์มด้านบนด้วย</p>
      <div class="flex flex-col mb-4">
        <div>ผ่อนธนาคารต่อเดือน</div>
        <InputPrice
          v-model:value="user.installmentPerMonth"
          :note="`ประมาณ ${toBaht(user.installmentPerYear)} บาทต่อปี`"
          placeholder="0.00"
          unit="บาท"
        />
      </div>
      <div class="flex flex-col mb-4">
        <div>ต้นทุนเพิ่มเติม</div>
        <InputPrice
          v-model:value="user.additionalPropertyValue"
          placeholder="0.00"
          note="เช่น เงินจอง, เงินดาวน์, ค่ารีโนเวท, ค่าเฟอร์นิเจอร์"
          unit="บาท"
        />
      </div>
      <div class="flex flex-col">
        <div class="flex-1">ผลตอบแทน:</div>
        <div v-if="user.cashOnCashRentalYield > 1000" class="flex justify-end items-baseline">
          <div class="mr-2 text-gray-500">มากกว่า</div>
          <div class="text-2xl">1,000</div>
          <div class="ml-2">%</div>
        </div>
        <div v-else class="flex justify-end items-baseline">
          <div class="text-2xl">{{ toPercentages(user.cashOnCashRentalYield) }}</div>
          <div class="ml-2">%</div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex-1">กระแสเงินสด:</div>
        <div class="flex justify-end items-baseline">
          <div class="mr-2 text-gray-500">ต่อเดือน</div>
          <div class="text-2xl">{{ toBaht(user.cashflowPerMonth) }}</div>
          <div class="ml-2">บาท</div>
        </div>
        <div class="flex justify-end items-baseline">
          <div class="mr-2 text-gray-500">ต่อปี</div>
          <div class="text-2xl">{{ toBaht(user.cashflowPerYear) }}</div>
          <div class="ml-2">บาท</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col border p-6 rounded-xl mb-4 shadow">
      <div class="flex flex-col mb-3">
        <h2 class="text-lg">ผลตอบแทนจากการให้เช่าสุทธิ</h2>
        <div>สำหรับเจ้าของซื้อเงินสด</div>
      </div>
      <p class="mb-3">เหมาะกับเจ้าของห้องที่ซื้อคอนโดเงินสด (ไม่ได้กู้ธนาคาร) คำนวณจากต้นทุนเพิ่มเติม จากฟอร์มด้านบนด้วย</p>

      <div class="flex flex-col mb-4">
        <div>ราคาทรัพย์</div>
        <InputPrice
          v-model:value="user.propertyPrice"
          placeholder="0.00"
          unit="บาท"
        />
      </div>
      <div class="flex flex-col">
        <div class="flex-1">ผลตอบแทน:</div>
        <div class="flex justify-end items-baseline">
          <div class="text-2xl">{{ toPercentages(user.netRentalYield) }}</div>
          <div class="ml-2">%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent, watch } from 'vue'
import { toBaht, toPercentages } from '../utils/currency'
import InputPrice from '../components/InputPrice.vue'
import InputPercentage from '../components/InputPercentage.vue'

import numeral from 'numeral'

import User from '../interface/user'

export default defineComponent({
  name: 'Home',
  components: {
    InputPrice,
    InputPercentage,
  },
  setup () {
    const user: User = reactive({
      rentPerMonth: 6500,
      rentPerYear: 0,
      expensesPerYear: 12000,
      capitalisationRate: 5.5,
      propertyValue: 0,
      installmentPerMonth: 7000,
      additionalPropertyValue: 0,
      propertyPrice: 1200000,
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
      const installmentPerMonth = numeral(user.installmentPerMonth).value() || 0
      user.installmentPerYear = perYear(installmentPerMonth)

      user.propertyValue = calPropertyValue(user.rentPerYear, expensesPerYear, capitalisationRate)
      user.netRentalYield = calNetRentalYield(user.rentPerYear, expensesPerYear, additionalPropertyValue, propertyPrice)
      user.cashOnCashRentalYield = calCashOnCashRentalYield(user.rentPerYear, expensesPerYear, installmentPerMonth, additionalPropertyValue)
      user.cashflowPerMonth = calCashflowPerMonth(rentPerMonth, expensesPerYear, installmentPerMonth)
      user.cashflowPerYear = perYear(user.cashflowPerMonth)
    }, { deep: true })

    const perYear = (value: number): number => {
      return isFinite(value * 12) ? Math.round(value * 12) : 0
    }

    const fitstCal = (): void => {
      user.rentPerYear = perYear(user.rentPerMonth)
      user.propertyValue = calPropertyValue(user.rentPerYear, user.expensesPerYear, user.capitalisationRate)
      user.netRentalYield = calNetRentalYield(user.rentPerYear, user.expensesPerYear, user.additionalPropertyValue, user.propertyPrice)
      user.cashOnCashRentalYield = calCashOnCashRentalYield(user.rentPerYear, user.expensesPerYear, user.installmentPerMonth, user.additionalPropertyValue)
      user.cashflowPerMonth = calCashflowPerMonth(user.rentPerMonth, user.expensesPerYear, user.installmentPerMonth)
      user.cashflowPerYear = perYear(user.cashflowPerMonth)
    }

    const calPropertyValue = (rentPerYear: number, expensesPerYear: number, capitalisationRate: number): number => {
      const v = ((rentPerYear - expensesPerYear) * 100) / capitalisationRate
      return isFinite(v) ? Math.round(v) : 0
    }

    const calNetRentalYield = (rentPerYear: number, expensesPerYear: number, additionalPropertyValue: number, propertyPrice: number): number => {
      const v = ((rentPerYear - expensesPerYear) * 100) / (propertyPrice + additionalPropertyValue)
      return isFinite(v) ? Number(v.toFixed(2)) : 0
    }

    const calCashOnCashRentalYield = (rentPerYear: number, expensesPerYear: number, installmentPerMonth: number, additionalPropertyValue: number): number => {
      const v = ((rentPerYear - expensesPerYear - (installmentPerMonth * 12)) * 100) / (additionalPropertyValue || 1)
      return isFinite(v) ? Number(v.toFixed(2)) : 0
    }

    const calCashflowPerMonth = (rentPerMonth: number, expensesPerYear: number, installmentPerMonth: number): number => {
      const v = rentPerMonth - installmentPerMonth - (expensesPerYear / 12)
      return isFinite(v) ? Math.round(v) : 0
    }

    onMounted(fitstCal)

    return {
      user,
      perYear,
    }
  },
  methods: {
    toBaht,
    toPercentages,
  }
})
</script>