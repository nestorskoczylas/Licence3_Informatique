package competition.selections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.util.List;
import org.junit.jupiter.api.Test;
import competition.Competitor;
import competition.Selection;
 
public class Top2InEachPoolPlus2BestThirdTest extends StrategyTest {

	@Test
	public void testSelectionFilterGoodNumberOfCompetitorsPerPool() {
		for (List<Competitor> pool : pools) {
			assertTrue(pool.size()>2);
		}
		int power2 = (int) (Math.log(pools.size()) / Math.log(2));
		assertTrue(power2 != 0);
		assertEquals(Math.pow(2, power2), pools.size());
	}

	@Test
	public void testCanSelect() {
		int nbPools = 3;
		int nbCompetitors = 24;
		assertTrue(selection.canSelect(nbPools, nbCompetitors));
		nbPools = 1;
		assertFalse(selection.canSelect(nbPools, nbCompetitors));
	}

	@Override
	public Selection createSelection() {
		return new Top2InEachPoolPlus2BestThird();
	}
}
