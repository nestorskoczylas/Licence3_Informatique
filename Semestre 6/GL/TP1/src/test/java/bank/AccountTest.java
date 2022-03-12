package bank;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class AccountTest {

	private Account account = new Account();
	private ArrayList<Double> listTest = new ArrayList<Double>(20);
	private ArrayList<Double> listTest1;
	
	@BeforeEach
	void Before() {
		this.listTest1 = new ArrayList<Double>(20);
		for(int i = 0; i < 20; i++) {
			this.listTest1.add(0.0);
		}
	}
	
	@Test
	void createAccountTest() {
		assertEquals(this.listTest1, account.getCredited());
		assertEquals(this.listTest1, account.getDebited());
	}
	
	@Test
	void creditTest() throws NumberException {
		account.addCredit(2.0);
		listTest.add(2.0);
		assertEquals(listTest.get(0), account.getOperationCredit(0));
	}
	
	@Test
	void debitTest() throws NumberException {
		account.addDebit(2.0);
		listTest.add(2.0);
		assertEquals(this.listTest.get(0), account.getOperationDebit(0));
	}
	
	@Test
	void negCreditTest() {
		assertThrows(NumberException.class, () -> {
			account.addCredit(-2);
		});
	}
	
	@Test
	void negDebitTest() {
		assertThrows(NumberException.class, () -> {
			account.addDebit(-2);
		});
	}
	
	@Test
	void verificationSoldeTest() throws NumberException {
		for(int i = 0; i < 5; i++) {
			account.addCredit(5);
			account.addDebit(3);
		}
		assertEquals(10, account.verificationSolde());
	}
	
	@Test
	void historicalCreditTest() {
		for(int i = 0; i < 25; i++) {
			account.historicalOperation(1.0, account.getCredited());
		}
		listTest.add(21.0);
		assertEquals(listTest.get(0), account.getOperationCredit(0));
	}
	
	@Test
	void historicalDebitTest() {
		for(int i = 0; i < 25; i++) {
			account.historicalOperation(1.0, account.getDebited());
		}
		listTest.add(21.0);
		assertEquals(listTest.get(0), account.getOperationDebit(0));
	}
	
	@Test
	void nullCreditTest() {
		assertThrows(NumberException.class, () -> {
			account.addCredit(0);
		});
	}
	
	@Test
	void nullDebitTest() {
		assertThrows(NumberException.class, () -> {
			account.addDebit(0);
		});
	}
	
	@Test
	void maxCreditTest() {
		assertThrows(NumberException.class, () -> {
			account.addCredit(100001);
		});
	}
	
	@Test
	void maxDebitTest() {
		assertThrows(NumberException.class, () -> {
			account.addDebit(100001);
		});
	}
}
