package competition;

/**
 * A competitor is a person who participates in matches in order to win a competition.
 * A competitor is defined by a name and a score (initialized to zero at the beginning of the game).
 * 
 * @author Gaelle Fret and Nestor Skoczylas
 * @version 09/10/2021
 */
public class Competitor {
	
	//The name of the competitor
	private String name;
	//The competitor's number of points
	private int score;
	
	/**
	 * Builds a Competitor of given name
	 *
	 * @param name of this competitor
	 */
	public Competitor (String name) {
		this.name = name;
		this.score = 0;
	}
	
	/**
	 * To get the competitor's name
	 *
	 * @return the competitor's name
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * To get the score for this competitor
	 *
	 * @return the score for this competitor
	 */
	public int getScore() {
		return this.score;
	}

	/**
	 * Adds a score to this competitor
	 *
	 * @param score to be add
	 */
	public void addScore(int score) {
		this.score += score;
	}
	
	/**
	 * Indicates whether an other object is equal to this one
	 * 
	 * @param obj : the reference object with which to compare
	 * 
	 * @return true if this object is the same as the obj argument; false otherwise
	 */
	public boolean equals(Object obj) {
		if (obj instanceof Competitor) {
			Competitor theOther = ((Competitor) obj);
			return this.name.equals(theOther.name) && this.score == theOther.score;
		} else {
			return false;
		}
	}
	
	/**
	 * Returns a string that represents this object
	 *  
	 * @return the name of the competitor
	 */
	public String toString() {
		return "[" + this.getName() + "]";
	}

}
