import { Damage, Weapons } from 'mh3-data';
import React from 'react';
import { WeaponSelectors } from './weapon-selectors';
import { MonsterSelectors } from './monster-selectors';
import { HitzoneTable } from './hitzone-table';
import { MonsterTypes } from 'mh3-data/monsters';
import '../../sass/damage-page.scss';
import { BuffSelectors } from './buffs/buff-selectors';
import {
  elementArgsReducer,
  rawArgsReducer,
  weaponClassArgsReducer
} from './buffs';
import { Button } from '@blueprintjs/core';

/**
 * Top-level page for damage calculations
 */
export function DamagePage() {
  // WEAPON STATE
  const [selectedWeaponClass, setSelectedWeaponClass] =
    React.useState<Weapons.WeaponClass>(Weapons.WeaponClass.GREAT_SWORD);

  const [selectedWeaponId, setSelectedWeaponId] = React.useState<number>(0);

  const [selectedSharpness, setSelectedSharpness] =
    React.useState<Weapons.Sharpness>(Weapons.Sharpness.RED);

  // MONSTER STATE
  const [selectedMonsterName, setSelectedMonsterName] =
    React.useState<MonsterTypes.MonsterName>('Aptonoth');
  const [selectedMonsterState, setSelectedMonsterState] =
    React.useState<number>(0);

  /** -1 denotes no quest has been selected */
  const [selectedQuestId, setSelectedQuestId] = React.useState<number>(-1);

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

  const calculate = React.useCallback(() => {
    // TODO: Validate args
    const totalDamage = Damage.calculateDamage(
      {
        weaponClass: selectedWeaponClass,
        weaponId: selectedWeaponId,
        sharpness: selectedSharpness,
        attackName: 'L3 Charge', // TODO:,
        weaponMultipliers: {}
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
    alert(JSON.stringify(totalDamage, null, 2));
  }, [
    elementArgs,
    rawArgs,
    selectedHitzone,
    selectedMonsterName,
    selectedMonsterState,
    selectedQuestId,
    selectedSharpness,
    selectedWeaponClass,
    selectedWeaponId,
    weaponClassArgs
  ]);

  return (
    <div className="damage">
      <WeaponSelectors
        selectedWeaponClass={selectedWeaponClass}
        setSelectedWeaponClass={setSelectedWeaponClass}
        selectedWeaponId={selectedWeaponId}
        setSelectedWeaponId={setSelectedWeaponId}
        selectedSharpness={selectedSharpness}
        setSelectedSharpness={setSelectedSharpness}
      />
      <MonsterSelectors
        selectedMonsterName={selectedMonsterName}
        setSelectedMonsterName={setSelectedMonsterName}
        selectedMonsterState={selectedMonsterState}
        setSelectedMonsterState={setSelectedMonsterState}
        selectedQuestId={selectedQuestId}
        setSelectedQuestId={setSelectedQuestId}
      />
      <HitzoneTable
        selectedMonsterName={selectedMonsterName}
        selectedMonsterHitzoneGroup={selectedMonsterState}
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
      <Button text="Calculate Damage" onClick={calculate} />
    </div>
  );
}
