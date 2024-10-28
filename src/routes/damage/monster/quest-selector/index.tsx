import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { MonsterSelectorsProps } from '../monster-selectors';
import { QuestSelectorMobile } from './quest-selector-mobile';
import { QuestSelectorDesktop } from './quest-selector-desktop';
import { Monsters, Quests, QuestTypes } from 'mh3-data';

export interface QuestSelectorProps
  extends Pick<MonsterSelectorsProps, 'dispatchMonsterArgs'> {
  selectedQuest: Quests.QuestTypes.Quest;
  quests: Quests.QuestTypes.Quest[];
}

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

  const selectedQuest = React.useMemo(() => {
    return quests.find(quest => quest.id === monsterArgs.questId) ?? quests[0];
  }, [monsterArgs.questId, quests]);

  return isMobile ? (
    <QuestSelectorMobile
      selectedQuest={selectedQuest}
      quests={quests}
      dispatchMonsterArgs={dispatchMonsterArgs}
    />
  ) : (
    <QuestSelectorDesktop
      selectedQuest={selectedQuest}
      quests={quests}
      dispatchMonsterArgs={dispatchMonsterArgs}
    />
  );
}
