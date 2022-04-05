from abc import ABC

from RubiksSolverActions import Rotation
from RubiksSolverActions import RotationVerticalClockwise


class RotationVerticalAntiClockwise(Rotation, ABC):
    """
    This Rotation uses the vertical_rotation_anti_clockwise from the RubiksAbstract class.
    """
    def __init__(self, cube, column):
        Rotation.__init__(self, cube, column)

    def execute(self):
        i = self.index
        return self.cube.vertical_rotation_anticlockwise(i)

    def opposite(self):
        return RotationVerticalClockwise.RotationVerticalClockwise(self.cube, self.index)
