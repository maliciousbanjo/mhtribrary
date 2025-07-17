import { useMediaQuery } from 'react-responsive';
import { WeaponSelectorDesktop } from './weapon-selector-desktop';
import { WeaponSelectorMobile } from './weapon-selector-mobile';
import { DamageTypes } from 'mh3-data';
import { WeaponArgReducerActions } from '../weapon-reducer';
import React from 'react';
import { getWeaponSelectOptions } from '../weapon-options';
import { OptionProps } from '@blueprintjs/core';

export interface WeaponSelectorProps {
  selectedWeaponClass: DamageTypes.WeaponArgs['weaponClass'];
  selectedWeaponId: DamageTypes.WeaponArgs['weaponId'];
  dispatchWeaponArgs: React.Dispatch<WeaponArgReducerActions>;
}

export interface WeaponSelectorInternalProps
  extends Pick<
    WeaponSelectorProps,
    'selectedWeaponId' | 'selectedWeaponClass'
  > {
  weaponOptions: OptionProps<number>[];
  onSelectWeapon: (weaponId: number) => void;
}

export function WeaponSelector({
  selectedWeaponClass,
  selectedWeaponId,
  dispatchWeaponArgs
}: WeaponSelectorProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const weaponOptions = React.useMemo(
    () => getWeaponSelectOptions(selectedWeaponClass),
    [selectedWeaponClass]
  );

  const onSelectWeapon = React.useCallback(
    (weaponId: number) => {
      dispatchWeaponArgs({
        type: 'WEAPON_ID',
        payload: weaponId
      });
    },
    [dispatchWeaponArgs]
  );

  return isMobile ? (
    <WeaponSelectorMobile
      weaponOptions={weaponOptions}
      onSelectWeapon={onSelectWeapon}
      selectedWeaponId={selectedWeaponId}
    />
  ) : (
    <WeaponSelectorDesktop
      selectedWeaponClass={selectedWeaponClass}
      selectedWeaponId={selectedWeaponId}
      dispatchWeaponArgs={dispatchWeaponArgs}
    />
  );
}
