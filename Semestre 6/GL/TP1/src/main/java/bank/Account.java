package bank;

import java.util.ArrayList;

/**
 * An account allows you to credit and debit 
 * 
 * @author SKOCZYLAS Nestor
 * @version 16/01/22
 */

public class Account extends Bank {
	
	// Maximum number of credit or debit 
	private static final int HISTORY_LENGTH = 20;
	// Maximum amount not to be exceeded for a credit
	private static final int MAX_AMOUNT = 100000;
	
	// The balance of an account
	private int solde;
	
	// The list of all credits, where the first element is the sum of all previous credits 
	protected ArrayList<Double> credited;
	// The list of all debits, where the first element is the sum of all previous debits
	protected ArrayList<Double> debited;
	
	// Next index of the list of credits 
	private int nextIndexCredit = 0;
	// Next index of the list of debits
	private int nextIndexDebit = 0;
	
	/**
	 * Builds a Account
	 */
	public Account() {
		this.solde = 0;
		this.credited = new ArrayList<Double>(HISTORY_LENGTH);
		this.debited = new ArrayList<Double>(HISTORY_LENGTH);
		
		for (int i = 0; i < HISTORY_LENGTH; i++) {
	          credited.add(0.0);
	          debited.add(0.0);
	    }
	}
	
	/**
	 * To get list of credits
	 * 
	 * @return list of credits
	 */
	public ArrayList<Double> getCredited() {
		return this.credited;
	}
	
	/**
	 * To get list of debits
	 * 
	 * @return list of debits
	 */
	public ArrayList<Double> getDebited() {
		return this.debited;
	}
	
	/**
	 * To get the element of the list according to its index 
	 * 
	 * @param index of list of credits
	 * @return the element of the list according to its index 
	 */
	public double getOperationCredit(int index) {
		return this.credited.get(index);
	}
	
	/**
	 * To get the element of the list according to its index 
	 * 
	 * @param index of list of debits
	 * @return the element of the list according to its index 
	 */
	public double getOperationDebit(int index) {
		return this.debited.get(index);
	}
	
	/**
	 * Add credits in to the list
	 * 
	 * @param amountCredit amount of the credits
	 * @throws NumberException if the amount is negative, is null, superior of the max amount
	 */
	public void addCredit(double amountCredit) throws NumberException{
		if (amountCredit < 0 || amountCredit == 0 || maximumAmount(amountCredit)) {
			throw new NumberException();
		}
		this.credited.add(nextIndexCredit, amountCredit);
		nextIndexCredit++;
	}
	
	/**
	 * Add debits in to the list
	 * 
	 * @param amountDebit amount of the debits
	 * @throws NumberExceptionif if the amount is negative, is null, superior of the max amount
	 */
	public void addDebit(double amountDebit) throws NumberException {
		if (amountDebit < 0 || amountDebit == 0 || maximumAmount(amountDebit)) {
			throw new NumberException();
		}
		this.debited.add(nextIndexDebit, amountDebit);
		nextIndexDebit++;
	}
	
	/**
	 * Make sum of the element of list credits
	 * 
	 * @return sum of the element of list credits
	 */
	public int sumCredits() {
		int sumCredit = 0;
		for(int i = 0; i < credited.size(); i++) {
			sumCredit += credited.get(i);
		}
		return sumCredit;
	}
	
	/**
	 * Make sum of the element of list debits
	 * 
	 * @return sum of the element of list debits
	 */
	public int sumDebits() {
		int sumDebit = 0;
		for(int j = 0; j < debited.size(); j++) {
			sumDebit += debited.get(j);
		}
		return sumDebit;
	}
	
	/**
	 * Check the balance of the account
	 * 
	 * @return the balance of the account
	 */
	public int verificationSolde() {
		this.solde = sumCredits() - sumDebits();
		return this.solde;
	}
	
	/**
	 * Historic of the operation in the account
	 * 
	 * @param amount operation amount
	 * @param arrayList list of every amount
	 */
	public void historicalOperation(double amount, ArrayList<Double> arrayList) {
		if(arrayList.get(arrayList.size() - 1) != 0) {
			double sum = 0;
			for(int i = 0; i < arrayList.size(); i++) {
				sum += arrayList.get(i);
				arrayList.set(i, 0.0);
			}
			arrayList.set(0, sum + amount);
		}
		else {
			int j = 0;
			while(arrayList.get(j) != 0) {
				j++;
			}
			arrayList.set(j, amount);
		}
	}
	
	/**
	 * Maximum amount to reach
	 * 
	 * @param amount for test
	 * @return true, if amount superior of MAX_AMOUNT, false otherwise
	 */
	public boolean maximumAmount(double amount) {
		return amount > MAX_AMOUNT;
	}

}
