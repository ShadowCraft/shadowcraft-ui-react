import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

// Season 1: Vindictive
// Season 2: Fearless
// Season 3: Cruel
// Season 4: Ferocious
// Season 5: Fierce
// Season 6: Dominant
// Season 7: Demonic

// TODO: it's nearly impossible to find proper data for the item levels for pvp items
// since they're unavailable in game after the season ends and you can't go back to
// look at previous seasons. These item levels are based on what wowdb says about them
// and are likely very wrong.

let _season1CombatantItems = [
    136031, 136032, 135873, 135874, 135875, 135876, 135877, 135878, 135879, 135880, 135907, 135908, 135910, 135911, 135912, 135913, 135915, 135916, 135917, 135918, 135919, 135920, 135921, 135922, 135925, 135926, 135927, 135928, 135929, 135986, 135987, 135988, 135989, 135990, 135991, 135992, 135993, 136020, 136021, 136023, 136024, 136025, 136026, 136028, 136029, 136030, 136033, 136034, 136035, 136038, 136039, 136040, 136041, 136042, 136868, 136871, 136893, 136894,];

// Base 805
let _season1CombatantBonusMap = {
    810: [1477]
}

let _season1GladiatorItems = [
    135647, 135648, 135649, 135650, 135651, 135652, 135653, 135654, 135681, 135682, 135683, 135685, 135686, 135687, 135689, 135690, 135691, 135692, 135693, 135694, 135695, 135696, 135699, 135700, 135701, 135702, 135703, 135760, 135761, 135762, 135763, 135764, 135765, 135766, 135767, 135794, 135795, 135797, 135798, 135799, 135800, 135802, 135803, 135804, 135805, 135806, 135807, 135808, 135809, 135812, 135813, 135814, 135815, 135816, 136099, 136100, 136101, 136102, 136103, 136104, 136105, 136106, 136133, 136134, 136136, 136137, 136138, 136139, 136141, 136142, 136143, 136144, 136145, 136146, 136147, 136148, 136151, 136152, 136153, 136154, 136155, 136212, 136213, 136214, 136215, 136216, 136217, 136218, 136219, 136246, 136247, 136249, 136250, 136251, 136252, 136254, 136255, 136256, 136257, 136258, 136259, 136260, 136261, 136264, 136265, 136266, 136267, 136268, 136862, 136865, 136874, 136877, 136891, 136892, 136895, 136896,];

// Base 805
let _season1GladiatorBonusMap = {
    840: [1507],
    870: [1537]
}

let _season2CombatantItems = [
    142842, 142843, 142844, 142845, 142846, 142847, 142848, 142849, 142876, 142877, 142880, 142881, 142884, 142885, 142886, 142887, 142888, 142889, 142890, 142891, 142894, 142895, 142896, 142897, 142898, 142955, 142956, 142957, 142958, 142959, 142960, 142961, 142962, 142989, 142990, 142993, 142994, 142997, 142998, 142999, 143000, 143001, 143002, 143003, 143004, 143007, 143008, 143009, 143010, 143011, 143293, 143296,];

// Base 810
let _season2CombatantBonusMap = {
    810: [1472]
}

let _season2GladiatorItems = [
    142616, 142617, 142618, 142619, 142620, 142621, 142622, 142623, 142650, 142651, 142654, 142655, 142658, 142659, 142660, 142661, 142662, 142663, 142664, 142665, 142668, 142669, 142670, 142671, 142672, 142729, 142730, 142731, 142732, 142733, 142734, 142735, 142736, 142763, 142764, 142767, 142768, 142771, 142772, 142773, 142774, 142775, 142776, 142777, 142778, 142781, 142782, 142783, 142784, 142785, 143068, 143069, 143070, 143071, 143072, 143073, 143074, 143075, 143102, 143103, 143107, 143106, 143110, 143111, 143112, 143113, 143120, 143121, 143122, 143123, 143124, 143181, 143182, 143183, 143184, 143185, 143186, 143187, 143188, 143215, 143216, 143219, 143220, 143223, 143224, 143225, 143226, 143227, 143228, 143229, 143230, 143233, 143234, 143235, 143236, 143237, 143287, 143290, 143299, 143302, 143114, 143115, 143116, 143117,];

// Base 810
let _season2GladiatorBonusMap = {
    840: [1502],
    870: [1532]
}

let _season3CombatantItems = [
    145042, 145043, 145146, 145147, 145148, 145149, 145150, 145151, 145184, 145185, 145186, 145187, 145188, 145189, 145190, 145191, 145192, 145193, 145194, 145195, 145196, 145197, 145198, 145199, 145200, 145201, 145202, 145203, 145204, 145205, 145222, 145223, 145224, 145225, 145226, 145227, 145232, 145233, 145234, 145235, 145236, 145237, 145238, 145239,];

