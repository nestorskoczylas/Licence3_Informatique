import abc
import copy
import itertools

from Block.BlockColor import BlockColor
from DisplayUtils import StringsMerger


class AbstractFace(abc.ABC):
    """
    A Face object is a list of Blocks (4 corner blocks minimum for the smallest
    possible Rubik's element). For any dimensions cube, a Face has cube.power² blocks.
    Each Face is characterized by its position on the Cube ('L' for left, etc), and we
    arbitrarily give color to each position.
    """
    colors = {'L': BlockColor.green, 'R': BlockColor.blue,
              'U': BlockColor.purple, 'D': BlockColor.red,
              'F': BlockColor.white, 'B': BlockColor.yellow}

    def __init__(self, index, power):
        """
        At creation, a Rubik's element (cube) creates 6 faces.
        At initialization, a Face is attributed a side and a color.
        :param index: the face's index in the Cube's list of faces
        :param power: the dimension of the cube the face will belong to
        """
        self.side = list(AbstractFace.colors.keys())[index]
        self.color = AbstractFace.colors.get(self.side)
        self.blocks = []
        self.power = power

    def add_block_copy(self, block):
        """
        During a Cube's creation, blocks copies are attributed to each Face.
        The fact that they're copied allows for easier manipulation of each faces
        during rotations, while keeping information of which color is where.
        :param block: block to be copied then added
        """
        block_copy = copy.copy(block)
        self.blocks.append(block_copy)

    def init_blocks(self):
        """
        Once all blocks have been created and attributed to each Face, each block's copy
        gets a color, corresponding to the face the instance of the block is on.
        """
        for block in self.blocks:
            block.color = self.color

    def __str__(self):
        side_id_str = "Face {}:\n".format(self.side)
        return "{0}{1}".format(side_id_str,
                               StringsMerger.string_from_list_of_elements(self.blocks, self.power, 0))

    def __repr__(self):
        return "Face({})_{}".format(self.color, self.blocks)

    def __eq__(self, other):
        """
        A Face is characterized by the blocks on it. If both Faces have exactly the same
        blocks, they're equals, as long as they're of the same dimensions. Order does
        not matter.
        """
        for block in other.blocks:
            if block not in self.blocks:
                return False
        return len(self.blocks) == len(other.blocks)

    def __hash__(self):
        return sum(block.__hash__() for block in self.blocks)

    @abc.abstractmethod
    def rotate_clockwise(self):
        """
        Rotates the face on itself, clockwise.
        We couldn't figure out how to generalize the algorithm, so it must be
        hard-coded for each specific type of Rubik's element.
        """
        pass

    def rotate_anticlockwise(self):
        for _ in itertools.repeat(None, 3):
            self.rotate_clockwise()

    def get_line(self, line_index):
        """
        :param line_index: index of the line to be retrieved, from 0 to self.power-1
        :return: the self.power blocks on this line
        """
        start_index = self.power * line_index
        end_index = self.power * (line_index + 1)
        return self.blocks[start_index:end_index]

    def get_column(self, column_index):
        """
        :param column_index: index of the column to be retrieved, from 0 to self.power-1
        :return: the self.power blocks on this column
        """
        column = []
        for i in range(self.power):
            index = column_index + (self.power * i)
            collected_block = self.blocks[index]
            column.append(collected_block)
        return column
