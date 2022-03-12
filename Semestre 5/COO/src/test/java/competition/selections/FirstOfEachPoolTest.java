package competition.selections;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import competition.Selection;

public class FirstOfEachPoolTest extends StrategyTest{

	@Override
	public Selection createSelection() {
		return new FirstOfEachPool();
	}

	@Test
	public void testCanSelect() {
		int nbPools = 4;
		int nbCompetitors = 8;
		assertTrue(selection.canSelect(nbPools, nbCompetitors));
		nbPools = 1;
		assertFalse(selection.canSelect(nbPools, nbCompetitors));
	}

	

}
