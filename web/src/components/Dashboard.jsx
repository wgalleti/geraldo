import Price from '../api/price.js';
import { useCallback } from 'react';
import Grid from '../components/Grid.jsx';
import { useNavigate } from 'react-router-dom';

const priceModel = new Price();
const dataSource = priceModel.makeCustomStore();

export default function Dashboard() {
  let grid;
  const navigate = useNavigate();

  const goToPrice = useCallback(() => {
    const data = grid.getSelectedRowsData();
    if (data.length == 0) return;
    const { id } = data[0];
    navigate(`/prices/${id}`);
  }, []);

  const gridOptions = {
    onContentReady: e => {
      grid = e.component;
    },
    toolbar: {
      items: [
        {
          widget: 'dxButton',
          location: 'before',
          options: {
            icon: 'edit',
            text: 'Definir preço',
            onClick: () => {
              goToPrice();
            },
          },
        },
        {
          widget: 'dxButton',
          location: 'before',
          options: {
            icon: 'print',
            text: 'Detalhes',
            onClick: () => {
              console.log('details');
            },
          },
        },
      ],
    },
    columns: [
      { dataField: 'company_data.name', caption: 'Empresa' },
      { dataField: 'status', caption: 'Status', visible: false },
      { dataField: 'status_data', caption: 'Status' },
      { dataField: 'priority', caption: 'Prioridade', visible: false },
      { dataField: 'priority_data', caption: 'Prioridade' },
      { dataField: 'duration_time', caption: 'Tempo' },
      { dataField: 'buyer', caption: 'Comprador', visible: false },
      { dataField: 'buyer_data.name', caption: 'Comprador' },
      {
        dataField: 'payment_refer',
        caption: 'Forma de Pagamento',
        visible: false,
      },
      { dataField: 'payment_refer_data.name', caption: 'Forma de Pagamento' },
      {
        dataField: 'items_count',
        caption: 'Itens',
        format: {
          type: 'fixedPoint',
          precision: 0,
        },
      },
      { dataField: 'completed_percent', caption: '% Completo' },
      {
        dataField: 'value_total',
        caption: 'Total',
        format: {
          type: 'fixedPoint',
          precision: 2,
        },
      },
    ],
    editing: {
      allowAdding: false,
      allowUpdating: false,
      allowDeleting: false,
    },
  };

  return (
    <>
      <Grid dataSource={dataSource} gridCustom={gridOptions} />
    </>
  );
}
