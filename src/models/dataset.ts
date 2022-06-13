type DatasetData = {
  rentPerMonth: number | null
  rentPerYear: number | null
  capitalisationRate: number | null
  propertyValue: number | null
}

export default class Dataset {
  public rentPerMonth: number | null
  public rentPerYear: number | null
  public capitalisationRate: number | null
  public propertyValue: number | null

  constructor (data?: DatasetData) {
    this.rentPerMonth = data?.rentPerMonth || 0
    this.rentPerYear = data?.rentPerYear || 0
    this.capitalisationRate = data?.capitalisationRate || 0
    this.propertyValue = data?.propertyValue || 0
  }
}
