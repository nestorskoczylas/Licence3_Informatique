import abc
import itertools
import random

import StringsMerger
from CornerBlock import *
from Face import *
from RotationHorizontalClockwise import RotationHorizontalClockwise
from RotationVerticalClockwise import RotationVerticalClockwise


def map_block_with_each_face_by_initial_coords(cube, x, y, z):
    """
    Could be used to check that for every block they're never twice on the same face,
    and they all appear the number of times corresponding to their type (3 times for corner block, etc)

    :param cube: rubik's in which the block is to be searched
    :param x: x coordinate of desired block
    :param y: y coordinate of desired block
    :param z: z coordinate of desired block
    :return: a dictionary mapping the target block with a list of each face it's on identified by color.

    map_block_with_each_face_by_initial_coords(RubiksCube(), 0, 0, 0)
    >> {L @ [x:0 y:0 z:0]: ['L', 'U', 'F']}
    """
    target = None
    faces = []
    for face in cube.faces:
        for block in face.blocks:
            if block.x == x and block.y == y and block.z == z:
                if target is None:
                    target = block
                faces.append(face.color)
    target = {target: faces}
    return target


class RubiksAbstract(abc.ABC):
    def __init__(self, power):
        self.power = power
        self.faces = [Face(x) for x in range(6)]
        self.create_blocks()

    def check_if_more_than_one_instance_of_a_block_on_a_single_face(self):
        spotted = []
        for face in self.faces:
            for block in face.blocks:
                if face.blocks.count(block) > 1 and block not in spotted:
                    print(block, "appears", face.blocks.count(block), "times on", face.color)
                    print(map_block_with_each_face_by_initial_coords(self, block.x, block.y, block.z))
                    spotted.append(block)

    def rotate_one_face_clockwise(self, face):
        face.rotate_clockwise()

    def rotate_one_face_anticlockwise(self, face):
        face.rotate_anticlockwise()

    def check_is_solved(self):
        for face in self.faces:
            first_color = face.blocks[0].color
            for block in face.blocks:
                if block.color != first_color:
                    return False
        return True

    def create_blocks(self):
        n = self.power
        for y in range(n):
            for z in range(n):
                for x in range(n):
                    block = self.determine_block_type(x, y, z)
                    self.fill_faces(x, y, z, block)
        self.init_faces_colors()
        self.adjust_LUB_faces()

    def adjust_LUB_faces(self):
        """
        Adjustements must be made to put the left, up and back faces' blocks' lists in the same order than the other
        3 faces. These adjustements must be made whatever the size of the Rubiks object.
        These adjustements are necessary because each face's list of blocks is created and filled while
        iterating over x, y and z, therefore these three faces' lists' of blocks are not filled
        in the same order as the other three.
        """
        left_face = self.faces[0]
        back_face = self.faces[5]
        up_face = self.faces[2]
        self.swap_lines([left_face, back_face, up_face])
        up_face.blocks.reverse()

    def swap_lines(self, face_line_swap):
        for face in face_line_swap:
            for i in range(self.power):
                temp = face.blocks[i * self.power:i * self.power + self.power]
                temp.reverse()
                face.blocks[i * self.power:i * self.power + self.power] = temp

    def determine_block_type(self, x, y, z):
        """

        :param x: x coordinate of the block to form
        :param y: y
        :param z: z
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
            # used elif because count can never be anything but 0, 1, 2 or 3
            return CornerBlock(x, y, z)

    def fill_faces(self, x, y, z, block):
        """
        x=0 face gauche     #0 Gr   x=n face droite     #1 Bl
        y=0 face supérieure #2 Or   y=n face inférieure #3 Re
        z=0 face avant      #4 Wh   z=n face arrière    #5 Ye
        """
        n = self.power - 1
        if z == 0:  # face avant
            self.faces[4].add_block(block)
        if x == n:  # face droite
            self.faces[1].add_block(block)
        if y == n:  # face inférieure
            self.faces[3].add_block(block)

        if x == 0:  # face gauche
            self.faces[0].add_block(block)
        if y == 0:  # face supérieure
            self.faces[2].add_block(block)
        if z == n:  # face arrière
            self.faces[5].add_block(block)

    def init_faces_colors(self):
        for face in self.faces:
            face.init_blocks()

    def print_faces(self):
        for face in self.faces:
            print(face)
            print()

    def print_cube(self):
        """
        ne prend pas en compte la façon dont les couleurs
        sont gérées (imprimera toujours la couleur du block
        qui a été définie en premier, pas celle qui correspond
        à la face affichée)
        """
        n = self.power
        for x in range(n):
            for y in range(n):
                for z in range(n):
                    print(self.blocks[x][y][z].color, end="")
                print()
            print()

    def print_cube_alt(self):
        """
        Displays each faces side by side
        """
        faces_per_line = 3
        print(StringsMerger.print_from_list(self.faces, faces_per_line))

    def horizontal_rotation_clockwise(self, line):
        """
        line between 0 and self.power
        """
        n = self.power
        assert (0 <= line < n)
        faces_todo = [self.faces[0], self.faces[5], self.faces[1], self.faces[4]]
        blocks = []
        for i in range(len(faces_todo)):
            power_blocks = faces_todo[i].blocks[line * n:(n * (line + 1))]
            blocks.append(power_blocks)
        queue = blocks.pop()
        blocks.insert(0, queue)
        for i in range(len(faces_todo)):
            faces_todo[i].blocks[line * n:(n * (line + 1))] = blocks[i]
        if line == 0:
            self.rotate_one_face_clockwise(self.faces[2])
        elif line == n - 1:
            self.rotate_one_face_anticlockwise(self.faces[3])
        return self

    def vertical_rotation_clockwise(self, column):
        """
        supérieure #2   inférieure #3
        avant      #4   arrière    #5
        column between 0 and self.power
        """
        n = self.power
        assert (0 <= column < n)
        # les faces à traiter
        faces_todo = [self.faces[2], self.faces[4], self.faces[3], self.faces[5]]
        blocks = []
        for face in faces_todo:
            three_to_select_for_this_face = []
            for j in range(n):
                # nécessaire car la face arrière est en symétrie verticale par rapport à la face avant
                array_index = column + (n * j) if face != self.faces[5] \
                    else (n - column - 1) + (n * j)
                three_to_select_for_this_face.append(face.blocks[array_index])
            blocks.append(three_to_select_for_this_face)
        queue = blocks.pop()
        blocks.insert(0, queue)
        for face in faces_todo:
            for j in range(n):
                array_index = column + (n * j) \
                    if face != self.faces[5] \
                    else (n - column - 1) + (n * j)
                single_block = blocks[faces_todo.index(face)].pop(0) \
                    if face != self.faces[5] and face != self.faces[2] \
                    else blocks[faces_todo.index(face)].pop()
                face.blocks[array_index] = single_block
        if column == 0:
            self.rotate_one_face_clockwise(self.faces[0])
        elif column == n - 1:
            self.rotate_one_face_anticlockwise(self.faces[1])
        return self

    def shuffle(self, moves_max=3):
        list_of_moves = []
        for _ in itertools.repeat(None, moves_max):
            line_or_column_index = random.randint(0, self.power - 1)
            self.vertical_rotation_clockwise(random.randint(0, line_or_column_index))
            self.horizontal_rotation_clockwise(random.randint(0, line_or_column_index))
            list_of_moves.append(RotationVerticalClockwise(self, line_or_column_index))
            list_of_moves.append(RotationHorizontalClockwise(self, line_or_column_index))
        return list_of_moves

    def horizontal_rotation_anticlockwise(self, line):
        for _ in itertools.repeat(None, 3):
            self.horizontal_rotation_clockwise(line)
        return self

    def vertical_rotation_anticlockwise(self, column):
        for _ in itertools.repeat(None, 3):
            self.vertical_rotation_clockwise(column)
        return self
