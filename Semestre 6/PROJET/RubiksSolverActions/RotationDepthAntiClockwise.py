from abc import ABC

from RubiksSolverActions import RotationDepthClockwise
from RubiksSolverActions.RotationDepthOperation import RotationDepthOperation


class RotationDepthAntiClockwise(RotationDepthOperation, ABC):
    """
    This move rotates the whole cube (each of the lines, clockwise), rotates the given column (corresponding
    to the desired 'in depth' rotation) anticlockwise, and then rotates it back in an anticlockwise fashion, simulating
    the expected action, but counting for only one movement for the Solver.
    """
    def __init__(self, cube, line):
        RotationDepthOperation.__init__(self, cube, line)

    def execute(self):
        i = self.index
        self._turn_all_cube_clockwise()
        self.cube.vertical_rotation_anticlockwise(i)
        self._turn_all_cube_anticlockwise()
        return self

    def opposite(self):
        return RotationDepthClockwise.RotationDepthClockwise(self.cube, self.index)
