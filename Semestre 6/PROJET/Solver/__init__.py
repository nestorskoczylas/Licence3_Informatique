import abc


class Solver(abc.ABC):
    """
    A Solver takes some puzzle, and tries to solve it.
    It then stores a list of every list of successive moves, and a single list corresponding to the best one it found.
    It also stores the solved result, if it managed to solve the puzzle.
    """

    def __init__(self, puzzle, max_nb_moves):
        """
        smallest_moves is a list of shortest found way to solve the puzzle
        other_lists is a list of all the lists of other attempts at solving the puzzle (with or without success)
        result will either be the puzzle solved after doing the smallest amount of operations, or None
        :param puzzle: a puzzle to solve
        :param max_nb_moves: the max amount of moves to try and solve the puzzle
        """
        self.smallest_moves = []
        self.other_lists = []
        self.result = self.solve(puzzle, max_nb_moves)

    def solve(self, puzzle, nb_of_moves, previous_moves=None, recursion_depth=None):
        """
        Solves by backtracking and recursion a given Rubik's element like a PocketCube.

        If the puzzle is solved and the list of operations performed is the smallest so far (or is the first one),
        it returns the puzzle and sets the list of the smallest moves to solve the puzzle to the given
        previous_moves list. If it's not the smallest the far, previous_moves is merely appended to the
        other_lists of attempts.

        If it's not solved and if it's still considered to be solvable (not too much recursion depth) and if a better
        solution has not already been found (if the list of smallest_moves if smaller or equals to previous_moves), it
        generates all possible operations performable on the given puzzle, and perform them all on a different copy,
        then calls itself on each of these copy.

        The Solver will go down every single other path even when a result has been found, trying to figure out
        the very best possible list of operations to solve the puzzle.

        :param puzzle: the puzzle to be solved
        :param nb_of_moves: the maximum number of moves to be tried
        :param previous_moves: all previous moves performed up to the given puzzle's state
        :param recursion_depth: current depth of successive recursion calls
        :return: The solved puzzle if the solver succeeded, None otherwise
        """
        if not recursion_depth and not previous_moves:
            recursion_depth = 0
            previous_moves = []
        nb_previous_moves = len(previous_moves)
        nb_smallest_moves = len(self.smallest_moves)
        if puzzle.check_is_solved():
            if nb_previous_moves <= nb_smallest_moves or nb_smallest_moves == 0:
                self.smallest_moves = previous_moves
                return puzzle
            else:
                self.other_lists.append(previous_moves)
        elif recursion_depth < nb_of_moves and (nb_previous_moves <= nb_smallest_moves or nb_smallest_moves == 0):
            recursion_depth += 1
            all_moves = self.generate_all_moves(puzzle)
            for move in all_moves:
                if [move] * 2 != previous_moves[-2:] \
                        and (len(previous_moves) == 0 or move != previous_moves[-1].opposite()):
                    manipulated_puzzle = move.execute()
                    moves_copy = previous_moves[:]
                    moves_copy.append(move)
                    res_puzzle = self.solve(manipulated_puzzle, nb_of_moves, moves_copy, recursion_depth)
                    if res_puzzle:
                        return res_puzzle
            self.other_lists.append(previous_moves)
            return None
        else:
            self.other_lists.append(previous_moves)
            return None

    @abc.abstractmethod
    def generate_all_moves(self, puzzle):
        """
        Generates all the moves possible for a given puzzle's state
        :param puzzle: puzzle for which all possible operations performable must be listed
        :return: the list of all these operations
        """
        pass