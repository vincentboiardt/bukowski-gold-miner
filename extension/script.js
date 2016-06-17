// ==UserScript==
// @name Bukowski Gold Miner
// @include https://*.bukowskis.com/*
// ==/UserScript==

var add_jq = function(callback) {
	var script = document.createElement('script');
	script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
	script.addEventListener('load', function() {
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
};
function main(){
	var j = jQuery.noConflict();
	var BPrices = {
		extra: 50,
		percent: .225,
		goldPrice: 220,
		init: function() {
			var fixedExtra = 50,
				currentPriceEl = j('.price-info .leading-amount'),
				currentPrice = BPrices.textToPrice(currentPriceEl),
				currentPriceAdjusted = BPrices.adjust(currentPrice),

				nextPriceEl = j('.bid-info .money'),
				nextPrice = BPrices.textToPrice(nextPriceEl),
				nextPriceAdjusted = BPrices.adjust(nextPrice);

			currentPriceEl.append('<span style="font-size: .5em">(' + BPrices.formatPrice(currentPriceAdjusted) + ')</span>');
			nextPriceEl.append('<span>(' + BPrices.formatPrice(nextPriceAdjusted) + ')</span>');

			var infoTextEl = j('.market-lot-info .description'),
				infoText = infoTextEl.text(),
				infoMatches = infoText.match(/(\d+,?\d*) g/g),
				infoExtra = '<br><b>Maybe gold:</b>';

			for (var i = 0; i < infoMatches.length; i++) {
				var text = infoMatches[i],
					weight = parseInt(text.replace(/ g/, '')),
					worth = weight * BPrices.goldPrice;

				infoExtra += '<br>' + text + ': ' + BPrices.formatPrice(worth);
			}

			infoTextEl.append(infoExtra);
		},
		adjust: function(val) {
			return val + (val * BPrices.percent) + BPrices.extra;
		},
		textToPrice: function(el) {
			return parseInt(el.text().replace(/\s/, ''));
		},
		formatPrice: function(price) {
			return price + ' SEK';
		}
	};
	BPrices.init();
}
add_jq(main);
