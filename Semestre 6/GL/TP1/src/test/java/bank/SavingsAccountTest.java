package bank;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class SavingsAccountTest {

	private SavingsAccount savingsAccount = new SavingsAccount();
	private ArrayList<Double> listTest1;
	private ArrayList<Double> listTest = new ArrayList<Double>(20);
	
	@BeforeEach
	void Before() {
		this.listTest1 = new ArrayList<Double>(20);
		for(int i = 0; i < 20; i++) {
			this.listTest1.add(0.0);
		}
	}
	
	@Test
	void createSavingsAccountTest() {
		assertEquals(this.listTest1, savingsAccount.getCredited());
		assertEquals(this.listTest1, savingsAccount.getDebited());
	}
	
	@Test
	void creditsSavingsAccountTest() throws NumberException {
		savingsAccount.addCredit(2.0);
		listTest.add(2.0);
		assertEquals(listTest.get(0), savingsAccount.getOperationCredit(0));
	}
	
	@Test
	void verificationSoldeTest() throws NumberException {
		for(int i = 0; i < 5; i++) {
			savingsAccount.addCredit(5);
		}
		assertEquals(25, savingsAccount.verificationSolde());
	}
	
	/*
	 * @Test
	 * void accountSuperiorSoldeTest() throws NegativeNumberException {
	 * 	savingsAccount.amountGreaterThanBalance(50);
	 *  assertEquals(0, savingsAccount.verificationSolde());
	 * }
	 */
	
	@Test
	void accountSuperiorSoldeV2Test() {
		assertThrows(NumberException.class, () -> {
			savingsAccount.addDebit(50);
		});
	}
	
	@Test
	void interestCorrectTest() throws NumberException {
		for(int i = 0; i < 5; i++) {
			savingsAccount.addCredit(100);
		}
		assertEquals(5.0, savingsAccount.getInterest());
	}
	
	@Test
	void echeanceTest() throws NumberException {
		for(int i = 0; i < 5; i++) {
			savingsAccount.addCredit(100);
		}
		savingsAccount.echeance();
		assertEquals(505, savingsAccount.sumCredits());
	}
}
