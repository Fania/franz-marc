'use strict';

let bodyCont = document.getElementsByTagName('body')[0];
const marc_svg = document.getElementById('marc');
const [...blocks] = document.getElementById('colour_blocks').children;
const [...gradients] = document.getElementById('gradients').children;
const [...buttons] = document.getElementsByName('buttons');
const menuElem = document.getElementById('menu');
const rangeButt = document.getElementById('auto_range');
const picker = document.getElementById('col_picker');
const urlParams = new URLSearchParams(window.location.search);
// console.log(`There are a total of ${blocks.length} colour blocks.`);
// console.log(`And there are ${gradients.length} unique gradients.`);


const defaults = {
  'a_button_state': 'original',
  'beige_arc_small': 'fill: rgb(191, 178, 127)',
  'beige_beam_diagonal': 'fill: rgb(247, 247, 219)',
  'beige_filler_right': 'fill: rgb(247, 248, 149)',
  'beige_vertical_block': 'fill: rgb(251, 249, 175)',
  'big_dark_blue_white_block': 'fill: url(#white_darkblue_fade)',
  'black_arc_small': 'fill: rgb(10, 16, 14)',
  'black_back_block_right': 'fill: rgb(9, 19, 19)',
  'black_bit': 'fill: rgb(11, 18, 18)',
  'black_block_left': 'fill: rgb(10, 15, 13)',
  'black_block_small': 'fill: rgb(9, 18, 15)',
  'black_blue_fade': ['stop-color: rgb(13, 35, 74)','stop-color: rgb(8, 15, 13)'],
  'black_blue_white_fade': ['stop-color: rgb(11, 21, 30)','stop-color: rgb(15, 30, 46)','stop-color: rgb(20, 41, 154)','stop-color: rgb(25, 97, 169)'],
  'black_cone5': 'fill: url(#black_transparent_fade)',
  'black_front_triangle_right': 'fill: url(#black_blue_fade)',
  'black_green_white_diagonal': 'fill: url(#black_green_white_fade)',
  'black_green_white_diagonal2': 'fill: url(#black_green_white2_fade)',
  'black_green_white_fade': ['stop-color: rgb(182, 185, 179)','stop-color: rgb(94, 126, 128)','stop-color: rgb(25, 65, 60)','stop-color: rgb(10, 20, 19)','stop-color: rgb(10, 20, 19)'],
  'black_green_white2_fade': ['stop-color: rgb(182, 185, 179)','stop-color: rgb(94, 126, 128)','stop-color: rgb(25, 65, 60)','stop-color: rgb(10, 20, 19)','stop-color: rgb(10, 20, 19)'],
  'black_pink_white_block': 'fill: url(#black_pink_white_fade)',
  'black_pink_white_fade': ['stop-color: rgb(27, 18, 33)','stop-color: rgb(159, 33, 64)','stop-color: rgb(222, 128, 172)','stop-color: rgb(235, 179, 205)'],
  'black_transparent_fade': ['stop-color: rgb(11, 18, 18)','stop-color: rgb(11, 18, 18)','stop-color: rgb(11, 18, 18)','stop-color: rgb(11, 18, 18)'],
  'black_transparent_shadow': 'fill: url(#black_transparent_fade)',
  'black_transparent2_fade': ['stop-color: rgb(11, 18, 18)','stop-color: rgb(11, 18, 18)'],
  'black_transparent3_fade': ['stop-color: rgb(11, 18, 18)','stop-color: rgb(11, 18, 18)'],
  'blue_light_green_arc': 'fill: url(#blue_light_green_fade)',
  'blue_light_green_fade': ['stop-color: rgb(21, 45, 133)','stop-color: rgb(105, 151, 213)','stop-color: rgb(123, 145, 83)'],
  'blue_line': 'fill: rgb(58, 117, 167);',
  'blue_pink_next_to_rose_area': 'fill: url(#blue_pink_next_to_rose_area_fade)',
  'blue_pink_next_to_rose_area_fade': ['stop-color: rgb(36, 38, 94)','stop-color: rgb(76, 86, 157)','stop-color: rgb(167, 45, 108)','stop-color: rgb(181, 90, 149)','stop-color: rgb(39, 123, 192)','stop-color: rgb(19, 51, 100)','stop-color: rgb(65, 112, 155)'],
  'blue_purple_fade': ['stop-color: rgb(25, 43, 135)','stop-color: rgb(92, 34, 121)','stop-color: rgb(92, 34, 121)','stop-color: rgb(25, 43, 135)'],
  'blue_purple_long_block': 'fill: url(#blue_purple_fade)',
  'blue_sky_block': 'fill: url(#lightblue_darkblue_fade)',
  'blue_yellow_fade': ['stop-color: rgb(121, 166, 204)','stop-color: rgb(187, 165, 67)'],
  'blue_yellow_gradient_block': 'fill: url(#blue_yellow_fade)',
  'bright_blue_block': 'fill: url(#black_blue_white_fade)',
  'bright_lilac_block': 'fill: rgb(226, 178, 176)',
  'bright_yellow_block': 'fill: rgb(252, 219, 8)',
  'brightgreen_beam_above_fawn': 'fill: rgb(141, 198, 31)',
  'brightyellow_white_triangle_right': 'fill: url(#brightyellow_white_triangle_right_fade)',
  'brightyellow_white_triangle_right_fade': ['stop-color: rgb(236, 200, 30)','stop-color: rgb(249, 204, 9)','stop-color: rgb(248, 223, 80)','stop-color: rgb(255, 255, 241)'],
  'brown_block_next_to_orange_leaf': 'fill: rgb(90, 72, 88)',
  'brown_ochre_fade': ['stop-color: rgb(78, 29, 37)','stop-color: rgb(125, 68, 44)','stop-color: rgb(161, 114, 48)','stop-color: rgb(161, 114, 48)'],
  'brown_triangle_large': 'fill: url(#brown_ochre_fade)',
  'brown_white_green_corner': 'fill: url(#brown_white_green_corner_fade)',
  'brown_white_green_corner_fade': ['stop-color: rgb(255, 255, 255)','stop-color: rgb(37, 88, 52)','stop-color: rgb(49, 40, 22)','stop-color: rgb(30, 45, 29)','stop-color: rgb(42, 49, 30)','stop-color: rgb(54, 55, 37)','stop-color: rgb(60, 59, 40)'],
  'dark_black_blue_center_block': 'fill: url(#dark_black_blue_center_block_fade)',
  'dark_black_blue_center_block_fade': ['stop-color: rgb(4, 26, 37)','stop-color: rgb(8, 15, 13)'],
  'dark_black_blue_center_green_arc_top_block': 'fill: url(#dark_black_blue_center_green_arc_top_block_fade)',
  'dark_black_blue_center_green_arc_top_block_fade': ['stop-color: rgb(11, 102, 51)','stop-color: rgb(3, 73, 66)'],
  'dark_black_blue_center_sideblock': 'fill: rgb(7, 16, 13);',
  'dark_block_behind_white_branch': 'fill: url(#dark_block_behind_white_branch_fade)',
  'dark_block_behind_white_branch_fade': ['stop-color: rgb(5, 21, 25)','stop-color: rgb(7, 139, 133)'],
  'dark_blue_block': 'fill: rgb(12, 26, 62)',
  'dark_mountain': 'fill: url(#dark_mountain_fade)',
  'dark_mountain_fade': ['stop-color: rgb(19, 79, 85)','stop-color: rgb(6, 50, 54)','stop-color: rgb(6, 17, 13)'],
  'darkgreen_areas_near_fawn_face': 'fill: rgb(8, 30, 28)',
  'darkgreen_black_cone': 'fill: rgb(12, 67, 47)',
  'darkgreen_black_cone_fade': ['stop-color: rgb(5, 18, 22)','stop-color: rgb(9, 51, 40)','stop-color: rgb(15, 89, 48)','stop-color: rgb(42, 125, 74)','stop-color: rgb(5, 18, 22)','stop-color: rgb(9, 51, 40)','stop-color: rgb(15, 89, 48)','stop-color: rgb(42, 125, 74)','stop-color: rgb(5, 18, 22)','stop-color: rgb(9, 51, 40)','stop-color: rgb(15, 89, 48)','stop-color: rgb(42, 125, 74)'],
  'darkgreen_black_cone2': 'fill: url(#darkgreen_black_cone_fade)',
  'darkgreen_black_cone3': 'fill: url(#darkgreen_black_cone_fade)',
  'darkgreen_black_cone4': 'fill: url(#darkgreen_black_cone_fade)',
  'darkgreen_block_next_to_fawn': 'fill: url(#darkgreen_block_next_to_fawn_fade)',
  'darkgreen_block_next_to_fawn_fade': ['stop-color: rgb(8, 14, 14)','stop-color: rgb(13, 61, 40)'],
  'darkgreen_filler_line': 'fill: rgb(4, 53, 33)',
  'darkgreen_lightgreen_block': 'fill: url(#darkgreen_lightgreen_fade)',
  'darkgreen_lightgreen_fade': ['stop-color: rgb(21, 35, 36)','stop-color: rgb(61, 133, 106)'],
  'darkmint_block_right': 'fill: rgb(13, 63, 48)',
  'fawn_behind_ear': 'fill: url(#fawn_behind_ear_fade)',
  'fawn_behind_ear_fade': ['stop-color: rgb(133, 180, 124)','stop-color: rgb(133, 180, 124)','stop-color: rgb(133, 180, 124)'],
  'fawn_behind_ear_fade2': ['stop-color: rgb(48, 85, 48)','stop-color: rgb(48, 85, 48)','stop-color: rgb(48, 85, 48)','stop-color: rgb(48, 85, 48)'],
  'fawn_behind_ear2': 'fill: url(#fawn_behind_ear_fade2)',
  'fawn_body_brown_dots1': 'fill: rgba(112, 100, 70, 0.5)',
  'fawn_body_brown_dots2': 'fill: rgba(112, 100, 70, 0.5)',
  'fawn_body_brown_dots3': 'fill: rgba(112, 100, 70, 0.5)',
  'fawn_body_brown_dots4': 'fill: rgba(112, 100, 70, 0.5)',
  'fawn_body_green_yellow_layer': 'fill: url(#fawn_body_green_yellow_layer_fade)',
  'fawn_body_green_yellow_layer_fade': ['stop-color: rgb(208, 205, 74)','stop-color: rgb(77, 145, 86)','stop-color: rgb(17, 94, 75)'],
  'fawn_body_white_corner': 'fawn_body_white_transparent_corner_fade',
  'fawn_body_white_spots1': 'fill: rgba(240, 240, 240, 0.7)',
  'fawn_body_white_spots2': 'fill: rgba(240, 240, 240, 0.7)',
  'fawn_body_white_spots3': 'fill: rgba(240, 240, 240, 0.7)',
  'fawn_body_white_transparent_corner_fade': ['stop-color: rgb(231, 231, 198)','stop-color: rgb(231, 231, 198)','stop-color: rgb(229, 251, 255)','stop-color: rgb(229, 251, 255)'],
  'fawn_body_white_transparent_layer': 'fill: url(#fawn_body_white_transparent_layer_fade)',
  'fawn_body_white_transparent_layer_fade': ['stop-color: rgb(231, 231, 198)','stop-color: rgb(180, 180, 130)','stop-color: rgb(180, 180, 130)','stop-color: rgb(180, 180, 130)'],
  'fawn_body_yellow_transparent_layer': 'fill: url(#fawn_body_yellow_transparent_layer_fade)',
  'fawn_body_yellow_transparent_layer_fade': ['stop-color: rgb(171, 147, 112)','stop-color: rgb(171, 147, 112)','stop-color: rgb(171, 147, 112)','stop-color: rgb(171, 147, 112)'],
  'fawn_ear_inner_white': 'fill: rgb(196, 236, 197)',
  'fawn_ear_outer_green': 'fill: rgb(60, 146, 106)',
  'fawn_eyelashes': 'fill: rgb(10, 32, 29)',
  'fawn_eyelid': 'fill: url(#fawn_eyelid_fade)',
  'fawn_eyelid_fade': ['stop-color: rgb(21, 61, 41)','stop-color: rgb(55, 128, 94)','stop-color: rgb(97, 162, 118)'],
  'fawn_face_side_white': 'fill: url(#fawn_face_side_white_fade)',
  'fawn_face_side_white_fade': ['stop-color: rgb(225, 236, 200)','stop-color: rgb(174, 211, 172)','stop-color: rgb(206, 238, 204)','stop-color: rgb(134, 206, 181)'],
  'fawn_head': 'fill: url(#fawn_head_fade)',
  'fawn_head_fade': ['stop-color: rgb(196, 137, 49)','stop-color: rgb(179, 169, 43)','stop-color: rgb(217, 200, 40)','stop-color: rgb(139, 155, 58)','stop-color: rgb(120, 152, 69)','stop-color: rgb(95, 138, 78)','stop-color: rgb(120, 152, 69)','stop-color: rgb(139, 155, 58)','stop-color: rgb(217, 200, 40)','stop-color: rgb(179, 169, 43)','stop-color: rgb(196, 137, 49)'],
  'fawn_neck': 'fill: url(#fawn_neck_fade)',
  'fawn_neck_dark_left': 'fill: url(#fawn_neck_dark_left_fade)',
  'fawn_neck_dark_left_fade': ['stop-color: rgb(11, 33, 28)','stop-color: rgb(19, 81, 57)','stop-color: rgb(29, 113, 74)'],
  'fawn_neck_dark_right': 'fill: url(#fawn_neck_dark_right_fade)',
  'fawn_neck_dark_right_fade': ['stop-color: rgb(11, 33, 28)','stop-color: rgb(19, 81, 57)','stop-color: rgb(29, 113, 74)'],
  'fawn_neck_fade': ['stop-color: rgb(186, 193, 68)','stop-color: rgb(210, 219, 128)','stop-color: rgb(98, 127, 50)'],
  'fawn_nose': 'fill: rgb(10, 29, 28)',
  'fawn_nose_green_bit': 'fill: rgb(49, 96, 70)',
  'fawn_nose_white_highlight': 'fill: url(#fawn_nose_white_highlight_fade)',
  'fawn_nose_white_highlight_fade': ['stop-color: rgb(216, 233, 195)','stop-color: rgb(144, 176, 126)'],
  'gray_front_block_right': 'fill: url(#gray_transparent_fade)',
  'gray_front_circle_right': 'fill: url(#gray_transparent_fade2)',
  'gray_front_fade_right': 'fill: url(#gray_transparent_fade3)',
  'gray_front_half_circle_right': 'fill: url(#gray_transparent_fade)',
  'gray_front_line_right': 'fill: url(#gray_transparent_fade4)',
  'gray_front_outer_circle_right': 'fill: url(#gray_transparent_fade5)',
  'gray_transparent_fade': ['stop-color: rgb(128, 154, 147)','stop-color: rgb(95, 108, 97)','stop-color: rgb(75, 90, 76)','stop-color: rgb(54, 92, 70)','stop-color: rgb(54, 92, 70)'],
  'gray_transparent_fade2': ['stop-color: rgb(128, 154, 147)','stop-color: rgb(95, 108, 97)','stop-color: rgb(75, 90, 76)','stop-color: rgb(54, 92, 70)','stop-color: rgb(54, 92, 70)'],
  'gray_transparent_fade3': ['stop-color: rgb(128, 154, 147)','stop-color: rgb(95, 108, 97)','stop-color: rgb(75, 90, 76)','stop-color: rgb(54, 92, 70)','stop-color: rgb(54, 92, 70)'],
  'gray_transparent_fade4': ['stop-color: rgb(128, 154, 147)','stop-color: rgb(95, 108, 97)','stop-color: rgb(75, 90, 76)','stop-color: rgb(54, 92, 70)','stop-color: rgb(54, 92, 70)'],
  'gray_transparent_fade5': ['stop-color: rgb(128, 154, 147)','stop-color: rgb(95, 108, 97)','stop-color: rgb(75, 90, 76)','stop-color: rgb(54, 92, 70)','stop-color: rgb(54, 92, 70)'],
  'green_back_block': 'fill: rgb(23, 43, 40)',
  'green_beam_near_fawn_nose': 'fill: url(#green_beam_near_fawn_nose_fade)',
  'green_beam_near_fawn_nose_fade': ['stop-color: rgb(32, 128, 73)','stop-color: rgb(48, 164, 131)','stop-color: rgb(3, 124, 66)','stop-color: rgb(131, 188, 73)','stop-color: rgb(169, 217, 95)'],
  'green_block_next_to_tree_right': 'fill: url(#green_block_next_to_tree_right_fade)',
  'green_block_next_to_tree_right_fade': ['stop-color: rgb(8, 29, 24)','stop-color: rgb(20, 87, 44)','stop-color: rgb(38, 158, 105)'],
  'green_brightgreen_area': 'fill: url(#green_brightgreen_area_fade)',
  'green_brightgreen_area_fade': ['stop-color: rgb(139, 187, 47)','stop-color: rgb(48, 171, 192)','stop-color: rgb(4, 104, 84)'],
  'green_cone_highlight': 'fill: url(#green_cone_highlight_fade)',
  'green_cone_highlight_fade': ['stop-color: rgb(127, 242, 255)','stop-color: rgb(127, 242, 255)','stop-color: rgb(127, 242, 255)','stop-color: rgb(127, 242, 255)'],
  'green_cone_highlight2': 'fill: url(#green_cone_highlight_fade)',
  'green_darkgreen_diagonal_beam': 'fill: rgb(13, 33, 25)',
  'green_fade_bottom_block': 'fill: url(#dark_black_blue_center_green_arc_top_block_fade)',
  'green_filler_gap': 'fill: rgb(35, 118, 91)',
  'green_gradient_block': 'fill: url(#two_greens_fade)',
  'green_leaf_left_bottom': 'fill: rgb(3, 115, 53);',
  'green_leaf_middle_bottom': 'fill: url(#green_leaf_middle_bottom_fade)',
  'green_leaf_middle_bottom_fade': ['stop-color: rgb(6, 35, 29)','stop-color: rgb(13, 54, 28)','stop-color: rgb(46, 91, 48)','stop-color: rgb(71, 112, 38)','stop-color: rgb(122, 158, 75)'],
  'green_leaf_right_bottom': 'fill: rgb(166, 148, 31);',
  'green_leaf_right_bottom2': 'fill: rgb(5, 83, 43);',
  'green_lightgreen_vertical_beam': 'fill: url(#green_lightgreen_vertical_beam_fade)',
  'green_lightgreen_vertical_beam_fade': ['stop-color: rgb(127, 196, 38)','stop-color: rgb(31, 109, 51)'],
  'green_misch_masch_area': 'fill: url(#green_misch_masch_area_fade)',
  'green_misch_masch_area_fade': ['stop-color: rgb(149, 127, 111)','stop-color: rgb(149, 154, 125)','stop-color: rgb(122, 147, 124)','stop-color: rgb(122, 183, 147)','stop-color: rgb(150, 185, 61)','stop-color: rgb(107, 171, 53)','stop-color: rgb(9, 83, 47)','stop-color: rgb(15, 55, 36)'],
  'green_olive_fade': ['stop-color: rgb(73, 140, 47)','stop-color: rgb(87, 119, 18)','stop-color: rgb(96, 152, 31)','stop-color: rgb(69, 139, 30)','stop-color: rgb(58, 126, 33)','stop-color: rgb(44, 115, 24)'],
  'green_olive_fade_block': 'fill: url(#green_olive_fade)',
  'green_transparent_beam': 'fill: url(#green_transparent2_fade)',
  'green_transparent_beam2': 'fill: url(#green_transparent3_fade)',
  'green_transparent_beam3': 'fill: url(#green_transparent4_fade)',
  'green_transparent_fade': ['stop-color: rgb(140, 156, 73)','stop-color: rgb(140, 156, 73)','stop-color: rgb(140, 156, 73)'],
  'green_transparent2_fade': ['stop-color: rgb(140, 156, 73)','stop-color: rgb(140, 156, 73)','stop-color: rgb(140, 156, 73)','stop-color: rgb(140, 156, 73)'],
  'green_transparent3_fade': ['stop-color: rgb(140, 156, 73)','stop-color: rgb(140, 156, 73)','stop-color: rgb(140, 156, 73)'],
  'green_transparent4_fade': ['stop-color: rgb(140, 156, 73)','stop-color: rgb(140, 156, 73)'],
  'green_triangle_block': 'fill: url(#green_triangle_fade)',
  'green_triangle_block2': 'fill: url(#green_triangle_fade2)',
  'green_triangle_fade': ['stop-color: rgb(128, 159, 102)','stop-color: rgb(76, 139, 65)','stop-color: rgb(14, 65, 47)','stop-color: rgb(10, 41, 33)'],
  'green_triangle_fade2': ['stop-color: rgb(128, 159, 102)','stop-color: rgb(76, 139, 65)','stop-color: rgb(14, 65, 47)','stop-color: rgb(10, 41, 33)'],
  'green_triangle_line': 'fill: url(#green_triangle_fade2)',
  'green_triangle_next_to_pine': 'fill: rgb(96, 171, 39)',
  'green_under_green_yellow_orange_block': 'fill: rgb(5, 82, 39);',
  'green_white_fade': ['stop-color: rgb(52, 116, 100)','stop-color: rgb(212, 194, 184)'],
  'green_white_triangle': 'fill: url(#green_white_fade)',
  'green_yellow_fade_block': 'fill: url(#yellow_green_fade)',
  'green_yellow_front_block_right': 'fill: url(#green_yellow_transparent_fade)',
  'green_yellow_next_to_tree_block': 'fill: url(#green_yellow_next_to_tree_block_fade)',
  'green_yellow_next_to_tree_block_fade': ['stop-color: rgb(17, 98, 50)','stop-color: rgb(226, 211, 19)','stop-color: rgb(226, 211, 19)'],
  'green_yellow_orange_block': 'fill: url(#green_yellow_orange_fade)',
  'green_yellow_orange_fade': ['stop-color: rgb(244, 29, 9)','stop-color: rgb(243, 183, 56)','stop-color: rgb(5, 67, 26)'],
  'green_yellow_transparent_fade': ['stop-color: rgb(13, 52, 39)','stop-color: rgb(250, 233, 51)'],
  'greenfade_beam_above_fawn': 'fill: url(#greenfade_beam_above_fawn_fade)',
  'greenfade_beam_above_fawn_fade': ['stop-color: rgb(7, 23, 20)','stop-color: rgb(7, 56, 48)','stop-color: rgb(21, 145, 106)','stop-color: rgb(116, 164, 56)','stop-color: rgb(14, 94, 61)'],
  'greenfade_beam_above_fawn_fade2': ['stop-color: rgb(7, 23, 20)','stop-color: rgb(7, 56, 48)','stop-color: rgb(21, 145, 106)','stop-color: rgb(116, 164, 56)','stop-color: rgb(14, 94, 61)'],
  'greenfade_beam_above_fawn2': 'fill: url(#greenfade_beam_above_fawn_fade2)',
  'greenish_finger_shadow_moon': 'fill: url(#green_transparent_fade)',
  'greenish_triangle': 'fill: rgb(79, 120, 81)',
  'lavender_finger': 'fill: rgb(216, 199, 220);',
  'light_brown_block': 'fill: url(#light_brown_block_fade)',
  'light_brown_block_fade': ['stop-color: rgb(176, 138, 22)','stop-color: rgb(226, 179, 88)','stop-color: rgb(235, 201, 135)'],
  'lightblue_darkblue_fade': ['stop-color: rgb(30, 105, 190)','stop-color: rgb(14, 37, 105)'],
  'lightdarkgreen_block_next_to_fawn': 'fill: url(#lightdarkgreen_block_next_to_fawn_fade)',
  'lightdarkgreen_block_next_to_fawn_fade': ['stop-color: rgb(80, 169, 35)','stop-color: rgb(15, 94, 39)','stop-color: rgb(12, 62, 41)','stop-color: rgb(14, 40, 32)'],
  'lightgreen_filler_line': 'fill: rgb(168, 211, 62)',
  'lightgreen_top_right': 'fill: url(#lightgreen_top_right_fade)',
  'lightgreen_top_right_fade': ['stop-color: rgb(95, 145, 34)','stop-color: rgb(136, 188, 41)','stop-color: rgb(153, 172, 66)','stop-color: rgb(206, 205, 19)','stop-color: rgb(226, 230, 126)'],
  'lightmint_block_right': 'fill: rgb(28, 145, 103)',
  'lightolive_filler_triangle': 'fill: rgb(140, 147, 26)',
  'lila_corner_top_right': 'fill: rgb(41, 28, 128)',
  'lila_corner_white_line_top_right': 'fill: rgb(160, 183, 199)',
  'lilac_arc_corner': 'fill: rgb(147, 95, 167)',
  'lilac_black_block': 'fill: url(#lilac_black_fade)',
  'lilac_black_fade': ['stop-color: rgb(12, 20, 22)','stop-color: rgb(139, 63, 133)'],
  'lilac_corner_top': 'fill: rgb(168, 116, 156)',
  'lilac_finger': 'fill: rgb(143, 114, 172);',
  'lilac_line': 'fill: url(#lilac_line_fade)',
  'lilac_line_fade': ['stop-color: rgb(81, 52, 112)','stop-color: rgb(44, 52, 122)','stop-color: rgb(132, 113, 183)','stop-color: rgb(148, 103, 173)'],
  'lilac_overlay_fade': ['stop-color: rgb(125, 49, 115)','stop-color: rgb(125, 49, 115)','stop-color: rgb(125, 49, 115)','stop-color: rgb(125, 49, 115)'],
  'lilac_overlay2_fade': ['stop-color: rgb(201, 118, 168)','stop-color: rgb(201, 118, 168)','stop-color: rgb(201, 118, 168)','stop-color: rgb(201, 118, 168)'],
  'lilac_overlay3_fade': ['stop-color: rgb(210, 118, 167)','stop-color: rgb(210, 118, 167)'],
  'lilac_transparent_block': 'fill: url(#lilac_overlay_fade)',
  'lilac_transparent_block2': 'fill: url(#lilac_overlay2_fade)',
  'little_beigey_block': 'fill: rgb(193, 214, 158)',
  'magenta_line': 'fill: url(#magenta_line_fade)',
  'magenta_line_fade': ['stop-color: rgb(155, 39, 107)','stop-color: rgb(207, 113, 159)','stop-color: rgb(133, 81, 140)'],
  'magenta_line_filler': 'fill: rgb(161, 105, 170)',
  'magenta_line_right': 'fill: rgb(115, 6, 65)',
  'magenta_red_fade': ['stop-color: rgb(187, 39, 50)','stop-color: rgb(168, 46, 107)'],
  'main_branch': 'fill: url(#main_branch_fade)',
  'main_branch_fade': ['stop-color: rgb(250, 250, 250)','stop-color: rgb(248, 254, 220)','stop-color: rgb(216, 198, 131)','stop-color: rgb(160, 143, 109)','stop-color: rgb(146, 130, 72)'],
  'mid_green_block_next_to_pine': 'fill: rgb(22, 107, 51)',
  'midgreen_block_next_to_fawn': 'fill: rgb(22, 112, 34)',
  'mint_filler_rightish': 'fill: rgb(166, 198, 141)',
  'mintgreen_block_far_right': 'fill: rgb(88, 138, 86)',
  'moon': 'fill: rgb(250, 251, 255)',
  'moon_overlay': 'fill: url(#white_lightblue_fade)',
  'mustard_green_whitish': 'fill: url(#mustard_green_whitish_fade)',
  'mustard_green_whitish_fade': ['stop-color: rgb(158, 151, 41)','stop-color: rgb(29, 102, 41)','stop-color: rgb(174, 184, 123)'],
  'mustard_triangle': 'fill: rgb(144, 132, 13)',
  'mustard_triangle_white_line': 'fill: url(#white_yellow_fade)',
  'olive_filler_block': 'fill: rgb(190, 165, 21)',
  'olive_transparent_fade': ['stop-color: rgb(81, 113, 34)','stop-color: rgb(81, 113, 34)','stop-color: rgb(81, 113, 34)'],
  'olive_transparent_next_to_pine': 'fill: url(#olive_transparent_fade)',
  'orange_arc_block': 'fill: url(#orange_arc_fade)',
  'orange_arc_fade': ['stop-color: rgb(205, 170, 156)','stop-color: rgb(217, 125, 67)','stop-color: rgb(217, 125, 67)','stop-color: rgb(84, 60, 69)'],
  'orange_block': 'fill: rgb(252, 63, 14)',
  'orange_block_green_line': 'fill: rgb(20, 50, 38);',
  'orange_block_long': 'fill: rgb(251, 62, 14)',
  'orange_block_yellow_line': 'fill: rgb(247, 228, 48);',
  'orange_fade': ['stop-color: rgb(198,51,16)','stop-color: rgb(198,51,16)','stop-color: rgb(198,51,16)','stop-color: rgb(198,51,16)','stop-color: rgb(198,51,16)','stop-color: rgb(198,51,16)'],
  'orange_fade_block': 'fill: url(#orange_fade)',
  'orange_fade_block2': 'fill: url(#orange_fade2)',
  'orange_fade_block3': 'fill: url(#orange_fade3)',
  'orange_fade2': ['stop-color: rgb(198, 51, 16)','stop-color: rgb(198, 51, 16)','stop-color: rgb(198, 51, 16)'],
  'orange_fade3': ['stop-color: rgb(198, 51, 16)','stop-color: rgb(198, 51, 16)'],
  'orange_filler_line': 'fill: rgb(237, 180, 7)',
  'orangy_branch': 'fill: url(#orangy_branch_fade)',
  'orangy_branch_fade': ['stop-color: rgb(183, 173, 138)','stop-color: rgb(135, 114, 84)','stop-color: rgb(231, 175, 92)','stop-color: rgb(204, 138, 81)','stop-color: rgb(179, 99, 54)','stop-color: rgb(81, 63, 58)'],
  'orangy_branch_overlay_fade': ['stop-color: rgb(81, 63, 58)','stop-color: rgb(81, 63, 58)'],
  'orangy_branch2': 'fill: url(#orangy_branch_overlay_fade)',
  'pale_green_long_block': 'fill: rgb(93, 99, 88)',
  'pale_green_triangle_next_to_pine': 'fill: rgb(191, 218, 95)',
  'peach_arc_corner': 'fill: rgb(227, 133, 103)',
  'pine_next_to_mountain': 'fill: rgb(100, 155, 41)',
  'pink_black_overlay_block': 'fill: url(#black_transparent3_fade)',
  'pink_red_block': 'fill: url(#magenta_red_fade)',
  'pink_red_fade': ['stop-color: rgb(253, 237, 236)','stop-color: rgb(230, 73, 88)'],
  'pink_red_gradient_block': 'fill: url(#pink_red_fade)',
  'pinkish_bottom_far_right': 'fill: rgb(140, 22, 73);',
  'pinkish_bottom_right': 'fill: rgb(125, 38, 73);',
  'pinkish_finger': 'fill: rgb(155, 52, 108);',
  'purple_areas_near_fawn_face': 'fill: url(#purple_areas_near_fawn_face_fade)',
  'purple_areas_near_fawn_face_fade': ['stop-color: rgb(93, 27, 77)','stop-color: rgb(17, 57, 108)','stop-color: rgb(35, 106, 141)'],
  'purple_areas_near_fawn_face2': 'fill: url(#purple_areas_near_fawn_face_fade)',
  'purple_areas_near_fawn_face3': 'fill: url(#purple_areas_near_fawn_face_fade)',
  'purple_triangle': 'fill: rgb(137, 52, 81)',
  'red_rose_white_trio_red': 'fill: rgb(203, 32, 34)',
  'red_rose_white_trio_white': 'fill: url(#red_rose_white_trio_white_fade)',
  'red_rose_white_trio_rose': 'fill: rgb(246, 154, 164)',
  'red_rose_white_trio_white_fade': ['stop-color: rgb(242, 232, 141)','stop-color: rgb(252, 243, 207)','stop-color: rgb(244, 228, 223)'],
  'rose_Block_bottom_right_fade': ['stop-color: rgb(210, 118, 167)','stop-color: rgb(93, 35, 67)','stop-color: rgb(114, 115, 163)','stop-color: rgb(111, 105, 117)','stop-color: rgb(57, 74, 92)','stop-color: rgb(210, 217, 214)'],
  'rose_bottom_right': 'fill: url(#rose_Block_bottom_right_fade)',
  'rose_bottom_right_overlay': 'fill: url(#lilac_overlay3_fade)',
  'rose_panel_black_top_right': 'fill: rgb(14, 20, 24)',
  'rose_panel_right': 'fill: rgb(235, 126, 188)',
  'teal_block': 'fill: url(#teal_fade)',
  'teal_block_behind_fawn': 'fill: rgb(3, 74, 77)',
  'teal_block_under_fawn': 'fill: url(#teal_brightteal_fade)',
  'teal_block_under_fawn2': 'fill: url(#teal_brightteal_fade2)',
  'teal_brightteal_fade': ['stop-color: rgb(5, 24, 29)','stop-color: rgb(9, 36, 49)','stop-color: rgb(24, 147, 133)'],
  'teal_brightteal_fade2': ['stop-color: rgb(8, 17, 34)','stop-color: rgb(9, 36, 49)','stop-color: rgb(1, 30, 82)','stop-color: rgb(2, 48, 81)','stop-color: rgb(7, 158, 146)'],
  'teal_fade': ['stop-color: rgb(7, 41, 61)','stop-color: rgb(21, 138, 166)'],
  'teal_lozenge': 'fill: url(#teal_lozenge_drop_fade)',
  'teal_lozenge_drop_fade': ['stop-color: rgb(10, 28, 30)','stop-color: rgb(16, 44, 45)','stop-color: rgb(20, 62, 59)','st]op-color:rgb(26, 143, 120)'],
  'tiny_filler_black_block': 'fill: rgb(65, 46, 53)',
  'two_greens_fade': ['stop-color: rgb(7, 70, 31)','stop-color: rgb(22, 126, 32)'],
  'white_darkblue_fade': ['stop-color: rgb(100, 154, 192)','stop-color: rgb(13, 34, 92)','stop-color: rgb(12, 21, 35)'],
  'white_fade_curve': 'fill: url(#white_fade_curve_fade)',
  'white_fade_curve_fade': ['stop-color: rgb(255, 255, 255)','stop-color: rgb(255, 255, 255)','stop-color: rgb(255, 255, 255)'],
  'white_green_next_to_yellow': 'fill: url(#white_green_next_to_yellow_fade)',
  'white_green_next_to_yellow_fade': ['stop-color: rgb(90, 161, 95)','stop-color: rgb(147, 198, 144)','stop-color: rgb(189, 217, 182)','stop-color: rgb(210, 227, 206)'],
  'white_lightblue_fade': ['stop-color: rgb(255, 255, 255)','stop-color: rgb(151, 184, 233)','stop-color: rgb(151, 184, 233)'],
  'white_next_to_rose_area': 'fill: rgb(241, 233, 221)',
  'white_rose_area': 'fill: url(#white_rose_area_fade)',
  'white_rose_area_fade': ['stop-color: rgb(182, 52, 112)','stop-color: rgb(220, 124, 171)','stop-color: rgb(252, 218, 246)'],
  'white_rose_area_fade2': ['stop-color: rgb(162, 72, 143)','stop-color: rgb(182, 52, 112)','stop-color: rgb(220, 124, 171)','stop-color: rgb(251, 203, 170)','stop-color: rgb(252, 218, 246)','stop-color: rgb(247, 239, 241)'],
  'white_rose_area_fade3': ['stop-color: rgb(216, 82, 136)','stop-color: rgb(247, 173, 160)'],
  'white_rose_area2': 'fill: url(#white_rose_area_fade2)',
  'white_rose_area3': 'fill: url(#white_rose_area_fade3)',
  'white_triangle_left': 'fill: rgb(159, 160, 149)',
  'white_triangle_left_underlay': 'fill: url(#black_transparent2_fade)',
  'white_triangle_right': 'fill: rgb(232, 217, 210)',
  'white_triangle_right_overlay': 'fill: url(#black_transparent2_fade)',
  'white_yellow_fade': ['stop-color: rgb(254, 245, 136)','stop-color: rgb(254, 245, 136)','stop-color: rgb(245, 232, 25)'],
  'white_yellow_orange_block': 'fill: url(#white_yellow_orange_fade)',
  'white_yellow_orange_fade': ['stop-color: rgb(255, 240, 180)','stop-color: rgb(248, 215, 69)','stop-color: rgb(248, 169, 103)','stop-color: rgb(245, 127, 86)'],
  'white_yellow_white_orange': 'fill: url(#white_yellow_white_orange_fade)',
  'white_yellow_white_orange_fade': ['stop-color: rgb(254, 254, 131)','stop-color: rgb(249, 219, 14)','stop-color: rgb(255, 255, 176)','stop-color: rgb(255, 255, 176)','stop-color: rgb(240, 188, 58)','stop-color: rgb(210, 169, 38)'],
  'yellow_beam_corner': 'fill: rgb(244, 218, 46)',
  'yellow_beam_straight': 'fill: rgb(254, 209, 46)',
  'yellow_block_in_forest': 'fill: rgb(251, 224, 16)',
  'yellow_block_next_to_orange_leaf': 'fill: rgb(250, 200, 37)',
  'yellow_block_next_to_red_rose_white_trio': 'fill: rgb(255, 250, 2)',
  'yellow_corner_top': 'fill: rgb(252, 231, 103)',
  'yellow_green_back_fade_block': 'fill: url(#yellow_green_back_fade_block_fade)',
  'yellow_green_back_fade_block_fade': ['stop-color: rgb(242, 205, 89)','stop-color: rgb(251, 242, 145)','stop-color: rgb(226, 200, 64)','stop-color: rgb(219, 226, 98)','stop-color: rgb(151, 170, 32)','stop-color: rgb(226, 231, 112)','stop-color: rgb(226, 231, 112)'],
  'yellow_green_block': 'fill: url(#yellow_green_fade)',
  'yellow_green_fade': ['stop-color: rgb(251, 250, 102)','stop-color: rgb(117, 157, 103)'],
  'yellow_green_fade': ['stop-color: rgb(97, 168, 53)','stop-color: rgb(249, 219, 3)'],
  'yellow_lightgreen_block': 'fill: url(#yellow_lightgreen_block_fade)',
  'yellow_lightgreen_block_fade': ['stop-color: rgb(233, 220, 16)','stop-color: rgb(194, 217, 104)'],
  'yellow_line_left_of_mid_leaf': 'fill: rgb(212, 194, 102);',
  'yellow_midgreen_block': 'fill: url(#yellow_midgreen_block_fade)',
  'yellow_midgreen_block_fade': ['stop-color: rgb(193, 210, 19)','stop-color: rgb(140, 173, 23)'],
  'yellow_mint_far_right': 'fill: url(#yellow_mint_far_right_fade)',
  'yellow_mint_far_right_fade': ['stop-color: rgb(242, 201, 15)','stop-color: rgb(168, 188, 88)'],
  'yellow_mustard_block': 'fill: url(#yellow_mustard_fade)',
  'yellow_mustard_fade': ['stop-color: rgb(142, 109, 18)','stop-color: rgb(146, 126, 24)','stop-color: rgb(132, 127, 25)','stop-color: rgb(235, 214, 10)'],
  'yellow_orange_block_right': 'fill: rgb(233, 200, 14)',
  'yellow_pink_fade': ['stop-color: rgb(250, 233, 51)','stop-color: rgb(244, 94, 140)'],
  'yellow_pink_front_block_right': 'fill: url(#yellow_pink_transparent_fade)',
  'yellow_pink_transparent_fade': ['stop-color: rgb(250, 233, 51)','stop-color: rgb(250, 233, 51)','stop-color: rgb(244, 94, 140)'],
  'yellow_pink_triangle': 'fill: url(#yellow_pink_fade)',
  'yellow_pink_triangle_overlay': 'fill: rgb(250, 233, 51, 0.5)',
  'yellow_triangle_over_orange_block_between_leafs': 'fill: rgb(212, 194, 102);',
  'yellow_vertical_block': 'fill: rgb(243, 202, 39)'
};


