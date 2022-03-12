package bank;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;

public class BankTest {
	
	private Bank bank = new Bank();
	private ArrayList<Account> listAccount = new ArrayList<Account>();
	private Account account = new Account();
	private Account account1 = new Account();
	private SavingsAccount savingsAccount = new SavingsAccount();
	private SavingsAccount savingsAccount1 = new SavingsAccount();
	
	@Test
	void createBankTest() {
		assertEquals(listAccount, bank.getAccounts());
	}
	
	@Test
	void openAccountTest() {
		bank.addAccount(account);
		listAccount.add(account);
		assertEquals(listAccount, bank.getAccounts());
	}
	
	@Test
	void openSavingsAccountTest() {
		bank.addAccount(savingsAccount);
		listAccount.add(savingsAccount);
		assertEquals(listAccount,bank.getAccounts());
	}
	
	@Test
	void addCreditAccount() throws NumberException {
		bank.addAccount(account);
		bank.creditAccount(0, 1);
		assertEquals(1, account.getOperationCredit(0));
	}
	
	@Test
	void addDebitAccount() throws NumberException {
		bank.addAccount(account);
		bank.debitAccount(0, 1);
		assertEquals(1, account.getOperationDebit(0));
	}
	
	@Test
	void idAccountNotExistTest() {
		assertThrows(NumberException.class, () -> {
			bank.getAccountByID(5);
		});
	}
	
	@Test
	void paymentAccountTest() throws NumberException {
		bank.addAccount(account);
		bank.creditAccount(0, 2);
		bank.addAccount(account1);
		bank.payment(0, 1, 2);
		assertEquals(2, bank.getAccountByID(1).getOperationCredit(0));
	}
	
	@Test
	void paymentSavingsAccountTest() throws NumberException {
		bank.addAccount(savingsAccount);
		bank.creditAccount(0, 2);
		bank.addAccount(savingsAccount1);
		bank.payment(0, 1, 2);
		assertEquals(2, bank.getAccountByID(1).getOperationCredit(0));
	}
	
	@Test
	void paymentSavingsAccountNoDebitTest() {
		bank.addAccount(savingsAccount);
		bank.addAccount(savingsAccount1);
		assertThrows(NumberException.class, () -> {
			bank.payment(0, 1, 2);
		});
	}
	
	@Test
	void paymentAccountNotExistTest() {
		bank.addAccount(account);
		assertThrows(NumberException.class, () -> {
			bank.payment(0, 1, 2);
		});
	}
	
	
	
}
