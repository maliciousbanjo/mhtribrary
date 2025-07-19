import { FormGroup, HTMLSelect } from '@blueprintjs/core';
import { Weapons } from 'mh3-data';
import { WeaponClass } from 'mh3-data/weapons';
import React from 'react';
import { SharpnessSelector } from './sharpness-selectors';
import { UniqueWeaponSelectors } from './unique-weapon-selectors';
import { WeaponPaneProps } from './weapon-pane';
import { WeaponInfo } from './weapon-info';
import { getWeaponAttackOptions, weaponClassOptions } from './weapon-options';
import { WeaponSelector } from './weapon-selector';

export function WeaponSelectors({
  weaponArgs,
  dispatchWeaponArgs
}: WeaponPaneProps) {
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
    <div className="weapon-pane__selectors">
      <div className="flex-container-wrap">
        <FormGroup label="Class">
          <HTMLSelect
            className="select-weapon-class"
            options={weaponClassOptions}
            value={weaponArgs.weaponClass}
            onChange={onChangeWeaponClass}
          />
        </FormGroup>
        <FormGroup label="Weapon">
          <WeaponSelector
            selectedWeaponClass={weaponArgs.weaponClass}
            selectedWeaponId={weaponArgs.weaponId}
            dispatchWeaponArgs={dispatchWeaponArgs}
          />
        </FormGroup>
        <FormGroup label="Attack">
          <HTMLSelect
            className="select-weapon-attack"
            options={weaponAttackOptions}
            value={weaponArgs.attackName}
            onChange={onChangeWeaponAttack}
          />
        </FormGroup>
      </div>
      <WeaponInfo weapon={selectedWeapon} />

      <FormGroup label="Sharpness">
        <SharpnessSelector
          selectedWeapon={selectedWeapon}
          selectedSharpness={weaponArgs.sharpness}
          dispatchWeaponArgs={dispatchWeaponArgs}
        />
      </FormGroup>
      <UniqueWeaponSelectors
        weaponArgs={weaponArgs}
        dispatchWeaponArgs={dispatchWeaponArgs}
      />
    </div>
  );
}
