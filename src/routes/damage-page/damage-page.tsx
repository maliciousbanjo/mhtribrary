import React from 'react';
import {
  BuffsPane,
  ELEMENTAL_ARGS_INITIAL_STATE,
  elementArgsReducer,
  RAW_ARGS_INITIAL_STATE,
  rawArgsReducer,
  WEAPON_CLASS_ARGS_INITIAL_STATE,
  weaponClassArgsReducer
} from './buffs-pane';
import { DamageResultsPane } from './damage-results';
import {
  MonsterPane,
  MONSTER_PARAMETERS_INITIAL_STATE,
  monsterParametersReducer
} from './monster-pane';
import {
  WeaponPane,
  WEAPON_ARGS_INITIAL_STATE,
  weaponArgsReducer
} from './weapon-pane';

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
    <div id="damage-page">
      <div
        className="flex-column"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          flex: '2 1 0'
        }}
      >
        {/* // TODO: Put this back later */}
        {/* <DamageResultsPane
          weaponArgs={weaponArgs}
          monsterParameters={monsterParameters}
          rawArgs={rawArgs}
          elementArgs={elementArgs}
          weaponClassArgs={weaponClassArgs}
        /> */}
        <WeaponPane
          weaponArgs={weaponArgs}
          dispatchWeaponArgs={dispatchWeaponArgs}
        />
        <BuffsPane
          rawArgs={rawArgs}
          dispatchRawArgs={dispatchRawArgs}
          elementArgs={elementArgs}
          dispatchElementArgs={dispatchElementArgs}
          weaponClassArgs={weaponClassArgs}
          dispatchWeaponClassArgs={dispatchWeaponClassArgs}
        />
      </div>
      <MonsterPane
        monsterParameters={monsterParameters}
        dispatchMonsterParameters={dispatchMonsterParameters}
      />
    </div>
  );
}
