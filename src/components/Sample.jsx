import React, { useEffect, useState } from 'react';
import './Sample.scss';
const Sample = () => {
   const [count, setCount] = useState(0);
   useEffect(() => {
      console.log('SUper cool');
   }, []);

   return (
      <div className='sample_components' onClick={() => setCount(count + 1)}>
         <h2>Im a cool Sample component {count}</h2>
      </div>
   );
};

export default Sample;
