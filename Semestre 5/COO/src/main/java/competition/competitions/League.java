package competition.competitions;

import java.util.List;
import competition.Competition;
import competition.Competitor;
import competition.util.WrongNumberOfCompetitorsException;

/**
 * A championship is played in two-legged matches. Each competitor meets twice each other competitor. 
 * At the end of the championship, the winner is the competitor having the greatest number of victories.
 * 
 * @author Gaelle Fret and Nestor Skoczylas
 * @version 09/10/2021
 */
public class League extends Competition{

	/**
	 * Create a League of multiple competitors
	 * 
	 * @param competitors : the list of all the competitors participating to the league
	 * 
	 * @throws WrongNumberOfCompetitorsException if the number of players is less than or equal to one
	 */
	public League(List<Competitor> competitors) throws WrongNumberOfCompetitorsException {
		super(competitors);
		if (competitors.size() <= 1) throw new WrongNumberOfCompetitorsException("The number of competitors must be greater than 1. Please try again :)");
		this.nameCompetition = "League";
	}
	
	/**
	 * Play method allows you to play the League Competition between
	 * a list of several competitors : it plays all the two-legged matches between the competitors.
	 * 
	 * @param competitors : list of all the competitors
	 */
	protected void play(List<Competitor> competitors) {
		for (Competitor c1 : competitors) {
			for (Competitor c2 : competitors) {
				if (!c1.equals(c2)) {this.playMatch(c1,c2);}
			}
		}
	}
	
}
