import Grid from '../Grid.jsx';
import { useMemo } from 'react';
import { columnsConfig, formConfig } from './config.js';
import PriceItem from '../../api/price.item.js';
import PropTypes from 'prop-types';

const priceItemModel = new PriceItem();

const PriceItemDefault = ({ priceID, loadData, fastFill, readOnly }) => {
  const dataSource = useMemo(
    () => priceItemModel.makeCustomStore({ price: priceID }),
    [priceID]
  );

  const gridOptions = useMemo(() => {
    return {
      height: '72vh',
      onRowUpdated: () => {
        loadData();
      },
      columns: columnsConfig,
      editing: {
        allowAdding: false,
        allowDeleting: false,
        allowUpdating: !readOnly,
        mode: fastFill ? 'batch' : 'popup',
        form: formConfig,
        selectTextOnEditStart: true,
        startEditAction: "click",
      },
    };
  }, [loadData, fastFill]);

  return <Grid dataSource={dataSource} gridCustom={gridOptions} />;
};

PriceItemDefault.propTypes = {
  priceID: PropTypes.string.isRequired,
  loadData: PropTypes.func.isRequired,
  fastFill: PropTypes.bool,
  readOnly: PropTypes.bool,
};

PriceItemDefault.defaultProps = {
  fastFill: false,
  readOnly: false,
};

export { PriceItemDefault };
