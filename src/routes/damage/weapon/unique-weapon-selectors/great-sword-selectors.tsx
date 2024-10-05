import { Checkbox } from '@blueprintjs/core';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function GreatSwordSelectors({
  weaponArgs,
  dispatchWeaponArgs
}: UniqueWeaponSelectorsProps) {
  return (
    <>
      <Checkbox
        className="middle-of-blade"
        label="Middle of blade"
        checked={weaponArgs.weaponMultipliers.middleOfBlade}
        onChange={event =>
          dispatchWeaponArgs({
            type: 'MULTIPLIER_GREAT_SWORD',
            payload: event.target.checked
          })
        }
      />
    </>
  );
}
