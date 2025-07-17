import { MonsterParameters } from '../monster-reducer';

export interface MonsterIconProps {
  monsterName: MonsterParameters['monsterName'];
}

export function MonsterIcon({ monsterName }: MonsterIconProps) {
  const fileName = monsterName.replace(' ', '_');

  return (
    <img
      src={`monster_icons/${fileName}.png`}
      width={65}
      height={65}
      alt="Alatreon"
    />
  );
}
