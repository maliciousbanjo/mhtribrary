import { FormGroup, HTMLSelect, OptionProps } from '@blueprintjs/core';
import {
  DamageTypes,
  MonsterLevels,
  MonsterLevelTypes,
  Monsters,
  Quests
} from 'mh3-data';
import React from 'react';
import { HitzoneTable } from '../hitzone-table';
import { MonsterArgReducerAction } from './monster-reducer';
import { MonsterSelector } from './monster-selector';
import { QuestSelector } from './quest-selector';

export interface MonsterSelectorsProps {
  monsterArgs: DamageTypes.MonsterArgs;
  dispatchMonsterArgs: React.Dispatch<MonsterArgReducerAction>;
}

export function MonsterSelectors({
  monsterArgs,
  dispatchMonsterArgs
}: MonsterSelectorsProps) {
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

  const multipliers: MonsterLevelTypes.MonsterLevelMultipliers =
    monsterArgs.questId !== undefined
      ? MonsterLevels.getMonsterMultipliersForQuest(
          monsterArgs.monsterName,
          monsterArgs.questId
        )
      : {
          health: [1],
          defense: 1,
          stagger: 1
        };

  return (
    <div className="monster">
      <h3>Monster</h3>
      <div className="monster--selectors">
        <FormGroup label="Monster">
          <MonsterSelector
            monsterArgs={monsterArgs}
            dispatchMonsterArgs={dispatchMonsterArgs}
          />
        </FormGroup>

        {monsterStates.length > 1 && (
          <FormGroup label="State">
            <HTMLSelect
              id="select-monster-state"
              options={monsterStates}
              value={monsterArgs.monsterStateIndex}
              onChange={onChangeMonsterState}
            />
          </FormGroup>
        )}

        {questOptions.length !== 0 && (
          <>
            <FormGroup label="Quest">
              <QuestSelector
                monsterArgs={monsterArgs}
                dispatchMonsterArgs={dispatchMonsterArgs}
              />
            </FormGroup>

            <FormGroup className="multiplier-labels" label="Multipliers">
              <div className="multiplier">
                <label>Defense:</label> {multipliers.defense}
              </div>
              <div className="multiplier">
                <label>Stagger:</label> {multipliers.stagger}
              </div>
            </FormGroup>
          </>
        )}
      </div>
      <HitzoneTable
        monsterArgs={monsterArgs}
        dispatchMonsterArgs={dispatchMonsterArgs}
        monsterMultipliers={multipliers}
      />
    </div>
  );
}
