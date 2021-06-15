// const crmBaseURL = 'https://api.loanmarket.com.au/; prodURL
// const crmBaseURL = 'https://api.nzfsg.co.nz/'; prodURL
// const crmBaseURL = 'https://api.nzfsg.co.nz/';
const crmBaseURL = 'https://api.sit.mycrm.finance/'; //SIT URL

const crmRequest = (urlStr) => {
   const mytime = JSON.parse(localStorage.getItem('mycrm-tokens'));
   const settings = {
      url: crmBaseURL + urlStr,
      method: 'GET',
      timeout: 0,
      headers: {
         Authorization: 'Bearer ' + ((mytime || {}).accessToken || {}).value,
      },
   };
   return $.ajax(settings);
};

// getCLient Information

const urlClientMyCRM = (familyId = '') => {
   return 'contacts/ClientInformGet?familyId=' + familyId + '&clientId=null';
};

const setClientStorage = (clients = []) => {
   chrome.storage.local.set({
      clientList: clients,
   });
};

const getClientInfo = (familyId) => {
   setClientStorage([]);
   crmRequest(urlClientMyCRM(familyId)).done((response) => {
      if (!!response.length) {
         const clientInfo = mapClientsInfo(response.sort().reverse());
         setClientStorage(clientInfo);
      }
   });
};

const getAdviserInfo = () => {
   crmRequest('GetUserInfo').done((response) => {
      const adviserData = mapAdviserInfo(response);
      setStorage({
         adviserData,
      });
   });
};

const interceptMyCRM = () => {
   urlSPliter().then(({ success, familyId }) => {
      if (success) {
         getClientInfo(familyId);
         //  getAdviserInfo();
      }
   });
};