import { FormGroup, HTMLSelect, OptionProps } from '@blueprintjs/core';
import React from 'react';
import { WeaponClass, Sharpness } from 'mh3-data/weapons';
import { DamageTypes, Weapons } from 'mh3-data';
import {
  getWeaponAttackOptions,
  greatSwordOptions,
  hammerOptions,
  lanceOptions,
  longswordOptions,
  switchAxeOptions,
  swordAndShieldOptions,
  weaponClassOptions
} from './weapon-options';
import { UniqueWeaponSelectors } from './unique-weapon-selectors';
import { capitalize } from '../../../utils/format-utils';

export interface WeaponSelectorsProps {
  selectedWeaponClass: WeaponClass;
  setSelectedWeaponClass: React.Dispatch<React.SetStateAction<WeaponClass>>;

  selectedWeaponId: number;
  setSelectedWeaponId: React.Dispatch<React.SetStateAction<number>>;

  selectedSharpness: Sharpness;
  setSelectedSharpness: React.Dispatch<React.SetStateAction<Sharpness>>;

  selectedWeaponAttack: string;
  setSelectedWeaponAttack: React.Dispatch<React.SetStateAction<string>>;

  weaponMultipliers: DamageTypes.WeaponMultipliers;
  setWeaponMultipliers: React.Dispatch<
    React.SetStateAction<DamageTypes.WeaponMultipliers>
  >;
}

export function WeaponSelectors({
  selectedWeaponClass,
  setSelectedWeaponClass,
  selectedWeaponId,
  setSelectedWeaponId,
  selectedSharpness,
  setSelectedSharpness,
  selectedWeaponAttack,
  setSelectedWeaponAttack,
  weaponMultipliers,
  setWeaponMultipliers
}: WeaponSelectorsProps) {
  const weaponSelectOptions = React.useMemo<OptionProps<number>[]>(() => {
    switch (selectedWeaponClass) {
      case 'Great Sword':
        return greatSwordOptions;
      case 'Hammer':
        return hammerOptions;
      case 'Lance':
        return lanceOptions;
      case 'Longsword':
        return longswordOptions;
      case 'Switch Axe':
        return switchAxeOptions;
      case 'Sword and Shield':
        return swordAndShieldOptions;
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
        const label = capitalize(
          Weapons.sharpnessAsString(index as Weapons.Sharpness)
        );
        return {
          value: index,
          label: requiresSharpnessUp ? `(${label})` : label
        };
      }
    );
  }, [selectedWeaponClass, selectedWeaponId]);

  /**
   * Also sets the default weapon ID and weapon attack to first index
   */
  const onChangeWeaponClass = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      const newWeaponClass = target.value as WeaponClass;
      setSelectedWeaponClass(newWeaponClass);
      // clear current selected weapon
      setSelectedWeaponId(0);
      setSelectedWeaponAttack(getWeaponAttackOptions(newWeaponClass)[0].value);
    },
    [setSelectedWeaponAttack, setSelectedWeaponClass, setSelectedWeaponId]
  );

  /**
   * Also sets sharpness to the max possible non-sharpness+1 value of the
   * particular weapon
   */
  const onChangeWeapon = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      const newWeaponId = parseInt(target.value);
      setSelectedWeaponId(newWeaponId);
      const weapon = Weapons.getWeapon(selectedWeaponClass, newWeaponId);
      // Set sharpness
      setSelectedSharpness(weapon.sharpness.length - 1);
    },
    [selectedWeaponClass, setSelectedSharpness, setSelectedWeaponId]
  );

  const onChangeSharpness = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedSharpness(parseInt(target.value));
    },
    [setSelectedSharpness]
  );

  const onChangeWeaponAttack = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setSelectedWeaponAttack(target.value);
    },
    [setSelectedWeaponAttack]
  );

  const selectStyle: React.CSSProperties = { display: 'flex', gap: '1em' };

  return (
    <div className="weapon">
      <h3>Weapon</h3>
      <div className="weapon--selectors">
        <div style={selectStyle}>
          <FormGroup label="Class">
            <HTMLSelect
              className="select select-weapon-class"
              options={weaponClassOptions}
              value={selectedWeaponClass}
              onChange={onChangeWeaponClass}
            />
          </FormGroup>
          <FormGroup label="Weapon">
            <HTMLSelect
              className="select select-weapon"
              options={weaponSelectOptions}
              value={selectedWeaponId}
              onChange={onChangeWeapon}
            />
          </FormGroup>
        </div>

        <div style={selectStyle}>
          <FormGroup label="Sharpness">
            <HTMLSelect
              className="select select-weapon-sharpness"
              options={sharpnessOptions}
              value={selectedSharpness}
              onChange={onChangeSharpness}
            />
          </FormGroup>
          <FormGroup label="Attack">
            <HTMLSelect
              className="select select-weapon-attack"
              options={getWeaponAttackOptions(selectedWeaponClass)}
              value={selectedWeaponAttack}
              onChange={onChangeWeaponAttack}
            />
          </FormGroup>
        </div>
        <UniqueWeaponSelectors
          selectedWeaponClass={selectedWeaponClass}
          weaponMultipliers={weaponMultipliers}
          setWeaponMultipliers={setWeaponMultipliers}
        />
      </div>
    </div>
  );
}
