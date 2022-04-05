from abc import ABC

from RubiksSolverActions.RotationDepthAntiClockwise import RotationDepthAntiClockwise
from RubiksSolverActions.RotationDepthClockwise import RotationDepthClockwise
from RubiksSolverActions.RotationHorizontalAntiClockwise import RotationHorizontalAntiClockwise
from RubiksSolverActions.RotationHorizontalClockwise import RotationHorizontalClockwise
from RubiksSolverActions.RotationVerticalAntiClockwise import RotationVerticalAntiClockwise
from RubiksSolverActions.RotationVerticalClockwise import RotationVerticalClockwise
from Solver import Solver


class RubiksElementSolver(Solver, ABC):
    def __init__(self, some_cube, max_nb_moves):
        Solver.__init__(self, some_cube, max_nb_moves)

    def generate_all_moves(self, cube):
        rot_hor_clock = [RotationHorizontalClockwise(cube, i) for i in range(cube.power)]
        rot_hor_anti = [RotationHorizontalAntiClockwise(cube, i) for i in range(cube.power)]
        rot_vert_clock = [RotationVerticalClockwise(cube, i) for i in range(cube.power)]
        rot_vert_anti = [RotationVerticalAntiClockwise(cube, i) for i in range(cube.power)]
        rot_depth_clock = [RotationDepthClockwise(cube, i) for i in range(cube.power)]
        rot_depth_anti = [RotationDepthAntiClockwise(cube, i) for i in range(cube.power)]
        list_of_lists = [rot_hor_clock, rot_hor_anti, rot_vert_clock, rot_vert_anti]
        all_moves = [move for sublist in list_of_lists for move in sublist]
        return all_moves
