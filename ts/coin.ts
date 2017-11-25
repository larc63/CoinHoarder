
const CURRENT_GOLD_SPOT = 1233.33;
const CURRENT_SILVER_SPOT = 15.46;
const CURRENT_PLATINUM_SPOT = 945.50;
const CURRENT_COPPER_SPOT = 2.06;


function pad(num: number, size: number) {
   return ('000000000' + num).substr(-size);
}

export class CoinData{
    coins: Array<Coin>;
    coinTypes: Array<CoinType>;
}

export class CoinType {
    width: KnockoutObservable<string>;
    diameter: KnockoutObservable<string>;
    metal: KnockoutObservable<string>;
    weight: KnockoutObservable<number>;
    series: KnockoutObservable<string>;
    mint: KnockoutObservable<string>;
    year: KnockoutObservable<string>;
    country: KnockoutObservable<string>;
    id: KnockoutObservable<string>;
    
    private generateID():string {
        return "ct" + pad(Math.floor(Math.random() * 100000000), 8);
    }

    // public clone = function () {
    //     var data = {};
    //     data.id = generateID();
    //     data.country = this.country();
    //     data.year = this.year();
    //     data.mint = this.mint();
    //     data.series = this.series();
    //     data.weight = this.weight();
    //     data.metal = this.metal();
    //     data.diameter = this.diameter();
    //     data.width = this.width();
    //     data.weight = this.weight();
    //     return new CoinType(data);
    // }

    constructor(data:any){
        this.id = ko.observable(data.id ? data.id : this.generateID());
        this.country = ko.observable(data.country ? data.country : "");
        this.year = ko.observable(data.year ? data.year : "");
        this.mint = ko.observable(data.mint ? data.mint : "");
        this.series = ko.observable(data.series ? data.series : "");
        this.weight = ko.observable(data.weight ? data.weight : "");
        this.metal = ko.observable(data.metal);
        this.diameter = ko.observable(data.diameter ? data.diameter : "--");
        this.width = ko.observable(data.width ? data.width : "--");
    }
};

export class Coin{
    coinType: KnockoutObservable<CoinType>;
    coinTypeId: string;
    premium: KnockoutObservable<number>;
    purchaseDate: KnockoutObservable<string>;
    purchasePrice: KnockoutObservable<number>;
    saleDate: KnockoutObservable<string>;
    salePrice: KnockoutObservable<number>;
    isPermaStack: KnockoutObservable<boolean>;
    active: KnockoutObservable<boolean>;
    id: KnockoutObservable<string>;
    currentPrice: KnockoutComputed<number>;    
    meltPrice: KnockoutComputed<number>;

    private generateID():string {
        return "ct" + pad(Math.floor(Math.random() * 100000000), 8);
    }

    // this.clone = function () {
    //     var data = {};
    //     data.id = generateID();
    //     data.active = this.active();
    //     data.coinType = this.coinType();
    //     data.premium = this.premium();
    //     data.purchaseDate = this.purchaseDate();
    //     data.purchasePrice = this.purchasePrice();
    //     data.saleDate = this.saleDate();
    //     data.salePrice = this.salePrice();
    //     data.isPermaStack = this.isPermaStack();
    //     return new Coin(data);
    // }
    constructor(data:any){
        this.id = ko.observable(data.id ? data.id : this.generateID());
        this.active = ko.observable(data.active);
        this.coinType = ko.observable(data.coinType);
        this.coinTypeId = this.coinType().id();
        this.premium = ko.observable(data.premium);
        this.purchaseDate = ko.observable(data.purchaseDate ? data.purchaseDate : "");
        this.purchasePrice = ko.observable(data.purchasePrice);
        this.saleDate = ko.observable(data.saleDate ? data.saleDate : "");
        this.salePrice = ko.observable(data.salePrice ? data.salePrice : "");
        this.isPermaStack = ko.observable(data.isPermaStack ? data.isPermaStack : false);
        this.meltPrice = ko.computed({
            owner: this,
            read:  () => {
                let metal = this.coinType().metal();
                let weight = this.coinType().weight();
                if (metal === "silver") {
                    return weight * CURRENT_SILVER_SPOT;
                }
                if (metal === "gold") {
                    return weight * CURRENT_GOLD_SPOT;
                }
                if (metal === "platinum") {
                    return weight * CURRENT_PLATINUM_SPOT;
                }
                if (metal === "copper") {
                    return weight * CURRENT_COPPER_SPOT;
                }
                return 0;
            }
        });

        this.currentPrice = ko.computed({
            owner: this,
            read:  () => {
                return this.meltPrice() * this.premium();
            }
        });
    }
};


// export class CoinSet{
//     "use strict";
//     name = "";
//     coins = ko.observableArray([]);
// }