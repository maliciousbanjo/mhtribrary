import { HTMLSelect } from '@blueprintjs/core';
import { Monsters, MonsterTypes } from 'mh3-data';
import React from 'react';
import { MonsterSelectorProps } from '.';

/**
 * Monster selector for mobile screen sizes
 */
export function MonsterSelectorMobile({
  selectedMonsterName,
  dispatchMonsterArgs
}: MonsterSelectorProps) {
  const onChangeMonsterName = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      dispatchMonsterArgs({
        type: 'MONSTER_NAME',
        payload: target.value as MonsterTypes.MonsterName
      });
    },
    [dispatchMonsterArgs]
  );

  const groupedMonsters = React.useMemo(() => {
    // small monsters
    const smMonsterOptions = Monsters.SmallMonsterData.map(smMon => (
      <option key={smMon.id}>{smMon.name}</option>
    ));

    // large monsters
    const lgMonsterOptions = Monsters.LargeMonsterData.map(lgMon => (
      <option key={lgMon.id}>{lgMon.name}</option>
    ));

    return (
      <>
        <optgroup label={'Large'}>{lgMonsterOptions}</optgroup>
        <optgroup label={'Small'}>{smMonsterOptions}</optgroup>
      </>
    );
  }, []);

  return (
    <HTMLSelect
      id="select-monster"
      value={selectedMonsterName}
      onChange={onChangeMonsterName}
    >
      {groupedMonsters}
    </HTMLSelect>
  );
}
