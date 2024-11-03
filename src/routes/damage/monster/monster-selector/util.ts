import { MonsterTypes } from 'mh3-data';

/**
 * Type guard to determine if a monster is specifically a {@link MonsterTypes.LargeMonster}
 */
export function isLargeMonster(
  monster: MonsterTypes.Monster
): monster is MonsterTypes.LargeMonster {
  return (monster as MonsterTypes.LargeMonster).hp !== undefined;
}

export function getMonsterGroup(
  monster: MonsterTypes.Monster
): 'Large' | 'Small' {
  if (isLargeMonster(monster)) return 'Large';
  return 'Small';
}
