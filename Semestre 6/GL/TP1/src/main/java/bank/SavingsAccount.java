package bank;

import java.util.Calendar;

/**
 * A savings account allows you to credit and debit, if it's possible
 * 
 * @author SKOCZYLAS Nestor
 * @version 16/01/22
 */
public class SavingsAccount extends Account {

	// interest of the account
	private double interet;
	// provides methods for converting between a specific instant in time
	private Calendar calendar;
	
	
	/**
	 * Builds a savings account
	 */
	public SavingsAccount() {
		super();
		this.interet = 0.0;
		this.calendar = Calendar.getInstance();
	}
	
	/**
	 * Amount greater than the balance
	 * 
	 * @param amount checked
	 * @return true, if the amount is superior of the solde, false otherwise
	 * @throws NumberException
	 */
	public boolean amountGreaterThanBalance(double amount) {
		return amount > verificationSolde();
	}
	
	/**
	 * Add debits in to the list
	 * Override the method 
	 * 
	 * @param amountDebit amount of the debits
	 * @throws NumberExceptionif if the amount is negative, is null, superior of the max amount
	 */
	@Override
	public void addDebit(double amountDebit) throws NumberException {
		if(amountGreaterThanBalance(amountDebit)) {
			throw new NumberException();
		}
		super.addDebit(amountDebit);
	}
	
	/**
	 * To get the interest
	 * 
	 * @return the interest
	 */
	public double getInterest() {
		this.interet = sumCredits() * 0.01;
		return this.interet;
	}
	
	/**
	 * Make the echeance
	 * 
	 * @throws NumberException if the amount is negative, is null, superior of the max amount
	 */
	public void echeance() throws NumberException {
		if(this.calendar.get(Calendar.MONTH) == Calendar.JANUARY) {
			addCredit(getInterest());
		}
	}
	
}
