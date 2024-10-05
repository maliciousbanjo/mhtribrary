import { Checkbox, RadioGroup } from '@blueprintjs/core';
import { LongswordTypes } from 'mh3-data';
import { spiritGaugeColorOptions } from '../weapon-options';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function LongswordSelectors({
  weaponMultipliers,
  dispatchWeaponMultipliers
}: Omit<UniqueWeaponSelectorsProps, 'selectedWeaponClass'>) {
  return (
    <>
      <div>
        <Checkbox
          className="middle-of-blade"
          label="Middle of blade"
          checked={weaponMultipliers.middleOfBlade}
          onChange={event =>
            dispatchWeaponMultipliers({
              type: 'LONGSWORD',
              payload: {
                middleOfBlade: event.target.checked
              }
            })
          }
        />
        <Checkbox
          className="full-spirit"
          label="Full spirit gauge"
          checked={weaponMultipliers.longsword.fullSpiritGauge}
          onChange={event =>
            dispatchWeaponMultipliers({
              type: 'LONGSWORD',
              payload: {
                fullSpiritGauge: event.target.checked
              }
            })
          }
        />
      </div>
      <RadioGroup
        label="Spirit gauge color"
        className="spirit-color"
        inline
        options={spiritGaugeColorOptions}
        selectedValue={weaponMultipliers.longsword.spiritGaugeColor}
        onChange={event =>
          dispatchWeaponMultipliers({
            type: 'LONGSWORD',
            payload: {
              spiritGaugeColor: (event.target as HTMLInputElement)
                .value as LongswordTypes.SpiritGaugeColors
            }
          })
        }
      />
    </>
  );
}
