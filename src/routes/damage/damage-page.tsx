import React from 'react';
import {
  Buffs,
  ELEMENTAL_ARGS_INITIAL_STATE,
  elementArgsReducer,
  RAW_ARGS_INITIAL_STATE,
  rawArgsReducer,
  WEAPON_CLASS_ARGS_INITIAL_STATE,
  weaponClassArgsReducer
} from './buffs';
import { DamageResults } from './damage-results';
import {
  Monster,
  MONSTER_PARAMETERS_INITIAL_STATE,
  monsterParametersReducer
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
  const [monsterParameters, dispatchMonsterParameters] = React.useReducer(
    monsterParametersReducer,
    MONSTER_PARAMETERS_INITIAL_STATE
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
    <div id="damage-page" className="damage">
      <Weapon weaponArgs={weaponArgs} dispatchWeaponArgs={dispatchWeaponArgs} />
      <DamageResults
        weaponArgs={weaponArgs}
        monsterParameters={monsterParameters}
        rawArgs={rawArgs}
        elementArgs={elementArgs}
        weaponClassArgs={weaponClassArgs}
      />
      <Monster
        monsterParameters={monsterParameters}
        dispatchMonsterParameters={dispatchMonsterParameters}
      />
      <Buffs
        rawArgs={rawArgs}
        dispatchRawArgs={dispatchRawArgs}
        elementArgs={elementArgs}
        dispatchElementArgs={dispatchElementArgs}
        weaponClassArgs={weaponClassArgs}
        dispatchWeaponClassArgs={dispatchWeaponClassArgs}
      />
    </div>
  );
}
