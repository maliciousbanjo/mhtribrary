import { RadioGroup } from '@blueprintjs/core';
import { SwitchAxeTypes } from 'mh3-data';
import { switchAxeModeOptions } from '../weapon-options';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function SwitchAxeSelectors({
  weaponArgs,
  dispatchWeaponArgs
}: UniqueWeaponSelectorsProps) {
  return (
    <>
      <RadioGroup
        label="Mode"
        className="switch-axe-mode"
        inline
        options={switchAxeModeOptions}
        selectedValue={weaponArgs.weaponMultipliers.switchAxeMode}
        onChange={event =>
          dispatchWeaponArgs({
            type: 'MULTIPLIER_SWITCH_AXE',
            payload: (event.target as HTMLInputElement)
              .value as SwitchAxeTypes.SwitchAxeAttackMode
          })
        }
      />
    </>
  );
}
