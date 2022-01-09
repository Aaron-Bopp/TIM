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
function* splitRaw(text, regexp) {
    let previousIndex = 0;
    for (let r of text.matchAll(regexp)) {
        if (previousIndex !== r.index) {
            yield text.slice(previousIndex, r.index);
        }
        yield text[r.index];
        previousIndex = r.index + 1;
    }
    if (previousIndex !== text.length) {
        yield text.slice(previousIndex, text.length);
    }
}

function pickTokens(content, trimPattern) {
    return content.split(trimPattern).filter((x) => x !== "");
}
const TRIM_CHAR_PATTERN = /[\n\t\\\[\]/:?!=()<>"'.,|;*~ `]/g;
class DefaultTokenizer {
    tokenize(content, raw) {
        return raw
            ? Array.from(splitRaw(content, this.getTrimPattern())).filter((x) => x !== " ")
            : pickTokens(content, this.getTrimPattern());
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
function arrayEqualsUntil(arr1, arr2) {
    let l = Math.min(arr1.length, arr2.length);
    for (let i = 0; i < l; i++) {
        if (arr1[i] !== arr2[i]) {
            return i - 1;
        }
    }
    return l - 1;
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
    getCurrentLine(editor) {
        return editor.getLine(editor.getCursor().line);
    }
    getCurrentLineUntilCursor(editor) {
        return this.getCurrentLine(editor).slice(0, editor.getCursor().ch);
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
        return {
            word: Object.assign(Object.assign({}, word), { matchedAlias }),
            value: matchedAlias,
            alias: true,
        };
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
        return {
            word: Object.assign(Object.assign({}, word), { matchedAlias: matchedAliasStarts }),
            value: matchedAliasStarts,
            alias: true,
        };
    }
    if (lowerIncludesWithoutSpace(word.value, query)) {
        return { word: word, value: word.value, alias: false };
    }
    const matchedAliasIncluded = (_b = word.aliases) === null || _b === void 0 ? void 0 : _b.find((a) => lowerIncludesWithoutSpace(a, query));
    if (matchedAliasIncluded) {
        return {
            word: Object.assign(Object.assign({}, word), { matchedAlias: matchedAliasIncluded }),
            value: matchedAliasIncluded,
            alias: true,
        };
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
    console.log(candidate);
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
            const contents = path.match(new RegExp("^https?://"))
                ? yield obsidian.request({ url: path })
                : yield this.fileSystemAdapter.read(path);
            return contents
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

function suggestCh(tokenizer, currentLineUntilCursor, word, contextStartCh) {
    const currentLineTokensUntilCursor = tokenizer
        .tokenize(currentLineUntilCursor, true)
        .map((x) => x.toLowerCase());
    const currentToken = currentLineTokensUntilCursor[currentLineTokensUntilCursor.length - 1];
    const currentLineTokensReversed = currentLineTokensUntilCursor
        .slice(0, -1)
        .reverse();
    const suggestionTokensReversed = tokenizer
        .tokenize(excludeEmoji(word), true)
        .map((x) => x.toLowerCase())
        .reverse();
    const i = suggestionTokensReversed.indexOf(currentLineTokensReversed[0]);
    const judgementTokens = suggestionTokensReversed.slice(i);
    const untilEqualIndex = arrayEqualsUntil(currentLineTokensReversed, judgementTokens);
    return untilEqualIndex === -1
        ? contextStartCh
        : currentLineUntilCursor
            .slice(0, -currentToken.length)
            .toLowerCase()
            .lastIndexOf(judgementTokens[untilEqualIndex]);
}

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
        this.runManually = true;
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
            if (this.settings.ignoreTabKey) {
                this.close();
                return true;
            }
            this.suggestions.useSelectedItem({});
            return false;
        }));
        // overwrite
        this.scope.keys.find((x) => x.key === "Escape").func = () => {
            this.close();
            return this.settings.propagateEsc;
        };
        this.scope.keys.find((x) => x.key === "Enter").func = () => {
            if (this.settings.ignoreEnterKey) {
                this.close();
                return true;
            }
            this.suggestions.useSelectedItem({});
            return false;
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
        var _a;
        if (!this.settings.complementAutomatically &&
            !this.isOpen &&
            !this.runManually) {
            this.showDebugLog("Don't show suggestions");
            return null;
        }
        if (this.settings.disableSuggestionsDuringImeOn &&
            this.appHelper.isIMEOn() &&
            !this.runManually) {
            this.showDebugLog("Don't show suggestions for IME");
            return null;
        }
        const currentChar = editor.getRange({ line: cursor.line, ch: cursor.ch - 1 }, cursor);
        this.showDebugLog(`[onTrigger] currentChar is ${currentChar}`);
        if (currentChar === " ") {
            this.runManually = false;
            this.showDebugLog("Don't show suggestions because currentChar is whitespace");
            return null;
        }
        const tokens = this.tokenizer.tokenize(editor.getLine(cursor.line).slice(0, cursor.ch), true);
        this.showDebugLog(`[onTrigger] tokens is ${tokens}`);
        const currentToken = tokens.last();
        this.showDebugLog(`[onTrigger] currentToken is ${currentToken}`);
        if (!currentToken) {
            this.runManually = false;
            this.showDebugLog(`Don't show suggestions because currentToken is empty`);
            return null;
        }
        if (currentToken[0].match(this.tokenizer.getTrimPattern())) {
            this.runManually = false;
            this.showDebugLog(`Don't show suggestions for avoiding to conflict with the slash command.`);
            return null;
        }
        const trimmedCurrentToken = (_a = this.tokenizer.tokenize(currentToken)) === null || _a === void 0 ? void 0 : _a[0];
        this.showDebugLog(`[onTrigger] trimmedCurrentToken is ${trimmedCurrentToken}`);
        if (!trimmedCurrentToken) {
            this.runManually = false;
            this.showDebugLog(`Don't show suggestions because trimmedCurrentToken is empty`);
            return null;
        }
        if (!this.runManually) {
            if (trimmedCurrentToken.length < this.minNumberTriggered) {
                this.showDebugLog("Don't show suggestions because trimmedCurrentToken is less than minNumberTriggered option");
                return null;
            }
            if (this.tokenizer.shouldIgnore(trimmedCurrentToken)) {
                this.showDebugLog("Don't show suggestions because trimmedCurrentToken should ignored");
                return null;
            }
        }
        this.runManually = false;
        return {
            start: {
                ch: cursor.ch - trimmedCurrentToken.length,
                line: cursor.line,
            },
            end: cursor,
            query: trimmedCurrentToken,
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
        let text = word.value;
        if (word.internalLink) {
            text =
                this.settings.suggestInternalLinkWithAlias && word.matchedAlias
                    ? `[[${word.value}|${word.matchedAlias}]]`
                    : `[[${word.value}]]`;
        }
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
        if (!this.context) {
            return;
        }
        let insertedText = word.value;
        if (word.internalLink) {
            insertedText =
                this.settings.suggestInternalLinkWithAlias && word.matchedAlias
                    ? `[[${insertedText}|${word.matchedAlias}]]`
                    : `[[${insertedText}]]`;
        }
        if (this.settings.insertAfterCompletion) {
            insertedText = `${insertedText} `;
        }
        if (this.settings.delimiterToHideSuggestion) {
            insertedText = insertedText.replace(this.settings.delimiterToHideSuggestion, "");
        }
        // This tricky logics for Safari
        // https://github.com/tadashi-aikawa/obsidian-various-complements-plugin/issues/56
        insertedText = insertedText
            .replace(/\\\\/g, "__VariousComplementsEscape__")
            .replace(/\\n/g, "\n")
            .replace(/\\t/g, "\t")
            .replace(/__VariousComplementsEscape__/g, "\\");
        const caret = this.settings.caretLocationSymbolAfterComplement;
        const positionToMove = caret ? insertedText.indexOf(caret) : -1;
        if (positionToMove !== -1) {
            insertedText = insertedText.replace(caret, "");
        }
        const editor = this.context.editor;
        editor.replaceRange(insertedText, this.suggestReplaceStartPosition(word, this.context), this.context.end);
        if (positionToMove !== -1) {
            editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor()) -
                insertedText.length +
                positionToMove));
        }
        this.close();
        this.debounceClose();
    }
    suggestReplaceStartPosition(word, context) {
        if (!this.settings.overwriteDuplicatedExistedPhrase) {
            return context.start;
        }
        const currentLineUntilCursor = this.appHelper.getCurrentLineUntilCursor(context.editor);
        return Object.assign(Object.assign({}, context.start), { ch: suggestCh(this.tokenizer, currentLineUntilCursor, word.value, context.start.ch) });
    }
    showDebugLog(message, msec) {
        if (this.settings.showLogAboutPerformanceInConsole) {
            if (msec !== undefined) {
                console.log(`${message}: ${Math.round(msec)}[ms]`);
            }
            else {
                console.log(message);
            }
        }
    }
}