const relations = {
  "big_dark_blue_white_block": "white_darkblue_fade",
  "black_cone5": "black_transparent_fade",
  "black_front_triangle_right": "black_blue_fade",
  "black_green_white_diagonal": "black_green_white_fade",
  "black_green_white_diagonal2": "black_green_white2_fade",
  "black_pink_white_block": "black_pink_white_fade",
  "black_transparent_shadow": "black_transparent_fade",
  "blue_light_green_arc": "blue_light_green_fade",
  "blue_pink_next_to_rose_area": "blue_pink_next_to_rose_area_fade",
  "blue_purple_long_block": "blue_purple_fade",
  "blue_sky_block": "lightblue_darkblue_fade",
  "blue_yellow_gradient_block": "blue_yellow_fade",
  "bright_blue_block": "black_blue_white_fade",
  "brightyellow_white_triangle_right": "brightyellow_white_triangle_right_fade",
  "brown_triangle_large": "brown_ochre_fade",
  "brown_white_green_corner": "brown_white_green_corner_fade",
  "dark_black_blue_center_block": "dark_black_blue_center_block_fade",
  "dark_black_blue_center_green_arc_top_block": "dark_black_blue_center_green_arc_top_block_fade",
  "dark_block_behind_white_branch": "dark_block_behind_white_branch_fade",
  "dark_mountain": "dark_mountain_fade",
  "darkgreen_black_cone2": "darkgreen_black_cone_fade",
  "darkgreen_black_cone3": "darkgreen_black_cone_fade",
  "darkgreen_black_cone4": "darkgreen_black_cone_fade",
  "darkgreen_block_next_to_fawn": "darkgreen_block_next_to_fawn_fade",
  "darkgreen_lightgreen_block": "darkgreen_lightgreen_fade",
  "fawn_behind_ear": "fawn_behind_ear_fade",
  "fawn_behind_ear2": "fawn_behind_ear_fade2",
  "fawn_body_green_yellow_layer": "fawn_body_green_yellow_layer_fade",
  "fawn_body_white_corner": "fawn_body_white_transparent_corner_fade",
  "fawn_body_white_transparent_layer": "fawn_body_white_transparent_layer_fade",
  "fawn_body_yellow_transparent_layer": "fawn_body_yellow_transparent_layer_fade",
  "fawn_eyelid": "fawn_eyelid_fade",
  "fawn_face_side_white": "fawn_face_side_white_fade",
  "fawn_head": "fawn_head_fade",
  "fawn_neck": "fawn_neck_fade",
  "fawn_neck_dark_left": "fawn_neck_dark_left_fade",
  "fawn_neck_dark_right": "fawn_neck_dark_right_fade",
  "fawn_nose_white_highlight": "fawn_nose_white_highlight_fade",
  "gray_front_block_right": "gray_transparent_fade",
  "gray_front_circle_right": "gray_transparent_fade2",
  "gray_front_fade_right": "gray_transparent_fade3",
  "gray_front_half_circle_right": "gray_transparent_fade",
  "gray_front_line_right": "gray_transparent_fade4",
  "gray_front_outer_circle_right": "gray_transparent_fade5",
  "green_beam_near_fawn_nose": "green_beam_near_fawn_nose_fade",
  "green_block_next_to_tree_right": "green_block_next_to_tree_right_fade",
  "green_brightgreen_area": "green_brightgreen_area_fade",
  "green_cone_highlight": "green_cone_highlight_fade",
  "green_cone_highlight2": "green_cone_highlight_fade",
  "green_fade_bottom_block": "dark_black_blue_center_green_arc_top_block_fade",
  "green_gradient_block": "two_greens_fade",
  "green_leaf_middle_bottom": "green_leaf_middle_bottom_fade",
  "green_lightgreen_vertical_beam": "green_lightgreen_vertical_beam_fade",
  "green_misch_masch_area": "green_misch_masch_area_fade",
  "green_olive_fade_block": "green_olive_fade",
  "green_transparent_beam": "green_transparent2_fade",
  "green_transparent_beam2": "green_transparent3_fade",
  "green_transparent_beam3": "green_transparent4_fade",
  "green_triangle_block": "green_triangle_fade",
  "green_triangle_block2": "green_triangle_fade2",
  "green_triangle_line": "green_triangle_fade2",
  "green_white_triangle": "green_white_fade",
  "green_yellow_fade_block": "yellow_green_fade",
  "green_yellow_front_block_right": "green_yellow_transparent_fade",
  "green_yellow_next_to_tree_block": "green_yellow_next_to_tree_block_fade",
  "green_yellow_orange_block": "green_yellow_orange_fade",
  "greenfade_beam_above_fawn": "greenfade_beam_above_fawn_fade",
  "greenfade_beam_above_fawn2": "greenfade_beam_above_fawn_fade2",
  "greenish_finger_shadow_moon": "green_transparent_fade",
  "light_brown_block": "light_brown_block_fade",
  "lightdarkgreen_block_next_to_fawn": "lightdarkgreen_block_next_to_fawn_fade",
  "lightgreen_top_right": "lightgreen_top_right_fade",
  "lilac_black_block": "lilac_black_fade",
  "lilac_line": "lilac_line_fade",
  "lilac_transparent_block": "lilac_overlay_fade",
  "lilac_transparent_block2": "lilac_overlay2_fade",
  "magenta_line": "magenta_line_fade",
  "main_branch": "main_branch_fade",
  "moon_overlay": "white_lightblue_fade",
  "mustard_green_whitish": "mustard_green_whitish_fade",
  "mustard_triangle_white_line": "white_yellow_fade",
  "olive_transparent_next_to_pine": "olive_transparent_fade",
  "orange_arc_block": "orange_arc_fade",
  "orange_fade_block": "orange_fade",
  "orange_fade_block2": "orange_fade2",
  "orange_fade_block3": "orange_fade3",
  "orangy_branch": "orangy_branch_fade",
  "orangy_branch2": "orangy_branch_overlay_fade",
  "pink_black_overlay_block": "black_transparent3_fade",
  "pink_red_block": "magenta_red_fade",
  "pink_red_gradient_block": "pink_red_fade",
  "purple_areas_near_fawn_face": "purple_areas_near_fawn_face_fade",
  "purple_areas_near_fawn_face2": "purple_areas_near_fawn_face_fade",
  "purple_areas_near_fawn_face3": "purple_areas_near_fawn_face_fade",
  "red_rose_white_trio_white": "red_rose_white_trio_white_fade",
  "rose_bottom_right": "rose_Block_bottom_right_fade",
  "rose_bottom_right_overlay": "lilac_overlay3_fade",
  "teal_block": "teal_fade",
  "teal_block_under_fawn": "teal_brightteal_fade",
  "teal_block_under_fawn2": "teal_brightteal_fade2",
  "teal_lozenge": "teal_lozenge_drop_fade",
  "white_fade_curve": "white_fade_curve_fade",
  "white_green_next_to_yellow": "white_green_next_to_yellow_fade",
  "white_rose_area": "white_rose_area_fade",
  "white_rose_area2": "white_rose_area_fade2",
  "white_rose_area3": "white_rose_area_fade3",
  "white_triangle_left_underlay": "black_transparent2_fade",
  "white_triangle_right_overlay": "black_transparent2_fade",
  "white_yellow_orange_block": "white_yellow_orange_fade",
  "white_yellow_white_orange": "white_yellow_white_orange_fade",
  "yellow_green_back_fade_block": "yellow_green_back_fade_block_fade",
  "yellow_green_block": "yellow_green_fade",
  "yellow_lightgreen_block": "yellow_lightgreen_block_fade",
  "yellow_midgreen_block": "yellow_midgreen_block_fade",
  "yellow_mint_far_right": "yellow_mint_far_right_fade",
  "yellow_mustard_block": "yellow_mustard_fade",
  "yellow_pink_front_block_right": "yellow_pink_transparent_fade",
  "yellow_pink_triangle": "yellow_pink_fade"
}




