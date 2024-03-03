let form;
const formConfig = {
  onContentReady: e => {
    form = e.component;
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
  readOnly: true,
  colCount: 2,
  items: [
    {
      dataField: 'completed_percent',
      label: { text: 'Preenchimento', visible: false },
      editorType: 'dxProgressBar',
      editorOptions: {
        statusFormat: (ratio) => `Completo: ${ratio * 100}%`
      },
      colSpan: 2,
    },
    {
      dataField: 'company_name',
      label: { text: 'Empresa' },
      colSpan: 2,
    },
    {
      dataField: 'payment_refer_name',
      label: { text: 'Referência Forma de Pagamento' },
      colSpan: 2,
    },
    {
      dataField: 'started_at',
      label: { text: 'Iniciado em' },
      editorType: 'dxDateBox',
      editorOptions: {
        displayFormat: 'dd/MM/yyyy',
      },
    },
    { dataField: 'buyer_name', label: { text: 'Comprador' }, },
    {
      dataField: 'expire_at',
      label: { text: 'Termina em' },
      editorType: 'dxDateBox',
      editorOptions: {
        displayFormat: 'dd/MM/yyyy',
      },
    },
    { dataField: 'duration_time', label: { text: 'Tempo' } },
    {
      dataField: 'items_count',
      label: { text: 'Itens' },
    },
    {
      dataField: 'value_total',
      label: { text: 'Total' },
      editorType: 'dxNumberBox',
      editorOptions: {
        format: {
          type: 'fixedPoint',
          precision: 2,
        },
      },
    },
    {
      dataField: 'payment_name',
      label: { text: 'Forma de Pagamento' },
      colSpan: 2,
    },
    { dataField: 'status_data', label: { text: 'Status' }, colSpan: 2, },
    { dataField: 'priority_data', label: { text: 'Prioridade' }, colSpan: 2, },
    {
      dataField: 'recommendation',
      label: { text: 'Recomendações' },
      itemType: 'dxTextArea',
      editorOptions: {
        height: 80,
      },
      colSpan: 2,
    },
  ],
};

export { formConfig, form };
