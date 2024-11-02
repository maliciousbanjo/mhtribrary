import { OptionProps } from '@blueprintjs/core';
import { Monsters, MonsterTypes } from 'mh3-data';

// TODO: Delete?
export const monsterOptions = Monsters.LargeMonsterData.map<
  OptionProps<string>
>(mon => ({
  value: mon.name
})).concat(
  Monsters.SmallMonsterData.map<OptionProps<string>>(mon => ({
    value: mon.name
  }))
);

export const allMonsters: MonsterTypes.Monster[] =
  Monsters.SmallMonsterData.concat(Monsters.LargeMonsterData);
