import { MonsterLevelTypes } from 'mh3-data';
import { LevelSelectorProps } from '.';
import { Selector } from '../../../../ui/selector';
import { Button } from '@blueprintjs/core';
import React from 'react';
import { ItemListPredicate, ItemPredicate } from '@blueprintjs/select';

interface MonsterLevelSelectItem {
  id: MonsterLevelTypes.MonsterLevel;
  name: string;
}

export function LevelSelectorDesktop({
  monsterLevels,
  selectedMonsterLevel,
  dispatchMonsterParameters
}: LevelSelectorProps) {
  const onSelectLevel = React.useCallback(
    (levelItem: MonsterLevelSelectItem) => {
      dispatchMonsterParameters({
        type: 'MONSTER_LEVEL',
        payload: levelItem.id
      });
    },
    [dispatchMonsterParameters]
  );

  const isLevelSelected = React.useCallback(
    (levelItem: MonsterLevelSelectItem) =>
      levelItem.id === selectedMonsterLevel,
    [selectedMonsterLevel]
  );

  const levelSelectItems = React.useMemo<MonsterLevelSelectItem[]>(
    () =>
      monsterLevels.map<MonsterLevelSelectItem>(level => ({
        id: level,
        name: level.toString()
      })),
    [monsterLevels]
  );

  const filterLevelItems: ItemPredicate<MonsterLevelSelectItem> =
    React.useCallback((query, levelItem) => {
      // levelItem.name should be a number.toString(), so there shouldn't be a need to normalize it
      return levelItem.name.indexOf(query) >= 0;
    }, []);

  const itemListPredicate: ItemListPredicate<MonsterLevelSelectItem> =
    React.useCallback(
      (query, levelItems) => {
        return levelItems.filter(item => filterLevelItems(query, item));
      },
      [filterLevelItems]
    );

  return (
    <Selector<MonsterLevelSelectItem>
      className="select-level"
      items={levelSelectItems}
      disabled={levelSelectItems.length < 2} // Disabled if there's less than 2 items
      onItemSelect={onSelectLevel}
      isSelectedPredicate={isLevelSelected}
      itemListPredicate={itemListPredicate}
    >
      <Button
        text={selectedMonsterLevel}
        disabled={levelSelectItems.length < 2}
        endIcon="double-caret-vertical"
      />
    </Selector>
  );
}
