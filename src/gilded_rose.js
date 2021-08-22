class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}



class Shop {
  constructor(items=[]){
    this.items = items;
    this.specialItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'];

  }

  isExpiredDatePast (item) {
    return item.sellIn <= 0 ? true : false
  }

  isQualityNegative (item) {
    return item.quality <= 0 ? true : false
  }

  isQualityOver50 (item) {
    return item.quality > 50 ? true : false
  }

  isItemSpecial (item) {
    return this.specialItems.includes(item.name) ? true : false
    
  }

  isItemConjured (item) {
    return item.name.substring(0,8) === 'Conjured' ? true : false
  }

  sellIn10Days (item) {
    return range(6,10).includes(item.sellIn) ? true : false
  }

  sellIn5Days (item) {
    return range(1,5).includes(item.sellIn) ? true : false
  }

  
  updateQuality() {
    for (let item of this.items) {

      if (this.isItemSpecial(item)) {
        switch (item.name) {
          case 'Aged Brie':
            item.quality += 1;
            this.isQualityOver50(item) ? item.quality = 50 : item.quality = item.quality;
            break;
            case 'Sulfuras, Hand of Ragnaros':
              item.quality = item.quality;
            break;
            case 'Backstage passes to a TAFKAL80ETC concert':
              this.sellIn10Days(item) ? item.quality += 2 : (this.sellIn5Days(item) ? item.quality += 3 : this.isExpiredDatePast(item) ? item.quality = 0 : item.quality += 1);
              this.isQualityOver50(item) ? item.quality = 50 : item.quality = item.quality;
              break;
          default:
            console.log('Wrong item');
        }
      } else if (this.isItemConjured(item)) {
        this.isExpiredDatePast(item) ? item.quality -= 4 : item.quality -= 2;
        this.isQualityNegative(item) ? item.quality = 0 : item.quality = item.quality;
      } else {
        this.isExpiredDatePast(item) ? item.quality -= 2 : item.quality -= 1;
        this.isQualityNegative(item) ? item.quality = 0 : item.quality = item.quality;
      }

      item.name == 'Sulfuras, Hand of Ragnaros' ? item.sellIn = item.sellIn : item.sellIn -= 1;
    }

    return this.items;
  }
}

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

module.exports = {
  Item,
  Shop
}

  // let listItems = []
  // listItems.push(new Item("+5 Dexterity Vest", 10, 20));
  // listItems.push(new Item("Mana Cake", 3, 6));

  // const gildedRose = new Shop(listItems);

  // console.log(listItems)

  // const items = gildedRose.updateQuality();

  // console.log(items)
