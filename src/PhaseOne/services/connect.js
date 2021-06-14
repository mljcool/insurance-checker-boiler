import { getMethod, postMethod } from './api';

export const getProviderConnections = (browserId = '') => {
   return getMethod('setup/get-credential?browserId=' + browserId);
};

export const postConnectToInsurers = (params = {}) => {
   const { userName, password, providerName, id, browserId } = params;
   const details = {
      userName,
      password,
      title: 'ADVISER',
      firstName: 'Sample',
      lastName: 'Sample',
      insurerName: providerName,
      insurerId: id,
      browserId,
   };
   return postMethod('setup/set-credential', details);
};

export const onDisconnectInsurer = (params = {}) => {
   const { providerNameLowerCases, id, browserId } = params;
   const details = {
      browserId,
      insurerId: id,
      insurerName: providerNameLowerCases,
   };
   return postMethod('setup/delete-credential', details);
};
