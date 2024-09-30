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
