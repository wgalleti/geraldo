import { Form } from 'devextreme-react';
import { useEffect, useMemo, useCallback } from 'react';
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

export default function PricePage() {
  let { priceID } = useParams();
  const dataSource = useMemo(
    () => priceItemModel.makeCustomStore({ price: priceID }),
    [priceID]
  );
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
  }, []);

  const gridOptions = useMemo(() => {
    return {
      height: '55vh',
      onRowUpdated: () => {
        loadData();
      },
      onEditingStart: e => {
        if (e.data && !e.data.quantity) {
          e.data.quantity = e.data.quantity_refer;
        }
      },
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
          visible: false,
        },

        {
          dataField: 'quantity',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.quantity = value;
            const { unitary } = currentRowData;
            newData.subtotal = unitary * value;
          },
        },
        {
          dataField: 'quantity_pending',
          format: { type: 'fixedPoint', precision: 2 },
        },
        {
          dataField: 'unitary',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.unitary = value;
            const { quantity } = currentRowData;
            newData.subtotal = quantity * value;
          },
        },
        {
          dataField: 'subtotal',
          format: { type: 'fixedPoint', precision: 2 },
          visible: false,
          caption: 'Subtotal',
        },
        {
          dataField: 'tax',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.tax = value;
            const { subtotal, shipping, discount, rounding } = currentRowData;
            newData.value_total =
              subtotal + value + shipping - discount - rounding;
          },
        },
        {
          dataField: 'shipping',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.shipping = value;
            const { subtotal, tax, discount, rounding } = currentRowData;
            newData.value_total = subtotal + tax + value - discount - rounding;
          },
        },
        {
          dataField: 'discount',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.discount = value;
            const { subtotal, tax, shipping, rounding } = currentRowData;
            newData.value_total = subtotal + tax + shipping - value - rounding;
          },
        },
        {
          dataField: 'rounding',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.rounding = value;
            const { subtotal, tax, shipping, discount } = currentRowData;
            newData.value_total = subtotal + tax + shipping - discount - value;
          },
        },
        {
          dataField: 'value_total',
          format: { type: 'fixedPoint', precision: 2 },
        },
      ],
      editing: {
        allowAdding: false,
        allowDeleting: false,
        mode: 'popup',
        form: {
          colCount: 7,
          items: [
            {
              itemType: 'group',
              caption: 'Preenchimento',
              colSpan: 7,
              colCount: 5,
              items: [
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
                  dataField: 'subtotal',
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
                  itemType: 'empty',
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
                  colSpan: 5,
                  dataField: 'supplier_observation',
                  editorType: 'dxTextArea',
                  editorOptions: {
                    height: 100,
                  },
                },
              ],
            },
            {
              itemType: 'group',
              caption: 'Informações',
              colSpan: 7,
              colCount: 7,
              disabled: true,
              items: [
                {
                  colSpan: 4,
                  dataField: 'product',
                  disabled: true,
                },
                {
                  dataField: 'unity',
                },
                {
                  dataField: 'quantity_refer',
                  editorType: 'dxNumberBox',
                  editorOptions: {
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
                    format: {
                      type: 'fixedPoint',
                      precision: 2,
                    },
                  },
                },
                {
                  colSpan: 7,
                  dataField: 'product_observation',
                  editorType: 'dxTextArea',
                  editorOptions: {
                    height: 100,
                  },
                },
              ],
            },
          ],
        },
      },
    };
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Form {...formConfig} className="mb-10" />
      <Grid dataSource={dataSource} gridCustom={gridOptions} />
    </>
  );
}
