import { Button } from '@blueprintjs/core';
import { ItemPredicate } from '@blueprintjs/select';
import { Weapons, WeaponTypes } from 'mh3-data';
import {
  GreatSword,
  Hammer,
  Lance,
  Longsword,
  SwitchAxe,
  SwordAndShield
} from 'mh3-data/weapons';
import React from 'react';
import { WeaponSelectorProps } from '.';
import { Selector } from '../../../../ui/selector';

export function WeaponSelectorDesktop({
  selectedWeaponClass,
  selectedWeaponId,
  dispatchWeaponArgs
}: WeaponSelectorProps) {
  const selectedWeapon = Weapons.getWeapon(
    selectedWeaponClass,
    selectedWeaponId
  );

  const weaponItems = React.useMemo<WeaponTypes.Weapon[]>(() => {
    switch (selectedWeaponClass) {
      case 'Great Sword':
        return GreatSword.GreatSwords;
      case 'Hammer':
        return Hammer.Hammers;
      case 'Lance':
        return Lance.Lances;
      case 'Longsword':
        return Longsword.Longswords;
      case 'Switch Axe':
        return SwitchAxe.SwitchAxes;
      case 'Sword and Shield':
        return SwordAndShield.SwordAndShields;
      default:
        throw new Error(`Invalid weapon selection ${selectedWeaponClass}`);
    }
  }, [selectedWeaponClass]);

  const onSelectWeapon = React.useCallback(
    (weapon: WeaponTypes.Weapon) => {
      dispatchWeaponArgs({
        type: 'WEAPON_ID',
        payload: weapon.id
      });
    },
    [dispatchWeaponArgs]
  );

  const isWeaponSelected = React.useCallback(
    (weapon: WeaponTypes.Weapon) => weapon.id === selectedWeaponId,
    [selectedWeaponId]
  );

  const filterWeapons: ItemPredicate<WeaponTypes.Weapon> = React.useCallback(
    (query, weapon): boolean => {
      const normalizedWeaponName = weapon.name.toLowerCase();
      const normalizedQuery = query.toLowerCase();
      return normalizedWeaponName.indexOf(normalizedQuery) >= 0;
    },
    []
  );

  return (
    <Selector<WeaponTypes.Weapon>
      isSelectedPredicate={isWeaponSelected}
      items={weaponItems}
      onItemSelect={onSelectWeapon}
      itemPredicate={filterWeapons}
    >
      <Button text={selectedWeapon.name} rightIcon="double-caret-vertical" />
    </Selector>
  );
}
