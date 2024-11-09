import { ItemRenderer, Select, SelectProps } from '@blueprintjs/select';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { GetGroupFunction, SelectedPredicate, SelectItem } from './types';
import { defaultItemListRenderer, defaultItemRenderer } from './util';
import React from 'react';

export interface SelectorProps<T extends SelectItem>
  extends Omit<SelectProps<T>, 'fill' | 'popoverProps' | 'itemRenderer'> {
  /** Should be referentially stable */
  isSelectedPredicate: SelectedPredicate<T>;
  /** If provided, items will be grouped according to this function */
  getGroupCallback?: GetGroupFunction<T>;
  /** Will use a default itemRenderer if not provided */
  itemRenderer?: ItemRenderer<T>;
}

/**
 * Wrapped {@link Select} component that provides a default itemRenderer and itemListRenderer.
 * Renderers can be overriden.
 */
export function Selector<T extends SelectItem>({
  children,
  className,
  items,
  onItemSelect,
  isSelectedPredicate,
  itemRenderer,
  getGroupCallback,
  itemListRenderer,
  ...rest
}: PropsWithChildren<SelectorProps<T>>) {
  const internalItemRenderer = React.useMemo(() => {
    return itemRenderer ?? defaultItemRenderer(isSelectedPredicate);
  }, [isSelectedPredicate, itemRenderer]);

  const internalItemListRenderer = React.useMemo(() => {
    if (!getGroupCallback) return undefined;
    return (
      itemListRenderer ?? defaultItemListRenderer(getGroupCallback, className)
    );
  }, [className, getGroupCallback, itemListRenderer]);

  return (
    <Select<T>
      {...rest}
      fill
      className={classNames(['selector', className])}
      popoverProps={{ minimal: true }}
      items={items}
      itemRenderer={internalItemRenderer}
      itemListRenderer={internalItemListRenderer}
      onItemSelect={onItemSelect}
    >
      {children}
    </Select>
  );
}
