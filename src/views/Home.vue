<template>
  <div class="flex flex-col">
    <div class="flex flex-col bg-white sticky inset-x-0 top-0 z-10">
      <Header
        head="ราคาทรัพย์กับการลงทุนเพื่อปล่อยเช่า"
        description="ห้องที่กำลังจะตัดสินใจซื้อคุ้มค่ากับการลงทุนเพื่อปล่อยเช่าหรือไม่"
        class="w-1/3 mx-auto py-6"
      />
      <div class="flex w-1/3 mx-auto">
        <div
          v-for="(tab, index) in dataset"
          :key="tab.id"
          class="px-4 py-3 cursor-pointer"
          :class="{'text-purple-700 bg-gray-100': index === currentTabIndex}"
          @click="changeTabIndex(index)"
        >{{ tab.name }}</div>
        <button class="px-4 py-3 cursor-pointer" @click="addNewTab">
          <font-awesome-icon :icon="['far', 'square-plus']" />
        </button>
      </div>
      <!-- <div class="flex border">
        <div class="flex" >
          <input type="text" class="p-3 mr-2 border rounded-lg flex-1">
          <button class="flex bg-purple-700 text-white p-3 rounded-lg" @click="save">Save</button>
        </div>
        <div class="flex flex-col">
          <div v-for="capitalization in capitalizationStore.listAll" :key="capitalization.id">
            <div class="bg-red-100 mb-1" @click="load(capitalization.id)">{{ capitalization.id }}</div>
          </div>
        </div>
      </div> -->
    </div>
    <div v-if="dataset.length" class="flex flex-col w-1/3 mx-auto my-6">
      <Section head="ราคาทรัพย์ที่เหมาะสม">
        <InputPercentage
          v-model:value="dataset[currentTabIndex].capitalisationRate"
          class="mb-4"
          label="ผลตอบแทนที่ต้องการต่อปี"
          note="*ไม่ควรต่ำกว่าดอกเบี้ยสินเชื่อบ้าน-คอนโด (MRR)"
          placeholder="0.0"
          unit="%"
        />
        <InputPrice
          v-model:value="dataset[currentTabIndex].expensesPerYear"
          class="mb-4"
          label="ค่าส่วนกลางต่อปี (ถ้ามี)"
          placeholder="0.00"
          unit="บาท"
        />
        <InputPrice
          v-model:value="dataset[currentTabIndex].rentPerMonth"
          class="mb-4"
          label="ค่าเช่าต่อเดือน"
          placeholder="0.00"
          unit="บาท"
          :note="`≈ ${toBaht(dataset[currentTabIndex].rentPerYear())} บาทต่อปี`"
        />
        <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
          <div class="flex-1">ราคาทรัพย์</div>
          <ResultPrice
            :price="dataset[currentTabIndex].propertyValue()"
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
            v-model:value="dataset[currentTabIndex].installmentPerMonth"
            label="ผ่อนธนาคารต่อเดือน"
            placeholder="0.00"
            unit="บาท"
            :note="`≈ ${toBaht(dataset[currentTabIndex].installmentPerYear())} บาทต่อปี`"
          />
        </div>
        <div class="flex flex-col mb-4">
          <InputPrice
            v-model:value="dataset[currentTabIndex].additionalPropertyValue"
            label="ต้นทุนเพิ่มเติม"
            placeholder="0.00"
            note="เช่น เงินจอง, เงินดาวน์, ค่ารีโนเวท, ค่าเฟอร์นิเจอร์"
            unit="บาท"
          />
        </div>
        <div class="flex pb-1">
          <div class="flex-1">ผลตอบแทน:</div>
          <ResultPercentage
            :percentages="dataset[currentTabIndex].cashOnCashRentalYield()"
          />
        </div>
        <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
          <div class="flex-1">กระแสเงินสด:</div>
          <div class="flex flex-col">
            <ResultCashflow
              :cashflow="dataset[currentTabIndex].cashflowPerMonth()"
              prefix="ต่อเดือน"
            />
            <ResultCashflow
              :cashflow="dataset[currentTabIndex].cashflowPerYear()"
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
            v-model:value="dataset[currentTabIndex].propertyPrice"
            label="ราคาทรัพย์"
            placeholder="0.00"
            unit="บาท"
          />
        </div>
        <div class="flex items-baseline border-double border-b-4 border-gray-300 pb-1">
          <div class="flex-1">ผลตอบแทน:</div>
          <ResultPercentage
            :percentages="dataset[currentTabIndex].netRentalYield()"
          />
        </div>
      </Section>
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
    // const currentCapitalization: Capitalization = reactive(new Capitalization({
    //   rentPerMonth: 6500,
    //   expensesPerYear: 12000,
    //   capitalisationRate: 6.0,
    //   installmentPerMonth: 7000,
    //   additionalPropertyValue: 0,
    //   propertyPrice: 1200000,
    // }))

    // const save = (): void => {
    //   console.log('save', currentCapitalization)
    //   capitalizationStore.save(currentCapitalization)
    // }

    // const load = (capId: string): void => {
    //   const result = capitalizationStore.getById(capId)
    //   if (result) {
    //     console.log('Load', result.id, result)
    //     dataset[currentTabIndex].update(result)
    //   }
    // }

    const init = async (): Promise<void> => {
      dataset.push(new Capitalization({
        name: 'Tab 1',
        rentPerMonth: 6500,
        expensesPerYear: 12000,
        capitalisationRate: 6.0,
        installmentPerMonth: 7000,
        additionalPropertyValue: 0,
        propertyPrice: 1200000
      }))
    }

    const changeTabIndex = (index: number): void => {
      currentTabIndex.value = index
    }

    const addNewTab = (): void => {
      const newTabIndex = dataset.length + 1
      dataset.push(new Capitalization({
        name: `Tab ${newTabIndex}`,
        rentPerMonth: 7000,
        expensesPerYear: 12000,
        capitalisationRate: 6.0,
        installmentPerMonth: 7000,
        additionalPropertyValue: 0,
        propertyPrice: 1200000
      }))
      changeTabIndex(newTabIndex - 1)
    }
    
    onMounted(init)

    // watch(() => capitalization, () => {
    //   capitalizationStore.save(capitalization)
    // }, { deep: true })

    return {
      dataset,
      currentTabIndex,
      // save,
      // load,
      capitalizationStore,
      changeTabIndex,
      addNewTab,
    }
  },
  methods: {
    toBaht,
  }
})
</script>