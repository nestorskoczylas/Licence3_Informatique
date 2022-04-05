import itertools

from Block import Block
from Face.ThreeByThreeFace import ThreeByThreeAbstractFace
from PuzzleAbstract.PocketCube import PocketCube
from PuzzleAbstract.RubiksCube import RubiksCube
from RubiksSolverActions.RotationDepthAntiClockwise import RotationDepthAntiClockwise
from RubiksSolverActions.RotationDepthClockwise import RotationDepthClockwise
from Tests.RotationPocketCubeTests import init_Tests_PocketCube
from Tests.RotationRubiksCubeTests import init_Tests_RubiksCube


def main():
    # Test : two ThreeByThreeFace containing equal Blocks (of different instances) are equals themselves
    f1 = ThreeByThreeAbstractFace(0)
    f2 = ThreeByThreeAbstractFace(0)
    b1 = Block(0, 0, 0)
    b1b = Block(0, 0, 0)
    b2 = Block(1, 1, 1)
    b2b = Block(1, 1, 1)
    f1.blocks = [b1, b2]
    f2.blocks = [b2b, b1b]
    assert (f1 == f2)
    assert (b1b in f1.blocks and b1 in f1.blocks and b1 in f2.blocks and b1b in f1.blocks)

    # Test : these two ThreeByThreFace can be swapped from a list
    list_of_faces = [f1]
    assert (f2 in list_of_faces)

    # Test : two RubiksCube have equals lists of Face objects at creation
    r1 = RubiksCube()
    r2 = RubiksCube()
    assert (r1.faces == r2.faces)
    assert (r1.faces[0].blocks[0] == r2.faces[0].blocks[0])
    assert (r1.faces[0] == r2.faces[0])

    # Test : a freshly created cube is solved
    assert (r1.check_is_solved())

    # Test : shuffling 'unsolve' a freshly created cube
    r2.shuffle()
    assert (not r2.check_is_solved())

    assert (r1.check_is_solved())

    # Test : each block is at their expected place in their Face's lists of blocks at a Rubik's Cube creation
    check_power_3_face_order_at_creation()
    res = check_power_3_face_order_at_creation()
    for entry in res:
        assert (entry.values())

    # Test : each block is at their expected place in their Face's lists of blocks at a Pocket's Cube creation
    res = check_power_2_face_order_at_creation()
    for entry in res:
        assert (entry.values())

    # Tests : each block is at their expected place in their Face's lists of blocks in a Pocket and in a Rubik's Cube,
    # at creation, and after each possible move made from the initial state of these cubes.
    # These test assert that a RubiksAbstract is correctly instanced, and then that their manipulations are
    # correctly implemented. Ergo, they end up asserting the vast majority of the methods in RubiksAbstract.py
    # are functioning as expected.
    init_Tests_PocketCube().display_tests()
    init_Tests_RubiksCube().display_tests()

    # Test : Manipulating a cube to unsolve it then doing the reverse operations will put it in a solved state
    test_solve_one(PocketCube())


    # Tests : checking that RotationDepth actions give expected states for a RubiksCube
    a_cube = RubiksCube()
    depth_rotation_clock = RotationDepthClockwise(a_cube,0)
    depth_rotation_clock.execute()
    check_depth_rotation_clock_index_0(depth_rotation_clock.cube)

    a_cube = RubiksCube()
    depth_rotation_clock = RotationDepthAntiClockwise(a_cube,0)
    depth_rotation_clock.execute()
    check_depth_rotation_anticlock_index_0(depth_rotation_clock.cube)


def check_depth_rotation_clock_index_0(cube):
    """
    Checks the state of a Rotation's cube for a clockwise depth rotation at index 0 (most frontal row)
    :param cube: the Rotation's cube parameter, after rotation
    """
    for block in cube.get_left_face().get_column(2):
        assert(block.color == ' R ')
    for block in cube.get_right_face().get_column(0):
        assert(block.color == ' P ')
    for block in cube.get_bottom_face().get_line(0):
        assert (block.color == ' B ')
    for block in cube.get_top_face().get_line(2):
        assert (block.color == ' G ')


def check_depth_rotation_anticlock_index_0(cube):
    """
    Checks the state of a Rotation's cube for an anticlock wise depth rotation at index 0 (most frontal row)
    :param cube: the Rotation's cube parameter, after rotation
    """
    for block in cube.get_left_face().get_column(2):
        assert(block.color == ' P ')
    for block in cube.get_right_face().get_column(0):
        assert(block.color == ' R ')
    for block in cube.get_bottom_face().get_line(0):
        assert (block.color == ' G ')
    for block in cube.get_top_face().get_line(2):
        assert (block.color == ' B ')


def test_solve_one(cube):
    """
    One rotation is performed on column one, then line one, then column one, then line 1 again
    It's then solved manually by performing the opposite actions.
    :param cube: could be any kind of cube
    """
    shuffle_test(cube, 2)
    assert (not cube.check_is_solved())
    cube.horizontal_rotation_anticlockwise(1)
    cube.vertical_rotation_anticlockwise(1)
    cube.horizontal_rotation_anticlockwise(1)
    cube.vertical_rotation_anticlockwise(1)
    assert (cube.check_is_solved())


