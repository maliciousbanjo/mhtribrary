import React from 'react';
import { WeaponArgReducerActions, WeaponArgsState } from './weapon-reducer';
import { WeaponSelectors } from './weapon-selectors';
import { Section, SectionCard } from '@blueprintjs/core';

export interface WeaponProps {
  weaponArgs: WeaponArgsState;
  dispatchWeaponArgs: React.Dispatch<WeaponArgReducerActions>;
}

/**
 * Top-level container for all info pertaining to the weapon
 */
export function Weapon({ weaponArgs, dispatchWeaponArgs }: WeaponProps) {
  return (
    <Section compact title="Weapon" className="weapon">
      <SectionCard>
        <WeaponSelectors
          weaponArgs={weaponArgs}
          dispatchWeaponArgs={dispatchWeaponArgs}
        />
      </SectionCard>
    </Section>
  );
}
