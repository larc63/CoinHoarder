/// <reference path='../node_modules/@types/knockout/index.d.ts' />
import {
    Coin,
    CoinType,
    CoinData
} from "./coin"

class Tab {
    private id: KnockoutObservable < string > ;
    private name: KnockoutObservable < string > ;
    constructor(id: string, name: string) {
        this.id = ko.observable(id);
        this.name = ko.observable(name);
    }
};

declare let coinData: CoinData;
export class CoinHoarder {
    investmentTotal: KnockoutComputed < any > ;
    permaStackValue: KnockoutComputed < any > ;
    possibleSale: KnockoutComputed < string > ;
    private coins: KnockoutObservableArray < Coin > ;
    private coinTypes: KnockoutObservableArray < CoinType > ;
    private sellableCoins: KnockoutObservableArray < Coin > ;
    private stagedCoin: KnockoutObservable < Coin > ;
    private stagedIndex: number;
    private stagedCoinType: KnockoutObservable < CoinType > ;
    private stagedCoinTypeIndex: number;

    numberOfOunces: KnockoutComputed < string > ;
    numberOfCoins: KnockoutComputed < string > ;
    ouncesOfCopper: KnockoutComputed < string > ;
    ouncesOfPlatinum: KnockoutComputed < string > ;
    ouncesOfSilver: KnockoutComputed < string > ;
    ouncesOfGold: KnockoutComputed < string > ;

    goldToSilverRatio: KnockoutComputed < string > ;
    numberOfOuncesInPermaStack: KnockoutComputed < string > ;
    numberOfOuncesNotInPermaStack: KnockoutComputed < string > ;
    meltTotal: KnockoutComputed < string > ;
    numberOfCoinsPermaStack: KnockoutComputed < string > ;
    numberOfCoinsNotPermaStack: KnockoutComputed < string > ;


    tabs: KnockoutObservableArray<Tab>;
    selectedTab: KnockoutObservable < number > ;

    format4(value: string | number) {
        if (value instanceof String || typeof value === "string") {
            value = Number(value);
        }
        //    console.log(typeof value + " !!! " + value);
        return value.toFixed(4);
    }
    formatCurrency(value: string | number) {
        if (value instanceof String || typeof value === "string") {
            value = Number(value);
        }
        //console.log(typeof value + " !!! " + value);
        return "$" + value.toFixed(2);
    };

    getCoinType(data: Coin): any {
        let type = this.coinTypes().find((e:CoinType) => e.id() === data.coinTypeId);

        if (type) {
            return type;
        }
        console.log("didn't find the coin type in the array with .find");
        for (let i = 0; i < this.coinTypes().length; i += 1) {
            type = this.coinTypes()[i];
            if(type.isEqual(data.coinType)){
                return type;
            }
        }
        console.log("adding a new type for " + data.coinTypeId);
        type = new CoinType(data.coinType);
        this.coinTypes.push(type);
        return type;
    };

    // findCoin(year, country, series, metal, weight) {
    //     let type = coinTypes().find(function (e) {
    //         return e.year() === year && e.country() === country && e.series() === series && e.metal() === metal && e.weight() === weight;
    //     });
    //     return type;
    // };

    // public sortCoins(): void {

    //     this.coinTypes().sort(function (a, b) {
    //         let t1 = a,
    //             t2 = b,
    //             //                i1 = t1.id(),
    //             //                i2 = t2.id(),
    //             c1 = t1.country(),
    //             c2 = t2.country(),
    //             y1 = Number(t1.year()),
    //             y2 = Number(t2.year()),
    //             m1 = t1.mint(),
    //             m2 = t2.mint(),
    //             s1 = t1.series(),
    //             s2 = t2.series(),
    //             w1 = Number(t1.weight()),
    //             w2 = Number(t2.weight());
    //         //            if (i1 < i2) return -1;
    //         //            if (i1 > i2) return 1;
    //         if (c1 < c2) return -1;
    //         if (c1 > c2) return 1;
    //         if (y1 < y2) return -1;
    //         if (y1 > y2) return 1;
    //         if (s1 < s2) return -1;
    //         if (s1 > s2) return 1;
    //         if (w1 < w2) return -1;
    //         if (w1 > w2) return 1;
    //         if (m1 < m2) return -1;
    //         if (m1 > m2) return 1;
    //         return 0;
    //     });

