import { HTMLSelect, OptionProps } from '@blueprintjs/core';
import { Monsters, MonsterTypes, Quests } from 'mh3-data';
import React from 'react';

interface MonsterSelectorsProps {
  selectedMonsterName: MonsterTypes.MonsterName;
  setSelectedMonsterName: React.Dispatch<
    React.SetStateAction<MonsterTypes.MonsterName>
  >;

  selectedMonsterHitzoneGroup: number;
  setSelectedMonsterHitzoneGroup: React.Dispatch<React.SetStateAction<number>>;

  selectedQuestId: number | undefined;
  setSelectedQuestId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function MonsterSelectors({
  selectedMonsterName,
  setSelectedMonsterName,
  selectedMonsterHitzoneGroup,
  setSelectedMonsterHitzoneGroup,
  selectedQuestId,
  setSelectedQuestId
}: MonsterSelectorsProps) {
  const allMonsters = React.useMemo(
    () => Monsters.SmallMonsterData.concat(Monsters.LargeMonsterData),
    []
  );

  const monsterOptions = React.useMemo<OptionProps<string>[]>(() => {
    return allMonsters.map(mon => {
      return {
        value: mon.name
      };
    });
  }, [allMonsters]);

  /**
   * Change handler for selected monster
   * Resets {@link selectedMonsterHitzoneGroup} and {@link selectedQuestId} when changed
   */
  const onChangeMonsterName = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedMonsterName(target.value as MonsterTypes.MonsterName);
      setSelectedMonsterHitzoneGroup(0);
      setSelectedQuestId(undefined);
    },
    [setSelectedMonsterHitzoneGroup, setSelectedMonsterName, setSelectedQuestId]
  );

  /**
   * Different hitzoneGroups based on monster state (flying, muddy, enraged, etc)
   */
  const monsterStates = React.useMemo(() => {
    const selectedMonster = Monsters.getMonster(selectedMonsterName);

    return (
      selectedMonster?.hitzoneGroups.map<OptionProps<number>>(
        (hitGroup, index) => ({
          value: index,
          label: hitGroup.name
        })
      ) ?? []
    );
  }, [selectedMonsterName]);

  const onChangeMonsterState = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedMonsterHitzoneGroup(parseInt(target.value));
    },
    [setSelectedMonsterHitzoneGroup]
  );

  const questOptions = React.useMemo(() => {
    const selectedMonster = Monsters.getMonster(selectedMonsterName);
    return Quests.getQuestsWithLargeMonster(selectedMonster.id, 'Both').map<
      OptionProps<number>
    >(quest => {
      return {
        label: quest.name,
        value: quest.id
      };
    });
  }, [selectedMonsterName]);

  const onChangeQuest = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedQuestId(parseInt(target.value));
    },
    [setSelectedQuestId]
  );

  /**
   * Set the initial/default quest ID when the selected monster has changed
   */
  React.useEffect(() => {
    if (selectedQuestId === undefined && questOptions.length > 0) {
      console.log('useEffect');
      setSelectedQuestId(questOptions[0].value);
    }
  }, [questOptions, selectedQuestId, setSelectedQuestId]);

  return (
    <div>
      <HTMLSelect
        className="select select-monster"
        options={monsterOptions}
        value={selectedMonsterName}
        onChange={onChangeMonsterName}
      />

      {/* Monster State (sometimes) */}
      {monsterStates.length > 1 && (
        <HTMLSelect
          className="select select-monster-state"
          options={monsterStates}
          value={selectedMonsterHitzoneGroup}
          onChange={onChangeMonsterState}
        />
      )}

      {/* Quest */}
      {questOptions.length !== 0 && (
        <HTMLSelect
          className="select select-quest"
          options={questOptions}
          onChange={onChangeQuest}
          disabled={questOptions.length < 2}
        />
      )}

      {/* // TODO: Display read-only defense/stagger multipliers */}
    </div>
  );
}
