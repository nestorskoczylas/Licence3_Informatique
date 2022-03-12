package competition.selections;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import competition.Competitor;
import competition.util.MapUtil;

/**
 * This selection method allows to select the first and second best competitors of each pool
 * and will then selects the two best third place finishers from any pool.
 * 
 * @author Gaëlle Fret and Skoczylas Nestor
 * @version 11. 11. 2021
 */
public class Top2InEachPoolPlus2BestThird extends Strategy{

		
	//the constructor that sets the name of the selection
	public Top2InEachPoolPlus2BestThird() {
		this.nameSelection = "Top2InEachPoolPlus2BestThird";
	}
	
	/**
	 * Allows to select the first and second best competitors of each pool
	 * and will then selects the two best third place finishers from any pool.
	 * 
	 * @return the list of selected competitors
	 */
	@Override
	public List<Competitor> selectionFilter() {
		List<Competitor> competitors = new ArrayList<>();
		List<Competitor> thirds = new ArrayList<>();
		for (List<Competitor> pool : pools) {
			competitors.add(pool.get(0));
			competitors.add(pool.get(1));
			thirds.add(pool.get(2));
			
		}
		Map<Competitor, Integer> toSort = new HashMap<>();
		for (Competitor competitor : thirds) {
			toSort.put(competitor, competitor.getScore());
		}
		toSort = MapUtil.sortByDescendingValue(toSort);
		competitors.add((Competitor) toSort.keySet().toArray()[0]);
		competitors.add((Competitor) toSort.keySet().toArray()[1]);
		return competitors;
	}
	
	/**
	 * To know if this method of Selection of the competitors can be used according to the number of pools and competitors.
	 * The number of selected competitors must be a power of 2
	 * There must be at least three competitors per pool and at least two pools
	 * 
	 * @param nbPools : the number of pools into which the competitors have been divided
	 * @param nbCompetitors : the total number of competitors, all pools included
	 * @return True if this selection method can be used, False otherwise
	 */
	public boolean canSelect(int nbPools, int nbCompetitors) {
		int nbOfSelectedCompetitors = (nbPools*2)+2;
		boolean result = nbOfSelectedCompetitors > 0 && ((nbOfSelectedCompetitors & (nbOfSelectedCompetitors-1)) == 0);
		if (nbCompetitors / nbPools < 3 || nbPools <= 1) {
			return false;
		}
		return result;
	}
	
}
