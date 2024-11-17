import { Section, SectionCard } from '@blueprintjs/core';
import { BuffSelectors } from './buff-selectors';
import {
  RawArgReducerAction,
  ElementArgReducerActions,
  WeaponClassArgReducerActions,
  RawArgs,
  ElementArgs,
  WeaponClassArgs
} from './buff-types';

export interface BuffsProps {
  rawArgs: RawArgs;
  dispatchRawArgs: React.Dispatch<RawArgReducerAction>;
  elementArgs: ElementArgs;
  dispatchElementArgs: React.Dispatch<ElementArgReducerActions>;
  weaponClassArgs: WeaponClassArgs;
  dispatchWeaponClassArgs: React.Dispatch<WeaponClassArgReducerActions>;
}

export function Buffs({
  rawArgs,
  dispatchRawArgs,
  elementArgs,
  dispatchElementArgs,
  weaponClassArgs,
  dispatchWeaponClassArgs
}: BuffsProps) {
  return (
    <Section compact title="Buffs" className="buffs">
      <SectionCard>
        <BuffSelectors
          rawArgs={rawArgs}
          dispatchRawArgs={dispatchRawArgs}
          elementArgs={elementArgs}
          dispatchElementArgs={dispatchElementArgs}
          weaponClassArgs={weaponClassArgs}
          dispatchWeaponClassArgs={dispatchWeaponClassArgs}
        />
      </SectionCard>
    </Section>
  );
}
