class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.qualitySync(this.items[i])
    }
    return this.items;
  }

  qualitySync(item) {
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        this.reduceQuality(item)
      } else if (item.quality < 50) {
        this.restoreQuality(item)
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        this.processPastSellIn(item)
      }
    } else if (item.quality != 80) {
      item.quality = 80;//always 80, never changes
    }
  }

  reduceQuality(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
      if (item.name == 'Conjured' && item.quality > 0) {
        item.quality = item.quality - 1;
      }
    }
  }

  restoreQuality(item) {
    item.quality = item.quality + 1;
    if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.sellIn < 11) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
      if (item.sellIn < 6) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }

  processPastSellIn(item) {
    if (item.name != 'Aged Brie') {
      if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }
}

module.exports = {
  Item,
  Shop
}
