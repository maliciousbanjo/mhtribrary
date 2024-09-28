import { Weapons } from 'mh3-data';
import React from 'react';
import { WeaponSelectors } from './weapon';
import { MonsterSelectors } from './monster';

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
  const [selectedMonsterId, setSelectedMonsterId] = React.useState<number>(0);
  const [selectedMonsterHitzoneGroup, setSelectedMonsterHitzoneGroup] =
    React.useState<number>(0);
  /** undefined denotes  */
  const [selectedQuestId, setSelectedQuestId] = React.useState<
    number | undefined
  >();

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
        selectedMonsterId={selectedMonsterId}
        setSelectedMonsterId={setSelectedMonsterId}
        selectedMonsterHitzoneGroup={selectedMonsterHitzoneGroup}
        setSelectedMonsterHitzoneGroup={setSelectedMonsterHitzoneGroup}
        selectedQuestId={selectedQuestId}
        setSelectedQuestId={setSelectedQuestId}
      />
      {/* // TODO: Hitzone selection */}
      {/* // TODO: Attack Buff Args */}
    </div>
  );
}
