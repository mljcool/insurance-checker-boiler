import React, { useContext, useState } from 'react';
import './TabFilter.css';
import Button from '@material-ui/core/Button';
import { AppContext } from 'context/AppContext';
import { FILTER_TYPES } from 'PhaseOne/constants';

const TabFilter = () => {
  const { onFilteInsurances } = useContext(AppContext);

  const [selectedFilter, setSelectedFilter] = useState(1);

  const getSelectedFilter = (id) => {
    return selectedFilter === id ? 'is_active' : '';
  };

  return (
    <div className='header_filter'>
      {FILTER_TYPES.map((menu) => (
        <Button
          size='small'
          className={`buttons_filter ${getSelectedFilter(menu.id)}`}
          onClick={() => {
            setSelectedFilter(menu.id);
            onFilteInsurances(menu.filterName);
          }}
          key={menu.id}
        >
          <span>{menu.filterName}</span>
        </Button>
      ))}
    </div>
  );
};

export default TabFilter;
