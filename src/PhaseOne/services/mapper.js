const mapDataForPost = (clients) => {
  return clients.map((client) => {
    return {
      Birthday: client.Birthday,
      FirstName: client.FirstName,
      LastName: client.LastName,
      BrowserId: client.BrowserId,
      InsurerName: client.InsurerName,
      InsurerId: client.InsurerId,
    };
  });
};

const mapDataForUI = (clients) => {
  return clients.map((client) => {
    return {
      birthday: client.Birthday,
      firstName: client.FirstName,
      lastName: client.LastName,
      browserId: client.BrowserId,
      insurerName: client.InsurerName,
      insurerId: client.InsurerId,
      familyId: client.familyId,
      isLoadingScrape: true,
      hasData: 'YES',
      message: null,
      policies: [],
      results: [],
    };
  });
};

export const setScrappingStructure = (
  setGlobaleClients = [],
  setGlobaleInsurers = [],
  browserId,
  familyId
) => {
  return new Promise((resolve, reject) => {
    const allSet = [];
    setGlobaleInsurers.forEach((insurer, index) => {
      const setList = setGlobaleClients.map((client) => {
        return {
          Birthday: client.birthday,
          FirstName: client.firstName,
          LastName: client.lastName,
          BrowserId: browserId,
          familyId,
          InsurerId: insurer.insurerId,
          InsurerName: (insurer.insurerName || '').toLowerCase(),
        };
      });
      allSet.push(setList[0]);
      if (index === setGlobaleInsurers.length - 1) {
        resolve({
          forPostData: mapDataForPost(allSet),
          forDisplayData: mapDataForUI(allSet),
        });
      }
    });
  });
};