const DEFAULT_SETTINGS = {
    strategy: "default",
    matchStrategy: "prefix",
    maxNumberOfSuggestions: 5,
    minNumberOfCharactersTriggered: 0,
    complementAutomatically: true,
    overwriteDuplicatedExistedPhrase: false,
    delayMilliSeconds: 0,
    customDictionaryPaths: `https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt`,
    ignoreEnterKey: false,
    ignoreTabKey: false,
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
    suggestInternalLinkWithAlias: false,
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
            .setName("Complement automatically")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.complementAutomatically).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.complementAutomatically = value;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName("Overwrite duplicated existed phrase")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.overwriteDuplicatedExistedPhrase).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.overwriteDuplicatedExistedPhrase = value;
                yield this.plugin.saveSettings();
            }));
        });
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
            .setName("Ignore Enter key")
            .setDesc("It is handy when you want to avoid selecting the suggestion by Enter key unintentionally")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.ignoreEnterKey).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.ignoreEnterKey = value;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName("Ignore Tab key")
            .setDesc("It is handy when you want to avoid selecting the suggestion by Tab key unintentionally")
            .addToggle((tc) => {
            tc.setValue(this.plugin.settings.ignoreTabKey).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.ignoreTabKey = value;
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
                .setDesc("Specify either a relative path from Vault root or URL for each line.")
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
        if (this.plugin.settings.enableInternalLinkComplement) {
            new obsidian.Setting(containerEl)
                .setName("Suggest with an alias")
                .addToggle((tc) => {
                tc.setValue(this.plugin.settings.suggestInternalLinkWithAlias).onChange((value) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.suggestInternalLinkWithAlias = value;
                    yield this.plugin.saveSettings();
                }));
            });
        }
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
    toggleComplementAutomatically() {
        return __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.complementAutomatically =
                !this.plugin.settings.complementAutomatically;
            yield this.plugin.saveSettings();
        });
    }
    getPluginSettingsAsJsonString() {
        return JSON.stringify({
            version: this.plugin.manifest.version,
            mobile: this.app.isMobile,
            settings: this.plugin.settings,
        }, null, 4);
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
                id: "toggle-match-strategy",
                name: "Toggle Match strategy",
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.settingTab.toggleMatchStrategy();
                }),
            });
            this.addCommand({
                id: "toggle-complement-automatically",
                name: "Toggle Complement automatically",
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.settingTab.toggleComplementAutomatically();
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
            this.addCommand({
                id: "copy-plugin-settings",
                name: "Copy plugin settings",
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    yield navigator.clipboard.writeText(this.settingTab.getPluginSettingsAsJsonString());
                    new obsidian.Notice("Copy settings of Various Complements");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy91dGlsL3N0cmluZ3MudHMiLCJzcmMvdG9rZW5pemVyL3Rva2VuaXplcnMvRGVmYXVsdFRva2VuaXplci50cyIsInNyYy90b2tlbml6ZXIvdG9rZW5pemVycy9BcmFiaWNUb2tlbml6ZXIudHMiLCJzcmMvZXh0ZXJuYWwvdGlueS1zZWdtZW50ZXIudHMiLCJzcmMvdG9rZW5pemVyL3Rva2VuaXplcnMvSmFwYW5lc2VUb2tlbml6ZXIudHMiLCJzcmMvdG9rZW5pemVyL3Rva2VuaXplci50cyIsInNyYy90b2tlbml6ZXIvVG9rZW5pemVTdHJhdGVneS50cyIsInNyYy91dGlsL2NvbGxlY3Rpb24taGVscGVyLnRzIiwic3JjL2FwcC1oZWxwZXIudHMiLCJzcmMvcHJvdmlkZXIvc3VnZ2VzdGVyLnRzIiwic3JjL3Byb3ZpZGVyL0N1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIudHMiLCJzcmMvcHJvdmlkZXIvQ3VycmVudEZpbGVXb3JkUHJvdmlkZXIudHMiLCJzcmMvcHJvdmlkZXIvSW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyLnRzIiwic3JjL3Byb3ZpZGVyL01hdGNoU3RyYXRlZ3kudHMiLCJzcmMvQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzLnRzIiwic3JjL3JlcGxhY2VyLnRzIiwic3JjL3VpL0F1dG9Db21wbGV0ZVN1Z2dlc3QudHMiLCJzcmMvc2V0dGluZ3MudHMiLCJzcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcbiIsImNvbnN0IHJlZ0Vtb2ppID0gbmV3IFJlZ0V4cChcbiAgL1tcXHUyNzAwLVxcdTI3QkZdfFtcXHVFMDAwLVxcdUY4RkZdfFxcdUQ4M0NbXFx1REMwMC1cXHVERkZGXXxcXHVEODNEW1xcdURDMDAtXFx1REZGRl18W1xcdTIwMTEtXFx1MjZGRl18XFx1RDgzRVtcXHVERDEwLVxcdURERkZdfFtcXHVGRTBFLVxcdUZFMEZdLyxcbiAgXCJnXCJcbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGxBbHBoYWJldHModGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBCb29sZWFuKHRleHQubWF0Y2goL15bYS16QS1aMC05Xy1dKyQvKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGNsdWRlRW1vamkodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZShyZWdFbW9qaSwgXCJcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGNsdWRlU3BhY2UodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvIC9nLCBcIlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvd2VySW5jbHVkZXMob25lOiBzdHJpbmcsIG90aGVyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG9uZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG90aGVyLnRvTG93ZXJDYXNlKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG93ZXJJbmNsdWRlc1dpdGhvdXRTcGFjZShvbmU6IHN0cmluZywgb3RoZXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbG93ZXJJbmNsdWRlcyhleGNsdWRlU3BhY2Uob25lKSwgZXhjbHVkZVNwYWNlKG90aGVyKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb3dlclN0YXJ0c1dpdGgoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGEudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGIudG9Mb3dlckNhc2UoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb3dlclN0YXJ0c1dpdGhvdXRTcGFjZShvbmU6IHN0cmluZywgb3RoZXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbG93ZXJTdGFydHNXaXRoKGV4Y2x1ZGVTcGFjZShvbmUpLCBleGNsdWRlU3BhY2Uob3RoZXIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogc3BsaXRSYXcoXG4gIHRleHQ6IHN0cmluZyxcbiAgcmVnZXhwOiBSZWdFeHBcbik6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nPiB7XG4gIGxldCBwcmV2aW91c0luZGV4ID0gMDtcbiAgZm9yIChsZXQgciBvZiB0ZXh0Lm1hdGNoQWxsKHJlZ2V4cCkpIHtcbiAgICBpZiAocHJldmlvdXNJbmRleCAhPT0gci5pbmRleCEpIHtcbiAgICAgIHlpZWxkIHRleHQuc2xpY2UocHJldmlvdXNJbmRleCwgci5pbmRleCEpO1xuICAgIH1cbiAgICB5aWVsZCB0ZXh0W3IuaW5kZXghXTtcbiAgICBwcmV2aW91c0luZGV4ID0gci5pbmRleCEgKyAxO1xuICB9XG5cbiAgaWYgKHByZXZpb3VzSW5kZXggIT09IHRleHQubGVuZ3RoKSB7XG4gICAgeWllbGQgdGV4dC5zbGljZShwcmV2aW91c0luZGV4LCB0ZXh0Lmxlbmd0aCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi90b2tlbml6ZXJcIjtcbmltcG9ydCB7IHNwbGl0UmF3IH0gZnJvbSBcIi4uLy4uL3V0aWwvc3RyaW5nc1wiO1xuXG5mdW5jdGlvbiBwaWNrVG9rZW5zKGNvbnRlbnQ6IHN0cmluZywgdHJpbVBhdHRlcm46IFJlZ0V4cCk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIGNvbnRlbnQuc3BsaXQodHJpbVBhdHRlcm4pLmZpbHRlcigoeCkgPT4geCAhPT0gXCJcIik7XG59XG5cbmV4cG9ydCBjb25zdCBUUklNX0NIQVJfUEFUVEVSTiA9IC9bXFxuXFx0XFxcXFxcW1xcXS86PyE9KCk8PlwiJy4sfDsqfiBgXS9nO1xuZXhwb3J0IGNsYXNzIERlZmF1bHRUb2tlbml6ZXIgaW1wbGVtZW50cyBUb2tlbml6ZXIge1xuICB0b2tlbml6ZShjb250ZW50OiBzdHJpbmcsIHJhdz86IGJvb2xlYW4pOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHJhd1xuICAgICAgPyBBcnJheS5mcm9tKHNwbGl0UmF3KGNvbnRlbnQsIHRoaXMuZ2V0VHJpbVBhdHRlcm4oKSkpLmZpbHRlcihcbiAgICAgICAgICAoeCkgPT4geCAhPT0gXCIgXCJcbiAgICAgICAgKVxuICAgICAgOiBwaWNrVG9rZW5zKGNvbnRlbnQsIHRoaXMuZ2V0VHJpbVBhdHRlcm4oKSk7XG4gIH1cblxuICBnZXRUcmltUGF0dGVybigpOiBSZWdFeHAge1xuICAgIHJldHVybiBUUklNX0NIQVJfUEFUVEVSTjtcbiAgfVxuXG4gIHNob3VsZElnbm9yZShzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGVmYXVsdFRva2VuaXplciB9IGZyb20gXCIuL0RlZmF1bHRUb2tlbml6ZXJcIjtcblxuY29uc3QgQVJBQklDX1RSSU1fQ0hBUl9QQVRURVJOID0gL1tcXG5cXHRcXFxcXFxbXFxdLzo/IT0oKTw+XCInLix8Oyp+IGDYjNibXS9nO1xuZXhwb3J0IGNsYXNzIEFyYWJpY1Rva2VuaXplciBleHRlbmRzIERlZmF1bHRUb2tlbml6ZXIge1xuICBnZXRUcmltUGF0dGVybigpOiBSZWdFeHAge1xuICAgIHJldHVybiBBUkFCSUNfVFJJTV9DSEFSX1BBVFRFUk47XG4gIH1cbn1cbiIsIi8vIEB0cy1ub2NoZWNrXG4vLyBCZWNhdXNlIHRoaXMgY29kZSBpcyBvcmlnaW5hbGx5IGphdmFzY3JpcHQgY29kZS5cbi8vIG5vaW5zcGVjdGlvbiBGdW5jdGlvblRvb0xvbmdKUyxGdW5jdGlvbldpdGhNdWx0aXBsZUxvb3BzSlMsRXF1YWxpdHlDb21wYXJpc29uV2l0aENvZXJjaW9uSlMsUG9pbnRsZXNzQm9vbGVhbkV4cHJlc3Npb25KUyxKU0RlY2xhcmF0aW9uc0F0U2NvcGVTdGFydFxuXG4vLyBUaW55U2VnbWVudGVyIDAuMSAtLSBTdXBlciBjb21wYWN0IEphcGFuZXNlIHRva2VuaXplciBpbiBKYXZhc2NyaXB0XG4vLyAoYykgMjAwOCBUYWt1IEt1ZG8gPHRha3VAY2hhc2VuLm9yZz5cbi8vIFRpbnlTZWdtZW50ZXIgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIGEgbmV3IEJTRCBsaWNlbmNlLlxuLy8gRm9yIGRldGFpbHMsIHNlZSBodHRwOi8vY2hhc2VuLm9yZy9+dGFrdS9zb2Z0d2FyZS9UaW55U2VnbWVudGVyL0xJQ0VOQ0UudHh0XG5cbmZ1bmN0aW9uIFRpbnlTZWdtZW50ZXIoKSB7XG4gIHZhciBwYXR0ZXJucyA9IHtcbiAgICBcIlvkuIDkuozkuInlm5vkupTlha3kuIPlhavkuZ3ljYHnmb7ljYPkuIflhITlhYZdXCI6IFwiTVwiLFxuICAgIFwiW+S4gC3pvqDjgIXjgIbjg7Xjg7ZdXCI6IFwiSFwiLFxuICAgIFwiW+OBgS3jgpNdXCI6IFwiSVwiLFxuICAgIFwiW+OCoS3jg7Tjg7zvvbEt776d776e772wXVwiOiBcIktcIixcbiAgICBcIlthLXpBLVrvvYEt772a77yhLe+8ul1cIjogXCJBXCIsXG4gICAgXCJbMC0577yQLe+8mV1cIjogXCJOXCIsXG4gIH07XG4gIHRoaXMuY2hhcnR5cGVfID0gW107XG4gIGZvciAodmFyIGkgaW4gcGF0dGVybnMpIHtcbiAgICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cCgpO1xuICAgIHJlZ2V4cC5jb21waWxlKGkpO1xuICAgIHRoaXMuY2hhcnR5cGVfLnB1c2goW3JlZ2V4cCwgcGF0dGVybnNbaV1dKTtcbiAgfVxuXG4gIHRoaXMuQklBU19fID0gLTMzMjtcbiAgdGhpcy5CQzFfXyA9IHsgSEg6IDYsIElJOiAyNDYxLCBLSDogNDA2LCBPSDogLTEzNzggfTtcbiAgdGhpcy5CQzJfXyA9IHtcbiAgICBBQTogLTMyNjcsXG4gICAgQUk6IDI3NDQsXG4gICAgQU46IC04NzgsXG4gICAgSEg6IC00MDcwLFxuICAgIEhNOiAtMTcxMSxcbiAgICBITjogNDAxMixcbiAgICBITzogMzc2MSxcbiAgICBJQTogMTMyNyxcbiAgICBJSDogLTExODQsXG4gICAgSUk6IC0xMzMyLFxuICAgIElLOiAxNzIxLFxuICAgIElPOiA1NDkyLFxuICAgIEtJOiAzODMxLFxuICAgIEtLOiAtODc0MSxcbiAgICBNSDogLTMxMzIsXG4gICAgTUs6IDMzMzQsXG4gICAgT086IC0yOTIwLFxuICB9O1xuICB0aGlzLkJDM19fID0ge1xuICAgIEhIOiA5OTYsXG4gICAgSEk6IDYyNixcbiAgICBISzogLTcyMSxcbiAgICBITjogLTEzMDcsXG4gICAgSE86IC04MzYsXG4gICAgSUg6IC0zMDEsXG4gICAgS0s6IDI3NjIsXG4gICAgTUs6IDEwNzksXG4gICAgTU06IDQwMzQsXG4gICAgT0E6IC0xNjUyLFxuICAgIE9IOiAyNjYsXG4gIH07XG4gIHRoaXMuQlAxX18gPSB7IEJCOiAyOTUsIE9COiAzMDQsIE9POiAtMTI1LCBVQjogMzUyIH07XG4gIHRoaXMuQlAyX18gPSB7IEJPOiA2MCwgT086IC0xNzYyIH07XG4gIHRoaXMuQlExX18gPSB7XG4gICAgQkhIOiAxMTUwLFxuICAgIEJITTogMTUyMSxcbiAgICBCSUk6IC0xMTU4LFxuICAgIEJJTTogODg2LFxuICAgIEJNSDogMTIwOCxcbiAgICBCTkg6IDQ0OSxcbiAgICBCT0g6IC05MSxcbiAgICBCT086IC0yNTk3LFxuICAgIE9ISTogNDUxLFxuICAgIE9JSDogLTI5NixcbiAgICBPS0E6IDE4NTEsXG4gICAgT0tIOiAtMTAyMCxcbiAgICBPS0s6IDkwNCxcbiAgICBPT086IDI5NjUsXG4gIH07XG4gIHRoaXMuQlEyX18gPSB7XG4gICAgQkhIOiAxMTgsXG4gICAgQkhJOiAtMTE1OSxcbiAgICBCSE06IDQ2NixcbiAgICBCSUg6IC05MTksXG4gICAgQktLOiAtMTcyMCxcbiAgICBCS086IDg2NCxcbiAgICBPSEg6IC0xMTM5LFxuICAgIE9ITTogLTE4MSxcbiAgICBPSUg6IDE1MyxcbiAgICBVSEk6IC0xMTQ2LFxuICB9O1xuICB0aGlzLkJRM19fID0ge1xuICAgIEJISDogLTc5MixcbiAgICBCSEk6IDI2NjQsXG4gICAgQklJOiAtMjk5LFxuICAgIEJLSTogNDE5LFxuICAgIEJNSDogOTM3LFxuICAgIEJNTTogODMzNSxcbiAgICBCTk46IDk5OCxcbiAgICBCT0g6IDc3NSxcbiAgICBPSEg6IDIxNzQsXG4gICAgT0hNOiA0MzksXG4gICAgT0lJOiAyODAsXG4gICAgT0tIOiAxNzk4LFxuICAgIE9LSTogLTc5MyxcbiAgICBPS086IC0yMjQyLFxuICAgIE9NSDogLTI0MDIsXG4gICAgT09POiAxMTY5OSxcbiAgfTtcbiAgdGhpcy5CUTRfXyA9IHtcbiAgICBCSEg6IC0zODk1LFxuICAgIEJJSDogMzc2MSxcbiAgICBCSUk6IC00NjU0LFxuICAgIEJJSzogMTM0OCxcbiAgICBCS0s6IC0xODA2LFxuICAgIEJNSTogLTMzODUsXG4gICAgQk9POiAtMTIzOTYsXG4gICAgT0FIOiA5MjYsXG4gICAgT0hIOiAyNjYsXG4gICAgT0hLOiAtMjAzNixcbiAgICBPTk46IC05NzMsXG4gIH07XG4gIHRoaXMuQlcxX18gPSB7XG4gICAgXCIs44GoXCI6IDY2MCxcbiAgICBcIizlkIxcIjogNzI3LFxuICAgIEIx44GCOiAxNDA0LFxuICAgIEIx5ZCMOiA1NDIsXG4gICAgXCLjgIHjgahcIjogNjYwLFxuICAgIFwi44CB5ZCMXCI6IDcyNyxcbiAgICBcIuOAjeOBqFwiOiAxNjgyLFxuICAgIOOBguOBozogMTUwNSxcbiAgICDjgYTjgYY6IDE3NDMsXG4gICAg44GE44GjOiAtMjA1NSxcbiAgICDjgYTjgos6IDY3MixcbiAgICDjgYbjgZc6IC00ODE3LFxuICAgIOOBhuOCkzogNjY1LFxuICAgIOOBi+OCiTogMzQ3MixcbiAgICDjgYzjgok6IDYwMCxcbiAgICDjgZPjgYY6IC03OTAsXG4gICAg44GT44GoOiAyMDgzLFxuICAgIOOBk+OCkzogLTEyNjIsXG4gICAg44GV44KJOiAtNDE0MyxcbiAgICDjgZXjgpM6IDQ1NzMsXG4gICAg44GX44GfOiAyNjQxLFxuICAgIOOBl+OBpjogMTEwNCxcbiAgICDjgZnjgac6IC0zMzk5LFxuICAgIOOBneOBkzogMTk3NyxcbiAgICDjgZ3jgow6IC04NzEsXG4gICAg44Gf44GhOiAxMTIyLFxuICAgIOOBn+OCgTogNjAxLFxuICAgIOOBo+OBnzogMzQ2MyxcbiAgICDjgaTjgYQ6IC04MDIsXG4gICAg44Gm44GEOiA4MDUsXG4gICAg44Gm44GNOiAxMjQ5LFxuICAgIOOBp+OBjTogMTEyNyxcbiAgICDjgafjgZk6IDM0NDUsXG4gICAg44Gn44GvOiA4NDQsXG4gICAg44Go44GEOiAtNDkxNSxcbiAgICDjgajjgb86IDE5MjIsXG4gICAg44Gp44GTOiAzODg3LFxuICAgIOOBquOBhDogNTcxMyxcbiAgICDjgarjgaM6IDMwMTUsXG4gICAg44Gq44GpOiA3Mzc5LFxuICAgIOOBquOCkzogLTExMTMsXG4gICAg44Gr44GXOiAyNDY4LFxuICAgIOOBq+OBrzogMTQ5OCxcbiAgICDjgavjgoI6IDE2NzEsXG4gICAg44Gr5a++OiAtOTEyLFxuICAgIOOBruS4gDogLTUwMSxcbiAgICDjga7kuK06IDc0MSxcbiAgICDjgb7jgZs6IDI0NDgsXG4gICAg44G+44GnOiAxNzExLFxuICAgIOOBvuOBvjogMjYwMCxcbiAgICDjgb7jgos6IC0yMTU1LFxuICAgIOOChOOCgDogLTE5NDcsXG4gICAg44KI44GjOiAtMjU2NSxcbiAgICDjgozjgZ86IDIzNjksXG4gICAg44KM44GnOiAtOTEzLFxuICAgIOOCkuOBlzogMTg2MCxcbiAgICDjgpLopos6IDczMSxcbiAgICDkuqHjgY86IC0xODg2LFxuICAgIOS6rOmDvTogMjU1OCxcbiAgICDlj5bjgoo6IC0yNzg0LFxuICAgIOWkp+OBjTogLTI2MDQsXG4gICAg5aSn6ZiqOiAxNDk3LFxuICAgIOW5s+aWuTogLTIzMTQsXG4gICAg5byV44GNOiAtMTMzNixcbiAgICDml6XmnKw6IC0xOTUsXG4gICAg5pys5b2TOiAtMjQyMyxcbiAgICDmr47ml6U6IC0yMTEzLFxuICAgIOebruaMhzogLTcyNCxcbiAgICDvvKLvvJHjgYI6IDE0MDQsXG4gICAg77yi77yR5ZCMOiA1NDIsXG4gICAgXCLvvaPjgahcIjogMTY4MixcbiAgfTtcbiAgdGhpcy5CVzJfXyA9IHtcbiAgICBcIi4uXCI6IC0xMTgyMixcbiAgICAxMTogLTY2OSxcbiAgICBcIuKAleKAlVwiOiAtNTczMCxcbiAgICBcIuKIkuKIklwiOiAtMTMxNzUsXG4gICAg44GE44GGOiAtMTYwOSxcbiAgICDjgYbjgYs6IDI0OTAsXG4gICAg44GL44GXOiAtMTM1MCxcbiAgICDjgYvjgoI6IC02MDIsXG4gICAg44GL44KJOiAtNzE5NCxcbiAgICDjgYvjgow6IDQ2MTIsXG4gICAg44GM44GEOiA4NTMsXG4gICAg44GM44KJOiAtMzE5OCxcbiAgICDjgY3jgZ86IDE5NDEsXG4gICAg44GP44GqOiAtMTU5NyxcbiAgICDjgZPjgag6IC04MzkyLFxuICAgIOOBk+OBrjogLTQxOTMsXG4gICAg44GV44GbOiA0NTMzLFxuICAgIOOBleOCjDogMTMxNjgsXG4gICAg44GV44KTOiAtMzk3NyxcbiAgICDjgZfjgYQ6IC0xODE5LFxuICAgIOOBl+OBizogLTU0NSxcbiAgICDjgZfjgZ86IDUwNzgsXG4gICAg44GX44GmOiA5NzIsXG4gICAg44GX44GqOiA5MzksXG4gICAg44Gd44GuOiAtMzc0NCxcbiAgICDjgZ/jgYQ6IC0xMjUzLFxuICAgIOOBn+OBnzogLTY2MixcbiAgICDjgZ/jgaA6IC0zODU3LFxuICAgIOOBn+OBoTogLTc4NixcbiAgICDjgZ/jgag6IDEyMjQsXG4gICAg44Gf44GvOiAtOTM5LFxuICAgIOOBo+OBnzogNDU4OSxcbiAgICDjgaPjgaY6IDE2NDcsXG4gICAg44Gj44GoOiAtMjA5NCxcbiAgICDjgabjgYQ6IDYxNDQsXG4gICAg44Gm44GNOiAzNjQwLFxuICAgIOOBpuOBjzogMjU1MSxcbiAgICDjgabjga86IC0zMTEwLFxuICAgIOOBpuOCgjogLTMwNjUsXG4gICAg44Gn44GEOiAyNjY2LFxuICAgIOOBp+OBjTogLTE1MjgsXG4gICAg44Gn44GXOiAtMzgyOCxcbiAgICDjgafjgZk6IC00NzYxLFxuICAgIOOBp+OCgjogLTQyMDMsXG4gICAg44Go44GEOiAxODkwLFxuICAgIOOBqOOBkzogLTE3NDYsXG4gICAg44Go44GoOiAtMjI3OSxcbiAgICDjgajjga46IDcyMCxcbiAgICDjgajjgb86IDUxNjgsXG4gICAg44Go44KCOiAtMzk0MSxcbiAgICDjgarjgYQ6IC0yNDg4LFxuICAgIOOBquOBjDogLTEzMTMsXG4gICAg44Gq44GpOiAtNjUwOSxcbiAgICDjgarjga46IDI2MTQsXG4gICAg44Gq44KTOiAzMDk5LFxuICAgIOOBq+OBijogLTE2MTUsXG4gICAg44Gr44GXOiAyNzQ4LFxuICAgIOOBq+OBqjogMjQ1NCxcbiAgICDjgavjgog6IC03MjM2LFxuICAgIOOBq+WvvjogLTE0OTQzLFxuICAgIOOBq+W+kzogLTQ2ODgsXG4gICAg44Gr6ZaiOiAtMTEzODgsXG4gICAg44Gu44GLOiAyMDkzLFxuICAgIOOBruOBpzogLTcwNTksXG4gICAg44Gu44GrOiAtNjA0MSxcbiAgICDjga7jga46IC02MTI1LFxuICAgIOOBr+OBhDogMTA3MyxcbiAgICDjga/jgYw6IC0xMDMzLFxuICAgIOOBr+OBmjogLTI1MzIsXG4gICAg44Gw44KMOiAxODEzLFxuICAgIOOBvuOBlzogLTEzMTYsXG4gICAg44G+44GnOiAtNjYyMSxcbiAgICDjgb7jgow6IDU0MDksXG4gICAg44KB44GmOiAtMzE1MyxcbiAgICDjgoLjgYQ6IDIyMzAsXG4gICAg44KC44GuOiAtMTA3MTMsXG4gICAg44KJ44GLOiAtOTQ0LFxuICAgIOOCieOBlzogLTE2MTEsXG4gICAg44KJ44GrOiAtMTg5NyxcbiAgICDjgorjgZc6IDY1MSxcbiAgICDjgorjgb46IDE2MjAsXG4gICAg44KM44GfOiA0MjcwLFxuICAgIOOCjOOBpjogODQ5LFxuICAgIOOCjOOBsDogNDExNCxcbiAgICDjgo3jgYY6IDYwNjcsXG4gICAg44KP44KMOiA3OTAxLFxuICAgIOOCkumAmjogLTExODc3LFxuICAgIOOCk+OBoDogNzI4LFxuICAgIOOCk+OBqjogLTQxMTUsXG4gICAg5LiA5Lq6OiA2MDIsXG4gICAg5LiA5pa5OiAtMTM3NSxcbiAgICDkuIDml6U6IDk3MCxcbiAgICDkuIDpg6g6IC0xMDUxLFxuICAgIOS4iuOBjDogLTQ0NzksXG4gICAg5Lya56S+OiAtMTExNixcbiAgICDlh7rjgaY6IDIxNjMsXG4gICAg5YiG44GuOiAtNzc1OCxcbiAgICDlkIzlhZo6IDk3MCxcbiAgICDlkIzml6U6IC05MTMsXG4gICAg5aSn6ZiqOiAtMjQ3MSxcbiAgICDlp5Tlk6E6IC0xMjUwLFxuICAgIOWwkeOBqjogLTEwNTAsXG4gICAg5bm05bqmOiAtODY2OSxcbiAgICDlubTplpM6IC0xNjI2LFxuICAgIOW6nOecjDogLTIzNjMsXG4gICAg5omL5qipOiAtMTk4MixcbiAgICDmlrDogZ46IC00MDY2LFxuICAgIOaXpeaWsDogLTcyMixcbiAgICDml6XmnKw6IC03MDY4LFxuICAgIOaXpeexszogMzM3MixcbiAgICDmm5zml6U6IC02MDEsXG4gICAg5pyd6a6uOiAtMjM1NSxcbiAgICDmnKzkuro6IC0yNjk3LFxuICAgIOadseS6rDogLTE1NDMsXG4gICAg54S244GoOiAtMTM4NCxcbiAgICDnpL7kvJo6IC0xMjc2LFxuICAgIOeri+OBpjogLTk5MCxcbiAgICDnrKzjgas6IC0xNjEyLFxuICAgIOexs+WbvTogLTQyNjgsXG4gICAgXCLvvJHvvJFcIjogLTY2OSxcbiAgfTtcbiAgdGhpcy5CVzNfXyA9IHtcbiAgICDjgYLjgZ86IC0yMTk0LFxuICAgIOOBguOCijogNzE5LFxuICAgIOOBguOCizogMzg0NixcbiAgICBcIuOBhC5cIjogLTExODUsXG4gICAgXCLjgYTjgIJcIjogLTExODUsXG4gICAg44GE44GEOiA1MzA4LFxuICAgIOOBhOOBiDogMjA3OSxcbiAgICDjgYTjgY86IDMwMjksXG4gICAg44GE44GfOiAyMDU2LFxuICAgIOOBhOOBozogMTg4MyxcbiAgICDjgYTjgos6IDU2MDAsXG4gICAg44GE44KPOiAxNTI3LFxuICAgIOOBhuOBoTogMTExNyxcbiAgICDjgYbjgag6IDQ3OTgsXG4gICAg44GI44GoOiAxNDU0LFxuICAgIFwi44GLLlwiOiAyODU3LFxuICAgIFwi44GL44CCXCI6IDI4NTcsXG4gICAg44GL44GROiAtNzQzLFxuICAgIOOBi+OBozogLTQwOTgsXG4gICAg44GL44GrOiAtNjY5LFxuICAgIOOBi+OCiTogNjUyMCxcbiAgICDjgYvjgoo6IC0yNjcwLFxuICAgIFwi44GMLFwiOiAxODE2LFxuICAgIFwi44GM44CBXCI6IDE4MTYsXG4gICAg44GM44GNOiAtNDg1NSxcbiAgICDjgYzjgZE6IC0xMTI3LFxuICAgIOOBjOOBozogLTkxMyxcbiAgICDjgYzjgok6IC00OTc3LFxuICAgIOOBjOOCijogLTIwNjQsXG4gICAg44GN44GfOiAxNjQ1LFxuICAgIOOBkeOBqTogMTM3NCxcbiAgICDjgZPjgag6IDczOTcsXG4gICAg44GT44GuOiAxNTQyLFxuICAgIOOBk+OCjTogLTI3NTcsXG4gICAg44GV44GEOiAtNzE0LFxuICAgIOOBleOCkjogOTc2LFxuICAgIFwi44GXLFwiOiAxNTU3LFxuICAgIFwi44GX44CBXCI6IDE1NTcsXG4gICAg44GX44GEOiAtMzcxNCxcbiAgICDjgZfjgZ86IDM1NjIsXG4gICAg44GX44GmOiAxNDQ5LFxuICAgIOOBl+OBqjogMjYwOCxcbiAgICDjgZfjgb46IDEyMDAsXG4gICAgXCLjgZkuXCI6IC0xMzEwLFxuICAgIFwi44GZ44CCXCI6IC0xMzEwLFxuICAgIOOBmeOCizogNjUyMSxcbiAgICBcIuOBmixcIjogMzQyNixcbiAgICBcIuOBmuOAgVwiOiAzNDI2LFxuICAgIOOBmuOBqzogODQxLFxuICAgIOOBneOBhjogNDI4LFxuICAgIFwi44GfLlwiOiA4ODc1LFxuICAgIFwi44Gf44CCXCI6IDg4NzUsXG4gICAg44Gf44GEOiAtNTk0LFxuICAgIOOBn+OBrjogODEyLFxuICAgIOOBn+OCijogLTExODMsXG4gICAg44Gf44KLOiAtODUzLFxuICAgIFwi44GgLlwiOiA0MDk4LFxuICAgIFwi44Gg44CCXCI6IDQwOTgsXG4gICAg44Gg44GjOiAxMDA0LFxuICAgIOOBo+OBnzogLTQ3NDgsXG4gICAg44Gj44GmOiAzMDAsXG4gICAg44Gm44GEOiA2MjQwLFxuICAgIOOBpuOBijogODU1LFxuICAgIOOBpuOCgjogMzAyLFxuICAgIOOBp+OBmTogMTQzNyxcbiAgICDjgafjgas6IC0xNDgyLFxuICAgIOOBp+OBrzogMjI5NSxcbiAgICDjgajjgYY6IC0xMzg3LFxuICAgIOOBqOOBlzogMjI2NixcbiAgICDjgajjga46IDU0MSxcbiAgICDjgajjgoI6IC0zNTQzLFxuICAgIOOBqeOBhjogNDY2NCxcbiAgICDjgarjgYQ6IDE3OTYsXG4gICAg44Gq44GPOiAtOTAzLFxuICAgIOOBquOBqTogMjEzNSxcbiAgICBcIuOBqyxcIjogLTEwMjEsXG4gICAgXCLjgavjgIFcIjogLTEwMjEsXG4gICAg44Gr44GXOiAxNzcxLFxuICAgIOOBq+OBqjogMTkwNixcbiAgICDjgavjga86IDI2NDQsXG4gICAgXCLjga4sXCI6IC03MjQsXG4gICAgXCLjga7jgIFcIjogLTcyNCxcbiAgICDjga7lrZA6IC0xMDAwLFxuICAgIFwi44GvLFwiOiAxMzM3LFxuICAgIFwi44Gv44CBXCI6IDEzMzcsXG4gICAg44G544GNOiAyMTgxLFxuICAgIOOBvuOBlzogMTExMyxcbiAgICDjgb7jgZk6IDY5NDMsXG4gICAg44G+44GjOiAtMTU0OSxcbiAgICDjgb7jgac6IDYxNTQsXG4gICAg44G+44KMOiAtNzkzLFxuICAgIOOCieOBlzogMTQ3OSxcbiAgICDjgonjgow6IDY4MjAsXG4gICAg44KL44KLOiAzODE4LFxuICAgIFwi44KMLFwiOiA4NTQsXG4gICAgXCLjgozjgIFcIjogODU0LFxuICAgIOOCjOOBnzogMTg1MCxcbiAgICDjgozjgaY6IDEzNzUsXG4gICAg44KM44GwOiAtMzI0NixcbiAgICDjgozjgos6IDEwOTEsXG4gICAg44KP44KMOiAtNjA1LFxuICAgIOOCk+OBoDogNjA2LFxuICAgIOOCk+OBpzogNzk4LFxuICAgIOOCq+aciDogOTkwLFxuICAgIOS8muitsDogODYwLFxuICAgIOWFpeOCijogMTIzMixcbiAgICDlpKfkvJo6IDIyMTcsXG4gICAg5aeL44KBOiAxNjgxLFxuICAgIOW4gjogOTY1LFxuICAgIOaWsOiBnjogLTUwNTUsXG4gICAgXCLml6UsXCI6IDk3NCxcbiAgICBcIuaXpeOAgVwiOiA5NzQsXG4gICAg56S+5LyaOiAyMDI0LFxuICAgIO+9tuaciDogOTkwLFxuICB9O1xuICB0aGlzLlRDMV9fID0ge1xuICAgIEFBQTogMTA5MyxcbiAgICBISEg6IDEwMjksXG4gICAgSEhNOiA1ODAsXG4gICAgSElJOiA5OTgsXG4gICAgSE9IOiAtMzkwLFxuICAgIEhPTTogLTMzMSxcbiAgICBJSEk6IDExNjksXG4gICAgSU9IOiAtMTQyLFxuICAgIElPSTogLTEwMTUsXG4gICAgSU9NOiA0NjcsXG4gICAgTU1IOiAxODcsXG4gICAgT09JOiAtMTgzMixcbiAgfTtcbiAgdGhpcy5UQzJfXyA9IHtcbiAgICBISE86IDIwODgsXG4gICAgSElJOiAtMTAyMyxcbiAgICBITU06IC0xMTU0LFxuICAgIElISTogLTE5NjUsXG4gICAgS0tIOiA3MDMsXG4gICAgT0lJOiAtMjY0OSxcbiAgfTtcbiAgdGhpcy5UQzNfXyA9IHtcbiAgICBBQUE6IC0yOTQsXG4gICAgSEhIOiAzNDYsXG4gICAgSEhJOiAtMzQxLFxuICAgIEhJSTogLTEwODgsXG4gICAgSElLOiA3MzEsXG4gICAgSE9IOiAtMTQ4NixcbiAgICBJSEg6IDEyOCxcbiAgICBJSEk6IC0zMDQxLFxuICAgIElITzogLTE5MzUsXG4gICAgSUlIOiAtODI1LFxuICAgIElJTTogLTEwMzUsXG4gICAgSU9JOiAtNTQyLFxuICAgIEtISDogLTEyMTYsXG4gICAgS0tBOiA0OTEsXG4gICAgS0tIOiAtMTIxNyxcbiAgICBLT0s6IC0xMDA5LFxuICAgIE1ISDogLTI2OTQsXG4gICAgTUhNOiAtNDU3LFxuICAgIE1ITzogMTIzLFxuICAgIE1NSDogLTQ3MSxcbiAgICBOTkg6IC0xNjg5LFxuICAgIE5OTzogNjYyLFxuICAgIE9ITzogLTMzOTMsXG4gIH07XG4gIHRoaXMuVEM0X18gPSB7XG4gICAgSEhIOiAtMjAzLFxuICAgIEhISTogMTM0NCxcbiAgICBISEs6IDM2NSxcbiAgICBISE06IC0xMjIsXG4gICAgSEhOOiAxODIsXG4gICAgSEhPOiA2NjksXG4gICAgSElIOiA4MDQsXG4gICAgSElJOiA2NzksXG4gICAgSE9IOiA0NDYsXG4gICAgSUhIOiA2OTUsXG4gICAgSUhPOiAtMjMyNCxcbiAgICBJSUg6IDMyMSxcbiAgICBJSUk6IDE0OTcsXG4gICAgSUlPOiA2NTYsXG4gICAgSU9POiA1NCxcbiAgICBLQUs6IDQ4NDUsXG4gICAgS0tBOiAzMzg2LFxuICAgIEtLSzogMzA2NSxcbiAgICBNSEg6IC00MDUsXG4gICAgTUhJOiAyMDEsXG4gICAgTU1IOiAtMjQxLFxuICAgIE1NTTogNjYxLFxuICAgIE1PTTogODQxLFxuICB9O1xuICB0aGlzLlRRMV9fID0ge1xuICAgIEJISEg6IC0yMjcsXG4gICAgQkhISTogMzE2LFxuICAgIEJISUg6IC0xMzIsXG4gICAgQklISDogNjAsXG4gICAgQklJSTogMTU5NSxcbiAgICBCTkhIOiAtNzQ0LFxuICAgIEJPSEg6IDIyNSxcbiAgICBCT09POiAtOTA4LFxuICAgIE9BS0s6IDQ4MixcbiAgICBPSEhIOiAyODEsXG4gICAgT0hJSDogMjQ5LFxuICAgIE9JSEk6IDIwMCxcbiAgICBPSUlIOiAtNjgsXG4gIH07XG4gIHRoaXMuVFEyX18gPSB7IEJJSEg6IC0xNDAxLCBCSUlJOiAtMTAzMywgQktBSzogLTU0MywgQk9PTzogLTU1OTEgfTtcbiAgdGhpcy5UUTNfXyA9IHtcbiAgICBCSEhIOiA0NzgsXG4gICAgQkhITTogLTEwNzMsXG4gICAgQkhJSDogMjIyLFxuICAgIEJISUk6IC01MDQsXG4gICAgQklJSDogLTExNixcbiAgICBCSUlJOiAtMTA1LFxuICAgIEJNSEk6IC04NjMsXG4gICAgQk1ITTogLTQ2NCxcbiAgICBCT01IOiA2MjAsXG4gICAgT0hISDogMzQ2LFxuICAgIE9ISEk6IDE3MjksXG4gICAgT0hJSTogOTk3LFxuICAgIE9ITUg6IDQ4MSxcbiAgICBPSUhIOiA2MjMsXG4gICAgT0lJSDogMTM0NCxcbiAgICBPS0FLOiAyNzkyLFxuICAgIE9LSEg6IDU4NyxcbiAgICBPS0tBOiA2NzksXG4gICAgT09ISDogMTEwLFxuICAgIE9PSUk6IC02ODUsXG4gIH07XG4gIHRoaXMuVFE0X18gPSB7XG4gICAgQkhISDogLTcyMSxcbiAgICBCSEhNOiAtMzYwNCxcbiAgICBCSElJOiAtOTY2LFxuICAgIEJJSUg6IC02MDcsXG4gICAgQklJSTogLTIxODEsXG4gICAgT0FBQTogLTI3NjMsXG4gICAgT0FLSzogMTgwLFxuICAgIE9ISEg6IC0yOTQsXG4gICAgT0hISTogMjQ0NixcbiAgICBPSEhPOiA0ODAsXG4gICAgT0hJSDogLTE1NzMsXG4gICAgT0lISDogMTkzNSxcbiAgICBPSUhJOiAtNDkzLFxuICAgIE9JSUg6IDYyNixcbiAgICBPSUlJOiAtNDAwNyxcbiAgICBPS0FLOiAtODE1NixcbiAgfTtcbiAgdGhpcy5UVzFfXyA9IHsg44Gr44Gk44GEOiAtNDY4MSwg5p2x5Lqs6YO9OiAyMDI2IH07XG4gIHRoaXMuVFcyX18gPSB7XG4gICAg44GC44KL56iLOiAtMjA0OSxcbiAgICDjgYTjgaPjgZ86IC0xMjU2LFxuICAgIOOBk+OCjeOBjDogLTI0MzQsXG4gICAg44GX44KH44GGOiAzODczLFxuICAgIOOBneOBruW+jDogLTQ0MzAsXG4gICAg44Gg44Gj44GmOiAtMTA0OSxcbiAgICDjgabjgYTjgZ86IDE4MzMsXG4gICAg44Go44GX44GmOiAtNDY1NyxcbiAgICDjgajjgoLjgas6IC00NTE3LFxuICAgIOOCguOBruOBpzogMTg4MixcbiAgICDkuIDmsJfjgas6IC03OTIsXG4gICAg5Yid44KB44GmOiAtMTUxMixcbiAgICDlkIzmmYLjgas6IC04MDk3LFxuICAgIOWkp+OBjeOBqjogLTEyNTUsXG4gICAg5a++44GX44GmOiAtMjcyMSxcbiAgICDnpL7kvJrlhZo6IC0zMjE2LFxuICB9O1xuICB0aGlzLlRXM19fID0ge1xuICAgIOOBhOOBn+OBoDogLTE3MzQsXG4gICAg44GX44Gm44GEOiAxMzE0LFxuICAgIOOBqOOBl+OBpjogLTQzMTQsXG4gICAg44Gr44Gk44GEOiAtNTQ4MyxcbiAgICDjgavjgajjgaM6IC01OTg5LFxuICAgIOOBq+W9k+OBnzogLTYyNDcsXG4gICAgXCLjga7jgacsXCI6IC03MjcsXG4gICAgXCLjga7jgafjgIFcIjogLTcyNyxcbiAgICDjga7jgoLjga46IC02MDAsXG4gICAg44KM44GL44KJOiAtMzc1MixcbiAgICDljYHkuozmnIg6IC0yMjg3LFxuICB9O1xuICB0aGlzLlRXNF9fID0ge1xuICAgIFwi44GE44GGLlwiOiA4NTc2LFxuICAgIFwi44GE44GG44CCXCI6IDg1NzYsXG4gICAg44GL44KJ44GqOiAtMjM0OCxcbiAgICDjgZfjgabjgYQ6IDI5NTgsXG4gICAgXCLjgZ/jgYwsXCI6IDE1MTYsXG4gICAgXCLjgZ/jgYzjgIFcIjogMTUxNixcbiAgICDjgabjgYTjgos6IDE1MzgsXG4gICAg44Go44GE44GGOiAxMzQ5LFxuICAgIOOBvuOBl+OBnzogNTU0MyxcbiAgICDjgb7jgZvjgpM6IDEwOTcsXG4gICAg44KI44GG44GoOiAtNDI1OCxcbiAgICDjgojjgovjgag6IDU4NjUsXG4gIH07XG4gIHRoaXMuVUMxX18gPSB7IEE6IDQ4NCwgSzogOTMsIE06IDY0NSwgTzogLTUwNSB9O1xuICB0aGlzLlVDMl9fID0geyBBOiA4MTksIEg6IDEwNTksIEk6IDQwOSwgTTogMzk4NywgTjogNTc3NSwgTzogNjQ2IH07XG4gIHRoaXMuVUMzX18gPSB7IEE6IC0xMzcwLCBJOiAyMzExIH07XG4gIHRoaXMuVUM0X18gPSB7XG4gICAgQTogLTI2NDMsXG4gICAgSDogMTgwOSxcbiAgICBJOiAtMTAzMixcbiAgICBLOiAtMzQ1MCxcbiAgICBNOiAzNTY1LFxuICAgIE46IDM4NzYsXG4gICAgTzogNjY0NixcbiAgfTtcbiAgdGhpcy5VQzVfXyA9IHsgSDogMzEzLCBJOiAtMTIzOCwgSzogLTc5OSwgTTogNTM5LCBPOiAtODMxIH07XG4gIHRoaXMuVUM2X18gPSB7IEg6IC01MDYsIEk6IC0yNTMsIEs6IDg3LCBNOiAyNDcsIE86IC0zODcgfTtcbiAgdGhpcy5VUDFfXyA9IHsgTzogLTIxNCB9O1xuICB0aGlzLlVQMl9fID0geyBCOiA2OSwgTzogOTM1IH07XG4gIHRoaXMuVVAzX18gPSB7IEI6IDE4OSB9O1xuICB0aGlzLlVRMV9fID0ge1xuICAgIEJIOiAyMSxcbiAgICBCSTogLTEyLFxuICAgIEJLOiAtOTksXG4gICAgQk46IDE0MixcbiAgICBCTzogLTU2LFxuICAgIE9IOiAtOTUsXG4gICAgT0k6IDQ3NyxcbiAgICBPSzogNDEwLFxuICAgIE9POiAtMjQyMixcbiAgfTtcbiAgdGhpcy5VUTJfXyA9IHsgQkg6IDIxNiwgQkk6IDExMywgT0s6IDE3NTkgfTtcbiAgdGhpcy5VUTNfXyA9IHtcbiAgICBCQTogLTQ3OSxcbiAgICBCSDogNDIsXG4gICAgQkk6IDE5MTMsXG4gICAgQks6IC03MTk4LFxuICAgIEJNOiAzMTYwLFxuICAgIEJOOiA2NDI3LFxuICAgIEJPOiAxNDc2MSxcbiAgICBPSTogLTgyNyxcbiAgICBPTjogLTMyMTIsXG4gIH07XG4gIHRoaXMuVVcxX18gPSB7XG4gICAgXCIsXCI6IDE1NixcbiAgICBcIuOAgVwiOiAxNTYsXG4gICAgXCLjgIxcIjogLTQ2MyxcbiAgICDjgYI6IC05NDEsXG4gICAg44GGOiAtMTI3LFxuICAgIOOBjDogLTU1MyxcbiAgICDjgY06IDEyMSxcbiAgICDjgZM6IDUwNSxcbiAgICDjgac6IC0yMDEsXG4gICAg44GoOiAtNTQ3LFxuICAgIOOBqTogLTEyMyxcbiAgICDjgas6IC03ODksXG4gICAg44GuOiAtMTg1LFxuICAgIOOBrzogLTg0NyxcbiAgICDjgoI6IC00NjYsXG4gICAg44KEOiAtNDcwLFxuICAgIOOCiDogMTgyLFxuICAgIOOCiTogLTI5MixcbiAgICDjgoo6IDIwOCxcbiAgICDjgow6IDE2OSxcbiAgICDjgpI6IC00NDYsXG4gICAg44KTOiAtMTM3LFxuICAgIFwi44O7XCI6IC0xMzUsXG4gICAg5Li7OiAtNDAyLFxuICAgIOS6rDogLTI2OCxcbiAgICDljLo6IC05MTIsXG4gICAg5Y2IOiA4NzEsXG4gICAg5Zu9OiAtNDYwLFxuICAgIOWkpzogNTYxLFxuICAgIOWnlDogNzI5LFxuICAgIOW4gjogLTQxMSxcbiAgICDml6U6IC0xNDEsXG4gICAg55CGOiAzNjEsXG4gICAg55SfOiAtNDA4LFxuICAgIOecjDogLTM4NixcbiAgICDpg706IC03MTgsXG4gICAgXCLvvaJcIjogLTQ2MyxcbiAgICBcIu+9pVwiOiAtMTM1LFxuICB9O1xuICB0aGlzLlVXMl9fID0ge1xuICAgIFwiLFwiOiAtODI5LFxuICAgIFwi44CBXCI6IC04MjksXG4gICAg44CHOiA4OTIsXG4gICAgXCLjgIxcIjogLTY0NSxcbiAgICBcIuOAjVwiOiAzMTQ1LFxuICAgIOOBgjogLTUzOCxcbiAgICDjgYQ6IDUwNSxcbiAgICDjgYY6IDEzNCxcbiAgICDjgYo6IC01MDIsXG4gICAg44GLOiAxNDU0LFxuICAgIOOBjDogLTg1NixcbiAgICDjgY86IC00MTIsXG4gICAg44GTOiAxMTQxLFxuICAgIOOBlTogODc4LFxuICAgIOOBljogNTQwLFxuICAgIOOBlzogMTUyOSxcbiAgICDjgZk6IC02NzUsXG4gICAg44GbOiAzMDAsXG4gICAg44GdOiAtMTAxMSxcbiAgICDjgZ86IDE4OCxcbiAgICDjgaA6IDE4MzcsXG4gICAg44GkOiAtOTQ5LFxuICAgIOOBpjogLTI5MSxcbiAgICDjgac6IC0yNjgsXG4gICAg44GoOiAtOTgxLFxuICAgIOOBqTogMTI3MyxcbiAgICDjgao6IDEwNjMsXG4gICAg44GrOiAtMTc2NCxcbiAgICDjga46IDEzMCxcbiAgICDjga86IC00MDksXG4gICAg44GyOiAtMTI3MyxcbiAgICDjgbk6IDEyNjEsXG4gICAg44G+OiA2MDAsXG4gICAg44KCOiAtMTI2MyxcbiAgICDjgoQ6IC00MDIsXG4gICAg44KIOiAxNjM5LFxuICAgIOOCijogLTU3OSxcbiAgICDjgos6IC02OTQsXG4gICAg44KMOiA1NzEsXG4gICAg44KSOiAtMjUxNixcbiAgICDjgpM6IDIwOTUsXG4gICAg44KiOiAtNTg3LFxuICAgIOOCqzogMzA2LFxuICAgIOOCrTogNTY4LFxuICAgIOODgzogODMxLFxuICAgIOS4iTogLTc1OCxcbiAgICDkuI06IC0yMTUwLFxuICAgIOS4ljogLTMwMixcbiAgICDkuK06IC05NjgsXG4gICAg5Li7OiAtODYxLFxuICAgIOS6izogNDkyLFxuICAgIOS6ujogLTEyMyxcbiAgICDkvJo6IDk3OCxcbiAgICDkv506IDM2MixcbiAgICDlhaU6IDU0OCxcbiAgICDliJ06IC0zMDI1LFxuICAgIOWJrzogLTE1NjYsXG4gICAg5YyXOiAtMzQxNCxcbiAgICDljLo6IC00MjIsXG4gICAg5aSnOiAtMTc2OSxcbiAgICDlpKk6IC04NjUsXG4gICAg5aSqOiAtNDgzLFxuICAgIOWtkDogLTE1MTksXG4gICAg5a2mOiA3NjAsXG4gICAg5a6fOiAxMDIzLFxuICAgIOWwjzogLTIwMDksXG4gICAg5biCOiAtODEzLFxuICAgIOW5tDogLTEwNjAsXG4gICAg5by3OiAxMDY3LFxuICAgIOaJizogLTE1MTksXG4gICAg5o+6OiAtMTAzMyxcbiAgICDmlL86IDE1MjIsXG4gICAg5paHOiAtMTM1NSxcbiAgICDmlrA6IC0xNjgyLFxuICAgIOaXpTogLTE4MTUsXG4gICAg5piOOiAtMTQ2MixcbiAgICDmnIA6IC02MzAsXG4gICAg5pydOiAtMTg0MyxcbiAgICDmnKw6IC0xNjUwLFxuICAgIOadsTogLTkzMSxcbiAgICDmnpw6IC02NjUsXG4gICAg5qyhOiAtMjM3OCxcbiAgICDmsJE6IC0xODAsXG4gICAg5rCXOiAtMTc0MCxcbiAgICDnkIY6IDc1MixcbiAgICDnmbo6IDUyOSxcbiAgICDnm646IC0xNTg0LFxuICAgIOebuDogLTI0MixcbiAgICDnnIw6IC0xMTY1LFxuICAgIOerizogLTc2MyxcbiAgICDnrKw6IDgxMCxcbiAgICDnsbM6IDUwOSxcbiAgICDoh6o6IC0xMzUzLFxuICAgIOihjDogODM4LFxuICAgIOilvzogLTc0NCxcbiAgICDopos6IC0zODc0LFxuICAgIOiqvzogMTAxMCxcbiAgICDorbA6IDExOTgsXG4gICAg6L68OiAzMDQxLFxuICAgIOmWizogMTc1OCxcbiAgICDplpM6IC0xMjU3LFxuICAgIFwi772iXCI6IC02NDUsXG4gICAgXCLvvaNcIjogMzE0NSxcbiAgICDvva86IDgzMSxcbiAgICDvvbE6IC01ODcsXG4gICAg7722OiAzMDYsXG4gICAg7723OiA1NjgsXG4gIH07XG4gIHRoaXMuVVczX18gPSB7XG4gICAgXCIsXCI6IDQ4ODksXG4gICAgMTogLTgwMCxcbiAgICBcIuKIklwiOiAtMTcyMyxcbiAgICBcIuOAgVwiOiA0ODg5LFxuICAgIOOAhTogLTIzMTEsXG4gICAg44CHOiA1ODI3LFxuICAgIFwi44CNXCI6IDI2NzAsXG4gICAgXCLjgJNcIjogLTM1NzMsXG4gICAg44GCOiAtMjY5NixcbiAgICDjgYQ6IDEwMDYsXG4gICAg44GGOiAyMzQyLFxuICAgIOOBiDogMTk4MyxcbiAgICDjgYo6IC00ODY0LFxuICAgIOOBizogLTExNjMsXG4gICAg44GMOiAzMjcxLFxuICAgIOOBjzogMTAwNCxcbiAgICDjgZE6IDM4OCxcbiAgICDjgZI6IDQwMSxcbiAgICDjgZM6IC0zNTUyLFxuICAgIOOBlDogLTMxMTYsXG4gICAg44GVOiAtMTA1OCxcbiAgICDjgZc6IC0zOTUsXG4gICAg44GZOiA1ODQsXG4gICAg44GbOiAzNjg1LFxuICAgIOOBnTogLTUyMjgsXG4gICAg44GfOiA4NDIsXG4gICAg44GhOiAtNTIxLFxuICAgIOOBozogLTE0NDQsXG4gICAg44GkOiAtMTA4MSxcbiAgICDjgaY6IDYxNjcsXG4gICAg44GnOiAyMzE4LFxuICAgIOOBqDogMTY5MSxcbiAgICDjgak6IC04OTksXG4gICAg44GqOiAtMjc4OCxcbiAgICDjgas6IDI3NDUsXG4gICAg44GuOiA0MDU2LFxuICAgIOOBrzogNDU1NSxcbiAgICDjgbI6IC0yMTcxLFxuICAgIOOBtTogLTE3OTgsXG4gICAg44G4OiAxMTk5LFxuICAgIOOBuzogLTU1MTYsXG4gICAg44G+OiAtNDM4NCxcbiAgICDjgb86IC0xMjAsXG4gICAg44KBOiAxMjA1LFxuICAgIOOCgjogMjMyMyxcbiAgICDjgoQ6IC03ODgsXG4gICAg44KIOiAtMjAyLFxuICAgIOOCiTogNzI3LFxuICAgIOOCijogNjQ5LFxuICAgIOOCizogNTkwNSxcbiAgICDjgow6IDI3NzMsXG4gICAg44KPOiAtMTIwNyxcbiAgICDjgpI6IDY2MjAsXG4gICAg44KTOiAtNTE4LFxuICAgIOOCojogNTUxLFxuICAgIOOCsDogMTMxOSxcbiAgICDjgrk6IDg3NCxcbiAgICDjg4M6IC0xMzUwLFxuICAgIOODiDogNTIxLFxuICAgIOODoDogMTEwOSxcbiAgICDjg6s6IDE1OTEsXG4gICAg44OtOiAyMjAxLFxuICAgIOODszogMjc4LFxuICAgIFwi44O7XCI6IC0zNzk0LFxuICAgIOS4gDogLTE2MTksXG4gICAg5LiLOiAtMTc1OSxcbiAgICDkuJY6IC0yMDg3LFxuICAgIOS4oTogMzgxNSxcbiAgICDkuK06IDY1MyxcbiAgICDkuLs6IC03NTgsXG4gICAg5LqIOiAtMTE5MyxcbiAgICDkuow6IDk3NCxcbiAgICDkuro6IDI3NDIsXG4gICAg5LuKOiA3OTIsXG4gICAg5LuWOiAxODg5LFxuICAgIOS7pTogLTEzNjgsXG4gICAg5L2OOiA4MTEsXG4gICAg5L2VOiA0MjY1LFxuICAgIOS9nDogLTM2MSxcbiAgICDkv506IC0yNDM5LFxuICAgIOWFgzogNDg1OCxcbiAgICDlhZo6IDM1OTMsXG4gICAg5YWoOiAxNTc0LFxuICAgIOWFrDogLTMwMzAsXG4gICAg5YWtOiA3NTUsXG4gICAg5YWxOiAtMTg4MCxcbiAgICDlhoY6IDU4MDcsXG4gICAg5YaNOiAzMDk1LFxuICAgIOWIhjogNDU3LFxuICAgIOWInTogMjQ3NSxcbiAgICDliKU6IDExMjksXG4gICAg5YmNOiAyMjg2LFxuICAgIOWJrzogNDQzNyxcbiAgICDlips6IDM2NSxcbiAgICDli5U6IC05NDksXG4gICAg5YuZOiAtMTg3MixcbiAgICDljJY6IDEzMjcsXG4gICAg5YyXOiAtMTAzOCxcbiAgICDljLo6IDQ2NDYsXG4gICAg5Y2DOiAtMjMwOSxcbiAgICDljYg6IC03ODMsXG4gICAg5Y2UOiAtMTAwNixcbiAgICDlj6M6IDQ4MyxcbiAgICDlj7M6IDEyMzMsXG4gICAg5ZCEOiAzNTg4LFxuICAgIOWQiDogLTI0MSxcbiAgICDlkIw6IDM5MDYsXG4gICAg5ZKMOiAtODM3LFxuICAgIOWToTogNDUxMyxcbiAgICDlm706IDY0MixcbiAgICDlnos6IDEzODksXG4gICAg5aC0OiAxMjE5LFxuICAgIOWkljogLTI0MSxcbiAgICDlprs6IDIwMTYsXG4gICAg5a2mOiAtMTM1NixcbiAgICDlrok6IC00MjMsXG4gICAg5a6fOiAtMTAwOCxcbiAgICDlrrY6IDEwNzgsXG4gICAg5bCPOiAtNTEzLFxuICAgIOWwkTogLTMxMDIsXG4gICAg5beeOiAxMTU1LFxuICAgIOW4gjogMzE5NyxcbiAgICDlubM6IC0xODA0LFxuICAgIOW5tDogMjQxNixcbiAgICDluoM6IC0xMDMwLFxuICAgIOW6nDogMTYwNSxcbiAgICDluqY6IDE0NTIsXG4gICAg5bu6OiAtMjM1MixcbiAgICDlvZM6IC0zODg1LFxuICAgIOW+lzogMTkwNSxcbiAgICDmgJ06IC0xMjkxLFxuICAgIOaApzogMTgyMixcbiAgICDmiLg6IC00ODgsXG4gICAg5oyHOiAtMzk3MyxcbiAgICDmlL86IC0yMDEzLFxuICAgIOaVmTogLTE0NzksXG4gICAg5pWwOiAzMjIyLFxuICAgIOaWhzogLTE0ODksXG4gICAg5pawOiAxNzY0LFxuICAgIOaXpTogMjA5OSxcbiAgICDml6c6IDU3OTIsXG4gICAg5pioOiAtNjYxLFxuICAgIOaZgjogLTEyNDgsXG4gICAg5pucOiAtOTUxLFxuICAgIOacgDogLTkzNyxcbiAgICDmnIg6IDQxMjUsXG4gICAg5pyfOiAzNjAsXG4gICAg5p2OOiAzMDk0LFxuICAgIOadkTogMzY0LFxuICAgIOadsTogLTgwNSxcbiAgICDmoLg6IDUxNTYsXG4gICAg5qOuOiAyNDM4LFxuICAgIOalrTogNDg0LFxuICAgIOawjzogMjYxMyxcbiAgICDmsJE6IC0xNjk0LFxuICAgIOaxujogLTEwNzMsXG4gICAg5rOVOiAxODY4LFxuICAgIOa1tzogLTQ5NSxcbiAgICDnhKE6IDk3OSxcbiAgICDniak6IDQ2MSxcbiAgICDnibk6IC0zODUwLFxuICAgIOeUnzogLTI3MyxcbiAgICDnlKg6IDkxNCxcbiAgICDnlLo6IDEyMTUsXG4gICAg55qEOiA3MzEzLFxuICAgIOebtDogLTE4MzUsXG4gICAg55yBOiA3OTIsXG4gICAg55yMOiA2MjkzLFxuICAgIOefpTogLTE1MjgsXG4gICAg56eBOiA0MjMxLFxuICAgIOeojjogNDAxLFxuICAgIOerizogLTk2MCxcbiAgICDnrKw6IDEyMDEsXG4gICAg57GzOiA3NzY3LFxuICAgIOezuzogMzA2NixcbiAgICDntIQ6IDM2NjMsXG4gICAg57SaOiAxMzg0LFxuICAgIOe1sTogLTQyMjksXG4gICAg57ePOiAxMTYzLFxuICAgIOe3mjogMTI1NSxcbiAgICDogIU6IDY0NTcsXG4gICAg6IO9OiA3MjUsXG4gICAg6IeqOiAtMjg2OSxcbiAgICDoi7E6IDc4NSxcbiAgICDopos6IDEwNDQsXG4gICAg6Kq/OiAtNTYyLFxuICAgIOiyoTogLTczMyxcbiAgICDosrs6IDE3NzcsXG4gICAg6LuKOiAxODM1LFxuICAgIOi7jTogMTM3NSxcbiAgICDovrw6IC0xNTA0LFxuICAgIOmAmjogLTExMzYsXG4gICAg6YG4OiAtNjgxLFxuICAgIOmDjjogMTAyNixcbiAgICDpg6E6IDQ0MDQsXG4gICAg6YOoOiAxMjAwLFxuICAgIOmHkTogMjE2MyxcbiAgICDplbc6IDQyMSxcbiAgICDplos6IC0xNDMyLFxuICAgIOmWkzogMTMwMixcbiAgICDplqI6IC0xMjgyLFxuICAgIOmbqDogMjAwOSxcbiAgICDpm7s6IC0xMDQ1LFxuICAgIOmdnjogMjA2NixcbiAgICDpp4U6IDE2MjAsXG4gICAgXCLvvJFcIjogLTgwMCxcbiAgICBcIu+9o1wiOiAyNjcwLFxuICAgIFwi772lXCI6IC0zNzk0LFxuICAgIO+9rzogLTEzNTAsXG4gICAg772xOiA1NTEsXG4gICAg7724776eOiAxMzE5LFxuICAgIO+9vTogODc0LFxuICAgIO++hDogNTIxLFxuICAgIO++kTogMTEwOSxcbiAgICDvvpk6IDE1OTEsXG4gICAg776bOiAyMjAxLFxuICAgIO++nTogMjc4LFxuICB9O1xuICB0aGlzLlVXNF9fID0ge1xuICAgIFwiLFwiOiAzOTMwLFxuICAgIFwiLlwiOiAzNTA4LFxuICAgIFwi4oCVXCI6IC00ODQxLFxuICAgIFwi44CBXCI6IDM5MzAsXG4gICAgXCLjgIJcIjogMzUwOCxcbiAgICDjgIc6IDQ5OTksXG4gICAgXCLjgIxcIjogMTg5NSxcbiAgICBcIuOAjVwiOiAzNzk4LFxuICAgIFwi44CTXCI6IC01MTU2LFxuICAgIOOBgjogNDc1MixcbiAgICDjgYQ6IC0zNDM1LFxuICAgIOOBhjogLTY0MCxcbiAgICDjgYg6IC0yNTE0LFxuICAgIOOBijogMjQwNSxcbiAgICDjgYs6IDUzMCxcbiAgICDjgYw6IDYwMDYsXG4gICAg44GNOiAtNDQ4MixcbiAgICDjgY46IC0zODIxLFxuICAgIOOBjzogLTM3ODgsXG4gICAg44GROiAtNDM3NixcbiAgICDjgZI6IC00NzM0LFxuICAgIOOBkzogMjI1NSxcbiAgICDjgZQ6IDE5NzksXG4gICAg44GVOiAyODY0LFxuICAgIOOBlzogLTg0MyxcbiAgICDjgZg6IC0yNTA2LFxuICAgIOOBmTogLTczMSxcbiAgICDjgZo6IDEyNTEsXG4gICAg44GbOiAxODEsXG4gICAg44GdOiA0MDkxLFxuICAgIOOBnzogNTAzNCxcbiAgICDjgaA6IDU0MDgsXG4gICAg44GhOiAtMzY1NCxcbiAgICDjgaM6IC01ODgyLFxuICAgIOOBpDogLTE2NTksXG4gICAg44GmOiAzOTk0LFxuICAgIOOBpzogNzQxMCxcbiAgICDjgag6IDQ1NDcsXG4gICAg44GqOiA1NDMzLFxuICAgIOOBqzogNjQ5OSxcbiAgICDjgaw6IDE4NTMsXG4gICAg44GtOiAxNDEzLFxuICAgIOOBrjogNzM5NixcbiAgICDjga86IDg1NzgsXG4gICAg44GwOiAxOTQwLFxuICAgIOOBsjogNDI0OSxcbiAgICDjgbM6IC00MTM0LFxuICAgIOOBtTogMTM0NSxcbiAgICDjgbg6IDY2NjUsXG4gICAg44G5OiAtNzQ0LFxuICAgIOOBuzogMTQ2NCxcbiAgICDjgb46IDEwNTEsXG4gICAg44G/OiAtMjA4MixcbiAgICDjgoA6IC04ODIsXG4gICAg44KBOiAtNTA0NixcbiAgICDjgoI6IDQxNjksXG4gICAg44KDOiAtMjY2NixcbiAgICDjgoQ6IDI3OTUsXG4gICAg44KHOiAtMTU0NCxcbiAgICDjgog6IDMzNTEsXG4gICAg44KJOiAtMjkyMixcbiAgICDjgoo6IC05NzI2LFxuICAgIOOCizogLTE0ODk2LFxuICAgIOOCjDogLTI2MTMsXG4gICAg44KNOiAtNDU3MCxcbiAgICDjgo86IC0xNzgzLFxuICAgIOOCkjogMTMxNTAsXG4gICAg44KTOiAtMjM1MixcbiAgICDjgqs6IDIxNDUsXG4gICAg44KzOiAxNzg5LFxuICAgIOOCuzogMTI4NyxcbiAgICDjg4M6IC03MjQsXG4gICAg44OIOiAtNDAzLFxuICAgIOODoTogLTE2MzUsXG4gICAg44OpOiAtODgxLFxuICAgIOODqjogLTU0MSxcbiAgICDjg6s6IC04NTYsXG4gICAg44OzOiAtMzYzNyxcbiAgICBcIuODu1wiOiAtNDM3MSxcbiAgICDjg7w6IC0xMTg3MCxcbiAgICDkuIA6IC0yMDY5LFxuICAgIOS4rTogMjIxMCxcbiAgICDkuog6IDc4MixcbiAgICDkuos6IC0xOTAsXG4gICAg5LqVOiAtMTc2OCxcbiAgICDkuro6IDEwMzYsXG4gICAg5LulOiA1NDQsXG4gICAg5LyaOiA5NTAsXG4gICAg5L2TOiAtMTI4NixcbiAgICDkvZw6IDUzMCxcbiAgICDlgbQ6IDQyOTIsXG4gICAg5YWIOiA2MDEsXG4gICAg5YWaOiAtMjAwNixcbiAgICDlhbE6IC0xMjEyLFxuICAgIOWGhTogNTg0LFxuICAgIOWGhjogNzg4LFxuICAgIOWInTogMTM0NyxcbiAgICDliY06IDE2MjMsXG4gICAg5YmvOiAzODc5LFxuICAgIOWKmzogLTMwMixcbiAgICDli5U6IC03NDAsXG4gICAg5YuZOiAtMjcxNSxcbiAgICDljJY6IDc3NixcbiAgICDljLo6IDQ1MTcsXG4gICAg5Y2UOiAxMDEzLFxuICAgIOWPgjogMTU1NSxcbiAgICDlkIg6IC0xODM0LFxuICAgIOWSjDogLTY4MSxcbiAgICDlk6E6IC05MTAsXG4gICAg5ZmoOiAtODUxLFxuICAgIOWbnjogMTUwMCxcbiAgICDlm706IC02MTksXG4gICAg5ZySOiAtMTIwMCxcbiAgICDlnLA6IDg2NixcbiAgICDloLQ6IC0xNDEwLFxuICAgIOWhgTogLTIwOTQsXG4gICAg5aOrOiAtMTQxMyxcbiAgICDlpJo6IDEwNjcsXG4gICAg5aSnOiA1NzEsXG4gICAg5a2QOiAtNDgwMixcbiAgICDlraY6IC0xMzk3LFxuICAgIOWumjogLTEwNTcsXG4gICAg5a+6OiAtODA5LFxuICAgIOWwjzogMTkxMCxcbiAgICDlsYs6IC0xMzI4LFxuICAgIOWxsTogLTE1MDAsXG4gICAg5bO2OiAtMjA1NixcbiAgICDlt506IC0yNjY3LFxuICAgIOW4gjogMjc3MSxcbiAgICDlubQ6IDM3NCxcbiAgICDluoE6IC00NTU2LFxuICAgIOW+jDogNDU2LFxuICAgIOaApzogNTUzLFxuICAgIOaEnzogOTE2LFxuICAgIOaJgDogLTE1NjYsXG4gICAg5pSvOiA4NTYsXG4gICAg5pS5OiA3ODcsXG4gICAg5pS/OiAyMTgyLFxuICAgIOaVmTogNzA0LFxuICAgIOaWhzogNTIyLFxuICAgIOaWuTogLTg1NixcbiAgICDml6U6IDE3OTgsXG4gICAg5pmCOiAxODI5LFxuICAgIOacgDogODQ1LFxuICAgIOaciDogLTkwNjYsXG4gICAg5pyoOiAtNDg1LFxuICAgIOadpTogLTQ0MixcbiAgICDmoKE6IC0zNjAsXG4gICAg5qWtOiAtMTA0MyxcbiAgICDmsI86IDUzODgsXG4gICAg5rCROiAtMjcxNixcbiAgICDmsJc6IC05MTAsXG4gICAg5rKiOiAtOTM5LFxuICAgIOa4iDogLTU0MyxcbiAgICDniak6IC03MzUsXG4gICAg546HOiA2NzIsXG4gICAg55CDOiAtMTI2NyxcbiAgICDnlJ86IC0xMjg2LFxuICAgIOeUozogLTExMDEsXG4gICAg55SwOiAtMjkwMCxcbiAgICDnlLo6IDE4MjYsXG4gICAg55qEOiAyNTg2LFxuICAgIOebrjogOTIyLFxuICAgIOecgTogLTM0ODUsXG4gICAg55yMOiAyOTk3LFxuICAgIOepujogLTg2NyxcbiAgICDnq4s6IC0yMTEyLFxuICAgIOesrDogNzg4LFxuICAgIOexszogMjkzNyxcbiAgICDns7s6IDc4NixcbiAgICDntIQ6IDIxNzEsXG4gICAg57WMOiAxMTQ2LFxuICAgIOe1sTogLTExNjksXG4gICAg57ePOiA5NDAsXG4gICAg57eaOiAtOTk0LFxuICAgIOe9sjogNzQ5LFxuICAgIOiAhTogMjE0NSxcbiAgICDog706IC03MzAsXG4gICAg6IisOiAtODUyLFxuICAgIOihjDogLTc5MixcbiAgICDopo86IDc5MixcbiAgICDoraY6IC0xMTg0LFxuICAgIOitsDogLTI0NCxcbiAgICDosLc6IC0xMDAwLFxuICAgIOiznjogNzMwLFxuICAgIOi7ijogLTE0ODEsXG4gICAg6LuNOiAxMTU4LFxuICAgIOi8qjogLTE0MzMsXG4gICAg6L68OiAtMzM3MCxcbiAgICDov5E6IDkyOSxcbiAgICDpgZM6IC0xMjkxLFxuICAgIOmBuDogMjU5NixcbiAgICDpg446IC00ODY2LFxuICAgIOmDvTogMTE5MixcbiAgICDph446IC0xMTAwLFxuICAgIOmKgDogLTIyMTMsXG4gICAg6ZW3OiAzNTcsXG4gICAg6ZaTOiAtMjM0NCxcbiAgICDpmaI6IC0yMjk3LFxuICAgIOmamzogLTI2MDQsXG4gICAg6Zu7OiAtODc4LFxuICAgIOmgmDogLTE2NTksXG4gICAg6aGMOiAtNzkyLFxuICAgIOmkqDogLTE5ODQsXG4gICAg6aaWOiAxNzQ5LFxuICAgIOmrmDogMjEyMCxcbiAgICBcIu+9olwiOiAxODk1LFxuICAgIFwi772jXCI6IDM3OTgsXG4gICAgXCLvvaVcIjogLTQzNzEsXG4gICAg772vOiAtNzI0LFxuICAgIO+9sDogLTExODcwLFxuICAgIO+9tjogMjE0NSxcbiAgICDvvbo6IDE3ODksXG4gICAg772+OiAxMjg3LFxuICAgIO++hDogLTQwMyxcbiAgICDvvpI6IC0xNjM1LFxuICAgIO++lzogLTg4MSxcbiAgICDvvpg6IC01NDEsXG4gICAg776ZOiAtODU2LFxuICAgIO++nTogLTM2MzcsXG4gIH07XG4gIHRoaXMuVVc1X18gPSB7XG4gICAgXCIsXCI6IDQ2NSxcbiAgICBcIi5cIjogLTI5OSxcbiAgICAxOiAtNTE0LFxuICAgIEUyOiAtMzI3NjgsXG4gICAgXCJdXCI6IC0yNzYyLFxuICAgIFwi44CBXCI6IDQ2NSxcbiAgICBcIuOAglwiOiAtMjk5LFxuICAgIFwi44CMXCI6IDM2MyxcbiAgICDjgYI6IDE2NTUsXG4gICAg44GEOiAzMzEsXG4gICAg44GGOiAtNTAzLFxuICAgIOOBiDogMTE5OSxcbiAgICDjgYo6IDUyNyxcbiAgICDjgYs6IDY0NyxcbiAgICDjgYw6IC00MjEsXG4gICAg44GNOiAxNjI0LFxuICAgIOOBjjogMTk3MSxcbiAgICDjgY86IDMxMixcbiAgICDjgZI6IC05ODMsXG4gICAg44GVOiAtMTUzNyxcbiAgICDjgZc6IC0xMzcxLFxuICAgIOOBmTogLTg1MixcbiAgICDjgaA6IC0xMTg2LFxuICAgIOOBoTogMTA5MyxcbiAgICDjgaM6IDUyLFxuICAgIOOBpDogOTIxLFxuICAgIOOBpjogLTE4LFxuICAgIOOBpzogLTg1MCxcbiAgICDjgag6IC0xMjcsXG4gICAg44GpOiAxNjgyLFxuICAgIOOBqjogLTc4NyxcbiAgICDjgas6IC0xMjI0LFxuICAgIOOBrjogLTYzNSxcbiAgICDjga86IC01NzgsXG4gICAg44G5OiAxMDAxLFxuICAgIOOBvzogNTAyLFxuICAgIOOCgTogODY1LFxuICAgIOOCgzogMzM1MCxcbiAgICDjgoc6IDg1NCxcbiAgICDjgoo6IC0yMDgsXG4gICAg44KLOiA0MjksXG4gICAg44KMOiA1MDQsXG4gICAg44KPOiA0MTksXG4gICAg44KSOiAtMTI2NCxcbiAgICDjgpM6IDMyNyxcbiAgICDjgqQ6IDI0MSxcbiAgICDjg6s6IDQ1MSxcbiAgICDjg7M6IC0zNDMsXG4gICAg5LitOiAtODcxLFxuICAgIOS6rDogNzIyLFxuICAgIOS8mjogLTExNTMsXG4gICAg5YWaOiAtNjU0LFxuICAgIOWLmTogMzUxOSxcbiAgICDljLo6IC05MDEsXG4gICAg5ZGKOiA4NDgsXG4gICAg5ZOhOiAyMTA0LFxuICAgIOWkpzogLTEyOTYsXG4gICAg5a2mOiAtNTQ4LFxuICAgIOWumjogMTc4NSxcbiAgICDltZA6IC0xMzA0LFxuICAgIOW4gjogLTI5OTEsXG4gICAg5bitOiA5MjEsXG4gICAg5bm0OiAxNzYzLFxuICAgIOaAnTogODcyLFxuICAgIOaJgDogLTgxNCxcbiAgICDmjJk6IDE2MTgsXG4gICAg5pawOiAtMTY4MixcbiAgICDml6U6IDIxOCxcbiAgICDmnIg6IC00MzUzLFxuICAgIOafuzogOTMyLFxuICAgIOagvDogMTM1NixcbiAgICDmqZ86IC0xNTA4LFxuICAgIOawjzogLTEzNDcsXG4gICAg55SwOiAyNDAsXG4gICAg55S6OiAtMzkxMixcbiAgICDnmoQ6IC0zMTQ5LFxuICAgIOebuDogMTMxOSxcbiAgICDnnIE6IC0xMDUyLFxuICAgIOecjDogLTQwMDMsXG4gICAg56CUOiAtOTk3LFxuICAgIOekvjogLTI3OCxcbiAgICDnqbo6IC04MTMsXG4gICAg57WxOiAxOTU1LFxuICAgIOiAhTogLTIyMzMsXG4gICAg6KGoOiA2NjMsXG4gICAg6KqeOiAtMTA3MyxcbiAgICDorbA6IDEyMTksXG4gICAg6YG4OiAtMTAxOCxcbiAgICDpg446IC0zNjgsXG4gICAg6ZW3OiA3ODYsXG4gICAg6ZaTOiAxMTkxLFxuICAgIOmhjDogMjM2OCxcbiAgICDppKg6IC02ODksXG4gICAgXCLvvJFcIjogLTUxNCxcbiAgICDvvKXvvJI6IC0zMjc2OCxcbiAgICBcIu+9olwiOiAzNjMsXG4gICAg772yOiAyNDEsXG4gICAg776ZOiA0NTEsXG4gICAg776dOiAtMzQzLFxuICB9O1xuICB0aGlzLlVXNl9fID0ge1xuICAgIFwiLFwiOiAyMjcsXG4gICAgXCIuXCI6IDgwOCxcbiAgICAxOiAtMjcwLFxuICAgIEUxOiAzMDYsXG4gICAgXCLjgIFcIjogMjI3LFxuICAgIFwi44CCXCI6IDgwOCxcbiAgICDjgYI6IC0zMDcsXG4gICAg44GGOiAxODksXG4gICAg44GLOiAyNDEsXG4gICAg44GMOiAtNzMsXG4gICAg44GPOiAtMTIxLFxuICAgIOOBkzogLTIwMCxcbiAgICDjgZg6IDE3ODIsXG4gICAg44GZOiAzODMsXG4gICAg44GfOiAtNDI4LFxuICAgIOOBozogNTczLFxuICAgIOOBpjogLTEwMTQsXG4gICAg44GnOiAxMDEsXG4gICAg44GoOiAtMTA1LFxuICAgIOOBqjogLTI1MyxcbiAgICDjgas6IC0xNDksXG4gICAg44GuOiAtNDE3LFxuICAgIOOBrzogLTIzNixcbiAgICDjgoI6IC0yMDYsXG4gICAg44KKOiAxODcsXG4gICAg44KLOiAtMTM1LFxuICAgIOOCkjogMTk1LFxuICAgIOODqzogLTY3MyxcbiAgICDjg7M6IC00OTYsXG4gICAg5LiAOiAtMjc3LFxuICAgIOS4rTogMjAxLFxuICAgIOS7tjogLTgwMCxcbiAgICDkvJo6IDYyNCxcbiAgICDliY06IDMwMixcbiAgICDljLo6IDE3OTIsXG4gICAg5ZOhOiAtMTIxMixcbiAgICDlp5Q6IDc5OCxcbiAgICDlraY6IC05NjAsXG4gICAg5biCOiA4ODcsXG4gICAg5bqDOiAtNjk1LFxuICAgIOW+jDogNTM1LFxuICAgIOalrTogLTY5NyxcbiAgICDnm7g6IDc1MyxcbiAgICDnpL46IC01MDcsXG4gICAg56aPOiA5NzQsXG4gICAg56m6OiAtODIyLFxuICAgIOiAhTogMTgxMSxcbiAgICDpgKM6IDQ2MyxcbiAgICDpg446IDEwODIsXG4gICAgXCLvvJFcIjogLTI3MCxcbiAgICDvvKXvvJE6IDMwNixcbiAgICDvvpk6IC02NzMsXG4gICAg776dOiAtNDk2LFxuICB9O1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5UaW55U2VnbWVudGVyLnByb3RvdHlwZS5jdHlwZV8gPSBmdW5jdGlvbiAoc3RyKSB7XG4gIGZvciAodmFyIGkgaW4gdGhpcy5jaGFydHlwZV8pIHtcbiAgICBpZiAoc3RyLm1hdGNoKHRoaXMuY2hhcnR5cGVfW2ldWzBdKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hhcnR5cGVfW2ldWzFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJPXCI7XG59O1xuXG5UaW55U2VnbWVudGVyLnByb3RvdHlwZS50c18gPSBmdW5jdGlvbiAodikge1xuICBpZiAodikge1xuICAgIHJldHVybiB2O1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuVGlueVNlZ21lbnRlci5wcm90b3R5cGUuc2VnbWVudCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICBpZiAoaW5wdXQgPT0gbnVsbCB8fCBpbnB1dCA9PSB1bmRlZmluZWQgfHwgaW5wdXQgPT0gXCJcIikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBzZWcgPSBbXCJCM1wiLCBcIkIyXCIsIFwiQjFcIl07XG4gIHZhciBjdHlwZSA9IFtcIk9cIiwgXCJPXCIsIFwiT1wiXTtcbiAgdmFyIG8gPSBpbnB1dC5zcGxpdChcIlwiKTtcbiAgZm9yIChpID0gMDsgaSA8IG8ubGVuZ3RoOyArK2kpIHtcbiAgICBzZWcucHVzaChvW2ldKTtcbiAgICBjdHlwZS5wdXNoKHRoaXMuY3R5cGVfKG9baV0pKTtcbiAgfVxuICBzZWcucHVzaChcIkUxXCIpO1xuICBzZWcucHVzaChcIkUyXCIpO1xuICBzZWcucHVzaChcIkUzXCIpO1xuICBjdHlwZS5wdXNoKFwiT1wiKTtcbiAgY3R5cGUucHVzaChcIk9cIik7XG4gIGN0eXBlLnB1c2goXCJPXCIpO1xuICB2YXIgd29yZCA9IHNlZ1szXTtcbiAgdmFyIHAxID0gXCJVXCI7XG4gIHZhciBwMiA9IFwiVVwiO1xuICB2YXIgcDMgPSBcIlVcIjtcbiAgZm9yICh2YXIgaSA9IDQ7IGkgPCBzZWcubGVuZ3RoIC0gMzsgKytpKSB7XG4gICAgdmFyIHNjb3JlID0gdGhpcy5CSUFTX187XG4gICAgdmFyIHcxID0gc2VnW2kgLSAzXTtcbiAgICB2YXIgdzIgPSBzZWdbaSAtIDJdO1xuICAgIHZhciB3MyA9IHNlZ1tpIC0gMV07XG4gICAgdmFyIHc0ID0gc2VnW2ldO1xuICAgIHZhciB3NSA9IHNlZ1tpICsgMV07XG4gICAgdmFyIHc2ID0gc2VnW2kgKyAyXTtcbiAgICB2YXIgYzEgPSBjdHlwZVtpIC0gM107XG4gICAgdmFyIGMyID0gY3R5cGVbaSAtIDJdO1xuICAgIHZhciBjMyA9IGN0eXBlW2kgLSAxXTtcbiAgICB2YXIgYzQgPSBjdHlwZVtpXTtcbiAgICB2YXIgYzUgPSBjdHlwZVtpICsgMV07XG4gICAgdmFyIGM2ID0gY3R5cGVbaSArIDJdO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVAxX19bcDFdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVQMl9fW3AyXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUDNfX1twM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlAxX19bcDEgKyBwMl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlAyX19bcDIgKyBwM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVcxX19bdzFdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVXMl9fW3cyXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VVzNfX1t3M10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVc0X19bdzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVXNV9fW3c1XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VVzZfX1t3Nl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlcxX19bdzIgKyB3M10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlcyX19bdzMgKyB3NF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlczX19bdzQgKyB3NV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFcxX19bdzEgKyB3MiArIHczXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UVzJfX1t3MiArIHczICsgdzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRXM19fW3czICsgdzQgKyB3NV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFc0X19bdzQgKyB3NSArIHc2XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VQzFfX1tjMV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVUMyX19bYzJdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVDM19fW2MzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VQzRfX1tjNF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVUM1X19bYzVdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVDNl9fW2M2XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CQzFfX1tjMiArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CQzJfX1tjMyArIGM0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CQzNfX1tjNCArIGM1XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UQzFfX1tjMSArIGMyICsgYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRDMl9fW2MyICsgYzMgKyBjNF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVEMzX19bYzMgKyBjNCArIGM1XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UQzRfX1tjNCArIGM1ICsgYzZdKTtcbiAgICAvLyAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UQzVfX1tjNCArIGM1ICsgYzZdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVRMV9fW3AxICsgYzFdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVRMl9fW3AyICsgYzJdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVRM19fW3AzICsgYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJRMV9fW3AyICsgYzIgKyBjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlEyX19bcDIgKyBjMyArIGM0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CUTNfX1twMyArIGMyICsgYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJRNF9fW3AzICsgYzMgKyBjNF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFExX19bcDIgKyBjMSArIGMyICsgYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRRMl9fW3AyICsgYzIgKyBjMyArIGM0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UUTNfX1twMyArIGMxICsgYzIgKyBjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFE0X19bcDMgKyBjMiArIGMzICsgYzRdKTtcbiAgICB2YXIgcCA9IFwiT1wiO1xuICAgIGlmIChzY29yZSA+IDApIHtcbiAgICAgIHJlc3VsdC5wdXNoKHdvcmQpO1xuICAgICAgd29yZCA9IFwiXCI7XG4gICAgICBwID0gXCJCXCI7XG4gICAgfVxuICAgIHAxID0gcDI7XG4gICAgcDIgPSBwMztcbiAgICBwMyA9IHA7XG4gICAgd29yZCArPSBzZWdbaV07XG4gIH1cbiAgcmVzdWx0LnB1c2god29yZCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpbnlTZWdtZW50ZXI7XG4iLCJpbXBvcnQgVGlueVNlZ21lbnRlciBmcm9tIFwiLi4vLi4vZXh0ZXJuYWwvdGlueS1zZWdtZW50ZXJcIjtcbmltcG9ydCB7IFRSSU1fQ0hBUl9QQVRURVJOIH0gZnJvbSBcIi4vRGVmYXVsdFRva2VuaXplclwiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL3Rva2VuaXplclwiO1xuLy8gQHRzLWlnbm9yZVxuY29uc3Qgc2VnbWVudGVyID0gbmV3IFRpbnlTZWdtZW50ZXIoKTtcblxuZnVuY3Rpb24gcGlja1Rva2Vuc0FzSmFwYW5lc2UoY29udGVudDogc3RyaW5nLCB0cmltUGF0dGVybjogUmVnRXhwKTogc3RyaW5nW10ge1xuICByZXR1cm4gY29udGVudFxuICAgIC5zcGxpdCh0cmltUGF0dGVybilcbiAgICAuZmlsdGVyKCh4KSA9PiB4ICE9PSBcIlwiKVxuICAgIC5mbGF0TWFwPHN0cmluZz4oKHgpID0+IHNlZ21lbnRlci5zZWdtZW50KHgpKTtcbn1cblxuLyoqXG4gKiBKYXBhbmVzZSBuZWVkcyBvcmlnaW5hbCBsb2dpYy5cbiAqL1xuZXhwb3J0IGNsYXNzIEphcGFuZXNlVG9rZW5pemVyIGltcGxlbWVudHMgVG9rZW5pemVyIHtcbiAgdG9rZW5pemUoY29udGVudDogc3RyaW5nLCByYXc/OiBib29sZWFuKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBwaWNrVG9rZW5zQXNKYXBhbmVzZShjb250ZW50LCByYXcgPyAvIC9nIDogdGhpcy5nZXRUcmltUGF0dGVybigpKTtcbiAgfVxuXG4gIGdldFRyaW1QYXR0ZXJuKCk6IFJlZ0V4cCB7XG4gICAgcmV0dXJuIFRSSU1fQ0hBUl9QQVRURVJOO1xuICB9XG5cbiAgc2hvdWxkSWdub3JlKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEJvb2xlYW4oc3RyLm1hdGNoKC9eW+OBgS3jgpPvvYEt772a77yhLe+8uuOAguOAgeODvOOAgF0qJC8pKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXJhYmljVG9rZW5pemVyIH0gZnJvbSBcIi4vdG9rZW5pemVycy9BcmFiaWNUb2tlbml6ZXJcIjtcbmltcG9ydCB7IERlZmF1bHRUb2tlbml6ZXIgfSBmcm9tIFwiLi90b2tlbml6ZXJzL0RlZmF1bHRUb2tlbml6ZXJcIjtcbmltcG9ydCB7IEphcGFuZXNlVG9rZW5pemVyIH0gZnJvbSBcIi4vdG9rZW5pemVycy9KYXBhbmVzZVRva2VuaXplclwiO1xuaW1wb3J0IHsgVG9rZW5pemVTdHJhdGVneSB9IGZyb20gXCIuL1Rva2VuaXplU3RyYXRlZ3lcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUb2tlbml6ZXIge1xuICB0b2tlbml6ZShjb250ZW50OiBzdHJpbmcsIHJhdz86IGJvb2xlYW4pOiBzdHJpbmdbXTtcbiAgZ2V0VHJpbVBhdHRlcm4oKTogUmVnRXhwO1xuICBzaG91bGRJZ25vcmUocXVlcnk6IHN0cmluZyk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUb2tlbml6ZXIoc3RyYXRlZ3k6IFRva2VuaXplU3RyYXRlZ3kpOiBUb2tlbml6ZXIge1xuICBzd2l0Y2ggKHN0cmF0ZWd5Lm5hbWUpIHtcbiAgICBjYXNlIFwiZGVmYXVsdFwiOlxuICAgICAgcmV0dXJuIG5ldyBEZWZhdWx0VG9rZW5pemVyKCk7XG4gICAgY2FzZSBcImFyYWJpY1wiOlxuICAgICAgcmV0dXJuIG5ldyBBcmFiaWNUb2tlbml6ZXIoKTtcbiAgICBjYXNlIFwiamFwYW5lc2VcIjpcbiAgICAgIHJldHVybiBuZXcgSmFwYW5lc2VUb2tlbml6ZXIoKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIHN0cmF0ZWd5IG5hbWU6ICR7c3RyYXRlZ3l9YCk7XG4gIH1cbn1cbiIsInR5cGUgTmFtZSA9IFwiZGVmYXVsdFwiIHwgXCJqYXBhbmVzZVwiIHwgXCJhcmFiaWNcIjtcblxuZXhwb3J0IGNsYXNzIFRva2VuaXplU3RyYXRlZ3kge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfdmFsdWVzOiBUb2tlbml6ZVN0cmF0ZWd5W10gPSBbXTtcblxuICBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVCA9IG5ldyBUb2tlbml6ZVN0cmF0ZWd5KFwiZGVmYXVsdFwiLCAzKTtcbiAgc3RhdGljIHJlYWRvbmx5IEpBUEFORVNFID0gbmV3IFRva2VuaXplU3RyYXRlZ3koXCJqYXBhbmVzZVwiLCAyKTtcbiAgc3RhdGljIHJlYWRvbmx5IEFSQUJJQyA9IG5ldyBUb2tlbml6ZVN0cmF0ZWd5KFwiYXJhYmljXCIsIDMpO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IocmVhZG9ubHkgbmFtZTogTmFtZSwgcmVhZG9ubHkgdHJpZ2dlclRocmVzaG9sZDogbnVtYmVyKSB7XG4gICAgVG9rZW5pemVTdHJhdGVneS5fdmFsdWVzLnB1c2godGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5hbWUobmFtZTogc3RyaW5nKTogVG9rZW5pemVTdHJhdGVneSB7XG4gICAgcmV0dXJuIFRva2VuaXplU3RyYXRlZ3kuX3ZhbHVlcy5maW5kKCh4KSA9PiB4Lm5hbWUgPT09IG5hbWUpITtcbiAgfVxuXG4gIHN0YXRpYyB2YWx1ZXMoKTogVG9rZW5pemVTdHJhdGVneVtdIHtcbiAgICByZXR1cm4gVG9rZW5pemVTdHJhdGVneS5fdmFsdWVzO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3Qga2V5QnkgPSA8VD4oXG4gIHZhbHVlczogVFtdLFxuICB0b0tleTogKHQ6IFQpID0+IHN0cmluZ1xuKTogeyBba2V5OiBzdHJpbmddOiBUIH0gPT5cbiAgdmFsdWVzLnJlZHVjZShcbiAgICAocHJldiwgY3VyLCBfMSwgXzIsIGsgPSB0b0tleShjdXIpKSA9PiAoKHByZXZba10gPSBjdXIpLCBwcmV2KSxcbiAgICB7fSBhcyB7IFtrZXk6IHN0cmluZ106IFQgfVxuICApO1xuXG5leHBvcnQgY29uc3QgZ3JvdXBCeSA9IDxUPihcbiAgdmFsdWVzOiBUW10sXG4gIHRvS2V5OiAodDogVCkgPT4gc3RyaW5nXG4pOiB7IFtrZXk6IHN0cmluZ106IFRbXSB9ID0+XG4gIHZhbHVlcy5yZWR1Y2UoXG4gICAgKHByZXYsIGN1ciwgXzEsIF8yLCBrID0gdG9LZXkoY3VyKSkgPT4gKFxuICAgICAgKHByZXZba10gfHwgKHByZXZba10gPSBbXSkpLnB1c2goY3VyKSwgcHJldlxuICAgICksXG4gICAge30gYXMgeyBba2V5OiBzdHJpbmddOiBUW10gfVxuICApO1xuXG5leHBvcnQgZnVuY3Rpb24gdW5pcTxUPih2YWx1ZXM6IFRbXSk6IFRbXSB7XG4gIHJldHVybiBbLi4ubmV3IFNldCh2YWx1ZXMpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXFXaXRoPFQ+KGFycjogVFtdLCBmbjogKG9uZTogVCwgb3RoZXI6IFQpID0+IGJvb2xlYW4pIHtcbiAgcmV0dXJuIGFyci5maWx0ZXIoXG4gICAgKGVsZW1lbnQsIGluZGV4KSA9PiBhcnIuZmluZEluZGV4KChzdGVwKSA9PiBmbihlbGVtZW50LCBzdGVwKSkgPT09IGluZGV4XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUVxdWFscyhcbiAgYXJyMTogdW5rbm93bltdLFxuICBhcnIyOiB1bmtub3duW10sXG4gIGxlbmd0aD86IG51bWJlclxuKTogYm9vbGVhbiB7XG4gIGxldCBsID0gTWF0aC5tYXgoYXJyMS5sZW5ndGgsIGFycjIubGVuZ3RoKTtcbiAgaWYgKGxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbCA9IE1hdGgubWluKGwsIGxlbmd0aCk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChhcnIxW2ldICE9PSBhcnIyW2ldKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUVxdWFsc1VudGlsKGFycjE6IHVua25vd25bXSwgYXJyMjogdW5rbm93bltdKTogbnVtYmVyIHtcbiAgbGV0IGwgPSBNYXRoLm1pbihhcnIxLmxlbmd0aCwgYXJyMi5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChhcnIxW2ldICE9PSBhcnIyW2ldKSB7XG4gICAgICByZXR1cm4gaSAtIDE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGwgLSAxO1xufVxuIiwiaW1wb3J0IHtcbiAgQXBwLFxuICBFZGl0b3IsXG4gIE1hcmtkb3duVmlldyxcbiAgcGFyc2VGcm9udE1hdHRlckFsaWFzZXMsXG4gIFRGaWxlLFxufSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IHVuaXEgfSBmcm9tIFwiLi91dGlsL2NvbGxlY3Rpb24taGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBcHBIZWxwZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcDogQXBwKSB7fVxuXG4gIGdldEFsaWFzZXMoZmlsZTogVEZpbGUpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHBhcnNlRnJvbnRNYXR0ZXJBbGlhc2VzKFxuICAgICAgICB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKT8uZnJvbnRtYXR0ZXJcbiAgICAgICkgPz8gW11cbiAgICApO1xuICB9XG5cbiAgZ2V0TWFya2Rvd25WaWV3SW5BY3RpdmVMZWFmKCk6IE1hcmtkb3duVmlldyB8IG51bGwge1xuICAgIGlmICghdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmIS52aWV3IGFzIE1hcmtkb3duVmlldztcbiAgfVxuXG4gIGdldEN1cnJlbnRFZGl0b3IoKTogRWRpdG9yIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWFya2Rvd25WaWV3SW5BY3RpdmVMZWFmKCk/LmVkaXRvciA/PyBudWxsO1xuICB9XG5cbiAgZ2V0Q3VycmVudExpbmUoZWRpdG9yOiBFZGl0b3IpOiBzdHJpbmcge1xuICAgIHJldHVybiBlZGl0b3IuZ2V0TGluZShlZGl0b3IuZ2V0Q3Vyc29yKCkubGluZSk7XG4gIH1cblxuICBnZXRDdXJyZW50TGluZVVudGlsQ3Vyc29yKGVkaXRvcjogRWRpdG9yKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50TGluZShlZGl0b3IpLnNsaWNlKDAsIGVkaXRvci5nZXRDdXJzb3IoKS5jaCk7XG4gIH1cblxuICBzZWFyY2hQaGFudG9tTGlua3MoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB1bmlxKFxuICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLnVucmVzb2x2ZWRMaW5rcylcbiAgICAgICAgLm1hcChPYmplY3Qua2V5cylcbiAgICAgICAgLmZsYXQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVW5zYWZlIG1ldGhvZFxuICAgKi9cbiAgaXNJTUVPbigpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrZG93blZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiEudmlldyBhcyBNYXJrZG93blZpZXc7XG4gICAgY29uc3QgY201b3I2OiBhbnkgPSAobWFya2Rvd25WaWV3LmVkaXRvciBhcyBhbnkpLmNtO1xuXG4gICAgLy8gY202XG4gICAgaWYgKGNtNW9yNj8uaW5wdXRTdGF0ZT8uY29tcG9zaW5nID4gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gY201XG4gICAgcmV0dXJuICEhY201b3I2Py5kaXNwbGF5Py5pbnB1dD8uY29tcG9zaW5nO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBjYXBpdGFsaXplRmlyc3RMZXR0ZXIsXG4gIGxvd2VySW5jbHVkZXNXaXRob3V0U3BhY2UsXG4gIGxvd2VyU3RhcnRzV2l0aCxcbiAgbG93ZXJTdGFydHNXaXRob3V0U3BhY2UsXG59IGZyb20gXCIuLi91dGlsL3N0cmluZ3NcIjtcbmltcG9ydCB7IEluZGV4ZWRXb3JkcyB9IGZyb20gXCIuLi91aS9BdXRvQ29tcGxldGVTdWdnZXN0XCI7XG5pbXBvcnQgeyB1bmlxV2l0aCB9IGZyb20gXCIuLi91dGlsL2NvbGxlY3Rpb24taGVscGVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV29yZCB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBhbGlhc2VzPzogc3RyaW5nW107XG4gIGludGVybmFsTGluaz86IGJvb2xlYW47XG4gIC8vIEFkZCBhZnRlciBqdWRnZVxuICBtYXRjaGVkQWxpYXM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFdvcmRzQnlGaXJzdExldHRlciA9IHsgW2ZpcnN0TGV0dGVyOiBzdHJpbmddOiBXb3JkW10gfTtcblxuaW50ZXJmYWNlIEp1ZGdlbWVudCB7XG4gIHdvcmQ6IFdvcmQ7XG4gIHZhbHVlPzogc3RyaW5nO1xuICBhbGlhczogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2hXb3JkKFxuICB3b3Jkc0J5Rmlyc3RMZXR0ZXI6IFdvcmRzQnlGaXJzdExldHRlcixcbiAga2V5OiBzdHJpbmcsXG4gIHdvcmQ6IFdvcmRcbikge1xuICBpZiAod29yZHNCeUZpcnN0TGV0dGVyW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgIHdvcmRzQnlGaXJzdExldHRlcltrZXldID0gW3dvcmRdO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHdvcmRzQnlGaXJzdExldHRlcltrZXldLnB1c2god29yZCk7XG59XG5cbi8vIFB1YmxpYyBmb3IgdGVzdHNcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZShcbiAgd29yZDogV29yZCxcbiAgcXVlcnk6IHN0cmluZyxcbiAgcXVlcnlTdGFydFdpdGhVcHBlcjogYm9vbGVhblxuKTogSnVkZ2VtZW50IHtcbiAgaWYgKGxvd2VyU3RhcnRzV2l0aG91dFNwYWNlKHdvcmQudmFsdWUsIHF1ZXJ5KSkge1xuICAgIGlmIChxdWVyeVN0YXJ0V2l0aFVwcGVyICYmICF3b3JkLmludGVybmFsTGluaykge1xuICAgICAgY29uc3QgYyA9IGNhcGl0YWxpemVGaXJzdExldHRlcih3b3JkLnZhbHVlKTtcbiAgICAgIHJldHVybiB7IHdvcmQ6IHsgLi4ud29yZCwgdmFsdWU6IGMgfSwgdmFsdWU6IGMsIGFsaWFzOiBmYWxzZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyB3b3JkOiB3b3JkLCB2YWx1ZTogd29yZC52YWx1ZSwgYWxpYXM6IGZhbHNlIH07XG4gICAgfVxuICB9XG4gIGNvbnN0IG1hdGNoZWRBbGlhcyA9IHdvcmQuYWxpYXNlcz8uZmluZCgoYSkgPT5cbiAgICBsb3dlclN0YXJ0c1dpdGhvdXRTcGFjZShhLCBxdWVyeSlcbiAgKTtcbiAgaWYgKG1hdGNoZWRBbGlhcykge1xuICAgIHJldHVybiB7XG4gICAgICB3b3JkOiB7IC4uLndvcmQsIG1hdGNoZWRBbGlhcyB9LFxuICAgICAgdmFsdWU6IG1hdGNoZWRBbGlhcyxcbiAgICAgIGFsaWFzOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyB3b3JkOiB3b3JkLCBhbGlhczogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Z2dlc3RXb3JkcyhcbiAgaW5kZXhlZFdvcmRzOiBJbmRleGVkV29yZHMsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIG1heDogbnVtYmVyXG4pOiBXb3JkW10ge1xuICBjb25zdCBxdWVyeVN0YXJ0V2l0aFVwcGVyID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHF1ZXJ5KSA9PT0gcXVlcnk7XG5cbiAgY29uc3Qgd29yZHMgPSBxdWVyeVN0YXJ0V2l0aFVwcGVyXG4gICAgPyBbXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VycmVudEZpbGVbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VycmVudEZpbGVbcXVlcnkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXN0b21EaWN0aW9uYXJ5W3F1ZXJ5LmNoYXJBdCgwKV0gPz8gW10pLFxuICAgICAgICAuLi4oaW5kZXhlZFdvcmRzLmN1c3RvbURpY3Rpb25hcnlbcXVlcnkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5pbnRlcm5hbExpbmtbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuaW50ZXJuYWxMaW5rW3F1ZXJ5LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpXSA/PyBbXSksXG4gICAgICBdXG4gICAgOiBbXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VycmVudEZpbGVbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VzdG9tRGljdGlvbmFyeVtxdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5pbnRlcm5hbExpbmtbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuaW50ZXJuYWxMaW5rW3F1ZXJ5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpXSA/PyBbXSksXG4gICAgICBdO1xuXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IEFycmF5LmZyb20od29yZHMpXG4gICAgLm1hcCgoeCkgPT4ganVkZ2UoeCwgcXVlcnksIHF1ZXJ5U3RhcnRXaXRoVXBwZXIpKVxuICAgIC5maWx0ZXIoKHgpID0+IHgudmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKGEudmFsdWUhLmxlbmd0aCAhPT0gYi52YWx1ZSEubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBhLnZhbHVlIS5sZW5ndGggPiBiLnZhbHVlIS5sZW5ndGggPyAxIDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS53b3JkLmludGVybmFsTGluayAhPT0gYi53b3JkLmludGVybmFsTGluaykge1xuICAgICAgICByZXR1cm4gYi53b3JkLmludGVybmFsTGluayA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChhLmFsaWFzICE9PSBiLmFsaWFzKSB7XG4gICAgICAgIHJldHVybiBhLmFsaWFzID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfSlcbiAgICAubWFwKCh4KSA9PiB4LndvcmQpXG4gICAgLnNsaWNlKDAsIG1heCk7XG5cbiAgLy8gWFhYOiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBlcXVhbHMgd2l0aCBtYXgsIGJ1dCBpdCBpcyBpbXBvcnRhbnQgZm9yIHBlcmZvcm1hbmNlXG4gIHJldHVybiB1bmlxV2l0aChcbiAgICBjYW5kaWRhdGUsXG4gICAgKGEsIGIpID0+IGEudmFsdWUgPT09IGIudmFsdWUgJiYgYS5pbnRlcm5hbExpbmsgPT09IGIuaW50ZXJuYWxMaW5rXG4gICk7XG59XG5cbi8vIFRPRE86IHJlZmFjdG9yaW5nXG4vLyBQdWJsaWMgZm9yIHRlc3RzXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VCeVBhcnRpYWxNYXRjaChcbiAgd29yZDogV29yZCxcbiAgcXVlcnk6IHN0cmluZyxcbiAgcXVlcnlTdGFydFdpdGhVcHBlcjogYm9vbGVhblxuKTogSnVkZ2VtZW50IHtcbiAgaWYgKGxvd2VyU3RhcnRzV2l0aG91dFNwYWNlKHdvcmQudmFsdWUsIHF1ZXJ5KSkge1xuICAgIGlmIChxdWVyeVN0YXJ0V2l0aFVwcGVyICYmICF3b3JkLmludGVybmFsTGluaykge1xuICAgICAgY29uc3QgYyA9IGNhcGl0YWxpemVGaXJzdExldHRlcih3b3JkLnZhbHVlKTtcbiAgICAgIHJldHVybiB7IHdvcmQ6IHsgLi4ud29yZCwgdmFsdWU6IGMgfSwgdmFsdWU6IGMsIGFsaWFzOiBmYWxzZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyB3b3JkOiB3b3JkLCB2YWx1ZTogd29yZC52YWx1ZSwgYWxpYXM6IGZhbHNlIH07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWF0Y2hlZEFsaWFzU3RhcnRzID0gd29yZC5hbGlhc2VzPy5maW5kKChhKSA9PlxuICAgIGxvd2VyU3RhcnRzV2l0aG91dFNwYWNlKGEsIHF1ZXJ5KVxuICApO1xuICBpZiAobWF0Y2hlZEFsaWFzU3RhcnRzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdvcmQ6IHsgLi4ud29yZCwgbWF0Y2hlZEFsaWFzOiBtYXRjaGVkQWxpYXNTdGFydHMgfSxcbiAgICAgIHZhbHVlOiBtYXRjaGVkQWxpYXNTdGFydHMsXG4gICAgICBhbGlhczogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGxvd2VySW5jbHVkZXNXaXRob3V0U3BhY2Uod29yZC52YWx1ZSwgcXVlcnkpKSB7XG4gICAgcmV0dXJuIHsgd29yZDogd29yZCwgdmFsdWU6IHdvcmQudmFsdWUsIGFsaWFzOiBmYWxzZSB9O1xuICB9XG5cbiAgY29uc3QgbWF0Y2hlZEFsaWFzSW5jbHVkZWQgPSB3b3JkLmFsaWFzZXM/LmZpbmQoKGEpID0+XG4gICAgbG93ZXJJbmNsdWRlc1dpdGhvdXRTcGFjZShhLCBxdWVyeSlcbiAgKTtcbiAgaWYgKG1hdGNoZWRBbGlhc0luY2x1ZGVkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdvcmQ6IHsgLi4ud29yZCwgbWF0Y2hlZEFsaWFzOiBtYXRjaGVkQWxpYXNJbmNsdWRlZCB9LFxuICAgICAgdmFsdWU6IG1hdGNoZWRBbGlhc0luY2x1ZGVkLFxuICAgICAgYWxpYXM6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IHdvcmQ6IHdvcmQsIGFsaWFzOiBmYWxzZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VnZ2VzdFdvcmRzQnlQYXJ0aWFsTWF0Y2goXG4gIGluZGV4ZWRXb3JkczogSW5kZXhlZFdvcmRzLFxuICBxdWVyeTogc3RyaW5nLFxuICBtYXg6IG51bWJlclxuKTogV29yZFtdIHtcbiAgY29uc3QgcXVlcnlTdGFydFdpdGhVcHBlciA9IGNhcGl0YWxpemVGaXJzdExldHRlcihxdWVyeSkgPT09IHF1ZXJ5O1xuXG4gIGNvbnN0IGZsYXRPYmplY3RWYWx1ZXMgPSAob2JqZWN0OiB7IFtmaXJzdExldHRlcjogc3RyaW5nXTogV29yZFtdIH0pID0+XG4gICAgT2JqZWN0LnZhbHVlcyhvYmplY3QpLmZsYXQoKTtcbiAgY29uc3Qgd29yZHMgPSBbXG4gICAgLi4uZmxhdE9iamVjdFZhbHVlcyhpbmRleGVkV29yZHMuY3VycmVudEZpbGUpLFxuICAgIC4uLmZsYXRPYmplY3RWYWx1ZXMoaW5kZXhlZFdvcmRzLmN1c3RvbURpY3Rpb25hcnkpLFxuICAgIC4uLmZsYXRPYmplY3RWYWx1ZXMoaW5kZXhlZFdvcmRzLmludGVybmFsTGluayksXG4gIF07XG5cbiAgY29uc3QgY2FuZGlkYXRlID0gQXJyYXkuZnJvbSh3b3JkcylcbiAgICAubWFwKCh4KSA9PiBqdWRnZUJ5UGFydGlhbE1hdGNoKHgsIHF1ZXJ5LCBxdWVyeVN0YXJ0V2l0aFVwcGVyKSlcbiAgICAuZmlsdGVyKCh4KSA9PiB4LnZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGFzID0gbG93ZXJTdGFydHNXaXRoKGEudmFsdWUhLCBxdWVyeSk7XG4gICAgICBjb25zdCBicyA9IGxvd2VyU3RhcnRzV2l0aChiLnZhbHVlISwgcXVlcnkpO1xuICAgICAgaWYgKGFzICE9PSBicykge1xuICAgICAgICByZXR1cm4gYnMgPyAxIDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS52YWx1ZSEubGVuZ3RoICE9PSBiLnZhbHVlIS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGEudmFsdWUhLmxlbmd0aCA+IGIudmFsdWUhLmxlbmd0aCA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChhLndvcmQuaW50ZXJuYWxMaW5rICE9PSBiLndvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICAgIHJldHVybiBiLndvcmQuaW50ZXJuYWxMaW5rID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgaWYgKGEuYWxpYXMgIT09IGIuYWxpYXMpIHtcbiAgICAgICAgcmV0dXJuIGEuYWxpYXMgPyAxIDogLTE7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9KVxuICAgIC5tYXAoKHgpID0+IHgud29yZClcbiAgICAuc2xpY2UoMCwgbWF4KTtcblxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGUpO1xuICAvLyBYWFg6IFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGVxdWFscyB3aXRoIG1heCwgYnV0IGl0IGlzIGltcG9ydGFudCBmb3IgcGVyZm9ybWFuY2VcbiAgcmV0dXJuIHVuaXFXaXRoKFxuICAgIGNhbmRpZGF0ZSxcbiAgICAoYSwgYikgPT4gYS52YWx1ZSA9PT0gYi52YWx1ZSAmJiBhLmludGVybmFsTGluayA9PT0gYi5pbnRlcm5hbExpbmtcbiAgKTtcbn1cbiIsImltcG9ydCB7IEFwcCwgRmlsZVN5c3RlbUFkYXB0ZXIsIE5vdGljZSwgcmVxdWVzdCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsga2V5QnkgfSBmcm9tIFwiLi4vdXRpbC9jb2xsZWN0aW9uLWhlbHBlclwiO1xuaW1wb3J0IHsgcHVzaFdvcmQsIFdvcmQsIFdvcmRzQnlGaXJzdExldHRlciB9IGZyb20gXCIuL3N1Z2dlc3RlclwiO1xuXG5mdW5jdGlvbiBsaW5lVG9Xb3JkKGxpbmU6IHN0cmluZyk6IFdvcmQge1xuICBjb25zdCBbdmFsdWUsIGRlc2NyaXB0aW9uLCAuLi5hbGlhc2VzXSA9IGxpbmUuc3BsaXQoXCJcXHRcIik7XG4gIHJldHVybiB7XG4gICAgdmFsdWUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgYWxpYXNlcyxcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIEN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIge1xuICBwcml2YXRlIHdvcmRzOiBXb3JkW10gPSBbXTtcbiAgd29yZEJ5VmFsdWU6IHsgW3ZhbHVlOiBzdHJpbmddOiBXb3JkIH07XG4gIHdvcmRzQnlGaXJzdExldHRlcjogV29yZHNCeUZpcnN0TGV0dGVyO1xuXG4gIHByaXZhdGUgYXBwOiBBcHA7XG4gIHByaXZhdGUgZmlsZVN5c3RlbUFkYXB0ZXI6IEZpbGVTeXN0ZW1BZGFwdGVyO1xuICBwcml2YXRlIHBhdGhzOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGF0aHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5maWxlU3lzdGVtQWRhcHRlciA9IGFwcC52YXVsdC5hZGFwdGVyIGFzIEZpbGVTeXN0ZW1BZGFwdGVyO1xuICAgIHRoaXMucGF0aHMgPSBwYXRocztcbiAgfVxuXG4gIHVwZGF0ZVBhdGhzKHBhdGhzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIHRoaXMucGF0aHMgPSBwYXRocztcbiAgfVxuXG4gIGFzeW5jIGxvYWRXb3JkcyhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFdvcmRbXT4ge1xuICAgIGNvbnN0IGNvbnRlbnRzID0gcGF0aC5tYXRjaChuZXcgUmVnRXhwKFwiXmh0dHBzPzovL1wiKSlcbiAgICAgID8gYXdhaXQgcmVxdWVzdCh7IHVybDogcGF0aCB9KVxuICAgICAgOiBhd2FpdCB0aGlzLmZpbGVTeXN0ZW1BZGFwdGVyLnJlYWQocGF0aCk7XG5cbiAgICByZXR1cm4gY29udGVudHNcbiAgICAgIC5zcGxpdCgvXFxyXFxufFxcbi8pXG4gICAgICAubWFwKCh4KSA9PiB4LnJlcGxhY2UoLyUlLiolJS9nLCBcIlwiKSlcbiAgICAgIC5maWx0ZXIoKHgpID0+IHgpXG4gICAgICAubWFwKGxpbmVUb1dvcmQpO1xuICB9XG5cbiAgYXN5bmMgcmVmcmVzaEN1c3RvbVdvcmRzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuY2xlYXJXb3JkcygpO1xuXG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHRoaXMucGF0aHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHdvcmRzID0gYXdhaXQgdGhpcy5sb2FkV29yZHMocGF0aCk7XG4gICAgICAgIHdvcmRzLmZvckVhY2goKHgpID0+IHRoaXMud29yZHMucHVzaCh4KSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBPYmplY3RBbGxvY2F0aW9uSWdub3JlZFxuICAgICAgICBuZXcgTm90aWNlKFxuICAgICAgICAgIGDimqAgRmFpbCB0byBsb2FkICR7cGF0aH0gLS0gVmFyaW91cyBDb21wbGVtZW50cyBQbHVnaW4gLS0gXFxuICR7ZX1gLFxuICAgICAgICAgIDBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLndvcmRCeVZhbHVlID0ga2V5QnkodGhpcy53b3JkcywgKHgpID0+IHgudmFsdWUpO1xuICAgIGZvciAoY29uc3Qgd29yZCBvZiB0aGlzLndvcmRzKSB7XG4gICAgICBwdXNoV29yZCh0aGlzLndvcmRzQnlGaXJzdExldHRlciwgd29yZC52YWx1ZS5jaGFyQXQoMCksIHdvcmQpO1xuICAgICAgd29yZC5hbGlhc2VzPy5mb3JFYWNoKChhKSA9PlxuICAgICAgICBwdXNoV29yZCh0aGlzLndvcmRzQnlGaXJzdExldHRlciwgYS5jaGFyQXQoMCksIHdvcmQpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyV29yZHMoKTogdm9pZCB7XG4gICAgdGhpcy53b3JkcyA9IFtdO1xuICAgIHRoaXMud29yZEJ5VmFsdWUgPSB7fTtcbiAgICB0aGlzLndvcmRzQnlGaXJzdExldHRlciA9IHt9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBBcHAgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGdyb3VwQnksIHVuaXEgfSBmcm9tIFwiLi4vdXRpbC9jb2xsZWN0aW9uLWhlbHBlclwiO1xuaW1wb3J0IHsgV29yZCwgV29yZHNCeUZpcnN0TGV0dGVyIH0gZnJvbSBcIi4vc3VnZ2VzdGVyXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vdG9rZW5pemVyL3Rva2VuaXplclwiO1xuaW1wb3J0IHsgQXBwSGVscGVyIH0gZnJvbSBcIi4uL2FwcC1oZWxwZXJcIjtcbmltcG9ydCB7IGFsbEFscGhhYmV0cyB9IGZyb20gXCIuLi91dGlsL3N0cmluZ3NcIjtcblxuZXhwb3J0IGNsYXNzIEN1cnJlbnRGaWxlV29yZFByb3ZpZGVyIHtcbiAgcHJpdmF0ZSB3b3JkczogV29yZFtdID0gW107XG4gIHdvcmRzQnlGaXJzdExldHRlcjogV29yZHNCeUZpcnN0TGV0dGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXBwOiBBcHAsXG4gICAgcHJpdmF0ZSBhcHBIZWxwZXI6IEFwcEhlbHBlcixcbiAgICBwcml2YXRlIHRva2VuaXplcjogVG9rZW5pemVyXG4gICkge31cblxuICBhc3luYyByZWZyZXNoV29yZHMob25seUVuZ2xpc2g6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmNsZWFyV29yZHMoKTtcblxuICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuYXBwSGVscGVyLmdldEN1cnJlbnRFZGl0b3IoKTtcbiAgICBpZiAoIWVkaXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuICAgIGlmICghZmlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRUb2tlbiA9IHRoaXMudG9rZW5pemVyXG4gICAgICAudG9rZW5pemUoXG4gICAgICAgIGVkaXRvci5nZXRMaW5lKGVkaXRvci5nZXRDdXJzb3IoKS5saW5lKS5zbGljZSgwLCBlZGl0b3IuZ2V0Q3Vyc29yKCkuY2gpXG4gICAgICApXG4gICAgICAubGFzdCgpO1xuXG4gICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNhY2hlZFJlYWQoZmlsZSk7XG4gICAgY29uc3QgdG9rZW5zID0gb25seUVuZ2xpc2hcbiAgICAgID8gdGhpcy50b2tlbml6ZXIudG9rZW5pemUoY29udGVudCkuZmlsdGVyKGFsbEFscGhhYmV0cylcbiAgICAgIDogdGhpcy50b2tlbml6ZXIudG9rZW5pemUoY29udGVudCk7XG4gICAgdGhpcy53b3JkcyA9IHVuaXEodG9rZW5zKVxuICAgICAgLmZpbHRlcigoeCkgPT4geCAhPT0gY3VycmVudFRva2VuKVxuICAgICAgLm1hcCgoeCkgPT4gKHtcbiAgICAgICAgdmFsdWU6IHgsXG4gICAgICB9KSk7XG4gICAgdGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIgPSBncm91cEJ5KHRoaXMud29yZHMsICh4KSA9PiB4LnZhbHVlLmNoYXJBdCgwKSk7XG4gIH1cblxuICBjbGVhcldvcmRzKCk6IHZvaWQge1xuICAgIHRoaXMud29yZHMgPSBbXTtcbiAgICB0aGlzLndvcmRzQnlGaXJzdExldHRlciA9IHt9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBBcHAgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IHB1c2hXb3JkLCBXb3JkLCBXb3Jkc0J5Rmlyc3RMZXR0ZXIgfSBmcm9tIFwiLi9zdWdnZXN0ZXJcIjtcbmltcG9ydCB7IEFwcEhlbHBlciB9IGZyb20gXCIuLi9hcHAtaGVscGVyXCI7XG5pbXBvcnQgeyBleGNsdWRlRW1vamkgfSBmcm9tIFwiLi4vdXRpbC9zdHJpbmdzXCI7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbExpbmtXb3JkUHJvdmlkZXIge1xuICBwcml2YXRlIHdvcmRzOiBXb3JkW10gPSBbXTtcbiAgd29yZHNCeUZpcnN0TGV0dGVyOiBXb3Jkc0J5Rmlyc3RMZXR0ZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHA6IEFwcCwgcHJpdmF0ZSBhcHBIZWxwZXI6IEFwcEhlbHBlcikge31cblxuICByZWZyZXNoV29yZHMoKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhcldvcmRzKCk7XG5cbiAgICBjb25zdCByZXNvbHZlZEludGVybmFsTGlua1dvcmRzID0gdGhpcy5hcHAudmF1bHRcbiAgICAgIC5nZXRNYXJrZG93bkZpbGVzKClcbiAgICAgIC5tYXAoKHgpID0+IHtcbiAgICAgICAgY29uc3QgbGVzc0Vtb2ppVmFsdWUgPSBleGNsdWRlRW1vamkoeC5iYXNlbmFtZSk7XG4gICAgICAgIGNvbnN0IGFsaWFzZXMgPVxuICAgICAgICAgIHguYmFzZW5hbWUgPT09IGxlc3NFbW9qaVZhbHVlXG4gICAgICAgICAgICA/IHRoaXMuYXBwSGVscGVyLmdldEFsaWFzZXMoeClcbiAgICAgICAgICAgIDogW2xlc3NFbW9qaVZhbHVlLCAuLi50aGlzLmFwcEhlbHBlci5nZXRBbGlhc2VzKHgpXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogeC5iYXNlbmFtZSxcbiAgICAgICAgICBhbGlhc2VzLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiB4LnBhdGgsXG4gICAgICAgICAgaW50ZXJuYWxMaW5rOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICBjb25zdCB1bnJlc29sdmVkSW50ZXJuYWxMaW5rV29yZHMgPSB0aGlzLmFwcEhlbHBlclxuICAgICAgLnNlYXJjaFBoYW50b21MaW5rcygpXG4gICAgICAubWFwKCh0ZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IGxlc3NFbW9qaVZhbHVlID0gZXhjbHVkZUVtb2ppKHRleHQpO1xuICAgICAgICBjb25zdCBhbGlhc2VzID0gdGV4dCA9PT0gbGVzc0Vtb2ppVmFsdWUgPyB1bmRlZmluZWQgOiBbbGVzc0Vtb2ppVmFsdWVdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiB0ZXh0LFxuICAgICAgICAgIGFsaWFzZXMsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiTm90IGNyZWF0ZWQgeWV0XCIsXG4gICAgICAgICAgaW50ZXJuYWxMaW5rOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICB0aGlzLndvcmRzID0gWy4uLnJlc29sdmVkSW50ZXJuYWxMaW5rV29yZHMsIC4uLnVucmVzb2x2ZWRJbnRlcm5hbExpbmtXb3Jkc107XG4gICAgZm9yIChjb25zdCB3b3JkIG9mIHRoaXMud29yZHMpIHtcbiAgICAgIHB1c2hXb3JkKHRoaXMud29yZHNCeUZpcnN0TGV0dGVyLCB3b3JkLnZhbHVlLmNoYXJBdCgwKSwgd29yZCk7XG4gICAgICB3b3JkLmFsaWFzZXM/LmZvckVhY2goKGEpID0+XG4gICAgICAgIHB1c2hXb3JkKHRoaXMud29yZHNCeUZpcnN0TGV0dGVyLCBhLmNoYXJBdCgwKSwgd29yZClcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJXb3JkcygpOiB2b2lkIHtcbiAgICB0aGlzLndvcmRzID0gW107XG4gICAgdGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIgPSB7fTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5kZXhlZFdvcmRzIH0gZnJvbSBcIi4uL3VpL0F1dG9Db21wbGV0ZVN1Z2dlc3RcIjtcbmltcG9ydCB7IHN1Z2dlc3RXb3Jkcywgc3VnZ2VzdFdvcmRzQnlQYXJ0aWFsTWF0Y2gsIFdvcmQgfSBmcm9tIFwiLi9zdWdnZXN0ZXJcIjtcblxudHlwZSBOYW1lID0gXCJwcmVmaXhcIiB8IFwicGFydGlhbFwiO1xuXG50eXBlIEhhbmRsZXIgPSAoXG4gIGluZGV4ZWRXb3JkczogSW5kZXhlZFdvcmRzLFxuICBxdWVyeTogc3RyaW5nLFxuICBtYXg6IG51bWJlclxuKSA9PiBXb3JkW107XG5cbmV4cG9ydCBjbGFzcyBNYXRjaFN0cmF0ZWd5IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3ZhbHVlczogTWF0Y2hTdHJhdGVneVtdID0gW107XG5cbiAgc3RhdGljIHJlYWRvbmx5IFBSRUZJWCA9IG5ldyBNYXRjaFN0cmF0ZWd5KFwicHJlZml4XCIsIHN1Z2dlc3RXb3Jkcyk7XG4gIHN0YXRpYyByZWFkb25seSBQQVJUSUFMID0gbmV3IE1hdGNoU3RyYXRlZ3koXG4gICAgXCJwYXJ0aWFsXCIsXG4gICAgc3VnZ2VzdFdvcmRzQnlQYXJ0aWFsTWF0Y2hcbiAgKTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG5hbWU6IE5hbWUsIHJlYWRvbmx5IGhhbmRsZXI6IEhhbmRsZXIpIHtcbiAgICBNYXRjaFN0cmF0ZWd5Ll92YWx1ZXMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTmFtZShuYW1lOiBzdHJpbmcpOiBNYXRjaFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gTWF0Y2hTdHJhdGVneS5fdmFsdWVzLmZpbmQoKHgpID0+IHgubmFtZSA9PT0gbmFtZSkhO1xuICB9XG5cbiAgc3RhdGljIHZhbHVlcygpOiBNYXRjaFN0cmF0ZWd5W10ge1xuICAgIHJldHVybiBNYXRjaFN0cmF0ZWd5Ll92YWx1ZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZGlmaWVyIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbnR5cGUgTmFtZSA9IFwiTm9uZVwiIHwgXCJUYWIvU2hpZnQrVGFiXCIgfCBcIk1vZCtOL01vZCtQXCIgfCBcIk1vZCtKL01vZCtLXCI7XG5pbnRlcmZhY2UgS2V5QmluZCB7XG4gIG1vZGlmaWVyczogTW9kaWZpZXJbXTtcbiAga2V5OiBzdHJpbmcgfCBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3ZhbHVlczogQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzW10gPSBbXTtcblxuICBzdGF0aWMgcmVhZG9ubHkgTk9ORSA9IG5ldyBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMoXG4gICAgXCJOb25lXCIsXG4gICAgeyBtb2RpZmllcnM6IFtdLCBrZXk6IG51bGwgfSxcbiAgICB7IG1vZGlmaWVyczogW10sIGtleTogbnVsbCB9XG4gICk7XG4gIHN0YXRpYyByZWFkb25seSBUQUIgPSBuZXcgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzKFxuICAgIFwiVGFiL1NoaWZ0K1RhYlwiLFxuICAgIHsgbW9kaWZpZXJzOiBbXSwga2V5OiBcIlRhYlwiIH0sXG4gICAgeyBtb2RpZmllcnM6IFtcIlNoaWZ0XCJdLCBrZXk6IFwiVGFiXCIgfVxuICApO1xuICBzdGF0aWMgcmVhZG9ubHkgRU1BQ1MgPSBuZXcgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzKFxuICAgIFwiTW9kK04vTW9kK1BcIixcbiAgICB7IG1vZGlmaWVyczogW1wiTW9kXCJdLCBrZXk6IFwiTlwiIH0sXG4gICAgeyBtb2RpZmllcnM6IFtcIk1vZFwiXSwga2V5OiBcIlBcIiB9XG4gICk7XG4gIHN0YXRpYyByZWFkb25seSBWSU0gPSBuZXcgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzKFxuICAgIFwiTW9kK0ovTW9kK0tcIixcbiAgICB7IG1vZGlmaWVyczogW1wiTW9kXCJdLCBrZXk6IFwiSlwiIH0sXG4gICAgeyBtb2RpZmllcnM6IFtcIk1vZFwiXSwga2V5OiBcIktcIiB9XG4gICk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSBuYW1lOiBOYW1lLFxuICAgIHJlYWRvbmx5IG5leHRLZXk6IEtleUJpbmQsXG4gICAgcmVhZG9ubHkgcHJldmlvdXNLZXk6IEtleUJpbmRcbiAgKSB7XG4gICAgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzLl92YWx1ZXMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTmFtZShuYW1lOiBzdHJpbmcpOiBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMge1xuICAgIHJldHVybiBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMuX3ZhbHVlcy5maW5kKCh4KSA9PiB4Lm5hbWUgPT09IG5hbWUpITtcbiAgfVxuXG4gIHN0YXRpYyB2YWx1ZXMoKTogQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzW10ge1xuICAgIHJldHVybiBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMuX3ZhbHVlcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgZXhjbHVkZUVtb2ppIH0gZnJvbSBcIi4vdXRpbC9zdHJpbmdzXCI7XG5pbXBvcnQgeyBhcnJheUVxdWFsc1VudGlsIH0gZnJvbSBcIi4vdXRpbC9jb2xsZWN0aW9uLWhlbHBlclwiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4vdG9rZW5pemVyL3Rva2VuaXplclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gc3VnZ2VzdENoKFxuICB0b2tlbml6ZXI6IFRva2VuaXplcixcbiAgY3VycmVudExpbmVVbnRpbEN1cnNvcjogc3RyaW5nLFxuICB3b3JkOiBzdHJpbmcsXG4gIGNvbnRleHRTdGFydENoOiBudW1iZXJcbik6IG51bWJlciB7XG4gIGNvbnN0IGN1cnJlbnRMaW5lVG9rZW5zVW50aWxDdXJzb3IgPSB0b2tlbml6ZXJcbiAgICAudG9rZW5pemUoY3VycmVudExpbmVVbnRpbEN1cnNvciwgdHJ1ZSlcbiAgICAubWFwKCh4KSA9PiB4LnRvTG93ZXJDYXNlKCkpO1xuICBjb25zdCBjdXJyZW50VG9rZW4gPVxuICAgIGN1cnJlbnRMaW5lVG9rZW5zVW50aWxDdXJzb3JbY3VycmVudExpbmVUb2tlbnNVbnRpbEN1cnNvci5sZW5ndGggLSAxXTtcbiAgY29uc3QgY3VycmVudExpbmVUb2tlbnNSZXZlcnNlZCA9IGN1cnJlbnRMaW5lVG9rZW5zVW50aWxDdXJzb3JcbiAgICAuc2xpY2UoMCwgLTEpXG4gICAgLnJldmVyc2UoKTtcblxuICBjb25zdCBzdWdnZXN0aW9uVG9rZW5zUmV2ZXJzZWQgPSB0b2tlbml6ZXJcbiAgICAudG9rZW5pemUoZXhjbHVkZUVtb2ppKHdvcmQpLCB0cnVlKVxuICAgIC5tYXAoKHgpID0+IHgudG9Mb3dlckNhc2UoKSlcbiAgICAucmV2ZXJzZSgpO1xuXG4gIGNvbnN0IGkgPSBzdWdnZXN0aW9uVG9rZW5zUmV2ZXJzZWQuaW5kZXhPZihjdXJyZW50TGluZVRva2Vuc1JldmVyc2VkWzBdKTtcbiAgY29uc3QganVkZ2VtZW50VG9rZW5zID0gc3VnZ2VzdGlvblRva2Vuc1JldmVyc2VkLnNsaWNlKGkpO1xuXG4gIGNvbnN0IHVudGlsRXF1YWxJbmRleCA9IGFycmF5RXF1YWxzVW50aWwoXG4gICAgY3VycmVudExpbmVUb2tlbnNSZXZlcnNlZCxcbiAgICBqdWRnZW1lbnRUb2tlbnNcbiAgKTtcblxuICByZXR1cm4gdW50aWxFcXVhbEluZGV4ID09PSAtMVxuICAgID8gY29udGV4dFN0YXJ0Q2hcbiAgICA6IGN1cnJlbnRMaW5lVW50aWxDdXJzb3JcbiAgICAgICAgLnNsaWNlKDAsIC1jdXJyZW50VG9rZW4ubGVuZ3RoKVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAubGFzdEluZGV4T2YoanVkZ2VtZW50VG9rZW5zW3VudGlsRXF1YWxJbmRleF0pO1xufVxuIiwiaW1wb3J0IHtcbiAgQXBwLFxuICBkZWJvdW5jZSxcbiAgRGVib3VuY2VyLFxuICBFZGl0b3IsXG4gIEVkaXRvclBvc2l0aW9uLFxuICBFZGl0b3JTdWdnZXN0LFxuICBFZGl0b3JTdWdnZXN0Q29udGV4dCxcbiAgRWRpdG9yU3VnZ2VzdFRyaWdnZXJJbmZvLFxuICBFdmVudFJlZixcbiAgS2V5bWFwRXZlbnRIYW5kbGVyLFxuICBTY29wZSxcbiAgVEZpbGUsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgY3JlYXRlVG9rZW5pemVyLCBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vdG9rZW5pemVyL3Rva2VuaXplclwiO1xuaW1wb3J0IHsgVG9rZW5pemVTdHJhdGVneSB9IGZyb20gXCIuLi90b2tlbml6ZXIvVG9rZW5pemVTdHJhdGVneVwiO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IEFwcEhlbHBlciB9IGZyb20gXCIuLi9hcHAtaGVscGVyXCI7XG5pbXBvcnQgeyBXb3JkLCBXb3Jkc0J5Rmlyc3RMZXR0ZXIgfSBmcm9tIFwiLi4vcHJvdmlkZXIvc3VnZ2VzdGVyXCI7XG5pbXBvcnQgeyBDdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyIH0gZnJvbSBcIi4uL3Byb3ZpZGVyL0N1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXJcIjtcbmltcG9ydCB7IEN1cnJlbnRGaWxlV29yZFByb3ZpZGVyIH0gZnJvbSBcIi4uL3Byb3ZpZGVyL0N1cnJlbnRGaWxlV29yZFByb3ZpZGVyXCI7XG5pbXBvcnQgeyBJbnRlcm5hbExpbmtXb3JkUHJvdmlkZXIgfSBmcm9tIFwiLi4vcHJvdmlkZXIvSW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyXCI7XG5pbXBvcnQgeyBNYXRjaFN0cmF0ZWd5IH0gZnJvbSBcIi4uL3Byb3ZpZGVyL01hdGNoU3RyYXRlZ3lcIjtcbmltcG9ydCB7IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cyB9IGZyb20gXCIuLi9DeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXNcIjtcbmltcG9ydCB7IHN1Z2dlc3RDaCB9IGZyb20gXCIuLi9yZXBsYWNlclwiO1xuXG5leHBvcnQgdHlwZSBJbmRleGVkV29yZHMgPSB7XG4gIGN1cnJlbnRGaWxlOiBXb3Jkc0J5Rmlyc3RMZXR0ZXI7XG4gIGN1c3RvbURpY3Rpb25hcnk6IFdvcmRzQnlGaXJzdExldHRlcjtcbiAgaW50ZXJuYWxMaW5rOiBXb3Jkc0J5Rmlyc3RMZXR0ZXI7XG59O1xuXG4vLyBUaGlzIGlzIGFuIHVuc2FmZSBjb2RlLi4hIVxuaW50ZXJmYWNlIFVuc2FmZUVkaXRvclN1Z2dlc3RJbnRlcmZhY2Uge1xuICBzY29wZTogU2NvcGUgJiB7IGtleXM6IChLZXltYXBFdmVudEhhbmRsZXIgJiB7IGZ1bmM6IENhbGxhYmxlRnVuY3Rpb24gfSlbXSB9O1xuICBzdWdnZXN0aW9uczoge1xuICAgIHNlbGVjdGVkSXRlbTogbnVtYmVyO1xuICAgIHVzZVNlbGVjdGVkSXRlbShldjogUGFydGlhbDxLZXlib2FyZEV2ZW50Pik6IHZvaWQ7XG4gICAgc2V0U2VsZWN0ZWRJdGVtKHNlbGVjdGVkOiBudW1iZXIsIHNjcm9sbDogYm9vbGVhbik6IHZvaWQ7XG4gIH07XG4gIGlzT3BlbjogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZVN1Z2dlc3RcbiAgZXh0ZW5kcyBFZGl0b3JTdWdnZXN0PFdvcmQ+XG4gIGltcGxlbWVudHMgVW5zYWZlRWRpdG9yU3VnZ2VzdEludGVyZmFjZVxue1xuICBhcHA6IEFwcDtcbiAgc2V0dGluZ3M6IFNldHRpbmdzO1xuICBhcHBIZWxwZXI6IEFwcEhlbHBlcjtcblxuICBjdXJyZW50RmlsZVdvcmRQcm92aWRlcjogQ3VycmVudEZpbGVXb3JkUHJvdmlkZXI7XG4gIGN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXI6IEN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXI7XG4gIGludGVybmFsTGlua1dvcmRQcm92aWRlcjogSW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyO1xuXG4gIHRva2VuaXplcjogVG9rZW5pemVyO1xuICBkZWJvdW5jZUdldFN1Z2dlc3Rpb25zOiBEZWJvdW5jZXI8XG4gICAgW0VkaXRvclN1Z2dlc3RDb250ZXh0LCAodG9rZW5zOiBXb3JkW10pID0+IHZvaWRdXG4gID47XG4gIGRlYm91bmNlQ2xvc2U6IERlYm91bmNlcjxbXT47XG5cbiAgcnVuTWFudWFsbHk6IGJvb2xlYW47XG4gIGRlY2xhcmUgaXNPcGVuOiBib29sZWFuO1xuXG4gIC8vIHVuc2FmZSEhXG4gIHNjb3BlOiBVbnNhZmVFZGl0b3JTdWdnZXN0SW50ZXJmYWNlW1wic2NvcGVcIl07XG4gIHN1Z2dlc3Rpb25zOiBVbnNhZmVFZGl0b3JTdWdnZXN0SW50ZXJmYWNlW1wic3VnZ2VzdGlvbnNcIl07XG5cbiAga2V5bWFwRXZlbnRIYW5kbGVyOiBLZXltYXBFdmVudEhhbmRsZXJbXSA9IFtdO1xuICBtb2RpZnlFdmVudFJlZjogRXZlbnRSZWY7XG4gIGFjdGl2ZUxlYWZDaGFuZ2VSZWY6IEV2ZW50UmVmO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoXG4gICAgYXBwOiBBcHAsXG4gICAgY3VzdG9tRGljdGlvbmFyeVN1Z2dlc3RlcjogQ3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlclxuICApIHtcbiAgICBzdXBlcihhcHApO1xuICAgIHRoaXMuYXBwSGVscGVyID0gbmV3IEFwcEhlbHBlcihhcHApO1xuICAgIHRoaXMuY3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlciA9IGN1c3RvbURpY3Rpb25hcnlTdWdnZXN0ZXI7XG4gIH1cblxuICB0cmlnZ2VyQ29tcGxldGUoKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5hcHBIZWxwZXIuZ2V0Q3VycmVudEVkaXRvcigpO1xuICAgIGNvbnN0IGFjdGl2ZUZpbGUgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuICAgIGlmICghZWRpdG9yIHx8ICFhY3RpdmVGaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gWFhYOiBVbnNhZmVcbiAgICB0aGlzLnJ1bk1hbnVhbGx5ID0gdHJ1ZTtcbiAgICAodGhpcyBhcyBhbnkpLnRyaWdnZXIoZWRpdG9yLCBhY3RpdmVGaWxlLCB0cnVlKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBuZXcoYXBwOiBBcHAsIHNldHRpbmdzOiBTZXR0aW5ncyk6IFByb21pc2U8QXV0b0NvbXBsZXRlU3VnZ2VzdD4ge1xuICAgIGNvbnN0IGlucyA9IG5ldyBBdXRvQ29tcGxldGVTdWdnZXN0KFxuICAgICAgYXBwLFxuICAgICAgbmV3IEN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIoXG4gICAgICAgIGFwcCxcbiAgICAgICAgc2V0dGluZ3MuY3VzdG9tRGljdGlvbmFyeVBhdGhzLnNwbGl0KFwiXFxuXCIpLmZpbHRlcigoeCkgPT4geClcbiAgICAgIClcbiAgICApO1xuXG4gICAgYXdhaXQgaW5zLnVwZGF0ZVNldHRpbmdzKHNldHRpbmdzKTtcbiAgICBhd2FpdCBpbnMucmVmcmVzaEN1c3RvbURpY3Rpb25hcnlUb2tlbnMoKTtcblxuICAgIGlucy5tb2RpZnlFdmVudFJlZiA9IGFwcC52YXVsdC5vbihcIm1vZGlmeVwiLCBhc3luYyAoXykgPT4ge1xuICAgICAgYXdhaXQgaW5zLnJlZnJlc2hDdXJyZW50RmlsZVRva2VucygpO1xuICAgIH0pO1xuICAgIGlucy5hY3RpdmVMZWFmQ2hhbmdlUmVmID0gYXBwLndvcmtzcGFjZS5vbihcbiAgICAgIFwiYWN0aXZlLWxlYWYtY2hhbmdlXCIsXG4gICAgICBhc3luYyAoXykgPT4ge1xuICAgICAgICBhd2FpdCBpbnMucmVmcmVzaEN1cnJlbnRGaWxlVG9rZW5zKCk7XG4gICAgICAgIGlucy5yZWZyZXNoSW50ZXJuYWxMaW5rVG9rZW5zKCk7XG4gICAgICB9XG4gICAgKTtcbiAgICAvLyBBdm9pZCB0byByZWZlciBpbmNvbXBsZXRlIGNhY2hlXG4gICAgY29uc3QgY2FjaGVSZXNvbHZlZFJlZiA9IGFwcC5tZXRhZGF0YUNhY2hlLm9uKFwicmVzb2x2ZWRcIiwgKCkgPT4ge1xuICAgICAgaW5zLnJlZnJlc2hJbnRlcm5hbExpbmtUb2tlbnMoKTtcbiAgICAgIGlucy5hcHAubWV0YWRhdGFDYWNoZS5vZmZyZWYoY2FjaGVSZXNvbHZlZFJlZik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5zO1xuICB9XG5cbiAgcHJlZGljdGFibGVDb21wbGV0ZSgpIHtcbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmFwcEhlbHBlci5nZXRDdXJyZW50RWRpdG9yKCk7XG4gICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG4gICAgY29uc3QgY3VycmVudFRva2VuID0gdGhpcy50b2tlbml6ZXJcbiAgICAgIC50b2tlbml6ZShlZGl0b3IuZ2V0TGluZShjdXJzb3IubGluZSkuc2xpY2UoMCwgY3Vyc29yLmNoKSlcbiAgICAgIC5sYXN0KCk7XG4gICAgaWYgKCFjdXJyZW50VG9rZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc3VnZ2VzdGlvbiA9IHRoaXMudG9rZW5pemVyXG4gICAgICAudG9rZW5pemUoXG4gICAgICAgIGVkaXRvci5nZXRSYW5nZSh7IGxpbmU6IE1hdGgubWF4KGN1cnNvci5saW5lIC0gNTAsIDApLCBjaDogMCB9LCBjdXJzb3IpXG4gICAgICApXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAuc2xpY2UoMSlcbiAgICAgIC5maW5kKCh4KSA9PiB4LnN0YXJ0c1dpdGgoY3VycmVudFRva2VuKSk7XG4gICAgaWYgKCFzdWdnZXN0aW9uKSB7XG4gICAgICBzdWdnZXN0aW9uID0gdGhpcy50b2tlbml6ZXJcbiAgICAgICAgLnRva2VuaXplKFxuICAgICAgICAgIGVkaXRvci5nZXRSYW5nZShjdXJzb3IsIHtcbiAgICAgICAgICAgIGxpbmU6IE1hdGgubWluKGN1cnNvci5saW5lICsgNTAsIGVkaXRvci5saW5lQ291bnQoKSAtIDEpLFxuICAgICAgICAgICAgY2g6IDAsXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuZmluZCgoeCkgPT4geC5zdGFydHNXaXRoKGN1cnJlbnRUb2tlbikpO1xuICAgIH1cbiAgICBpZiAoIXN1Z2dlc3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlZGl0b3IucmVwbGFjZVJhbmdlKFxuICAgICAgc3VnZ2VzdGlvbixcbiAgICAgIHsgbGluZTogY3Vyc29yLmxpbmUsIGNoOiBjdXJzb3IuY2ggLSBjdXJyZW50VG9rZW4ubGVuZ3RoIH0sXG4gICAgICB7IGxpbmU6IGN1cnNvci5saW5lLCBjaDogY3Vyc29yLmNoIH1cbiAgICApO1xuXG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuZGVib3VuY2VDbG9zZSgpO1xuICB9XG5cbiAgdW5yZWdpc3RlcigpIHtcbiAgICB0aGlzLmFwcC52YXVsdC5vZmZyZWYodGhpcy5tb2RpZnlFdmVudFJlZik7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLm9mZnJlZih0aGlzLmFjdGl2ZUxlYWZDaGFuZ2VSZWYpO1xuICB9XG5cbiAgZ2V0IHRva2VuaXplclN0cmF0ZWd5KCk6IFRva2VuaXplU3RyYXRlZ3kge1xuICAgIHJldHVybiBUb2tlbml6ZVN0cmF0ZWd5LmZyb21OYW1lKHRoaXMuc2V0dGluZ3Muc3RyYXRlZ3kpO1xuICB9XG5cbiAgZ2V0IG1hdGNoU3RyYXRlZ3koKTogTWF0Y2hTdHJhdGVneSB7XG4gICAgcmV0dXJuIE1hdGNoU3RyYXRlZ3kuZnJvbU5hbWUodGhpcy5zZXR0aW5ncy5tYXRjaFN0cmF0ZWd5KTtcbiAgfVxuXG4gIGdldCBtaW5OdW1iZXJUcmlnZ2VyZWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5zZXR0aW5ncy5taW5OdW1iZXJPZkNoYXJhY3RlcnNUcmlnZ2VyZWQgfHxcbiAgICAgIHRoaXMudG9rZW5pemVyU3RyYXRlZ3kudHJpZ2dlclRocmVzaG9sZFxuICAgICk7XG4gIH1cblxuICBnZXQgaW5kZXhlZFdvcmRzKCk6IEluZGV4ZWRXb3JkcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRGaWxlOiB0aGlzLmN1cnJlbnRGaWxlV29yZFByb3ZpZGVyLndvcmRzQnlGaXJzdExldHRlcixcbiAgICAgIGN1c3RvbURpY3Rpb25hcnk6IHRoaXMuY3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlci53b3Jkc0J5Rmlyc3RMZXR0ZXIsXG4gICAgICBpbnRlcm5hbExpbms6IHRoaXMuaW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyLndvcmRzQnlGaXJzdExldHRlcixcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlU2V0dGluZ3Moc2V0dGluZ3M6IFNldHRpbmdzKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuY3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlci51cGRhdGVQYXRocyhcbiAgICAgIHNldHRpbmdzLmN1c3RvbURpY3Rpb25hcnlQYXRocy5zcGxpdChcIlxcblwiKS5maWx0ZXIoKHgpID0+IHgpXG4gICAgKTtcbiAgICB0aGlzLnRva2VuaXplciA9IGNyZWF0ZVRva2VuaXplcih0aGlzLnRva2VuaXplclN0cmF0ZWd5KTtcbiAgICB0aGlzLmN1cnJlbnRGaWxlV29yZFByb3ZpZGVyID0gbmV3IEN1cnJlbnRGaWxlV29yZFByb3ZpZGVyKFxuICAgICAgdGhpcy5hcHAsXG4gICAgICB0aGlzLmFwcEhlbHBlcixcbiAgICAgIHRoaXMudG9rZW5pemVyXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLnJlZnJlc2hDdXJyZW50RmlsZVRva2VucygpO1xuICAgIHRoaXMuaW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyID0gbmV3IEludGVybmFsTGlua1dvcmRQcm92aWRlcihcbiAgICAgIHRoaXMuYXBwLFxuICAgICAgdGhpcy5hcHBIZWxwZXJcbiAgICApO1xuICAgIGF3YWl0IHRoaXMucmVmcmVzaEludGVybmFsTGlua1Rva2VucygpO1xuXG4gICAgdGhpcy5kZWJvdW5jZUdldFN1Z2dlc3Rpb25zID0gZGVib3VuY2UoXG4gICAgICAoY29udGV4dDogRWRpdG9yU3VnZ2VzdENvbnRleHQsIGNiOiAod29yZHM6IFdvcmRbXSkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjYihcbiAgICAgICAgICB0aGlzLm1hdGNoU3RyYXRlZ3kuaGFuZGxlcihcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlZFdvcmRzLFxuICAgICAgICAgICAgY29udGV4dC5xdWVyeSxcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWF4TnVtYmVyT2ZTdWdnZXN0aW9uc1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zaG93RGVidWdMb2coXCJHZXQgc3VnZ2VzdGlvbnNcIiwgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydCk7XG4gICAgICB9LFxuICAgICAgdGhpcy5zZXR0aW5ncy5kZWxheU1pbGxpU2Vjb25kcyxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgdGhpcy5kZWJvdW5jZUNsb3NlID0gZGVib3VuY2UoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0sIHRoaXMuc2V0dGluZ3MuZGVsYXlNaWxsaVNlY29uZHMgKyA1MCk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyS2V5bWFwcygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlcktleW1hcHMoKSB7XG4gICAgLy8gQ2xlYXJcbiAgICB0aGlzLmtleW1hcEV2ZW50SGFuZGxlci5mb3JFYWNoKCh4KSA9PiB0aGlzLnNjb3BlLnVucmVnaXN0ZXIoeCkpO1xuICAgIHRoaXMua2V5bWFwRXZlbnRIYW5kbGVyID0gW107XG5cbiAgICAvLyBDeWNsZSB0aHJvdyBzdWdnZXN0aW9ucyBrZXlzXG4gICAgY29uc3Qga2V5cyA9IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cy5mcm9tTmFtZShcbiAgICAgIHRoaXMuc2V0dGluZ3MuYWRkaXRpb25hbEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5c1xuICAgICk7XG4gICAgaWYgKGtleXMgIT09IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cy5OT05FKSB7XG4gICAgICB0aGlzLmtleW1hcEV2ZW50SGFuZGxlci5wdXNoKFxuICAgICAgICB0aGlzLnNjb3BlLnJlZ2lzdGVyKGtleXMubmV4dEtleS5tb2RpZmllcnMsIGtleXMubmV4dEtleS5rZXksICgpID0+IHtcbiAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zLnNldFNlbGVjdGVkSXRlbShcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMuc2VsZWN0ZWRJdGVtICsgMSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuc2NvcGUucmVnaXN0ZXIoXG4gICAgICAgICAga2V5cy5wcmV2aW91c0tleS5tb2RpZmllcnMsXG4gICAgICAgICAga2V5cy5wcmV2aW91c0tleS5rZXksXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9ucy5zZXRTZWxlY3RlZEl0ZW0oXG4gICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMuc2VsZWN0ZWRJdGVtIC0gMSxcbiAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gSWdub3JlIGlmIGFkZGl0aW9uYWxDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMgdXNlc1xuICAgIHRoaXMua2V5bWFwRXZlbnRIYW5kbGVyLnB1c2goXG4gICAgICB0aGlzLnNjb3BlLnJlZ2lzdGVyKFtdLCBcIlRhYlwiLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZVRhYktleSkge1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMudXNlU2VsZWN0ZWRJdGVtKHt9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gb3ZlcndyaXRlXG4gICAgdGhpcy5zY29wZS5rZXlzLmZpbmQoKHgpID0+IHgua2V5ID09PSBcIkVzY2FwZVwiKSEuZnVuYyA9ICgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnByb3BhZ2F0ZUVzYztcbiAgICB9O1xuICAgIHRoaXMuc2NvcGUua2V5cy5maW5kKCh4KSA9PiB4LmtleSA9PT0gXCJFbnRlclwiKSEuZnVuYyA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZUVudGVyS2V5KSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3VnZ2VzdGlvbnMudXNlU2VsZWN0ZWRJdGVtKHt9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgcmVmcmVzaEN1cnJlbnRGaWxlVG9rZW5zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZW5hYmxlQ3VycmVudEZpbGVDb21wbGVtZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRGaWxlV29yZFByb3ZpZGVyLmNsZWFyV29yZHMoKTtcbiAgICAgIHRoaXMuc2hvd0RlYnVnTG9nKFxuICAgICAgICBcIvCfkaIgU2tpcDogSW5kZXggY3VycmVudCBmaWxlIHRva2Vuc1wiLFxuICAgICAgICBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0XG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuY3VycmVudEZpbGVXb3JkUHJvdmlkZXIucmVmcmVzaFdvcmRzKFxuICAgICAgdGhpcy5zZXR0aW5ncy5vbmx5Q29tcGxlbWVudEVuZ2xpc2hPbkN1cnJlbnRGaWxlQ29tcGxlbWVudFxuICAgICk7XG4gICAgdGhpcy5zaG93RGVidWdMb2coXCJJbmRleCBjdXJyZW50IGZpbGUgdG9rZW5zXCIsIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnQpO1xuICB9XG5cbiAgYXN5bmMgcmVmcmVzaEN1c3RvbURpY3Rpb25hcnlUb2tlbnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5lbmFibGVDdXN0b21EaWN0aW9uYXJ5Q29tcGxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyLmNsZWFyV29yZHMoKTtcbiAgICAgIHRoaXMuc2hvd0RlYnVnTG9nKFxuICAgICAgICBcIvCfkaJTa2lwOiBJbmRleCBjdXN0b20gZGljdGlvbmFyeSB0b2tlbnNcIixcbiAgICAgICAgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIucmVmcmVzaEN1c3RvbVdvcmRzKCk7XG4gICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICBcIkluZGV4IGN1c3RvbSBkaWN0aW9uYXJ5IHRva2Vuc1wiLFxuICAgICAgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFxuICAgICk7XG4gIH1cblxuICByZWZyZXNoSW50ZXJuYWxMaW5rVG9rZW5zKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudCkge1xuICAgICAgdGhpcy5pbnRlcm5hbExpbmtXb3JkUHJvdmlkZXIuY2xlYXJXb3JkcygpO1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICAgIFwi8J+RolNraXA6IEluZGV4IGludGVybmFsIGxpbmsgdG9rZW5zXCIsXG4gICAgICAgIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcm5hbExpbmtXb3JkUHJvdmlkZXIucmVmcmVzaFdvcmRzKCk7XG4gICAgdGhpcy5zaG93RGVidWdMb2coXCJJbmRleCBpbnRlcm5hbCBsaW5rIHRva2Vuc1wiLCBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0KTtcbiAgfVxuXG4gIG9uVHJpZ2dlcihcbiAgICBjdXJzb3I6IEVkaXRvclBvc2l0aW9uLFxuICAgIGVkaXRvcjogRWRpdG9yLFxuICAgIGZpbGU6IFRGaWxlXG4gICk6IEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbyB8IG51bGwge1xuICAgIGlmIChcbiAgICAgICF0aGlzLnNldHRpbmdzLmNvbXBsZW1lbnRBdXRvbWF0aWNhbGx5ICYmXG4gICAgICAhdGhpcy5pc09wZW4gJiZcbiAgICAgICF0aGlzLnJ1bk1hbnVhbGx5XG4gICAgKSB7XG4gICAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcIkRvbid0IHNob3cgc3VnZ2VzdGlvbnNcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnNldHRpbmdzLmRpc2FibGVTdWdnZXN0aW9uc0R1cmluZ0ltZU9uICYmXG4gICAgICB0aGlzLmFwcEhlbHBlci5pc0lNRU9uKCkgJiZcbiAgICAgICF0aGlzLnJ1bk1hbnVhbGx5XG4gICAgKSB7XG4gICAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcIkRvbid0IHNob3cgc3VnZ2VzdGlvbnMgZm9yIElNRVwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRDaGFyID0gZWRpdG9yLmdldFJhbmdlKFxuICAgICAgeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IGN1cnNvci5jaCAtIDEgfSxcbiAgICAgIGN1cnNvclxuICAgICk7XG4gICAgdGhpcy5zaG93RGVidWdMb2coYFtvblRyaWdnZXJdIGN1cnJlbnRDaGFyIGlzICR7Y3VycmVudENoYXJ9YCk7XG4gICAgaWYgKGN1cnJlbnRDaGFyID09PSBcIiBcIikge1xuICAgICAgdGhpcy5ydW5NYW51YWxseSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICAgIFwiRG9uJ3Qgc2hvdyBzdWdnZXN0aW9ucyBiZWNhdXNlIGN1cnJlbnRDaGFyIGlzIHdoaXRlc3BhY2VcIlxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VucyA9IHRoaXMudG9rZW5pemVyLnRva2VuaXplKFxuICAgICAgZWRpdG9yLmdldExpbmUoY3Vyc29yLmxpbmUpLnNsaWNlKDAsIGN1cnNvci5jaCksXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICB0aGlzLnNob3dEZWJ1Z0xvZyhgW29uVHJpZ2dlcl0gdG9rZW5zIGlzICR7dG9rZW5zfWApO1xuXG4gICAgY29uc3QgY3VycmVudFRva2VuID0gdG9rZW5zLmxhc3QoKTtcbiAgICB0aGlzLnNob3dEZWJ1Z0xvZyhgW29uVHJpZ2dlcl0gY3VycmVudFRva2VuIGlzICR7Y3VycmVudFRva2VufWApO1xuICAgIGlmICghY3VycmVudFRva2VuKSB7XG4gICAgICB0aGlzLnJ1bk1hbnVhbGx5ID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dEZWJ1Z0xvZyhgRG9uJ3Qgc2hvdyBzdWdnZXN0aW9ucyBiZWNhdXNlIGN1cnJlbnRUb2tlbiBpcyBlbXB0eWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnRUb2tlblswXS5tYXRjaCh0aGlzLnRva2VuaXplci5nZXRUcmltUGF0dGVybigpKSkge1xuICAgICAgdGhpcy5ydW5NYW51YWxseSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICAgIGBEb24ndCBzaG93IHN1Z2dlc3Rpb25zIGZvciBhdm9pZGluZyB0byBjb25mbGljdCB3aXRoIHRoZSBzbGFzaCBjb21tYW5kLmBcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB0cmltbWVkQ3VycmVudFRva2VuID0gdGhpcy50b2tlbml6ZXIudG9rZW5pemUoY3VycmVudFRva2VuKT8uWzBdO1xuICAgIHRoaXMuc2hvd0RlYnVnTG9nKFxuICAgICAgYFtvblRyaWdnZXJdIHRyaW1tZWRDdXJyZW50VG9rZW4gaXMgJHt0cmltbWVkQ3VycmVudFRva2VufWBcbiAgICApO1xuICAgIGlmICghdHJpbW1lZEN1cnJlbnRUb2tlbikge1xuICAgICAgdGhpcy5ydW5NYW51YWxseSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICAgIGBEb24ndCBzaG93IHN1Z2dlc3Rpb25zIGJlY2F1c2UgdHJpbW1lZEN1cnJlbnRUb2tlbiBpcyBlbXB0eWBcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucnVuTWFudWFsbHkpIHtcbiAgICAgIGlmICh0cmltbWVkQ3VycmVudFRva2VuLmxlbmd0aCA8IHRoaXMubWluTnVtYmVyVHJpZ2dlcmVkKSB7XG4gICAgICAgIHRoaXMuc2hvd0RlYnVnTG9nKFxuICAgICAgICAgIFwiRG9uJ3Qgc2hvdyBzdWdnZXN0aW9ucyBiZWNhdXNlIHRyaW1tZWRDdXJyZW50VG9rZW4gaXMgbGVzcyB0aGFuIG1pbk51bWJlclRyaWdnZXJlZCBvcHRpb25cIlxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRva2VuaXplci5zaG91bGRJZ25vcmUodHJpbW1lZEN1cnJlbnRUb2tlbikpIHtcbiAgICAgICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICAgICAgXCJEb24ndCBzaG93IHN1Z2dlc3Rpb25zIGJlY2F1c2UgdHJpbW1lZEN1cnJlbnRUb2tlbiBzaG91bGQgaWdub3JlZFwiXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucnVuTWFudWFsbHkgPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHtcbiAgICAgICAgY2g6IGN1cnNvci5jaCAtIHRyaW1tZWRDdXJyZW50VG9rZW4ubGVuZ3RoLFxuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgIH0sXG4gICAgICBlbmQ6IGN1cnNvcixcbiAgICAgIHF1ZXJ5OiB0cmltbWVkQ3VycmVudFRva2VuLFxuICAgIH07XG4gIH1cblxuICBnZXRTdWdnZXN0aW9ucyhjb250ZXh0OiBFZGl0b3JTdWdnZXN0Q29udGV4dCk6IFdvcmRbXSB8IFByb21pc2U8V29yZFtdPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmRlYm91bmNlR2V0U3VnZ2VzdGlvbnMoY29udGV4dCwgKHdvcmRzKSA9PiB7XG4gICAgICAgIHJlc29sdmUod29yZHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJTdWdnZXN0aW9uKHdvcmQ6IFdvcmQsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGJhc2UgPSBjcmVhdGVEaXYoKTtcbiAgICBsZXQgdGV4dCA9IHdvcmQudmFsdWU7XG4gICAgaWYgKHdvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICB0ZXh0ID1cbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zdWdnZXN0SW50ZXJuYWxMaW5rV2l0aEFsaWFzICYmIHdvcmQubWF0Y2hlZEFsaWFzXG4gICAgICAgICAgPyBgW1ske3dvcmQudmFsdWV9fCR7d29yZC5tYXRjaGVkQWxpYXN9XV1gXG4gICAgICAgICAgOiBgW1ske3dvcmQudmFsdWV9XV1gO1xuICAgIH1cblxuICAgIGJhc2UuY3JlYXRlRGl2KHtcbiAgICAgIHRleHQ6XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbiAmJlxuICAgICAgICB0ZXh0LmluY2x1ZGVzKHRoaXMuc2V0dGluZ3MuZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbilcbiAgICAgICAgICA/IGAke3RleHQuc3BsaXQodGhpcy5zZXR0aW5ncy5kZWxpbWl0ZXJUb0hpZGVTdWdnZXN0aW9uKVswXX0gLi4uYFxuICAgICAgICAgIDogdGV4dCxcbiAgICB9KTtcblxuICAgIGlmICh3b3JkLmRlc2NyaXB0aW9uKSB7XG4gICAgICBiYXNlLmNyZWF0ZURpdih7XG4gICAgICAgIGNsczogXCJ2YXJpb3VzLWNvbXBsZW1lbnRzX19zdWdnZXN0X19kZXNjcmlwdGlvblwiLFxuICAgICAgICB0ZXh0OiBgJHt3b3JkLmRlc2NyaXB0aW9ufWAsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBlbC5hcHBlbmRDaGlsZChiYXNlKTtcbiAgfVxuXG4gIHNlbGVjdFN1Z2dlc3Rpb24od29yZDogV29yZCwgZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb250ZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGluc2VydGVkVGV4dCA9IHdvcmQudmFsdWU7XG4gICAgaWYgKHdvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICBpbnNlcnRlZFRleHQgPVxuICAgICAgICB0aGlzLnNldHRpbmdzLnN1Z2dlc3RJbnRlcm5hbExpbmtXaXRoQWxpYXMgJiYgd29yZC5tYXRjaGVkQWxpYXNcbiAgICAgICAgICA/IGBbWyR7aW5zZXJ0ZWRUZXh0fXwke3dvcmQubWF0Y2hlZEFsaWFzfV1dYFxuICAgICAgICAgIDogYFtbJHtpbnNlcnRlZFRleHR9XV1gO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5pbnNlcnRBZnRlckNvbXBsZXRpb24pIHtcbiAgICAgIGluc2VydGVkVGV4dCA9IGAke2luc2VydGVkVGV4dH0gYDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbikge1xuICAgICAgaW5zZXJ0ZWRUZXh0ID0gaW5zZXJ0ZWRUZXh0LnJlcGxhY2UoXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbixcbiAgICAgICAgXCJcIlxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gVGhpcyB0cmlja3kgbG9naWNzIGZvciBTYWZhcmlcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGFkYXNoaS1haWthd2Evb2JzaWRpYW4tdmFyaW91cy1jb21wbGVtZW50cy1wbHVnaW4vaXNzdWVzLzU2XG4gICAgaW5zZXJ0ZWRUZXh0ID0gaW5zZXJ0ZWRUZXh0XG4gICAgICAucmVwbGFjZSgvXFxcXFxcXFwvZywgXCJfX1ZhcmlvdXNDb21wbGVtZW50c0VzY2FwZV9fXCIpXG4gICAgICAucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIilcbiAgICAgIC5yZXBsYWNlKC9cXFxcdC9nLCBcIlxcdFwiKVxuICAgICAgLnJlcGxhY2UoL19fVmFyaW91c0NvbXBsZW1lbnRzRXNjYXBlX18vZywgXCJcXFxcXCIpO1xuXG4gICAgY29uc3QgY2FyZXQgPSB0aGlzLnNldHRpbmdzLmNhcmV0TG9jYXRpb25TeW1ib2xBZnRlckNvbXBsZW1lbnQ7XG4gICAgY29uc3QgcG9zaXRpb25Ub01vdmUgPSBjYXJldCA/IGluc2VydGVkVGV4dC5pbmRleE9mKGNhcmV0KSA6IC0xO1xuICAgIGlmIChwb3NpdGlvblRvTW92ZSAhPT0gLTEpIHtcbiAgICAgIGluc2VydGVkVGV4dCA9IGluc2VydGVkVGV4dC5yZXBsYWNlKGNhcmV0LCBcIlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmNvbnRleHQuZWRpdG9yO1xuICAgIGVkaXRvci5yZXBsYWNlUmFuZ2UoXG4gICAgICBpbnNlcnRlZFRleHQsXG4gICAgICB0aGlzLnN1Z2dlc3RSZXBsYWNlU3RhcnRQb3NpdGlvbih3b3JkLCB0aGlzLmNvbnRleHQpLFxuICAgICAgdGhpcy5jb250ZXh0LmVuZFxuICAgICk7XG5cbiAgICBpZiAocG9zaXRpb25Ub01vdmUgIT09IC0xKSB7XG4gICAgICBlZGl0b3Iuc2V0Q3Vyc29yKFxuICAgICAgICBlZGl0b3Iub2Zmc2V0VG9Qb3MoXG4gICAgICAgICAgZWRpdG9yLnBvc1RvT2Zmc2V0KGVkaXRvci5nZXRDdXJzb3IoKSkgLVxuICAgICAgICAgICAgaW5zZXJ0ZWRUZXh0Lmxlbmd0aCArXG4gICAgICAgICAgICBwb3NpdGlvblRvTW92ZVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLmRlYm91bmNlQ2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3VnZ2VzdFJlcGxhY2VTdGFydFBvc2l0aW9uKFxuICAgIHdvcmQ6IFdvcmQsXG4gICAgY29udGV4dDogRWRpdG9yU3VnZ2VzdENvbnRleHRcbiAgKTogRWRpdG9yUG9zaXRpb24ge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5vdmVyd3JpdGVEdXBsaWNhdGVkRXhpc3RlZFBocmFzZSkge1xuICAgICAgcmV0dXJuIGNvbnRleHQuc3RhcnQ7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudExpbmVVbnRpbEN1cnNvciA9IHRoaXMuYXBwSGVscGVyLmdldEN1cnJlbnRMaW5lVW50aWxDdXJzb3IoXG4gICAgICBjb250ZXh0LmVkaXRvclxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uY29udGV4dC5zdGFydCxcbiAgICAgIGNoOiBzdWdnZXN0Q2goXG4gICAgICAgIHRoaXMudG9rZW5pemVyLFxuICAgICAgICBjdXJyZW50TGluZVVudGlsQ3Vyc29yLFxuICAgICAgICB3b3JkLnZhbHVlLFxuICAgICAgICBjb250ZXh0LnN0YXJ0LmNoXG4gICAgICApLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHNob3dEZWJ1Z0xvZyhtZXNzYWdlOiBzdHJpbmcsIG1zZWM/OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93TG9nQWJvdXRQZXJmb3JtYW5jZUluQ29uc29sZSkge1xuICAgICAgaWYgKG1zZWMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHttZXNzYWdlfTogJHtNYXRoLnJvdW5kKG1zZWMpfVttc11gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBwLCBOb3RpY2UsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBWYXJpb3VzQ29tcG9uZW50cyBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBUb2tlbml6ZVN0cmF0ZWd5IH0gZnJvbSBcIi4vdG9rZW5pemVyL1Rva2VuaXplU3RyYXRlZ3lcIjtcbmltcG9ydCB7IE1hdGNoU3RyYXRlZ3kgfSBmcm9tIFwiLi9wcm92aWRlci9NYXRjaFN0cmF0ZWd5XCI7XG5pbXBvcnQgeyBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMgfSBmcm9tIFwiLi9DeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5ncyB7XG4gIHN0cmF0ZWd5OiBzdHJpbmc7XG4gIG1hdGNoU3RyYXRlZ3k6IHN0cmluZztcbiAgbWF4TnVtYmVyT2ZTdWdnZXN0aW9uczogbnVtYmVyO1xuICBtaW5OdW1iZXJPZkNoYXJhY3RlcnNUcmlnZ2VyZWQ6IG51bWJlcjtcbiAgY29tcGxlbWVudEF1dG9tYXRpY2FsbHk6IGJvb2xlYW47XG4gIG92ZXJ3cml0ZUR1cGxpY2F0ZWRFeGlzdGVkUGhyYXNlOiBib29sZWFuO1xuICBkZWxheU1pbGxpU2Vjb25kczogbnVtYmVyO1xuICBjdXN0b21EaWN0aW9uYXJ5UGF0aHM6IHN0cmluZztcbiAgaWdub3JlRW50ZXJLZXk6IGJvb2xlYW47XG4gIGlnbm9yZVRhYktleTogYm9vbGVhbjtcbiAgcHJvcGFnYXRlRXNjOiBib29sZWFuO1xuICBlbmFibGVDdXJyZW50RmlsZUNvbXBsZW1lbnQ6IGJvb2xlYW47XG4gIGVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50OiBib29sZWFuO1xuICBlbmFibGVJbnRlcm5hbExpbmtDb21wbGVtZW50OiBib29sZWFuO1xuICBkaXNhYmxlU3VnZ2VzdGlvbnNEdXJpbmdJbWVPbjogYm9vbGVhbjtcbiAgc2hvd0xvZ0Fib3V0UGVyZm9ybWFuY2VJbkNvbnNvbGU6IGJvb2xlYW47XG4gIGluc2VydEFmdGVyQ29tcGxldGlvbjogYm9vbGVhbjtcbiAgZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbjogc3RyaW5nO1xuICBjYXJldExvY2F0aW9uU3ltYm9sQWZ0ZXJDb21wbGVtZW50OiBzdHJpbmc7XG4gIGFkZGl0aW9uYWxDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXM6IHN0cmluZztcbiAgb25seUNvbXBsZW1lbnRFbmdsaXNoT25DdXJyZW50RmlsZUNvbXBsZW1lbnQ6IGJvb2xlYW47XG4gIHN1Z2dlc3RJbnRlcm5hbExpbmtXaXRoQWxpYXM6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTZXR0aW5ncyA9IHtcbiAgc3RyYXRlZ3k6IFwiZGVmYXVsdFwiLFxuICBtYXRjaFN0cmF0ZWd5OiBcInByZWZpeFwiLFxuICBtYXhOdW1iZXJPZlN1Z2dlc3Rpb25zOiA1LFxuICBtaW5OdW1iZXJPZkNoYXJhY3RlcnNUcmlnZ2VyZWQ6IDAsXG4gIGNvbXBsZW1lbnRBdXRvbWF0aWNhbGx5OiB0cnVlLFxuICBvdmVyd3JpdGVEdXBsaWNhdGVkRXhpc3RlZFBocmFzZTogZmFsc2UsXG4gIGRlbGF5TWlsbGlTZWNvbmRzOiAwLFxuICBjdXN0b21EaWN0aW9uYXJ5UGF0aHM6IGBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZmlyc3QyMGhvdXJzL2dvb2dsZS0xMDAwMC1lbmdsaXNoL21hc3Rlci9nb29nbGUtMTAwMDAtZW5nbGlzaC1uby1zd2VhcnMudHh0YCxcbiAgaWdub3JlRW50ZXJLZXk6IGZhbHNlLFxuICBpZ25vcmVUYWJLZXk6IGZhbHNlLFxuICBwcm9wYWdhdGVFc2M6IGZhbHNlLFxuICBlbmFibGVDdXJyZW50RmlsZUNvbXBsZW1lbnQ6IHRydWUsXG4gIGVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50OiBmYWxzZSxcbiAgZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudDogdHJ1ZSxcbiAgZGlzYWJsZVN1Z2dlc3Rpb25zRHVyaW5nSW1lT246IGZhbHNlLFxuICBzaG93TG9nQWJvdXRQZXJmb3JtYW5jZUluQ29uc29sZTogZmFsc2UsXG4gIGluc2VydEFmdGVyQ29tcGxldGlvbjogdHJ1ZSxcbiAgZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbjogXCJcIixcbiAgY2FyZXRMb2NhdGlvblN5bWJvbEFmdGVyQ29tcGxlbWVudDogXCJcIixcbiAgYWRkaXRpb25hbEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5czogXCJOb25lXCIsXG4gIG9ubHlDb21wbGVtZW50RW5nbGlzaE9uQ3VycmVudEZpbGVDb21wbGVtZW50OiBmYWxzZSxcbiAgc3VnZ2VzdEludGVybmFsTGlua1dpdGhBbGlhczogZmFsc2UsXG59O1xuXG5leHBvcnQgY2xhc3MgVmFyaW91c0NvbXBsZW1lbnRzU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwbHVnaW46IFZhcmlvdXNDb21wb25lbnRzO1xuXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFZhcmlvdXNDb21wb25lbnRzKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcblxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJWYXJpb3VzIENvbXBsZW1lbnRzIC0gU2V0dGluZ3NcIiB9KTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIk1haW5cIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKS5zZXROYW1lKFwiU3RyYXRlZ3lcIikuYWRkRHJvcGRvd24oKHRjKSA9PlxuICAgICAgdGNcbiAgICAgICAgLmFkZE9wdGlvbnMoXG4gICAgICAgICAgVG9rZW5pemVTdHJhdGVneS52YWx1ZXMoKS5yZWR1Y2UoXG4gICAgICAgICAgICAocCwgYykgPT4gKHsgLi4ucCwgW2MubmFtZV06IGMubmFtZSB9KSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdHJhdGVneSlcbiAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnN0cmF0ZWd5ID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKHsgY3VycmVudEZpbGU6IHRydWUgfSk7XG4gICAgICAgIH0pXG4gICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKS5zZXROYW1lKFwiTWF0Y2ggc3RyYXRlZ3lcIikuYWRkRHJvcGRvd24oKHRjKSA9PlxuICAgICAgdGNcbiAgICAgICAgLmFkZE9wdGlvbnMoXG4gICAgICAgICAgTWF0Y2hTdHJhdGVneS52YWx1ZXMoKS5yZWR1Y2UoXG4gICAgICAgICAgICAocCwgYykgPT4gKHsgLi4ucCwgW2MubmFtZV06IGMubmFtZSB9KSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXRjaFN0cmF0ZWd5KVxuICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWF0Y2hTdHJhdGVneSA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncyh7IGN1cnJlbnRGaWxlOiB0cnVlIH0pO1xuICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICB9KVxuICAgICk7XG4gICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLm1hdGNoU3RyYXRlZ3kgPT09IE1hdGNoU3RyYXRlZ3kuUEFSVElBTC5uYW1lKSB7XG4gICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICAgIHRleHQ6IFwi4pqgIGBwYXJ0aWFsYCBpcyBtb3JlIHRoYW4gMTAgdGltZXMgc2xvd2VyIHRoYW4gYHByZWZpeGBcIixcbiAgICAgICAgY2xzOiBcInZhcmlvdXMtY29tcGxlbWVudHNfX3NldHRpbmdzX193YXJuaW5nXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiTWF4IG51bWJlciBvZiBzdWdnZXN0aW9uc1wiKVxuICAgICAgLmFkZFNsaWRlcigoc2MpID0+XG4gICAgICAgIHNjXG4gICAgICAgICAgLnNldExpbWl0cygxLCAyNTUsIDEpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1heE51bWJlck9mU3VnZ2VzdGlvbnMpXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXhOdW1iZXJPZlN1Z2dlc3Rpb25zID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJNaW4gbnVtYmVyIG9mIGNoYXJhY3RlcnMgZm9yIHRyaWdnZXJcIilcbiAgICAgIC5zZXREZXNjKFwiSXQgdXNlcyBhIGRlZmF1bHQgdmFsdWUgb2YgU3RyYXRlZ3kgaWYgc2V0IDAuXCIpXG4gICAgICAuYWRkU2xpZGVyKChzYykgPT5cbiAgICAgICAgc2NcbiAgICAgICAgICAuc2V0TGltaXRzKDAsIDEwLCAxKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5taW5OdW1iZXJPZkNoYXJhY3RlcnNUcmlnZ2VyZWQpXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5taW5OdW1iZXJPZkNoYXJhY3RlcnNUcmlnZ2VyZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkNvbXBsZW1lbnQgYXV0b21hdGljYWxseVwiKVxuICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgdGMuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29tcGxlbWVudEF1dG9tYXRpY2FsbHkpLm9uQ2hhbmdlKFxuICAgICAgICAgIGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29tcGxlbWVudEF1dG9tYXRpY2FsbHkgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIk92ZXJ3cml0ZSBkdXBsaWNhdGVkIGV4aXN0ZWQgcGhyYXNlXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZShcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vdmVyd3JpdGVEdXBsaWNhdGVkRXhpc3RlZFBocmFzZVxuICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm92ZXJ3cml0ZUR1cGxpY2F0ZWRFeGlzdGVkUGhyYXNlID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRGVsYXkgbWlsbGktc2Vjb25kcyBmb3IgdHJpZ2dlclwiKVxuICAgICAgLmFkZFNsaWRlcigoc2MpID0+XG4gICAgICAgIHNjXG4gICAgICAgICAgLnNldExpbWl0cygwLCAxMDAwLCAxMClcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsYXlNaWxsaVNlY29uZHMpXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheU1pbGxpU2Vjb25kcyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRGlzYWJsZSBzdWdnZXN0aW9ucyBkdXJpbmcgSU1FIG9uXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZShcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlU3VnZ2VzdGlvbnNEdXJpbmdJbWVPblxuICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVTdWdnZXN0aW9uc0R1cmluZ0ltZU9uID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiSW5zZXJ0IHNwYWNlIGFmdGVyIGNvbXBsZXRpb25cIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmluc2VydEFmdGVyQ29tcGxldGlvbikub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbnNlcnRBZnRlckNvbXBsZXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIklnbm9yZSBFbnRlciBrZXlcIilcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICBcIkl0IGlzIGhhbmR5IHdoZW4geW91IHdhbnQgdG8gYXZvaWQgc2VsZWN0aW5nIHRoZSBzdWdnZXN0aW9uIGJ5IEVudGVyIGtleSB1bmludGVudGlvbmFsbHlcIlxuICAgICAgKVxuICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgdGMuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlRW50ZXJLZXkpLm9uQ2hhbmdlKFxuICAgICAgICAgIGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlRW50ZXJLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIklnbm9yZSBUYWIga2V5XCIpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgXCJJdCBpcyBoYW5keSB3aGVuIHlvdSB3YW50IHRvIGF2b2lkIHNlbGVjdGluZyB0aGUgc3VnZ2VzdGlvbiBieSBUYWIga2V5IHVuaW50ZW50aW9uYWxseVwiXG4gICAgICApXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVUYWJLZXkpLm9uQ2hhbmdlKFxuICAgICAgICAgIGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlVGFiS2V5ID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJQcm9wYWdhdGUgRVNDXCIpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgXCJJdCBpcyBoYW5keSBpZiB5b3UgdXNlIFZpbSBtb2RlIGJlY2F1c2UgeW91IGNhbiBzd2l0Y2ggdG8gTm9ybWFsIG1vZGUgYnkgb25lIEVTQywgd2hldGhlciBpdCBzaG93cyBzdWdnZXN0aW9ucyBvciBub3QuXCJcbiAgICAgIClcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnByb3BhZ2F0ZUVzYykub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm9wYWdhdGVFc2MgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkFkZGl0aW9uYWwgY3ljbGUgdGhyb3VnaCBzdWdnZXN0aW9ucyBrZXlzXCIpXG4gICAgICAuYWRkRHJvcGRvd24oKHRjKSA9PlxuICAgICAgICB0Y1xuICAgICAgICAgIC5hZGRPcHRpb25zKFxuICAgICAgICAgICAgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzLnZhbHVlcygpLnJlZHVjZShcbiAgICAgICAgICAgICAgKHAsIGMpID0+ICh7IC4uLnAsIFtjLm5hbWVdOiBjLm5hbWUgfSksXG4gICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hZGRpdGlvbmFsQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZGl0aW9uYWxDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiQ3VycmVudCBmaWxlIGNvbXBsZW1lbnRcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJFbmFibGUgQ3VycmVudCBmaWxlIGNvbXBsZW1lbnRcIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1cnJlbnRGaWxlQ29tcGxlbWVudCkub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVDdXJyZW50RmlsZUNvbXBsZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncyh7IGN1cnJlbnRGaWxlOiB0cnVlIH0pO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQ3VycmVudEZpbGVDb21wbGVtZW50KSB7XG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJPbmx5IGNvbXBsZW1lbnQgRW5nbGlzaCBvbiBjdXJyZW50IGZpbGUgY29tcGxlbWVudFwiKVxuICAgICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICAgIHRjLnNldFZhbHVlKFxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub25seUNvbXBsZW1lbnRFbmdsaXNoT25DdXJyZW50RmlsZUNvbXBsZW1lbnRcbiAgICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub25seUNvbXBsZW1lbnRFbmdsaXNoT25DdXJyZW50RmlsZUNvbXBsZW1lbnQgPVxuICAgICAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncyh7IGN1cnJlbnRGaWxlOiB0cnVlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJDdXN0b20gZGljdGlvbmFyeSBjb21wbGVtZW50XCIgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRW5hYmxlIEN1c3RvbSBkaWN0aW9uYXJ5IGNvbXBsZW1lbnRcIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKFxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50XG4gICAgICAgICkub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQ3VzdG9tRGljdGlvbmFyeUNvbXBsZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoeyBjdXN0b21EaWN0aW9uYXJ5OiB0cnVlIH0pO1xuICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50KSB7XG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJDdXN0b20gZGljdGlvbmFyeSBwYXRoc1wiKVxuICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICBcIlNwZWNpZnkgZWl0aGVyIGEgcmVsYXRpdmUgcGF0aCBmcm9tIFZhdWx0IHJvb3Qgb3IgVVJMIGZvciBlYWNoIGxpbmUuXCJcbiAgICAgICAgKVxuICAgICAgICAuYWRkVGV4dEFyZWEoKHRhYykgPT4ge1xuICAgICAgICAgIGNvbnN0IGVsID0gdGFjXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY3VzdG9tRGljdGlvbmFyeVBhdGhzKVxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZGljdGlvbmFyeS5tZFwiKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jdXN0b21EaWN0aW9uYXJ5UGF0aHMgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBlbC5pbnB1dEVsLmNsYXNzTmFtZSA9XG4gICAgICAgICAgICBcInZhcmlvdXMtY29tcGxlbWVudHNfX3NldHRpbmdzX19jdXN0b20tZGljdGlvbmFyeS1wYXRoc1wiO1xuICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfSk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIkRlbGltaXRlciB0byBoaWRlIGEgc3VnZ2VzdGlvblwiKVxuICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICBcIklmIHNldCAnOzs7JywgJ2FiY2Q7OztlZmcnIGlzIHNob3duIGFzICdhYmNkJyBvbiBzdWdnZXN0aW9ucywgYnV0IGNvbXBsZW1lbnRzIHRvICdhYmNkZWZnJy5cIlxuICAgICAgICApXG4gICAgICAgIC5hZGRUZXh0KChjYikgPT4ge1xuICAgICAgICAgIGNiLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24pLm9uQ2hhbmdlKFxuICAgICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIkNhcmV0IGxvY2F0aW9uIHN5bWJvbCBhZnRlciBjb21wbGVtZW50XCIpXG4gICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgIFwiSWYgc2V0ICc8Q0FSRVQ+JyBhbmQgdGhlcmUgaXMgJzxsaT48Q0FSRVQ+PC9saT4nIGluIGN1c3RvbSBkaWN0aW9uYXJ5LCBpdCBjb21wbGVtZW50cyAnPGxpPjwvbGk+JyBhbmQgbW92ZSBhIGNhcmV0IHdoZXJlIGJldHdlZW4gJzxsaT4nIGFuZCBgPC9saT5gLlwiXG4gICAgICAgIClcbiAgICAgICAgLmFkZFRleHQoKGNiKSA9PiB7XG4gICAgICAgICAgY2Iuc2V0VmFsdWUoXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jYXJldExvY2F0aW9uU3ltYm9sQWZ0ZXJDb21wbGVtZW50XG4gICAgICAgICAgKS5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNhcmV0TG9jYXRpb25TeW1ib2xBZnRlckNvbXBsZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJJbnRlcm5hbCBsaW5rIGNvbXBsZW1lbnRcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJFbmFibGUgSW50ZXJuYWwgbGluayBjb21wbGVtZW50XCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVJbnRlcm5hbExpbmtDb21wbGVtZW50KS5vbkNoYW5nZShcbiAgICAgICAgICBhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUludGVybmFsTGlua0NvbXBsZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncyh7IGludGVybmFsTGluazogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVJbnRlcm5hbExpbmtDb21wbGVtZW50KSB7XG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJTdWdnZXN0IHdpdGggYW4gYWxpYXNcIilcbiAgICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgICB0Yy5zZXRWYWx1ZShcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnN1Z2dlc3RJbnRlcm5hbExpbmtXaXRoQWxpYXNcbiAgICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3VnZ2VzdEludGVybmFsTGlua1dpdGhBbGlhcyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIkRlYnVnXCIgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiU2hvdyBsb2cgYWJvdXQgcGVyZm9ybWFuY2UgaW4gYSBjb25zb2xlXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZShcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93TG9nQWJvdXRQZXJmb3JtYW5jZUluQ29uc29sZVxuICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dMb2dBYm91dFBlcmZvcm1hbmNlSW5Db25zb2xlID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBhc3luYyB0b2dnbGVNYXRjaFN0cmF0ZWd5KCkge1xuICAgIHN3aXRjaCAodGhpcy5wbHVnaW4uc2V0dGluZ3MubWF0Y2hTdHJhdGVneSkge1xuICAgICAgY2FzZSBcInByZWZpeFwiOlxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXRjaFN0cmF0ZWd5ID0gXCJwYXJ0aWFsXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInBhcnRpYWxcIjpcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWF0Y2hTdHJhdGVneSA9IFwicHJlZml4XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIE9iamVjdEFsbG9jYXRpb25JZ25vcmVkXG4gICAgICAgIG5ldyBOb3RpY2UoXCLimqBVbmV4cGVjdGVkIGVycm9yXCIpO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgfVxuXG4gIGFzeW5jIHRvZ2dsZUNvbXBsZW1lbnRBdXRvbWF0aWNhbGx5KCkge1xuICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbXBsZW1lbnRBdXRvbWF0aWNhbGx5ID1cbiAgICAgICF0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb21wbGVtZW50QXV0b21hdGljYWxseTtcbiAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgfVxuXG4gIGdldFBsdWdpblNldHRpbmdzQXNKc29uU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFxuICAgICAge1xuICAgICAgICB2ZXJzaW9uOiB0aGlzLnBsdWdpbi5tYW5pZmVzdC52ZXJzaW9uLFxuICAgICAgICBtb2JpbGU6ICh0aGlzLmFwcCBhcyBhbnkpLmlzTW9iaWxlLFxuICAgICAgICBzZXR0aW5nczogdGhpcy5wbHVnaW4uc2V0dGluZ3MsXG4gICAgICB9LFxuICAgICAgbnVsbCxcbiAgICAgIDRcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOb3RpY2UsIFBsdWdpbiB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgQXV0b0NvbXBsZXRlU3VnZ2VzdCB9IGZyb20gXCIuL3VpL0F1dG9Db21wbGV0ZVN1Z2dlc3RcIjtcbmltcG9ydCB7XG4gIERFRkFVTFRfU0VUVElOR1MsXG4gIFNldHRpbmdzLFxuICBWYXJpb3VzQ29tcGxlbWVudHNTZXR0aW5nVGFiLFxufSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYXJpb3VzQ29tcG9uZW50cyBleHRlbmRzIFBsdWdpbiB7XG4gIHNldHRpbmdzOiBTZXR0aW5ncztcbiAgc2V0dGluZ1RhYjogVmFyaW91c0NvbXBsZW1lbnRzU2V0dGluZ1RhYjtcbiAgc3VnZ2VzdGVyOiBBdXRvQ29tcGxldGVTdWdnZXN0O1xuXG4gIG9udW5sb2FkKCkge1xuICAgIHN1cGVyLm9udW5sb2FkKCk7XG4gICAgdGhpcy5zdWdnZXN0ZXIudW5yZWdpc3RlcigpO1xuICB9XG5cbiAgYXN5bmMgb25sb2FkKCkge1xuICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cbiAgICB0aGlzLnNldHRpbmdUYWIgPSBuZXcgVmFyaW91c0NvbXBsZW1lbnRzU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcyk7XG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKHRoaXMuc2V0dGluZ1RhYik7XG5cbiAgICB0aGlzLnN1Z2dlc3RlciA9IGF3YWl0IEF1dG9Db21wbGV0ZVN1Z2dlc3QubmV3KHRoaXMuYXBwLCB0aGlzLnNldHRpbmdzKTtcbiAgICB0aGlzLnJlZ2lzdGVyRWRpdG9yU3VnZ2VzdCh0aGlzLnN1Z2dlc3Rlcik7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwicmVsb2FkLWN1c3RvbS1kaWN0aW9uYXJpZXNcIixcbiAgICAgIG5hbWU6IFwiUmVsb2FkIGN1c3RvbSBkaWN0aW9uYXJpZXNcIixcbiAgICAgIGhvdGtleXM6IFt7IG1vZGlmaWVyczogW1wiTW9kXCIsIFwiU2hpZnRcIl0sIGtleTogXCJyXCIgfV0sXG4gICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnJlbG9hZEN1c3RvbURpY3Rpb25hcmllcygpO1xuICAgICAgICAvLyBub2luc3BlY3Rpb24gT2JqZWN0QWxsb2NhdGlvbklnbm9yZWRcbiAgICAgICAgbmV3IE5vdGljZShgRmluaXNoIHJlbG9hZCBjdXN0b20gZGljdGlvbmFyaWVzYCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcInRvZ2dsZS1tYXRjaC1zdHJhdGVneVwiLFxuICAgICAgbmFtZTogXCJUb2dnbGUgTWF0Y2ggc3RyYXRlZ3lcIixcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0dGluZ1RhYi50b2dnbGVNYXRjaFN0cmF0ZWd5KCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcInRvZ2dsZS1jb21wbGVtZW50LWF1dG9tYXRpY2FsbHlcIixcbiAgICAgIG5hbWU6IFwiVG9nZ2xlIENvbXBsZW1lbnQgYXV0b21hdGljYWxseVwiLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXR0aW5nVGFiLnRvZ2dsZUNvbXBsZW1lbnRBdXRvbWF0aWNhbGx5KCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcInNob3ctc3VnZ2VzdGlvbnNcIixcbiAgICAgIG5hbWU6IFwiU2hvdyBzdWdnZXN0aW9uc1wiLFxuICAgICAgaG90a2V5czogW3sgbW9kaWZpZXJzOiBbXCJNb2RcIl0sIGtleTogXCIgXCIgfV0sXG4gICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLnN1Z2dlc3Rlci50cmlnZ2VyQ29tcGxldGUoKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwicHJlZGljdGFibGUtY29tcGxlbWVudHNcIixcbiAgICAgIG5hbWU6IFwiUHJlZGljdGFibGUgY29tcGxlbWVudFwiLFxuICAgICAgaG90a2V5czogW3sgbW9kaWZpZXJzOiBbXCJTaGlmdFwiXSwga2V5OiBcIiBcIiB9XSxcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3VnZ2VzdGVyLnByZWRpY3RhYmxlQ29tcGxldGUoKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwiY29weS1wbHVnaW4tc2V0dGluZ3NcIixcbiAgICAgIG5hbWU6IFwiQ29weSBwbHVnaW4gc2V0dGluZ3NcIixcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KFxuICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5nZXRQbHVnaW5TZXR0aW5nc0FzSnNvblN0cmluZygpXG4gICAgICAgICk7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJDb3B5IHNldHRpbmdzIG9mIFZhcmlvdXMgQ29tcGxlbWVudHNcIik7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7IC4uLkRFRkFVTFRfU0VUVElOR1MsIC4uLihhd2FpdCB0aGlzLmxvYWREYXRhKCkpIH07XG4gIH1cblxuICBhc3luYyBzYXZlU2V0dGluZ3MoXG4gICAgbmVlZFVwZGF0ZVRva2Vuczoge1xuICAgICAgY3VycmVudEZpbGU/OiBib29sZWFuO1xuICAgICAgY3VzdG9tRGljdGlvbmFyeT86IGJvb2xlYW47XG4gICAgICBpbnRlcm5hbExpbms/OiBib29sZWFuO1xuICAgIH0gPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICAgIGF3YWl0IHRoaXMuc3VnZ2VzdGVyLnVwZGF0ZVNldHRpbmdzKHRoaXMuc2V0dGluZ3MpO1xuICAgIGlmIChuZWVkVXBkYXRlVG9rZW5zLmN1cnJlbnRGaWxlKSB7XG4gICAgICBhd2FpdCB0aGlzLnN1Z2dlc3Rlci5yZWZyZXNoQ3VycmVudEZpbGVUb2tlbnMoKTtcbiAgICB9XG4gICAgaWYgKG5lZWRVcGRhdGVUb2tlbnMuY3VzdG9tRGljdGlvbmFyeSkge1xuICAgICAgYXdhaXQgdGhpcy5zdWdnZXN0ZXIucmVmcmVzaEN1c3RvbURpY3Rpb25hcnlUb2tlbnMoKTtcbiAgICB9XG4gICAgaWYgKG5lZWRVcGRhdGVUb2tlbnMuaW50ZXJuYWxMaW5rKSB7XG4gICAgICBhd2FpdCB0aGlzLnN1Z2dlc3Rlci5yZWZyZXNoSW50ZXJuYWxMaW5rVG9rZW5zKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVsb2FkQ3VzdG9tRGljdGlvbmFyaWVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuc3VnZ2VzdGVyLnJlZnJlc2hDdXN0b21EaWN0aW9uYXJ5VG9rZW5zKCk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJwYXJzZUZyb250TWF0dGVyQWxpYXNlcyIsIk1hcmtkb3duVmlldyIsInJlcXVlc3QiLCJOb3RpY2UiLCJFZGl0b3JTdWdnZXN0IiwiZGVib3VuY2UiLCJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyIsIlBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF1REE7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEs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LEVBQUUsQ0FBQztJQUNwQixLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtRQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1QztJQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JELElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztLQUNSLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsRUFBRTtRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxJQUFJO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxLQUFLO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLEtBQUs7UUFDWCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLEdBQUc7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixJQUFJLEVBQUUsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsSUFBSSxFQUFFLENBQUMsS0FBSztRQUNaLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsS0FBSztRQUNaLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxLQUFLO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsS0FBSztRQUNWLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULElBQUksRUFBRSxDQUFDLEdBQUc7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7S0FDUixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7S0FDVCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsRUFBRTtLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRztLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxJQUFJO0tBQ1osQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsS0FBSyxFQUFFLENBQUMsR0FBRztRQUNYLEtBQUssRUFBRSxDQUFDLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLElBQUk7UUFDWCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtLQUNSLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsRUFBRSxFQUFFLEVBQUU7UUFDTixFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ1AsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNQLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxFQUFFO1FBQ04sRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxLQUFLO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsQ0FBQyxFQUFFLEdBQUc7UUFDTixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7S0FDUCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sRUFBRSxFQUFFLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7S0FDUCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULENBQUMsRUFBRSxJQUFJO1FBQ1AsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEtBQUs7UUFDVCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsS0FBSztRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLENBQUMsRUFBRSxDQUFDLEtBQUs7UUFDVCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsS0FBSztRQUNULENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtLQUNULENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEVBQUU7UUFDTCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxFQUFFLEVBQUUsQ0FBQyxLQUFLO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztLQUNSLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNO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Q3ZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEIsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7UUFFNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pELEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNaLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNWLENBQUMsR0FBRyxHQUFH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LENBQUMsV0FBVyxFQUFFLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3ZFLElBQUksTUFBQSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3JELElBQUksTUFBQSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsbUNBQUksRUFBRSxDQUFDO1NBQ3BFO1VBQ0Q7WUFDRSxJQUFJLE1BQUEsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztZQUNwRCxJQUFJLE1BQUEsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3pELElBQUksTUFBQSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3JELElBQUksTUFBQSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsbUNBQUksRUFBRSxDQUFDO1NBQ3BFLENBQUM7SUFFTixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNoQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUNoRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7U0FDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDVCxJQUFJLENBQUMsQ0FBQyxLQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxLQUFNLENBQUMsTUFB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
