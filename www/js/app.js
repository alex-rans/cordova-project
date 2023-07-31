$(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
    $('.sidenav').sidenav();	/* https://materializecss.com/sidenav.html */

    $('.sidenav a').click(function () {
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
        $('.sidenav').sidenav('close');
        let page = $(this).text();

        // stuff to init scanner on the right page and destroy it on others
        if(page === "qr_code_scannerScan") {

            Scanner.startScanner();
        }
        else {
            console.log('hide scanner')
            Scanner.stopScanner();
        }
    });
});

//add coin
$("#submitCoin").click(function () {
    const name = $('#text').val();
    const amount = $('#amount').val();
    Wallets.addCoin(name, amount)
});

// delete coin
$("#wallets").on('click', '.delCoin', function () {
    let name = $(this).attr('id');
    name = String(name).replace('del', '');
    Wallets.delCoin(name);
});

$("#reset").click(function () {
    Settings.resetSettings();
});

// generate qr code
$("#submitPay").click(function () {
    const name = $('#currencylist').val();
    const amount = $('#currencyamount').val();
    Pay.generateCode('Receive;'+name+';'+amount)
});

function onDeviceReady() {
    Wallets.init();
    Settings.init();
    Pay.init();
    Scanner.init();
    console.log('Device is ready');
}
function onPause() {
    Scanner.stopScanner();
}
function onResume() {
    Scanner.init();
}
