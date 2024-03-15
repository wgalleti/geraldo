import { Form, Popup } from 'devextreme-react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDiscount } from '../../../hooks/useDiscount'

const PriceDiscount = ({ priceId, loadData }) => {
  const formRef = useRef(null)
  const updatingRef = useRef(false)

  const { discountFormVisible, discountData, saveDiscout, closeDiscountForm } =
    useDiscount()

  const formConfig = useMemo(
    () => ({
      readyOnly: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      activeStateEnabled: true,
      scrollingEnabled: true,
      tabIndex: 0,
      labelLocation: 'top',
      showColonAfterLabel: false,
      showValidationSummary: false,
      colCount: 5,
      items: [
        {
          dataField: 'discount_percent',
          label: { text: '%' },
          editorType: 'dxNumberBox',
          editorOptions: {
            format: {
              type: 'fixedPoint',
              precision: 2
            },
            step: 5
          },
          validationRules: [
            { type: 'range', max: 100, message: 'Limite de 100%' }
          ],
          colSpan: 2
        },
        {
          dataField: 'discount',
          label: { text: 'Valor' },
          editorType: 'dxNumberBox',
          editorOptions: {
            format: {
              type: 'fixedPoint',
              precision: 2
            }
          },
          colSpan: 3
        },
        {
          itemType: 'button',
          colSpan: 5,
          buttonOptions: {
            useSubmitBehavior: true,
            icon: 'check',
            stylingMode: 'outlined',
            text: 'Aplicar'
          }
        }
      ],
      onFieldDataChanged: ({ dataField, value }) => {
        if (updatingRef.current) return

        const { totalValue } = discountData
        const form = formRef.current?.instance
        updatingRef.current = true

        if (dataField === 'discount_percent') {
          const discount = totalValue * (value / 100)
          form.updateData('discount', discount)
        }
        if (dataField === 'discount') {
          const percent = (value / totalValue) * 100
          form.updateData('discount_percent', percent)
        }
        setTimeout(() => (updatingRef.current = false), 0)
      }
    }),
    [discountData]
  )

  useEffect(() => {
    if (discountFormVisible) {
      formRef.current.instance.updateData({
        discount: discountData.discount,
        discount_percent: discountData.percent
      })
    }
  }, [discountFormVisible, discountData])

  const submitDiscount = useCallback(
    async (e) => {
      e.preventDefault()
      const form = formRef.current?.instance
      const { discount, discount_percent } = form.option('formData')
      await saveDiscout(priceId, {
        discount: Math.round(discount, 2),
        discount_percent: Math.round(discount_percent, 2)
      })
      form.reset()
      loadData()
    },
    [formRef]
  )

  return (
    <Popup
      visible={discountFormVisible}
      dragEnabled={false}
      showCloseButton={true}
      onHidden={() => closeDiscountForm()}
      showTitle={true}
      title='Descontos'
      width={440}
      height='auto'
    >
      <form onSubmit={submitDiscount}>
        <Form {...formConfig} ref={formRef} />
      </form>
    </Popup>
  )
}

PriceDiscount.propTypes = {
  priceId: PropTypes.string,
  loadData: PropTypes.func
}

export { PriceDiscount }
