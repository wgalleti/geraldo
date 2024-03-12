import { DiscountContext } from '../context/Discount'
import { useContext } from 'react'

export const useDiscount = () => useContext(DiscountContext)
