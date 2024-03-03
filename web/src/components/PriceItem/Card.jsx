import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/format";

const PriceItemCard = ({ value, text, noDigits }) => {
  return (
    <div className='flex flex-col h-20  min-w-48 flex-1 border border-gray-700 border-dashed justify-between items-center px-4 py-2 rounded-lg truncate overflow-hidden text-ellipsis'>
      <span className='text-3xl font-thin text-white tracking-tighter'>{formatCurrency(value, noDigits)}</span>
      <strong className='uppercase text-sx text-gray-600 font-thin'>{text}</strong>
    </div>
  )
}
PriceItemCard.defaultProps = {
  noDigits: false
}

PriceItemCard.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  noDigits: PropTypes.bool,
}

export { PriceItemCard };
