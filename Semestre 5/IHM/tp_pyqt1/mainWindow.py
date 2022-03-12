import sys
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *

# TP1
# SKOCZYLAS Nestor & FRET Gaëlle

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.resize(200,300)
        self.textEdit = QTextEdit(self)
        bar = self.menuBar()
        fileMenu = bar.addMenu("File")
        fileToolBar = self.addToolBar("File")

        actNewFile = QAction(QIcon("new.png"), "New…", self)
        actNewFile.setShortcut("Ctrl+N")
        actNewFile.setToolTip("New File")
        actNewFile.setStatusTip("New file")
        fileMenu.addAction(actNewFile)
        fileToolBar.addAction(actNewFile)
        actNewFile.triggered.connect(open)

        actCopy = QAction(QIcon("copy.png"), "Copy…", self)
        actCopy.setShortcut("Ctrl+C")
        actCopy.setToolTip("Copy")
        actCopy.setStatusTip("Copy")
        fileMenu.addAction(actCopy)
        fileToolBar.addAction(actCopy)
        #actCopy.triggered.connect(file_open)

        actOpen = QAction(QIcon("open.png"), "Open…", self)
        actOpen.setShortcut("Ctrl+O")
        actOpen.setToolTip("Open")
        actOpen.setStatusTip("Open")
        fileMenu.addAction(actOpen)
        fileToolBar.addAction(actOpen)
        actOpen.triggered.connect(self.openFile)

        actQuit = QAction(QIcon("quit.png"), "Quit…", self)
        actQuit.setShortcut("Ctrl+Q")
        actQuit.setToolTip("Quit")
        actQuit.setStatusTip("Quit")
        fileMenu.addAction(actQuit)
        fileToolBar.addAction(actQuit)
        actQuit.triggered.connect(self.quitApp)

        actSave = QAction(QIcon("save.png"), "Save…", self)
        actSave.setShortcut("Ctrl+S")
        actSave.setToolTip("Save")
        actSave.setStatusTip("Save")
        fileMenu.addAction(actSave)
        fileToolBar.addAction(actSave)
        actSave.triggered.connect(self.saveFile)


        self.setCentralWidget(self.textEdit)
        
        self.statusBar = QStatusBar()
        self.setStatusBar(self.statusBar)
        
        

    def openFile(self):
        name = QFileDialog.getOpenFileName(self, "Open File", "./", "*.png")
        file = QFile(name[0], 'r')
        file.open(QFile.ReadOnly)
        stream = QTextStream(file)
        self.textEdit.setHtml(stream.readAll())
        file.close()
    
    def saveFile(self):
        save = QFileDialog.getSaveFileName(self, "Save File","./")
        file = open(save[0], 'w')
        text = self.textEdit.toPlainText()
        file.write(text)
        file.close()
        
    def quitApp(self):
        msgBox = QMessageBox()
        msgBox.setIcon(QMessageBox.Information)
        msgBox.setText("Are you sure you want to close the window?")
        msgBox.setWindowTitle("Window Close")
        msgBox.setStandardButtons(QMessageBox.Yes | QMessageBox.No)
        msgBox.button(msgBox.Yes).clicked.connect(QApplication.quit)
        msgBox.exec()
            
    
    def closeEvent(self, event):
        event.ignore()
        self.quitApp()
        

                    

def main(args):
    app = QApplication(args)
    win = MainWindow()
    win.show()
    app.exec()

if __name__ == "__main__":
    #print(sys.argv)
    main(sys.argv)

#Q1. Il ne faut pas oublier d'appeler main(sys.argv) dans le if
# On voit ['mainWindow.py', 'argv']

#Q2.1 Ajouter un super dans le constructeur
#Q2.2 La fenêtre s'affiche :/

#Q4. triggered.connect()

#Q6. Mettre self.textEdit = QTextEdit(self) dans l'initialisation


