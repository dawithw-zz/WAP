(function(){
	"use strict";

	let account;
	let deposit;
	let submit;
	let display;

	let accountInfoList = []; 

	function accountModule() {
		let accountName = account.value;
		let depositEntry = deposit.value;

		return function(){
			accountName = account.value;
			depositEntry = deposit.value;

			accountInfoList.push({ 
				name : accountName,
				balance : depositEntry
			});
			update();
		};
	}

	function update() {
		let displayString = "";
		for(let accountInfo of accountInfoList) {
			displayString += "Account name: " + accountInfo.name + "  Balance: " + accountInfo.balance + "\n";
		}
		display.value = displayString;
	}


	function init() {
		account = document.getElementById("account");
		deposit = document.getElementById("deposit");
		submit = document.getElementById("submit");
		display = document.getElementById("display");

		submit.onclick = accountModule();
	}


	window.onload = init;

})();