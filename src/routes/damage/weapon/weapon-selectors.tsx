import { FormGroup, HTMLSelect } from '@blueprintjs/core';
import { Weapons } from 'mh3-data';
import { WeaponClass } from 'mh3-data/weapons';
import React from 'react';
import { SharpnessSelector } from './sharpness-selectors';
import { UniqueWeaponSelectors } from './unique-weapon-selectors';
import { WeaponProps } from './weapon';
import { WeaponInfo } from './weapon-info';
import {
  getWeaponAttackOptions,
  getWeaponSelectOptions,
  weaponClassOptions
} from './weapon-options';

export function WeaponSelectors({
  weaponArgs,
  dispatchWeaponArgs
}: WeaponProps) {
  const weaponSelectOptions = React.useMemo(
    () => getWeaponSelectOptions(weaponArgs.weaponClass),
    [weaponArgs.weaponClass]
  );

  const selectedWeapon = React.useMemo(
    () => Weapons.getWeapon(weaponArgs.weaponClass, weaponArgs.weaponId),
    [weaponArgs.weaponClass, weaponArgs.weaponId]
  );

  /**
   * Also sets the default weapon ID and weapon attack to first index
   */
  const onChangeWeaponClass = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      const newWeaponClass = target.value as WeaponClass;
      dispatchWeaponArgs({
        type: 'WEAPON_CLASS',
        payload: newWeaponClass
      });
    },
    [dispatchWeaponArgs]
  );

  /**
   * Also sets sharpness to the max possible non-sharpness+1 value of the
   * particular weapon
   */
  const onChangeWeapon = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      const newWeaponId = parseInt(target.value);
      dispatchWeaponArgs({
        type: 'WEAPON_ID',
        payload: newWeaponId
      });
    },
    [dispatchWeaponArgs]
  );

  const onChangeWeaponAttack = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;

      dispatchWeaponArgs({
        type: 'ATTACK_NAME',
        payload: target.value
      });
    },
    [dispatchWeaponArgs]
  );

  const weaponAttackOptions = React.useMemo(() => {
    if (weaponArgs.weaponClass === WeaponClass.SWITCH_AXE)
      return getWeaponAttackOptions(
        weaponArgs.weaponClass,
        weaponArgs.weaponMultipliers.switchAxeMode
      );
    else if (weaponArgs.weaponClass === WeaponClass.SWORD_AND_SHIELD)
      return getWeaponAttackOptions(
        weaponArgs.weaponClass,
        weaponArgs.weaponMultipliers.swordAndShieldMode
      );

    return getWeaponAttackOptions(weaponArgs.weaponClass);
  }, [
    weaponArgs.weaponClass,
    weaponArgs.weaponMultipliers.switchAxeMode,
    weaponArgs.weaponMultipliers.swordAndShieldMode
  ]);

  return (
    <div className="weapon--selectors">
      <div className="flex-container">
        <FormGroup label="Class">
          <HTMLSelect
            className="select select-weapon-class"
            options={weaponClassOptions}
            value={weaponArgs.weaponClass}
            onChange={onChangeWeaponClass}
          />
        </FormGroup>
        <FormGroup label="Weapon">
          <HTMLSelect
            className="select select-weapon"
            options={weaponSelectOptions}
            value={weaponArgs.weaponId}
            onChange={onChangeWeapon}
          />
        </FormGroup>
      </div>
      <WeaponInfo weapon={selectedWeapon} />

      <div className="sharpness-and-attack">
        <FormGroup label="Sharpness">
          <SharpnessSelector
            selectedWeapon={selectedWeapon}
            selectedSharpness={weaponArgs.sharpness}
            dispatchWeaponArgs={dispatchWeaponArgs}
          />
        </FormGroup>
        <FormGroup label="Attack">
          <HTMLSelect
            className="select select-weapon-attack"
            options={weaponAttackOptions}
            value={weaponArgs.attackName}
            onChange={onChangeWeaponAttack}
          />
        </FormGroup>
      </div>
      <UniqueWeaponSelectors
        weaponArgs={weaponArgs}
        dispatchWeaponArgs={dispatchWeaponArgs}
      />
    </div>
  );
}
