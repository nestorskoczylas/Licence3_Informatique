package competition;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import competition.competitions.League;
import competition.competitions.Master;
import competition.competitions.Tournament;
import competition.selections.FirstOfEachPool;
import competition.selections.LastOfEachPool;
import competition.selections.Top2InEachPoolPlus2BestThird;
import competition.util.WrongNumberOfCompetitorsException;
/*
 * The main allows to launch a competition (league or tournament) composed of random matches. 
 * You have to choose a number of competitors (correct) and their names to start a game.
 */
public class CompetitionMain {
    
	//To read the user's input
	private static Scanner scn;
	
	/**
	 * Asks the user to enter a positive integer in the console. 
	 * If another object is entered, it is repeated.
	 * 
	 * @return the positive number entered by the user 
	 */
	private static Integer nextInt() {
		String scan = scn.next();
		if (scan.charAt(0) == '-') {
			System.out.println("You must enter a positive number. Please try again :");
			return nextInt();
		}
		try {
			return Integer.parseInt(scan);
		} catch (Exception e) {
			System.out.println("You must enter a positive number. Please try again :");
			return nextInt();
		}
	}
	
	/**
	 * Request a name for each competitor.
	 * 
	 * @param numberOfPlayers : the number of all the competitors
	 * @param competitors : the list of the competitors
	 */
	private static void competitorsName(int numberOfPlayers, List<Competitor>competitors){
		for (int i = 0; i < numberOfPlayers; i++) {
			System.out.println("Please enter your competitor’s name : ");
			String nameCompetitor = scn.next();
			competitors.add(new Competitor(nameCompetitor));
		}
	}
	
	/*
	 * Allows you to choose if you want to play a League, a Tournament or a Master through an input. 
	 * The corresponding game is launched.
	 * 
	 * @param args the arguments that the user could put
	 * 
	 * @throws Exception if the input is not correct
	 */
	public static void main(String[] args) throws Exception{
		System.out.println("Welcome to this sporting competition !");
		System.out.println("To play a league, enter 1");
		System.out.println("To play a tournament, enter 2");
		System.out.println("To play a master, enter 3");
		
		scn = new Scanner(System.in);
		int choiceCompetition = nextInt();
		while (choiceCompetition!=1 && choiceCompetition!=2 && choiceCompetition!=3) {
			System.out.println("You must write '1', '2' or '3' depending on the competition you want to play. Please try again :)");
			choiceCompetition = nextInt();
		}
		switch(choiceCompetition) {
			case 1 :
				runLeague();
				break;
			case 2 :
				runTournament();
				break;	
			case 3 :
				runMaster();
				break;
			default :
				System.out.println("Something goes wrong.");
				break;
		}
	}
	
	/*
	 *Allows you to play a League. 
	 *The user must enter a number of competitors and their names.
	 *
	 *@throws WrongNumberOfCompetitorsException if the number of competitors is null
	 */
	public static void runLeague() throws WrongNumberOfCompetitorsException{
		System.out.println("Here we go!! You have chosen the league mode");
		System.out.println("How many competitors do you want?");
		
		int numberOfPlayers = nextInt();
		try {
			List<Competitor> competitorLeague = new ArrayList<Competitor>();
			
			competitorsName(numberOfPlayers, competitorLeague);
			
			League l1 = new League(competitorLeague);
			
			System.out.println("");
			System.out.println("|++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|");
			System.out.println("|******************************** League ********************************|");
			System.out.println("|++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|");
			System.out.println("");
			
			l1.play();
		} catch (WrongNumberOfCompetitorsException e) {
			System.out.println(e);
			CompetitionMain.runLeague();
		}
		
	}
	
	/*
	 * Allows you to play a Tournament. 
	 * The user must enter a number of competitors that is a power of 2 and their names.
	 * 
	 * @throws WrongNumberOfCompetitorsException if the number of competitors is is lower or equal to 1 or not a power of two
	 */
	public static void runTournament() throws WrongNumberOfCompetitorsException{
		System.out.println("Here we go!! You have chosen the tournament mode");
		System.out.println("How many competitors do you want ?");
		
		int numberOfPlayers = nextInt();
		try {
			List<Competitor> competitorTournament = new ArrayList<Competitor>();
			
			competitorsName(numberOfPlayers, competitorTournament);
			
			Tournament t1 = new Tournament(competitorTournament);
			System.out.println("|++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|");
			System.out.println("|****************************** Tournament ******************************|");
			System.out.println("|++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|");
			System.out.println("");
			
			t1.play();
		} catch (WrongNumberOfCompetitorsException e) {
			System.out.println(e);
			CompetitionMain.runTournament();
		}
	}
	
