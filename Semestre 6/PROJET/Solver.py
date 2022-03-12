import StringsMerger
from PocketCube import PocketCube
from RubiksCube import RubiksCube
from RotationHorizontalAntiClockwise import RotationHorizontalAntiClockwise
from RotationHorizontalClockwise import RotationHorizontalClockwise
from RotationVerticalAntiClockwise import RotationVerticalAntiClockwise
from RotationVerticalClockwise import RotationVerticalClockwise

import time

smallest_moves = []
other_lists = []


def solve(cube, nb_of_moves, previous_moves=None, iteration=None):
    global smallest_moves
    global other_lists
    if not iteration and not previous_moves:
        iteration = 0
        previous_moves = []
    nb_previous_moves = len(previous_moves)
    nb_smallest_moves = len(smallest_moves)
    if cube.check_is_solved():
        if nb_previous_moves <= nb_smallest_moves or nb_smallest_moves == 0:
            smallest_moves = previous_moves
            return cube
        else:
            other_lists.append(previous_moves)
    elif iteration < nb_of_moves and (nb_previous_moves <= nb_smallest_moves or nb_smallest_moves == 0):
        iteration += 1
        all_moves = generate_all_moves(cube)
        for move in all_moves:
            if [move] * 2 != previous_moves[-2:] \
                    and (len(previous_moves) == 0 or move != previous_moves[-1].opposite()):
                manipulated_cube = move.execute()
                moves_copy = previous_moves[:]
                moves_copy.append(move)
                res_cube = solve(manipulated_cube, nb_of_moves, moves_copy, iteration)
                if res_cube:
                    return res_cube
        other_lists.append(previous_moves)
        return None
    else:
        other_lists.append(previous_moves)
        return None


def generate_all_moves(cube):
    rhc = [RotationHorizontalClockwise(cube, i) for i in range(cube.power)]
    rha = [RotationHorizontalAntiClockwise(cube, i) for i in range(cube.power)]
    rvc = [RotationVerticalClockwise(cube, i) for i in range(cube.power)]
    rva = [RotationVerticalAntiClockwise(cube, i) for i in range(cube.power)]
    list_of_lists = [rhc, rha, rvc, rva]
    all_moves = [move for sublist in list_of_lists for move in sublist]
    return all_moves


def main():
    cube = RubiksCube()
    #cube = PocketCube()

    print("Initial, solved {0} state :\n".format(cube.__module__))
    cube.print_cube_alt()

    moves = cube.shuffle(1)
    nb_of_moves = len(moves)

    print("\nShuffled...")
    print(moves if moves else "")
    cube.print_cube_alt()

    print("\nTrying to solve...")
    start = time.time()
    resulting_cube = solve(cube, nb_of_moves)
    end = time.time()

    if resulting_cube:
        print("After solve attempt:\n")
        resulting_cube.print_cube_alt()

        print("\nKept list of moves:")
        StringsMerger.print_from_list(smallest_moves, 8)

        other_attempts = sum([len(list_of_moves) for list_of_moves in other_lists])
        print("\nMade {0} other attempts, average {1} moves per attempt, total of {2} moves.".
              format(len(other_lists), int(other_attempts / len(other_lists)), other_attempts))

        state_str = "Solved" if resulting_cube.check_is_solved() else "Failure"
        print("\n{0}, in {1} moves, shuffled by {2} rotations.".format(state_str, len(smallest_moves), nb_of_moves))

        time_solve = (end - start) / 60
        print("\nTime of execution: {0}s".format(time_solve.__round__(3)))

    else:
        print("Couldn't solve this cube. It was either given in an unsolvable state, or needs too many moves to allow "
              "solving by backtracking.")


if __name__ == "__main__":
    main()
