import Grid from '../Grid.jsx'
import { useMemo } from 'react'
import { columnsConfig, formConfig } from './config.js'
import PriceItem from '../../api/price.item.js'
import PropTypes from 'prop-types'
import { useDiscount } from '../../hooks/useDiscount.js'

const priceItemModel = new PriceItem()

const PriceItemDefault = ({ priceID, loadData, fastFill, readOnly }) => {
  const dataSource = useMemo(
    () => priceItemModel.makeCustomStore({ price: priceID }),
    [priceID]
  )
  const { isVisible } = useDiscount()

  const gridOptions = useMemo(() => {
    return {
      height: '72vh',
      onRowUpdated: () => {
        loadData()
      },
      columns: columnsConfig,
      columnHidingEnabled: true,
      editing: {
        allowAdding: false,
        allowDeleting: false,
        allowUpdating: !readOnly,
        mode: fastFill ? 'batch' : 'popup',
        form: formConfig,
        selectTextOnEditStart: true,
        startEditAction: 'click'
      }
    }
  }, [loadData, fastFill])

  return (
    <Grid
      dataSource={dataSource}
      gridCustom={gridOptions}
      forceRefresh={!isVisible}
    />
  )
}

PriceItemDefault.propTypes = {
  priceID: PropTypes.string.isRequired,
  loadData: PropTypes.func.isRequired,
  fastFill: PropTypes.bool,
  readOnly: PropTypes.bool
}

PriceItemDefault.defaultProps = {
  fastFill: false,
  readOnly: false
}

export { PriceItemDefault }
