import { Form } from 'devextreme-react';
import { useEffect, useMemo, useCallback, useState } from 'react';
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
  let grid;
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

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
      onContentReady: e => {
        grid = e.component;
      },
      onRowUpdated: () => {
        loadData();
      },
      onSelectionChanged: e => {
        setSelectedRowIndex(e.component.getRowIndexByKey(e.selectedRowKeys[0]));
      },
      onEditingStart: e => {
        debugger;
        if (e.data.quantity === 0 || e.data.quantity === '') {
          const editRowKey = grid.option('editing.editRowKey');
          const rowIndex = grid.getRowIndexByKey(editRowKey);
          grid.cellValue(rowIndex, 'quantity', e.data.quantity_refer);
        }
      },
      columns: [
        {
          dataField: 'product',
          caption: 'Produto',
          lookup: {
            dataSource: productModel.lookup(),
            displayExpr: 'name',
            valueExpr: 'id',
          },
          validationRules: [{ type: 'required' }],
        },
        { dataField: 'product_observation', visible: false },
        {
          dataField: 'unity',
          caption: 'Unidade',
          lookup: {
            dataSource: unityModel.lookup(),
            displayExpr: 'name',
            valueExpr: 'id',
          },
          validationRules: [{ type: 'required' }],
        },
        {
          dataField: 'quantity_refer',
          caption: 'Qtd. Solicitada',
          format: { type: 'fixedPoint', precision: 2 },
          visible: false,
          validationRules: [{ type: 'required' }],
        },

        {
          dataField: 'quantity',
          caption: 'Quantidade',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.quantity = value;
            const { unitary } = currentRowData;
            newData.subtotal = unitary * value;
          },
          validationRules: [{ type: 'required' }],
        },
        {
          dataField: 'quantity_pending',
          caption: 'Qtd. Pendente',
          format: { type: 'fixedPoint', precision: 2 },
        },
        {
          dataField: 'unitary',
          caption: 'Valor Unitário',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.unitary = value;
            const { quantity } = currentRowData;
            newData.subtotal = quantity * value;
          },
          validationRules: [{ type: 'required' }],
        },
        {
          dataField: 'subtotal',
          caption: 'Subtotal',
          format: { type: 'fixedPoint', precision: 2 },
          visible: false,
          validationRules: [{ type: 'required' }],
        },
        {
          dataField: 'tax',
          caption: 'Imposto',
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
          caption: 'Frete',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.shipping = value;
            const { subtotal, tax, discount, rounding } = currentRowData;
            newData.value_total = subtotal + tax + value - discount - rounding;
          },
        },
        {
          dataField: 'discount',
          caption: 'Desconto',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.discount = value;
            const { subtotal, tax, shipping, rounding } = currentRowData;
            newData.value_total = subtotal + tax + shipping - value - rounding;
          },
        },
        {
          dataField: 'rounding',
          caption: 'Arredondamento',
          format: { type: 'fixedPoint', precision: 2 },
          setCellValue: (newData, value, currentRowData) => {
            newData.rounding = value;
            const { subtotal, tax, shipping, discount } = currentRowData;
            newData.value_total = subtotal + tax + shipping - discount - value;
          },
        },
        {
          dataField: 'value_total',
          caption: 'Valor Total',
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
