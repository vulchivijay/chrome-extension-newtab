// background.js
const blue = '#1976d2';
const white = '#ffffff';

const date = new Date().toLocaleDateString();

const isbackground = true;
const localdate = date;
const twofourtimeformat = true;
const cityName = 'Chennai';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ blue });
  chrome.storage.sync.set({ white });
  chrome.storage.sync.set({ isbackground });
  chrome.storage.sync.set({ localdate });
  chrome.storage.sync.set({ twofourtimeformat });
  chrome.storage.sync.set({ cityName });
});