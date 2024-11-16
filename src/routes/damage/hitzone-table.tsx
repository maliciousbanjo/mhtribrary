import { Classes, HTMLTable } from '@blueprintjs/core';
import classNames from 'classnames';
import { DamageTypes, MonsterLevelTypes, Monsters } from 'mh3-data';
import React from 'react';
import { MonsterArgReducerAction } from './monster';

interface HitzoneTableProps {
  monsterArgs: DamageTypes.MonsterArgs;
  dispatchMonsterArgs: React.Dispatch<MonsterArgReducerAction>;

  monsterMultipliers: MonsterLevelTypes.MonsterLevelMultipliers;
}

export function HitzoneTable({
  monsterArgs,
  dispatchMonsterArgs,
  monsterMultipliers
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
          {Math.floor(hitzone.values.stagger * monsterMultipliers.stagger)} HP
        </td>
      </tr>
    ));
  }, [
    handleRowClick,
    hitzoneGroup.hitzones,
    monsterArgs.hitzoneIndex,
    monsterMultipliers.stagger
  ]);

  return (
    <div className="hitzones">
      <h3>Hitzone (click to select)</h3>
      <HTMLTable
        className={`${Classes.ELEVATION_1} hitzone-table`}
        compact
        interactive
        bordered
      >
        <thead>
          <tr className="table-row">
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
