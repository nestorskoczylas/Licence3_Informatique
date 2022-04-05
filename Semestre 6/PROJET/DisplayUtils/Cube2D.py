from tkinter import *

from PuzzleAbstract.PocketCube import PocketCube
from PuzzleAbstract.RubiksCube import RubiksCube

# Définition des couleurs
red = 'red'
purple = 'purple'
white = 'white'
green = 'green'
yellow = 'yellow'
blue = 'blue'


# Définition des listes
CubeInProgress = []

ag = int(input(' Enter 0 for display PocketCube or 1 for display RubiksCube :\n '))
if ag == 0:
    cube = PocketCube()
    cube.shuffle(2)
elif ag == 1:
    cube = RubiksCube()
    cube.shuffle(2)

k = 0
m = 0
power = cube.power

width = 700
height = 900

i = 60
j = 60

window = Tk()
window.geometry(str(height) + "x" + str(width))
fond = Canvas(window, width=height, height=width, bg='#E4E4E4')
fond.pack(side=LEFT)


def CoordinateBlockToColorBlock(listCube):
    for k in range(power):
        for m in range(power):
            get_left_face_color(listCube)
            get_right_face_color(listCube)
            get_top_face_color(listCube)
            get_bottom_face_color(listCube)
            get_front_face_color(listCube)
            get_back_face_color(listCube)


def get_left_face_color(listCube):
    for k in range(power):
        for m in range(power):
            if cube.get_left_face().get_line(k)[m].color == " G ":
                listCube[0][k][m] = green
            if cube.get_left_face().get_line(k)[m].color == " B ":
                listCube[0][k][m] = blue
            if cube.get_left_face().get_line(k)[m].color == " P ":
                listCube[0][k][m] = purple
            if cube.get_left_face().get_line(k)[m].color == " R ":
                listCube[0][k][m] = red
            if cube.get_left_face().get_line(k)[m].color == " W ":
                listCube[0][k][m] = white
            if cube.get_left_face().get_line(k)[m].color == " Y ":
                listCube[0][k][m] = yellow


def get_right_face_color(listCube):
    for k in range(power):
        for m in range(power):
            if cube.get_right_face().get_line(k)[m].color == " G ":
                listCube[1][k][m] = green
            if cube.get_right_face().get_line(k)[m].color == " B ":
                listCube[1][k][m] = blue
            if cube.get_right_face().get_line(k)[m].color == " P ":
                listCube[1][k][m] = purple
            if cube.get_right_face().get_line(k)[m].color == " R ":
                listCube[1][k][m] = red
            if cube.get_right_face().get_line(k)[m].color == " W ":
                listCube[1][k][m] = white
            if cube.get_right_face().get_line(k)[m].color == " Y ":
                listCube[1][k][m] = yellow


def get_top_face_color(listCube):
    for k in range(power):
        for m in range(power):
            if cube.get_top_face().get_line(k)[m].color == " G ":
                listCube[2][k][m] = green
            if cube.get_top_face().get_line(k)[m].color == " B ":
                listCube[2][k][m] = blue
            if cube.get_top_face().get_line(k)[m].color == " P ":
                listCube[2][k][m] = purple
            if cube.get_top_face().get_line(k)[m].color == " R ":
                listCube[2][k][m] = red
            if cube.get_top_face().get_line(k)[m].color == " W ":
                listCube[2][k][m] = white
            if cube.get_top_face().get_line(k)[m].color == " Y ":
                listCube[2][k][m] = yellow


def get_bottom_face_color(listCube):
    for k in range(power):
        for m in range(power):
            if cube.get_bottom_face().get_line(k)[m].color == " G ":
                listCube[3][k][m] = green
            if cube.get_bottom_face().get_line(k)[m].color == " B ":
                listCube[3][k][m] = blue
            if cube.get_bottom_face().get_line(k)[m].color == " P ":
                listCube[3][k][m] = purple
            if cube.get_bottom_face().get_line(k)[m].color == " R ":
                listCube[3][k][m] = red
            if cube.get_bottom_face().get_line(k)[m].color == " W ":
                listCube[3][k][m] = white
            if cube.get_bottom_face().get_line(k)[m].color == " Y ":
                listCube[3][k][m] = yellow


