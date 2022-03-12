from abc import ABC

from RubiksAbstract import RubiksAbstract


class PocketCube(RubiksAbstract, ABC):
    def __init__(self):
        RubiksAbstract.__init__(self, power=2)


def main():
    cube = PocketCube()

    cube.print_cube_alt()
#    cube.faces[0].print_face_alt()


if __name__ == "__main__":
    main()
