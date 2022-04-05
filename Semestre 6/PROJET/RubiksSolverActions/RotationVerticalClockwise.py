from abc import ABC

from RubiksSolverActions import Rotation
from RubiksSolverActions import RotationVerticalAntiClockwise


class RotationVerticalClockwise(Rotation, ABC):
    """
    This Rotation uses the vertical_rotation_clockwise from the RubiksAbstract class.
    """
    def __init__(self, cube, column):
        Rotation.__init__(self, cube, column)

    def execute(self):
        i = self.index
        return self.cube.vertical_rotation_clockwise(i)

    def opposite(self):
        return RotationVerticalAntiClockwise.RotationVerticalAntiClockwise(self.cube, self.index)
