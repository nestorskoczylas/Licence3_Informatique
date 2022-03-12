package competition.competitions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import competition.Competition;
import competition.CompetitionTest;
import competition.Competitor;
import competition.util.WrongNumberOfCompetitorsException;

public class TournamentTest extends CompetitionTest{
	
	public static class TournamentMock extends CompetitionMock {
		
		public TournamentMock(List<Competitor> competitors) throws WrongNumberOfCompetitorsException {
			super(competitors);
			int power2 = (int) (Math.log(competitors.size()) / Math.log(2));
			if (Math.pow(2, power2) != competitors.size() || competitors.size() <= 1) {
				throw new WrongNumberOfCompetitorsException("The number of competitors must be a power of 2. Please try again :)");
			}
		}

		@Override
		protected void play(List<Competitor> competitors) {
			List<Competitor> competitorsBis = competitors;
			while (competitorsBis.size() != 1) {
				List<Competitor> roundWinners = this.playRound(competitorsBis);
				competitorsBis = roundWinners;
			}
		}
		
		public List<Competitor> playRound(List<Competitor> competitorsBis) {
			List<Competitor> roundWinners = new ArrayList<>();
			for (int i = 0; i < competitorsBis.size() - 1; i += 2) {
				this.playMatch(competitorsBis.get(i), competitorsBis.get(i + 1));
				Competitor winner = competitorsBis.get(i).getScore() > competitorsBis.get(i+1).getScore() ? competitorsBis.get(i) : competitorsBis.get(i+1);
				roundWinners.add(winner);
			}
			return roundWinners;		
		}
	}

	@Override
	protected Competition createCompetition() throws WrongNumberOfCompetitorsException {
		return new TournamentMock(competitors);
	}
	
	private void testPlayRound() {
		List<Competitor> competitorsBis = this.competitors;
		while (competitorsBis.size() != 1) {
			List<Competitor> roundWinners = ((TournamentMock)this.competition).playRound(competitorsBis);
			assertEquals(competitorsBis.size() / 2, roundWinners.size());
			competitorsBis = roundWinners;
		}
	}
	
	@Test
	protected void testPlay() {
		this.testPlayRound();
	}

	@Test
	protected void testGoodNumberOfPlayers() {
		int power2 = (int) (Math.log(competitors.size()) / Math.log(2));
		assertTrue(power2 != 0);
		assertEquals(Math.pow(2, power2), competitors.size());
	}

	@Test
	protected void testWrongNumberOfPlayers() {
		assertThrows(WrongNumberOfCompetitorsException.class, new Executable() {
			
			@Override
			public void execute() throws Throwable {
				competitors.remove(0);
				new Tournament(competitors);
				
			}
		});
		
	}
}