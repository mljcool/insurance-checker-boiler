import React, { Fragment } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const Loader = ({ isLoading = false }) => {
   return (
      <Fragment>
         {isLoading ? <LinearProgress color='primary' /> : null}
      </Fragment>
   );
};

export default Loader;