buttons.forEach(butt => {
  butt.addEventListener('click', (event) => {
    if(butt.id == 'original') {
      stopAutoColours();
      localStorage.clear();
      saveColours(defaults);
      location.reload(); 
    }
    if(butt.id == 'paint') {
      stopAutoColours();
      clearCanvas();
      clickListeners(handlePaint);
      updateColour('a_button_state', 'paint');
    }
    if(butt.id == 'solids') {
      stopAutoColours();
      mouseOverListeners(handleSolids);
      updateColour('a_button_state', 'solids');
    }
    if(butt.id == 'gradientsR') {
      stopAutoColours();
      mouseOverListeners(handleGradients);
      updateColour('a_button_state', 'gradientsR');
    }
    if(butt.id == 'automatic') {
      startAutoColours();
      updateColour('a_button_state', 'automatic');
    }
  });
});


function mouseOverListeners(method) {
  const buttState = document.querySelector('#buttons input:checked').value;
  blocks.forEach(block => {
    block.addEventListener('mouseover', () => {
      method(block);
    });
  });
}
function clickListeners(method) {
  const buttState = document.querySelector('#buttons input:checked').value;
  blocks.forEach(block => {
    block.addEventListener('click', () => {
      method(block);
    });
  });
}






// saveColours(defaults);



