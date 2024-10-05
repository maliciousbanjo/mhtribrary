/**
 * middle of blade (ls, gs)
 * swordAndShield mode
 * switchAxe mode
 */

import { DamageTypes } from 'mh3-data';
import { WeaponClass } from 'mh3-data/weapons';
import React from 'react';
import { WeaponMultipliersReducerActions } from '../weapon-reducer';
import { GreatSwordSelectors } from './great-sword-selectors';
import { LongswordSelectors } from './longsword-selectors';
import { SwitchAxeSelectors } from './switch-axe-selectors';
import { SwordAndShieldSelectors } from './sword-and-shield-selectors';

export interface UniqueWeaponSelectorsProps {
  selectedWeaponClass: WeaponClass;
  weaponMultipliers: DamageTypes.WeaponMultipliers;
  dispatchWeaponMultipliers: React.Dispatch<WeaponMultipliersReducerActions>;
}

export function UniqueWeaponSelectors({
  selectedWeaponClass,
  weaponMultipliers,
  dispatchWeaponMultipliers
}: UniqueWeaponSelectorsProps) {
  const content = React.useMemo(() => {
    switch (selectedWeaponClass) {
      case WeaponClass.GREAT_SWORD:
        return (
          <GreatSwordSelectors
            weaponMultipliers={weaponMultipliers}
            dispatchWeaponMultipliers={dispatchWeaponMultipliers}
          />
        );
      case WeaponClass.SWORD_AND_SHIELD:
        return (
          <SwordAndShieldSelectors
            weaponMultipliers={weaponMultipliers}
            dispatchWeaponMultipliers={dispatchWeaponMultipliers}
          />
        );
      case WeaponClass.SWITCH_AXE:
        return (
          <SwitchAxeSelectors
            weaponMultipliers={weaponMultipliers}
            dispatchWeaponMultipliers={dispatchWeaponMultipliers}
          />
        );
      case WeaponClass.LONGSWORD:
        return (
          <LongswordSelectors
            weaponMultipliers={weaponMultipliers}
            dispatchWeaponMultipliers={dispatchWeaponMultipliers}
          />
        );
      default:
        return undefined;
    }
  }, [dispatchWeaponMultipliers, selectedWeaponClass, weaponMultipliers]);

  return <div className="unique-weapon-selectors">{content}</div>;
}
