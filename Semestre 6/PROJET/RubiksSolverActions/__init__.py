import copy
from abc import ABC, abstractmethod


class Rotation(ABC):
    """
    RubiksSolverActions objects are to be used only by the RubiksElementSolver, since they
    clone the cube at each applied movement. Cloning the cube is
    not necessary for a Rubik's element operation, only for a backtracking
    solver algorithm (cloning after each operation allows to keep each
    succession of moves separated from each other).

    Worth noting that these Rotation objects merely copy an existing object and use their own methods, which were
    already extensively tested. Therefore, this class was not tested separately.
    """
    def __init__(self, original, index):
        """
        :param original: the original Rubik's element (e.g a RubiksCube)
        :param index: the index of the line or column at which the move is effected (from 0 to original.power-1)
        """
        self.cube = copy.deepcopy(original)
        self.index = index

    @abstractmethod
    def execute(self):
        """
        Calls the Rubik's element method corresponding to the desired operation. Does NOT affect
        the original cube.
        :return: a cloned cube on which the operation was performed.
        """
        pass

    @abstractmethod
    def opposite(self):
        """
        :return: the "opposite" RubiksSolverActions object corresponding to this one (which puts the original cube
        back to its original state)
        """
        pass

    def __repr__(self):
        """
        [20:-8] or [20:-4] removes all "rotation" and "wise" from module name
        (and removes "clock" if there is "Anti" in the module name)
        """
        return "({0}:{1})".format(self.__module__[20:-8 if self.__module__.__contains__("Anti") else -4], self.index)

    def __eq__(self, other):
        """
        A RubiksSolverActions object is identified by its class (e.g the move it does)
        and its operated line or column's index
        """
        return isinstance(other, self.__class__) and self.index == other.index

    def __hash__(self):
        return self.cube.__hash__() + self.__class__.__hash__() + self.index
