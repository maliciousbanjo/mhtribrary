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
          'table-row': true,
          'table-row--selected': monsterArgs.hitzoneIndex === index
        })}
        onClick={() => handleRowClick(index)}
      >
        <td className="cell" scope="row" data-label="Hitzone">
          {hitzone.name}
        </td>
        <td className="cell" data-label="Cut">
          {hitzone.values.cut}
        </td>
        <td className="cell" data-label="Impact">
          {hitzone.values.impact}
        </td>
        <td className="cell" data-label="Fire">
          {hitzone.values.fire}
        </td>
        <td className="cell" data-label="Water">
          {hitzone.values.water}
        </td>
        <td className="cell" data-label="Thunder">
          {hitzone.values.thunder}
        </td>
        <td className="cell" data-label="Ice">
          {hitzone.values.ice}
        </td>
        <td className="cell" data-label="Dragon">
          {hitzone.values.dragon}
        </td>
        <td className="cell" data-label="Stagger">
          {hitzone.values.stagger} HP
        </td>
      </tr>
    ));
  }, [handleRowClick, hitzoneGroup.hitzones, monsterArgs.hitzoneIndex]);

  return (
    <div className="hitzones">
      <h3>Hitzone (click to select)</h3>
      <HTMLTable className={'hitzone-table'} compact interactive bordered>
        <thead>
          <tr className="table-row">
            <th scope="col">Hitzone</th>
            <th scope="col">Cut</th>
            <th scope="col">Impact</th>
            <th scope="col">Fire</th>
            <th scope="col">Water</th>
            <th scope="col">Thunder</th>
            <th scope="col">Ice</th>
            <th scope="col">Dragon</th>
            <th scope="col">Stagger</th>
          </tr>
        </thead>
        <tbody>{buildHitzoneRow()}</tbody>
      </HTMLTable>
    </div>
  );
}
