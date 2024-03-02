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
  colCount: 3,
  readOnly: true,
  items: [
    {
      itemType: 'tabbed',
      tabPanelOptions: {
        height: 260,
      },
      colSpan: 3,
      tabs: [
        {
          title: 'Resumo',
          colCount: 3,
          colSpan: 3,
          items: [
            {
              dataField: 'payment_refer_name',
              label: { text: 'Referência para Pagamento' },
            },
            {
              dataField: 'company_name',
              label: { text: 'Empresa' },
              colSpan: 3,
            },
            { dataField: 'buyer_name', label: { text: 'Comprador' } },
            {
              dataField: 'expire_at',
              label: { text: 'Termina em' },
              colSpan: 1,
              editorType: 'dxDateBox',
              editorOptions: {
                displayFormat: 'dd/MM/yyyy',
              },
            },
            {
              dataField: 'items_count',
              label: { text: 'Itens' },
              colSpan: 1,
            },
            {
              dataField: 'value_total',
              label: { text: 'Total' },
              colSpan: 1,
              editorType: 'dxNumberBox',
              editorOptions: {
                format: {
                  type: 'fixedPoint',
                  precision: 2,
                },
              },
            },
            { dataField: 'duration_time', label: { text: 'Tempo' } },
            {
              dataField: 'started_at',
              label: { text: 'Iniciado em' },
              editorType: 'dxDateBox',
              editorOptions: {
                displayFormat: 'dd/MM/yyyy',
              },
            },
            {
              dataField: 'expire_at',
              label: { text: 'Termina em' },
              editorType: 'dxDateBox',
              editorOptions: {
                displayFormat: 'dd/MM/yyyy',
              },
            },
            {
              dataField: 'completed_percent',
              label: { text: 'Preenchimento', visible: false },
              colSpan: 3,
              editorType: 'dxProgressBar',
              editorOptions: {},
            },
          ],
        },
        {
          title: 'Detalhes',
          colCount: 3,
          colSpan: 3,
          items: [
            {
              dataField: 'payment_name',
              label: { text: 'Forma de Pagamento' },
            },
            { dataField: 'status_data', label: { text: 'Status' } },
            { dataField: 'priority_data', label: { text: 'Prioridade' } },
            {
              dataField: 'recommendation',
              label: { text: 'Recomendações' },
              colSpan: 3,
              itemType: 'dxTextArea',
              editorOptions: {
                height: 80,
              },
            },
          ],
        },
      ],
    },
  ],
};

export { formConfig, form };
