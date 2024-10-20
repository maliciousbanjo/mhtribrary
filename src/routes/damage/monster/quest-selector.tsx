import { ItemRenderer, ItemRendererProps, Select } from '@blueprintjs/select';
import { MonsterSelectorsProps } from './monster-selectors';
import { Monsters, Quests, QuestTypes } from 'mh3-data';
import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';

export function QuestSelector({
  monsterArgs,
  dispatchMonsterArgs
}: MonsterSelectorsProps) {
  const quests = React.useMemo<QuestTypes.Quest[]>(() => {
    const selectedMonster = Monsters.getMonster(monsterArgs.monsterName);
    return Quests.getQuestsWithLargeMonster(selectedMonster.id, 'Both');
  }, [monsterArgs.monsterName]);

  const onSelectQuest = React.useCallback(
    (quest: Quests.QuestTypes.Quest) => {
      dispatchMonsterArgs({
        type: 'QUEST_ID',
        payload: quest.id
      });
    },
    [dispatchMonsterArgs]
  );

  const selectedQuest = React.useMemo(() => {
    return quests.find(quest => quest.id === monsterArgs.questId) ?? quests[0];
  }, [monsterArgs.questId, quests]);

  const itemRenderer = React.useCallback<ItemRenderer<QuestTypes.Quest>>(
    (
      quest: QuestTypes.Quest,
      {
        handleClick,
        handleFocus,
        modifiers,
        ref
      }: ItemRendererProps<HTMLLIElement>
    ) => {
      const label = `${quest.region} ${quest.region === 'City' ? ` - ${quest.rank} Rank` : ''}`;
      return (
        <MenuItem
          key={quest.id}
          textClassName="quest-menu-text"
          onClick={handleClick}
          onFocus={handleFocus}
          disabled={modifiers.disabled}
          active={modifiers.active}
          ref={ref}
          roleStructure="listoption"
          text={quest.name}
          label={label}
          selected={quest.id === selectedQuest.id}
        />
      );
    },
    [selectedQuest.id]
  );

  return (
    <Select<QuestTypes.Quest>
      className="quest-select"
      filterable={false}
      fill
      items={quests}
      disabled={quests.length < 2}
      itemRenderer={itemRenderer}
      onItemSelect={onSelectQuest}
      popoverProps={{ minimal: true }}
      popoverContentProps={{ className: 'quest-select__popover' }}
      menuProps={{}}
    >
      <Button text={selectedQuest.name} disabled={quests.length < 2} />
    </Select>
  );
}
