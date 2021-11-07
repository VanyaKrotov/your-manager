const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createMainWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  console.log(process.env.ELECTRON_START_URL);
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  win.loadURL(startUrl);

  ipcMain.on("close-app", () => {
    if (win.closable) {
      win.close();
    }
  });

  ipcMain.on("minimaze-app", () => {
    win.minimize();
  });

  ipcMain.on("maximaze-app", () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });

  return win;
};

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length > 0) {
      return;
    }

    createMainWindow();
  });
});
