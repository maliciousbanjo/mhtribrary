import { MonsterLevels, MonsterLevelTypes } from 'mh3-data';
import { useMediaQuery } from 'react-responsive';
import { MonsterSelectorsProps } from '../monster-selectors';
import { LevelSelectorDesktop } from './level-selector-desktop';
import { LevelSelectorMobile } from './level-selector-mobile';
import React from 'react';
import { MonsterParameters } from '../monster-reducer';
import { OptionProps } from '@blueprintjs/core';

export interface LevelSelectorProps {
  monsterLevelOptions: OptionProps<string>[];
  selectedMonsterLevel: MonsterParameters['monsterLevel'];
  onSelectLevel: (value: string) => void;
}

const DEFAULT_LEVEL: MonsterLevelTypes.MonsterLevel = 0;

/**
 * Responsive component for selecting a monster's level. Will return a different select
 * component depending on device size.
 */
export function LevelSelector({
  monsterParameters,
  dispatchMonsterParameters
}: MonsterSelectorsProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px' });
  const { monsterName, questId } = monsterParameters;

  const monsterLevels = React.useMemo(() => {
    return questId
      ? MonsterLevels.getMonsterLevelsForQuest(monsterName, questId)
      : [DEFAULT_LEVEL];
  }, [monsterName, questId]);

  const monsterLevelOptions = React.useMemo(() => {
    return monsterLevels.map<OptionProps<string>>(level => {
      return {
        value: level.toString()
      };
    });
  }, [monsterLevels]);

  const onSelectLevel = React.useCallback(
    (value: string) => {
      dispatchMonsterParameters({
        type: 'MONSTER_LEVEL',
        payload: parseInt(value) as MonsterLevelTypes.MonsterLevel
      });
    },
    [dispatchMonsterParameters]
  );

  return isMobile ? (
    <LevelSelectorMobile
      monsterLevelOptions={monsterLevelOptions}
      selectedMonsterLevel={monsterParameters.monsterLevel}
      onSelectLevel={onSelectLevel}
    />
  ) : (
    <LevelSelectorDesktop
      monsterLevelOptions={monsterLevelOptions}
      selectedMonsterLevel={monsterParameters.monsterLevel}
      onSelectLevel={onSelectLevel}
    />
  );
}
