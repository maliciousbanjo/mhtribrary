import { FormGroup, HTMLSelect, OptionProps } from '@blueprintjs/core';
import { DamageTypes, Monsters, MonsterTypes, Quests } from 'mh3-data';
import React from 'react';
import { HitzoneTable } from '../hitzone-table';
import { monsterOptions } from './constants';
import { MonsterArgReducerAction } from './monster-reducer';

interface MonsterSelectorsProps {
  monsterArgs: DamageTypes.MonsterArgs;
  dispatchMonsterArgs: React.Dispatch<MonsterArgReducerAction>;
}

export function MonsterSelectors({
  monsterArgs,
  dispatchMonsterArgs
}: MonsterSelectorsProps) {
  /**
   * Change handler for selected monster
   * Resets {@link selectedMonsterHitzoneGroup} and {@link selectedQuestId} when changed
   */
  const onChangeMonsterName = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      dispatchMonsterArgs({
        type: 'MONSTER_NAME',
        payload: target.value as MonsterTypes.MonsterName
      });
    },
    [dispatchMonsterArgs]
  );

  /**
   * Different hitzoneGroups based on monster state (flying, muddy, enraged, etc)
   */
  const monsterStates = React.useMemo(() => {
    const selectedMonster = Monsters.getMonster(monsterArgs.monsterName);

    return (
      selectedMonster?.monsterStates.map<OptionProps<number>>(
        (monsterState, index) => ({
          value: index,
          label: monsterState.name
        })
      ) ?? []
    );
  }, [monsterArgs.monsterName]);

  const onChangeMonsterState = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      dispatchMonsterArgs({
        type: 'MONSTER_STATE_INDEX',
        payload: parseInt(target.value)
      });
    },
    [dispatchMonsterArgs]
  );

  const questOptions = React.useMemo(() => {
    const selectedMonster = Monsters.getMonster(monsterArgs.monsterName);
    return Quests.getQuestsWithLargeMonster(selectedMonster.id, 'Both').map<
      OptionProps<number>
    >(quest => {
      return {
        label: quest.name,
        value: quest.id
      };
    });
  }, [monsterArgs.monsterName]);

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

  return (
    <div className="monster">
      <h3>Monster</h3>
      <div className="monster--selectors">
        <FormGroup label="Monster">
          <HTMLSelect
            className="select select-monster"
            options={monsterOptions}
            value={monsterArgs.monsterName}
            onChange={onChangeMonsterName}
          />
        </FormGroup>

        {monsterStates.length > 1 && (
          <FormGroup label="State">
            <HTMLSelect
              className="select select-monster-state"
              options={monsterStates}
              value={monsterArgs.monsterStateIndex}
              onChange={onChangeMonsterState}
            />
          </FormGroup>
        )}

        {questOptions.length !== 0 && (
          <FormGroup label="Quest">
            <HTMLSelect
              className="select select-quest"
              options={questOptions}
              onChange={onChangeQuest}
              disabled={questOptions.length < 2}
            />
          </FormGroup>
        )}
      </div>
      <HitzoneTable
        monsterArgs={monsterArgs}
        dispatchMonsterArgs={dispatchMonsterArgs}
      />
      {/* // TODO: Display read-only defense/stagger multipliers */}
    </div>
  );
}
