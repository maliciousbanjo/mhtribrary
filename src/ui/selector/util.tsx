import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import {
  ItemListRenderer,
  ItemListRendererProps,
  ItemRenderer,
  ItemRendererProps
} from '@blueprintjs/select';
import {
  GetGroupFunction,
  ListGroup,
  SelectedPredicate,
  SelectItem
} from './types';
import React from 'react';
import classNames from 'classnames';

/**
 * @param items List of items to organize
 * @param getGroupCallback Callback function to determine the group of a given item
 * @returns List of items organized by group
 */
export function getListGroups<T>(
  items: T[],
  getGroupCallback: GetGroupFunction<T>
): ListGroup<T>[] {
  return items.reduce<ListGroup<T>[]>((groups, item) => {
    const group = getGroupCallback(item);
    const existingGroup = groups.find(g => g.groupName === group);
    if (existingGroup && existingGroup.groupName === group) {
      existingGroup.items.push(item);
    } else {
      groups.push({
        groupName: group,
        items: [item]
      });
    }
    return groups;
  }, []);
}

/**
 * @internal
 * !should not be used externally
 *
 * Higher-order function to return a default itemRenderer
 */
export function defaultItemRenderer<T extends SelectItem>(
  selectedPredicate: SelectedPredicate<T>
): ItemRenderer<T> {
  return (
    item: T,
    {
      handleClick,
      handleFocus,
      modifiers,
      ref
    }: ItemRendererProps<HTMLLIElement>
  ) => {
    if (!modifiers.matchesPredicate) return null;
    return (
      <MenuItem
        key={item.id}
        ref={ref}
        textClassName="selector__item"
        disabled={modifiers.disabled}
        active={modifiers.active}
        roleStructure="listoption"
        text={item.name}
        onClick={handleClick}
        onFocus={handleFocus}
        selected={selectedPredicate(item)}
      />
    );
  };
}

/**
 * @internal
 * !should not be used externally
 *
 * Higher-order function to return a default itemListRenderer
 */
export function defaultItemListRenderer<T extends SelectItem>(
  getGroupCallback: GetGroupFunction<T>,
  className?: string | undefined
): ItemListRenderer<T> {
  return (listProps: ItemListRendererProps<T>) => {
    const listGroups = getListGroups<T>(
      listProps.filteredItems,
      getGroupCallback
    );

    const content = listGroups.map(listGroup => {
      return (
        <React.Fragment key={listGroup.groupName}>
          <MenuDivider title={listGroup.groupName} />
          {listGroup.items.map((item, index) =>
            listProps.renderItem(item, index)
          )}
        </React.Fragment>
      );
    });

    return (
      <Menu
        {...listProps.menuProps}
        className={classNames(['selector__menu', className ?? ''])}
        role="listbox"
      >
        {content}
      </Menu>
    );
  };
}
