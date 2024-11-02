import { MonsterTypes } from 'mh3-data';

export interface MonsterListGroup {
  groupName: string;
  monsters: MonsterTypes.Monster[];
}

/**
 * Type guard to determine if a monster is specifically a {@link MonsterTypes.LargeMonster}
 */
export function isLargeMonster(
  monster: MonsterTypes.Monster
): monster is MonsterTypes.LargeMonster {
  return (monster as MonsterTypes.LargeMonster).hp !== undefined;
}

export function getMonsterGroups(monsters: MonsterTypes.Monster[]) {
  monsters.reduce<MonsterListGroup[]>((groups, monster) => {
    const isLarge = isLargeMonster(monster);
  }, []);
}
