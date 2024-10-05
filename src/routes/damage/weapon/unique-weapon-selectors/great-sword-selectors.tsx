import { Checkbox } from '@blueprintjs/core';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function GreatSwordSelectors({
  weaponMultipliers,
  dispatchWeaponMultipliers
}: Omit<UniqueWeaponSelectorsProps, 'selectedWeaponClass'>) {
  return (
    <>
      <Checkbox
        className="middle-of-blade"
        label="Middle of blade"
        checked={weaponMultipliers.middleOfBlade}
        onChange={event =>
          dispatchWeaponMultipliers({
            type: 'GREAT_SWORD',
            payload: event.target.checked
          })
        }
      />
    </>
  );
}
