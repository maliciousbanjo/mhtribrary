import React from 'react';
import { WeaponInfo } from './weapon-info';
import { WeaponArgReducerActions, WeaponArgsState } from './weapon-reducer';
import { WeaponSelectors } from './weapon-selectors';
import { Weapons } from 'mh3-data';

export interface WeaponProps {
  weaponArgs: WeaponArgsState;
  dispatchWeaponArgs: React.Dispatch<WeaponArgReducerActions>;
}

/**
 * Top-level container for all info pertaining to the weapon
 */
export function Weapon({ weaponArgs, dispatchWeaponArgs }: WeaponProps) {
  const selectedWeapon = React.useMemo(
    () => Weapons.getWeapon(weaponArgs.weaponClass, weaponArgs.weaponId),
    [weaponArgs.weaponClass, weaponArgs.weaponId]
  );

  return (
    <div className="weapon">
      <h3>Weapon</h3>
      <WeaponSelectors
        weaponArgs={weaponArgs}
        dispatchWeaponArgs={dispatchWeaponArgs}
      />
      <WeaponInfo weapon={selectedWeapon} />
    </div>
  );
}
