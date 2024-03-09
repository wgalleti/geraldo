import { useMemo, useRef } from 'react'
import { DataGrid } from 'devextreme-react'
import { merge } from 'lodash'
import PropTypes from 'prop-types'

const Grid = ({ dataSource = null, gridCustom = {}, title = '' }) => {
  const grid = useRef()
  const gridConfig = useMemo(() => {
    const itemsToolbar = gridCustom?.toolbar?.items || []

    const itemsBaseToolbar = [
      'searchPanel',
      'addRowButton',
      'saveButton',
      'revertButton',
      {
        widget: 'dxButton',
        location: 'before',
        options: {
          icon: 'refresh',
          onClick: () => {
            grid.current.instance.refresh()
          }
        }
      }
    ]

    let base = {
      searchPanel: {
        visible: true,
        searchVisibleColumnsOnly: true,
        width: 300
      },
      loadPanel: {
        enabled: false,
        shading: true,
        shadingColor: 'rgba(255,255,255, 0.7)'
      },
      columnFixing: {
        enable: true
      },
      columnChooser: {
        enabled: true,
        height: 260,
        mode: 'dragAndDrop',
        width: 250
      },
      dateSerializationFormat: 'yyyy-MM-dd',
      focusStateEnabled: true,
      height: '90vh',
      scrolling: {
        mode: 'infinite'
      },
      editing: {
        refreshMode: 'reshape',
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true,
        useIcons: true,
        mode: 'popup',
        popup: {
          height: 'auto',
          width: '80%',
          showTitle: title,
          title: title,
          shadingColor: 'rgba(0,0,0, 0.7)'
        },
        form: {
          focusStateEnabled: true,
          hoverStateEnabled: true,
          activeStateEnabled: true,
          scrollingEnabled: true,
          tabIndex: 0,
          labelLocation: 'top',
          showColonAfterLabel: false,
          showValidationSummary: false,
          colCount: 4
        }
      },
      remoteOperations: {
        filtering: true,
        paging: true
      },
      allowColumnReordering: true,
      showBorders: false,
      showColumnLines: false,
      showRowLines: false,
      rowAlternationEnabled: true,
      columnAutoWidth: true,
      allowColumnResizing: true,
      selection: {
        mode: 'single'
      },
      paging: {
        pageSize: 10
      }
    }

    const merged_data = merge(base, gridCustom)
    merged_data.toolbar = {
      items: [...itemsBaseToolbar, ...itemsToolbar]
    }

    return merged_data
  }, [gridCustom, title])

  return (
    <div>
      <DataGrid dataSource={dataSource} {...gridConfig} ref={grid} />
    </div>
  )
}

Grid.propTypes = {
  dataSource: PropTypes.object.isRequired,
  gridCustom: PropTypes.object,
  title: PropTypes.string
}

export default Grid
