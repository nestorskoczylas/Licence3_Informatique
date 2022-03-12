package competition.competitions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

import competition.Competition;
import competition.CompetitionTest;
import competition.Competitor;
import competition.Selection;
import competition.competitions.LeaguesTest.LeaguesMock;
import competition.competitions.TournamentTest.TournamentMock;
import competition.util.MapUtil;
import competition.util.WrongNumberOfCompetitorsException;

public class MasterTest extends CompetitionTest{
	
	public static class MasterMock extends CompetitionMock {
		
		private LeaguesMock leagues;
		private Selection selection;
		public int marker = 0;
		
		public MasterMock(List<Competitor> competitors, int nbOfPools, Selection selection) throws WrongNumberOfCompetitorsException {
			super(competitors);
			leagues = new LeaguesMock(competitors, nbOfPools);
			this.selection = selection;
		}

		@Override
		protected void play(List<Competitor> competitors) {
			System.out.println("***First phase***\n");
			leagues.play();
			this.selection.setPools(sortAllPools());
			List<Competitor> lastPool =  this.selection.selectionFilter();
			
			try {
				System.out.println("***Finals***\n");
				TournamentMock tournament = new TournamentMock(lastPool);
				tournament.play();
				marker++;
			} catch (WrongNumberOfCompetitorsException e) {System.out.println(e);}
		}
		
		private List<List<Competitor>> sortAllPools() {
			List<List<Competitor>> poolsUnsorted = leagues.getPools();
			List<List<Competitor>> poolsSorted = new ArrayList<>();
			
			for (List<Competitor> pool : poolsUnsorted) {
				Map<Competitor, Integer> toSort = new HashMap<>();
				for (Competitor competitor : pool) {
					toSort.put(competitor, competitor.getScore());
				}
				toSort = MapUtil.sortByDescendingValue(toSort);
				List<Competitor> newList = new ArrayList<>(toSort.keySet());
				poolsSorted.add(new ArrayList<>(newList));
			}
			return poolsSorted;
		}
		
	}

	protected Competition createCompetition() throws WrongNumberOfCompetitorsException {
		return new MasterMock(competitors, numberOfPools, selection);
	}

	@Test
	protected void testPlay() {
		this.competition.play();
		assertEquals(1, ((MasterMock)this.competition).marker);
		
		/* In the play method of Master we only reuse already tested classes: League, Leagues and Tournament.
		 * The only thing left to test is the execution of the play() commands. For that we increment a marker after our commands.
		 */
	}

	@Test
	protected void testGoodNumberOfPlayers() {
		assertTrue(competitors.size()%numberOfPools==0);
	}

	@Test
	protected void testWrongNumberOfPlayers() {
		competitors.remove(0);
		assertFalse(competitors.size()%numberOfPools==0);
	}

}
