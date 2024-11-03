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
import { getMonsterGroups } from './util';

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
        textClassName="select__item select-monster"
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

  const groupedItemRenderer = React.useCallback<
    ItemListRenderer<MonsterTypes.Monster>
  >((listProps: ItemListRendererProps<MonsterTypes.Monster>) => {
    const groupedMonsters = getMonsterGroups(listProps.items);

    const content = groupedMonsters.map(listGroup => {
      return (
        <React.Fragment key={listGroup.groupName}>
          <MenuDivider title={listGroup.groupName} />
          {listGroup.monsters.map(monster =>
            listProps.renderItem(monster, monster.id)
          )}
        </React.Fragment>
      );
    });

    return (
      <Menu
        className="select__menu select-monster"
        role="listbox"
        {...listProps.menuProps}
      >
        {content}
      </Menu>
    );
  }, []);

  return (
    <Select
      fill
      className="select-monster"
      popoverProps={{ minimal: true }}
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
