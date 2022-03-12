package bank;

import java.util.ArrayList;

/**
 * bank allows you to manage accounts 
 * 
 * @author SKOCZYLAS Nestor
 * @version 16/01/22
 */
public class Bank {
	
	// List of all accounts
	private ArrayList<Account> accounts;

	/**
	 * Builds a Bank
	 */
	public Bank() {
		this.accounts = new ArrayList<Account>();
	}
	
	/**
	 * To get list accounts
	 * 
	 * @return list of accounts
	 */
	public ArrayList<Account> getAccounts() {
		return this.accounts;
	}
	
	/**
	 * Add an accout in to the list accounts
	 * 
	 * @param account element to add in to the list account
	 */
	public void addAccount(Account account) {
		accounts.add(account);
	}
	
	/**
	 * To get the account by an id
	 * 
	 * @param IdAccount the id of the account
	 * @return account by id
	 * @throws NumberException, if the id does not exist
	 */
	public Account getAccountByID(int IdAccount) throws NumberException {
		if(IdAccount >= this.accounts.size()) {
			throw new NumberException();
		}
		return this.accounts.get(IdAccount);
	}
	
	/**
	 * to make credit an account
	 * 
	 * @param idAccount id of an account
	 * @param amount to be credited
	 * @throws NumberException, if the id does not exist
	 */
	public void creditAccount(int idAccount, double amount) throws NumberException {
		getAccountByID(idAccount).addCredit(amount);
	}
	
	/**
	 * to make debit an account
	 * 
	 * @param idAccount id of an account
	 * @param amount to be debited
	 * @throws NumberException, if the id does not exist
	 */
	public void debitAccount(int idAccount, double amount) throws NumberException {
		getAccountByID(idAccount).addDebit(amount);
	}
	
	/**
	 * to make payment between two account
	 * 
	 * @param idAccountDebited id of the account to be debited
	 * @param idAccountCredited id of the account to be credited
	 * @param amount for the payment
	 * @throws NumberException, if the id does not exist
	 */
	public void payment(int idAccountDebited, int idAccountCredited, double amount) throws NumberException {
		getAccountByID(idAccountDebited);
		getAccountByID(idAccountCredited);
		debitAccount(idAccountDebited, amount);
		creditAccount(idAccountCredited, amount);
	}
}
