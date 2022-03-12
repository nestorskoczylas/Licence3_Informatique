import sys
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *

class ButtonModel() :
    def __init__(self):
        self.idle = 1
        self.hover = 2
        self.pressIn = 3
        self.pressOut = 4
        
        self.state = self.idle
        
    def enter(self) :
        if self.state == self.idle:
            self.state = self.hover
        if self.state == self.pressOut:
            self.state = self.pressIn
        print("Enter")

    def leave(self) :
        if self.state == self.hover:
            self.state = self.idle
        if self.state == self.pressIn:
            self.state = self.pressOut
        print("Leave")
        
    def press(self) :
        if self.state == self.hover:
            self.state = self.pressIn
        print("Press")
        
    def release(self) :
        if self.state == self.pressOut:
            self.state = self.idle
        if self.state == self.pressIn:
            self.action()
            self.state = self.hover
        print("Release")
            
    def action(self) :
        print("Action")

        
        