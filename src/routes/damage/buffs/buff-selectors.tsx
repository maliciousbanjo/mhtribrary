import { Checkbox, RadioGroup } from '@blueprintjs/core';
import {
  armorSkillOptions,
  elementAttackOptions,
  criticalHitOptions,
  lowHealthSkillOptions,
  fortifyOptions,
  demondrugOptions,
  mightOptions
} from './buff-utils';
import {
  ElementArgReducerActions,
  ElementArgs,
  RawArgReducerActions,
  RawArgs,
  WeaponClassArgReducerActions,
  WeaponClassArgs
} from './buff-types';

interface BuffSelectorsProps {
  rawArgs: RawArgs;
  dispatchRawArgs: React.Dispatch<{
    type: RawArgReducerActions;
    payload: Partial<RawArgs>;
  }>;
  elementArgs: ElementArgs;
  dispatchElementArgs: React.Dispatch<{
    type: ElementArgReducerActions;
    payload: Partial<ElementArgs>;
  }>;
  weaponClassArgs: WeaponClassArgs;
  dispatchWeaponClassArgs: React.Dispatch<{
    type: WeaponClassArgReducerActions;
    payload: Partial<WeaponClassArgs>;
  }>;
}

export function BuffSelectors({
  rawArgs,
  dispatchRawArgs,
  elementArgs,
  dispatchElementArgs,
  weaponClassArgs,
  dispatchWeaponClassArgs
}: BuffSelectorsProps) {
  /**
   * TODO:
   * awaken (checkbox)
   */
  return (
    <div className="attack-buffs">
      <div>
        <Checkbox
          className="powercharm"
          label="Powercharm"
          checked={weaponClassArgs.powercharm}
          onChange={event => {
            dispatchWeaponClassArgs({
              type: 'POWERCHARM',
              payload: {
                powercharm: event.target.checked
              }
            });
          }}
        />
        <Checkbox
          className="powertalon"
          label="Powertalon"
          checked={weaponClassArgs.powertalon}
          onChange={event => {
            dispatchWeaponClassArgs({
              type: 'POWERTALON',
              payload: {
                powertalon: event.target.checked
              }
            });
          }}
        />
      </div>
      <RadioGroup
        className="armor-skill-radios"
        options={armorSkillOptions}
        selectedValue={weaponClassArgs.armor}
        onChange={event => {
          dispatchWeaponClassArgs({
            type: 'ARMOR',
            payload: {
              armor: event.currentTarget.value as WeaponClassArgs['armor']
            }
          });
        }}
      />
      <RadioGroup
        className="element-attack-radios"
        options={elementAttackOptions}
        selectedValue={elementArgs.elementAttack}
        onChange={event => {
          dispatchElementArgs({
            type: 'ELEMENT_ATTACK',
            payload: {
              elementAttack: event.currentTarget
                .value as ElementArgs['elementAttack']
            }
          });
        }}
      />
      <RadioGroup
        className="critical-hit-radios"
        options={criticalHitOptions}
        selectedValue={rawArgs.criticalHit}
        onChange={event => {
          dispatchRawArgs({
            type: 'CRITICAL',
            payload: {
              criticalHit: event.currentTarget.value as RawArgs['criticalHit']
            }
          });
        }}
      />
      <RadioGroup
        className="low-health-radios"
        options={lowHealthSkillOptions}
        selectedValue={rawArgs.lowHealthSkill}
        onChange={event => {
          dispatchRawArgs({
            type: 'LOW_HEALTH_SKILL',
            payload: {
              lowHealthSkill: event.currentTarget
                .value as RawArgs['lowHealthSkill']
            }
          });
        }}
      />
      <RadioGroup
        className="fortify-radios"
        options={fortifyOptions}
        selectedValue={rawArgs.fortify}
        onChange={event => {
          dispatchRawArgs({
            type: 'FORTIFY',
            payload: {
              fortify: event.currentTarget.value as RawArgs['fortify']
            }
          });
        }}
      />

      <RadioGroup
        className="demondrug-radios"
        options={demondrugOptions}
        selectedValue={weaponClassArgs.demondrug}
        onChange={event => {
          dispatchWeaponClassArgs({
            type: 'DEMONDRUG',
            payload: {
              demondrug: event.currentTarget
                .value as WeaponClassArgs['demondrug']
            }
          });
        }}
      />
      <RadioGroup
        className="might-radios"
        options={mightOptions}
        selectedValue={weaponClassArgs.might}
        onChange={event => {
          dispatchWeaponClassArgs({
            type: 'MIGHT',
            payload: {
              might: event.currentTarget.value as WeaponClassArgs['might']
            }
          });
        }}
      />
    </div>
  );
}
