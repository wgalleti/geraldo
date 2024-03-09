import User from '../../api/user.js'
import { useMemo } from 'react'
import Grid from '../../components/Grid.jsx'

const requiredField = { type: 'required', message: 'This field is required' }

const userModel = new User()
const dataSource = userModel.makeCustomStore()
export const UserPage = () => {
  const gridOptions = useMemo(() => {
    return {
      onInitNewRow: (e) => {
        e.data.is_active = true
        e.data.is_supplier = false
        e.data.is_buyer = false
        e.data.is_manager = false
      },
      columns: [
        { dataField: 'id', caption: '#' },
        { dataField: 'username', caption: 'Login' },
        { dataField: 'first_name', caption: 'Nome' },
        {
          dataField: 'last_name',
          caption: 'Sobrenome'
        },
        { dataField: 'email', caption: 'Email' },
        { dataField: 'is_buyer', caption: 'É Comprador', dataType: 'boolean' },
        {
          dataField: 'is_supplier',
          caption: 'É Fornecedor',
          dataType: 'boolean'
        },
        {
          dataField: 'is_manager',
          caption: 'É Administrador',
          dataType: 'boolean'
        },
        { dataField: 'is_active', caption: 'Ativo', dataType: 'boolean' },
        { dataField: 'password', caption: 'Senha', visible: false }
      ],
      editing: {
        form: {
          items: [
            {
              dataField: 'first_name',
              colSpan: 2,
              validationRules: [requiredField]
            },
            {
              dataField: 'last_name',
              colSpan: 2,
              validationRules: [requiredField]
            },
            {
              dataField: 'username',
              colSpan: 1,
              validationRules: [requiredField]
            },

            {
              dataField: 'password',
              colSpan: 1,
              validationRules: [requiredField],
              editorOptions: {
                mode: 'password'
              }
            },
            {
              dataField: 'email',
              colSpan: 2,
              validationRules: [requiredField]
            },
            { dataField: 'is_buyer' },
            { dataField: 'is_supplier' },
            { dataField: 'is_manager' },
            { dataField: 'is_active' }
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
