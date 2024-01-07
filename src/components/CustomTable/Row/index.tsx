import React from 'react';

const TableRow = ({
  colsToHide,
  row
}: {
  colsToHide: string[];
  row: Record<string, string>;
}) => (
  <tr>
    {Object.keys(row).map((col, colIdx) => {
      if (colsToHide.includes(col)) {
        return;
      }
      return (
        <td
          className="border-b border-slate-200 p-4 pl-8 text-slate-500"
          key={`${col}_${colIdx}`}
        >
          {row[col] ?? 'None'}
        </td>
      );
    })}
  </tr>
);

export default TableRow;
