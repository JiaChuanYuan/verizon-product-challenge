/*var database =
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

var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?amazon\.com\/gp\/cart/;
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
		if (products[i].localeCompare("Amazon Echo") == 0) {
			for (var j = 0; j < products.length; j++) {
				if (products[j].localeCompare("Philips Hue") == 0) {
					pairs.push("Amazon Echo, Philips Hue");	
				} else if (products[j].localeCompare("Ring Doorbell") == 0) {
					pairs.push("Amazon Echo, Ring Doorbell");
				} else if (products[j].localeCompare("Nest Thermostat") == 0) {
					pairs.push("Amazon Echo, Nest Thermostat");
				} else if (products[j].localeCompare("Ecobee Thermostat") == 0) {
					pairs.push("Amazon Echo, Ecobee Thermostat");
				} else if (products[j].localeCompare("Sonos Speaker") == 0) {
					pairs.push("Amazon Echo, Sonos Speaker");
				} else {
					
				}
			}
		} else if (products[i].localeCompare("Google Home") == 0) {
			for (var j = 0; j < products.length; j++) {
				if (products[j].localeCompare("Philips Hue") == 0) {
					pairs.push("Google Home, Philips Hue");	
				} else if (products[j].localeCompare("Ring Doorbell") == 0) {
					pairs.push("Google Home, Ring Doorbell");
				} else if (products[j].localeCompare("Nest Thermostat") == 0) {
					pairs.push("Google Home, Nest Thermostat");
				} else if (products[j].localeCompare("Ecobee Thermostat") == 0) {
					pairs.push("Google Home, Ecobee Thermostat");
				} else if (products[j].localeCompare("Sonos Speaker") == 0) {
					pairs.push("Google Home, Sonos Speaker");
				} else {
					
				}
			}
		} else if (products[i].localeCompare("Samsung SmartThings") == 0) {
			for (var j = 0; j < products.length; j++) {
				if (products[j].localeCompare("Philips Hue") == 0) {
					pairs.push("Samsung SmartThings, Philips Hue");	
				} else if (products[j].localeCompare("Ring Doorbell") == 0) {
					pairs.push("Samsung SmartThings, Ring Doorbell");
				} else if (products[j].localeCompare("Nest Thermostat") == 0) {
					pairs.push("Samsung SmartThings, Nest Thermostat");
				} else if (products[j].localeCompare("Ecobee Thermostat") == 0) {
					pairs.push("Samsung SmartThings, Ecobee Thermostat");
				} else if (products[j].localeCompare("Sonos Speaker") == 0) {
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
	if (pairs.length == 0) {
		
	} else {
		for (var i = 0; i < pairs.length; i++) {
			if (database.hasOwnProperty(pairs[i])) {
				console.log(database[pairs[i]]);
				if (database[pairs[i]] == 1) {
					comps.push(pairs[i]);
				} else {
					nonc.push(pairs[i]);
				}
			}
		}
		console.log(comps);
		console.log(nonc);
	}
	setCompatInfo(checkCompatibility());
}

function checkCompatibility() {
	if (pairs.length == 0) {
		return "Compatibility is unknown due to unrelated items";
	} else {
		if (nonc.length == 0) {
			return "All items are compatibile with each other";
		} else {
			var nonCom = "The following item pairs are not compatible:\n";
			for (var i = 0; i < nonc.length; i++) {
				nonCom = nonCom + nonc[i] + "\n";
			}
			return nonCom;
		}
	}
}*/

function setCompatInfo(info) {
	var bkg = chrome.extension.getBackgroundPage();
	bkg.console.log("THIS TEST APPEARED");
	bkg.console.log(info);
	document.getElementById("compatInfo").textContent = info;
}

chrome.runtime.sendMessage(
	{from: 'popup', subject: 'compatInfo'},
	//saveCartInformation
	setCompatInfo
)

/*chrome.pageAction.onClicked.addListener(function (tab) {
	if (urlRegex.test(tab.url)) {
		chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, saveCartInformation);
	}
})*/

/*window.addEventListener('ContentLoaded', function() {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'compatInfo'}, saveCartInformation);
	});
});*/