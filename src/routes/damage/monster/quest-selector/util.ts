import { QuestTypes } from 'mh3-data';

export interface QuestListGroup {
  groupName: string;
  quests: QuestTypes.Quest[];
}

/**
 * @returns quest grouping of Village, Low or High Rank
 */
export function getGroup(quest: QuestTypes.Quest) {
  switch (quest.region) {
    case 'Village':
      return 'Village';
    case 'City': {
      return quest.rank === 'Low' ? 'Low Rank' : 'High Rank';
    }
    default:
      throw new Error(`Invalid quest region ${quest.region}`);
  }
}

/**
 * Parses a list of quests into their Village/Low/High groups
 */
export function getQuestGroups(quests: QuestTypes.Quest[]) {
  return quests.reduce<QuestListGroup[]>((groups, quest) => {
    const group = getGroup(quest);
    const existingGroup = groups.find(g => g.groupName === group);
    if (existingGroup && existingGroup.groupName === group) {
      existingGroup.quests.push(quest);
    } else {
      groups.push({
        groupName: group,
        quests: [quest]
      });
    }

    return groups;
  }, []);
}