function getColours() {
  // console.log('getColours');
  const coloursString = localStorage.getItem("franzmarcColours");
  let coloursJSON = {};
  if (coloursString === null) {
    coloursJSON = defaults;
    saveColours(coloursJSON);
    console.log("first-time setup");
  } else {
    coloursJSON = JSON.parse(coloursString);
  }
  return coloursJSON;
}


function saveColours(coloursJSON) {
  // console.log('saveColours to localStorage');
  const coloursString = JSON.stringify(coloursJSON);
  localStorage.setItem("franzmarcColours", coloursString);
}


function updateColour(id, newColour) {
  let coloursJSON = getColours();
  const oldColour = defaults[id];
  coloursJSON[id] = newColour;
  // console.log(`updating ${id} from ${oldColour} to ${newColour}`);
  saveColours(coloursJSON);
}


loadColours();
function loadColours() {
  let coloursJSON = getColours();
  console.log(coloursJSON);
  blocks.forEach(block => {
    const bloID = block.id;
    const relID = relations[block.id] ? relations[block.id] : 'RGB';
    if(relID !== 'RGB') {
      const grad = gradients.find((gr) => gr.id == relID);
      const [...toddlers] = grad.children;
      const newcolour = coloursJSON[relID];
      for(let n=0; n<toddlers.length; n++) {
        const currElem = toddlers[n];
        // console.log(currElem);
        currElem.setAttribute('stop-color',`${newcolour[n]}`);
        // currElem.attributes.style.value = `${newcolour[n]}`;
      }
      block.setAttribute('fill',`url(#${relID})`);
      // block.attributes.style.value = `fill: url(#${relID})`;
    } else {
      const rcolour = coloursJSON[bloID];
      // block.attributes.style.value = `${rcolour}`;
      block.setAttribute('fill',`${rcolour}`);
    }
  });
  if(coloursJSON['a_button_state'] == 'original') {
    const butt = buttons.find((br) => br.id == 'original');
    butt.checked = true;
  }
  if(coloursJSON['a_button_state'] == 'paint') {
    const butt = buttons.find((br) => br.id == 'paint');
    butt.checked = true;
  }
  if(coloursJSON['a_button_state'] == 'solids') {
    const butt = buttons.find((br) => br.id == 'solids');
    butt.checked = true;
  }
  if(coloursJSON['a_button_state'] == 'gradientsR') {
    const butt = buttons.find((br) => br.id == 'gradientsR');
    butt.checked = true;
  }
  if(coloursJSON['a_button_state'] == 'automatic') {
    const butt = buttons.find((br) => br.id == 'automatic');
    butt.checked = true;
  }
}



