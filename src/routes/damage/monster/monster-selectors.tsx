import { FormGroup, HTMLSelect, OptionProps } from '@blueprintjs/core';
import { Monsters, Quests } from 'mh3-data';
import React from 'react';
import { HitzoneTable } from '../hitzone-table';
import {
  MonsterParametersReducerAction,
  MonsterParameters
} from './monster-reducer';
import { MonsterSelector } from './monster-selector';
import { QuestSelector } from './quest-selector';
import { LevelSelector } from './level-selector';
import { getMonsterStatMultipliers } from 'mh3-data/monsterLevels';

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

  // const multipliers: MonsterLevelTypes.MonsterStatMultipliers =
  //   monsterParameters.questId !== undefined
  //     ? MonsterLevels.getMonsterMultipliersForQuest(
  //         monsterParameters.monsterName,
  //         monsterParameters.questId
  //       )
  //     : {
  //         health: 1,
  //         defense: 1,
  //         stagger: 1
  //       };

  const multipliers = getMonsterStatMultipliers(
    monsterParameters.monsterName,
    monsterParameters.monsterLevel
  );

  return (
    <>
      <div className="monster--selectors">
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

            {/*
             * This goes away (for now), but it can display the multipliers of the currently-selected level
             */}
            <FormGroup className="multiplier-labels" label="Multipliers">
              <div className="multiplier">
                <label>Defense:</label> {multipliers.defense}
              </div>
              <div className="multiplier">
                <label>Stagger:</label>
                {multipliers.stagger}
              </div>
            </FormGroup>
          </>
        )}
      </div>
      <HitzoneTable
        monsterParameters={monsterParameters}
        dispatchMonsterParameters={dispatchMonsterParameters}
        monsterMultipliers={multipliers}
      />
    </>
  );
}
