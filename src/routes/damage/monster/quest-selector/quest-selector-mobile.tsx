import { HTMLSelect } from '@blueprintjs/core';
import React from 'react';
import { QuestSelectorProps } from '.';
import { getQuestGroups } from './util';

/**
 * Quest selector for mobile screen sizes
 */
export function QuestSelectorMobile({
  quests,
  selectedQuest,
  dispatchMonsterArgs
}: QuestSelectorProps) {
  const onChangeQuest = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      dispatchMonsterArgs({
        type: 'QUEST_ID',
        payload: parseInt(target.value)
      });
    },
    [dispatchMonsterArgs]
  );

  const questOptionGroups = React.useMemo(() => {
    const groupedQuests = getQuestGroups(quests);

    return groupedQuests.map<JSX.Element>(listGroup => (
      <React.Fragment key={listGroup.groupName}>
        <optgroup label={listGroup.groupName}>
          {listGroup.quests.map(quest => (
            <option key={quest.id} label={quest.name}>
              {quest.id}
            </option>
          ))}
        </optgroup>
      </React.Fragment>
    ));
  }, [quests]);

  return (
    <HTMLSelect
      id="select-quest"
      value={selectedQuest.id}
      onChange={onChangeQuest}
      disabled={quests.length < 2}
    >
      {questOptionGroups}
    </HTMLSelect>
  );
}
