import { Form } from 'devextreme-react'
import Toolbar from 'devextreme-react/toolbar'
import { confirm } from 'devextreme/ui/dialog'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { form, formConfig } from './form'
import { PriceItemDefault } from '../../components/PriceItem/Index.jsx'
import { PriceItemCard } from '../../components/PriceItem/Card.jsx'
import toast from 'react-hot-toast'
import { PriceDiscount } from './Discount/Index.jsx'
import { useDiscount } from '../../hooks/useDiscount.js'
import { usePrice } from '../../hooks/usePrice'

export const PricePage = () => {
  const [fastFill, setFastFill] = useState(true)

  const { priceID } = useParams()
  const navigate = useNavigate()
  const { priceModel, loadPrice, priceData, allowEditing } = usePrice()
  const { openDiscountForm, discountFormVisible } = useDiscount()

  const changeFastFill = useCallback(
    () => setFastFill((state) => !state),
    [setFastFill]
  )

  const onFinish = useCallback(async () => {
    const result = await confirm(
      'Após a finalização a cotação será devolvida ao comprador.',
      'Finalizar o Preenchimento'
    )
    if (result) {
      await priceModel.finish(priceID)
      loadData()
    }
  }, [])

  const onCancel = useCallback(async () => {
    const result = await confirm(
      'Após o cancelamento a cotação não podera ser mais preenchida.',
      'Cancelar o Preenchimento'
    )
    if (result) {
      await priceModel.cancel(priceID)
      loadData()
    }
  }, [])

  const onDiscount = useCallback(async () => {
    openDiscountForm()
  }, [])

  const toolbarItems = useMemo(() => {
    return [
      {
        widget: 'dxSwitch',
        location: 'before',
        options: {
          icon: 'edit',
          switchedOffText: `Normal`,
          switchedOnText: `Rápido`,
          hint: 'Modo de preenchimento',
          value: fastFill,
          width: '100px',
          onValueChanged: changeFastFill,
          disabled: !allowEditing
        }
      },
      {
        widget: 'dxButton',
        location: 'after',
        options: {
          icon: 'close',
          text: 'Cancelar Cotação',
          elementAttr: {
            class: 'mr-2 ml-2'
          },
          onClick: () => onCancel(),
          disabled: !allowEditing
        }
      },
      {
        widget: 'dxButton',
        location: 'after',
        options: {
          icon: 'check',
          text: 'Encerrar Cotação',
          onClick: () => onFinish(),
          disabled: !allowEditing
        }
      }
    ]
  }, [setFastFill, fastFill, allowEditing])

  const loadData = useCallback(async () => {
    try {
      await loadPrice(priceID)
      form.option('formData', priceData)
    } catch (error) {
      toast.error('Cotação não localizada.')
      navigate('/')
    }
  }, [form])

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='flex flex-col h-full'>
      {allowEditing && (
        <div className='w-full '>
          <Toolbar className='mt-2 mb-2 py-2 bg-blur' items={toolbarItems} />
        </div>
      )}
      <div className='w-full h-full flex flex-col md:flex-row gap-4'>
        <div className='md:min-w-[250px] md:w-1/3 w-full'>
          <Form {...formConfig} className='mb-1' />
        </div>
        <div className='w-full'>
          <PriceDiscount priceId={priceID} />
          {priceData && (
            <div className='flex flex-wrap gap-4 justify-between my-2'>
              <PriceItemCard
                text='Descontos'
                value={priceData?.discount}
                onClick={() => onDiscount()}
              />
              <PriceItemCard
                text='Pendentes'
                value={priceData?.items_pending}
                noDigits
              />
              <PriceItemCard text='Impostos' value={priceData?.total_tax} />
              <PriceItemCard
                text='Total'
                value={priceData?.value_total}
                highlight
              />
            </div>
          )}
          <PriceItemDefault
            priceID={priceID}
            loadData={loadData}
            fastFill={fastFill}
            readOnly={!allowEditing}
          />
        </div>
      </div>
    </div>
  )
}
