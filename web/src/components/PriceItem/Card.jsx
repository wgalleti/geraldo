import PropTypes from 'prop-types'
import { formatCurrency } from '../../utils/format'
import { cn } from '../../utils/classname.js'

const PriceItemCard = ({
  value,
  text,
  noDigits,
  highlight,
  negative,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col h-20 min-w-48 flex-1',
        'border border-gray-700 border-dashed',
        'justify-between items-center',
        'px-4 py-2 rounded-lg truncate overflow-hidden text-ellipsis',
        'text-gray-400',
        'hover:border-purple-500 transition-all duration-300 ease-in-out',
        onClick && 'cursor-pointer',
        negative && 'text-rose-400'
      )}
    >
      <span
        className={cn(
          'text-3xl font-thin tracking-tighter',
          highlight && 'font-bold'
        )}
      >
        {formatCurrency(value, noDigits)}
      </span>
      <strong className='antialiased text-sm tracking-tighter text-gray-500 font-thin hover:text-purple-500 '>
        {text}
      </strong>
    </div>
  )
}
PriceItemCard.defaultProps = {
  noDigits: false,
  highlight: false,
  negative: false
}

PriceItemCard.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  noDigits: PropTypes.bool,
  highlight: PropTypes.bool,
  negative: PropTypes.bool,
  onClick: PropTypes.func
}

export { PriceItemCard }
