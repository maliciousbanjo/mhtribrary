import { DamageTypes, Weapons } from 'mh3-data';
import { WeaponClass } from 'mh3-data/weapons';
import { getWeaponAttackOptions } from './weapon-options';

// Iron Sword
export const WEAPON_INITIAL_STATE = Weapons.getWeapon(
  WeaponClass.GREAT_SWORD,
  0
);
export const WEAPON_ATTACK_INITIAL_STATE = 'Unsheathe Attack';

export const DEFAULT_WEAPON_MULTIPLIERS: DamageTypes.WeaponMultipliers = {
  middleOfBlade: false,
  switchAxeMode: 'axe',
  swordAndShieldMode: 'land',
  longsword: {
    fullSpiritGauge: false,
    spiritGaugeColor: 'NONE'
  }
};

export const WEAPON_ARGS_INITIAL_STATE: Omit<
  DamageTypes.WeaponArgs,
  'weaponMultipliers'
> = {
  weaponClass: WEAPON_INITIAL_STATE.type,
  weaponId: WEAPON_INITIAL_STATE.id,
  sharpness: WEAPON_INITIAL_STATE.sharpness.length - 1,
  attackName: getWeaponAttackOptions(WEAPON_INITIAL_STATE.type)[0].value
};

interface WeaponClassAction {
  type: 'WEAPON_CLASS';
  payload: DamageTypes.WeaponArgs['weaponClass'];
}

interface WeaponIdAction {
  type: 'WEAPON_ID';
  payload: DamageTypes.WeaponArgs['weaponId'];
}

interface SharpnessAction {
  type: 'SHARPNESS';
  payload: DamageTypes.WeaponArgs['sharpness'];
}

interface AttackNameAction {
  type: 'ATTACK_NAME';
  payload: DamageTypes.WeaponArgs['attackName'];
}

export type WeaponArgReducerActions =
  | WeaponClassAction
  | WeaponIdAction
  | AttackNameAction
  | SharpnessAction;

export function weaponArgsReducer(
  state: Omit<DamageTypes.WeaponArgs, 'weaponMultipliers'>,
  action: WeaponArgReducerActions
): Omit<DamageTypes.WeaponArgs, 'weaponMultipliers'> {
  switch (action.type) {
    case 'WEAPON_CLASS': {
      // Get first weapon of provided class from dataset
      const initialWeapon = Weapons.getWeapon(action.payload, 0);
      return {
        weaponClass: action.payload,
        weaponId: initialWeapon.id,
        sharpness: initialWeapon.sharpness.length - 1,
        attackName: getWeaponAttackOptions(action.payload)[0].value
      };
    }
    case 'WEAPON_ID': {
      // Also sets sharpness to the correct value for the new weapon
      const newWeapon = Weapons.getWeapon(state.weaponClass, action.payload);
      return {
        ...state,
        weaponId: newWeapon.id,
        sharpness: newWeapon.sharpness.length - 1
      };
    }
    case 'SHARPNESS': {
      const currentWeapon = Weapons.getWeapon(
        state.weaponClass,
        state.weaponId
      );
      // Validate sharpness
      if (action.payload > currentWeapon.sharpnessUp.length) {
        throw new Error(
          `${currentWeapon.name} cannot reach ${Weapons.sharpnessAsString(action.payload)} sharpness`
        );
      }
      return {
        ...state,
        sharpness: action.payload
      };
    }
    case 'ATTACK_NAME': {
      const weaponAttacks = getWeaponAttackOptions(state.weaponClass);
      // Validate
      if (!weaponAttacks.some(atk => atk.value === action.payload)) {
        throw new Error(
          `${action.payload} is not a valid ${state.weaponClass} attack`
        );
      }
      return {
        ...state,
        attackName: action.payload
      };
    }
    default:
      return state;
  }
}

interface GreatSwordMultipliersAction {
  type: 'GREAT_SWORD';
  payload: DamageTypes.WeaponMultipliers['middleOfBlade'];
}

interface SwitchAxeMultipliersAction {
  type: 'SWITCH_AXE';
  payload: DamageTypes.WeaponMultipliers['switchAxeMode'];
}

interface SwordAndShieldMultipliersAction {
  type: 'SWORD_AND_SHIELD';
  payload: DamageTypes.WeaponMultipliers['swordAndShieldMode'];
}

interface LongswordMultipliersAction {
  type: 'LONGSWORD';
  payload: Partial<{
    middleOfBlade: DamageTypes.WeaponMultipliers['middleOfBlade'];
    fullSpiritGauge: DamageTypes.WeaponMultipliers['longsword']['fullSpiritGauge'];
    spiritGaugeColor: DamageTypes.WeaponMultipliers['longsword']['spiritGaugeColor'];
  }>;
}

export type WeaponMultipliersReducerActions =
  | GreatSwordMultipliersAction
  | SwitchAxeMultipliersAction
  | SwordAndShieldMultipliersAction
  | LongswordMultipliersAction;

export function weaponMultipliersReducer(
  state: DamageTypes.WeaponMultipliers,
  action: WeaponMultipliersReducerActions
): DamageTypes.WeaponMultipliers {
  switch (action.type) {
    case 'GREAT_SWORD':
      return {
        ...state,
        middleOfBlade: action.payload
      };
    case 'SWITCH_AXE':
      return {
        ...state,
        switchAxeMode: action.payload
      };
    case 'SWORD_AND_SHIELD':
      return {
        ...state,
        swordAndShieldMode: action.payload
      };
    case 'LONGSWORD':
      return {
        ...state,
        middleOfBlade: action.payload.middleOfBlade ?? state.middleOfBlade,
        longsword: {
          fullSpiritGauge:
            action.payload.fullSpiritGauge ?? state.longsword.fullSpiritGauge,
          spiritGaugeColor:
            action.payload.spiritGaugeColor ?? state.longsword.spiritGaugeColor
        }
      };
    default:
      return state;
  }
}
