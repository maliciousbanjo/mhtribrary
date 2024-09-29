import { Monsters, MonsterTypes } from 'mh3-data';
import { HTMLTable } from '@blueprintjs/core';
import React from 'react';
import classNames from 'classnames';

interface HitzoneTableProps {
  selectedMonsterName: MonsterTypes.MonsterName;
  selectedMonsterHitzoneGroup: number;

  selectedHitzone: string;
  setSelectedHitzone: React.Dispatch<React.SetStateAction<string>>;
}

export function HitzoneTable({
  selectedMonsterName,
  selectedMonsterHitzoneGroup,
  selectedHitzone,
  setSelectedHitzone
}: HitzoneTableProps) {
  const monster = Monsters.getMonster(selectedMonsterName);
  const hitzoneGroup = monster.monsterStates[selectedMonsterHitzoneGroup];

  const handleRowClick = React.useCallback(
    (hitzoneName: string) => {
      setSelectedHitzone(hitzoneName);
    },
    [setSelectedHitzone]
  );

  const buildHitzoneRow = React.useCallback(() => {
    return Object.entries(hitzoneGroup.hitzones).map(
      ([hitzoneName, hitzoneValues]) => {
        return (
          <tr
            key={hitzoneName}
            className={classNames('table-row', {
              'table-row--selected': selectedHitzone === hitzoneName
            })}
            onClick={() => handleRowClick(hitzoneName)}
          >
            <td>{hitzoneName}</td>
            <td>{hitzoneValues.cut}</td>
            <td>{hitzoneValues.impact}</td>
            <td>{hitzoneValues.fire}</td>
            <td>{hitzoneValues.water}</td>
            <td>{hitzoneValues.thunder}</td>
            <td>{hitzoneValues.ice}</td>
            <td>{hitzoneValues.dragon}</td>
            <td>{hitzoneValues.stagger} HP</td>
          </tr>
        );
      }
    );
  }, [handleRowClick, hitzoneGroup.hitzones, selectedHitzone]);

  /**
   * Auto-select the first hitzone if none selected yet
   */
  React.useEffect(() => {
    if (selectedHitzone === '') {
      const hitzoneName = Object.keys(hitzoneGroup.hitzones)[0];
      handleRowClick(hitzoneName);
    }
  }, [handleRowClick, hitzoneGroup.hitzones, selectedHitzone]);

  return (
    <HTMLTable className={'hitzone-table'} compact interactive bordered>
      <thead>
        <tr>
          <th>Hitzone</th>
          <th>cut</th>
          <th>impact</th>
          <th>fire</th>
          <th>water</th>
          <th>thunder</th>
          <th>ice</th>
          <th>dragon</th>
          <th>stagger</th>
        </tr>
      </thead>
      <tbody>{buildHitzoneRow()}</tbody>
    </HTMLTable>
  );
}
