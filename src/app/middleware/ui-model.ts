import { iconMap } from "../ui/icons";

export enum ViewVariant {
    'list',
    'grid',
    
}

export type DataItemProps ={
    iconName?: keyof typeof iconMap; // Restrict iconName to the keys of iconMap
    label?: string; // Name of the item (e.g., Rooms)
    value?: string | number; // Value of the item (e.g., 5)
    variant?: ViewVariant
  }

  export type DataGroupProps = {
    dataItemProps?: DataItemProps[];
    variant?: ViewVariant,
    title?: string,
  };

