import { useContext } from 'react'
import { PriceContext } from '../context/Price'

export const usePrice = () => useContext(PriceContext)
