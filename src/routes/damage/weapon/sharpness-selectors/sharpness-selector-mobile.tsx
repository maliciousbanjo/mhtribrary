import { HTMLSelect } from '@blueprintjs/core';
import { SharpnessSelectorInternalProps } from '.';
import React from 'react';
import { Weapons } from 'mh3-data';

export function SharpnessSelectorMobile({
  sharpnessOptions,
  selectedSharpness,
  onSelectSharpness
}: SharpnessSelectorInternalProps) {
  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      onSelectSharpness(target.value);
    },
    [onSelectSharpness]
  );

  return (
    <HTMLSelect
      className="select select-weapon-sharpness"
      options={sharpnessOptions}
      value={Weapons.sharpnessAsString(selectedSharpness).toUpperCase()}
      onChange={onChange}
    />
  );
}
