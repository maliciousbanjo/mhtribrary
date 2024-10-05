import { DamageTypes } from 'mh3-data';

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
  monsterName: 'Aptonoth',
  questId: 0,
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
    case 'MONSTER_NAME':
      return {
        ...MONSTER_ARGS_INITIAL_STATE,
        monsterName: action.payload
      };
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
