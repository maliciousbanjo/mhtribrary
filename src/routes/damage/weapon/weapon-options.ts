import { OptionProps } from '@blueprintjs/core';
import {
  GreatSword,
  GreatSwordTypes,
  Hammer,
  HammerTypes,
  Lance,
  LanceTypes,
  Longsword,
  LongswordTypes,
  SwitchAxe,
  SwitchAxeTypes,
  SwordAndShield,
  SwordAndShieldTypes,
  WeaponClass
} from 'mh3-data/weapons';

export const weaponClassOptions: OptionProps<WeaponClass>[] = [
  { value: WeaponClass.GREAT_SWORD },
  { value: WeaponClass.HAMMER },
  { value: WeaponClass.LANCE },
  { value: WeaponClass.LONGSWORD },
  { value: WeaponClass.SWITCH_AXE },
  { value: WeaponClass.SWORD_AND_SHIELD }
];

export const greatSwordOptions = GreatSword.GreatSwords.map<
  OptionProps<number>
>(gs => ({
  label: gs.name,
  value: gs.id
}));

export const hammerOptions = Hammer.Hammers.map<OptionProps<number>>(hm => ({
  label: hm.name,
  value: hm.id
}));

export const lanceOptions = Lance.Lances.map<OptionProps<number>>(lnc => ({
  label: lnc.name,
  value: lnc.id
}));

export const longswordOptions = Longsword.Longswords.map<OptionProps<number>>(
  ls => ({
    label: ls.name,
    value: ls.id
  })
);

export const switchAxeOptions = SwitchAxe.SwitchAxes.map<OptionProps<number>>(
  swaxe => ({
    label: swaxe.name,
    value: swaxe.id
  })
);

export const swordAndShieldOptions = SwordAndShield.SwordAndShields.map<
  OptionProps<number>
>(sns => ({
  label: sns.name,
  value: sns.id
}));

// WEAPON ATTACK NAMES

export const greatSwordAttackOptions: OptionProps<GreatSwordTypes.GreatSwordAttack>[] =
  [
    { value: 'Unsheathe Attack' },
    { value: 'Regular Slice' },
    { value: 'Sideways Slash' },
    { value: 'Upswing' },
    { value: 'L1 Charge' },
    { value: 'L2 Charge' },
    { value: 'L3 Charge' },
    { value: 'Overcharge' },
    { value: 'Slap' },
    { value: 'Overhead Smash' },
    { value: 'L1 Smash Charge' },
    { value: 'L2 Smash Charge' },
    { value: 'L3 Smash Charge' },
    { value: 'Smash Overcharge' }
  ];

export const hammerAttackOptions: OptionProps<HammerTypes.HammerAttack>[] = [
  { value: 'Unsheathe Attack' },
  { value: 'Side Swing' },
  { value: 'Triple Pound' },
  { value: 'Short Charge' },
  { value: 'Uppercut' },
  { value: 'Superpound' },
  { value: 'Spin Attack' },
  { value: 'Spin Release' },
  { value: 'Spin Golfswing' },
  { value: 'Spin Finisher' }
];

export const lanceAttackOptions: OptionProps<LanceTypes.LanceAttack>[] = [
  { value: 'Unsheathe Attack' },
  { value: 'Low Stab Combo' },
  { value: 'High Stab Combo' },
  { value: 'Fast Counter' },
  { value: 'Charge Counter' },
  { value: 'Sweep' },
  { value: 'Charge' },
  { value: 'Charge Finisher' },
  { value: 'Guard Attack' },
  { value: 'Shield Bash' }
];

export const longswordAttackOptions: OptionProps<LongswordTypes.LongswordAttack>[] =
  [
    { value: 'Unsheathe Attack' },
    { value: 'Sweep' },
    { value: 'Step Slash' },
    { value: 'Downward Slash' },
    { value: 'Stab' },
    { value: 'Upward Slash' },
    { value: 'Empty Spirit' },
    { value: 'Spirit 1' },
    { value: 'Spirit 2' },
    { value: 'Spirit 3' },
    { value: 'Spirit Finisher' }
  ];

export const switchAxeAttackOptions: OptionProps<SwitchAxeTypes.SwitchAxeAttack>[] =
  [
    { value: 'Unsheathe Attack' },
    { value: 'Overhead Slash' },
    { value: 'Forward Slash' },
    { value: 'Side Slash' },
    { value: 'Rising Slash' },
    { value: 'Slash Combo' },
    { value: 'Switch to Sword' },
    { value: 'Discharge Thrust' },
    { value: 'Discharge Combo' },
    { value: 'Discharge Finisher' },
    { value: 'Switch to Axe' }
  ];

export const swordAndShieldAttackOptions: OptionProps<SwordAndShieldTypes.SwordAndShieldAttack>[] =
  [
    { value: 'Unsheathe Attack' },
    { value: 'Jumping Slash' },
    { value: 'Rising Slash' },
    { value: 'Regular Combo' },
    { value: 'Horizontal Combo' },
    { value: 'Shield Combo' },
    { value: 'Revolving Slice' },
    { value: 'Guard Slice' },
    { value: 'Unsheathe Attack' },
    { value: 'Forward Slash' },
    { value: 'Normal Slash' },
    { value: 'Upward Slash' },
    { value: 'Uppercut Slash' },
    { value: 'Horizontal Slash' },
    { value: 'Shield Bash' },
    { value: 'Rising Slice' },
    { value: 'Revolving Slice' },
    { value: 'Guard Slice' }
  ];

export function getWeaponAttackOptions(weaponClass: WeaponClass) {
  switch (weaponClass) {
    case 'Great Sword':
      return greatSwordAttackOptions;
    case 'Hammer':
      return hammerAttackOptions;
    case 'Lance':
      return lanceAttackOptions;
    case 'Longsword':
      return longswordAttackOptions;
    case 'Switch Axe':
      return switchAxeAttackOptions;
    case 'Sword and Shield':
      return swordAndShieldAttackOptions;
    default:
      throw new Error(`Invalid weapon selection ${weaponClass}`);
  }
}

// UNIQUE WEAPON OPTIONS

export const swordAndShieldModes =
  SwordAndShield.SwordAndShieldDamageProperties.attackModes.map(
    mode => mode.name
  );

export const switchAxeModes =
  SwitchAxe.SwitchAxeDamageProperties.attackModes.map(mode => mode.name);

export const spiritGaugeColorOptions: OptionProps<LongswordTypes.SpiritGaugeColors>[] =
  [
    {
      value: 'NONE',
      label: 'None'
    },
    {
      value: 'WHITE',
      label: 'White'
    },
    {
      value: 'YELLOW',
      label: 'Yellow'
    },
    {
      value: 'RED',
      label: 'Red'
    }
  ];
