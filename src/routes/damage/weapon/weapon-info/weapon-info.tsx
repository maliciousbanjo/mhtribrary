import React from 'react';
import { Weapons, WeaponTypes } from 'mh3-data';
import { SharpnessGraph } from './sharpness-graph';
import { Icon } from '@blueprintjs/core';
import { capitalize } from '../../../../utils/format-utils';

interface WeaponInfoProps {
  weapon: WeaponTypes.Weapon<Weapons.WeaponClass>;
}

export function WeaponInfo({ weapon }: WeaponInfoProps) {
  const {
    attack,
    secondaryAttack,
    secondaryDamageType,
    affinity,
    slots,
    awaken
  } = weapon;

  return (
    <div className="weapon-info">
      <div>
        <SharpnessGraph sharpness={weapon.sharpness} />
        <SharpnessGraph sharpness={weapon.sharpnessUp} />
      </div>
      <div className="weapon-info__stats">
        <div>
          <label>Attack:</label> {attack}
        </div>
        <div>
          {/* // TODO: Need to include awaken */}
          <label>Element:</label> {secondaryAttack}{' '}
          {capitalize(secondaryDamageType)}
        </div>
        <div>
          <label>Aff:</label> {affinity}%
        </div>
        <div>
          {/* // TODO: Use circle Icon for slots */}
          <label>Slots:</label> {slots}
        </div>
      </div>
    </div>
  );
}
