import { defineStore } from 'pinia'
import Capitalization from '../models/capitalization'

export const useCapitalizationStore = defineStore('capitalization', {
  state: () => {
    return {
      capitalizations: [] as Capitalization[]
    }
  },
  getters: {
    getById: (state) => {
      return (capId: string) => {
        const result = state.capitalizations.filter(capitalization => capitalization.id === capId)
        return result.length ? result[0] : null
      }
    },
    listAll: (state) => {
      return state.capitalizations
    },
  },
  actions: {
    save(dataset: Capitalization) {
      if (dataset) {
        this.capitalizations.push(new Capitalization(dataset))
      }
    },
  },
})