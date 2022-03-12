package competition.util;

/*
 * To manage the fact that the number of competitors must be even or a power of 2.
 * 
 * @author Gaelle Fret and Nestor Skoczylas
 * @version 09/10/2021
 */
public class WrongNumberOfCompetitorsException extends Exception {

	public WrongNumberOfCompetitorsException() {
		super();
	}

	public WrongNumberOfCompetitorsException(String arg0) {
		super(arg0);
	}

}
