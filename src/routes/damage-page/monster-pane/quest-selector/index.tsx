import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { MonsterSelectorsProps } from '../monster-selectors';
import { QuestSelectorMobile } from './quest-selector-mobile';
import { QuestSelectorDesktop } from './quest-selector-desktop';
import { Monsters, Quests, QuestTypes } from 'mh3-data';

export interface QuestSelectorProps
  extends Pick<MonsterSelectorsProps, 'dispatchMonsterParameters'> {
  selectedQuest: Quests.QuestTypes.Quest;
  quests: Quests.QuestTypes.Quest[];
}

/**
 * Responsisve component, will return a different select component
 * depending on device size
 */
export function QuestSelector({
  monsterParameters,
  dispatchMonsterParameters
}: MonsterSelectorsProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const quests = React.useMemo<QuestTypes.Quest[]>(() => {
    const selectedMonster = Monsters.getMonster(monsterParameters.monsterName);
    return Quests.getQuestsWithLargeMonster(selectedMonster.id, 'Both');
  }, [monsterParameters.monsterName]);

  const selectedQuest = React.useMemo(() => {
    return (
      quests.find(quest => quest.id === monsterParameters.questId) ?? quests[0]
    );
  }, [monsterParameters.questId, quests]);

  return isMobile ? (
    <QuestSelectorMobile
      selectedQuest={selectedQuest}
      quests={quests}
      dispatchMonsterParameters={dispatchMonsterParameters}
    />
  ) : (
    <QuestSelectorDesktop
      selectedQuest={selectedQuest}
      quests={quests}
      dispatchMonsterParameters={dispatchMonsterParameters}
    />
  );
}
