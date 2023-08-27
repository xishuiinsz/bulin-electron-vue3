// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const { contextBridge, ipcRenderer } = require("electron");
  contextBridge.exposeInMainWorld("electron", {
    showDirDlg: () => ipcRenderer.invoke("dialog:showDirDlg"),
    dirChooseSync: (option) => ipcRenderer.invoke("dirChooseSync", option),
    listFiles: (path) => ipcRenderer.invoke("listFiles", path),
    fillTextHandle: (option) => ipcRenderer.invoke("fillTextHandle", option),
    exportPicturesInJson: (option) =>
      ipcRenderer.invoke("exportPicturesInJson", option),
    generatePicWithBase64: (option) =>
      ipcRenderer.invoke("generatePicWithBase64", option),
  });
});
