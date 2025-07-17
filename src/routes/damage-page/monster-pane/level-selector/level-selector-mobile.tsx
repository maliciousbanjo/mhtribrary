import { HTMLSelect } from '@blueprintjs/core';
import React from 'react';
import { LevelSelectorProps } from '.';

export function LevelSelectorMobile({
  monsterLevelOptions,
  selectedMonsterLevel,
  onSelectLevel
}: LevelSelectorProps) {
  const onChangeLevel = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      onSelectLevel(target.value);
    },
    [onSelectLevel]
  );

  return (
    <HTMLSelect
      id="select-level__mobile"
      value={selectedMonsterLevel}
      onChange={onChangeLevel}
      options={monsterLevelOptions}
      disabled={monsterLevelOptions.length < 2}
    />
  );
}
