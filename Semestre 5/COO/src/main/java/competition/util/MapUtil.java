package competition.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/*
 * Used to sort a map by descending value
 */

public class MapUtil {
	
	/*To sort an object Map by descending value
	 * 
	 * @param map the map to sort
	 * 
	 * @return the same map sorted by descending value
	 */
	public static <K, V extends Comparable<? super V >> Map <K, V> sortByDescendingValue(Map<K, V>map) {
		
		List<Entry<K, V>> sortedEntries = new ArrayList<Entry<K, V>>(map.entrySet());
		
		Collections.sort(sortedEntries, new Comparator<Entry<K, V>>() {
			
			@Override
			public int compare(Entry<K, V> e1, Entry<K, V> e2) {
					return e2.getValue().compareTo(e1.getValue());
			}
		
		});
		
		Map<K, V> result = new LinkedHashMap<>();
		
		for (Entry<K, V> entry : sortedEntries ) {
		result.put(entry.getKey(), entry.getValue());
		}
		
		return result;
	}
}
