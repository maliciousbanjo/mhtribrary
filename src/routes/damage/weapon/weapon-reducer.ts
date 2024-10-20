import { DamageTypes, Weapons } from 'mh3-data';
import { WeaponClass } from 'mh3-data/weapons';

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

export type WeaponArgsState = Omit<
  DamageTypes.WeaponArgs,
  'weaponMultipliers'
> & { weaponMultipliers: DamageTypes.WeaponMultipliers };

export const WEAPON_ARGS_INITIAL_STATE: WeaponArgsState = {
  weaponClass: WEAPON_INITIAL_STATE.type,
  weaponId: WEAPON_INITIAL_STATE.id,
  sharpness: WEAPON_INITIAL_STATE.sharpness.length - 1,
  attackName: Weapons.getWeaponDamageProperties(WEAPON_INITIAL_STATE.type)
    .attackModes[0].attacks[0].name,
  weaponMultipliers: DEFAULT_WEAPON_MULTIPLIERS
};

interface WeaponClassAction {
  type: 'WEAPON_CLASS';
  payload: WeaponArgsState['weaponClass'];
}

interface WeaponIdAction {
  type: 'WEAPON_ID';
  payload: WeaponArgsState['weaponId'];
}

interface SharpnessAction {
  type: 'SHARPNESS';
  payload: WeaponArgsState['sharpness'];
}

interface AttackNameAction {
  type: 'ATTACK_NAME';
  payload: WeaponArgsState['attackName'];
}

interface GreatSwordMultipliersAction {
  type: 'MULTIPLIER_GREAT_SWORD';
  payload: DamageTypes.WeaponMultipliers['middleOfBlade'];
}

interface SwitchAxeMultipliersAction {
  type: 'MULTIPLIER_SWITCH_AXE';
  payload: DamageTypes.WeaponMultipliers['switchAxeMode'];
}

interface SwordAndShieldMultipliersAction {
  type: 'MULTIPLIER_SWORD_AND_SHIELD';
  payload: DamageTypes.WeaponMultipliers['swordAndShieldMode'];
}

interface LongswordMultipliersAction {
  type: 'MULTIPLIER_LONGSWORD';
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

export type WeaponArgReducerActions =
  | WeaponClassAction
  | WeaponIdAction
  | AttackNameAction
  | SharpnessAction
  | WeaponMultipliersReducerActions;

export function weaponArgsReducer(
  state: WeaponArgsState,
  action: WeaponArgReducerActions
): WeaponArgsState {
  switch (action.type) {
    case 'WEAPON_CLASS': {
      // Get first weapon of provided class from dataset
      const initialWeapon = Weapons.getWeapon(action.payload, 0);
      return {
        weaponClass: action.payload,
        weaponId: initialWeapon.id,
        sharpness: initialWeapon.sharpness.length - 1,
        attackName: Weapons.getWeaponDamageProperties(action.payload)
          .attackModes[0].attacks[0].name,
        weaponMultipliers: DEFAULT_WEAPON_MULTIPLIERS
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
      if (action.payload > currentWeapon.sharpnessUp.length - 1) {
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
      const attackModes = Weapons.getWeaponDamageProperties(
        state.weaponClass
      ).attackModes;

      let mode = '';
      switch (state.weaponClass) {
        case WeaponClass.SWITCH_AXE:
          mode = state.weaponMultipliers.switchAxeMode;
          break;
        case WeaponClass.SWORD_AND_SHIELD:
          mode = state.weaponMultipliers.swordAndShieldMode;
          break;
        default:
          break;
      }

      const weaponAttacks =
        attackModes.find(atkMode => atkMode.name === mode)?.attacks ??
        attackModes[0].attacks;

      // Validate
      if (!weaponAttacks.some(atk => atk.name === action.payload)) {
        throw new Error(
          `${action.payload} is not a valid ${state.weaponClass} attack`
        );
      }
      return {
        ...state,
        attackName: action.payload
      };
    }
    case 'MULTIPLIER_GREAT_SWORD':
      return {
        ...state,
        weaponMultipliers: {
          ...state.weaponMultipliers,
          middleOfBlade: action.payload
        }
      };
    case 'MULTIPLIER_SWITCH_AXE':
      return {
        ...state,
        attackName: 'Unsheathe Attack',
        weaponMultipliers: {
          ...state.weaponMultipliers,
          switchAxeMode: action.payload
        }
      };
    case 'MULTIPLIER_SWORD_AND_SHIELD':
      return {
        ...state,
        attackName: 'Unsheathe Attack',
        weaponMultipliers: {
          ...state.weaponMultipliers,
          swordAndShieldMode: action.payload
        }
      };
    case 'MULTIPLIER_LONGSWORD':
      return {
        ...state,
        weaponMultipliers: {
          ...state.weaponMultipliers,
          middleOfBlade:
            action.payload.middleOfBlade ??
            state.weaponMultipliers.middleOfBlade,
          longsword: {
            fullSpiritGauge:
              action.payload.fullSpiritGauge ??
              state.weaponMultipliers.longsword?.fullSpiritGauge ??
              DEFAULT_WEAPON_MULTIPLIERS.longsword.fullSpiritGauge,
            spiritGaugeColor:
              action.payload.spiritGaugeColor ??
              state.weaponMultipliers.longsword?.spiritGaugeColor ??
              DEFAULT_WEAPON_MULTIPLIERS.longsword.spiritGaugeColor
          }
        }
      };
    default:
      return state;
  }
}
