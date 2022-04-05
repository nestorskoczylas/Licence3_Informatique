from abc import ABC

from Face.ThreeByThreeFace import ThreeByThreeAbstractFace
from PuzzleAbstract.RubiksAbstract import RubiksAbstract


class RubiksCube(RubiksAbstract, ABC):
    def __init__(self):
        RubiksAbstract.__init__(self, power=3)

    def _create_face(self, index):
        return ThreeByThreeAbstractFace(index)