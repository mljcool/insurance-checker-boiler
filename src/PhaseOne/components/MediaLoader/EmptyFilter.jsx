import React from 'react';

const EmptyFilter = ({ filterName = '' }) => {
   return (
      <div className='empty_filter'>
         <span>No Results For {filterName}</span>
      </div>
   );
};

export default EmptyFilter;
