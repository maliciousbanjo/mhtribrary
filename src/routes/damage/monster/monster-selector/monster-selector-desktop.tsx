import { Button, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import {
  ItemListRenderer,
  ItemListRendererProps,
  ItemRenderer,
  ItemRendererProps,
  Select
} from '@blueprintjs/select';
import { MonsterTypes } from 'mh3-data';
import React from 'react';
import { MonsterSelectorProps } from '.';
import { allMonsters } from '../constants';

/**
 * Monster selector for desktop screen sizes
 */
export function MonsterSelectorDesktop({
  selectedMonsterName,
  dispatchMonsterArgs
}: MonsterSelectorProps) {
  const onSelectMonsterName = React.useCallback(
    (monster: MonsterTypes.Monster) => {
      dispatchMonsterArgs({
        type: 'MONSTER_NAME',
        payload: monster.name
      });
    },
    [dispatchMonsterArgs]
  );

  const itemRenderer = React.useCallback<ItemRenderer<MonsterTypes.Monster>>(
    (
      monster: MonsterTypes.Monster,
      {
        handleClick,
        handleFocus,
        modifiers,
        ref
      }: ItemRendererProps<HTMLLIElement>
    ) => (
      <MenuItem
        key={monster.id}
        ref={ref}
        textClassName="select-monster-item" // TODO: not needed, unified convention?
        onClick={handleClick}
        onFocus={handleFocus}
        disabled={modifiers.disabled}
        active={modifiers.active}
        roleStructure="listoption"
        text={monster.name}
        selected={monster.name === selectedMonsterName}
      />
    ),
    [selectedMonsterName]
  );

  // TODO: Group monsters
  const groupedItemRenderer = React.useCallback<
    ItemListRenderer<MonsterTypes.Monster>
  >((listProps: ItemListRendererProps<MonsterTypes.Monster>) => {
    const content = listProps.items.map(monster =>
      listProps.renderItem(monster, monster.id)
    );

    return (
      <Menu
        className="select-monster__menu"
        role="listbox"
        {...listProps.menuProps}
      >
        <MenuDivider title={'TESTING'} />
        {content}
      </Menu>
    );
  }, []);

  return (
    <Select
      fill
      className="select-monster"
      popoverProps={{ minimal: true }}
      popoverContentProps={{ className: 'select-monster__popover' }}
      filterable={false}
      items={allMonsters}
      onItemSelect={onSelectMonsterName}
      itemRenderer={itemRenderer}
      itemListRenderer={groupedItemRenderer}
    >
      <Button text={selectedMonsterName} />
    </Select>
  );
}
