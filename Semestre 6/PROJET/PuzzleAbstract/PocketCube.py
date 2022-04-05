from abc import ABC

from Face.TwoByTwoFace import TwoByTwoAbstractFace
from PuzzleAbstract.RubiksAbstract import RubiksAbstract


class PocketCube(RubiksAbstract, ABC):
    def __init__(self):
        RubiksAbstract.__init__(self, power=2)

    def _create_face(self, index):
        return TwoByTwoAbstractFace(index)
