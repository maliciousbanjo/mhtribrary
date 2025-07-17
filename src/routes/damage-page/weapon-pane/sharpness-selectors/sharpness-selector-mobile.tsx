import { HTMLSelect } from '@blueprintjs/core';
import { SharpnessSelectorInternalProps } from '.';
import React from 'react';
import { Weapons } from 'mh3-data';
import classNames from 'classnames';

/**
 * Sharpness selector for mobile screen sizes
 */
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

  const value = Weapons.sharpnessAsString(selectedSharpness).toUpperCase();

  const sharpnessClass = sharpnessOptions.find(
    opt => opt.value === value
  )?.className;

  return (
    <HTMLSelect
      className={classNames(['select-sharpness__mobile', sharpnessClass ?? ''])}
      options={sharpnessOptions}
      value={value}
      onChange={onChange}
    />
  );
}
