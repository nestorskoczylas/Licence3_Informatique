from abc import ABC

from Face import AbstractFace


class TwoByTwoAbstractFace(AbstractFace, ABC):
    def __init__(self, index):
        AbstractFace.__init__(self, index, power=2)

    def rotate_clockwise(self):
        blocks = self.blocks
        blocks[0], blocks[1], blocks[2], blocks[3] \
            = blocks[2], blocks[0], blocks[3], blocks[1]

