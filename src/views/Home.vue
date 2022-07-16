<template>
  <Header
    head="ราคาทรัพย์กับการลงทุนเพื่อปล่อยเช่า"
    description="ห้องที่กำลังจะตัดสินใจซื้อคุ้มค่ากับการลงทุนเพื่อปล่อยเช่าหรือไม่"
    class="w-1/2 mx-auto my-16"
  />
  <div v-if="dataset.length" class="flex flex-col w-1/2 mx-auto mb-20">
    <Section>
      <div v-for="(data, index) in dataset" :key="data.id" class="ml-5 flex-1">
        <div v-if="index === 0" class="flex justify-center w-full px-6 py-2 font-kanit-regular text-lg text-gray-500">เริ่มต้น</div>
        <button v-else-if="!data.isActive" class="flex justify-center w-full px-6 py-2 bg-purple-50 font-kanit-regular text-lg text-purple-700 rounded-lg cursor-pointer" @click="data.enable()">เปรียบเทียบ</button>
        <button v-else class="flex justify-center w-full px-6 py-2 font-kanit-regular text-lg text-gray-400 bg-gray-100 rounded-lg cursor-pointer" @click="data.disable()">ลบออก</button>
      </div>
    </Section>
    <div class="flex border-b mb-5 pb-2">
      <h2 class="text-2xl">ราคาที่เหมาะสม</h2>
    </div>
    <Section
      head="ผลตอบแทนต่อปี"
      description="ไม่ควรต่ำกว่าดอกเบี้ยสินเชื่อบ้าน-คอนโด (MRR)"
    >
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <InputPercentage
          v-model:value="data.capitalisationRate"
          placeholder="0.0"
          unit="%"
        />
      </div>
    </Section>
    <Section head="ค่าส่วนกลางต่อปี">
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <InputPrice
          v-model:value="data.expensesPerYear"
          placeholder="0.00"
          unit="บาท"
        />
      </div>
    </Section>
    <Section head="ค่าเช่าต่อเดือน">
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <InputPrice
          v-model:value="data.rentPerMonth"
          placeholder="0.00"
          unit="บาท"
          :note="`${toBaht(data.rentPerYear())} บาท/ปี`"
        />
      </div>
    </Section>
    <Section head="ราคาทรัพย์" class="mb-8">
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <ResultPrice :price="data.propertyValue()" />
      </div>
    </Section>

    <div class="flex border-b mb-5 pb-2">
      <h2 class="text-2xl">กระแสเงินสด</h2>
    </div>
    <Section
      head="ต้นทุนเพิ่มเติม"
      description="เงินจอง, เงินดาวน์, ค่ารีโนเวท"
    >
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <InputPrice
          v-model:value="data.additionalPropertyValue"
          label="ต้นทุนเพิ่มเติม"
          placeholder="0.00"
          unit="บาท"
          class="mb-5"
        />
      </div>
    </Section>
    <Section head="ผ่อนธนาคารต่อเดือน">
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <InputPrice
          v-model:value="data.installmentPerMonth"
          label="ผ่อนธนาคารต่อเดือน"
          placeholder="0.00"
          unit="บาท"
          class="mb-5"
          :note="`${toBaht(data.installmentPerYear())} บาท/ปี`"
        />
      </div>
    </Section>
    <Section head="ผลตอบแทน">
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <ResultPercentage :percentages="data.cashOnCashRentalYield()" />
      </div>
    </Section>
    <Section head="เงินสดต่อเดือน">
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <ResultCashflow :cashflow="data.cashflowPerMonth()" />
      </div>
    </Section>
    <Section head="เงินสดต่อปี" class="mb-8">
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <ResultCashflow :cashflow="data.cashflowPerYear()" />
      </div>
    </Section>

    <div class="flex border-b mb-5 pb-2">
      <h2 class="text-2xl">ผลตอบแทนสุทธิ</h2>
    </div>
    <Section head="ราคาทรัพย์">
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <InputPrice
          v-model:value="data.propertyPrice"
          label="ราคาทรัพย์"
          placeholder="0.00"
          unit="บาท"
          class="mb-5"
        />
      </div>
    </Section>
    <Section head="ผลตอบแทน">
      <div v-for="data in dataset" :key="data.id" class="ml-5 flex-1">
        <ResultPercentage :percentages="data.netRentalYield()" />
      </div>
    </Section>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent, watch, ref } from 'vue'
import { toBaht } from '../utils/currency'
import Header from '../components/Header.vue'
import InputPrice from '../components/InputPrice.vue'
import Section from '../components/Section.vue'
import InputPercentage from '../components/InputPercentage.vue'
import ResultPercentage from '../components/ResultPercentage.vue'
import ResultCashflow from '../components/ResultCashflow.vue'
import ResultPrice from '../components/ResultPrice.vue'
import Capitalization from '../models/capitalization'
import Label from '../components/Label.vue'

import { useCapitalizationStore } from '../store/capitalization'

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
    Label,
  },
  setup () {
    const currentTabIndex = ref(0)
    const dataset = reactive([] as Capitalization[])
    const capitalizationStore = useCapitalizationStore()
    
    const init = async (): Promise<void> => {
      dataset.push(new Capitalization({
        name: 'เปรียบเทียบ 1',
        rentPerMonth: 6500,
        expensesPerYear: 12000,
        capitalisationRate: 6,
        installmentPerMonth: 70000,
        additionalPropertyValue: 0,
        propertyPrice: 1200000,
        isActive: true
      }))
      dataset.push(new Capitalization({
        name: 'เปรียบเทียบ 2',
        rentPerMonth: 6500,
        expensesPerYear: 12000,
        capitalisationRate: 7,
        installmentPerMonth: 7000,
        additionalPropertyValue: 0,
        propertyPrice: 1200000,
        isActive: false
      }))
      dataset.push(new Capitalization({
        name: 'เปรียบเทียบ 3',
        rentPerMonth: 6500,
        expensesPerYear: 12000,
        capitalisationRate: 8,
        installmentPerMonth: 7000,
        additionalPropertyValue: 0,
        propertyPrice: 1200000,
        isActive: false
      }))
    }

    onMounted(init)

    // watch(() => capitalization, () => {
    //   capitalizationStore.save(capitalization)
    // }, { deep: true })

    return {
      dataset,
      currentTabIndex,
      capitalizationStore,
    }
  },
  methods: {
    toBaht,
  }
})
</script>