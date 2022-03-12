package competition.selections;

import java.util.ArrayList;
import java.util.List;

import competition.Competitor;

/**
 * This selection method allows to select the competitor with the most points in each pool.
 * 
 * @author Gaëlle Fret and Skoczylas Nestor
 * @version 11. 11. 2021
 */
public class FirstOfEachPool extends Strategy {
	
	//the constructor that sets the name of the selection
	public FirstOfEachPool() {
		this.nameSelection = "firstOfEachPool";
	}
	
	/**
	 * Allows to select the competitor with the most points in each pool
	 * 
	 * @return the list in which the best competitor (the one with the most points) of each pool is found
	 */
	@Override
	public List<Competitor> selectionFilter() {
		List<Competitor> competitors = new ArrayList<>();
		for (List<Competitor> pool : pools) {
			competitors.add(pool.get(0));
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
