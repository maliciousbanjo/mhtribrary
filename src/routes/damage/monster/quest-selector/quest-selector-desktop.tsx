import { Button } from '@blueprintjs/core';
import { Quests, QuestTypes } from 'mh3-data';
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
    (quest: Quests.QuestTypes.Quest) => {
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

  return (
    <Selector<QuestTypes.Quest>
      className="select-quest"
      items={quests}
      disabled={quests.length < 2}
      onItemSelect={onSelectQuest}
      isSelectedCallback={isQuestSelected}
      getGroupCallback={getQuestGroup}
    >
      <Button
        text={selectedQuest.name}
        disabled={quests.length < 2}
        rightIcon="double-caret-vertical"
      />
    </Selector>
  );
}
