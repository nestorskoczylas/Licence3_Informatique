package competition;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


public abstract class MatchTest {
	
	protected Competitor c1;
	protected Competitor c2;
	protected Match match;
	
	@BeforeEach
	public void before() {
		this.c1 = new Competitor("Marine");
		this.c2 = new Competitor("Nathalie");
		this.match = createMatch();
	}
	
	protected abstract Match createMatch();
	
	@Test
	protected abstract void testPlay();
	
}