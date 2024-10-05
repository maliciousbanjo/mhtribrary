import { RadioGroup } from '@blueprintjs/core';
import { SwitchAxeTypes } from 'mh3-data';
import { switchAxeModeOptions } from '../weapon-options';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function SwitchAxeSelectors({
  weaponMultipliers,
  dispatchWeaponMultipliers
}: Omit<UniqueWeaponSelectorsProps, 'selectedWeaponClass'>) {
  return (
    <>
      <RadioGroup
        label="Mode"
        className="switch-axe-mode"
        inline
        options={switchAxeModeOptions}
        selectedValue={weaponMultipliers.switchAxeMode}
        onChange={event =>
          dispatchWeaponMultipliers({
            type: 'SWITCH_AXE',
            payload: (event.target as HTMLInputElement)
              .value as SwitchAxeTypes.SwitchAxeAttackMode
          })
        }
      />
    </>
  );
}
