import { cn } from "@/lib/utils";
import { PropsWithClass } from "@/types";
import Categories from "./Categories";
import { Container, SortPopup } from ".";
import { Prisma } from "@/generated/prisma";

type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: {
    products: true
  }
}>
interface Props extends PropsWithClass{
  categories: CategoryWithProducts[];
}
const TopBar = ({ categories, className }:Props) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between ">
        <Categories items={categories.filter((item) => item.products.length > 0)}/>
        <SortPopup />
      </Container>
    </div>
  );
};

export default TopBar;