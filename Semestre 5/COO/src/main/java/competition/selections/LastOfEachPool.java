package competition.selections;

import java.util.ArrayList;
import java.util.List;

import competition.Competitor;

/**
 * This selection method allows to select the competitor with the least points in each pool.
 * 
 * @author Gaëlle Fret and Skoczylas Nestor
 * @version 11. 11. 2021
 */
public class LastOfEachPool extends Strategy{
	
	//the constructor that sets the name of the selection
	public LastOfEachPool() {
		this.nameSelection = "lastOfEachPool";
	}
	
	/**
	 * Allows to select the competitor with the least points in each pool
	 * 
	 * @return the list in which the worst competitor (the one with the least points) of each pool is found
	 */
	public List<Competitor> selectionFilter() {
		List<Competitor> competitors = new ArrayList<>();
		for (List<Competitor> pool : pools) {
			competitors.add(pool.get(pool.size()-1));
		}
		return competitors;
	}
	
	public boolean canSelect(int nbPools, int nbCompetitors) {
		int power2 = (int) (Math.log(nbPools) / Math.log(2));
		if (Math.pow(2, power2) != nbPools || nbPools<2) {
			return false;
		}
		return true;
	}
	


}
