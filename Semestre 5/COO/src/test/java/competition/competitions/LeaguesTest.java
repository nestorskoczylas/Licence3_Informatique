package competition.competitions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import competition.Competition;
import competition.CompetitionTest;
import competition.Competitor;
import competition.competitions.LeagueTest.LeagueMock;
import competition.util.WrongNumberOfCompetitorsException;

public class LeaguesTest extends CompetitionTest {
	
	public static class LeaguesMock extends CompetitionMock {
		
		public int nbOfPlayersPerPools;
		public List<List<Competitor>> pools;

		public LeaguesMock(List<Competitor> competitors, int numberOfPools) throws WrongNumberOfCompetitorsException {
			super(competitors);
			this.nbOfPlayersPerPools = competitors.size()/numberOfPools;
			this.pools = new ArrayList<>();
			if (this.nbOfPlayersPerPools <= 1) throw new WrongNumberOfCompetitorsException(); 

		}
		
		public List<List<Competitor>> getPools(){
			return this.pools;
		}
		
		@Override
		protected void play(List<Competitor> competitors){
			List<Competitor> competitorsOfThePool = new ArrayList<>();
			for (int i=1; i<=competitors.size(); i++) {
				competitorsOfThePool.add(competitors.get((i-1)));
				if (i % this.nbOfPlayersPerPools == 0) {
					try {
						this.playALeague(competitorsOfThePool);
						competitorsOfThePool = new ArrayList<>();
					} 
					catch (Exception e) {System.out.println(e);}
				}
			}
		}

		public void playALeague(List<Competitor> competitorsOfThePool) throws WrongNumberOfCompetitorsException {
			LeagueMock league = new LeagueMock(competitorsOfThePool);
			league.play();
			this.pools.add(competitorsOfThePool);
		}
	}


	protected Competition createCompetition() throws WrongNumberOfCompetitorsException {
		return new LeaguesMock(competitors,this.numberOfPools);
	}
	
	@Test
	protected void testPlayALeague() throws WrongNumberOfCompetitorsException {
		int nbOfPlayerPerPool = ((LeaguesMock) this.competition).nbOfPlayersPerPools;
		int nbVictory = (nbOfPlayerPerPool - 1);
		List<Competitor> competitorsOfThePool = new ArrayList<>();
		for (int i=1; i<=competitors.size(); i++) {
			competitorsOfThePool.add(competitors.get((i-1)));
			if (i % nbOfPlayerPerPool == 0) {
				assertEquals(4, competitorsOfThePool.size());
				((LeaguesMock)this.competition).playALeague(competitorsOfThePool);
				for (Competitor competitor: competitorsOfThePool) {
					assertEquals(nbVictory, competitor.getScore());
				}
				competitorsOfThePool = new ArrayList<>();
			}
		}
		
	}

	@Test
	protected void testGoodNumberOfPlayers() {
		int nbOfPlayerPerPool = ((LeaguesMock) this.competition).nbOfPlayersPerPools;
		int nbOfAllPlayers = this.numberOfPools * nbOfPlayerPerPool;
		int cpt = 0;
		this.competition.play();
		List<List<Competitor>> pools = ((LeaguesMock) this.competition).pools;
		assertEquals(2, pools.size());
		for (List<Competitor> pool : pools) {
			assertEquals(4, pool.size());
			cpt += pool.size();
		}
		assertEquals(nbOfAllPlayers, cpt);
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
				new Leagues(competitors, numberOfPools);
			}
		});
	}

	@Test
	protected void testPlay() {
		this.competition.play();
		List<List<Competitor>> pools = ((LeaguesMock) this.competition).pools;
		assertEquals(2, pools.size());
		for (List<Competitor> pool : pools) {
			for (Competitor competitor : pool) {
				assertEquals(3, competitor.getScore());
			}
		}
		
	}

}
