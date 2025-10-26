import { PropsWithClass } from "@/types"
import { FilterCheckbox, Title } from "."

const Filters = ({ className }:PropsWithClass) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="xs" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>
    </div>
  )
}

export default Filters