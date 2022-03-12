import copy
from abc import ABC, abstractmethod


class Rotation(ABC):
    def __init__(self, original, index):
        self.cube = copy.deepcopy(original)
        self.index = index

    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def opposite(self):
        pass

    def __repr__(self):
        #[8:-4] or [8:-8] removes all "rotation" and "wise" from module name (and removes "clock" if there is "Anti" in the module name)
        return "({0}:{1})".format(self.__module__[8:-8 if self.__module__.__contains__("Anti") else -4], self.index)

    def __eq__(self, other):
        return isinstance(other, self.__class__) and self.index == other.index

    def __hash__(self):
        return self.cube.__hash__() + self.__class__.__hash__() + self.index
