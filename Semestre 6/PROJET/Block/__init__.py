class Block:
    def __init__(self, x, y, z):
        """
        A Block is defined by its ORIGINAL coordinates (at creation of the Rubik's element it's part of).
        A Block's coordinates attributes DO NOT CHANGE when the Rubik's element is manipulated.
        A Block object only has one color (like a sticker). Within the Rubik's element it's part of, the Block is
        copied in multiple instances (as many as there are faces it appears on). It allows easy switching of the
        colors during the Rubik's element manipulation, while still keeping the information of the Block's identity
        thanks to its original coordinates.
        :param x: original X coordinate
        :param y: original Y coordinate
        :param z: original Z coordinate
        """
        self.x = x
        self.y = y
        self.z = z
        self.color = None

    def __str__(self):
        return self.color if self.color else "[x:{} y:{} z:{}]".format(self.x, self.y, self.z)

    def __repr__(self):
        return "{} @ [x:{} y:{} z:{}]".format(self.color, self.x, self.y, self.z)

    def __eq__(self, other):
        """
        A Block is characterized by its ORIGINAL coordinates.
        """
        return self.x == other.x and \
               self.y == other.y and \
               self.z == other.z

    def __hash__(self):
        return self.x + 2 * (1 + self.y) + 3 * (1 + self.z)