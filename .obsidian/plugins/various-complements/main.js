'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function pickTokens(content, trimPattern) {
    return content.split(trimPattern).filter((x) => x !== "");
}
const TRIM_CHAR_PATTERN = /[\n\t\\\[\]/()<>"'.,|;:*~ `]/g;
class DefaultTokenizer {
    tokenize(content) {
        return pickTokens(content, this.getTrimPattern());
    }
    getTrimPattern() {
        return TRIM_CHAR_PATTERN;
    }
    shouldIgnore(str) {
        return false;
    }
}

const ARABIC_TRIM_CHAR_PATTERN = /[\n\t\\\[\]/()<>"'.,|;:*~ `،؛]/g;
class ArabicTokenizer extends DefaultTokenizer {
    getTrimPattern() {
        return ARABIC_TRIM_CHAR_PATTERN;
    }
}

// @ts-nocheck
// Because this code is originally javascript code.
// noinspection FunctionTooLongJS,FunctionWithMultipleLoopsJS,EqualityComparisonWithCoercionJS,PointlessBooleanExpressionJS,JSDeclarationsAtScopeStart
// TinySegmenter 0.1 -- Super compact Japanese tokenizer in Javascript
// (c) 2008 Taku Kudo <taku@chasen.org>
// TinySegmenter is freely distributable under the terms of a new BSD licence.
// For details, see http://chasen.org/~taku/software/TinySegmenter/LICENCE.txt
function TinySegmenter() {
    var patterns = {
        "[一二三四五六七八九十百千万億兆]": "M",
        "[一-龠々〆ヵヶ]": "H",
        "[ぁ-ん]": "I",
        "[ァ-ヴーｱ-ﾝﾞｰ]": "K",
        "[a-zA-Zａ-ｚＡ-Ｚ]": "A",
        "[0-9０-９]": "N",
    };
    this.chartype_ = [];
    for (var i in patterns) {
        var regexp = new RegExp();
        regexp.compile(i);
        this.chartype_.push([regexp, patterns[i]]);
    }
    this.BIAS__ = -332;
    this.BC1__ = { HH: 6, II: 2461, KH: 406, OH: -1378 };
    this.BC2__ = {
        AA: -3267,
        AI: 2744,
        AN: -878,
        HH: -4070,
        HM: -1711,
        HN: 4012,
        HO: 3761,
        IA: 1327,
        IH: -1184,
        II: -1332,
        IK: 1721,
        IO: 5492,
        KI: 3831,
        KK: -8741,
        MH: -3132,
        MK: 3334,
        OO: -2920,
    };
    this.BC3__ = {
        HH: 996,
        HI: 626,
        HK: -721,
        HN: -1307,
        HO: -836,
        IH: -301,
        KK: 2762,
        MK: 1079,
        MM: 4034,
        OA: -1652,
        OH: 266,
    };
    this.BP1__ = { BB: 295, OB: 304, OO: -125, UB: 352 };
    this.BP2__ = { BO: 60, OO: -1762 };
    this.BQ1__ = {
        BHH: 1150,
        BHM: 1521,
        BII: -1158,
        BIM: 886,
        BMH: 1208,
        BNH: 449,
        BOH: -91,
        BOO: -2597,
        OHI: 451,
        OIH: -296,
        OKA: 1851,
        OKH: -1020,
        OKK: 904,
        OOO: 2965,
    };
    this.BQ2__ = {
        BHH: 118,
        BHI: -1159,
        BHM: 466,
        BIH: -919,
        BKK: -1720,
        BKO: 864,
        OHH: -1139,
        OHM: -181,
        OIH: 153,
        UHI: -1146,
    };
    this.BQ3__ = {
        BHH: -792,
        BHI: 2664,
        BII: -299,
        BKI: 419,
        BMH: 937,
        BMM: 8335,
        BNN: 998,
        BOH: 775,
        OHH: 2174,
        OHM: 439,
        OII: 280,
        OKH: 1798,
        OKI: -793,
        OKO: -2242,
        OMH: -2402,
        OOO: 11699,
    };
    this.BQ4__ = {
        BHH: -3895,
        BIH: 3761,
        BII: -4654,
        BIK: 1348,
        BKK: -1806,
        BMI: -3385,
        BOO: -12396,
        OAH: 926,
        OHH: 266,
        OHK: -2036,
        ONN: -973,
    };
    this.BW1__ = {
        ",と": 660,
        ",同": 727,
        B1あ: 1404,
        B1同: 542,
        "、と": 660,
        "、同": 727,
        "」と": 1682,
        あっ: 1505,
        いう: 1743,
        いっ: -2055,
        いる: 672,
        うし: -4817,
        うん: 665,
        から: 3472,
        がら: 600,
        こう: -790,
        こと: 2083,
        こん: -1262,
        さら: -4143,
        さん: 4573,
        した: 2641,
        して: 1104,
        すで: -3399,
        そこ: 1977,
        それ: -871,
        たち: 1122,
        ため: 601,
        った: 3463,
        つい: -802,
        てい: 805,
        てき: 1249,
        でき: 1127,
        です: 3445,
        では: 844,
        とい: -4915,
        とみ: 1922,
        どこ: 3887,
        ない: 5713,
        なっ: 3015,
        など: 7379,
        なん: -1113,
        にし: 2468,
        には: 1498,
        にも: 1671,
        に対: -912,
        の一: -501,
        の中: 741,
        ませ: 2448,
        まで: 1711,
        まま: 2600,
        まる: -2155,
        やむ: -1947,
        よっ: -2565,
        れた: 2369,
        れで: -913,
        をし: 1860,
        を見: 731,
        亡く: -1886,
        京都: 2558,
        取り: -2784,
        大き: -2604,
        大阪: 1497,
        平方: -2314,
        引き: -1336,
        日本: -195,
        本当: -2423,
        毎日: -2113,
        目指: -724,
        Ｂ１あ: 1404,
        Ｂ１同: 542,
        "｣と": 1682,
    };
    this.BW2__ = {
        "..": -11822,
        11: -669,
        "――": -5730,
        "−−": -13175,
        いう: -1609,
        うか: 2490,
        かし: -1350,
        かも: -602,
        から: -7194,
        かれ: 4612,
        がい: 853,
        がら: -3198,
        きた: 1941,
        くな: -1597,
        こと: -8392,
        この: -4193,
        させ: 4533,
        され: 13168,
        さん: -3977,
        しい: -1819,
        しか: -545,
        した: 5078,
        して: 972,
        しな: 939,
        その: -3744,
        たい: -1253,
        たた: -662,
        ただ: -3857,
        たち: -786,
        たと: 1224,
        たは: -939,
        った: 4589,
        って: 1647,
        っと: -2094,
        てい: 6144,
        てき: 3640,
        てく: 2551,
        ては: -3110,
        ても: -3065,
        でい: 2666,
        でき: -1528,
        でし: -3828,
        です: -4761,
        でも: -4203,
        とい: 1890,
        とこ: -1746,
        とと: -2279,
        との: 720,
        とみ: 5168,
        とも: -3941,
        ない: -2488,
        なが: -1313,
        など: -6509,
        なの: 2614,
        なん: 3099,
        にお: -1615,
        にし: 2748,
        にな: 2454,
        によ: -7236,
        に対: -14943,
        に従: -4688,
        に関: -11388,
        のか: 2093,
        ので: -7059,
        のに: -6041,
        のの: -6125,
        はい: 1073,
        はが: -1033,
        はず: -2532,
        ばれ: 1813,
        まし: -1316,
        まで: -6621,
        まれ: 5409,
        めて: -3153,
        もい: 2230,
        もの: -10713,
        らか: -944,
        らし: -1611,
        らに: -1897,
        りし: 651,
        りま: 1620,
        れた: 4270,
        れて: 849,
        れば: 4114,
        ろう: 6067,
        われ: 7901,
        を通: -11877,
        んだ: 728,
        んな: -4115,
        一人: 602,
        一方: -1375,
        一日: 970,
        一部: -1051,
        上が: -4479,
        会社: -1116,
        出て: 2163,
        分の: -7758,
        同党: 970,
        同日: -913,
        大阪: -2471,
        委員: -1250,
        少な: -1050,
        年度: -8669,
        年間: -1626,
        府県: -2363,
        手権: -1982,
        新聞: -4066,
        日新: -722,
        日本: -7068,
        日米: 3372,
        曜日: -601,
        朝鮮: -2355,
        本人: -2697,
        東京: -1543,
        然と: -1384,
        社会: -1276,
        立て: -990,
        第に: -1612,
        米国: -4268,
        "１１": -669,
    };
    this.BW3__ = {
        あた: -2194,
        あり: 719,
        ある: 3846,
        "い.": -1185,
        "い。": -1185,
        いい: 5308,
        いえ: 2079,
        いく: 3029,
        いた: 2056,
        いっ: 1883,
        いる: 5600,
        いわ: 1527,
        うち: 1117,
        うと: 4798,
        えと: 1454,
        "か.": 2857,
        "か。": 2857,
        かけ: -743,
        かっ: -4098,
        かに: -669,
        から: 6520,
        かり: -2670,
        "が,": 1816,
        "が、": 1816,
        がき: -4855,
        がけ: -1127,
        がっ: -913,
        がら: -4977,
        がり: -2064,
        きた: 1645,
        けど: 1374,
        こと: 7397,
        この: 1542,
        ころ: -2757,
        さい: -714,
        さを: 976,
        "し,": 1557,
        "し、": 1557,
        しい: -3714,
        した: 3562,
        して: 1449,
        しな: 2608,
        しま: 1200,
        "す.": -1310,
        "す。": -1310,
        する: 6521,
        "ず,": 3426,
        "ず、": 3426,
        ずに: 841,
        そう: 428,
        "た.": 8875,
        "た。": 8875,
        たい: -594,
        たの: 812,
        たり: -1183,
        たる: -853,
        "だ.": 4098,
        "だ。": 4098,
        だっ: 1004,
        った: -4748,
        って: 300,
        てい: 6240,
        てお: 855,
        ても: 302,
        です: 1437,
        でに: -1482,
        では: 2295,
        とう: -1387,
        とし: 2266,
        との: 541,
        とも: -3543,
        どう: 4664,
        ない: 1796,
        なく: -903,
        など: 2135,
        "に,": -1021,
        "に、": -1021,
        にし: 1771,
        にな: 1906,
        には: 2644,
        "の,": -724,
        "の、": -724,
        の子: -1000,
        "は,": 1337,
        "は、": 1337,
        べき: 2181,
        まし: 1113,
        ます: 6943,
        まっ: -1549,
        まで: 6154,
        まれ: -793,
        らし: 1479,
        られ: 6820,
        るる: 3818,
        "れ,": 854,
        "れ、": 854,
        れた: 1850,
        れて: 1375,
        れば: -3246,
        れる: 1091,
        われ: -605,
        んだ: 606,
        んで: 798,
        カ月: 990,
        会議: 860,
        入り: 1232,
        大会: 2217,
        始め: 1681,
        市: 965,
        新聞: -5055,
        "日,": 974,
        "日、": 974,
        社会: 2024,
        ｶ月: 990,
    };
    this.TC1__ = {
        AAA: 1093,
        HHH: 1029,
        HHM: 580,
        HII: 998,
        HOH: -390,
        HOM: -331,
        IHI: 1169,
        IOH: -142,
        IOI: -1015,
        IOM: 467,
        MMH: 187,
        OOI: -1832,
    };
    this.TC2__ = {
        HHO: 2088,
        HII: -1023,
        HMM: -1154,
        IHI: -1965,
        KKH: 703,
        OII: -2649,
    };
    this.TC3__ = {
        AAA: -294,
        HHH: 346,
        HHI: -341,
        HII: -1088,
        HIK: 731,
        HOH: -1486,
        IHH: 128,
        IHI: -3041,
        IHO: -1935,
        IIH: -825,
        IIM: -1035,
        IOI: -542,
        KHH: -1216,
        KKA: 491,
        KKH: -1217,
        KOK: -1009,
        MHH: -2694,
        MHM: -457,
        MHO: 123,
        MMH: -471,
        NNH: -1689,
        NNO: 662,
        OHO: -3393,
    };
    this.TC4__ = {
        HHH: -203,
        HHI: 1344,
        HHK: 365,
        HHM: -122,
        HHN: 182,
        HHO: 669,
        HIH: 804,
        HII: 679,
        HOH: 446,
        IHH: 695,
        IHO: -2324,
        IIH: 321,
        III: 1497,
        IIO: 656,
        IOO: 54,
        KAK: 4845,
        KKA: 3386,
        KKK: 3065,
        MHH: -405,
        MHI: 201,
        MMH: -241,
        MMM: 661,
        MOM: 841,
    };
    this.TQ1__ = {
        BHHH: -227,
        BHHI: 316,
        BHIH: -132,
        BIHH: 60,
        BIII: 1595,
        BNHH: -744,
        BOHH: 225,
        BOOO: -908,
        OAKK: 482,
        OHHH: 281,
        OHIH: 249,
        OIHI: 200,
        OIIH: -68,
    };
    this.TQ2__ = { BIHH: -1401, BIII: -1033, BKAK: -543, BOOO: -5591 };
    this.TQ3__ = {
        BHHH: 478,
        BHHM: -1073,
        BHIH: 222,
        BHII: -504,
        BIIH: -116,
        BIII: -105,
        BMHI: -863,
        BMHM: -464,
        BOMH: 620,
        OHHH: 346,
        OHHI: 1729,
        OHII: 997,
        OHMH: 481,
        OIHH: 623,
        OIIH: 1344,
        OKAK: 2792,
        OKHH: 587,
        OKKA: 679,
        OOHH: 110,
        OOII: -685,
    };
    this.TQ4__ = {
        BHHH: -721,
        BHHM: -3604,
        BHII: -966,
        BIIH: -607,
        BIII: -2181,
        OAAA: -2763,
        OAKK: 180,
        OHHH: -294,
        OHHI: 2446,
        OHHO: 480,
        OHIH: -1573,
        OIHH: 1935,
        OIHI: -493,
        OIIH: 626,
        OIII: -4007,
        OKAK: -8156,
    };
    this.TW1__ = { につい: -4681, 東京都: 2026 };
    this.TW2__ = {
        ある程: -2049,
        いった: -1256,
        ころが: -2434,
        しょう: 3873,
        その後: -4430,
        だって: -1049,
        ていた: 1833,
        として: -4657,
        ともに: -4517,
        もので: 1882,
        一気に: -792,
        初めて: -1512,
        同時に: -8097,
        大きな: -1255,
        対して: -2721,
        社会党: -3216,
    };
    this.TW3__ = {
        いただ: -1734,
        してい: 1314,
        として: -4314,
        につい: -5483,
        にとっ: -5989,
        に当た: -6247,
        "ので,": -727,
        "ので、": -727,
        のもの: -600,
        れから: -3752,
        十二月: -2287,
    };
    this.TW4__ = {
        "いう.": 8576,
        "いう。": 8576,
        からな: -2348,
        してい: 2958,
        "たが,": 1516,
        "たが、": 1516,
        ている: 1538,
        という: 1349,
        ました: 5543,
        ません: 1097,
        ようと: -4258,
        よると: 5865,
    };
    this.UC1__ = { A: 484, K: 93, M: 645, O: -505 };
    this.UC2__ = { A: 819, H: 1059, I: 409, M: 3987, N: 5775, O: 646 };
    this.UC3__ = { A: -1370, I: 2311 };
    this.UC4__ = {
        A: -2643,
        H: 1809,
        I: -1032,
        K: -3450,
        M: 3565,
        N: 3876,
        O: 6646,
    };
    this.UC5__ = { H: 313, I: -1238, K: -799, M: 539, O: -831 };
    this.UC6__ = { H: -506, I: -253, K: 87, M: 247, O: -387 };
    this.UP1__ = { O: -214 };
    this.UP2__ = { B: 69, O: 935 };
    this.UP3__ = { B: 189 };
    this.UQ1__ = {
        BH: 21,
        BI: -12,
        BK: -99,
        BN: 142,
        BO: -56,
        OH: -95,
        OI: 477,
        OK: 410,
        OO: -2422,
    };
    this.UQ2__ = { BH: 216, BI: 113, OK: 1759 };
    this.UQ3__ = {
        BA: -479,
        BH: 42,
        BI: 1913,
        BK: -7198,
        BM: 3160,
        BN: 6427,
        BO: 14761,
        OI: -827,
        ON: -3212,
    };
    this.UW1__ = {
        ",": 156,
        "、": 156,
        "「": -463,
        あ: -941,
        う: -127,
        が: -553,
        き: 121,
        こ: 505,
        で: -201,
        と: -547,
        ど: -123,
        に: -789,
        の: -185,
        は: -847,
        も: -466,
        や: -470,
        よ: 182,
        ら: -292,
        り: 208,
        れ: 169,
        を: -446,
        ん: -137,
        "・": -135,
        主: -402,
        京: -268,
        区: -912,
        午: 871,
        国: -460,
        大: 561,
        委: 729,
        市: -411,
        日: -141,
        理: 361,
        生: -408,
        県: -386,
        都: -718,
        "｢": -463,
        "･": -135,
    };
    this.UW2__ = {
        ",": -829,
        "、": -829,
        〇: 892,
        "「": -645,
        "」": 3145,
        あ: -538,
        い: 505,
        う: 134,
        お: -502,
        か: 1454,
        が: -856,
        く: -412,
        こ: 1141,
        さ: 878,
        ざ: 540,
        し: 1529,
        す: -675,
        せ: 300,
        そ: -1011,
        た: 188,
        だ: 1837,
        つ: -949,
        て: -291,
        で: -268,
        と: -981,
        ど: 1273,
        な: 1063,
        に: -1764,
        の: 130,
        は: -409,
        ひ: -1273,
        べ: 1261,
        ま: 600,
        も: -1263,
        や: -402,
        よ: 1639,
        り: -579,
        る: -694,
        れ: 571,
        を: -2516,
        ん: 2095,
        ア: -587,
        カ: 306,
        キ: 568,
        ッ: 831,
        三: -758,
        不: -2150,
        世: -302,
        中: -968,
        主: -861,
        事: 492,
        人: -123,
        会: 978,
        保: 362,
        入: 548,
        初: -3025,
        副: -1566,
        北: -3414,
        区: -422,
        大: -1769,
        天: -865,
        太: -483,
        子: -1519,
        学: 760,
        実: 1023,
        小: -2009,
        市: -813,
        年: -1060,
        強: 1067,
        手: -1519,
        揺: -1033,
        政: 1522,
        文: -1355,
        新: -1682,
        日: -1815,
        明: -1462,
        最: -630,
        朝: -1843,
        本: -1650,
        東: -931,
        果: -665,
        次: -2378,
        民: -180,
        気: -1740,
        理: 752,
        発: 529,
        目: -1584,
        相: -242,
        県: -1165,
        立: -763,
        第: 810,
        米: 509,
        自: -1353,
        行: 838,
        西: -744,
        見: -3874,
        調: 1010,
        議: 1198,
        込: 3041,
        開: 1758,
        間: -1257,
        "｢": -645,
        "｣": 3145,
        ｯ: 831,
        ｱ: -587,
        ｶ: 306,
        ｷ: 568,
    };
    this.UW3__ = {
        ",": 4889,
        1: -800,
        "−": -1723,
        "、": 4889,
        々: -2311,
        〇: 5827,
        "」": 2670,
        "〓": -3573,
        あ: -2696,
        い: 1006,
        う: 2342,
        え: 1983,
        お: -4864,
        か: -1163,
        が: 3271,
        く: 1004,
        け: 388,
        げ: 401,
        こ: -3552,
        ご: -3116,
        さ: -1058,
        し: -395,
        す: 584,
        せ: 3685,
        そ: -5228,
        た: 842,
        ち: -521,
        っ: -1444,
        つ: -1081,
        て: 6167,
        で: 2318,
        と: 1691,
        ど: -899,
        な: -2788,
        に: 2745,
        の: 4056,
        は: 4555,
        ひ: -2171,
        ふ: -1798,
        へ: 1199,
        ほ: -5516,
        ま: -4384,
        み: -120,
        め: 1205,
        も: 2323,
        や: -788,
        よ: -202,
        ら: 727,
        り: 649,
        る: 5905,
        れ: 2773,
        わ: -1207,
        を: 6620,
        ん: -518,
        ア: 551,
        グ: 1319,
        ス: 874,
        ッ: -1350,
        ト: 521,
        ム: 1109,
        ル: 1591,
        ロ: 2201,
        ン: 278,
        "・": -3794,
        一: -1619,
        下: -1759,
        世: -2087,
        両: 3815,
        中: 653,
        主: -758,
        予: -1193,
        二: 974,
        人: 2742,
        今: 792,
        他: 1889,
        以: -1368,
        低: 811,
        何: 4265,
        作: -361,
        保: -2439,
        元: 4858,
        党: 3593,
        全: 1574,
        公: -3030,
        六: 755,
        共: -1880,
        円: 5807,
        再: 3095,
        分: 457,
        初: 2475,
        別: 1129,
        前: 2286,
        副: 4437,
        力: 365,
        動: -949,
        務: -1872,
        化: 1327,
        北: -1038,
        区: 4646,
        千: -2309,
        午: -783,
        協: -1006,
        口: 483,
        右: 1233,
        各: 3588,
        合: -241,
        同: 3906,
        和: -837,
        員: 4513,
        国: 642,
        型: 1389,
        場: 1219,
        外: -241,
        妻: 2016,
        学: -1356,
        安: -423,
        実: -1008,
        家: 1078,
        小: -513,
        少: -3102,
        州: 1155,
        市: 3197,
        平: -1804,
        年: 2416,
        広: -1030,
        府: 1605,
        度: 1452,
        建: -2352,
        当: -3885,
        得: 1905,
        思: -1291,
        性: 1822,
        戸: -488,
        指: -3973,
        政: -2013,
        教: -1479,
        数: 3222,
        文: -1489,
        新: 1764,
        日: 2099,
        旧: 5792,
        昨: -661,
        時: -1248,
        曜: -951,
        最: -937,
        月: 4125,
        期: 360,
        李: 3094,
        村: 364,
        東: -805,
        核: 5156,
        森: 2438,
        業: 484,
        氏: 2613,
        民: -1694,
        決: -1073,
        法: 1868,
        海: -495,
        無: 979,
        物: 461,
        特: -3850,
        生: -273,
        用: 914,
        町: 1215,
        的: 7313,
        直: -1835,
        省: 792,
        県: 6293,
        知: -1528,
        私: 4231,
        税: 401,
        立: -960,
        第: 1201,
        米: 7767,
        系: 3066,
        約: 3663,
        級: 1384,
        統: -4229,
        総: 1163,
        線: 1255,
        者: 6457,
        能: 725,
        自: -2869,
        英: 785,
        見: 1044,
        調: -562,
        財: -733,
        費: 1777,
        車: 1835,
        軍: 1375,
        込: -1504,
        通: -1136,
        選: -681,
        郎: 1026,
        郡: 4404,
        部: 1200,
        金: 2163,
        長: 421,
        開: -1432,
        間: 1302,
        関: -1282,
        雨: 2009,
        電: -1045,
        非: 2066,
        駅: 1620,
        "１": -800,
        "｣": 2670,
        "･": -3794,
        ｯ: -1350,
        ｱ: 551,
        ｸﾞ: 1319,
        ｽ: 874,
        ﾄ: 521,
        ﾑ: 1109,
        ﾙ: 1591,
        ﾛ: 2201,
        ﾝ: 278,
    };
    this.UW4__ = {
        ",": 3930,
        ".": 3508,
        "―": -4841,
        "、": 3930,
        "。": 3508,
        〇: 4999,
        "「": 1895,
        "」": 3798,
        "〓": -5156,
        あ: 4752,
        い: -3435,
        う: -640,
        え: -2514,
        お: 2405,
        か: 530,
        が: 6006,
        き: -4482,
        ぎ: -3821,
        く: -3788,
        け: -4376,
        げ: -4734,
        こ: 2255,
        ご: 1979,
        さ: 2864,
        し: -843,
        じ: -2506,
        す: -731,
        ず: 1251,
        せ: 181,
        そ: 4091,
        た: 5034,
        だ: 5408,
        ち: -3654,
        っ: -5882,
        つ: -1659,
        て: 3994,
        で: 7410,
        と: 4547,
        な: 5433,
        に: 6499,
        ぬ: 1853,
        ね: 1413,
        の: 7396,
        は: 8578,
        ば: 1940,
        ひ: 4249,
        び: -4134,
        ふ: 1345,
        へ: 6665,
        べ: -744,
        ほ: 1464,
        ま: 1051,
        み: -2082,
        む: -882,
        め: -5046,
        も: 4169,
        ゃ: -2666,
        や: 2795,
        ょ: -1544,
        よ: 3351,
        ら: -2922,
        り: -9726,
        る: -14896,
        れ: -2613,
        ろ: -4570,
        わ: -1783,
        を: 13150,
        ん: -2352,
        カ: 2145,
        コ: 1789,
        セ: 1287,
        ッ: -724,
        ト: -403,
        メ: -1635,
        ラ: -881,
        リ: -541,
        ル: -856,
        ン: -3637,
        "・": -4371,
        ー: -11870,
        一: -2069,
        中: 2210,
        予: 782,
        事: -190,
        井: -1768,
        人: 1036,
        以: 544,
        会: 950,
        体: -1286,
        作: 530,
        側: 4292,
        先: 601,
        党: -2006,
        共: -1212,
        内: 584,
        円: 788,
        初: 1347,
        前: 1623,
        副: 3879,
        力: -302,
        動: -740,
        務: -2715,
        化: 776,
        区: 4517,
        協: 1013,
        参: 1555,
        合: -1834,
        和: -681,
        員: -910,
        器: -851,
        回: 1500,
        国: -619,
        園: -1200,
        地: 866,
        場: -1410,
        塁: -2094,
        士: -1413,
        多: 1067,
        大: 571,
        子: -4802,
        学: -1397,
        定: -1057,
        寺: -809,
        小: 1910,
        屋: -1328,
        山: -1500,
        島: -2056,
        川: -2667,
        市: 2771,
        年: 374,
        庁: -4556,
        後: 456,
        性: 553,
        感: 916,
        所: -1566,
        支: 856,
        改: 787,
        政: 2182,
        教: 704,
        文: 522,
        方: -856,
        日: 1798,
        時: 1829,
        最: 845,
        月: -9066,
        木: -485,
        来: -442,
        校: -360,
        業: -1043,
        氏: 5388,
        民: -2716,
        気: -910,
        沢: -939,
        済: -543,
        物: -735,
        率: 672,
        球: -1267,
        生: -1286,
        産: -1101,
        田: -2900,
        町: 1826,
        的: 2586,
        目: 922,
        省: -3485,
        県: 2997,
        空: -867,
        立: -2112,
        第: 788,
        米: 2937,
        系: 786,
        約: 2171,
        経: 1146,
        統: -1169,
        総: 940,
        線: -994,
        署: 749,
        者: 2145,
        能: -730,
        般: -852,
        行: -792,
        規: 792,
        警: -1184,
        議: -244,
        谷: -1000,
        賞: 730,
        車: -1481,
        軍: 1158,
        輪: -1433,
        込: -3370,
        近: 929,
        道: -1291,
        選: 2596,
        郎: -4866,
        都: 1192,
        野: -1100,
        銀: -2213,
        長: 357,
        間: -2344,
        院: -2297,
        際: -2604,
        電: -878,
        領: -1659,
        題: -792,
        館: -1984,
        首: 1749,
        高: 2120,
        "｢": 1895,
        "｣": 3798,
        "･": -4371,
        ｯ: -724,
        ｰ: -11870,
        ｶ: 2145,
        ｺ: 1789,
        ｾ: 1287,
        ﾄ: -403,
        ﾒ: -1635,
        ﾗ: -881,
        ﾘ: -541,
        ﾙ: -856,
        ﾝ: -3637,
    };
    this.UW5__ = {
        ",": 465,
        ".": -299,
        1: -514,
        E2: -32768,
        "]": -2762,
        "、": 465,
        "。": -299,
        "「": 363,
        あ: 1655,
        い: 331,
        う: -503,
        え: 1199,
        お: 527,
        か: 647,
        が: -421,
        き: 1624,
        ぎ: 1971,
        く: 312,
        げ: -983,
        さ: -1537,
        し: -1371,
        す: -852,
        だ: -1186,
        ち: 1093,
        っ: 52,
        つ: 921,
        て: -18,
        で: -850,
        と: -127,
        ど: 1682,
        な: -787,
        に: -1224,
        の: -635,
        は: -578,
        べ: 1001,
        み: 502,
        め: 865,
        ゃ: 3350,
        ょ: 854,
        り: -208,
        る: 429,
        れ: 504,
        わ: 419,
        を: -1264,
        ん: 327,
        イ: 241,
        ル: 451,
        ン: -343,
        中: -871,
        京: 722,
        会: -1153,
        党: -654,
        務: 3519,
        区: -901,
        告: 848,
        員: 2104,
        大: -1296,
        学: -548,
        定: 1785,
        嵐: -1304,
        市: -2991,
        席: 921,
        年: 1763,
        思: 872,
        所: -814,
        挙: 1618,
        新: -1682,
        日: 218,
        月: -4353,
        査: 932,
        格: 1356,
        機: -1508,
        氏: -1347,
        田: 240,
        町: -3912,
        的: -3149,
        相: 1319,
        省: -1052,
        県: -4003,
        研: -997,
        社: -278,
        空: -813,
        統: 1955,
        者: -2233,
        表: 663,
        語: -1073,
        議: 1219,
        選: -1018,
        郎: -368,
        長: 786,
        間: 1191,
        題: 2368,
        館: -689,
        "１": -514,
        Ｅ２: -32768,
        "｢": 363,
        ｲ: 241,
        ﾙ: 451,
        ﾝ: -343,
    };
    this.UW6__ = {
        ",": 227,
        ".": 808,
        1: -270,
        E1: 306,
        "、": 227,
        "。": 808,
        あ: -307,
        う: 189,
        か: 241,
        が: -73,
        く: -121,
        こ: -200,
        じ: 1782,
        す: 383,
        た: -428,
        っ: 573,
        て: -1014,
        で: 101,
        と: -105,
        な: -253,
        に: -149,
        の: -417,
        は: -236,
        も: -206,
        り: 187,
        る: -135,
        を: 195,
        ル: -673,
        ン: -496,
        一: -277,
        中: 201,
        件: -800,
        会: 624,
        前: 302,
        区: 1792,
        員: -1212,
        委: 798,
        学: -960,
        市: 887,
        広: -695,
        後: 535,
        業: -697,
        相: 753,
        社: -507,
        福: 974,
        空: -822,
        者: 1811,
        連: 463,
        郎: 1082,
        "１": -270,
        Ｅ１: 306,
        ﾙ: -673,
        ﾝ: -496,
    };
    return this;
}
TinySegmenter.prototype.ctype_ = function (str) {
    for (var i in this.chartype_) {
        if (str.match(this.chartype_[i][0])) {
            return this.chartype_[i][1];
        }
    }
    return "O";
};
TinySegmenter.prototype.ts_ = function (v) {
    if (v) {
        return v;
    }
    return 0;
};
TinySegmenter.prototype.segment = function (input) {
    if (input == null || input == undefined || input == "") {
        return [];
    }
    var result = [];
    var seg = ["B3", "B2", "B1"];
    var ctype = ["O", "O", "O"];
    var o = input.split("");
    for (i = 0; i < o.length; ++i) {
        seg.push(o[i]);
        ctype.push(this.ctype_(o[i]));
    }
    seg.push("E1");
    seg.push("E2");
    seg.push("E3");
    ctype.push("O");
    ctype.push("O");
    ctype.push("O");
    var word = seg[3];
    var p1 = "U";
    var p2 = "U";
    var p3 = "U";
    for (var i = 4; i < seg.length - 3; ++i) {
        var score = this.BIAS__;
        var w1 = seg[i - 3];
        var w2 = seg[i - 2];
        var w3 = seg[i - 1];
        var w4 = seg[i];
        var w5 = seg[i + 1];
        var w6 = seg[i + 2];
        var c1 = ctype[i - 3];
        var c2 = ctype[i - 2];
        var c3 = ctype[i - 1];
        var c4 = ctype[i];
        var c5 = ctype[i + 1];
        var c6 = ctype[i + 2];
        score += this.ts_(this.UP1__[p1]);
        score += this.ts_(this.UP2__[p2]);
        score += this.ts_(this.UP3__[p3]);
        score += this.ts_(this.BP1__[p1 + p2]);
        score += this.ts_(this.BP2__[p2 + p3]);
        score += this.ts_(this.UW1__[w1]);
        score += this.ts_(this.UW2__[w2]);
        score += this.ts_(this.UW3__[w3]);
        score += this.ts_(this.UW4__[w4]);
        score += this.ts_(this.UW5__[w5]);
        score += this.ts_(this.UW6__[w6]);
        score += this.ts_(this.BW1__[w2 + w3]);
        score += this.ts_(this.BW2__[w3 + w4]);
        score += this.ts_(this.BW3__[w4 + w5]);
        score += this.ts_(this.TW1__[w1 + w2 + w3]);
        score += this.ts_(this.TW2__[w2 + w3 + w4]);
        score += this.ts_(this.TW3__[w3 + w4 + w5]);
        score += this.ts_(this.TW4__[w4 + w5 + w6]);
        score += this.ts_(this.UC1__[c1]);
        score += this.ts_(this.UC2__[c2]);
        score += this.ts_(this.UC3__[c3]);
        score += this.ts_(this.UC4__[c4]);
        score += this.ts_(this.UC5__[c5]);
        score += this.ts_(this.UC6__[c6]);
        score += this.ts_(this.BC1__[c2 + c3]);
        score += this.ts_(this.BC2__[c3 + c4]);
        score += this.ts_(this.BC3__[c4 + c5]);
        score += this.ts_(this.TC1__[c1 + c2 + c3]);
        score += this.ts_(this.TC2__[c2 + c3 + c4]);
        score += this.ts_(this.TC3__[c3 + c4 + c5]);
        score += this.ts_(this.TC4__[c4 + c5 + c6]);
        //  score += this.ts_(this.TC5__[c4 + c5 + c6]);
        score += this.ts_(this.UQ1__[p1 + c1]);
        score += this.ts_(this.UQ2__[p2 + c2]);
        score += this.ts_(this.UQ3__[p3 + c3]);
        score += this.ts_(this.BQ1__[p2 + c2 + c3]);
        score += this.ts_(this.BQ2__[p2 + c3 + c4]);
        score += this.ts_(this.BQ3__[p3 + c2 + c3]);
        score += this.ts_(this.BQ4__[p3 + c3 + c4]);
        score += this.ts_(this.TQ1__[p2 + c1 + c2 + c3]);
        score += this.ts_(this.TQ2__[p2 + c2 + c3 + c4]);
        score += this.ts_(this.TQ3__[p3 + c1 + c2 + c3]);
        score += this.ts_(this.TQ4__[p3 + c2 + c3 + c4]);
        var p = "O";
        if (score > 0) {
            result.push(word);
            word = "";
            p = "B";
        }
        p1 = p2;
        p2 = p3;
        p3 = p;
        word += seg[i];
    }
    result.push(word);
    return result;
};

// @ts-ignore
const segmenter = new TinySegmenter();
function pickTokensAsJapanese(content, trimPattern) {
    return content
        .split(trimPattern)
        .filter((x) => x !== "")
        .flatMap((x) => segmenter.segment(x));
}
/**
 * Japanese needs original logic.
 */
class JapaneseTokenizer {
    tokenize(content) {
        return pickTokensAsJapanese(content, this.getTrimPattern());
    }
    getTrimPattern() {
        return TRIM_CHAR_PATTERN;
    }
    shouldIgnore(str) {
        return Boolean(str.match(/^[ぁ-んａ-ｚＡ-Ｚ。、ー　]*$/));
    }
}

function createTokenizer(strategy) {
    switch (strategy.name) {
        case "default":
            return new DefaultTokenizer();
        case "arabic":
            return new ArabicTokenizer();
        case "japanese":
            return new JapaneseTokenizer();
        default:
            throw new Error(`Unexpected strategy name: ${strategy}`);
    }
}

class TokenizeStrategy {
    constructor(name, triggerThreshold) {
        this.name = name;
        this.triggerThreshold = triggerThreshold;
        TokenizeStrategy._values.push(this);
    }
    static fromName(name) {
        return TokenizeStrategy._values.find((x) => x.name === name);
    }
    static values() {
        return TokenizeStrategy._values;
    }
}
TokenizeStrategy._values = [];
TokenizeStrategy.DEFAULT = new TokenizeStrategy("default", 3);
TokenizeStrategy.JAPANESE = new TokenizeStrategy("japanese", 2);
TokenizeStrategy.ARABIC = new TokenizeStrategy("arabic", 3);

const keyBy = (values, toKey) => values.reduce((prev, cur, _1, _2, k = toKey(cur)) => ((prev[k] = cur), prev), {});
const groupBy = (values, toKey) => values.reduce((prev, cur, _1, _2, k = toKey(cur)) => ((prev[k] || (prev[k] = [])).push(cur), prev), {});
function uniq(values) {
    return [...new Set(values)];
}
function uniqWith(arr, fn) {
    return arr.filter((element, index) => arr.findIndex((step) => fn(element, step)) === index);
}

class AppHelper {
    constructor(app) {
        this.app = app;
    }
    getAliases(file) {
        var _a, _b;
        return ((_b = obsidian.parseFrontMatterAliases((_a = this.app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.frontmatter)) !== null && _b !== void 0 ? _b : []);
    }
    getMarkdownViewInActiveLeaf() {
        if (!this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) {
            return null;
        }
        return this.app.workspace.activeLeaf.view;
    }
    getCurrentEditor() {
        var _a, _b;
        return (_b = (_a = this.getMarkdownViewInActiveLeaf()) === null || _a === void 0 ? void 0 : _a.editor) !== null && _b !== void 0 ? _b : null;
    }
    searchPhantomLinks() {
        return uniq(Object.values(this.app.metadataCache.unresolvedLinks)
            .map(Object.keys)
            .flat());
    }
    /**
     * Unsafe method
     */
    isIMEOn() {
        var _a, _b, _c;
        if (!this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) {
            return false;
        }
        const markdownView = this.app.workspace.activeLeaf.view;
        const cm5or6 = markdownView.editor.cm;
        // cm6
        if (((_a = cm5or6 === null || cm5or6 === void 0 ? void 0 : cm5or6.inputState) === null || _a === void 0 ? void 0 : _a.composing) > 0) {
            return true;
        }
        // cm5
        return !!((_c = (_b = cm5or6 === null || cm5or6 === void 0 ? void 0 : cm5or6.display) === null || _b === void 0 ? void 0 : _b.input) === null || _c === void 0 ? void 0 : _c.composing);
    }
}

const regEmoji = new RegExp(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]|[\uFE0E-\uFE0F]/, "g");
function excludeEmoji(text) {
    return text.replace(regEmoji, "");
}
function excludeSpace(text) {
    return text.replace(/ /g, "");
}
function lowerIncludes(one, other) {
    return one.toLowerCase().includes(other.toLowerCase());
}
function lowerIncludesWithoutSpace(one, other) {
    return lowerIncludes(excludeSpace(one), excludeSpace(other));
}
function lowerStartsWith(a, b) {
    return a.toLowerCase().startsWith(b.toLowerCase());
}
function lowerStartsWithoutSpace(one, other) {
    return lowerStartsWith(excludeSpace(one), excludeSpace(other));
}
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function pushWord(wordsByFirstLetter, key, word) {
    if (wordsByFirstLetter[key] === undefined) {
        wordsByFirstLetter[key] = [word];
        return;
    }
    wordsByFirstLetter[key].push(word);
}
// Public for tests
function judge(word, query, queryStartWithUpper) {
    var _a;
    if (lowerStartsWithoutSpace(word.value, query)) {
        if (queryStartWithUpper && !word.internalLink) {
            const c = capitalizeFirstLetter(word.value);
            return { word: Object.assign(Object.assign({}, word), { value: c }), value: c, alias: false };
        }
        else {
            return { word: word, value: word.value, alias: false };
        }
    }
    const matchedAlias = (_a = word.aliases) === null || _a === void 0 ? void 0 : _a.find((a) => lowerStartsWithoutSpace(a, query));
    if (matchedAlias) {
        return { word: word, value: matchedAlias, alias: true };
    }
    return { word: word, alias: false };
}
function suggestWords(indexedWords, query, max) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const queryStartWithUpper = capitalizeFirstLetter(query) === query;
    const words = queryStartWithUpper
        ? [
            ...((_a = indexedWords.currentFile[query.charAt(0)]) !== null && _a !== void 0 ? _a : []),
            ...((_b = indexedWords.currentFile[query.charAt(0).toLowerCase()]) !== null && _b !== void 0 ? _b : []),
            ...((_c = indexedWords.customDictionary[query.charAt(0)]) !== null && _c !== void 0 ? _c : []),
            ...((_d = indexedWords.customDictionary[query.charAt(0).toLowerCase()]) !== null && _d !== void 0 ? _d : []),
            ...((_e = indexedWords.internalLink[query.charAt(0)]) !== null && _e !== void 0 ? _e : []),
            ...((_f = indexedWords.internalLink[query.charAt(0).toLowerCase()]) !== null && _f !== void 0 ? _f : []),
        ]
        : [
            ...((_g = indexedWords.currentFile[query.charAt(0)]) !== null && _g !== void 0 ? _g : []),
            ...((_h = indexedWords.customDictionary[query.charAt(0)]) !== null && _h !== void 0 ? _h : []),
            ...((_j = indexedWords.internalLink[query.charAt(0)]) !== null && _j !== void 0 ? _j : []),
            ...((_k = indexedWords.internalLink[query.charAt(0).toUpperCase()]) !== null && _k !== void 0 ? _k : []),
        ];
    const candidate = Array.from(words)
        .map((x) => judge(x, query, queryStartWithUpper))
        .filter((x) => x.value !== undefined)
        .sort((a, b) => {
        if (a.value.length !== b.value.length) {
            return a.value.length > b.value.length ? 1 : -1;
        }
        if (a.word.internalLink !== b.word.internalLink) {
            return b.word.internalLink ? 1 : -1;
        }
        if (a.alias !== b.alias) {
            return a.alias ? 1 : -1;
        }
        return 0;
    })
        .map((x) => x.word)
        .slice(0, max);
    // XXX: There is no guarantee that equals with max, but it is important for performance
    return uniqWith(candidate, (a, b) => a.value === b.value && a.internalLink === b.internalLink);
}
// TODO: refactoring
// Public for tests
function judgeByPartialMatch(word, query, queryStartWithUpper) {
    var _a, _b;
    if (lowerStartsWithoutSpace(word.value, query)) {
        if (queryStartWithUpper && !word.internalLink) {
            const c = capitalizeFirstLetter(word.value);
            return { word: Object.assign(Object.assign({}, word), { value: c }), value: c, alias: false };
        }
        else {
            return { word: word, value: word.value, alias: false };
        }
    }
    const matchedAliasStarts = (_a = word.aliases) === null || _a === void 0 ? void 0 : _a.find((a) => lowerStartsWithoutSpace(a, query));
    if (matchedAliasStarts) {
        return { word: word, value: matchedAliasStarts, alias: true };
    }
    if (lowerIncludesWithoutSpace(word.value, query)) {
        return { word: word, value: word.value, alias: false };
    }
    const matchedAliasIncluded = (_b = word.aliases) === null || _b === void 0 ? void 0 : _b.find((a) => lowerIncludesWithoutSpace(a, query));
    if (matchedAliasIncluded) {
        return { word: word, value: matchedAliasIncluded, alias: true };
    }
    return { word: word, alias: false };
}
function suggestWordsByPartialMatch(indexedWords, query, max) {
    const queryStartWithUpper = capitalizeFirstLetter(query) === query;
    const flatObjectValues = (object) => Object.values(object).flat();
    const words = [
        ...flatObjectValues(indexedWords.currentFile),
        ...flatObjectValues(indexedWords.customDictionary),
        ...flatObjectValues(indexedWords.internalLink),
    ];
    const candidate = Array.from(words)
        .map((x) => judgeByPartialMatch(x, query, queryStartWithUpper))
        .filter((x) => x.value !== undefined)
        .sort((a, b) => {
        const as = lowerStartsWith(a.value, query);
        const bs = lowerStartsWith(b.value, query);
        if (as !== bs) {
            return bs ? 1 : -1;
        }
        if (a.value.length !== b.value.length) {
            return a.value.length > b.value.length ? 1 : -1;
        }
        if (a.word.internalLink !== b.word.internalLink) {
            return b.word.internalLink ? 1 : -1;
        }
        if (a.alias !== b.alias) {
            return a.alias ? 1 : -1;
        }
        return 0;
    })
        .map((x) => x.word)
        .slice(0, max);
    // XXX: There is no guarantee that equals with max, but it is important for performance
    return uniqWith(candidate, (a, b) => a.value === b.value && a.internalLink === b.internalLink);
}

function lineToWord(line) {
    const [value, description, ...aliases] = line.split("\t");
    return {
        value,
        description,
        aliases,
    };
}
class CustomDictionaryWordProvider {
    constructor(app, paths) {
        this.words = [];
        this.app = app;
        this.fileSystemAdapter = app.vault.adapter;
        this.paths = paths;
    }
    updatePaths(paths) {
        this.paths = paths;
    }
    loadWords(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.fileSystemAdapter.read(path))
                .split(/\r\n|\n/)
                .map((x) => x.replace(/%%.*%%/g, ""))
                .filter((x) => x)
                .map(lineToWord);
        });
    }
    refreshCustomWords() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.clearWords();
            for (const path of this.paths) {
                try {
                    const words = yield this.loadWords(path);
                    words.forEach((x) => this.words.push(x));
                }
                catch (e) {
                    // noinspection ObjectAllocationIgnored
                    new obsidian.Notice(`⚠ Fail to load ${path} -- Various Complements Plugin -- \n ${e}`, 0);
                }
            }
            this.wordByValue = keyBy(this.words, (x) => x.value);
            for (const word of this.words) {
                pushWord(this.wordsByFirstLetter, word.value.charAt(0), word);
                (_a = word.aliases) === null || _a === void 0 ? void 0 : _a.forEach((a) => pushWord(this.wordsByFirstLetter, a.charAt(0), word));
            }
        });
    }
    clearWords() {
        this.words = [];
        this.wordByValue = {};
        this.wordsByFirstLetter = {};
    }
}

