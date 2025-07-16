import {
  DamageTypes,
  MonsterLevels,
  MonsterLevelTypes,
  Monsters,
  Quests,
  QuestTypes
} from 'mh3-data';
import { getMedianMonsterLevel } from '../../../utils/array-utils';

const DEFAULT_LEVEL: MonsterLevelTypes.MonsterLevel = 0;

/**
 * Parameters tracked across the UI that maintain monster properties like
 * name, quest, hitzone, and statMultipliers
 */
export interface MonsterParameters
  extends Omit<DamageTypes.MonsterArgs, 'monsterStatMultipliers'> {
  monsterLevel: MonsterLevelTypes.MonsterLevel;
  questId: QuestTypes.Quest['id'] | undefined;
}

interface MonsterNameAction {
  type: 'MONSTER_NAME';
  payload: MonsterParameters['monsterName'];
}

interface QuestIdAction {
  type: 'QUEST_ID';
  payload: MonsterParameters['questId'];
}

interface MonsterLevelAction {
  type: 'MONSTER_LEVEL';
  payload: MonsterParameters['monsterLevel'];
}

interface MonsterStateIndexAction {
  type: 'MONSTER_STATE_INDEX';
  payload: MonsterParameters['monsterStateIndex'];
}

interface HitzoneIndexAction {
  type: 'HITZONE_INDEX';
  payload: MonsterParameters['monsterStateIndex'];
}

export type MonsterParametersReducerAction =
  | MonsterNameAction
  | QuestIdAction
  | MonsterLevelAction
  | MonsterStateIndexAction
  | HitzoneIndexAction;

const BIG_GAME_HUNTING_ID = 0x03f5;
const bigGameHuntingLevels = MonsterLevels.getMonsterLevelsForQuest(
  'Great Jaggi',
  BIG_GAME_HUNTING_ID
);

export const MONSTER_PARAMETERS_INITIAL_STATE: MonsterParameters = {
  monsterName: 'Great Jaggi',
  monsterLevel: getMedianMonsterLevel(bigGameHuntingLevels),
  questId: BIG_GAME_HUNTING_ID,
  monsterStateIndex: 0,
  hitzoneIndex: 0
};

/**
 * Custom reducer for {@link MonsterParameters}, used in
 * damage calculation
 */
export function monsterParametersReducer(
  state: MonsterParameters,
  action: MonsterParametersReducerAction
): MonsterParameters {
  switch (action.type) {
    // Changing the monster needs to reset all other fields
    case 'MONSTER_NAME': {
      const newMonster = Monsters.getMonster(action.payload);
      const quests = Quests.getQuestsWithLargeMonster(newMonster.id, 'Both');
      const newQuestId = quests.length > 0 ? quests[0].id : undefined;

      // Default level if no quests found (this happens with small monsters)
      const levels = newQuestId
        ? MonsterLevels.getMonsterLevelsForQuest(newMonster.name, newQuestId)
        : [DEFAULT_LEVEL];

      return {
        ...MONSTER_PARAMETERS_INITIAL_STATE,
        monsterName: action.payload,
        questId: newQuestId,
        monsterLevel: getMedianMonsterLevel(levels)
      };
    }
    case 'QUEST_ID': {
      const { payload: newQuestId } = action;
      // Default level if no quests found (this happens with small monsters)
      const levels = newQuestId
        ? MonsterLevels.getMonsterLevelsForQuest(state.monsterName, newQuestId)
        : [DEFAULT_LEVEL];

      return {
        ...state,
        questId: newQuestId,
        monsterLevel: getMedianMonsterLevel(levels)
      };
    }
    case 'MONSTER_LEVEL': {
      return {
        ...state,
        monsterLevel: action.payload
      };
    }
    case 'MONSTER_STATE_INDEX':
      return {
        ...state,
        monsterStateIndex: action.payload
      };
    case 'HITZONE_INDEX':
      return {
        ...state,
        hitzoneIndex: action.payload
      };

    default:
      return state;
  }
}