function clearCanvas() {
  blocks.forEach(block => {
    const bloID = block.id;
    const relID = relations[bloID] ? relations[bloID] : 'RGB';
    if(relID !== 'RGB') {
      const grad = gradients.find((gr) => gr.id == relID);
      const [...toddlers] = grad.children;
      let coloursList = [];
      for(let n=0; n<toddlers.length; n++) {
        const currElem = toddlers[n];
        // currElem.attributes.style.value = `stop-color:${hexTorgb('#FFFFFF')}`;
        currElem.setAttribute('stop-color',`${hexTorgb('#FFFFFF')}`);
        coloursList.push(`stop-color: ${hexTorgb('#FFFFFF')}`);
      }
      // block.attributes.style.value = `fill: url(#${relID});stroke:${hexTorgb('#000000')};stroke-width:2;`;
      block.setAttribute('fill',`url(#${relID})`);
      block.setAttribute('stroke',`${hexTorgb('#000000')}`);
      block.setAttribute('stroke-width',`2`);
      updateColour(relID, coloursList);
    } else {
      // block.attributes.style.value = `fill:${hexTorgb('#FFFFFF')};stroke: ${hexTorgb('#000000')};stroke-width:2;`;
      block.setAttribute('fill',`${hexTorgb('#FFFFFF')}`);
      block.setAttribute('stroke',`${hexTorgb('#000000')}`);
      block.setAttribute('stroke-width',`2`);
      updateColour(bloID, `fill:${hexTorgb('#FFFFFF')};stroke:${hexTorgb('#000000')};stroke-width:2;`);
    }
  });
}

