<template>
  <Header
    head="ราคาทรัพย์กับการลงทุนเพื่อปล่อยเช่า"
    description="ห้องที่กำลังจะตัดสินใจซื้อคุ้มค่ากับการลงทุนเพื่อปล่อยเช่าหรือไม่"
    class="p-6"
  />
  <div v-if="dataset.length" class="grid grid-cols-3 gap-6 mx-6 mb-6">
    <div v-for="(data, index) in dataset" :key="data.id" class="flex-1">
      <button v-if="!data.isActive" class="flex justify-center w-full px-6 py-4 border-2 border-dashed font-kanit-regular text-lg text-gray-500 rounded-lg cursor-pointer" @click="data.enable()">เปรียบเทียบ</button>
      <div v-else class=" shadow border p-6 rounded-lg">
        <Section head="ราคาทรัพย์ที่เหมาะสม">
          <InputPercentage
            v-model:value="data.capitalisationRate"
            class="mb-4"
            label="ผลตอบแทนที่ต้องการต่อปี"
            note="*ไม่ควรต่ำกว่าดอกเบี้ยสินเชื่อบ้าน-คอนโด (MRR)"
            placeholder="0.0"
            unit="%"
          />
          <InputPrice
            v-model:value="data.expensesPerYear"
            class="mb-4"
            label="ค่าส่วนกลางต่อปี (ถ้ามี)"
            placeholder="0.00"
            unit="บาท"
          />
          <InputPrice
            v-model:value="data.rentPerMonth"
            class="mb-4"
            label="ค่าเช่าต่อเดือน"
            placeholder="0.00"
            unit="บาท"
            :note="`≈ ${toBaht(data.rentPerYear())} บาทต่อปี`"
          />
          <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
            <div class="flex-1">ราคาทรัพย์</div>
            <ResultPrice
              :price="data.propertyValue()"
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
              v-model:value="data.installmentPerMonth"
              label="ผ่อนธนาคารต่อเดือน"
              placeholder="0.00"
              unit="บาท"
              :note="`≈ ${toBaht(data.installmentPerYear())} บาทต่อปี`"
            />
          </div>
          <div class="flex flex-col mb-4">
            <InputPrice
              v-model:value="data.additionalPropertyValue"
              label="ต้นทุนเพิ่มเติม"
              placeholder="0.00"
              note="เช่น เงินจอง, เงินดาวน์, ค่ารีโนเวท, ค่าเฟอร์นิเจอร์"
              unit="บาท"
            />
          </div>
          <div class="flex pb-1">
            <div class="flex-1">ผลตอบแทน:</div>
            <ResultPercentage
              :percentages="data.cashOnCashRentalYield()"
            />
          </div>
          <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
            <div class="flex-1">กระแสเงินสด:</div>
            <div class="flex flex-col">
              <ResultCashflow
                :cashflow="data.cashflowPerMonth()"
                prefix="ต่อเดือน"
              />
              <ResultCashflow
                :cashflow="data.cashflowPerYear()"
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
              v-model:value="data.propertyPrice"
              label="ราคาทรัพย์"
              placeholder="0.00"
              unit="บาท"
            />
          </div>
          <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
            <div class="flex-1">ผลตอบแทน:</div>
            <ResultPercentage
              :percentages="data.netRentalYield()"
            />
          </div>
        </Section>
      </div>
      <button v-if="data.isActive && index !== 1" class="flex justify-center mt-6 w-full px-6 py-4 bg-gray-200 text-gray-500 font-kanit-regular text-lg rounded-lg cursor-pointer" @click="data.disable()">ลบออก</button>
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
        capitalisationRate: 6.0,
        installmentPerMonth: 7000,
        additionalPropertyValue: 0,
        propertyPrice: 1200000,
        isActive: false
      }))
      dataset.push(new Capitalization({
        name: 'เปรียบเทียบ 2',
        rentPerMonth: 7500,
        expensesPerYear: 13000,
        capitalisationRate: 6.2,
        installmentPerMonth: 7000,
        additionalPropertyValue: 0,
        propertyPrice: 1200000,
        isActive: true
      }))
      dataset.push(new Capitalization({
        name: 'เปรียบเทียบ 3',
        rentPerMonth: 8500,
        expensesPerYear: 14000,
        capitalisationRate: 6.4,
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