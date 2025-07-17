import { MonsterLevels, MonsterLevelTypes } from 'mh3-data';
import { useMediaQuery } from 'react-responsive';
import { MonsterSelectorsProps } from '../monster-selectors';
import { LevelSelectorDesktop } from './level-selector-desktop';
import { LevelSelectorMobile } from './level-selector-mobile';
import React from 'react';
import { MonsterParameters } from '../monster-reducer';

export interface LevelSelectorProps
  extends Pick<MonsterSelectorsProps, 'dispatchMonsterParameters'> {
  monsterLevels: MonsterLevelTypes.MonsterLevel[];
  selectedMonsterLevel: MonsterParameters['monsterLevel'];
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

  return isMobile ? (
    <LevelSelectorMobile
      monsterLevels={monsterLevels}
      selectedMonsterLevel={monsterParameters.monsterLevel}
      dispatchMonsterParameters={dispatchMonsterParameters}
    />
  ) : (
    <LevelSelectorDesktop
      monsterLevels={monsterLevels}
      selectedMonsterLevel={monsterParameters.monsterLevel}
      dispatchMonsterParameters={dispatchMonsterParameters}
    />
  );
}
