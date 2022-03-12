from BlockColors import BlockColors


class Block:
    def __init__(self, x, y, z):
        """
        :param x: initial X coordinate
        :param y: initial Y coordinate
        :param z: initial Z coordinate
        """
        self.x = x
        self.y = y
        self.z = z
        self.color = None

    def __str__(self):
        """
        Implémenter ici le text/background colorés
        """
        if self.color == "D":
            self.color = BlockColors.down
        if self.color == "L":
            self.color = BlockColors.left
        if self.color == "R":
            self.color = BlockColors.right
        if self.color == "B":
            self.color = BlockColors.back
        if self.color == "F":
            self.color = BlockColors.front
        if self.color == "U":
            self.color = BlockColors.up
        return self.color

    def __repr__(self):
        return "{} @ [x:{} y:{} z:{}]".format(self.color, self.x, self.y, self.z)

    def __eq__(self, other):
        return self.x == other.x and \
               self.y == other.y and \
               self.z == other.z

    def __hash__(self):
        return self.x + 2*(1+self.y) + 3*(1+self.z)


def main():
    block = Block(1, 2, 3)
    print(block)


if __name__ == "__main__":
    main()
