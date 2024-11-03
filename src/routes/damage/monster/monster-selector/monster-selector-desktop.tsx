import { Button } from '@blueprintjs/core';
import { MonsterTypes } from 'mh3-data';
import React from 'react';
import { MonsterSelectorProps } from '.';
import { Selector } from '../../../../ui/selector';
import { allMonsters } from '../constants';
import { getMonsterGroup } from './util';

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

  return (
    <Selector<MonsterTypes.Monster>
      items={allMonsters}
      onItemSelect={onSelectMonsterName}
      isSelectedCallback={isMonsterSelected}
      getGroupCallback={getMonsterGroup}
    >
      <Button text={selectedMonsterName} />
    </Selector>
  );
}
