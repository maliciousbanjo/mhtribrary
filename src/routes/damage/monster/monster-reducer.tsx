import { DamageTypes, Monsters, Quests } from 'mh3-data';

interface MonsterNameAction {
  type: 'MONSTER_NAME';
  payload: DamageTypes.MonsterArgs['monsterName'];
}

interface QuestIdAction {
  type: 'QUEST_ID';
  payload: DamageTypes.MonsterArgs['questId'];
}

interface MonsterStateIndexAction {
  type: 'MONSTER_STATE_INDEX';
  payload: DamageTypes.MonsterArgs['monsterStateIndex'];
}

interface HitzoneIndexAction {
  type: 'HITZONE_INDEX';
  payload: DamageTypes.MonsterArgs['monsterStateIndex'];
}

export type MonsterArgReducerAction =
  | MonsterNameAction
  | QuestIdAction
  | MonsterStateIndexAction
  | HitzoneIndexAction;

export const MONSTER_ARGS_INITIAL_STATE: DamageTypes.MonsterArgs = {
  monsterName: 'Great Jaggi',
  questId: 0x03f5, // Big Game Hunting
  monsterStateIndex: 0,
  hitzoneIndex: 0
};

/**
 * Custom reducer for {@link DamageTypes.MonsterArgs}, used in
 * damage calculation
 */
export function monsterArgsReducer(
  state: DamageTypes.MonsterArgs,
  action: MonsterArgReducerAction
): DamageTypes.MonsterArgs {
  switch (action.type) {
    // Changing the monster needs to reset all other fields
    case 'MONSTER_NAME': {
      const newMonster = Monsters.getMonster(action.payload);
      const quests = Quests.getQuestsWithLargeMonster(newMonster.id, 'Both');
      const newQuestId = quests.length > 0 ? quests[0].id : undefined;
      return {
        ...MONSTER_ARGS_INITIAL_STATE,
        monsterName: action.payload,
        questId: newQuestId
      };
    }
    case 'QUEST_ID': {
      return {
        ...state,
        questId: action.payload
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
