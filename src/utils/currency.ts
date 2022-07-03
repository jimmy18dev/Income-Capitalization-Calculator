import numeral from 'numeral'

export const toBaht = (value: number | string): string => {
  if (!value) {
    return '...'
  } else {
    return numeral(value).format('0,0')
  }
}

export const toPercentages = (value: number | string): string => {
  if (!value) {
    return '...'
  } else {
    return numeral(value).format('0.0')
  }
}
