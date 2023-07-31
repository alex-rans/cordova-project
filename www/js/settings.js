let Settings = function () {
    const walletarray = {
    }
    const settingarray = {
        Name: '',
        screenMode: '',
        currency: ''
    }
    let init = function () {
        // checks if app is launched for first time
        // localStorage.clear();
        if(!localStorage.getItem('virgin')){
            console.log("First launch. Init fist time setup.");
            FirstTimeSetup();
        }
        else {
            console.log('App is not virgin');
            console.log(localStorage);
        }

        //set option based on mode
        // console.log(JSON.parse(localStorage.getItem('settings'))['screenMode'])
        // console.log(JSON.parse(localStorage.getItem('settings'))['currency'])
        const currentScreenMode = JSON.parse(localStorage.getItem('settings'))['screenMode'];
        if(currentScreenMode === "light") {
            $("select#screenmode").val("light");
            ScreenMode('Light mode');
        }
        else if(currentScreenMode === "dark") {
            $("select#screenmode").val("dark");
            ScreenMode('Dark mode');
        }

        const currentCurrency = JSON.parse(localStorage.getItem('settings'))['currency'];
        if(currentCurrency === "USD") {
            $("select#currency").val("USD");
        }
        else if(currentCurrency === "EUR") {
            $("select#currency").val("EUR");
        }
        else if(currentCurrency === "GBP") {
            $("select#currency").val("GBP");
        }

        // init selector tags because materialize is utterly fucking retarded
        // and doesn't render select tags until you do this bullshittery
        $('select').formSelect();

        $("select#screenmode").change(function(){
            const screenmode = $(this).children("option:selected").text();
            ScreenMode(screenmode);
            settingarray['screenMode'] = screenmode.split(" ")[0].toLowerCase();
            localStorage.setItem("settings", JSON.stringify(settingarray));
            console.log(screenmode + ' enabled');
        });
        $("select#currency").change(function(){
            let currency = $(this).children("option:selected").text();
            settingarray['currency'] = currency
            localStorage.setItem("settings", JSON.stringify(settingarray));
            // console.log(JSON.parse(localStorage.getItem('settings'))['currency'])
            Wallets.loadCoins(currency.toLowerCase());
        });
    };
    let FirstTimeSetup = function () {
        const settingarray = {
            Name: '',
            screenMode: 'dark',
            currency: 'USD'
        }
        const accounts = {}
        localStorage.clear();
        localStorage.setItem("wallets", JSON.stringify(walletarray));
        localStorage.setItem("settings", JSON.stringify(settingarray));
        localStorage.setItem("accounts", JSON.stringify(accounts));
        localStorage.setItem("virgin", false);
        console.log(localStorage)
        console.log("Finished init");
        // console.log(localStorage.getItem("settings"));
    }
    let ScreenMode = function (mode) {
        if(mode === 'Light mode') {
            $('head #css').remove();
            $('<link>')
                .appendTo('head')
                .attr({
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: './css/app_light.css',
                    id: 'css'
                });
        }
        else if(mode === 'Dark mode') {
            $('head #css').remove();
            $('<link>')
                .appendTo('head')
                .attr({
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: './css/app_dark.css',
                    id: 'css'
                });
        }
    }
    let resetSettings = function () {
        localStorage.clear();
        FirstTimeSetup();
        // $('.spa').hide();
        // $('#wallet').show();
        location.reload();
        alert('Settings reset')
    }

    return {
        init: init,
        resetSettings: resetSettings
    }
}();