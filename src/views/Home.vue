<template>
  <Header
    head="ราคาทรัพย์กับการลงทุนเพื่อปล่อยเช่า"
    description="ห้องที่กำลังจะตัดสินใจซื้อคุ้มค่ากับการลงทุนเพื่อปล่อยเช่าหรือไม่"
  />
  <div v-if="dataset.length" class="flex flex-col">
    <Section class="hidden">
      <div v-for="(data, index) in dataset" :key="data.id" class="ml-5 flex-1">
        <div v-if="index === 0" class="flex justify-center w-full px-6 py-2 font-kanit-medium text-lg text-gray-500">เริ่มต้น</div>
        <button v-else-if="!data.isActive" class="flex justify-center w-full px-6 py-2 bg-purple-50 font-kanit-medium text-lg text-purple-800 rounded-lg cursor-pointer" @click="data.enable()">เปรียบเทียบ</button>
        <button v-else class="flex justify-center w-full px-6 py-2 font-kanit-medium text-lg text-gray-400 bg-gray-100 rounded-lg cursor-pointer" @click="data.disable()">ลบออก</button>
      </div>
    </Section>

    <Topic>ราคาที่เหมาะสม</Topic>
    <Section
      head="ผลตอบแทนต่อปี"
      description="ไม่ควรต่ำกว่าดอกเบี้ยสินเชื่อบ้าน-คอนโด (MRR)"
    >
      <div
        v-for="(data, index) in dataset"
        class="ml-4 flex-1 relative"
        :class="{'hidden md:flex': index > 0}"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
        <InputPercentage
          v-model:value="data.capitalisationRate"
        />
      </div>
    </Section>
    <Section head="ค่าส่วนกลางต่อปี">
      <div
        v-for="(data, index) in dataset"
        class="ml-4 flex-1 relative"
        :class="{'hidden md:flex': index > 0}"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
        <InputPrice
          v-model:value="data.expensesPerYear"
        />
      </div>
    </Section>
    <Section head="ค่าเช่าต่อเดือน">
      <div
        v-for="(data, index) in dataset"
        class="ml-4 flex-1 relative"
        :class="{'hidden md:flex': index > 0}"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
        <InputPrice
          v-model:value="data.rentPerMonth"
          :note="`${toBaht(data.rentPerYear())} บาท/ปี`"
        />
      </div>
    </Section>
    <Section head="ราคาทรัพย์" class="mb-6">
      <div
        v-for="(data, index) in dataset"
        class="ml-4 flex-1 relative"
        :class="{'hidden md:flex': index > 0}"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
        <ResultPrice :price="data.propertyValue()" />
      </div>
    </Section>

    <Topic>กระแสเงินสด</Topic>
    <Section
      head="ต้นทุนเพิ่มเติม"
      description="เงินจอง, เงินดาวน์, ค่ารีโนเวท"
    >
      <div
        v-for="(data, index) in dataset"
        class="ml-4 flex-1 relative"
        :class="{'hidden md:flex': index > 0}"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
        <InputPrice
          v-model:value="data.additionalPropertyValue"
        />
      </div>
    </Section>
    <Section head="ผ่อนธนาคารต่อเดือน">
      <div
        v-for="(data, index) in dataset"
        class="ml-4 flex-1 relative"
        :class="{'hidden md:flex': index > 0}"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
        <InputPrice
          v-model:value="data.installmentPerMonth"
          :note="`${toBaht(data.installmentPerYear())} บาท/ปี`"
        />
      </div>
    </Section>
    <Section head="ผลตอบแทน">
      <div
        v-for="(data, index) in dataset"
        class="ml-4 flex-1 relative"
        :class="{'hidden md:flex': index > 0}"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
        <ResultPercentage :percentages="data.cashOnCashRentalYield()" />
      </div>
    </Section>
    <Section head="เงินสดต่อเดือน">
      <div
        v-for="(data, index) in dataset"
        class="ml-4 flex-1 relative"
        :class="{'hidden md:flex': index > 0}"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
        <ResultCashflow :cashflow="data.cashflowPerMonth()" />
      </div>
    </Section>
    <Section head="เงินสดต่อปี">
      <div
        v-for="(data, index) in dataset"
        class="ml-4 flex-1 relative"
        :class="{'hidden md:flex': index > 0}"
        :key="data.id"
      >
        <div v-if="!data.isActive" class="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
        <ResultCashflow :cashflow="data.cashflowPerYear()" />
      </div>
    </Section>
  </div>
  <Footer />
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent, ref } from 'vue'
import { toBaht } from '../utils/currency'
import { useCapitalizationStore } from '../store/capitalization'
import Header from '../components/Header.vue'
import InputPrice from '../components/InputPrice.vue'
import Section from '../components/Section.vue'
import InputPercentage from '../components/InputPercentage.vue'
import ResultPercentage from '../components/ResultPercentage.vue'
import ResultCashflow from '../components/ResultCashflow.vue'
import ResultPrice from '../components/ResultPrice.vue'
import Capitalization from '../models/capitalization'
import Label from '../components/Label.vue'
import Topic from '../components/Topic.vue'
import Footer from '../components/Footer.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Footer,
    Section,
    InputPrice,
    InputPercentage,
    ResultPercentage,
    ResultCashflow,
    ResultPrice,
    Label,
    Topic,
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
        capitalisationRate: 5.9,
        installmentPerMonth: 7000,
        additionalPropertyValue: 10000,
        propertyPrice: 1200000,
        isActive: true
      }))
      dataset.push(new Capitalization({
        name: 'เปรียบเทียบ 2',
        rentPerMonth: 6500,
        expensesPerYear: 12000,
        capitalisationRate: 7.2,
        installmentPerMonth: 7000,
        additionalPropertyValue: 20000,
        propertyPrice: 1500000,
        isActive: false
      }))
      dataset.push(new Capitalization({
        name: 'เปรียบเทียบ 3',
        rentPerMonth: 6500,
        expensesPerYear: 12000,
        capitalisationRate: 8.5,
        installmentPerMonth: 7000,
        additionalPropertyValue: 50000,
        propertyPrice: 2200000,
        isActive: false
      }))
    }

    onMounted(init)

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