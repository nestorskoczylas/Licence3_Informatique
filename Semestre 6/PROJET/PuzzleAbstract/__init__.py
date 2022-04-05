import abc


class Puzzle(abc.ABC):
    """
    A Puzzle object must define a solved state, a way to "unsolve" it (shuffle), another object able to solve it,
    and a print function.
    It may be argued that the print, shuffle, and get_solver methods are only used during a demonstration, and those
    may have been encapsulated in a separate interface, but we consider a Puzzle to need these, since what good is
    a puzzle that can't be mixed, solved, nor seen?
    """

    @abc.abstractmethod
    def check_is_solved(self):
        """
        A puzzle must define a solved state, which may be the state it is at initialisation

        :return: True if the puzzle is in a solved state, false for any other state
        """
        pass

    @abc.abstractmethod
    def print_puzzle(self):
        """
        This function is used to display the puzzle in its entirety. It may use the StringsMerger's scripts if needed...
        """
        pass

    @abc.abstractmethod
    def shuffle(self, moves_max):
        """
        Modifies the state of the puzzle, ideally in a random fashion, to "unsolve" it
        :param moves_max: a limiting number to avoid mixing the puzzle too much
        :return: the number of performed movements
        """
        pass

    @abc.abstractmethod
    def get_solver(self, moves_max):
        """
        Returns a Solver object made to solve this Puzzle, limited by a maximum number of attempts
        :param moves_max: a mandatory limiting number to avoid giving the solver too many chances at solving the puzzle
        :return: a Solver object, specifically designed for this particular Puzzle
        """
        pass
