import React from 'react';
import './TabFilter.css';
import Button from '@material-ui/core/Button';
const filterTypes = [
   {
      id: 1,
      filterName: 'All',
   },
   {
      id: 2,
      filterName: 'In Force',
   },
   {
      id: 3,
      filterName: 'In Progress',
   },
   {
      id: 4,
      filterName: 'Lapsed',
   },
];
const TabFilter = () => {
   const [selectedFilter, setSelectedFilter] = React.useState(1);

   const onSelectFilter = (id) => {
      setSelectedFilter(id);
   };

   const getSelectedFilter = (id) => {
      return selectedFilter === id ? 'is_active' : '';
   };

   return (
      <div className='header_filter'>
         {filterTypes.map((menu) => (
            <Button
               size='small'
               className={`buttons_filter ${getSelectedFilter(menu.id)}`}
               onClick={() => {
                  onSelectFilter(menu.id);
               }}
               key={menu.id}>
               <span>{menu.filterName}</span>
            </Button>
         ))}
      </div>
   );
};

export default TabFilter;
