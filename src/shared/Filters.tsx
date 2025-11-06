'use client'
import { PropsWithClass } from "@/types"
import { FilterCheckbox, RangeSlider, Title } from "."
import { Input } from "@/components/ui/input"
import CheckboxFiltersGroup from "./CheckboxFiltersGroup"

const Filters = ({ className }:PropsWithClass) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="xs" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} />
          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>
        <RangeSlider min={0}
          max={1000}
          step={10}
          value={[0, 1000]} />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={3}
        defaultItems={[
          {
            text: 'Томаты',
            value: '1'
          },
          {
            text: 'Красный лук',
            value: '2'
          },
          {
            text: 'Сырный соус',
            value: '3'
          },
          {
            text: 'Моццарелла',
            value: '4'
          },
          {
            text: 'Соленный огурчик',
            value: '5'
          },
        ]}
        items={[
          {
            text: 'Томаты',
            value: '1'
          },
          {
            text: 'Красный лук',
            value: '2'
          },
          {
            text: 'Сырный соус',
            value: '3'
          },
          {
            text: 'Моццарелла',
            value: '4'
          },
          {
            text: 'Соленный огурчик',
            value: '5'
          },
        ]}
      />
    </div>
  )
}

export default Filters