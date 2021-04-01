const path = require('path');
const gulp = require('gulp');
const fs = require('fs');
const events = require('events');
const emitter = new events.EventEmitter();

const WebSocket = require('ws');
const spawn = require("child_process").spawn,
      themeWatch = spawn('theme', ['watch']);
      
/* Takes in a file ath as an arg, and returns a new promise for reading the file */
const checkForLiveReload = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err) reject(console.error(err));
            resolve(data);
        });
    })
};

/* Takes in a file path as an arg, and returns a new promise for writing to the file */
const writeLiveReload = (file, themeFile) => {
    return new Promise((resolve, reject) => {
        
        /* Split the file at the </body> tag */
        const fileArray = file.toString().split('</body>'); 
        /* The Snippet to be inserted into the file, so the WebSocket server works */
        const dataToWrite = `
            ${fileArray[0]}
                <!-- Start Live Server Reloading -->
                <script>
                    var ws = new WebSocket('ws://localhost:3050');
                    ws.onmessage = function(evt) { location.reload(); }
                </script>
                <!-- End Live Server Reloading -->
            </body>
            ${fileArray[1]}
        `;

        /* Write the Snippet to the theme.liquid file, this is the root Shopify HTML */
        fs.writeFile(themeFile, dataToWrite, (err, cb) => {
            if(err) reject(console.error(err));
            resolve();
        });
    });
};

/* Main Function which launches our live reload */
const liveReload = () => {
    /* Open the WebSocket Server on Port 8080 */
    const wss = new WebSocket.Server({ port: 3050 });
    let client;

    wss.on('connection', ws => {
        client = ws;
    });

    emitter.on('themekit:updated', () => client.send('event'));
    emitter.on('themekit:deleted', () => client.send('event'));


    /* Watch the terminal for output */
    themeWatch.stdout.on('data', data => {
        const output = data.toString();
        console.log(output);
        /* Send a basic event to the WebSocket clients by case */
        if(output.includes('Watching')) emitter.emit('themekit:ready');
        if(output.includes('Updated')) emitter.emit('themekit:updated');
        if(output.includes('Deleted')) emitter.emit('themekit:deleted');
    });

    emitter.on('themekit:ready', () => {
        /* Read the theme.liquid file */
        const themeFile = path.resolve('shop/layout/theme.liquid');
        checkForLiveReload(themeFile)
        .then(file => {
            if (!file.toString().includes('<!-- Start Live Server Reloading -->')) {
                writeLiveReload(file, themeFile)
                .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err)); 
    });
};

module.exports.liveReload = gulp.task('live-reload', liveReload);
