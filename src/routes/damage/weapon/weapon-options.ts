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
import { capitalize } from '../../../utils/format-utils';

export const weaponClassOptions: OptionProps<WeaponClass>[] = [
  { value: WeaponClass.GREAT_SWORD },
  { value: WeaponClass.HAMMER },
  { value: WeaponClass.LANCE },
  { value: WeaponClass.LONGSWORD },
  { value: WeaponClass.SWITCH_AXE },
  { value: WeaponClass.SWORD_AND_SHIELD }
];

const greatSwordOptions = GreatSword.GreatSwords.map<OptionProps<number>>(
  gs => ({
    label: gs.name,
    value: gs.id
  })
);

const hammerOptions = Hammer.Hammers.map<OptionProps<number>>(hm => ({
  label: hm.name,
  value: hm.id
}));

const lanceOptions = Lance.Lances.map<OptionProps<number>>(lnc => ({
  label: lnc.name,
  value: lnc.id
}));

const longswordOptions = Longsword.Longswords.map<OptionProps<number>>(ls => ({
  label: ls.name,
  value: ls.id
}));

const switchAxeOptions = SwitchAxe.SwitchAxes.map<OptionProps<number>>(
  swaxe => ({
    label: swaxe.name,
    value: swaxe.id
  })
);

const swordAndShieldOptions = SwordAndShield.SwordAndShields.map<
  OptionProps<number>
>(sns => ({
  label: sns.name,
  value: sns.id
}));

export function getWeaponSelectOptions(
  weaponClass: WeaponClass
): OptionProps<number>[] {
  switch (weaponClass) {
    case 'Great Sword':
      return greatSwordOptions;
    case 'Hammer':
      return hammerOptions;
    case 'Lance':
      return lanceOptions;
    case 'Longsword':
      return longswordOptions;
    case 'Switch Axe':
      return switchAxeOptions;
    case 'Sword and Shield':
      return swordAndShieldOptions;
    default:
      throw new Error(`Invalid weapon selection ${weaponClass}`);
  }
}

// WEAPON ATTACK NAMES
const greatSwordAttackOptions =
  GreatSword.GreatSwordDamageProperties.attackModes[0].attacks.map<
    OptionProps<GreatSwordTypes.GreatSwordAttack>
  >(atk => ({ value: atk.name }));

const hammerAttackOptions =
  Hammer.HammerDamageProperties.attackModes[0].attacks.map<
    OptionProps<HammerTypes.HammerAttack>
  >(atk => ({ value: atk.name }));

const lanceAttackOptions =
  Lance.LanceDamageProperties.attackModes[0].attacks.map<
    OptionProps<LanceTypes.LanceAttack>
  >(atk => ({ value: atk.name }));

const longswordAttackOptions =
  Longsword.LongswordDamageProperties.attackModes[0].attacks.map<
    OptionProps<LongswordTypes.LongswordAttack>
  >(atk => ({
    value: atk.name
  }));

const switchAxeAxeAttacks = SwitchAxe.SwitchAxeDamageProperties.attackModes
  .find(atkMode => atkMode.name === 'axe')
  ?.attacks.map<OptionProps<SwitchAxeTypes.SwitchAxeAttack>>(atk => ({
    value: atk.name
  }));

const switchAxeSwordAttacks = SwitchAxe.SwitchAxeDamageProperties.attackModes
  .find(atkMode => atkMode.name === 'sword')
  ?.attacks.map<OptionProps<SwitchAxeTypes.SwitchAxeAttack>>(atk => ({
    value: atk.name
  }));

const swordAndShieldLandAttacks =
  SwordAndShield.SwordAndShieldDamageProperties.attackModes
    .find(atkMode => atkMode.name === 'land')
    ?.attacks.map<OptionProps<SwordAndShieldTypes.SwordAndShieldAttack>>(
      atk => ({
        value: atk.name
      })
    );

const swordAndShieldWaterAttacks =
  SwordAndShield.SwordAndShieldDamageProperties.attackModes
    .find(atkMode => atkMode.name === 'water')
    ?.attacks.map<OptionProps<SwordAndShieldTypes.SwordAndShieldAttack>>(
      atk => ({
        value: atk.name
      })
    );

export function getWeaponAttackOptions(
  weaponClass: WeaponClass,
  mode?:
    | SwitchAxeTypes.SwitchAxeAttackMode
    | SwordAndShieldTypes.SwordAndShieldAttackMode
) {
  switch (weaponClass) {
    case 'Great Sword':
      return greatSwordAttackOptions;
    case 'Hammer':
      return hammerAttackOptions;
    case 'Lance':
      return lanceAttackOptions;
    case 'Longsword':
      return longswordAttackOptions;
    case 'Switch Axe': {
      if (!mode) throw Error(`Attack mode must be provided for ${weaponClass}`);
      return mode === 'axe' ? switchAxeAxeAttacks : switchAxeSwordAttacks;
    }
    case 'Sword and Shield': {
      if (!mode) throw Error(`Attack mode must be provided for ${weaponClass}`);
      return mode === 'land'
        ? swordAndShieldLandAttacks
        : swordAndShieldWaterAttacks;
    }
    default:
      throw new Error(`Invalid weapon selection ${weaponClass}`);
  }
}

// UNIQUE WEAPON OPTIONS

export const swordAndShieldModeOptions =
  SwordAndShield.SwordAndShieldDamageProperties.attackModes.map<
    OptionProps<string>
  >(mode => ({ value: mode.name, label: capitalize(mode.name) }));

export const switchAxeModeOptions =
  SwitchAxe.SwitchAxeDamageProperties.attackModes.map<OptionProps<string>>(
    mode => ({ value: mode.name, label: capitalize(mode.name) })
  );

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
