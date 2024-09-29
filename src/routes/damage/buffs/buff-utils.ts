import { OptionProps } from '@blueprintjs/core';
import {
  ElementArgReducerActions,
  ElementArgs,
  RawArgReducerActions,
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

/**
 * Custom reducer for the RawArgs field in the buffer selectors
 *
 * @see {@link React.useReducer}
 */
export function rawArgsReducer(
  state: RawArgs,
  action: {
    type: RawArgReducerActions;
    payload: Partial<RawArgs>;
  }
): RawArgs {
  switch (action.type) {
    case 'CRITICAL':
      return {
        ...state,
        criticalHit: action.payload.criticalHit ?? state.criticalHit
      };
    case 'LOW_HEALTH_SKILL':
      return {
        ...state,
        lowHealthSkill: action.payload.lowHealthSkill ?? state.lowHealthSkill
      };
    case 'FORTIFY':
      return {
        ...state,
        fortify: action.payload.fortify ?? state.fortify
      };
    default:
      return state;
  }
}

/**
 * Custom reducer for the ElementArgs field in the buff selectors
 *
 * @see {@link React.useReducer}
 */
export function elementArgsReducer(
  state: ElementArgs,
  action: {
    type: ElementArgReducerActions;
    payload: Partial<ElementArgs>;
  }
): ElementArgs {
  switch (action.type) {
    case 'ELEMENT_ATTACK':
      return {
        ...state,
        elementAttack: action.payload.elementAttack ?? state.elementAttack
      };
    case 'AWAKEN':
      return {
        ...state,
        awaken: action.payload.awaken ?? state.awaken
      };
    default:
      return state;
  }
}

/**
 * Custom reducer for the WeaponClassArgs field in the buff selectors
 *
 * @see {@link React.useReducer}
 */
export function weaponClassArgsReducer(
  state: WeaponClassArgs,
  action: {
    type: WeaponClassArgReducerActions;
    payload: Partial<WeaponClassArgs>;
  }
): WeaponClassArgs {
  switch (action.type) {
    case 'POWERCHARM':
      return {
        ...state,
        powercharm: action.payload.powercharm ?? state.powercharm
      };
    case 'POWERTALON':
      return {
        ...state,
        powertalon: action.payload.powertalon ?? state.powertalon
      };
    case 'ARMOR':
      return {
        ...state,
        armor: action.payload.armor ?? state.armor
      };
    case 'DEMONDRUG':
      return {
        ...state,
        demondrug: action.payload.demondrug ?? state.demondrug
      };
    case 'MIGHT':
      return {
        ...state,
        might: action.payload.might ?? state.might
      };
    default:
      return state;
  }
}
