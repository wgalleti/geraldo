import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import PropTypes from 'prop-types'

const Content = ({ children, className }) => {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={`bg-white/80 p-4 rounded-md space-y-1 shadown ${className}`}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  )
}

Content.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export { Content }
