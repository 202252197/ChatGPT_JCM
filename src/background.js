const { app, BrowserWindow,globalShortcut,ipcMain,screen,protocol  } = require('electron')
import path from "path";

let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        frame: false,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
          contextIsolation: false,
          webSecurity: false,
        },
        menu: null
    })
    mainWindow.loadURL(process.env.IS_ELECTRON?'http://localhost:8080':`file://${__dirname}/index.html`)
    mainWindow.on('closed', function() {
        mainWindow = null
    })

    // 注册快捷键
    // 打开 DevTools 工具
    globalShortcut.register('Ctrl+Shift+Alt+I', () => {
      mainWindow.webContents.openDevTools()
    })
    // 退出app
    globalShortcut.register('esc', () => {
        app.quit()
    })

    // 打开dev工具
    mainWindow.webContents.openDevTools()

    windowMove(mainWindow);
}

/**
 * 窗口移动
 * @param win
 */
function windowMove(win) {

  let winStartPosition = {x: 0, y: 0};
  let mouseStartPosition = {x: 0, y: 0};
  let movingInterval = null;

  /**
   * 窗口移动事件
   */
  ipcMain.on("window-move-open", (events, canMoving) => {
    if (canMoving) {
      // 读取原位置
      const winPosition = win.getPosition();
      winStartPosition = { x: winPosition[0], y: winPosition[1] };
      mouseStartPosition = screen.getCursorScreenPoint();
      // 清除
      if (movingInterval) {
        clearInterval(movingInterval);
      }
      // 新开
      movingInterval = setInterval(() => {
        // 实时更新位置
        const cursorPosition = screen.getCursorScreenPoint();
        const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
        const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
        win.setPosition(x, y, true);
      }, 20);
    } else {
      clearInterval(movingInterval);
      movingInterval = null;
    }
  });

}

app.on('ready', ()=>{
  createWindow();
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})
