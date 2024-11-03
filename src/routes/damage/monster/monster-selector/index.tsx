import { useMediaQuery } from 'react-responsive';
import { MonsterSelectorsProps } from '../monster-selectors';
import { MonsterSelectorMobile } from './monster-selector-mobile';
import { DamageTypes } from 'mh3-data';
import { MonsterSelectorDesktop } from './monster-selector-desktop';

export interface MonsterSelectorProps
  extends Pick<MonsterSelectorsProps, 'dispatchMonsterArgs'> {
  selectedMonsterName: DamageTypes.MonsterArgs['monsterName'];
}

export function MonsterSelector({
  monsterArgs,
  dispatchMonsterArgs
}: MonsterSelectorsProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return isMobile ? (
    <MonsterSelectorMobile
      selectedMonsterName={monsterArgs.monsterName}
      dispatchMonsterArgs={dispatchMonsterArgs}
    />
  ) : (
    <MonsterSelectorDesktop
      selectedMonsterName={monsterArgs.monsterName}
      dispatchMonsterArgs={dispatchMonsterArgs}
    />
  );
}
