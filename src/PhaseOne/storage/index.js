import * as browser from 'webextension-polyfill';

export const GetStorageClient = () => {
   return browser.storage.local.get('clientList');
};
