/**
 * middle of blade (ls, gs)
 * swordAndShield mode
 * switchAxe mode
 * longsword - full spirit gauge & spirit gauge color
 */

import { DamageTypes } from 'mh3-data';
import { WeaponClass } from 'mh3-data/weapons';
import React from 'react';
import { LongswordSelectors } from './longsword-selectors';

export interface UniqueWeaponSelectorsProps {
  selectedWeaponClass: WeaponClass;
  weaponMultipliers: DamageTypes.WeaponMultipliers;
  setWeaponMultipliers: React.Dispatch<
    React.SetStateAction<DamageTypes.WeaponMultipliers>
  >;
}

export function UniqueWeaponSelectors({
  selectedWeaponClass,
  weaponMultipliers,
  setWeaponMultipliers
}: UniqueWeaponSelectorsProps) {
  const content = React.useMemo(() => {
    switch (selectedWeaponClass) {
      case WeaponClass.GREAT_SWORD:
      case WeaponClass.SWORD_AND_SHIELD:
      case WeaponClass.SWITCH_AXE:
        return <div>You've selected a {selectedWeaponClass}</div>;
      case WeaponClass.LONGSWORD:
        return (
          <LongswordSelectors
            weaponMultipliers={weaponMultipliers}
            setWeaponMultipliers={setWeaponMultipliers}
          />
        );
      default:
        return undefined;
    }
  }, [selectedWeaponClass, setWeaponMultipliers, weaponMultipliers]);

  return <div className="unique-weapon-selectors">{content}</div>;
}
