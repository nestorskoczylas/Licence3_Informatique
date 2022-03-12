class Colors:
    reset = '\033[0m'
    bold = '\033[1m'


class Fg:
    black = '\033[30m'


class Bg:
    red = '\033[41m'
    green = '\033[42m'
    yellow = '\033[43m'
    cyan = '\033[46m'
    purple = '\033[45m'
    white = '\033[47m'


class BlockColors:
    down = "{0}{1}{2} D {3}".format(Colors.bold, Fg.black, Bg.red, Colors.reset)
    left = "{0}{1}{2} L {3}".format(Colors.bold, Fg.black, Bg.green, Colors.reset)
    back = "{0}{1}{2} B {3}".format(Colors.bold, Fg.black, Bg.yellow, Colors.reset)
    right = "{0}{1}{2} R {3}".format(Colors.bold, Fg.black, Bg.cyan, Colors.reset)
    up = "{0}{1}{2} U {3}".format(Colors.bold, Fg.black, Bg.purple, Colors.reset)
    front = "{0}{1}{2} F {3}".format(Colors.bold, Fg.black, Bg.white, Colors.reset)

