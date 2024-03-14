import { createContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { PriceProvider } from './Price'
import Price from '../api/price'

const DiscountContext = createContext(null)

const DiscountProvider = ({ children }) => {
  const [discountFormVisible, setDiscountFormVisible] = useState(false)
  const [discountData, setDiscountData] = useState({
    discount: 0,
    percent: 0,
    totalValue: 0
  })
  const [priceModel] = useState(() => new Price())

  const openDiscountForm = useCallback(() => setDiscountFormVisible(true), [])
  const closeDiscountForm = useCallback(() => setDiscountFormVisible(false), [])
  const mutateDiscountData = useCallback((data) => {
    console.log('mutate', data)
    setDiscountData(data)
  }, [])

  const saveDiscout = useCallback(async (priceID, payload) => {
    try {
      await priceModel.applyDiscount(priceID, payload)
      toast.success('Desconto aplicado com sucesso.')
      closeDiscountForm()
    } catch (error) {
      toast.error('Falha ao aplicar o desconto.')
      console.error(error)
    }
  }, [])

  return (
    <DiscountContext.Provider
      value={{
        discountFormVisible,
        openDiscountForm,
        closeDiscountForm,
        mutateDiscountData,
        discountData,
        saveDiscout
      }}
    >
      <PriceProvider>{children}</PriceProvider>
    </DiscountContext.Provider>
  )
}

DiscountProvider.propTypes = {
  children: PropTypes.any
}

export { DiscountProvider, DiscountContext }
