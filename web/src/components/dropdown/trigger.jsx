import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import PropTypes from 'prop-types'

const Trigger = ({ children }) => {
  return (
    <RadixDropdownMenu.Trigger className='outline-none'>
      {children}
    </RadixDropdownMenu.Trigger>
  )
}

Trigger.propTypes = {
  children: PropTypes.any
}

export { Trigger }
