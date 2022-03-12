package competition.competitions;

import java.util.ArrayList;
import java.util.List;

import competition.Competition;
import competition.Competitor;
import competition.util.WrongNumberOfCompetitorsException;

/**
* When competitors are divided into different pools, a Leagues allows each pool to play a League
*
* @author Gaelle Fret and Nestor Skoczylas
* @version 11. 11. 2021
*/
public class Leagues extends Competition{
	
	//The number of players per pool
	private int nbOfPlayersPerPool;
	//The list of all the competitors divided into pools
	private List<List<Competitor>> pools;

	/**
	* Create a Leagues
	*
	* @param competitors: the list of all competitors participating in the Leagues
	* @param numberOfPools: the number of pools
	*
	* @throws WrongNumberOfCompetitorsException if the number of players is less than or equal to one
	*/
	public Leagues(List<Competitor> competitors, int numberOfPools) throws WrongNumberOfCompetitorsException {
		super(competitors);
		this.nbOfPlayersPerPool = competitors.size()/numberOfPools;
		this.pools = new ArrayList<>();
		this.nameCompetition = "Leagues";
		if (this.nbOfPlayersPerPool <= 1) throw new WrongNumberOfCompetitorsException(); 
	}
	
	/**
	* To get the list of all the competitors divided into pools
	*
	* @return the list of all the competitors divided into pools
	*/
	public List<List<Competitor>> getPools(){
		return this.pools;
	}
	
	/**
	* To get the number of competitors per pool
	*
	* @return the number of competitors per pool
	*/
	public int getNbOfPlayersPerPool(){
		return this.nbOfPlayersPerPool;
	}
	
	/**
	 * Allows each pool of competitors to play a League
	 * 
	 * @param competitors : the list of all the competitors
	 */
	protected void play(List<Competitor> competitors){
		List<Competitor> competitorsOfThePool = new ArrayList<>();
		for (int i=1; i<=competitors.size(); i++) {
			competitorsOfThePool.add(competitors.get((i-1)));
			if (i % this.nbOfPlayersPerPool == 0) {
				try{
					this.playALeague(competitorsOfThePool);
					competitorsOfThePool = new ArrayList<>();
				} catch (Exception e) {System.out.println(e);}
			}
		}
	}
	
	/**
	 * Allows a league to be played by a pool of competitors
	 * 
	 * @param competitorsOfThePool : list of the competitors of the pool
	 */
	private void playALeague(List<Competitor> competitorsOfThePool)
			throws WrongNumberOfCompetitorsException {
		League league = new League(competitorsOfThePool);
		league.play();
		this.pools.add(competitorsOfThePool);
	}
}