    //     this.coins().sort(function (a, b) {
    //         let t1 = a.coinType,
    //             t2 = b.coinType,
    //             c1 = t1.country(),
    //             c2 = t2.country(),
    //             y1 = Number(t1.year()),
    //             y2 = Number(t2.year()),
    //             m1 = t1.mint(),
    //             m2 = t2.mint(),
    //             s1 = t1.series(),
    //             s2 = t2.series(),
    //             w1 = Number(t1.weight()),
    //             w2 = Number(t2.weight());
    //         if (c1 < c2) return -1;
    //         if (c1 > c2) return 1;
    //         if (m1 < m2) return -1;
    //         if (m1 > m2) return 1;
    //         if (y1 < y2) return -1;
    //         if (y1 > y2) return 1;
    //         if (s1 < s2) return -1;
    //         if (s1 > s2) return 1;
    //         if (w1 < w2) return -1;
    //         if (w1 > w2) return 1;
    //         return 0;
    //     });
    // };

    // copyCoinType = function () {
    //     this.stagedCoinType(clone());
    //     this.stagedCoinTypeIndex = -1;
    // };
    deleteCoinType(index: number) {
        console.error("implement me!!");
        //     this.coinTypes.splice(index, 1);
        //     this.coinTypes.valueHasMutated();
    };
    editCoinType(index: number) {
        console.error("implement me!!");
        // this.stagedCoinType(clone());
        // this.stagedCoinType().id(id());
        // this.stagedCoinTypeIndex = index;
    };
    commitCoinType(index: number) {
        console.error("implement me!!");
        //     if (this.stagedCoinTypeIndex >= 0) {
        //         this.coinTypes()[this.stagedCoinTypeIndex] = this.stagedCoinType();
        //     } else {
        //         this.coinTypes().push(this.stagedCoinType());
        //     }
        //     this.stagedCoinType(undefined);
        //     this.stagedCoinTypeIndex = 0;
        //     this.sortCoins();
        //     this.coinTypes.valueHasMutated();
        //     this.coins.valueHasMutated();
    };
    exportCoins():void {
        // let sortingFunction = function (a, b) {
        //         let ida = parseInt(a.id.substring(2)),
        //             idb = parseInt(b.id.substring(2));
        //         if (ida >= idb) {
        //             return 1;
        //         }
        //         if (ida < idb) {
        //             return -1;
        //         }
        //     },
        //     coins:Array<Coin> = this.coins().map(function (c) {
        //         let newCoin = {
        //             id: c.id(),
        //             coinTypeId: c.coinTypeId,
        //             active: c.active,
        //             premium: c.premium,
        //             purchaseDate: c.purchaseDate,
        //             purchasePrice: c.purchasePrice,
        //             saleDate: c.saleDate,
        //             salePrice: c.salePrice,
        //             isPermaStack: c.isPermaStack
        //         };
        //         return newCoin;
        //     }).sort(sortingFunction),
        //     coinTypes = coinTypes().map(function (c) {
        //         let newCoinType = {
        //             id: c.id(),
        //             country: c.country(),
        //             year: c.year(),
        //             mint: c.mint(),
        //             series: c.series(),
        //             weight: c.weight(),
        //             width: c.width(),
        //             metal: c.metal(),
        //             diameter: c.diameter()
        //         };
        //         return newCoinType;
        //     }).sort(sortingFunction),
        //     e;
        // //        console.log(ko.toJSON(coins));
        // //        console.log(ko.toJSON(coinTypes()));
        // //        console.log(ko.toJSON(coins()));
        // e = {
        //     coins: ko.toJS(coins),
        //     coinTypes: ko.toJS(coinTypes)
        // };
        // console.log("window.data=" + JSON.stringify(e) + ";");
        // //        window.open('data:application/text,' + "window.data=" + JSON.stringify(e) + ";");
    };



    // copyMyCoin = function () {
    //     this.stagedCoin(clone());
    //     this.stagedIndex = -1;
    // };

    editMyCoin(index: number): void {
        console.error("implement me!");
        // this.stagedCoin(clone());
        // this.stagedCoin().id(id());
        // this.stagedIndex = index;
    };