function handlePaint(block) {
  // console.log(`COLOURING-IN '${block.id}''`);
  const currColour = picker.value;
  const bloID = block.id;
  const relID = relations[bloID] ? relations[bloID] : 'RGB';
  if(relID !== 'RGB') {
    const grad = gradients.find((gr) => gr.id == relID);
    const [...toddlers] = grad.children;
    let coloursList = [];
    for(let n=0; n<toddlers.length; n++) {
      const currElem = toddlers[n];
      // currElem.attributes.style.value = `stop-color:${hexTorgb(currColour)}`;
      currElem.setAttribute('stop-color',`${hexTorgb(currColour)}`);
      coloursList.push(`stop-color: ${hexTorgb(currColour)}`);
    }
    // block.attributes.style.value = `fill: url(#${relID})`;
    block.setAttribute('fill',`url(#${relID})`);
    updateColour(relID, coloursList);
  } else {
    // block.attributes.style.value = `fill: ${hexTorgb(currColour)}`;
    block.setAttribute('fill',`${hexTorgb(currColour)}`);
    updateColour(bloID, `fill: ${hexTorgb(currColour)}`);
  }
}
function hexTorgb(hex) {
  return `rgb(${'0x' + hex[1] + hex[2] | 0}, ${'0x' + hex[3] + hex[4] | 0}, ${'0x' + hex[5] + hex[6] | 0})`;
}



