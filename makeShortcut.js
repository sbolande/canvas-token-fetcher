const fs = require('fs'),
      path = require('path'),
      os = require('os');

(function makeShortcut() {
    let thisPath = path.resolve('../canvas-token-fetcher');
    var shortcutPath = path.resolve(os.homedir(), 'Desktop', 'CanvasTokenFetcher.bat');
    
    const batch = `cd ${thisPath}\nnpm start`;
    fs.writeFileSync(shortcutPath, batch, { encoding: 'utf-8' });
})();