def get_front_face_color(listCube):
    for k in range(power):
        for m in range(power):
            if cube.get_front_face().get_line(k)[m].color == " G ":
                listCube[4][k][m] = green
            if cube.get_front_face().get_line(k)[m].color == " B ":
                listCube[4][k][m] = blue
            if cube.get_front_face().get_line(k)[m].color == " P ":
                listCube[4][k][m] = purple
            if cube.get_front_face().get_line(k)[m].color == " R ":
                listCube[4][k][m] = red
            if cube.get_front_face().get_line(k)[m].color == " W ":
                listCube[4][k][m] = white
            if cube.get_front_face().get_line(k)[m].color == " Y ":
                listCube[4][k][m] = yellow


def get_back_face_color(listCube):
    for k in range(power):
        for m in range(power):
            if cube.get_back_face().get_line(k)[m].color == " G ":
                listCube[5][k][m] = green
            if cube.get_back_face().get_line(k)[m].color == " B ":
                listCube[5][k][m] = blue
            if cube.get_back_face().get_line(k)[m].color == " P ":
                listCube[5][k][m] = purple
            if cube.get_back_face().get_line(k)[m].color == " R ":
                listCube[5][k][m] = red
            if cube.get_back_face().get_line(k)[m].color == " W ":
                listCube[5][k][m] = white
            if cube.get_back_face().get_line(k)[m].color == " Y ":
                listCube[5][k][m] = yellow


""" RUBIKS CUBE DISPLAY """


def CubeSolve():
    index = 0
    for face in cube.faces:
        listFace = []
        for index in range(cube.power):
            listFace.append(face.get_line(index))
        CubeInProgress.append(listFace)
    CoordinateBlockToColorBlock(CubeInProgress)


CubeSolve()


