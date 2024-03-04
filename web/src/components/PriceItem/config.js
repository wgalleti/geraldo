import Product from '../../api/product.js';
import Unity from '../../api/unity.js';

const productModel = new Product();
const unityModel = new Unity();

export const columnsConfig = [
  {
    dataField: 'product',
    caption: 'Produto',
    calculateDisplayValue: "product_data.name",
    lookup: {
      dataSource: productModel.lookup(),
      displayExpr: 'name',
      valueExpr: 'id',
    },
    validationRules: [{ type: 'required' }],
    allowEditing: false,
  },
  { dataField: 'product_observation', visible: false, allowEditing: false, },
  {
    dataField: 'unity',
    caption: 'Unidade',
    calculateDisplayValue: "unity_data.name",
    lookup: {
      dataSource: unityModel.lookup(),
      displayExpr: 'name',
      valueExpr: 'id',
    },
    validationRules: [{ type: 'required' }],
    allowEditing: false,
  },
  {
    dataField: 'quantity_refer',
    caption: 'Qtd. Solicitada',
    format: { type: 'fixedPoint', precision: 2 },
    visible: false,
    validationRules: [{ type: 'required' }],
    allowEditing: false,
  },
  {
    dataField: 'quantity_pending',
    caption: 'Qtd. Pendente',
    format: { type: 'fixedPoint', precision: 2 },
    allowEditing: false,
  },
  {
    dataField: 'quantity',
    caption: 'Quantidade',
    format: { type: 'fixedPoint', precision: 2 },
    setCellValue: (newData, value, currentRowData) => {
      newData.quantity = value;
      const { unitary = 0 } = currentRowData;
      newData.subtotal = unitary * value;
      const { subtotal, tax = 0, shipping = 0, discount = 0, rounding = 0 } = newData;
      newData.value_total = subtotal + tax + shipping + discount + rounding;
    },
    validationRules: [{ type: 'required' }],
  },
  {
    dataField: 'unitary',
    caption: 'Valor Unitário',
    format: { type: 'fixedPoint', precision: 2 },
    setCellValue: (newData, value, currentRowData) => {
      newData.unitary = value;
      const { quantity } = currentRowData;
      newData.subtotal = quantity * value;
      const { subtotal, tax = 0, shipping = 0, discount = 0, rounding = 0 } = newData;
      newData.value_total = subtotal + tax + shipping + discount + rounding;
    },
    validationRules: [{ type: 'required' }],
  },
  {
    dataField: 'subtotal',
    caption: 'Subtotal',
    format: { type: 'fixedPoint', precision: 2 },
    visible: false,
    validationRules: [{ type: 'required' }],
    allowEditing: false,
  },
  {
    dataField: 'tax',
    caption: 'Imposto',
    format: { type: 'fixedPoint', precision: 2 },
    setCellValue: (newData, value, currentRowData) => {
      newData.tax = value;
      const { subtotal, shipping, discount, rounding } = currentRowData;
      newData.value_total = subtotal + value + shipping - discount - rounding;
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
    allowEditing: false,
  },
];

export const formConfig = {
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
};