	/**
	 * Allows you to play a Master. 
	 * The user must enter a number of competitors, their names, a number of pools, the kind of selection wanted to select the competitors for the Tournament.
	 * 
	 * @throws WrongNumberOfCompetitorsException : The number of competitors must be greater than 1. 
	 * The number of pools chosen must allow for at least two competitors in each pool. 
	 * The number of competitors must be divisible by the number of pools.
	 */
	public static void runMaster() throws WrongNumberOfCompetitorsException{
		System.out.println("Here we go!! You have chosen the master mode");
		System.out.println("How many competitors do you want ?");
		
		int numberOfPlayers = nextInt();
		
		try {
			List<Competitor> competitorMaster = new ArrayList<Competitor>();
			
			competitorsName(numberOfPlayers, competitorMaster);
			
			System.out.println("For the first phase, how many pools do you want to divide the players into ?");
			int numberOfPools = nextInt();
			
			while((numberOfPlayers % numberOfPools != 0) || (numberOfPlayers == numberOfPools) || (numberOfPools<=1)) {
				System.out.println("The number of competitors must be divisible by the number of pools. There must be more than one player per pool and more than one pool. Please try again.");
				System.out.println("If you want to choose a new number of competitors, please write '0'.");
				numberOfPools = nextInt();
				if (numberOfPools==0) {
					runMaster();
				}
			}
			
			System.out.println("How do you want to select the competitors who will participate in the finals ?");		
			System.out.println("To select the first competitor of each pool : enter 1");
			System.out.println("To select the first 2 of each pool plus the best 2 third place finishers, all pools combined : enter 2");
			System.out.println("To select the last competitor of each pool : enter 3");
			int choiceSelection = nextInt();
			while (choiceSelection!=1 && choiceSelection!=2 && choiceSelection!=3) {
				System.out.println("You must write '1', '2' or '3' depending on the selection you want to use. Please try again :)");
				choiceSelection = nextInt();
			}
			
			boolean tmp = false;
			Master m1 = null;
			Selection selection = null;
			
			while(tmp==false) {
				switch(choiceSelection) {
				case 1 :
					selection = new FirstOfEachPool();
					if (selection.canSelect(numberOfPools, numberOfPlayers)) {
						m1 = new Master(competitorMaster, numberOfPools, selection);
						tmp = true;
					} else {
						System.out.println("You cannot use this selection method for the number of competitors and pools chosen. Please enter a new one.");
						choiceSelection = nextInt();
					}
					break;
				case 2 :
					selection = new Top2InEachPoolPlus2BestThird();
					if (selection.canSelect(numberOfPools, numberOfPlayers)) {
						m1 = new Master(competitorMaster, numberOfPools, selection);
						tmp = true;
					} else {
						System.out.println("You cannot use this selection method for the number of competitors and pools chosen. Please enter a new one.");
						choiceSelection = nextInt();
					}
					break;
				case 3 :
					selection = new LastOfEachPool();
					if (selection.canSelect(numberOfPools, numberOfPlayers)) {
						m1 = new Master(competitorMaster, numberOfPools, selection);
						tmp = true;
					} else {
						System.out.println("You cannot use this selection method for the number of competitors and pools chosen. Please enter a new one.");
						choiceSelection = nextInt();
					}
					break;
				default :
					System.out.println("Something goes wrong.");
					System.exit(0);
				}
			}
			
			System.out.println("|++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|");
			System.out.println("|****************************** Master **********************************|");
			System.out.println("|++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|");
			System.out.println("");
			
			m1.play();
			
		} catch (WrongNumberOfCompetitorsException e) {
			System.out.println("For the first phase, the number of competitors must be divisible by the number of pools chosen. Pools must contain at least two competitors.\nFor the finals, the number of competitors must be a power of 2.");
			CompetitionMain.runMaster();
		}
	}
}
