import sys
import time

from DisplayUtils import StringsMerger
from PuzzleAbstract.PocketCube import PocketCube
from PuzzleAbstract.RubiksCube import RubiksCube


class Demo:
    """
    This Demo class can be used to demonstrate any kind of Puzzle implementation : displaying it at creation,
    displaying it after shuffling it, feeding it to its specific Solver, and displaying the result after the
    solver tried to solve it. It needs a string argument to determine what kind of puzzle must be instanced, which
    means such detection of the string must be implemented in the __init_parameters method, and the puzzle must
    implement and inherit the Puzzle interface.
    """
    def __init__(self, settings, shuffle_strength):
        """
        A Demo is initialized with a string 'settings' as the name of your puzzle, and a 'shuffle strength' which
        determines how much the puzzle will be operated during shuffling before solving it.
        We already implemented 'pocket cube' to initialize, shuffle and solve a pocket cube, and 'rubiks cube'

        :param settings: you may enter 'rubiks cube' or 'pocket cube'
        :param shuffle_strength: we suggest you enter a number between 1 and 3 included
        """
        self.shuffle_strength = shuffle_strength
        self.__init_parameters(settings)

    def __init_parameters(self, settings):
        """
        Determines if the given settings are implemented, and if so, sets the relevant self.puzzle attribute
        :param settings: the string corresponding to the desired puzzle
        """
        puzzle = None
        if settings == 'pocket cube':
            puzzle = PocketCube()
        elif settings == 'rubiks cube':
            puzzle = RubiksCube()
        else:
            print("You may implement any other puzzle...")
            return
        self.puzzle = puzzle


def main(puzzle_name='rubiks cube', shuffle_strength=2):
    """
    In this main, a Rubik's Abstract is first initialized (we suggest a small PocketCube).
    Then this cube is shuffled and fed to a Solver.

    If the Solver manages to solve it, it will stock the solved cube in his result attribute.
    The number of moves performed to shuffle the cube may be changed at line moves = cube.shuffle(value), but
    we suggest not going higher than 3 for decently fast results.
    The time the Solver took to solve the puzzle (or tried solving it) is measured.
    Finally, the number of attempts made is displayed along with the number of moved it took to solve the puzzle,
    if the Solver succeeded. The measured time is also displayed.

    At every step (initialization, shuffling, solved if relevant), the puzzle is displayed in the console

    :param shuffle_strength: a factor determining how much the puzzle will be shuffled. For a RubiksElement,
                        the number of manipulations performed will be twice this value.
    :param puzzle_name: a string you may choose to implement in the Demo class to select which puzzle will be solved.
                        We already implemented selection for 'pocket cube' and 'rubiks cube'.
    """
    demo = Demo(puzzle_name, shuffle_strength)

    puzzle = demo.puzzle
    shuffle_strength = demo.shuffle_strength

    print("Initial, solved {0} state :\n".format(puzzle.__class__.__name__))
    puzzle.print_puzzle()

    nb_of_moves = puzzle.shuffle(shuffle_strength)

    print("\nShuffled...")
    puzzle.print_puzzle()

    print("\nTrying to solve...")
    start = time.time()

    # Feeding the puzzle to the Solver
    solver = puzzle.get_solver(nb_of_moves)

    resulting_puzzle = solver.result
    end = time.time()

    if resulting_puzzle:
        print("After solve attempt:\n")
        resulting_puzzle.print_puzzle()

        print("\nShortest list of moves allowing to solve the puzzle (in that order):")
        print(StringsMerger.string_from_list_of_elements(solver.smallest_moves, 4))

        state_str = "Solved" if resulting_puzzle.check_is_solved() else "Failure"

        print("\n{0}, in {1} moves, shuffled by {2} rotations.".format(state_str,
                                                                       len(solver.smallest_moves), nb_of_moves))

        other_attempts = sum([len(list_of_moves) for list_of_moves in solver.other_lists])
        print("\nMade {0} other attempts, average {1} moves per attempt, total of {2} moves.".
              format(len(solver.other_lists), int(other_attempts / len(solver.other_lists)), other_attempts))

        time_solve = end - start
        print("\nTime of execution: {0}s".format(time_solve.__round__(3)))

    else:
        print("Couldn't solve this puzzle. It was either given in an unsolvable state, or needs too many moves to "
              "allow solving by backtracking. You may try with a larger number of allowed moves...")


if __name__ == "__main__":
    if len(sys.argv) == 1:
        main()
    elif len(sys.argv) == 2:
        main(sys.argv[1])
    elif len(sys.argv) == 3:
        main(sys.argv[1], int(sys.argv[2]))
    else:
        print(len(sys.argv), 'Example input >>python3 ./SolvingDemo "pocket cube" 2')
