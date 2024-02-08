import { Form } from 'devextreme-react';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../plugins/http';
import { formConfig, form } from './form';
import Grid from '../../components/Grid.jsx';
import PriceItem from '../../api/price.item.js';
import Product from '../../api/product.js';
import Unity from '../../api/unity.js';

const priceItemModel = new PriceItem();
const productModel = new Product();
const unityModel = new Unity();
const dataSource = priceItemModel.makeCustomStore();
export default function PricePage() {
  let { priceID } = useParams();
  const gridOptions = useMemo(() => {
    return {
      height: '55vh',
      columns: [
        {
          dataField: 'product',
          lookup: {
            dataSource: productModel.lookup(),
            displayExpr: 'name',
            valueExpr: 'id',
          },
        },
        { dataField: 'product_observation', visible: false },
        {
          dataField: 'unity',
          lookup: {
            dataSource: unityModel.lookup(),
            displayExpr: 'name',
            valueExpr: 'id',
          },
        },
        {
          dataField: 'quantity_refer',
          format: { type: 'fixedPoint', precision: 2 },
        },
        {
          dataField: 'quantity_pending',
          format: { type: 'fixedPoint', precision: 2 },
        },
        { dataField: 'quantity', format: { type: 'fixedPoint', precision: 2 } },
        { dataField: 'unitary', format: { type: 'fixedPoint', precision: 2 } },
        { dataField: 'tax', format: { type: 'fixedPoint', precision: 2 } },
        { dataField: 'shipping', format: { type: 'fixedPoint', precision: 2 } },
        { dataField: 'discount', format: { type: 'fixedPoint', precision: 2 } },
        { dataField: 'rounding', format: { type: 'fixedPoint', precision: 2 } },
        {
          dataField: 'value_total',
          format: { type: 'fixedPoint', precision: 2 },
        },
      ],
      editing: {
        allowAdding: false,
        allowDeleting: false,
        mode: 'form',
        form: {
          colCount: 7,
          items: [
            {
              colSpan: 5,
              dataField: 'product',
              editorOptions: {
                readOnly: true,
              },
            },
            {
              colSpan: 2,
              dataField: 'unity',
              editorOptions: {
                readOnly: true,
              },
            },
            {
              colSpan: 7,
              dataField: 'product_observation',
              editorType: 'dxTextArea',
              editorOptions: {
                readOnly: true,
                height: 100,
              },
            },

            {
              dataField: 'quantity_refer',
              editorType: 'dxNumberBox',
              editorOptions: {
                readOnly: true,
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              dataField: 'quantity_pending',
              editorType: 'dxNumberBox',
              editorOptions: {
                readOnly: true,
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              dataField: 'quantity',
              editorType: 'dxNumberBox',
              editorOptions: {
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              dataField: 'unitary',
              editorType: 'dxNumberBox',
              editorOptions: {
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              dataField: 'subTotal',
              editorType: 'dxNumberBox',
              editorOptions: {
                readOnly: true,
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              itemType: 'separator',
              colSpan: 2,
            },
            {
              dataField: 'discount',
              editorType: 'dxNumberBox',
              editorOptions: {
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              dataField: 'tax',
              editorType: 'dxNumberBox',
              editorOptions: {
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              dataField: 'shipping',
              editorType: 'dxNumberBox',
              editorOptions: {
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              dataField: 'rounding',
              editorType: 'dxNumberBox',
              editorOptions: {
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              dataField: 'value_total',
              editorType: 'dxNumberBox',
              editorOptions: {
                readOnly: true,
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            {
              itemType: 'separator',
              colSpan: 2,
            },
            {
              colSpan: 7,
              dataField: 'supplier_observation',
              editorType: 'dxTextArea',
              editorOptions: {
                height: 100,
              },
            },
          ],
        },
      },
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await http.get(`prices/prices/${priceID}`);
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
    };
    loadData();
  }, []);

  return (
    <>
      <Form {...formConfig} className="mb-10" />
      <Grid dataSource={dataSource} gridCustom={gridOptions} />
    </>
  );
}
