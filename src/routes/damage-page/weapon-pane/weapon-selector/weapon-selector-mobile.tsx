import { HTMLSelect } from '@blueprintjs/core';
import { WeaponSelectorInternalProps } from '.';
import React from 'react';

export function WeaponSelectorMobile({
  weaponOptions,
  selectedWeaponId,
  onSelectWeapon
}: Omit<WeaponSelectorInternalProps, 'selectedWeaponClass'>) {
  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      onSelectWeapon(parseInt(target.value));
    },
    [onSelectWeapon]
  );
  return (
    <HTMLSelect
      className="select-weapon__mobile"
      options={weaponOptions}
      value={selectedWeaponId}
      onChange={onChange}
    />
  );
}
