import React from 'react';
import { Weapons, WeaponTypes } from 'mh3-data';

interface WeaponInfoProps {
  weapon: WeaponTypes.Weapon<Weapons.WeaponClass>;
}

export function WeaponInfo({ weapon }: WeaponInfoProps) {
  const { attack, secondaryAttack, secondaryDamageType, affinity, slots } =
    weapon;
  return (
    <div className="weapon-info">
      <div className="weapon-info__sharpness">Sharpness</div>
      <div className="weapon-info__stats">
        <div>Attack: {attack}</div>
        <div>
          Element: {secondaryAttack} {secondaryDamageType}
        </div>
        <div>Aff: {affinity}%</div>
        <div>Slots: {slots}</div>
      </div>
    </div>
  );
}
