package competition;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import competition.competitions.League;
import competition.competitions.Tournament;
import competition.match.RandomMatchTest;
import competition.selections.FirstOfEachPool;
import competition.util.WrongNumberOfCompetitorsException;

public abstract class CompetitionTest {
	protected final List<Competitor> competitors = new ArrayList<Competitor>();
	private Competitor c1;
	private Competitor c2;
	private Competitor c3;
	private Competitor c4;
	private Competitor c5;
	private Competitor c6;
	private Competitor c7;
	private Competitor c8;
	protected Competition competition;
	protected final int numberOfPools = 2;
	protected final Selection selection = new FirstOfEachPool();
	
	public abstract static class CompetitionMock extends Competition {
		private Match match;
		
		public CompetitionMock(List<Competitor> competitor) throws WrongNumberOfCompetitorsException {
			super(competitor);
			this.match = new RandomMatchTest.RandomMatchMock();
		}
		
		protected void playMatch(Competitor c1, Competitor c2) {
			Competitor winner = this.match.play(c1, c2);
			winner.addScore(1);
		}
	}
	
	@BeforeEach
	public void Before() throws WrongNumberOfCompetitorsException {
		this.c1 = new Competitor("Jean-Luc");
		this.c2 = new Competitor("Emmanuel");
		this.c3 = new Competitor("Marine");
		this.c4 = new Competitor("Nathalie");
		this.c5 = new Competitor("Patrick");
		this.c6 = new Competitor("Gertrude");
		this.c7 = new Competitor("Michel");
		this.c8 = new Competitor("Bérangère");
		this.competitors.add(c1);
		this.competitors.add(c2);
		this.competitors.add(c3);
		this.competitors.add(c4);
		this.competitors.add(c5);
		this.competitors.add(c6);
		this.competitors.add(c7);
		this.competitors.add(c8);
		this.competition = createCompetition();
		
	}
	
	protected abstract Competition createCompetition() throws WrongNumberOfCompetitorsException;
	

	@Test
	public void testPlayMatch() {
		this.competition.playMatch(c1, c2);
		assertEquals(1, c1.getScore());
		assertEquals(0, c2.getScore());
	}
	
	@Test
	protected abstract void testPlay();
	
	@Test
	public void testEquals() throws WrongNumberOfCompetitorsException {
		Competition league = new League(this.competitors);
		Competition leagueBis = new League(this.competitors);
		Competition tournament = new Tournament(competitors);
		ArrayList<Competitor> testingList = new ArrayList<Competitor>();
		testingList.add(c1);
		testingList.add(c2);
		Competition league2 = new League(testingList);
		assertEquals(league, leagueBis);
		assertNotEquals(league,tournament);
		assertNotEquals(league, league2);
	}
	
	@Test
	public void testRanking() {
		this.c1.addScore(2);
		this.c2.addScore(3);
		this.c3.addScore(1);
		this.c4.addScore(1);
		Map<Competitor,Integer> competitors2 = new HashMap<Competitor,Integer>();
		competitors2.put(c2,3);
		competitors2.put(c1,2);
		competitors2.put(c4,1);
		competitors2.put(c3,1);
		competitors2.put(c8,0);
		competitors2.put(c5,0);
		competitors2.put(c7,0);
		competitors2.put(c6,0);
		assertEquals(competitors2, this.competition.ranking());
	}
	
	@Test
	protected abstract void testGoodNumberOfPlayers();
	
	@Test
	protected abstract void testWrongNumberOfPlayers();
}