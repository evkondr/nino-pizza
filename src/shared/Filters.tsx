'use client'
import { PriceRange, PropsWithClass } from "@/types"
import { FilterCheckbox, RangeSlider, Title } from "."
import { Input } from "@/components/ui/input"
import CheckboxFiltersGroup from "./CheckboxFiltersGroup"
import useIngredientsFilter from "@/hooks/useIngredientsFilter"
import { useState } from "react"

const Filters = ({ className }:PropsWithClass) => {
  const { ingredients, loading } = useIngredientsFilter();
  const ingredientItems = ingredients.map((item) => ({ value: String(item.id), text: item.name }));
  const [ selectedItems, setSelectedItems ] = useState<Set<string>>(new Set());
  const [ priceRange, setPriceRange ] = useState<PriceRange>({ from: 0, to: 1000})
  const onCheckboxClick = (currentValue: string) => {
    if(selectedItems.has(currentValue)) {
      selectedItems.delete(currentValue)
      setSelectedItems(new Set(selectedItems)) 
    } else {
      selectedItems.add(currentValue)
      setSelectedItems(new Set(selectedItems))
    }
  }
  const updatePrice = (priceRangeKey: keyof PriceRange, price: number) => {
    setPriceRange({
      ...priceRange,
      [priceRangeKey]: price
    })
  }
  return (
    <div className={className}>
      <Title text="Фильтрация" size="xs" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox name="test" text="Можно собирать" value="11" />
        <FilterCheckbox name="test" text="Новинки" value="22" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} value={priceRange.from} onChange={(e) => updatePrice('from', Number(e.target.value))} />
          <Input type="number" placeholder="1000" min={100} max={1000} value={priceRange.to} onChange={(e) => updatePrice('to', Number(e.target.value))}/>
        </div>
        <RangeSlider min={0}
          max={1000}
          step={10}
          value={[priceRange.from, priceRange.to]}
          onValueChange={([from, to]) => setPriceRange({ from, to})}
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={3}
        loading={loading}
        defaultItems={ingredientItems.slice(0, 6)}
        items={ingredientItems}
        selected={selectedItems}
        onClickCheckbox={onCheckboxClick}
      />
    </div>
  )
}

export default Filters