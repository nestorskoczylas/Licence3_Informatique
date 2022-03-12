package competition.selections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import competition.Competitor;
import competition.Selection;
import competition.SelectionTest;
import competition.util.WrongNumberOfCompetitorsException;

public abstract class StrategyTest implements SelectionTest{

	protected Selection selection;
	protected List<List<Competitor>> pools;
	
	@BeforeEach
	public void Before() throws WrongNumberOfCompetitorsException {
		List<Competitor> pool = new ArrayList<>();
		pools = new ArrayList<>();
		Competitor c1 = new Competitor("Jean-Luc");
		Competitor c2 = new Competitor("Emmanuel");
		Competitor c3 = new Competitor("Marine");
		Competitor c4 = new Competitor("Nathalie");
		Competitor c5 = new Competitor("Patrick");
		Competitor c6 = new Competitor("Gertrude");
		Competitor c7 = new Competitor("Michel");
		Competitor c8 = new Competitor("Bérangère");
		pool.add(c1);
		pool.add(c2);
		pool.add(c3);
		pool.add(c4);
		pools.add(pool);
		pool = new ArrayList<>();
		pool.add(c5);
		pool.add(c6);
		pool.add(c7);
		pool.add(c8);
		pools.add(pool);
		selection = createSelection();
		selection.setPools(pools);
	}
	
	public abstract Selection createSelection();
	
	@Test
	public void testSelectionFilterGoodNumberOfCompetitorsPerPool() {
		for (List<Competitor> pool : pools) {
			assertTrue(pool.size()>=1);
		}
		int power2 = (int) (Math.log(pools.size()) / Math.log(2));
		assertTrue(power2 != 0);
		assertEquals(Math.pow(2, power2), pools.size());
	}
	
	@Test
	public void testSelectionFilterWrongNumberOfCompetitorsPerPool() {
		Competitor c9 = new Competitor("Eric");
		Competitor c10 = new Competitor("Ginette");
		Competitor c11 = new Competitor("Martine");
		Competitor c12 = new Competitor("Patrick");
		List<Competitor> pool3 = new ArrayList<>();
		pool3.add(c9);
		pool3.add(c10);
		pool3.add(c11);
		pool3.add(c12);
		pools.add(pool3);
		
		int power2 = (int) (Math.log(pools.size()) / Math.log(2));
		assertFalse(Math.pow(2, power2) == pools.size());
	}
	
	@Test
	public void testEquals() {
		Selection stratFalse = null;
		if (selection instanceof LastOfEachPool) {
			stratFalse = new FirstOfEachPool();
		}
		else {
			stratFalse = new LastOfEachPool();
		}
		Selection strat2False = createSelection();
		Selection stratTrue = createSelection();
		stratTrue.setPools(pools);
				
		assertTrue(selection.equals(stratTrue));
		assertFalse(selection.equals(stratFalse));
		assertFalse(selection.equals(strat2False));
	}

}
