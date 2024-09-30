/**
 * middle of blade (ls, gs)
 * swordAndShield mode
 * switchAxe mode
 */

import { DamageTypes } from 'mh3-data';
import { WeaponClass } from 'mh3-data/weapons';
import React from 'react';
import { LongswordSelectors } from './longsword-selectors';
import { DEFAULT_WEAPON_MULTIPLIERS } from '../../damage-util';
import { SwitchAxeSelectors } from './switch-axe-selectors';
import { SwordAndShieldSelectors } from './sword-and-shield-selectors';
import { GreatSwordSelectors } from './great-sword-selectors';

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
  /**
   * Reset multiplier state every time weapon class is changed
   */
  React.useEffect(() => {
    setWeaponMultipliers(DEFAULT_WEAPON_MULTIPLIERS);
  }, [setWeaponMultipliers, selectedWeaponClass]);

  const content = React.useMemo(() => {
    switch (selectedWeaponClass) {
      case WeaponClass.GREAT_SWORD:
        return (
          <GreatSwordSelectors
            weaponMultipliers={weaponMultipliers}
            setWeaponMultipliers={setWeaponMultipliers}
          />
        );
      case WeaponClass.SWORD_AND_SHIELD:
        return (
          <SwordAndShieldSelectors
            weaponMultipliers={weaponMultipliers}
            setWeaponMultipliers={setWeaponMultipliers}
          />
        );
      case WeaponClass.SWITCH_AXE:
        return (
          <SwitchAxeSelectors
            weaponMultipliers={weaponMultipliers}
            setWeaponMultipliers={setWeaponMultipliers}
          />
        );
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
