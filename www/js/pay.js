let Pay = function () {
    let init = function () {
        generateList()
    }
    let generateList = function () {
        //clear list before generating
        // i mean i could check for duplicates and remove them but this is easier and probably uses less resources
        // idk tho im lazy. less is more ig
        $('#currencylist').empty();
        const wallets = JSON.parse(localStorage.getItem("wallets"));
        $.each(wallets, function (name) {
            $('#currencylist').append(`<option value="${name}">${name}</option>`)
        })
        $('select').formSelect();
    }
    let generateCode = function (text) {
        $('#qrcode').empty();
        var qrcode = new QRCode("qrcode", {
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        // new QRCode(document.getElementById("qrcode"), text);
        qrcode.makeCode(text);
    }
    return {
        init: init,
        generateList: generateList,
        generateCode: generateCode
    }
}();