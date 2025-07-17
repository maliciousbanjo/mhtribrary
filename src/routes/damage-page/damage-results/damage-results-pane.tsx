import { Damage, DamageTypes } from 'mh3-data';
import { v3 as uuidv3 } from 'uuid';
import React from 'react';
import { WeaponArgsState } from '../weapon-pane';
import { RawArgs, ElementArgs, WeaponClassArgs } from '../buffs-pane';
import { Section, SectionCard } from '@blueprintjs/core';
import { MonsterParameters } from '../monster-pane';
import { getMonsterStatMultipliers } from 'mh3-data/monsterLevels';

interface DamageResultsPaneProps {
  weaponArgs: WeaponArgsState;
  monsterParameters: MonsterParameters;
  rawArgs: RawArgs;
  elementArgs: ElementArgs;
  weaponClassArgs: WeaponClassArgs;
}

export function DamageResultsPane({
  weaponArgs,
  monsterParameters,
  rawArgs,
  elementArgs,
  weaponClassArgs
}: Readonly<DamageResultsPaneProps>) {
  const damage = React.useMemo<DamageTypes.Damage[]>(() => {
    const { monsterName, hitzoneIndex, monsterLevel, monsterStateIndex } =
      monsterParameters;

    const monsterStatMultipliers = getMonsterStatMultipliers(
      monsterName,
      monsterLevel
    );

    return Damage.calculateDamage(
      weaponArgs,
      {
        monsterName,
        hitzoneIndex,
        monsterStateIndex,
        monsterStatMultipliers
      },
      {
        rawArgs,
        elementArgs,
        weaponClassArgs
      }
    );
  }, [elementArgs, monsterParameters, rawArgs, weaponArgs, weaponClassArgs]);

  const totalDamage = damage.reduce<{
    dmg: number;
    ko: number;
  }>(
    (result, nextHit) => {
      return {
        dmg: result.dmg + nextHit.totalDamage,
        ko: nextHit.koDamage ? nextHit.koDamage + result.ko : result.ko
      };
    },
    { dmg: 0, ko: 0 }
  );

  return (
    <Section compact title="Results" className="damage-results-pane">
      <SectionCard>
        <div className="damage-results-content">
          {damage.map<JSX.Element>((damageResult, index) => {
            const key = uuidv3(
              JSON.stringify(damageResult) + index,
              uuidv3.URL
            );
            return (
              <p key={key}>
                Hit {index + 1}: <b>{damageResult.totalDamage} </b>
                {damageResult.koDamage !== undefined && (
                  <>
                    and <b>{damageResult.koDamage}</b> KO
                  </>
                )}
              </p>
            );
          })}
          Total Damage: <b>{totalDamage.dmg} </b>
          {totalDamage.ko !== 0 && (
            <>
              and <b>{totalDamage.ko}</b> KO
            </>
          )}
        </div>
      </SectionCard>
    </Section>
  );
}
