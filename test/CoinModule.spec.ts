import {
    Coin,
    CoinType
} from '../ts/coin';
import {
    expect
} from 'chai';
import 'mocha';

describe('Coin class', () => {
    let referenceCoinData = {
        "id": "mc60919972",
        "coinType": {
            "id": "ct30726160",
            "country": "USA",
            "year": 2015,
            "mint": "US Mint",
            "series": "Silver Eagle",
            "weight": 1,
            "width": 2.98,
            "metal": "silver",
            "diameter": 40.6},
        "coinTypeId": "ct30726160",
        "active": true,
        "premium": "1.45",
        "purchaseDate": "04/24/2015",
        "purchasePrice": "19.25",
        "saleDate": "",
        "salePrice": "",
        "isPermaStack": false
    };
    it('should be able to create a new coin from coin data', () => {
        let result = new Coin(referenceCoinData);
        expect(result.id()).to.equal(referenceCoinData.id);
    });
    it('should be able to clone a coin', () => {
        let coin1 = new Coin(referenceCoinData);
        expect(coin1.id()).to.equal(referenceCoinData.id);
        let coin2 = coin1.clone();
        expect(typeof coin1.id).to.equal(typeof coin2.id);
        expect(typeof coin1.id()).to.equal(typeof coin2.id());
        expect(coin1.id()).to.not.equal(coin2.id());
    });
});

describe('CoinType class', () => {
    let referenceCoinType = {
        "id": "ct30726160",
        "country": "USA",
        "year": 2015,
        "mint": "US Mint",
        "series": "Silver Eagle",
        "weight": 1,
        "width": 2.98,
        "metal": "silver",
        "diameter": 40.6
    };
    it('should be able to create a new coin from coin data', () => {
        let result = new CoinType(referenceCoinType);
        expect(result.id()).to.equal(referenceCoinType.id);
        expect(result.country()).to.equal(referenceCoinType.country);
        expect(result.year()).to.equal(referenceCoinType.year);
        expect(result.mint()).to.equal(referenceCoinType.mint);
        expect(result.series()).to.equal(referenceCoinType.series);
        expect(result.weight()).to.equal(referenceCoinType.weight);
        expect(result.width()).to.equal(referenceCoinType.width);
        expect(result.diameter()).to.equal(referenceCoinType.diameter);
        expect(result.metal()).to.equal(referenceCoinType.metal);
    });
    it('should be able to know if 2 coin types are equal', () => {
        let type = new CoinType(referenceCoinType);
        let result = type.isEqual(new CoinType(referenceCoinType));
        expect(result).to.equal(true);
    });
    it('should be able to know if 2 coin types are inequal', () => {
        let type = new CoinType(referenceCoinType);
        let modifiedCoinType = referenceCoinType;
        modifiedCoinType.diameter = 16;
        let result = type.isEqual(new CoinType(modifiedCoinType));
        expect(result).to.equal(false);
    });
    it('should be able to clone a coin type', () => {
        let type = new CoinType(referenceCoinType);
        let theCopy = type.clone();
        expect(typeof type.id()).to.equal(typeof theCopy.id());
        expect(type.id()).to.equal(theCopy.id());
        expect(type).to.not.equal(theCopy);
        let result = theCopy.isEqual(type);
        expect(result).to.be.true;
    });
});