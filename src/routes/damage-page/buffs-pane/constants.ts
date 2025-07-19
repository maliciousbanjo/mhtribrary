import { OptionProps } from '@blueprintjs/core';
import { ElementArgs, RawArgs, WeaponClassArgs } from './buff-types';

export const armorSkillOptions: OptionProps<WeaponClassArgs['armor']>[] = [
  {
    value: 'none',
    label: 'None'
  },
  {
    value: 'attackUpSmall',
    label: 'Attack Up Small'
  },
  {
    value: 'attackUpMedium',
    label: 'Attack Up Medium'
  },
  {
    value: 'attackUpLarge',
    label: 'Attack Up Large'
  },
  {
    value: 'attackDownSmall',
    label: 'Attack Down Small',
    className: 'danger-text'
  },
  {
    value: 'attackDownMedium',
    label: 'Attack Down Medium',
    className: 'danger-text'
  },
  {
    value: 'attackDownLarge',
    label: 'Attack Down Large',
    className: 'danger-text'
  }
];

export const elementAttackOptions: OptionProps<ElementArgs['elementAttack']>[] =
  [
    {
      value: 'none',
      label: 'None'
    },
    {
      value: 'up',
      label: 'Element Attack Up'
    },
    {
      value: 'down',
      label: 'Element Attack Down',
      className: 'danger-text'
    }
  ];

export const criticalHitOptions: OptionProps<RawArgs['criticalHit']>[] = [
  {
    value: 'none',
    label: 'None'
  },
  {
    value: 'positive',
    label: 'Positive'
  },
  {
    value: 'negative',
    label: 'Negative',
    className: 'danger-text'
  }
];

export const lowHealthSkillOptions: OptionProps<RawArgs['lowHealthSkill']>[] = [
  {
    value: 'none',
    label: 'None'
  },
  {
    value: 'adrenalineTwo',
    label: 'Adrenaline+2'
  },
  {
    value: 'heroics',
    label: 'Felyne Heroics'
  }
];

export const fortifyOptions: OptionProps<RawArgs['fortify']>[] = [
  {
    value: 'none',
    label: 'None'
  },
  {
    value: 'firstFaint',
    label: '1st Fortify'
  },
  {
    value: 'secondFaint',
    label: '2nd Fortify'
  }
];

export const demondrugOptions: OptionProps<WeaponClassArgs['demondrug']>[] = [
  {
    value: 'none',
    label: 'None'
  },
  {
    value: 'demondrug',
    label: 'Demondrug'
  },
  {
    value: 'megaDemondrug',
    label: 'Mega Demondrug'
  },
  {
    value: 'kitchenAttackSmall',
    label: 'Kitchen Attack Up Small'
  },
  {
    value: 'kitchenAttackLarge',
    label: 'Kitchen Attack Up Large'
  }
];

export const mightOptions: OptionProps<WeaponClassArgs['might']>[] = [
  {
    value: 'none',
    label: 'None'
  },
  {
    value: 'mightSeed',
    label: 'Might Seed'
  },
  {
    value: 'demonFlute',
    label: 'Demon Flute'
  },
  {
    value: 'mightPill',
    label: 'Might Pill'
  }
];
