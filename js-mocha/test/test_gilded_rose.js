var { expect } = require('chai');
var { Shop, Item } = require('../src/gilded_rose.js');
describe("Gilded Rose", function () {

  const tests = [
    { name: "Should Lower SellBy and Quality", item: new Item("Cereal", 10, 10), days: 1, expected: { sellBy: 9, quality: 9 } },
    { name: "Should degrade 2x after sell by date passes", item: new Item("Cereal", 0, 10), days: 1, expected: { sellBy: -1, quality: 8 } },
    { name: "Quality is never negative", item: new Item("Cereal", 0, 0), days: 1, expected: { sellBy: -1, quality: 0 } },
    { name: "Quality is never negative (2)", item: new Item("Cereal", 0, 1), days: 1, expected: { sellBy: -1, quality: 0 } },
    { name: "Aged Brie increases", item: new Item("Aged Brie", 2, 2), days: 1, expected: { sellBy: 1, quality: 3 } },
    { name: "Aged Brie increases (2)", item: new Item("Aged Brie", 2, 2), days: 3, expected: { sellBy: -1, quality: 6 } },
    { name: "Quality never exceeds 50", item: new Item("Aged Brie", 2, 49), days: 2, expected: { sellBy: 0, quality: 50 } },
    { name: "Sulfuras never decreases", item: new Item("Sulfuras, Hand of Ragnaros", 1, 80), days: 10, expected: { sellBy: 1, quality: 80 } },
    { name: "Sulfuras gets reset to 80", item: new Item("Sulfuras, Hand of Ragnaros", 1, 10), days: 1, expected: { sellBy: 1, quality: 80 } },
    { name: "Backstage passes increase by 2 < 10 days", item: new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20), days: 2, expected: { sellBy: 8, quality: 24 } },
    { name: "Backstage passes increase by 3 < 5 days", item: new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20), days: 2, expected: { sellBy: 3, quality: 26 } },
    { name: "Backstage drops to 0 after date", item: new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20), days: 6, expected: { sellBy: -1, quality: 0 } },
    { name: "Conjured degrades 2x as fast", item: new Item("Conjured", 5, 20), days: 5, expected: { sellBy: 0, quality: 10 } },
    { name: "Conjured degrades 2x as fast", item: new Item("Conjured", 5, 20), days: 10, expected: { sellBy: -5, quality: 0 } },
  ]

  tests.forEach(test => {
    it(test.name, function () {
      const gildedRose = new Shop([test.item]);

      let items;
      for (let i = 0; i < test.days; i++) {
        items = gildedRose.updateQuality();
      }
      expect(items[0].sellIn).to.equal(test.expected.sellBy);
      expect(items[0].quality).to.equal(test.expected.quality);
    });
  });

});