class CurrentFileWordProvider {
    constructor(app, appHelper, tokenizer) {
        this.app = app;
        this.appHelper = appHelper;
        this.tokenizer = tokenizer;
        this.words = [];
    }
    refreshWords() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clearWords();
            const editor = this.appHelper.getCurrentEditor();
            if (!editor) {
                return;
            }
            const file = this.app.workspace.getActiveFile();
            if (!file) {
                return;
            }
            const currentToken = this.tokenizer
                .tokenize(editor.getLine(editor.getCursor().line).slice(0, editor.getCursor().ch))
                .last();
            const content = yield this.app.vault.cachedRead(file);
            this.words = uniq(this.tokenizer.tokenize(content))
                .filter((x) => x !== currentToken)
                .map((x) => ({
                value: x,
            }));
            this.wordsByFirstLetter = groupBy(this.words, (x) => x.value.charAt(0));
        });
    }
    clearWords() {
        this.words = [];
        this.wordsByFirstLetter = {};
    }
}

class InternalLinkWordProvider {
    constructor(app, appHelper) {
        this.app = app;
        this.appHelper = appHelper;
        this.words = [];
    }
    refreshWords() {
        var _a;
        this.clearWords();
        const resolvedInternalLinkWords = this.app.vault
            .getMarkdownFiles()
            .map((x) => {
            const lessEmojiValue = excludeEmoji(x.basename);
            const aliases = x.basename === lessEmojiValue
                ? this.appHelper.getAliases(x)
                : [lessEmojiValue, ...this.appHelper.getAliases(x)];
            return {
                value: x.basename,
                aliases,
                description: x.path,
                internalLink: true,
            };
        });
        const unresolvedInternalLinkWords = this.appHelper
            .searchPhantomLinks()
            .map((text) => {
            const lessEmojiValue = excludeEmoji(text);
            const aliases = text === lessEmojiValue ? undefined : [lessEmojiValue];
            return {
                value: text,
                aliases,
                description: "Not created yet",
                internalLink: true,
            };
        });
        this.words = [...resolvedInternalLinkWords, ...unresolvedInternalLinkWords];
        for (const word of this.words) {
            pushWord(this.wordsByFirstLetter, word.value.charAt(0), word);
            (_a = word.aliases) === null || _a === void 0 ? void 0 : _a.forEach((a) => pushWord(this.wordsByFirstLetter, a.charAt(0), word));
        }
    }
    clearWords() {
        this.words = [];
        this.wordsByFirstLetter = {};
    }
}

class MatchStrategy {
    constructor(name, handler) {
        this.name = name;
        this.handler = handler;
        MatchStrategy._values.push(this);
    }
    static fromName(name) {
        return MatchStrategy._values.find((x) => x.name === name);
    }
    static values() {
        return MatchStrategy._values;
    }
}
MatchStrategy._values = [];
MatchStrategy.PREFIX = new MatchStrategy("prefix", suggestWords);
MatchStrategy.PARTIAL = new MatchStrategy("partial", suggestWordsByPartialMatch);

class AutoCompleteSuggest extends obsidian.EditorSuggest {
    constructor(app, customDictionarySuggester) {
        super(app);
        this.keymapEventHandler = [];
        this.appHelper = new AppHelper(app);
        this.customDictionaryWordProvider = customDictionarySuggester;
    }
    triggerComplete() {
        const editor = this.appHelper.getCurrentEditor();
        const activeFile = this.app.workspace.getActiveFile();
        if (!editor || !activeFile) {
            return;
        }
        // XXX: Unsafe
        this.trigger(editor, activeFile, true);
    }
    static new(app, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const ins = new AutoCompleteSuggest(app, new CustomDictionaryWordProvider(app, settings.customDictionaryPaths.split("\n").filter((x) => x)));
            yield ins.updateSettings(settings);
            yield ins.refreshCustomDictionaryTokens();
            ins.modifyEventRef = app.vault.on("modify", (_) => __awaiter(this, void 0, void 0, function* () {
                yield ins.refreshCurrentFileTokens();
            }));
            ins.activeLeafChangeRef = app.workspace.on("active-leaf-change", (_) => __awaiter(this, void 0, void 0, function* () {
                yield ins.refreshCurrentFileTokens();
                ins.refreshInternalLinkTokens();
            }));
            // Avoid to refer incomplete cache
            const cacheResolvedRef = app.metadataCache.on("resolved", () => {
                ins.refreshInternalLinkTokens();
                ins.app.metadataCache.offref(cacheResolvedRef);
            });
            return ins;
        });
    }
    predictableComplete() {
        const editor = this.appHelper.getCurrentEditor();
        if (!editor) {
            return;
        }
        const cursor = editor.getCursor();
        const currentToken = this.tokenizer
            .tokenize(editor.getLine(cursor.line).slice(0, cursor.ch))
            .last();
        if (!currentToken) {
            return;
        }
        let suggestion = this.tokenizer
            .tokenize(editor.getRange({ line: cursor.line - 50, ch: 0 }, cursor))
            .reverse()
            .slice(1)
            .find((x) => x.startsWith(currentToken));
        if (!suggestion) {
            suggestion = this.tokenizer
                .tokenize(editor.getRange(cursor, { line: cursor.line + 50, ch: 0 }))
                .find((x) => x.startsWith(currentToken));
        }
        if (!suggestion) {
            return;
        }
        editor.replaceRange(suggestion, { line: cursor.line, ch: cursor.ch - currentToken.length }, { line: cursor.line, ch: cursor.ch });
        this.close();
        this.debounceClose();
    }
    unregister() {
        this.app.vault.offref(this.modifyEventRef);
        this.app.workspace.offref(this.activeLeafChangeRef);
    }
    get tokenizerStrategy() {
        return TokenizeStrategy.fromName(this.settings.strategy);
    }
    get matchStrategy() {
        return MatchStrategy.fromName(this.settings.matchStrategy);
    }
    get minNumberTriggered() {
        return (this.settings.minNumberOfCharactersTriggered ||
            this.tokenizerStrategy.triggerThreshold);
    }
    get indexedWords() {
        return {
            currentFile: this.currentFileWordProvider.wordsByFirstLetter,
            customDictionary: this.customDictionaryWordProvider.wordsByFirstLetter,
            internalLink: this.internalLinkWordProvider.wordsByFirstLetter,
        };
    }
    toggleEnabled() {
        this.disabled = !this.disabled;
    }
    updateSettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = settings;
            this.customDictionaryWordProvider.updatePaths(settings.customDictionaryPaths.split("\n").filter((x) => x));
            this.tokenizer = createTokenizer(this.tokenizerStrategy);
            this.currentFileWordProvider = new CurrentFileWordProvider(this.app, this.appHelper, this.tokenizer);
            yield this.refreshCurrentFileTokens();
            this.internalLinkWordProvider = new InternalLinkWordProvider(this.app, this.appHelper);
            yield this.refreshInternalLinkTokens();
            this.debounceGetSuggestions = obsidian.debounce((context, cb) => {
                const start = performance.now();
                cb(this.matchStrategy.handler(this.indexedWords, context.query, this.settings.maxNumberOfSuggestions));
                this.showDebugLog("Get suggestions", performance.now() - start);
            }, this.settings.delayMilliSeconds, true);
            this.debounceClose = obsidian.debounce(() => {
                this.close();
            }, this.settings.delayMilliSeconds + 50);
            // new
            this.keymapEventHandler.forEach((x) => this.scope.unregister(x));
            this.keymapEventHandler = [
                this.scope.register([], "Tab", () => {
                    this.suggestions.useSelectedItem({});
                    return false;
                }),
            ];
            // overwrite
            this.scope.keys.find((x) => x.key === "Escape").func = () => {
                this.close();
                return this.settings.propagateEsc;
            };
        });
    }
    refreshCurrentFileTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const start = performance.now();
            if (!this.settings.enableCurrentFileComplement) {
                this.currentFileWordProvider.clearWords();
                this.showDebugLog("👢 Skip: Index current file tokens", performance.now() - start);
                return;
            }
            yield this.currentFileWordProvider.refreshWords();
            this.showDebugLog("Index current file tokens", performance.now() - start);
        });
    }
    refreshCustomDictionaryTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const start = performance.now();
            if (!this.settings.enableCustomDictionaryComplement) {
                this.customDictionaryWordProvider.clearWords();
                this.showDebugLog("👢Skip: Index custom dictionary tokens", performance.now() - start);
                return;
            }
            yield this.customDictionaryWordProvider.refreshCustomWords();
            this.showDebugLog("Index custom dictionary tokens", performance.now() - start);
        });
    }
    refreshInternalLinkTokens() {
        const start = performance.now();
        if (!this.settings.enableInternalLinkComplement) {
            this.internalLinkWordProvider.clearWords();
            this.showDebugLog("👢Skip: Index internal link tokens", performance.now() - start);
            return;
        }
        this.internalLinkWordProvider.refreshWords();
        this.showDebugLog("Index internal link tokens", performance.now() - start);
    }
    onTrigger(cursor, editor, file) {
        if (this.disabled) {
            return null;
        }
        if (this.settings.disableSuggestionsDuringImeOn &&
            this.appHelper.isIMEOn()) {
            return null;
        }
        const currentChar = editor.getRange({ line: cursor.line, ch: cursor.ch - 1 }, cursor);
        if (currentChar.match(this.tokenizer.getTrimPattern())) {
            return null;
        }
        const currentToken = this.tokenizer
            .tokenize(editor.getLine(cursor.line).slice(0, cursor.ch))
            .last();
        if (!currentToken || currentToken.length < this.minNumberTriggered) {
            return null;
        }
        if (this.tokenizer.shouldIgnore(currentToken)) {
            return null;
        }
        return {
            start: {
                ch: cursor.ch - currentToken.length,
                line: cursor.line,
            },
            end: cursor,
            query: currentToken,
        };
    }
    getSuggestions(context) {
        return new Promise((resolve) => {
            this.debounceGetSuggestions(context, (words) => {
                resolve(words);
            });
        });
    }
    renderSuggestion(word, el) {
        const base = createDiv();
        base.createDiv({
            text: word.internalLink ? `[[${word.value}]]` : word.value,
        });
        if (word.description) {
            base.createDiv({
                cls: "various-complements__suggest__description",
                text: `${word.description}`,
            });
        }
        el.appendChild(base);
    }
    selectSuggestion(word, evt) {
        if (this.context) {
            let insertedText = word.value;
            if (word.internalLink) {
                insertedText = `[[${insertedText}]]`;
            }
            if (this.settings.insertAfterCompletion) {
                insertedText = `${insertedText} `;
            }
            this.context.editor.replaceRange(insertedText, this.context.start, this.context.end);
            this.close();
            this.debounceClose();
        }
    }
    showDebugLog(message, msec) {
        if (this.settings.showLogAboutPerformanceInConsole) {
            console.log(`${message}: ${Math.round(msec)}[ms]`);
        }
    }
}

