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

export function getMonsterGroup(
  monster: MonsterTypes.Monster
): 'Large' | 'Small' {
  if (isLargeMonster(monster)) return 'Large';
  return 'Small';
}

/**
 * Parses a list of monsters into their Large/Small groups
 */
export function getMonsterGroups(monsters: MonsterTypes.Monster[]) {
  return monsters.reduce<MonsterListGroup[]>((groups, monster) => {
    const group = getMonsterGroup(monster);
    const existingGroup = groups.find(g => g.groupName === group);
    if (existingGroup && existingGroup.groupName === group) {
      existingGroup.monsters.push(monster);
    } else {
      groups.push({
        groupName: group,
        monsters: [monster]
      });
    }
    return groups;
  }, []);
}
