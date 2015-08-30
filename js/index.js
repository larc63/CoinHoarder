/*global ko, coinData */
function pad(num, size) {
    return ('000000000' + num).substr(-size);
}

function formatCurrency(value) {
    "use strict";
    if(value instanceof String){
        value = Number(value);
    }
    return "$" + value.toFixed(2);
}

var CURRENT_GOLD_SPOT = 1150.10;
var CURRENT_PLATINUM_SPOT = 1150.10;
var CURRENT_SILVER_SPOT = 15.10;

function CoinSet() {
    "use strict";
    this.name = "";
    this.coins = ko.observableArray([]);
};

function ViewModel() {
    "use strict";
    var i, c, type, self = this;
    this.coins = ko.observableArray([]);
    this.coinTypes = ko.observableArray([]);
    this.countries = ko.observableArray([]);
    this.mints = [];

    this.getCountry = function (data) {
        var i, country;
        for (i = 0; i < this.countries().length; i += 1) {
            country = this.countries()[i];
            if (country === data.country) {
                return country;
            }
        }
        this.countries().push(data.country);
        return data.country;
    };

    this.getMint = function (data) {
        var i, mint;
        for (i = 0; i < this.mints.length; i += 1) {
            mint = this.mints[i];
            if (mint === data.mint) {
                return mint;
            }
        }
        this.mints.push(data.mint);
        return data.mint;
    };

    this.getCoinType = function (data) {
        var i, type;
        for (i = 0; i < this.coinTypes().length; i += 1) {
            type = this.coinTypes()[i];
            if (type.country === data.country && type.year() === data.year && type.mint() === data.mint && type.weight() === data.weight && type.metal() === data.metal) {
                return type;
            }
        }
        type = new CoinType(data);
        this.coinTypes.push(type);
        return type;
    };

    this.findCoin = function (year, country, series, metal, weight) {
        for (i = 0; i < this.coinTypes().length; i += 1) {
            type = this.coinTypes()[i];
            if (type.country === country && type.year() === year && type.weight() === weight && type.metal() === metal) {
                return type;
            }
        }
    }

    //for (i = 0; i < 2; i += 1) {
    for (i = 0; i < coinData.length; i += 1) {
        type = this.getCoinType(coinData[i]);
        coinData[i].coinType = type;
        coinData[i].country = this.getCountry(coinData[i]);
        coinData[i].mint = this.getMint(coinData[i]);
        if (localStorage.hasOwnProperty(coinData[i].id)) {
            c = JSON.parse(localStorage.getItem(coinData[i].id));
        } else {
            c = new Coin(coinData[i]);
            //console.log("added ", c);
            //localStorage.setItem(c.id(), ko.toJSON(c));
        }
        this.coins().push(c);
    }
    this.stagedIndex = 0;
    this.stagedCoinType = ko.observable(new CoinType({}))
    this.addCoinType = function (event) {
        self.stagedCoinType().country = self.stagedCoinType().selectedCountry();
        self.coinTypes.push(self.stagedCoinType());
    }
    this.exportCoins = function () {
        console.log(ko.toJSON(this.coins()));
        saveAs()
    };
    this.stagedCoin = ko.observable();

    this.copyMyCoin = function (index) {
        self.stagedCoin(this.clone());
        self.stagedIndex = -1;
    }

    this.editMyCoin = function (index) {
        self.stagedCoin(this.clone());
        self.stagedCoin().id(this.id());
        self.stagedIndex = index;
    }

    this.deleteMyCoin = function (index) {
        self.coins().splice(index, 1);
        self.coins.valueHasMutated();
    }
    
    this.commitCoin = function(){
        if(self.stagedIndex > 0){
            self.coins()[self.stagedIndex] = self.stagedCoin();
        }else{
            self.coins().push(self.stagedCoin());
        }
        self.stagedCoin(undefined);
        self.stagedIndex = 0;
        self.coins.valueHasMutated();
    }
    this.addCoin = function(){
        self.stagedCoin();
    }
    this.cancelCoinOperation = function(){
        self.stagedCoin(undefined);
    }

    this.currentSet = new CoinSet();
    //    this.currentSet.name = "Lunar Series Goats";
    //    this.currentSet.coins.push(this.findCoin(2015, "Australia", "Lunar Series II", "silver", 0.5));
    //    this.currentSet.coins.push(this.findCoin(2015, "Australia", "Lunar Series II", "silver", 1));
    //    this.currentSet.coins.push(this.findCoin(2015, "Australia", "Lunar Series II", "silver", 2));
    //    this.currentSet.coins.push(this.findCoin(2015, "Australia", "Lunar Series II", "silver", 5));
    //    this.currentSet.coins.push(this.findCoin(2015, "Australia", "Lunar Series II", "silver", 10));
    //    this.currentSet.name = "Libertdad 2014";
    //    this.currentSet.coins.push(this.findCoin(2015, "Australia", "Lunar Series II", "silver", 0.5));
}

var vm = new ViewModel();
ko.applyBindings(vm);