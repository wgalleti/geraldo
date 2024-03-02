
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import PropTypes from "prop-types";

const Item = ({ children, className }) => {
  return (
    <RadixDropdownMenu.Item className={`text-sm tracking-tighter font-light ${className}`}>
      {children}
    </RadixDropdownMenu.Item>
  );
};

Item.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

export { Item }
