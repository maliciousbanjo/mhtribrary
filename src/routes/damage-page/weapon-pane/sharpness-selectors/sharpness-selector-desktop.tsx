import { Classes, SegmentedControl } from '@blueprintjs/core';
import { SharpnessSelectorInternalProps } from '.';
import { Weapons } from 'mh3-data';

/**
 * Sharpness selector for desktop screen sizes
 */
export function SharpnessSelectorDesktop({
  sharpnessOptions,
  selectedSharpness,
  onSelectSharpness
}: SharpnessSelectorInternalProps) {
  return (
    <SegmentedControl
      className={`select-sharpness ${Classes.ELEVATION_1}`}
      options={sharpnessOptions}
      value={Weapons.sharpnessAsString(selectedSharpness).toUpperCase()}
      onValueChange={onSelectSharpness}
    />
  );
}
