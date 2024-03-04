
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import PropTypes from "prop-types";

const Item = ({ children, className }) => {
  return (
    <RadixDropdownMenu.Item className={`text-sm tracking-tighter font-light outline-none w-full hover:bg-black/10 hover:scale-110 transition-all p-2 ${className}`}>
      {children}
    </RadixDropdownMenu.Item>
  );
};

Item.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

export { Item }
