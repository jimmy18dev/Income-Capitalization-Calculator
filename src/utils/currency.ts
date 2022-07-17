import numeral from 'numeral'

export const toBaht = (value: number | string, positiveSymbols: boolean = false): string => {
  if (!value) {
    return '?'
  } else if (positiveSymbols) {
    return numeral(value).format('+0,0')
  } else {
    return numeral(value).format('0,0')
  }
}

export const toPercentages = (value: number | string, positiveSymbols: boolean = false): string => {
  if (!value) {
    return '?'
  } else if (positiveSymbols) {
    return numeral(value).format('+0.0')
  } else {
    return numeral(value).format('0.0')
  }
}
