import { MonsterLevelTypes } from 'mh3-data';
import { MonsterParameters } from './monster-reducer';
import { getMonster, isLargeMonster } from 'mh3-data/monsters';
import React from 'react';
import { MonsterIcon } from './monster-icon';

export interface MonsterInfoProps {
  monsterName: MonsterParameters['monsterName'];
  multipliers: MonsterLevelTypes.MonsterStatMultipliers;
}

export function MonsterInfo({ monsterName, multipliers }: MonsterInfoProps) {
  const monster = React.useMemo(() => {
    return getMonster(monsterName);
  }, [monsterName]);

  return (
    <div className="monster-info">
      <div>
        <div className="multiplier">
          <label>Defense:</label> {multipliers.defense}
        </div>
        <div className="multiplier">
          <label>Stagger:</label> {multipliers.stagger}
        </div>
        {isLargeMonster(monster) && (
          <div className="multiplier">
            <label>HP:</label> {monster.hp * multipliers.health}
          </div>
        )}
      </div>
      <MonsterIcon monsterName={monsterName} />
    </div>
  );
}
