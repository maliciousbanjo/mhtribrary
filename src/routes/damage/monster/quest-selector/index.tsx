import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { MonsterSelectorsProps } from '../monster-selectors';
import { QuestSelectorMobile } from './quest-selector-mobile';
import { QuestSelectorDesktop } from './quest-selector-desktop';
import { Monsters, Quests, QuestTypes } from 'mh3-data';

/**
 * Responsisve component, will return a different select component
 * depending on device size
 */
export function QuestSelector({
  monsterArgs,
  dispatchMonsterArgs
}: MonsterSelectorsProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const quests = React.useMemo<QuestTypes.Quest[]>(() => {
    const selectedMonster = Monsters.getMonster(monsterArgs.monsterName);
    return Quests.getQuestsWithLargeMonster(selectedMonster.id, 'Both');
  }, [monsterArgs.monsterName]);

  return isMobile ? (
    <QuestSelectorMobile
      quests={quests}
      dispatchMonsterArgs={dispatchMonsterArgs}
    />
  ) : (
    <QuestSelectorDesktop
      monsterArgs={monsterArgs}
      quests={quests}
      dispatchMonsterArgs={dispatchMonsterArgs}
    />
  );
}
