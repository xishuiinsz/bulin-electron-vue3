// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const { contextBridge, ipcRenderer } = require("electron");
  contextBridge.exposeInMainWorld("electron", {
    showDirDlg: () => ipcRenderer.invoke("dialog:showDirDlg"),
    listFiles: (path) => ipcRenderer.invoke("listFiles", path),
    fillTextHandle: (option) => ipcRenderer.invoke("fillTextHandle", option),
    // 能暴露的不仅仅是函数，我们还可以暴露变量
  });
});
