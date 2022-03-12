from abc import ABC

import RotationVerticalAntiClockwise
from Rotation import Rotation


class RotationVerticalClockwise(Rotation, ABC):
    def __init__(self, cube, column):
        Rotation.__init__(self, cube, column)

    def execute(self):
        i = self.index
        return self.cube.vertical_rotation_clockwise(i)

    def opposite(self):
        return RotationVerticalAntiClockwise.RotationVerticalAntiClockwise(self.cube, self.index)