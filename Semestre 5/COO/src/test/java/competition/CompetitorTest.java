package competition;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CompetitorTest {
	
	private Competitor c;
	private Competitor c1;
	private Competitor c2;
	
	@BeforeEach
	public void before() {
		this.c = new Competitor ("Emmanuel");
		this.c1 = new Competitor("Emmanuel");
		this.c2 = new Competitor("Marine");
	}
	
	
	@Test
	public void getNameTest() {
		assertEquals("Emmanuel", c.getName());
	}
	
	@Test
	public void getScoreTest() {
		assertEquals(0, this.c.getScore());
	}
	
	@Test
	public void addScoreTest() {
		this.c.addScore(2);
		assertEquals(2,this.c.getScore());
	}
	
	@Test
	public void equalsTest() {
		this.c2.addScore(2);
		assertTrue(this.c.equals(c1));
		assertFalse(this.c.equals(c2));
	}
}