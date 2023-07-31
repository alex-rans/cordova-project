let Wallets = function () {
    let init = function () {
        loadCoins()
    }
    let addHTML = function (i, price, wallet, totalall) {
        let currency = JSON.parse(localStorage.getItem('settings'))['currency']
        let totalamount = price*wallet[i]
        totalamount = totalamount.toFixed(6);
        totalamount = parseFloat(totalamount);
        $("#wallets").append(`
            <div class="coins" id="coin${i}">
                <div class="row">
                    <div class="col s6">
                        <p class="coinname">${i}</p>
                        <p class="coinprice">${price} ${currency}</p>                
                    </div>
                    <div class="col s6">
                        <p class="coinamount">${wallet[i]}</p>
                        <button class="delCoin" id="del${i}">-</button>
                        <p class="totalprice">${totalamount} ${currency}</p>              
                    </div>
                </div>
            </div>
        `);
        $('.total').text(`Total: ${totalall} ${currency}`);
    }
    let loadCoins =  function (currency='usd') {
        $("#wallets").empty();
        let totalall = 0
        const wallet = JSON.parse(localStorage.getItem("wallets"));
        $.each(wallet, function (coin, amount) {
            const input = "https://api.coingecko.com/api/v3/coins/" + coin.toLowerCase();
            fetch(input)
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    }
                    else {
                        // deletes invalid coin from object and updates the localstorage
                        delete wallet[coin]
                        localStorage.setItem("wallets", JSON.stringify(wallet));
                        // regenere pay list to remove bad coin from list.
                        Pay.generateList()
                    }
                })
                .then((myContent) => {
                    const market = JSON.parse(myContent);
                    let price = market["market_data"]["current_price"][currency];
                    totalall += price * amount
                    addHTML(coin, price, wallet, totalall);

                })
                .catch(function (error) {
                    console.log("Coin does not exist or failed HTTP response")
                    console.log(error)
                });
        })
    };
    let addCoin = function (name, amount) {
        const walletarray = JSON.parse(localStorage.getItem("wallets"));
        // peeps if added coin is already existant, and than adds the amount together
        if(!walletarray[name]) {
            amount = parseInt(amount);
            walletarray[name] = amount
        }
        else {
            amount = parseInt(amount) + parseInt(walletarray[name]);
            walletarray[name] = amount
        }
        localStorage.setItem("wallets", JSON.stringify(walletarray));
        loadCoins();
        Pay.generateList()
    }
    let delCoin = function (coinname) {
        const walletarray = JSON.parse(localStorage.getItem("wallets"));
        delete walletarray[coinname];
        localStorage.setItem("wallets", JSON.stringify(walletarray));
        loadCoins()
        Pay.generateList()
    }
    return {
        init: init,
        addCoin: addCoin,
        delCoin: delCoin,
        loadCoins: loadCoins
    };
}();
