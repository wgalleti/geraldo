let form
const formConfig = {
  onContentReady: (e) => {
    form = e.component
  },
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
      dataField: 'percent',
      label: { text: '%' },
      editorType: 'dxNumberBox',
      editorOptions: {
        format: {
          type: 'fixedPoint',
          precision: 2
        }
      },
      validationRules: [{ type: 'range', max: 100, message: 'Limite de 100%' }],
      colSpan: 2
    },
    {
      dataField: 'value',
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
  ]
}

export { formConfig, form }
