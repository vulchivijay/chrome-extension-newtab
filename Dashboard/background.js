// background.js
const blue = '#1976d2';
const white = '#ffffff';

const date = new Date().toLocaleDateString();

const isbackground = true;
const localDate = date;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ blue });
  chrome.storage.sync.set({ white });
  chrome.storage.sync.set({ isbackground });
  chrome.storage.sync.set({ localDate });
});