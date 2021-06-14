import { getMethod } from './api';

export const getProviderConnections = (browserId = '') => {
   return getMethod('setup/get-credential?browserId=' + browserId);
};
