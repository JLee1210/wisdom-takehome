import React, { useEffect, useState } from 'react';

import CustomTable from './components/CustomTable';
import { Movie, MovieAPI } from './constants/types/movieApi';

const App = () => {
  const [tableRows, setTableRows] = useState<Movie[]>([]);
  const [tableHeaders, setTableHeaders] = useState<(keyof Movie)[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const dataPromise = await fetch(
        'https://data.sfgov.org/resource/yitu-d5am.json'
      );
      const dataset = await dataPromise.json();
      const transformedDataSet = dataset.map((data: MovieAPI) => {
        const {
          title,
          release_year,
          locations,
          production_company,
          distributer,
          director,
          writer,
          actor_1,
          actor_2,
          actor_3
        } = data;

        return {
          title,
          release_year,
          locations,
          production_company,
          distributer,
          director,
          writer,
          actor_1,
          actor_2,
          actor_3
        };
      });

      setTableRows(transformedDataSet);
      setTableHeaders(Object.keys(transformedDataSet[0]) as (keyof Movie)[]);
      setIsFetching(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center h-screen w-screen">
      <CustomTable
        columns={tableHeaders}
        isFetching={isFetching}
        rowData={tableRows}
      />
    </div>
  );
};

export default App;