def RubiksCube2D():
    global width, height

    # Face GREEN LEFT
    fond.create_rectangle(4 * i, 7 * j, 5 * i, 8 * j, outline='black', fill=CubeInProgress[0][0][2])
    fond.create_rectangle(4 * i, 8 * j, 5 * i, 9 * j, outline='black', fill=CubeInProgress[0][0][1])
    fond.create_rectangle(4 * i, 9 * j, 5 * i, 10 * j, outline='black', fill=CubeInProgress[0][0][0])
    fond.create_rectangle(5 * i, 7 * j, 6 * i, 8 * j, outline='black', fill=CubeInProgress[0][1][2])
    fond.create_rectangle(5 * i, 8 * j, 6 * i, 9 * j, outline='black', fill=CubeInProgress[0][1][1])
    fond.create_rectangle(5 * i, 9 * j, 6 * i, 10 * j, outline='black', fill=CubeInProgress[0][1][0])
    fond.create_rectangle(6 * i, 7 * j, 7 * i, 8 * j, outline='black', fill=CubeInProgress[0][2][2])
    fond.create_rectangle(6 * i, 8 * j, 7 * i, 9 * j, outline='black', fill=CubeInProgress[0][2][1])
    fond.create_rectangle(6 * i, 9 * j, 7 * i, 10 * j, outline='black', fill=CubeInProgress[0][2][0])

    # Face BLUE RIGHT
    fond.create_rectangle(4 * i, 1 * j, 5 * i, 2 * j, outline='black', fill=CubeInProgress[1][0][2])
    fond.create_rectangle(4 * i, 2 * j, 5 * i, 3 * j, outline='black', fill=CubeInProgress[1][0][1])
    fond.create_rectangle(4 * i, 3 * j, 5 * i, 4 * j, outline='black', fill=CubeInProgress[1][0][0])
    fond.create_rectangle(5 * i, 1 * j, 6 * i, 2 * j, outline='black', fill=CubeInProgress[1][1][2])
    fond.create_rectangle(5 * i, 2 * j, 6 * i, 3 * j, outline='black', fill=CubeInProgress[1][1][1])
    fond.create_rectangle(5 * i, 3 * j, 6 * i, 4 * j, outline='black', fill=CubeInProgress[1][1][0])
    fond.create_rectangle(6 * i, 1 * j, 7 * i, 2 * j, outline='black', fill=CubeInProgress[1][2][2])
    fond.create_rectangle(6 * i, 2 * j, 7 * i, 3 * j, outline='black', fill=CubeInProgress[1][2][1])
    fond.create_rectangle(6 * i, 3 * j, 7 * i, 4 * j, outline='black', fill=CubeInProgress[1][2][0])

    # Face PURPLE UP
    fond.create_rectangle(1 * i, 4 * j, 2 * i, 5 * j, outline='black', fill=CubeInProgress[2][0][2])
    fond.create_rectangle(1 * i, 5 * j, 2 * i, 6 * j, outline='black', fill=CubeInProgress[2][0][1])
    fond.create_rectangle(1 * i, 6 * j, 2 * i, 7 * j, outline='black', fill=CubeInProgress[2][0][0])
    fond.create_rectangle(2 * i, 4 * j, 3 * i, 5 * j, outline='black', fill=CubeInProgress[2][1][2])
    fond.create_rectangle(2 * i, 5 * j, 3 * i, 6 * j, outline='black', fill=CubeInProgress[2][1][1])
    fond.create_rectangle(2 * i, 6 * j, 3 * i, 7 * j, outline='black', fill=CubeInProgress[2][1][0])
    fond.create_rectangle(3 * i, 4 * j, 4 * i, 5 * j, outline='black', fill=CubeInProgress[2][2][2])
    fond.create_rectangle(3 * i, 5 * j, 4 * i, 6 * j, outline='black', fill=CubeInProgress[2][2][1])
    fond.create_rectangle(3 * i, 6 * j, 4 * i, 7 * j, outline='black', fill=CubeInProgress[2][2][0])

    # Face RED DOWN
    fond.create_rectangle(7 * i, 4 * j, 8 * i, 5 * j, outline='black', fill=CubeInProgress[3][0][2])
    fond.create_rectangle(7 * i, 5 * j, 8 * i, 6 * j, outline='black', fill=CubeInProgress[3][0][1])
    fond.create_rectangle(7 * i, 6 * j, 8 * i, 7 * j, outline='black', fill=CubeInProgress[3][0][0])
    fond.create_rectangle(8 * i, 4 * j, 9 * i, 5 * j, outline='black', fill=CubeInProgress[3][1][2])
    fond.create_rectangle(8 * i, 5 * j, 9 * i, 6 * j, outline='black', fill=CubeInProgress[3][1][1])
    fond.create_rectangle(8 * i, 6 * j, 9 * i, 7 * j, outline='black', fill=CubeInProgress[3][1][0])
    fond.create_rectangle(9 * i, 4 * j, 10 * i, 5 * j, outline='black', fill=CubeInProgress[3][2][2])
    fond.create_rectangle(9 * i, 5 * j, 10 * i, 6 * j, outline='black', fill=CubeInProgress[3][2][1])
    fond.create_rectangle(9 * i, 6 * j, 10 * i, 7 * j, outline='black', fill=CubeInProgress[3][2][0])

    # Face WHITE FRONT
    fond.create_rectangle(4 * i, 4 * j, 5 * i, 5 * j, outline='black', fill=CubeInProgress[4][0][2])
    fond.create_rectangle(4 * i, 5 * j, 5 * i, 6 * j, outline='black', fill=CubeInProgress[4][0][1])
    fond.create_rectangle(4 * i, 6 * j, 5 * i, 7 * j, outline='black', fill=CubeInProgress[4][0][0])
    fond.create_rectangle(5 * i, 4 * j, 6 * i, 5 * j, outline='black', fill=CubeInProgress[4][1][2])
    fond.create_rectangle(5 * i, 5 * j, 6 * i, 6 * j, outline='black', fill=CubeInProgress[4][1][1])
    fond.create_rectangle(5 * i, 6 * j, 6 * i, 7 * j, outline='black', fill=CubeInProgress[4][1][0])
    fond.create_rectangle(6 * i, 4 * j, 7 * i, 5 * j, outline='black', fill=CubeInProgress[4][2][2])
    fond.create_rectangle(6 * i, 5 * j, 7 * i, 6 * j, outline='black', fill=CubeInProgress[4][2][1])
    fond.create_rectangle(6 * i, 6 * j, 7 * i, 7 * j, outline='black', fill=CubeInProgress[4][2][0])

    # Face YELLOW BACK
    fond.create_rectangle(10 * i, 4 * j, 11 * i, 5 * j, outline='black', fill=CubeInProgress[5][0][0])
    fond.create_rectangle(10 * i, 5 * j, 11 * i, 6 * j, outline='black', fill=CubeInProgress[5][0][1])
    fond.create_rectangle(10 * i, 6 * j, 11 * i, 7 * j, outline='black', fill=CubeInProgress[5][0][2])
    fond.create_rectangle(11 * i, 4 * j, 12 * i, 5 * j, outline='black', fill=CubeInProgress[5][1][0])
    fond.create_rectangle(11 * i, 5 * j, 12 * i, 6 * j, outline='black', fill=CubeInProgress[5][1][1])
    fond.create_rectangle(11 * i, 6 * j, 12 * i, 7 * j, outline='black', fill=CubeInProgress[5][1][2])
    fond.create_rectangle(12 * i, 4 * j, 13 * i, 5 * j, outline='black', fill=CubeInProgress[5][2][0])
    fond.create_rectangle(12 * i, 5 * j, 13 * i, 6 * j, outline='black', fill=CubeInProgress[5][2][1])
    fond.create_rectangle(12 * i, 6 * j, 13 * i, 7 * j, outline='black', fill=CubeInProgress[5][2][2])


