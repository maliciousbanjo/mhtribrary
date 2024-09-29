import { HTMLSelect, OptionProps } from '@blueprintjs/core';
import React from 'react';
import {
  WeaponClass,
  Sharpness,
  GreatSword,
  Hammer,
  Lance,
  Longsword,
  SwitchAxe,
  SwordAndShield
} from 'mh3-data/weapons';
import { Weapons } from 'mh3-data';

export interface WeaponSelectorsProps {
  selectedWeaponClass: WeaponClass;
  setSelectedWeaponClass: React.Dispatch<React.SetStateAction<WeaponClass>>;

  selectedWeaponId: number;
  setSelectedWeaponId: React.Dispatch<React.SetStateAction<number>>;

  selectedSharpness: Sharpness;
  setSelectedSharpness: React.Dispatch<React.SetStateAction<Sharpness>>;
}

export function WeaponSelectors({
  selectedWeaponClass,
  setSelectedWeaponClass,
  selectedWeaponId,
  setSelectedWeaponId,
  selectedSharpness,
  setSelectedSharpness
}: WeaponSelectorsProps) {
  const weaponClassOptions = React.useMemo<OptionProps<WeaponClass>[]>(
    () => [
      { value: WeaponClass.GREAT_SWORD },
      { value: WeaponClass.HAMMER },
      { value: WeaponClass.LANCE },
      { value: WeaponClass.LONGSWORD },
      { value: WeaponClass.SWITCH_AXE },
      { value: WeaponClass.SWORD_AND_SHIELD }
    ],
    []
  );

  const weaponSelectOptions = React.useMemo<OptionProps<number>[]>(() => {
    switch (selectedWeaponClass) {
      case 'Great Sword':
        return GreatSword.GreatSwords.map(gs => ({
          label: gs.name,
          value: gs.id
        }));
      case 'Hammer':
        return Hammer.Hammers.map(hm => ({
          label: hm.name,
          value: hm.id
        }));
      case 'Lance':
        return Lance.Lances.map(lnc => ({
          label: lnc.name,
          value: lnc.id
        }));
      case 'Longsword':
        return Longsword.Longswords.map(ls => ({
          label: ls.name,
          value: ls.id
        }));
      case 'Switch Axe':
        return SwitchAxe.SwitchAxes.map(swaxe => ({
          label: swaxe.name,
          value: swaxe.id
        }));
      case 'Sword and Shield':
        return SwordAndShield.SwordAndShields.map(sns => ({
          label: sns.name,
          value: sns.id
        }));
      default:
        throw new Error(`Invalid weapon selection ${selectedWeaponClass}`);
    }
  }, [selectedWeaponClass]);

  /**
   * Set dynamically based on the available sharpness of {@link selectedWeaponId}
   */
  const sharpnessOptions = React.useMemo(() => {
    const weapon = Weapons.getWeapon(selectedWeaponClass, selectedWeaponId);
    return weapon.sharpnessUp.map<OptionProps<number>>(
      (_sharpnessTicks, index) => {
        // If this index is not part of the base sharpness list then it must be an extra level
        const requiresSharpnessUp = weapon.sharpness[index] === undefined;
        const label = Weapons.sharpnessAsString(index as Weapons.Sharpness);
        return {
          value: index,
          label: requiresSharpnessUp ? `(${label})` : label
        };
      }
    );
  }, [selectedWeaponClass, selectedWeaponId]);

  const onChangeWeaponClass = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedWeaponClass(target.value as WeaponClass);
      // clear current selected weapon
      setSelectedWeaponId(0);
    },
    [setSelectedWeaponClass, setSelectedWeaponId]
  );

  const onChangeWeapon = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedWeaponId(parseInt(target.value));
    },
    [setSelectedWeaponId]
  );

  const onChangeSharpness = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedSharpness(parseInt(target.value));
    },
    [setSelectedSharpness]
  );

  return (
    <div className="weapon">
      <HTMLSelect
        className="select select-weapon-class"
        options={weaponClassOptions}
        value={selectedWeaponClass}
        onChange={onChangeWeaponClass}
      />
      <HTMLSelect
        className="select select-weapon"
        options={weaponSelectOptions}
        value={selectedWeaponId}
        onChange={onChangeWeapon}
      />
      <HTMLSelect
        className="select select-weapon-sharpness"
        options={sharpnessOptions}
        value={selectedSharpness}
        onChange={onChangeSharpness}
      />
    </div>
  );
}
