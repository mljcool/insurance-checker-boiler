import { getMethod, postMethod } from './api';

export const getProviderConnections = (browserId = '') => {
  return getMethod('setup/get-credential?browserId=' + browserId);
};

export const postConnectToInsurers = (params = {}) => {
  const {
    userName,
    password,
    providerNameLowerCases,
    id,
    browserId,
    firstName,
    lastName,
    jwtToken,
  } = params;

  const details = {
    userName,
    password,
    title: 'ADVISER',
    firstName,
    lastName,
    insurerName: providerNameLowerCases,
    insurerId: id,
    browserId,
    AccessToken: jwtToken,
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

export const onStartScrapingAPI = (dataParams = []) => {
  return postMethod('insurer/search-clients', dataParams);
};
