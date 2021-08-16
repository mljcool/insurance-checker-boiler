import { getMethod, postMethod } from './api';

export const getProviderConnections = (browserId = '') => {
  return getMethod('setup/get-credential?browserId=' + browserId);
};

export const postConnectToInsurers = (params = {}) => {
  const {
    email,
    userName,
    password,
    providerNameLowerCases,
    id,
    browserId,
    firstName,
    lastName,
    jwtToken,
  } = params;

  const newDetails = {
    BrowserId: browserId,
    AccessToken: jwtToken,
    InsurerAcount: {
      InsurerId: id,
      InsurerName: providerNameLowerCases,
      UserName: userName,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
      Title: 'Adviser',
      Email: email,
    },
  };

  return postMethod('setup/set-credential', newDetails);
};

export const onDeleteConnections = (params = {}) => {
  return postMethod('setup/delete-credential', params);
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
