/* eslint-disable no-unused-vars */
import React, { memo, useState } from 'react';

const TableHeader = memo(
  ({
    columns,
    colsToHide,
    errorMessage,
    onShowHideColumnCheck,
    onSearchChange,
    onSearchClick
  }: {
    columns: string[];
    colsToHide: string[];
    errorMessage: string;
    onShowHideColumnCheck: (e: any) => void;
    onSearchChange: (e: any) => void;
    onSearchClick: () => void;
  }) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const onShowOptionsClick = () => {
      setShowOptions((prev) => !prev);
    };

    return (
      <thead className="bg-zinc-300 top-0 sticky">
        <div className="absolute pl-8 pt-4 flex gap-4 w-full">
          <div
            className="bg-white text-slate-600 cursor-pointer w-fit p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 font-semibold"
            onClick={onShowOptionsClick}
          >
            Show/Hide Columns
          </div>
          <div className="w-1/2">
            <div className="bg-blue-100 rounded-xl flex items-center flex gap-2 h-full">
              <div
                className="bg-blue-100 cursor-pointer pl-4 h-full flex items-center rounded-xl"
                onClick={onSearchClick}
              >
                Search
              </div>
              <input
                className="w-full h-full pl-2 pr-4 bg-white rounded-r-xl"
                onChange={onSearchChange}
              ></input>
            </div>
            <div className={`text-red-500 h-4`}>
              {errorMessage ? `*${errorMessage}` : ''}
            </div>
          </div>
        </div>
        {showOptions && (
          <div className="absolute left-8 bg-white mt-16 w-52 h-72 rounded-xl shadow-xl overflow-auto">
            <div className="border-b font-medium p-4 text-slate-500 text-left top-0 sticky bg-white">
              <input
                className="mr-2"
                type="checkbox"
                id="Show All"
                value="Show All"
                onChange={onShowHideColumnCheck}
                checked={colsToHide.length === 0}
              />
              <label htmlFor="Show All">Show All</label>
            </div>
            {columns.map((col, idx) => (
              <div
                className="border-b font-medium p-4 text-slate-500 text-left"
                key={`${col}_${idx}`}
              >
                <input
                  className="mr-2"
                  type="checkbox"
                  id={`${col}_${idx}`}
                  value={col}
                  onChange={onShowHideColumnCheck}
                  checked={!colsToHide.includes(col)}
                />
                <label htmlFor={`${col}_${idx}`}>{col}</label>
              </div>
            ))}
          </div>
        )}
        <tr>
          {columns
            .filter((colName) => !colsToHide.includes(colName))
            .map((col, idx) => (
              <th
                className="border-b font-medium p-4 pt-24 pl-8 pb-3 text-slate-500 text-left"
                key={`${col}_${idx}`}
              >
                {col}
              </th>
            ))}
        </tr>
      </thead>
    );
  },
  (prevProps, newProps) =>
    prevProps.colsToHide.length === newProps.colsToHide.length &&
    prevProps.errorMessage === newProps.errorMessage &&
    prevProps.columns.length === newProps.columns.length
);

TableHeader.displayName = 'TableHeader';

export default TableHeader;
