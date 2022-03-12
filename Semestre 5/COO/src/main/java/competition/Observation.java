package competition;

public interface Observation {
	
	public abstract String matchResult();
	
	public String getName();
	
	public void endMatch(Competitor c1, Competitor c2);
}
