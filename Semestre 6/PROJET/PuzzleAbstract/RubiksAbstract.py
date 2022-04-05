import random
from abc import ABC

from Block import Block
from Block.CornerBlock import *
from Face import *
from PuzzleAbstract import Puzzle
from Solver.RubiksElementSolver import RubiksElementSolver


class RubiksAbstract(Puzzle, ABC):
    """
    A RubiksAbstract, or RubiksElement, is any kind of Rubik's Cube-like puzzle, but of undetermined dimension (power).
    Its implementations must define a _create_face method which will determine the specific type of Face object
    this RubiksElement will need.
    First its Faces are initialized, then all Blocks are created, copied and given to each corresponding Face. Then
    adjustments have to be made in the order of the lists of blocks of the top, back, and left faces. Then each Face
    attributes a color to each copy of the Blocks they received.
    Only then the rubik's element is ready to be manipulated.
    """
    def __init__(self, power):
        """
        :param power: the dimensions of the Rubik's element (e.g. 3 for a RubiksCube of 3 by 3)
        """
        Puzzle.__init__(self)
        self.power = power
        self.faces = self.__init_faces()
        self.__create_blocks()

    def __init_faces(self):
        """
        Initializes the list with each Face object of the relevant subtype
        :return: the initialized self.faces list of faces
        """
        faces = []
        for i in range(6):
            faces.append(self._create_face(i))
        return faces

    @abc.abstractmethod
    def _create_face(self, index):
        """
        Creates the relevant Face object, depends on self.power value.
        Must be implemented for each type of Rubik's element
        :param index: index of this Face in this Rubik's element's list of faces, from 0 to 5 included for a cube
        :return: the corresponding Face of relevant type, depending on this Rubik's element
        """
        pass

    def rotate_one_face_clockwise(self, face):
        assert (face in self.faces)
        face.rotate_clockwise()

    def rotate_one_face_anticlockwise(self, face):
        assert (face in self.faces)
        face.rotate_anticlockwise()

    def check_is_solved(self):
        """
        A Rubik's element is considered solved if all faces have each of their blocks of the same color.
        Order of the blocks on the faces do not matter, and blocks don't have to be at their original position.
        """
        for face in self.faces:
            first_color = face.blocks[0].color
            for block in face.blocks:
                if block.color != first_color:
                    return False
        return True

    def __create_blocks(self):
        """
        Creates each block for this Rubik's element's faces, initializes the color of each copy of each cube,
        and rearranges the order of each face's list of blocks, in order to put them in a more natural order (we
        decided to have each face ordered from the top left corner to the bottom right corner). This order of blocks
        for each face is crucial, since the rotations entirely depend on specific orders for each face.
        """
        n = self.power
        for y in range(n):
            for z in range(n):
                for x in range(n):
                    block = self.__determine_block_type(x, y, z)
                    self.__fill_faces(x, y, z, block)
        self.__init_faces_colors()
        self.__adjust_left_top_back_faces()

    def __adjust_left_top_back_faces(self):
        """
        Adjustments must be made to put the left, top and back faces' blocks' lists in the same order as the other
        3 faces. These adjustments must be made whatever the size of the Rubiks object.
        These adjustments are necessary because each face's list of blocks is created and filled while
        iterating over increasing x, y and z coordinates, therefore these three faces' lists' of blocks are not filled
        in the same order as the other three.
        """
        for face in [self.get_left_face(), self.get_back_face(), self.get_top_face()]:
            self.__reverse_all_lines(face)
        self.get_top_face().blocks.reverse()

    def __reverse_all_lines(self, face):
        """
        Reverses each lines of blocks of the given face. Required by self.adjust_left_top_bottom_faces()
        :param face: face for which each line must be reversed (left, back, and top face)
        """
        for i in range(self.power):
            temp = face.get_line(i)
            temp.reverse()
            face.blocks[i * self.power:i * self.power + self.power] = temp

    def __determine_block_type(self, x, y, z):
        """
        Returns a Block, a SideBlock, or a CornerBlock, depending on the given coordinates.
        In our model, we don't actually use the specific types of blocks, but they may be used if needed
        :param x: x coordinate of the block to form
        :param y: y coordinate of the block to form
        :param z: z coordinate of the block to form
        :return: a Block of relevant subclass
        """
        extremities = [0, self.power - 1]
        coordinates = [x, y, z]
        count = 0
        for coordinate in coordinates:
            if coordinate in extremities:
                count += 1

        if count < 2:
            # if a block isn't at more than one extremity, it's neither a side nor a corner
            return Block(x, y, z)
        elif count == 2:
            return SideBlock(x, y, z)
        elif count == 3:
            # used elif because count can never be anything but inferior or equals to 2, or 3
            return CornerBlock(x, y, z)

    def __fill_faces(self, x, y, z, block):
        """
        Attributes each block to the relevant Face (from one to three Faces), depending
        on the given x, y and z coordinates.
        The block will actually be copied each time into the face, and the original block won't be used again.
        """
        n = self.power - 1
        if z == 0:
            self.get_front_face().add_block_copy(block)
        if x == n:
            self.get_right_face().add_block_copy(block)
        if y == n:
            self.get_bottom_face().add_block_copy(block)
        if x == 0:
            self.get_left_face().add_block_copy(block)
        if y == 0:
            self.get_top_face().add_block_copy(block)
        if z == n:
            self.get_back_face().add_block_copy(block)

    def __init_faces_colors(self):
        """
        Calls the init_blocks() method on each face of this Rubik's element
        """
        for face in self.faces:
            face.init_blocks()

    def print_puzzle(self):
        """
        Displays each faces side by side
        Each face is identified by its side
        Within each face, each block is identified by the sticker's color on this face
        """
        faces_per_line = 3
        cube_string = StringsMerger.string_from_list_of_elements(self.faces, faces_per_line, 5, None)
        print(cube_string)

    def horizontal_rotation_clockwise(self, line):
        """
        Performs a horizontal rotation in a clockwise fashion, on the line given as parameter.
        :param line: to be rotated, between 0 and self.power - 1
        :return: self, allowing chaining of rotations if so needed
        """
        n = self.power
        assert (0 <= line < n)
        faces_todo = [self.get_left_face(), self.get_back_face(), self.get_right_face(), self.get_front_face()]
        blocks = []
        self.get_i_line_for_each_face(blocks, faces_todo, line)
        self.__put_last_element_to_head(blocks)
        for i in range(len(faces_todo)):
            faces_todo[i].blocks[line * n:(n * (line + 1))] = blocks[i]
        self.__handle_cube_extremities_hor_rotation(line, n)
        return self

    def vertical_rotation_clockwise(self, column):
        """
        Performs a vertical rotation in a clockwise fashion, on the column given as parameter.
        :param column: to be rotated, between 0 and self.power - 1
        :return: self, allowing chaining of rotations if so needed
        """
        n = self.power
        assert (0 <= column < n)
        faces_todo = [self.get_top_face(), self.get_front_face(), self.get_bottom_face(), self.get_back_face()]
        blocks = []
        self.get_i_column_for_each_face(blocks, column, faces_todo, n)
        self.__put_last_element_to_head(blocks)
        self.__swap_columns_between_faces(blocks, column, faces_todo, n)
        self.__handle_cube_extremities_ver_rotation(column, n)
        return self

    def __put_last_element_to_head(self, blocks):
        """
        Does exactly what the function's name suggests. Used to move a line or a column from one face to another
        :param blocks: list of lists of blocks, for which the last element is popped, then inserted back in at the head
        """
        queue = blocks.pop()
        blocks.insert(0, queue)

    def get_i_line_for_each_face(self, blocks, faces_todo, line):
        """
        Collects the i-th line on each face of this cube and put them in the blocks list given as parameter
        :param blocks: list of lists of blocks collected on each face
        :param line: line to be collected
        :param faces_todo: front, bottom, back, and top faces
        """
        for i in range(len(faces_todo)):
            power_blocks = faces_todo[i].get_line(line)
            blocks.append(power_blocks)

    def get_i_column_for_each_face(self, blocks, column, faces_todo, n):
        """
        Collects the i-th column on each face of this cube and put them in the blocks list given as parameter.
        However, the column index given as parameter is relative to the front face. That is to say,
        if we want to rotate column n=0, so the first column of the front face, we actually want to rotate
        the last column on the back face at index self.power-1
        :param blocks: list of all blocks collected on each face
        :param column: column (index relative to the frontal face) to be collected
        :param faces_todo: front, bottom, back, and top faces
        :param n: self.power
        """
        for face in faces_todo:
            if face == self.get_back_face():
                # Takes into account that the back face is 'vertically symmetrical' to the front face (order-wise)
                blocks.append(face.get_column(n - column - 1))
            else:
                blocks.append(face.get_column(column))

    def __swap_columns_between_faces(self, blocks, column, faces_todo, n):
        """
        Block by block, each face sees their relevant column swapped by the
        column of another relevant face's blocks.
        The manipulated index of each block will not be the same, if the operated face is the back or the top face.
        The reason is that if you manipulate, for instance, the first column of the front face, it will actually effect
        the last column of the back face.
        :param blocks: list of lists of blocks that shall be swapped
        :param column: rotated column's index
        :param faces_todo: list of faces to be manipulated one by one
        :param n: self.power
        """
        for face in faces_todo:
            for j in range(n):
                swapped_block_index = column + (n * j) \
                    if face != self.get_back_face() \
                    else (n - column - 1) + (n * j)
                single_block = blocks[faces_todo.index(face)].pop(0) \
                    if face != self.get_back_face() and face != self.get_top_face() \
                    else blocks[faces_todo.index(face)].pop()
                face.blocks[swapped_block_index] = single_block

    def __handle_cube_extremities_hor_rotation(self, line, n):
        """
        If we perform a horizontal rotation on line 0, the top face shall be rotated in a clockwise fashion.
        Called by self.horizontal_rotation(line)
        :param line: rotated line
        :param n: self.power
        """
        if line == 0:
            self.rotate_one_face_clockwise(self.get_top_face())
        elif line == n - 1:
            self.rotate_one_face_anticlockwise(self.get_bottom_face())

    def __handle_cube_extremities_ver_rotation(self, column, n):
        """
        If we perform a vertical rotation on column 0, the left face shall be rotated in a clockwise fashion.
        Called by self.vertical_rotation(line)
        :param column: rotated column
        :param n: self.power
        """
        if column == 0:
            self.rotate_one_face_clockwise(self.get_left_face())
        elif column == n - 1:
            self.rotate_one_face_anticlockwise(self.get_right_face())

    def shuffle(self, moves_max=3):
        """
        Performs 'random' rotations on the rubik's element (random lines, columns, and random amount of times)
        In a Rubik's abstract, the moves_max number will determine how many Horizontal and Vertical rotations
        will be performed, meaning there will be a total of moves_max * 2 moves performed.

        WARNING : line_or_column_index will print the same value INSIDE this method, but will actually likely be a
        DIFFERENT number when passed as an argument to vertical_rotation_clockwise and horizontal_rotation_clockwise.
        Because of this behavior, shuffle may not return the list of performed moves (because it is unknown at this
        stage). It may, however, return the number of performed moves.
        """
        move_counter = 0
        for _ in itertools.repeat(None, moves_max):
            line_or_column_index = random.randint(0, self.power - 1)
            self.vertical_rotation_clockwise(random.randint(0, line_or_column_index))
            self.horizontal_rotation_clockwise(random.randint(0, line_or_column_index))
            move_counter += 2
        return move_counter

    def horizontal_rotation_anticlockwise(self, line):
        """
        Executes 3 clockwise rotation on the given line, corresponding to a single anticlockwise rotation
        :param line: line's index to be rotated
        :return: self, allowing chaining of rotations if so needed
        """
        for _ in itertools.repeat(None, 3):
            self.horizontal_rotation_clockwise(line)
        return self

    def vertical_rotation_anticlockwise(self, column):
        """
        Executes 3 clockwise rotation on the given column, corresponding to a single anticlockwise rotation
        :param column: column's index to be rotated
        :return: self, allowing chaining of rotations if so needed
        """
        for _ in itertools.repeat(None, 3):
            self.vertical_rotation_clockwise(column)
        return self

    def get_front_face(self):
        """
        :return: the front face of this rubik's abstract
        """
        return self.faces[4]

    def get_right_face(self):
        """
        :return: the right face of this rubik's abstract
        """
        return self.faces[1]

    def get_bottom_face(self):
        """
        :return: the bottom face of this rubik's abstract
        """
        return self.faces[3]

    def get_back_face(self):
        """
        :return: the back face of this rubik's abstract
        """
        return self.faces[5]

    def get_top_face(self):
        """
        :return: the top face of this rubik's abstract
        """
        return self.faces[2]

    def get_left_face(self):
        """
        :return: the left face of this rubik's abstract
        """
        return self.faces[0]

    def get_solver(self, moves_max):
        """
        A RubiksAbstract is solved by any RubiksElementSolver
        """
        return RubiksElementSolver(self, moves_max)

    def map_block_with_each_face_by_initial_coords(self, x, y, z):
        """
        A block object being copied on each face it's one (with each instance being moved around
        during rotations and each having a different color), this method can be used to determine on
        which faces is each block.

        While we didn't need to use it in our model, this could still be used in combination with the fact that
        each Block can be a Corner or a SideBlock, to determine the colors of each sticker on a Block,
        when relevant

        :param x: x coordinate of desired block
        :param y: y coordinate of desired block
        :param z: z coordinate of desired block
        :return: a dictionary mapping the target block with a list of each face it's on identified by color.
        """
        target = None
        faces = []
        for face in self.faces:
            for block in face.blocks:
                if block.x == x and block.y == y and block.z == z:
                    if target is None:
                        target = block
                    faces.append(face.color)
        return {target: faces}
