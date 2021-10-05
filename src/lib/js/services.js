// const crmBaseURL = 'https://api.loanmarket.com.au/; //prodURL
// const crmBaseURL = 'https://api.nzfsg.co.nz/'; //prodURL
const crmBaseURL = 'https://api.nzfsg.co.nz/';
// const crmBaseURL = 'https://api.sit.mycrm.finance/'; //SIT URL

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

const setClientStorage = (clients = [], familyId) => {
  chrome.storage.local.set({
    clientList: clients,
  });
  chrome.storage.local.set({
    familyId,
  });
};

const setAdviserStorage = (adviserDetails = {}) => {
  chrome.storage.local.set({
    adviserDetails,
  });
};

const setJWTtokenStorage = (jwtToken = {}) => {
  chrome.storage.local.set({
    jwtToken,
  });
};

const getClientInfo = (familyId) => {
  setClientStorage([], null);
  crmRequest(urlClientMyCRM(familyId)).done((response) => {
    if (response.length) {
      const clientInfo = mapClientsInfo(response.sort().reverse());
      setClientStorage(clientInfo, familyId);
    }
  });
};

const getAdviserInfo = () => {
  setAdviserStorage({});
  crmRequest('GetUserInfo').done((response) => {
    const adviserData = mapAdviserInfo(response);
    setAdviserStorage(adviserData);
  });
};

const interceptMyCRM = () => {
  urlSPliter().then(({ success, familyId }) => {
    if (success) {
      const mytime = JSON.parse(localStorage.getItem('mycrm-tokens'));
      setJWTtokenStorage(((mytime || {}).accessToken || {}).value);
      getClientInfo(familyId);
      getAdviserInfo();

      chrome.storage.local.get(['chromeId'], function(result) {
        console.log('Value currently is ' + result.chromeId);
        localStorage.setItem('chromeId', result.chromeId);
      });

      // chrome.storage.local.get('chromeId').then((response) => {
      //   console.log(`Chrome Identity has set for this browser`, response);
      //   // if (!(response || { chromeId: null }).chromeId) {
      //   //   browser.storage.local
      //   //     .set({
      //   //       ['chromeId']: chromeId,
      //   //     })
      //   //     .then(() => {
      //   //       getId(chromeId);
      //   //       console.log(`Chrome Identity has set for this browser`);
      //   //     });
      //   // } else {
      //   //   getId(response.chromeId);
      //   // }
      // });
    }
  });
};
