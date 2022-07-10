<template>
  <div class="flex flex-col my-12">
    <Header
      head="ราคาทรัพย์กับการลงทุนเพื่อปล่อยเช่า"
      description="ห้องที่กำลังจะตัดสินใจซื้อคุ้มค่ากับการลงทุนเพื่อปล่อยเช่าหรือไม่ ต้องการประเมินราคาค่าเช่าเมื่อเทียบกับราคาขาย ถือว่าสูงหรือต่ำ"
      class="mb-6"
    />
    <Section head="ราคาทรัพย์ที่เหมาะสม">
      <InputPercentage
        v-model:value="capitalization.capitalisationRate"
        class="mb-4"
        label="ผลตอบแทนที่ต้องการต่อปี"
        note="*ไม่ควรต่ำกว่าดอกเบี้ยสินเชื่อบ้าน-คอนโด (MRR)"
        placeholder="0.0"
        unit="%"
      />
      <InputPrice
        v-model:value="capitalization.expensesPerYear"
        class="mb-4"
        label="ค่าส่วนกลางต่อปี (ถ้ามี)"
        placeholder="0.00"
        unit="บาท"
      />
      <InputPrice
        v-model:value="capitalization.rentPerMonth"
        class="mb-4"
        label="ค่าเช่าต่อเดือน"
        placeholder="0.00"
        unit="บาท"
        :note="`≈ ${toBaht(capitalization.rentPerYear())} บาทต่อปี`"
      />
      <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
        <div class="flex-1">
          <font-awesome-icon :icon="['far', 'badge-percent']" />
          <span>ราคาทรัพย์</span>
        </div>
        <ResultPrice
          :price="capitalization.propertyValue()"
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
          v-model:value="capitalization.installmentPerMonth"
          label="ผ่อนธนาคารต่อเดือน"
          placeholder="0.00"
          unit="บาท"
          :note="`≈ ${toBaht(capitalization.installmentPerYear())} บาทต่อปี`"
        />
      </div>
      <div class="flex flex-col mb-4">
        <InputPrice
          v-model:value="capitalization.additionalPropertyValue"
          label="ต้นทุนเพิ่มเติม"
          placeholder="0.00"
          note="เช่น เงินจอง, เงินดาวน์, ค่ารีโนเวท, ค่าเฟอร์นิเจอร์"
          unit="บาท"
        />
      </div>
      <div class="flex pb-1">
        <div class="flex-1">ผลตอบแทน:</div>
        <ResultPercentage
          :percentages="capitalization.cashOnCashRentalYield()"
        />
      </div>
      <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
        <div class="flex-1">กระแสเงินสด:</div>
        <div class="flex flex-col">
          <ResultCashflow
            :cashflow="capitalization.cashflowPerMonth()"
            prefix="ต่อเดือน"
          />
          <ResultCashflow
            :cashflow="capitalization.cashflowPerYear()"
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
          v-model:value="capitalization.propertyPrice"
          label="ราคาทรัพย์"
          placeholder="0.00"
          unit="บาท"
        />
      </div>
      <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
        <div class="flex-1">ผลตอบแทน:</div>
        <ResultPercentage
          :percentages="capitalization.netRentalYield()"
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
import Capitalization from '../models/capitalization'

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
    const capitalization: Capitalization = reactive(new Capitalization({
      rentPerMonth: 6500,
      expensesPerYear: 12000,
      capitalisationRate: 6.0,
      installmentPerMonth: 7000,
      additionalPropertyValue: 0,
      propertyPrice: 1200000,
    }))

    // watch(() => capitalization, () => {}, { deep: true })

    return {
      capitalization,
    }
  },
  methods: {
    toBaht,
  }
})
</script>