package competition.match;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import competition.Competitor;
import competition.Match;
import competition.MatchTest;

public class RandomMatchTest extends MatchTest {

	@Override
	protected Match createMatch() {
		return new RandomMatchMock();
	}
	
	@Test
	protected void testPlay() {
		Competitor winner = this.match.play(this.c1, this.c2);
		assertEquals(c1, winner);
	}
	
	
	/**
	 * 
	 *
	 *
	 */
	public static class RandomMatchMock extends Match {
		@Override
		public Competitor play(Competitor c1, Competitor c2) {
			return c1;
		}
	}

}
