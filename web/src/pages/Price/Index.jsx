import { Form } from 'devextreme-react'
import Toolbar from 'devextreme-react/toolbar'
import { confirm } from 'devextreme/ui/dialog'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Price from '../../api/price.js'
import http from '../../plugins/http'
import { form, formConfig } from './form'
import { PriceItemDefault } from '../../components/PriceItem/Index.jsx'
import { PriceItemCard } from '../../components/PriceItem/Card.jsx'
import toast from 'react-hot-toast'

const priceModel = new Price()

export const PricePage = () => {
  const [fastFill, setFastFill] = useState(true)
  const [allowEditing, setAllowEditing] = useState(true)
  const [data, setData] = useState(null)

  let { priceID } = useParams()

  const navigate = useNavigate()

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
      const { data } = await http.get(`prices/prices/${priceID}/`)
      setData(data)
      const formData = {
        completed_percent: data.completed_percent,
        payment_refer_name: data.payment_refer_data.name,
        company_name: data.company_data.name,
        buyer_name: data.buyer_data.name,
        payment_name: data.payment_data.name,
        status_data: data.status_data,
        priority_data: data.priority_data,
        duration_time: data.duration_time,
        started_at: data.started_at,
        expire_at: data.expire_at,
        items_count: data.items_count,
        value_total: data.value_total,
        recommendation: data.recommendation
      }
      form.option('formData', formData)
      const allow = ['filling_in', 'waiting']
      setAllowEditing(allow.includes(data.status))
    } catch (error) {
      toast.error('Cotação não localizada.')
      navigate('/')
    }
  }, [setAllowEditing, setData])

  useEffect(() => {
    loadData()
  }, [loadData])

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
          {data && (
            <div className='flex flex-wrap gap-4 justify-between my-2'>
              <PriceItemCard text='Descontos' value={data?.total_discount} />
              <PriceItemCard
                text='Pendentes'
                value={data?.items_pending}
                noDigits
              />
              <PriceItemCard text='Impostos' value={data?.total_tax} />
              <PriceItemCard text='Total' value={data?.value_total} highlight />
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
