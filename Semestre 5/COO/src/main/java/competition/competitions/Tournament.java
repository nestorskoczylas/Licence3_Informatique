package competition.competitions;

import java.util.ArrayList;
import java.util.List;

import competition.Competition;
import competition.Competitor;
import competition.util.WrongNumberOfCompetitorsException;

/*
 * A tournament is a single elimination game. This means that in each match, only the winner can continue to participate in the tournament 
 * until only one competitor remains. This competitor is then designated the winner of the tournament.
 * 
 * @author Gaelle Fret and Nestor Skoczylas
 * @version 09/10/2021
 */
public class Tournament extends Competition{
	
	// The list of winners after each round of the tournament
	private List<Competitor> roundWinners;
	
	/*
	 * the constructor of the tournament
	 * 
	 * @param competitor : the list of competitors participating in the tournament
	 * 
	 * @throws WrongNumberOfCompetitorsException if the number of players is is lower or equal to 1 or not a power of two
	 */
	public Tournament(List<Competitor> competitors) throws WrongNumberOfCompetitorsException {
		super(competitors);
		int power2 = (int) (Math.log(competitors.size()) / Math.log(2));
		if (Math.pow(2, power2) != competitors.size() || competitors.size() <= 1) {
			throw new WrongNumberOfCompetitorsException("The number of competitors must be a power of 2. Please try again :)");
		}
		this.roundWinners = new ArrayList<>();
		this.nameCompetition = "Tournament";
	}

	/*
	 * Play all the rounds between the different competitors until one competitor remains
	 * 
	 * @param competitors : the list of the competitors participating in the tournament
	 */
	@Override
	protected void play(List<Competitor> competitors) {
		List<Competitor> competitorsBis = competitors;
		while (competitorsBis.size() != 1) {
			competitorsBis = this.playRound(competitorsBis);
			roundWinners = new ArrayList<>();
		}
	}
	
	/*
	 * Play a round of matches between the competitors and eliminates the losers
	 * 
	 * @param competitors : the list of the competitors participating in the tournament
	 * 
	 * @return the round's winners in a list
	 */
	private List<Competitor> playRound(List<Competitor> competitorsBis) {
		for (int i = 0; i < competitorsBis.size() - 1; i += 2) {
			this.playMatch(competitorsBis.get(i), competitorsBis.get(i + 1));
			Competitor winner = competitorsBis.get(i).getScore() > competitorsBis.get(i+1).getScore() ? competitorsBis.get(i) : competitorsBis.get(i+1);
			roundWinners.add(winner);
		}
		return roundWinners;		
	}

}
