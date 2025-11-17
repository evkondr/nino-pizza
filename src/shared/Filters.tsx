'use client'
import { PriceRange, PropsWithClass } from "@/types"
import { FilterCheckbox, RangeSlider, Title } from "."
import { Input } from "@/components/ui/input"
import CheckboxFiltersGroup from "./CheckboxFiltersGroup"
import useIngredientsFilter from "@/hooks/useIngredientsFilter"
import { useFilters } from "@/hooks/useFilters"

const Filters = ({ className }:PropsWithClass) => {
  const { ingredients, loading } = useIngredientsFilter();
  const ingredientItems = ingredients.map((item) => ({ value: String(item.id), text: item.name }));
  const filters = useFilters();
  const updatePrices = (pricesRange:[number, number]) => {
    filters.setPrices('from', pricesRange[0]);
    filters.setPrices('to', pricesRange[1]);
  }
  return (
    <div className={className}>
      <Title text="Фильтрация" size="xs" className="mb-5 font-bold" />
      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />
      <div className="flex flex-col gap-4">
        <FilterCheckbox name="test" text="Можно собирать" value="11" />
        <FilterCheckbox name="test" text="Новинки" value="22" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} value={filters.prices.from} onChange={(e) => filters.setPrices('from', Number(e.target.value))} />
          <Input type="number" placeholder="1000" min={100} max={1000} value={filters.prices.to} onChange={(e) => filters.setPrices('to', Number(e.target.value))}/>
        </div>
        <RangeSlider min={0}
          max={1000}
          step={10}
          value={[filters.prices.from, filters.prices.to]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFiltersGroup
        name="ingredients"
        title="Ингредиенты"
        className="mt-5"
        limit={3}
        loading={loading}
        defaultItems={ingredientItems.slice(0, 6)}
        items={ingredientItems}
        selected={filters.selectedIngredients}
        onClickCheckbox={filters.setSelectedIngredients}
      />
    </div>
  )
}

export default Filters