/**
 * middle of blade (ls, gs)
 * swordAndShield mode
 * switchAxe mode
 */

import { WeaponClass } from 'mh3-data/weapons';
import React from 'react';
import { WeaponArgReducerActions, WeaponArgsState } from '../weapon-reducer';
import { GreatSwordSelectors } from './great-sword-selectors';
import { LongswordSelectors } from './longsword-selectors';
import { SwitchAxeSelectors } from './switch-axe-selectors';
import { SwordAndShieldSelectors } from './sword-and-shield-selectors';

export interface UniqueWeaponSelectorsProps {
  weaponArgs: WeaponArgsState;
  dispatchWeaponArgs: React.Dispatch<WeaponArgReducerActions>;
}

export function UniqueWeaponSelectors({
  weaponArgs,
  dispatchWeaponArgs
}: UniqueWeaponSelectorsProps) {
  const content = React.useMemo(() => {
    switch (weaponArgs.weaponClass) {
      case WeaponClass.GREAT_SWORD:
        return (
          <GreatSwordSelectors
            weaponArgs={weaponArgs}
            dispatchWeaponArgs={dispatchWeaponArgs}
          />
        );
      case WeaponClass.SWORD_AND_SHIELD:
        return (
          <SwordAndShieldSelectors
            weaponArgs={weaponArgs}
            dispatchWeaponArgs={dispatchWeaponArgs}
          />
        );
      case WeaponClass.SWITCH_AXE:
        return (
          <SwitchAxeSelectors
            weaponArgs={weaponArgs}
            dispatchWeaponArgs={dispatchWeaponArgs}
          />
        );
      case WeaponClass.LONGSWORD:
        return (
          <LongswordSelectors
            weaponArgs={weaponArgs}
            dispatchWeaponArgs={dispatchWeaponArgs}
          />
        );
      default:
        return undefined;
    }
  }, [dispatchWeaponArgs, weaponArgs]);

  return <div className="unique-weapon-selectors">{content}</div>;
}
