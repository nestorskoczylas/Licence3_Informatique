import sys
from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *

from ButtonModel import *

#TP 2
# SKOCZYLAS Nestor & FRET Gaëlle
  
class CanvasButton(QWidget):
    def __init__(self):
        super().__init__()
        self.bbox = QRect(5,5,140,120)
    
        self.defaultColor = QColor("blue")
        self.hoverColor = QColor("yellow")
        self.releaseColor = QColor("pink")
        
        self.buttonModel = ButtonModel()
        
        self.cursorOver = False
        
        self.setMouseTracking(True)
        
    def mouseMoveEvent(self, event):
        self.cursorOnEllipse(event.pos())
        self.update()
        

    def mousePressEvent(self, event):
        self.buttonModel.press()
        self.update()
            
    def mouseReleaseEvent(self, event):
        self.buttonModel.release()
        self.update()
        
    def paintEvent(self, event) :
        painter = QPainter(self)
        if self.buttonModel.state == self.buttonModel.idle :
            painter.setBrush(self.defaultColor)
        elif self.buttonModel.state == self.buttonModel.hover :
            painter.setBrush(self.hoverColor)
        elif self.buttonModel.state == self.buttonModel.pressIn :
            painter.setBrush(self.releaseColor)
        elif self.buttonModel.state == self.buttonModel.pressOut :
            painter.setBrush(self.releaseColor)
        else :
            painter.setBrush(self.defaultColor)
            
        pen = QPen(Qt.red)
        pen.setWidth(5)
        painter.setPen(pen)
        painter.drawEllipse(0, 0, 100, 130)
        
    def cursorOnEllipse(self, point) :
        ellipse = QRegion(self.bbox, QRegion.Ellipse) 
        if ellipse.contains(point):
            self.cursorOver = True
            self.buttonModel.enter()
        else :
            self.cursorOver = False
            self.buttonModel.leave()
        

def main(args):
    app = QApplication(args)
    win = QMainWindow()
    
    can = CanvasButton()
    win.setCentralWidget(can)
    win.resize(300,400)
    win.show()
    app.exec()

if __name__ == "__main__":
    #print(sys.argv)
    main(sys.argv)