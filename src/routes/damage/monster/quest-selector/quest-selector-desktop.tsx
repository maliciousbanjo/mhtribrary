import { Button, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import {
  ItemListRenderer,
  ItemListRendererProps,
  ItemRenderer,
  ItemRendererProps,
  Select
} from '@blueprintjs/select';
import { Quests, QuestTypes } from 'mh3-data';
import React from 'react';
import { getQuestGroups } from './util';
import { QuestSelectorProps } from '.';

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

  const itemRenderer = React.useCallback<ItemRenderer<QuestTypes.Quest>>(
    (
      quest: QuestTypes.Quest,
      {
        handleClick,
        handleFocus,
        modifiers,
        ref
      }: ItemRendererProps<HTMLLIElement>
    ) => (
      <MenuItem
        key={quest.id}
        ref={ref}
        textClassName="quest-menu-text"
        onClick={handleClick}
        onFocus={handleFocus}
        disabled={modifiers.disabled}
        active={modifiers.active}
        roleStructure="listoption"
        text={quest.name}
        selected={quest.id === selectedQuest.id}
      />
    ),
    [selectedQuest.id]
  );

  const groupedItemRenderer = React.useCallback<
    ItemListRenderer<QuestTypes.Quest>
  >((listProps: ItemListRendererProps<Quests.QuestTypes.Quest>) => {
    const groupedQuests = getQuestGroups(listProps.items);

    const content = groupedQuests.map(listGroup => {
      return (
        <React.Fragment key={listGroup.groupName}>
          <MenuDivider title={listGroup.groupName} />
          {listGroup.quests.map(quest => listProps.renderItem(quest, quest.id))}
        </React.Fragment>
      );
    });

    return (
      <Menu
        className="quest-select__menu"
        role="listbox"
        {...listProps.menuProps}
      >
        {content}
      </Menu>
    );
  }, []);

  return (
    <Select<QuestTypes.Quest>
      className="quest-select"
      filterable={false}
      fill
      items={quests}
      disabled={quests.length < 2}
      itemRenderer={itemRenderer}
      itemListRenderer={groupedItemRenderer}
      onItemSelect={onSelectQuest}
      popoverProps={{ minimal: true }}
      popoverContentProps={{ className: 'quest-select__popover' }}
    >
      <Button text={selectedQuest.name} disabled={quests.length < 2} />
    </Select>
  );
}
