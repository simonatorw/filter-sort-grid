import React, { useEffect, useState, FunctionComponent } from 'react';

import { getApi } from './api/async';
import { sortDesc, sortAsc, filterList } from './api/api';
import { COUNTRIES_URL } from './constants';
import { IData, IDetails } from './types';
import Details from './components/Details/Details';

import './App.scss';

const App: FunctionComponent = () => {
  const [ filterValue, setFilterValue ] = useState<string>('');
  const [ toggleSort, setToggleSort ] = useState<boolean>(true);
  const [ countries, setCountries ] = useState<IData[]>([]);
  const [ saved, setSaved ] = useState<IData[]>([]);
  const [ isPage, setIsPage ] = useState<boolean>(false);
  const [ radioSelect, setRadioSelect ] = useState<string>('name');
  const [ pageData, setPageData ] = useState<IDetails>({
    title: '',
    capital: '',
    language: '',
    currency: ''
  });

  useEffect(() => {
    (async function() {
      const list = await getApi(COUNTRIES_URL);

      setCountries(list);
      setSaved(list);
    })();
  }, []);

  const goPage = (item: IData) => {
    const { name, capital, languages, currencies } = item;

    setIsPage(true);

    setPageData({
      title: name,
      capital,
      language: languages[0]?.name,
      currency: currencies[0]?.name
    });
  };

  const sort = () => {
    let list: IData[];

    if (toggleSort) {
      list = sortDesc([ ...countries]);
    } else {
      list = sortAsc([ ...countries]);
    }

    setToggleSort(!toggleSort);
    setCountries(list);
  };

  const filter = (e?: any, col?: string) => {
    if (e) {
      setFilterValue(e.target.value);
    } else {
      e = filterValue;
    }

    const list = filterList(saved, typeof e === 'string' ? e : e.target.value, col ? col : radioSelect);

    setCountries(list);
  };

  const updateRadio = (col: string) => {
    setRadioSelect(col);

    filter(null, col);
  };

  return (
    <div>
      {isPage ? (
        <Details details={pageData} setIsPage={setIsPage} />
      ) : (
        <div>
          <div className="control-panel">
            <label className="radio">
              <input type="radio" name="col" value="name" checked={radioSelect === 'name'} onChange={() => updateRadio('name')} /> Name
            </label>
            <label className="radio">
              <input type="radio" name="col" value="alpha2Code" checked={radioSelect === 'alpha2Code'} onChange={() => updateRadio('alpha2Code')} /> Code
            </label>
            <label className="radio">
              <input type="radio" name="col" value="population" checked={radioSelect === 'population'} onChange={() => updateRadio('population')} /> Population
            </label>
            <input type="text" className="filter-field" placeholder="Enter text to filter..." onChange={(e) => filter(e)} />
          </div>
          <table className="data-grid">
            <thead>
              <tr>
                <th>Country</th>
                <th>Code</th>
                <th onClick={sort}>Population</th>
              </tr>
            </thead>
            <tbody>
              {!!countries.length && countries.map((item: IData) =>
                <tr key={item?.alpha2Code}>
                  <td><span className="link" onClick={() => goPage(item)}>{item?.name}</span></td>
                  <td>{item?.alpha2Code}</td>
                  <td>{item?.population}</td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
