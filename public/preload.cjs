const { contextBridge } = require('electron');

// Expose safe APIs to the React app
contextBridge.exposeInMainWorld('electron', {
  app: {
    name: 'TaskFlow',
    version: require('../package.json').version,
  },
  platform: process.platform,
});
