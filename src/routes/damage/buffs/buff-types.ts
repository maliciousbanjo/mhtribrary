import { DamageTypes } from 'mh3-data';

export type RawArgs = DamageTypes.DamageBuffArgs['rawArgs'];
export type ElementArgs = DamageTypes.DamageBuffArgs['elementArgs'];
export type WeaponClassArgs = DamageTypes.DamageBuffArgs['weaponClassArgs'];

interface CriticalAction {
  type: 'CRITICAL';
  payload: RawArgs['criticalHit'];
}

interface LowHealthAction {
  type: 'LOW_HEALTH_SKILL';
  payload: RawArgs['lowHealthSkill'];
}

interface FortifyAction {
  type: 'FORTIFY';
  payload: RawArgs['fortify'];
}

export type RawArgReducerAction =
  | CriticalAction
  | LowHealthAction
  | FortifyAction;

interface ElementAttackAction {
  type: 'ELEMENT_ATTACK';
  payload: ElementArgs['elementAttack'];
}

interface AwakenAction {
  type: 'AWAKEN';
  payload: ElementArgs['awaken'];
}

export type ElementArgReducerActions = ElementAttackAction | AwakenAction;

interface PowercharmAction {
  type: 'POWERCHARM';
  payload: WeaponClassArgs['powercharm'];
}
interface PowertalonAction {
  type: 'POWERTALON';
  payload: WeaponClassArgs['powertalon'];
}
interface ArmorAction {
  type: 'ARMOR';
  payload: WeaponClassArgs['armor'];
}
interface DemondrugAction {
  type: 'DEMONDRUG';
  payload: WeaponClassArgs['demondrug'];
}
interface MightAction {
  type: 'MIGHT';
  payload: WeaponClassArgs['might'];
}

export type WeaponClassArgReducerActions =
  | PowercharmAction
  | PowertalonAction
  | ArmorAction
  | DemondrugAction
  | MightAction;
