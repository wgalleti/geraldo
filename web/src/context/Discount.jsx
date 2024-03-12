import { createContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

const DiscountContext = createContext()

const DiscountProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [totalValue, setTotalValue] = useState(0)
  const [discount, setDiscount] = useState(0)
  const open = useCallback(() => setIsVisible(true), [setIsVisible])
  const close = useCallback(() => setIsVisible(false), [setIsVisible])
  const toggle = useCallback(
    () => setIsVisible((state) => !state),
    [setIsVisible]
  )
  const actualDiscount = useCallback(
    (value) => setDiscount(value),
    [setDiscount]
  )

  return (
    <DiscountContext.Provider
      value={{
        isVisible,
        open,
        close,
        toggle,
        totalValue,
        discount,
        setTotalValue,
        actualDiscount
      }}
    >
      {children}
    </DiscountContext.Provider>
  )
}

DiscountProvider.propTypes = {
  children: PropTypes.any
}

export { DiscountProvider, DiscountContext }
