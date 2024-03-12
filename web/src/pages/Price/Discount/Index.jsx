import { Form, Popup } from 'devextreme-react'
import { formConfig, form } from './form'
import PropTypes from 'prop-types'
import { useCallback, useEffect } from 'react'
import Price from '../../../api/price'
import toast from 'react-hot-toast'
import { useDiscount } from '../../../hooks/useDiscount'

const priceModel = new Price()

const PriceDiscount = ({ priceId }) => {
  const { isVisible, totalValue, close, discount } = useDiscount()

  useEffect(() => {
    form?.option('formData', { value: discount, percent: 0 })
  }, [discount])

  const submitDiscount = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        const data = form.option('formData')
        if (data.value > totalValue) {
          toast.error('Valor não deve ser maior do que o valor total.')
          throw new Error('Valor não pode ser maior do que o valor total.')
        }
        await priceModel.applyDiscount(priceId, data)
        form.reset()
        close()
        toast.success('Desconto aplicado com sucesso.')
      } catch (error) {
        console.error(error)
        toast.error('Falha ao aplicar o desconto.')
      }
    },
    [form]
  )

  return (
    <Popup
      visible={isVisible}
      dragEnabled={false}
      showCloseButton={false}
      showTitle={true}
      title='Descontos'
      width={440}
      height='auto'
    >
      <form onSubmit={submitDiscount}>
        <Form {...formConfig} />
      </form>
    </Popup>
  )
}

PriceDiscount.propTypes = {
  limit: PropTypes.number,
  priceId: PropTypes.string
}

export { PriceDiscount }
