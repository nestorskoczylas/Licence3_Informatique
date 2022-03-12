package competition.observers;

import competition.Competitor;
import competition.Observation;

public abstract class Observer implements Observation {

	protected String name;
	
	public abstract String matchResult();
	
	public String getName() {
		return this.name;
	}
	
	public void endMatch(Competitor c1, Competitor c2) {
		
	}
}
