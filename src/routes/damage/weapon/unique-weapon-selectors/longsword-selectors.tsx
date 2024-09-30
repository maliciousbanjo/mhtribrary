import { Checkbox, RadioGroup } from '@blueprintjs/core';
import { LongswordTypes } from 'mh3-data';
import { spiritGaugeColorOptions } from '../weapon-options';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function LongswordSelectors({
  weaponMultipliers,
  setWeaponMultipliers
}: Omit<UniqueWeaponSelectorsProps, 'selectedWeaponClass'>) {
  return (
    <>
      <div>
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
        <Checkbox
          className="full-spirit"
          label="Full spirit gauge"
          checked={weaponMultipliers.longsword.fullSpiritGauge}
          onChange={event =>
            setWeaponMultipliers(prev => ({
              ...prev,
              longsword: {
                ...prev.longsword,
                fullSpiritGauge: event.target.checked
              }
            }))
          }
        />
      </div>
      <RadioGroup
        className="spirit-color"
        options={spiritGaugeColorOptions}
        selectedValue={weaponMultipliers.longsword.spiritGaugeColor}
        onChange={event =>
          setWeaponMultipliers(prev => ({
            ...prev,
            longsword: {
              ...prev.longsword,
              spiritGaugeColor: (event.target as HTMLInputElement)
                .value as LongswordTypes.SpiritGaugeColors
            }
          }))
        }
      />
    </>
  );
}
