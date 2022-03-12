from abc import ABC

import RotationHorizontalAntiClockwise
from Rotation import Rotation


class RotationHorizontalClockwise(Rotation, ABC):
    def __init__(self, cube, line):
        Rotation.__init__(self, cube, line)

    def execute(self):
        i = self.index
        return self.cube.horizontal_rotation_clockwise(i)

    def opposite(self):
        return RotationHorizontalAntiClockwise.RotationHorizontalAntiClockwise(self.cube, self.index)