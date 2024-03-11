import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import {cn} from "../../utils/classname.js";

const Separator = () => {
  return <RadixDropdownMenu.Separator className={cn(
    "bg-black"
  )}/>
}

export { Separator }