function handleSolids(block) {
  // console.log(`RGB '${block.id}': '${block.attributes.style.value}'`);
  const rcolour = randomColor({
    format: 'rgb',
    luminosity: 'random', // bright, light, dark
    hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
  });
  // block.attributes.style.value = `fill: ${rcolour}`;
  // block.attributes.setAttribute('fill',`${rcolour}`);
  block.setAttribute('fill',`${rcolour}`);
  updateColour(block.id, `fill: ${rcolour}`);
}



let iID;
function startAutoColours() {
  const spd = rangeButt.value / 10;
  const spd1000 = rangeButt.value / 10 * 500;
  handleAutomatic(spd);
  clearInterval(iID);
  iID = setInterval(() => {handleAutomatic(spd,iID)}, spd1000);
  // console.log(iID,spd,spd1000);
}
function stopAutoColours() {
  clearInterval(iID);
  const sheet = document.styleSheets[0];
  const [...rules] = sheet.cssRules;
  const marcRuleIndex = rules.findIndex(rule => rule.selectorText === "svg#marc path");
  if(marcRuleIndex > -1) {
    sheet.deleteRule(marcRuleIndex);
  }
}

function handleAutomatic(speed,iID) {
  // console.log(`handling automation with speed: ${speed}`);
  const sheet = document.styleSheets[0];
  const [...rules] = sheet.cssRules;
  const marcRuleIndex = rules.findIndex(rule => rule.selectorText === "svg#marc path");
  // console.log(marcRuleIndex);
  if(marcRuleIndex > -1) {
    sheet.deleteRule(marcRuleIndex);
  }
  const marc_path = `
  svg#marc path {
    transition: fill ${speed}s ease;
  }
  `;
  sheet.insertRule(marc_path, sheet.cssRules.length);
  blocks.forEach(block => {
    const rcolour = randomColor({
      format: 'rgb',
      luminosity: 'random', // bright, light, dark
      hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
    });
    // block.attributes.style.value = `fill: ${rcolour}`;
    // block.attributes.setAttribute('fill',`${rcolour}`);
    block.setAttribute('fill',`${rcolour}`);
    // updateColour(block.id, `fill: ${rcolour}`);
  });
}