const DEFAULT_SETTINGS = {
    strategy: "default",
    matchStrategy: "prefix",
    maxNumberOfSuggestions: 5,
    minNumberOfCharactersTriggered: 0,
    delayMilliSeconds: 0,
    customDictionaryPaths: "",
    propagateEsc: false,
    enableCurrentFileComplement: true,
    enableCustomDictionaryComplement: false,
    enableInternalLinkComplement: true,
    disableSuggestionsDuringImeOn: false,
    showLogAboutPerformanceInConsole: false,
    insertAfterCompletion: true,
};
class VariousComplementsSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Various Complements - Settings" });
        containerEl.createEl("h3", { text: "Main" });
        new obsidian.Setting(containerEl).setName("Strategy").addDropdown((tc) => tc
            .addOptions(TokenizeStrategy.values().reduce((p, c) => (Object.assign(Object.assign({}, p), { [c.name]: c.name })), {}))
            .setValue(this.plugin.settings.strategy)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.strategy = value;
            yield this.plugin.saveSettings({ currentFile: true });
        })));
        new obsidian.Setting(containerEl).setName("Match strategy").addDropdown((tc) => tc
            .addOptions(MatchStrategy.values().reduce((p, c) => (Object.assign(Object.assign({}, p), { [c.name]: c.name })), {}))
            .setValue(this.plugin.settings.matchStrategy)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.matchStrategy = value;
            yield this.plugin.saveSettings({ currentFile: true });
            this.display();
        })));
        if (this.plugin.settings.matchStrategy === MatchStrategy.PARTIAL.name) {
            containerEl.createEl("div", {
                text: "⚠ `partial` is more than 10 times slower than `prefix`",
                cls: "various-complements__settings__warning",
            });
        }
        new obsidian.Setting(containerEl)
            .setName("Max number of suggestions")
            .addSlider((sc) => sc
            .setLimits(1, 255, 1)
            .setValue(this.plugin.settings.maxNumberOfSuggestions)
            .setDynamicTooltip()
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.maxNumberOfSuggestions = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Min number of characters for trigger")
            .setDesc("It uses a default value of Strategy if set 0.")
            .addSlider((sc) => sc
            .setLimits(0, 10, 1)
            .setValue(this.plugin.settings.minNumberOfCharactersTriggered)
            .setDynamicTooltip()
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.minNumberOfCharactersTriggered = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Delay milli-seconds for trigger")
            .addSlider((sc) => sc
            .setLimits(0, 1000, 10)
            .setValue(this.plugin.settings.delayMilliSeconds)
            .setDynamicTooltip()
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.delayMilliSeconds = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Disable suggestions during IME on")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.disableSuggestionsDuringImeOn).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.disableSuggestionsDuringImeOn = value;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName("Insert space after completion")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.insertAfterCompletion).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.insertAfterCompletion = value;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName("Propagate ESC")
            .setDesc("It is handy if you use Vim mode because you can switch to Normal mode by one ESC, whether it shows suggestions or not.")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.propagateEsc).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.propagateEsc = value;
                yield this.plugin.saveSettings();
            }));
        });
        containerEl.createEl("h3", { text: "Current file complement" });
        new obsidian.Setting(containerEl)
            .setName("Enable Current file complement")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.enableCurrentFileComplement).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.enableCurrentFileComplement = value;
                yield this.plugin.saveSettings({ currentFile: true });
            }));
        });
        containerEl.createEl("h3", { text: "Custom dictionary complement" });
        new obsidian.Setting(containerEl)
            .setName("Enable Custom dictionary complement")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.enableCustomDictionaryComplement).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.enableCustomDictionaryComplement = value;
                yield this.plugin.saveSettings({ customDictionary: true });
                this.display();
            }));
        });
        if (this.plugin.settings.enableCustomDictionaryComplement) {
            new obsidian.Setting(containerEl)
                .setName("Custom dictionary paths")
                .setDesc("For each line, specify a relative path from Vault root.")
                .addTextArea((tac) => {
                const el = tac
                    .setValue(this.plugin.settings.customDictionaryPaths)
                    .setPlaceholder("dictionary.md")
                    .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.customDictionaryPaths = value;
                    yield this.plugin.saveSettings();
                }));
                el.inputEl.className =
                    "various-complements__settings__custom-dictionary-paths";
                return el;
            });
        }
        containerEl.createEl("h3", { text: "Internal link complement" });
        new obsidian.Setting(containerEl)
            .setName("Enable Internal link complement")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.enableInternalLinkComplement).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.enableInternalLinkComplement = value;
                yield this.plugin.saveSettings({ internalLink: true });
            }));
        });
        containerEl.createEl("h3", { text: "Debug" });
        new obsidian.Setting(containerEl)
            .setName("Show log about performance in a console")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.showLogAboutPerformanceInConsole).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.showLogAboutPerformanceInConsole = value;
                yield this.plugin.saveSettings();
            }));
        });
    }
    toggleMatchStrategy() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.plugin.settings.matchStrategy) {
                case "prefix":
                    this.plugin.settings.matchStrategy = "partial";
                    break;
                case "partial":
                    this.plugin.settings.matchStrategy = "prefix";
                    break;
                default:
                    new obsidian.Notice("⚠Unexpected error");
            }
            yield this.plugin.saveSettings();
        });
    }
}

class VariousComponents extends obsidian.Plugin {
    onunload() {
        super.onunload();
        this.suggester.unregister();
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.settingTab = new VariousComplementsSettingTab(this.app, this);
            this.addSettingTab(this.settingTab);
            this.suggester = yield AutoCompleteSuggest.new(this.app, this.settings);
            this.registerEditorSuggest(this.suggester);
            this.addCommand({
                id: "reload-custom-dictionaries",
                name: "Reload custom dictionaries",
                hotkeys: [{ modifiers: ["Mod", "Shift"], key: "r" }],
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.reloadCustomDictionaries();
                    // noinspection ObjectAllocationIgnored
                    new obsidian.Notice(`Finish reload custom dictionaries`);
                }),
            });
            this.addCommand({
                id: "toggle-auto-complete",
                name: "Toggle Auto-complete",
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.suggester.toggleEnabled();
                }),
            });
            this.addCommand({
                id: "toggle-match-strategy",
                name: "Toggle Match strategy",
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.settingTab.toggleMatchStrategy();
                }),
            });
            this.addCommand({
                id: "show-suggestions",
                name: "Show suggestions",
                hotkeys: [{ modifiers: ["Mod"], key: " " }],
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    this.suggester.triggerComplete();
                }),
            });
            this.addCommand({
                id: "predictable-complements",
                name: "Predictable complement",
                hotkeys: [{ modifiers: ["Shift"], key: " " }],
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    this.suggester.predictableComplete();
                }),
            });
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign(Object.assign({}, DEFAULT_SETTINGS), (yield this.loadData()));
        });
    }
    saveSettings(needUpdateTokens = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
            yield this.suggester.updateSettings(this.settings);
            if (needUpdateTokens.currentFile) {
                yield this.suggester.refreshCurrentFileTokens();
            }
            if (needUpdateTokens.customDictionary) {
                yield this.suggester.refreshCustomDictionaryTokens();
            }
            if (needUpdateTokens.internalLink) {
                yield this.suggester.refreshInternalLinkTokens();
            }
        });
    }
    reloadCustomDictionaries() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.suggester.refreshCustomDictionaryTokens();
        });
    }
}

