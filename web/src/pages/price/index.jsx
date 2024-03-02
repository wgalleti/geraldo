import { Form } from 'devextreme-react';
import Toolbar from 'devextreme-react/toolbar';
import { confirm } from 'devextreme/ui/dialog';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Price from '../../api/price.js';
import PriceItemDefault from '../../components/price-item/Default.jsx';
import http from '../../plugins/http';
import { form, formConfig } from './form';

const priceModel = new Price();

export default function PricePage() {
  const [fastFill, setFastFill] = useState(false);
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
        widget: 'dxButton',
        location: 'before',
        options: {
          icon: 'edit',
          text: `Preenchimento ${!fastFill ? 'Rápido' : 'Normal'}`,
          onClick: () => changeFastFill(),
          disabled: !allowEditing,
        },
      },
      {
        widget: 'dxButton',
        location: 'after',
        options: {
          icon: 'close',
          text: 'Cancelar',
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
          text: 'Finalizar',
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
    <>
      <Form {...formConfig} className="mb-1" />
      <PriceItemDefault
        priceID={priceID}
        loadData={loadData}
        fastFill={fastFill}
        readOnly={!allowEditing}
      />
      {allowEditing && (
        <Toolbar className="mt-2 mb-2 p-2 bg-blur" items={toolbarItems} />
      )}
    </>
  );
}
