import { Section, SectionCard } from '@blueprintjs/core';
import {
  MonsterParameters,
  MonsterParametersReducerAction
} from './monster-reducer';
import { MonsterSelectors } from './monster-selectors';

export interface MonsterProps {
  monsterParameters: MonsterParameters;
  dispatchMonsterParameters: React.Dispatch<MonsterParametersReducerAction>;
}

export function Monster({
  monsterParameters,
  dispatchMonsterParameters
}: MonsterProps) {
  return (
    <Section compact title="Monster" className="monster">
      <SectionCard>
        <MonsterSelectors
          monsterParameters={monsterParameters}
          dispatchMonsterParameters={dispatchMonsterParameters}
        />
      </SectionCard>
    </Section>
  );
}