// Base 810
let _season3CombatantBonusMap = {
    810: [1472]
}

let _season3GladiatorItems = [
    144550, 144551, 144654, 144655, 144656, 144657, 144658, 144659, 144692, 144693, 144694, 144695, 144696, 144697, 144698, 144699, 144700, 144701, 144702, 144703, 144704, 144705, 144706, 144707, 144708, 144709, 144710, 144711, 144712, 144713, 144730, 144731, 144732, 144733, 144734, 144735, 144740, 144741, 144742, 144743, 144744, 144745, 144746, 144747, 144796, 144797, 144900, 144901, 144902, 144903, 144904, 144905, 144938, 144939, 144940, 144941, 144942, 144943, 144944, 144945, 144946, 144947, 144948, 144949, 144950, 144951, 144952, 144953, 144954, 144955, 144956, 144957, 144958, 144959, 144976, 144977, 144978, 144979, 144980, 144981, 144986, 144987, 144988, 144989, 144990, 144991, 144992, 144993,];

// Base 810
let _season3GladiatorBonusMap = {
    840: [1502],
    870: [1532]
}

let _season4CombatantItems = [
    145884, 145885, 145988, 145989, 145990, 145991, 145992, 145993, 146026, 146027, 146028, 146029, 146030, 146031, 146032, 146033, 146034, 146035, 146036, 146037, 146038, 146039, 146040, 146041, 146042, 146043, 146044, 146045, 146046, 146047, 146064, 146065, 146066, 146067, 146068, 146069, 146074, 146075, 146076, 146077, 146078, 146079, 146080, 146081,];

// Base 810
let _season4CombatantBonusMap = {
    810: [1472]
}

let _season4GladiatorItems = [
    145539, 145392, 145393, 145496, 145497, 145498, 145499, 145500, 145501, 145534, 145535, 145536, 145537, 145538, 145540, 145541, 145542, 145543, 145544, 145545, 145546, 145547, 145548, 145549, 145550, 145551, 145552, 145553, 145554, 145555, 145572, 145573, 145574, 145575, 145576, 145577, 145582, 145583, 145584, 145585, 145586, 145587, 145588, 145589, 145638, 145639, 145742, 145743, 145744, 145745, 145746, 145747, 145780, 145781, 145782, 145783, 145784, 145785, 145786, 145787, 145788, 145789, 145790, 145791, 145792, 145793, 145794, 145795, 145796, 145797, 145798, 145799, 145800, 145801, 145818, 145819, 145820, 145821, 145822, 145823, 145828, 145829, 145830, 145831, 145832, 145833, 145834, 145835,];

// Base 810
let _season4GladiatorBonusMap = {
    840: [1502],
    870: [1532]
}

let _season5CombatantItems = [
    149521, 149522, 149626, 149627, 149628, 149629, 149631, 149630, 149664, 149665, 149666, 149668, 149669, 149670, 149671, 149672, 149673, 149674, 149675, 149676, 149677, 149678, 149679, 149680, 149681, 149682, 149683, 149684, 149685, 149702, 149703, 149704, 149705, 149706, 149707, 149712, 149713, 149714, 149715, 149716, 149717, 149718, 149719, 153484, 149667,];

// Base 810
let _season5CombatantBonusMap = {
    810: [1472]
}

let _season5GladiatorItems = [
    147925, 147926, 148029, 148030, 148031, 148032, 148033, 148034, 148067, 148068, 148069, 148070, 148071, 148072, 148073, 148074, 148075, 148076, 148077, 148078, 148079, 148080, 148081, 148082, 148083, 148084, 148085, 148086, 148087, 148088, 148105, 148106, 148107, 148108, 148109, 148110, 148115, 148116, 148117, 148118, 148119, 148120, 148121, 148122, 148171, 148172, 148275, 148276, 148277, 148278, 148279, 148280, 148313, 148314, 148315, 148316, 148317, 148318, 148319, 148320, 148321, 148322, 148323, 148324, 148325, 148326, 148327, 148328, 148329, 148330, 148331, 148332, 148333, 148334, 148351, 148352, 148353, 148354, 148355, 148356, 148361, 148362, 148363, 148364, 148365, 148366, 148367, 148368,];

// Base 810
let _season5GladiatorBonusMap = {
    840: [1502],
    870: [1532]
}

