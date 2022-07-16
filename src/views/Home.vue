<template>
  <Header
    head="ราคาทรัพย์กับการลงทุนเพื่อปล่อยเช่า"
    description="ห้องที่กำลังจะตัดสินใจซื้อคุ้มค่ากับการลงทุนเพื่อปล่อยเช่าหรือไม่"
    class="w-1/2 mx-auto my-16"
  />
  <div v-if="dataset.length" class="grid grid-cols-3 gap-10 w-1/2 mx-auto border-b mb-5 pb-3 items-center">
    <div v-for="(data, index) in dataset" :key="data.id" class="flex-1">
      <h2 v-if="index === 0" class="text-2xl">ราคาที่เหมาะสม</h2>
      <button v-else-if="!data.isActive" class="flex justify-center w-full px-6 py-2 bg-purple-50 font-kanit-regular text-lg text-purple-700 rounded-lg cursor-pointer" @click="data.enable()">เปรียบเทียบ</button>
      <button v-else class="flex justify-center w-full px-6 py-2 font-kanit-regular text-lg text-gray-400 bg-gray-100 rounded-lg cursor-pointer" @click="data.disable()">ลบออก</button>
    </div>
  </div>

  <div v-if="dataset.length" class="flex flex-col w-1/2 mx-auto mb-12">
    <div class="grid grid-cols-3 gap-10">
      <div
        v-for="(data) in dataset"
        class="flex flex-col flex-1 relative"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="bg-white bg-opacity-90 absolute inset-0 z-10"></div>
        <InputPercentage
          v-model:value="data.capitalisationRate"
          class="mb-5"
          label="ผลตอบแทนต่อปี"
          note="*ไม่ควรต่ำกว่าดอกเบี้ยสินเชื่อบ้าน-คอนโด (MRR)"
          placeholder="0.0"
          unit="%"
        />
        <InputPrice
          v-model:value="data.expensesPerYear"
          class="mb-5"
          label="ค่าส่วนกลางต่อปี"
          placeholder="0.00"
          unit="บาท"
        />
        <InputPrice
          v-model:value="data.rentPerMonth"
          class="mb-5"
          label="ค่าเช่าต่อเดือน"
          placeholder="0.00"
          unit="บาท"
          :note="`${toBaht(data.rentPerYear())} บาท/ปี`"
        />
        <div class="flex flex-col border-b-4 border-double pb-1">
          <div class="flex-1 font-kanit-regular">ราคาทรัพย์</div>
          <ResultPrice :price="data.propertyValue()" />
        </div>
      </div>
    </div>
  </div>

  <div v-if="dataset.length" class="flex flex-col w-1/2 mx-auto mb-12">
    <div class="flex border-b mb-5 pb-3">
      <h2 class="text-2xl">กระแสเงินสด</h2>
    </div>
    <div class="grid grid-cols-3 gap-10">
      <div
        v-for="(data) in dataset"
        class="flex flex-col flex-1 relative"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="bg-white bg-opacity-90 absolute inset-0 z-10"></div>
        <InputPrice
          v-model:value="data.additionalPropertyValue"
          label="ต้นทุนเพิ่มเติม"
          placeholder="0.00"
          note="เงินจอง, เงินดาวน์, ค่ารีโนเวท"
          unit="บาท"
          class="mb-5"
        />
        <InputPrice
          v-model:value="data.installmentPerMonth"
          label="ผ่อนธนาคารต่อเดือน"
          placeholder="0.00"
          unit="บาท"
          class="mb-5"
          :note="`${toBaht(data.installmentPerYear())} บาท/ปี`"
        />
        <div class="flex flex-col mb-5">
          <Label>ผลตอบแทน</Label>
          <ResultPercentage :percentages="data.cashOnCashRentalYield()" />
        </div>
        <div class="flex flex-col mb-5">
          <Label>เงินสดต่อเดือน</Label>
          <ResultCashflow :cashflow="data.cashflowPerMonth()" />
        </div>
        <div class="flex flex-col border-b-4 border-double pb-1">
          <Label>เงินสดต่อปี</Label>
          <ResultCashflow :cashflow="data.cashflowPerYear()" />
        </div>
      </div>
    </div>
  </div>

  <div v-if="dataset.length" class="flex flex-col w-1/2 mx-auto mb-20">
    <div class="flex border-b mb-5 pb-3">
      <h2 class="text-2xl">ผลตอบแทนสุทธิ</h2>
    </div>
    <div class="grid grid-cols-3 gap-10">
      <div
        v-for="(data) in dataset"
        class="flex flex-col flex-1 relative"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="bg-white bg-opacity-90 absolute inset-0 z-10"></div>
        <InputPrice
          v-model:value="data.propertyPrice"
          label="ราคาทรัพย์"
          placeholder="0.00"
          unit="บาท"
          class="mb-5"
        />
        <div class="flex flex-col border-b-4 border-double pb-1">
          <Label>ผลตอบแทน</Label>
          <ResultPercentage :percentages="data.netRentalYield()" />
        </div>
      </div>
    </div>
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