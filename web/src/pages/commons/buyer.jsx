import Buyer from '../../api/buyer.js'
import { useMemo } from 'react'
import Grid from '../../components/Grid.jsx'
import { requiredField } from '../../utils/require.js'

const buyerModel = new Buyer()
const dataSource = buyerModel.makeCustomStore()

export const BuyerPage = () => {
  const gridOptions = useMemo(() => {
    return {
      columns: [
        { dataField: 'id', caption: '#', visible: false },
        { dataField: 'erp_code', caption: 'Código ERP', visible: false },
        { dataField: 'name', caption: 'Nome' },
        { dataField: 'alias', caption: 'Apelido' },
        { dataField: 'email', caption: 'Email' }
      ],
      editing: {
        popup: {
          height: 'auto',
          width: '600'
        },
        form: {
          items: [
            {
              dataField: 'name',
              colSpan: 3,
              validationRules: [requiredField]
            },
            {
              dataField: 'alias',
              colSpan: 1,
              validationRules: [requiredField]
            },
            {
              dataField: 'email',
              colSpan: 4,
              validationRules: [requiredField]
            }
          ]
        }
      }
    }
  }, [])

  return (
    <>
      <Grid dataSource={dataSource} gridCustom={gridOptions} />
    </>
  )
}
