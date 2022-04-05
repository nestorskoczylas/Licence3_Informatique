from Block.SideBlock import SideBlock


class CornerBlock(SideBlock):
    def __init__(self, x, y, z):
        SideBlock.__init__(self, x, y, z)
