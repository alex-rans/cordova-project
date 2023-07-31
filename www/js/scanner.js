let Scanner = function () {
    let init = function () {
        var done = function(err, status){
            if(err){
                console.error(err._message);
            } else {
                console.log('QRScanner is initialized. Status:');
                console.log(status);
            }
        };
        QRScanner.prepare(done);
        // for some reason preparing the scanner automatically enables it. Cancelscan function doesnt seem to work.
        // destroying the scanner every time I dont need it is the only way I got it working. This is a stupid fix.
        QRScanner.destroy();
    };
    let startScanner = function () {
        showScanner();
        QRScanner.scan(displayContents);
        function displayContents(err, text){
            if(err){
                console.log(err)
            } else if (text.substring(0, 7) === 'Receive') {
                text = text.split(';')
                console.log(text[1] + ' ' + text[2])
                Wallets.addCoin(text[1], text[2])
                alert("Currency received succefully")
                startScanner();
            }
            else {
                alert('Invalid code');
                startScanner();
            }
        }

    };
    let stopScanner = function () {
        // for some reason the build in hide and show functions dont work. I dont know why. From what I can tell is that
        // it basically makes the html tag transparent. I wrote a function showScanner and hideScanner which basically
        // does that. Im either using the plugin wrong or its just broken.
        hideScanner();
        QRScanner.destroy();
    };
    let showScanner = function () {
        $("html").addClass("transparent");
    }
    let hideScanner = function () {
        $("html").removeClass("transparent");
    }

    return {
        init: init,
        startScanner: startScanner,
        stopScanner: stopScanner
    };
}();