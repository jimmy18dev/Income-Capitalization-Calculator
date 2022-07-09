<template>
  <div class="flex flex-col my-12">
    <Header
      head="ราคาทรัพย์กับการลงทุนเพื่อปล่อยเช่า"
      description="ห้องที่กำลังจะตัดสินใจซื้อคุ้มค่ากับการลงทุนเพื่อปล่อยเช่าหรือไม่ ต้องการประเมินราคาค่าเช่าเมื่อเทียบกับราคาขาย ถือว่าสูงหรือต่ำ"
      class="mb-6"
    />
    <Section
      head="ราคาทรัพย์ที่เหมาะสม"
    >
      <div class="flex flex-col mb-4">
        <InputPercentage
          v-model:value="user.capitalisationRate"
          label="ผลตอบแทนที่ต้องการต่อปี"
          note="*ไม่ควรต่ำกว่าดอกเบี้ยสินเชื่อบ้าน-คอนโด (MRR)"
          placeholder="0.0"
          unit="%"
        />
      </div>
      <div class="flex flex-col mb-4">
        <InputPrice
          v-model:value="user.expensesPerYear"
          label="ค่าส่วนกลางต่อปี (ถ้ามี)"
          placeholder="0.00"
          unit="บาท"
        />
      </div>
      <div class="flex flex-col mb-4">
        <InputPrice
          v-model:value="user.rentPerMonth"
          label="ค่าเช่าต่อเดือน"
          placeholder="0.00"
          unit="บาท"
          :note="`≈ ${toBaht(user.rentPerYear)} บาทต่อปี`"
        />
      </div>
      <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
        <div class="flex-1">ราคาทรัพย์</div>
        <ResultPrice
          :price="user.propertyValue"
        />
      </div>
    </Section>
    <Section
      head="ราคาทรัพย์ที่เหมาะสม"
      description="คำนวณจากค่าส่วนกลางต่อปีและค่าเช่าต่อเดือน จากฟอร์มด้านบนด้วย"
      note="สำหรับผู้ที่กู้ธนาคาร"
    >
      <div class="flex flex-col mb-4">
        <InputPrice
          v-model:value="user.installmentPerMonth"
          label="ผ่อนธนาคารต่อเดือน"
          placeholder="0.00"
          unit="บาท"
          :note="`≈ ${toBaht(user.installmentPerYear)} บาทต่อปี`"
        />
      </div>
      <div class="flex flex-col mb-4">
        <InputPrice
          v-model:value="user.additionalPropertyValue"
          label="ต้นทุนเพิ่มเติม"
          placeholder="0.00"
          note="เช่น เงินจอง, เงินดาวน์, ค่ารีโนเวท, ค่าเฟอร์นิเจอร์"
          unit="บาท"
        />
      </div>
      <div class="flex pb-1">
        <div class="flex-1">ผลตอบแทน:</div>
        <ResultPercentage
          :percentages="user.cashOnCashRentalYield"
        />
      </div>
      <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
        <div class="flex-1">กระแสเงินสด:</div>
        <div class="flex flex-col">
          <ResultCashflow
            :cashflow="user.cashflowPerMonth"
            prefix="ต่อเดือน"
          />
          <ResultCashflow
            :cashflow="user.cashflowPerYear"
            prefix="ต่อปี"
          />
        </div>
      </div>
    </Section>

    <Section
      head="ผลตอบแทนจากการให้เช่าสุทธิ"
      description="เหมาะกับเจ้าของห้องที่ซื้อคอนโดเงินสด (ไม่ได้กู้ธนาคาร) คำนวณจากต้นทุนเพิ่มเติม จากฟอร์มด้านบนด้วย"
      note="สำหรับเจ้าของซื้อเงินสด"
    >
      <div class="flex flex-col mb-4">
        <InputPrice
          v-model:value="user.propertyPrice"
          label="ราคาทรัพย์"
          placeholder="0.00"
          unit="บาท"
        />
      </div>
      <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
        <div class="flex-1">ผลตอบแทน:</div>
        <ResultPercentage
          :percentages="user.netRentalYield"
        />
      </div>
    </Section>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent, watch } from 'vue'
import { toBaht } from '../utils/currency'
import Header from '../components/Header.vue'
import InputPrice from '../components/InputPrice.vue'
import Section from '../components/Section.vue'
import InputPercentage from '../components/InputPercentage.vue'
import ResultPercentage from '../components/ResultPercentage.vue'
import ResultCashflow from '../components/ResultCashflow.vue'
import ResultPrice from '../components/ResultPrice.vue'
import numeral from 'numeral'
import User from '../interface/user'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Section,
    InputPrice,
    InputPercentage,
    ResultPercentage,
    ResultCashflow,
    ResultPrice,
  },
  setup () {
    const user: User = reactive({
      rentPerMonth: 6500,
      rentPerYear: 0,
      expensesPerYear: 12000,
      capitalisationRate: 6.0,
      propertyValue: 0,
      installmentPerMonth: 7000,
      installmentPerYear: 0,
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
      // console.log('v', v)
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
  }
})
</script>