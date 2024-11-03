import { HTMLSelect } from '@blueprintjs/core';
import React from 'react';
import { QuestSelectorProps } from '.';
import { getListGroups } from '../../../../ui/selector';
import { getQuestGroup } from './util';

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
    const groupedQuests = getListGroups(quests, getQuestGroup);

    return groupedQuests.map<JSX.Element>(listGroup => (
      <React.Fragment key={listGroup.groupName}>
        <optgroup label={listGroup.groupName}>
          {listGroup.items.map(quest => (
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
