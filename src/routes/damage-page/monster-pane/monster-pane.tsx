import { Section, SectionCard } from '@blueprintjs/core';
import {
  MonsterParameters,
  MonsterParametersReducerAction
} from './monster-reducer';
import { MonsterSelectors } from './monster-selectors';
import { getMonsterStatMultipliers } from 'mh3-data/monsterLevels';
import { HitzoneTable } from '../hitzone-table';
import { MonsterInfo } from './monster-info';

export interface MonsterPaneProps {
  monsterParameters: MonsterParameters;
  dispatchMonsterParameters: React.Dispatch<MonsterParametersReducerAction>;
}

export function MonsterPane({
  monsterParameters,
  dispatchMonsterParameters
}: MonsterPaneProps) {
  const multipliers = getMonsterStatMultipliers(
    monsterParameters.monsterName,
    monsterParameters.monsterLevel
  );
  return (
    <Section compact title="Monster" className="monster-pane">
      <SectionCard className="monster-pane__content">
        <MonsterSelectors
          monsterParameters={monsterParameters}
          dispatchMonsterParameters={dispatchMonsterParameters}
        />
        <MonsterInfo
          monsterName={monsterParameters.monsterName}
          multipliers={multipliers}
        />
      </SectionCard>
      <SectionCard>
        <HitzoneTable
          monsterParameters={monsterParameters}
          dispatchMonsterParameters={dispatchMonsterParameters}
          monsterMultipliers={multipliers}
        />
      </SectionCard>
    </Section>
  );
}
