import { DamageTypes } from 'mh3-data';

export type RawArgs = DamageTypes.DamageBuffArgs['rawArgs'];
export type ElementArgs = DamageTypes.DamageBuffArgs['elementArgs'];
export type WeaponClassArgs = DamageTypes.DamageBuffArgs['weaponClassArgs'];

export type RawArgReducerActions = 'CRITICAL' | 'LOW_HEALTH_SKILL' | 'FORTIFY';
export type ElementArgReducerActions = 'ELEMENT_ATTACK' | 'AWAKEN';
export type WeaponClassArgReducerActions =
  | 'POWERCHARM'
  | 'POWERTALON'
  | 'ARMOR'
  | 'DEMONDRUG'
  | 'MIGHT';
