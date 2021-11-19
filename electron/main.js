const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const windowStateKeeper = require("electron-window-state");

const createMainWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600,
  });

  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    frame: false,
    icon: path.join(__dirname, "../public/logo192.png"),
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindowState.manage(win);

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "/../build/index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";

  win.loadURL(appURL);

  //   if (!app.isPackaged) {
  //     win.webContents.openDevTools();
  //   }

  win.on("maximize", () => {
    win.webContents.send("window-maximized");
  });

  win.on("unmaximize", () => {
    win.webContents.send("window-restored");
  });

  ipcMain.on("close-main-window", () => {
    if (win.closable) {
      win.close();
    }
  });

  ipcMain.on("minimize-main-window", () => {
    win.minimize();
  });

  ipcMain.on("maximize-main-window", () => {
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