""" POCKET CUBE DISPLAY """


def PocketCube2D():
    global width, height

    # Face GREEN LEFT
    fond.create_rectangle(4 * i, 6 * j, 5 * i, 7 * j, outline='black', fill=CubeInProgress[0][0][1])
    fond.create_rectangle(4 * i, 7 * j, 5 * i, 8 * j, outline='black', fill=CubeInProgress[0][0][0])
    fond.create_rectangle(5 * i, 6 * j, 6 * i, 7 * j, outline='black', fill=CubeInProgress[0][1][1])
    fond.create_rectangle(5 * i, 7 * j, 6 * i, 8 * j, outline='black', fill=CubeInProgress[0][1][0])

    # Face BLUE RIGHT
    fond.create_rectangle(4 * i, 2 * j, 5 * i, 3 * j, outline='black', fill=CubeInProgress[1][0][1])
    fond.create_rectangle(4 * i, 3 * j, 5 * i, 4 * j, outline='black', fill=CubeInProgress[1][0][0])
    fond.create_rectangle(5 * i, 2 * j, 6 * i, 3 * j, outline='black', fill=CubeInProgress[1][1][1])
    fond.create_rectangle(5 * i, 3 * j, 6 * i, 4 * j, outline='black', fill=CubeInProgress[1][1][0])

    # Face PURPLE UP
    fond.create_rectangle(2 * i, 4 * j, 3 * i, 5 * j, outline='black', fill=CubeInProgress[2][0][1])
    fond.create_rectangle(2 * i, 5 * j, 3 * i, 6 * j, outline='black', fill=CubeInProgress[2][0][0])
    fond.create_rectangle(3 * i, 4 * j, 4 * i, 5 * j, outline='black', fill=CubeInProgress[2][1][1])
    fond.create_rectangle(3 * i, 5 * j, 4 * i, 6 * j, outline='black', fill=CubeInProgress[2][1][0])

    # Face RED DOWN
    fond.create_rectangle(6 * i, 4 * j, 7 * i, 5 * j, outline='black', fill=CubeInProgress[3][0][1])
    fond.create_rectangle(6 * i, 5 * j, 7 * i, 6 * j, outline='black', fill=CubeInProgress[3][0][0])
    fond.create_rectangle(7 * i, 4 * j, 8 * i, 5 * j, outline='black', fill=CubeInProgress[3][1][1])
    fond.create_rectangle(7 * i, 5 * j, 8 * i, 6 * j, outline='black', fill=CubeInProgress[3][1][0])

    # Face WHITE FRONT
    fond.create_rectangle(4 * i, 4 * j, 5 * i, 5 * j, outline='black', fill=CubeInProgress[4][0][1])
    fond.create_rectangle(4 * i, 5 * j, 5 * i, 6 * j, outline='black', fill=CubeInProgress[4][0][0])
    fond.create_rectangle(5 * i, 4 * j, 6 * i, 5 * j, outline='black', fill=CubeInProgress[4][1][1])
    fond.create_rectangle(5 * i, 5 * j, 6 * i, 6 * j, outline='black', fill=CubeInProgress[4][1][0])

    # Face YELLOW BACK
    fond.create_rectangle(8 * i, 4 * j, 9 * i, 5 * j, outline='black', fill=CubeInProgress[5][0][0])
    fond.create_rectangle(8 * i, 5 * j, 9 * i, 6 * j, outline='black', fill=CubeInProgress[5][0][1])
    fond.create_rectangle(9 * i, 4 * j, 10 * i, 5 * j, outline='black', fill=CubeInProgress[5][1][0])
    fond.create_rectangle(9 * i, 5 * j, 10 * i, 6 * j, outline='black', fill=CubeInProgress[5][1][1])


if ag == 0:
    PocketCube2D()
elif ag == 1:
    RubiksCube2D()


# Close window
close_window = Button(window, text="Exit", command=window.destroy)
fond.create_window(40, 20, window=close_window)


window.mainloop()
