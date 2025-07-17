import { HTMLSelect } from '@blueprintjs/core';
import { LevelSelectorProps } from '.';
import React from 'react';
import { MonsterLevelTypes } from 'mh3-data';

export function LevelSelectorMobile({
  monsterLevels,
  selectedMonsterLevel,
  dispatchMonsterParameters
}: LevelSelectorProps) {
  const levelOptions = React.useMemo(
    () =>
      monsterLevels.map<JSX.Element>(level => (
        <option key={level} label={level.toString()}>
          {level}
        </option>
      )),
    [monsterLevels]
  );

  const onChangeLevel = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      dispatchMonsterParameters({
        type: 'MONSTER_LEVEL',
        payload: parseInt(target.value) as MonsterLevelTypes.MonsterLevel
      });
    },
    [dispatchMonsterParameters]
  );

  return (
    <HTMLSelect
      id="select-level__mobile"
      value={selectedMonsterLevel}
      onChange={onChangeLevel}
      disabled={monsterLevels.length < 2}
    >
      {levelOptions}
    </HTMLSelect>
  );
}
