import React from 'react';
import { WeaponArgReducerActions, WeaponArgsState } from './weapon-reducer';
import { WeaponSelectors } from './weapon-selectors';

export interface WeaponProps {
  weaponArgs: WeaponArgsState;
  dispatchWeaponArgs: React.Dispatch<WeaponArgReducerActions>;
}

/**
 * Top-level container for all info pertaining to the weapon
 */
export function Weapon({ weaponArgs, dispatchWeaponArgs }: WeaponProps) {
  return (
    <div className="weapon">
      <h3>Weapon</h3>
      <WeaponSelectors
        weaponArgs={weaponArgs}
        dispatchWeaponArgs={dispatchWeaponArgs}
      />
    </div>
  );
}
