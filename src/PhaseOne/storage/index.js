import * as browser from 'webextension-polyfill';

export const GetStorageClient = () => {
   return browser.storage.local.get('clientList');
};

export const GetBrowserID = () => {
   return browser.storage.local.get('chromeId');
};

export const hasDoneScraping = () => {
   return browser.storage.local.get('hasDoneScraping');
};

export const setHasDoneScraping = (isSet = false) => {
   browser.storage.local
      .set({
         ['hasDoneScraping']: isSet,
      })
      .then(() => {
         console.log(`Status Done for this client.`);
      });
};

const setChromeToken = () => {
   var randomPool = new Uint8Array(32);
   crypto.getRandomValues(randomPool);
   var hex = '';
   for (var i = 0; i < randomPool.length; ++i) {
      hex += randomPool[i].toString(16);
   }
   return hex;
};

export const setChromeIdentity = (getId) => {
   const chromeId = setChromeToken();
   browser.storage.local.get('chromeId').then((response) => {
      if (!(response || { chromeId: null }).chromeId) {
         browser.storage.local
            .set({
               ['chromeId']: chromeId,
            })
            .then(() => {
               getId(chromeId);
               console.log(`Chrome Identity has set for this browser`);
            });
      } else {
         getId(response.chromeId);
      }
   });
};
