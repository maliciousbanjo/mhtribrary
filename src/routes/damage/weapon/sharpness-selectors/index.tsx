import React from 'react';
import { SharpnessSelectorDesktop } from './sharpness-selector-desktop';
import { useMediaQuery } from 'react-responsive';
import { OptionProps } from '@blueprintjs/core';
import { DamageTypes, Weapons } from 'mh3-data';
import { capitalize } from '../../../../utils/format-utils';
import { WeaponArgReducerActions } from '../weapon-reducer';
import { SharpnessSelectorMobile } from './sharpness-selector-mobile';

interface SharpnessSelectorProps {
  selectedWeapon: Weapons.WeaponTypes.Weapon<Weapons.WeaponClass>;
  selectedSharpness: DamageTypes.WeaponArgs['sharpness'];
  dispatchWeaponArgs: (value: WeaponArgReducerActions) => void;
}

/**
 * Props used by the internal desktop/mobile selector components
 */
export interface SharpnessSelectorInternalProps {
  sharpnessOptions: OptionProps<string>[];
  selectedSharpness: DamageTypes.WeaponArgs['sharpness'];
  onSelectSharpness: (value: string) => void;
}

export function SharpnessSelector({
  selectedWeapon,
  selectedSharpness,
  dispatchWeaponArgs
}: SharpnessSelectorProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  /**
   * Set dynamically based on the available sharpness of {@link selectedWeaponId}
   */
  const sharpnessOptions = React.useMemo(() => {
    return selectedWeapon.sharpnessUp.map<OptionProps<string>>(
      (_sharpnessTicks, index) => {
        // If this index is not part of the base sharpness list then it must be an extra level
        const requiresSharpnessUp =
          selectedWeapon.sharpness[index] === undefined;
        const label = capitalize(
          Weapons.sharpnessAsString(index as Weapons.Sharpness)
        );
        return {
          className: `sharpness sharp${index}`,
          value: label.toUpperCase(),
          label: requiresSharpnessUp ? `(${label})` : label
        };
      }
    );
  }, [selectedWeapon.sharpness, selectedWeapon.sharpnessUp]);

  const onSelectSharpness = React.useCallback(
    (value: string) => {
      dispatchWeaponArgs({
        type: 'SHARPNESS',
        payload: Weapons.Sharpness[value as keyof typeof Weapons.Sharpness]
      });
    },
    [dispatchWeaponArgs]
  );

  return isMobile ? (
    <SharpnessSelectorMobile
      sharpnessOptions={sharpnessOptions}
      selectedSharpness={selectedSharpness}
      onSelectSharpness={onSelectSharpness}
    />
  ) : (
    <SharpnessSelectorDesktop
      sharpnessOptions={sharpnessOptions}
      selectedSharpness={selectedSharpness}
      onSelectSharpness={onSelectSharpness}
    />
  );
}
