from abc import ABC

from RubiksSolverActions import Rotation


class RotationDepthOperation(Rotation, ABC):
    """
    This move rotates the whole cube (each of the lines, clockwise), rotates the given column (corresponding
    to the desired 'in depth' rotation), and then rotates it back in an anticlockwise fashion, simulating
    the expected action, but counting for only one movement for the Solver.
    """
    def __init__(self, cube, line):
        Rotation.__init__(self, cube, line)

    def _turn_all_cube_clockwise(self):
        """
        Turns the whole cube clockwise, meaning the front face of the cube will have the blocks
        of the right face.
        """
        n = self.cube.power
        for i in range(n):
            self.cube.horizontal_rotation_clockwise(i)

    def _turn_all_cube_anticlockwise(self):
        """
        Turns the whole cube anticlockwise, meaning the front face of the cube will have the blocks
        of the left face.
        """
        n = self.cube.power
        for i in range(n):
            self.cube.horizontal_rotation_anticlockwise(i)
