import { RadioGroup } from '@blueprintjs/core';
import { SwordAndShieldTypes } from 'mh3-data';
import { swordAndShieldModeOptions } from '../weapon-options';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function SwordAndShieldSelectors({
  weaponMultipliers,
  setWeaponMultipliers
}: Omit<UniqueWeaponSelectorsProps, 'selectedWeaponClass'>) {
  return (
    <>
      <RadioGroup
        className="sword-and-shield-mode"
        options={swordAndShieldModeOptions}
        selectedValue={weaponMultipliers.swordAndShieldMode}
        onChange={event =>
          setWeaponMultipliers(prev => ({
            ...prev,
            swordAndShieldMode: (event.target as HTMLInputElement)
              .value as SwordAndShieldTypes.SwordAndShieldAttackMode
          }))
        }
      />
    </>
  );
}
