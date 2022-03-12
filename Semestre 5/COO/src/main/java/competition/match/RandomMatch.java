package competition.match;

import java.util.Random;

import competition.Competitor;
import competition.Match;

/*
 * A random match allows to play a match between two competitors. The winner of this match is chosen randomly. 
 *
 * @author Gaelle Fret and Nestor Skoczylas
 * @version 09/10/2021
 */
public class RandomMatch extends Match{
	
	/**
	 * Builds a RandomMatch
	 */
	public RandomMatch() {}

	/***
	 * Play a match between two competitors. The winner is chosen randomly
	 * 
	 * @param c1 the first competitor
	 * @param c2 the second competitor
	 * 
	 * @return c1 if it's equals to 0, otherwise returns c2
	 */
	public Competitor play(Competitor c1, Competitor c2) {
		Random random = new Random();
		int alea = random.nextInt(2);
		return alea == 0 ? c1 : c2;
	}
}
