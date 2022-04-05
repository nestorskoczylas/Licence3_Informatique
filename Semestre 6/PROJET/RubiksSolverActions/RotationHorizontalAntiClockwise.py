from abc import ABC

from RubiksSolverActions import Rotation
from RubiksSolverActions import RotationHorizontalClockwise


class RotationHorizontalAntiClockwise(Rotation, ABC):
    """
    This Rotation uses the horizontal_rotation_anti_clockwise from the RubiksAbstract class.
    """
    def __init__(self, cube, line):
        Rotation.__init__(self, cube, line)

    def execute(self):
        i = self.index
        return self.cube.horizontal_rotation_anticlockwise(i)

    def opposite(self):
        return RotationHorizontalClockwise.RotationHorizontalClockwise(self.cube, self.index)
