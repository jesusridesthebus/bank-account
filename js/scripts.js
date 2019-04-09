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
};
Account.prototype.deposit = function(num) {
	this.balance+=num;
};

var accounts = new Accounts();

// function displayContactDetails(addressBookToDisplay) {
// 	var contactsList = $('ul#contacts');
// 	var htmlForContactInfo = '';
// 	addressBookToDisplay.contacts.forEach(function(contact) {
// 		htmlForContactInfo += '<li id=' + contact.id + '>' + contact.firstName + ' ' + contact.lastName + '</li>';
// 	});
// 	contactsList.html(htmlForContactInfo);
// }
//
// function showContact(contactId) {
// 	var contact = addressBook.findContact(contactId);
// 	$('#show-contact').show();
// 	$('.first-name').html(contact.firstName);
// 	$('.last-name').html(contact.lastName);
// 	$('.phone-number').html(contact.phoneNumber);
// 	var buttons = $('#buttons');
// 	buttons.empty();
// 	buttons.append('<button class=\'deleteButton\' id=' + contact.id + '>Delete</button>');
// }

function attachContactListeners() {
	$('ul#contacts').on('click', 'li', function() {
		showContact(this.id);
	});
	$('#buttons').on('click', '.deleteButton', function() {
		addressBook.deleteContact(this.id);
		$('#show-contact').hide();
		displayContactDetails(addressBook);
	});
}

$(function() {
	attachContactListeners();
	$('form#create').submit(function(event) {
		event.preventDefault();

    accounts.addAccount(new Account($('input.name').val(),parseInt($('input.initial').val())));
    console.log(accounts);

		$('input#new-first-name').val('');
		$('input#new-last-name').val('');
		$('input#new-phone-number').val('');

		//var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
		//addressBook.addContact(newContact);
		//displayContactDetails(addressBook);
	});
  $('form#transactions').submit(function(event) {
		event.preventDefault();

		var toMod = accounts.findAccount($('input.nameCheck').val());
    toMod.withdraw(parseInt($('input.withdraw').val()));
    toMod.deposit(parseInt($('input.deposit').val()));
    console.log(accounts);
	});
});
