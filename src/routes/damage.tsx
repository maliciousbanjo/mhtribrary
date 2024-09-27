import { Weapons } from 'mh3-data';
import { HTMLSelect, OptionProps } from '@blueprintjs/core';
import React from 'react';

/**
 * Top-level page for damage calculations
 */
export function DamagePage() {
  const [selectedWeaponClass, setSelectedWeaponClass] =
    React.useState<Weapons.WeaponClass>(Weapons.WeaponClass.GREAT_SWORD);

  const [selectedWeaponId, setSelectedWeaponId] = React.useState<number>(0);

  const [selectedSharpness, setSelectedSharpness] = React.useState<
    Weapons.Sharpness | undefined
  >();

  const onChangeWeaponClass = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedWeaponClass(target.value as Weapons.WeaponClass);
      // clear current selected weapon
      setSelectedWeaponId(0);
    },
    []
  );

  const onChangeWeapon = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedWeaponId(parseInt(target.value));
    },
    []
  );

  const onChangeSharpness = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedSharpness(parseInt(target.value));
    },
    []
  );

  const weaponClassOptions = React.useMemo<OptionProps<Weapons.WeaponClass>[]>(
    () => [
      { value: Weapons.WeaponClass.GREAT_SWORD },
      { value: Weapons.WeaponClass.HAMMER },
      { value: Weapons.WeaponClass.LANCE },
      { value: Weapons.WeaponClass.LONGSWORD },
      { value: Weapons.WeaponClass.SWITCH_AXE },
      { value: Weapons.WeaponClass.SWORD_AND_SHIELD }
    ],
    []
  );

  const weaponSelectOptions = React.useMemo<OptionProps<number>[]>(() => {
    const { GreatSword, Hammer, Lance, Longsword, SwitchAxe, SwordAndShield } =
      Weapons;
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

  return (
    <div>
      {/* Weapon Args */}
      <>
        <HTMLSelect
          className="weapon-class-select"
          options={weaponClassOptions}
          value={selectedWeaponClass}
          onChange={onChangeWeaponClass}
        />
        <HTMLSelect
          className="weapon-select"
          options={weaponSelectOptions}
          value={selectedWeaponId}
          onChange={onChangeWeapon}
        />
        <HTMLSelect
          className="weapon-sharpness-select"
          options={sharpnessOptions}
          value={selectedSharpness}
          onChange={onChangeSharpness}
        />
      </>

      {/* // TODO: Monster Args */}
      {/* // TODO: Hitzone selection */}
      {/* // TODO: Attack Buff Args */}
    </div>
  );
}