module.exports = VariousComponents;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy90b2tlbml6ZXIvdG9rZW5pemVycy9EZWZhdWx0VG9rZW5pemVyLnRzIiwic3JjL3Rva2VuaXplci90b2tlbml6ZXJzL0FyYWJpY1Rva2VuaXplci50cyIsInNyYy9leHRlcm5hbC90aW55LXNlZ21lbnRlci50cyIsInNyYy90b2tlbml6ZXIvdG9rZW5pemVycy9KYXBhbmVzZVRva2VuaXplci50cyIsInNyYy90b2tlbml6ZXIvdG9rZW5pemVyLnRzIiwic3JjL3Rva2VuaXplci9Ub2tlbml6ZVN0cmF0ZWd5LnRzIiwic3JjL3V0aWwvY29sbGVjdGlvbi1oZWxwZXIudHMiLCJzcmMvYXBwLWhlbHBlci50cyIsInNyYy91dGlsL3N0cmluZ3MudHMiLCJzcmMvcHJvdmlkZXIvc3VnZ2VzdGVyLnRzIiwic3JjL3Byb3ZpZGVyL0N1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIudHMiLCJzcmMvcHJvdmlkZXIvQ3VycmVudEZpbGVXb3JkUHJvdmlkZXIudHMiLCJzcmMvcHJvdmlkZXIvSW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyLnRzIiwic3JjL3Byb3ZpZGVyL01hdGNoU3RyYXRlZ3kudHMiLCJzcmMvdWkvQXV0b0NvbXBsZXRlU3VnZ2VzdC50cyIsInNyYy9zZXR0aW5ncy50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL3Rva2VuaXplclwiO1xuXG5mdW5jdGlvbiBwaWNrVG9rZW5zKGNvbnRlbnQ6IHN0cmluZywgdHJpbVBhdHRlcm46IFJlZ0V4cCk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIGNvbnRlbnQuc3BsaXQodHJpbVBhdHRlcm4pLmZpbHRlcigoeCkgPT4geCAhPT0gXCJcIik7XG59XG5cbmV4cG9ydCBjb25zdCBUUklNX0NIQVJfUEFUVEVSTiA9IC9bXFxuXFx0XFxcXFxcW1xcXS8oKTw+XCInLix8OzoqfiBgXS9nO1xuZXhwb3J0IGNsYXNzIERlZmF1bHRUb2tlbml6ZXIgaW1wbGVtZW50cyBUb2tlbml6ZXIge1xuICB0b2tlbml6ZShjb250ZW50OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHBpY2tUb2tlbnMoY29udGVudCwgdGhpcy5nZXRUcmltUGF0dGVybigpKTtcbiAgfVxuXG4gIGdldFRyaW1QYXR0ZXJuKCk6IFJlZ0V4cCB7XG4gICAgcmV0dXJuIFRSSU1fQ0hBUl9QQVRURVJOO1xuICB9XG5cbiAgc2hvdWxkSWdub3JlKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEZWZhdWx0VG9rZW5pemVyIH0gZnJvbSBcIi4vRGVmYXVsdFRva2VuaXplclwiO1xuXG5jb25zdCBBUkFCSUNfVFJJTV9DSEFSX1BBVFRFUk4gPSAvW1xcblxcdFxcXFxcXFtcXF0vKCk8PlwiJy4sfDs6Kn4gYNiM2JtdL2c7XG5leHBvcnQgY2xhc3MgQXJhYmljVG9rZW5pemVyIGV4dGVuZHMgRGVmYXVsdFRva2VuaXplciB7XG4gIGdldFRyaW1QYXR0ZXJuKCk6IFJlZ0V4cCB7XG4gICAgcmV0dXJuIEFSQUJJQ19UUklNX0NIQVJfUEFUVEVSTjtcbiAgfVxufVxuIiwiLy8gQHRzLW5vY2hlY2tcbi8vIEJlY2F1c2UgdGhpcyBjb2RlIGlzIG9yaWdpbmFsbHkgamF2YXNjcmlwdCBjb2RlLlxuLy8gbm9pbnNwZWN0aW9uIEZ1bmN0aW9uVG9vTG9uZ0pTLEZ1bmN0aW9uV2l0aE11bHRpcGxlTG9vcHNKUyxFcXVhbGl0eUNvbXBhcmlzb25XaXRoQ29lcmNpb25KUyxQb2ludGxlc3NCb29sZWFuRXhwcmVzc2lvbkpTLEpTRGVjbGFyYXRpb25zQXRTY29wZVN0YXJ0XG5cbi8vIFRpbnlTZWdtZW50ZXIgMC4xIC0tIFN1cGVyIGNvbXBhY3QgSmFwYW5lc2UgdG9rZW5pemVyIGluIEphdmFzY3JpcHRcbi8vIChjKSAyMDA4IFRha3UgS3VkbyA8dGFrdUBjaGFzZW4ub3JnPlxuLy8gVGlueVNlZ21lbnRlciBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZSB1bmRlciB0aGUgdGVybXMgb2YgYSBuZXcgQlNEIGxpY2VuY2UuXG4vLyBGb3IgZGV0YWlscywgc2VlIGh0dHA6Ly9jaGFzZW4ub3JnL350YWt1L3NvZnR3YXJlL1RpbnlTZWdtZW50ZXIvTElDRU5DRS50eHRcblxuZnVuY3Rpb24gVGlueVNlZ21lbnRlcigpIHtcbiAgdmFyIHBhdHRlcm5zID0ge1xuICAgIFwiW+S4gOS6jOS4ieWbm+S6lOWFreS4g+WFq+S5neWNgeeZvuWNg+S4h+WEhOWFhl1cIjogXCJNXCIsXG4gICAgXCJb5LiALem+oOOAheOAhuODteODtl1cIjogXCJIXCIsXG4gICAgXCJb44GBLeOCk11cIjogXCJJXCIsXG4gICAgXCJb44KhLeODtOODvO+9sS3vvp3vvp7vvbBdXCI6IFwiS1wiLFxuICAgIFwiW2EtekEtWu+9gS3vvZrvvKEt77y6XVwiOiBcIkFcIixcbiAgICBcIlswLTnvvJAt77yZXVwiOiBcIk5cIixcbiAgfTtcbiAgdGhpcy5jaGFydHlwZV8gPSBbXTtcbiAgZm9yICh2YXIgaSBpbiBwYXR0ZXJucykge1xuICAgIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKCk7XG4gICAgcmVnZXhwLmNvbXBpbGUoaSk7XG4gICAgdGhpcy5jaGFydHlwZV8ucHVzaChbcmVnZXhwLCBwYXR0ZXJuc1tpXV0pO1xuICB9XG5cbiAgdGhpcy5CSUFTX18gPSAtMzMyO1xuICB0aGlzLkJDMV9fID0geyBISDogNiwgSUk6IDI0NjEsIEtIOiA0MDYsIE9IOiAtMTM3OCB9O1xuICB0aGlzLkJDMl9fID0ge1xuICAgIEFBOiAtMzI2NyxcbiAgICBBSTogMjc0NCxcbiAgICBBTjogLTg3OCxcbiAgICBISDogLTQwNzAsXG4gICAgSE06IC0xNzExLFxuICAgIEhOOiA0MDEyLFxuICAgIEhPOiAzNzYxLFxuICAgIElBOiAxMzI3LFxuICAgIElIOiAtMTE4NCxcbiAgICBJSTogLTEzMzIsXG4gICAgSUs6IDE3MjEsXG4gICAgSU86IDU0OTIsXG4gICAgS0k6IDM4MzEsXG4gICAgS0s6IC04NzQxLFxuICAgIE1IOiAtMzEzMixcbiAgICBNSzogMzMzNCxcbiAgICBPTzogLTI5MjAsXG4gIH07XG4gIHRoaXMuQkMzX18gPSB7XG4gICAgSEg6IDk5NixcbiAgICBISTogNjI2LFxuICAgIEhLOiAtNzIxLFxuICAgIEhOOiAtMTMwNyxcbiAgICBITzogLTgzNixcbiAgICBJSDogLTMwMSxcbiAgICBLSzogMjc2MixcbiAgICBNSzogMTA3OSxcbiAgICBNTTogNDAzNCxcbiAgICBPQTogLTE2NTIsXG4gICAgT0g6IDI2NixcbiAgfTtcbiAgdGhpcy5CUDFfXyA9IHsgQkI6IDI5NSwgT0I6IDMwNCwgT086IC0xMjUsIFVCOiAzNTIgfTtcbiAgdGhpcy5CUDJfXyA9IHsgQk86IDYwLCBPTzogLTE3NjIgfTtcbiAgdGhpcy5CUTFfXyA9IHtcbiAgICBCSEg6IDExNTAsXG4gICAgQkhNOiAxNTIxLFxuICAgIEJJSTogLTExNTgsXG4gICAgQklNOiA4ODYsXG4gICAgQk1IOiAxMjA4LFxuICAgIEJOSDogNDQ5LFxuICAgIEJPSDogLTkxLFxuICAgIEJPTzogLTI1OTcsXG4gICAgT0hJOiA0NTEsXG4gICAgT0lIOiAtMjk2LFxuICAgIE9LQTogMTg1MSxcbiAgICBPS0g6IC0xMDIwLFxuICAgIE9LSzogOTA0LFxuICAgIE9PTzogMjk2NSxcbiAgfTtcbiAgdGhpcy5CUTJfXyA9IHtcbiAgICBCSEg6IDExOCxcbiAgICBCSEk6IC0xMTU5LFxuICAgIEJITTogNDY2LFxuICAgIEJJSDogLTkxOSxcbiAgICBCS0s6IC0xNzIwLFxuICAgIEJLTzogODY0LFxuICAgIE9ISDogLTExMzksXG4gICAgT0hNOiAtMTgxLFxuICAgIE9JSDogMTUzLFxuICAgIFVISTogLTExNDYsXG4gIH07XG4gIHRoaXMuQlEzX18gPSB7XG4gICAgQkhIOiAtNzkyLFxuICAgIEJISTogMjY2NCxcbiAgICBCSUk6IC0yOTksXG4gICAgQktJOiA0MTksXG4gICAgQk1IOiA5MzcsXG4gICAgQk1NOiA4MzM1LFxuICAgIEJOTjogOTk4LFxuICAgIEJPSDogNzc1LFxuICAgIE9ISDogMjE3NCxcbiAgICBPSE06IDQzOSxcbiAgICBPSUk6IDI4MCxcbiAgICBPS0g6IDE3OTgsXG4gICAgT0tJOiAtNzkzLFxuICAgIE9LTzogLTIyNDIsXG4gICAgT01IOiAtMjQwMixcbiAgICBPT086IDExNjk5LFxuICB9O1xuICB0aGlzLkJRNF9fID0ge1xuICAgIEJISDogLTM4OTUsXG4gICAgQklIOiAzNzYxLFxuICAgIEJJSTogLTQ2NTQsXG4gICAgQklLOiAxMzQ4LFxuICAgIEJLSzogLTE4MDYsXG4gICAgQk1JOiAtMzM4NSxcbiAgICBCT086IC0xMjM5NixcbiAgICBPQUg6IDkyNixcbiAgICBPSEg6IDI2NixcbiAgICBPSEs6IC0yMDM2LFxuICAgIE9OTjogLTk3MyxcbiAgfTtcbiAgdGhpcy5CVzFfXyA9IHtcbiAgICBcIizjgahcIjogNjYwLFxuICAgIFwiLOWQjFwiOiA3MjcsXG4gICAgQjHjgYI6IDE0MDQsXG4gICAgQjHlkIw6IDU0MixcbiAgICBcIuOAgeOBqFwiOiA2NjAsXG4gICAgXCLjgIHlkIxcIjogNzI3LFxuICAgIFwi44CN44GoXCI6IDE2ODIsXG4gICAg44GC44GjOiAxNTA1LFxuICAgIOOBhOOBhjogMTc0MyxcbiAgICDjgYTjgaM6IC0yMDU1LFxuICAgIOOBhOOCizogNjcyLFxuICAgIOOBhuOBlzogLTQ4MTcsXG4gICAg44GG44KTOiA2NjUsXG4gICAg44GL44KJOiAzNDcyLFxuICAgIOOBjOOCiTogNjAwLFxuICAgIOOBk+OBhjogLTc5MCxcbiAgICDjgZPjgag6IDIwODMsXG4gICAg44GT44KTOiAtMTI2MixcbiAgICDjgZXjgok6IC00MTQzLFxuICAgIOOBleOCkzogNDU3MyxcbiAgICDjgZfjgZ86IDI2NDEsXG4gICAg44GX44GmOiAxMTA0LFxuICAgIOOBmeOBpzogLTMzOTksXG4gICAg44Gd44GTOiAxOTc3LFxuICAgIOOBneOCjDogLTg3MSxcbiAgICDjgZ/jgaE6IDExMjIsXG4gICAg44Gf44KBOiA2MDEsXG4gICAg44Gj44GfOiAzNDYzLFxuICAgIOOBpOOBhDogLTgwMixcbiAgICDjgabjgYQ6IDgwNSxcbiAgICDjgabjgY06IDEyNDksXG4gICAg44Gn44GNOiAxMTI3LFxuICAgIOOBp+OBmTogMzQ0NSxcbiAgICDjgafjga86IDg0NCxcbiAgICDjgajjgYQ6IC00OTE1LFxuICAgIOOBqOOBvzogMTkyMixcbiAgICDjganjgZM6IDM4ODcsXG4gICAg44Gq44GEOiA1NzEzLFxuICAgIOOBquOBozogMzAxNSxcbiAgICDjgarjgak6IDczNzksXG4gICAg44Gq44KTOiAtMTExMyxcbiAgICDjgavjgZc6IDI0NjgsXG4gICAg44Gr44GvOiAxNDk4LFxuICAgIOOBq+OCgjogMTY3MSxcbiAgICDjgavlr746IC05MTIsXG4gICAg44Gu5LiAOiAtNTAxLFxuICAgIOOBruS4rTogNzQxLFxuICAgIOOBvuOBmzogMjQ0OCxcbiAgICDjgb7jgac6IDE3MTEsXG4gICAg44G+44G+OiAyNjAwLFxuICAgIOOBvuOCizogLTIxNTUsXG4gICAg44KE44KAOiAtMTk0NyxcbiAgICDjgojjgaM6IC0yNTY1LFxuICAgIOOCjOOBnzogMjM2OSxcbiAgICDjgozjgac6IC05MTMsXG4gICAg44KS44GXOiAxODYwLFxuICAgIOOCkuimizogNzMxLFxuICAgIOS6oeOBjzogLTE4ODYsXG4gICAg5Lqs6YO9OiAyNTU4LFxuICAgIOWPluOCijogLTI3ODQsXG4gICAg5aSn44GNOiAtMjYwNCxcbiAgICDlpKfpmKo6IDE0OTcsXG4gICAg5bmz5pa5OiAtMjMxNCxcbiAgICDlvJXjgY06IC0xMzM2LFxuICAgIOaXpeacrDogLTE5NSxcbiAgICDmnKzlvZM6IC0yNDIzLFxuICAgIOavjuaXpTogLTIxMTMsXG4gICAg55uu5oyHOiAtNzI0LFxuICAgIO+8ou+8keOBgjogMTQwNCxcbiAgICDvvKLvvJHlkIw6IDU0MixcbiAgICBcIu+9o+OBqFwiOiAxNjgyLFxuICB9O1xuICB0aGlzLkJXMl9fID0ge1xuICAgIFwiLi5cIjogLTExODIyLFxuICAgIDExOiAtNjY5LFxuICAgIFwi4oCV4oCVXCI6IC01NzMwLFxuICAgIFwi4oiS4oiSXCI6IC0xMzE3NSxcbiAgICDjgYTjgYY6IC0xNjA5LFxuICAgIOOBhuOBizogMjQ5MCxcbiAgICDjgYvjgZc6IC0xMzUwLFxuICAgIOOBi+OCgjogLTYwMixcbiAgICDjgYvjgok6IC03MTk0LFxuICAgIOOBi+OCjDogNDYxMixcbiAgICDjgYzjgYQ6IDg1MyxcbiAgICDjgYzjgok6IC0zMTk4LFxuICAgIOOBjeOBnzogMTk0MSxcbiAgICDjgY/jgao6IC0xNTk3LFxuICAgIOOBk+OBqDogLTgzOTIsXG4gICAg44GT44GuOiAtNDE5MyxcbiAgICDjgZXjgZs6IDQ1MzMsXG4gICAg44GV44KMOiAxMzE2OCxcbiAgICDjgZXjgpM6IC0zOTc3LFxuICAgIOOBl+OBhDogLTE4MTksXG4gICAg44GX44GLOiAtNTQ1LFxuICAgIOOBl+OBnzogNTA3OCxcbiAgICDjgZfjgaY6IDk3MixcbiAgICDjgZfjgao6IDkzOSxcbiAgICDjgZ3jga46IC0zNzQ0LFxuICAgIOOBn+OBhDogLTEyNTMsXG4gICAg44Gf44GfOiAtNjYyLFxuICAgIOOBn+OBoDogLTM4NTcsXG4gICAg44Gf44GhOiAtNzg2LFxuICAgIOOBn+OBqDogMTIyNCxcbiAgICDjgZ/jga86IC05MzksXG4gICAg44Gj44GfOiA0NTg5LFxuICAgIOOBo+OBpjogMTY0NyxcbiAgICDjgaPjgag6IC0yMDk0LFxuICAgIOOBpuOBhDogNjE0NCxcbiAgICDjgabjgY06IDM2NDAsXG4gICAg44Gm44GPOiAyNTUxLFxuICAgIOOBpuOBrzogLTMxMTAsXG4gICAg44Gm44KCOiAtMzA2NSxcbiAgICDjgafjgYQ6IDI2NjYsXG4gICAg44Gn44GNOiAtMTUyOCxcbiAgICDjgafjgZc6IC0zODI4LFxuICAgIOOBp+OBmTogLTQ3NjEsXG4gICAg44Gn44KCOiAtNDIwMyxcbiAgICDjgajjgYQ6IDE4OTAsXG4gICAg44Go44GTOiAtMTc0NixcbiAgICDjgajjgag6IC0yMjc5LFxuICAgIOOBqOOBrjogNzIwLFxuICAgIOOBqOOBvzogNTE2OCxcbiAgICDjgajjgoI6IC0zOTQxLFxuICAgIOOBquOBhDogLTI0ODgsXG4gICAg44Gq44GMOiAtMTMxMyxcbiAgICDjgarjgak6IC02NTA5LFxuICAgIOOBquOBrjogMjYxNCxcbiAgICDjgarjgpM6IDMwOTksXG4gICAg44Gr44GKOiAtMTYxNSxcbiAgICDjgavjgZc6IDI3NDgsXG4gICAg44Gr44GqOiAyNDU0LFxuICAgIOOBq+OCiDogLTcyMzYsXG4gICAg44Gr5a++OiAtMTQ5NDMsXG4gICAg44Gr5b6TOiAtNDY4OCxcbiAgICDjgavplqI6IC0xMTM4OCxcbiAgICDjga7jgYs6IDIwOTMsXG4gICAg44Gu44GnOiAtNzA1OSxcbiAgICDjga7jgas6IC02MDQxLFxuICAgIOOBruOBrjogLTYxMjUsXG4gICAg44Gv44GEOiAxMDczLFxuICAgIOOBr+OBjDogLTEwMzMsXG4gICAg44Gv44GaOiAtMjUzMixcbiAgICDjgbDjgow6IDE4MTMsXG4gICAg44G+44GXOiAtMTMxNixcbiAgICDjgb7jgac6IC02NjIxLFxuICAgIOOBvuOCjDogNTQwOSxcbiAgICDjgoHjgaY6IC0zMTUzLFxuICAgIOOCguOBhDogMjIzMCxcbiAgICDjgoLjga46IC0xMDcxMyxcbiAgICDjgonjgYs6IC05NDQsXG4gICAg44KJ44GXOiAtMTYxMSxcbiAgICDjgonjgas6IC0xODk3LFxuICAgIOOCiuOBlzogNjUxLFxuICAgIOOCiuOBvjogMTYyMCxcbiAgICDjgozjgZ86IDQyNzAsXG4gICAg44KM44GmOiA4NDksXG4gICAg44KM44GwOiA0MTE0LFxuICAgIOOCjeOBhjogNjA2NyxcbiAgICDjgo/jgow6IDc5MDEsXG4gICAg44KS6YCaOiAtMTE4NzcsXG4gICAg44KT44GgOiA3MjgsXG4gICAg44KT44GqOiAtNDExNSxcbiAgICDkuIDkuro6IDYwMixcbiAgICDkuIDmlrk6IC0xMzc1LFxuICAgIOS4gOaXpTogOTcwLFxuICAgIOS4gOmDqDogLTEwNTEsXG4gICAg5LiK44GMOiAtNDQ3OSxcbiAgICDkvJrnpL46IC0xMTE2LFxuICAgIOWHuuOBpjogMjE2MyxcbiAgICDliIbjga46IC03NzU4LFxuICAgIOWQjOWFmjogOTcwLFxuICAgIOWQjOaXpTogLTkxMyxcbiAgICDlpKfpmKo6IC0yNDcxLFxuICAgIOWnlOWToTogLTEyNTAsXG4gICAg5bCR44GqOiAtMTA1MCxcbiAgICDlubTluqY6IC04NjY5LFxuICAgIOW5tOmWkzogLTE2MjYsXG4gICAg5bqc55yMOiAtMjM2MyxcbiAgICDmiYvmqKk6IC0xOTgyLFxuICAgIOaWsOiBnjogLTQwNjYsXG4gICAg5pel5pawOiAtNzIyLFxuICAgIOaXpeacrDogLTcwNjgsXG4gICAg5pel57GzOiAzMzcyLFxuICAgIOabnOaXpTogLTYwMSxcbiAgICDmnJ3prq46IC0yMzU1LFxuICAgIOacrOS6ujogLTI2OTcsXG4gICAg5p2x5LqsOiAtMTU0MyxcbiAgICDnhLbjgag6IC0xMzg0LFxuICAgIOekvuS8mjogLTEyNzYsXG4gICAg56uL44GmOiAtOTkwLFxuICAgIOesrOOBqzogLTE2MTIsXG4gICAg57Gz5Zu9OiAtNDI2OCxcbiAgICBcIu+8ke+8kVwiOiAtNjY5LFxuICB9O1xuICB0aGlzLkJXM19fID0ge1xuICAgIOOBguOBnzogLTIxOTQsXG4gICAg44GC44KKOiA3MTksXG4gICAg44GC44KLOiAzODQ2LFxuICAgIFwi44GELlwiOiAtMTE4NSxcbiAgICBcIuOBhOOAglwiOiAtMTE4NSxcbiAgICDjgYTjgYQ6IDUzMDgsXG4gICAg44GE44GIOiAyMDc5LFxuICAgIOOBhOOBjzogMzAyOSxcbiAgICDjgYTjgZ86IDIwNTYsXG4gICAg44GE44GjOiAxODgzLFxuICAgIOOBhOOCizogNTYwMCxcbiAgICDjgYTjgo86IDE1MjcsXG4gICAg44GG44GhOiAxMTE3LFxuICAgIOOBhuOBqDogNDc5OCxcbiAgICDjgYjjgag6IDE0NTQsXG4gICAgXCLjgYsuXCI6IDI4NTcsXG4gICAgXCLjgYvjgIJcIjogMjg1NyxcbiAgICDjgYvjgZE6IC03NDMsXG4gICAg44GL44GjOiAtNDA5OCxcbiAgICDjgYvjgas6IC02NjksXG4gICAg44GL44KJOiA2NTIwLFxuICAgIOOBi+OCijogLTI2NzAsXG4gICAgXCLjgYwsXCI6IDE4MTYsXG4gICAgXCLjgYzjgIFcIjogMTgxNixcbiAgICDjgYzjgY06IC00ODU1LFxuICAgIOOBjOOBkTogLTExMjcsXG4gICAg44GM44GjOiAtOTEzLFxuICAgIOOBjOOCiTogLTQ5NzcsXG4gICAg44GM44KKOiAtMjA2NCxcbiAgICDjgY3jgZ86IDE2NDUsXG4gICAg44GR44GpOiAxMzc0LFxuICAgIOOBk+OBqDogNzM5NyxcbiAgICDjgZPjga46IDE1NDIsXG4gICAg44GT44KNOiAtMjc1NyxcbiAgICDjgZXjgYQ6IC03MTQsXG4gICAg44GV44KSOiA5NzYsXG4gICAgXCLjgZcsXCI6IDE1NTcsXG4gICAgXCLjgZfjgIFcIjogMTU1NyxcbiAgICDjgZfjgYQ6IC0zNzE0LFxuICAgIOOBl+OBnzogMzU2MixcbiAgICDjgZfjgaY6IDE0NDksXG4gICAg44GX44GqOiAyNjA4LFxuICAgIOOBl+OBvjogMTIwMCxcbiAgICBcIuOBmS5cIjogLTEzMTAsXG4gICAgXCLjgZnjgIJcIjogLTEzMTAsXG4gICAg44GZ44KLOiA2NTIxLFxuICAgIFwi44GaLFwiOiAzNDI2LFxuICAgIFwi44Ga44CBXCI6IDM0MjYsXG4gICAg44Ga44GrOiA4NDEsXG4gICAg44Gd44GGOiA0MjgsXG4gICAgXCLjgZ8uXCI6IDg4NzUsXG4gICAgXCLjgZ/jgIJcIjogODg3NSxcbiAgICDjgZ/jgYQ6IC01OTQsXG4gICAg44Gf44GuOiA4MTIsXG4gICAg44Gf44KKOiAtMTE4MyxcbiAgICDjgZ/jgos6IC04NTMsXG4gICAgXCLjgaAuXCI6IDQwOTgsXG4gICAgXCLjgaDjgIJcIjogNDA5OCxcbiAgICDjgaDjgaM6IDEwMDQsXG4gICAg44Gj44GfOiAtNDc0OCxcbiAgICDjgaPjgaY6IDMwMCxcbiAgICDjgabjgYQ6IDYyNDAsXG4gICAg44Gm44GKOiA4NTUsXG4gICAg44Gm44KCOiAzMDIsXG4gICAg44Gn44GZOiAxNDM3LFxuICAgIOOBp+OBqzogLTE0ODIsXG4gICAg44Gn44GvOiAyMjk1LFxuICAgIOOBqOOBhjogLTEzODcsXG4gICAg44Go44GXOiAyMjY2LFxuICAgIOOBqOOBrjogNTQxLFxuICAgIOOBqOOCgjogLTM1NDMsXG4gICAg44Gp44GGOiA0NjY0LFxuICAgIOOBquOBhDogMTc5NixcbiAgICDjgarjgY86IC05MDMsXG4gICAg44Gq44GpOiAyMTM1LFxuICAgIFwi44GrLFwiOiAtMTAyMSxcbiAgICBcIuOBq+OAgVwiOiAtMTAyMSxcbiAgICDjgavjgZc6IDE3NzEsXG4gICAg44Gr44GqOiAxOTA2LFxuICAgIOOBq+OBrzogMjY0NCxcbiAgICBcIuOBrixcIjogLTcyNCxcbiAgICBcIuOBruOAgVwiOiAtNzI0LFxuICAgIOOBruWtkDogLTEwMDAsXG4gICAgXCLjga8sXCI6IDEzMzcsXG4gICAgXCLjga/jgIFcIjogMTMzNyxcbiAgICDjgbnjgY06IDIxODEsXG4gICAg44G+44GXOiAxMTEzLFxuICAgIOOBvuOBmTogNjk0MyxcbiAgICDjgb7jgaM6IC0xNTQ5LFxuICAgIOOBvuOBpzogNjE1NCxcbiAgICDjgb7jgow6IC03OTMsXG4gICAg44KJ44GXOiAxNDc5LFxuICAgIOOCieOCjDogNjgyMCxcbiAgICDjgovjgos6IDM4MTgsXG4gICAgXCLjgowsXCI6IDg1NCxcbiAgICBcIuOCjOOAgVwiOiA4NTQsXG4gICAg44KM44GfOiAxODUwLFxuICAgIOOCjOOBpjogMTM3NSxcbiAgICDjgozjgbA6IC0zMjQ2LFxuICAgIOOCjOOCizogMTA5MSxcbiAgICDjgo/jgow6IC02MDUsXG4gICAg44KT44GgOiA2MDYsXG4gICAg44KT44GnOiA3OTgsXG4gICAg44Kr5pyIOiA5OTAsXG4gICAg5Lya6K2wOiA4NjAsXG4gICAg5YWl44KKOiAxMjMyLFxuICAgIOWkp+S8mjogMjIxNyxcbiAgICDlp4vjgoE6IDE2ODEsXG4gICAg5biCOiA5NjUsXG4gICAg5paw6IGeOiAtNTA1NSxcbiAgICBcIuaXpSxcIjogOTc0LFxuICAgIFwi5pel44CBXCI6IDk3NCxcbiAgICDnpL7kvJo6IDIwMjQsXG4gICAg77225pyIOiA5OTAsXG4gIH07XG4gIHRoaXMuVEMxX18gPSB7XG4gICAgQUFBOiAxMDkzLFxuICAgIEhISDogMTAyOSxcbiAgICBISE06IDU4MCxcbiAgICBISUk6IDk5OCxcbiAgICBIT0g6IC0zOTAsXG4gICAgSE9NOiAtMzMxLFxuICAgIElISTogMTE2OSxcbiAgICBJT0g6IC0xNDIsXG4gICAgSU9JOiAtMTAxNSxcbiAgICBJT006IDQ2NyxcbiAgICBNTUg6IDE4NyxcbiAgICBPT0k6IC0xODMyLFxuICB9O1xuICB0aGlzLlRDMl9fID0ge1xuICAgIEhITzogMjA4OCxcbiAgICBISUk6IC0xMDIzLFxuICAgIEhNTTogLTExNTQsXG4gICAgSUhJOiAtMTk2NSxcbiAgICBLS0g6IDcwMyxcbiAgICBPSUk6IC0yNjQ5LFxuICB9O1xuICB0aGlzLlRDM19fID0ge1xuICAgIEFBQTogLTI5NCxcbiAgICBISEg6IDM0NixcbiAgICBISEk6IC0zNDEsXG4gICAgSElJOiAtMTA4OCxcbiAgICBISUs6IDczMSxcbiAgICBIT0g6IC0xNDg2LFxuICAgIElISDogMTI4LFxuICAgIElISTogLTMwNDEsXG4gICAgSUhPOiAtMTkzNSxcbiAgICBJSUg6IC04MjUsXG4gICAgSUlNOiAtMTAzNSxcbiAgICBJT0k6IC01NDIsXG4gICAgS0hIOiAtMTIxNixcbiAgICBLS0E6IDQ5MSxcbiAgICBLS0g6IC0xMjE3LFxuICAgIEtPSzogLTEwMDksXG4gICAgTUhIOiAtMjY5NCxcbiAgICBNSE06IC00NTcsXG4gICAgTUhPOiAxMjMsXG4gICAgTU1IOiAtNDcxLFxuICAgIE5OSDogLTE2ODksXG4gICAgTk5POiA2NjIsXG4gICAgT0hPOiAtMzM5MyxcbiAgfTtcbiAgdGhpcy5UQzRfXyA9IHtcbiAgICBISEg6IC0yMDMsXG4gICAgSEhJOiAxMzQ0LFxuICAgIEhISzogMzY1LFxuICAgIEhITTogLTEyMixcbiAgICBISE46IDE4MixcbiAgICBISE86IDY2OSxcbiAgICBISUg6IDgwNCxcbiAgICBISUk6IDY3OSxcbiAgICBIT0g6IDQ0NixcbiAgICBJSEg6IDY5NSxcbiAgICBJSE86IC0yMzI0LFxuICAgIElJSDogMzIxLFxuICAgIElJSTogMTQ5NyxcbiAgICBJSU86IDY1NixcbiAgICBJT086IDU0LFxuICAgIEtBSzogNDg0NSxcbiAgICBLS0E6IDMzODYsXG4gICAgS0tLOiAzMDY1LFxuICAgIE1ISDogLTQwNSxcbiAgICBNSEk6IDIwMSxcbiAgICBNTUg6IC0yNDEsXG4gICAgTU1NOiA2NjEsXG4gICAgTU9NOiA4NDEsXG4gIH07XG4gIHRoaXMuVFExX18gPSB7XG4gICAgQkhISDogLTIyNyxcbiAgICBCSEhJOiAzMTYsXG4gICAgQkhJSDogLTEzMixcbiAgICBCSUhIOiA2MCxcbiAgICBCSUlJOiAxNTk1LFxuICAgIEJOSEg6IC03NDQsXG4gICAgQk9ISDogMjI1LFxuICAgIEJPT086IC05MDgsXG4gICAgT0FLSzogNDgyLFxuICAgIE9ISEg6IDI4MSxcbiAgICBPSElIOiAyNDksXG4gICAgT0lISTogMjAwLFxuICAgIE9JSUg6IC02OCxcbiAgfTtcbiAgdGhpcy5UUTJfXyA9IHsgQklISDogLTE0MDEsIEJJSUk6IC0xMDMzLCBCS0FLOiAtNTQzLCBCT09POiAtNTU5MSB9O1xuICB0aGlzLlRRM19fID0ge1xuICAgIEJISEg6IDQ3OCxcbiAgICBCSEhNOiAtMTA3MyxcbiAgICBCSElIOiAyMjIsXG4gICAgQkhJSTogLTUwNCxcbiAgICBCSUlIOiAtMTE2LFxuICAgIEJJSUk6IC0xMDUsXG4gICAgQk1ISTogLTg2MyxcbiAgICBCTUhNOiAtNDY0LFxuICAgIEJPTUg6IDYyMCxcbiAgICBPSEhIOiAzNDYsXG4gICAgT0hISTogMTcyOSxcbiAgICBPSElJOiA5OTcsXG4gICAgT0hNSDogNDgxLFxuICAgIE9JSEg6IDYyMyxcbiAgICBPSUlIOiAxMzQ0LFxuICAgIE9LQUs6IDI3OTIsXG4gICAgT0tISDogNTg3LFxuICAgIE9LS0E6IDY3OSxcbiAgICBPT0hIOiAxMTAsXG4gICAgT09JSTogLTY4NSxcbiAgfTtcbiAgdGhpcy5UUTRfXyA9IHtcbiAgICBCSEhIOiAtNzIxLFxuICAgIEJISE06IC0zNjA0LFxuICAgIEJISUk6IC05NjYsXG4gICAgQklJSDogLTYwNyxcbiAgICBCSUlJOiAtMjE4MSxcbiAgICBPQUFBOiAtMjc2MyxcbiAgICBPQUtLOiAxODAsXG4gICAgT0hISDogLTI5NCxcbiAgICBPSEhJOiAyNDQ2LFxuICAgIE9ISE86IDQ4MCxcbiAgICBPSElIOiAtMTU3MyxcbiAgICBPSUhIOiAxOTM1LFxuICAgIE9JSEk6IC00OTMsXG4gICAgT0lJSDogNjI2LFxuICAgIE9JSUk6IC00MDA3LFxuICAgIE9LQUs6IC04MTU2LFxuICB9O1xuICB0aGlzLlRXMV9fID0geyDjgavjgaTjgYQ6IC00NjgxLCDmnbHkuqzpg706IDIwMjYgfTtcbiAgdGhpcy5UVzJfXyA9IHtcbiAgICDjgYLjgovnqIs6IC0yMDQ5LFxuICAgIOOBhOOBo+OBnzogLTEyNTYsXG4gICAg44GT44KN44GMOiAtMjQzNCxcbiAgICDjgZfjgofjgYY6IDM4NzMsXG4gICAg44Gd44Gu5b6MOiAtNDQzMCxcbiAgICDjgaDjgaPjgaY6IC0xMDQ5LFxuICAgIOOBpuOBhOOBnzogMTgzMyxcbiAgICDjgajjgZfjgaY6IC00NjU3LFxuICAgIOOBqOOCguOBqzogLTQ1MTcsXG4gICAg44KC44Gu44GnOiAxODgyLFxuICAgIOS4gOawl+OBqzogLTc5MixcbiAgICDliJ3jgoHjgaY6IC0xNTEyLFxuICAgIOWQjOaZguOBqzogLTgwOTcsXG4gICAg5aSn44GN44GqOiAtMTI1NSxcbiAgICDlr77jgZfjgaY6IC0yNzIxLFxuICAgIOekvuS8muWFmjogLTMyMTYsXG4gIH07XG4gIHRoaXMuVFczX18gPSB7XG4gICAg44GE44Gf44GgOiAtMTczNCxcbiAgICDjgZfjgabjgYQ6IDEzMTQsXG4gICAg44Go44GX44GmOiAtNDMxNCxcbiAgICDjgavjgaTjgYQ6IC01NDgzLFxuICAgIOOBq+OBqOOBozogLTU5ODksXG4gICAg44Gr5b2T44GfOiAtNjI0NyxcbiAgICBcIuOBruOBpyxcIjogLTcyNyxcbiAgICBcIuOBruOBp+OAgVwiOiAtNzI3LFxuICAgIOOBruOCguOBrjogLTYwMCxcbiAgICDjgozjgYvjgok6IC0zNzUyLFxuICAgIOWNgeS6jOaciDogLTIyODcsXG4gIH07XG4gIHRoaXMuVFc0X18gPSB7XG4gICAgXCLjgYTjgYYuXCI6IDg1NzYsXG4gICAgXCLjgYTjgYbjgIJcIjogODU3NixcbiAgICDjgYvjgonjgao6IC0yMzQ4LFxuICAgIOOBl+OBpuOBhDogMjk1OCxcbiAgICBcIuOBn+OBjCxcIjogMTUxNixcbiAgICBcIuOBn+OBjOOAgVwiOiAxNTE2LFxuICAgIOOBpuOBhOOCizogMTUzOCxcbiAgICDjgajjgYTjgYY6IDEzNDksXG4gICAg44G+44GX44GfOiA1NTQzLFxuICAgIOOBvuOBm+OCkzogMTA5NyxcbiAgICDjgojjgYbjgag6IC00MjU4LFxuICAgIOOCiOOCi+OBqDogNTg2NSxcbiAgfTtcbiAgdGhpcy5VQzFfXyA9IHsgQTogNDg0LCBLOiA5MywgTTogNjQ1LCBPOiAtNTA1IH07XG4gIHRoaXMuVUMyX18gPSB7IEE6IDgxOSwgSDogMTA1OSwgSTogNDA5LCBNOiAzOTg3LCBOOiA1Nzc1LCBPOiA2NDYgfTtcbiAgdGhpcy5VQzNfXyA9IHsgQTogLTEzNzAsIEk6IDIzMTEgfTtcbiAgdGhpcy5VQzRfXyA9IHtcbiAgICBBOiAtMjY0MyxcbiAgICBIOiAxODA5LFxuICAgIEk6IC0xMDMyLFxuICAgIEs6IC0zNDUwLFxuICAgIE06IDM1NjUsXG4gICAgTjogMzg3NixcbiAgICBPOiA2NjQ2LFxuICB9O1xuICB0aGlzLlVDNV9fID0geyBIOiAzMTMsIEk6IC0xMjM4LCBLOiAtNzk5LCBNOiA1MzksIE86IC04MzEgfTtcbiAgdGhpcy5VQzZfXyA9IHsgSDogLTUwNiwgSTogLTI1MywgSzogODcsIE06IDI0NywgTzogLTM4NyB9O1xuICB0aGlzLlVQMV9fID0geyBPOiAtMjE0IH07XG4gIHRoaXMuVVAyX18gPSB7IEI6IDY5LCBPOiA5MzUgfTtcbiAgdGhpcy5VUDNfXyA9IHsgQjogMTg5IH07XG4gIHRoaXMuVVExX18gPSB7XG4gICAgQkg6IDIxLFxuICAgIEJJOiAtMTIsXG4gICAgQks6IC05OSxcbiAgICBCTjogMTQyLFxuICAgIEJPOiAtNTYsXG4gICAgT0g6IC05NSxcbiAgICBPSTogNDc3LFxuICAgIE9LOiA0MTAsXG4gICAgT086IC0yNDIyLFxuICB9O1xuICB0aGlzLlVRMl9fID0geyBCSDogMjE2LCBCSTogMTEzLCBPSzogMTc1OSB9O1xuICB0aGlzLlVRM19fID0ge1xuICAgIEJBOiAtNDc5LFxuICAgIEJIOiA0MixcbiAgICBCSTogMTkxMyxcbiAgICBCSzogLTcxOTgsXG4gICAgQk06IDMxNjAsXG4gICAgQk46IDY0MjcsXG4gICAgQk86IDE0NzYxLFxuICAgIE9JOiAtODI3LFxuICAgIE9OOiAtMzIxMixcbiAgfTtcbiAgdGhpcy5VVzFfXyA9IHtcbiAgICBcIixcIjogMTU2LFxuICAgIFwi44CBXCI6IDE1NixcbiAgICBcIuOAjFwiOiAtNDYzLFxuICAgIOOBgjogLTk0MSxcbiAgICDjgYY6IC0xMjcsXG4gICAg44GMOiAtNTUzLFxuICAgIOOBjTogMTIxLFxuICAgIOOBkzogNTA1LFxuICAgIOOBpzogLTIwMSxcbiAgICDjgag6IC01NDcsXG4gICAg44GpOiAtMTIzLFxuICAgIOOBqzogLTc4OSxcbiAgICDjga46IC0xODUsXG4gICAg44GvOiAtODQ3LFxuICAgIOOCgjogLTQ2NixcbiAgICDjgoQ6IC00NzAsXG4gICAg44KIOiAxODIsXG4gICAg44KJOiAtMjkyLFxuICAgIOOCijogMjA4LFxuICAgIOOCjDogMTY5LFxuICAgIOOCkjogLTQ0NixcbiAgICDjgpM6IC0xMzcsXG4gICAgXCLjg7tcIjogLTEzNSxcbiAgICDkuLs6IC00MDIsXG4gICAg5LqsOiAtMjY4LFxuICAgIOWMujogLTkxMixcbiAgICDljYg6IDg3MSxcbiAgICDlm706IC00NjAsXG4gICAg5aSnOiA1NjEsXG4gICAg5aeUOiA3MjksXG4gICAg5biCOiAtNDExLFxuICAgIOaXpTogLTE0MSxcbiAgICDnkIY6IDM2MSxcbiAgICDnlJ86IC00MDgsXG4gICAg55yMOiAtMzg2LFxuICAgIOmDvTogLTcxOCxcbiAgICBcIu+9olwiOiAtNDYzLFxuICAgIFwi772lXCI6IC0xMzUsXG4gIH07XG4gIHRoaXMuVVcyX18gPSB7XG4gICAgXCIsXCI6IC04MjksXG4gICAgXCLjgIFcIjogLTgyOSxcbiAgICDjgIc6IDg5MixcbiAgICBcIuOAjFwiOiAtNjQ1LFxuICAgIFwi44CNXCI6IDMxNDUsXG4gICAg44GCOiAtNTM4LFxuICAgIOOBhDogNTA1LFxuICAgIOOBhjogMTM0LFxuICAgIOOBijogLTUwMixcbiAgICDjgYs6IDE0NTQsXG4gICAg44GMOiAtODU2LFxuICAgIOOBjzogLTQxMixcbiAgICDjgZM6IDExNDEsXG4gICAg44GVOiA4NzgsXG4gICAg44GWOiA1NDAsXG4gICAg44GXOiAxNTI5LFxuICAgIOOBmTogLTY3NSxcbiAgICDjgZs6IDMwMCxcbiAgICDjgZ06IC0xMDExLFxuICAgIOOBnzogMTg4LFxuICAgIOOBoDogMTgzNyxcbiAgICDjgaQ6IC05NDksXG4gICAg44GmOiAtMjkxLFxuICAgIOOBpzogLTI2OCxcbiAgICDjgag6IC05ODEsXG4gICAg44GpOiAxMjczLFxuICAgIOOBqjogMTA2MyxcbiAgICDjgas6IC0xNzY0LFxuICAgIOOBrjogMTMwLFxuICAgIOOBrzogLTQwOSxcbiAgICDjgbI6IC0xMjczLFxuICAgIOOBuTogMTI2MSxcbiAgICDjgb46IDYwMCxcbiAgICDjgoI6IC0xMjYzLFxuICAgIOOChDogLTQwMixcbiAgICDjgog6IDE2MzksXG4gICAg44KKOiAtNTc5LFxuICAgIOOCizogLTY5NCxcbiAgICDjgow6IDU3MSxcbiAgICDjgpI6IC0yNTE2LFxuICAgIOOCkzogMjA5NSxcbiAgICDjgqI6IC01ODcsXG4gICAg44KrOiAzMDYsXG4gICAg44KtOiA1NjgsXG4gICAg44ODOiA4MzEsXG4gICAg5LiJOiAtNzU4LFxuICAgIOS4jTogLTIxNTAsXG4gICAg5LiWOiAtMzAyLFxuICAgIOS4rTogLTk2OCxcbiAgICDkuLs6IC04NjEsXG4gICAg5LqLOiA0OTIsXG4gICAg5Lq6OiAtMTIzLFxuICAgIOS8mjogOTc4LFxuICAgIOS/nTogMzYyLFxuICAgIOWFpTogNTQ4LFxuICAgIOWInTogLTMwMjUsXG4gICAg5YmvOiAtMTU2NixcbiAgICDljJc6IC0zNDE0LFxuICAgIOWMujogLTQyMixcbiAgICDlpKc6IC0xNzY5LFxuICAgIOWkqTogLTg2NSxcbiAgICDlpKo6IC00ODMsXG4gICAg5a2QOiAtMTUxOSxcbiAgICDlraY6IDc2MCxcbiAgICDlrp86IDEwMjMsXG4gICAg5bCPOiAtMjAwOSxcbiAgICDluII6IC04MTMsXG4gICAg5bm0OiAtMTA2MCxcbiAgICDlvLc6IDEwNjcsXG4gICAg5omLOiAtMTUxOSxcbiAgICDmj7o6IC0xMDMzLFxuICAgIOaUvzogMTUyMixcbiAgICDmloc6IC0xMzU1LFxuICAgIOaWsDogLTE2ODIsXG4gICAg5pelOiAtMTgxNSxcbiAgICDmmI46IC0xNDYyLFxuICAgIOacgDogLTYzMCxcbiAgICDmnJ06IC0xODQzLFxuICAgIOacrDogLTE2NTAsXG4gICAg5p2xOiAtOTMxLFxuICAgIOaenDogLTY2NSxcbiAgICDmrKE6IC0yMzc4LFxuICAgIOawkTogLTE4MCxcbiAgICDmsJc6IC0xNzQwLFxuICAgIOeQhjogNzUyLFxuICAgIOeZujogNTI5LFxuICAgIOebrjogLTE1ODQsXG4gICAg55u4OiAtMjQyLFxuICAgIOecjDogLTExNjUsXG4gICAg56uLOiAtNzYzLFxuICAgIOesrDogODEwLFxuICAgIOexszogNTA5LFxuICAgIOiHqjogLTEzNTMsXG4gICAg6KGMOiA4MzgsXG4gICAg6KW/OiAtNzQ0LFxuICAgIOimizogLTM4NzQsXG4gICAg6Kq/OiAxMDEwLFxuICAgIOitsDogMTE5OCxcbiAgICDovrw6IDMwNDEsXG4gICAg6ZaLOiAxNzU4LFxuICAgIOmWkzogLTEyNTcsXG4gICAgXCLvvaJcIjogLTY0NSxcbiAgICBcIu+9o1wiOiAzMTQ1LFxuICAgIO+9rzogODMxLFxuICAgIO+9sTogLTU4NyxcbiAgICDvvbY6IDMwNixcbiAgICDvvbc6IDU2OCxcbiAgfTtcbiAgdGhpcy5VVzNfXyA9IHtcbiAgICBcIixcIjogNDg4OSxcbiAgICAxOiAtODAwLFxuICAgIFwi4oiSXCI6IC0xNzIzLFxuICAgIFwi44CBXCI6IDQ4ODksXG4gICAg44CFOiAtMjMxMSxcbiAgICDjgIc6IDU4MjcsXG4gICAgXCLjgI1cIjogMjY3MCxcbiAgICBcIuOAk1wiOiAtMzU3MyxcbiAgICDjgYI6IC0yNjk2LFxuICAgIOOBhDogMTAwNixcbiAgICDjgYY6IDIzNDIsXG4gICAg44GIOiAxOTgzLFxuICAgIOOBijogLTQ4NjQsXG4gICAg44GLOiAtMTE2MyxcbiAgICDjgYw6IDMyNzEsXG4gICAg44GPOiAxMDA0LFxuICAgIOOBkTogMzg4LFxuICAgIOOBkjogNDAxLFxuICAgIOOBkzogLTM1NTIsXG4gICAg44GUOiAtMzExNixcbiAgICDjgZU6IC0xMDU4LFxuICAgIOOBlzogLTM5NSxcbiAgICDjgZk6IDU4NCxcbiAgICDjgZs6IDM2ODUsXG4gICAg44GdOiAtNTIyOCxcbiAgICDjgZ86IDg0MixcbiAgICDjgaE6IC01MjEsXG4gICAg44GjOiAtMTQ0NCxcbiAgICDjgaQ6IC0xMDgxLFxuICAgIOOBpjogNjE2NyxcbiAgICDjgac6IDIzMTgsXG4gICAg44GoOiAxNjkxLFxuICAgIOOBqTogLTg5OSxcbiAgICDjgao6IC0yNzg4LFxuICAgIOOBqzogMjc0NSxcbiAgICDjga46IDQwNTYsXG4gICAg44GvOiA0NTU1LFxuICAgIOOBsjogLTIxNzEsXG4gICAg44G1OiAtMTc5OCxcbiAgICDjgbg6IDExOTksXG4gICAg44G7OiAtNTUxNixcbiAgICDjgb46IC00Mzg0LFxuICAgIOOBvzogLTEyMCxcbiAgICDjgoE6IDEyMDUsXG4gICAg44KCOiAyMzIzLFxuICAgIOOChDogLTc4OCxcbiAgICDjgog6IC0yMDIsXG4gICAg44KJOiA3MjcsXG4gICAg44KKOiA2NDksXG4gICAg44KLOiA1OTA1LFxuICAgIOOCjDogMjc3MyxcbiAgICDjgo86IC0xMjA3LFxuICAgIOOCkjogNjYyMCxcbiAgICDjgpM6IC01MTgsXG4gICAg44KiOiA1NTEsXG4gICAg44KwOiAxMzE5LFxuICAgIOOCuTogODc0LFxuICAgIOODgzogLTEzNTAsXG4gICAg44OIOiA1MjEsXG4gICAg44OgOiAxMTA5LFxuICAgIOODqzogMTU5MSxcbiAgICDjg606IDIyMDEsXG4gICAg44OzOiAyNzgsXG4gICAgXCLjg7tcIjogLTM3OTQsXG4gICAg5LiAOiAtMTYxOSxcbiAgICDkuIs6IC0xNzU5LFxuICAgIOS4ljogLTIwODcsXG4gICAg5LihOiAzODE1LFxuICAgIOS4rTogNjUzLFxuICAgIOS4uzogLTc1OCxcbiAgICDkuog6IC0xMTkzLFxuICAgIOS6jDogOTc0LFxuICAgIOS6ujogMjc0MixcbiAgICDku4o6IDc5MixcbiAgICDku5Y6IDE4ODksXG4gICAg5LulOiAtMTM2OCxcbiAgICDkvY46IDgxMSxcbiAgICDkvZU6IDQyNjUsXG4gICAg5L2cOiAtMzYxLFxuICAgIOS/nTogLTI0MzksXG4gICAg5YWDOiA0ODU4LFxuICAgIOWFmjogMzU5MyxcbiAgICDlhag6IDE1NzQsXG4gICAg5YWsOiAtMzAzMCxcbiAgICDlha06IDc1NSxcbiAgICDlhbE6IC0xODgwLFxuICAgIOWGhjogNTgwNyxcbiAgICDlho06IDMwOTUsXG4gICAg5YiGOiA0NTcsXG4gICAg5YidOiAyNDc1LFxuICAgIOWIpTogMTEyOSxcbiAgICDliY06IDIyODYsXG4gICAg5YmvOiA0NDM3LFxuICAgIOWKmzogMzY1LFxuICAgIOWLlTogLTk0OSxcbiAgICDli5k6IC0xODcyLFxuICAgIOWMljogMTMyNyxcbiAgICDljJc6IC0xMDM4LFxuICAgIOWMujogNDY0NixcbiAgICDljYM6IC0yMzA5LFxuICAgIOWNiDogLTc4MyxcbiAgICDljZQ6IC0xMDA2LFxuICAgIOWPozogNDgzLFxuICAgIOWPszogMTIzMyxcbiAgICDlkIQ6IDM1ODgsXG4gICAg5ZCIOiAtMjQxLFxuICAgIOWQjDogMzkwNixcbiAgICDlkow6IC04MzcsXG4gICAg5ZOhOiA0NTEzLFxuICAgIOWbvTogNjQyLFxuICAgIOWeizogMTM4OSxcbiAgICDloLQ6IDEyMTksXG4gICAg5aSWOiAtMjQxLFxuICAgIOWmuzogMjAxNixcbiAgICDlraY6IC0xMzU2LFxuICAgIOWuiTogLTQyMyxcbiAgICDlrp86IC0xMDA4LFxuICAgIOWutjogMTA3OCxcbiAgICDlsI86IC01MTMsXG4gICAg5bCROiAtMzEwMixcbiAgICDlt546IDExNTUsXG4gICAg5biCOiAzMTk3LFxuICAgIOW5szogLTE4MDQsXG4gICAg5bm0OiAyNDE2LFxuICAgIOW6gzogLTEwMzAsXG4gICAg5bqcOiAxNjA1LFxuICAgIOW6pjogMTQ1MixcbiAgICDlu7o6IC0yMzUyLFxuICAgIOW9kzogLTM4ODUsXG4gICAg5b6XOiAxOTA1LFxuICAgIOaAnTogLTEyOTEsXG4gICAg5oCnOiAxODIyLFxuICAgIOaIuDogLTQ4OCxcbiAgICDmjIc6IC0zOTczLFxuICAgIOaUvzogLTIwMTMsXG4gICAg5pWZOiAtMTQ3OSxcbiAgICDmlbA6IDMyMjIsXG4gICAg5paHOiAtMTQ4OSxcbiAgICDmlrA6IDE3NjQsXG4gICAg5pelOiAyMDk5LFxuICAgIOaXpzogNTc5MixcbiAgICDmmKg6IC02NjEsXG4gICAg5pmCOiAtMTI0OCxcbiAgICDmm5w6IC05NTEsXG4gICAg5pyAOiAtOTM3LFxuICAgIOaciDogNDEyNSxcbiAgICDmnJ86IDM2MCxcbiAgICDmnY46IDMwOTQsXG4gICAg5p2ROiAzNjQsXG4gICAg5p2xOiAtODA1LFxuICAgIOaguDogNTE1NixcbiAgICDmo646IDI0MzgsXG4gICAg5qWtOiA0ODQsXG4gICAg5rCPOiAyNjEzLFxuICAgIOawkTogLTE2OTQsXG4gICAg5rG6OiAtMTA3MyxcbiAgICDms5U6IDE4NjgsXG4gICAg5rW3OiAtNDk1LFxuICAgIOeEoTogOTc5LFxuICAgIOeJqTogNDYxLFxuICAgIOeJuTogLTM4NTAsXG4gICAg55SfOiAtMjczLFxuICAgIOeUqDogOTE0LFxuICAgIOeUujogMTIxNSxcbiAgICDnmoQ6IDczMTMsXG4gICAg55u0OiAtMTgzNSxcbiAgICDnnIE6IDc5MixcbiAgICDnnIw6IDYyOTMsXG4gICAg55+lOiAtMTUyOCxcbiAgICDnp4E6IDQyMzEsXG4gICAg56iOOiA0MDEsXG4gICAg56uLOiAtOTYwLFxuICAgIOesrDogMTIwMSxcbiAgICDnsbM6IDc3NjcsXG4gICAg57O7OiAzMDY2LFxuICAgIOe0hDogMzY2MyxcbiAgICDntJo6IDEzODQsXG4gICAg57WxOiAtNDIyOSxcbiAgICDnt486IDExNjMsXG4gICAg57eaOiAxMjU1LFxuICAgIOiAhTogNjQ1NyxcbiAgICDog706IDcyNSxcbiAgICDoh6o6IC0yODY5LFxuICAgIOiLsTogNzg1LFxuICAgIOimizogMTA0NCxcbiAgICDoqr86IC01NjIsXG4gICAg6LKhOiAtNzMzLFxuICAgIOiyuzogMTc3NyxcbiAgICDou4o6IDE4MzUsXG4gICAg6LuNOiAxMzc1LFxuICAgIOi+vDogLTE1MDQsXG4gICAg6YCaOiAtMTEzNixcbiAgICDpgbg6IC02ODEsXG4gICAg6YOOOiAxMDI2LFxuICAgIOmDoTogNDQwNCxcbiAgICDpg6g6IDEyMDAsXG4gICAg6YeROiAyMTYzLFxuICAgIOmVtzogNDIxLFxuICAgIOmWizogLTE0MzIsXG4gICAg6ZaTOiAxMzAyLFxuICAgIOmWojogLTEyODIsXG4gICAg6ZuoOiAyMDA5LFxuICAgIOmbuzogLTEwNDUsXG4gICAg6Z2eOiAyMDY2LFxuICAgIOmnhTogMTYyMCxcbiAgICBcIu+8kVwiOiAtODAwLFxuICAgIFwi772jXCI6IDI2NzAsXG4gICAgXCLvvaVcIjogLTM3OTQsXG4gICAg772vOiAtMTM1MCxcbiAgICDvvbE6IDU1MSxcbiAgICDvvbjvvp46IDEzMTksXG4gICAg7729OiA4NzQsXG4gICAg776EOiA1MjEsXG4gICAg776ROiAxMTA5LFxuICAgIO++mTogMTU5MSxcbiAgICDvvps6IDIyMDEsXG4gICAg776dOiAyNzgsXG4gIH07XG4gIHRoaXMuVVc0X18gPSB7XG4gICAgXCIsXCI6IDM5MzAsXG4gICAgXCIuXCI6IDM1MDgsXG4gICAgXCLigJVcIjogLTQ4NDEsXG4gICAgXCLjgIFcIjogMzkzMCxcbiAgICBcIuOAglwiOiAzNTA4LFxuICAgIOOAhzogNDk5OSxcbiAgICBcIuOAjFwiOiAxODk1LFxuICAgIFwi44CNXCI6IDM3OTgsXG4gICAgXCLjgJNcIjogLTUxNTYsXG4gICAg44GCOiA0NzUyLFxuICAgIOOBhDogLTM0MzUsXG4gICAg44GGOiAtNjQwLFxuICAgIOOBiDogLTI1MTQsXG4gICAg44GKOiAyNDA1LFxuICAgIOOBizogNTMwLFxuICAgIOOBjDogNjAwNixcbiAgICDjgY06IC00NDgyLFxuICAgIOOBjjogLTM4MjEsXG4gICAg44GPOiAtMzc4OCxcbiAgICDjgZE6IC00Mzc2LFxuICAgIOOBkjogLTQ3MzQsXG4gICAg44GTOiAyMjU1LFxuICAgIOOBlDogMTk3OSxcbiAgICDjgZU6IDI4NjQsXG4gICAg44GXOiAtODQzLFxuICAgIOOBmDogLTI1MDYsXG4gICAg44GZOiAtNzMxLFxuICAgIOOBmjogMTI1MSxcbiAgICDjgZs6IDE4MSxcbiAgICDjgZ06IDQwOTEsXG4gICAg44GfOiA1MDM0LFxuICAgIOOBoDogNTQwOCxcbiAgICDjgaE6IC0zNjU0LFxuICAgIOOBozogLTU4ODIsXG4gICAg44GkOiAtMTY1OSxcbiAgICDjgaY6IDM5OTQsXG4gICAg44GnOiA3NDEwLFxuICAgIOOBqDogNDU0NyxcbiAgICDjgao6IDU0MzMsXG4gICAg44GrOiA2NDk5LFxuICAgIOOBrDogMTg1MyxcbiAgICDjga06IDE0MTMsXG4gICAg44GuOiA3Mzk2LFxuICAgIOOBrzogODU3OCxcbiAgICDjgbA6IDE5NDAsXG4gICAg44GyOiA0MjQ5LFxuICAgIOOBszogLTQxMzQsXG4gICAg44G1OiAxMzQ1LFxuICAgIOOBuDogNjY2NSxcbiAgICDjgbk6IC03NDQsXG4gICAg44G7OiAxNDY0LFxuICAgIOOBvjogMTA1MSxcbiAgICDjgb86IC0yMDgyLFxuICAgIOOCgDogLTg4MixcbiAgICDjgoE6IC01MDQ2LFxuICAgIOOCgjogNDE2OSxcbiAgICDjgoM6IC0yNjY2LFxuICAgIOOChDogMjc5NSxcbiAgICDjgoc6IC0xNTQ0LFxuICAgIOOCiDogMzM1MSxcbiAgICDjgok6IC0yOTIyLFxuICAgIOOCijogLTk3MjYsXG4gICAg44KLOiAtMTQ4OTYsXG4gICAg44KMOiAtMjYxMyxcbiAgICDjgo06IC00NTcwLFxuICAgIOOCjzogLTE3ODMsXG4gICAg44KSOiAxMzE1MCxcbiAgICDjgpM6IC0yMzUyLFxuICAgIOOCqzogMjE0NSxcbiAgICDjgrM6IDE3ODksXG4gICAg44K7OiAxMjg3LFxuICAgIOODgzogLTcyNCxcbiAgICDjg4g6IC00MDMsXG4gICAg44OhOiAtMTYzNSxcbiAgICDjg6k6IC04ODEsXG4gICAg44OqOiAtNTQxLFxuICAgIOODqzogLTg1NixcbiAgICDjg7M6IC0zNjM3LFxuICAgIFwi44O7XCI6IC00MzcxLFxuICAgIOODvDogLTExODcwLFxuICAgIOS4gDogLTIwNjksXG4gICAg5LitOiAyMjEwLFxuICAgIOS6iDogNzgyLFxuICAgIOS6izogLTE5MCxcbiAgICDkupU6IC0xNzY4LFxuICAgIOS6ujogMTAzNixcbiAgICDku6U6IDU0NCxcbiAgICDkvJo6IDk1MCxcbiAgICDkvZM6IC0xMjg2LFxuICAgIOS9nDogNTMwLFxuICAgIOWBtDogNDI5MixcbiAgICDlhYg6IDYwMSxcbiAgICDlhZo6IC0yMDA2LFxuICAgIOWFsTogLTEyMTIsXG4gICAg5YaFOiA1ODQsXG4gICAg5YaGOiA3ODgsXG4gICAg5YidOiAxMzQ3LFxuICAgIOWJjTogMTYyMyxcbiAgICDlia86IDM4NzksXG4gICAg5YqbOiAtMzAyLFxuICAgIOWLlTogLTc0MCxcbiAgICDli5k6IC0yNzE1LFxuICAgIOWMljogNzc2LFxuICAgIOWMujogNDUxNyxcbiAgICDljZQ6IDEwMTMsXG4gICAg5Y+COiAxNTU1LFxuICAgIOWQiDogLTE4MzQsXG4gICAg5ZKMOiAtNjgxLFxuICAgIOWToTogLTkxMCxcbiAgICDlmag6IC04NTEsXG4gICAg5ZueOiAxNTAwLFxuICAgIOWbvTogLTYxOSxcbiAgICDlnJI6IC0xMjAwLFxuICAgIOWcsDogODY2LFxuICAgIOWgtDogLTE0MTAsXG4gICAg5aGBOiAtMjA5NCxcbiAgICDlo6s6IC0xNDEzLFxuICAgIOWkmjogMTA2NyxcbiAgICDlpKc6IDU3MSxcbiAgICDlrZA6IC00ODAyLFxuICAgIOWtpjogLTEzOTcsXG4gICAg5a6aOiAtMTA1NyxcbiAgICDlr7o6IC04MDksXG4gICAg5bCPOiAxOTEwLFxuICAgIOWxizogLTEzMjgsXG4gICAg5bGxOiAtMTUwMCxcbiAgICDls7Y6IC0yMDU2LFxuICAgIOW3nTogLTI2NjcsXG4gICAg5biCOiAyNzcxLFxuICAgIOW5tDogMzc0LFxuICAgIOW6gTogLTQ1NTYsXG4gICAg5b6MOiA0NTYsXG4gICAg5oCnOiA1NTMsXG4gICAg5oSfOiA5MTYsXG4gICAg5omAOiAtMTU2NixcbiAgICDmlK86IDg1NixcbiAgICDmlLk6IDc4NyxcbiAgICDmlL86IDIxODIsXG4gICAg5pWZOiA3MDQsXG4gICAg5paHOiA1MjIsXG4gICAg5pa5OiAtODU2LFxuICAgIOaXpTogMTc5OCxcbiAgICDmmYI6IDE4MjksXG4gICAg5pyAOiA4NDUsXG4gICAg5pyIOiAtOTA2NixcbiAgICDmnKg6IC00ODUsXG4gICAg5p2lOiAtNDQyLFxuICAgIOagoTogLTM2MCxcbiAgICDmpa06IC0xMDQzLFxuICAgIOawjzogNTM4OCxcbiAgICDmsJE6IC0yNzE2LFxuICAgIOawlzogLTkxMCxcbiAgICDmsqI6IC05MzksXG4gICAg5riIOiAtNTQzLFxuICAgIOeJqTogLTczNSxcbiAgICDnjoc6IDY3MixcbiAgICDnkIM6IC0xMjY3LFxuICAgIOeUnzogLTEyODYsXG4gICAg55SjOiAtMTEwMSxcbiAgICDnlLA6IC0yOTAwLFxuICAgIOeUujogMTgyNixcbiAgICDnmoQ6IDI1ODYsXG4gICAg55uuOiA5MjIsXG4gICAg55yBOiAtMzQ4NSxcbiAgICDnnIw6IDI5OTcsXG4gICAg56m6OiAtODY3LFxuICAgIOerizogLTIxMTIsXG4gICAg56ysOiA3ODgsXG4gICAg57GzOiAyOTM3LFxuICAgIOezuzogNzg2LFxuICAgIOe0hDogMjE3MSxcbiAgICDntYw6IDExNDYsXG4gICAg57WxOiAtMTE2OSxcbiAgICDnt486IDk0MCxcbiAgICDnt5o6IC05OTQsXG4gICAg572yOiA3NDksXG4gICAg6ICFOiAyMTQ1LFxuICAgIOiDvTogLTczMCxcbiAgICDoiKw6IC04NTIsXG4gICAg6KGMOiAtNzkyLFxuICAgIOimjzogNzkyLFxuICAgIOitpjogLTExODQsXG4gICAg6K2wOiAtMjQ0LFxuICAgIOiwtzogLTEwMDAsXG4gICAg6LOeOiA3MzAsXG4gICAg6LuKOiAtMTQ4MSxcbiAgICDou406IDExNTgsXG4gICAg6LyqOiAtMTQzMyxcbiAgICDovrw6IC0zMzcwLFxuICAgIOi/kTogOTI5LFxuICAgIOmBkzogLTEyOTEsXG4gICAg6YG4OiAyNTk2LFxuICAgIOmDjjogLTQ4NjYsXG4gICAg6YO9OiAxMTkyLFxuICAgIOmHjjogLTExMDAsXG4gICAg6YqAOiAtMjIxMyxcbiAgICDplbc6IDM1NyxcbiAgICDplpM6IC0yMzQ0LFxuICAgIOmZojogLTIyOTcsXG4gICAg6ZqbOiAtMjYwNCxcbiAgICDpm7s6IC04NzgsXG4gICAg6aCYOiAtMTY1OSxcbiAgICDpoYw6IC03OTIsXG4gICAg6aSoOiAtMTk4NCxcbiAgICDpppY6IDE3NDksXG4gICAg6auYOiAyMTIwLFxuICAgIFwi772iXCI6IDE4OTUsXG4gICAgXCLvvaNcIjogMzc5OCxcbiAgICBcIu+9pVwiOiAtNDM3MSxcbiAgICDvva86IC03MjQsXG4gICAg772wOiAtMTE4NzAsXG4gICAg7722OiAyMTQ1LFxuICAgIO+9ujogMTc4OSxcbiAgICDvvb46IDEyODcsXG4gICAg776EOiAtNDAzLFxuICAgIO++kjogLTE2MzUsXG4gICAg776XOiAtODgxLFxuICAgIO++mDogLTU0MSxcbiAgICDvvpk6IC04NTYsXG4gICAg776dOiAtMzYzNyxcbiAgfTtcbiAgdGhpcy5VVzVfXyA9IHtcbiAgICBcIixcIjogNDY1LFxuICAgIFwiLlwiOiAtMjk5LFxuICAgIDE6IC01MTQsXG4gICAgRTI6IC0zMjc2OCxcbiAgICBcIl1cIjogLTI3NjIsXG4gICAgXCLjgIFcIjogNDY1LFxuICAgIFwi44CCXCI6IC0yOTksXG4gICAgXCLjgIxcIjogMzYzLFxuICAgIOOBgjogMTY1NSxcbiAgICDjgYQ6IDMzMSxcbiAgICDjgYY6IC01MDMsXG4gICAg44GIOiAxMTk5LFxuICAgIOOBijogNTI3LFxuICAgIOOBizogNjQ3LFxuICAgIOOBjDogLTQyMSxcbiAgICDjgY06IDE2MjQsXG4gICAg44GOOiAxOTcxLFxuICAgIOOBjzogMzEyLFxuICAgIOOBkjogLTk4MyxcbiAgICDjgZU6IC0xNTM3LFxuICAgIOOBlzogLTEzNzEsXG4gICAg44GZOiAtODUyLFxuICAgIOOBoDogLTExODYsXG4gICAg44GhOiAxMDkzLFxuICAgIOOBozogNTIsXG4gICAg44GkOiA5MjEsXG4gICAg44GmOiAtMTgsXG4gICAg44GnOiAtODUwLFxuICAgIOOBqDogLTEyNyxcbiAgICDjgak6IDE2ODIsXG4gICAg44GqOiAtNzg3LFxuICAgIOOBqzogLTEyMjQsXG4gICAg44GuOiAtNjM1LFxuICAgIOOBrzogLTU3OCxcbiAgICDjgbk6IDEwMDEsXG4gICAg44G/OiA1MDIsXG4gICAg44KBOiA4NjUsXG4gICAg44KDOiAzMzUwLFxuICAgIOOChzogODU0LFxuICAgIOOCijogLTIwOCxcbiAgICDjgos6IDQyOSxcbiAgICDjgow6IDUwNCxcbiAgICDjgo86IDQxOSxcbiAgICDjgpI6IC0xMjY0LFxuICAgIOOCkzogMzI3LFxuICAgIOOCpDogMjQxLFxuICAgIOODqzogNDUxLFxuICAgIOODszogLTM0MyxcbiAgICDkuK06IC04NzEsXG4gICAg5LqsOiA3MjIsXG4gICAg5LyaOiAtMTE1MyxcbiAgICDlhZo6IC02NTQsXG4gICAg5YuZOiAzNTE5LFxuICAgIOWMujogLTkwMSxcbiAgICDlkYo6IDg0OCxcbiAgICDlk6E6IDIxMDQsXG4gICAg5aSnOiAtMTI5NixcbiAgICDlraY6IC01NDgsXG4gICAg5a6aOiAxNzg1LFxuICAgIOW1kDogLTEzMDQsXG4gICAg5biCOiAtMjk5MSxcbiAgICDluK06IDkyMSxcbiAgICDlubQ6IDE3NjMsXG4gICAg5oCdOiA4NzIsXG4gICAg5omAOiAtODE0LFxuICAgIOaMmTogMTYxOCxcbiAgICDmlrA6IC0xNjgyLFxuICAgIOaXpTogMjE4LFxuICAgIOaciDogLTQzNTMsXG4gICAg5p+7OiA5MzIsXG4gICAg5qC8OiAxMzU2LFxuICAgIOapnzogLTE1MDgsXG4gICAg5rCPOiAtMTM0NyxcbiAgICDnlLA6IDI0MCxcbiAgICDnlLo6IC0zOTEyLFxuICAgIOeahDogLTMxNDksXG4gICAg55u4OiAxMzE5LFxuICAgIOecgTogLTEwNTIsXG4gICAg55yMOiAtNDAwMyxcbiAgICDnoJQ6IC05OTcsXG4gICAg56S+OiAtMjc4LFxuICAgIOepujogLTgxMyxcbiAgICDntbE6IDE5NTUsXG4gICAg6ICFOiAtMjIzMyxcbiAgICDooag6IDY2MyxcbiAgICDoqp46IC0xMDczLFxuICAgIOitsDogMTIxOSxcbiAgICDpgbg6IC0xMDE4LFxuICAgIOmDjjogLTM2OCxcbiAgICDplbc6IDc4NixcbiAgICDplpM6IDExOTEsXG4gICAg6aGMOiAyMzY4LFxuICAgIOmkqDogLTY4OSxcbiAgICBcIu+8kVwiOiAtNTE0LFxuICAgIO+8pe+8kjogLTMyNzY4LFxuICAgIFwi772iXCI6IDM2MyxcbiAgICDvvbI6IDI0MSxcbiAgICDvvpk6IDQ1MSxcbiAgICDvvp06IC0zNDMsXG4gIH07XG4gIHRoaXMuVVc2X18gPSB7XG4gICAgXCIsXCI6IDIyNyxcbiAgICBcIi5cIjogODA4LFxuICAgIDE6IC0yNzAsXG4gICAgRTE6IDMwNixcbiAgICBcIuOAgVwiOiAyMjcsXG4gICAgXCLjgIJcIjogODA4LFxuICAgIOOBgjogLTMwNyxcbiAgICDjgYY6IDE4OSxcbiAgICDjgYs6IDI0MSxcbiAgICDjgYw6IC03MyxcbiAgICDjgY86IC0xMjEsXG4gICAg44GTOiAtMjAwLFxuICAgIOOBmDogMTc4MixcbiAgICDjgZk6IDM4MyxcbiAgICDjgZ86IC00MjgsXG4gICAg44GjOiA1NzMsXG4gICAg44GmOiAtMTAxNCxcbiAgICDjgac6IDEwMSxcbiAgICDjgag6IC0xMDUsXG4gICAg44GqOiAtMjUzLFxuICAgIOOBqzogLTE0OSxcbiAgICDjga46IC00MTcsXG4gICAg44GvOiAtMjM2LFxuICAgIOOCgjogLTIwNixcbiAgICDjgoo6IDE4NyxcbiAgICDjgos6IC0xMzUsXG4gICAg44KSOiAxOTUsXG4gICAg44OrOiAtNjczLFxuICAgIOODszogLTQ5NixcbiAgICDkuIA6IC0yNzcsXG4gICAg5LitOiAyMDEsXG4gICAg5Lu2OiAtODAwLFxuICAgIOS8mjogNjI0LFxuICAgIOWJjTogMzAyLFxuICAgIOWMujogMTc5MixcbiAgICDlk6E6IC0xMjEyLFxuICAgIOWnlDogNzk4LFxuICAgIOWtpjogLTk2MCxcbiAgICDluII6IDg4NyxcbiAgICDluoM6IC02OTUsXG4gICAg5b6MOiA1MzUsXG4gICAg5qWtOiAtNjk3LFxuICAgIOebuDogNzUzLFxuICAgIOekvjogLTUwNyxcbiAgICDnpo86IDk3NCxcbiAgICDnqbo6IC04MjIsXG4gICAg6ICFOiAxODExLFxuICAgIOmAozogNDYzLFxuICAgIOmDjjogMTA4MixcbiAgICBcIu+8kVwiOiAtMjcwLFxuICAgIO+8pe+8kTogMzA2LFxuICAgIO++mTogLTY3MyxcbiAgICDvvp06IC00OTYsXG4gIH07XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cblRpbnlTZWdtZW50ZXIucHJvdG90eXBlLmN0eXBlXyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgZm9yICh2YXIgaSBpbiB0aGlzLmNoYXJ0eXBlXykge1xuICAgIGlmIChzdHIubWF0Y2godGhpcy5jaGFydHlwZV9baV1bMF0pKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFydHlwZV9baV1bMV07XG4gICAgfVxuICB9XG4gIHJldHVybiBcIk9cIjtcbn07XG5cblRpbnlTZWdtZW50ZXIucHJvdG90eXBlLnRzXyA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICh2KSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5UaW55U2VnbWVudGVyLnByb3RvdHlwZS5zZWdtZW50ID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gIGlmIChpbnB1dCA9PSBudWxsIHx8IGlucHV0ID09IHVuZGVmaW5lZCB8fCBpbnB1dCA9PSBcIlwiKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIHNlZyA9IFtcIkIzXCIsIFwiQjJcIiwgXCJCMVwiXTtcbiAgdmFyIGN0eXBlID0gW1wiT1wiLCBcIk9cIiwgXCJPXCJdO1xuICB2YXIgbyA9IGlucHV0LnNwbGl0KFwiXCIpO1xuICBmb3IgKGkgPSAwOyBpIDwgby5sZW5ndGg7ICsraSkge1xuICAgIHNlZy5wdXNoKG9baV0pO1xuICAgIGN0eXBlLnB1c2godGhpcy5jdHlwZV8ob1tpXSkpO1xuICB9XG4gIHNlZy5wdXNoKFwiRTFcIik7XG4gIHNlZy5wdXNoKFwiRTJcIik7XG4gIHNlZy5wdXNoKFwiRTNcIik7XG4gIGN0eXBlLnB1c2goXCJPXCIpO1xuICBjdHlwZS5wdXNoKFwiT1wiKTtcbiAgY3R5cGUucHVzaChcIk9cIik7XG4gIHZhciB3b3JkID0gc2VnWzNdO1xuICB2YXIgcDEgPSBcIlVcIjtcbiAgdmFyIHAyID0gXCJVXCI7XG4gIHZhciBwMyA9IFwiVVwiO1xuICBmb3IgKHZhciBpID0gNDsgaSA8IHNlZy5sZW5ndGggLSAzOyArK2kpIHtcbiAgICB2YXIgc2NvcmUgPSB0aGlzLkJJQVNfXztcbiAgICB2YXIgdzEgPSBzZWdbaSAtIDNdO1xuICAgIHZhciB3MiA9IHNlZ1tpIC0gMl07XG4gICAgdmFyIHczID0gc2VnW2kgLSAxXTtcbiAgICB2YXIgdzQgPSBzZWdbaV07XG4gICAgdmFyIHc1ID0gc2VnW2kgKyAxXTtcbiAgICB2YXIgdzYgPSBzZWdbaSArIDJdO1xuICAgIHZhciBjMSA9IGN0eXBlW2kgLSAzXTtcbiAgICB2YXIgYzIgPSBjdHlwZVtpIC0gMl07XG4gICAgdmFyIGMzID0gY3R5cGVbaSAtIDFdO1xuICAgIHZhciBjNCA9IGN0eXBlW2ldO1xuICAgIHZhciBjNSA9IGN0eXBlW2kgKyAxXTtcbiAgICB2YXIgYzYgPSBjdHlwZVtpICsgMl07XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUDFfX1twMV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVAyX19bcDJdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVQM19fW3AzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CUDFfX1twMSArIHAyXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CUDJfX1twMiArIHAzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VVzFfX1t3MV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVcyX19bdzJdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVXM19fW3czXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VVzRfX1t3NF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVc1X19bdzVdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVXNl9fW3c2XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CVzFfX1t3MiArIHczXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CVzJfX1t3MyArIHc0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CVzNfX1t3NCArIHc1XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UVzFfX1t3MSArIHcyICsgdzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRXMl9fW3cyICsgdzMgKyB3NF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFczX19bdzMgKyB3NCArIHc1XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UVzRfX1t3NCArIHc1ICsgdzZdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVDMV9fW2MxXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VQzJfX1tjMl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVUMzX19bYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVDNF9fW2M0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VQzVfX1tjNV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVUM2X19bYzZdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJDMV9fW2MyICsgYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJDMl9fW2MzICsgYzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJDM19fW2M0ICsgYzVdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRDMV9fW2MxICsgYzIgKyBjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVEMyX19bYzIgKyBjMyArIGM0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UQzNfX1tjMyArIGM0ICsgYzVdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRDNF9fW2M0ICsgYzUgKyBjNl0pO1xuICAgIC8vICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRDNV9fW2M0ICsgYzUgKyBjNl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVExX19bcDEgKyBjMV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVEyX19bcDIgKyBjMl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVEzX19bcDMgKyBjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlExX19bcDIgKyBjMiArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CUTJfX1twMiArIGMzICsgYzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJRM19fW3AzICsgYzIgKyBjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlE0X19bcDMgKyBjMyArIGM0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UUTFfX1twMiArIGMxICsgYzIgKyBjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFEyX19bcDIgKyBjMiArIGMzICsgYzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRRM19fW3AzICsgYzEgKyBjMiArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UUTRfX1twMyArIGMyICsgYzMgKyBjNF0pO1xuICAgIHZhciBwID0gXCJPXCI7XG4gICAgaWYgKHNjb3JlID4gMCkge1xuICAgICAgcmVzdWx0LnB1c2god29yZCk7XG4gICAgICB3b3JkID0gXCJcIjtcbiAgICAgIHAgPSBcIkJcIjtcbiAgICB9XG4gICAgcDEgPSBwMjtcbiAgICBwMiA9IHAzO1xuICAgIHAzID0gcDtcbiAgICB3b3JkICs9IHNlZ1tpXTtcbiAgfVxuICByZXN1bHQucHVzaCh3b3JkKTtcblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGlueVNlZ21lbnRlcjtcbiIsImltcG9ydCBUaW55U2VnbWVudGVyIGZyb20gXCIuLi8uLi9leHRlcm5hbC90aW55LXNlZ21lbnRlclwiO1xuaW1wb3J0IHsgVFJJTV9DSEFSX1BBVFRFUk4gfSBmcm9tIFwiLi9EZWZhdWx0VG9rZW5pemVyXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vdG9rZW5pemVyXCI7XG4vLyBAdHMtaWdub3JlXG5jb25zdCBzZWdtZW50ZXIgPSBuZXcgVGlueVNlZ21lbnRlcigpO1xuXG5mdW5jdGlvbiBwaWNrVG9rZW5zQXNKYXBhbmVzZShjb250ZW50OiBzdHJpbmcsIHRyaW1QYXR0ZXJuOiBSZWdFeHApOiBzdHJpbmdbXSB7XG4gIHJldHVybiBjb250ZW50XG4gICAgLnNwbGl0KHRyaW1QYXR0ZXJuKVxuICAgIC5maWx0ZXIoKHgpID0+IHggIT09IFwiXCIpXG4gICAgLmZsYXRNYXA8c3RyaW5nPigoeCkgPT4gc2VnbWVudGVyLnNlZ21lbnQoeCkpO1xufVxuXG4vKipcbiAqIEphcGFuZXNlIG5lZWRzIG9yaWdpbmFsIGxvZ2ljLlxuICovXG5leHBvcnQgY2xhc3MgSmFwYW5lc2VUb2tlbml6ZXIgaW1wbGVtZW50cyBUb2tlbml6ZXIge1xuICB0b2tlbml6ZShjb250ZW50OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHBpY2tUb2tlbnNBc0phcGFuZXNlKGNvbnRlbnQsIHRoaXMuZ2V0VHJpbVBhdHRlcm4oKSk7XG4gIH1cblxuICBnZXRUcmltUGF0dGVybigpOiBSZWdFeHAge1xuICAgIHJldHVybiBUUklNX0NIQVJfUEFUVEVSTjtcbiAgfVxuXG4gIHNob3VsZElnbm9yZShzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBCb29sZWFuKHN0ci5tYXRjaCgvXlvjgYEt44KT772BLe+9mu+8oS3vvLrjgILjgIHjg7zjgIBdKiQvKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFyYWJpY1Rva2VuaXplciB9IGZyb20gXCIuL3Rva2VuaXplcnMvQXJhYmljVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBEZWZhdWx0VG9rZW5pemVyIH0gZnJvbSBcIi4vdG9rZW5pemVycy9EZWZhdWx0VG9rZW5pemVyXCI7XG5pbXBvcnQgeyBKYXBhbmVzZVRva2VuaXplciB9IGZyb20gXCIuL3Rva2VuaXplcnMvSmFwYW5lc2VUb2tlbml6ZXJcIjtcbmltcG9ydCB7IFRva2VuaXplU3RyYXRlZ3kgfSBmcm9tIFwiLi9Ub2tlbml6ZVN0cmF0ZWd5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5pemVyIHtcbiAgdG9rZW5pemUoY29udGVudDogc3RyaW5nKTogc3RyaW5nW107XG4gIGdldFRyaW1QYXR0ZXJuKCk6IFJlZ0V4cDtcbiAgc2hvdWxkSWdub3JlKHF1ZXJ5OiBzdHJpbmcpOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVG9rZW5pemVyKHN0cmF0ZWd5OiBUb2tlbml6ZVN0cmF0ZWd5KTogVG9rZW5pemVyIHtcbiAgc3dpdGNoIChzdHJhdGVneS5uYW1lKSB7XG4gICAgY2FzZSBcImRlZmF1bHRcIjpcbiAgICAgIHJldHVybiBuZXcgRGVmYXVsdFRva2VuaXplcigpO1xuICAgIGNhc2UgXCJhcmFiaWNcIjpcbiAgICAgIHJldHVybiBuZXcgQXJhYmljVG9rZW5pemVyKCk7XG4gICAgY2FzZSBcImphcGFuZXNlXCI6XG4gICAgICByZXR1cm4gbmV3IEphcGFuZXNlVG9rZW5pemVyKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBzdHJhdGVneSBuYW1lOiAke3N0cmF0ZWd5fWApO1xuICB9XG59XG4iLCJ0eXBlIE5hbWUgPSBcImRlZmF1bHRcIiB8IFwiamFwYW5lc2VcIiB8IFwiYXJhYmljXCI7XG5cbmV4cG9ydCBjbGFzcyBUb2tlbml6ZVN0cmF0ZWd5IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3ZhbHVlczogVG9rZW5pemVTdHJhdGVneVtdID0gW107XG5cbiAgc3RhdGljIHJlYWRvbmx5IERFRkFVTFQgPSBuZXcgVG9rZW5pemVTdHJhdGVneShcImRlZmF1bHRcIiwgMyk7XG4gIHN0YXRpYyByZWFkb25seSBKQVBBTkVTRSA9IG5ldyBUb2tlbml6ZVN0cmF0ZWd5KFwiamFwYW5lc2VcIiwgMik7XG4gIHN0YXRpYyByZWFkb25seSBBUkFCSUMgPSBuZXcgVG9rZW5pemVTdHJhdGVneShcImFyYWJpY1wiLCAzKTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG5hbWU6IE5hbWUsIHJlYWRvbmx5IHRyaWdnZXJUaHJlc2hvbGQ6IG51bWJlcikge1xuICAgIFRva2VuaXplU3RyYXRlZ3kuX3ZhbHVlcy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lKG5hbWU6IHN0cmluZyk6IFRva2VuaXplU3RyYXRlZ3kge1xuICAgIHJldHVybiBUb2tlbml6ZVN0cmF0ZWd5Ll92YWx1ZXMuZmluZCgoeCkgPT4geC5uYW1lID09PSBuYW1lKSE7XG4gIH1cblxuICBzdGF0aWMgdmFsdWVzKCk6IFRva2VuaXplU3RyYXRlZ3lbXSB7XG4gICAgcmV0dXJuIFRva2VuaXplU3RyYXRlZ3kuX3ZhbHVlcztcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGtleUJ5ID0gPFQ+KFxuICB2YWx1ZXM6IFRbXSxcbiAgdG9LZXk6ICh0OiBUKSA9PiBzdHJpbmdcbik6IHsgW2tleTogc3RyaW5nXTogVCB9ID0+XG4gIHZhbHVlcy5yZWR1Y2UoXG4gICAgKHByZXYsIGN1ciwgXzEsIF8yLCBrID0gdG9LZXkoY3VyKSkgPT4gKChwcmV2W2tdID0gY3VyKSwgcHJldiksXG4gICAge30gYXMgeyBba2V5OiBzdHJpbmddOiBUIH1cbiAgKTtcblxuZXhwb3J0IGNvbnN0IGdyb3VwQnkgPSA8VD4oXG4gIHZhbHVlczogVFtdLFxuICB0b0tleTogKHQ6IFQpID0+IHN0cmluZ1xuKTogeyBba2V5OiBzdHJpbmddOiBUW10gfSA9PlxuICB2YWx1ZXMucmVkdWNlKFxuICAgIChwcmV2LCBjdXIsIF8xLCBfMiwgayA9IHRvS2V5KGN1cikpID0+IChcbiAgICAgIChwcmV2W2tdIHx8IChwcmV2W2tdID0gW10pKS5wdXNoKGN1ciksIHByZXZcbiAgICApLFxuICAgIHt9IGFzIHsgW2tleTogc3RyaW5nXTogVFtdIH1cbiAgKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXE8VD4odmFsdWVzOiBUW10pOiBUW10ge1xuICByZXR1cm4gWy4uLm5ldyBTZXQodmFsdWVzKV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlxV2l0aDxUPihhcnI6IFRbXSwgZm46IChvbmU6IFQsIG90aGVyOiBUKSA9PiBib29sZWFuKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKFxuICAgIChlbGVtZW50LCBpbmRleCkgPT4gYXJyLmZpbmRJbmRleCgoc3RlcCkgPT4gZm4oZWxlbWVudCwgc3RlcCkpID09PSBpbmRleFxuICApO1xufVxuIiwiaW1wb3J0IHtcbiAgQXBwLFxuICBFZGl0b3IsXG4gIE1hcmtkb3duVmlldyxcbiAgcGFyc2VGcm9udE1hdHRlckFsaWFzZXMsXG4gIFRGaWxlLFxufSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IHVuaXEgfSBmcm9tIFwiLi91dGlsL2NvbGxlY3Rpb24taGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBcHBIZWxwZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcDogQXBwKSB7fVxuXG4gIGdldEFsaWFzZXMoZmlsZTogVEZpbGUpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHBhcnNlRnJvbnRNYXR0ZXJBbGlhc2VzKFxuICAgICAgICB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKT8uZnJvbnRtYXR0ZXJcbiAgICAgICkgPz8gW11cbiAgICApO1xuICB9XG5cbiAgZ2V0TWFya2Rvd25WaWV3SW5BY3RpdmVMZWFmKCk6IE1hcmtkb3duVmlldyB8IG51bGwge1xuICAgIGlmICghdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmIS52aWV3IGFzIE1hcmtkb3duVmlldztcbiAgfVxuXG4gIGdldEN1cnJlbnRFZGl0b3IoKTogRWRpdG9yIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWFya2Rvd25WaWV3SW5BY3RpdmVMZWFmKCk/LmVkaXRvciA/PyBudWxsO1xuICB9XG5cbiAgc2VhcmNoUGhhbnRvbUxpbmtzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdW5pcShcbiAgICAgIE9iamVjdC52YWx1ZXModGhpcy5hcHAubWV0YWRhdGFDYWNoZS51bnJlc29sdmVkTGlua3MpXG4gICAgICAgIC5tYXAoT2JqZWN0LmtleXMpXG4gICAgICAgIC5mbGF0KClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc2FmZSBtZXRob2RcbiAgICovXG4gIGlzSU1FT24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya2Rvd25WaWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYhLnZpZXcgYXMgTWFya2Rvd25WaWV3O1xuICAgIGNvbnN0IGNtNW9yNjogYW55ID0gKG1hcmtkb3duVmlldy5lZGl0b3IgYXMgYW55KS5jbTtcblxuICAgIC8vIGNtNlxuICAgIGlmIChjbTVvcjY/LmlucHV0U3RhdGU/LmNvbXBvc2luZyA+IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGNtNVxuICAgIHJldHVybiAhIWNtNW9yNj8uZGlzcGxheT8uaW5wdXQ/LmNvbXBvc2luZztcbiAgfVxufVxuIiwiY29uc3QgcmVnRW1vamkgPSBuZXcgUmVnRXhwKFxuICAvW1xcdTI3MDAtXFx1MjdCRl18W1xcdUUwMDAtXFx1RjhGRl18XFx1RDgzQ1tcXHVEQzAwLVxcdURGRkZdfFxcdUQ4M0RbXFx1REMwMC1cXHVERkZGXXxbXFx1MjAxMS1cXHUyNkZGXXxcXHVEODNFW1xcdUREMTAtXFx1RERGRl18W1xcdUZFMEUtXFx1RkUwRl0vLFxuICBcImdcIlxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV4Y2x1ZGVFbW9qaSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKHJlZ0Vtb2ppLCBcIlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4Y2x1ZGVTcGFjZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKC8gL2csIFwiXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG93ZXJJbmNsdWRlcyhvbmU6IHN0cmluZywgb3RoZXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gb25lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMob3RoZXIudG9Mb3dlckNhc2UoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb3dlckluY2x1ZGVzV2l0aG91dFNwYWNlKG9uZTogc3RyaW5nLCBvdGhlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBsb3dlckluY2x1ZGVzKGV4Y2x1ZGVTcGFjZShvbmUpLCBleGNsdWRlU3BhY2Uob3RoZXIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvd2VyU3RhcnRzV2l0aChhOiBzdHJpbmcsIGI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gYS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoYi50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvd2VyU3RhcnRzV2l0aG91dFNwYWNlKG9uZTogc3RyaW5nLCBvdGhlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBsb3dlclN0YXJ0c1dpdGgoZXhjbHVkZVNwYWNlKG9uZSksIGV4Y2x1ZGVTcGFjZShvdGhlcikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cbiIsImltcG9ydCB7XG4gIGNhcGl0YWxpemVGaXJzdExldHRlcixcbiAgbG93ZXJJbmNsdWRlc1dpdGhvdXRTcGFjZSxcbiAgbG93ZXJTdGFydHNXaXRoLFxuICBsb3dlclN0YXJ0c1dpdGhvdXRTcGFjZSxcbn0gZnJvbSBcIi4uL3V0aWwvc3RyaW5nc1wiO1xuaW1wb3J0IHsgSW5kZXhlZFdvcmRzIH0gZnJvbSBcIi4uL3VpL0F1dG9Db21wbGV0ZVN1Z2dlc3RcIjtcbmltcG9ydCB7IHVuaXFXaXRoIH0gZnJvbSBcIi4uL3V0aWwvY29sbGVjdGlvbi1oZWxwZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBXb3JkIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGFsaWFzZXM/OiBzdHJpbmdbXTtcbiAgaW50ZXJuYWxMaW5rPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgV29yZHNCeUZpcnN0TGV0dGVyID0geyBbZmlyc3RMZXR0ZXI6IHN0cmluZ106IFdvcmRbXSB9O1xuXG5pbnRlcmZhY2UgSnVkZ2VtZW50IHtcbiAgd29yZDogV29yZDtcbiAgdmFsdWU/OiBzdHJpbmc7XG4gIGFsaWFzOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHVzaFdvcmQoXG4gIHdvcmRzQnlGaXJzdExldHRlcjogV29yZHNCeUZpcnN0TGV0dGVyLFxuICBrZXk6IHN0cmluZyxcbiAgd29yZDogV29yZFxuKSB7XG4gIGlmICh3b3Jkc0J5Rmlyc3RMZXR0ZXJba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgd29yZHNCeUZpcnN0TGV0dGVyW2tleV0gPSBbd29yZF07XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd29yZHNCeUZpcnN0TGV0dGVyW2tleV0ucHVzaCh3b3JkKTtcbn1cblxuLy8gUHVibGljIGZvciB0ZXN0c1xuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlKFxuICB3b3JkOiBXb3JkLFxuICBxdWVyeTogc3RyaW5nLFxuICBxdWVyeVN0YXJ0V2l0aFVwcGVyOiBib29sZWFuXG4pOiBKdWRnZW1lbnQge1xuICBpZiAobG93ZXJTdGFydHNXaXRob3V0U3BhY2Uod29yZC52YWx1ZSwgcXVlcnkpKSB7XG4gICAgaWYgKHF1ZXJ5U3RhcnRXaXRoVXBwZXIgJiYgIXdvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICBjb25zdCBjID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHdvcmQudmFsdWUpO1xuICAgICAgcmV0dXJuIHsgd29yZDogeyAuLi53b3JkLCB2YWx1ZTogYyB9LCB2YWx1ZTogYywgYWxpYXM6IGZhbHNlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHdvcmQ6IHdvcmQsIHZhbHVlOiB3b3JkLnZhbHVlLCBhbGlhczogZmFsc2UgfTtcbiAgICB9XG4gIH1cbiAgY29uc3QgbWF0Y2hlZEFsaWFzID0gd29yZC5hbGlhc2VzPy5maW5kKChhKSA9PlxuICAgIGxvd2VyU3RhcnRzV2l0aG91dFNwYWNlKGEsIHF1ZXJ5KVxuICApO1xuICBpZiAobWF0Y2hlZEFsaWFzKSB7XG4gICAgcmV0dXJuIHsgd29yZDogd29yZCwgdmFsdWU6IG1hdGNoZWRBbGlhcywgYWxpYXM6IHRydWUgfTtcbiAgfVxuXG4gIHJldHVybiB7IHdvcmQ6IHdvcmQsIGFsaWFzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VnZ2VzdFdvcmRzKFxuICBpbmRleGVkV29yZHM6IEluZGV4ZWRXb3JkcyxcbiAgcXVlcnk6IHN0cmluZyxcbiAgbWF4OiBudW1iZXJcbik6IFdvcmRbXSB7XG4gIGNvbnN0IHF1ZXJ5U3RhcnRXaXRoVXBwZXIgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocXVlcnkpID09PSBxdWVyeTtcblxuICBjb25zdCB3b3JkcyA9IHF1ZXJ5U3RhcnRXaXRoVXBwZXJcbiAgICA/IFtcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXJyZW50RmlsZVtxdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXJyZW50RmlsZVtxdWVyeS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKV0gPz8gW10pLFxuICAgICAgICAuLi4oaW5kZXhlZFdvcmRzLmN1c3RvbURpY3Rpb25hcnlbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VzdG9tRGljdGlvbmFyeVtxdWVyeS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKV0gPz8gW10pLFxuICAgICAgICAuLi4oaW5kZXhlZFdvcmRzLmludGVybmFsTGlua1txdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5pbnRlcm5hbExpbmtbcXVlcnkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCldID8/IFtdKSxcbiAgICAgIF1cbiAgICA6IFtcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXJyZW50RmlsZVtxdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXN0b21EaWN0aW9uYXJ5W3F1ZXJ5LmNoYXJBdCgwKV0gPz8gW10pLFxuICAgICAgICAuLi4oaW5kZXhlZFdvcmRzLmludGVybmFsTGlua1txdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5pbnRlcm5hbExpbmtbcXVlcnkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCldID8/IFtdKSxcbiAgICAgIF07XG5cbiAgY29uc3QgY2FuZGlkYXRlID0gQXJyYXkuZnJvbSh3b3JkcylcbiAgICAubWFwKCh4KSA9PiBqdWRnZSh4LCBxdWVyeSwgcXVlcnlTdGFydFdpdGhVcHBlcikpXG4gICAgLmZpbHRlcigoeCkgPT4geC52YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBpZiAoYS52YWx1ZSEubGVuZ3RoICE9PSBiLnZhbHVlIS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGEudmFsdWUhLmxlbmd0aCA+IGIudmFsdWUhLmxlbmd0aCA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChhLndvcmQuaW50ZXJuYWxMaW5rICE9PSBiLndvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICAgIHJldHVybiBiLndvcmQuaW50ZXJuYWxMaW5rID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgaWYgKGEuYWxpYXMgIT09IGIuYWxpYXMpIHtcbiAgICAgICAgcmV0dXJuIGEuYWxpYXMgPyAxIDogLTE7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9KVxuICAgIC5tYXAoKHgpID0+IHgud29yZClcbiAgICAuc2xpY2UoMCwgbWF4KTtcblxuICAvLyBYWFg6IFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGVxdWFscyB3aXRoIG1heCwgYnV0IGl0IGlzIGltcG9ydGFudCBmb3IgcGVyZm9ybWFuY2VcbiAgcmV0dXJuIHVuaXFXaXRoKFxuICAgIGNhbmRpZGF0ZSxcbiAgICAoYSwgYikgPT4gYS52YWx1ZSA9PT0gYi52YWx1ZSAmJiBhLmludGVybmFsTGluayA9PT0gYi5pbnRlcm5hbExpbmtcbiAgKTtcbn1cblxuLy8gVE9ETzogcmVmYWN0b3Jpbmdcbi8vIFB1YmxpYyBmb3IgdGVzdHNcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUJ5UGFydGlhbE1hdGNoKFxuICB3b3JkOiBXb3JkLFxuICBxdWVyeTogc3RyaW5nLFxuICBxdWVyeVN0YXJ0V2l0aFVwcGVyOiBib29sZWFuXG4pOiBKdWRnZW1lbnQge1xuICBpZiAobG93ZXJTdGFydHNXaXRob3V0U3BhY2Uod29yZC52YWx1ZSwgcXVlcnkpKSB7XG4gICAgaWYgKHF1ZXJ5U3RhcnRXaXRoVXBwZXIgJiYgIXdvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICBjb25zdCBjID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHdvcmQudmFsdWUpO1xuICAgICAgcmV0dXJuIHsgd29yZDogeyAuLi53b3JkLCB2YWx1ZTogYyB9LCB2YWx1ZTogYywgYWxpYXM6IGZhbHNlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHdvcmQ6IHdvcmQsIHZhbHVlOiB3b3JkLnZhbHVlLCBhbGlhczogZmFsc2UgfTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtYXRjaGVkQWxpYXNTdGFydHMgPSB3b3JkLmFsaWFzZXM/LmZpbmQoKGEpID0+XG4gICAgbG93ZXJTdGFydHNXaXRob3V0U3BhY2UoYSwgcXVlcnkpXG4gICk7XG4gIGlmIChtYXRjaGVkQWxpYXNTdGFydHMpIHtcbiAgICByZXR1cm4geyB3b3JkOiB3b3JkLCB2YWx1ZTogbWF0Y2hlZEFsaWFzU3RhcnRzLCBhbGlhczogdHJ1ZSB9O1xuICB9XG5cbiAgaWYgKGxvd2VySW5jbHVkZXNXaXRob3V0U3BhY2Uod29yZC52YWx1ZSwgcXVlcnkpKSB7XG4gICAgcmV0dXJuIHsgd29yZDogd29yZCwgdmFsdWU6IHdvcmQudmFsdWUsIGFsaWFzOiBmYWxzZSB9O1xuICB9XG5cbiAgY29uc3QgbWF0Y2hlZEFsaWFzSW5jbHVkZWQgPSB3b3JkLmFsaWFzZXM/LmZpbmQoKGEpID0+XG4gICAgbG93ZXJJbmNsdWRlc1dpdGhvdXRTcGFjZShhLCBxdWVyeSlcbiAgKTtcbiAgaWYgKG1hdGNoZWRBbGlhc0luY2x1ZGVkKSB7XG4gICAgcmV0dXJuIHsgd29yZDogd29yZCwgdmFsdWU6IG1hdGNoZWRBbGlhc0luY2x1ZGVkLCBhbGlhczogdHJ1ZSB9O1xuICB9XG5cbiAgcmV0dXJuIHsgd29yZDogd29yZCwgYWxpYXM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0V29yZHNCeVBhcnRpYWxNYXRjaChcbiAgaW5kZXhlZFdvcmRzOiBJbmRleGVkV29yZHMsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIG1heDogbnVtYmVyXG4pOiBXb3JkW10ge1xuICBjb25zdCBxdWVyeVN0YXJ0V2l0aFVwcGVyID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHF1ZXJ5KSA9PT0gcXVlcnk7XG5cbiAgY29uc3QgZmxhdE9iamVjdFZhbHVlcyA9IChvYmplY3Q6IHsgW2ZpcnN0TGV0dGVyOiBzdHJpbmddOiBXb3JkW10gfSkgPT5cbiAgICBPYmplY3QudmFsdWVzKG9iamVjdCkuZmxhdCgpO1xuICBjb25zdCB3b3JkcyA9IFtcbiAgICAuLi5mbGF0T2JqZWN0VmFsdWVzKGluZGV4ZWRXb3Jkcy5jdXJyZW50RmlsZSksXG4gICAgLi4uZmxhdE9iamVjdFZhbHVlcyhpbmRleGVkV29yZHMuY3VzdG9tRGljdGlvbmFyeSksXG4gICAgLi4uZmxhdE9iamVjdFZhbHVlcyhpbmRleGVkV29yZHMuaW50ZXJuYWxMaW5rKSxcbiAgXTtcblxuICBjb25zdCBjYW5kaWRhdGUgPSBBcnJheS5mcm9tKHdvcmRzKVxuICAgIC5tYXAoKHgpID0+IGp1ZGdlQnlQYXJ0aWFsTWF0Y2goeCwgcXVlcnksIHF1ZXJ5U3RhcnRXaXRoVXBwZXIpKVxuICAgIC5maWx0ZXIoKHgpID0+IHgudmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgYXMgPSBsb3dlclN0YXJ0c1dpdGgoYS52YWx1ZSEsIHF1ZXJ5KTtcbiAgICAgIGNvbnN0IGJzID0gbG93ZXJTdGFydHNXaXRoKGIudmFsdWUhLCBxdWVyeSk7XG4gICAgICBpZiAoYXMgIT09IGJzKSB7XG4gICAgICAgIHJldHVybiBicyA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChhLnZhbHVlIS5sZW5ndGggIT09IGIudmFsdWUhLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYS52YWx1ZSEubGVuZ3RoID4gYi52YWx1ZSEubGVuZ3RoID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgaWYgKGEud29yZC5pbnRlcm5hbExpbmsgIT09IGIud29yZC5pbnRlcm5hbExpbmspIHtcbiAgICAgICAgcmV0dXJuIGIud29yZC5pbnRlcm5hbExpbmsgPyAxIDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS5hbGlhcyAhPT0gYi5hbGlhcykge1xuICAgICAgICByZXR1cm4gYS5hbGlhcyA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH0pXG4gICAgLm1hcCgoeCkgPT4geC53b3JkKVxuICAgIC5zbGljZSgwLCBtYXgpO1xuXG4gIC8vIFhYWDogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgZXF1YWxzIHdpdGggbWF4LCBidXQgaXQgaXMgaW1wb3J0YW50IGZvciBwZXJmb3JtYW5jZVxuICByZXR1cm4gdW5pcVdpdGgoXG4gICAgY2FuZGlkYXRlLFxuICAgIChhLCBiKSA9PiBhLnZhbHVlID09PSBiLnZhbHVlICYmIGEuaW50ZXJuYWxMaW5rID09PSBiLmludGVybmFsTGlua1xuICApO1xufVxuIiwiaW1wb3J0IHsgQXBwLCBGaWxlU3lzdGVtQWRhcHRlciwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBrZXlCeSB9IGZyb20gXCIuLi91dGlsL2NvbGxlY3Rpb24taGVscGVyXCI7XG5pbXBvcnQgeyBwdXNoV29yZCwgV29yZCwgV29yZHNCeUZpcnN0TGV0dGVyIH0gZnJvbSBcIi4vc3VnZ2VzdGVyXCI7XG5cbmZ1bmN0aW9uIGxpbmVUb1dvcmQobGluZTogc3RyaW5nKTogV29yZCB7XG4gIGNvbnN0IFt2YWx1ZSwgZGVzY3JpcHRpb24sIC4uLmFsaWFzZXNdID0gbGluZS5zcGxpdChcIlxcdFwiKTtcbiAgcmV0dXJuIHtcbiAgICB2YWx1ZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBhbGlhc2VzLFxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlciB7XG4gIHByaXZhdGUgd29yZHM6IFdvcmRbXSA9IFtdO1xuICB3b3JkQnlWYWx1ZTogeyBbdmFsdWU6IHN0cmluZ106IFdvcmQgfTtcbiAgd29yZHNCeUZpcnN0TGV0dGVyOiBXb3Jkc0J5Rmlyc3RMZXR0ZXI7XG5cbiAgcHJpdmF0ZSBhcHA6IEFwcDtcbiAgcHJpdmF0ZSBmaWxlU3lzdGVtQWRhcHRlcjogRmlsZVN5c3RlbUFkYXB0ZXI7XG4gIHByaXZhdGUgcGF0aHM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwYXRoczogc3RyaW5nW10pIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB0aGlzLmZpbGVTeXN0ZW1BZGFwdGVyID0gYXBwLnZhdWx0LmFkYXB0ZXIgYXMgRmlsZVN5c3RlbUFkYXB0ZXI7XG4gICAgdGhpcy5wYXRocyA9IHBhdGhzO1xuICB9XG5cbiAgdXBkYXRlUGF0aHMocGF0aHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgdGhpcy5wYXRocyA9IHBhdGhzO1xuICB9XG5cbiAgYXN5bmMgbG9hZFdvcmRzKHBhdGg6IHN0cmluZyk6IFByb21pc2U8V29yZFtdPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmZpbGVTeXN0ZW1BZGFwdGVyLnJlYWQocGF0aCkpXG4gICAgICAuc3BsaXQoL1xcclxcbnxcXG4vKVxuICAgICAgLm1hcCgoeCkgPT4geC5yZXBsYWNlKC8lJS4qJSUvZywgXCJcIikpXG4gICAgICAuZmlsdGVyKCh4KSA9PiB4KVxuICAgICAgLm1hcChsaW5lVG9Xb3JkKTtcbiAgfVxuXG4gIGFzeW5jIHJlZnJlc2hDdXN0b21Xb3JkcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmNsZWFyV29yZHMoKTtcblxuICAgIGZvciAoY29uc3QgcGF0aCBvZiB0aGlzLnBhdGhzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB3b3JkcyA9IGF3YWl0IHRoaXMubG9hZFdvcmRzKHBhdGgpO1xuICAgICAgICB3b3Jkcy5mb3JFYWNoKCh4KSA9PiB0aGlzLndvcmRzLnB1c2goeCkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBub2luc3BlY3Rpb24gT2JqZWN0QWxsb2NhdGlvbklnbm9yZWRcbiAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICBg4pqgIEZhaWwgdG8gbG9hZCAke3BhdGh9IC0tIFZhcmlvdXMgQ29tcGxlbWVudHMgUGx1Z2luIC0tIFxcbiAke2V9YCxcbiAgICAgICAgICAwXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy53b3JkQnlWYWx1ZSA9IGtleUJ5KHRoaXMud29yZHMsICh4KSA9PiB4LnZhbHVlKTtcbiAgICBmb3IgKGNvbnN0IHdvcmQgb2YgdGhpcy53b3Jkcykge1xuICAgICAgcHVzaFdvcmQodGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIsIHdvcmQudmFsdWUuY2hhckF0KDApLCB3b3JkKTtcbiAgICAgIHdvcmQuYWxpYXNlcz8uZm9yRWFjaCgoYSkgPT5cbiAgICAgICAgcHVzaFdvcmQodGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIsIGEuY2hhckF0KDApLCB3b3JkKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcldvcmRzKCk6IHZvaWQge1xuICAgIHRoaXMud29yZHMgPSBbXTtcbiAgICB0aGlzLndvcmRCeVZhbHVlID0ge307XG4gICAgdGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIgPSB7fTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBncm91cEJ5LCB1bmlxIH0gZnJvbSBcIi4uL3V0aWwvY29sbGVjdGlvbi1oZWxwZXJcIjtcbmltcG9ydCB7IFdvcmQsIFdvcmRzQnlGaXJzdExldHRlciB9IGZyb20gXCIuL3N1Z2dlc3RlclwiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL3Rva2VuaXplci90b2tlbml6ZXJcIjtcbmltcG9ydCB7IEFwcEhlbHBlciB9IGZyb20gXCIuLi9hcHAtaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDdXJyZW50RmlsZVdvcmRQcm92aWRlciB7XG4gIHByaXZhdGUgd29yZHM6IFdvcmRbXSA9IFtdO1xuICB3b3Jkc0J5Rmlyc3RMZXR0ZXI6IFdvcmRzQnlGaXJzdExldHRlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFwcDogQXBwLFxuICAgIHByaXZhdGUgYXBwSGVscGVyOiBBcHBIZWxwZXIsXG4gICAgcHJpdmF0ZSB0b2tlbml6ZXI6IFRva2VuaXplclxuICApIHt9XG5cbiAgYXN5bmMgcmVmcmVzaFdvcmRzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuY2xlYXJXb3JkcygpO1xuXG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5hcHBIZWxwZXIuZ2V0Q3VycmVudEVkaXRvcigpO1xuICAgIGlmICghZWRpdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFRva2VuID0gdGhpcy50b2tlbml6ZXJcbiAgICAgIC50b2tlbml6ZShcbiAgICAgICAgZWRpdG9yLmdldExpbmUoZWRpdG9yLmdldEN1cnNvcigpLmxpbmUpLnNsaWNlKDAsIGVkaXRvci5nZXRDdXJzb3IoKS5jaClcbiAgICAgIClcbiAgICAgIC5sYXN0KCk7XG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuY2FjaGVkUmVhZChmaWxlKTtcbiAgICB0aGlzLndvcmRzID0gdW5pcSh0aGlzLnRva2VuaXplci50b2tlbml6ZShjb250ZW50KSlcbiAgICAgIC5maWx0ZXIoKHgpID0+IHggIT09IGN1cnJlbnRUb2tlbilcbiAgICAgIC5tYXAoKHgpID0+ICh7XG4gICAgICAgIHZhbHVlOiB4LFxuICAgICAgfSkpO1xuICAgIHRoaXMud29yZHNCeUZpcnN0TGV0dGVyID0gZ3JvdXBCeSh0aGlzLndvcmRzLCAoeCkgPT4geC52YWx1ZS5jaGFyQXQoMCkpO1xuICB9XG5cbiAgY2xlYXJXb3JkcygpOiB2b2lkIHtcbiAgICB0aGlzLndvcmRzID0gW107XG4gICAgdGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIgPSB7fTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBwdXNoV29yZCwgV29yZCwgV29yZHNCeUZpcnN0TGV0dGVyIH0gZnJvbSBcIi4vc3VnZ2VzdGVyXCI7XG5pbXBvcnQgeyBBcHBIZWxwZXIgfSBmcm9tIFwiLi4vYXBwLWhlbHBlclwiO1xuaW1wb3J0IHsgZXhjbHVkZUVtb2ppIH0gZnJvbSBcIi4uL3V0aWwvc3RyaW5nc1wiO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyIHtcbiAgcHJpdmF0ZSB3b3JkczogV29yZFtdID0gW107XG4gIHdvcmRzQnlGaXJzdExldHRlcjogV29yZHNCeUZpcnN0TGV0dGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwOiBBcHAsIHByaXZhdGUgYXBwSGVscGVyOiBBcHBIZWxwZXIpIHt9XG5cbiAgcmVmcmVzaFdvcmRzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJXb3JkcygpO1xuXG4gICAgY29uc3QgcmVzb2x2ZWRJbnRlcm5hbExpbmtXb3JkcyA9IHRoaXMuYXBwLnZhdWx0XG4gICAgICAuZ2V0TWFya2Rvd25GaWxlcygpXG4gICAgICAubWFwKCh4KSA9PiB7XG4gICAgICAgIGNvbnN0IGxlc3NFbW9qaVZhbHVlID0gZXhjbHVkZUVtb2ppKHguYmFzZW5hbWUpO1xuICAgICAgICBjb25zdCBhbGlhc2VzID1cbiAgICAgICAgICB4LmJhc2VuYW1lID09PSBsZXNzRW1vamlWYWx1ZVxuICAgICAgICAgICAgPyB0aGlzLmFwcEhlbHBlci5nZXRBbGlhc2VzKHgpXG4gICAgICAgICAgICA6IFtsZXNzRW1vamlWYWx1ZSwgLi4udGhpcy5hcHBIZWxwZXIuZ2V0QWxpYXNlcyh4KV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IHguYmFzZW5hbWUsXG4gICAgICAgICAgYWxpYXNlcyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogeC5wYXRoLFxuICAgICAgICAgIGludGVybmFsTGluazogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgdW5yZXNvbHZlZEludGVybmFsTGlua1dvcmRzID0gdGhpcy5hcHBIZWxwZXJcbiAgICAgIC5zZWFyY2hQaGFudG9tTGlua3MoKVxuICAgICAgLm1hcCgodGV4dCkgPT4ge1xuICAgICAgICBjb25zdCBsZXNzRW1vamlWYWx1ZSA9IGV4Y2x1ZGVFbW9qaSh0ZXh0KTtcbiAgICAgICAgY29uc3QgYWxpYXNlcyA9IHRleHQgPT09IGxlc3NFbW9qaVZhbHVlID8gdW5kZWZpbmVkIDogW2xlc3NFbW9qaVZhbHVlXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICBhbGlhc2VzLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5vdCBjcmVhdGVkIHlldFwiLFxuICAgICAgICAgIGludGVybmFsTGluazogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy53b3JkcyA9IFsuLi5yZXNvbHZlZEludGVybmFsTGlua1dvcmRzLCAuLi51bnJlc29sdmVkSW50ZXJuYWxMaW5rV29yZHNdO1xuICAgIGZvciAoY29uc3Qgd29yZCBvZiB0aGlzLndvcmRzKSB7XG4gICAgICBwdXNoV29yZCh0aGlzLndvcmRzQnlGaXJzdExldHRlciwgd29yZC52YWx1ZS5jaGFyQXQoMCksIHdvcmQpO1xuICAgICAgd29yZC5hbGlhc2VzPy5mb3JFYWNoKChhKSA9PlxuICAgICAgICBwdXNoV29yZCh0aGlzLndvcmRzQnlGaXJzdExldHRlciwgYS5jaGFyQXQoMCksIHdvcmQpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyV29yZHMoKTogdm9pZCB7XG4gICAgdGhpcy53b3JkcyA9IFtdO1xuICAgIHRoaXMud29yZHNCeUZpcnN0TGV0dGVyID0ge307XG4gIH1cbn1cbiIsImltcG9ydCB7IEluZGV4ZWRXb3JkcyB9IGZyb20gXCIuLi91aS9BdXRvQ29tcGxldGVTdWdnZXN0XCI7XG5pbXBvcnQgeyBzdWdnZXN0V29yZHMsIHN1Z2dlc3RXb3Jkc0J5UGFydGlhbE1hdGNoLCBXb3JkIH0gZnJvbSBcIi4vc3VnZ2VzdGVyXCI7XG5cbnR5cGUgTmFtZSA9IFwicHJlZml4XCIgfCBcInBhcnRpYWxcIjtcblxudHlwZSBIYW5kbGVyID0gKFxuICBpbmRleGVkV29yZHM6IEluZGV4ZWRXb3JkcyxcbiAgcXVlcnk6IHN0cmluZyxcbiAgbWF4OiBudW1iZXJcbikgPT4gV29yZFtdO1xuXG5leHBvcnQgY2xhc3MgTWF0Y2hTdHJhdGVneSB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF92YWx1ZXM6IE1hdGNoU3RyYXRlZ3lbXSA9IFtdO1xuXG4gIHN0YXRpYyByZWFkb25seSBQUkVGSVggPSBuZXcgTWF0Y2hTdHJhdGVneShcInByZWZpeFwiLCBzdWdnZXN0V29yZHMpO1xuICBzdGF0aWMgcmVhZG9ubHkgUEFSVElBTCA9IG5ldyBNYXRjaFN0cmF0ZWd5KFxuICAgIFwicGFydGlhbFwiLFxuICAgIHN1Z2dlc3RXb3Jkc0J5UGFydGlhbE1hdGNoXG4gICk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihyZWFkb25seSBuYW1lOiBOYW1lLCByZWFkb25seSBoYW5kbGVyOiBIYW5kbGVyKSB7XG4gICAgTWF0Y2hTdHJhdGVneS5fdmFsdWVzLnB1c2godGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5hbWUobmFtZTogc3RyaW5nKTogTWF0Y2hTdHJhdGVneSB7XG4gICAgcmV0dXJuIE1hdGNoU3RyYXRlZ3kuX3ZhbHVlcy5maW5kKCh4KSA9PiB4Lm5hbWUgPT09IG5hbWUpITtcbiAgfVxuXG4gIHN0YXRpYyB2YWx1ZXMoKTogTWF0Y2hTdHJhdGVneVtdIHtcbiAgICByZXR1cm4gTWF0Y2hTdHJhdGVneS5fdmFsdWVzO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBBcHAsXG4gIGRlYm91bmNlLFxuICBEZWJvdW5jZXIsXG4gIEVkaXRvcixcbiAgRWRpdG9yUG9zaXRpb24sXG4gIEVkaXRvclN1Z2dlc3QsXG4gIEVkaXRvclN1Z2dlc3RDb250ZXh0LFxuICBFZGl0b3JTdWdnZXN0VHJpZ2dlckluZm8sXG4gIEV2ZW50UmVmLFxuICBLZXltYXBFdmVudEhhbmRsZXIsXG4gIFNjb3BlLFxuICBURmlsZSxcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBjcmVhdGVUb2tlbml6ZXIsIFRva2VuaXplciB9IGZyb20gXCIuLi90b2tlbml6ZXIvdG9rZW5pemVyXCI7XG5pbXBvcnQgeyBUb2tlbml6ZVN0cmF0ZWd5IH0gZnJvbSBcIi4uL3Rva2VuaXplci9Ub2tlbml6ZVN0cmF0ZWd5XCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQXBwSGVscGVyIH0gZnJvbSBcIi4uL2FwcC1oZWxwZXJcIjtcbmltcG9ydCB7IFdvcmQsIFdvcmRzQnlGaXJzdExldHRlciB9IGZyb20gXCIuLi9wcm92aWRlci9zdWdnZXN0ZXJcIjtcbmltcG9ydCB7IEN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIgfSBmcm9tIFwiLi4vcHJvdmlkZXIvQ3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlclwiO1xuaW1wb3J0IHsgQ3VycmVudEZpbGVXb3JkUHJvdmlkZXIgfSBmcm9tIFwiLi4vcHJvdmlkZXIvQ3VycmVudEZpbGVXb3JkUHJvdmlkZXJcIjtcbmltcG9ydCB7IEludGVybmFsTGlua1dvcmRQcm92aWRlciB9IGZyb20gXCIuLi9wcm92aWRlci9JbnRlcm5hbExpbmtXb3JkUHJvdmlkZXJcIjtcbmltcG9ydCB7IE1hdGNoU3RyYXRlZ3kgfSBmcm9tIFwiLi4vcHJvdmlkZXIvTWF0Y2hTdHJhdGVneVwiO1xuXG5leHBvcnQgdHlwZSBJbmRleGVkV29yZHMgPSB7XG4gIGN1cnJlbnRGaWxlOiBXb3Jkc0J5Rmlyc3RMZXR0ZXI7XG4gIGN1c3RvbURpY3Rpb25hcnk6IFdvcmRzQnlGaXJzdExldHRlcjtcbiAgaW50ZXJuYWxMaW5rOiBXb3Jkc0J5Rmlyc3RMZXR0ZXI7XG59O1xuXG4vLyBUaGlzIGlzIGFuIHVuc2FmZSBjb2RlLi4hIVxuaW50ZXJmYWNlIFVuc2FmZUVkaXRvclN1Z2dlc3RJbnRlcmZhY2Uge1xuICBzY29wZTogU2NvcGUgJiB7IGtleXM6IChLZXltYXBFdmVudEhhbmRsZXIgJiB7IGZ1bmM6IENhbGxhYmxlRnVuY3Rpb24gfSlbXSB9O1xuICBzdWdnZXN0aW9uczoge1xuICAgIHNlbGVjdGVkSXRlbTogbnVtYmVyO1xuICAgIHVzZVNlbGVjdGVkSXRlbShldjogUGFydGlhbDxLZXlib2FyZEV2ZW50Pik6IHZvaWQ7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGVTdWdnZXN0XG4gIGV4dGVuZHMgRWRpdG9yU3VnZ2VzdDxXb3JkPlxuICBpbXBsZW1lbnRzIFVuc2FmZUVkaXRvclN1Z2dlc3RJbnRlcmZhY2VcbntcbiAgYXBwOiBBcHA7XG4gIHNldHRpbmdzOiBTZXR0aW5ncztcbiAgYXBwSGVscGVyOiBBcHBIZWxwZXI7XG5cbiAgY3VycmVudEZpbGVXb3JkUHJvdmlkZXI6IEN1cnJlbnRGaWxlV29yZFByb3ZpZGVyO1xuICBjdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyOiBDdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyO1xuICBpbnRlcm5hbExpbmtXb3JkUHJvdmlkZXI6IEludGVybmFsTGlua1dvcmRQcm92aWRlcjtcblxuICB0b2tlbml6ZXI6IFRva2VuaXplcjtcbiAgZGVib3VuY2VHZXRTdWdnZXN0aW9uczogRGVib3VuY2VyPFxuICAgIFtFZGl0b3JTdWdnZXN0Q29udGV4dCwgKHRva2VuczogV29yZFtdKSA9PiB2b2lkXVxuICA+O1xuICBkZWJvdW5jZUNsb3NlOiBEZWJvdW5jZXI8W10+O1xuXG4gIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIC8vIHVuc2FmZSEhXG4gIHNjb3BlOiBVbnNhZmVFZGl0b3JTdWdnZXN0SW50ZXJmYWNlW1wic2NvcGVcIl07XG4gIHN1Z2dlc3Rpb25zOiBVbnNhZmVFZGl0b3JTdWdnZXN0SW50ZXJmYWNlW1wic3VnZ2VzdGlvbnNcIl07XG5cbiAga2V5bWFwRXZlbnRIYW5kbGVyOiBLZXltYXBFdmVudEhhbmRsZXJbXSA9IFtdO1xuICBtb2RpZnlFdmVudFJlZjogRXZlbnRSZWY7XG4gIGFjdGl2ZUxlYWZDaGFuZ2VSZWY6IEV2ZW50UmVmO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoXG4gICAgYXBwOiBBcHAsXG4gICAgY3VzdG9tRGljdGlvbmFyeVN1Z2dlc3RlcjogQ3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlclxuICApIHtcbiAgICBzdXBlcihhcHApO1xuICAgIHRoaXMuYXBwSGVscGVyID0gbmV3IEFwcEhlbHBlcihhcHApO1xuICAgIHRoaXMuY3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlciA9IGN1c3RvbURpY3Rpb25hcnlTdWdnZXN0ZXI7XG4gIH1cblxuICB0cmlnZ2VyQ29tcGxldGUoKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5hcHBIZWxwZXIuZ2V0Q3VycmVudEVkaXRvcigpO1xuICAgIGNvbnN0IGFjdGl2ZUZpbGUgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuICAgIGlmICghZWRpdG9yIHx8ICFhY3RpdmVGaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gWFhYOiBVbnNhZmVcbiAgICAodGhpcyBhcyBhbnkpLnRyaWdnZXIoZWRpdG9yLCBhY3RpdmVGaWxlLCB0cnVlKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBuZXcoYXBwOiBBcHAsIHNldHRpbmdzOiBTZXR0aW5ncyk6IFByb21pc2U8QXV0b0NvbXBsZXRlU3VnZ2VzdD4ge1xuICAgIGNvbnN0IGlucyA9IG5ldyBBdXRvQ29tcGxldGVTdWdnZXN0KFxuICAgICAgYXBwLFxuICAgICAgbmV3IEN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIoXG4gICAgICAgIGFwcCxcbiAgICAgICAgc2V0dGluZ3MuY3VzdG9tRGljdGlvbmFyeVBhdGhzLnNwbGl0KFwiXFxuXCIpLmZpbHRlcigoeCkgPT4geClcbiAgICAgIClcbiAgICApO1xuXG4gICAgYXdhaXQgaW5zLnVwZGF0ZVNldHRpbmdzKHNldHRpbmdzKTtcbiAgICBhd2FpdCBpbnMucmVmcmVzaEN1c3RvbURpY3Rpb25hcnlUb2tlbnMoKTtcblxuICAgIGlucy5tb2RpZnlFdmVudFJlZiA9IGFwcC52YXVsdC5vbihcIm1vZGlmeVwiLCBhc3luYyAoXykgPT4ge1xuICAgICAgYXdhaXQgaW5zLnJlZnJlc2hDdXJyZW50RmlsZVRva2VucygpO1xuICAgIH0pO1xuICAgIGlucy5hY3RpdmVMZWFmQ2hhbmdlUmVmID0gYXBwLndvcmtzcGFjZS5vbihcbiAgICAgIFwiYWN0aXZlLWxlYWYtY2hhbmdlXCIsXG4gICAgICBhc3luYyAoXykgPT4ge1xuICAgICAgICBhd2FpdCBpbnMucmVmcmVzaEN1cnJlbnRGaWxlVG9rZW5zKCk7XG4gICAgICAgIGlucy5yZWZyZXNoSW50ZXJuYWxMaW5rVG9rZW5zKCk7XG4gICAgICB9XG4gICAgKTtcbiAgICAvLyBBdm9pZCB0byByZWZlciBpbmNvbXBsZXRlIGNhY2hlXG4gICAgY29uc3QgY2FjaGVSZXNvbHZlZFJlZiA9IGFwcC5tZXRhZGF0YUNhY2hlLm9uKFwicmVzb2x2ZWRcIiwgKCkgPT4ge1xuICAgICAgaW5zLnJlZnJlc2hJbnRlcm5hbExpbmtUb2tlbnMoKTtcbiAgICAgIGlucy5hcHAubWV0YWRhdGFDYWNoZS5vZmZyZWYoY2FjaGVSZXNvbHZlZFJlZik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5zO1xuICB9XG5cbiAgcHJlZGljdGFibGVDb21wbGV0ZSgpIHtcbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmFwcEhlbHBlci5nZXRDdXJyZW50RWRpdG9yKCk7XG4gICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG4gICAgY29uc3QgY3VycmVudFRva2VuID0gdGhpcy50b2tlbml6ZXJcbiAgICAgIC50b2tlbml6ZShlZGl0b3IuZ2V0TGluZShjdXJzb3IubGluZSkuc2xpY2UoMCwgY3Vyc29yLmNoKSlcbiAgICAgIC5sYXN0KCk7XG4gICAgaWYgKCFjdXJyZW50VG9rZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc3VnZ2VzdGlvbiA9IHRoaXMudG9rZW5pemVyXG4gICAgICAudG9rZW5pemUoZWRpdG9yLmdldFJhbmdlKHsgbGluZTogY3Vyc29yLmxpbmUgLSA1MCwgY2g6IDAgfSwgY3Vyc29yKSlcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5zbGljZSgxKVxuICAgICAgLmZpbmQoKHgpID0+IHguc3RhcnRzV2l0aChjdXJyZW50VG9rZW4pKTtcbiAgICBpZiAoIXN1Z2dlc3Rpb24pIHtcbiAgICAgIHN1Z2dlc3Rpb24gPSB0aGlzLnRva2VuaXplclxuICAgICAgICAudG9rZW5pemUoZWRpdG9yLmdldFJhbmdlKGN1cnNvciwgeyBsaW5lOiBjdXJzb3IubGluZSArIDUwLCBjaDogMCB9KSlcbiAgICAgICAgLmZpbmQoKHgpID0+IHguc3RhcnRzV2l0aChjdXJyZW50VG9rZW4pKTtcbiAgICB9XG4gICAgaWYgKCFzdWdnZXN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZWRpdG9yLnJlcGxhY2VSYW5nZShcbiAgICAgIHN1Z2dlc3Rpb24sXG4gICAgICB7IGxpbmU6IGN1cnNvci5saW5lLCBjaDogY3Vyc29yLmNoIC0gY3VycmVudFRva2VuLmxlbmd0aCB9LFxuICAgICAgeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IGN1cnNvci5jaCB9XG4gICAgKTtcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLmRlYm91bmNlQ2xvc2UoKTtcbiAgfVxuXG4gIHVucmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5hcHAudmF1bHQub2ZmcmVmKHRoaXMubW9kaWZ5RXZlbnRSZWYpO1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vZmZyZWYodGhpcy5hY3RpdmVMZWFmQ2hhbmdlUmVmKTtcbiAgfVxuXG4gIGdldCB0b2tlbml6ZXJTdHJhdGVneSgpOiBUb2tlbml6ZVN0cmF0ZWd5IHtcbiAgICByZXR1cm4gVG9rZW5pemVTdHJhdGVneS5mcm9tTmFtZSh0aGlzLnNldHRpbmdzLnN0cmF0ZWd5KTtcbiAgfVxuXG4gIGdldCBtYXRjaFN0cmF0ZWd5KCk6IE1hdGNoU3RyYXRlZ3kge1xuICAgIHJldHVybiBNYXRjaFN0cmF0ZWd5LmZyb21OYW1lKHRoaXMuc2V0dGluZ3MubWF0Y2hTdHJhdGVneSk7XG4gIH1cblxuICBnZXQgbWluTnVtYmVyVHJpZ2dlcmVkKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc2V0dGluZ3MubWluTnVtYmVyT2ZDaGFyYWN0ZXJzVHJpZ2dlcmVkIHx8XG4gICAgICB0aGlzLnRva2VuaXplclN0cmF0ZWd5LnRyaWdnZXJUaHJlc2hvbGRcbiAgICApO1xuICB9XG5cbiAgZ2V0IGluZGV4ZWRXb3JkcygpOiBJbmRleGVkV29yZHMge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50RmlsZTogdGhpcy5jdXJyZW50RmlsZVdvcmRQcm92aWRlci53b3Jkc0J5Rmlyc3RMZXR0ZXIsXG4gICAgICBjdXN0b21EaWN0aW9uYXJ5OiB0aGlzLmN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIud29yZHNCeUZpcnN0TGV0dGVyLFxuICAgICAgaW50ZXJuYWxMaW5rOiB0aGlzLmludGVybmFsTGlua1dvcmRQcm92aWRlci53b3Jkc0J5Rmlyc3RMZXR0ZXIsXG4gICAgfTtcbiAgfVxuXG4gIHRvZ2dsZUVuYWJsZWQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9ICF0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlU2V0dGluZ3Moc2V0dGluZ3M6IFNldHRpbmdzKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuY3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlci51cGRhdGVQYXRocyhcbiAgICAgIHNldHRpbmdzLmN1c3RvbURpY3Rpb25hcnlQYXRocy5zcGxpdChcIlxcblwiKS5maWx0ZXIoKHgpID0+IHgpXG4gICAgKTtcbiAgICB0aGlzLnRva2VuaXplciA9IGNyZWF0ZVRva2VuaXplcih0aGlzLnRva2VuaXplclN0cmF0ZWd5KTtcbiAgICB0aGlzLmN1cnJlbnRGaWxlV29yZFByb3ZpZGVyID0gbmV3IEN1cnJlbnRGaWxlV29yZFByb3ZpZGVyKFxuICAgICAgdGhpcy5hcHAsXG4gICAgICB0aGlzLmFwcEhlbHBlcixcbiAgICAgIHRoaXMudG9rZW5pemVyXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLnJlZnJlc2hDdXJyZW50RmlsZVRva2VucygpO1xuICAgIHRoaXMuaW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyID0gbmV3IEludGVybmFsTGlua1dvcmRQcm92aWRlcihcbiAgICAgIHRoaXMuYXBwLFxuICAgICAgdGhpcy5hcHBIZWxwZXJcbiAgICApO1xuICAgIGF3YWl0IHRoaXMucmVmcmVzaEludGVybmFsTGlua1Rva2VucygpO1xuXG4gICAgdGhpcy5kZWJvdW5jZUdldFN1Z2dlc3Rpb25zID0gZGVib3VuY2UoXG4gICAgICAoY29udGV4dDogRWRpdG9yU3VnZ2VzdENvbnRleHQsIGNiOiAod29yZHM6IFdvcmRbXSkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjYihcbiAgICAgICAgICB0aGlzLm1hdGNoU3RyYXRlZ3kuaGFuZGxlcihcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlZFdvcmRzLFxuICAgICAgICAgICAgY29udGV4dC5xdWVyeSxcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWF4TnVtYmVyT2ZTdWdnZXN0aW9uc1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zaG93RGVidWdMb2coXCJHZXQgc3VnZ2VzdGlvbnNcIiwgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydCk7XG4gICAgICB9LFxuICAgICAgdGhpcy5zZXR0aW5ncy5kZWxheU1pbGxpU2Vjb25kcyxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgdGhpcy5kZWJvdW5jZUNsb3NlID0gZGVib3VuY2UoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0sIHRoaXMuc2V0dGluZ3MuZGVsYXlNaWxsaVNlY29uZHMgKyA1MCk7XG5cbiAgICAvLyBuZXdcbiAgICB0aGlzLmtleW1hcEV2ZW50SGFuZGxlci5mb3JFYWNoKCh4KSA9PiB0aGlzLnNjb3BlLnVucmVnaXN0ZXIoeCkpO1xuICAgIHRoaXMua2V5bWFwRXZlbnRIYW5kbGVyID0gW1xuICAgICAgdGhpcy5zY29wZS5yZWdpc3RlcihbXSwgXCJUYWJcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zLnVzZVNlbGVjdGVkSXRlbSh7fSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pLFxuICAgIF07XG5cbiAgICAvLyBvdmVyd3JpdGVcbiAgICB0aGlzLnNjb3BlLmtleXMuZmluZCgoeCkgPT4geC5rZXkgPT09IFwiRXNjYXBlXCIpIS5mdW5jID0gKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MucHJvcGFnYXRlRXNjO1xuICAgIH07XG4gIH1cblxuICBhc3luYyByZWZyZXNoQ3VycmVudEZpbGVUb2tlbnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5lbmFibGVDdXJyZW50RmlsZUNvbXBsZW1lbnQpIHtcbiAgICAgIHRoaXMuY3VycmVudEZpbGVXb3JkUHJvdmlkZXIuY2xlYXJXb3JkcygpO1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICAgIFwi8J+RoiBTa2lwOiBJbmRleCBjdXJyZW50IGZpbGUgdG9rZW5zXCIsXG4gICAgICAgIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5jdXJyZW50RmlsZVdvcmRQcm92aWRlci5yZWZyZXNoV29yZHMoKTtcbiAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcIkluZGV4IGN1cnJlbnQgZmlsZSB0b2tlbnNcIiwgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydCk7XG4gIH1cblxuICBhc3luYyByZWZyZXNoQ3VzdG9tRGljdGlvbmFyeVRva2VucygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50KSB7XG4gICAgICB0aGlzLmN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIuY2xlYXJXb3JkcygpO1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICAgIFwi8J+RolNraXA6IEluZGV4IGN1c3RvbSBkaWN0aW9uYXJ5IHRva2Vuc1wiLFxuICAgICAgICBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0XG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuY3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlci5yZWZyZXNoQ3VzdG9tV29yZHMoKTtcbiAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcbiAgICAgIFwiSW5kZXggY3VzdG9tIGRpY3Rpb25hcnkgdG9rZW5zXCIsXG4gICAgICBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0XG4gICAgKTtcbiAgfVxuXG4gIHJlZnJlc2hJbnRlcm5hbExpbmtUb2tlbnMoKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5lbmFibGVJbnRlcm5hbExpbmtDb21wbGVtZW50KSB7XG4gICAgICB0aGlzLmludGVybmFsTGlua1dvcmRQcm92aWRlci5jbGVhcldvcmRzKCk7XG4gICAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcbiAgICAgICAgXCLwn5GiU2tpcDogSW5kZXggaW50ZXJuYWwgbGluayB0b2tlbnNcIixcbiAgICAgICAgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmludGVybmFsTGlua1dvcmRQcm92aWRlci5yZWZyZXNoV29yZHMoKTtcbiAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcIkluZGV4IGludGVybmFsIGxpbmsgdG9rZW5zXCIsIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnQpO1xuICB9XG5cbiAgb25UcmlnZ2VyKFxuICAgIGN1cnNvcjogRWRpdG9yUG9zaXRpb24sXG4gICAgZWRpdG9yOiBFZGl0b3IsXG4gICAgZmlsZTogVEZpbGVcbiAgKTogRWRpdG9yU3VnZ2VzdFRyaWdnZXJJbmZvIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuc2V0dGluZ3MuZGlzYWJsZVN1Z2dlc3Rpb25zRHVyaW5nSW1lT24gJiZcbiAgICAgIHRoaXMuYXBwSGVscGVyLmlzSU1FT24oKVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudENoYXIgPSBlZGl0b3IuZ2V0UmFuZ2UoXG4gICAgICB7IGxpbmU6IGN1cnNvci5saW5lLCBjaDogY3Vyc29yLmNoIC0gMSB9LFxuICAgICAgY3Vyc29yXG4gICAgKTtcbiAgICBpZiAoY3VycmVudENoYXIubWF0Y2godGhpcy50b2tlbml6ZXIuZ2V0VHJpbVBhdHRlcm4oKSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRUb2tlbiA9IHRoaXMudG9rZW5pemVyXG4gICAgICAudG9rZW5pemUoZWRpdG9yLmdldExpbmUoY3Vyc29yLmxpbmUpLnNsaWNlKDAsIGN1cnNvci5jaCkpXG4gICAgICAubGFzdCgpO1xuICAgIGlmICghY3VycmVudFRva2VuIHx8IGN1cnJlbnRUb2tlbi5sZW5ndGggPCB0aGlzLm1pbk51bWJlclRyaWdnZXJlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudG9rZW5pemVyLnNob3VsZElnbm9yZShjdXJyZW50VG9rZW4pKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHtcbiAgICAgICAgY2g6IGN1cnNvci5jaCAtIGN1cnJlbnRUb2tlbi5sZW5ndGgsXG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgfSxcbiAgICAgIGVuZDogY3Vyc29yLFxuICAgICAgcXVlcnk6IGN1cnJlbnRUb2tlbixcbiAgICB9O1xuICB9XG5cbiAgZ2V0U3VnZ2VzdGlvbnMoY29udGV4dDogRWRpdG9yU3VnZ2VzdENvbnRleHQpOiBXb3JkW10gfCBQcm9taXNlPFdvcmRbXT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5kZWJvdW5jZUdldFN1Z2dlc3Rpb25zKGNvbnRleHQsICh3b3JkcykgPT4ge1xuICAgICAgICByZXNvbHZlKHdvcmRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyU3VnZ2VzdGlvbih3b3JkOiBXb3JkLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlID0gY3JlYXRlRGl2KCk7XG4gICAgYmFzZS5jcmVhdGVEaXYoe1xuICAgICAgdGV4dDogd29yZC5pbnRlcm5hbExpbmsgPyBgW1ske3dvcmQudmFsdWV9XV1gIDogd29yZC52YWx1ZSxcbiAgICB9KTtcblxuICAgIGlmICh3b3JkLmRlc2NyaXB0aW9uKSB7XG4gICAgICBiYXNlLmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJ2YXJpb3VzLWNvbXBsZW1lbnRzX19zdWdnZXN0X19kZXNjcmlwdGlvblwiLFxuICAgICAgICB0ZXh0OiBgJHt3b3JkLmRlc2NyaXB0aW9ufWAsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBlbC5hcHBlbmRDaGlsZChiYXNlKTtcbiAgfVxuXG4gIHNlbGVjdFN1Z2dlc3Rpb24od29yZDogV29yZCwgZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgIGxldCBpbnNlcnRlZFRleHQgPSB3b3JkLnZhbHVlO1xuICAgICAgaWYgKHdvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICAgIGluc2VydGVkVGV4dCA9IGBbWyR7aW5zZXJ0ZWRUZXh0fV1dYDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmluc2VydEFmdGVyQ29tcGxldGlvbikge1xuICAgICAgICBpbnNlcnRlZFRleHQgPSBgJHtpbnNlcnRlZFRleHR9IGA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGV4dC5lZGl0b3IucmVwbGFjZVJhbmdlKFxuICAgICAgICBpbnNlcnRlZFRleHQsXG4gICAgICAgIHRoaXMuY29udGV4dC5zdGFydCxcbiAgICAgICAgdGhpcy5jb250ZXh0LmVuZFxuICAgICAgKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHRoaXMuZGVib3VuY2VDbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd0RlYnVnTG9nKG1lc3NhZ2U6IHN0cmluZywgbXNlYzogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd0xvZ0Fib3V0UGVyZm9ybWFuY2VJbkNvbnNvbGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAke21lc3NhZ2V9OiAke01hdGgucm91bmQobXNlYyl9W21zXWApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBwLCBOb3RpY2UsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBWYXJpb3VzQ29tcG9uZW50cyBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBUb2tlbml6ZVN0cmF0ZWd5IH0gZnJvbSBcIi4vdG9rZW5pemVyL1Rva2VuaXplU3RyYXRlZ3lcIjtcbmltcG9ydCB7IE1hdGNoU3RyYXRlZ3kgfSBmcm9tIFwiLi9wcm92aWRlci9NYXRjaFN0cmF0ZWd5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3Mge1xuICBzdHJhdGVneTogc3RyaW5nO1xuICBtYXRjaFN0cmF0ZWd5OiBzdHJpbmc7XG4gIG1heE51bWJlck9mU3VnZ2VzdGlvbnM6IG51bWJlcjtcbiAgbWluTnVtYmVyT2ZDaGFyYWN0ZXJzVHJpZ2dlcmVkOiBudW1iZXI7XG4gIGRlbGF5TWlsbGlTZWNvbmRzOiBudW1iZXI7XG4gIGN1c3RvbURpY3Rpb25hcnlQYXRoczogc3RyaW5nO1xuICBwcm9wYWdhdGVFc2M6IGJvb2xlYW47XG4gIGVuYWJsZUN1cnJlbnRGaWxlQ29tcGxlbWVudDogYm9vbGVhbjtcbiAgZW5hYmxlQ3VzdG9tRGljdGlvbmFyeUNvbXBsZW1lbnQ6IGJvb2xlYW47XG4gIGVuYWJsZUludGVybmFsTGlua0NvbXBsZW1lbnQ6IGJvb2xlYW47XG4gIGRpc2FibGVTdWdnZXN0aW9uc0R1cmluZ0ltZU9uOiBib29sZWFuO1xuICBzaG93TG9nQWJvdXRQZXJmb3JtYW5jZUluQ29uc29sZTogYm9vbGVhbjtcbiAgaW5zZXJ0QWZ0ZXJDb21wbGV0aW9uOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogU2V0dGluZ3MgPSB7XG4gIHN0cmF0ZWd5OiBcImRlZmF1bHRcIixcbiAgbWF0Y2hTdHJhdGVneTogXCJwcmVmaXhcIixcbiAgbWF4TnVtYmVyT2ZTdWdnZXN0aW9uczogNSxcbiAgbWluTnVtYmVyT2ZDaGFyYWN0ZXJzVHJpZ2dlcmVkOiAwLFxuICBkZWxheU1pbGxpU2Vjb25kczogMCxcbiAgY3VzdG9tRGljdGlvbmFyeVBhdGhzOiBcIlwiLFxuICBwcm9wYWdhdGVFc2M6IGZhbHNlLFxuICBlbmFibGVDdXJyZW50RmlsZUNvbXBsZW1lbnQ6IHRydWUsXG4gIGVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50OiBmYWxzZSxcbiAgZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudDogdHJ1ZSxcbiAgZGlzYWJsZVN1Z2dlc3Rpb25zRHVyaW5nSW1lT246IGZhbHNlLFxuICBzaG93TG9nQWJvdXRQZXJmb3JtYW5jZUluQ29uc29sZTogZmFsc2UsXG4gIGluc2VydEFmdGVyQ29tcGxldGlvbjogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjbGFzcyBWYXJpb3VzQ29tcGxlbWVudHNTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHBsdWdpbjogVmFyaW91c0NvbXBvbmVudHM7XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogVmFyaW91c0NvbXBvbmVudHMpIHtcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGxldCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlZhcmlvdXMgQ29tcGxlbWVudHMgLSBTZXR0aW5nc1wiIH0pO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiTWFpblwiIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpLnNldE5hbWUoXCJTdHJhdGVneVwiKS5hZGREcm9wZG93bigodGMpID0+XG4gICAgICB0Y1xuICAgICAgICAuYWRkT3B0aW9ucyhcbiAgICAgICAgICBUb2tlbml6ZVN0cmF0ZWd5LnZhbHVlcygpLnJlZHVjZShcbiAgICAgICAgICAgIChwLCBjKSA9PiAoeyAuLi5wLCBbYy5uYW1lXTogYy5uYW1lIH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN0cmF0ZWd5KVxuICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RyYXRlZ3kgPSB2YWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoeyBjdXJyZW50RmlsZTogdHJ1ZSB9KTtcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpLnNldE5hbWUoXCJNYXRjaCBzdHJhdGVneVwiKS5hZGREcm9wZG93bigodGMpID0+XG4gICAgICB0Y1xuICAgICAgICAuYWRkT3B0aW9ucyhcbiAgICAgICAgICBNYXRjaFN0cmF0ZWd5LnZhbHVlcygpLnJlZHVjZShcbiAgICAgICAgICAgIChwLCBjKSA9PiAoeyAuLi5wLCBbYy5uYW1lXTogYy5uYW1lIH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1hdGNoU3RyYXRlZ3kpXG4gICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXRjaFN0cmF0ZWd5ID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKHsgY3VycmVudEZpbGU6IHRydWUgfSk7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubWF0Y2hTdHJhdGVneSA9PT0gTWF0Y2hTdHJhdGVneS5QQVJUSUFMLm5hbWUpIHtcbiAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgdGV4dDogXCLimqAgYHBhcnRpYWxgIGlzIG1vcmUgdGhhbiAxMCB0aW1lcyBzbG93ZXIgdGhhbiBgcHJlZml4YFwiLFxuICAgICAgICBjbHM6IFwidmFyaW91cy1jb21wbGVtZW50c19fc2V0dGluZ3NfX3dhcm5pbmdcIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJNYXggbnVtYmVyIG9mIHN1Z2dlc3Rpb25zXCIpXG4gICAgICAuYWRkU2xpZGVyKChzYykgPT5cbiAgICAgICAgc2NcbiAgICAgICAgICAuc2V0TGltaXRzKDEsIDI1NSwgMSlcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubWF4TnVtYmVyT2ZTdWdnZXN0aW9ucylcbiAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1heE51bWJlck9mU3VnZ2VzdGlvbnMgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIk1pbiBudW1iZXIgb2YgY2hhcmFjdGVycyBmb3IgdHJpZ2dlclwiKVxuICAgICAgLnNldERlc2MoXCJJdCB1c2VzIGEgZGVmYXVsdCB2YWx1ZSBvZiBTdHJhdGVneSBpZiBzZXQgMC5cIilcbiAgICAgIC5hZGRTbGlkZXIoKHNjKSA9PlxuICAgICAgICBzY1xuICAgICAgICAgIC5zZXRMaW1pdHMoMCwgMTAsIDEpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1pbk51bWJlck9mQ2hhcmFjdGVyc1RyaWdnZXJlZClcbiAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1pbk51bWJlck9mQ2hhcmFjdGVyc1RyaWdnZXJlZCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRGVsYXkgbWlsbGktc2Vjb25kcyBmb3IgdHJpZ2dlclwiKVxuICAgICAgLmFkZFNsaWRlcigoc2MpID0+XG4gICAgICAgIHNjXG4gICAgICAgICAgLnNldExpbWl0cygwLCAxMDAwLCAxMClcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsYXlNaWxsaVNlY29uZHMpXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheU1pbGxpU2Vjb25kcyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRGlzYWJsZSBzdWdnZXN0aW9ucyBkdXJpbmcgSU1FIG9uXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZShcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlU3VnZ2VzdGlvbnNEdXJpbmdJbWVPblxuICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVTdWdnZXN0aW9uc0R1cmluZ0ltZU9uID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiSW5zZXJ0IHNwYWNlIGFmdGVyIGNvbXBsZXRpb25cIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmluc2VydEFmdGVyQ29tcGxldGlvbikub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbnNlcnRBZnRlckNvbXBsZXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlByb3BhZ2F0ZSBFU0NcIilcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICBcIkl0IGlzIGhhbmR5IGlmIHlvdSB1c2UgVmltIG1vZGUgYmVjYXVzZSB5b3UgY2FuIHN3aXRjaCB0byBOb3JtYWwgbW9kZSBieSBvbmUgRVNDLCB3aGV0aGVyIGl0IHNob3dzIHN1Z2dlc3Rpb25zIG9yIG5vdC5cIlxuICAgICAgKVxuICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgdGMuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvcGFnYXRlRXNjKS5vbkNoYW5nZShcbiAgICAgICAgICBhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnByb3BhZ2F0ZUVzYyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJDdXJyZW50IGZpbGUgY29tcGxlbWVudFwiIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkVuYWJsZSBDdXJyZW50IGZpbGUgY29tcGxlbWVudFwiKVxuICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgdGMuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQ3VycmVudEZpbGVDb21wbGVtZW50KS5vbkNoYW5nZShcbiAgICAgICAgICBhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1cnJlbnRGaWxlQ29tcGxlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKHsgY3VycmVudEZpbGU6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJDdXN0b20gZGljdGlvbmFyeSBjb21wbGVtZW50XCIgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRW5hYmxlIEN1c3RvbSBkaWN0aW9uYXJ5IGNvbXBsZW1lbnRcIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKFxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50XG4gICAgICAgICkub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQ3VzdG9tRGljdGlvbmFyeUNvbXBsZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoeyBjdXN0b21EaWN0aW9uYXJ5OiB0cnVlIH0pO1xuICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50KSB7XG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJDdXN0b20gZGljdGlvbmFyeSBwYXRoc1wiKVxuICAgICAgICAuc2V0RGVzYyhcIkZvciBlYWNoIGxpbmUsIHNwZWNpZnkgYSByZWxhdGl2ZSBwYXRoIGZyb20gVmF1bHQgcm9vdC5cIilcbiAgICAgICAgLmFkZFRleHRBcmVhKCh0YWMpID0+IHtcbiAgICAgICAgICBjb25zdCBlbCA9IHRhY1xuICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmN1c3RvbURpY3Rpb25hcnlQYXRocylcbiAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImRpY3Rpb25hcnkubWRcIilcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY3VzdG9tRGljdGlvbmFyeVBhdGhzID0gdmFsdWU7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgZWwuaW5wdXRFbC5jbGFzc05hbWUgPVxuICAgICAgICAgICAgXCJ2YXJpb3VzLWNvbXBsZW1lbnRzX19zZXR0aW5nc19fY3VzdG9tLWRpY3Rpb25hcnktcGF0aHNcIjtcbiAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIkludGVybmFsIGxpbmsgY29tcGxlbWVudFwiIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkVuYWJsZSBJbnRlcm5hbCBsaW5rIGNvbXBsZW1lbnRcIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUludGVybmFsTGlua0NvbXBsZW1lbnQpLm9uQ2hhbmdlKFxuICAgICAgICAgIGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKHsgaW50ZXJuYWxMaW5rOiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiRGVidWdcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJTaG93IGxvZyBhYm91dCBwZXJmb3JtYW5jZSBpbiBhIGNvbnNvbGVcIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKFxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dMb2dBYm91dFBlcmZvcm1hbmNlSW5Db25zb2xlXG4gICAgICAgICkub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2hvd0xvZ0Fib3V0UGVyZm9ybWFuY2VJbkNvbnNvbGUgPSB2YWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHRvZ2dsZU1hdGNoU3RyYXRlZ3koKSB7XG4gICAgc3dpdGNoICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXRjaFN0cmF0ZWd5KSB7XG4gICAgICBjYXNlIFwicHJlZml4XCI6XG4gICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1hdGNoU3RyYXRlZ3kgPSBcInBhcnRpYWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicGFydGlhbFwiOlxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXRjaFN0cmF0ZWd5ID0gXCJwcmVmaXhcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBuZXcgTm90aWNlKFwi4pqgVW5leHBlY3RlZCBlcnJvclwiKTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5vdGljZSwgUGx1Z2luIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBBdXRvQ29tcGxldGVTdWdnZXN0IH0gZnJvbSBcIi4vdWkvQXV0b0NvbXBsZXRlU3VnZ2VzdFwiO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9TRVRUSU5HUyxcbiAgU2V0dGluZ3MsXG4gIFZhcmlvdXNDb21wbGVtZW50c1NldHRpbmdUYWIsXG59IGZyb20gXCIuL3NldHRpbmdzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhcmlvdXNDb21wb25lbnRzIGV4dGVuZHMgUGx1Z2luIHtcbiAgc2V0dGluZ3M6IFNldHRpbmdzO1xuICBzZXR0aW5nVGFiOiBWYXJpb3VzQ29tcGxlbWVudHNTZXR0aW5nVGFiO1xuICBzdWdnZXN0ZXI6IEF1dG9Db21wbGV0ZVN1Z2dlc3Q7XG5cbiAgb251bmxvYWQoKSB7XG4gICAgc3VwZXIub251bmxvYWQoKTtcbiAgICB0aGlzLnN1Z2dlc3Rlci51bnJlZ2lzdGVyKCk7XG4gIH1cblxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIHRoaXMuc2V0dGluZ1RhYiA9IG5ldyBWYXJpb3VzQ29tcGxlbWVudHNTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKTtcbiAgICB0aGlzLmFkZFNldHRpbmdUYWIodGhpcy5zZXR0aW5nVGFiKTtcblxuICAgIHRoaXMuc3VnZ2VzdGVyID0gYXdhaXQgQXV0b0NvbXBsZXRlU3VnZ2VzdC5uZXcodGhpcy5hcHAsIHRoaXMuc2V0dGluZ3MpO1xuICAgIHRoaXMucmVnaXN0ZXJFZGl0b3JTdWdnZXN0KHRoaXMuc3VnZ2VzdGVyKTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJyZWxvYWQtY3VzdG9tLWRpY3Rpb25hcmllc1wiLFxuICAgICAgbmFtZTogXCJSZWxvYWQgY3VzdG9tIGRpY3Rpb25hcmllc1wiLFxuICAgICAgaG90a2V5czogW3sgbW9kaWZpZXJzOiBbXCJNb2RcIiwgXCJTaGlmdFwiXSwga2V5OiBcInJcIiB9XSxcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMucmVsb2FkQ3VzdG9tRGljdGlvbmFyaWVzKCk7XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBPYmplY3RBbGxvY2F0aW9uSWdub3JlZFxuICAgICAgICBuZXcgTm90aWNlKGBGaW5pc2ggcmVsb2FkIGN1c3RvbSBkaWN0aW9uYXJpZXNgKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwidG9nZ2xlLWF1dG8tY29tcGxldGVcIixcbiAgICAgIG5hbWU6IFwiVG9nZ2xlIEF1dG8tY29tcGxldGVcIixcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3VnZ2VzdGVyLnRvZ2dsZUVuYWJsZWQoKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwidG9nZ2xlLW1hdGNoLXN0cmF0ZWd5XCIsXG4gICAgICBuYW1lOiBcIlRvZ2dsZSBNYXRjaCBzdHJhdGVneVwiLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXR0aW5nVGFiLnRvZ2dsZU1hdGNoU3RyYXRlZ3koKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwic2hvdy1zdWdnZXN0aW9uc1wiLFxuICAgICAgbmFtZTogXCJTaG93IHN1Z2dlc3Rpb25zXCIsXG4gICAgICBob3RrZXlzOiBbeyBtb2RpZmllcnM6IFtcIk1vZFwiXSwga2V5OiBcIiBcIiB9XSxcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3VnZ2VzdGVyLnRyaWdnZXJDb21wbGV0ZSgpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJwcmVkaWN0YWJsZS1jb21wbGVtZW50c1wiLFxuICAgICAgbmFtZTogXCJQcmVkaWN0YWJsZSBjb21wbGVtZW50XCIsXG4gICAgICBob3RrZXlzOiBbeyBtb2RpZmllcnM6IFtcIlNoaWZ0XCJdLCBrZXk6IFwiIFwiIH1dLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5zdWdnZXN0ZXIucHJlZGljdGFibGVDb21wbGV0ZSgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnNldHRpbmdzID0geyAuLi5ERUZBVUxUX1NFVFRJTkdTLCAuLi4oYXdhaXQgdGhpcy5sb2FkRGF0YSgpKSB9O1xuICB9XG5cbiAgYXN5bmMgc2F2ZVNldHRpbmdzKFxuICAgIG5lZWRVcGRhdGVUb2tlbnM6IHtcbiAgICAgIGN1cnJlbnRGaWxlPzogYm9vbGVhbjtcbiAgICAgIGN1c3RvbURpY3Rpb25hcnk/OiBib29sZWFuO1xuICAgICAgaW50ZXJuYWxMaW5rPzogYm9vbGVhbjtcbiAgICB9ID0ge31cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgICBhd2FpdCB0aGlzLnN1Z2dlc3Rlci51cGRhdGVTZXR0aW5ncyh0aGlzLnNldHRpbmdzKTtcbiAgICBpZiAobmVlZFVwZGF0ZVRva2Vucy5jdXJyZW50RmlsZSkge1xuICAgICAgYXdhaXQgdGhpcy5zdWdnZXN0ZXIucmVmcmVzaEN1cnJlbnRGaWxlVG9rZW5zKCk7XG4gICAgfVxuICAgIGlmIChuZWVkVXBkYXRlVG9rZW5zLmN1c3RvbURpY3Rpb25hcnkpIHtcbiAgICAgIGF3YWl0IHRoaXMuc3VnZ2VzdGVyLnJlZnJlc2hDdXN0b21EaWN0aW9uYXJ5VG9rZW5zKCk7XG4gICAgfVxuICAgIGlmIChuZWVkVXBkYXRlVG9rZW5zLmludGVybmFsTGluaykge1xuICAgICAgYXdhaXQgdGhpcy5zdWdnZXN0ZXIucmVmcmVzaEludGVybmFsTGlua1Rva2VucygpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlbG9hZEN1c3RvbURpY3Rpb25hcmllcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnN1Z2dlc3Rlci5yZWZyZXNoQ3VzdG9tRGljdGlvbmFyeVRva2VucygpO1xuICB9XG59XG4iXSwibmFtZXMiOlsicGFyc2VGcm9udE1hdHRlckFsaWFzZXMiLCJNYXJrZG93blZpZXciLCJOb3RpY2UiLCJFZGl0b3JTdWdnZXN0IiwiZGVib3VuY2UiLCJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyIsIlBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF1REE7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxD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QyxJQUFJLEVBQUUsQ0FBQztJQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7S0FDUixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3JELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEVBQUU7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsS0FBSztLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxLQUFLO1FBQ1gsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxHQUFHO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLElBQUksRUFBRSxDQUFDLEtBQUs7UUFDWixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLEtBQUs7UUFDWixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsS0FBSztRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxLQUFLO1FBQ1YsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxLQUFLO1FBQ1YsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxLQUFLO1FBQ1YsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO0tBQ1IsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO0tBQ1QsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLEVBQUU7UUFDUixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLEVBQUU7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLEdBQUc7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsSUFBSTtLQUNaLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEtBQUssRUFBRSxDQUFDLEdBQUc7UUFDWCxLQUFLLEVBQUUsQ0FBQyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsSUFBSTtRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7S0FDUixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzVELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEVBQUUsRUFBRSxFQUFFO1FBQ04sRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNQLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDUCxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsRUFBRTtRQUNOLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsS0FBSztRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxHQUFHO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULENBQUMsRUFBRSxHQUFHO1FBQ04sR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO0tBQ1AsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsSUFBSTtRQUNULENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLEVBQUUsRUFBRSxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO0tBQ1AsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxDQUFDLEVBQUUsSUFBSTtRQUNQLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxLQUFLO1FBQ1QsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEtBQUs7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixDQUFDLEVBQUUsQ0FBQyxLQUFLO1FBQ1QsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEtBQUs7UUFDVCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7S0FDVCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxLQUFLO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxFQUFFO1FBQ0wsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsRUFBRSxFQUFFLENBQUMsS0FBSztRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7S0FDUixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7S0FDUixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsYUFBYSxDQUFD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UUFDcEIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QixLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBRTVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFD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LFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7U0FDcEU7VUFDRDtZQUNFLElBQUksTUFBQSxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3BELElBQUksTUFBQSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDekQsSUFBSSxNQUFBLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDckQsSUFBSSxNQUFBLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7U0FDcEUsQ0FBQztJQUVOLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ2hDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQ2hELE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztTQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULElBQUksQ0FBQyxDQUFDLEtBQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEtBQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdkMsT0FBTyxDQUFDLENBQUMsS0FBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMs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
