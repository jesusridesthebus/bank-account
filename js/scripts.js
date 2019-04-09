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

function displayAccountDetails(accountToDisplay) {
	var accountList = $('ul#account-list');
	var htmlForAccountInfo = '';
	accountToDisplay.accounts.forEach(function(account) {
		htmlForAccountInfo += '<li class=' + account.name + '>' + account.name + ' $' + account.balance + '</li>';
	});
	accountList.html(htmlForAccountInfo);
}

function showContact(contactId) {
	var contact = addressBook.findContact(contactId);
	$('#show-contact').show();
	$('.first-name').html(contact.firstName);
	$('.last-name').html(contact.lastName);
	$('.phone-number').html(contact.phoneNumber);
	var buttons = $('#buttons');
	buttons.empty();
	buttons.append('<button class=\'deleteButton\' id=' + contact.id + '>Delete</button>');
}

function attachContactListeners() {
	$('ul').on('click', 'li', function() {
    console.log(this);
    $('.nameCheck').val(this.class);
    $('.deposit').val(this.class);
    $('.withdraw').val(this.class);
	});
}

$(function() {
	attachContactListeners();
	$('form#create').submit(function(event) {
		event.preventDefault();

    accounts.addAccount(new Account($('input.name').val(),parseInt($('input.initial').val())));
    console.log(accounts);

		$('input.form-control').val('');
    displayAccountDetails(accounts);
	});

  $('form#transactions').submit(function(event) {
		event.preventDefault();

		var toMod = accounts.findAccount($('input.nameCheck').val());
    if(!toMod) {
      alert("No Account");
    } else {
    toMod.withdraw(parseInt($('input.withdraw').val()));
    toMod.deposit(parseInt($('input.deposit').val()));
    }
    displayAccountDetails(accounts);
    console.log(accounts);
	});
});
