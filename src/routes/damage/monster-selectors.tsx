import { HTMLSelect, OptionProps } from '@blueprintjs/core';
import { Monsters, MonsterTypes, Quests } from 'mh3-data';
import React from 'react';

interface MonsterSelectorsProps {
  selectedMonsterName: MonsterTypes.MonsterName;
  setSelectedMonsterName: React.Dispatch<
    React.SetStateAction<MonsterTypes.MonsterName>
  >;

  selectedMonsterState: number;
  setSelectedMonsterState: React.Dispatch<React.SetStateAction<number>>;

  selectedQuestId: number;
  setSelectedQuestId: React.Dispatch<React.SetStateAction<number>>;
}

export function MonsterSelectors({
  selectedMonsterName,
  setSelectedMonsterName,
  selectedMonsterState,
  setSelectedMonsterState,
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
      setSelectedMonsterState(0);
      setSelectedQuestId(-1);
    },
    [setSelectedMonsterState, setSelectedMonsterName, setSelectedQuestId]
  );

  /**
   * Different hitzoneGroups based on monster state (flying, muddy, enraged, etc)
   */
  const monsterStates = React.useMemo(() => {
    const selectedMonster = Monsters.getMonster(selectedMonsterName);

    return (
      selectedMonster?.monsterStates.map<OptionProps<number>>(
        (monsterState, index) => ({
          value: index,
          label: monsterState.name
        })
      ) ?? []
    );
  }, [selectedMonsterName]);

  const onChangeMonsterState = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedMonsterState(parseInt(target.value));
    },
    [setSelectedMonsterState]
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
    if (selectedQuestId === -1 && questOptions.length > 0) {
      setSelectedQuestId(questOptions[0].value);
    }
  }, [questOptions, selectedQuestId, setSelectedQuestId]);

  return (
    <div className="monster">
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
          value={selectedMonsterState}
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