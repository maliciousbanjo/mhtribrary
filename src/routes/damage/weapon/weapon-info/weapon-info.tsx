import { Icon } from '@blueprintjs/core';
import { Weapons, WeaponTypes } from 'mh3-data';
import React from 'react';
import { SharpnessGraph } from './sharpness-graph';

interface WeaponInfoProps {
  weapon: WeaponTypes.Weapon<Weapons.WeaponClass>;
}

export function WeaponInfo({ weapon }: WeaponInfoProps) {
  const {
    attack,
    secondaryAttack,
    secondaryDamageType,
    affinity,
    slots,
    awaken
  } = weapon;

  const elementLabel = (
    <>
      <span>{secondaryAttack} </span>
      <span className="element-type">{secondaryDamageType}</span>
    </>
  );

  const slotsElement = React.useMemo<JSX.Element | JSX.Element[]>(() => {
    const result: JSX.Element[] = [];
    for (let i = 0; i < slots; i++) {
      result.push(
        <Icon tagName={'span'} className="slot-icon" icon="circle" size={13} />
      );
    }

    return result.length > 0 ? result : <>---</>;
  }, [slots]);

  return (
    <div className="weapon-info">
      <div>
        <SharpnessGraph sharpness={weapon.sharpness} />
        <SharpnessGraph sharpness={weapon.sharpnessUp} />
      </div>
      <div className="weapon-info__stats">
        <div>
          <label>Attack:</label> {attack}
        </div>
        <div>
          <label>Element:</label>{' '}
          {!awaken ? elementLabel : <>({elementLabel})</>}
        </div>
        <div>
          <label>Aff:</label> {affinity}%
        </div>
        <div className="slots">
          <label>Slots:</label> <>{slotsElement}</>
        </div>
      </div>
    </div>
  );
}
