package competition;

/**
 * A match is played between two competitors at the end of which the winner will receive a point.
 * It defines two competitors, passed as parameter of the constructor.
 * 
 * @author Gaelle Fret and Nestor Skoczylas
 * @version 09/10/2021
 */
public abstract class Match {
	
	protected String name;
	
	/**
	 * Builds a Match between two Competitors
	 * 
	 * @param c1 the first competitor
	 * @param c2 the second competitor
	 * @return the winner competitor
	 */
	public abstract Competitor play(Competitor c1, Competitor c2);

	/**
	 * Indicates whether an other object is equal to this one
	 * 
	 * @param obj : the reference object with which to compare
	 * 
	 * @return true if this object is the same as the obj argument; false otherwise
	 */
	public boolean equals(Object obj) {
		if (obj instanceof Match) {
			Match theOther = ((Match) obj);
			return name.equals(theOther.name);
		} else {
			return false;
		}
	}
}