def check_power_2_face_order_at_creation():
    """
        Checks each faces of a Pocket Cube at creation and asserts that each face's list of blocks is exactly how
        it's expected to be
        :return: a dictionary for which each face is attributed to the result of the check, ergo True for correct,
        or False for invalid
        """
    cube = PocketCube()
    front = cube.faces[4]
    right = cube.faces[1]
    down = cube.faces[3]
    left = cube.faces[0]
    up = cube.faces[2]
    back = cube.faces[5]

    front_expected = [Block(0, 0, 0), Block(1, 0, 0),
                      Block(0, 1, 0), Block(1, 1, 0)]
    right_expected = [Block(1, 0, 0), Block(1, 0, 1),
                      Block(1, 1, 0), Block(1, 1, 1)]
    down_expected = [Block(0, 1, 0), Block(1, 1, 0),
                     Block(0, 1, 1), Block(1, 1, 1)]
    left_expected = [Block(0, 0, 1), Block(0, 0, 0),
                     Block(0, 1, 1), Block(0, 1, 0)]
    up_expected = [Block(0, 0, 1), Block(1, 0, 1),
                   Block(0, 0, 0), Block(1, 0, 0)]
    back_expected = [Block(1, 0, 1), Block(0, 0, 1),
                     Block(1, 1, 1), Block(0, 1, 1)]

    front = check_face_order(front_expected, front)
    right = check_face_order(right_expected, right)
    down = check_face_order(down_expected, down)
    left = check_face_order(left_expected, left)
    up = check_face_order(up_expected, up)
    back = check_face_order(back_expected, back)

    return [{'front': front}, {'right': right}, {'down': down},
            {'left': left}, {'up': up}, {'back': back}]


def check_power_3_face_order_at_creation():
    """
    Checks each faces of a Rubik's Cube at creation and asserts that each face's list of blocks is exactly how
    it's expected to be
    :return: a dictionary for which each face is attributed to the result of the check, ergo True for correct,
    or False for invalid
    """
    cube = RubiksCube()
    front = cube.faces[4]
    right = cube.faces[1]
    down = cube.faces[3]
    left = cube.faces[0]
    up = cube.faces[2]
    back = cube.faces[5]

    front_expected = [Block(0, 0, 0), Block(1, 0, 0), Block(2, 0, 0),
                      Block(0, 1, 0), Block(1, 1, 0), Block(2, 1, 0),
                      Block(0, 2, 0), Block(1, 2, 0), Block(2, 2, 0)]
    right_expected = [Block(2, 0, 0), Block(2, 0, 1), Block(2, 0, 2),
                      Block(2, 1, 0), Block(2, 1, 1), Block(2, 1, 2),
                      Block(2, 2, 0), Block(2, 2, 1), Block(2, 2, 2)]
    down_expected = [Block(0, 2, 0), Block(1, 2, 0), Block(2, 2, 0),
                     Block(0, 2, 1), Block(1, 2, 1), Block(2, 2, 1),
                     Block(0, 2, 2), Block(1, 2, 2), Block(2, 2, 2)]
    left_expected = [Block(0, 0, 2), Block(0, 0, 1), Block(0, 0, 0),
                     Block(0, 1, 2), Block(0, 1, 1), Block(0, 1, 0),
                     Block(0, 2, 2), Block(0, 2, 1), Block(0, 2, 0)]
    up_expected = [Block(0, 0, 2), Block(1, 0, 2), Block(2, 0, 2),
                   Block(0, 0, 1), Block(1, 0, 1), Block(2, 0, 1),
                   Block(0, 0, 0), Block(1, 0, 0), Block(2, 0, 0)]
    back_expected = [Block(2, 0, 2), Block(1, 0, 2), Block(0, 0, 2),
                     Block(2, 1, 2), Block(1, 1, 2), Block(0, 1, 2),
                     Block(2, 2, 2), Block(1, 2, 2), Block(0, 2, 2)]

    front = check_face_order(front_expected, front)
    right = check_face_order(right_expected, right)
    down = check_face_order(down_expected, down)
    left = check_face_order(left_expected, left)
    up = check_face_order(up_expected, up)
    back = check_face_order(back_expected, back)

    return [{'front': front}, {'right': right}, {'down': down},
            {'left': left}, {'up': up}, {'back': back}]


def check_face_order(expected, face):
    """
    Compares two faces (one being the expected, hard-coded list, and the other being the actual list). For
    this comparison, the order of the blocks in each Face's list of blocks will matter
    :param expected: the expected, hard-coded list of blocks
    :param face: the checked face
    :return: True if they're both equals, False if the checked face is invalid
    """
    return expected == face.blocks


def shuffle_test(cube, n):
    """
    Turns n times the line and column x=1
    :param cube: any Rubik's element
    :param n: how much will the cube be shuffled at line x=1
    """
    x = 1
    for _ in itertools.repeat(None, n):
        cube.vertical_rotation_clockwise(x)
        cube.horizontal_rotation_clockwise(x)


if __name__ == "__main__":
    main()
