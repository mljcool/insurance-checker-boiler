import React, { useEffect, useState } from 'react';
import './Sample.css';
import { sample } from 'constant/insurers';
const Sample = () => {
   const [count, setCount] = useState(0);
   useEffect(() => {
      console.log('SUper cool');
   }, []);

   return (
      <div className='sample_components' onClick={() => setCount(count + 1)}>
         <h2>
            Im a cool Sample component {sample} {count}
         </h2>
      </div>
   );
};

export default Sample;
