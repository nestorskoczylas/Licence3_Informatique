package competition;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import competition.competitions.League;
import competition.match.RandomMatch;
import competition.util.MapUtil;

/**
 * A competition is a series of matches between different players at the end of which there is a winner.
 * A competition is defined by a list of Competitor.
 * 
 * @author Gaelle Fret and Nestor Skoczylas
 * @version 09/10/2021
 */
public abstract class Competition {
	
	//The name of the competition
	protected String nameCompetition;
	//The list of all the competitors participating at the competition
	protected final List<Competitor> competitors;
	//The type of match chosen to play the competition
	private Match match;

	/**
	 * Builds a Competition with a list of competitors
	 * 
	 * @param competitors is the list of the competitors
	 */
	public Competition(List<Competitor> competitors){
		this.competitors = competitors;
		this.match = new RandomMatch();
	}
	
	/**
	 * Calls the method that makes the competitors' matches play. 
	 * Then it calls the method that allows to rank the competitors in order to display them
	 */
	public void play() {
		this.play(competitors);
		Map<Competitor,Integer> ranks = this.ranking();
		System.out.println("\n*** Ranking ***\n");
		for (Map.Entry<Competitor, Integer> entry : ranks.entrySet()) {
			System.out.println(entry.getKey().getName() + " - " + entry.getValue() + "\n");
		}
	}
	
	/**
	 * Plays matches between two competitors, depending on the type of match chosen
	 * 
	 * @param c1 the first competitor
	 * @param c2 the second competitor
	 */
	protected void playMatch(Competitor c1, Competitor c2) {
		System.out.print(c1.getName() + " vs "+ c2.getName());
		Competitor winner = this.match.play(c1, c2);
		winner.addScore(1);
		System.out.println(" --> " + winner.getName() + " wins!");
	}
	
	/**
	 * Play the matches of all competitors according to the rules of the competition
	 * 
	 * @param competitors is a list of competitors
	 */
	protected abstract void play(List<Competitor> competitors);
	
	/**
	 * Returns the names of the competitors and their number of points, sorted in descending order
	 * 
	 * @return the names of the competitors and their number of points
	 */
	public Map<Competitor,Integer> ranking() {
		Map<Competitor, Integer> toSort = new HashMap<>();
		for (Competitor competitor : this.competitors) {
			toSort.put(competitor, competitor.getScore());
		}
		return MapUtil.sortByDescendingValue(toSort);
	}

	/**
	 * To get the competition's name
	 *
	 * @return the competition's name
	 */
	public String getName() {
		return this.nameCompetition;
	}
	
	/**
	 * To get the list of all the competitors
	 *
	 * @return the list of the competitors
	 */
	public List<Competitor> getCompetitors() {
		return this.competitors;
	}
	
	/**
	 * To get the match
	 *
	 * @return the match
	 */
	public Match getMatch() {
		return this.match;
	}
	
	/**
	 * Indicates whether an other object is equal to this one
	 * 
	 * @param obj : the reference object with which to compare
	 * 
	 * @return true if this object is the same as the obj argument; false otherwise
	 */
	public boolean equals(Object obj) {
		if (obj instanceof League) {
			Competition theOther = (League) obj;
			return this.nameCompetition.equals(theOther.getName()) && this.getCompetitors().equals(theOther.getCompetitors());
		} else {
			return false;
		}
	}
	
}
