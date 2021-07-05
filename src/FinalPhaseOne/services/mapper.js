const setEachClients = (
  connections = [],
  clients = [],
  browserId,
  familyId
) => {
  const allSet = [];
  connections.forEach((insurer) => {
    const newData = clients.map((client) => {
      return {
        birthday: client.birthday,
        firstName: client.firstName,
        lastName: client.lastName,
        browserId: browserId,
        familyId,
        insurerId: insurer.id,
        insurerName: (insurer.providerNameLowerCases || '').toLowerCase(),
        isLoadingScrape: true,
        hasData: 'YES',
        message: null,
        policies: [],
        results: [],
      };
    });
    allSet.push(newData);
  });
  return allSet;
};

export const setScrappingStructure = (
  setGlobaleClients = [],
  setGlobaleInsurers = [],
  browserId,
  familyId
) => {
  return new Promise((resolve, reject) => {
    const allSet = setEachClients(
      setGlobaleInsurers,
      setGlobaleClients,
      browserId,
      familyId
    );
    if (allSet.length) {
      resolve(allSet);
    }
  });
};

export const mapScrapeForAPI = (data) => {
  return {
    AccessToken: data.accessToken,
    Birthday: data.birthday,
    FirstName: data.firstName,
    LastName: data.lastName,
    BrowserId: data.browserId,
    InsurerName: data.insurerName,
  };
};
