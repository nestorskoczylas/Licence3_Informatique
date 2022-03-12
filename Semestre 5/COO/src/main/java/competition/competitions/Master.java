package competition.competitions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import competition.Competition;
import competition.Competitor;
import competition.Selection;
import competition.util.MapUtil;
import competition.util.WrongNumberOfCompetitorsException;

/**
* A Master is played in two phases.
* The first phase starts with a pools phase. Each pool plays a League. At the end of which some competitors are selected.
* The second phase consists of having the competitors play at a tournament.
*
* @author Gaelle Fret and Nestor Skoczylas
* @version 11. 11. 2021
*/
public class Master extends Competition{
	
	//The Leagues for the first phase
	private Leagues leagues;
	//The number of pools for the first phase
	private int nbOfPools;
	//The method of selection of competitors for the second phase
	private Selection selection;
	
	/**
	* Create a master of multiple competitors
	*
	* @param competitors: the list of all competitors participating in the master
	* @param nbOfPools: the number of pools for the first phase
	* @param selection: the selection of competitors for the second phase
	*
	* @throws WrongNumberOfCompetitorsException if the number of players does not meet the requirements of a League 
	* or if the number of competitors is not divisible by the number of pools.
	*/
	public Master(List<Competitor> competitors, int nbOfPools, Selection selection) throws WrongNumberOfCompetitorsException {
		super(competitors);
		this.nbOfPools = nbOfPools;
		this.selection = selection;
		this.nameCompetition = "Master";
		leagues = new Leagues(competitors, this.nbOfPools);
		if ((competitors.size() % nbOfPools != 0) || competitors.size() == nbOfPools) {
			throw new WrongNumberOfCompetitorsException("The number of competitors must be divisible by the number of pools and there must more than one player per pool.");
		}
	}

	/**
	* Allows to play a master in two phases:
	* - first phase : we play a Leagues
	* - we select the winners of each pool
	* - second phase : we play a Tournament
	*
	* @param competitors: list of all competitors
	*/
	protected void play(List<Competitor> competitors) {
		System.out.println("***First phase***\n");
		leagues.play();
		this.selection.setPools(sortAllPools());
		List<Competitor> lastPool =  this.selection.selectionFilter();
			
		try {
			System.out.println("***Finals***\n");
			Tournament tournament = new Tournament(lastPool);
			tournament.play();
		} catch (WrongNumberOfCompetitorsException e) {
			System.out.println("FATAL ERROR");
			System.exit(0);
		}
	}

	/**
	* Allows to classify in each pool the competitors by decreasing points
	*
	* @return the list of pools in which competitors are ranked according to their number of points
	*/
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
