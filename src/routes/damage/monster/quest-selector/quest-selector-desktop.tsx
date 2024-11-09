import { Button } from '@blueprintjs/core';
import { ItemListPredicate, ItemPredicate } from '@blueprintjs/select';
import { QuestTypes } from 'mh3-data';
import React from 'react';
import { QuestSelectorProps } from '.';
import { Selector } from '../../../../ui/selector';
import { getQuestGroup } from './util';

/**
 * Quest selector for desktop screen sizes
 */
export function QuestSelectorDesktop({
  quests,
  selectedQuest,
  dispatchMonsterArgs
}: QuestSelectorProps) {
  const onSelectQuest = React.useCallback(
    (quest: QuestTypes.Quest) => {
      dispatchMonsterArgs({
        type: 'QUEST_ID',
        payload: quest.id
      });
    },
    [dispatchMonsterArgs]
  );

  const isQuestSelected = React.useCallback(
    (quest: QuestTypes.Quest) => quest.id === selectedQuest.id,
    [selectedQuest.id]
  );

  const filterQuests: ItemPredicate<QuestTypes.Quest> = React.useCallback(
    (query, quest) => {
      const normalizedQuestName = quest.name.toLowerCase();
      const normalizedQuery = query.toLowerCase();

      return normalizedQuestName.indexOf(normalizedQuery) >= 0;
    },
    []
  );

  const itemListPredicate: ItemListPredicate<QuestTypes.Quest> =
    React.useCallback(
      (query, quests) => {
        return quests.filter(quest => filterQuests(query, quest));
      },
      [filterQuests]
    );

  return (
    <Selector<QuestTypes.Quest>
      className="select-quest"
      items={quests}
      disabled={quests.length < 2}
      onItemSelect={onSelectQuest}
      isSelectedPredicate={isQuestSelected}
      getGroupCallback={getQuestGroup}
      itemListPredicate={itemListPredicate}
    >
      <Button
        text={selectedQuest.name}
        disabled={quests.length < 2}
        rightIcon="double-caret-vertical"
      />
    </Selector>
  );
}
