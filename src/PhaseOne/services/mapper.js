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
   familyId,
) => {
   return new Promise((resolve, reject) => {
      const setList = setGlobaleClients.map((client) => {
         setGlobaleInsurers.forEach((insurer) => {
            client.Birthday = client.birthday;
            client.FirstName = client.firstName;
            client.LastName = client.lastName;
            client.InsurerId = insurer.insurerId;
            client.familyId = familyId;
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
