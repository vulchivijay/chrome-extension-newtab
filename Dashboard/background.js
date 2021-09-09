// background.js

const green = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ green });
  
  document.body.style.backgroundColor = green;
  document.body.style.color = '#ffffff'

  console.log('Default background color set to %cgreen', `color: ${green}`);
});