import { Form } from 'devextreme-react';
import Toolbar from 'devextreme-react/toolbar';
import { confirm } from 'devextreme/ui/dialog';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Price from '../../api/price.js';
import http from '../../plugins/http';
import { form, formConfig } from './form';
import { PriceItemDefault } from '../../components/PriceItem/Index.jsx';

const priceModel = new Price();

export const PricePage = () => {
  const [fastFill, setFastFill] = useState(true);
  const [allowEditing, setAllowEditing] = useState(true);
  let { priceID } = useParams();

  const changeFastFill = useCallback(
    () => setFastFill(state => !state),
    [setFastFill]
  );

  const onFinish = useCallback(async () => {
    const result = await confirm(
      'Após a finalização a cotação será devolvida ao comprador.',
      'Finalizar o Preenchimento'
    );
    if (result) {
      await priceModel.finish(priceID);
      loadData();
    }
  }, []);

  const onCancel = useCallback(async () => {
    const result = await confirm(
      'Após o cancelamento a cotação não podera ser mais preenchida.',
      'Cancelar o Preenchimento'
    );
    if (result) {
      await priceModel.cancel(priceID);
      loadData();
    }
  }, []);

  const toolbarItems = useMemo(() => {
    return [
      {
        widget: 'dxCheckBox',
        location: 'before',
        options: {
          icon: 'edit',
          text: `Modo Rápido`,
          value: fastFill,
          onValueChanged: changeFastFill,
          disabled: !allowEditing,
        },
      },
      {
        widget: 'dxButton',
        location: 'after',
        options: {
          icon: 'close',
          text: 'Cancelar Cotação',
          elementAttr: {
            class: 'mr-2 ml-2',
          },
          onClick: () => onCancel(),
          disabled: !allowEditing,
        },
      },
      {
        widget: 'dxButton',
        location: 'after',
        options: {
          icon: 'check',
          text: 'Encerrar Cotação',
          onClick: () => onFinish(),
          disabled: !allowEditing,
        },
      },
    ];
  }, [setFastFill, fastFill, allowEditing]);

  const loadData = useCallback(async () => {
    const { data } = await http.get(`prices/prices/${priceID}/`);
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
      recommendation: data.recommendation,
    };
    form.option('formData', formData);
    setAllowEditing(data.status == 'filling_in');
  }, [setAllowEditing]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (

    <div className='flex flex-col h-full'>
      <div className='w-full '>
        <Toolbar className="mt-2 mb-2 py-2 bg-blur" items={toolbarItems} disabled={!allowEditing} />
      </div>
      <div className='w-full h-full flex flex-col md:flex-row gap-4'>
        <div className='md:min-w-[250px] w-full'>
          <Form {...formConfig} className="mb-1" />
        </div>
        <div className='w-full'>
          <PriceItemDefault
            priceID={priceID}
            loadData={loadData}
            fastFill={fastFill}
            readOnly={!allowEditing}
          />
        </div>
      </div>

    </div>
  );
}
