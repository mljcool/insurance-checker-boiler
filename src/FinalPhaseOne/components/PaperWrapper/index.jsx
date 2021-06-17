import React from 'react';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

const PaperWrapper = ({ isToggle = false, children }) => {
   return (
      <Grow in={isToggle}>
         <Paper elevation={0} className='page_render'>
            {children}
         </Paper>
      </Grow>
   );
};

export default PaperWrapper;