rangeButt.addEventListener('change', () => {
  startAutoColours();
});









function handleGradients(block) {
  const relID = relations[block.id] ? relations[block.id] : 'RGB';
  // console.log(`GRADIENT '${block.id}': '${relID}'`);
  if(relID !== 'RGB') {
    // hovering over a gradient, so children (i.e. stop-colours) exist
    const grad = gradients.find((gr) => gr.id == relID);
    const [...toddlers] = grad.children;
    let coloursList = [];
    // reset gradient colours
    const originalGradientColours = defaults[relID];
    updateColour(relations[block.id], originalGradientColours);
    toddlers.forEach(ch => {
      const newcolour = randomColor({
        format: 'rgb',
        luminosity: 'random', // bright, light, dark
        hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
      });
      // ch.attributes.style.value = `stop-color: ${newcolour}`;
      // ch.attributes.setAttribute('stop-color',`${newcolour}`);
      ch.setAttribute('stop-color',`${newcolour}`);
      coloursList.push(`stop-color: ${newcolour}`);
    })
    // block.attributes.style.value = `fill: url(#${relID})`;
    // block.attributes.setAttribute('fill',`url(#${relID})`);
    block.setAttribute('fill',`url(#${relID})`);
    updateColour(relID, coloursList);
  } else {
  // hovering over a solid RGB colour, so no children exist
    const rcolour = randomColor({
      format: 'rgb',
      luminosity: 'random', // bright, light, dark
      hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
    });
    // block.attributes.style.value = `fill: ${rcolour}`;
    // block.attributes.setAttribute('fill',`${rcolour}`);
    block.setAttribute('fill',`${rcolour}`);
    updateColour(block.id, `fill: ${rcolour}`);
  }
}




// HAMMERTIME
const mc = new Hammer.Manager(marc_svg);
mc.add(new Hammer.Pan({ 
  direction: Hammer.DIRECTION_ALL, 
  threshold: 0 
})); 
mc.add(new Hammer.Tap({ 
  event: 'singletap', 
  taps: 1
})); 
mc.on("pan", handleDrag);
mc.on("singletap", handleTap);

let lastPosX = 0;
let lastPosY = 0;
let isDragging = false;

function handleDrag(ev) {
  // console.log('drag',ev);
  const buttState = document.querySelector('#buttons input:checked').value;
  let currElem;
  isDragging = true;
  if ( isDragging ) {
    lastPosX = ev.center['x'];
    lastPosY = ev.center['y'];
    currElem = document.elementFromPoint(lastPosX,lastPosY);
    if(buttState == 'solids') {
      handleSolids(currElem);
    }
    if(buttState == 'gradients') {
      handleGradients(currElem);
    }
  }
  if (ev.isFinal) {
    lastPosX = ev.center['x'];
    lastPosY = ev.center['y'];
    currElem = document.elementFromPoint(lastPosX,lastPosY);
    isDragging = false;
    if(buttState == 'solids') {
      handleSolids(currElem);
    }
    if(buttState == 'gradients') {
      handleGradients(currElem);
    }
  }
}

function handleTap(ev) {
  // console.log('tap',ev);
  const buttState = document.querySelector('#buttons input:checked').value;
  let currElem;
  if (ev.isFinal) {
    lastPosX = ev.center['x'];
    lastPosY = ev.center['y'];
    currElem = document.elementFromPoint(lastPosX,lastPosY);
    if(buttState == 'solids') {
      handleSolids(currElem);
    }
    if(buttState == 'gradients') {
      handleGradients(currElem);
    }
  }
}





function handleShowcase() {
  const params = location.search;
  const keyValueStrings = (params.slice(1)).split('&');
  keyValueStrings.forEach(x => {
    const pair = x.split('=');
    if (pair[0] === 'showcase' && pair[1] === 'true') {
      bodyCont.style.cursor = 'none';
      console.log('starting showcase');
      menu.classList.add('hide');
      const min1200 = window.matchMedia("(min-width: 1200px)").matches;
      if (min1200) {
        marc_svg.attributes.style.value = 'height: unset';
      }
      const medScreenLandscape = window.matchMedia("(min-resolution: 2dppx) and (orientation:landscape)").matches;
      if (medScreenLandscape) {
        bodyCont.style.height = '98vh';
      }
      rangeButt.value = 100;
      startAutoColours();
    }
    if (pair[0] === 'showcase' && pair[1] === 'false') {
      bodyCont.style.cursor = 'default';
      console.log('stopping showcase');
      menu.classList.remove('hide');
      stopAutoColours();
    }
  })
}
handleShowcase();







// SHORTCUT OPTIONS
// for live display screens
document.addEventListener("keydown", event => {
  if (event.key === "o") {
    console.log('o pressed: reset to original');
    stopAutoColours();
    localStorage.clear();
    saveColours(defaults);
    location.reload();
    urlParams.set('showcase', false);
    window.location.search = urlParams;
    document.querySelector(`#buttons input[id='original']`).checked = true;
    updateColour('a_button_state', 'original');
  }
  if (event.key === "p") {
    console.log('p pressed: paint mode started');
    stopAutoColours();
    clearCanvas();
    clickListeners(handlePaint);
    document.querySelector(`#buttons input[id='paint']`).checked = true;
    updateColour('a_button_state', 'paint');
  }
  if (event.key === "s") {
    console.log('s pressed: solid mode started');
    stopAutoColours();
    mouseOverListeners(handleSolids);
    document.querySelector(`#buttons input[id='solids']`).checked = true;
    updateColour('a_button_state', 'solids');
  }
  if (event.key === "g") {
    console.log('g pressed: gradient mode started');
    stopAutoColours();
    mouseOverListeners(handleGradients);
    document.querySelector(`#buttons input[id='gradientsR']`).checked = true;
    updateColour('a_button_state', 'gradientsR');
  }
  if (event.key === "a") {
    console.log('a pressed: showcase mode started');
    rangeButt.value = 100;
    urlParams.set('showcase', true);
    window.location.search = urlParams;
    document.querySelector(`#buttons input[id='automatic']`).checked = true;
    updateColour('a_button_state', 'automatic');
  }
  if (event.key === "r") {
    console.log('r pressed: reset to original');
    stopAutoColours();
    localStorage.clear();
    saveColours(defaults);
    location.reload();
    urlParams.set('showcase', false);
    window.location.search = urlParams;
  }
  if (event.key === "Escape") {
    console.log('escape pressed: reset to original');
    stopAutoColours();
    localStorage.clear();
    saveColours(defaults);
    location.reload(); 
    urlParams.set('showcase', false);
    window.location.search = urlParams;
  }
  if (event.key === "ArrowUp") { // UP ARROW
    console.log('up pressed: sped up showcase speed');
    incSpeed();
    startAutoColours();
  }
  if (event.key === "ArrowDown") { // DOWN ARROW
    console.log('down pressed: slowed down showcase speed');
    decSpeed();
    startAutoColours();
  }
});

function incSpeed() {
  if(parseInt(rangeButt.value) <= 90) {
    rangeButt.value = parseInt(rangeButt.value) + 10;
  } else {
    rangeButt.value = 100;
  }
}

function decSpeed() {
  if(parseInt(rangeButt.value) >= 10) {
    rangeButt.value = parseInt(rangeButt.value) - 10;
  } else {
    rangeButt.value = 10;
  }
}