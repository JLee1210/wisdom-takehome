/* eslint-disable no-constant-condition */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import TableHeader from './Header';
import TableRow from './Row';
import { ERROR_MESSAGES } from '../../constants/errorMessage';

const CustomTable = ({
  columns,
  isFetching,
  rowData
}: {
  columns: string[];
  isFetching: boolean;
  rowData: Record<string, string>[];
}) => {
  const [colsToHide, setColsToHide] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filteredRowData, setFilteredRowData] =
    useState<Record<string, string>[]>(rowData);
  const searchFilterRef = useRef<string>('');

  const getIsFilterCondition = useCallback(
    (row: Record<string, string>) => {
      setErrorMessage('');
      const filters = searchFilterRef.current.split(' AND ');

      for (const filter of filters) {
        const filteredByEqual = filter.split(' = ');
        const filteredByPartial = filter.split(' =~ ');
        if (filteredByPartial.length === 2) {
          const [colName, value] = filteredByPartial;
          if (!columns.includes(colName)) {
            // col doesnt exist error
            setErrorMessage(ERROR_MESSAGES.COL_DOESNT_EXIST);
            break;
          } else {
            if (!row[colName].includes(value)) {
              return false;
            }
          }
        } else if (filteredByEqual.length === 2) {
          const [colName, value] = filteredByEqual;
          if (!columns.includes(colName)) {
            // col doesnt exist error
            setErrorMessage(ERROR_MESSAGES.COL_DOESNT_EXIST);
            break;
          } else {
            if (row[colName] !== value) {
              return false;
            }
          }
        } else {
          // too many filter error
          setErrorMessage(ERROR_MESSAGES.INVALID_FILTER);
          break;
        }
      }

      return true;
    },
    [columns]
  );

  useEffect(() => {
    setFilteredRowData(rowData.filter(getIsFilterCondition));
    setErrorMessage('');
  }, [getIsFilterCondition, isFetching, rowData]);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchFilterRef.current = e.target.value;
  };

  const onSearchClick = () => {
    setFilteredRowData(rowData.filter(getIsFilterCondition));
  };

  const onShowHideColumnCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (e.target.value !== 'Show All') {
        setColsToHide((prev) =>
          prev.filter((colName) => colName !== e.target.value)
        );
      } else {
        setColsToHide([]);
      }
    } else {
      if (e.target.value !== 'Show All') {
        setColsToHide((prev) => [...prev, e.target.value]);
      } else {
        setColsToHide(columns);
      }
    }
  };

  return (
    <div className="relative w-full bg-zinc-300 shadow-sm overflow-x-auto pb-8">
      <table className="relative border-collapse w-full text-sm table-auto h-full">
        <TableHeader
          columns={columns}
          colsToHide={colsToHide}
          errorMessage={errorMessage}
          onShowHideColumnCheck={onShowHideColumnCheck}
          onSearchChange={onSearchInputChange}
          onSearchClick={onSearchClick}
        />
        {isFetching ? (
          <div className="absolute flex items-center justify-center w-full h-full bg-white pt-16">
            Loading...
          </div>
        ) : (
          <tbody className="bg-white">
            {filteredRowData.map((row, rowIdx) => {
              return (
                <TableRow
                  key={`${row}_${rowIdx}`}
                  colsToHide={colsToHide}
                  row={row}
                />
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default CustomTable;
