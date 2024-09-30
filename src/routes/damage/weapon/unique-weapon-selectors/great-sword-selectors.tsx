import { Checkbox } from '@blueprintjs/core';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function GreatSwordSelectors({
  weaponMultipliers,
  setWeaponMultipliers
}: Omit<UniqueWeaponSelectorsProps, 'selectedWeaponClass'>) {
  return (
    <>
      <Checkbox
        className="middle-of-blade"
        label="Middle of blade"
        checked={weaponMultipliers.middleOfBlade}
        onChange={event =>
          setWeaponMultipliers(prev => ({
            ...prev,
            middleOfBlade: event.target.checked
          }))
        }
      />
    </>
  );
}
