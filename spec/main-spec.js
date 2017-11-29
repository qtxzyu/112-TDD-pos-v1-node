const main = require('../main/main');

describe('pos', function () {
    var allItems;
    var inputs;

	it("returns empty object given empty string",function () {
		inputs = [];
        spyOn(console, 'log');
        main(inputs);
		var expectText = '';
		expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it("returns expected string given one item of num one",function () {
        inputs = ['ITEM000001'];
        spyOn(console, 'log');
        main(inputs);
		var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
            '----------------------\n' +
            '总计：3.00(元)\n' +
            '**********************';
		expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it("returns expected string given two items both of num one",function () {
        inputs = ['ITEM000001', 'ITEM000002'];
        spyOn(console, 'log');
        main(inputs);
		var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
			'名称：苹果，数量：1斤，单价：5.50(元)，小计：5.50(元)\n' +
            '----------------------\n' +
            '总计：8.50(元)\n' +
            '**********************';
		expect(console.log).toHaveBeenCalledWith(expectText);
    });

	it("returns expected string given two items of num 2",function () {
        inputs = ['ITEM000001', 'ITEM000002','ITEM000002'];
        spyOn(console, 'log');
        main(inputs);
		var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
			'名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)\n' +
            '----------------------\n' +
            '总计：14.00(元)\n' +
            '**********************';
		expect(console.log).toHaveBeenCalledWith(expectText);
    });
	
	it("returns expected string given two items of num-2 i",function () {
        inputs = ['ITEM000001', 'ITEM000002-2'];
        spyOn(console, 'log');
        main(inputs);
		var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
			'名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)\n' +
            '----------------------\n' +
            '总计：14.00(元)\n' +
            '**********************';
		expect(console.log).toHaveBeenCalledWith(expectText);
    });
	
	it("returns expected string given two items both of num-2 ii",function () {
        inputs = ['ITEM000001-2', 'ITEM000002'];
        spyOn(console, 'log');
        main(inputs);
		var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：2瓶，单价：3.00(元)，小计：3.00(元)\n' +
			'名称：苹果，数量：1斤，单价：5.50(元)，小计：5.50(元)\n' +
            '----------------------\n' +
			'挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '----------------------\n' +
            '总计：8.50(元)\n' +
			'节省：3.00(元)\n' +
            '**********************';
		expect(console.log).toHaveBeenCalledWith(expectText);
    });
    
    it('should print correct text', function () {
		inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        spyOn(console, 'log');

        main(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
