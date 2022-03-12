from PyQt5.QtGui import *

class Trace():
    def __init__(self, wid, color):
        self.points = []
        self.width = wid
        self.color = color