let _season6CombatantItems = [
    149772, 149773, 149876, 149877, 149878, 149879, 149880, 149881, 149914, 149915, 149916, 149917, 149918, 149919, 149920, 149921, 149922, 149923, 149924, 149925, 149926, 149927, 149928, 149929, 149930, 149931, 149932, 149933, 149934, 149935, 149952, 149953, 149954, 149955, 149956, 149957, 149962, 149963, 149964, 149965, 149966, 149967, 149968, 149969,];

// Base 810
let _season6CombatantBonusMap = {
    810: [1472]
}

let _season6GladiatorItems = [
    148418, 148419, 148522, 148523, 148524, 148525, 148526, 148527, 148560, 148561, 148562, 148563, 148564, 148565, 148566, 148567, 148568, 148569, 148570, 148571, 148572, 148573, 148574, 148575, 148576, 148577, 148578, 148579, 148580, 148581, 148598, 148599, 148600, 148601, 148602, 148603, 148608, 148609, 148610, 148611, 148612, 148613, 148614, 148615, 148664, 148665, 148768, 148769, 148770, 148771, 148772, 148773, 148806, 148807, 148808, 148809, 148810, 148811, 148812, 148813, 148814, 148815, 148816, 148817, 148818, 148819, 148820, 148821, 148822, 148823, 148824, 148825, 148826, 148827, 148844, 148845, 148846, 148847, 148848, 148849, 148854, 148855, 148856, 148857, 148858, 148859, 148860, 148861,];

// Base 810
let _season6GladiatorBonusMap = {
    840: [1502],
    870: [1532]
}

let _season7CombatantItems = [
    150018, 150019, 150122, 150123, 150124, 150125, 150126, 150127, 150160, 150161, 150162, 150163, 150164, 150165, 150166, 150167, 150168, 150169, 150170, 150171, 150172, 150173, 150174, 150175, 150176, 150177, 150178, 150179, 150180, 150181, 150198, 150199, 150200, 150201, 150202, 150203, 150208, 150209, 150210, 150211, 150212, 150213, 150214, 150215,];

// Base 810
let _season7CombatantBonusMap = {
    810: [1472]
}

let _season7GladiatorItems = [
    148910, 148911, 149014, 149015, 149016, 149017, 149018, 149019, 149052, 149053, 149054, 149055, 149056, 149058, 149059, 149060, 149061, 149062, 149063, 149064, 149065, 149066, 149067, 149068, 149069, 149070, 149071, 149072, 149073, 149090, 149091, 149092, 149093, 149094, 149095, 149100, 149101, 149103, 149104, 149105, 149106, 149107, 149156, 149157, 149260, 149261, 149262, 149263, 149264, 149265, 149298, 149299, 149300, 149301, 149302, 149303, 149304, 149305, 149306, 149307, 149308, 149309, 149310, 149311, 149312, 149313, 149314, 149315, 149316, 149317, 149318, 149319, 149336, 149337, 149338, 149339, 149340, 149341, 149346, 149347, 149348, 149349, 149350, 149351, 149352, 149353, 149057, 149102,];

// Base 810
let _season7GladiatorBonusMap = {
    840: [1502],
    870: [1532]
}

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been declared in DungeonItems but was not found in ITEM_DATA`);
};

let cache = {};

export const getPVPItems = (slot = 'head', min = 0, max = 1000) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [
            ..._season1CombatantItems,
            ..._season1GladiatorItems,
            ..._season2CombatantItems,
            ..._season2GladiatorItems,
            ..._season3CombatantItems,
            ..._season3GladiatorItems,
            ..._season4CombatantItems,
            ..._season4GladiatorItems,
            ..._season5CombatantItems,
            ..._season5GladiatorItems,
            ..._season6CombatantItems,
            ..._season6GladiatorItems,
            ..._season7CombatantItems,
            ..._season7GladiatorItems,
        ].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = [
            ...getRaidTierPermutations(ITEM_DATA, _season1CombatantItems, _season1CombatantBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season1GladiatorItems, _season1GladiatorBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season2CombatantItems, _season2CombatantBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season2GladiatorItems, _season2GladiatorBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season3CombatantItems, _season3CombatantBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season3GladiatorItems, _season3GladiatorBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season4CombatantItems, _season4CombatantBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season4GladiatorItems, _season4GladiatorBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season5CombatantItems, _season5CombatantBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season5GladiatorItems, _season5GladiatorBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season6CombatantItems, _season6CombatantBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season6GladiatorItems, _season6GladiatorBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season7CombatantItems, _season7CombatantBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _season7GladiatorItems, _season7GladiatorBonusMap, slot, min, max),
        ];

    return cache[key];
};
