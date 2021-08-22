var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });

  //NORMAL ITEMS: Quality decreases by 1 when sellIn > 0
  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

    //NORMAL ITEMS: Quality decreases by 2 when sellIn < 0
    it("Baisser de 2 la qualité et sellIn d'item normaux apres que la dete d'expiration soit depassee", function () {
      listItems.push(new Item("+5 Dexterity Vest", 0, 20));
      listItems.push(new Item("Mana Cake", 0, 6));
  
      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();
  
      var expected = [
        { sellIn: -1, quality: 18 },
        { sellIn: -1, quality: 4 }
      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
      });
    });

    //NORMAL ITEMS: Quality remains at 0 when it is already 0
    it("La qualité reste a 0 quand celle ci est deja a 0", function () {
      listItems.push(new Item("+5 Dexterity Vest", 33, 0));
      listItems.push(new Item("Mana Cake", 12, 0));
  
      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();
  
      var expected = [
        { sellIn: 32, quality: 0 },
        { sellIn: 11, quality: 0 }
      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
      });
    });

  // Special Items: quality increases or remains the same according to the item
  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 20, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
      { sellIn: 20, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  // Special Items: quality remains at 50 once it reaches 50, or remains the same according to the item
  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes mais qualite bornee a 50", function () {
    listItems.push(new Item("Aged Brie", 20, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50));
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 20, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 50 },
      { sellIn: 19, quality: 50 },
      { sellIn: 20, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

    // Special Items: Backsatge passes quality increases by 2 when sellIn belongs to [6..10]
    it("Augmenter la qualité de 2 pour Backstage quand il reste entre 6 et 10 jours a sellIn", function () {
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 6, 22));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 7, 22));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 8, 22));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 9, 22));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 22));

      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();
  
      var expected = [
        { sellIn: 5, quality: 24 },
        { sellIn: 6, quality: 24 },
        { sellIn: 7, quality: 24 },
        { sellIn: 8, quality: 24 },
        { sellIn: 9, quality: 24 },

      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
      });
    });

    // Special Items: Backsatge passes quality increases by 3 when sellIn belongs to [1..5]
    it("Augmenter la qualité de 3 pour Backstage quand il reste 5 jours ou moins a sellIn", function () {
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 1, 22));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 2, 22));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 3, 22));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 4, 22));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 22));

      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();
  
      var expected = [
        { sellIn: 0, quality: 25 },
        { sellIn: 1, quality: 25 },
        { sellIn: 2, quality: 25 },
        { sellIn: 3, quality: 25 },
        { sellIn: 4, quality: 25 },

      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
      });
    });

    // Special Items: Backsatge passes quality changes to 0 when sell in reaches 0
    it("Passer la qualité a 0 pour Backstage passes quand sellIn atteint 0", function () {
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 22));
      listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50));


      const gildedRose = new Shop(listItems);
      const items = gildedRose.updateQuality();
  
      var expected = [
        { sellIn: -1, quality: 0 },
        { sellIn: -1, quality: 0 },
      ];
      expected.forEach(function (testCase, idx) {
        expect(items[idx].quality).toBe(testCase.quality);
        expect(items[idx].sellIn).toBe(testCase.sellIn);
      });
    });

//Conjured ITEMS: Quality decreases by 2 when sellIn > 0
it("Baisser de 2 la qualité et sellIn de 1 de conjured items", function () {
  listItems.push(new Item("Conjured cake", 10, 20));
  listItems.push(new Item("Conjured toilet", 3, 6));

  const gildedRose = new Shop(listItems);
  const items = gildedRose.updateQuality();

  var expected = [
    { sellIn: 9, quality: 18 },
    { sellIn: 2, quality: 4 }
  ];
  expected.forEach(function (testCase, idx) {
    expect(items[idx].quality).toBe(testCase.quality);
    expect(items[idx].sellIn).toBe(testCase.sellIn);
  });
});

  //Conjured ITEMS: Quality decreases by 4 when sellIn < 0
  it("Baisser de 4 la qualité et sellIn de 1 de conjured items apres que la dete d'expiration soit depassee", function () {
    listItems.push(new Item("Conjured transistor", 0, 20));
    listItems.push(new Item("Conjured slut", 0, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 16 },
      { sellIn: -1, quality: 2 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  //Conjured ITEMS: Quality remains at 0 when it is already 0
  it("La qualité des conjured items reste a 0 quand celle ci est deja a 0", function () {
    listItems.push(new Item("Conjured carton box", 33, 0));
    listItems.push(new Item("Conjured laptop", 12, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 32, quality: 0 },
      { sellIn: 11, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});