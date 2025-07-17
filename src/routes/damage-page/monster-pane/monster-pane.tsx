import { Section, SectionCard } from '@blueprintjs/core';
import {
  MonsterParameters,
  MonsterParametersReducerAction
} from './monster-reducer';
import { MonsterSelectors } from './monster-selectors';

export interface MonsterPaneProps {
  monsterParameters: MonsterParameters;
  dispatchMonsterParameters: React.Dispatch<MonsterParametersReducerAction>;
}

export function MonsterPane({
  monsterParameters,
  dispatchMonsterParameters
}: MonsterPaneProps) {
  return (
    <Section compact title="Monster" className="monster-pane">
      <SectionCard>
        <MonsterSelectors
          monsterParameters={monsterParameters}
          dispatchMonsterParameters={dispatchMonsterParameters}
        />
      </SectionCard>
    </Section>
  );
}
