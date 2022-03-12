package competition.observers;

import java.util.HashMap;
import java.util.Map;

import competition.Competitor;

public class Bookmaker extends Observer {
	
	private Map<Competitor, Integer> quotes;
	
	public Bookmaker() {
		this.quotes = new HashMap<>();
	}
	
	public void evolutionQuotes(Competitor c) {
	}
	
	public String matchResult() {
		return null;
	}


}
