export const formatCurrency = (value, noDigits = false) => {
  const result = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)

  if (noDigits) {
    return result.replace(/\D00(?=\D*$)/, '').replace('R$', '')
  }

  return result
}