    deleteMyCoin(index: number) {
        console.error("implement me!");
        this.coins().splice(index, 1);
        this.coins.valueHasMutated();
    };

    // commitCoin = function () {
    //     if (this.stagedCoin().coinType.id() !== coinTypeId) {
    //         coinTypeId = this.stagedCoin().coinType.id();
    //     }
    //     if (this.stagedIndex >= 0) {
    //         this.coins()[this.stagedIndex] = this.stagedCoin();
    //     } else {
    //         this.coins().push(this.stagedCoin());
    //     }
    //     this.stagedCoin(undefined);
    //     this.stagedIndex = 0;
    //     this.sortCoins();
    //     this.coins.valueHasMutated();
    // };
    // addCoin = function () {
    //     this.stagedCoin();
    // };
    // cancelCoinOperation = function () {
    //     this.stagedCoin(undefined);
    //     this.stagedCoinType(undefined);
    // };

    private getWeightSum(theArray:Array<Coin>):number{
        let retVal = 0;
        theArray.forEach(element => retVal += element.coinType.weight());
        return retVal;
    }

    private getNumberOfOunces(metal ? : string): number {
        let retVal = 0,
            filteredCoins = this.coins().filter((e: Coin) => metal? e.active() && e.coinType.metal() == metal: e.active());
        retVal = this.getWeightSum(filteredCoins);
        return retVal;
    };


    // currentSet = new CoinSet();
    //    currentSet.name = "Lunar Series Goats";
    //    currentSet.coins.push(findCoin(2015, "Australia", "Lunar Series II", "silver", 0.5));
    //    currentSet.coins.push(findCoin(2015, "Australia", "Lunar Series II", "silver", 1));
    //    currentSet.coins.push(findCoin(2015, "Australia", "Lunar Series II", "silver", 2));
    //    currentSet.coins.push(findCoin(2015, "Australia", "Lunar Series II", "silver", 5));
    //    currentSet.coins.push(findCoin(2015, "Australia", "Lunar Series II", "silver", 10));
    // currentSet.name = "Libertad 2014";
    // currentSet.coins().push(findCoin(2014, "Mexico", "Libertad", "silver", 0.05));
    // currentSet.coins().push(findCoin(2014, "Mexico", "Libertad", "silver", 0.1));
    // currentSet.coins().push(findCoin(2014, "Mexico", "Libertad", "silver", 0.25));
    // currentSet.coins().push(findCoin(2014, "Mexico", "Libertad", "silver", 0.5));
    // currentSet.coins().push(findCoin(2014, "Mexico", "Libertad", "silver", 1));
    // currentSet.coins().push(findCoin(2014, "Mexico", "Libertad", "silver", 2));
    // currentSet.coins().push(findCoin(2014, "Mexico", "Libertad", "silver", 5));


