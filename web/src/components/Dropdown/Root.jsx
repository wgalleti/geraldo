import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import PropTypes from 'prop-types'

const Root = ({ children }) => {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>
}

Root.propTypes = {
  children: PropTypes.any
}

export { Root }
