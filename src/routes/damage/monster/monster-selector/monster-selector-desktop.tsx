import { Button } from '@blueprintjs/core';
import { MonsterTypes } from 'mh3-data';
import React from 'react';
import { MonsterSelectorProps } from '.';
import { Selector } from '../../../../ui/selector';
import { allMonsters } from '../constants';
import { getMonsterGroup } from './util';
import { ItemListPredicate, ItemPredicate } from '@blueprintjs/select';

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

  const isMonsterSelected = React.useCallback(
    (monster: MonsterTypes.Monster) => monster.name === selectedMonsterName,
    [selectedMonsterName]
  );

  const filterMonsters: ItemPredicate<MonsterTypes.Monster> = React.useCallback(
    (query, monster): boolean => {
      const normalizedMonsterName = monster.name.toLowerCase();
      const normalizedQuery = query.toLowerCase();
      return normalizedMonsterName.indexOf(normalizedQuery) >= 0;
    },
    []
  );

  const itemListPredicate: ItemListPredicate<MonsterTypes.Monster> =
    React.useCallback(
      (query, monsters) => {
        return monsters.filter(monster => filterMonsters(query, monster));
      },
      [filterMonsters]
    );

  return (
    <Selector<MonsterTypes.Monster>
      className="select-monster"
      items={allMonsters}
      onItemSelect={onSelectMonsterName}
      isSelectedPredicate={isMonsterSelected}
      getGroupCallback={getMonsterGroup}
      itemListPredicate={itemListPredicate}
    >
      <Button text={selectedMonsterName} rightIcon="double-caret-vertical" />
    </Selector>
  );
}
