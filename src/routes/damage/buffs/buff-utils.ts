import { OptionProps } from '@blueprintjs/core';
import {
  ElementArgReducerActions,
  ElementArgs,
  RawArgReducerAction,
  RawArgs,
  WeaponClassArgReducerActions,
  WeaponClassArgs
} from './buff-types';

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
    className: 'negative-skill'
  },
  {
    value: 'attackDownMedium',
    label: 'Attack Down Medium',
    className: 'negative-skill'
  },
  {
    value: 'attackDownLarge',
    label: 'Attack Down Large',
    className: 'negative-skill'
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
      className: 'negative-skill'
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
    className: 'negative-skill'
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
    value: 'mightPill',
    label: 'Might Pill'
  },
  {
    value: 'demonFlute',
    label: 'Demon Flute'
  }
];

export const RAW_ARGS_INITIAL_STATE: RawArgs = {
  criticalHit: 'none',
  lowHealthSkill: 'none',
  fortify: 'none'
};

/**
 * Custom reducer for the RawArgs field in the buffer selectors
 *
 * @see {@link React.useReducer}
 */
export function rawArgsReducer(
  state: RawArgs,
  action: RawArgReducerAction
): RawArgs {
  switch (action.type) {
    case 'CRITICAL':
      return {
        ...state,
        criticalHit: action.payload
      };
    case 'LOW_HEALTH_SKILL':
      return {
        ...state,
        lowHealthSkill: action.payload
      };
    case 'FORTIFY':
      return {
        ...state,
        fortify: action.payload
      };
    default:
      return state;
  }
}

export const ELEMENTAL_ARGS_INITIAL_STATE: ElementArgs = {
  awaken: false,
  elementAttack: 'none'
};

/**
 * Custom reducer for the ElementArgs field in the buff selectors
 *
 * @see {@link React.useReducer}
 */
export function elementArgsReducer(
  state: ElementArgs,
  action: ElementArgReducerActions
): ElementArgs {
  switch (action.type) {
    case 'ELEMENT_ATTACK':
      return {
        ...state,
        elementAttack: action.payload
      };
    case 'AWAKEN':
      return {
        ...state,
        awaken: action.payload
      };
    default:
      return state;
  }
}

export const WEAPON_CLASS_ARGS_INITIAL_STATE: WeaponClassArgs = {
  powercharm: false,
  powertalon: false,
  armor: 'none',
  demondrug: 'none',
  might: 'none'
};

/**
 * Custom reducer for the WeaponClassArgs field in the buff selectors
 *
 * @see {@link React.useReducer}
 */
export function weaponClassArgsReducer(
  state: WeaponClassArgs,
  action: WeaponClassArgReducerActions
): WeaponClassArgs {
  switch (action.type) {
    case 'POWERCHARM':
      return {
        ...state,
        powercharm: action.payload
      };
    case 'POWERTALON':
      return {
        ...state,
        powertalon: action.payload
      };
    case 'ARMOR':
      return {
        ...state,
        armor: action.payload
      };
    case 'DEMONDRUG':
      return {
        ...state,
        demondrug: action.payload
      };
    case 'MIGHT':
      return {
        ...state,
        might: action.payload
      };
    default:
      return state;
  }
}
