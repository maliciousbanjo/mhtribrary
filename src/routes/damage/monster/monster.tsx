import { DamageTypes } from 'mh3-data';
import { MonsterArgReducerAction } from './monster-reducer';
import { MonsterSelectors } from './monster-selectors';
import { Section, SectionCard } from '@blueprintjs/core';

export interface MonsterProps {
  monsterArgs: DamageTypes.MonsterArgs;
  dispatchMonsterArgs: React.Dispatch<MonsterArgReducerAction>;
}

export function Monster({ monsterArgs, dispatchMonsterArgs }: MonsterProps) {
  return (
    <Section compact title="Monster" className="monster">
      <SectionCard>
        <MonsterSelectors
          monsterArgs={monsterArgs}
          dispatchMonsterArgs={dispatchMonsterArgs}
        />
      </SectionCard>
    </Section>
  );
}
