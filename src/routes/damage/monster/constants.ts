import { Monsters, MonsterTypes } from 'mh3-data';

export const allMonsters: MonsterTypes.Monster[] = [
  ...Monsters.LargeMonsterData,
  ...Monsters.SmallMonsterData
];
