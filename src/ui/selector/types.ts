export interface ListGroup<T> {
  groupName: string;
  items: T[];
}

export type GetGroupFunction<T> = (item: T) => string;

export type SelectedPredicate<T extends SelectItem> = (item: T) => boolean;

export interface SelectItem {
  id: number | string;
  name: string;
}
