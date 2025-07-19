import { Checkbox, RadioGroup } from '@blueprintjs/core';
import { LongswordTypes } from 'mh3-data';
import { spiritGaugeColorOptions } from '../weapon-options';
import { UniqueWeaponSelectorsProps } from './unique-weapon-selectors';

export function LongswordSelectors({
  weaponArgs,
  dispatchWeaponArgs
}: UniqueWeaponSelectorsProps) {
  return (
    <>
      <div>
        <Checkbox
          className="middle-of-blade"
          label="Middle of blade"
          checked={weaponArgs.weaponMultipliers.middleOfBlade}
          onChange={event =>
            dispatchWeaponArgs({
              type: 'MULTIPLIER_LONGSWORD',
              payload: {
                middleOfBlade: event.target.checked
              }
            })
          }
        />
        <Checkbox
          className="full-spirit"
          label="Full spirit gauge"
          checked={weaponArgs.weaponMultipliers.longsword.fullSpiritGauge}
          onChange={event =>
            dispatchWeaponArgs({
              type: 'MULTIPLIER_LONGSWORD',
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
        selectedValue={weaponArgs.weaponMultipliers.longsword.spiritGaugeColor}
        onChange={event =>
          dispatchWeaponArgs({
            type: 'MULTIPLIER_LONGSWORD',
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
