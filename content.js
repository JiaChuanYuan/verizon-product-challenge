/*chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.text === 'report_back') {
		var cartContents = document.getElementsByClassName("a-size-medium sc-product-title a-text-bold");
		var names = [];
		for (var i = 0; i < cartContents.length; i++) {
			names.push(cartContents[i].textContent);
		}
		sendResponse(names);
	}
});*/

var database =
{
    "Amazon Echo, Philips Hue": 1,
    "Amazon Echo, Ring Doorbell": 0,
    "Amazon Echo, Nest Thermostat": 1,
    "Amazon Echo, Ecobee Thermostat": 1,
    "Amazon Echo, Sonos Speaker": 1,
    "Google Home, Philips Hue": 1,
    "Google Home, Ring Doorbell": 1,
    "Google Home, Nest Thermostat": 1,
    "Google Home, Ecobee Thermostat": 1,
    "Google Home, Sonos Speaker": 1,
    "Samsung SmartThings, Philips Hue": 1,
    "Samsung SmartThings, Ring Doorbell": 1,
    "Samsung SmartThings, Nest Thermostat": 0,
    "Samsung SmartThings, Ecobee Thermostat": 1,
    "Samsung SmartThings, Sonos Speaker": 0
};

var pairs, comps, nonc;

function saveCartInformation(cartContent) {
	console.log("Webpage's DOM content:\n" + cartContent[0]);
	console.log(cartContent[1]);
	var products = [];
	for (var i = 0; i < cartContent.length; i++) {
		if (cartContent[i].includes("Echo")) {
			products.push("Amazon Echo");
		} else if (cartContent[i].includes("Google") && !cartContent[i].includes("Philips") && !cartContent[i].includes("Samsung")) {
			products.push("Google Home");
		} else if (cartContent[i].includes("SmartThings")) {
			products.push("Samsung SmartThings");
		} else if (cartContent[i].includes("Hue")) {
			products.push("Philips Hue");
		} else if (cartContent[i].includes("Ring")) {
			products.push("Ring Doorbell");
		} else if (cartContent[i].includes("Nest")) {
			products.push("Nest Thermostat");
		} else if (cartContent[i].includes("Ecobee")) {
			products.push("Ecobee Thermostat");
		} else if (cartContent[i].includes("Sonos")) {
			products.push("Sonos Speaker");
		} else {
			products.push("UNKNOWN");
		}
	}
	console.log(products);
	pairs = [];
	for (var i = 0; i < products.length; i++) {
		if (products[i].localeCompare("Amazon Echo") === 0) {
			for (var j = 0; j < products.length; j++) {
				if (products[j].localeCompare("Philips Hue") === 0) {
					pairs.push("Amazon Echo, Philips Hue");	
				} else if (products[j].localeCompare("Ring Doorbell") === 0) {
					pairs.push("Amazon Echo, Ring Doorbell");
				} else if (products[j].localeCompare("Nest Thermostat") === 0) {
					pairs.push("Amazon Echo, Nest Thermostat");
				} else if (products[j].localeCompare("Ecobee Thermostat") === 0) {
					pairs.push("Amazon Echo, Ecobee Thermostat");
				} else if (products[j].localeCompare("Sonos Speaker") === 0) {
					pairs.push("Amazon Echo, Sonos Speaker");
				} else {
					
				}
			}
		} else if (products[i].localeCompare("Google Home") === 0) {
			for (var j = 0; j < products.length; j++) {
				if (products[j].localeCompare("Philips Hue") === 0) {
					pairs.push("Google Home, Philips Hue");	
				} else if (products[j].localeCompare("Ring Doorbell") === 0) {
					pairs.push("Google Home, Ring Doorbell");
				} else if (products[j].localeCompare("Nest Thermostat") === 0) {
					pairs.push("Google Home, Nest Thermostat");
				} else if (products[j].localeCompare("Ecobee Thermostat") === 0) {
					pairs.push("Google Home, Ecobee Thermostat");
				} else if (products[j].localeCompare("Sonos Speaker") === 0) {
					pairs.push("Google Home, Sonos Speaker");
				} else {
					
				}
			}
		} else if (products[i].localeCompare("Samsung SmartThings") === 0) {
			for (var j = 0; j < products.length; j++) {
				if (products[j].localeCompare("Philips Hue") === 0) {
					pairs.push("Samsung SmartThings, Philips Hue");	
				} else if (products[j].localeCompare("Ring Doorbell") === 0) {
					pairs.push("Samsung SmartThings, Ring Doorbell");
				} else if (products[j].localeCompare("Nest Thermostat") === 0) {
					pairs.push("Samsung SmartThings, Nest Thermostat");
				} else if (products[j].localeCompare("Ecobee Thermostat") === 0) {
					pairs.push("Samsung SmartThings, Ecobee Thermostat");
				} else if (products[j].localeCompare("Sonos Speaker") === 0) {
					pairs.push("Samsung SmartThings, Sonos Speaker");
				} else {
					
				}
			}
		} else {
			
		}
	}
	console.log(pairs);
	comps = [];
	nonc = [];
	if (pairs.length === 0) {
		
	} else {
		for (var i = 0; i < pairs.length; i++) {
			if (database.hasOwnProperty(pairs[i])) {
				console.log(database[pairs[i]]);
				if (database[pairs[i]] === 1) {
					comps.push(pairs[i]);
				} else {
					nonc.push(pairs[i]);
				}
			}
		}
		console.log(comps);
		console.log(nonc);
	}	
}

function checkCompatibility() {
	if (pairs.length === 0) {
		return "Compatibility is unknown due to unrelated items";
	} else {
		if (nonc.length === 0) {
			return "All items are compatibile with each other";
		} else {
			var nonCom = "The following item pairs are not compatible:\n";
			for (var i = 0; i < nonc.length; i++) {
				nonCom = nonCom + nonc[i] + "\n";
			}
			return nonCom;
		}
	}
}

chrome.runtime.sendMessage({
	from: 'content',
	subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if ((msg.from === 'popup') && (msg.subject === 'compatInfo')) {
		var cartContents = document.getElementsByClassName("a-size-medium sc-product-title a-text-bold");
		var names = [];
		for (var i = 0; i < cartContents.length; i++) {
			names.push(cartContents[i].textContent);
		}
		saveCartInformation(names);
		//sendResponse(checkCompatibility());
		sendResponse(cartContents);
	} else {
		sendResponse("DID NOT WORK");
	}
});

/*chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if ((msg.from === 'popup') && (msg.subject === 'compatInfo')) {
		var cartContents = document.getElementsByClassName("a-size-medium sc-product-title a-text-bold");
		var names = [];
		for (var i = 0; i < cartContents.length; i++) {
			names.push(cartContents[i].textContent);
		}
		console.log(names);
		sendResponse(names);
	}
});*/