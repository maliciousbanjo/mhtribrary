import React from 'react';
import { WeaponArgReducerActions, WeaponArgsState } from './weapon-reducer';
import { WeaponSelectors } from './weapon-selectors';
import { Section, SectionCard } from '@blueprintjs/core';

export interface WeaponPaneProps {
  weaponArgs: WeaponArgsState;
  dispatchWeaponArgs: React.Dispatch<WeaponArgReducerActions>;
}

/**
 * Top-level container for all info pertaining to the weapon
 */
export function WeaponPane({
  weaponArgs,
  dispatchWeaponArgs
}: WeaponPaneProps) {
  return (
    <Section compact title="Weapon" className="weapon-pane">
      <SectionCard>
        <WeaponSelectors
          weaponArgs={weaponArgs}
          dispatchWeaponArgs={dispatchWeaponArgs}
        />
      </SectionCard>
    </Section>
  );
}
