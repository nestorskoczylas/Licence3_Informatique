from abc import ABC

from RubiksSolverActions import Rotation
from RubiksSolverActions import RotationHorizontalAntiClockwise


class RotationHorizontalClockwise(Rotation, ABC):
    """
    This Rotation uses the horizontal_rotation_clockwise from the RubiksAbstract class.
    """
    def __init__(self, cube, line):
        Rotation.__init__(self, cube, line)

    def execute(self):
        i = self.index
        return self.cube.horizontal_rotation_clockwise(i)

    def opposite(self):
        return RotationHorizontalAntiClockwise.RotationHorizontalAntiClockwise(self.cube, self.index)
