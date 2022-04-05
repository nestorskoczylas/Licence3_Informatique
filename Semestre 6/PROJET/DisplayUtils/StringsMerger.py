import datetime
import sys

"""
This file is better used to concatenate each line of several strings, allowing to display them 
in a spreadsheet-like fashion, i.e. each given string will form a "column" of fixed size, and other strings'
columns will not be on any other's strings column.
You may use the generate_two_example_strings(number) function in the main to see the result. 
You may also use string_from_list_of_elements() to feed the script a list of any type of elements and return it
as a string and chose a specific number of desired columns for a display.
This was used several times for the Rubik's model representation (a Face is a list of Blocks, a Rubik's element
is a list of Faces...).
"""


def generate_two_example_strings(n):
    """
    Returns a list of strings of different lengths and each having a different amount of lines. A good way
    to see how the script performs when fed unevenly sized strings.
    """
    result1 = ""
    result2 = ""
    for i in range(0, n):
        result1 += ("\n" if i != 0 else "") + "Nous sommes le {}".format(datetime.date.today())
        result2 += ("\n" if i != 0 else "") + "bjr {}".format(i)
    result2 += "\nvoulez vous du\nbeau poisson?\nNon vraiment? merci quand même"
    result1 += "\n\n\nVous connaissez Groland?"
    result4 = " | OGW @ [x:0 y:2 z:0] | GW @ [x:0 y:2 z:1] | YGW @ [x:0 y:2 z:2] |\n" \
              " | OGB @ [x:2 y:2 z:0] | GB @ [x:2 y:2 z:1] | YGB @ [x:2 y:2 z:2] |\n" \
              " | ORB @ [x:2 y:0 z:0] | RB @ [x:2 y:0 z:1] | YRB @ [x:2 y:0 z:2] |\n"
    result3 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n" \
              "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n" \
              "when an unknown printer took a galley of type and\n" \
              "scrambled it to make a type specimen book. It has survived\n" \
              "not only five centuries, but also the leap into electronic typesetting.\n"
    return [result1, result2, result3, result4]


def __determine_longest_line(string_array):
    longest_first_line = 0
    for line in string_array:
        curr_size = len(line)
        if curr_size > longest_first_line:
            longest_first_line = curr_size
    return longest_first_line


def __get_arrays_of_each_lines(str1, str2):
    str_array1 = str1.split("\n")
    str_array2 = str2.split("\n")
    return str_array1, str_array2


def __build_combination_from_two_arrays(array1, array2, longest_first_line, spacing, separator):
    res_final = ""
    if separator:
        spacing //= 2
        separator_then_spaces = separator + spacing * " "
    for i in range(0, len(array1)):
        half_or_full_spaces = " " * (spacing + longest_first_line - len(array1[i]))
        spaces = half_or_full_spaces + (separator_then_spaces if separator else "")
        res_final += array1[i] + spaces + (array2[i] if i < len(array2) else "") + ("\n" if i < len(array1) - 1 else "")
    return res_final


def __add_separator_first_array(str_array1, separator, spacing):
    for i in range(0, len(str_array1)):
        str_array1[i] += (" " * spacing) + separator


def __combine_two_strings_on_one_line(str1, str2, spacing, separator):
    """
    :str1:      first string to be combined with str2
    :str2:      second string
    :spacing:   number of spaces to put on one line between the string of str1 and the string of str2
    :separator: character or string to put between each "column" of strings
    """
    str_array1, str_array2 = __get_arrays_of_each_lines(str1, str2)

    longest_line_first_array = __determine_longest_line(str_array1)

    return __build_combination_from_two_arrays(str_array1, str_array2, longest_line_first_array, spacing, separator)


def string_from_list_of_elements(some_list, required_columns, spaces=2, separator=None):
    """
    Feed it a list of elements, like a list of Faces for instance, and it will return a nice string where each
    first line of each element is showing side by side (e.g. each line of each face side by side)
    :param some_list: list of any kind of elements, as long as their string representation is nicely implemented
    :param required_columns: number of desired columns, to avoid having a hugely wide string
    :param spaces: number of spaces between each color
    :param separator: optional separator, for instance "|". Better used with a single character
    :return: the concatenated string, where each line of each element's string appears on the same line, side by side
    """
    list_copy = some_list.copy()
    nb_elms = len(some_list)
    elem_per_column = int(nb_elms / required_columns)
    wanted_lines = elem_per_column if nb_elms >= required_columns else 1
    final = ""
    for i in range(wanted_lines):
        resulting_string_list = []
        first_n = []
        for j in range(required_columns):
            if len(list_copy) > 0:
                first_n.append(list_copy.pop(0))
        for element in first_n:
            resulting_string_list.append(str(element))
        final = "{0}{1}".format(final, main(spaces, resulting_string_list, separator))
        final += "\n" if i < wanted_lines - 1 else ""
    return final


def main(spaces, str_list, separator=None):
    """
    You should avoid using very long lines or too many different strings, as it will probably not
    allow for a great looking display

    :param spaces: number of spaces between each columns of string
    :param str_list: list of all strings to be displayed side-by-side
    :param separator: optional separator, for instance "|". Better used with a single character
    """

    # str_list = generate_two_example_strings(5)
    if len(str_list):
        result = str_list.pop(0)
        while len(str_list) > 0:
            result = __combine_two_strings_on_one_line(result, str_list.pop(0), spaces, separator)
        # print(result)
        return result
    else:  # to avoid popping on an empty list
        print("You gave no strings...")
        return ""


if __name__ == "__main__":
    main(sys.argv)
