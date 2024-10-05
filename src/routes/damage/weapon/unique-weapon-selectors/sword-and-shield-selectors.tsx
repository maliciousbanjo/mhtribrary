import { RadioGroup } from '@blueprintjs/core';
import { SwordAndShieldTypes } from 'mh3-data';
import { swordAndShieldModeOptions } from '../weapon-options';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function SwordAndShieldSelectors({
  weaponArgs,
  dispatchWeaponArgs
}: UniqueWeaponSelectorsProps) {
  return (
    <>
      <RadioGroup
        label="Mode"
        className="sword-and-shield-mode"
        inline
        options={swordAndShieldModeOptions}
        selectedValue={weaponArgs.weaponMultipliers.swordAndShieldMode}
        onChange={event =>
          dispatchWeaponArgs({
            type: 'MULTIPLIER_SWORD_AND_SHIELD',
            payload: (event.target as HTMLInputElement)
              .value as SwordAndShieldTypes.SwordAndShieldAttackMode
          })
        }
      />
    </>
  );
}
