import { Damage, DamageTypes, Weapons } from 'mh3-data';
import { MonsterTypes } from 'mh3-data/monsters';
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
import { MonsterSelectors } from './monster-selectors';
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
  const [selectedMonsterName, setSelectedMonsterName] =
    React.useState<MonsterTypes.MonsterName>('Aptonoth');
  const [selectedMonsterState, setSelectedMonsterState] =
    React.useState<number>(0);

  /** 0 denotes no quest has been selected */
  const [selectedQuestId, setSelectedQuestId] = React.useState<number>(0);

  // HITZONE STATE
  const [selectedHitzone, setSelectedHitzone] = React.useState<string>('');

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
    // TODO: Validate args
    const totalDamage = Damage.calculateDamage(
      {
        weaponClass: selectedWeaponClass,
        weaponId: selectedWeaponId,
        sharpness: selectedSharpness,
        attackName: selectedWeaponAttack,
        weaponMultipliers
      },
      {
        monsterName: selectedMonsterName,
        questId: selectedQuestId,
        monsterStateIndex: selectedMonsterState,
        hitzoneName: selectedHitzone
      },
      {
        rawArgs,
        elementArgs,
        weaponClassArgs
      }
    );

    return totalDamage;
  }, [
    elementArgs,
    rawArgs,
    selectedHitzone,
    selectedMonsterName,
    selectedMonsterState,
    selectedQuestId,
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
        selectedMonsterName={selectedMonsterName}
        setSelectedMonsterName={setSelectedMonsterName}
        selectedMonsterState={selectedMonsterState}
        setSelectedMonsterState={setSelectedMonsterState}
        selectedQuestId={selectedQuestId}
        setSelectedQuestId={setSelectedQuestId}
        selectedHitzone={selectedHitzone}
        setSelectedHitzone={setSelectedHitzone}
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
