import { DamageTypes } from 'mh3-data';
import { MonsterArgReducerAction } from './monster-reducer';
import { MonsterSelectors } from './monster-selectors';

export interface MonsterProps {
  monsterArgs: DamageTypes.MonsterArgs;
  dispatchMonsterArgs: React.Dispatch<MonsterArgReducerAction>;
}

export function Monster({ monsterArgs, dispatchMonsterArgs }: MonsterProps) {
  return (
    <div className="monster">
      <h3>Monster</h3>
      <MonsterSelectors
        monsterArgs={monsterArgs}
        dispatchMonsterArgs={dispatchMonsterArgs}
      />
    </div>
  );
}
