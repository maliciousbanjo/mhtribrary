import { Damage } from 'mh3-data';
import React from 'react';
import { v3 as uuidv3 } from 'uuid';
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
import { WEAPON_ARGS_INITIAL_STATE, weaponArgsReducer, Weapon } from './weapon';

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
      const hitJsx = damage.map((damageResult, index) => {
        const key = uuidv3(JSON.stringify(damageResult) + index, uuidv3.URL);
        return (
          <p key={key}>
            Hit {index + 1}: <b>{damageResult.totalDamage} </b>
            {damageResult.koDamage !== undefined && (
              <>
                and <b>{damageResult.koDamage}</b> KO
              </>
            )}
          </p>
        );
      });

      const totalDamage = damage.reduce(
        (result, nextHit) => {
          return {
            dmg: result.dmg + nextHit.totalDamage,
            ko: nextHit.koDamage ? nextHit.koDamage + result.ko : result.ko
          };
        },
        { dmg: 0, ko: 0 }
      );

      return (
        <>
          <h3>Results</h3>
          <div className="damage-results-content">
            {hitJsx}
            Total Damage: <b>{totalDamage.dmg} </b>
            {totalDamage.ko !== 0 && (
              <>
                and <b>{totalDamage.ko}</b> KO
              </>
            )}
          </div>
        </>
      );
    } catch (error) {
      console.error(error);
    }
  };

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
      <div className="damage-results">{renderDamage()}</div>
    </div>
  );
}
