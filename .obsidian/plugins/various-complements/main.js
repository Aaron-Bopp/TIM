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
const TRIM_CHAR_PATTERN = /[\n\t\\\[\]/:?!=()<>"'.,|;*~ `]/g;
class DefaultTokenizer {
    tokenize(content, raw) {
        return pickTokens(content, raw ? / /g : this.getTrimPattern());
    }
    getTrimPattern() {
        return TRIM_CHAR_PATTERN;
    }
    shouldIgnore(str) {
        return false;
    }
}

const ARABIC_TRIM_CHAR_PATTERN = /[\n\t\\\[\]/:?!=()<>"'.,|;*~ `،؛]/g;
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
    tokenize(content, raw) {
        return pickTokensAsJapanese(content, raw ? / /g : this.getTrimPattern());
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
function allAlphabets(text) {
    return Boolean(text.match(/^[a-zA-Z0-9_-]+$/));
}
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
    refreshWords(onlyEnglish) {
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
            const tokens = onlyEnglish
                ? this.tokenizer.tokenize(content).filter(allAlphabets)
                : this.tokenizer.tokenize(content);
            this.words = uniq(tokens)
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

class CycleThroughSuggestionsKeys {
    constructor(name, nextKey, previousKey) {
        this.name = name;
        this.nextKey = nextKey;
        this.previousKey = previousKey;
        CycleThroughSuggestionsKeys._values.push(this);
    }
    static fromName(name) {
        return CycleThroughSuggestionsKeys._values.find((x) => x.name === name);
    }
    static values() {
        return CycleThroughSuggestionsKeys._values;
    }
}
CycleThroughSuggestionsKeys._values = [];
CycleThroughSuggestionsKeys.NONE = new CycleThroughSuggestionsKeys("None", { modifiers: [], key: null }, { modifiers: [], key: null });
CycleThroughSuggestionsKeys.TAB = new CycleThroughSuggestionsKeys("Tab/Shift+Tab", { modifiers: [], key: "Tab" }, { modifiers: ["Shift"], key: "Tab" });
CycleThroughSuggestionsKeys.EMACS = new CycleThroughSuggestionsKeys("Mod+N/Mod+P", { modifiers: ["Mod"], key: "N" }, { modifiers: ["Mod"], key: "P" });
CycleThroughSuggestionsKeys.VIM = new CycleThroughSuggestionsKeys("Mod+J/Mod+K", { modifiers: ["Mod"], key: "J" }, { modifiers: ["Mod"], key: "K" });

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
            .tokenize(editor.getRange({ line: Math.max(cursor.line - 50, 0), ch: 0 }, cursor))
            .reverse()
            .slice(1)
            .find((x) => x.startsWith(currentToken));
        if (!suggestion) {
            suggestion = this.tokenizer
                .tokenize(editor.getRange(cursor, {
                line: Math.min(cursor.line + 50, editor.lineCount() - 1),
                ch: 0,
            }))
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
            this.registerKeymaps();
        });
    }
    registerKeymaps() {
        // Clear
        this.keymapEventHandler.forEach((x) => this.scope.unregister(x));
        this.keymapEventHandler = [];
        // Cycle throw suggestions keys
        const keys = CycleThroughSuggestionsKeys.fromName(this.settings.additionalCycleThroughSuggestionsKeys);
        if (keys !== CycleThroughSuggestionsKeys.NONE) {
            this.keymapEventHandler.push(this.scope.register(keys.nextKey.modifiers, keys.nextKey.key, () => {
                this.suggestions.setSelectedItem(this.suggestions.selectedItem + 1, true);
                return false;
            }), this.scope.register(keys.previousKey.modifiers, keys.previousKey.key, () => {
                this.suggestions.setSelectedItem(this.suggestions.selectedItem - 1, true);
                return false;
            }));
        }
        // Ignore if additionalCycleThroughSuggestionsKeys uses
        this.keymapEventHandler.push(this.scope.register([], "Tab", () => {
            this.suggestions.useSelectedItem({});
            return false;
        }));
        // overwrite
        this.scope.keys.find((x) => x.key === "Escape").func = () => {
            this.close();
            return this.settings.propagateEsc;
        };
    }
    refreshCurrentFileTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const start = performance.now();
            if (!this.settings.enableCurrentFileComplement) {
                this.currentFileWordProvider.clearWords();
                this.showDebugLog("👢 Skip: Index current file tokens", performance.now() - start);
                return;
            }
            yield this.currentFileWordProvider.refreshWords(this.settings.onlyComplementEnglishOnCurrentFileComplement);
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
        if (currentChar === " ") {
            return null;
        }
        const tokens = this.tokenizer.tokenize(editor.getLine(cursor.line).slice(0, cursor.ch), true);
        const currentToken = tokens.last();
        if (!currentToken || currentToken.length < this.minNumberTriggered) {
            return null;
        }
        if (currentToken[0].match(this.tokenizer.getTrimPattern())) {
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
        const text = word.internalLink ? `[[${word.value}]]` : word.value;
        base.createDiv({
            text: this.settings.delimiterToHideSuggestion &&
                text.includes(this.settings.delimiterToHideSuggestion)
                ? `${text.split(this.settings.delimiterToHideSuggestion)[0]} ...`
                : text,
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
            if (this.settings.delimiterToHideSuggestion) {
                insertedText = insertedText.replace(this.settings.delimiterToHideSuggestion, "");
            }
            insertedText = insertedText
                .replace(/(?<!\\)\\n/g, "\n")
                .replace(/(?<!\\)\\t/g, "\t")
                .replace(/\\\\/g, "\\");
            const caret = this.settings.caretLocationSymbolAfterComplement;
            const positionToMove = caret ? insertedText.indexOf(caret) : -1;
            if (positionToMove !== -1) {
                insertedText = insertedText.replace(caret, "");
            }
            const editor = this.context.editor;
            editor.replaceRange(insertedText, this.context.start, this.context.end);
            if (positionToMove !== -1) {
                editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor()) -
                    insertedText.length +
                    positionToMove));
            }
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
    delimiterToHideSuggestion: "",
    caretLocationSymbolAfterComplement: "",
    additionalCycleThroughSuggestionsKeys: "None",
    onlyComplementEnglishOnCurrentFileComplement: false,
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
        new obsidian.Setting(containerEl)
            .setName("Additional cycle through suggestions keys")
            .addDropdown((tc) => tc
            .addOptions(CycleThroughSuggestionsKeys.values().reduce((p, c) => (Object.assign(Object.assign({}, p), { [c.name]: c.name })), {}))
            .setValue(this.plugin.settings.additionalCycleThroughSuggestionsKeys)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.additionalCycleThroughSuggestionsKeys = value;
            yield this.plugin.saveSettings();
        })));
        containerEl.createEl("h3", { text: "Current file complement" });
        new obsidian.Setting(containerEl)
            .setName("Enable Current file complement")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.enableCurrentFileComplement).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.enableCurrentFileComplement = value;
                yield this.plugin.saveSettings({ currentFile: true });
                this.display();
            }));
        });
        if (this.plugin.settings.enableCurrentFileComplement) {
            new obsidian.Setting(containerEl)
                .setName("Only complement English on current file complement")
                .addToggle((tc) => {
                tc.setValue(this.plugin.settings.onlyComplementEnglishOnCurrentFileComplement).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.onlyComplementEnglishOnCurrentFileComplement =
                        value;
                    yield this.plugin.saveSettings({ currentFile: true });
                }));
            });
        }
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
            new obsidian.Setting(containerEl)
                .setName("Delimiter to hide a suggestion")
                .setDesc("If set ';;;', 'abcd;;;efg' is shown as 'abcd' on suggestions, but complements to 'abcdefg'.")
                .addText((cb) => {
                cb.setValue(this.plugin.settings.delimiterToHideSuggestion).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.delimiterToHideSuggestion = value;
                    yield this.plugin.saveSettings();
                }));
            });
            new obsidian.Setting(containerEl)
                .setName("Caret location symbol after complement")
                .setDesc("If set '<CARET>' and there is '<li><CARET></li>' in custom dictionary, it complements '<li></li>' and move a caret where between '<li>' and `</li>`.")
                .addText((cb) => {
                cb.setValue(this.plugin.settings.caretLocationSymbolAfterComplement).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.caretLocationSymbolAfterComplement = value;
                    yield this.plugin.saveSettings();
                }));
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
                    // noinspection ObjectAllocationIgnored
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy90b2tlbml6ZXIvdG9rZW5pemVycy9EZWZhdWx0VG9rZW5pemVyLnRzIiwic3JjL3Rva2VuaXplci90b2tlbml6ZXJzL0FyYWJpY1Rva2VuaXplci50cyIsInNyYy9leHRlcm5hbC90aW55LXNlZ21lbnRlci50cyIsInNyYy90b2tlbml6ZXIvdG9rZW5pemVycy9KYXBhbmVzZVRva2VuaXplci50cyIsInNyYy90b2tlbml6ZXIvdG9rZW5pemVyLnRzIiwic3JjL3Rva2VuaXplci9Ub2tlbml6ZVN0cmF0ZWd5LnRzIiwic3JjL3V0aWwvY29sbGVjdGlvbi1oZWxwZXIudHMiLCJzcmMvYXBwLWhlbHBlci50cyIsInNyYy91dGlsL3N0cmluZ3MudHMiLCJzcmMvcHJvdmlkZXIvc3VnZ2VzdGVyLnRzIiwic3JjL3Byb3ZpZGVyL0N1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIudHMiLCJzcmMvcHJvdmlkZXIvQ3VycmVudEZpbGVXb3JkUHJvdmlkZXIudHMiLCJzcmMvcHJvdmlkZXIvSW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyLnRzIiwic3JjL3Byb3ZpZGVyL01hdGNoU3RyYXRlZ3kudHMiLCJzcmMvQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzLnRzIiwic3JjL3VpL0F1dG9Db21wbGV0ZVN1Z2dlc3QudHMiLCJzcmMvc2V0dGluZ3MudHMiLCJzcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi90b2tlbml6ZXJcIjtcblxuZnVuY3Rpb24gcGlja1Rva2Vucyhjb250ZW50OiBzdHJpbmcsIHRyaW1QYXR0ZXJuOiBSZWdFeHApOiBzdHJpbmdbXSB7XG4gIHJldHVybiBjb250ZW50LnNwbGl0KHRyaW1QYXR0ZXJuKS5maWx0ZXIoKHgpID0+IHggIT09IFwiXCIpO1xufVxuXG5leHBvcnQgY29uc3QgVFJJTV9DSEFSX1BBVFRFUk4gPSAvW1xcblxcdFxcXFxcXFtcXF0vOj8hPSgpPD5cIicuLHw7Kn4gYF0vZztcbmV4cG9ydCBjbGFzcyBEZWZhdWx0VG9rZW5pemVyIGltcGxlbWVudHMgVG9rZW5pemVyIHtcbiAgdG9rZW5pemUoY29udGVudDogc3RyaW5nLCByYXc/OiBib29sZWFuKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBwaWNrVG9rZW5zKGNvbnRlbnQsIHJhdyA/IC8gL2cgOiB0aGlzLmdldFRyaW1QYXR0ZXJuKCkpO1xuICB9XG5cbiAgZ2V0VHJpbVBhdHRlcm4oKTogUmVnRXhwIHtcbiAgICByZXR1cm4gVFJJTV9DSEFSX1BBVFRFUk47XG4gIH1cblxuICBzaG91bGRJZ25vcmUoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IERlZmF1bHRUb2tlbml6ZXIgfSBmcm9tIFwiLi9EZWZhdWx0VG9rZW5pemVyXCI7XG5cbmNvbnN0IEFSQUJJQ19UUklNX0NIQVJfUEFUVEVSTiA9IC9bXFxuXFx0XFxcXFxcW1xcXS86PyE9KCk8PlwiJy4sfDsqfiBg2IzYm10vZztcbmV4cG9ydCBjbGFzcyBBcmFiaWNUb2tlbml6ZXIgZXh0ZW5kcyBEZWZhdWx0VG9rZW5pemVyIHtcbiAgZ2V0VHJpbVBhdHRlcm4oKTogUmVnRXhwIHtcbiAgICByZXR1cm4gQVJBQklDX1RSSU1fQ0hBUl9QQVRURVJOO1xuICB9XG59XG4iLCIvLyBAdHMtbm9jaGVja1xuLy8gQmVjYXVzZSB0aGlzIGNvZGUgaXMgb3JpZ2luYWxseSBqYXZhc2NyaXB0IGNvZGUuXG4vLyBub2luc3BlY3Rpb24gRnVuY3Rpb25Ub29Mb25nSlMsRnVuY3Rpb25XaXRoTXVsdGlwbGVMb29wc0pTLEVxdWFsaXR5Q29tcGFyaXNvbldpdGhDb2VyY2lvbkpTLFBvaW50bGVzc0Jvb2xlYW5FeHByZXNzaW9uSlMsSlNEZWNsYXJhdGlvbnNBdFNjb3BlU3RhcnRcblxuLy8gVGlueVNlZ21lbnRlciAwLjEgLS0gU3VwZXIgY29tcGFjdCBKYXBhbmVzZSB0b2tlbml6ZXIgaW4gSmF2YXNjcmlwdFxuLy8gKGMpIDIwMDggVGFrdSBLdWRvIDx0YWt1QGNoYXNlbi5vcmc+XG4vLyBUaW55U2VnbWVudGVyIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiBhIG5ldyBCU0QgbGljZW5jZS5cbi8vIEZvciBkZXRhaWxzLCBzZWUgaHR0cDovL2NoYXNlbi5vcmcvfnRha3Uvc29mdHdhcmUvVGlueVNlZ21lbnRlci9MSUNFTkNFLnR4dFxuXG5mdW5jdGlvbiBUaW55U2VnbWVudGVyKCkge1xuICB2YXIgcGF0dGVybnMgPSB7XG4gICAgXCJb5LiA5LqM5LiJ5Zub5LqU5YWt5LiD5YWr5Lmd5Y2B55m+5Y2D5LiH5YSE5YWGXVwiOiBcIk1cIixcbiAgICBcIlvkuIAt6b6g44CF44CG44O144O2XVwiOiBcIkhcIixcbiAgICBcIlvjgYEt44KTXVwiOiBcIklcIixcbiAgICBcIlvjgqEt44O044O8772xLe++ne++nu+9sF1cIjogXCJLXCIsXG4gICAgXCJbYS16QS1a772BLe+9mu+8oS3vvLpdXCI6IFwiQVwiLFxuICAgIFwiWzAtOe+8kC3vvJldXCI6IFwiTlwiLFxuICB9O1xuICB0aGlzLmNoYXJ0eXBlXyA9IFtdO1xuICBmb3IgKHZhciBpIGluIHBhdHRlcm5zKSB7XG4gICAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoKTtcbiAgICByZWdleHAuY29tcGlsZShpKTtcbiAgICB0aGlzLmNoYXJ0eXBlXy5wdXNoKFtyZWdleHAsIHBhdHRlcm5zW2ldXSk7XG4gIH1cblxuICB0aGlzLkJJQVNfXyA9IC0zMzI7XG4gIHRoaXMuQkMxX18gPSB7IEhIOiA2LCBJSTogMjQ2MSwgS0g6IDQwNiwgT0g6IC0xMzc4IH07XG4gIHRoaXMuQkMyX18gPSB7XG4gICAgQUE6IC0zMjY3LFxuICAgIEFJOiAyNzQ0LFxuICAgIEFOOiAtODc4LFxuICAgIEhIOiAtNDA3MCxcbiAgICBITTogLTE3MTEsXG4gICAgSE46IDQwMTIsXG4gICAgSE86IDM3NjEsXG4gICAgSUE6IDEzMjcsXG4gICAgSUg6IC0xMTg0LFxuICAgIElJOiAtMTMzMixcbiAgICBJSzogMTcyMSxcbiAgICBJTzogNTQ5MixcbiAgICBLSTogMzgzMSxcbiAgICBLSzogLTg3NDEsXG4gICAgTUg6IC0zMTMyLFxuICAgIE1LOiAzMzM0LFxuICAgIE9POiAtMjkyMCxcbiAgfTtcbiAgdGhpcy5CQzNfXyA9IHtcbiAgICBISDogOTk2LFxuICAgIEhJOiA2MjYsXG4gICAgSEs6IC03MjEsXG4gICAgSE46IC0xMzA3LFxuICAgIEhPOiAtODM2LFxuICAgIElIOiAtMzAxLFxuICAgIEtLOiAyNzYyLFxuICAgIE1LOiAxMDc5LFxuICAgIE1NOiA0MDM0LFxuICAgIE9BOiAtMTY1MixcbiAgICBPSDogMjY2LFxuICB9O1xuICB0aGlzLkJQMV9fID0geyBCQjogMjk1LCBPQjogMzA0LCBPTzogLTEyNSwgVUI6IDM1MiB9O1xuICB0aGlzLkJQMl9fID0geyBCTzogNjAsIE9POiAtMTc2MiB9O1xuICB0aGlzLkJRMV9fID0ge1xuICAgIEJISDogMTE1MCxcbiAgICBCSE06IDE1MjEsXG4gICAgQklJOiAtMTE1OCxcbiAgICBCSU06IDg4NixcbiAgICBCTUg6IDEyMDgsXG4gICAgQk5IOiA0NDksXG4gICAgQk9IOiAtOTEsXG4gICAgQk9POiAtMjU5NyxcbiAgICBPSEk6IDQ1MSxcbiAgICBPSUg6IC0yOTYsXG4gICAgT0tBOiAxODUxLFxuICAgIE9LSDogLTEwMjAsXG4gICAgT0tLOiA5MDQsXG4gICAgT09POiAyOTY1LFxuICB9O1xuICB0aGlzLkJRMl9fID0ge1xuICAgIEJISDogMTE4LFxuICAgIEJISTogLTExNTksXG4gICAgQkhNOiA0NjYsXG4gICAgQklIOiAtOTE5LFxuICAgIEJLSzogLTE3MjAsXG4gICAgQktPOiA4NjQsXG4gICAgT0hIOiAtMTEzOSxcbiAgICBPSE06IC0xODEsXG4gICAgT0lIOiAxNTMsXG4gICAgVUhJOiAtMTE0NixcbiAgfTtcbiAgdGhpcy5CUTNfXyA9IHtcbiAgICBCSEg6IC03OTIsXG4gICAgQkhJOiAyNjY0LFxuICAgIEJJSTogLTI5OSxcbiAgICBCS0k6IDQxOSxcbiAgICBCTUg6IDkzNyxcbiAgICBCTU06IDgzMzUsXG4gICAgQk5OOiA5OTgsXG4gICAgQk9IOiA3NzUsXG4gICAgT0hIOiAyMTc0LFxuICAgIE9ITTogNDM5LFxuICAgIE9JSTogMjgwLFxuICAgIE9LSDogMTc5OCxcbiAgICBPS0k6IC03OTMsXG4gICAgT0tPOiAtMjI0MixcbiAgICBPTUg6IC0yNDAyLFxuICAgIE9PTzogMTE2OTksXG4gIH07XG4gIHRoaXMuQlE0X18gPSB7XG4gICAgQkhIOiAtMzg5NSxcbiAgICBCSUg6IDM3NjEsXG4gICAgQklJOiAtNDY1NCxcbiAgICBCSUs6IDEzNDgsXG4gICAgQktLOiAtMTgwNixcbiAgICBCTUk6IC0zMzg1LFxuICAgIEJPTzogLTEyMzk2LFxuICAgIE9BSDogOTI2LFxuICAgIE9ISDogMjY2LFxuICAgIE9ISzogLTIwMzYsXG4gICAgT05OOiAtOTczLFxuICB9O1xuICB0aGlzLkJXMV9fID0ge1xuICAgIFwiLOOBqFwiOiA2NjAsXG4gICAgXCIs5ZCMXCI6IDcyNyxcbiAgICBCMeOBgjogMTQwNCxcbiAgICBCMeWQjDogNTQyLFxuICAgIFwi44CB44GoXCI6IDY2MCxcbiAgICBcIuOAgeWQjFwiOiA3MjcsXG4gICAgXCLjgI3jgahcIjogMTY4MixcbiAgICDjgYLjgaM6IDE1MDUsXG4gICAg44GE44GGOiAxNzQzLFxuICAgIOOBhOOBozogLTIwNTUsXG4gICAg44GE44KLOiA2NzIsXG4gICAg44GG44GXOiAtNDgxNyxcbiAgICDjgYbjgpM6IDY2NSxcbiAgICDjgYvjgok6IDM0NzIsXG4gICAg44GM44KJOiA2MDAsXG4gICAg44GT44GGOiAtNzkwLFxuICAgIOOBk+OBqDogMjA4MyxcbiAgICDjgZPjgpM6IC0xMjYyLFxuICAgIOOBleOCiTogLTQxNDMsXG4gICAg44GV44KTOiA0NTczLFxuICAgIOOBl+OBnzogMjY0MSxcbiAgICDjgZfjgaY6IDExMDQsXG4gICAg44GZ44GnOiAtMzM5OSxcbiAgICDjgZ3jgZM6IDE5NzcsXG4gICAg44Gd44KMOiAtODcxLFxuICAgIOOBn+OBoTogMTEyMixcbiAgICDjgZ/jgoE6IDYwMSxcbiAgICDjgaPjgZ86IDM0NjMsXG4gICAg44Gk44GEOiAtODAyLFxuICAgIOOBpuOBhDogODA1LFxuICAgIOOBpuOBjTogMTI0OSxcbiAgICDjgafjgY06IDExMjcsXG4gICAg44Gn44GZOiAzNDQ1LFxuICAgIOOBp+OBrzogODQ0LFxuICAgIOOBqOOBhDogLTQ5MTUsXG4gICAg44Go44G/OiAxOTIyLFxuICAgIOOBqeOBkzogMzg4NyxcbiAgICDjgarjgYQ6IDU3MTMsXG4gICAg44Gq44GjOiAzMDE1LFxuICAgIOOBquOBqTogNzM3OSxcbiAgICDjgarjgpM6IC0xMTEzLFxuICAgIOOBq+OBlzogMjQ2OCxcbiAgICDjgavjga86IDE0OTgsXG4gICAg44Gr44KCOiAxNjcxLFxuICAgIOOBq+WvvjogLTkxMixcbiAgICDjga7kuIA6IC01MDEsXG4gICAg44Gu5LitOiA3NDEsXG4gICAg44G+44GbOiAyNDQ4LFxuICAgIOOBvuOBpzogMTcxMSxcbiAgICDjgb7jgb46IDI2MDAsXG4gICAg44G+44KLOiAtMjE1NSxcbiAgICDjgoTjgoA6IC0xOTQ3LFxuICAgIOOCiOOBozogLTI1NjUsXG4gICAg44KM44GfOiAyMzY5LFxuICAgIOOCjOOBpzogLTkxMyxcbiAgICDjgpLjgZc6IDE4NjAsXG4gICAg44KS6KaLOiA3MzEsXG4gICAg5Lqh44GPOiAtMTg4NixcbiAgICDkuqzpg706IDI1NTgsXG4gICAg5Y+W44KKOiAtMjc4NCxcbiAgICDlpKfjgY06IC0yNjA0LFxuICAgIOWkp+mYqjogMTQ5NyxcbiAgICDlubPmlrk6IC0yMzE0LFxuICAgIOW8leOBjTogLTEzMzYsXG4gICAg5pel5pysOiAtMTk1LFxuICAgIOacrOW9kzogLTI0MjMsXG4gICAg5q+O5pelOiAtMjExMyxcbiAgICDnm67mjIc6IC03MjQsXG4gICAg77yi77yR44GCOiAxNDA0LFxuICAgIO+8ou+8keWQjDogNTQyLFxuICAgIFwi772j44GoXCI6IDE2ODIsXG4gIH07XG4gIHRoaXMuQlcyX18gPSB7XG4gICAgXCIuLlwiOiAtMTE4MjIsXG4gICAgMTE6IC02NjksXG4gICAgXCLigJXigJVcIjogLTU3MzAsXG4gICAgXCLiiJLiiJJcIjogLTEzMTc1LFxuICAgIOOBhOOBhjogLTE2MDksXG4gICAg44GG44GLOiAyNDkwLFxuICAgIOOBi+OBlzogLTEzNTAsXG4gICAg44GL44KCOiAtNjAyLFxuICAgIOOBi+OCiTogLTcxOTQsXG4gICAg44GL44KMOiA0NjEyLFxuICAgIOOBjOOBhDogODUzLFxuICAgIOOBjOOCiTogLTMxOTgsXG4gICAg44GN44GfOiAxOTQxLFxuICAgIOOBj+OBqjogLTE1OTcsXG4gICAg44GT44GoOiAtODM5MixcbiAgICDjgZPjga46IC00MTkzLFxuICAgIOOBleOBmzogNDUzMyxcbiAgICDjgZXjgow6IDEzMTY4LFxuICAgIOOBleOCkzogLTM5NzcsXG4gICAg44GX44GEOiAtMTgxOSxcbiAgICDjgZfjgYs6IC01NDUsXG4gICAg44GX44GfOiA1MDc4LFxuICAgIOOBl+OBpjogOTcyLFxuICAgIOOBl+OBqjogOTM5LFxuICAgIOOBneOBrjogLTM3NDQsXG4gICAg44Gf44GEOiAtMTI1MyxcbiAgICDjgZ/jgZ86IC02NjIsXG4gICAg44Gf44GgOiAtMzg1NyxcbiAgICDjgZ/jgaE6IC03ODYsXG4gICAg44Gf44GoOiAxMjI0LFxuICAgIOOBn+OBrzogLTkzOSxcbiAgICDjgaPjgZ86IDQ1ODksXG4gICAg44Gj44GmOiAxNjQ3LFxuICAgIOOBo+OBqDogLTIwOTQsXG4gICAg44Gm44GEOiA2MTQ0LFxuICAgIOOBpuOBjTogMzY0MCxcbiAgICDjgabjgY86IDI1NTEsXG4gICAg44Gm44GvOiAtMzExMCxcbiAgICDjgabjgoI6IC0zMDY1LFxuICAgIOOBp+OBhDogMjY2NixcbiAgICDjgafjgY06IC0xNTI4LFxuICAgIOOBp+OBlzogLTM4MjgsXG4gICAg44Gn44GZOiAtNDc2MSxcbiAgICDjgafjgoI6IC00MjAzLFxuICAgIOOBqOOBhDogMTg5MCxcbiAgICDjgajjgZM6IC0xNzQ2LFxuICAgIOOBqOOBqDogLTIyNzksXG4gICAg44Go44GuOiA3MjAsXG4gICAg44Go44G/OiA1MTY4LFxuICAgIOOBqOOCgjogLTM5NDEsXG4gICAg44Gq44GEOiAtMjQ4OCxcbiAgICDjgarjgYw6IC0xMzEzLFxuICAgIOOBquOBqTogLTY1MDksXG4gICAg44Gq44GuOiAyNjE0LFxuICAgIOOBquOCkzogMzA5OSxcbiAgICDjgavjgYo6IC0xNjE1LFxuICAgIOOBq+OBlzogMjc0OCxcbiAgICDjgavjgao6IDI0NTQsXG4gICAg44Gr44KIOiAtNzIzNixcbiAgICDjgavlr746IC0xNDk0MyxcbiAgICDjgavlvpM6IC00Njg4LFxuICAgIOOBq+mWojogLTExMzg4LFxuICAgIOOBruOBizogMjA5MyxcbiAgICDjga7jgac6IC03MDU5LFxuICAgIOOBruOBqzogLTYwNDEsXG4gICAg44Gu44GuOiAtNjEyNSxcbiAgICDjga/jgYQ6IDEwNzMsXG4gICAg44Gv44GMOiAtMTAzMyxcbiAgICDjga/jgZo6IC0yNTMyLFxuICAgIOOBsOOCjDogMTgxMyxcbiAgICDjgb7jgZc6IC0xMzE2LFxuICAgIOOBvuOBpzogLTY2MjEsXG4gICAg44G+44KMOiA1NDA5LFxuICAgIOOCgeOBpjogLTMxNTMsXG4gICAg44KC44GEOiAyMjMwLFxuICAgIOOCguOBrjogLTEwNzEzLFxuICAgIOOCieOBizogLTk0NCxcbiAgICDjgonjgZc6IC0xNjExLFxuICAgIOOCieOBqzogLTE4OTcsXG4gICAg44KK44GXOiA2NTEsXG4gICAg44KK44G+OiAxNjIwLFxuICAgIOOCjOOBnzogNDI3MCxcbiAgICDjgozjgaY6IDg0OSxcbiAgICDjgozjgbA6IDQxMTQsXG4gICAg44KN44GGOiA2MDY3LFxuICAgIOOCj+OCjDogNzkwMSxcbiAgICDjgpLpgJo6IC0xMTg3NyxcbiAgICDjgpPjgaA6IDcyOCxcbiAgICDjgpPjgao6IC00MTE1LFxuICAgIOS4gOS6ujogNjAyLFxuICAgIOS4gOaWuTogLTEzNzUsXG4gICAg5LiA5pelOiA5NzAsXG4gICAg5LiA6YOoOiAtMTA1MSxcbiAgICDkuIrjgYw6IC00NDc5LFxuICAgIOS8muekvjogLTExMTYsXG4gICAg5Ye644GmOiAyMTYzLFxuICAgIOWIhuOBrjogLTc3NTgsXG4gICAg5ZCM5YWaOiA5NzAsXG4gICAg5ZCM5pelOiAtOTEzLFxuICAgIOWkp+mYqjogLTI0NzEsXG4gICAg5aeU5ZOhOiAtMTI1MCxcbiAgICDlsJHjgao6IC0xMDUwLFxuICAgIOW5tOW6pjogLTg2NjksXG4gICAg5bm06ZaTOiAtMTYyNixcbiAgICDlupznnIw6IC0yMzYzLFxuICAgIOaJi+aoqTogLTE5ODIsXG4gICAg5paw6IGeOiAtNDA2NixcbiAgICDml6XmlrA6IC03MjIsXG4gICAg5pel5pysOiAtNzA2OCxcbiAgICDml6XnsbM6IDMzNzIsXG4gICAg5puc5pelOiAtNjAxLFxuICAgIOacnemurjogLTIzNTUsXG4gICAg5pys5Lq6OiAtMjY5NyxcbiAgICDmnbHkuqw6IC0xNTQzLFxuICAgIOeEtuOBqDogLTEzODQsXG4gICAg56S+5LyaOiAtMTI3NixcbiAgICDnq4vjgaY6IC05OTAsXG4gICAg56ys44GrOiAtMTYxMixcbiAgICDnsbPlm706IC00MjY4LFxuICAgIFwi77yR77yRXCI6IC02NjksXG4gIH07XG4gIHRoaXMuQlczX18gPSB7XG4gICAg44GC44GfOiAtMjE5NCxcbiAgICDjgYLjgoo6IDcxOSxcbiAgICDjgYLjgos6IDM4NDYsXG4gICAgXCLjgYQuXCI6IC0xMTg1LFxuICAgIFwi44GE44CCXCI6IC0xMTg1LFxuICAgIOOBhOOBhDogNTMwOCxcbiAgICDjgYTjgYg6IDIwNzksXG4gICAg44GE44GPOiAzMDI5LFxuICAgIOOBhOOBnzogMjA1NixcbiAgICDjgYTjgaM6IDE4ODMsXG4gICAg44GE44KLOiA1NjAwLFxuICAgIOOBhOOCjzogMTUyNyxcbiAgICDjgYbjgaE6IDExMTcsXG4gICAg44GG44GoOiA0Nzk4LFxuICAgIOOBiOOBqDogMTQ1NCxcbiAgICBcIuOBiy5cIjogMjg1NyxcbiAgICBcIuOBi+OAglwiOiAyODU3LFxuICAgIOOBi+OBkTogLTc0MyxcbiAgICDjgYvjgaM6IC00MDk4LFxuICAgIOOBi+OBqzogLTY2OSxcbiAgICDjgYvjgok6IDY1MjAsXG4gICAg44GL44KKOiAtMjY3MCxcbiAgICBcIuOBjCxcIjogMTgxNixcbiAgICBcIuOBjOOAgVwiOiAxODE2LFxuICAgIOOBjOOBjTogLTQ4NTUsXG4gICAg44GM44GROiAtMTEyNyxcbiAgICDjgYzjgaM6IC05MTMsXG4gICAg44GM44KJOiAtNDk3NyxcbiAgICDjgYzjgoo6IC0yMDY0LFxuICAgIOOBjeOBnzogMTY0NSxcbiAgICDjgZHjgak6IDEzNzQsXG4gICAg44GT44GoOiA3Mzk3LFxuICAgIOOBk+OBrjogMTU0MixcbiAgICDjgZPjgo06IC0yNzU3LFxuICAgIOOBleOBhDogLTcxNCxcbiAgICDjgZXjgpI6IDk3NixcbiAgICBcIuOBlyxcIjogMTU1NyxcbiAgICBcIuOBl+OAgVwiOiAxNTU3LFxuICAgIOOBl+OBhDogLTM3MTQsXG4gICAg44GX44GfOiAzNTYyLFxuICAgIOOBl+OBpjogMTQ0OSxcbiAgICDjgZfjgao6IDI2MDgsXG4gICAg44GX44G+OiAxMjAwLFxuICAgIFwi44GZLlwiOiAtMTMxMCxcbiAgICBcIuOBmeOAglwiOiAtMTMxMCxcbiAgICDjgZnjgos6IDY1MjEsXG4gICAgXCLjgZosXCI6IDM0MjYsXG4gICAgXCLjgZrjgIFcIjogMzQyNixcbiAgICDjgZrjgas6IDg0MSxcbiAgICDjgZ3jgYY6IDQyOCxcbiAgICBcIuOBny5cIjogODg3NSxcbiAgICBcIuOBn+OAglwiOiA4ODc1LFxuICAgIOOBn+OBhDogLTU5NCxcbiAgICDjgZ/jga46IDgxMixcbiAgICDjgZ/jgoo6IC0xMTgzLFxuICAgIOOBn+OCizogLTg1MyxcbiAgICBcIuOBoC5cIjogNDA5OCxcbiAgICBcIuOBoOOAglwiOiA0MDk4LFxuICAgIOOBoOOBozogMTAwNCxcbiAgICDjgaPjgZ86IC00NzQ4LFxuICAgIOOBo+OBpjogMzAwLFxuICAgIOOBpuOBhDogNjI0MCxcbiAgICDjgabjgYo6IDg1NSxcbiAgICDjgabjgoI6IDMwMixcbiAgICDjgafjgZk6IDE0MzcsXG4gICAg44Gn44GrOiAtMTQ4MixcbiAgICDjgafjga86IDIyOTUsXG4gICAg44Go44GGOiAtMTM4NyxcbiAgICDjgajjgZc6IDIyNjYsXG4gICAg44Go44GuOiA1NDEsXG4gICAg44Go44KCOiAtMzU0MyxcbiAgICDjganjgYY6IDQ2NjQsXG4gICAg44Gq44GEOiAxNzk2LFxuICAgIOOBquOBjzogLTkwMyxcbiAgICDjgarjgak6IDIxMzUsXG4gICAgXCLjgassXCI6IC0xMDIxLFxuICAgIFwi44Gr44CBXCI6IC0xMDIxLFxuICAgIOOBq+OBlzogMTc3MSxcbiAgICDjgavjgao6IDE5MDYsXG4gICAg44Gr44GvOiAyNjQ0LFxuICAgIFwi44GuLFwiOiAtNzI0LFxuICAgIFwi44Gu44CBXCI6IC03MjQsXG4gICAg44Gu5a2QOiAtMTAwMCxcbiAgICBcIuOBryxcIjogMTMzNyxcbiAgICBcIuOBr+OAgVwiOiAxMzM3LFxuICAgIOOBueOBjTogMjE4MSxcbiAgICDjgb7jgZc6IDExMTMsXG4gICAg44G+44GZOiA2OTQzLFxuICAgIOOBvuOBozogLTE1NDksXG4gICAg44G+44GnOiA2MTU0LFxuICAgIOOBvuOCjDogLTc5MyxcbiAgICDjgonjgZc6IDE0NzksXG4gICAg44KJ44KMOiA2ODIwLFxuICAgIOOCi+OCizogMzgxOCxcbiAgICBcIuOCjCxcIjogODU0LFxuICAgIFwi44KM44CBXCI6IDg1NCxcbiAgICDjgozjgZ86IDE4NTAsXG4gICAg44KM44GmOiAxMzc1LFxuICAgIOOCjOOBsDogLTMyNDYsXG4gICAg44KM44KLOiAxMDkxLFxuICAgIOOCj+OCjDogLTYwNSxcbiAgICDjgpPjgaA6IDYwNixcbiAgICDjgpPjgac6IDc5OCxcbiAgICDjgqvmnIg6IDk5MCxcbiAgICDkvJrorbA6IDg2MCxcbiAgICDlhaXjgoo6IDEyMzIsXG4gICAg5aSn5LyaOiAyMjE3LFxuICAgIOWni+OCgTogMTY4MSxcbiAgICDluII6IDk2NSxcbiAgICDmlrDogZ46IC01MDU1LFxuICAgIFwi5pelLFwiOiA5NzQsXG4gICAgXCLml6XjgIFcIjogOTc0LFxuICAgIOekvuS8mjogMjAyNCxcbiAgICDvvbbmnIg6IDk5MCxcbiAgfTtcbiAgdGhpcy5UQzFfXyA9IHtcbiAgICBBQUE6IDEwOTMsXG4gICAgSEhIOiAxMDI5LFxuICAgIEhITTogNTgwLFxuICAgIEhJSTogOTk4LFxuICAgIEhPSDogLTM5MCxcbiAgICBIT006IC0zMzEsXG4gICAgSUhJOiAxMTY5LFxuICAgIElPSDogLTE0MixcbiAgICBJT0k6IC0xMDE1LFxuICAgIElPTTogNDY3LFxuICAgIE1NSDogMTg3LFxuICAgIE9PSTogLTE4MzIsXG4gIH07XG4gIHRoaXMuVEMyX18gPSB7XG4gICAgSEhPOiAyMDg4LFxuICAgIEhJSTogLTEwMjMsXG4gICAgSE1NOiAtMTE1NCxcbiAgICBJSEk6IC0xOTY1LFxuICAgIEtLSDogNzAzLFxuICAgIE9JSTogLTI2NDksXG4gIH07XG4gIHRoaXMuVEMzX18gPSB7XG4gICAgQUFBOiAtMjk0LFxuICAgIEhISDogMzQ2LFxuICAgIEhISTogLTM0MSxcbiAgICBISUk6IC0xMDg4LFxuICAgIEhJSzogNzMxLFxuICAgIEhPSDogLTE0ODYsXG4gICAgSUhIOiAxMjgsXG4gICAgSUhJOiAtMzA0MSxcbiAgICBJSE86IC0xOTM1LFxuICAgIElJSDogLTgyNSxcbiAgICBJSU06IC0xMDM1LFxuICAgIElPSTogLTU0MixcbiAgICBLSEg6IC0xMjE2LFxuICAgIEtLQTogNDkxLFxuICAgIEtLSDogLTEyMTcsXG4gICAgS09LOiAtMTAwOSxcbiAgICBNSEg6IC0yNjk0LFxuICAgIE1ITTogLTQ1NyxcbiAgICBNSE86IDEyMyxcbiAgICBNTUg6IC00NzEsXG4gICAgTk5IOiAtMTY4OSxcbiAgICBOTk86IDY2MixcbiAgICBPSE86IC0zMzkzLFxuICB9O1xuICB0aGlzLlRDNF9fID0ge1xuICAgIEhISDogLTIwMyxcbiAgICBISEk6IDEzNDQsXG4gICAgSEhLOiAzNjUsXG4gICAgSEhNOiAtMTIyLFxuICAgIEhITjogMTgyLFxuICAgIEhITzogNjY5LFxuICAgIEhJSDogODA0LFxuICAgIEhJSTogNjc5LFxuICAgIEhPSDogNDQ2LFxuICAgIElISDogNjk1LFxuICAgIElITzogLTIzMjQsXG4gICAgSUlIOiAzMjEsXG4gICAgSUlJOiAxNDk3LFxuICAgIElJTzogNjU2LFxuICAgIElPTzogNTQsXG4gICAgS0FLOiA0ODQ1LFxuICAgIEtLQTogMzM4NixcbiAgICBLS0s6IDMwNjUsXG4gICAgTUhIOiAtNDA1LFxuICAgIE1ISTogMjAxLFxuICAgIE1NSDogLTI0MSxcbiAgICBNTU06IDY2MSxcbiAgICBNT006IDg0MSxcbiAgfTtcbiAgdGhpcy5UUTFfXyA9IHtcbiAgICBCSEhIOiAtMjI3LFxuICAgIEJISEk6IDMxNixcbiAgICBCSElIOiAtMTMyLFxuICAgIEJJSEg6IDYwLFxuICAgIEJJSUk6IDE1OTUsXG4gICAgQk5ISDogLTc0NCxcbiAgICBCT0hIOiAyMjUsXG4gICAgQk9PTzogLTkwOCxcbiAgICBPQUtLOiA0ODIsXG4gICAgT0hISDogMjgxLFxuICAgIE9ISUg6IDI0OSxcbiAgICBPSUhJOiAyMDAsXG4gICAgT0lJSDogLTY4LFxuICB9O1xuICB0aGlzLlRRMl9fID0geyBCSUhIOiAtMTQwMSwgQklJSTogLTEwMzMsIEJLQUs6IC01NDMsIEJPT086IC01NTkxIH07XG4gIHRoaXMuVFEzX18gPSB7XG4gICAgQkhISDogNDc4LFxuICAgIEJISE06IC0xMDczLFxuICAgIEJISUg6IDIyMixcbiAgICBCSElJOiAtNTA0LFxuICAgIEJJSUg6IC0xMTYsXG4gICAgQklJSTogLTEwNSxcbiAgICBCTUhJOiAtODYzLFxuICAgIEJNSE06IC00NjQsXG4gICAgQk9NSDogNjIwLFxuICAgIE9ISEg6IDM0NixcbiAgICBPSEhJOiAxNzI5LFxuICAgIE9ISUk6IDk5NyxcbiAgICBPSE1IOiA0ODEsXG4gICAgT0lISDogNjIzLFxuICAgIE9JSUg6IDEzNDQsXG4gICAgT0tBSzogMjc5MixcbiAgICBPS0hIOiA1ODcsXG4gICAgT0tLQTogNjc5LFxuICAgIE9PSEg6IDExMCxcbiAgICBPT0lJOiAtNjg1LFxuICB9O1xuICB0aGlzLlRRNF9fID0ge1xuICAgIEJISEg6IC03MjEsXG4gICAgQkhITTogLTM2MDQsXG4gICAgQkhJSTogLTk2NixcbiAgICBCSUlIOiAtNjA3LFxuICAgIEJJSUk6IC0yMTgxLFxuICAgIE9BQUE6IC0yNzYzLFxuICAgIE9BS0s6IDE4MCxcbiAgICBPSEhIOiAtMjk0LFxuICAgIE9ISEk6IDI0NDYsXG4gICAgT0hITzogNDgwLFxuICAgIE9ISUg6IC0xNTczLFxuICAgIE9JSEg6IDE5MzUsXG4gICAgT0lISTogLTQ5MyxcbiAgICBPSUlIOiA2MjYsXG4gICAgT0lJSTogLTQwMDcsXG4gICAgT0tBSzogLTgxNTYsXG4gIH07XG4gIHRoaXMuVFcxX18gPSB7IOOBq+OBpOOBhDogLTQ2ODEsIOadseS6rOmDvTogMjAyNiB9O1xuICB0aGlzLlRXMl9fID0ge1xuICAgIOOBguOCi+eoizogLTIwNDksXG4gICAg44GE44Gj44GfOiAtMTI1NixcbiAgICDjgZPjgo3jgYw6IC0yNDM0LFxuICAgIOOBl+OCh+OBhjogMzg3MyxcbiAgICDjgZ3jga7lvow6IC00NDMwLFxuICAgIOOBoOOBo+OBpjogLTEwNDksXG4gICAg44Gm44GE44GfOiAxODMzLFxuICAgIOOBqOOBl+OBpjogLTQ2NTcsXG4gICAg44Go44KC44GrOiAtNDUxNyxcbiAgICDjgoLjga7jgac6IDE4ODIsXG4gICAg5LiA5rCX44GrOiAtNzkyLFxuICAgIOWIneOCgeOBpjogLTE1MTIsXG4gICAg5ZCM5pmC44GrOiAtODA5NyxcbiAgICDlpKfjgY3jgao6IC0xMjU1LFxuICAgIOWvvuOBl+OBpjogLTI3MjEsXG4gICAg56S+5Lya5YWaOiAtMzIxNixcbiAgfTtcbiAgdGhpcy5UVzNfXyA9IHtcbiAgICDjgYTjgZ/jgaA6IC0xNzM0LFxuICAgIOOBl+OBpuOBhDogMTMxNCxcbiAgICDjgajjgZfjgaY6IC00MzE0LFxuICAgIOOBq+OBpOOBhDogLTU0ODMsXG4gICAg44Gr44Go44GjOiAtNTk4OSxcbiAgICDjgavlvZPjgZ86IC02MjQ3LFxuICAgIFwi44Gu44GnLFwiOiAtNzI3LFxuICAgIFwi44Gu44Gn44CBXCI6IC03MjcsXG4gICAg44Gu44KC44GuOiAtNjAwLFxuICAgIOOCjOOBi+OCiTogLTM3NTIsXG4gICAg5Y2B5LqM5pyIOiAtMjI4NyxcbiAgfTtcbiAgdGhpcy5UVzRfXyA9IHtcbiAgICBcIuOBhOOBhi5cIjogODU3NixcbiAgICBcIuOBhOOBhuOAglwiOiA4NTc2LFxuICAgIOOBi+OCieOBqjogLTIzNDgsXG4gICAg44GX44Gm44GEOiAyOTU4LFxuICAgIFwi44Gf44GMLFwiOiAxNTE2LFxuICAgIFwi44Gf44GM44CBXCI6IDE1MTYsXG4gICAg44Gm44GE44KLOiAxNTM4LFxuICAgIOOBqOOBhOOBhjogMTM0OSxcbiAgICDjgb7jgZfjgZ86IDU1NDMsXG4gICAg44G+44Gb44KTOiAxMDk3LFxuICAgIOOCiOOBhuOBqDogLTQyNTgsXG4gICAg44KI44KL44GoOiA1ODY1LFxuICB9O1xuICB0aGlzLlVDMV9fID0geyBBOiA0ODQsIEs6IDkzLCBNOiA2NDUsIE86IC01MDUgfTtcbiAgdGhpcy5VQzJfXyA9IHsgQTogODE5LCBIOiAxMDU5LCBJOiA0MDksIE06IDM5ODcsIE46IDU3NzUsIE86IDY0NiB9O1xuICB0aGlzLlVDM19fID0geyBBOiAtMTM3MCwgSTogMjMxMSB9O1xuICB0aGlzLlVDNF9fID0ge1xuICAgIEE6IC0yNjQzLFxuICAgIEg6IDE4MDksXG4gICAgSTogLTEwMzIsXG4gICAgSzogLTM0NTAsXG4gICAgTTogMzU2NSxcbiAgICBOOiAzODc2LFxuICAgIE86IDY2NDYsXG4gIH07XG4gIHRoaXMuVUM1X18gPSB7IEg6IDMxMywgSTogLTEyMzgsIEs6IC03OTksIE06IDUzOSwgTzogLTgzMSB9O1xuICB0aGlzLlVDNl9fID0geyBIOiAtNTA2LCBJOiAtMjUzLCBLOiA4NywgTTogMjQ3LCBPOiAtMzg3IH07XG4gIHRoaXMuVVAxX18gPSB7IE86IC0yMTQgfTtcbiAgdGhpcy5VUDJfXyA9IHsgQjogNjksIE86IDkzNSB9O1xuICB0aGlzLlVQM19fID0geyBCOiAxODkgfTtcbiAgdGhpcy5VUTFfXyA9IHtcbiAgICBCSDogMjEsXG4gICAgQkk6IC0xMixcbiAgICBCSzogLTk5LFxuICAgIEJOOiAxNDIsXG4gICAgQk86IC01NixcbiAgICBPSDogLTk1LFxuICAgIE9JOiA0NzcsXG4gICAgT0s6IDQxMCxcbiAgICBPTzogLTI0MjIsXG4gIH07XG4gIHRoaXMuVVEyX18gPSB7IEJIOiAyMTYsIEJJOiAxMTMsIE9LOiAxNzU5IH07XG4gIHRoaXMuVVEzX18gPSB7XG4gICAgQkE6IC00NzksXG4gICAgQkg6IDQyLFxuICAgIEJJOiAxOTEzLFxuICAgIEJLOiAtNzE5OCxcbiAgICBCTTogMzE2MCxcbiAgICBCTjogNjQyNyxcbiAgICBCTzogMTQ3NjEsXG4gICAgT0k6IC04MjcsXG4gICAgT046IC0zMjEyLFxuICB9O1xuICB0aGlzLlVXMV9fID0ge1xuICAgIFwiLFwiOiAxNTYsXG4gICAgXCLjgIFcIjogMTU2LFxuICAgIFwi44CMXCI6IC00NjMsXG4gICAg44GCOiAtOTQxLFxuICAgIOOBhjogLTEyNyxcbiAgICDjgYw6IC01NTMsXG4gICAg44GNOiAxMjEsXG4gICAg44GTOiA1MDUsXG4gICAg44GnOiAtMjAxLFxuICAgIOOBqDogLTU0NyxcbiAgICDjgak6IC0xMjMsXG4gICAg44GrOiAtNzg5LFxuICAgIOOBrjogLTE4NSxcbiAgICDjga86IC04NDcsXG4gICAg44KCOiAtNDY2LFxuICAgIOOChDogLTQ3MCxcbiAgICDjgog6IDE4MixcbiAgICDjgok6IC0yOTIsXG4gICAg44KKOiAyMDgsXG4gICAg44KMOiAxNjksXG4gICAg44KSOiAtNDQ2LFxuICAgIOOCkzogLTEzNyxcbiAgICBcIuODu1wiOiAtMTM1LFxuICAgIOS4uzogLTQwMixcbiAgICDkuqw6IC0yNjgsXG4gICAg5Yy6OiAtOTEyLFxuICAgIOWNiDogODcxLFxuICAgIOWbvTogLTQ2MCxcbiAgICDlpKc6IDU2MSxcbiAgICDlp5Q6IDcyOSxcbiAgICDluII6IC00MTEsXG4gICAg5pelOiAtMTQxLFxuICAgIOeQhjogMzYxLFxuICAgIOeUnzogLTQwOCxcbiAgICDnnIw6IC0zODYsXG4gICAg6YO9OiAtNzE4LFxuICAgIFwi772iXCI6IC00NjMsXG4gICAgXCLvvaVcIjogLTEzNSxcbiAgfTtcbiAgdGhpcy5VVzJfXyA9IHtcbiAgICBcIixcIjogLTgyOSxcbiAgICBcIuOAgVwiOiAtODI5LFxuICAgIOOAhzogODkyLFxuICAgIFwi44CMXCI6IC02NDUsXG4gICAgXCLjgI1cIjogMzE0NSxcbiAgICDjgYI6IC01MzgsXG4gICAg44GEOiA1MDUsXG4gICAg44GGOiAxMzQsXG4gICAg44GKOiAtNTAyLFxuICAgIOOBizogMTQ1NCxcbiAgICDjgYw6IC04NTYsXG4gICAg44GPOiAtNDEyLFxuICAgIOOBkzogMTE0MSxcbiAgICDjgZU6IDg3OCxcbiAgICDjgZY6IDU0MCxcbiAgICDjgZc6IDE1MjksXG4gICAg44GZOiAtNjc1LFxuICAgIOOBmzogMzAwLFxuICAgIOOBnTogLTEwMTEsXG4gICAg44GfOiAxODgsXG4gICAg44GgOiAxODM3LFxuICAgIOOBpDogLTk0OSxcbiAgICDjgaY6IC0yOTEsXG4gICAg44GnOiAtMjY4LFxuICAgIOOBqDogLTk4MSxcbiAgICDjgak6IDEyNzMsXG4gICAg44GqOiAxMDYzLFxuICAgIOOBqzogLTE3NjQsXG4gICAg44GuOiAxMzAsXG4gICAg44GvOiAtNDA5LFxuICAgIOOBsjogLTEyNzMsXG4gICAg44G5OiAxMjYxLFxuICAgIOOBvjogNjAwLFxuICAgIOOCgjogLTEyNjMsXG4gICAg44KEOiAtNDAyLFxuICAgIOOCiDogMTYzOSxcbiAgICDjgoo6IC01NzksXG4gICAg44KLOiAtNjk0LFxuICAgIOOCjDogNTcxLFxuICAgIOOCkjogLTI1MTYsXG4gICAg44KTOiAyMDk1LFxuICAgIOOCojogLTU4NyxcbiAgICDjgqs6IDMwNixcbiAgICDjgq06IDU2OCxcbiAgICDjg4M6IDgzMSxcbiAgICDkuIk6IC03NTgsXG4gICAg5LiNOiAtMjE1MCxcbiAgICDkuJY6IC0zMDIsXG4gICAg5LitOiAtOTY4LFxuICAgIOS4uzogLTg2MSxcbiAgICDkuos6IDQ5MixcbiAgICDkuro6IC0xMjMsXG4gICAg5LyaOiA5NzgsXG4gICAg5L+dOiAzNjIsXG4gICAg5YWlOiA1NDgsXG4gICAg5YidOiAtMzAyNSxcbiAgICDlia86IC0xNTY2LFxuICAgIOWMlzogLTM0MTQsXG4gICAg5Yy6OiAtNDIyLFxuICAgIOWkpzogLTE3NjksXG4gICAg5aSpOiAtODY1LFxuICAgIOWkqjogLTQ4MyxcbiAgICDlrZA6IC0xNTE5LFxuICAgIOWtpjogNzYwLFxuICAgIOWunzogMTAyMyxcbiAgICDlsI86IC0yMDA5LFxuICAgIOW4gjogLTgxMyxcbiAgICDlubQ6IC0xMDYwLFxuICAgIOW8tzogMTA2NyxcbiAgICDmiYs6IC0xNTE5LFxuICAgIOaPujogLTEwMzMsXG4gICAg5pS/OiAxNTIyLFxuICAgIOaWhzogLTEzNTUsXG4gICAg5pawOiAtMTY4MixcbiAgICDml6U6IC0xODE1LFxuICAgIOaYjjogLTE0NjIsXG4gICAg5pyAOiAtNjMwLFxuICAgIOacnTogLTE4NDMsXG4gICAg5pysOiAtMTY1MCxcbiAgICDmnbE6IC05MzEsXG4gICAg5p6cOiAtNjY1LFxuICAgIOasoTogLTIzNzgsXG4gICAg5rCROiAtMTgwLFxuICAgIOawlzogLTE3NDAsXG4gICAg55CGOiA3NTIsXG4gICAg55m6OiA1MjksXG4gICAg55uuOiAtMTU4NCxcbiAgICDnm7g6IC0yNDIsXG4gICAg55yMOiAtMTE2NSxcbiAgICDnq4s6IC03NjMsXG4gICAg56ysOiA4MTAsXG4gICAg57GzOiA1MDksXG4gICAg6IeqOiAtMTM1MyxcbiAgICDooYw6IDgzOCxcbiAgICDopb86IC03NDQsXG4gICAg6KaLOiAtMzg3NCxcbiAgICDoqr86IDEwMTAsXG4gICAg6K2wOiAxMTk4LFxuICAgIOi+vDogMzA0MSxcbiAgICDplos6IDE3NTgsXG4gICAg6ZaTOiAtMTI1NyxcbiAgICBcIu+9olwiOiAtNjQ1LFxuICAgIFwi772jXCI6IDMxNDUsXG4gICAg772vOiA4MzEsXG4gICAg772xOiAtNTg3LFxuICAgIO+9tjogMzA2LFxuICAgIO+9tzogNTY4LFxuICB9O1xuICB0aGlzLlVXM19fID0ge1xuICAgIFwiLFwiOiA0ODg5LFxuICAgIDE6IC04MDAsXG4gICAgXCLiiJJcIjogLTE3MjMsXG4gICAgXCLjgIFcIjogNDg4OSxcbiAgICDjgIU6IC0yMzExLFxuICAgIOOAhzogNTgyNyxcbiAgICBcIuOAjVwiOiAyNjcwLFxuICAgIFwi44CTXCI6IC0zNTczLFxuICAgIOOBgjogLTI2OTYsXG4gICAg44GEOiAxMDA2LFxuICAgIOOBhjogMjM0MixcbiAgICDjgYg6IDE5ODMsXG4gICAg44GKOiAtNDg2NCxcbiAgICDjgYs6IC0xMTYzLFxuICAgIOOBjDogMzI3MSxcbiAgICDjgY86IDEwMDQsXG4gICAg44GROiAzODgsXG4gICAg44GSOiA0MDEsXG4gICAg44GTOiAtMzU1MixcbiAgICDjgZQ6IC0zMTE2LFxuICAgIOOBlTogLTEwNTgsXG4gICAg44GXOiAtMzk1LFxuICAgIOOBmTogNTg0LFxuICAgIOOBmzogMzY4NSxcbiAgICDjgZ06IC01MjI4LFxuICAgIOOBnzogODQyLFxuICAgIOOBoTogLTUyMSxcbiAgICDjgaM6IC0xNDQ0LFxuICAgIOOBpDogLTEwODEsXG4gICAg44GmOiA2MTY3LFxuICAgIOOBpzogMjMxOCxcbiAgICDjgag6IDE2OTEsXG4gICAg44GpOiAtODk5LFxuICAgIOOBqjogLTI3ODgsXG4gICAg44GrOiAyNzQ1LFxuICAgIOOBrjogNDA1NixcbiAgICDjga86IDQ1NTUsXG4gICAg44GyOiAtMjE3MSxcbiAgICDjgbU6IC0xNzk4LFxuICAgIOOBuDogMTE5OSxcbiAgICDjgbs6IC01NTE2LFxuICAgIOOBvjogLTQzODQsXG4gICAg44G/OiAtMTIwLFxuICAgIOOCgTogMTIwNSxcbiAgICDjgoI6IDIzMjMsXG4gICAg44KEOiAtNzg4LFxuICAgIOOCiDogLTIwMixcbiAgICDjgok6IDcyNyxcbiAgICDjgoo6IDY0OSxcbiAgICDjgos6IDU5MDUsXG4gICAg44KMOiAyNzczLFxuICAgIOOCjzogLTEyMDcsXG4gICAg44KSOiA2NjIwLFxuICAgIOOCkzogLTUxOCxcbiAgICDjgqI6IDU1MSxcbiAgICDjgrA6IDEzMTksXG4gICAg44K5OiA4NzQsXG4gICAg44ODOiAtMTM1MCxcbiAgICDjg4g6IDUyMSxcbiAgICDjg6A6IDExMDksXG4gICAg44OrOiAxNTkxLFxuICAgIOODrTogMjIwMSxcbiAgICDjg7M6IDI3OCxcbiAgICBcIuODu1wiOiAtMzc5NCxcbiAgICDkuIA6IC0xNjE5LFxuICAgIOS4izogLTE3NTksXG4gICAg5LiWOiAtMjA4NyxcbiAgICDkuKE6IDM4MTUsXG4gICAg5LitOiA2NTMsXG4gICAg5Li7OiAtNzU4LFxuICAgIOS6iDogLTExOTMsXG4gICAg5LqMOiA5NzQsXG4gICAg5Lq6OiAyNzQyLFxuICAgIOS7ijogNzkyLFxuICAgIOS7ljogMTg4OSxcbiAgICDku6U6IC0xMzY4LFxuICAgIOS9jjogODExLFxuICAgIOS9lTogNDI2NSxcbiAgICDkvZw6IC0zNjEsXG4gICAg5L+dOiAtMjQzOSxcbiAgICDlhYM6IDQ4NTgsXG4gICAg5YWaOiAzNTkzLFxuICAgIOWFqDogMTU3NCxcbiAgICDlhaw6IC0zMDMwLFxuICAgIOWFrTogNzU1LFxuICAgIOWFsTogLTE4ODAsXG4gICAg5YaGOiA1ODA3LFxuICAgIOWGjTogMzA5NSxcbiAgICDliIY6IDQ1NyxcbiAgICDliJ06IDI0NzUsXG4gICAg5YilOiAxMTI5LFxuICAgIOWJjTogMjI4NixcbiAgICDlia86IDQ0MzcsXG4gICAg5YqbOiAzNjUsXG4gICAg5YuVOiAtOTQ5LFxuICAgIOWLmTogLTE4NzIsXG4gICAg5YyWOiAxMzI3LFxuICAgIOWMlzogLTEwMzgsXG4gICAg5Yy6OiA0NjQ2LFxuICAgIOWNgzogLTIzMDksXG4gICAg5Y2IOiAtNzgzLFxuICAgIOWNlDogLTEwMDYsXG4gICAg5Y+jOiA0ODMsXG4gICAg5Y+zOiAxMjMzLFxuICAgIOWQhDogMzU4OCxcbiAgICDlkIg6IC0yNDEsXG4gICAg5ZCMOiAzOTA2LFxuICAgIOWSjDogLTgzNyxcbiAgICDlk6E6IDQ1MTMsXG4gICAg5Zu9OiA2NDIsXG4gICAg5Z6LOiAxMzg5LFxuICAgIOWgtDogMTIxOSxcbiAgICDlpJY6IC0yNDEsXG4gICAg5aa7OiAyMDE2LFxuICAgIOWtpjogLTEzNTYsXG4gICAg5a6JOiAtNDIzLFxuICAgIOWunzogLTEwMDgsXG4gICAg5a62OiAxMDc4LFxuICAgIOWwjzogLTUxMyxcbiAgICDlsJE6IC0zMTAyLFxuICAgIOW3njogMTE1NSxcbiAgICDluII6IDMxOTcsXG4gICAg5bmzOiAtMTgwNCxcbiAgICDlubQ6IDI0MTYsXG4gICAg5bqDOiAtMTAzMCxcbiAgICDlupw6IDE2MDUsXG4gICAg5bqmOiAxNDUyLFxuICAgIOW7ujogLTIzNTIsXG4gICAg5b2TOiAtMzg4NSxcbiAgICDlvpc6IDE5MDUsXG4gICAg5oCdOiAtMTI5MSxcbiAgICDmgKc6IDE4MjIsXG4gICAg5oi4OiAtNDg4LFxuICAgIOaMhzogLTM5NzMsXG4gICAg5pS/OiAtMjAxMyxcbiAgICDmlZk6IC0xNDc5LFxuICAgIOaVsDogMzIyMixcbiAgICDmloc6IC0xNDg5LFxuICAgIOaWsDogMTc2NCxcbiAgICDml6U6IDIwOTksXG4gICAg5penOiA1NzkyLFxuICAgIOaYqDogLTY2MSxcbiAgICDmmYI6IC0xMjQ4LFxuICAgIOabnDogLTk1MSxcbiAgICDmnIA6IC05MzcsXG4gICAg5pyIOiA0MTI1LFxuICAgIOacnzogMzYwLFxuICAgIOadjjogMzA5NCxcbiAgICDmnZE6IDM2NCxcbiAgICDmnbE6IC04MDUsXG4gICAg5qC4OiA1MTU2LFxuICAgIOajrjogMjQzOCxcbiAgICDmpa06IDQ4NCxcbiAgICDmsI86IDI2MTMsXG4gICAg5rCROiAtMTY5NCxcbiAgICDmsbo6IC0xMDczLFxuICAgIOazlTogMTg2OCxcbiAgICDmtbc6IC00OTUsXG4gICAg54ShOiA5NzksXG4gICAg54mpOiA0NjEsXG4gICAg54m5OiAtMzg1MCxcbiAgICDnlJ86IC0yNzMsXG4gICAg55SoOiA5MTQsXG4gICAg55S6OiAxMjE1LFxuICAgIOeahDogNzMxMyxcbiAgICDnm7Q6IC0xODM1LFxuICAgIOecgTogNzkyLFxuICAgIOecjDogNjI5MyxcbiAgICDnn6U6IC0xNTI4LFxuICAgIOengTogNDIzMSxcbiAgICDnqI46IDQwMSxcbiAgICDnq4s6IC05NjAsXG4gICAg56ysOiAxMjAxLFxuICAgIOexszogNzc2NyxcbiAgICDns7s6IDMwNjYsXG4gICAg57SEOiAzNjYzLFxuICAgIOe0mjogMTM4NCxcbiAgICDntbE6IC00MjI5LFxuICAgIOe3jzogMTE2MyxcbiAgICDnt5o6IDEyNTUsXG4gICAg6ICFOiA2NDU3LFxuICAgIOiDvTogNzI1LFxuICAgIOiHqjogLTI4NjksXG4gICAg6IuxOiA3ODUsXG4gICAg6KaLOiAxMDQ0LFxuICAgIOiqvzogLTU2MixcbiAgICDosqE6IC03MzMsXG4gICAg6LK7OiAxNzc3LFxuICAgIOi7ijogMTgzNSxcbiAgICDou406IDEzNzUsXG4gICAg6L68OiAtMTUwNCxcbiAgICDpgJo6IC0xMTM2LFxuICAgIOmBuDogLTY4MSxcbiAgICDpg446IDEwMjYsXG4gICAg6YOhOiA0NDA0LFxuICAgIOmDqDogMTIwMCxcbiAgICDph5E6IDIxNjMsXG4gICAg6ZW3OiA0MjEsXG4gICAg6ZaLOiAtMTQzMixcbiAgICDplpM6IDEzMDIsXG4gICAg6ZaiOiAtMTI4MixcbiAgICDpm6g6IDIwMDksXG4gICAg6Zu7OiAtMTA0NSxcbiAgICDpnZ46IDIwNjYsXG4gICAg6aeFOiAxNjIwLFxuICAgIFwi77yRXCI6IC04MDAsXG4gICAgXCLvvaNcIjogMjY3MCxcbiAgICBcIu+9pVwiOiAtMzc5NCxcbiAgICDvva86IC0xMzUwLFxuICAgIO+9sTogNTUxLFxuICAgIO+9uO++njogMTMxOSxcbiAgICDvvb06IDg3NCxcbiAgICDvvoQ6IDUyMSxcbiAgICDvvpE6IDExMDksXG4gICAg776ZOiAxNTkxLFxuICAgIO++mzogMjIwMSxcbiAgICDvvp06IDI3OCxcbiAgfTtcbiAgdGhpcy5VVzRfXyA9IHtcbiAgICBcIixcIjogMzkzMCxcbiAgICBcIi5cIjogMzUwOCxcbiAgICBcIuKAlVwiOiAtNDg0MSxcbiAgICBcIuOAgVwiOiAzOTMwLFxuICAgIFwi44CCXCI6IDM1MDgsXG4gICAg44CHOiA0OTk5LFxuICAgIFwi44CMXCI6IDE4OTUsXG4gICAgXCLjgI1cIjogMzc5OCxcbiAgICBcIuOAk1wiOiAtNTE1NixcbiAgICDjgYI6IDQ3NTIsXG4gICAg44GEOiAtMzQzNSxcbiAgICDjgYY6IC02NDAsXG4gICAg44GIOiAtMjUxNCxcbiAgICDjgYo6IDI0MDUsXG4gICAg44GLOiA1MzAsXG4gICAg44GMOiA2MDA2LFxuICAgIOOBjTogLTQ0ODIsXG4gICAg44GOOiAtMzgyMSxcbiAgICDjgY86IC0zNzg4LFxuICAgIOOBkTogLTQzNzYsXG4gICAg44GSOiAtNDczNCxcbiAgICDjgZM6IDIyNTUsXG4gICAg44GUOiAxOTc5LFxuICAgIOOBlTogMjg2NCxcbiAgICDjgZc6IC04NDMsXG4gICAg44GYOiAtMjUwNixcbiAgICDjgZk6IC03MzEsXG4gICAg44GaOiAxMjUxLFxuICAgIOOBmzogMTgxLFxuICAgIOOBnTogNDA5MSxcbiAgICDjgZ86IDUwMzQsXG4gICAg44GgOiA1NDA4LFxuICAgIOOBoTogLTM2NTQsXG4gICAg44GjOiAtNTg4MixcbiAgICDjgaQ6IC0xNjU5LFxuICAgIOOBpjogMzk5NCxcbiAgICDjgac6IDc0MTAsXG4gICAg44GoOiA0NTQ3LFxuICAgIOOBqjogNTQzMyxcbiAgICDjgas6IDY0OTksXG4gICAg44GsOiAxODUzLFxuICAgIOOBrTogMTQxMyxcbiAgICDjga46IDczOTYsXG4gICAg44GvOiA4NTc4LFxuICAgIOOBsDogMTk0MCxcbiAgICDjgbI6IDQyNDksXG4gICAg44GzOiAtNDEzNCxcbiAgICDjgbU6IDEzNDUsXG4gICAg44G4OiA2NjY1LFxuICAgIOOBuTogLTc0NCxcbiAgICDjgbs6IDE0NjQsXG4gICAg44G+OiAxMDUxLFxuICAgIOOBvzogLTIwODIsXG4gICAg44KAOiAtODgyLFxuICAgIOOCgTogLTUwNDYsXG4gICAg44KCOiA0MTY5LFxuICAgIOOCgzogLTI2NjYsXG4gICAg44KEOiAyNzk1LFxuICAgIOOChzogLTE1NDQsXG4gICAg44KIOiAzMzUxLFxuICAgIOOCiTogLTI5MjIsXG4gICAg44KKOiAtOTcyNixcbiAgICDjgos6IC0xNDg5NixcbiAgICDjgow6IC0yNjEzLFxuICAgIOOCjTogLTQ1NzAsXG4gICAg44KPOiAtMTc4MyxcbiAgICDjgpI6IDEzMTUwLFxuICAgIOOCkzogLTIzNTIsXG4gICAg44KrOiAyMTQ1LFxuICAgIOOCszogMTc4OSxcbiAgICDjgrs6IDEyODcsXG4gICAg44ODOiAtNzI0LFxuICAgIOODiDogLTQwMyxcbiAgICDjg6E6IC0xNjM1LFxuICAgIOODqTogLTg4MSxcbiAgICDjg6o6IC01NDEsXG4gICAg44OrOiAtODU2LFxuICAgIOODszogLTM2MzcsXG4gICAgXCLjg7tcIjogLTQzNzEsXG4gICAg44O8OiAtMTE4NzAsXG4gICAg5LiAOiAtMjA2OSxcbiAgICDkuK06IDIyMTAsXG4gICAg5LqIOiA3ODIsXG4gICAg5LqLOiAtMTkwLFxuICAgIOS6lTogLTE3NjgsXG4gICAg5Lq6OiAxMDM2LFxuICAgIOS7pTogNTQ0LFxuICAgIOS8mjogOTUwLFxuICAgIOS9kzogLTEyODYsXG4gICAg5L2cOiA1MzAsXG4gICAg5YG0OiA0MjkyLFxuICAgIOWFiDogNjAxLFxuICAgIOWFmjogLTIwMDYsXG4gICAg5YWxOiAtMTIxMixcbiAgICDlhoU6IDU4NCxcbiAgICDlhoY6IDc4OCxcbiAgICDliJ06IDEzNDcsXG4gICAg5YmNOiAxNjIzLFxuICAgIOWJrzogMzg3OSxcbiAgICDlips6IC0zMDIsXG4gICAg5YuVOiAtNzQwLFxuICAgIOWLmTogLTI3MTUsXG4gICAg5YyWOiA3NzYsXG4gICAg5Yy6OiA0NTE3LFxuICAgIOWNlDogMTAxMyxcbiAgICDlj4I6IDE1NTUsXG4gICAg5ZCIOiAtMTgzNCxcbiAgICDlkow6IC02ODEsXG4gICAg5ZOhOiAtOTEwLFxuICAgIOWZqDogLTg1MSxcbiAgICDlm546IDE1MDAsXG4gICAg5Zu9OiAtNjE5LFxuICAgIOWckjogLTEyMDAsXG4gICAg5ZywOiA4NjYsXG4gICAg5aC0OiAtMTQxMCxcbiAgICDloYE6IC0yMDk0LFxuICAgIOWjqzogLTE0MTMsXG4gICAg5aSaOiAxMDY3LFxuICAgIOWkpzogNTcxLFxuICAgIOWtkDogLTQ4MDIsXG4gICAg5a2mOiAtMTM5NyxcbiAgICDlrpo6IC0xMDU3LFxuICAgIOWvujogLTgwOSxcbiAgICDlsI86IDE5MTAsXG4gICAg5bGLOiAtMTMyOCxcbiAgICDlsbE6IC0xNTAwLFxuICAgIOWztjogLTIwNTYsXG4gICAg5bedOiAtMjY2NyxcbiAgICDluII6IDI3NzEsXG4gICAg5bm0OiAzNzQsXG4gICAg5bqBOiAtNDU1NixcbiAgICDlvow6IDQ1NixcbiAgICDmgKc6IDU1MyxcbiAgICDmhJ86IDkxNixcbiAgICDmiYA6IC0xNTY2LFxuICAgIOaUrzogODU2LFxuICAgIOaUuTogNzg3LFxuICAgIOaUvzogMjE4MixcbiAgICDmlZk6IDcwNCxcbiAgICDmloc6IDUyMixcbiAgICDmlrk6IC04NTYsXG4gICAg5pelOiAxNzk4LFxuICAgIOaZgjogMTgyOSxcbiAgICDmnIA6IDg0NSxcbiAgICDmnIg6IC05MDY2LFxuICAgIOacqDogLTQ4NSxcbiAgICDmnaU6IC00NDIsXG4gICAg5qChOiAtMzYwLFxuICAgIOalrTogLTEwNDMsXG4gICAg5rCPOiA1Mzg4LFxuICAgIOawkTogLTI3MTYsXG4gICAg5rCXOiAtOTEwLFxuICAgIOayojogLTkzOSxcbiAgICDmuIg6IC01NDMsXG4gICAg54mpOiAtNzM1LFxuICAgIOeOhzogNjcyLFxuICAgIOeQgzogLTEyNjcsXG4gICAg55SfOiAtMTI4NixcbiAgICDnlKM6IC0xMTAxLFxuICAgIOeUsDogLTI5MDAsXG4gICAg55S6OiAxODI2LFxuICAgIOeahDogMjU4NixcbiAgICDnm646IDkyMixcbiAgICDnnIE6IC0zNDg1LFxuICAgIOecjDogMjk5NyxcbiAgICDnqbo6IC04NjcsXG4gICAg56uLOiAtMjExMixcbiAgICDnrKw6IDc4OCxcbiAgICDnsbM6IDI5MzcsXG4gICAg57O7OiA3ODYsXG4gICAg57SEOiAyMTcxLFxuICAgIOe1jDogMTE0NixcbiAgICDntbE6IC0xMTY5LFxuICAgIOe3jzogOTQwLFxuICAgIOe3mjogLTk5NCxcbiAgICDnvbI6IDc0OSxcbiAgICDogIU6IDIxNDUsXG4gICAg6IO9OiAtNzMwLFxuICAgIOiIrDogLTg1MixcbiAgICDooYw6IC03OTIsXG4gICAg6KaPOiA3OTIsXG4gICAg6K2mOiAtMTE4NCxcbiAgICDorbA6IC0yNDQsXG4gICAg6LC3OiAtMTAwMCxcbiAgICDos546IDczMCxcbiAgICDou4o6IC0xNDgxLFxuICAgIOi7jTogMTE1OCxcbiAgICDovKo6IC0xNDMzLFxuICAgIOi+vDogLTMzNzAsXG4gICAg6L+ROiA5MjksXG4gICAg6YGTOiAtMTI5MSxcbiAgICDpgbg6IDI1OTYsXG4gICAg6YOOOiAtNDg2NixcbiAgICDpg706IDExOTIsXG4gICAg6YeOOiAtMTEwMCxcbiAgICDpioA6IC0yMjEzLFxuICAgIOmVtzogMzU3LFxuICAgIOmWkzogLTIzNDQsXG4gICAg6ZmiOiAtMjI5NyxcbiAgICDpmps6IC0yNjA0LFxuICAgIOmbuzogLTg3OCxcbiAgICDpoJg6IC0xNjU5LFxuICAgIOmhjDogLTc5MixcbiAgICDppKg6IC0xOTg0LFxuICAgIOmmljogMTc0OSxcbiAgICDpq5g6IDIxMjAsXG4gICAgXCLvvaJcIjogMTg5NSxcbiAgICBcIu+9o1wiOiAzNzk4LFxuICAgIFwi772lXCI6IC00MzcxLFxuICAgIO+9rzogLTcyNCxcbiAgICDvvbA6IC0xMTg3MCxcbiAgICDvvbY6IDIxNDUsXG4gICAg7726OiAxNzg5LFxuICAgIO+9vjogMTI4NyxcbiAgICDvvoQ6IC00MDMsXG4gICAg776SOiAtMTYzNSxcbiAgICDvvpc6IC04ODEsXG4gICAg776YOiAtNTQxLFxuICAgIO++mTogLTg1NixcbiAgICDvvp06IC0zNjM3LFxuICB9O1xuICB0aGlzLlVXNV9fID0ge1xuICAgIFwiLFwiOiA0NjUsXG4gICAgXCIuXCI6IC0yOTksXG4gICAgMTogLTUxNCxcbiAgICBFMjogLTMyNzY4LFxuICAgIFwiXVwiOiAtMjc2MixcbiAgICBcIuOAgVwiOiA0NjUsXG4gICAgXCLjgIJcIjogLTI5OSxcbiAgICBcIuOAjFwiOiAzNjMsXG4gICAg44GCOiAxNjU1LFxuICAgIOOBhDogMzMxLFxuICAgIOOBhjogLTUwMyxcbiAgICDjgYg6IDExOTksXG4gICAg44GKOiA1MjcsXG4gICAg44GLOiA2NDcsXG4gICAg44GMOiAtNDIxLFxuICAgIOOBjTogMTYyNCxcbiAgICDjgY46IDE5NzEsXG4gICAg44GPOiAzMTIsXG4gICAg44GSOiAtOTgzLFxuICAgIOOBlTogLTE1MzcsXG4gICAg44GXOiAtMTM3MSxcbiAgICDjgZk6IC04NTIsXG4gICAg44GgOiAtMTE4NixcbiAgICDjgaE6IDEwOTMsXG4gICAg44GjOiA1MixcbiAgICDjgaQ6IDkyMSxcbiAgICDjgaY6IC0xOCxcbiAgICDjgac6IC04NTAsXG4gICAg44GoOiAtMTI3LFxuICAgIOOBqTogMTY4MixcbiAgICDjgao6IC03ODcsXG4gICAg44GrOiAtMTIyNCxcbiAgICDjga46IC02MzUsXG4gICAg44GvOiAtNTc4LFxuICAgIOOBuTogMTAwMSxcbiAgICDjgb86IDUwMixcbiAgICDjgoE6IDg2NSxcbiAgICDjgoM6IDMzNTAsXG4gICAg44KHOiA4NTQsXG4gICAg44KKOiAtMjA4LFxuICAgIOOCizogNDI5LFxuICAgIOOCjDogNTA0LFxuICAgIOOCjzogNDE5LFxuICAgIOOCkjogLTEyNjQsXG4gICAg44KTOiAzMjcsXG4gICAg44KkOiAyNDEsXG4gICAg44OrOiA0NTEsXG4gICAg44OzOiAtMzQzLFxuICAgIOS4rTogLTg3MSxcbiAgICDkuqw6IDcyMixcbiAgICDkvJo6IC0xMTUzLFxuICAgIOWFmjogLTY1NCxcbiAgICDli5k6IDM1MTksXG4gICAg5Yy6OiAtOTAxLFxuICAgIOWRijogODQ4LFxuICAgIOWToTogMjEwNCxcbiAgICDlpKc6IC0xMjk2LFxuICAgIOWtpjogLTU0OCxcbiAgICDlrpo6IDE3ODUsXG4gICAg5bWQOiAtMTMwNCxcbiAgICDluII6IC0yOTkxLFxuICAgIOW4rTogOTIxLFxuICAgIOW5tDogMTc2MyxcbiAgICDmgJ06IDg3MixcbiAgICDmiYA6IC04MTQsXG4gICAg5oyZOiAxNjE4LFxuICAgIOaWsDogLTE2ODIsXG4gICAg5pelOiAyMTgsXG4gICAg5pyIOiAtNDM1MyxcbiAgICDmn7s6IDkzMixcbiAgICDmoLw6IDEzNTYsXG4gICAg5qmfOiAtMTUwOCxcbiAgICDmsI86IC0xMzQ3LFxuICAgIOeUsDogMjQwLFxuICAgIOeUujogLTM5MTIsXG4gICAg55qEOiAtMzE0OSxcbiAgICDnm7g6IDEzMTksXG4gICAg55yBOiAtMTA1MixcbiAgICDnnIw6IC00MDAzLFxuICAgIOeglDogLTk5NyxcbiAgICDnpL46IC0yNzgsXG4gICAg56m6OiAtODEzLFxuICAgIOe1sTogMTk1NSxcbiAgICDogIU6IC0yMjMzLFxuICAgIOihqDogNjYzLFxuICAgIOiqnjogLTEwNzMsXG4gICAg6K2wOiAxMjE5LFxuICAgIOmBuDogLTEwMTgsXG4gICAg6YOOOiAtMzY4LFxuICAgIOmVtzogNzg2LFxuICAgIOmWkzogMTE5MSxcbiAgICDpoYw6IDIzNjgsXG4gICAg6aSoOiAtNjg5LFxuICAgIFwi77yRXCI6IC01MTQsXG4gICAg77yl77ySOiAtMzI3NjgsXG4gICAgXCLvvaJcIjogMzYzLFxuICAgIO+9sjogMjQxLFxuICAgIO++mTogNDUxLFxuICAgIO++nTogLTM0MyxcbiAgfTtcbiAgdGhpcy5VVzZfXyA9IHtcbiAgICBcIixcIjogMjI3LFxuICAgIFwiLlwiOiA4MDgsXG4gICAgMTogLTI3MCxcbiAgICBFMTogMzA2LFxuICAgIFwi44CBXCI6IDIyNyxcbiAgICBcIuOAglwiOiA4MDgsXG4gICAg44GCOiAtMzA3LFxuICAgIOOBhjogMTg5LFxuICAgIOOBizogMjQxLFxuICAgIOOBjDogLTczLFxuICAgIOOBjzogLTEyMSxcbiAgICDjgZM6IC0yMDAsXG4gICAg44GYOiAxNzgyLFxuICAgIOOBmTogMzgzLFxuICAgIOOBnzogLTQyOCxcbiAgICDjgaM6IDU3MyxcbiAgICDjgaY6IC0xMDE0LFxuICAgIOOBpzogMTAxLFxuICAgIOOBqDogLTEwNSxcbiAgICDjgao6IC0yNTMsXG4gICAg44GrOiAtMTQ5LFxuICAgIOOBrjogLTQxNyxcbiAgICDjga86IC0yMzYsXG4gICAg44KCOiAtMjA2LFxuICAgIOOCijogMTg3LFxuICAgIOOCizogLTEzNSxcbiAgICDjgpI6IDE5NSxcbiAgICDjg6s6IC02NzMsXG4gICAg44OzOiAtNDk2LFxuICAgIOS4gDogLTI3NyxcbiAgICDkuK06IDIwMSxcbiAgICDku7Y6IC04MDAsXG4gICAg5LyaOiA2MjQsXG4gICAg5YmNOiAzMDIsXG4gICAg5Yy6OiAxNzkyLFxuICAgIOWToTogLTEyMTIsXG4gICAg5aeUOiA3OTgsXG4gICAg5a2mOiAtOTYwLFxuICAgIOW4gjogODg3LFxuICAgIOW6gzogLTY5NSxcbiAgICDlvow6IDUzNSxcbiAgICDmpa06IC02OTcsXG4gICAg55u4OiA3NTMsXG4gICAg56S+OiAtNTA3LFxuICAgIOemjzogOTc0LFxuICAgIOepujogLTgyMixcbiAgICDogIU6IDE4MTEsXG4gICAg6YCjOiA0NjMsXG4gICAg6YOOOiAxMDgyLFxuICAgIFwi77yRXCI6IC0yNzAsXG4gICAg77yl77yROiAzMDYsXG4gICAg776ZOiAtNjczLFxuICAgIO++nTogLTQ5NixcbiAgfTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuVGlueVNlZ21lbnRlci5wcm90b3R5cGUuY3R5cGVfID0gZnVuY3Rpb24gKHN0cikge1xuICBmb3IgKHZhciBpIGluIHRoaXMuY2hhcnR5cGVfKSB7XG4gICAgaWYgKHN0ci5tYXRjaCh0aGlzLmNoYXJ0eXBlX1tpXVswXSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoYXJ0eXBlX1tpXVsxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiT1wiO1xufTtcblxuVGlueVNlZ21lbnRlci5wcm90b3R5cGUudHNfID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKHYpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cblRpbnlTZWdtZW50ZXIucHJvdG90eXBlLnNlZ21lbnQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgaWYgKGlucHV0ID09IG51bGwgfHwgaW5wdXQgPT0gdW5kZWZpbmVkIHx8IGlucHV0ID09IFwiXCIpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgc2VnID0gW1wiQjNcIiwgXCJCMlwiLCBcIkIxXCJdO1xuICB2YXIgY3R5cGUgPSBbXCJPXCIsIFwiT1wiLCBcIk9cIl07XG4gIHZhciBvID0gaW5wdXQuc3BsaXQoXCJcIik7XG4gIGZvciAoaSA9IDA7IGkgPCBvLmxlbmd0aDsgKytpKSB7XG4gICAgc2VnLnB1c2gob1tpXSk7XG4gICAgY3R5cGUucHVzaCh0aGlzLmN0eXBlXyhvW2ldKSk7XG4gIH1cbiAgc2VnLnB1c2goXCJFMVwiKTtcbiAgc2VnLnB1c2goXCJFMlwiKTtcbiAgc2VnLnB1c2goXCJFM1wiKTtcbiAgY3R5cGUucHVzaChcIk9cIik7XG4gIGN0eXBlLnB1c2goXCJPXCIpO1xuICBjdHlwZS5wdXNoKFwiT1wiKTtcbiAgdmFyIHdvcmQgPSBzZWdbM107XG4gIHZhciBwMSA9IFwiVVwiO1xuICB2YXIgcDIgPSBcIlVcIjtcbiAgdmFyIHAzID0gXCJVXCI7XG4gIGZvciAodmFyIGkgPSA0OyBpIDwgc2VnLmxlbmd0aCAtIDM7ICsraSkge1xuICAgIHZhciBzY29yZSA9IHRoaXMuQklBU19fO1xuICAgIHZhciB3MSA9IHNlZ1tpIC0gM107XG4gICAgdmFyIHcyID0gc2VnW2kgLSAyXTtcbiAgICB2YXIgdzMgPSBzZWdbaSAtIDFdO1xuICAgIHZhciB3NCA9IHNlZ1tpXTtcbiAgICB2YXIgdzUgPSBzZWdbaSArIDFdO1xuICAgIHZhciB3NiA9IHNlZ1tpICsgMl07XG4gICAgdmFyIGMxID0gY3R5cGVbaSAtIDNdO1xuICAgIHZhciBjMiA9IGN0eXBlW2kgLSAyXTtcbiAgICB2YXIgYzMgPSBjdHlwZVtpIC0gMV07XG4gICAgdmFyIGM0ID0gY3R5cGVbaV07XG4gICAgdmFyIGM1ID0gY3R5cGVbaSArIDFdO1xuICAgIHZhciBjNiA9IGN0eXBlW2kgKyAyXTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVQMV9fW3AxXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUDJfX1twMl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVAzX19bcDNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJQMV9fW3AxICsgcDJdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJQMl9fW3AyICsgcDNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVXMV9fW3cxXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VVzJfX1t3Ml0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVczX19bdzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVXNF9fW3c0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VVzVfX1t3NV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVc2X19bdzZdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJXMV9fW3cyICsgdzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJXMl9fW3czICsgdzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJXM19fW3c0ICsgdzVdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRXMV9fW3cxICsgdzIgKyB3M10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFcyX19bdzIgKyB3MyArIHc0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UVzNfX1t3MyArIHc0ICsgdzVdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRXNF9fW3c0ICsgdzUgKyB3Nl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVUMxX19bYzFdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVDMl9fW2MyXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VQzNfX1tjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVUM0X19bYzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVDNV9fW2M1XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VQzZfX1tjNl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQkMxX19bYzIgKyBjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQkMyX19bYzMgKyBjNF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQkMzX19bYzQgKyBjNV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVEMxX19bYzEgKyBjMiArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UQzJfX1tjMiArIGMzICsgYzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRDM19fW2MzICsgYzQgKyBjNV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVEM0X19bYzQgKyBjNSArIGM2XSk7XG4gICAgLy8gIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVEM1X19bYzQgKyBjNSArIGM2XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUTFfX1twMSArIGMxXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUTJfX1twMiArIGMyXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUTNfX1twMyArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CUTFfX1twMiArIGMyICsgYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJRMl9fW3AyICsgYzMgKyBjNF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlEzX19bcDMgKyBjMiArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CUTRfX1twMyArIGMzICsgYzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRRMV9fW3AyICsgYzEgKyBjMiArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UUTJfX1twMiArIGMyICsgYzMgKyBjNF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFEzX19bcDMgKyBjMSArIGMyICsgYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRRNF9fW3AzICsgYzIgKyBjMyArIGM0XSk7XG4gICAgdmFyIHAgPSBcIk9cIjtcbiAgICBpZiAoc2NvcmUgPiAwKSB7XG4gICAgICByZXN1bHQucHVzaCh3b3JkKTtcbiAgICAgIHdvcmQgPSBcIlwiO1xuICAgICAgcCA9IFwiQlwiO1xuICAgIH1cbiAgICBwMSA9IHAyO1xuICAgIHAyID0gcDM7XG4gICAgcDMgPSBwO1xuICAgIHdvcmQgKz0gc2VnW2ldO1xuICB9XG4gIHJlc3VsdC5wdXNoKHdvcmQpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUaW55U2VnbWVudGVyO1xuIiwiaW1wb3J0IFRpbnlTZWdtZW50ZXIgZnJvbSBcIi4uLy4uL2V4dGVybmFsL3Rpbnktc2VnbWVudGVyXCI7XG5pbXBvcnQgeyBUUklNX0NIQVJfUEFUVEVSTiB9IGZyb20gXCIuL0RlZmF1bHRUb2tlbml6ZXJcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi90b2tlbml6ZXJcIjtcbi8vIEB0cy1pZ25vcmVcbmNvbnN0IHNlZ21lbnRlciA9IG5ldyBUaW55U2VnbWVudGVyKCk7XG5cbmZ1bmN0aW9uIHBpY2tUb2tlbnNBc0phcGFuZXNlKGNvbnRlbnQ6IHN0cmluZywgdHJpbVBhdHRlcm46IFJlZ0V4cCk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIGNvbnRlbnRcbiAgICAuc3BsaXQodHJpbVBhdHRlcm4pXG4gICAgLmZpbHRlcigoeCkgPT4geCAhPT0gXCJcIilcbiAgICAuZmxhdE1hcDxzdHJpbmc+KCh4KSA9PiBzZWdtZW50ZXIuc2VnbWVudCh4KSk7XG59XG5cbi8qKlxuICogSmFwYW5lc2UgbmVlZHMgb3JpZ2luYWwgbG9naWMuXG4gKi9cbmV4cG9ydCBjbGFzcyBKYXBhbmVzZVRva2VuaXplciBpbXBsZW1lbnRzIFRva2VuaXplciB7XG4gIHRva2VuaXplKGNvbnRlbnQ6IHN0cmluZywgcmF3PzogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gcGlja1Rva2Vuc0FzSmFwYW5lc2UoY29udGVudCwgcmF3ID8gLyAvZyA6IHRoaXMuZ2V0VHJpbVBhdHRlcm4oKSk7XG4gIH1cblxuICBnZXRUcmltUGF0dGVybigpOiBSZWdFeHAge1xuICAgIHJldHVybiBUUklNX0NIQVJfUEFUVEVSTjtcbiAgfVxuXG4gIHNob3VsZElnbm9yZShzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBCb29sZWFuKHN0ci5tYXRjaCgvXlvjgYEt44KT772BLe+9mu+8oS3vvLrjgILjgIHjg7zjgIBdKiQvKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFyYWJpY1Rva2VuaXplciB9IGZyb20gXCIuL3Rva2VuaXplcnMvQXJhYmljVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBEZWZhdWx0VG9rZW5pemVyIH0gZnJvbSBcIi4vdG9rZW5pemVycy9EZWZhdWx0VG9rZW5pemVyXCI7XG5pbXBvcnQgeyBKYXBhbmVzZVRva2VuaXplciB9IGZyb20gXCIuL3Rva2VuaXplcnMvSmFwYW5lc2VUb2tlbml6ZXJcIjtcbmltcG9ydCB7IFRva2VuaXplU3RyYXRlZ3kgfSBmcm9tIFwiLi9Ub2tlbml6ZVN0cmF0ZWd5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5pemVyIHtcbiAgdG9rZW5pemUoY29udGVudDogc3RyaW5nLCByYXc/OiBib29sZWFuKTogc3RyaW5nW107XG4gIGdldFRyaW1QYXR0ZXJuKCk6IFJlZ0V4cDtcbiAgc2hvdWxkSWdub3JlKHF1ZXJ5OiBzdHJpbmcpOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVG9rZW5pemVyKHN0cmF0ZWd5OiBUb2tlbml6ZVN0cmF0ZWd5KTogVG9rZW5pemVyIHtcbiAgc3dpdGNoIChzdHJhdGVneS5uYW1lKSB7XG4gICAgY2FzZSBcImRlZmF1bHRcIjpcbiAgICAgIHJldHVybiBuZXcgRGVmYXVsdFRva2VuaXplcigpO1xuICAgIGNhc2UgXCJhcmFiaWNcIjpcbiAgICAgIHJldHVybiBuZXcgQXJhYmljVG9rZW5pemVyKCk7XG4gICAgY2FzZSBcImphcGFuZXNlXCI6XG4gICAgICByZXR1cm4gbmV3IEphcGFuZXNlVG9rZW5pemVyKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBzdHJhdGVneSBuYW1lOiAke3N0cmF0ZWd5fWApO1xuICB9XG59XG4iLCJ0eXBlIE5hbWUgPSBcImRlZmF1bHRcIiB8IFwiamFwYW5lc2VcIiB8IFwiYXJhYmljXCI7XG5cbmV4cG9ydCBjbGFzcyBUb2tlbml6ZVN0cmF0ZWd5IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3ZhbHVlczogVG9rZW5pemVTdHJhdGVneVtdID0gW107XG5cbiAgc3RhdGljIHJlYWRvbmx5IERFRkFVTFQgPSBuZXcgVG9rZW5pemVTdHJhdGVneShcImRlZmF1bHRcIiwgMyk7XG4gIHN0YXRpYyByZWFkb25seSBKQVBBTkVTRSA9IG5ldyBUb2tlbml6ZVN0cmF0ZWd5KFwiamFwYW5lc2VcIiwgMik7XG4gIHN0YXRpYyByZWFkb25seSBBUkFCSUMgPSBuZXcgVG9rZW5pemVTdHJhdGVneShcImFyYWJpY1wiLCAzKTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG5hbWU6IE5hbWUsIHJlYWRvbmx5IHRyaWdnZXJUaHJlc2hvbGQ6IG51bWJlcikge1xuICAgIFRva2VuaXplU3RyYXRlZ3kuX3ZhbHVlcy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lKG5hbWU6IHN0cmluZyk6IFRva2VuaXplU3RyYXRlZ3kge1xuICAgIHJldHVybiBUb2tlbml6ZVN0cmF0ZWd5Ll92YWx1ZXMuZmluZCgoeCkgPT4geC5uYW1lID09PSBuYW1lKSE7XG4gIH1cblxuICBzdGF0aWMgdmFsdWVzKCk6IFRva2VuaXplU3RyYXRlZ3lbXSB7XG4gICAgcmV0dXJuIFRva2VuaXplU3RyYXRlZ3kuX3ZhbHVlcztcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGtleUJ5ID0gPFQ+KFxuICB2YWx1ZXM6IFRbXSxcbiAgdG9LZXk6ICh0OiBUKSA9PiBzdHJpbmdcbik6IHsgW2tleTogc3RyaW5nXTogVCB9ID0+XG4gIHZhbHVlcy5yZWR1Y2UoXG4gICAgKHByZXYsIGN1ciwgXzEsIF8yLCBrID0gdG9LZXkoY3VyKSkgPT4gKChwcmV2W2tdID0gY3VyKSwgcHJldiksXG4gICAge30gYXMgeyBba2V5OiBzdHJpbmddOiBUIH1cbiAgKTtcblxuZXhwb3J0IGNvbnN0IGdyb3VwQnkgPSA8VD4oXG4gIHZhbHVlczogVFtdLFxuICB0b0tleTogKHQ6IFQpID0+IHN0cmluZ1xuKTogeyBba2V5OiBzdHJpbmddOiBUW10gfSA9PlxuICB2YWx1ZXMucmVkdWNlKFxuICAgIChwcmV2LCBjdXIsIF8xLCBfMiwgayA9IHRvS2V5KGN1cikpID0+IChcbiAgICAgIChwcmV2W2tdIHx8IChwcmV2W2tdID0gW10pKS5wdXNoKGN1ciksIHByZXZcbiAgICApLFxuICAgIHt9IGFzIHsgW2tleTogc3RyaW5nXTogVFtdIH1cbiAgKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXE8VD4odmFsdWVzOiBUW10pOiBUW10ge1xuICByZXR1cm4gWy4uLm5ldyBTZXQodmFsdWVzKV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlxV2l0aDxUPihhcnI6IFRbXSwgZm46IChvbmU6IFQsIG90aGVyOiBUKSA9PiBib29sZWFuKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKFxuICAgIChlbGVtZW50LCBpbmRleCkgPT4gYXJyLmZpbmRJbmRleCgoc3RlcCkgPT4gZm4oZWxlbWVudCwgc3RlcCkpID09PSBpbmRleFxuICApO1xufVxuIiwiaW1wb3J0IHtcbiAgQXBwLFxuICBFZGl0b3IsXG4gIE1hcmtkb3duVmlldyxcbiAgcGFyc2VGcm9udE1hdHRlckFsaWFzZXMsXG4gIFRGaWxlLFxufSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IHVuaXEgfSBmcm9tIFwiLi91dGlsL2NvbGxlY3Rpb24taGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBcHBIZWxwZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcDogQXBwKSB7fVxuXG4gIGdldEFsaWFzZXMoZmlsZTogVEZpbGUpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHBhcnNlRnJvbnRNYXR0ZXJBbGlhc2VzKFxuICAgICAgICB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKT8uZnJvbnRtYXR0ZXJcbiAgICAgICkgPz8gW11cbiAgICApO1xuICB9XG5cbiAgZ2V0TWFya2Rvd25WaWV3SW5BY3RpdmVMZWFmKCk6IE1hcmtkb3duVmlldyB8IG51bGwge1xuICAgIGlmICghdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmIS52aWV3IGFzIE1hcmtkb3duVmlldztcbiAgfVxuXG4gIGdldEN1cnJlbnRFZGl0b3IoKTogRWRpdG9yIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWFya2Rvd25WaWV3SW5BY3RpdmVMZWFmKCk/LmVkaXRvciA/PyBudWxsO1xuICB9XG5cbiAgc2VhcmNoUGhhbnRvbUxpbmtzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdW5pcShcbiAgICAgIE9iamVjdC52YWx1ZXModGhpcy5hcHAubWV0YWRhdGFDYWNoZS51bnJlc29sdmVkTGlua3MpXG4gICAgICAgIC5tYXAoT2JqZWN0LmtleXMpXG4gICAgICAgIC5mbGF0KClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc2FmZSBtZXRob2RcbiAgICovXG4gIGlzSU1FT24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya2Rvd25WaWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYhLnZpZXcgYXMgTWFya2Rvd25WaWV3O1xuICAgIGNvbnN0IGNtNW9yNjogYW55ID0gKG1hcmtkb3duVmlldy5lZGl0b3IgYXMgYW55KS5jbTtcblxuICAgIC8vIGNtNlxuICAgIGlmIChjbTVvcjY/LmlucHV0U3RhdGU/LmNvbXBvc2luZyA+IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGNtNVxuICAgIHJldHVybiAhIWNtNW9yNj8uZGlzcGxheT8uaW5wdXQ/LmNvbXBvc2luZztcbiAgfVxufVxuIiwiY29uc3QgcmVnRW1vamkgPSBuZXcgUmVnRXhwKFxuICAvW1xcdTI3MDAtXFx1MjdCRl18W1xcdUUwMDAtXFx1RjhGRl18XFx1RDgzQ1tcXHVEQzAwLVxcdURGRkZdfFxcdUQ4M0RbXFx1REMwMC1cXHVERkZGXXxbXFx1MjAxMS1cXHUyNkZGXXxcXHVEODNFW1xcdUREMTAtXFx1RERGRl18W1xcdUZFMEUtXFx1RkUwRl0vLFxuICBcImdcIlxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFsbEFscGhhYmV0cyh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIEJvb2xlYW4odGV4dC5tYXRjaCgvXlthLXpBLVowLTlfLV0rJC8pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4Y2x1ZGVFbW9qaSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKHJlZ0Vtb2ppLCBcIlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4Y2x1ZGVTcGFjZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKC8gL2csIFwiXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG93ZXJJbmNsdWRlcyhvbmU6IHN0cmluZywgb3RoZXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gb25lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMob3RoZXIudG9Mb3dlckNhc2UoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb3dlckluY2x1ZGVzV2l0aG91dFNwYWNlKG9uZTogc3RyaW5nLCBvdGhlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBsb3dlckluY2x1ZGVzKGV4Y2x1ZGVTcGFjZShvbmUpLCBleGNsdWRlU3BhY2Uob3RoZXIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvd2VyU3RhcnRzV2l0aChhOiBzdHJpbmcsIGI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gYS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoYi50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvd2VyU3RhcnRzV2l0aG91dFNwYWNlKG9uZTogc3RyaW5nLCBvdGhlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBsb3dlclN0YXJ0c1dpdGgoZXhjbHVkZVNwYWNlKG9uZSksIGV4Y2x1ZGVTcGFjZShvdGhlcikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cbiIsImltcG9ydCB7XG4gIGNhcGl0YWxpemVGaXJzdExldHRlcixcbiAgbG93ZXJJbmNsdWRlc1dpdGhvdXRTcGFjZSxcbiAgbG93ZXJTdGFydHNXaXRoLFxuICBsb3dlclN0YXJ0c1dpdGhvdXRTcGFjZSxcbn0gZnJvbSBcIi4uL3V0aWwvc3RyaW5nc1wiO1xuaW1wb3J0IHsgSW5kZXhlZFdvcmRzIH0gZnJvbSBcIi4uL3VpL0F1dG9Db21wbGV0ZVN1Z2dlc3RcIjtcbmltcG9ydCB7IHVuaXFXaXRoIH0gZnJvbSBcIi4uL3V0aWwvY29sbGVjdGlvbi1oZWxwZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBXb3JkIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGFsaWFzZXM/OiBzdHJpbmdbXTtcbiAgaW50ZXJuYWxMaW5rPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgV29yZHNCeUZpcnN0TGV0dGVyID0geyBbZmlyc3RMZXR0ZXI6IHN0cmluZ106IFdvcmRbXSB9O1xuXG5pbnRlcmZhY2UgSnVkZ2VtZW50IHtcbiAgd29yZDogV29yZDtcbiAgdmFsdWU/OiBzdHJpbmc7XG4gIGFsaWFzOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHVzaFdvcmQoXG4gIHdvcmRzQnlGaXJzdExldHRlcjogV29yZHNCeUZpcnN0TGV0dGVyLFxuICBrZXk6IHN0cmluZyxcbiAgd29yZDogV29yZFxuKSB7XG4gIGlmICh3b3Jkc0J5Rmlyc3RMZXR0ZXJba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgd29yZHNCeUZpcnN0TGV0dGVyW2tleV0gPSBbd29yZF07XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd29yZHNCeUZpcnN0TGV0dGVyW2tleV0ucHVzaCh3b3JkKTtcbn1cblxuLy8gUHVibGljIGZvciB0ZXN0c1xuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlKFxuICB3b3JkOiBXb3JkLFxuICBxdWVyeTogc3RyaW5nLFxuICBxdWVyeVN0YXJ0V2l0aFVwcGVyOiBib29sZWFuXG4pOiBKdWRnZW1lbnQge1xuICBpZiAobG93ZXJTdGFydHNXaXRob3V0U3BhY2Uod29yZC52YWx1ZSwgcXVlcnkpKSB7XG4gICAgaWYgKHF1ZXJ5U3RhcnRXaXRoVXBwZXIgJiYgIXdvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICBjb25zdCBjID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHdvcmQudmFsdWUpO1xuICAgICAgcmV0dXJuIHsgd29yZDogeyAuLi53b3JkLCB2YWx1ZTogYyB9LCB2YWx1ZTogYywgYWxpYXM6IGZhbHNlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHdvcmQ6IHdvcmQsIHZhbHVlOiB3b3JkLnZhbHVlLCBhbGlhczogZmFsc2UgfTtcbiAgICB9XG4gIH1cbiAgY29uc3QgbWF0Y2hlZEFsaWFzID0gd29yZC5hbGlhc2VzPy5maW5kKChhKSA9PlxuICAgIGxvd2VyU3RhcnRzV2l0aG91dFNwYWNlKGEsIHF1ZXJ5KVxuICApO1xuICBpZiAobWF0Y2hlZEFsaWFzKSB7XG4gICAgcmV0dXJuIHsgd29yZDogd29yZCwgdmFsdWU6IG1hdGNoZWRBbGlhcywgYWxpYXM6IHRydWUgfTtcbiAgfVxuXG4gIHJldHVybiB7IHdvcmQ6IHdvcmQsIGFsaWFzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VnZ2VzdFdvcmRzKFxuICBpbmRleGVkV29yZHM6IEluZGV4ZWRXb3JkcyxcbiAgcXVlcnk6IHN0cmluZyxcbiAgbWF4OiBudW1iZXJcbik6IFdvcmRbXSB7XG4gIGNvbnN0IHF1ZXJ5U3RhcnRXaXRoVXBwZXIgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocXVlcnkpID09PSBxdWVyeTtcblxuICBjb25zdCB3b3JkcyA9IHF1ZXJ5U3RhcnRXaXRoVXBwZXJcbiAgICA/IFtcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXJyZW50RmlsZVtxdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXJyZW50RmlsZVtxdWVyeS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKV0gPz8gW10pLFxuICAgICAgICAuLi4oaW5kZXhlZFdvcmRzLmN1c3RvbURpY3Rpb25hcnlbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VzdG9tRGljdGlvbmFyeVtxdWVyeS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKV0gPz8gW10pLFxuICAgICAgICAuLi4oaW5kZXhlZFdvcmRzLmludGVybmFsTGlua1txdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5pbnRlcm5hbExpbmtbcXVlcnkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCldID8/IFtdKSxcbiAgICAgIF1cbiAgICA6IFtcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXJyZW50RmlsZVtxdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXN0b21EaWN0aW9uYXJ5W3F1ZXJ5LmNoYXJBdCgwKV0gPz8gW10pLFxuICAgICAgICAuLi4oaW5kZXhlZFdvcmRzLmludGVybmFsTGlua1txdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5pbnRlcm5hbExpbmtbcXVlcnkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCldID8/IFtdKSxcbiAgICAgIF07XG5cbiAgY29uc3QgY2FuZGlkYXRlID0gQXJyYXkuZnJvbSh3b3JkcylcbiAgICAubWFwKCh4KSA9PiBqdWRnZSh4LCBxdWVyeSwgcXVlcnlTdGFydFdpdGhVcHBlcikpXG4gICAgLmZpbHRlcigoeCkgPT4geC52YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBpZiAoYS52YWx1ZSEubGVuZ3RoICE9PSBiLnZhbHVlIS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGEudmFsdWUhLmxlbmd0aCA+IGIudmFsdWUhLmxlbmd0aCA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChhLndvcmQuaW50ZXJuYWxMaW5rICE9PSBiLndvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICAgIHJldHVybiBiLndvcmQuaW50ZXJuYWxMaW5rID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgaWYgKGEuYWxpYXMgIT09IGIuYWxpYXMpIHtcbiAgICAgICAgcmV0dXJuIGEuYWxpYXMgPyAxIDogLTE7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9KVxuICAgIC5tYXAoKHgpID0+IHgud29yZClcbiAgICAuc2xpY2UoMCwgbWF4KTtcblxuICAvLyBYWFg6IFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGVxdWFscyB3aXRoIG1heCwgYnV0IGl0IGlzIGltcG9ydGFudCBmb3IgcGVyZm9ybWFuY2VcbiAgcmV0dXJuIHVuaXFXaXRoKFxuICAgIGNhbmRpZGF0ZSxcbiAgICAoYSwgYikgPT4gYS52YWx1ZSA9PT0gYi52YWx1ZSAmJiBhLmludGVybmFsTGluayA9PT0gYi5pbnRlcm5hbExpbmtcbiAgKTtcbn1cblxuLy8gVE9ETzogcmVmYWN0b3Jpbmdcbi8vIFB1YmxpYyBmb3IgdGVzdHNcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUJ5UGFydGlhbE1hdGNoKFxuICB3b3JkOiBXb3JkLFxuICBxdWVyeTogc3RyaW5nLFxuICBxdWVyeVN0YXJ0V2l0aFVwcGVyOiBib29sZWFuXG4pOiBKdWRnZW1lbnQge1xuICBpZiAobG93ZXJTdGFydHNXaXRob3V0U3BhY2Uod29yZC52YWx1ZSwgcXVlcnkpKSB7XG4gICAgaWYgKHF1ZXJ5U3RhcnRXaXRoVXBwZXIgJiYgIXdvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICBjb25zdCBjID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHdvcmQudmFsdWUpO1xuICAgICAgcmV0dXJuIHsgd29yZDogeyAuLi53b3JkLCB2YWx1ZTogYyB9LCB2YWx1ZTogYywgYWxpYXM6IGZhbHNlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHdvcmQ6IHdvcmQsIHZhbHVlOiB3b3JkLnZhbHVlLCBhbGlhczogZmFsc2UgfTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtYXRjaGVkQWxpYXNTdGFydHMgPSB3b3JkLmFsaWFzZXM/LmZpbmQoKGEpID0+XG4gICAgbG93ZXJTdGFydHNXaXRob3V0U3BhY2UoYSwgcXVlcnkpXG4gICk7XG4gIGlmIChtYXRjaGVkQWxpYXNTdGFydHMpIHtcbiAgICByZXR1cm4geyB3b3JkOiB3b3JkLCB2YWx1ZTogbWF0Y2hlZEFsaWFzU3RhcnRzLCBhbGlhczogdHJ1ZSB9O1xuICB9XG5cbiAgaWYgKGxvd2VySW5jbHVkZXNXaXRob3V0U3BhY2Uod29yZC52YWx1ZSwgcXVlcnkpKSB7XG4gICAgcmV0dXJuIHsgd29yZDogd29yZCwgdmFsdWU6IHdvcmQudmFsdWUsIGFsaWFzOiBmYWxzZSB9O1xuICB9XG5cbiAgY29uc3QgbWF0Y2hlZEFsaWFzSW5jbHVkZWQgPSB3b3JkLmFsaWFzZXM/LmZpbmQoKGEpID0+XG4gICAgbG93ZXJJbmNsdWRlc1dpdGhvdXRTcGFjZShhLCBxdWVyeSlcbiAgKTtcbiAgaWYgKG1hdGNoZWRBbGlhc0luY2x1ZGVkKSB7XG4gICAgcmV0dXJuIHsgd29yZDogd29yZCwgdmFsdWU6IG1hdGNoZWRBbGlhc0luY2x1ZGVkLCBhbGlhczogdHJ1ZSB9O1xuICB9XG5cbiAgcmV0dXJuIHsgd29yZDogd29yZCwgYWxpYXM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0V29yZHNCeVBhcnRpYWxNYXRjaChcbiAgaW5kZXhlZFdvcmRzOiBJbmRleGVkV29yZHMsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIG1heDogbnVtYmVyXG4pOiBXb3JkW10ge1xuICBjb25zdCBxdWVyeVN0YXJ0V2l0aFVwcGVyID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHF1ZXJ5KSA9PT0gcXVlcnk7XG5cbiAgY29uc3QgZmxhdE9iamVjdFZhbHVlcyA9IChvYmplY3Q6IHsgW2ZpcnN0TGV0dGVyOiBzdHJpbmddOiBXb3JkW10gfSkgPT5cbiAgICBPYmplY3QudmFsdWVzKG9iamVjdCkuZmxhdCgpO1xuICBjb25zdCB3b3JkcyA9IFtcbiAgICAuLi5mbGF0T2JqZWN0VmFsdWVzKGluZGV4ZWRXb3Jkcy5jdXJyZW50RmlsZSksXG4gICAgLi4uZmxhdE9iamVjdFZhbHVlcyhpbmRleGVkV29yZHMuY3VzdG9tRGljdGlvbmFyeSksXG4gICAgLi4uZmxhdE9iamVjdFZhbHVlcyhpbmRleGVkV29yZHMuaW50ZXJuYWxMaW5rKSxcbiAgXTtcblxuICBjb25zdCBjYW5kaWRhdGUgPSBBcnJheS5mcm9tKHdvcmRzKVxuICAgIC5tYXAoKHgpID0+IGp1ZGdlQnlQYXJ0aWFsTWF0Y2goeCwgcXVlcnksIHF1ZXJ5U3RhcnRXaXRoVXBwZXIpKVxuICAgIC5maWx0ZXIoKHgpID0+IHgudmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgYXMgPSBsb3dlclN0YXJ0c1dpdGgoYS52YWx1ZSEsIHF1ZXJ5KTtcbiAgICAgIGNvbnN0IGJzID0gbG93ZXJTdGFydHNXaXRoKGIudmFsdWUhLCBxdWVyeSk7XG4gICAgICBpZiAoYXMgIT09IGJzKSB7XG4gICAgICAgIHJldHVybiBicyA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChhLnZhbHVlIS5sZW5ndGggIT09IGIudmFsdWUhLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYS52YWx1ZSEubGVuZ3RoID4gYi52YWx1ZSEubGVuZ3RoID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgaWYgKGEud29yZC5pbnRlcm5hbExpbmsgIT09IGIud29yZC5pbnRlcm5hbExpbmspIHtcbiAgICAgICAgcmV0dXJuIGIud29yZC5pbnRlcm5hbExpbmsgPyAxIDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS5hbGlhcyAhPT0gYi5hbGlhcykge1xuICAgICAgICByZXR1cm4gYS5hbGlhcyA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH0pXG4gICAgLm1hcCgoeCkgPT4geC53b3JkKVxuICAgIC5zbGljZSgwLCBtYXgpO1xuXG4gIC8vIFhYWDogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgZXF1YWxzIHdpdGggbWF4LCBidXQgaXQgaXMgaW1wb3J0YW50IGZvciBwZXJmb3JtYW5jZVxuICByZXR1cm4gdW5pcVdpdGgoXG4gICAgY2FuZGlkYXRlLFxuICAgIChhLCBiKSA9PiBhLnZhbHVlID09PSBiLnZhbHVlICYmIGEuaW50ZXJuYWxMaW5rID09PSBiLmludGVybmFsTGlua1xuICApO1xufVxuIiwiaW1wb3J0IHsgQXBwLCBGaWxlU3lzdGVtQWRhcHRlciwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBrZXlCeSB9IGZyb20gXCIuLi91dGlsL2NvbGxlY3Rpb24taGVscGVyXCI7XG5pbXBvcnQgeyBwdXNoV29yZCwgV29yZCwgV29yZHNCeUZpcnN0TGV0dGVyIH0gZnJvbSBcIi4vc3VnZ2VzdGVyXCI7XG5cbmZ1bmN0aW9uIGxpbmVUb1dvcmQobGluZTogc3RyaW5nKTogV29yZCB7XG4gIGNvbnN0IFt2YWx1ZSwgZGVzY3JpcHRpb24sIC4uLmFsaWFzZXNdID0gbGluZS5zcGxpdChcIlxcdFwiKTtcbiAgcmV0dXJuIHtcbiAgICB2YWx1ZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBhbGlhc2VzLFxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlciB7XG4gIHByaXZhdGUgd29yZHM6IFdvcmRbXSA9IFtdO1xuICB3b3JkQnlWYWx1ZTogeyBbdmFsdWU6IHN0cmluZ106IFdvcmQgfTtcbiAgd29yZHNCeUZpcnN0TGV0dGVyOiBXb3Jkc0J5Rmlyc3RMZXR0ZXI7XG5cbiAgcHJpdmF0ZSBhcHA6IEFwcDtcbiAgcHJpdmF0ZSBmaWxlU3lzdGVtQWRhcHRlcjogRmlsZVN5c3RlbUFkYXB0ZXI7XG4gIHByaXZhdGUgcGF0aHM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwYXRoczogc3RyaW5nW10pIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB0aGlzLmZpbGVTeXN0ZW1BZGFwdGVyID0gYXBwLnZhdWx0LmFkYXB0ZXIgYXMgRmlsZVN5c3RlbUFkYXB0ZXI7XG4gICAgdGhpcy5wYXRocyA9IHBhdGhzO1xuICB9XG5cbiAgdXBkYXRlUGF0aHMocGF0aHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgdGhpcy5wYXRocyA9IHBhdGhzO1xuICB9XG5cbiAgYXN5bmMgbG9hZFdvcmRzKHBhdGg6IHN0cmluZyk6IFByb21pc2U8V29yZFtdPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmZpbGVTeXN0ZW1BZGFwdGVyLnJlYWQocGF0aCkpXG4gICAgICAuc3BsaXQoL1xcclxcbnxcXG4vKVxuICAgICAgLm1hcCgoeCkgPT4geC5yZXBsYWNlKC8lJS4qJSUvZywgXCJcIikpXG4gICAgICAuZmlsdGVyKCh4KSA9PiB4KVxuICAgICAgLm1hcChsaW5lVG9Xb3JkKTtcbiAgfVxuXG4gIGFzeW5jIHJlZnJlc2hDdXN0b21Xb3JkcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmNsZWFyV29yZHMoKTtcblxuICAgIGZvciAoY29uc3QgcGF0aCBvZiB0aGlzLnBhdGhzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB3b3JkcyA9IGF3YWl0IHRoaXMubG9hZFdvcmRzKHBhdGgpO1xuICAgICAgICB3b3Jkcy5mb3JFYWNoKCh4KSA9PiB0aGlzLndvcmRzLnB1c2goeCkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBub2luc3BlY3Rpb24gT2JqZWN0QWxsb2NhdGlvbklnbm9yZWRcbiAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICBg4pqgIEZhaWwgdG8gbG9hZCAke3BhdGh9IC0tIFZhcmlvdXMgQ29tcGxlbWVudHMgUGx1Z2luIC0tIFxcbiAke2V9YCxcbiAgICAgICAgICAwXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy53b3JkQnlWYWx1ZSA9IGtleUJ5KHRoaXMud29yZHMsICh4KSA9PiB4LnZhbHVlKTtcbiAgICBmb3IgKGNvbnN0IHdvcmQgb2YgdGhpcy53b3Jkcykge1xuICAgICAgcHVzaFdvcmQodGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIsIHdvcmQudmFsdWUuY2hhckF0KDApLCB3b3JkKTtcbiAgICAgIHdvcmQuYWxpYXNlcz8uZm9yRWFjaCgoYSkgPT5cbiAgICAgICAgcHVzaFdvcmQodGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIsIGEuY2hhckF0KDApLCB3b3JkKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcldvcmRzKCk6IHZvaWQge1xuICAgIHRoaXMud29yZHMgPSBbXTtcbiAgICB0aGlzLndvcmRCeVZhbHVlID0ge307XG4gICAgdGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIgPSB7fTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBncm91cEJ5LCB1bmlxIH0gZnJvbSBcIi4uL3V0aWwvY29sbGVjdGlvbi1oZWxwZXJcIjtcbmltcG9ydCB7IFdvcmQsIFdvcmRzQnlGaXJzdExldHRlciB9IGZyb20gXCIuL3N1Z2dlc3RlclwiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL3Rva2VuaXplci90b2tlbml6ZXJcIjtcbmltcG9ydCB7IEFwcEhlbHBlciB9IGZyb20gXCIuLi9hcHAtaGVscGVyXCI7XG5pbXBvcnQgeyBhbGxBbHBoYWJldHMgfSBmcm9tIFwiLi4vdXRpbC9zdHJpbmdzXCI7XG5cbmV4cG9ydCBjbGFzcyBDdXJyZW50RmlsZVdvcmRQcm92aWRlciB7XG4gIHByaXZhdGUgd29yZHM6IFdvcmRbXSA9IFtdO1xuICB3b3Jkc0J5Rmlyc3RMZXR0ZXI6IFdvcmRzQnlGaXJzdExldHRlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFwcDogQXBwLFxuICAgIHByaXZhdGUgYXBwSGVscGVyOiBBcHBIZWxwZXIsXG4gICAgcHJpdmF0ZSB0b2tlbml6ZXI6IFRva2VuaXplclxuICApIHt9XG5cbiAgYXN5bmMgcmVmcmVzaFdvcmRzKG9ubHlFbmdsaXNoOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5jbGVhcldvcmRzKCk7XG5cbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmFwcEhlbHBlci5nZXRDdXJyZW50RWRpdG9yKCk7XG4gICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKTtcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VG9rZW4gPSB0aGlzLnRva2VuaXplclxuICAgICAgLnRva2VuaXplKFxuICAgICAgICBlZGl0b3IuZ2V0TGluZShlZGl0b3IuZ2V0Q3Vyc29yKCkubGluZSkuc2xpY2UoMCwgZWRpdG9yLmdldEN1cnNvcigpLmNoKVxuICAgICAgKVxuICAgICAgLmxhc3QoKTtcblxuICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5jYWNoZWRSZWFkKGZpbGUpO1xuICAgIGNvbnN0IHRva2VucyA9IG9ubHlFbmdsaXNoXG4gICAgICA/IHRoaXMudG9rZW5pemVyLnRva2VuaXplKGNvbnRlbnQpLmZpbHRlcihhbGxBbHBoYWJldHMpXG4gICAgICA6IHRoaXMudG9rZW5pemVyLnRva2VuaXplKGNvbnRlbnQpO1xuICAgIHRoaXMud29yZHMgPSB1bmlxKHRva2VucylcbiAgICAgIC5maWx0ZXIoKHgpID0+IHggIT09IGN1cnJlbnRUb2tlbilcbiAgICAgIC5tYXAoKHgpID0+ICh7XG4gICAgICAgIHZhbHVlOiB4LFxuICAgICAgfSkpO1xuICAgIHRoaXMud29yZHNCeUZpcnN0TGV0dGVyID0gZ3JvdXBCeSh0aGlzLndvcmRzLCAoeCkgPT4geC52YWx1ZS5jaGFyQXQoMCkpO1xuICB9XG5cbiAgY2xlYXJXb3JkcygpOiB2b2lkIHtcbiAgICB0aGlzLndvcmRzID0gW107XG4gICAgdGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIgPSB7fTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBwdXNoV29yZCwgV29yZCwgV29yZHNCeUZpcnN0TGV0dGVyIH0gZnJvbSBcIi4vc3VnZ2VzdGVyXCI7XG5pbXBvcnQgeyBBcHBIZWxwZXIgfSBmcm9tIFwiLi4vYXBwLWhlbHBlclwiO1xuaW1wb3J0IHsgZXhjbHVkZUVtb2ppIH0gZnJvbSBcIi4uL3V0aWwvc3RyaW5nc1wiO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyIHtcbiAgcHJpdmF0ZSB3b3JkczogV29yZFtdID0gW107XG4gIHdvcmRzQnlGaXJzdExldHRlcjogV29yZHNCeUZpcnN0TGV0dGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwOiBBcHAsIHByaXZhdGUgYXBwSGVscGVyOiBBcHBIZWxwZXIpIHt9XG5cbiAgcmVmcmVzaFdvcmRzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJXb3JkcygpO1xuXG4gICAgY29uc3QgcmVzb2x2ZWRJbnRlcm5hbExpbmtXb3JkcyA9IHRoaXMuYXBwLnZhdWx0XG4gICAgICAuZ2V0TWFya2Rvd25GaWxlcygpXG4gICAgICAubWFwKCh4KSA9PiB7XG4gICAgICAgIGNvbnN0IGxlc3NFbW9qaVZhbHVlID0gZXhjbHVkZUVtb2ppKHguYmFzZW5hbWUpO1xuICAgICAgICBjb25zdCBhbGlhc2VzID1cbiAgICAgICAgICB4LmJhc2VuYW1lID09PSBsZXNzRW1vamlWYWx1ZVxuICAgICAgICAgICAgPyB0aGlzLmFwcEhlbHBlci5nZXRBbGlhc2VzKHgpXG4gICAgICAgICAgICA6IFtsZXNzRW1vamlWYWx1ZSwgLi4udGhpcy5hcHBIZWxwZXIuZ2V0QWxpYXNlcyh4KV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IHguYmFzZW5hbWUsXG4gICAgICAgICAgYWxpYXNlcyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogeC5wYXRoLFxuICAgICAgICAgIGludGVybmFsTGluazogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgdW5yZXNvbHZlZEludGVybmFsTGlua1dvcmRzID0gdGhpcy5hcHBIZWxwZXJcbiAgICAgIC5zZWFyY2hQaGFudG9tTGlua3MoKVxuICAgICAgLm1hcCgodGV4dCkgPT4ge1xuICAgICAgICBjb25zdCBsZXNzRW1vamlWYWx1ZSA9IGV4Y2x1ZGVFbW9qaSh0ZXh0KTtcbiAgICAgICAgY29uc3QgYWxpYXNlcyA9IHRleHQgPT09IGxlc3NFbW9qaVZhbHVlID8gdW5kZWZpbmVkIDogW2xlc3NFbW9qaVZhbHVlXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICBhbGlhc2VzLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5vdCBjcmVhdGVkIHlldFwiLFxuICAgICAgICAgIGludGVybmFsTGluazogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy53b3JkcyA9IFsuLi5yZXNvbHZlZEludGVybmFsTGlua1dvcmRzLCAuLi51bnJlc29sdmVkSW50ZXJuYWxMaW5rV29yZHNdO1xuICAgIGZvciAoY29uc3Qgd29yZCBvZiB0aGlzLndvcmRzKSB7XG4gICAgICBwdXNoV29yZCh0aGlzLndvcmRzQnlGaXJzdExldHRlciwgd29yZC52YWx1ZS5jaGFyQXQoMCksIHdvcmQpO1xuICAgICAgd29yZC5hbGlhc2VzPy5mb3JFYWNoKChhKSA9PlxuICAgICAgICBwdXNoV29yZCh0aGlzLndvcmRzQnlGaXJzdExldHRlciwgYS5jaGFyQXQoMCksIHdvcmQpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyV29yZHMoKTogdm9pZCB7XG4gICAgdGhpcy53b3JkcyA9IFtdO1xuICAgIHRoaXMud29yZHNCeUZpcnN0TGV0dGVyID0ge307XG4gIH1cbn1cbiIsImltcG9ydCB7IEluZGV4ZWRXb3JkcyB9IGZyb20gXCIuLi91aS9BdXRvQ29tcGxldGVTdWdnZXN0XCI7XG5pbXBvcnQgeyBzdWdnZXN0V29yZHMsIHN1Z2dlc3RXb3Jkc0J5UGFydGlhbE1hdGNoLCBXb3JkIH0gZnJvbSBcIi4vc3VnZ2VzdGVyXCI7XG5cbnR5cGUgTmFtZSA9IFwicHJlZml4XCIgfCBcInBhcnRpYWxcIjtcblxudHlwZSBIYW5kbGVyID0gKFxuICBpbmRleGVkV29yZHM6IEluZGV4ZWRXb3JkcyxcbiAgcXVlcnk6IHN0cmluZyxcbiAgbWF4OiBudW1iZXJcbikgPT4gV29yZFtdO1xuXG5leHBvcnQgY2xhc3MgTWF0Y2hTdHJhdGVneSB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF92YWx1ZXM6IE1hdGNoU3RyYXRlZ3lbXSA9IFtdO1xuXG4gIHN0YXRpYyByZWFkb25seSBQUkVGSVggPSBuZXcgTWF0Y2hTdHJhdGVneShcInByZWZpeFwiLCBzdWdnZXN0V29yZHMpO1xuICBzdGF0aWMgcmVhZG9ubHkgUEFSVElBTCA9IG5ldyBNYXRjaFN0cmF0ZWd5KFxuICAgIFwicGFydGlhbFwiLFxuICAgIHN1Z2dlc3RXb3Jkc0J5UGFydGlhbE1hdGNoXG4gICk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihyZWFkb25seSBuYW1lOiBOYW1lLCByZWFkb25seSBoYW5kbGVyOiBIYW5kbGVyKSB7XG4gICAgTWF0Y2hTdHJhdGVneS5fdmFsdWVzLnB1c2godGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5hbWUobmFtZTogc3RyaW5nKTogTWF0Y2hTdHJhdGVneSB7XG4gICAgcmV0dXJuIE1hdGNoU3RyYXRlZ3kuX3ZhbHVlcy5maW5kKCh4KSA9PiB4Lm5hbWUgPT09IG5hbWUpITtcbiAgfVxuXG4gIHN0YXRpYyB2YWx1ZXMoKTogTWF0Y2hTdHJhdGVneVtdIHtcbiAgICByZXR1cm4gTWF0Y2hTdHJhdGVneS5fdmFsdWVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2RpZmllciB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG50eXBlIE5hbWUgPSBcIk5vbmVcIiB8IFwiVGFiL1NoaWZ0K1RhYlwiIHwgXCJNb2QrTi9Nb2QrUFwiIHwgXCJNb2QrSi9Nb2QrS1wiO1xuaW50ZXJmYWNlIEtleUJpbmQge1xuICBtb2RpZmllcnM6IE1vZGlmaWVyW107XG4gIGtleTogc3RyaW5nIHwgbnVsbDtcbn1cblxuZXhwb3J0IGNsYXNzIEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cyB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF92YWx1ZXM6IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5c1tdID0gW107XG5cbiAgc3RhdGljIHJlYWRvbmx5IE5PTkUgPSBuZXcgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzKFxuICAgIFwiTm9uZVwiLFxuICAgIHsgbW9kaWZpZXJzOiBbXSwga2V5OiBudWxsIH0sXG4gICAgeyBtb2RpZmllcnM6IFtdLCBrZXk6IG51bGwgfVxuICApO1xuICBzdGF0aWMgcmVhZG9ubHkgVEFCID0gbmV3IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cyhcbiAgICBcIlRhYi9TaGlmdCtUYWJcIixcbiAgICB7IG1vZGlmaWVyczogW10sIGtleTogXCJUYWJcIiB9LFxuICAgIHsgbW9kaWZpZXJzOiBbXCJTaGlmdFwiXSwga2V5OiBcIlRhYlwiIH1cbiAgKTtcbiAgc3RhdGljIHJlYWRvbmx5IEVNQUNTID0gbmV3IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cyhcbiAgICBcIk1vZCtOL01vZCtQXCIsXG4gICAgeyBtb2RpZmllcnM6IFtcIk1vZFwiXSwga2V5OiBcIk5cIiB9LFxuICAgIHsgbW9kaWZpZXJzOiBbXCJNb2RcIl0sIGtleTogXCJQXCIgfVxuICApO1xuICBzdGF0aWMgcmVhZG9ubHkgVklNID0gbmV3IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cyhcbiAgICBcIk1vZCtKL01vZCtLXCIsXG4gICAgeyBtb2RpZmllcnM6IFtcIk1vZFwiXSwga2V5OiBcIkpcIiB9LFxuICAgIHsgbW9kaWZpZXJzOiBbXCJNb2RcIl0sIGtleTogXCJLXCIgfVxuICApO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgbmFtZTogTmFtZSxcbiAgICByZWFkb25seSBuZXh0S2V5OiBLZXlCaW5kLFxuICAgIHJlYWRvbmx5IHByZXZpb3VzS2V5OiBLZXlCaW5kXG4gICkge1xuICAgIEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cy5fdmFsdWVzLnB1c2godGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5hbWUobmFtZTogc3RyaW5nKTogQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzIHtcbiAgICByZXR1cm4gQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzLl92YWx1ZXMuZmluZCgoeCkgPT4geC5uYW1lID09PSBuYW1lKSE7XG4gIH1cblxuICBzdGF0aWMgdmFsdWVzKCk6IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5c1tdIHtcbiAgICByZXR1cm4gQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzLl92YWx1ZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEFwcCxcbiAgZGVib3VuY2UsXG4gIERlYm91bmNlcixcbiAgRWRpdG9yLFxuICBFZGl0b3JQb3NpdGlvbixcbiAgRWRpdG9yU3VnZ2VzdCxcbiAgRWRpdG9yU3VnZ2VzdENvbnRleHQsXG4gIEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbyxcbiAgRXZlbnRSZWYsXG4gIEtleW1hcEV2ZW50SGFuZGxlcixcbiAgU2NvcGUsXG4gIFRGaWxlLFxufSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGNyZWF0ZVRva2VuaXplciwgVG9rZW5pemVyIH0gZnJvbSBcIi4uL3Rva2VuaXplci90b2tlbml6ZXJcIjtcbmltcG9ydCB7IFRva2VuaXplU3RyYXRlZ3kgfSBmcm9tIFwiLi4vdG9rZW5pemVyL1Rva2VuaXplU3RyYXRlZ3lcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBBcHBIZWxwZXIgfSBmcm9tIFwiLi4vYXBwLWhlbHBlclwiO1xuaW1wb3J0IHsgV29yZCwgV29yZHNCeUZpcnN0TGV0dGVyIH0gZnJvbSBcIi4uL3Byb3ZpZGVyL3N1Z2dlc3RlclwiO1xuaW1wb3J0IHsgQ3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlciB9IGZyb20gXCIuLi9wcm92aWRlci9DdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyXCI7XG5pbXBvcnQgeyBDdXJyZW50RmlsZVdvcmRQcm92aWRlciB9IGZyb20gXCIuLi9wcm92aWRlci9DdXJyZW50RmlsZVdvcmRQcm92aWRlclwiO1xuaW1wb3J0IHsgSW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyIH0gZnJvbSBcIi4uL3Byb3ZpZGVyL0ludGVybmFsTGlua1dvcmRQcm92aWRlclwiO1xuaW1wb3J0IHsgTWF0Y2hTdHJhdGVneSB9IGZyb20gXCIuLi9wcm92aWRlci9NYXRjaFN0cmF0ZWd5XCI7XG5pbXBvcnQgeyBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMgfSBmcm9tIFwiLi4vQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzXCI7XG5cbmV4cG9ydCB0eXBlIEluZGV4ZWRXb3JkcyA9IHtcbiAgY3VycmVudEZpbGU6IFdvcmRzQnlGaXJzdExldHRlcjtcbiAgY3VzdG9tRGljdGlvbmFyeTogV29yZHNCeUZpcnN0TGV0dGVyO1xuICBpbnRlcm5hbExpbms6IFdvcmRzQnlGaXJzdExldHRlcjtcbn07XG5cbi8vIFRoaXMgaXMgYW4gdW5zYWZlIGNvZGUuLiEhXG5pbnRlcmZhY2UgVW5zYWZlRWRpdG9yU3VnZ2VzdEludGVyZmFjZSB7XG4gIHNjb3BlOiBTY29wZSAmIHsga2V5czogKEtleW1hcEV2ZW50SGFuZGxlciAmIHsgZnVuYzogQ2FsbGFibGVGdW5jdGlvbiB9KVtdIH07XG4gIHN1Z2dlc3Rpb25zOiB7XG4gICAgc2VsZWN0ZWRJdGVtOiBudW1iZXI7XG4gICAgdXNlU2VsZWN0ZWRJdGVtKGV2OiBQYXJ0aWFsPEtleWJvYXJkRXZlbnQ+KTogdm9pZDtcbiAgICBzZXRTZWxlY3RlZEl0ZW0oc2VsZWN0ZWQ6IG51bWJlciwgc2Nyb2xsOiBib29sZWFuKTogdm9pZDtcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZVN1Z2dlc3RcbiAgZXh0ZW5kcyBFZGl0b3JTdWdnZXN0PFdvcmQ+XG4gIGltcGxlbWVudHMgVW5zYWZlRWRpdG9yU3VnZ2VzdEludGVyZmFjZVxue1xuICBhcHA6IEFwcDtcbiAgc2V0dGluZ3M6IFNldHRpbmdzO1xuICBhcHBIZWxwZXI6IEFwcEhlbHBlcjtcblxuICBjdXJyZW50RmlsZVdvcmRQcm92aWRlcjogQ3VycmVudEZpbGVXb3JkUHJvdmlkZXI7XG4gIGN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXI6IEN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXI7XG4gIGludGVybmFsTGlua1dvcmRQcm92aWRlcjogSW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyO1xuXG4gIHRva2VuaXplcjogVG9rZW5pemVyO1xuICBkZWJvdW5jZUdldFN1Z2dlc3Rpb25zOiBEZWJvdW5jZXI8XG4gICAgW0VkaXRvclN1Z2dlc3RDb250ZXh0LCAodG9rZW5zOiBXb3JkW10pID0+IHZvaWRdXG4gID47XG4gIGRlYm91bmNlQ2xvc2U6IERlYm91bmNlcjxbXT47XG5cbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLy8gdW5zYWZlISFcbiAgc2NvcGU6IFVuc2FmZUVkaXRvclN1Z2dlc3RJbnRlcmZhY2VbXCJzY29wZVwiXTtcbiAgc3VnZ2VzdGlvbnM6IFVuc2FmZUVkaXRvclN1Z2dlc3RJbnRlcmZhY2VbXCJzdWdnZXN0aW9uc1wiXTtcblxuICBrZXltYXBFdmVudEhhbmRsZXI6IEtleW1hcEV2ZW50SGFuZGxlcltdID0gW107XG4gIG1vZGlmeUV2ZW50UmVmOiBFdmVudFJlZjtcbiAgYWN0aXZlTGVhZkNoYW5nZVJlZjogRXZlbnRSZWY7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEFwcCxcbiAgICBjdXN0b21EaWN0aW9uYXJ5U3VnZ2VzdGVyOiBDdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyXG4gICkge1xuICAgIHN1cGVyKGFwcCk7XG4gICAgdGhpcy5hcHBIZWxwZXIgPSBuZXcgQXBwSGVscGVyKGFwcCk7XG4gICAgdGhpcy5jdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyID0gY3VzdG9tRGljdGlvbmFyeVN1Z2dlc3RlcjtcbiAgfVxuXG4gIHRyaWdnZXJDb21wbGV0ZSgpIHtcbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmFwcEhlbHBlci5nZXRDdXJyZW50RWRpdG9yKCk7XG4gICAgY29uc3QgYWN0aXZlRmlsZSA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk7XG4gICAgaWYgKCFlZGl0b3IgfHwgIWFjdGl2ZUZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBYWFg6IFVuc2FmZVxuICAgICh0aGlzIGFzIGFueSkudHJpZ2dlcihlZGl0b3IsIGFjdGl2ZUZpbGUsIHRydWUpO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIG5ldyhhcHA6IEFwcCwgc2V0dGluZ3M6IFNldHRpbmdzKTogUHJvbWlzZTxBdXRvQ29tcGxldGVTdWdnZXN0PiB7XG4gICAgY29uc3QgaW5zID0gbmV3IEF1dG9Db21wbGV0ZVN1Z2dlc3QoXG4gICAgICBhcHAsXG4gICAgICBuZXcgQ3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlcihcbiAgICAgICAgYXBwLFxuICAgICAgICBzZXR0aW5ncy5jdXN0b21EaWN0aW9uYXJ5UGF0aHMuc3BsaXQoXCJcXG5cIikuZmlsdGVyKCh4KSA9PiB4KVxuICAgICAgKVxuICAgICk7XG5cbiAgICBhd2FpdCBpbnMudXBkYXRlU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgIGF3YWl0IGlucy5yZWZyZXNoQ3VzdG9tRGljdGlvbmFyeVRva2VucygpO1xuXG4gICAgaW5zLm1vZGlmeUV2ZW50UmVmID0gYXBwLnZhdWx0Lm9uKFwibW9kaWZ5XCIsIGFzeW5jIChfKSA9PiB7XG4gICAgICBhd2FpdCBpbnMucmVmcmVzaEN1cnJlbnRGaWxlVG9rZW5zKCk7XG4gICAgfSk7XG4gICAgaW5zLmFjdGl2ZUxlYWZDaGFuZ2VSZWYgPSBhcHAud29ya3NwYWNlLm9uKFxuICAgICAgXCJhY3RpdmUtbGVhZi1jaGFuZ2VcIixcbiAgICAgIGFzeW5jIChfKSA9PiB7XG4gICAgICAgIGF3YWl0IGlucy5yZWZyZXNoQ3VycmVudEZpbGVUb2tlbnMoKTtcbiAgICAgICAgaW5zLnJlZnJlc2hJbnRlcm5hbExpbmtUb2tlbnMoKTtcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIEF2b2lkIHRvIHJlZmVyIGluY29tcGxldGUgY2FjaGVcbiAgICBjb25zdCBjYWNoZVJlc29sdmVkUmVmID0gYXBwLm1ldGFkYXRhQ2FjaGUub24oXCJyZXNvbHZlZFwiLCAoKSA9PiB7XG4gICAgICBpbnMucmVmcmVzaEludGVybmFsTGlua1Rva2VucygpO1xuICAgICAgaW5zLmFwcC5tZXRhZGF0YUNhY2hlLm9mZnJlZihjYWNoZVJlc29sdmVkUmVmKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnM7XG4gIH1cblxuICBwcmVkaWN0YWJsZUNvbXBsZXRlKCkge1xuICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuYXBwSGVscGVyLmdldEN1cnJlbnRFZGl0b3IoKTtcbiAgICBpZiAoIWVkaXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcbiAgICBjb25zdCBjdXJyZW50VG9rZW4gPSB0aGlzLnRva2VuaXplclxuICAgICAgLnRva2VuaXplKGVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKS5zbGljZSgwLCBjdXJzb3IuY2gpKVxuICAgICAgLmxhc3QoKTtcbiAgICBpZiAoIWN1cnJlbnRUb2tlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzdWdnZXN0aW9uID0gdGhpcy50b2tlbml6ZXJcbiAgICAgIC50b2tlbml6ZShcbiAgICAgICAgZWRpdG9yLmdldFJhbmdlKHsgbGluZTogTWF0aC5tYXgoY3Vyc29yLmxpbmUgLSA1MCwgMCksIGNoOiAwIH0sIGN1cnNvcilcbiAgICAgIClcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5zbGljZSgxKVxuICAgICAgLmZpbmQoKHgpID0+IHguc3RhcnRzV2l0aChjdXJyZW50VG9rZW4pKTtcbiAgICBpZiAoIXN1Z2dlc3Rpb24pIHtcbiAgICAgIHN1Z2dlc3Rpb24gPSB0aGlzLnRva2VuaXplclxuICAgICAgICAudG9rZW5pemUoXG4gICAgICAgICAgZWRpdG9yLmdldFJhbmdlKGN1cnNvciwge1xuICAgICAgICAgICAgbGluZTogTWF0aC5taW4oY3Vyc29yLmxpbmUgKyA1MCwgZWRpdG9yLmxpbmVDb3VudCgpIC0gMSksXG4gICAgICAgICAgICBjaDogMCxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5maW5kKCh4KSA9PiB4LnN0YXJ0c1dpdGgoY3VycmVudFRva2VuKSk7XG4gICAgfVxuICAgIGlmICghc3VnZ2VzdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVkaXRvci5yZXBsYWNlUmFuZ2UoXG4gICAgICBzdWdnZXN0aW9uLFxuICAgICAgeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IGN1cnNvci5jaCAtIGN1cnJlbnRUb2tlbi5sZW5ndGggfSxcbiAgICAgIHsgbGluZTogY3Vyc29yLmxpbmUsIGNoOiBjdXJzb3IuY2ggfVxuICAgICk7XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy5kZWJvdW5jZUNsb3NlKCk7XG4gIH1cblxuICB1bnJlZ2lzdGVyKCkge1xuICAgIHRoaXMuYXBwLnZhdWx0Lm9mZnJlZih0aGlzLm1vZGlmeUV2ZW50UmVmKTtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub2ZmcmVmKHRoaXMuYWN0aXZlTGVhZkNoYW5nZVJlZik7XG4gIH1cblxuICBnZXQgdG9rZW5pemVyU3RyYXRlZ3koKTogVG9rZW5pemVTdHJhdGVneSB7XG4gICAgcmV0dXJuIFRva2VuaXplU3RyYXRlZ3kuZnJvbU5hbWUodGhpcy5zZXR0aW5ncy5zdHJhdGVneSk7XG4gIH1cblxuICBnZXQgbWF0Y2hTdHJhdGVneSgpOiBNYXRjaFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gTWF0Y2hTdHJhdGVneS5mcm9tTmFtZSh0aGlzLnNldHRpbmdzLm1hdGNoU3RyYXRlZ3kpO1xuICB9XG5cbiAgZ2V0IG1pbk51bWJlclRyaWdnZXJlZCgpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNldHRpbmdzLm1pbk51bWJlck9mQ2hhcmFjdGVyc1RyaWdnZXJlZCB8fFxuICAgICAgdGhpcy50b2tlbml6ZXJTdHJhdGVneS50cmlnZ2VyVGhyZXNob2xkXG4gICAgKTtcbiAgfVxuXG4gIGdldCBpbmRleGVkV29yZHMoKTogSW5kZXhlZFdvcmRzIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudEZpbGU6IHRoaXMuY3VycmVudEZpbGVXb3JkUHJvdmlkZXIud29yZHNCeUZpcnN0TGV0dGVyLFxuICAgICAgY3VzdG9tRGljdGlvbmFyeTogdGhpcy5jdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyLndvcmRzQnlGaXJzdExldHRlcixcbiAgICAgIGludGVybmFsTGluazogdGhpcy5pbnRlcm5hbExpbmtXb3JkUHJvdmlkZXIud29yZHNCeUZpcnN0TGV0dGVyLFxuICAgIH07XG4gIH1cblxuICB0b2dnbGVFbmFibGVkKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSAhdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZVNldHRpbmdzKHNldHRpbmdzOiBTZXR0aW5ncykge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLmN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIudXBkYXRlUGF0aHMoXG4gICAgICBzZXR0aW5ncy5jdXN0b21EaWN0aW9uYXJ5UGF0aHMuc3BsaXQoXCJcXG5cIikuZmlsdGVyKCh4KSA9PiB4KVxuICAgICk7XG4gICAgdGhpcy50b2tlbml6ZXIgPSBjcmVhdGVUb2tlbml6ZXIodGhpcy50b2tlbml6ZXJTdHJhdGVneSk7XG4gICAgdGhpcy5jdXJyZW50RmlsZVdvcmRQcm92aWRlciA9IG5ldyBDdXJyZW50RmlsZVdvcmRQcm92aWRlcihcbiAgICAgIHRoaXMuYXBwLFxuICAgICAgdGhpcy5hcHBIZWxwZXIsXG4gICAgICB0aGlzLnRva2VuaXplclxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5yZWZyZXNoQ3VycmVudEZpbGVUb2tlbnMoKTtcbiAgICB0aGlzLmludGVybmFsTGlua1dvcmRQcm92aWRlciA9IG5ldyBJbnRlcm5hbExpbmtXb3JkUHJvdmlkZXIoXG4gICAgICB0aGlzLmFwcCxcbiAgICAgIHRoaXMuYXBwSGVscGVyXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLnJlZnJlc2hJbnRlcm5hbExpbmtUb2tlbnMoKTtcblxuICAgIHRoaXMuZGVib3VuY2VHZXRTdWdnZXN0aW9ucyA9IGRlYm91bmNlKFxuICAgICAgKGNvbnRleHQ6IEVkaXRvclN1Z2dlc3RDb250ZXh0LCBjYjogKHdvcmRzOiBXb3JkW10pID0+IHZvaWQpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgY2IoXG4gICAgICAgICAgdGhpcy5tYXRjaFN0cmF0ZWd5LmhhbmRsZXIoXG4gICAgICAgICAgICB0aGlzLmluZGV4ZWRXb3JkcyxcbiAgICAgICAgICAgIGNvbnRleHQucXVlcnksXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1heE51bWJlck9mU3VnZ2VzdGlvbnNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2hvd0RlYnVnTG9nKFwiR2V0IHN1Z2dlc3Rpb25zXCIsIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnQpO1xuICAgICAgfSxcbiAgICAgIHRoaXMuc2V0dGluZ3MuZGVsYXlNaWxsaVNlY29uZHMsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIHRoaXMuZGVib3VuY2VDbG9zZSA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9LCB0aGlzLnNldHRpbmdzLmRlbGF5TWlsbGlTZWNvbmRzICsgNTApO1xuXG4gICAgdGhpcy5yZWdpc3RlcktleW1hcHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJLZXltYXBzKCkge1xuICAgIC8vIENsZWFyXG4gICAgdGhpcy5rZXltYXBFdmVudEhhbmRsZXIuZm9yRWFjaCgoeCkgPT4gdGhpcy5zY29wZS51bnJlZ2lzdGVyKHgpKTtcbiAgICB0aGlzLmtleW1hcEV2ZW50SGFuZGxlciA9IFtdO1xuXG4gICAgLy8gQ3ljbGUgdGhyb3cgc3VnZ2VzdGlvbnMga2V5c1xuICAgIGNvbnN0IGtleXMgPSBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMuZnJvbU5hbWUoXG4gICAgICB0aGlzLnNldHRpbmdzLmFkZGl0aW9uYWxDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXNcbiAgICApO1xuICAgIGlmIChrZXlzICE9PSBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMuTk9ORSkge1xuICAgICAgdGhpcy5rZXltYXBFdmVudEhhbmRsZXIucHVzaChcbiAgICAgICAgdGhpcy5zY29wZS5yZWdpc3RlcihrZXlzLm5leHRLZXkubW9kaWZpZXJzLCBrZXlzLm5leHRLZXkua2V5LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWdnZXN0aW9ucy5zZXRTZWxlY3RlZEl0ZW0oXG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zLnNlbGVjdGVkSXRlbSArIDEsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLnNjb3BlLnJlZ2lzdGVyKFxuICAgICAgICAgIGtleXMucHJldmlvdXNLZXkubW9kaWZpZXJzLFxuICAgICAgICAgIGtleXMucHJldmlvdXNLZXkua2V5LFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMuc2V0U2VsZWN0ZWRJdGVtKFxuICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zLnNlbGVjdGVkSXRlbSAtIDEsXG4gICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIElnbm9yZSBpZiBhZGRpdGlvbmFsQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzIHVzZXNcbiAgICB0aGlzLmtleW1hcEV2ZW50SGFuZGxlci5wdXNoKFxuICAgICAgdGhpcy5zY29wZS5yZWdpc3RlcihbXSwgXCJUYWJcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zLnVzZVNlbGVjdGVkSXRlbSh7fSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIG92ZXJ3cml0ZVxuICAgIHRoaXMuc2NvcGUua2V5cy5maW5kKCh4KSA9PiB4LmtleSA9PT0gXCJFc2NhcGVcIikhLmZ1bmMgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5wcm9wYWdhdGVFc2M7XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHJlZnJlc2hDdXJyZW50RmlsZVRva2VucygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmVuYWJsZUN1cnJlbnRGaWxlQ29tcGxlbWVudCkge1xuICAgICAgdGhpcy5jdXJyZW50RmlsZVdvcmRQcm92aWRlci5jbGVhcldvcmRzKCk7XG4gICAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcbiAgICAgICAgXCLwn5GiIFNraXA6IEluZGV4IGN1cnJlbnQgZmlsZSB0b2tlbnNcIixcbiAgICAgICAgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmN1cnJlbnRGaWxlV29yZFByb3ZpZGVyLnJlZnJlc2hXb3JkcyhcbiAgICAgIHRoaXMuc2V0dGluZ3Mub25seUNvbXBsZW1lbnRFbmdsaXNoT25DdXJyZW50RmlsZUNvbXBsZW1lbnRcbiAgICApO1xuICAgIHRoaXMuc2hvd0RlYnVnTG9nKFwiSW5kZXggY3VycmVudCBmaWxlIHRva2Vuc1wiLCBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0KTtcbiAgfVxuXG4gIGFzeW5jIHJlZnJlc2hDdXN0b21EaWN0aW9uYXJ5VG9rZW5zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZW5hYmxlQ3VzdG9tRGljdGlvbmFyeUNvbXBsZW1lbnQpIHtcbiAgICAgIHRoaXMuY3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlci5jbGVhcldvcmRzKCk7XG4gICAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcbiAgICAgICAgXCLwn5GiU2tpcDogSW5kZXggY3VzdG9tIGRpY3Rpb25hcnkgdG9rZW5zXCIsXG4gICAgICAgIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5jdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyLnJlZnJlc2hDdXN0b21Xb3JkcygpO1xuICAgIHRoaXMuc2hvd0RlYnVnTG9nKFxuICAgICAgXCJJbmRleCBjdXN0b20gZGljdGlvbmFyeSB0b2tlbnNcIixcbiAgICAgIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRcbiAgICApO1xuICB9XG5cbiAgcmVmcmVzaEludGVybmFsTGlua1Rva2VucygpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmVuYWJsZUludGVybmFsTGlua0NvbXBsZW1lbnQpIHtcbiAgICAgIHRoaXMuaW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyLmNsZWFyV29yZHMoKTtcbiAgICAgIHRoaXMuc2hvd0RlYnVnTG9nKFxuICAgICAgICBcIvCfkaJTa2lwOiBJbmRleCBpbnRlcm5hbCBsaW5rIHRva2Vuc1wiLFxuICAgICAgICBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0XG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyLnJlZnJlc2hXb3JkcygpO1xuICAgIHRoaXMuc2hvd0RlYnVnTG9nKFwiSW5kZXggaW50ZXJuYWwgbGluayB0b2tlbnNcIiwgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydCk7XG4gIH1cblxuICBvblRyaWdnZXIoXG4gICAgY3Vyc29yOiBFZGl0b3JQb3NpdGlvbixcbiAgICBlZGl0b3I6IEVkaXRvcixcbiAgICBmaWxlOiBURmlsZVxuICApOiBFZGl0b3JTdWdnZXN0VHJpZ2dlckluZm8gfCBudWxsIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5zZXR0aW5ncy5kaXNhYmxlU3VnZ2VzdGlvbnNEdXJpbmdJbWVPbiAmJlxuICAgICAgdGhpcy5hcHBIZWxwZXIuaXNJTUVPbigpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50Q2hhciA9IGVkaXRvci5nZXRSYW5nZShcbiAgICAgIHsgbGluZTogY3Vyc29yLmxpbmUsIGNoOiBjdXJzb3IuY2ggLSAxIH0sXG4gICAgICBjdXJzb3JcbiAgICApO1xuICAgIGlmIChjdXJyZW50Q2hhciA9PT0gXCIgXCIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VucyA9IHRoaXMudG9rZW5pemVyLnRva2VuaXplKFxuICAgICAgZWRpdG9yLmdldExpbmUoY3Vyc29yLmxpbmUpLnNsaWNlKDAsIGN1cnNvci5jaCksXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICBjb25zdCBjdXJyZW50VG9rZW4gPSB0b2tlbnMubGFzdCgpO1xuICAgIGlmICghY3VycmVudFRva2VuIHx8IGN1cnJlbnRUb2tlbi5sZW5ndGggPCB0aGlzLm1pbk51bWJlclRyaWdnZXJlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChjdXJyZW50VG9rZW5bMF0ubWF0Y2godGhpcy50b2tlbml6ZXIuZ2V0VHJpbVBhdHRlcm4oKSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy50b2tlbml6ZXIuc2hvdWxkSWdub3JlKGN1cnJlbnRUb2tlbikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdGFydDoge1xuICAgICAgICBjaDogY3Vyc29yLmNoIC0gY3VycmVudFRva2VuLmxlbmd0aCxcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICB9LFxuICAgICAgZW5kOiBjdXJzb3IsXG4gICAgICBxdWVyeTogY3VycmVudFRva2VuLFxuICAgIH07XG4gIH1cblxuICBnZXRTdWdnZXN0aW9ucyhjb250ZXh0OiBFZGl0b3JTdWdnZXN0Q29udGV4dCk6IFdvcmRbXSB8IFByb21pc2U8V29yZFtdPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmRlYm91bmNlR2V0U3VnZ2VzdGlvbnMoY29udGV4dCwgKHdvcmRzKSA9PiB7XG4gICAgICAgIHJlc29sdmUod29yZHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJTdWdnZXN0aW9uKHdvcmQ6IFdvcmQsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2UgPSBjcmVhdGVEaXYoKTtcbiAgICBjb25zdCB0ZXh0ID0gd29yZC5pbnRlcm5hbExpbmsgPyBgW1ske3dvcmQudmFsdWV9XV1gIDogd29yZC52YWx1ZTtcbiAgICBiYXNlLmNyZWF0ZURpdih7XG4gICAgICB0ZXh0OlxuICAgICAgICB0aGlzLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24gJiZcbiAgICAgICAgdGV4dC5pbmNsdWRlcyh0aGlzLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24pXG4gICAgICAgICAgPyBgJHt0ZXh0LnNwbGl0KHRoaXMuc2V0dGluZ3MuZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbilbMF19IC4uLmBcbiAgICAgICAgICA6IHRleHQsXG4gICAgfSk7XG5cbiAgICBpZiAod29yZC5kZXNjcmlwdGlvbikge1xuICAgICAgYmFzZS5jcmVhdGVEaXYoe1xuICAgICAgICBjbHM6IFwidmFyaW91cy1jb21wbGVtZW50c19fc3VnZ2VzdF9fZGVzY3JpcHRpb25cIixcbiAgICAgICAgdGV4dDogYCR7d29yZC5kZXNjcmlwdGlvbn1gLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWwuYXBwZW5kQ2hpbGQoYmFzZSk7XG4gIH1cblxuICBzZWxlY3RTdWdnZXN0aW9uKHdvcmQ6IFdvcmQsIGV2dDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICBsZXQgaW5zZXJ0ZWRUZXh0ID0gd29yZC52YWx1ZTtcbiAgICAgIGlmICh3b3JkLmludGVybmFsTGluaykge1xuICAgICAgICBpbnNlcnRlZFRleHQgPSBgW1ske2luc2VydGVkVGV4dH1dXWA7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pbnNlcnRBZnRlckNvbXBsZXRpb24pIHtcbiAgICAgICAgaW5zZXJ0ZWRUZXh0ID0gYCR7aW5zZXJ0ZWRUZXh0fSBgO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbikge1xuICAgICAgICBpbnNlcnRlZFRleHQgPSBpbnNlcnRlZFRleHQucmVwbGFjZShcbiAgICAgICAgICB0aGlzLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24sXG4gICAgICAgICAgXCJcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaW5zZXJ0ZWRUZXh0ID0gaW5zZXJ0ZWRUZXh0XG4gICAgICAgIC5yZXBsYWNlKC8oPzwhXFxcXClcXFxcbi9nLCBcIlxcblwiKVxuICAgICAgICAucmVwbGFjZSgvKD88IVxcXFwpXFxcXHQvZywgXCJcXHRcIilcbiAgICAgICAgLnJlcGxhY2UoL1xcXFxcXFxcL2csIFwiXFxcXFwiKTtcblxuICAgICAgY29uc3QgY2FyZXQgPSB0aGlzLnNldHRpbmdzLmNhcmV0TG9jYXRpb25TeW1ib2xBZnRlckNvbXBsZW1lbnQ7XG4gICAgICBjb25zdCBwb3NpdGlvblRvTW92ZSA9IGNhcmV0ID8gaW5zZXJ0ZWRUZXh0LmluZGV4T2YoY2FyZXQpIDogLTE7XG4gICAgICBpZiAocG9zaXRpb25Ub01vdmUgIT09IC0xKSB7XG4gICAgICAgIGluc2VydGVkVGV4dCA9IGluc2VydGVkVGV4dC5yZXBsYWNlKGNhcmV0LCBcIlwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5jb250ZXh0LmVkaXRvcjtcbiAgICAgIGVkaXRvci5yZXBsYWNlUmFuZ2UoaW5zZXJ0ZWRUZXh0LCB0aGlzLmNvbnRleHQuc3RhcnQsIHRoaXMuY29udGV4dC5lbmQpO1xuXG4gICAgICBpZiAocG9zaXRpb25Ub01vdmUgIT09IC0xKSB7XG4gICAgICAgIGVkaXRvci5zZXRDdXJzb3IoXG4gICAgICAgICAgZWRpdG9yLm9mZnNldFRvUG9zKFxuICAgICAgICAgICAgZWRpdG9yLnBvc1RvT2Zmc2V0KGVkaXRvci5nZXRDdXJzb3IoKSkgLVxuICAgICAgICAgICAgICBpbnNlcnRlZFRleHQubGVuZ3RoICtcbiAgICAgICAgICAgICAgcG9zaXRpb25Ub01vdmVcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHRoaXMuZGVib3VuY2VDbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd0RlYnVnTG9nKG1lc3NhZ2U6IHN0cmluZywgbXNlYzogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd0xvZ0Fib3V0UGVyZm9ybWFuY2VJbkNvbnNvbGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAke21lc3NhZ2V9OiAke01hdGgucm91bmQobXNlYyl9W21zXWApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBwLCBOb3RpY2UsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBWYXJpb3VzQ29tcG9uZW50cyBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBUb2tlbml6ZVN0cmF0ZWd5IH0gZnJvbSBcIi4vdG9rZW5pemVyL1Rva2VuaXplU3RyYXRlZ3lcIjtcbmltcG9ydCB7IE1hdGNoU3RyYXRlZ3kgfSBmcm9tIFwiLi9wcm92aWRlci9NYXRjaFN0cmF0ZWd5XCI7XG5pbXBvcnQgeyBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMgfSBmcm9tIFwiLi9DeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5ncyB7XG4gIHN0cmF0ZWd5OiBzdHJpbmc7XG4gIG1hdGNoU3RyYXRlZ3k6IHN0cmluZztcbiAgbWF4TnVtYmVyT2ZTdWdnZXN0aW9uczogbnVtYmVyO1xuICBtaW5OdW1iZXJPZkNoYXJhY3RlcnNUcmlnZ2VyZWQ6IG51bWJlcjtcbiAgZGVsYXlNaWxsaVNlY29uZHM6IG51bWJlcjtcbiAgY3VzdG9tRGljdGlvbmFyeVBhdGhzOiBzdHJpbmc7XG4gIHByb3BhZ2F0ZUVzYzogYm9vbGVhbjtcbiAgZW5hYmxlQ3VycmVudEZpbGVDb21wbGVtZW50OiBib29sZWFuO1xuICBlbmFibGVDdXN0b21EaWN0aW9uYXJ5Q29tcGxlbWVudDogYm9vbGVhbjtcbiAgZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudDogYm9vbGVhbjtcbiAgZGlzYWJsZVN1Z2dlc3Rpb25zRHVyaW5nSW1lT246IGJvb2xlYW47XG4gIHNob3dMb2dBYm91dFBlcmZvcm1hbmNlSW5Db25zb2xlOiBib29sZWFuO1xuICBpbnNlcnRBZnRlckNvbXBsZXRpb246IGJvb2xlYW47XG4gIGRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb246IHN0cmluZztcbiAgY2FyZXRMb2NhdGlvblN5bWJvbEFmdGVyQ29tcGxlbWVudDogc3RyaW5nO1xuICBhZGRpdGlvbmFsQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzOiBzdHJpbmc7XG4gIG9ubHlDb21wbGVtZW50RW5nbGlzaE9uQ3VycmVudEZpbGVDb21wbGVtZW50OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogU2V0dGluZ3MgPSB7XG4gIHN0cmF0ZWd5OiBcImRlZmF1bHRcIixcbiAgbWF0Y2hTdHJhdGVneTogXCJwcmVmaXhcIixcbiAgbWF4TnVtYmVyT2ZTdWdnZXN0aW9uczogNSxcbiAgbWluTnVtYmVyT2ZDaGFyYWN0ZXJzVHJpZ2dlcmVkOiAwLFxuICBkZWxheU1pbGxpU2Vjb25kczogMCxcbiAgY3VzdG9tRGljdGlvbmFyeVBhdGhzOiBcIlwiLFxuICBwcm9wYWdhdGVFc2M6IGZhbHNlLFxuICBlbmFibGVDdXJyZW50RmlsZUNvbXBsZW1lbnQ6IHRydWUsXG4gIGVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50OiBmYWxzZSxcbiAgZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudDogdHJ1ZSxcbiAgZGlzYWJsZVN1Z2dlc3Rpb25zRHVyaW5nSW1lT246IGZhbHNlLFxuICBzaG93TG9nQWJvdXRQZXJmb3JtYW5jZUluQ29uc29sZTogZmFsc2UsXG4gIGluc2VydEFmdGVyQ29tcGxldGlvbjogdHJ1ZSxcbiAgZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbjogXCJcIixcbiAgY2FyZXRMb2NhdGlvblN5bWJvbEFmdGVyQ29tcGxlbWVudDogXCJcIixcbiAgYWRkaXRpb25hbEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5czogXCJOb25lXCIsXG4gIG9ubHlDb21wbGVtZW50RW5nbGlzaE9uQ3VycmVudEZpbGVDb21wbGVtZW50OiBmYWxzZSxcbn07XG5cbmV4cG9ydCBjbGFzcyBWYXJpb3VzQ29tcGxlbWVudHNTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHBsdWdpbjogVmFyaW91c0NvbXBvbmVudHM7XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogVmFyaW91c0NvbXBvbmVudHMpIHtcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGxldCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlZhcmlvdXMgQ29tcGxlbWVudHMgLSBTZXR0aW5nc1wiIH0pO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiTWFpblwiIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpLnNldE5hbWUoXCJTdHJhdGVneVwiKS5hZGREcm9wZG93bigodGMpID0+XG4gICAgICB0Y1xuICAgICAgICAuYWRkT3B0aW9ucyhcbiAgICAgICAgICBUb2tlbml6ZVN0cmF0ZWd5LnZhbHVlcygpLnJlZHVjZShcbiAgICAgICAgICAgIChwLCBjKSA9PiAoeyAuLi5wLCBbYy5uYW1lXTogYy5uYW1lIH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN0cmF0ZWd5KVxuICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RyYXRlZ3kgPSB2YWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoeyBjdXJyZW50RmlsZTogdHJ1ZSB9KTtcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpLnNldE5hbWUoXCJNYXRjaCBzdHJhdGVneVwiKS5hZGREcm9wZG93bigodGMpID0+XG4gICAgICB0Y1xuICAgICAgICAuYWRkT3B0aW9ucyhcbiAgICAgICAgICBNYXRjaFN0cmF0ZWd5LnZhbHVlcygpLnJlZHVjZShcbiAgICAgICAgICAgIChwLCBjKSA9PiAoeyAuLi5wLCBbYy5uYW1lXTogYy5uYW1lIH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1hdGNoU3RyYXRlZ3kpXG4gICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXRjaFN0cmF0ZWd5ID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKHsgY3VycmVudEZpbGU6IHRydWUgfSk7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubWF0Y2hTdHJhdGVneSA9PT0gTWF0Y2hTdHJhdGVneS5QQVJUSUFMLm5hbWUpIHtcbiAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgdGV4dDogXCLimqAgYHBhcnRpYWxgIGlzIG1vcmUgdGhhbiAxMCB0aW1lcyBzbG93ZXIgdGhhbiBgcHJlZml4YFwiLFxuICAgICAgICBjbHM6IFwidmFyaW91cy1jb21wbGVtZW50c19fc2V0dGluZ3NfX3dhcm5pbmdcIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJNYXggbnVtYmVyIG9mIHN1Z2dlc3Rpb25zXCIpXG4gICAgICAuYWRkU2xpZGVyKChzYykgPT5cbiAgICAgICAgc2NcbiAgICAgICAgICAuc2V0TGltaXRzKDEsIDI1NSwgMSlcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubWF4TnVtYmVyT2ZTdWdnZXN0aW9ucylcbiAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1heE51bWJlck9mU3VnZ2VzdGlvbnMgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIk1pbiBudW1iZXIgb2YgY2hhcmFjdGVycyBmb3IgdHJpZ2dlclwiKVxuICAgICAgLnNldERlc2MoXCJJdCB1c2VzIGEgZGVmYXVsdCB2YWx1ZSBvZiBTdHJhdGVneSBpZiBzZXQgMC5cIilcbiAgICAgIC5hZGRTbGlkZXIoKHNjKSA9PlxuICAgICAgICBzY1xuICAgICAgICAgIC5zZXRMaW1pdHMoMCwgMTAsIDEpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1pbk51bWJlck9mQ2hhcmFjdGVyc1RyaWdnZXJlZClcbiAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1pbk51bWJlck9mQ2hhcmFjdGVyc1RyaWdnZXJlZCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRGVsYXkgbWlsbGktc2Vjb25kcyBmb3IgdHJpZ2dlclwiKVxuICAgICAgLmFkZFNsaWRlcigoc2MpID0+XG4gICAgICAgIHNjXG4gICAgICAgICAgLnNldExpbWl0cygwLCAxMDAwLCAxMClcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsYXlNaWxsaVNlY29uZHMpXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheU1pbGxpU2Vjb25kcyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRGlzYWJsZSBzdWdnZXN0aW9ucyBkdXJpbmcgSU1FIG9uXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZShcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlU3VnZ2VzdGlvbnNEdXJpbmdJbWVPblxuICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVTdWdnZXN0aW9uc0R1cmluZ0ltZU9uID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiSW5zZXJ0IHNwYWNlIGFmdGVyIGNvbXBsZXRpb25cIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmluc2VydEFmdGVyQ29tcGxldGlvbikub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbnNlcnRBZnRlckNvbXBsZXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlByb3BhZ2F0ZSBFU0NcIilcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICBcIkl0IGlzIGhhbmR5IGlmIHlvdSB1c2UgVmltIG1vZGUgYmVjYXVzZSB5b3UgY2FuIHN3aXRjaCB0byBOb3JtYWwgbW9kZSBieSBvbmUgRVNDLCB3aGV0aGVyIGl0IHNob3dzIHN1Z2dlc3Rpb25zIG9yIG5vdC5cIlxuICAgICAgKVxuICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgdGMuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvcGFnYXRlRXNjKS5vbkNoYW5nZShcbiAgICAgICAgICBhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnByb3BhZ2F0ZUVzYyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQWRkaXRpb25hbCBjeWNsZSB0aHJvdWdoIHN1Z2dlc3Rpb25zIGtleXNcIilcbiAgICAgIC5hZGREcm9wZG93bigodGMpID0+XG4gICAgICAgIHRjXG4gICAgICAgICAgLmFkZE9wdGlvbnMoXG4gICAgICAgICAgICBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMudmFsdWVzKCkucmVkdWNlKFxuICAgICAgICAgICAgICAocCwgYykgPT4gKHsgLi4ucCwgW2MubmFtZV06IGMubmFtZSB9KSxcbiAgICAgICAgICAgICAge31cbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZGl0aW9uYWxDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYWRkaXRpb25hbEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJDdXJyZW50IGZpbGUgY29tcGxlbWVudFwiIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkVuYWJsZSBDdXJyZW50IGZpbGUgY29tcGxlbWVudFwiKVxuICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgdGMuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQ3VycmVudEZpbGVDb21wbGVtZW50KS5vbkNoYW5nZShcbiAgICAgICAgICBhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1cnJlbnRGaWxlQ29tcGxlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKHsgY3VycmVudEZpbGU6IHRydWUgfSk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVDdXJyZW50RmlsZUNvbXBsZW1lbnQpIHtcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIk9ubHkgY29tcGxlbWVudCBFbmdsaXNoIG9uIGN1cnJlbnQgZmlsZSBjb21wbGVtZW50XCIpXG4gICAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgICAgdGMuc2V0VmFsdWUoXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vbmx5Q29tcGxlbWVudEVuZ2xpc2hPbkN1cnJlbnRGaWxlQ29tcGxlbWVudFxuICAgICAgICAgICkub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vbmx5Q29tcGxlbWVudEVuZ2xpc2hPbkN1cnJlbnRGaWxlQ29tcGxlbWVudCA9XG4gICAgICAgICAgICAgIHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKHsgY3VycmVudEZpbGU6IHRydWUgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIkN1c3RvbSBkaWN0aW9uYXJ5IGNvbXBsZW1lbnRcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJFbmFibGUgQ3VzdG9tIGRpY3Rpb25hcnkgY29tcGxlbWVudFwiKVxuICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgdGMuc2V0VmFsdWUoXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQ3VzdG9tRGljdGlvbmFyeUNvbXBsZW1lbnRcbiAgICAgICAgKS5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVDdXN0b21EaWN0aW9uYXJ5Q29tcGxlbWVudCA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncyh7IGN1c3RvbURpY3Rpb25hcnk6IHRydWUgfSk7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQ3VzdG9tRGljdGlvbmFyeUNvbXBsZW1lbnQpIHtcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIkN1c3RvbSBkaWN0aW9uYXJ5IHBhdGhzXCIpXG4gICAgICAgIC5zZXREZXNjKFwiRm9yIGVhY2ggbGluZSwgc3BlY2lmeSBhIHJlbGF0aXZlIHBhdGggZnJvbSBWYXVsdCByb290LlwiKVxuICAgICAgICAuYWRkVGV4dEFyZWEoKHRhYykgPT4ge1xuICAgICAgICAgIGNvbnN0IGVsID0gdGFjXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY3VzdG9tRGljdGlvbmFyeVBhdGhzKVxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZGljdGlvbmFyeS5tZFwiKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jdXN0b21EaWN0aW9uYXJ5UGF0aHMgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBlbC5pbnB1dEVsLmNsYXNzTmFtZSA9XG4gICAgICAgICAgICBcInZhcmlvdXMtY29tcGxlbWVudHNfX3NldHRpbmdzX19jdXN0b20tZGljdGlvbmFyeS1wYXRoc1wiO1xuICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfSk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIkRlbGltaXRlciB0byBoaWRlIGEgc3VnZ2VzdGlvblwiKVxuICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICBcIklmIHNldCAnOzs7JywgJ2FiY2Q7OztlZmcnIGlzIHNob3duIGFzICdhYmNkJyBvbiBzdWdnZXN0aW9ucywgYnV0IGNvbXBsZW1lbnRzIHRvICdhYmNkZWZnJy5cIlxuICAgICAgICApXG4gICAgICAgIC5hZGRUZXh0KChjYikgPT4ge1xuICAgICAgICAgIGNiLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24pLm9uQ2hhbmdlKFxuICAgICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIkNhcmV0IGxvY2F0aW9uIHN5bWJvbCBhZnRlciBjb21wbGVtZW50XCIpXG4gICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgIFwiSWYgc2V0ICc8Q0FSRVQ+JyBhbmQgdGhlcmUgaXMgJzxsaT48Q0FSRVQ+PC9saT4nIGluIGN1c3RvbSBkaWN0aW9uYXJ5LCBpdCBjb21wbGVtZW50cyAnPGxpPjwvbGk+JyBhbmQgbW92ZSBhIGNhcmV0IHdoZXJlIGJldHdlZW4gJzxsaT4nIGFuZCBgPC9saT5gLlwiXG4gICAgICAgIClcbiAgICAgICAgLmFkZFRleHQoKGNiKSA9PiB7XG4gICAgICAgICAgY2Iuc2V0VmFsdWUoXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jYXJldExvY2F0aW9uU3ltYm9sQWZ0ZXJDb21wbGVtZW50XG4gICAgICAgICAgKS5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNhcmV0TG9jYXRpb25TeW1ib2xBZnRlckNvbXBsZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJJbnRlcm5hbCBsaW5rIGNvbXBsZW1lbnRcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJFbmFibGUgSW50ZXJuYWwgbGluayBjb21wbGVtZW50XCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVJbnRlcm5hbExpbmtDb21wbGVtZW50KS5vbkNoYW5nZShcbiAgICAgICAgICBhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUludGVybmFsTGlua0NvbXBsZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncyh7IGludGVybmFsTGluazogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIkRlYnVnXCIgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiU2hvdyBsb2cgYWJvdXQgcGVyZm9ybWFuY2UgaW4gYSBjb25zb2xlXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZShcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93TG9nQWJvdXRQZXJmb3JtYW5jZUluQ29uc29sZVxuICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dMb2dBYm91dFBlcmZvcm1hbmNlSW5Db25zb2xlID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBhc3luYyB0b2dnbGVNYXRjaFN0cmF0ZWd5KCkge1xuICAgIHN3aXRjaCAodGhpcy5wbHVnaW4uc2V0dGluZ3MubWF0Y2hTdHJhdGVneSkge1xuICAgICAgY2FzZSBcInByZWZpeFwiOlxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXRjaFN0cmF0ZWd5ID0gXCJwYXJ0aWFsXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInBhcnRpYWxcIjpcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWF0Y2hTdHJhdGVneSA9IFwicHJlZml4XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIE9iamVjdEFsbG9jYXRpb25JZ25vcmVkXG4gICAgICAgIG5ldyBOb3RpY2UoXCLimqBVbmV4cGVjdGVkIGVycm9yXCIpO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTm90aWNlLCBQbHVnaW4gfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IEF1dG9Db21wbGV0ZVN1Z2dlc3QgfSBmcm9tIFwiLi91aS9BdXRvQ29tcGxldGVTdWdnZXN0XCI7XG5pbXBvcnQge1xuICBERUZBVUxUX1NFVFRJTkdTLFxuICBTZXR0aW5ncyxcbiAgVmFyaW91c0NvbXBsZW1lbnRzU2V0dGluZ1RhYixcbn0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaW91c0NvbXBvbmVudHMgZXh0ZW5kcyBQbHVnaW4ge1xuICBzZXR0aW5nczogU2V0dGluZ3M7XG4gIHNldHRpbmdUYWI6IFZhcmlvdXNDb21wbGVtZW50c1NldHRpbmdUYWI7XG4gIHN1Z2dlc3RlcjogQXV0b0NvbXBsZXRlU3VnZ2VzdDtcblxuICBvbnVubG9hZCgpIHtcbiAgICBzdXBlci5vbnVubG9hZCgpO1xuICAgIHRoaXMuc3VnZ2VzdGVyLnVucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIGFzeW5jIG9ubG9hZCgpIHtcbiAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG4gICAgdGhpcy5zZXR0aW5nVGFiID0gbmV3IFZhcmlvdXNDb21wbGVtZW50c1NldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpO1xuICAgIHRoaXMuYWRkU2V0dGluZ1RhYih0aGlzLnNldHRpbmdUYWIpO1xuXG4gICAgdGhpcy5zdWdnZXN0ZXIgPSBhd2FpdCBBdXRvQ29tcGxldGVTdWdnZXN0Lm5ldyh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncyk7XG4gICAgdGhpcy5yZWdpc3RlckVkaXRvclN1Z2dlc3QodGhpcy5zdWdnZXN0ZXIpO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcInJlbG9hZC1jdXN0b20tZGljdGlvbmFyaWVzXCIsXG4gICAgICBuYW1lOiBcIlJlbG9hZCBjdXN0b20gZGljdGlvbmFyaWVzXCIsXG4gICAgICBob3RrZXlzOiBbeyBtb2RpZmllcnM6IFtcIk1vZFwiLCBcIlNoaWZ0XCJdLCBrZXk6IFwiclwiIH1dLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWxvYWRDdXN0b21EaWN0aW9uYXJpZXMoKTtcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIE9iamVjdEFsbG9jYXRpb25JZ25vcmVkXG4gICAgICAgIG5ldyBOb3RpY2UoYEZpbmlzaCByZWxvYWQgY3VzdG9tIGRpY3Rpb25hcmllc2ApO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJ0b2dnbGUtYXV0by1jb21wbGV0ZVwiLFxuICAgICAgbmFtZTogXCJUb2dnbGUgQXV0by1jb21wbGV0ZVwiLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zdWdnZXN0ZXIudG9nZ2xlRW5hYmxlZCgpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJ0b2dnbGUtbWF0Y2gtc3RyYXRlZ3lcIixcbiAgICAgIG5hbWU6IFwiVG9nZ2xlIE1hdGNoIHN0cmF0ZWd5XCIsXG4gICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnNldHRpbmdUYWIudG9nZ2xlTWF0Y2hTdHJhdGVneSgpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJzaG93LXN1Z2dlc3Rpb25zXCIsXG4gICAgICBuYW1lOiBcIlNob3cgc3VnZ2VzdGlvbnNcIixcbiAgICAgIGhvdGtleXM6IFt7IG1vZGlmaWVyczogW1wiTW9kXCJdLCBrZXk6IFwiIFwiIH1dLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5zdWdnZXN0ZXIudHJpZ2dlckNvbXBsZXRlKCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcInByZWRpY3RhYmxlLWNvbXBsZW1lbnRzXCIsXG4gICAgICBuYW1lOiBcIlByZWRpY3RhYmxlIGNvbXBsZW1lbnRcIixcbiAgICAgIGhvdGtleXM6IFt7IG1vZGlmaWVyczogW1wiU2hpZnRcIl0sIGtleTogXCIgXCIgfV0sXG4gICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLnN1Z2dlc3Rlci5wcmVkaWN0YWJsZUNvbXBsZXRlKCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7IC4uLkRFRkFVTFRfU0VUVElOR1MsIC4uLihhd2FpdCB0aGlzLmxvYWREYXRhKCkpIH07XG4gIH1cblxuICBhc3luYyBzYXZlU2V0dGluZ3MoXG4gICAgbmVlZFVwZGF0ZVRva2Vuczoge1xuICAgICAgY3VycmVudEZpbGU/OiBib29sZWFuO1xuICAgICAgY3VzdG9tRGljdGlvbmFyeT86IGJvb2xlYW47XG4gICAgICBpbnRlcm5hbExpbms/OiBib29sZWFuO1xuICAgIH0gPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICAgIGF3YWl0IHRoaXMuc3VnZ2VzdGVyLnVwZGF0ZVNldHRpbmdzKHRoaXMuc2V0dGluZ3MpO1xuICAgIGlmIChuZWVkVXBkYXRlVG9rZW5zLmN1cnJlbnRGaWxlKSB7XG4gICAgICBhd2FpdCB0aGlzLnN1Z2dlc3Rlci5yZWZyZXNoQ3VycmVudEZpbGVUb2tlbnMoKTtcbiAgICB9XG4gICAgaWYgKG5lZWRVcGRhdGVUb2tlbnMuY3VzdG9tRGljdGlvbmFyeSkge1xuICAgICAgYXdhaXQgdGhpcy5zdWdnZXN0ZXIucmVmcmVzaEN1c3RvbURpY3Rpb25hcnlUb2tlbnMoKTtcbiAgICB9XG4gICAgaWYgKG5lZWRVcGRhdGVUb2tlbnMuaW50ZXJuYWxMaW5rKSB7XG4gICAgICBhd2FpdCB0aGlzLnN1Z2dlc3Rlci5yZWZyZXNoSW50ZXJuYWxMaW5rVG9rZW5zKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVsb2FkQ3VzdG9tRGljdGlvbmFyaWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuc3VnZ2VzdGVyLnJlZnJlc2hDdXN0b21EaWN0aW9uYXJ5VG9rZW5zKCk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJwYXJzZUZyb250TWF0dGVyQWxpYXNlcyIsIk1hcmtkb3duVmlldyIsIk5vdGljZSIsIkVkaXRvclN1Z2dlc3QiLCJkZWJvdW5jZSIsIlBsdWdpblNldHRpbmdUYWIiLCJTZXR0aW5nIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUDs7QUMzRUEsU0FBUyxVQUFVLENBQUMsT0FBZSxFQUFFLFdBQW1CO0lBQ3RELE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFTSxNQUFNLGlCQUFpQixHQUFHLGtDQUFrQyxDQUFDO01BQ3ZELGdCQUFnQjtJQUMzQixRQUFRLENBQUMsT0FBZSxFQUFFLEdBQWE7UUFDckMsT0FBTyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDaEU7SUFFRCxjQUFjO1FBQ1osT0FBTyxpQkFBaUIsQ0FBQztLQUMxQjtJQUVELFlBQVksQ0FBQyxHQUFXO1FBQ3RCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7OztBQ2hCSCxNQUFNLHdCQUF3QixHQUFHLG9DQUFvQyxDQUFDO01BQ3pELGVBQWdCLFNBQVEsZ0JBQWdCO0lBQ25ELGNBQWM7UUFDWixPQUFPLHdCQUF3QixDQUFDO0tBQ2pDOzs7QUNOSDtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLFNBQVMsYUFBYTtJQUNwQixJQUFJLFFBQVEsR0FBRztRQUNiLG1CQUFtQixFQUFFLEdBQUc7UUFDeEIsV0FBVyxFQUFFLEdBQUc7UUFDaEIsT0FBTyxFQUFFLEdBQUc7UUFDWixhQUFhLEVBQUUsR0FBRztRQUNsQixnQkFBZ0IsRUFBRSxHQUFHO1FBQ3JCLFVBQVUsRUFBRSxHQUFHO0tBQ2hCLENBQUM7SUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNwQixLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtRQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1QztJQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JELElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztLQUNSLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsRUFBRTtRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxJQUFJO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxLQUFLO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLEtBQUs7UUFDWCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLEdBQUc7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixJQUFJLEVBQUUsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsSUFBSSxFQUFFLENBQUMsS0FBSztRQUNaLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsS0FBSztRQUNaLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxLQUFLO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsS0FBSztRQUNWLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULElBQUksRUFBRSxDQUFDLEdBQUc7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7S0FDUixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7S0FDVCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsRUFBRTtLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRztLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxJQUFJO0tBQ1osQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsS0FBSyxFQUFFLENBQUMsR0FBRztRQUNYLEtBQUssRUFBRSxDQUFDLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLElBQUk7UUFDWCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtLQUNSLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsRUFBRSxFQUFFLEVBQUU7UUFDTixFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ1AsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNQLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxFQUFFO1FBQ04sRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxLQUFLO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsQ0FBQyxFQUFFLEdBQUc7UUFDTixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7S0FDUCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sRUFBRSxFQUFFLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7S0FDUCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULENBQUMsRUFBRSxJQUFJO1FBQ1AsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEtBQUs7UUFDVCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsS0FBSztRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLENBQUMsRUFBRSxDQUFDLEtBQUs7UUFDVCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsS0FBSztRQUNULENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtLQUNULENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxFQUFFLEVBQUUsQ0FBQyxLQUFLO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztLQUNSLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztLQUNSLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxhQUFhLENBQUMsU0FBUyxDQUFD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LEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7UUFFNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pELEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNaLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNWLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDVDtRQUNELEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDUixFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ1IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNQLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEI7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7O0FDNzlDRDtBQUNBLE1BQU0sU0FBUyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7QUFFdEMsU0FBUyxvQkFBb0IsQ0FBQyxPQUFlLEVBQUUsV0FBbUI7SUFDaEUsT0FBTyxPQUFPO1NBQ1gsS0FBSyxDQUFDLFdBQVcsQ0FBQztTQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QixPQUFPLENBQVMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRDs7O01BR2EsaUJBQWlCO0lBQzVCLFFBQVEsQ0FBQyxPQUFlLEVBQUUsR0FBYTtRQUNyQyxPQUFPLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0tBQzFFO0lBRUQsY0FBYztRQUNaLE9BQU8saUJBQWlCLENBQUM7S0FDMUI7SUFFRCxZQUFZLENBQUMsR0FBVztRQUN0QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztLQUNqRDs7O1NDaEJhLGVBQWUsQ0FBQyxRQUEwQjtJQUN4RCxRQUFRLFFBQVEsQ0FBQyxJQUFJO1FBQ25CLEtBQUssU0FBUztZQUNaLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hDLEtBQUssUUFBUTtZQUNYLE9BQU8sSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUMvQixLQUFLLFVBQVU7WUFDYixPQUFPLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUNqQztZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDNUQ7QUFDSDs7TUNwQmEsZ0JBQWdCO0lBTzNCLFlBQTZCLElBQVUsRUFBVyxnQkFBd0I7UUFBN0MsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFXLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUN4RSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsT0FBTyxRQUFRLENBQUMsSUFBWTtRQUMxQixPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUUsQ0FBQztLQUMvRDtJQUVELE9BQU8sTUFBTTtRQUNYLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDO0tBQ2pDOztBQWhCdUIsd0JBQU8sR0FBdUIsRUFBRSxDQUFDO0FBRXpDLHdCQUFPLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0MseUJBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQyx1QkFBTSxHQUFHLElBQUksZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzs7QUNQckQsTUFBTSxLQUFLLEdBQUcsQ0FDbkIsTUFBVyxFQUNYLEtBQXVCLEtBRXZCLE1BQU0sQ0FBQyxNQUFNLENBQ1gsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQzlELEVBQTBCLENBQzNCLENBQUM7QUFFRyxNQUFNLE9BQU8sR0FBRyxDQUNyQixNQUFXLEVBQ1gsS0FBdUIsS0FFdkIsTUFBTSxDQUFDLE1BQU0sQ0FDWCxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUNoQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FDNUMsRUFDRCxFQUE0QixDQUM3QixDQUFDO1NBRVksSUFBSSxDQUFJLE1BQVc7SUFDakMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5QixDQUFDO1NBRWUsUUFBUSxDQUFJLEdBQVEsRUFBRSxFQUFpQztJQUNyRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQ2YsQ0FBQyxPQUFPLEVBQUUsS0FBSyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FDekUsQ0FBQztBQUNKOztNQ25CYSxTQUFTO0lBQ3BCLFlBQW9CLEdBQVE7UUFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO0tBQUk7SUFFaEMsVUFBVSxDQUFDLElBQVc7O1FBQ3BCLFFBQ0UsTUFBQUEsZ0NBQXVCLENBQ3JCLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQywwQ0FBRSxXQUFXLENBQ3ZELG1DQUFJLEVBQUUsRUFDUDtLQUNIO0lBRUQsMkJBQTJCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQ0MscUJBQVksQ0FBQyxFQUFFO1lBQ3pELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVcsQ0FBQyxJQUFvQixDQUFDO0tBQzVEO0lBRUQsZ0JBQWdCOztRQUNkLE9BQU8sTUFBQSxNQUFBLElBQUksQ0FBQywyQkFBMkIsRUFBRSwwQ0FBRSxNQUFNLG1DQUFJLElBQUksQ0FBQztLQUMzRDtJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FDVCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQzthQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNoQixJQUFJLEVBQUUsQ0FDVixDQUFDO0tBQ0g7Ozs7SUFLRCxPQUFPOztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQ0EscUJBQVksQ0FBQyxFQUFFO1lBQ3pELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFXLENBQUMsSUFBb0IsQ0FBQztRQUN6RSxNQUFNLE1BQU0sR0FBUyxZQUFZLENBQUMsTUFBYyxDQUFDLEVBQUUsQ0FBQzs7UUFHcEQsSUFBSSxDQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFVBQVUsMENBQUUsU0FBUyxJQUFHLENBQUMsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQztTQUNiOztRQUdELE9BQU8sQ0FBQyxFQUFDLE1BQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTywwQ0FBRSxLQUFLLDBDQUFFLFNBQVMsQ0FBQSxDQUFDO0tBQzVDOzs7QUMxREgsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQ3pCLG1JQUFtSSxFQUNuSSxHQUFHLENBQ0osQ0FBQztTQUVjLFlBQVksQ0FBQyxJQUFZO0lBQ3ZDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUM7U0FFZSxZQUFZLENBQUMsSUFBWTtJQUN2QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7U0FFZSxZQUFZLENBQUMsSUFBWTtJQUN2QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7U0FFZSxhQUFhLENBQUMsR0FBVyxFQUFFLEtBQWE7SUFDdEQsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3pELENBQUM7U0FFZSx5QkFBeUIsQ0FBQyxHQUFXLEVBQUUsS0FBYTtJQUNsRSxPQUFPLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztTQUVlLGVBQWUsQ0FBQyxDQUFTLEVBQUUsQ0FBUztJQUNsRCxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQztTQUVlLHVCQUF1QixDQUFDLEdBQVcsRUFBRSxLQUFhO0lBQ2hFLE9BQU8sZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDO1NBRWUscUJBQXFCLENBQUMsR0FBVztJQUMvQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRDs7U0NYZ0IsUUFBUSxDQUN0QixrQkFBc0MsRUFDdEMsR0FBVyxFQUNYLElBQVU7SUFFVixJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN6QyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE9BQU87S0FDUjtJQUVELGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRUQ7U0FDZ0IsS0FBSyxDQUNuQixJQUFVLEVBQ1YsS0FBYSxFQUNiLG1CQUE0Qjs7SUFFNUIsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQzlDLElBQUksbUJBQW1CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzdDLE1BQU0sQ0FBQyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QyxPQUFPLEVBQUUsSUFBSSxrQ0FBTyxJQUFJLEtBQUUsS0FBSyxFQUFFLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ2hFO2FBQU07WUFDTCxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDeEQ7S0FDRjtJQUNELE1BQU0sWUFBWSxHQUFHLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUN4Qyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQ2xDLENBQUM7SUFDRixJQUFJLFlBQVksRUFBRTtRQUNoQixPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUN6RDtJQUVELE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN0QyxDQUFDO1NBRWUsWUFBWSxDQUMxQixZQUEwQixFQUMxQixLQUFhLEVBQ2IsR0FBVzs7SUFFWCxNQUFNLG1CQUFtQixHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQztJQUVuRSxNQUFNLEtBQUssR0FBRyxtQkFBbUI7VUFDN0I7WUFDRSxJQUFJLE1BQUEsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztZQUNwRCxJQUFJLE1BQUEsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztZQUNsRSxJQUFJLE1BQUEsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3pELElBQUksTUFBQSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDdkUsSUFBSSxNQUFBLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDckQsSUFBSSxNQUFBLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7U0FDcEU7VUFDRDtZQUNFLElBQUksTUFBQSxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3BELElBQUksTUFBQSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDekQsSUFBSSxNQUFBLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDckQsSUFBSSxNQUFBLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7U0FDcEUsQ0FBQztJQUVOLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ2hDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQ2hELE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztTQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULElBQUksQ0FBQyxDQUFDLEtBQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEtBQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdkMsT0FBTyxDQUFDLENB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
