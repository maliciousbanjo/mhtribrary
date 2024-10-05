import { Damage } from 'mh3-data';
import React from 'react';
import { v3 as uuidv3 } from 'uuid';
import '../../sass/damage-page.scss';
import {
  BuffSelectors,
  ELEMENTAL_ARGS_INITIAL_STATE,
  elementArgsReducer,
  RAW_ARGS_INITIAL_STATE,
  rawArgsReducer,
  WEAPON_CLASS_ARGS_INITIAL_STATE,
  weaponClassArgsReducer
} from './buffs';
import {
  MONSTER_ARGS_INITIAL_STATE,
  monsterArgsReducer,
  MonsterSelectors
} from './monster';
import {
  WEAPON_ARGS_INITIAL_STATE,
  weaponArgsReducer,
  WeaponSelectors
} from './weapon';

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

  const calculate = React.useCallback(() => {
    const totalDamage = Damage.calculateDamage(weaponArgs, monsterArgs, {
      rawArgs,
      elementArgs,
      weaponClassArgs
    });

    return totalDamage;
  }, [elementArgs, monsterArgs, rawArgs, weaponArgs, weaponClassArgs]);

  const renderDamage = () => {
    try {
      const damage = calculate();
      const hitJsx = damage.map((damageResult, index) => (
        <p key={uuidv3(JSON.stringify(damageResult) + index, uuidv3.URL)}>
          Hit {index + 1}: {damageResult.totalDamage}
        </p>
      ));
      const totalDamage = damage.reduce(
        (result, nextHit) => result + nextHit.totalDamage,
        0
      );

      return (
        <>
          <h3>Results</h3>
          {hitJsx}
          Total Damage: {totalDamage}
        </>
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="damage">
      <WeaponSelectors
        weaponArgs={weaponArgs}
        dispatchWeaponArgs={dispatchWeaponArgs}
      />
      <div className="damage-results">{renderDamage()}</div>
      <MonsterSelectors
        monsterArgs={monsterArgs}
        dispatchMonsterArgs={dispatchMonsterArgs}
      />
      <BuffSelectors
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
