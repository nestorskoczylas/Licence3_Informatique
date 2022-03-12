package competition.competitions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import competition.Competition;
import competition.CompetitionTest;
import competition.Competitor;
import competition.util.WrongNumberOfCompetitorsException;

public class LeagueTest extends CompetitionTest{
	
	public static class LeagueMock extends CompetitionMock {

		public LeagueMock(List<Competitor> competitor) throws WrongNumberOfCompetitorsException {
			super(competitor);
			if (competitors.size() <= 1) throw new WrongNumberOfCompetitorsException("The number of competitors must be greater than one. Please try again :)");

		}

		@Override
		protected void play(List<Competitor> competitors) {
			for (Competitor c1 : competitors) {
				for (Competitor c2 : competitors) {
					if (!c1.equals(c2)) {this.playMatch(c1,c2);}
				}
			}
		}
	}


	@Override
	protected Competition createCompetition() throws WrongNumberOfCompetitorsException {
		return new LeagueMock(competitors);
	}


	@Test
	protected void testPlay() {
		this.competition.play();
		int nbVictory = (this.competitors.size() - 1);
		for (Competitor competitor: competitors) {
			assertEquals(nbVictory, competitor.getScore());
		}
	}

	@Test
	protected void testGoodNumberOfPlayers() {
		assertTrue(competitors.size() >= 2);
	}


	@Test
	protected void testWrongNumberOfPlayers() {
		assertThrows(WrongNumberOfCompetitorsException.class, new Executable() {
			@Override
			public void execute() throws Throwable {
				competitors.remove(0); // should be 7 now
				competitors.remove(0); // should be 6 now
				competitors.remove(0); // should be 5 now
				competitors.remove(0); // should be 4 now
				competitors.remove(0); // should be 3 now
				competitors.remove(0); // should be 2 now
				competitors.remove(0); // should be 1 now
				new League(competitors);
			}
		});
	}
}