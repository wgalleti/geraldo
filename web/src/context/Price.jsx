import { createContext, useCallback, useState } from 'react'
import Price from '../api/price'
import http from '../plugins/http'
import PropTypes from 'prop-types'
import { useDiscount } from '../hooks/useDiscount'

const PriceContext = createContext(null)

const PriceProvider = ({ children }) => {
  const [priceModel] = useState(() => new Price())
  const [priceData, setPriceData] = useState(null)
  const [allowEditing, setAllowEditing] = useState(false)
  const [totalValue, setTotalValue] = useState(0)
  const [totalWithOutDiscount, setTotalWithOutDiscount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountPercent, setDiscountPercent] = useState(0)
  const { mutateDiscountData } = useDiscount()

  const loadPrice = useCallback(async (priceID) => {
    const { data } = await http.get(`prices/prices/${priceID}/`)

    const normalizedData = {
      ...data,
      payment_refer_name: data.payment_refer_data.name,
      company_name: data.company_data.name,
      buyer_name: data.buyer_data.name,
      payment_name: data.payment_data.name,
      status_data: data.status_data,
      priority_data: data.priority_data
    }

    const allow = ['filling_in', 'waiting']
    const totalWithOutDiscount =
      normalizedData.value_total + normalizedData.discount
    console.log(totalWithOutDiscount)

    setPriceData(normalizedData)
    setAllowEditing(allow.includes(normalizedData.status))
    setTotalValue(normalizedData.value_total)
    setDiscount(normalizedData?.discount)
    setDiscountPercent(normalizedData?.discount_percent)
    setTotalWithOutDiscount(totalWithOutDiscount)
    mutateDiscountData({
      discount: normalizedData?.discount,
      percent: normalizedData?.discount_percent,
      totalValue: totalWithOutDiscount
    })
    // TODO Check lazy load (screen not work correctly)
  }, [])

  return (
    <PriceContext.Provider
      value={{
        priceModel,
        loadPrice,
        priceData,
        allowEditing,
        totalValue,
        totalWithOutDiscount,
        discount,
        discountPercent
      }}
    >
      {children}
    </PriceContext.Provider>
  )
}

PriceProvider.propTypes = {
  children: PropTypes.any
}

export { PriceProvider, PriceContext }
