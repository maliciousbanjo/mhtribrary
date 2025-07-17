import { Classes, SegmentedControl } from '@blueprintjs/core';
import { LevelSelectorProps } from '.';

export function LevelSelectorDesktop({
  monsterLevelOptions,
  selectedMonsterLevel,
  onSelectLevel
}: LevelSelectorProps) {
  return (
    <SegmentedControl
      className={`select-level ${Classes.ELEVATION_1}`}
      options={monsterLevelOptions}
      value={selectedMonsterLevel.toString()}
      onValueChange={onSelectLevel}
    />
  );
}
