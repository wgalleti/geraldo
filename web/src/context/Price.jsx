import { createContext, useEffect, useState } from 'react'
import Price from '../api/price'
import http from '../plugins/http'
import PropTypes from 'prop-types'
import { useDiscount } from '../hooks/useDiscount'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const PriceContext = createContext(null)

const PriceProvider = ({ children }) => {
  const [priceModel] = useState(() => new Price())
  const [priceData, setPriceData] = useState(null)
  const [allowEditing, setAllowEditing] = useState(false)
  const [totalValue, setTotalValue] = useState(0)
  const [totalWithOutDiscount, setTotalWithOutDiscount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountPercent, setDiscountPercent] = useState(0)
  const [priceID, setPriceID] = useState(null)
  const { mutateDiscountData } = useDiscount()

  const loadData = async () => {
    if (!priceID) {
      toast.error('Cotação não definida.')
      return {}
    }

    try {
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

      return normalizedData
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const {
    isError,
    isSuccess,
    data,
    refetch: reload
  } = useQuery({
    queryKey: ['price', priceID],
    queryFn: () => loadData(priceID),
    enabled: !!priceID
  })

  useEffect(() => {
    if (isSuccess) {
      const allow = ['filling_in', 'waiting']
      const totalWithOutDiscount = data.value_total + data.discount

      setPriceData(data)
      setAllowEditing(allow.includes(data.status))
      setTotalValue(data.value_total)
      setDiscount(data?.discount)
      setDiscountPercent(data?.discount_percent)
      setTotalWithOutDiscount(totalWithOutDiscount)
      mutateDiscountData({
        discount: data?.discount,
        percent: data?.discount_percent,
        totalValue: totalWithOutDiscount
      })
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      setPriceData(null)
      toast.error('Cotação não localizada.')
    }
  }, [isError])

  return (
    <PriceContext.Provider
      value={{
        priceModel,
        priceData,
        allowEditing,
        totalValue,
        totalWithOutDiscount,
        discount,
        discountPercent,
        setPriceID,
        reload,
        isError
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
