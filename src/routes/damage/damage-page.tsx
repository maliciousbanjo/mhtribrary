import React from 'react';
import {
  BuffSelectors,
  ELEMENTAL_ARGS_INITIAL_STATE,
  elementArgsReducer,
  RAW_ARGS_INITIAL_STATE,
  rawArgsReducer,
  WEAPON_CLASS_ARGS_INITIAL_STATE,
  weaponClassArgsReducer
} from './buffs';
import { DamageResults } from './damage-results';
import {
  MONSTER_ARGS_INITIAL_STATE,
  monsterArgsReducer,
  MonsterSelectors
} from './monster';
import { Weapon, WEAPON_ARGS_INITIAL_STATE, weaponArgsReducer } from './weapon';

/**
 * Top-level page for damage calculations
 */
export function DamagePage() {
  // WEAPON STATE
  const [weaponArgs, dispatchWeaponArgs] = React.useReducer(
    weaponArgsReducer,
    WEAPON_ARGS_INITIAL_STATE
  );

  // MONSTER STATE
  const [monsterArgs, dispatchMonsterArgs] = React.useReducer(
    monsterArgsReducer,
    MONSTER_ARGS_INITIAL_STATE
  );

  // BUFF STATE
  /** Custom reducer for Raw Args */
  const [rawArgs, dispatchRawArgs] = React.useReducer(
    rawArgsReducer,
    RAW_ARGS_INITIAL_STATE
  );

  /** Custom reducer for Element Args */
  const [elementArgs, dispatchElementArgs] = React.useReducer(
    elementArgsReducer,
    ELEMENTAL_ARGS_INITIAL_STATE
  );

  /** Custom reducer for Weapon Class Args */
  const [weaponClassArgs, dispatchWeaponClassArgs] = React.useReducer(
    weaponClassArgsReducer,
    WEAPON_CLASS_ARGS_INITIAL_STATE
  );

  return (
    <div className="damage">
      <div className="weapon-and-monster">
        <Weapon
          weaponArgs={weaponArgs}
          dispatchWeaponArgs={dispatchWeaponArgs}
        />
        <MonsterSelectors
          monsterArgs={monsterArgs}
          dispatchMonsterArgs={dispatchMonsterArgs}
        />
      </div>
      <BuffSelectors
        rawArgs={rawArgs}
        dispatchRawArgs={dispatchRawArgs}
        elementArgs={elementArgs}
        dispatchElementArgs={dispatchElementArgs}
        weaponClassArgs={weaponClassArgs}
        dispatchWeaponClassArgs={dispatchWeaponClassArgs}
      />
      <DamageResults
        weaponArgs={weaponArgs}
        monsterArgs={monsterArgs}
        rawArgs={rawArgs}
        elementArgs={elementArgs}
        weaponClassArgs={weaponClassArgs}
      />
    </div>
  );
}