    constructor(data: CoinData) {

        this.coins = ko.observableArray([]);
        this.coinTypes = ko.observableArray([]);
        this.sellableCoins = ko.observableArray([]);
        this.stagedIndex = 0;
        this.stagedCoin = ko.observable();
        this.stagedCoinType = ko.observable();
        this.stagedCoinTypeIndex = 0;

        this.selectedTab = ko.observable(5);
        this.tabs = ko.observableArray([]);
        this.tabs.push(new Tab("1", 'My Coins'));
        this.tabs.push(new Tab("2", 'Coin Types'));
        this.tabs.push(new Tab("3", 'Sets'));
        this.tabs.push(new Tab("4", 'Sellable coins'));
        this.tabs.push(new Tab("5", 'Summary'));

        for (let i = 0; i < data.coinTypes.length; i += 1) {
            this.coinTypes().push(new CoinType(data.coinTypes[i]));
        }

        //for (i = 0; i < 2; i += 1) {
        for (let i = 0; i < data.coins.length; i += 1) {
            data.coins[i].coinType = undefined;

            let type = this.getCoinType(data.coins[i]);
            data.coins[i].coinType = type;
            let c = new Coin(data.coins[i]);
            this.coins().push(c);
        }
        // sortCoins();

        // sellableCoins(coins().filter(c => c.isPermaStack() === false && c.active() === true);

        // sellableCoins().sort(function (a, b) {
        //     let t1 = a.purchasePrice(),
        //         t2 = b.purchasePrice(),
        //         c1 = a.currentPrice(),
        //         c2 = c.currentPrice();
        //     if (c1 - t1 < c2 - t2) return 1;
        //     if (c1 - t1 > c2 - t2) return -1;
        //     return 0;
        // });
        this.stagedCoin = ko.observable();
        this.numberOfCoins = ko.computed({
            owner: this,
            read: () => {
                return this.coins().filter(function (e) {
                    return e.active();
                }).length + " Coins";
            }
        });
        this.numberOfOunces = ko.computed({
            owner: this,
            read: () => {
                return this.getNumberOfOunces() + " Ounces";
            }
        });
        this.ouncesOfGold = ko.computed({
            owner: this,
            read: () => {
                return this.getNumberOfOunces("gold") + " in gold";
            }
        });
        this.ouncesOfSilver = ko.computed({
            owner: this,
            read: () => {
                return this.getNumberOfOunces("silver") + " in silver";
            }
        });
        this.ouncesOfPlatinum = ko.computed({
            owner: this,
            read: () => {
                return this.getNumberOfOunces("platinum") + " in platinum";
            }
        });
        this.ouncesOfCopper = ko.computed({
            owner: this,
            read: () => {
                return this.getNumberOfOunces("copper") + " in copper";
            }
        });
        this.goldToSilverRatio = ko.computed({
            owner: this,
            read: () => {
                let goldTotal = 0,
                    silverTotal = 0,
                    ratio = 1.0;

                goldTotal = this.getNumberOfOunces("gold");
                silverTotal = this.getNumberOfOunces("silver");
                if(goldTotal == 0){
                    return "Silver:gold = You have no gold!";
                }
                ratio = 1 / goldTotal;
                return "Silver:gold = " + this.format4(silverTotal * ratio) + ":1";
            }
        });
        this.numberOfOuncesInPermaStack = ko.computed({
            owner: this,
            read: () => {
                let retVal = 0,
                    activeCoins = this.coins().filter(e =>e.active() && e.isPermaStack());
                retVal = this.getWeightSum(activeCoins);
                return retVal + " Ounces in permastack";
            }
        });
        this.numberOfOuncesNotInPermaStack = ko.computed({
            owner: this,
            read: () => {
                let retVal = 0,
                    activeCoins = this.coins().filter(e => e.active() && !e.isPermaStack());
                retVal = this.getWeightSum(activeCoins);
                return retVal + " Ounces not in permastack";
            }
        });
        this.meltTotal = ko.computed({
            owner: this,
            read: () => {
                let result =  this.coins()
                    .filter((c:Coin) =>c.active());
                let retVal = 0;
                result.forEach(function(c:Coin){
                    retVal += c.meltPrice();
                });
                return this.format4(retVal);
            }
        });
        this.investmentTotal = ko.computed({
            owner: this,
            read: () => {
                let result =  this.coins().filter((c:Coin) =>c.active());
                let retVal = 0;
                result.forEach(function(c:Coin){
                    retVal += Number(c.purchasePrice());
                });
                return this.format4(retVal);
            }
        });
        this.permaStackValue = ko.computed({
            owner: this,
            read: () => {
                let result =  this.coins().filter((c:Coin) =>c.active() && c.isPermaStack());
                let retVal = 0;
                result.forEach(function(c:Coin){
                    retVal += c.currentPrice();
                });
                return this.format4(retVal);
            }
        });
        this.possibleSale = ko.computed({
            owner: this,
            read: () => {
                let result =  this.coins().filter((c:Coin) =>c.active() && !c.isPermaStack());
                let retVal = 0;
                result.forEach(function(c:Coin){
                    retVal += c.currentPrice();
                });
                return this.format4(retVal);
            }
        });
        this.numberOfCoinsPermaStack = ko.computed({
            owner: this,
            read: () => {
                return this.coins().filter(e => e.active() && e.isPermaStack()).length + " Coins in permastack";
            }
        });
        this.numberOfCoinsNotPermaStack = ko.computed({
            owner: this,
            read: () => {
                return this.coins().filter(e => e.active() && !e.isPermaStack()).length + " Coins not in permastack";
            }
        });
    };
};

ko.applyBindings(new CoinHoarder(coinData));