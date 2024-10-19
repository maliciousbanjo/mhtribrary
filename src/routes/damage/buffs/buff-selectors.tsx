import { Checkbox, ControlGroup, RadioGroup } from '@blueprintjs/core';
import {
  armorSkillOptions,
  elementAttackOptions,
  criticalHitOptions,
  lowHealthSkillOptions,
  fortifyOptions,
  demondrugOptions,
  mightOptions
} from './constants';
import {
  ElementArgReducerActions,
  ElementArgs,
  RawArgReducerAction,
  RawArgs,
  WeaponClassArgReducerActions,
  WeaponClassArgs
} from './buff-types';

interface BuffSelectorsProps {
  rawArgs: RawArgs;
  dispatchRawArgs: React.Dispatch<RawArgReducerAction>;
  elementArgs: ElementArgs;
  dispatchElementArgs: React.Dispatch<ElementArgReducerActions>;
  weaponClassArgs: WeaponClassArgs;
  dispatchWeaponClassArgs: React.Dispatch<WeaponClassArgReducerActions>;
}

export function BuffSelectors({
  rawArgs,
  dispatchRawArgs,
  elementArgs,
  dispatchElementArgs,
  weaponClassArgs,
  dispatchWeaponClassArgs
}: BuffSelectorsProps) {
  return (
    <div>
      <h3>Buffs</h3>
      <div className="attack-buffs">
        <ControlGroup vertical>
          <span>
            <Checkbox
              key="powercharm"
              label="Powercharm"
              checked={weaponClassArgs.powercharm}
              onChange={event => {
                dispatchWeaponClassArgs({
                  type: 'POWERCHARM',
                  payload: event.target.checked
                });
              }}
            />
            <Checkbox
              key="powertalon"
              label="Powertalon"
              checked={weaponClassArgs.powertalon}
              onChange={event => {
                dispatchWeaponClassArgs({
                  type: 'POWERTALON',
                  payload: event.target.checked
                });
              }}
            />
          </span>
          <RadioGroup
            key="critical-hit"
            label="Critical Hit"
            options={criticalHitOptions}
            selectedValue={rawArgs.criticalHit}
            onChange={event => {
              dispatchRawArgs({
                type: 'CRITICAL',
                payload: event.currentTarget.value as RawArgs['criticalHit']
              });
            }}
          />
        </ControlGroup>
        <RadioGroup
          key="armor-skill"
          label="Attack (Armor skill)"
          options={armorSkillOptions}
          selectedValue={weaponClassArgs.armor}
          onChange={event => {
            dispatchWeaponClassArgs({
              type: 'ARMOR',
              payload: event.currentTarget.value as WeaponClassArgs['armor']
            });
          }}
        />
        <RadioGroup
          key="might"
          label="Might"
          options={mightOptions}
          selectedValue={weaponClassArgs.might}
          onChange={event => {
            dispatchWeaponClassArgs({
              type: 'MIGHT',
              payload: event.currentTarget.value as WeaponClassArgs['might']
            });
          }}
        />
        <RadioGroup
          key="demondrug"
          label="Demondrug"
          options={demondrugOptions}
          selectedValue={weaponClassArgs.demondrug}
          onChange={event => {
            dispatchWeaponClassArgs({
              type: 'DEMONDRUG',
              payload: event.currentTarget.value as WeaponClassArgs['demondrug']
            });
          }}
        />
        <RadioGroup
          key="low-health"
          label="Low HP"
          options={lowHealthSkillOptions}
          selectedValue={rawArgs.lowHealthSkill}
          onChange={event => {
            dispatchRawArgs({
              type: 'LOW_HEALTH_SKILL',
              payload: event.currentTarget.value as RawArgs['lowHealthSkill']
            });
          }}
        />
        <span>
          <ControlGroup vertical>
            <RadioGroup
              key="element-attack"
              label="Element Attack"
              options={elementAttackOptions}
              selectedValue={elementArgs.elementAttack}
              onChange={event => {
                dispatchElementArgs({
                  type: 'ELEMENT_ATTACK',
                  payload: event.currentTarget
                    .value as ElementArgs['elementAttack']
                });
              }}
            />
            <Checkbox
              key="awaken"
              label="Awaken"
              checked={elementArgs.awaken}
              onChange={event => {
                dispatchElementArgs({
                  type: 'AWAKEN',
                  payload: event.target.checked
                });
              }}
            />
          </ControlGroup>
        </span>
        <RadioGroup
          key="fortify"
          label="Fortify"
          options={fortifyOptions}
          selectedValue={rawArgs.fortify}
          onChange={event => {
            dispatchRawArgs({
              type: 'FORTIFY',
              payload: event.currentTarget.value as RawArgs['fortify']
            });
          }}
        />
      </div>
    </div>
  );
}
