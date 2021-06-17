import * as browser from 'webextension-polyfill';

export const GetStorageClient = () => {
  return browser.storage.local.get('clientList');
};

export const GetBrowserID = () => {
  return browser.storage.local.get('chromeId');
};

export const hasStorageDoneScraping = () => {
  return browser.storage.local.get('hasDoneScraping');
};

export const getFamilyId = () => {
  return browser.storage.local.get('familyId');
};

export const getFamilyIdStorage = () => {
  return browser.storage.local.get('familyIdStorage');
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

export const getStoreDataScraping = () => {
  return browser.storage.local.get('storageScrape');
};

export const setStoreDataScraping = (scrape = []) => {
  getFamilyId().then(({ familyId }) => {
    browser.storage.local
      .set({
        ['storageScrape']: scrape,
        ['familyIdStorage']: familyId,
      })
      .then(() => {
        console.log(`storageScrape was saved`);
      });
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
