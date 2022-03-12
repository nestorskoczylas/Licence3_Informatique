import itertools

from Block import Block
from Face import Face
from PocketCube import PocketCube
from RubiksCube import RubiksCube


def main():
    """
    Si on veut faire un test quelconque dans un main, autant l'enregistrer
    ici pour le faire formellement plus tard
    """

    # Test : deux Face contenant des Block equals (mais d'instances différentes) sont equals
    f1 = Face(0)
    f2 = Face(0)
    b1 = Block(0, 0, 0)
    b1b = Block(0, 0, 0)
    b2 = Block(1, 1, 1)
    b2b = Block(1, 1, 1)
    f1.blocks = [b1, b2]
    f2.blocks = [b2b, b1b]
    assert (f1 == f2)
    assert (b1b in f1.blocks and b1 in f1.blocks and b1 in f2.blocks and b1b in f1.blocks)

    # Test : ces mêmes deux Face equals sont interchangeables dans une liste
    list_of_faces = [f1]
    assert (f2 in list_of_faces)

    # Test : deux RubiksInterface ont une liste de Face equals à la création
    r1 = RubiksCube()
    r2 = RubiksCube()
    assert (r1.faces == r2.faces)  # ne passe pas
    assert (r1.faces[0].blocks[0] == r2.faces[0].blocks[0])  # passe
    assert (r1.faces[0] == r2.faces[0])  # ne passe pas
    assert (r1.check_is_solved())
    r2.shuffle()
    assert (not r2.check_is_solved())

    assert (r1.check_is_solved())


    # check_power_3_face_order_at_creation()
    res = check_power_3_face_order_at_creation()
    print(res, "\n\n")

    # Test : affichage de chaque block de chaque face un par un pour un PocketCube
    res = check_power_2_face_order_at_creation()
    print(res, "\n\n")

    test_solve_one(PocketCube())


def test_solve_one(cube):
    """
    cube tourne une fois la colonne 1, une fois la ligne 1, une fois la colonne 1, une fois la ligne 1
    puis on le solve en faisant une fois la ligne 1 en anticlock, une fois la colonne 1, puis la ligne 1 puis la colonne
    """
    shuffle_test(cube, 2)
    assert (not cube.check_is_solved())
    cube.horizontal_rotation_anticlockwise(1)
    cube.vertical_rotation_anticlockwise(1)
    cube.horizontal_rotation_anticlockwise(1)
    cube.vertical_rotation_anticlockwise(1)
    assert (cube.check_is_solved())





def check_block_count(cube, target):
    count = 0
    for face in cube.faces:
        for block in face.blocks:
            if block == target:
                count += 1
    return count


def check_power_2_face_order_at_creation():
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
    return expected == face.blocks


def shuffle_test(cube, n):
    """
    Turns n times the line and column x
    """
    x = 1
    for _ in itertools.repeat(None, n):
        cube.vertical_rotation_clockwise(x)
        cube.horizontal_rotation_clockwise(x)


if __name__ == "__main__":
    main()
