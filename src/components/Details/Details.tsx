import React, { FunctionComponent } from 'react';

import { IDetailsProps } from '../../types';

const Details: FunctionComponent<IDetailsProps> = ({ details, setIsPage }) => {
    return (
        <div>
          <span className="link" onClick={() => setIsPage(false)}>&lt; Back</span>
          <h1>{details?.title}</h1>
          <ul>
            <li><label>Capital:</label><span>{details?.capital}</span></li>
            <li><label>Language:</label><span>{details?.language}</span></li>
            <li><label>Currency:</label><span>{details?.currency}</span></li>
          </ul>
        </div>
    );
};

export default Details;