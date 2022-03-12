from abc import ABC

import RotationHorizontalClockwise
from Rotation import Rotation


class RotationHorizontalAntiClockwise(Rotation, ABC):
    def __init__(self, cube, line):
        Rotation.__init__(self, cube, line)

    def execute(self):
        i = self.index
        return self.cube.horizontal_rotation_anticlockwise(i)

    def opposite(self):
        return RotationHorizontalClockwise.RotationHorizontalClockwise(self.cube, self.index)