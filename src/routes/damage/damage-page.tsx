import { Damage, DamageTypes, Weapons } from 'mh3-data';
import React from 'react';
import { v3 as uuidv3 } from 'uuid';
import '../../sass/damage-page.scss';
import {
  BuffSelectors,
  elementArgsReducer,
  rawArgsReducer,
  weaponClassArgsReducer
} from './buffs';
import {
  DEFAULT_WEAPON_MULTIPLIERS,
  WEAPON_ATTACK_INITIAL_STATE,
  WEAPON_INITIAL_STATE
} from './damage-util';
import {
  MONSTER_ARGS_INITIAL_STATE,
  monsterArgsReducer,
  MonsterSelectors
} from './monster';
import { WeaponSelectors } from './weapon';

/**
 * Top-level page for damage calculations
 */
export function DamagePage() {
  // WEAPON STATE
  const [selectedWeaponClass, setSelectedWeaponClass] =
    React.useState<Weapons.WeaponClass>(WEAPON_INITIAL_STATE.type);

  const [selectedWeaponId, setSelectedWeaponId] = React.useState<number>(
    WEAPON_INITIAL_STATE.id
  );

  const [selectedSharpness, setSelectedSharpness] =
    React.useState<Weapons.Sharpness>(
      WEAPON_INITIAL_STATE.sharpness.length - 1
    );

  const [selectedWeaponAttack, setSelectedWeaponAttack] =
    React.useState<string>(WEAPON_ATTACK_INITIAL_STATE);

  // MONSTER STATE
  const [monsterArgs, dispatchMonsterArgs] = React.useReducer(
    monsterArgsReducer,
    MONSTER_ARGS_INITIAL_STATE
  );

  // BUFF STATE
  /** Custom reducer for Raw Args */
  const [rawArgs, dispatchRawArgs] = React.useReducer(rawArgsReducer, {
    criticalHit: 'none',
    lowHealthSkill: 'none',
    fortify: 'none'
  });

  /** Custom reducer for Element Args */
  const [elementArgs, dispatchElementArgs] = React.useReducer(
    elementArgsReducer,
    { awaken: false, elementAttack: 'none' }
  );

  /** Custom reducer for Weapon Class Args */
  const [weaponClassArgs, dispatchWeaponClassArgs] = React.useReducer(
    weaponClassArgsReducer,
    {
      powercharm: false,
      powertalon: false,
      armor: 'none',
      demondrug: 'none',
      might: 'none'
    }
  );

  const [weaponMultipliers, setWeaponMultipliers] =
    React.useState<DamageTypes.WeaponMultipliers>(DEFAULT_WEAPON_MULTIPLIERS);

  const calculate = React.useCallback(() => {
    const totalDamage = Damage.calculateDamage(
      {
        weaponClass: selectedWeaponClass,
        weaponId: selectedWeaponId,
        sharpness: selectedSharpness,
        attackName: selectedWeaponAttack,
        weaponMultipliers
      },
      monsterArgs,
      {
        rawArgs,
        elementArgs,
        weaponClassArgs
      }
    );

    return totalDamage;
  }, [
    elementArgs,
    monsterArgs,
    rawArgs,
    selectedSharpness,
    selectedWeaponAttack,
    selectedWeaponClass,
    selectedWeaponId,
    weaponClassArgs,
    weaponMultipliers
  ]);

  const renderDamage = () => {
    try {
      const damage = calculate();
      const hitJsx = damage.map((damageResult, index) => (
        <p key={uuidv3(JSON.stringify(damageResult), uuidv3.URL)}>
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
        selectedWeaponClass={selectedWeaponClass}
        setSelectedWeaponClass={setSelectedWeaponClass}
        selectedWeaponId={selectedWeaponId}
        setSelectedWeaponId={setSelectedWeaponId}
        selectedSharpness={selectedSharpness}
        setSelectedSharpness={setSelectedSharpness}
        selectedWeaponAttack={selectedWeaponAttack}
        setSelectedWeaponAttack={setSelectedWeaponAttack}
        weaponMultipliers={weaponMultipliers}
        setWeaponMultipliers={setWeaponMultipliers}
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
