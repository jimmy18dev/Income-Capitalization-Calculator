import { nanoid } from 'nanoid'
import numeral from 'numeral'

interface ICapitalization {
  name: string | undefined
  rentPerMonth: number | undefined
  expensesPerYear: number | undefined
  capitalisationRate: number | undefined
  installmentPerMonth: number | undefined
  additionalPropertyValue: number | undefined
  propertyPrice: number | undefined
  isActive: boolean | undefined
}
export default class Capitalization {
  public id: string
  public name: string
  public rentPerMonth: number
  public expensesPerYear: number
  public capitalisationRate: number
  public installmentPerMonth: number
  public additionalPropertyValue: number
  public propertyPrice: number
  public updateAt: number
  public isActive: boolean

  constructor (data?: ICapitalization) {
    this.id = nanoid()
    this.name = data?.name || ''
    this.rentPerMonth = data?.rentPerMonth || 0
    this.expensesPerYear = data?.expensesPerYear || 0
    this.capitalisationRate = data?.capitalisationRate || 0
    this.installmentPerMonth = data?.installmentPerMonth || 0
    this.additionalPropertyValue = data?.additionalPropertyValue || 0
    this.propertyPrice = data?.propertyPrice || 0
    this.updateAt = 0
    this.isActive = data?.isActive || false
  }
  
  public propertyValue (): number {
    const expensesPerYear = numeral(this.expensesPerYear).value() || 0
    const capitalisationRate = numeral(this.capitalisationRate).value() || 0
    const v = ((this.rentPerYear() - expensesPerYear) * 100) / capitalisationRate
    return isFinite(v) ? Math.round(v) : 0
  }

  public cashOnCashRentalYield (): number {
    const expensesPerYear = numeral(this.expensesPerYear).value() || 0
    const additionalPropertyValue = numeral(this.additionalPropertyValue).value() || 0
    const v = ((this.rentPerYear() - expensesPerYear - this.installmentPerYear ()) * 100) / (additionalPropertyValue || 1)
    return isFinite(v) ? Number(v.toFixed(2)) : 0
  }
  
  public cashflowPerMonth (): number {
    const rentPerMonth = numeral(this.rentPerMonth).value() || 0
    const installmentPerMonth = numeral(this.installmentPerMonth).value() || 0
    const v = rentPerMonth - installmentPerMonth - this.expensesPerMonth()
    return isFinite(v) ? Math.round(v) : 0
  }

  public cashflowPerYear (): number {
    return this.perYear(this.cashflowPerMonth())
  }

  public netRentalYield (): number {
    const expensesPerYear = numeral(this.expensesPerYear).value() || 0
    const propertyPrice = numeral(this.propertyPrice).value() || 0
    const additionalPropertyValue = numeral(this.additionalPropertyValue).value() || 0
    const v = ((this.rentPerYear() - expensesPerYear) * 100) / (propertyPrice + additionalPropertyValue)
    return isFinite(v) ? Number(v.toFixed(2)) : 0
  }

  public rentPerYear (): number {
    const rentPerMonth = numeral(this.rentPerMonth).value() || 0
    return this.perYear(rentPerMonth)
  }

  public installmentPerYear (): number {
    const installmentPerMonth = numeral(this.installmentPerMonth).value() || 0
    return this.perYear(installmentPerMonth)
  }

  public expensesPerMonth (): number {
    const expensesPerYear = numeral(this.expensesPerYear).value() || 0
    return this.perMonth(expensesPerYear)
  }

  public disable (): void {
    this.isActive = false
  }

  public enable (): void {
    this.isActive = true
  }

  private perYear (value: number): number {
    return isFinite(value * 12) ? Math.round(value * 12) : 0
  }

  private perMonth (value: number): number {
    return isFinite(value / 12) ? Math.round(value / 12) : 0
  }
}
