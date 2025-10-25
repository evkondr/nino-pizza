import { cn } from "@/lib/utils";
import { PropsWithClass } from "@/types";
import Categories from "./Categories";
import { Container, SortPopup } from ".";

interface Props extends PropsWithClass{
  categories?: [];
}
const TopBar = ({ className }:Props) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between ">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  )
}

export default TopBar