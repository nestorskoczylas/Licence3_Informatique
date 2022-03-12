package competition;

import java.util.List;

/**
 * A Selection allows to select competitors in each pool of a pool list.
 * 
 * @author Gaëlle Fret and Skoczylas Nestor
 * @version 11. 11. 2021
 */
public interface Selection {
	
	/** 
	 * To get the name of the Selection
	 * 
	 * @return the name of the Selection
	 */
	public String getNameSelection();
	
	/** 
	 * To get the list of all the competitors divided into pools
	 * 
	 * @return the list of all the competitors divided into pools
	 */
	public List<List<Competitor>> getPools();
	
	/**
	 * Allows you to modify the list of competitors divided into pools
	 * @param pools : the list of competitors divided into pools
	 */
	public void setPools(List<List<Competitor>> pools);
	
	/**
	 * Allows to select the competitor(s) in the different pools
	 * 
	 * @return the list of selected competitors
	 */
	public abstract List<Competitor> selectionFilter();
	
	/**
	 * To know if this method of Selection of the competitors can be used according to the number of pools.
	 * The number of pools must be even and there must be at least two pools.
	 * 
	 * @param nbPools : the number of pools into which the competitors have been divided
	 * @param nbCompetitors : the total number of competitors, all pools included
	 * @return True if this selection method can be used, False otherwise
	 */
	public boolean canSelect(int nbPools, int nbCompetitors);
	
	/**
	 * To know if an object is equal to the Selection
	 * 
	 * @param o : the object to be tested
	 * @return True if the object and the Selection are equal, False otherwise
	 */
	public boolean equals(Object o);
	
}
