import {
  RawArgs,
  RawArgReducerAction,
  ElementArgs,
  ElementArgReducerActions,
  WeaponClassArgs,
  WeaponClassArgReducerActions
} from './buff-types';

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
