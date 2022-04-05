from abc import ABC

from Face import AbstractFace


class ThreeByThreeAbstractFace(AbstractFace, ABC):
    def __init__(self, index):
        AbstractFace.__init__(self, index, power=3)

    def rotate_clockwise(self):
        blocks = self.blocks
        blocks[0], blocks[1], blocks[2], blocks[3], blocks[5], blocks[6], blocks[7], blocks[8] \
            = blocks[6], blocks[3], blocks[0], blocks[7], blocks[1], blocks[8], blocks[5], blocks[2]
