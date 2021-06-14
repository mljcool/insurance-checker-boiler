import { getMethod } from './api';

export const getProviderConnections = (browserId = '') => {
   return getMethod('setup/get-credential?browserId=' + browserId);
};

export const postConnectToInsurers = (params = {}) => {
   const { userName, password, providerName, id, browserId } = params;
   const details = {
      userName,
      password,
      title: 'ADVISER',
      firstName: '',
      lastName: '',
      insurerName: providerName,
      insurerId: id,
      browserId,
   };
   console.log(details);
};
