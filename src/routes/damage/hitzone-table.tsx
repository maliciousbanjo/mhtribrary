import { HTMLTable } from '@blueprintjs/core';
import classNames from 'classnames';
import { DamageTypes, Monsters } from 'mh3-data';
import React from 'react';
import { MonsterArgReducerAction } from './monster';

interface HitzoneTableProps {
  monsterArgs: DamageTypes.MonsterArgs;
  dispatchMonsterArgs: React.Dispatch<MonsterArgReducerAction>;
}

export function HitzoneTable({
  monsterArgs,
  dispatchMonsterArgs
}: HitzoneTableProps) {
  const monster = Monsters.getMonster(monsterArgs.monsterName);
  const hitzoneGroup = monster.monsterStates[monsterArgs.monsterStateIndex];

  const handleRowClick = React.useCallback(
    (hitzoneIndex: number) => {
      dispatchMonsterArgs({
        type: 'HITZONE_INDEX',
        payload: hitzoneIndex
      });
    },
    [dispatchMonsterArgs]
  );

  const buildHitzoneRow = React.useCallback(() => {
    return hitzoneGroup.hitzones.map((hitzone, index) => (
      <tr
        key={hitzone.name}
        className={classNames({
          'table-row--selected': monsterArgs.hitzoneIndex === index
        })}
        onClick={() => handleRowClick(index)}
      >
        <td data-label="Hitzone">{hitzone.name}</td>
        <td data-label="Cut">{hitzone.values.cut}</td>
        <td data-label="Impact">{hitzone.values.impact}</td>
        <td data-label="Fire">{hitzone.values.fire}</td>
        <td data-label="Water">{hitzone.values.water}</td>
        <td data-label="Thunder">{hitzone.values.thunder}</td>
        <td data-label="Ice">{hitzone.values.ice}</td>
        <td data-label="Dragon">{hitzone.values.dragon}</td>
        <td data-label="Stagger">{hitzone.values.stagger} HP</td>
      </tr>
    ));
  }, [handleRowClick, hitzoneGroup.hitzones, monsterArgs.hitzoneIndex]);

  return (
    <div className="table-wrapper">
      <HTMLTable className={'hitzone-table'} compact interactive bordered>
        <thead>
          <tr>
            <th>Hitzone</th>
            <th>Cut</th>
            <th>Impact</th>
            <th>Fire</th>
            <th>Water</th>
            <th>Thunder</th>
            <th>Ice</th>
            <th>Dragon</th>
            <th>Stagger</th>
          </tr>
        </thead>
        <tbody>{buildHitzoneRow()}</tbody>
      </HTMLTable>
    </div>
  );
}
