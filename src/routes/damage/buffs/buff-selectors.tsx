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
import classNames from 'classnames';

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
    <div className={classNames(['column'])}>
      <h3>Buffs</h3>
      <div className="attack-buffs">
        <ControlGroup vertical>
          <span>
            <Checkbox
              className="attack-buffs--powercharm"
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
              className="attack-buffs--powertalon"
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
            label="Critical Hit"
            className="attack-buffs--critical-hit"
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
          label="Attack (Armor skill)"
          className="attack-buffs--armor-skill"
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
          label="Demondrug"
          className="attack-buffs--demondrug"
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
          label="Might"
          className="attack-buffs--might"
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
          label="Low HP"
          className="attack-buffs--low-health"
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
          <RadioGroup
            label="Element Attack"
            className="attack-buffs--element-attack"
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
            className="attack-buffs--awaken"
            label="Awaken"
            checked={elementArgs.awaken}
            onChange={event => {
              dispatchElementArgs({
                type: 'AWAKEN',
                payload: event.target.checked
              });
            }}
          />
        </span>
        <RadioGroup
          label="Fortify"
          className="attack-buffs--fortify"
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
