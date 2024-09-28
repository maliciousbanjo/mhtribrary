import { Weapons } from 'mh3-data';
import React from 'react';
import { WeaponSelectors } from './weapon-selectors';
import { MonsterSelectors } from './monster-selectors';
import { HitzoneTable } from './hitzone-table';
import { MonsterTypes } from 'mh3-data/monsters';
import '../../sass/damage-page.scss';

/**
 * Top-level page for damage calculations
 */
export function DamagePage() {
  // WEAPON STATE
  const [selectedWeaponClass, setSelectedWeaponClass] =
    React.useState<Weapons.WeaponClass>(Weapons.WeaponClass.GREAT_SWORD);

  const [selectedWeaponId, setSelectedWeaponId] = React.useState<number>(0);

  const [selectedSharpness, setSelectedSharpness] = React.useState<
    Weapons.Sharpness | undefined
  >();

  // MONSTER STATE
  const [selectedMonsterName, setSelectedMonsterName] =
    React.useState<MonsterTypes.MonsterName>('Aptonoth');
  const [selectedMonsterHitzoneGroup, setSelectedMonsterHitzoneGroup] =
    React.useState<number>(0);
  /** undefined denotes  */
  const [selectedQuestId, setSelectedQuestId] = React.useState<
    number | undefined
  >();

  // HITZONE STATE
  const [selectedHitzone, setSelectedHitzone] = React.useState<string>('');

  return (
    <div>
      {/* Weapon Args */}
      <WeaponSelectors
        selectedWeaponClass={selectedWeaponClass}
        setSelectedWeaponClass={setSelectedWeaponClass}
        selectedWeaponId={selectedWeaponId}
        setSelectedWeaponId={setSelectedWeaponId}
        selectedSharpness={selectedSharpness}
        setSelectedSharpness={setSelectedSharpness}
      />

      {/* // TODO: Monster Args */}
      <MonsterSelectors
        selectedMonsterName={selectedMonsterName}
        setSelectedMonsterName={setSelectedMonsterName}
        selectedMonsterHitzoneGroup={selectedMonsterHitzoneGroup}
        setSelectedMonsterHitzoneGroup={setSelectedMonsterHitzoneGroup}
        selectedQuestId={selectedQuestId}
        setSelectedQuestId={setSelectedQuestId}
      />
      <div>Selected Quest Id: {selectedQuestId}</div>
      {/* // TODO: Hitzone selection */}
      <HitzoneTable
        selectedMonsterName={selectedMonsterName}
        selectedMonsterHitzoneGroup={selectedMonsterHitzoneGroup}
        selectedHitzone={selectedHitzone}
        setSelectedHitzone={setSelectedHitzone}
      />
      {/* // TODO: Attack Buff Args */}
    </div>
  );
}
