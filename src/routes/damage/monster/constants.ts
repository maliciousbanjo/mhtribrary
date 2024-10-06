import { OptionProps } from '@blueprintjs/core';
import { Monsters } from 'mh3-data';

export const monsterOptions = Monsters.LargeMonsterData.map<
  OptionProps<string>
>(mon => ({
  value: mon.name
})).concat(
  Monsters.SmallMonsterData.map<OptionProps<string>>(mon => ({
    value: mon.name
  }))
);
