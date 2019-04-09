/* eslint-disable no-undef */
function Accounts() {
	this.accounts = []
}

Accounts.prototype.addAccount = function(account) {
	this.accounts.push(account);
};

Accounts.prototype.findAccount = function(name) {
	for(var i = 0; i < this.accounts.length; i++) {
		if(this.accounts[i]) {
			if(this.accounts[i].name == name) {
				return this.accounts[i];
			}
		}
	}
	return false;
};

function Account(name, balance) {
	this.name = name;
	this.balance = balance;
}

Account.prototype.withdraw = function(num) {
	this.balance-=num;
  if(this.balance < 0) {
    this.balance -= 35;
  }
};

Account.prototype.deposit = function(num) {
	this.balance+=num;
};

var accounts = new Accounts();

function displayAllAccounts(accountToDisplay) {
	var accountList = $('ul#account-list');
	var htmlForAccountInfo = '<h2>Accounts:</h2>';
	accountToDisplay.accounts.forEach(function(account) {
		htmlForAccountInfo += '<li id=' + account.name + '>' + account.name + ' $' + account.balance + '</li>';
	});
	accountList.html(htmlForAccountInfo);
}

function showAccountDetails(accountToDisplay) {
	var account = accounts.findAccount(accountToDisplay);
  console.log(account);
	$('#show-accounts').show();
	$('.name').text(account.name);
	$('.account-balance').text(account.balance);
	var buttons = $('#buttons');
	buttons.empty();
	// buttons.append('<button class=\'deleteButton\' id=' + contact.id + '>Delete</button>');
}

function attachContactListeners() {
	$('ul').on('click', 'li', function() {
    showAccountDetails(this.id);
	});
}

$(function() {
	attachContactListeners();
	$('form#create').submit(function(event) {
		event.preventDefault();

    accounts.addAccount(new Account($('input.name').val(),parseInt($('input.initial').val())));
    console.log(accounts);

		$('input.form-control').val('');
    displayAllAccounts(accounts);
	});

  $('form#transactions').submit(function(event) {
		event.preventDefault();

		var toMod = accounts.findAccount($('input.nameCheck').val());
    if(!toMod) {
      alert("No Account");
    } else {
      console.log(parseInt($('input.withdraw').val()));
    if(parseInt($('input.withdraw').val()) > 0) {
    toMod.withdraw(parseInt($('input.withdraw').val()));
    }
    if(parseInt($('input.deposit').val()) > 0)
    toMod.deposit(parseInt($('input.deposit').val()));
    }
    displayAllAccounts(accounts);
    console.log(accounts);
	});
});
