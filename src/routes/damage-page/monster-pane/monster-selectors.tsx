import { FormGroup, HTMLSelect, OptionProps } from '@blueprintjs/core';
import { Monsters, Quests } from 'mh3-data';
import React from 'react';
import { LevelSelector } from './level-selector';
import {
  MonsterParameters,
  MonsterParametersReducerAction
} from './monster-reducer';
import { MonsterSelector } from './monster-selector';
import { QuestSelector } from './quest-selector';

export interface MonsterSelectorsProps {
  monsterParameters: MonsterParameters;
  dispatchMonsterParameters: React.Dispatch<MonsterParametersReducerAction>;
}

export function MonsterSelectors({
  monsterParameters,
  dispatchMonsterParameters
}: MonsterSelectorsProps) {
  /**
   * Different hitzoneGroups based on monster state (flying, muddy, enraged, etc)
   */
  const monsterStates = React.useMemo(() => {
    const selectedMonster = Monsters.getMonster(monsterParameters.monsterName);

    return (
      selectedMonster?.monsterStates.map<OptionProps<number>>(
        (monsterState, index) => ({
          value: index,
          label: monsterState.name
        })
      ) ?? []
    );
  }, [monsterParameters.monsterName]);

  const onChangeMonsterState = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      dispatchMonsterParameters({
        type: 'MONSTER_STATE_INDEX',
        payload: parseInt(target.value)
      });
    },
    [dispatchMonsterParameters]
  );

  const questOptions = React.useMemo(() => {
    const selectedMonster = Monsters.getMonster(monsterParameters.monsterName);
    return Quests.getQuestsWithLargeMonster(selectedMonster.id, 'Both').map<
      OptionProps<number>
    >(quest => {
      return {
        label: quest.name,
        value: quest.id
      };
    });
  }, [monsterParameters.monsterName]);

  return (
    <>
      <div className="monster-pane__selectors">
        <div className="flex-container-wrap">
          <FormGroup label="Monster">
            <MonsterSelector
              monsterParameters={monsterParameters}
              dispatchMonsterParameters={dispatchMonsterParameters}
            />
          </FormGroup>

          {monsterStates.length > 1 && (
            <FormGroup label="State">
              <HTMLSelect
                id="select-monster-state"
                options={monsterStates}
                value={monsterParameters.monsterStateIndex}
                onChange={onChangeMonsterState}
              />
            </FormGroup>
          )}
        </div>

        {questOptions.length !== 0 && (
          <>
            <FormGroup label="Quest">
              <QuestSelector
                monsterParameters={monsterParameters}
                dispatchMonsterParameters={dispatchMonsterParameters}
              />
            </FormGroup>
            <FormGroup label="Level">
              <LevelSelector
                monsterParameters={monsterParameters}
                dispatchMonsterParameters={dispatchMonsterParameters}
              />
            </FormGroup>
          </>
        )}
      </div>
    </>
  );
}
