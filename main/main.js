let loadAllItems = require('./datbase.js')
let loadPromotions = require('./datbase2.js');
function getItemDescription(inputs) {
	let items = loadAllItems();
	let entry = inputs.map ((input) => {
		let value =  items.find((item) => item.barcode === input.barcode);
		value.count = input.count;
		value.total = value.price * value.count;
		return value;
	});
	return entry;
} 

function getSplitedArray(inputs) {
	let result = [];
	inputs.forEach((item) => {
		let array = item.split('-');
	    if (array.length > 1) {
	    	result.push({barcode:array[0], count:parseInt(array[1])});
	    } else {
	    	result.push({barcode:array[0], count:1});
	    }
	});
	    
	return result;
}

function getItemNumber(inputs) {
	let numberArray = [];
	inputs.forEach ((input) => {
		"use strict";
		let numberentry = numberArray.find((e) => e.barcode === input.barcode);
		if (numberentry) {
			numberentry.count += input.count;
		} else {
			numberArray.push({barcode:input.barcode, count:input.count});
		}
	});
	return numberArray;
}

function check(inputs) {
	let promotions = loadPromotions();
	let outputs = inputs.map((item) => {
		item.discount = 0;
		let entry = promotions.find((e) => (e.barcodes.indexOf(item.barcode)) > -1);
		if (entry) {
			if (entry.type === 'BUY_TWO_GET_ONE_FREE' && item.count >= 2) {
				item.discount = 1;
				item.total = (item.count - item.discount) * item.price;
			}
		}
		return item;
	});
	return outputs;
}

function getOutputString(entry) {
	let strStart = '***<没钱赚商店>购物清单***\n';
	let strMiddle = '----------------------\n';
	let strEnd = '**********************';
	let result = '';
	let totalPrice = 0;
	let discountPrice = 0;
	entry.forEach((item) => {
		discountPrice += item.discount * item.price;
		totalPrice +=  item.total;
	});
	result += strStart;
	entry.forEach((item) => {
		result += '名称：' + item.name + '，数量：' + item.count + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + item.total.toFixed(2) + '(元)\n'
	});
	if (discountPrice > 0) {
		result += strMiddle;
		result += '挥泪赠送商品：\n';
		entry.forEach((item) => {
			if (item.discount > 0) {
				result += '名称：'+ item.name + '，数量：' + item.discount + item.unit + '\n'
			}
		})
	}
	result += strMiddle;
	result += '总计：' + totalPrice.toFixed(2) + '(元)\n'
	if (discountPrice > 0) {
		result += '节省：'+ discountPrice.toFixed(2) + '(元)\n'
	}
	result += strEnd;
	return result;
}

module.exports = function main(inputs) {
	let result = '';
	if (inputs.length > 0) {
		let splitedArray = getSplitedArray(inputs);
		let numberArray = getItemNumber(splitedArray);
		let entry = getItemDescription(numberArray);
		let outputArray = check(entry);
		result = getOutputString(outputArray);
	}
	
	
    console.log(result);
    //return 'Hello World!';
};