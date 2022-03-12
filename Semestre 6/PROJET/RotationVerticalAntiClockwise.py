from abc import ABC

import RotationVerticalClockwise
from Rotation import Rotation


class RotationVerticalAntiClockwise(Rotation, ABC):
    def __init__(self, cube, column):
        Rotation.__init__(self, cube, column)

    def execute(self):
        i = self.index
        return self.cube.vertical_rotation_anticlockwise(i)

    def opposite(self):
        return RotationVerticalClockwise.RotationVerticalClockwise(self.cube, self.index)