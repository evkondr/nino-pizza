export interface PropsWithClass {
  className?: string
}
export interface FilterCheckBoxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}
export interface CategoryStoreState {
  activeId: number;
  setActiveId: (activeId: number) => void;
}
