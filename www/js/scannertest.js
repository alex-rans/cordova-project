let ScannerTest = function () {
    let init = function () {
        QRScanner.prepare(onDone); // show the prompt

        function onDone(err, status){
            if (err) {
                // here we can handle errors and clean up any loose ends.
                console.error(err);
            }
            if (status.authorized) {
                // W00t, you have camera access and the scanner is initialized.
                // QRscanner.show() should feel very fast.
            } else if (status.denied) {
                // The video preview will remain black, and scanning is disabled. We can
                // try to ask the user to change their mind, but we'll have to send them
                // to their device settings with `QRScanner.openSettings()`.
            } else {
                // we didn't get permission, but we didn't get permanently denied. (On
                // Android, a denial isn't permanent unless the user checks the "Don't
                // ask again" box.) We can ask again at the next relevant opportunity.
            }
        }
    };
    let startScanner = function () {
        console.log('show scanner')
        QRScanner.scan(displayContents);

        function displayContents(err, text){
            if(err){
                // an error occurred, or the scan was canceled (error code `6`)
            } else {
                // The scan completed, display the contents of the QR code:
                alert(text);
            }
        }

        // Make the webview transparent so the video preview is visible behind it.
        QRScanner.hide();
        // Be sure to make any opaque HTML elements transparent here to avoid
        // covering the video.

    };
    let stopScanner = function () {
        console.log('hide scanner');
        QRScanner.destroy();
    };
    let showScanner = function () {
        $("html").addClass()
    }
    return {
        init: init,
        startScanner: startScanner,
        stopScanner: stopScanner
    };
}();