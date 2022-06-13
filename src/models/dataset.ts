type DatasetData = {
  rentPerMonth: number | null
  rentPerYear: number | null
  expensesPerYear: number | null
  capitalisationRate: number | null
  propertyValue: number | null
}

export default class Dataset {
  public rentPerMonth: number | null
  public rentPerYear: number | null
  public expensesPerYear: number | null
  public capitalisationRate: number | null
  public propertyValue: number | null

  constructor (data?: DatasetData) {
    this.rentPerMonth = data?.rentPerMonth || 0
    this.rentPerYear = data?.rentPerYear || 0
    this.expensesPerYear = data?.rentPerYear || 0
    this.capitalisationRate = data?.capitalisationRate || 0
    this.propertyValue = data?.propertyValue || 0
  }
}
