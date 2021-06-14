import React from 'react';
import './TabFilter.css';

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
   return (
      <div className='header_filter'>
         {filterTypes.map((menus) => (
            <div>
               <span>{menus.filterName}</span>
            </div>
         ))}
      </div>
   );
};

export default TabFilter;
