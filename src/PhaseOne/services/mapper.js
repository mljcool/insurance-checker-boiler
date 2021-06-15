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
         Birthday: client.Birthday,
         FirstName: client.FirstName,
         LastName: client.LastName,
         BrowserId: client.BrowserId,
         InsurerName: client.InsurerName,
         InsurerId: client.InsurerId,
         isLoadingScrape: true,
         hasData: 'YES',
         results: [],
      };
   });
};

export const setScrappingStructure = (
   setGlobaleClients = [],
   setGlobaleInsurers = [],
   browserId,
) => {
   return new Promise((resolve, reject) => {
      const setList = setGlobaleClients.map((client) => {
         setGlobaleInsurers.forEach((insurer) => {
            client.Birthday = client.birthday;
            client.FirstName = client.firstName;
            client.LastName = client.lastName;
            client.InsurerId = insurer.insurerId;
            (client.BrowserId = browserId),
               (client.InsurerName = (insurer.insurerName || '').toLowerCase());
         });
         return client;
      });

      resolve({
         forPostData: mapDataForPost(setList),
         forDisplayData: mapDataForUI(setList),
      });
   });
};
