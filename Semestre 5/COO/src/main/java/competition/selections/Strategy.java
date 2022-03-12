package competition.selections;

import java.util.ArrayList;
import java.util.List;

import competition.Competitor;
import competition.Selection;

public abstract class Strategy implements Selection{
	
	//The list of all the competitors divided into pools
	protected List<List<Competitor>> pools = new ArrayList<>();
	//The name of the Selection
	protected String nameSelection;

	/** 
	 * To get the name of the Selection
	 * 
	 * @return the name of the Selection
	 */
	@Override
	public String getNameSelection() {
		return this.nameSelection;
	}
	
	/** 
	 * To get the list of all the competitors divided into pools
	 * 
	 * @return the list of all the competitors divided into pools
	 */
	@Override
	public List<List<Competitor>> getPools() {
		return this.pools;
	}

	/**
	 * Allows you to modify the list of competitors divided into pools
	 * 
	 * @param pools : the list of competitors divided into pools
	 */
	@Override
	public void setPools(List<List<Competitor>> pools) {
		this.pools = pools;		
	}
	
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
	public abstract boolean canSelect(int nbPools, int nbCompetitors);
	
	/**
	 * To know if an object is equal to the Selection
	 * 
	 * @param obj : the object to be tested
	 * @return True if the object and the Selection are equal, False otherwise
	 */
	public boolean equals(Object obj) {
		if (obj instanceof Strategy) {
			Strategy theOther = (Strategy) obj;
			return this.nameSelection.equals(theOther.getNameSelection()) && this.getPools().equals(theOther.getPools());
		} else {
			return false;
		}
	}
	
}
