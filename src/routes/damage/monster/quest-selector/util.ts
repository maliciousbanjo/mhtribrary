import { QuestTypes } from 'mh3-data';

/**
 * @returns quest grouping of Village, Low or High Rank
 */
export function getQuestGroup(
  quest: QuestTypes.Quest
): 'Village' | 'Low Rank' | 'High Rank' {
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
