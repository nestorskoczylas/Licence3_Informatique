import copy
import itertools
from math import sqrt

import StringsMerger
from SideBlock import *

colors = ['L', 'R', 'U', 'D', 'F', 'B']


# colors = ['G', 'B', 'P', 'R', 'W', 'Y']


class Face:
    def __init__(self, index):
        self.color = colors[index]
        self.blocks = []
        self.power = None

    def init_blocks(self):
        for block in self.blocks:
            block.color = self.color
        self.power = int(sqrt(len(self.blocks)))

    def add_block(self, block):
        block_copy = copy.copy(block)
        self.blocks.append(block_copy)

    def __str__(self):
        result_str = "Face {}:\n".format(self.color)
        return "{0}{1}".format(result_str, StringsMerger.print_from_list(self.blocks, self.power, 0))

    def __repr__(self):
        return "Face({})_{}".format(self.color, self.blocks)

    def __eq__(self, other):
        for block in other.blocks:
            if block not in self.blocks:
                return False
        return len(self.blocks) == len(other.blocks)

    def __hash__(self):
        return sum(block.__hash__() for block in self.blocks)

    def rotate_clockwise(self):
        blocks = self.blocks
        if self.power == 3:
            blocks[0], blocks[1], blocks[2], blocks[3], blocks[5], blocks[6], blocks[7], blocks[8] \
                = blocks[6], blocks[3], blocks[0], blocks[7], blocks[1], blocks[8], blocks[5], blocks[2]
        if self.power == 2:
            blocks[0], blocks[1], blocks[2], blocks[3] \
                = blocks[2], blocks[0], blocks[3], blocks[1]

    def rotate_anticlockwise(self):
        for _ in itertools.repeat(None, 3):
            self.rotate_clockwise()


def main():
    face = Face(2)
    face.blocks.extend([Block(0, 0, 0), Block(0, 0, 1), Block(2, 2, 2), Block(1, 1, 1), Block(1, 2, 1), Block(1, 0, 0)])
    print(face)


if __name__ == "__main__":
    main()
