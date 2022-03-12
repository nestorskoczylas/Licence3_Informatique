from abc import ABC

from RubiksAbstract import RubiksAbstract


class RubiksCube(RubiksAbstract, ABC):
    def __init__(self):
        RubiksAbstract.__init__(self, power=3)


def main():
    cube = RubiksCube()

    #    cube.print_cube_alt()
    cube.faces[4].print_face_alt()
    cube.faces[1].print_face_alt()


if __name__ == "__main__":
    main()
