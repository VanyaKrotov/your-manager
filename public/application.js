if ("require" in window) {
  const { ipcRenderer } = require("electron");

  window.addEventListener("bind-title-buttons", () => {
    const closeBnt = document.querySelector("#title-bar #close-window");
    const minimizeBnt = document.querySelector("#title-bar #minimize-window");
    const maximizeBnt = document.querySelector("#title-bar #maximize-window");

    closeBnt.addEventListener("click", () =>
      ipcRenderer.send("close-main-window")
    );

    minimizeBnt.addEventListener("click", () =>
      ipcRenderer.send("minimize-main-window")
    );

    maximizeBnt.addEventListener("click", () =>
      ipcRenderer.send("maximize-main-window")
    );
  });

  ipcRenderer.on("window-maximized", () => {
    window.dispatchEvent(new CustomEvent("window-maximized"));
  });

  ipcRenderer.on("window-restored", () => {
    window.dispatchEvent(new CustomEvent("window-restored"));
  });
}
