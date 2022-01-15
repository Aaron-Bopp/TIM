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
function lowerIncludes(one, other) {
    return one.toLowerCase().includes(other.toLowerCase());
}
function lowerStartsWith(a, b) {
    return a.toLowerCase().startsWith(b.toLowerCase());
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
    recursiveTokenize(content) {
        const trimIndexes = Array.from(content.matchAll(TRIM_CHAR_PATTERN))
            .sort((a, b) => a.index - b.index)
            .map((x) => x.index);
        return [
            { word: content, offset: 0 },
            ...trimIndexes.map((i) => ({
                word: content.slice(i + 1),
                offset: i + 1,
            })),
        ];
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
    recursiveTokenize(content) {
        const tokens = segmenter.segment(content);
        const ret = [];
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].length !== 1 ||
                !Boolean(tokens[i].match(this.getTrimPattern()))) {
                ret.push({
                    word: tokens.slice(i).join(""),
                    offset: tokens.slice(0, i).join("").length,
                });
            }
        }
        return ret;
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

const groupBy = (values, toKey) => values.reduce((prev, cur, _1, _2, k = toKey(cur)) => ((prev[k] || (prev[k] = [])).push(cur), prev), {});
function uniq(values) {
    return [...new Set(values)];
}
function uniqWith(arr, fn) {
    return arr.filter((element, index) => arr.findIndex((step) => fn(element, step)) === index);
}
function mirrorMap(collection, toValue) {
    return collection.reduce((p, c) => (Object.assign(Object.assign({}, p), { [toValue(c)]: toValue(c) })), {});
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
    getSelection() {
        var _a;
        return (_a = this.getCurrentEditor()) === null || _a === void 0 ? void 0 : _a.getSelection();
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
    if (lowerStartsWith(word.value, query)) {
        if (queryStartWithUpper && !word.internalLink) {
            const c = capitalizeFirstLetter(word.value);
            return { word: Object.assign(Object.assign({}, word), { value: c }), value: c, alias: false };
        }
        else {
            return { word: word, value: word.value, alias: false };
        }
    }
    const matchedAlias = (_a = word.aliases) === null || _a === void 0 ? void 0 : _a.find((a) => lowerStartsWith(a, query));
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
    if (lowerStartsWith(word.value, query)) {
        if (queryStartWithUpper && !word.internalLink) {
            const c = capitalizeFirstLetter(word.value);
            return { word: Object.assign(Object.assign({}, word), { value: c }), value: c, alias: false };
        }
        else {
            return { word: word, value: word.value, alias: false };
        }
    }
    const matchedAliasStarts = (_a = word.aliases) === null || _a === void 0 ? void 0 : _a.find((a) => lowerStartsWith(a, query));
    if (matchedAliasStarts) {
        return {
            word: Object.assign(Object.assign({}, word), { matchedAlias: matchedAliasStarts }),
            value: matchedAliasStarts,
            alias: true,
        };
    }
    if (lowerIncludes(word.value, query)) {
        return { word: word, value: word.value, alias: false };
    }
    const matchedAliasIncluded = (_b = word.aliases) === null || _b === void 0 ? void 0 : _b.find((a) => lowerIncludes(a, query));
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
    // XXX: There is no guarantee that equals with max, but it is important for performance
    return uniqWith(candidate, (a, b) => a.value === b.value && a.internalLink === b.internalLink);
}

function isURL(path) {
    return Boolean(path.match(new RegExp("^https?://")));
}

function escape(value) {
    // This tricky logics for Safari
    // https://github.com/tadashi-aikawa/obsidian-various-complements-plugin/issues/56
    return value
        .replace(/\\/g, "__VariousComplementsEscape__")
        .replace(/\n/g, "\\n")
        .replace(/\t/g, "\\t")
        .replace(/__VariousComplementsEscape__/g, "\\\\");
}
function unescape(value) {
    // This tricky logics for Safari
    // https://github.com/tadashi-aikawa/obsidian-various-complements-plugin/issues/56
    return value
        .replace(/\\\\/g, "__VariousComplementsEscape__")
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t")
        .replace(/__VariousComplementsEscape__/g, "\\");
}
function lineToWord(line, delimiter) {
    const [value, description, ...aliases] = line.split(delimiter.value);
    return {
        value: unescape(value),
        description,
        aliases,
    };
}
function wordToLine(word, delimiter) {
    const escapedValue = escape(word.value);
    if (!word.description && !word.aliases) {
        return escapedValue;
    }
    if (!word.aliases) {
        return [escapedValue, word.description].join(delimiter.value);
    }
    return [escapedValue, word.description, ...word.aliases].join(delimiter.value);
}
class CustomDictionaryWordProvider {
    constructor(app, paths, delimiter) {
        this.words = [];
        this.app = app;
        this.fileSystemAdapter = app.vault.adapter;
        this.paths = paths;
        this.delimiter = delimiter;
    }
    get editablePaths() {
        return this.paths.filter((x) => !isURL(x));
    }
    update(paths, delimiter) {
        this.paths = paths;
        this.delimiter = delimiter;
    }
    loadWords(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const contents = isURL(path)
                ? yield obsidian.request({ url: path })
                : yield this.fileSystemAdapter.read(path);
            return contents
                .split(/\r\n|\n/)
                .map((x) => x.replace(/%%.*%%/g, ""))
                .filter((x) => x)
                .map((x) => lineToWord(x, this.delimiter));
        });
    }
    refreshCustomWords() {
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
            this.words.forEach((x) => this.addWord(x));
        });
    }
    addWordWithDictionary(word, dictionaryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.addWord(word);
            yield this.fileSystemAdapter.append(dictionaryPath, "\n" + wordToLine(word, this.delimiter));
        });
    }
    addWord(word) {
        var _a;
        this.wordByValue[word.value] = word;
        pushWord(this.wordsByFirstLetter, word.value.charAt(0), word);
        (_a = word.aliases) === null || _a === void 0 ? void 0 : _a.forEach((a) => pushWord(this.wordsByFirstLetter, a.charAt(0), word));
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
CycleThroughSuggestionsKeys.TAB = new CycleThroughSuggestionsKeys("Tab, Shift+Tab", { modifiers: [], key: "Tab" }, { modifiers: ["Shift"], key: "Tab" });
CycleThroughSuggestionsKeys.EMACS = new CycleThroughSuggestionsKeys("Ctrl/Cmd+N, Ctrl/Cmd+P", { modifiers: ["Mod"], key: "N" }, { modifiers: ["Mod"], key: "P" });
CycleThroughSuggestionsKeys.VIM = new CycleThroughSuggestionsKeys("Ctrl/Cmd+J, Ctrl/Cmd+K", { modifiers: ["Mod"], key: "J" }, { modifiers: ["Mod"], key: "K" });

class ColumnDelimiter {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        ColumnDelimiter._values.push(this);
    }
    static fromName(name) {
        return ColumnDelimiter._values.find((x) => x.name === name);
    }
    static values() {
        return ColumnDelimiter._values;
    }
}
ColumnDelimiter._values = [];
ColumnDelimiter.TAB = new ColumnDelimiter("Tab", "\t");
ColumnDelimiter.COMMA = new ColumnDelimiter("Comma", ",");
ColumnDelimiter.PIPE = new ColumnDelimiter("Pipe", "|");

class SelectSuggestionKey {
    constructor(name, keyBind) {
        this.name = name;
        this.keyBind = keyBind;
        SelectSuggestionKey._values.push(this);
    }
    static fromName(name) {
        return SelectSuggestionKey._values.find((x) => x.name === name);
    }
    static values() {
        return SelectSuggestionKey._values;
    }
}
SelectSuggestionKey._values = [];
SelectSuggestionKey.ENTER = new SelectSuggestionKey("Enter", {
    modifiers: [],
    key: "Enter",
});
SelectSuggestionKey.TAB = new SelectSuggestionKey("Tab", {
    modifiers: [],
    key: "Tab",
});
SelectSuggestionKey.MOD_ENTER = new SelectSuggestionKey("Ctrl/Cmd+Enter", {
    modifiers: ["Mod"],
    key: "Enter",
});
SelectSuggestionKey.ALT_ENTER = new SelectSuggestionKey("Alt+Enter", {
    modifiers: ["Alt"],
    key: "Enter",
});
SelectSuggestionKey.SHIFT_ENTER = new SelectSuggestionKey("Shift+Enter", {
    modifiers: ["Shift"],
    key: "Enter",
});

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
            const ins = new AutoCompleteSuggest(app, new CustomDictionaryWordProvider(app, settings.customDictionaryPaths.split("\n").filter((x) => x), ColumnDelimiter.fromName(settings.columnDelimiter)));
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
    // settings getters
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
    // --- end ---
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
            this.customDictionaryWordProvider.update(settings.customDictionaryPaths.split("\n").filter((x) => x), ColumnDelimiter.fromName(settings.columnDelimiter));
            this.tokenizer = createTokenizer(this.tokenizerStrategy);
            this.currentFileWordProvider = new CurrentFileWordProvider(this.app, this.appHelper, this.tokenizer);
            yield this.refreshCurrentFileTokens();
            this.internalLinkWordProvider = new InternalLinkWordProvider(this.app, this.appHelper);
            yield this.refreshInternalLinkTokens();
            this.debounceGetSuggestions = obsidian.debounce((context, cb) => {
                const start = performance.now();
                const words = this.tokenizer
                    .recursiveTokenize(context.query)
                    .filter((x, i, xs) => this.settings.minNumberOfWordsTriggeredPhrase + i - 1 <
                    xs.length &&
                    x.word.length >= this.minNumberTriggered &&
                    !x.word.endsWith(" "))
                    .map((q) => this.matchStrategy
                    .handler(this.indexedWords, q.word, this.settings.maxNumberOfSuggestions)
                    .map((word) => (Object.assign(Object.assign({}, word), { offset: q.offset }))))
                    .flat();
                cb(uniqWith(words, (a, b) => a.value === b.value && a.internalLink === b.internalLink).slice(0, this.settings.maxNumberOfSuggestions));
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
        const cycleThroughSuggestionsKeys = CycleThroughSuggestionsKeys.fromName(this.settings.additionalCycleThroughSuggestionsKeys);
        if (cycleThroughSuggestionsKeys !== CycleThroughSuggestionsKeys.NONE) {
            this.keymapEventHandler.push(this.scope.register(cycleThroughSuggestionsKeys.nextKey.modifiers, cycleThroughSuggestionsKeys.nextKey.key, () => {
                this.suggestions.setSelectedItem(this.suggestions.selectedItem + 1, true);
                return false;
            }), this.scope.register(cycleThroughSuggestionsKeys.previousKey.modifiers, cycleThroughSuggestionsKeys.previousKey.key, () => {
                this.suggestions.setSelectedItem(this.suggestions.selectedItem - 1, true);
                return false;
            }));
        }
        this.scope.unregister(this.scope.keys.find((x) => x.key === "Enter"));
        const selectSuggestionKey = SelectSuggestionKey.fromName(this.settings.selectSuggestionKeys);
        if (selectSuggestionKey !== SelectSuggestionKey.ENTER) {
            this.keymapEventHandler.push(this.scope.register(SelectSuggestionKey.ENTER.keyBind.modifiers, SelectSuggestionKey.ENTER.keyBind.key, () => {
                this.close();
                return true;
            }));
        }
        if (selectSuggestionKey !== SelectSuggestionKey.TAB) {
            this.keymapEventHandler.push(this.scope.register(SelectSuggestionKey.TAB.keyBind.modifiers, SelectSuggestionKey.TAB.keyBind.key, () => {
                this.close();
                return true;
            }));
        }
        this.keymapEventHandler.push(this.scope.register(selectSuggestionKey.keyBind.modifiers, selectSuggestionKey.keyBind.key, () => {
            this.suggestions.useSelectedItem({});
            return false;
        }));
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
        var _a, _b, _c, _d, _e;
        const start = performance.now();
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
        const currentLineUntilCursor = this.appHelper.getCurrentLineUntilCursor(editor);
        const tokens = this.tokenizer.tokenize(currentLineUntilCursor, true);
        this.showDebugLog(`[onTrigger] tokens is ${tokens}`);
        const tokenized = this.tokenizer.recursiveTokenize(currentLineUntilCursor);
        const currentToken = (_a = tokenized[tokenized.length > this.settings.maxNumberOfWordsAsPhrase
            ? tokenized.length - this.settings.maxNumberOfWordsAsPhrase
            : 0]) === null || _a === void 0 ? void 0 : _a.word;
        this.showDebugLog(`[onTrigger] currentToken is ${currentToken}`);
        if (!currentToken) {
            this.runManually = false;
            this.showDebugLog(`Don't show suggestions because currentToken is empty`);
            return null;
        }
        const currentTokenSeparatedWhiteSpace = (_b = currentLineUntilCursor.split(" ").last()) !== null && _b !== void 0 ? _b : "";
        if (/^[:\/^]/.test(currentTokenSeparatedWhiteSpace)) {
            this.runManually = false;
            this.showDebugLog(`Don't show suggestions for avoiding to conflict with the other commands.`);
            return null;
        }
        if (currentToken.length === 1 &&
            Boolean(currentToken.match(this.tokenizer.getTrimPattern()))) {
            this.runManually = false;
            this.showDebugLog(`Don't show suggestions because currentToken is TRIM_PATTERN`);
            return null;
        }
        if (!this.runManually) {
            if (currentToken.length < this.minNumberTriggered) {
                this.showDebugLog("Don't show suggestions because currentToken is less than minNumberTriggered option");
                return null;
            }
            if (this.tokenizer.shouldIgnore(currentToken)) {
                this.showDebugLog("Don't show suggestions because currentToken should ignored");
                return null;
            }
        }
        this.showDebugLog("onTrigger", performance.now() - start);
        this.runManually = false;
        // For multi-word completion
        this.contextStartCh = cursor.ch - currentToken.length;
        return {
            start: {
                ch: cursor.ch - ((_e = (_d = (_c = tokenized.last()) === null || _c === void 0 ? void 0 : _c.word) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0),
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
        const caret = this.settings.caretLocationSymbolAfterComplement;
        const positionToMove = caret ? insertedText.indexOf(caret) : -1;
        if (positionToMove !== -1) {
            insertedText = insertedText.replace(caret, "");
        }
        const editor = this.context.editor;
        editor.replaceRange(insertedText, Object.assign(Object.assign({}, this.context.start), { ch: this.contextStartCh + word.offset }), this.context.end);
        if (positionToMove !== -1) {
            editor.setCursor(editor.offsetToPos(editor.posToOffset(editor.getCursor()) -
                insertedText.length +
                positionToMove));
        }
        this.close();
        this.debounceClose();
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
    // general
    strategy: "default",
    matchStrategy: "prefix",
    maxNumberOfSuggestions: 5,
    maxNumberOfWordsAsPhrase: 3,
    minNumberOfCharactersTriggered: 0,
    minNumberOfWordsTriggeredPhrase: 1,
    complementAutomatically: true,
    delayMilliSeconds: 0,
    disableSuggestionsDuringImeOn: false,
    insertAfterCompletion: true,
    // key customization
    selectSuggestionKeys: "Enter",
    additionalCycleThroughSuggestionsKeys: "None",
    propagateEsc: false,
    // current file complement
    enableCurrentFileComplement: true,
    onlyComplementEnglishOnCurrentFileComplement: false,
    // custom dictionary complement
    enableCustomDictionaryComplement: false,
    customDictionaryPaths: `https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt`,
    columnDelimiter: "Tab",
    delimiterToHideSuggestion: "",
    caretLocationSymbolAfterComplement: "",
    // internal link complement
    enableInternalLinkComplement: true,
    suggestInternalLinkWithAlias: false,
    // debug
    showLogAboutPerformanceInConsole: false,
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
            .setName("Max number of words as a phrase")
            .addSlider((sc) => sc
            .setLimits(1, 10, 1)
            .setValue(this.plugin.settings.maxNumberOfWordsAsPhrase)
            .setDynamicTooltip()
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.maxNumberOfWordsAsPhrase = value;
            yield this.plugin.saveSettings();
        })));
        if (this.plugin.settings.maxNumberOfWordsAsPhrase > 1) {
            containerEl.createEl("div", {
                text: `⚠ It makes slower more than ${this.plugin.settings.maxNumberOfWordsAsPhrase} times`,
                cls: "various-complements__settings__warning",
            });
        }
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
            .setName("Min number of words for trigger")
            .addSlider((sc) => sc
            .setLimits(1, 10, 1)
            .setValue(this.plugin.settings.minNumberOfWordsTriggeredPhrase)
            .setDynamicTooltip()
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.minNumberOfWordsTriggeredPhrase = value;
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
        containerEl.createEl("h3", { text: "Key customization" });
        new obsidian.Setting(containerEl)
            .setName("Select a suggestion key")
            .addDropdown((tc) => tc
            .addOptions(mirrorMap(SelectSuggestionKey.values(), (x) => x.name))
            .setValue(this.plugin.settings.selectSuggestionKeys)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.selectSuggestionKeys = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Additional cycle through suggestions keys")
            .addDropdown((tc) => tc
            .addOptions(CycleThroughSuggestionsKeys.values().reduce((p, c) => (Object.assign(Object.assign({}, p), { [c.name]: c.name })), {}))
            .setValue(this.plugin.settings.additionalCycleThroughSuggestionsKeys)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.additionalCycleThroughSuggestionsKeys = value;
            yield this.plugin.saveSettings();
        })));
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
            new obsidian.Setting(containerEl).setName("Column delimiter").addDropdown((tc) => tc
                .addOptions(ColumnDelimiter.values().reduce((p, c) => (Object.assign(Object.assign({}, p), { [c.name]: c.name })), {}))
                .setValue(this.plugin.settings.columnDelimiter)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.columnDelimiter = value;
                yield this.plugin.saveSettings();
            })));
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

class CustomDictionaryWordRegisterModal extends obsidian.Modal {
    constructor(app, dictionaryPaths, initialValue = "", onClickAdd) {
        super(app);
        this.currentDictionaryPath = dictionaryPaths[0];
        this.value = initialValue;
        this.titleEl.setText("Add a word to a custom dictionary");
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("h4", { text: "Dictionary" });
        new obsidian.DropdownComponent(contentEl)
            .addOptions(mirrorMap(dictionaryPaths, (x) => x))
            .onChange((v) => {
            this.currentDictionaryPath = v;
        });
        contentEl.createEl("h4", { text: "Word" });
        this.wordTextArea = new obsidian.TextAreaComponent(contentEl)
            .setValue(this.value)
            .onChange((v) => {
            this.value = v;
            this.button.setDisabled(!v);
            if (v) {
                this.button.setCta();
            }
            else {
                this.button.removeCta();
            }
        });
        this.wordTextArea.inputEl.setAttribute("style", "min-width: 100%;");
        contentEl.createEl("h4", { text: "Description" });
        new obsidian.TextComponent(contentEl)
            .onChange((v) => {
            this.description = v;
        })
            .inputEl.setAttribute("style", "min-width: 100%;");
        contentEl.createEl("h4", { text: "Aliases (for each line)" });
        new obsidian.TextAreaComponent(contentEl)
            .onChange((v) => {
            this.aliases = v.split("\n");
        })
            .inputEl.setAttribute("style", "min-width: 100%;");
        this.button = new obsidian.ButtonComponent(contentEl.createEl("div", {
            attr: {
                style: "display: flex; justify-content: center; margin-top: 15px",
            },
        }))
            .setButtonText("Add to dictionary")
            .setCta()
            .setDisabled(!this.value)
            .onClick(() => {
            onClickAdd(this.currentDictionaryPath, {
                value: this.value,
                description: this.description,
                aliases: this.aliases,
            });
        });
        if (this.value) {
            this.button.setCta();
        }
        else {
            this.button.removeCta();
        }
    }
}

class VariousComponents extends obsidian.Plugin {
    onunload() {
        super.onunload();
        this.suggester.unregister();
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.appHelper = new AppHelper(this.app);
            this.registerEvent(this.app.workspace.on("editor-menu", (menu) => {
                if (!this.appHelper.getSelection()) {
                    return;
                }
                menu.addItem((item) => item
                    .setTitle("Add to custom dictionary")
                    .setIcon("stacked-levels")
                    .onClick(() => {
                    this.addWordToCustomDictionary();
                }));
            }));
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
                id: "add-word-custom-dictionary",
                name: "Add a word to a custom dictionary",
                hotkeys: [{ modifiers: ["Mod", "Shift"], key: " " }],
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    this.addWordToCustomDictionary();
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
    addWordToCustomDictionary() {
        const selectedWord = this.appHelper.getSelection();
        const provider = this.suggester.customDictionaryWordProvider;
        const modal = new CustomDictionaryWordRegisterModal(this.app, provider.editablePaths, selectedWord, (dictionaryPath, word) => __awaiter(this, void 0, void 0, function* () {
            if (provider.wordByValue[word.value]) {
                new obsidian.Notice(`⚠ ${word.value} already exists`, 0);
                return;
            }
            yield provider.addWordWithDictionary(word, dictionaryPath);
            new obsidian.Notice(`Added ${word.value}`);
            modal.close();
        }));
        modal.open();
        if (selectedWord) {
            modal.button.buttonEl.focus();
        }
        else {
            modal.wordTextArea.inputEl.focus();
        }
    }
}

module.exports = VariousComponents;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy91dGlsL3N0cmluZ3MudHMiLCJzcmMvdG9rZW5pemVyL3Rva2VuaXplcnMvRGVmYXVsdFRva2VuaXplci50cyIsInNyYy90b2tlbml6ZXIvdG9rZW5pemVycy9BcmFiaWNUb2tlbml6ZXIudHMiLCJzcmMvZXh0ZXJuYWwvdGlueS1zZWdtZW50ZXIudHMiLCJzcmMvdG9rZW5pemVyL3Rva2VuaXplcnMvSmFwYW5lc2VUb2tlbml6ZXIudHMiLCJzcmMvdG9rZW5pemVyL3Rva2VuaXplci50cyIsInNyYy90b2tlbml6ZXIvVG9rZW5pemVTdHJhdGVneS50cyIsInNyYy91dGlsL2NvbGxlY3Rpb24taGVscGVyLnRzIiwic3JjL2FwcC1oZWxwZXIudHMiLCJzcmMvcHJvdmlkZXIvc3VnZ2VzdGVyLnRzIiwic3JjL3V0aWwvcGF0aC50cyIsInNyYy9wcm92aWRlci9DdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyLnRzIiwic3JjL3Byb3ZpZGVyL0N1cnJlbnRGaWxlV29yZFByb3ZpZGVyLnRzIiwic3JjL3Byb3ZpZGVyL0ludGVybmFsTGlua1dvcmRQcm92aWRlci50cyIsInNyYy9wcm92aWRlci9NYXRjaFN0cmF0ZWd5LnRzIiwic3JjL29wdGlvbi9DeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMudHMiLCJzcmMvb3B0aW9uL0NvbHVtbkRlbGltaXRlci50cyIsInNyYy9vcHRpb24vU2VsZWN0U3VnZ2VzdGlvbktleS50cyIsInNyYy91aS9BdXRvQ29tcGxldGVTdWdnZXN0LnRzIiwic3JjL3NldHRpbmdzLnRzIiwic3JjL3VpL0N1c3RvbURpY3Rpb25hcnlXb3JkUmVnaXN0ZXJNb2RhbC50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuIiwiY29uc3QgcmVnRW1vamkgPSBuZXcgUmVnRXhwKFxuICAvW1xcdTI3MDAtXFx1MjdCRl18W1xcdUUwMDAtXFx1RjhGRl18XFx1RDgzQ1tcXHVEQzAwLVxcdURGRkZdfFxcdUQ4M0RbXFx1REMwMC1cXHVERkZGXXxbXFx1MjAxMS1cXHUyNkZGXXxcXHVEODNFW1xcdUREMTAtXFx1RERGRl18W1xcdUZFMEUtXFx1RkUwRl0vLFxuICBcImdcIlxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFsbEFscGhhYmV0cyh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIEJvb2xlYW4odGV4dC5tYXRjaCgvXlthLXpBLVowLTlfLV0rJC8pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4Y2x1ZGVFbW9qaSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKHJlZ0Vtb2ppLCBcIlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvd2VySW5jbHVkZXMob25lOiBzdHJpbmcsIG90aGVyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG9uZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG90aGVyLnRvTG93ZXJDYXNlKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG93ZXJTdGFydHNXaXRoKGE6IHN0cmluZywgYjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBhLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChiLnRvTG93ZXJDYXNlKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiBzcGxpdFJhdyhcbiAgdGV4dDogc3RyaW5nLFxuICByZWdleHA6IFJlZ0V4cFxuKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmc+IHtcbiAgbGV0IHByZXZpb3VzSW5kZXggPSAwO1xuICBmb3IgKGxldCByIG9mIHRleHQubWF0Y2hBbGwocmVnZXhwKSkge1xuICAgIGlmIChwcmV2aW91c0luZGV4ICE9PSByLmluZGV4ISkge1xuICAgICAgeWllbGQgdGV4dC5zbGljZShwcmV2aW91c0luZGV4LCByLmluZGV4ISk7XG4gICAgfVxuICAgIHlpZWxkIHRleHRbci5pbmRleCFdO1xuICAgIHByZXZpb3VzSW5kZXggPSByLmluZGV4ISArIDE7XG4gIH1cblxuICBpZiAocHJldmlvdXNJbmRleCAhPT0gdGV4dC5sZW5ndGgpIHtcbiAgICB5aWVsZCB0ZXh0LnNsaWNlKHByZXZpb3VzSW5kZXgsIHRleHQubGVuZ3RoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL3Rva2VuaXplclwiO1xuaW1wb3J0IHsgc3BsaXRSYXcgfSBmcm9tIFwiLi4vLi4vdXRpbC9zdHJpbmdzXCI7XG5cbmZ1bmN0aW9uIHBpY2tUb2tlbnMoY29udGVudDogc3RyaW5nLCB0cmltUGF0dGVybjogUmVnRXhwKTogc3RyaW5nW10ge1xuICByZXR1cm4gY29udGVudC5zcGxpdCh0cmltUGF0dGVybikuZmlsdGVyKCh4KSA9PiB4ICE9PSBcIlwiKTtcbn1cblxuZXhwb3J0IGNvbnN0IFRSSU1fQ0hBUl9QQVRURVJOID0gL1tcXG5cXHRcXFxcXFxbXFxdLzo/IT0oKTw+XCInLix8Oyp+IGBdL2c7XG5leHBvcnQgY2xhc3MgRGVmYXVsdFRva2VuaXplciBpbXBsZW1lbnRzIFRva2VuaXplciB7XG4gIHRva2VuaXplKGNvbnRlbnQ6IHN0cmluZywgcmF3PzogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gcmF3XG4gICAgICA/IEFycmF5LmZyb20oc3BsaXRSYXcoY29udGVudCwgdGhpcy5nZXRUcmltUGF0dGVybigpKSkuZmlsdGVyKFxuICAgICAgICAgICh4KSA9PiB4ICE9PSBcIiBcIlxuICAgICAgICApXG4gICAgICA6IHBpY2tUb2tlbnMoY29udGVudCwgdGhpcy5nZXRUcmltUGF0dGVybigpKTtcbiAgfVxuXG4gIHJlY3Vyc2l2ZVRva2VuaXplKGNvbnRlbnQ6IHN0cmluZyk6IHsgd29yZDogc3RyaW5nOyBvZmZzZXQ6IG51bWJlciB9W10ge1xuICAgIGNvbnN0IHRyaW1JbmRleGVzID0gQXJyYXkuZnJvbShjb250ZW50Lm1hdGNoQWxsKFRSSU1fQ0hBUl9QQVRURVJOKSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhLmluZGV4ISAtIGIuaW5kZXghKVxuICAgICAgLm1hcCgoeCkgPT4geC5pbmRleCEpO1xuICAgIHJldHVybiBbXG4gICAgICB7IHdvcmQ6IGNvbnRlbnQsIG9mZnNldDogMCB9LFxuICAgICAgLi4udHJpbUluZGV4ZXMubWFwKChpKSA9PiAoe1xuICAgICAgICB3b3JkOiBjb250ZW50LnNsaWNlKGkgKyAxKSxcbiAgICAgICAgb2Zmc2V0OiBpICsgMSxcbiAgICAgIH0pKSxcbiAgICBdO1xuICB9XG5cbiAgZ2V0VHJpbVBhdHRlcm4oKTogUmVnRXhwIHtcbiAgICByZXR1cm4gVFJJTV9DSEFSX1BBVFRFUk47XG4gIH1cblxuICBzaG91bGRJZ25vcmUoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IERlZmF1bHRUb2tlbml6ZXIgfSBmcm9tIFwiLi9EZWZhdWx0VG9rZW5pemVyXCI7XG5cbmNvbnN0IEFSQUJJQ19UUklNX0NIQVJfUEFUVEVSTiA9IC9bXFxuXFx0XFxcXFxcW1xcXS86PyE9KCk8PlwiJy4sfDsqfiBg2IzYm10vZztcbmV4cG9ydCBjbGFzcyBBcmFiaWNUb2tlbml6ZXIgZXh0ZW5kcyBEZWZhdWx0VG9rZW5pemVyIHtcbiAgZ2V0VHJpbVBhdHRlcm4oKTogUmVnRXhwIHtcbiAgICByZXR1cm4gQVJBQklDX1RSSU1fQ0hBUl9QQVRURVJOO1xuICB9XG59XG4iLCIvLyBAdHMtbm9jaGVja1xuLy8gQmVjYXVzZSB0aGlzIGNvZGUgaXMgb3JpZ2luYWxseSBqYXZhc2NyaXB0IGNvZGUuXG4vLyBub2luc3BlY3Rpb24gRnVuY3Rpb25Ub29Mb25nSlMsRnVuY3Rpb25XaXRoTXVsdGlwbGVMb29wc0pTLEVxdWFsaXR5Q29tcGFyaXNvbldpdGhDb2VyY2lvbkpTLFBvaW50bGVzc0Jvb2xlYW5FeHByZXNzaW9uSlMsSlNEZWNsYXJhdGlvbnNBdFNjb3BlU3RhcnRcblxuLy8gVGlueVNlZ21lbnRlciAwLjEgLS0gU3VwZXIgY29tcGFjdCBKYXBhbmVzZSB0b2tlbml6ZXIgaW4gSmF2YXNjcmlwdFxuLy8gKGMpIDIwMDggVGFrdSBLdWRvIDx0YWt1QGNoYXNlbi5vcmc+XG4vLyBUaW55U2VnbWVudGVyIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiBhIG5ldyBCU0QgbGljZW5jZS5cbi8vIEZvciBkZXRhaWxzLCBzZWUgaHR0cDovL2NoYXNlbi5vcmcvfnRha3Uvc29mdHdhcmUvVGlueVNlZ21lbnRlci9MSUNFTkNFLnR4dFxuXG5mdW5jdGlvbiBUaW55U2VnbWVudGVyKCkge1xuICB2YXIgcGF0dGVybnMgPSB7XG4gICAgXCJb5LiA5LqM5LiJ5Zub5LqU5YWt5LiD5YWr5Lmd5Y2B55m+5Y2D5LiH5YSE5YWGXVwiOiBcIk1cIixcbiAgICBcIlvkuIAt6b6g44CF44CG44O144O2XVwiOiBcIkhcIixcbiAgICBcIlvjgYEt44KTXVwiOiBcIklcIixcbiAgICBcIlvjgqEt44O044O8772xLe++ne++nu+9sF1cIjogXCJLXCIsXG4gICAgXCJbYS16QS1a772BLe+9mu+8oS3vvLpdXCI6IFwiQVwiLFxuICAgIFwiWzAtOe+8kC3vvJldXCI6IFwiTlwiLFxuICB9O1xuICB0aGlzLmNoYXJ0eXBlXyA9IFtdO1xuICBmb3IgKHZhciBpIGluIHBhdHRlcm5zKSB7XG4gICAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoKTtcbiAgICByZWdleHAuY29tcGlsZShpKTtcbiAgICB0aGlzLmNoYXJ0eXBlXy5wdXNoKFtyZWdleHAsIHBhdHRlcm5zW2ldXSk7XG4gIH1cblxuICB0aGlzLkJJQVNfXyA9IC0zMzI7XG4gIHRoaXMuQkMxX18gPSB7IEhIOiA2LCBJSTogMjQ2MSwgS0g6IDQwNiwgT0g6IC0xMzc4IH07XG4gIHRoaXMuQkMyX18gPSB7XG4gICAgQUE6IC0zMjY3LFxuICAgIEFJOiAyNzQ0LFxuICAgIEFOOiAtODc4LFxuICAgIEhIOiAtNDA3MCxcbiAgICBITTogLTE3MTEsXG4gICAgSE46IDQwMTIsXG4gICAgSE86IDM3NjEsXG4gICAgSUE6IDEzMjcsXG4gICAgSUg6IC0xMTg0LFxuICAgIElJOiAtMTMzMixcbiAgICBJSzogMTcyMSxcbiAgICBJTzogNTQ5MixcbiAgICBLSTogMzgzMSxcbiAgICBLSzogLTg3NDEsXG4gICAgTUg6IC0zMTMyLFxuICAgIE1LOiAzMzM0LFxuICAgIE9POiAtMjkyMCxcbiAgfTtcbiAgdGhpcy5CQzNfXyA9IHtcbiAgICBISDogOTk2LFxuICAgIEhJOiA2MjYsXG4gICAgSEs6IC03MjEsXG4gICAgSE46IC0xMzA3LFxuICAgIEhPOiAtODM2LFxuICAgIElIOiAtMzAxLFxuICAgIEtLOiAyNzYyLFxuICAgIE1LOiAxMDc5LFxuICAgIE1NOiA0MDM0LFxuICAgIE9BOiAtMTY1MixcbiAgICBPSDogMjY2LFxuICB9O1xuICB0aGlzLkJQMV9fID0geyBCQjogMjk1LCBPQjogMzA0LCBPTzogLTEyNSwgVUI6IDM1MiB9O1xuICB0aGlzLkJQMl9fID0geyBCTzogNjAsIE9POiAtMTc2MiB9O1xuICB0aGlzLkJRMV9fID0ge1xuICAgIEJISDogMTE1MCxcbiAgICBCSE06IDE1MjEsXG4gICAgQklJOiAtMTE1OCxcbiAgICBCSU06IDg4NixcbiAgICBCTUg6IDEyMDgsXG4gICAgQk5IOiA0NDksXG4gICAgQk9IOiAtOTEsXG4gICAgQk9POiAtMjU5NyxcbiAgICBPSEk6IDQ1MSxcbiAgICBPSUg6IC0yOTYsXG4gICAgT0tBOiAxODUxLFxuICAgIE9LSDogLTEwMjAsXG4gICAgT0tLOiA5MDQsXG4gICAgT09POiAyOTY1LFxuICB9O1xuICB0aGlzLkJRMl9fID0ge1xuICAgIEJISDogMTE4LFxuICAgIEJISTogLTExNTksXG4gICAgQkhNOiA0NjYsXG4gICAgQklIOiAtOTE5LFxuICAgIEJLSzogLTE3MjAsXG4gICAgQktPOiA4NjQsXG4gICAgT0hIOiAtMTEzOSxcbiAgICBPSE06IC0xODEsXG4gICAgT0lIOiAxNTMsXG4gICAgVUhJOiAtMTE0NixcbiAgfTtcbiAgdGhpcy5CUTNfXyA9IHtcbiAgICBCSEg6IC03OTIsXG4gICAgQkhJOiAyNjY0LFxuICAgIEJJSTogLTI5OSxcbiAgICBCS0k6IDQxOSxcbiAgICBCTUg6IDkzNyxcbiAgICBCTU06IDgzMzUsXG4gICAgQk5OOiA5OTgsXG4gICAgQk9IOiA3NzUsXG4gICAgT0hIOiAyMTc0LFxuICAgIE9ITTogNDM5LFxuICAgIE9JSTogMjgwLFxuICAgIE9LSDogMTc5OCxcbiAgICBPS0k6IC03OTMsXG4gICAgT0tPOiAtMjI0MixcbiAgICBPTUg6IC0yNDAyLFxuICAgIE9PTzogMTE2OTksXG4gIH07XG4gIHRoaXMuQlE0X18gPSB7XG4gICAgQkhIOiAtMzg5NSxcbiAgICBCSUg6IDM3NjEsXG4gICAgQklJOiAtNDY1NCxcbiAgICBCSUs6IDEzNDgsXG4gICAgQktLOiAtMTgwNixcbiAgICBCTUk6IC0zMzg1LFxuICAgIEJPTzogLTEyMzk2LFxuICAgIE9BSDogOTI2LFxuICAgIE9ISDogMjY2LFxuICAgIE9ISzogLTIwMzYsXG4gICAgT05OOiAtOTczLFxuICB9O1xuICB0aGlzLkJXMV9fID0ge1xuICAgIFwiLOOBqFwiOiA2NjAsXG4gICAgXCIs5ZCMXCI6IDcyNyxcbiAgICBCMeOBgjogMTQwNCxcbiAgICBCMeWQjDogNTQyLFxuICAgIFwi44CB44GoXCI6IDY2MCxcbiAgICBcIuOAgeWQjFwiOiA3MjcsXG4gICAgXCLjgI3jgahcIjogMTY4MixcbiAgICDjgYLjgaM6IDE1MDUsXG4gICAg44GE44GGOiAxNzQzLFxuICAgIOOBhOOBozogLTIwNTUsXG4gICAg44GE44KLOiA2NzIsXG4gICAg44GG44GXOiAtNDgxNyxcbiAgICDjgYbjgpM6IDY2NSxcbiAgICDjgYvjgok6IDM0NzIsXG4gICAg44GM44KJOiA2MDAsXG4gICAg44GT44GGOiAtNzkwLFxuICAgIOOBk+OBqDogMjA4MyxcbiAgICDjgZPjgpM6IC0xMjYyLFxuICAgIOOBleOCiTogLTQxNDMsXG4gICAg44GV44KTOiA0NTczLFxuICAgIOOBl+OBnzogMjY0MSxcbiAgICDjgZfjgaY6IDExMDQsXG4gICAg44GZ44GnOiAtMzM5OSxcbiAgICDjgZ3jgZM6IDE5NzcsXG4gICAg44Gd44KMOiAtODcxLFxuICAgIOOBn+OBoTogMTEyMixcbiAgICDjgZ/jgoE6IDYwMSxcbiAgICDjgaPjgZ86IDM0NjMsXG4gICAg44Gk44GEOiAtODAyLFxuICAgIOOBpuOBhDogODA1LFxuICAgIOOBpuOBjTogMTI0OSxcbiAgICDjgafjgY06IDExMjcsXG4gICAg44Gn44GZOiAzNDQ1LFxuICAgIOOBp+OBrzogODQ0LFxuICAgIOOBqOOBhDogLTQ5MTUsXG4gICAg44Go44G/OiAxOTIyLFxuICAgIOOBqeOBkzogMzg4NyxcbiAgICDjgarjgYQ6IDU3MTMsXG4gICAg44Gq44GjOiAzMDE1LFxuICAgIOOBquOBqTogNzM3OSxcbiAgICDjgarjgpM6IC0xMTEzLFxuICAgIOOBq+OBlzogMjQ2OCxcbiAgICDjgavjga86IDE0OTgsXG4gICAg44Gr44KCOiAxNjcxLFxuICAgIOOBq+WvvjogLTkxMixcbiAgICDjga7kuIA6IC01MDEsXG4gICAg44Gu5LitOiA3NDEsXG4gICAg44G+44GbOiAyNDQ4LFxuICAgIOOBvuOBpzogMTcxMSxcbiAgICDjgb7jgb46IDI2MDAsXG4gICAg44G+44KLOiAtMjE1NSxcbiAgICDjgoTjgoA6IC0xOTQ3LFxuICAgIOOCiOOBozogLTI1NjUsXG4gICAg44KM44GfOiAyMzY5LFxuICAgIOOCjOOBpzogLTkxMyxcbiAgICDjgpLjgZc6IDE4NjAsXG4gICAg44KS6KaLOiA3MzEsXG4gICAg5Lqh44GPOiAtMTg4NixcbiAgICDkuqzpg706IDI1NTgsXG4gICAg5Y+W44KKOiAtMjc4NCxcbiAgICDlpKfjgY06IC0yNjA0LFxuICAgIOWkp+mYqjogMTQ5NyxcbiAgICDlubPmlrk6IC0yMzE0LFxuICAgIOW8leOBjTogLTEzMzYsXG4gICAg5pel5pysOiAtMTk1LFxuICAgIOacrOW9kzogLTI0MjMsXG4gICAg5q+O5pelOiAtMjExMyxcbiAgICDnm67mjIc6IC03MjQsXG4gICAg77yi77yR44GCOiAxNDA0LFxuICAgIO+8ou+8keWQjDogNTQyLFxuICAgIFwi772j44GoXCI6IDE2ODIsXG4gIH07XG4gIHRoaXMuQlcyX18gPSB7XG4gICAgXCIuLlwiOiAtMTE4MjIsXG4gICAgMTE6IC02NjksXG4gICAgXCLigJXigJVcIjogLTU3MzAsXG4gICAgXCLiiJLiiJJcIjogLTEzMTc1LFxuICAgIOOBhOOBhjogLTE2MDksXG4gICAg44GG44GLOiAyNDkwLFxuICAgIOOBi+OBlzogLTEzNTAsXG4gICAg44GL44KCOiAtNjAyLFxuICAgIOOBi+OCiTogLTcxOTQsXG4gICAg44GL44KMOiA0NjEyLFxuICAgIOOBjOOBhDogODUzLFxuICAgIOOBjOOCiTogLTMxOTgsXG4gICAg44GN44GfOiAxOTQxLFxuICAgIOOBj+OBqjogLTE1OTcsXG4gICAg44GT44GoOiAtODM5MixcbiAgICDjgZPjga46IC00MTkzLFxuICAgIOOBleOBmzogNDUzMyxcbiAgICDjgZXjgow6IDEzMTY4LFxuICAgIOOBleOCkzogLTM5NzcsXG4gICAg44GX44GEOiAtMTgxOSxcbiAgICDjgZfjgYs6IC01NDUsXG4gICAg44GX44GfOiA1MDc4LFxuICAgIOOBl+OBpjogOTcyLFxuICAgIOOBl+OBqjogOTM5LFxuICAgIOOBneOBrjogLTM3NDQsXG4gICAg44Gf44GEOiAtMTI1MyxcbiAgICDjgZ/jgZ86IC02NjIsXG4gICAg44Gf44GgOiAtMzg1NyxcbiAgICDjgZ/jgaE6IC03ODYsXG4gICAg44Gf44GoOiAxMjI0LFxuICAgIOOBn+OBrzogLTkzOSxcbiAgICDjgaPjgZ86IDQ1ODksXG4gICAg44Gj44GmOiAxNjQ3LFxuICAgIOOBo+OBqDogLTIwOTQsXG4gICAg44Gm44GEOiA2MTQ0LFxuICAgIOOBpuOBjTogMzY0MCxcbiAgICDjgabjgY86IDI1NTEsXG4gICAg44Gm44GvOiAtMzExMCxcbiAgICDjgabjgoI6IC0zMDY1LFxuICAgIOOBp+OBhDogMjY2NixcbiAgICDjgafjgY06IC0xNTI4LFxuICAgIOOBp+OBlzogLTM4MjgsXG4gICAg44Gn44GZOiAtNDc2MSxcbiAgICDjgafjgoI6IC00MjAzLFxuICAgIOOBqOOBhDogMTg5MCxcbiAgICDjgajjgZM6IC0xNzQ2LFxuICAgIOOBqOOBqDogLTIyNzksXG4gICAg44Go44GuOiA3MjAsXG4gICAg44Go44G/OiA1MTY4LFxuICAgIOOBqOOCgjogLTM5NDEsXG4gICAg44Gq44GEOiAtMjQ4OCxcbiAgICDjgarjgYw6IC0xMzEzLFxuICAgIOOBquOBqTogLTY1MDksXG4gICAg44Gq44GuOiAyNjE0LFxuICAgIOOBquOCkzogMzA5OSxcbiAgICDjgavjgYo6IC0xNjE1LFxuICAgIOOBq+OBlzogMjc0OCxcbiAgICDjgavjgao6IDI0NTQsXG4gICAg44Gr44KIOiAtNzIzNixcbiAgICDjgavlr746IC0xNDk0MyxcbiAgICDjgavlvpM6IC00Njg4LFxuICAgIOOBq+mWojogLTExMzg4LFxuICAgIOOBruOBizogMjA5MyxcbiAgICDjga7jgac6IC03MDU5LFxuICAgIOOBruOBqzogLTYwNDEsXG4gICAg44Gu44GuOiAtNjEyNSxcbiAgICDjga/jgYQ6IDEwNzMsXG4gICAg44Gv44GMOiAtMTAzMyxcbiAgICDjga/jgZo6IC0yNTMyLFxuICAgIOOBsOOCjDogMTgxMyxcbiAgICDjgb7jgZc6IC0xMzE2LFxuICAgIOOBvuOBpzogLTY2MjEsXG4gICAg44G+44KMOiA1NDA5LFxuICAgIOOCgeOBpjogLTMxNTMsXG4gICAg44KC44GEOiAyMjMwLFxuICAgIOOCguOBrjogLTEwNzEzLFxuICAgIOOCieOBizogLTk0NCxcbiAgICDjgonjgZc6IC0xNjExLFxuICAgIOOCieOBqzogLTE4OTcsXG4gICAg44KK44GXOiA2NTEsXG4gICAg44KK44G+OiAxNjIwLFxuICAgIOOCjOOBnzogNDI3MCxcbiAgICDjgozjgaY6IDg0OSxcbiAgICDjgozjgbA6IDQxMTQsXG4gICAg44KN44GGOiA2MDY3LFxuICAgIOOCj+OCjDogNzkwMSxcbiAgICDjgpLpgJo6IC0xMTg3NyxcbiAgICDjgpPjgaA6IDcyOCxcbiAgICDjgpPjgao6IC00MTE1LFxuICAgIOS4gOS6ujogNjAyLFxuICAgIOS4gOaWuTogLTEzNzUsXG4gICAg5LiA5pelOiA5NzAsXG4gICAg5LiA6YOoOiAtMTA1MSxcbiAgICDkuIrjgYw6IC00NDc5LFxuICAgIOS8muekvjogLTExMTYsXG4gICAg5Ye644GmOiAyMTYzLFxuICAgIOWIhuOBrjogLTc3NTgsXG4gICAg5ZCM5YWaOiA5NzAsXG4gICAg5ZCM5pelOiAtOTEzLFxuICAgIOWkp+mYqjogLTI0NzEsXG4gICAg5aeU5ZOhOiAtMTI1MCxcbiAgICDlsJHjgao6IC0xMDUwLFxuICAgIOW5tOW6pjogLTg2NjksXG4gICAg5bm06ZaTOiAtMTYyNixcbiAgICDlupznnIw6IC0yMzYzLFxuICAgIOaJi+aoqTogLTE5ODIsXG4gICAg5paw6IGeOiAtNDA2NixcbiAgICDml6XmlrA6IC03MjIsXG4gICAg5pel5pysOiAtNzA2OCxcbiAgICDml6XnsbM6IDMzNzIsXG4gICAg5puc5pelOiAtNjAxLFxuICAgIOacnemurjogLTIzNTUsXG4gICAg5pys5Lq6OiAtMjY5NyxcbiAgICDmnbHkuqw6IC0xNTQzLFxuICAgIOeEtuOBqDogLTEzODQsXG4gICAg56S+5LyaOiAtMTI3NixcbiAgICDnq4vjgaY6IC05OTAsXG4gICAg56ys44GrOiAtMTYxMixcbiAgICDnsbPlm706IC00MjY4LFxuICAgIFwi77yR77yRXCI6IC02NjksXG4gIH07XG4gIHRoaXMuQlczX18gPSB7XG4gICAg44GC44GfOiAtMjE5NCxcbiAgICDjgYLjgoo6IDcxOSxcbiAgICDjgYLjgos6IDM4NDYsXG4gICAgXCLjgYQuXCI6IC0xMTg1LFxuICAgIFwi44GE44CCXCI6IC0xMTg1LFxuICAgIOOBhOOBhDogNTMwOCxcbiAgICDjgYTjgYg6IDIwNzksXG4gICAg44GE44GPOiAzMDI5LFxuICAgIOOBhOOBnzogMjA1NixcbiAgICDjgYTjgaM6IDE4ODMsXG4gICAg44GE44KLOiA1NjAwLFxuICAgIOOBhOOCjzogMTUyNyxcbiAgICDjgYbjgaE6IDExMTcsXG4gICAg44GG44GoOiA0Nzk4LFxuICAgIOOBiOOBqDogMTQ1NCxcbiAgICBcIuOBiy5cIjogMjg1NyxcbiAgICBcIuOBi+OAglwiOiAyODU3LFxuICAgIOOBi+OBkTogLTc0MyxcbiAgICDjgYvjgaM6IC00MDk4LFxuICAgIOOBi+OBqzogLTY2OSxcbiAgICDjgYvjgok6IDY1MjAsXG4gICAg44GL44KKOiAtMjY3MCxcbiAgICBcIuOBjCxcIjogMTgxNixcbiAgICBcIuOBjOOAgVwiOiAxODE2LFxuICAgIOOBjOOBjTogLTQ4NTUsXG4gICAg44GM44GROiAtMTEyNyxcbiAgICDjgYzjgaM6IC05MTMsXG4gICAg44GM44KJOiAtNDk3NyxcbiAgICDjgYzjgoo6IC0yMDY0LFxuICAgIOOBjeOBnzogMTY0NSxcbiAgICDjgZHjgak6IDEzNzQsXG4gICAg44GT44GoOiA3Mzk3LFxuICAgIOOBk+OBrjogMTU0MixcbiAgICDjgZPjgo06IC0yNzU3LFxuICAgIOOBleOBhDogLTcxNCxcbiAgICDjgZXjgpI6IDk3NixcbiAgICBcIuOBlyxcIjogMTU1NyxcbiAgICBcIuOBl+OAgVwiOiAxNTU3LFxuICAgIOOBl+OBhDogLTM3MTQsXG4gICAg44GX44GfOiAzNTYyLFxuICAgIOOBl+OBpjogMTQ0OSxcbiAgICDjgZfjgao6IDI2MDgsXG4gICAg44GX44G+OiAxMjAwLFxuICAgIFwi44GZLlwiOiAtMTMxMCxcbiAgICBcIuOBmeOAglwiOiAtMTMxMCxcbiAgICDjgZnjgos6IDY1MjEsXG4gICAgXCLjgZosXCI6IDM0MjYsXG4gICAgXCLjgZrjgIFcIjogMzQyNixcbiAgICDjgZrjgas6IDg0MSxcbiAgICDjgZ3jgYY6IDQyOCxcbiAgICBcIuOBny5cIjogODg3NSxcbiAgICBcIuOBn+OAglwiOiA4ODc1LFxuICAgIOOBn+OBhDogLTU5NCxcbiAgICDjgZ/jga46IDgxMixcbiAgICDjgZ/jgoo6IC0xMTgzLFxuICAgIOOBn+OCizogLTg1MyxcbiAgICBcIuOBoC5cIjogNDA5OCxcbiAgICBcIuOBoOOAglwiOiA0MDk4LFxuICAgIOOBoOOBozogMTAwNCxcbiAgICDjgaPjgZ86IC00NzQ4LFxuICAgIOOBo+OBpjogMzAwLFxuICAgIOOBpuOBhDogNjI0MCxcbiAgICDjgabjgYo6IDg1NSxcbiAgICDjgabjgoI6IDMwMixcbiAgICDjgafjgZk6IDE0MzcsXG4gICAg44Gn44GrOiAtMTQ4MixcbiAgICDjgafjga86IDIyOTUsXG4gICAg44Go44GGOiAtMTM4NyxcbiAgICDjgajjgZc6IDIyNjYsXG4gICAg44Go44GuOiA1NDEsXG4gICAg44Go44KCOiAtMzU0MyxcbiAgICDjganjgYY6IDQ2NjQsXG4gICAg44Gq44GEOiAxNzk2LFxuICAgIOOBquOBjzogLTkwMyxcbiAgICDjgarjgak6IDIxMzUsXG4gICAgXCLjgassXCI6IC0xMDIxLFxuICAgIFwi44Gr44CBXCI6IC0xMDIxLFxuICAgIOOBq+OBlzogMTc3MSxcbiAgICDjgavjgao6IDE5MDYsXG4gICAg44Gr44GvOiAyNjQ0LFxuICAgIFwi44GuLFwiOiAtNzI0LFxuICAgIFwi44Gu44CBXCI6IC03MjQsXG4gICAg44Gu5a2QOiAtMTAwMCxcbiAgICBcIuOBryxcIjogMTMzNyxcbiAgICBcIuOBr+OAgVwiOiAxMzM3LFxuICAgIOOBueOBjTogMjE4MSxcbiAgICDjgb7jgZc6IDExMTMsXG4gICAg44G+44GZOiA2OTQzLFxuICAgIOOBvuOBozogLTE1NDksXG4gICAg44G+44GnOiA2MTU0LFxuICAgIOOBvuOCjDogLTc5MyxcbiAgICDjgonjgZc6IDE0NzksXG4gICAg44KJ44KMOiA2ODIwLFxuICAgIOOCi+OCizogMzgxOCxcbiAgICBcIuOCjCxcIjogODU0LFxuICAgIFwi44KM44CBXCI6IDg1NCxcbiAgICDjgozjgZ86IDE4NTAsXG4gICAg44KM44GmOiAxMzc1LFxuICAgIOOCjOOBsDogLTMyNDYsXG4gICAg44KM44KLOiAxMDkxLFxuICAgIOOCj+OCjDogLTYwNSxcbiAgICDjgpPjgaA6IDYwNixcbiAgICDjgpPjgac6IDc5OCxcbiAgICDjgqvmnIg6IDk5MCxcbiAgICDkvJrorbA6IDg2MCxcbiAgICDlhaXjgoo6IDEyMzIsXG4gICAg5aSn5LyaOiAyMjE3LFxuICAgIOWni+OCgTogMTY4MSxcbiAgICDluII6IDk2NSxcbiAgICDmlrDogZ46IC01MDU1LFxuICAgIFwi5pelLFwiOiA5NzQsXG4gICAgXCLml6XjgIFcIjogOTc0LFxuICAgIOekvuS8mjogMjAyNCxcbiAgICDvvbbmnIg6IDk5MCxcbiAgfTtcbiAgdGhpcy5UQzFfXyA9IHtcbiAgICBBQUE6IDEwOTMsXG4gICAgSEhIOiAxMDI5LFxuICAgIEhITTogNTgwLFxuICAgIEhJSTogOTk4LFxuICAgIEhPSDogLTM5MCxcbiAgICBIT006IC0zMzEsXG4gICAgSUhJOiAxMTY5LFxuICAgIElPSDogLTE0MixcbiAgICBJT0k6IC0xMDE1LFxuICAgIElPTTogNDY3LFxuICAgIE1NSDogMTg3LFxuICAgIE9PSTogLTE4MzIsXG4gIH07XG4gIHRoaXMuVEMyX18gPSB7XG4gICAgSEhPOiAyMDg4LFxuICAgIEhJSTogLTEwMjMsXG4gICAgSE1NOiAtMTE1NCxcbiAgICBJSEk6IC0xOTY1LFxuICAgIEtLSDogNzAzLFxuICAgIE9JSTogLTI2NDksXG4gIH07XG4gIHRoaXMuVEMzX18gPSB7XG4gICAgQUFBOiAtMjk0LFxuICAgIEhISDogMzQ2LFxuICAgIEhISTogLTM0MSxcbiAgICBISUk6IC0xMDg4LFxuICAgIEhJSzogNzMxLFxuICAgIEhPSDogLTE0ODYsXG4gICAgSUhIOiAxMjgsXG4gICAgSUhJOiAtMzA0MSxcbiAgICBJSE86IC0xOTM1LFxuICAgIElJSDogLTgyNSxcbiAgICBJSU06IC0xMDM1LFxuICAgIElPSTogLTU0MixcbiAgICBLSEg6IC0xMjE2LFxuICAgIEtLQTogNDkxLFxuICAgIEtLSDogLTEyMTcsXG4gICAgS09LOiAtMTAwOSxcbiAgICBNSEg6IC0yNjk0LFxuICAgIE1ITTogLTQ1NyxcbiAgICBNSE86IDEyMyxcbiAgICBNTUg6IC00NzEsXG4gICAgTk5IOiAtMTY4OSxcbiAgICBOTk86IDY2MixcbiAgICBPSE86IC0zMzkzLFxuICB9O1xuICB0aGlzLlRDNF9fID0ge1xuICAgIEhISDogLTIwMyxcbiAgICBISEk6IDEzNDQsXG4gICAgSEhLOiAzNjUsXG4gICAgSEhNOiAtMTIyLFxuICAgIEhITjogMTgyLFxuICAgIEhITzogNjY5LFxuICAgIEhJSDogODA0LFxuICAgIEhJSTogNjc5LFxuICAgIEhPSDogNDQ2LFxuICAgIElISDogNjk1LFxuICAgIElITzogLTIzMjQsXG4gICAgSUlIOiAzMjEsXG4gICAgSUlJOiAxNDk3LFxuICAgIElJTzogNjU2LFxuICAgIElPTzogNTQsXG4gICAgS0FLOiA0ODQ1LFxuICAgIEtLQTogMzM4NixcbiAgICBLS0s6IDMwNjUsXG4gICAgTUhIOiAtNDA1LFxuICAgIE1ISTogMjAxLFxuICAgIE1NSDogLTI0MSxcbiAgICBNTU06IDY2MSxcbiAgICBNT006IDg0MSxcbiAgfTtcbiAgdGhpcy5UUTFfXyA9IHtcbiAgICBCSEhIOiAtMjI3LFxuICAgIEJISEk6IDMxNixcbiAgICBCSElIOiAtMTMyLFxuICAgIEJJSEg6IDYwLFxuICAgIEJJSUk6IDE1OTUsXG4gICAgQk5ISDogLTc0NCxcbiAgICBCT0hIOiAyMjUsXG4gICAgQk9PTzogLTkwOCxcbiAgICBPQUtLOiA0ODIsXG4gICAgT0hISDogMjgxLFxuICAgIE9ISUg6IDI0OSxcbiAgICBPSUhJOiAyMDAsXG4gICAgT0lJSDogLTY4LFxuICB9O1xuICB0aGlzLlRRMl9fID0geyBCSUhIOiAtMTQwMSwgQklJSTogLTEwMzMsIEJLQUs6IC01NDMsIEJPT086IC01NTkxIH07XG4gIHRoaXMuVFEzX18gPSB7XG4gICAgQkhISDogNDc4LFxuICAgIEJISE06IC0xMDczLFxuICAgIEJISUg6IDIyMixcbiAgICBCSElJOiAtNTA0LFxuICAgIEJJSUg6IC0xMTYsXG4gICAgQklJSTogLTEwNSxcbiAgICBCTUhJOiAtODYzLFxuICAgIEJNSE06IC00NjQsXG4gICAgQk9NSDogNjIwLFxuICAgIE9ISEg6IDM0NixcbiAgICBPSEhJOiAxNzI5LFxuICAgIE9ISUk6IDk5NyxcbiAgICBPSE1IOiA0ODEsXG4gICAgT0lISDogNjIzLFxuICAgIE9JSUg6IDEzNDQsXG4gICAgT0tBSzogMjc5MixcbiAgICBPS0hIOiA1ODcsXG4gICAgT0tLQTogNjc5LFxuICAgIE9PSEg6IDExMCxcbiAgICBPT0lJOiAtNjg1LFxuICB9O1xuICB0aGlzLlRRNF9fID0ge1xuICAgIEJISEg6IC03MjEsXG4gICAgQkhITTogLTM2MDQsXG4gICAgQkhJSTogLTk2NixcbiAgICBCSUlIOiAtNjA3LFxuICAgIEJJSUk6IC0yMTgxLFxuICAgIE9BQUE6IC0yNzYzLFxuICAgIE9BS0s6IDE4MCxcbiAgICBPSEhIOiAtMjk0LFxuICAgIE9ISEk6IDI0NDYsXG4gICAgT0hITzogNDgwLFxuICAgIE9ISUg6IC0xNTczLFxuICAgIE9JSEg6IDE5MzUsXG4gICAgT0lISTogLTQ5MyxcbiAgICBPSUlIOiA2MjYsXG4gICAgT0lJSTogLTQwMDcsXG4gICAgT0tBSzogLTgxNTYsXG4gIH07XG4gIHRoaXMuVFcxX18gPSB7IOOBq+OBpOOBhDogLTQ2ODEsIOadseS6rOmDvTogMjAyNiB9O1xuICB0aGlzLlRXMl9fID0ge1xuICAgIOOBguOCi+eoizogLTIwNDksXG4gICAg44GE44Gj44GfOiAtMTI1NixcbiAgICDjgZPjgo3jgYw6IC0yNDM0LFxuICAgIOOBl+OCh+OBhjogMzg3MyxcbiAgICDjgZ3jga7lvow6IC00NDMwLFxuICAgIOOBoOOBo+OBpjogLTEwNDksXG4gICAg44Gm44GE44GfOiAxODMzLFxuICAgIOOBqOOBl+OBpjogLTQ2NTcsXG4gICAg44Go44KC44GrOiAtNDUxNyxcbiAgICDjgoLjga7jgac6IDE4ODIsXG4gICAg5LiA5rCX44GrOiAtNzkyLFxuICAgIOWIneOCgeOBpjogLTE1MTIsXG4gICAg5ZCM5pmC44GrOiAtODA5NyxcbiAgICDlpKfjgY3jgao6IC0xMjU1LFxuICAgIOWvvuOBl+OBpjogLTI3MjEsXG4gICAg56S+5Lya5YWaOiAtMzIxNixcbiAgfTtcbiAgdGhpcy5UVzNfXyA9IHtcbiAgICDjgYTjgZ/jgaA6IC0xNzM0LFxuICAgIOOBl+OBpuOBhDogMTMxNCxcbiAgICDjgajjgZfjgaY6IC00MzE0LFxuICAgIOOBq+OBpOOBhDogLTU0ODMsXG4gICAg44Gr44Go44GjOiAtNTk4OSxcbiAgICDjgavlvZPjgZ86IC02MjQ3LFxuICAgIFwi44Gu44GnLFwiOiAtNzI3LFxuICAgIFwi44Gu44Gn44CBXCI6IC03MjcsXG4gICAg44Gu44KC44GuOiAtNjAwLFxuICAgIOOCjOOBi+OCiTogLTM3NTIsXG4gICAg5Y2B5LqM5pyIOiAtMjI4NyxcbiAgfTtcbiAgdGhpcy5UVzRfXyA9IHtcbiAgICBcIuOBhOOBhi5cIjogODU3NixcbiAgICBcIuOBhOOBhuOAglwiOiA4NTc2LFxuICAgIOOBi+OCieOBqjogLTIzNDgsXG4gICAg44GX44Gm44GEOiAyOTU4LFxuICAgIFwi44Gf44GMLFwiOiAxNTE2LFxuICAgIFwi44Gf44GM44CBXCI6IDE1MTYsXG4gICAg44Gm44GE44KLOiAxNTM4LFxuICAgIOOBqOOBhOOBhjogMTM0OSxcbiAgICDjgb7jgZfjgZ86IDU1NDMsXG4gICAg44G+44Gb44KTOiAxMDk3LFxuICAgIOOCiOOBhuOBqDogLTQyNTgsXG4gICAg44KI44KL44GoOiA1ODY1LFxuICB9O1xuICB0aGlzLlVDMV9fID0geyBBOiA0ODQsIEs6IDkzLCBNOiA2NDUsIE86IC01MDUgfTtcbiAgdGhpcy5VQzJfXyA9IHsgQTogODE5LCBIOiAxMDU5LCBJOiA0MDksIE06IDM5ODcsIE46IDU3NzUsIE86IDY0NiB9O1xuICB0aGlzLlVDM19fID0geyBBOiAtMTM3MCwgSTogMjMxMSB9O1xuICB0aGlzLlVDNF9fID0ge1xuICAgIEE6IC0yNjQzLFxuICAgIEg6IDE4MDksXG4gICAgSTogLTEwMzIsXG4gICAgSzogLTM0NTAsXG4gICAgTTogMzU2NSxcbiAgICBOOiAzODc2LFxuICAgIE86IDY2NDYsXG4gIH07XG4gIHRoaXMuVUM1X18gPSB7IEg6IDMxMywgSTogLTEyMzgsIEs6IC03OTksIE06IDUzOSwgTzogLTgzMSB9O1xuICB0aGlzLlVDNl9fID0geyBIOiAtNTA2LCBJOiAtMjUzLCBLOiA4NywgTTogMjQ3LCBPOiAtMzg3IH07XG4gIHRoaXMuVVAxX18gPSB7IE86IC0yMTQgfTtcbiAgdGhpcy5VUDJfXyA9IHsgQjogNjksIE86IDkzNSB9O1xuICB0aGlzLlVQM19fID0geyBCOiAxODkgfTtcbiAgdGhpcy5VUTFfXyA9IHtcbiAgICBCSDogMjEsXG4gICAgQkk6IC0xMixcbiAgICBCSzogLTk5LFxuICAgIEJOOiAxNDIsXG4gICAgQk86IC01NixcbiAgICBPSDogLTk1LFxuICAgIE9JOiA0NzcsXG4gICAgT0s6IDQxMCxcbiAgICBPTzogLTI0MjIsXG4gIH07XG4gIHRoaXMuVVEyX18gPSB7IEJIOiAyMTYsIEJJOiAxMTMsIE9LOiAxNzU5IH07XG4gIHRoaXMuVVEzX18gPSB7XG4gICAgQkE6IC00NzksXG4gICAgQkg6IDQyLFxuICAgIEJJOiAxOTEzLFxuICAgIEJLOiAtNzE5OCxcbiAgICBCTTogMzE2MCxcbiAgICBCTjogNjQyNyxcbiAgICBCTzogMTQ3NjEsXG4gICAgT0k6IC04MjcsXG4gICAgT046IC0zMjEyLFxuICB9O1xuICB0aGlzLlVXMV9fID0ge1xuICAgIFwiLFwiOiAxNTYsXG4gICAgXCLjgIFcIjogMTU2LFxuICAgIFwi44CMXCI6IC00NjMsXG4gICAg44GCOiAtOTQxLFxuICAgIOOBhjogLTEyNyxcbiAgICDjgYw6IC01NTMsXG4gICAg44GNOiAxMjEsXG4gICAg44GTOiA1MDUsXG4gICAg44GnOiAtMjAxLFxuICAgIOOBqDogLTU0NyxcbiAgICDjgak6IC0xMjMsXG4gICAg44GrOiAtNzg5LFxuICAgIOOBrjogLTE4NSxcbiAgICDjga86IC04NDcsXG4gICAg44KCOiAtNDY2LFxuICAgIOOChDogLTQ3MCxcbiAgICDjgog6IDE4MixcbiAgICDjgok6IC0yOTIsXG4gICAg44KKOiAyMDgsXG4gICAg44KMOiAxNjksXG4gICAg44KSOiAtNDQ2LFxuICAgIOOCkzogLTEzNyxcbiAgICBcIuODu1wiOiAtMTM1LFxuICAgIOS4uzogLTQwMixcbiAgICDkuqw6IC0yNjgsXG4gICAg5Yy6OiAtOTEyLFxuICAgIOWNiDogODcxLFxuICAgIOWbvTogLTQ2MCxcbiAgICDlpKc6IDU2MSxcbiAgICDlp5Q6IDcyOSxcbiAgICDluII6IC00MTEsXG4gICAg5pelOiAtMTQxLFxuICAgIOeQhjogMzYxLFxuICAgIOeUnzogLTQwOCxcbiAgICDnnIw6IC0zODYsXG4gICAg6YO9OiAtNzE4LFxuICAgIFwi772iXCI6IC00NjMsXG4gICAgXCLvvaVcIjogLTEzNSxcbiAgfTtcbiAgdGhpcy5VVzJfXyA9IHtcbiAgICBcIixcIjogLTgyOSxcbiAgICBcIuOAgVwiOiAtODI5LFxuICAgIOOAhzogODkyLFxuICAgIFwi44CMXCI6IC02NDUsXG4gICAgXCLjgI1cIjogMzE0NSxcbiAgICDjgYI6IC01MzgsXG4gICAg44GEOiA1MDUsXG4gICAg44GGOiAxMzQsXG4gICAg44GKOiAtNTAyLFxuICAgIOOBizogMTQ1NCxcbiAgICDjgYw6IC04NTYsXG4gICAg44GPOiAtNDEyLFxuICAgIOOBkzogMTE0MSxcbiAgICDjgZU6IDg3OCxcbiAgICDjgZY6IDU0MCxcbiAgICDjgZc6IDE1MjksXG4gICAg44GZOiAtNjc1LFxuICAgIOOBmzogMzAwLFxuICAgIOOBnTogLTEwMTEsXG4gICAg44GfOiAxODgsXG4gICAg44GgOiAxODM3LFxuICAgIOOBpDogLTk0OSxcbiAgICDjgaY6IC0yOTEsXG4gICAg44GnOiAtMjY4LFxuICAgIOOBqDogLTk4MSxcbiAgICDjgak6IDEyNzMsXG4gICAg44GqOiAxMDYzLFxuICAgIOOBqzogLTE3NjQsXG4gICAg44GuOiAxMzAsXG4gICAg44GvOiAtNDA5LFxuICAgIOOBsjogLTEyNzMsXG4gICAg44G5OiAxMjYxLFxuICAgIOOBvjogNjAwLFxuICAgIOOCgjogLTEyNjMsXG4gICAg44KEOiAtNDAyLFxuICAgIOOCiDogMTYzOSxcbiAgICDjgoo6IC01NzksXG4gICAg44KLOiAtNjk0LFxuICAgIOOCjDogNTcxLFxuICAgIOOCkjogLTI1MTYsXG4gICAg44KTOiAyMDk1LFxuICAgIOOCojogLTU4NyxcbiAgICDjgqs6IDMwNixcbiAgICDjgq06IDU2OCxcbiAgICDjg4M6IDgzMSxcbiAgICDkuIk6IC03NTgsXG4gICAg5LiNOiAtMjE1MCxcbiAgICDkuJY6IC0zMDIsXG4gICAg5LitOiAtOTY4LFxuICAgIOS4uzogLTg2MSxcbiAgICDkuos6IDQ5MixcbiAgICDkuro6IC0xMjMsXG4gICAg5LyaOiA5NzgsXG4gICAg5L+dOiAzNjIsXG4gICAg5YWlOiA1NDgsXG4gICAg5YidOiAtMzAyNSxcbiAgICDlia86IC0xNTY2LFxuICAgIOWMlzogLTM0MTQsXG4gICAg5Yy6OiAtNDIyLFxuICAgIOWkpzogLTE3NjksXG4gICAg5aSpOiAtODY1LFxuICAgIOWkqjogLTQ4MyxcbiAgICDlrZA6IC0xNTE5LFxuICAgIOWtpjogNzYwLFxuICAgIOWunzogMTAyMyxcbiAgICDlsI86IC0yMDA5LFxuICAgIOW4gjogLTgxMyxcbiAgICDlubQ6IC0xMDYwLFxuICAgIOW8tzogMTA2NyxcbiAgICDmiYs6IC0xNTE5LFxuICAgIOaPujogLTEwMzMsXG4gICAg5pS/OiAxNTIyLFxuICAgIOaWhzogLTEzNTUsXG4gICAg5pawOiAtMTY4MixcbiAgICDml6U6IC0xODE1LFxuICAgIOaYjjogLTE0NjIsXG4gICAg5pyAOiAtNjMwLFxuICAgIOacnTogLTE4NDMsXG4gICAg5pysOiAtMTY1MCxcbiAgICDmnbE6IC05MzEsXG4gICAg5p6cOiAtNjY1LFxuICAgIOasoTogLTIzNzgsXG4gICAg5rCROiAtMTgwLFxuICAgIOawlzogLTE3NDAsXG4gICAg55CGOiA3NTIsXG4gICAg55m6OiA1MjksXG4gICAg55uuOiAtMTU4NCxcbiAgICDnm7g6IC0yNDIsXG4gICAg55yMOiAtMTE2NSxcbiAgICDnq4s6IC03NjMsXG4gICAg56ysOiA4MTAsXG4gICAg57GzOiA1MDksXG4gICAg6IeqOiAtMTM1MyxcbiAgICDooYw6IDgzOCxcbiAgICDopb86IC03NDQsXG4gICAg6KaLOiAtMzg3NCxcbiAgICDoqr86IDEwMTAsXG4gICAg6K2wOiAxMTk4LFxuICAgIOi+vDogMzA0MSxcbiAgICDplos6IDE3NTgsXG4gICAg6ZaTOiAtMTI1NyxcbiAgICBcIu+9olwiOiAtNjQ1LFxuICAgIFwi772jXCI6IDMxNDUsXG4gICAg772vOiA4MzEsXG4gICAg772xOiAtNTg3LFxuICAgIO+9tjogMzA2LFxuICAgIO+9tzogNTY4LFxuICB9O1xuICB0aGlzLlVXM19fID0ge1xuICAgIFwiLFwiOiA0ODg5LFxuICAgIDE6IC04MDAsXG4gICAgXCLiiJJcIjogLTE3MjMsXG4gICAgXCLjgIFcIjogNDg4OSxcbiAgICDjgIU6IC0yMzExLFxuICAgIOOAhzogNTgyNyxcbiAgICBcIuOAjVwiOiAyNjcwLFxuICAgIFwi44CTXCI6IC0zNTczLFxuICAgIOOBgjogLTI2OTYsXG4gICAg44GEOiAxMDA2LFxuICAgIOOBhjogMjM0MixcbiAgICDjgYg6IDE5ODMsXG4gICAg44GKOiAtNDg2NCxcbiAgICDjgYs6IC0xMTYzLFxuICAgIOOBjDogMzI3MSxcbiAgICDjgY86IDEwMDQsXG4gICAg44GROiAzODgsXG4gICAg44GSOiA0MDEsXG4gICAg44GTOiAtMzU1MixcbiAgICDjgZQ6IC0zMTE2LFxuICAgIOOBlTogLTEwNTgsXG4gICAg44GXOiAtMzk1LFxuICAgIOOBmTogNTg0LFxuICAgIOOBmzogMzY4NSxcbiAgICDjgZ06IC01MjI4LFxuICAgIOOBnzogODQyLFxuICAgIOOBoTogLTUyMSxcbiAgICDjgaM6IC0xNDQ0LFxuICAgIOOBpDogLTEwODEsXG4gICAg44GmOiA2MTY3LFxuICAgIOOBpzogMjMxOCxcbiAgICDjgag6IDE2OTEsXG4gICAg44GpOiAtODk5LFxuICAgIOOBqjogLTI3ODgsXG4gICAg44GrOiAyNzQ1LFxuICAgIOOBrjogNDA1NixcbiAgICDjga86IDQ1NTUsXG4gICAg44GyOiAtMjE3MSxcbiAgICDjgbU6IC0xNzk4LFxuICAgIOOBuDogMTE5OSxcbiAgICDjgbs6IC01NTE2LFxuICAgIOOBvjogLTQzODQsXG4gICAg44G/OiAtMTIwLFxuICAgIOOCgTogMTIwNSxcbiAgICDjgoI6IDIzMjMsXG4gICAg44KEOiAtNzg4LFxuICAgIOOCiDogLTIwMixcbiAgICDjgok6IDcyNyxcbiAgICDjgoo6IDY0OSxcbiAgICDjgos6IDU5MDUsXG4gICAg44KMOiAyNzczLFxuICAgIOOCjzogLTEyMDcsXG4gICAg44KSOiA2NjIwLFxuICAgIOOCkzogLTUxOCxcbiAgICDjgqI6IDU1MSxcbiAgICDjgrA6IDEzMTksXG4gICAg44K5OiA4NzQsXG4gICAg44ODOiAtMTM1MCxcbiAgICDjg4g6IDUyMSxcbiAgICDjg6A6IDExMDksXG4gICAg44OrOiAxNTkxLFxuICAgIOODrTogMjIwMSxcbiAgICDjg7M6IDI3OCxcbiAgICBcIuODu1wiOiAtMzc5NCxcbiAgICDkuIA6IC0xNjE5LFxuICAgIOS4izogLTE3NTksXG4gICAg5LiWOiAtMjA4NyxcbiAgICDkuKE6IDM4MTUsXG4gICAg5LitOiA2NTMsXG4gICAg5Li7OiAtNzU4LFxuICAgIOS6iDogLTExOTMsXG4gICAg5LqMOiA5NzQsXG4gICAg5Lq6OiAyNzQyLFxuICAgIOS7ijogNzkyLFxuICAgIOS7ljogMTg4OSxcbiAgICDku6U6IC0xMzY4LFxuICAgIOS9jjogODExLFxuICAgIOS9lTogNDI2NSxcbiAgICDkvZw6IC0zNjEsXG4gICAg5L+dOiAtMjQzOSxcbiAgICDlhYM6IDQ4NTgsXG4gICAg5YWaOiAzNTkzLFxuICAgIOWFqDogMTU3NCxcbiAgICDlhaw6IC0zMDMwLFxuICAgIOWFrTogNzU1LFxuICAgIOWFsTogLTE4ODAsXG4gICAg5YaGOiA1ODA3LFxuICAgIOWGjTogMzA5NSxcbiAgICDliIY6IDQ1NyxcbiAgICDliJ06IDI0NzUsXG4gICAg5YilOiAxMTI5LFxuICAgIOWJjTogMjI4NixcbiAgICDlia86IDQ0MzcsXG4gICAg5YqbOiAzNjUsXG4gICAg5YuVOiAtOTQ5LFxuICAgIOWLmTogLTE4NzIsXG4gICAg5YyWOiAxMzI3LFxuICAgIOWMlzogLTEwMzgsXG4gICAg5Yy6OiA0NjQ2LFxuICAgIOWNgzogLTIzMDksXG4gICAg5Y2IOiAtNzgzLFxuICAgIOWNlDogLTEwMDYsXG4gICAg5Y+jOiA0ODMsXG4gICAg5Y+zOiAxMjMzLFxuICAgIOWQhDogMzU4OCxcbiAgICDlkIg6IC0yNDEsXG4gICAg5ZCMOiAzOTA2LFxuICAgIOWSjDogLTgzNyxcbiAgICDlk6E6IDQ1MTMsXG4gICAg5Zu9OiA2NDIsXG4gICAg5Z6LOiAxMzg5LFxuICAgIOWgtDogMTIxOSxcbiAgICDlpJY6IC0yNDEsXG4gICAg5aa7OiAyMDE2LFxuICAgIOWtpjogLTEzNTYsXG4gICAg5a6JOiAtNDIzLFxuICAgIOWunzogLTEwMDgsXG4gICAg5a62OiAxMDc4LFxuICAgIOWwjzogLTUxMyxcbiAgICDlsJE6IC0zMTAyLFxuICAgIOW3njogMTE1NSxcbiAgICDluII6IDMxOTcsXG4gICAg5bmzOiAtMTgwNCxcbiAgICDlubQ6IDI0MTYsXG4gICAg5bqDOiAtMTAzMCxcbiAgICDlupw6IDE2MDUsXG4gICAg5bqmOiAxNDUyLFxuICAgIOW7ujogLTIzNTIsXG4gICAg5b2TOiAtMzg4NSxcbiAgICDlvpc6IDE5MDUsXG4gICAg5oCdOiAtMTI5MSxcbiAgICDmgKc6IDE4MjIsXG4gICAg5oi4OiAtNDg4LFxuICAgIOaMhzogLTM5NzMsXG4gICAg5pS/OiAtMjAxMyxcbiAgICDmlZk6IC0xNDc5LFxuICAgIOaVsDogMzIyMixcbiAgICDmloc6IC0xNDg5LFxuICAgIOaWsDogMTc2NCxcbiAgICDml6U6IDIwOTksXG4gICAg5penOiA1NzkyLFxuICAgIOaYqDogLTY2MSxcbiAgICDmmYI6IC0xMjQ4LFxuICAgIOabnDogLTk1MSxcbiAgICDmnIA6IC05MzcsXG4gICAg5pyIOiA0MTI1LFxuICAgIOacnzogMzYwLFxuICAgIOadjjogMzA5NCxcbiAgICDmnZE6IDM2NCxcbiAgICDmnbE6IC04MDUsXG4gICAg5qC4OiA1MTU2LFxuICAgIOajrjogMjQzOCxcbiAgICDmpa06IDQ4NCxcbiAgICDmsI86IDI2MTMsXG4gICAg5rCROiAtMTY5NCxcbiAgICDmsbo6IC0xMDczLFxuICAgIOazlTogMTg2OCxcbiAgICDmtbc6IC00OTUsXG4gICAg54ShOiA5NzksXG4gICAg54mpOiA0NjEsXG4gICAg54m5OiAtMzg1MCxcbiAgICDnlJ86IC0yNzMsXG4gICAg55SoOiA5MTQsXG4gICAg55S6OiAxMjE1LFxuICAgIOeahDogNzMxMyxcbiAgICDnm7Q6IC0xODM1LFxuICAgIOecgTogNzkyLFxuICAgIOecjDogNjI5MyxcbiAgICDnn6U6IC0xNTI4LFxuICAgIOengTogNDIzMSxcbiAgICDnqI46IDQwMSxcbiAgICDnq4s6IC05NjAsXG4gICAg56ysOiAxMjAxLFxuICAgIOexszogNzc2NyxcbiAgICDns7s6IDMwNjYsXG4gICAg57SEOiAzNjYzLFxuICAgIOe0mjogMTM4NCxcbiAgICDntbE6IC00MjI5LFxuICAgIOe3jzogMTE2MyxcbiAgICDnt5o6IDEyNTUsXG4gICAg6ICFOiA2NDU3LFxuICAgIOiDvTogNzI1LFxuICAgIOiHqjogLTI4NjksXG4gICAg6IuxOiA3ODUsXG4gICAg6KaLOiAxMDQ0LFxuICAgIOiqvzogLTU2MixcbiAgICDosqE6IC03MzMsXG4gICAg6LK7OiAxNzc3LFxuICAgIOi7ijogMTgzNSxcbiAgICDou406IDEzNzUsXG4gICAg6L68OiAtMTUwNCxcbiAgICDpgJo6IC0xMTM2LFxuICAgIOmBuDogLTY4MSxcbiAgICDpg446IDEwMjYsXG4gICAg6YOhOiA0NDA0LFxuICAgIOmDqDogMTIwMCxcbiAgICDph5E6IDIxNjMsXG4gICAg6ZW3OiA0MjEsXG4gICAg6ZaLOiAtMTQzMixcbiAgICDplpM6IDEzMDIsXG4gICAg6ZaiOiAtMTI4MixcbiAgICDpm6g6IDIwMDksXG4gICAg6Zu7OiAtMTA0NSxcbiAgICDpnZ46IDIwNjYsXG4gICAg6aeFOiAxNjIwLFxuICAgIFwi77yRXCI6IC04MDAsXG4gICAgXCLvvaNcIjogMjY3MCxcbiAgICBcIu+9pVwiOiAtMzc5NCxcbiAgICDvva86IC0xMzUwLFxuICAgIO+9sTogNTUxLFxuICAgIO+9uO++njogMTMxOSxcbiAgICDvvb06IDg3NCxcbiAgICDvvoQ6IDUyMSxcbiAgICDvvpE6IDExMDksXG4gICAg776ZOiAxNTkxLFxuICAgIO++mzogMjIwMSxcbiAgICDvvp06IDI3OCxcbiAgfTtcbiAgdGhpcy5VVzRfXyA9IHtcbiAgICBcIixcIjogMzkzMCxcbiAgICBcIi5cIjogMzUwOCxcbiAgICBcIuKAlVwiOiAtNDg0MSxcbiAgICBcIuOAgVwiOiAzOTMwLFxuICAgIFwi44CCXCI6IDM1MDgsXG4gICAg44CHOiA0OTk5LFxuICAgIFwi44CMXCI6IDE4OTUsXG4gICAgXCLjgI1cIjogMzc5OCxcbiAgICBcIuOAk1wiOiAtNTE1NixcbiAgICDjgYI6IDQ3NTIsXG4gICAg44GEOiAtMzQzNSxcbiAgICDjgYY6IC02NDAsXG4gICAg44GIOiAtMjUxNCxcbiAgICDjgYo6IDI0MDUsXG4gICAg44GLOiA1MzAsXG4gICAg44GMOiA2MDA2LFxuICAgIOOBjTogLTQ0ODIsXG4gICAg44GOOiAtMzgyMSxcbiAgICDjgY86IC0zNzg4LFxuICAgIOOBkTogLTQzNzYsXG4gICAg44GSOiAtNDczNCxcbiAgICDjgZM6IDIyNTUsXG4gICAg44GUOiAxOTc5LFxuICAgIOOBlTogMjg2NCxcbiAgICDjgZc6IC04NDMsXG4gICAg44GYOiAtMjUwNixcbiAgICDjgZk6IC03MzEsXG4gICAg44GaOiAxMjUxLFxuICAgIOOBmzogMTgxLFxuICAgIOOBnTogNDA5MSxcbiAgICDjgZ86IDUwMzQsXG4gICAg44GgOiA1NDA4LFxuICAgIOOBoTogLTM2NTQsXG4gICAg44GjOiAtNTg4MixcbiAgICDjgaQ6IC0xNjU5LFxuICAgIOOBpjogMzk5NCxcbiAgICDjgac6IDc0MTAsXG4gICAg44GoOiA0NTQ3LFxuICAgIOOBqjogNTQzMyxcbiAgICDjgas6IDY0OTksXG4gICAg44GsOiAxODUzLFxuICAgIOOBrTogMTQxMyxcbiAgICDjga46IDczOTYsXG4gICAg44GvOiA4NTc4LFxuICAgIOOBsDogMTk0MCxcbiAgICDjgbI6IDQyNDksXG4gICAg44GzOiAtNDEzNCxcbiAgICDjgbU6IDEzNDUsXG4gICAg44G4OiA2NjY1LFxuICAgIOOBuTogLTc0NCxcbiAgICDjgbs6IDE0NjQsXG4gICAg44G+OiAxMDUxLFxuICAgIOOBvzogLTIwODIsXG4gICAg44KAOiAtODgyLFxuICAgIOOCgTogLTUwNDYsXG4gICAg44KCOiA0MTY5LFxuICAgIOOCgzogLTI2NjYsXG4gICAg44KEOiAyNzk1LFxuICAgIOOChzogLTE1NDQsXG4gICAg44KIOiAzMzUxLFxuICAgIOOCiTogLTI5MjIsXG4gICAg44KKOiAtOTcyNixcbiAgICDjgos6IC0xNDg5NixcbiAgICDjgow6IC0yNjEzLFxuICAgIOOCjTogLTQ1NzAsXG4gICAg44KPOiAtMTc4MyxcbiAgICDjgpI6IDEzMTUwLFxuICAgIOOCkzogLTIzNTIsXG4gICAg44KrOiAyMTQ1LFxuICAgIOOCszogMTc4OSxcbiAgICDjgrs6IDEyODcsXG4gICAg44ODOiAtNzI0LFxuICAgIOODiDogLTQwMyxcbiAgICDjg6E6IC0xNjM1LFxuICAgIOODqTogLTg4MSxcbiAgICDjg6o6IC01NDEsXG4gICAg44OrOiAtODU2LFxuICAgIOODszogLTM2MzcsXG4gICAgXCLjg7tcIjogLTQzNzEsXG4gICAg44O8OiAtMTE4NzAsXG4gICAg5LiAOiAtMjA2OSxcbiAgICDkuK06IDIyMTAsXG4gICAg5LqIOiA3ODIsXG4gICAg5LqLOiAtMTkwLFxuICAgIOS6lTogLTE3NjgsXG4gICAg5Lq6OiAxMDM2LFxuICAgIOS7pTogNTQ0LFxuICAgIOS8mjogOTUwLFxuICAgIOS9kzogLTEyODYsXG4gICAg5L2cOiA1MzAsXG4gICAg5YG0OiA0MjkyLFxuICAgIOWFiDogNjAxLFxuICAgIOWFmjogLTIwMDYsXG4gICAg5YWxOiAtMTIxMixcbiAgICDlhoU6IDU4NCxcbiAgICDlhoY6IDc4OCxcbiAgICDliJ06IDEzNDcsXG4gICAg5YmNOiAxNjIzLFxuICAgIOWJrzogMzg3OSxcbiAgICDlips6IC0zMDIsXG4gICAg5YuVOiAtNzQwLFxuICAgIOWLmTogLTI3MTUsXG4gICAg5YyWOiA3NzYsXG4gICAg5Yy6OiA0NTE3LFxuICAgIOWNlDogMTAxMyxcbiAgICDlj4I6IDE1NTUsXG4gICAg5ZCIOiAtMTgzNCxcbiAgICDlkow6IC02ODEsXG4gICAg5ZOhOiAtOTEwLFxuICAgIOWZqDogLTg1MSxcbiAgICDlm546IDE1MDAsXG4gICAg5Zu9OiAtNjE5LFxuICAgIOWckjogLTEyMDAsXG4gICAg5ZywOiA4NjYsXG4gICAg5aC0OiAtMTQxMCxcbiAgICDloYE6IC0yMDk0LFxuICAgIOWjqzogLTE0MTMsXG4gICAg5aSaOiAxMDY3LFxuICAgIOWkpzogNTcxLFxuICAgIOWtkDogLTQ4MDIsXG4gICAg5a2mOiAtMTM5NyxcbiAgICDlrpo6IC0xMDU3LFxuICAgIOWvujogLTgwOSxcbiAgICDlsI86IDE5MTAsXG4gICAg5bGLOiAtMTMyOCxcbiAgICDlsbE6IC0xNTAwLFxuICAgIOWztjogLTIwNTYsXG4gICAg5bedOiAtMjY2NyxcbiAgICDluII6IDI3NzEsXG4gICAg5bm0OiAzNzQsXG4gICAg5bqBOiAtNDU1NixcbiAgICDlvow6IDQ1NixcbiAgICDmgKc6IDU1MyxcbiAgICDmhJ86IDkxNixcbiAgICDmiYA6IC0xNTY2LFxuICAgIOaUrzogODU2LFxuICAgIOaUuTogNzg3LFxuICAgIOaUvzogMjE4MixcbiAgICDmlZk6IDcwNCxcbiAgICDmloc6IDUyMixcbiAgICDmlrk6IC04NTYsXG4gICAg5pelOiAxNzk4LFxuICAgIOaZgjogMTgyOSxcbiAgICDmnIA6IDg0NSxcbiAgICDmnIg6IC05MDY2LFxuICAgIOacqDogLTQ4NSxcbiAgICDmnaU6IC00NDIsXG4gICAg5qChOiAtMzYwLFxuICAgIOalrTogLTEwNDMsXG4gICAg5rCPOiA1Mzg4LFxuICAgIOawkTogLTI3MTYsXG4gICAg5rCXOiAtOTEwLFxuICAgIOayojogLTkzOSxcbiAgICDmuIg6IC01NDMsXG4gICAg54mpOiAtNzM1LFxuICAgIOeOhzogNjcyLFxuICAgIOeQgzogLTEyNjcsXG4gICAg55SfOiAtMTI4NixcbiAgICDnlKM6IC0xMTAxLFxuICAgIOeUsDogLTI5MDAsXG4gICAg55S6OiAxODI2LFxuICAgIOeahDogMjU4NixcbiAgICDnm646IDkyMixcbiAgICDnnIE6IC0zNDg1LFxuICAgIOecjDogMjk5NyxcbiAgICDnqbo6IC04NjcsXG4gICAg56uLOiAtMjExMixcbiAgICDnrKw6IDc4OCxcbiAgICDnsbM6IDI5MzcsXG4gICAg57O7OiA3ODYsXG4gICAg57SEOiAyMTcxLFxuICAgIOe1jDogMTE0NixcbiAgICDntbE6IC0xMTY5LFxuICAgIOe3jzogOTQwLFxuICAgIOe3mjogLTk5NCxcbiAgICDnvbI6IDc0OSxcbiAgICDogIU6IDIxNDUsXG4gICAg6IO9OiAtNzMwLFxuICAgIOiIrDogLTg1MixcbiAgICDooYw6IC03OTIsXG4gICAg6KaPOiA3OTIsXG4gICAg6K2mOiAtMTE4NCxcbiAgICDorbA6IC0yNDQsXG4gICAg6LC3OiAtMTAwMCxcbiAgICDos546IDczMCxcbiAgICDou4o6IC0xNDgxLFxuICAgIOi7jTogMTE1OCxcbiAgICDovKo6IC0xNDMzLFxuICAgIOi+vDogLTMzNzAsXG4gICAg6L+ROiA5MjksXG4gICAg6YGTOiAtMTI5MSxcbiAgICDpgbg6IDI1OTYsXG4gICAg6YOOOiAtNDg2NixcbiAgICDpg706IDExOTIsXG4gICAg6YeOOiAtMTEwMCxcbiAgICDpioA6IC0yMjEzLFxuICAgIOmVtzogMzU3LFxuICAgIOmWkzogLTIzNDQsXG4gICAg6ZmiOiAtMjI5NyxcbiAgICDpmps6IC0yNjA0LFxuICAgIOmbuzogLTg3OCxcbiAgICDpoJg6IC0xNjU5LFxuICAgIOmhjDogLTc5MixcbiAgICDppKg6IC0xOTg0LFxuICAgIOmmljogMTc0OSxcbiAgICDpq5g6IDIxMjAsXG4gICAgXCLvvaJcIjogMTg5NSxcbiAgICBcIu+9o1wiOiAzNzk4LFxuICAgIFwi772lXCI6IC00MzcxLFxuICAgIO+9rzogLTcyNCxcbiAgICDvvbA6IC0xMTg3MCxcbiAgICDvvbY6IDIxNDUsXG4gICAg7726OiAxNzg5LFxuICAgIO+9vjogMTI4NyxcbiAgICDvvoQ6IC00MDMsXG4gICAg776SOiAtMTYzNSxcbiAgICDvvpc6IC04ODEsXG4gICAg776YOiAtNTQxLFxuICAgIO++mTogLTg1NixcbiAgICDvvp06IC0zNjM3LFxuICB9O1xuICB0aGlzLlVXNV9fID0ge1xuICAgIFwiLFwiOiA0NjUsXG4gICAgXCIuXCI6IC0yOTksXG4gICAgMTogLTUxNCxcbiAgICBFMjogLTMyNzY4LFxuICAgIFwiXVwiOiAtMjc2MixcbiAgICBcIuOAgVwiOiA0NjUsXG4gICAgXCLjgIJcIjogLTI5OSxcbiAgICBcIuOAjFwiOiAzNjMsXG4gICAg44GCOiAxNjU1LFxuICAgIOOBhDogMzMxLFxuICAgIOOBhjogLTUwMyxcbiAgICDjgYg6IDExOTksXG4gICAg44GKOiA1MjcsXG4gICAg44GLOiA2NDcsXG4gICAg44GMOiAtNDIxLFxuICAgIOOBjTogMTYyNCxcbiAgICDjgY46IDE5NzEsXG4gICAg44GPOiAzMTIsXG4gICAg44GSOiAtOTgzLFxuICAgIOOBlTogLTE1MzcsXG4gICAg44GXOiAtMTM3MSxcbiAgICDjgZk6IC04NTIsXG4gICAg44GgOiAtMTE4NixcbiAgICDjgaE6IDEwOTMsXG4gICAg44GjOiA1MixcbiAgICDjgaQ6IDkyMSxcbiAgICDjgaY6IC0xOCxcbiAgICDjgac6IC04NTAsXG4gICAg44GoOiAtMTI3LFxuICAgIOOBqTogMTY4MixcbiAgICDjgao6IC03ODcsXG4gICAg44GrOiAtMTIyNCxcbiAgICDjga46IC02MzUsXG4gICAg44GvOiAtNTc4LFxuICAgIOOBuTogMTAwMSxcbiAgICDjgb86IDUwMixcbiAgICDjgoE6IDg2NSxcbiAgICDjgoM6IDMzNTAsXG4gICAg44KHOiA4NTQsXG4gICAg44KKOiAtMjA4LFxuICAgIOOCizogNDI5LFxuICAgIOOCjDogNTA0LFxuICAgIOOCjzogNDE5LFxuICAgIOOCkjogLTEyNjQsXG4gICAg44KTOiAzMjcsXG4gICAg44KkOiAyNDEsXG4gICAg44OrOiA0NTEsXG4gICAg44OzOiAtMzQzLFxuICAgIOS4rTogLTg3MSxcbiAgICDkuqw6IDcyMixcbiAgICDkvJo6IC0xMTUzLFxuICAgIOWFmjogLTY1NCxcbiAgICDli5k6IDM1MTksXG4gICAg5Yy6OiAtOTAxLFxuICAgIOWRijogODQ4LFxuICAgIOWToTogMjEwNCxcbiAgICDlpKc6IC0xMjk2LFxuICAgIOWtpjogLTU0OCxcbiAgICDlrpo6IDE3ODUsXG4gICAg5bWQOiAtMTMwNCxcbiAgICDluII6IC0yOTkxLFxuICAgIOW4rTogOTIxLFxuICAgIOW5tDogMTc2MyxcbiAgICDmgJ06IDg3MixcbiAgICDmiYA6IC04MTQsXG4gICAg5oyZOiAxNjE4LFxuICAgIOaWsDogLTE2ODIsXG4gICAg5pelOiAyMTgsXG4gICAg5pyIOiAtNDM1MyxcbiAgICDmn7s6IDkzMixcbiAgICDmoLw6IDEzNTYsXG4gICAg5qmfOiAtMTUwOCxcbiAgICDmsI86IC0xMzQ3LFxuICAgIOeUsDogMjQwLFxuICAgIOeUujogLTM5MTIsXG4gICAg55qEOiAtMzE0OSxcbiAgICDnm7g6IDEzMTksXG4gICAg55yBOiAtMTA1MixcbiAgICDnnIw6IC00MDAzLFxuICAgIOeglDogLTk5NyxcbiAgICDnpL46IC0yNzgsXG4gICAg56m6OiAtODEzLFxuICAgIOe1sTogMTk1NSxcbiAgICDogIU6IC0yMjMzLFxuICAgIOihqDogNjYzLFxuICAgIOiqnjogLTEwNzMsXG4gICAg6K2wOiAxMjE5LFxuICAgIOmBuDogLTEwMTgsXG4gICAg6YOOOiAtMzY4LFxuICAgIOmVtzogNzg2LFxuICAgIOmWkzogMTE5MSxcbiAgICDpoYw6IDIzNjgsXG4gICAg6aSoOiAtNjg5LFxuICAgIFwi77yRXCI6IC01MTQsXG4gICAg77yl77ySOiAtMzI3NjgsXG4gICAgXCLvvaJcIjogMzYzLFxuICAgIO+9sjogMjQxLFxuICAgIO++mTogNDUxLFxuICAgIO++nTogLTM0MyxcbiAgfTtcbiAgdGhpcy5VVzZfXyA9IHtcbiAgICBcIixcIjogMjI3LFxuICAgIFwiLlwiOiA4MDgsXG4gICAgMTogLTI3MCxcbiAgICBFMTogMzA2LFxuICAgIFwi44CBXCI6IDIyNyxcbiAgICBcIuOAglwiOiA4MDgsXG4gICAg44GCOiAtMzA3LFxuICAgIOOBhjogMTg5LFxuICAgIOOBizogMjQxLFxuICAgIOOBjDogLTczLFxuICAgIOOBjzogLTEyMSxcbiAgICDjgZM6IC0yMDAsXG4gICAg44GYOiAxNzgyLFxuICAgIOOBmTogMzgzLFxuICAgIOOBnzogLTQyOCxcbiAgICDjgaM6IDU3MyxcbiAgICDjgaY6IC0xMDE0LFxuICAgIOOBpzogMTAxLFxuICAgIOOBqDogLTEwNSxcbiAgICDjgao6IC0yNTMsXG4gICAg44GrOiAtMTQ5LFxuICAgIOOBrjogLTQxNyxcbiAgICDjga86IC0yMzYsXG4gICAg44KCOiAtMjA2LFxuICAgIOOCijogMTg3LFxuICAgIOOCizogLTEzNSxcbiAgICDjgpI6IDE5NSxcbiAgICDjg6s6IC02NzMsXG4gICAg44OzOiAtNDk2LFxuICAgIOS4gDogLTI3NyxcbiAgICDkuK06IDIwMSxcbiAgICDku7Y6IC04MDAsXG4gICAg5LyaOiA2MjQsXG4gICAg5YmNOiAzMDIsXG4gICAg5Yy6OiAxNzkyLFxuICAgIOWToTogLTEyMTIsXG4gICAg5aeUOiA3OTgsXG4gICAg5a2mOiAtOTYwLFxuICAgIOW4gjogODg3LFxuICAgIOW6gzogLTY5NSxcbiAgICDlvow6IDUzNSxcbiAgICDmpa06IC02OTcsXG4gICAg55u4OiA3NTMsXG4gICAg56S+OiAtNTA3LFxuICAgIOemjzogOTc0LFxuICAgIOepujogLTgyMixcbiAgICDogIU6IDE4MTEsXG4gICAg6YCjOiA0NjMsXG4gICAg6YOOOiAxMDgyLFxuICAgIFwi77yRXCI6IC0yNzAsXG4gICAg77yl77yROiAzMDYsXG4gICAg776ZOiAtNjczLFxuICAgIO++nTogLTQ5NixcbiAgfTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuVGlueVNlZ21lbnRlci5wcm90b3R5cGUuY3R5cGVfID0gZnVuY3Rpb24gKHN0cikge1xuICBmb3IgKHZhciBpIGluIHRoaXMuY2hhcnR5cGVfKSB7XG4gICAgaWYgKHN0ci5tYXRjaCh0aGlzLmNoYXJ0eXBlX1tpXVswXSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoYXJ0eXBlX1tpXVsxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiT1wiO1xufTtcblxuVGlueVNlZ21lbnRlci5wcm90b3R5cGUudHNfID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKHYpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cblRpbnlTZWdtZW50ZXIucHJvdG90eXBlLnNlZ21lbnQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgaWYgKGlucHV0ID09IG51bGwgfHwgaW5wdXQgPT0gdW5kZWZpbmVkIHx8IGlucHV0ID09IFwiXCIpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgc2VnID0gW1wiQjNcIiwgXCJCMlwiLCBcIkIxXCJdO1xuICB2YXIgY3R5cGUgPSBbXCJPXCIsIFwiT1wiLCBcIk9cIl07XG4gIHZhciBvID0gaW5wdXQuc3BsaXQoXCJcIik7XG4gIGZvciAoaSA9IDA7IGkgPCBvLmxlbmd0aDsgKytpKSB7XG4gICAgc2VnLnB1c2gob1tpXSk7XG4gICAgY3R5cGUucHVzaCh0aGlzLmN0eXBlXyhvW2ldKSk7XG4gIH1cbiAgc2VnLnB1c2goXCJFMVwiKTtcbiAgc2VnLnB1c2goXCJFMlwiKTtcbiAgc2VnLnB1c2goXCJFM1wiKTtcbiAgY3R5cGUucHVzaChcIk9cIik7XG4gIGN0eXBlLnB1c2goXCJPXCIpO1xuICBjdHlwZS5wdXNoKFwiT1wiKTtcbiAgdmFyIHdvcmQgPSBzZWdbM107XG4gIHZhciBwMSA9IFwiVVwiO1xuICB2YXIgcDIgPSBcIlVcIjtcbiAgdmFyIHAzID0gXCJVXCI7XG4gIGZvciAodmFyIGkgPSA0OyBpIDwgc2VnLmxlbmd0aCAtIDM7ICsraSkge1xuICAgIHZhciBzY29yZSA9IHRoaXMuQklBU19fO1xuICAgIHZhciB3MSA9IHNlZ1tpIC0gM107XG4gICAgdmFyIHcyID0gc2VnW2kgLSAyXTtcbiAgICB2YXIgdzMgPSBzZWdbaSAtIDFdO1xuICAgIHZhciB3NCA9IHNlZ1tpXTtcbiAgICB2YXIgdzUgPSBzZWdbaSArIDFdO1xuICAgIHZhciB3NiA9IHNlZ1tpICsgMl07XG4gICAgdmFyIGMxID0gY3R5cGVbaSAtIDNdO1xuICAgIHZhciBjMiA9IGN0eXBlW2kgLSAyXTtcbiAgICB2YXIgYzMgPSBjdHlwZVtpIC0gMV07XG4gICAgdmFyIGM0ID0gY3R5cGVbaV07XG4gICAgdmFyIGM1ID0gY3R5cGVbaSArIDFdO1xuICAgIHZhciBjNiA9IGN0eXBlW2kgKyAyXTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVQMV9fW3AxXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUDJfX1twMl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVAzX19bcDNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJQMV9fW3AxICsgcDJdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJQMl9fW3AyICsgcDNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVXMV9fW3cxXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VVzJfX1t3Ml0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVczX19bdzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVXNF9fW3c0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VVzVfX1t3NV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVVc2X19bdzZdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJXMV9fW3cyICsgdzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJXMl9fW3czICsgdzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJXM19fW3c0ICsgdzVdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRXMV9fW3cxICsgdzIgKyB3M10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFcyX19bdzIgKyB3MyArIHc0XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UVzNfX1t3MyArIHc0ICsgdzVdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRXNF9fW3c0ICsgdzUgKyB3Nl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVUMxX19bYzFdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVDMl9fW2MyXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VQzNfX1tjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVUM0X19bYzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlVDNV9fW2M1XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VQzZfX1tjNl0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQkMxX19bYzIgKyBjM10pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQkMyX19bYzMgKyBjNF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQkMzX19bYzQgKyBjNV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVEMxX19bYzEgKyBjMiArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UQzJfX1tjMiArIGMzICsgYzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRDM19fW2MzICsgYzQgKyBjNV0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVEM0X19bYzQgKyBjNSArIGM2XSk7XG4gICAgLy8gIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVEM1X19bYzQgKyBjNSArIGM2XSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUTFfX1twMSArIGMxXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUTJfX1twMiArIGMyXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5VUTNfX1twMyArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CUTFfX1twMiArIGMyICsgYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLkJRMl9fW3AyICsgYzMgKyBjNF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuQlEzX19bcDMgKyBjMiArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5CUTRfX1twMyArIGMzICsgYzRdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRRMV9fW3AyICsgYzEgKyBjMiArIGMzXSk7XG4gICAgc2NvcmUgKz0gdGhpcy50c18odGhpcy5UUTJfX1twMiArIGMyICsgYzMgKyBjNF0pO1xuICAgIHNjb3JlICs9IHRoaXMudHNfKHRoaXMuVFEzX19bcDMgKyBjMSArIGMyICsgYzNdKTtcbiAgICBzY29yZSArPSB0aGlzLnRzXyh0aGlzLlRRNF9fW3AzICsgYzIgKyBjMyArIGM0XSk7XG4gICAgdmFyIHAgPSBcIk9cIjtcbiAgICBpZiAoc2NvcmUgPiAwKSB7XG4gICAgICByZXN1bHQucHVzaCh3b3JkKTtcbiAgICAgIHdvcmQgPSBcIlwiO1xuICAgICAgcCA9IFwiQlwiO1xuICAgIH1cbiAgICBwMSA9IHAyO1xuICAgIHAyID0gcDM7XG4gICAgcDMgPSBwO1xuICAgIHdvcmQgKz0gc2VnW2ldO1xuICB9XG4gIHJlc3VsdC5wdXNoKHdvcmQpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUaW55U2VnbWVudGVyO1xuIiwiaW1wb3J0IFRpbnlTZWdtZW50ZXIgZnJvbSBcIi4uLy4uL2V4dGVybmFsL3Rpbnktc2VnbWVudGVyXCI7XG5pbXBvcnQgeyBUUklNX0NIQVJfUEFUVEVSTiB9IGZyb20gXCIuL0RlZmF1bHRUb2tlbml6ZXJcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi90b2tlbml6ZXJcIjtcbi8vIEB0cy1pZ25vcmVcbmNvbnN0IHNlZ21lbnRlciA9IG5ldyBUaW55U2VnbWVudGVyKCk7XG5cbmZ1bmN0aW9uIHBpY2tUb2tlbnNBc0phcGFuZXNlKGNvbnRlbnQ6IHN0cmluZywgdHJpbVBhdHRlcm46IFJlZ0V4cCk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIGNvbnRlbnRcbiAgICAuc3BsaXQodHJpbVBhdHRlcm4pXG4gICAgLmZpbHRlcigoeCkgPT4geCAhPT0gXCJcIilcbiAgICAuZmxhdE1hcDxzdHJpbmc+KCh4KSA9PiBzZWdtZW50ZXIuc2VnbWVudCh4KSk7XG59XG5cbi8qKlxuICogSmFwYW5lc2UgbmVlZHMgb3JpZ2luYWwgbG9naWMuXG4gKi9cbmV4cG9ydCBjbGFzcyBKYXBhbmVzZVRva2VuaXplciBpbXBsZW1lbnRzIFRva2VuaXplciB7XG4gIHRva2VuaXplKGNvbnRlbnQ6IHN0cmluZywgcmF3PzogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gcGlja1Rva2Vuc0FzSmFwYW5lc2UoY29udGVudCwgcmF3ID8gLyAvZyA6IHRoaXMuZ2V0VHJpbVBhdHRlcm4oKSk7XG4gIH1cblxuICByZWN1cnNpdmVUb2tlbml6ZShjb250ZW50OiBzdHJpbmcpOiB7IHdvcmQ6IHN0cmluZzsgb2Zmc2V0OiBudW1iZXIgfVtdIHtcbiAgICBjb25zdCB0b2tlbnM6IHN0cmluZ1tdID0gc2VnbWVudGVyLnNlZ21lbnQoY29udGVudCk7XG5cbiAgICBjb25zdCByZXQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICB0b2tlbnNbaV0ubGVuZ3RoICE9PSAxIHx8XG4gICAgICAgICFCb29sZWFuKHRva2Vuc1tpXS5tYXRjaCh0aGlzLmdldFRyaW1QYXR0ZXJuKCkpKVxuICAgICAgKSB7XG4gICAgICAgIHJldC5wdXNoKHtcbiAgICAgICAgICB3b3JkOiB0b2tlbnMuc2xpY2UoaSkuam9pbihcIlwiKSxcbiAgICAgICAgICBvZmZzZXQ6IHRva2Vucy5zbGljZSgwLCBpKS5qb2luKFwiXCIpLmxlbmd0aCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGdldFRyaW1QYXR0ZXJuKCk6IFJlZ0V4cCB7XG4gICAgcmV0dXJuIFRSSU1fQ0hBUl9QQVRURVJOO1xuICB9XG5cbiAgc2hvdWxkSWdub3JlKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEJvb2xlYW4oc3RyLm1hdGNoKC9eW+OBgS3jgpPvvYEt772a77yhLe+8uuOAguOAgeODvOOAgF0qJC8pKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXJhYmljVG9rZW5pemVyIH0gZnJvbSBcIi4vdG9rZW5pemVycy9BcmFiaWNUb2tlbml6ZXJcIjtcbmltcG9ydCB7IERlZmF1bHRUb2tlbml6ZXIgfSBmcm9tIFwiLi90b2tlbml6ZXJzL0RlZmF1bHRUb2tlbml6ZXJcIjtcbmltcG9ydCB7IEphcGFuZXNlVG9rZW5pemVyIH0gZnJvbSBcIi4vdG9rZW5pemVycy9KYXBhbmVzZVRva2VuaXplclwiO1xuaW1wb3J0IHsgVG9rZW5pemVTdHJhdGVneSB9IGZyb20gXCIuL1Rva2VuaXplU3RyYXRlZ3lcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUb2tlbml6ZXIge1xuICB0b2tlbml6ZShjb250ZW50OiBzdHJpbmcsIHJhdz86IGJvb2xlYW4pOiBzdHJpbmdbXTtcbiAgcmVjdXJzaXZlVG9rZW5pemUoY29udGVudDogc3RyaW5nKTogeyB3b3JkOiBzdHJpbmc7IG9mZnNldDogbnVtYmVyIH1bXVxuICBnZXRUcmltUGF0dGVybigpOiBSZWdFeHA7XG4gIHNob3VsZElnbm9yZShxdWVyeTogc3RyaW5nKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRva2VuaXplcihzdHJhdGVneTogVG9rZW5pemVTdHJhdGVneSk6IFRva2VuaXplciB7XG4gIHN3aXRjaCAoc3RyYXRlZ3kubmFtZSkge1xuICAgIGNhc2UgXCJkZWZhdWx0XCI6XG4gICAgICByZXR1cm4gbmV3IERlZmF1bHRUb2tlbml6ZXIoKTtcbiAgICBjYXNlIFwiYXJhYmljXCI6XG4gICAgICByZXR1cm4gbmV3IEFyYWJpY1Rva2VuaXplcigpO1xuICAgIGNhc2UgXCJqYXBhbmVzZVwiOlxuICAgICAgcmV0dXJuIG5ldyBKYXBhbmVzZVRva2VuaXplcigpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgc3RyYXRlZ3kgbmFtZTogJHtzdHJhdGVneX1gKTtcbiAgfVxufVxuIiwidHlwZSBOYW1lID0gXCJkZWZhdWx0XCIgfCBcImphcGFuZXNlXCIgfCBcImFyYWJpY1wiO1xuXG5leHBvcnQgY2xhc3MgVG9rZW5pemVTdHJhdGVneSB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF92YWx1ZXM6IFRva2VuaXplU3RyYXRlZ3lbXSA9IFtdO1xuXG4gIHN0YXRpYyByZWFkb25seSBERUZBVUxUID0gbmV3IFRva2VuaXplU3RyYXRlZ3koXCJkZWZhdWx0XCIsIDMpO1xuICBzdGF0aWMgcmVhZG9ubHkgSkFQQU5FU0UgPSBuZXcgVG9rZW5pemVTdHJhdGVneShcImphcGFuZXNlXCIsIDIpO1xuICBzdGF0aWMgcmVhZG9ubHkgQVJBQklDID0gbmV3IFRva2VuaXplU3RyYXRlZ3koXCJhcmFiaWNcIiwgMyk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihyZWFkb25seSBuYW1lOiBOYW1lLCByZWFkb25seSB0cmlnZ2VyVGhyZXNob2xkOiBudW1iZXIpIHtcbiAgICBUb2tlbml6ZVN0cmF0ZWd5Ll92YWx1ZXMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTmFtZShuYW1lOiBzdHJpbmcpOiBUb2tlbml6ZVN0cmF0ZWd5IHtcbiAgICByZXR1cm4gVG9rZW5pemVTdHJhdGVneS5fdmFsdWVzLmZpbmQoKHgpID0+IHgubmFtZSA9PT0gbmFtZSkhO1xuICB9XG5cbiAgc3RhdGljIHZhbHVlcygpOiBUb2tlbml6ZVN0cmF0ZWd5W10ge1xuICAgIHJldHVybiBUb2tlbml6ZVN0cmF0ZWd5Ll92YWx1ZXM7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBrZXlCeSA9IDxUPihcbiAgdmFsdWVzOiBUW10sXG4gIHRvS2V5OiAodDogVCkgPT4gc3RyaW5nXG4pOiB7IFtrZXk6IHN0cmluZ106IFQgfSA9PlxuICB2YWx1ZXMucmVkdWNlKFxuICAgIChwcmV2LCBjdXIsIF8xLCBfMiwgayA9IHRvS2V5KGN1cikpID0+ICgocHJldltrXSA9IGN1ciksIHByZXYpLFxuICAgIHt9IGFzIHsgW2tleTogc3RyaW5nXTogVCB9XG4gICk7XG5cbmV4cG9ydCBjb25zdCBncm91cEJ5ID0gPFQ+KFxuICB2YWx1ZXM6IFRbXSxcbiAgdG9LZXk6ICh0OiBUKSA9PiBzdHJpbmdcbik6IHsgW2tleTogc3RyaW5nXTogVFtdIH0gPT5cbiAgdmFsdWVzLnJlZHVjZShcbiAgICAocHJldiwgY3VyLCBfMSwgXzIsIGsgPSB0b0tleShjdXIpKSA9PiAoXG4gICAgICAocHJldltrXSB8fCAocHJldltrXSA9IFtdKSkucHVzaChjdXIpLCBwcmV2XG4gICAgKSxcbiAgICB7fSBhcyB7IFtrZXk6IHN0cmluZ106IFRbXSB9XG4gICk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlxPFQ+KHZhbHVlczogVFtdKTogVFtdIHtcbiAgcmV0dXJuIFsuLi5uZXcgU2V0KHZhbHVlcyldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pcVdpdGg8VD4oYXJyOiBUW10sIGZuOiAob25lOiBULCBvdGhlcjogVCkgPT4gYm9vbGVhbikge1xuICByZXR1cm4gYXJyLmZpbHRlcihcbiAgICAoZWxlbWVudCwgaW5kZXgpID0+IGFyci5maW5kSW5kZXgoKHN0ZXApID0+IGZuKGVsZW1lbnQsIHN0ZXApKSA9PT0gaW5kZXhcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5RXF1YWxzKFxuICBhcnIxOiB1bmtub3duW10sXG4gIGFycjI6IHVua25vd25bXSxcbiAgbGVuZ3RoPzogbnVtYmVyXG4pOiBib29sZWFuIHtcbiAgbGV0IGwgPSBNYXRoLm1heChhcnIxLmxlbmd0aCwgYXJyMi5sZW5ndGgpO1xuICBpZiAobGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBsID0gTWF0aC5taW4obCwgbGVuZ3RoKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGFycjFbaV0gIT09IGFycjJbaV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5RXF1YWxzVW50aWwoYXJyMTogdW5rbm93bltdLCBhcnIyOiB1bmtub3duW10pOiBudW1iZXIge1xuICBsZXQgbCA9IE1hdGgubWluKGFycjEubGVuZ3RoLCBhcnIyLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGFycjFbaV0gIT09IGFycjJbaV0pIHtcbiAgICAgIHJldHVybiBpIC0gMTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbCAtIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXJyb3JNYXA8VD4oXG4gIGNvbGxlY3Rpb246IFRbXSxcbiAgdG9WYWx1ZTogKHQ6IFQpID0+IHN0cmluZ1xuKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB7XG4gIHJldHVybiBjb2xsZWN0aW9uLnJlZHVjZSgocCwgYykgPT4gKHsgLi4ucCwgW3RvVmFsdWUoYyldOiB0b1ZhbHVlKGMpIH0pLCB7fSk7XG59XG4iLCJpbXBvcnQge1xuICBBcHAsXG4gIEVkaXRvcixcbiAgTWFya2Rvd25WaWV3LFxuICBwYXJzZUZyb250TWF0dGVyQWxpYXNlcyxcbiAgVEZpbGUsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgdW5pcSB9IGZyb20gXCIuL3V0aWwvY29sbGVjdGlvbi1oZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIEFwcEhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwOiBBcHApIHt9XG5cbiAgZ2V0QWxpYXNlcyhmaWxlOiBURmlsZSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gKFxuICAgICAgcGFyc2VGcm9udE1hdHRlckFsaWFzZXMoXG4gICAgICAgIHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpPy5mcm9udG1hdHRlclxuICAgICAgKSA/PyBbXVxuICAgICk7XG4gIH1cblxuICBnZXRNYXJrZG93blZpZXdJbkFjdGl2ZUxlYWYoKTogTWFya2Rvd25WaWV3IHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYhLnZpZXcgYXMgTWFya2Rvd25WaWV3O1xuICB9XG5cbiAgZ2V0Q3VycmVudEVkaXRvcigpOiBFZGl0b3IgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5nZXRNYXJrZG93blZpZXdJbkFjdGl2ZUxlYWYoKT8uZWRpdG9yID8/IG51bGw7XG4gIH1cblxuICBnZXRTZWxlY3Rpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50RWRpdG9yKCk/LmdldFNlbGVjdGlvbigpO1xuICB9XG5cbiAgZ2V0Q3VycmVudExpbmUoZWRpdG9yOiBFZGl0b3IpOiBzdHJpbmcge1xuICAgIHJldHVybiBlZGl0b3IuZ2V0TGluZShlZGl0b3IuZ2V0Q3Vyc29yKCkubGluZSk7XG4gIH1cblxuICBnZXRDdXJyZW50TGluZVVudGlsQ3Vyc29yKGVkaXRvcjogRWRpdG9yKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50TGluZShlZGl0b3IpLnNsaWNlKDAsIGVkaXRvci5nZXRDdXJzb3IoKS5jaCk7XG4gIH1cblxuICBzZWFyY2hQaGFudG9tTGlua3MoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB1bmlxKFxuICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLnVucmVzb2x2ZWRMaW5rcylcbiAgICAgICAgLm1hcChPYmplY3Qua2V5cylcbiAgICAgICAgLmZsYXQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVW5zYWZlIG1ldGhvZFxuICAgKi9cbiAgaXNJTUVPbigpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrZG93blZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiEudmlldyBhcyBNYXJrZG93blZpZXc7XG4gICAgY29uc3QgY201b3I2OiBhbnkgPSAobWFya2Rvd25WaWV3LmVkaXRvciBhcyBhbnkpLmNtO1xuXG4gICAgLy8gY202XG4gICAgaWYgKGNtNW9yNj8uaW5wdXRTdGF0ZT8uY29tcG9zaW5nID4gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gY201XG4gICAgcmV0dXJuICEhY201b3I2Py5kaXNwbGF5Py5pbnB1dD8uY29tcG9zaW5nO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBjYXBpdGFsaXplRmlyc3RMZXR0ZXIsXG4gIGxvd2VySW5jbHVkZXMsXG4gIGxvd2VyU3RhcnRzV2l0aCxcbn0gZnJvbSBcIi4uL3V0aWwvc3RyaW5nc1wiO1xuaW1wb3J0IHsgSW5kZXhlZFdvcmRzIH0gZnJvbSBcIi4uL3VpL0F1dG9Db21wbGV0ZVN1Z2dlc3RcIjtcbmltcG9ydCB7IHVuaXFXaXRoIH0gZnJvbSBcIi4uL3V0aWwvY29sbGVjdGlvbi1oZWxwZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBXb3JkIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGFsaWFzZXM/OiBzdHJpbmdbXTtcbiAgaW50ZXJuYWxMaW5rPzogYm9vbGVhbjtcbiAgLy8gQWRkIGFmdGVyIGp1ZGdlXG4gIG1hdGNoZWRBbGlhcz86IHN0cmluZztcbiAgb2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBXb3Jkc0J5Rmlyc3RMZXR0ZXIgPSB7IFtmaXJzdExldHRlcjogc3RyaW5nXTogV29yZFtdIH07XG5cbmludGVyZmFjZSBKdWRnZW1lbnQge1xuICB3b3JkOiBXb3JkO1xuICB2YWx1ZT86IHN0cmluZztcbiAgYWxpYXM6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoV29yZChcbiAgd29yZHNCeUZpcnN0TGV0dGVyOiBXb3Jkc0J5Rmlyc3RMZXR0ZXIsXG4gIGtleTogc3RyaW5nLFxuICB3b3JkOiBXb3JkXG4pIHtcbiAgaWYgKHdvcmRzQnlGaXJzdExldHRlcltrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICB3b3Jkc0J5Rmlyc3RMZXR0ZXJba2V5XSA9IFt3b3JkXTtcbiAgICByZXR1cm47XG4gIH1cblxuICB3b3Jkc0J5Rmlyc3RMZXR0ZXJba2V5XS5wdXNoKHdvcmQpO1xufVxuXG4vLyBQdWJsaWMgZm9yIHRlc3RzXG5leHBvcnQgZnVuY3Rpb24ganVkZ2UoXG4gIHdvcmQ6IFdvcmQsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHF1ZXJ5U3RhcnRXaXRoVXBwZXI6IGJvb2xlYW5cbik6IEp1ZGdlbWVudCB7XG4gIGlmIChsb3dlclN0YXJ0c1dpdGgod29yZC52YWx1ZSwgcXVlcnkpKSB7XG4gICAgaWYgKHF1ZXJ5U3RhcnRXaXRoVXBwZXIgJiYgIXdvcmQuaW50ZXJuYWxMaW5rKSB7XG4gICAgICBjb25zdCBjID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHdvcmQudmFsdWUpO1xuICAgICAgcmV0dXJuIHsgd29yZDogeyAuLi53b3JkLCB2YWx1ZTogYyB9LCB2YWx1ZTogYywgYWxpYXM6IGZhbHNlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHdvcmQ6IHdvcmQsIHZhbHVlOiB3b3JkLnZhbHVlLCBhbGlhczogZmFsc2UgfTtcbiAgICB9XG4gIH1cbiAgY29uc3QgbWF0Y2hlZEFsaWFzID0gd29yZC5hbGlhc2VzPy5maW5kKChhKSA9PiBsb3dlclN0YXJ0c1dpdGgoYSwgcXVlcnkpKTtcbiAgaWYgKG1hdGNoZWRBbGlhcykge1xuICAgIHJldHVybiB7XG4gICAgICB3b3JkOiB7IC4uLndvcmQsIG1hdGNoZWRBbGlhcyB9LFxuICAgICAgdmFsdWU6IG1hdGNoZWRBbGlhcyxcbiAgICAgIGFsaWFzOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyB3b3JkOiB3b3JkLCBhbGlhczogZmFsc2UgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Z2dlc3RXb3JkcyhcbiAgaW5kZXhlZFdvcmRzOiBJbmRleGVkV29yZHMsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIG1heDogbnVtYmVyXG4pOiBXb3JkW10ge1xuICBjb25zdCBxdWVyeVN0YXJ0V2l0aFVwcGVyID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHF1ZXJ5KSA9PT0gcXVlcnk7XG5cbiAgY29uc3Qgd29yZHMgPSBxdWVyeVN0YXJ0V2l0aFVwcGVyXG4gICAgPyBbXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VycmVudEZpbGVbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VycmVudEZpbGVbcXVlcnkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5jdXN0b21EaWN0aW9uYXJ5W3F1ZXJ5LmNoYXJBdCgwKV0gPz8gW10pLFxuICAgICAgICAuLi4oaW5kZXhlZFdvcmRzLmN1c3RvbURpY3Rpb25hcnlbcXVlcnkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5pbnRlcm5hbExpbmtbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuaW50ZXJuYWxMaW5rW3F1ZXJ5LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpXSA/PyBbXSksXG4gICAgICBdXG4gICAgOiBbXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VycmVudEZpbGVbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuY3VzdG9tRGljdGlvbmFyeVtxdWVyeS5jaGFyQXQoMCldID8/IFtdKSxcbiAgICAgICAgLi4uKGluZGV4ZWRXb3Jkcy5pbnRlcm5hbExpbmtbcXVlcnkuY2hhckF0KDApXSA/PyBbXSksXG4gICAgICAgIC4uLihpbmRleGVkV29yZHMuaW50ZXJuYWxMaW5rW3F1ZXJ5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpXSA/PyBbXSksXG4gICAgICBdO1xuXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IEFycmF5LmZyb20od29yZHMpXG4gICAgLm1hcCgoeCkgPT4ganVkZ2UoeCwgcXVlcnksIHF1ZXJ5U3RhcnRXaXRoVXBwZXIpKVxuICAgIC5maWx0ZXIoKHgpID0+IHgudmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKGEudmFsdWUhLmxlbmd0aCAhPT0gYi52YWx1ZSEubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBhLnZhbHVlIS5sZW5ndGggPiBiLnZhbHVlIS5sZW5ndGggPyAxIDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS53b3JkLmludGVybmFsTGluayAhPT0gYi53b3JkLmludGVybmFsTGluaykge1xuICAgICAgICByZXR1cm4gYi53b3JkLmludGVybmFsTGluayA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChhLmFsaWFzICE9PSBiLmFsaWFzKSB7XG4gICAgICAgIHJldHVybiBhLmFsaWFzID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfSlcbiAgICAubWFwKCh4KSA9PiB4LndvcmQpXG4gICAgLnNsaWNlKDAsIG1heCk7XG5cbiAgLy8gWFhYOiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBlcXVhbHMgd2l0aCBtYXgsIGJ1dCBpdCBpcyBpbXBvcnRhbnQgZm9yIHBlcmZvcm1hbmNlXG4gIHJldHVybiB1bmlxV2l0aChcbiAgICBjYW5kaWRhdGUsXG4gICAgKGEsIGIpID0+IGEudmFsdWUgPT09IGIudmFsdWUgJiYgYS5pbnRlcm5hbExpbmsgPT09IGIuaW50ZXJuYWxMaW5rXG4gICk7XG59XG5cbi8vIFRPRE86IHJlZmFjdG9yaW5nXG4vLyBQdWJsaWMgZm9yIHRlc3RzXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VCeVBhcnRpYWxNYXRjaChcbiAgd29yZDogV29yZCxcbiAgcXVlcnk6IHN0cmluZyxcbiAgcXVlcnlTdGFydFdpdGhVcHBlcjogYm9vbGVhblxuKTogSnVkZ2VtZW50IHtcbiAgaWYgKGxvd2VyU3RhcnRzV2l0aCh3b3JkLnZhbHVlLCBxdWVyeSkpIHtcbiAgICBpZiAocXVlcnlTdGFydFdpdGhVcHBlciAmJiAhd29yZC5pbnRlcm5hbExpbmspIHtcbiAgICAgIGNvbnN0IGMgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIod29yZC52YWx1ZSk7XG4gICAgICByZXR1cm4geyB3b3JkOiB7IC4uLndvcmQsIHZhbHVlOiBjIH0sIHZhbHVlOiBjLCBhbGlhczogZmFsc2UgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgd29yZDogd29yZCwgdmFsdWU6IHdvcmQudmFsdWUsIGFsaWFzOiBmYWxzZSB9O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1hdGNoZWRBbGlhc1N0YXJ0cyA9IHdvcmQuYWxpYXNlcz8uZmluZCgoYSkgPT5cbiAgICBsb3dlclN0YXJ0c1dpdGgoYSwgcXVlcnkpXG4gICk7XG4gIGlmIChtYXRjaGVkQWxpYXNTdGFydHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd29yZDogeyAuLi53b3JkLCBtYXRjaGVkQWxpYXM6IG1hdGNoZWRBbGlhc1N0YXJ0cyB9LFxuICAgICAgdmFsdWU6IG1hdGNoZWRBbGlhc1N0YXJ0cyxcbiAgICAgIGFsaWFzOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBpZiAobG93ZXJJbmNsdWRlcyh3b3JkLnZhbHVlLCBxdWVyeSkpIHtcbiAgICByZXR1cm4geyB3b3JkOiB3b3JkLCB2YWx1ZTogd29yZC52YWx1ZSwgYWxpYXM6IGZhbHNlIH07XG4gIH1cblxuICBjb25zdCBtYXRjaGVkQWxpYXNJbmNsdWRlZCA9IHdvcmQuYWxpYXNlcz8uZmluZCgoYSkgPT5cbiAgICBsb3dlckluY2x1ZGVzKGEsIHF1ZXJ5KVxuICApO1xuICBpZiAobWF0Y2hlZEFsaWFzSW5jbHVkZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd29yZDogeyAuLi53b3JkLCBtYXRjaGVkQWxpYXM6IG1hdGNoZWRBbGlhc0luY2x1ZGVkIH0sXG4gICAgICB2YWx1ZTogbWF0Y2hlZEFsaWFzSW5jbHVkZWQsXG4gICAgICBhbGlhczogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHsgd29yZDogd29yZCwgYWxpYXM6IGZhbHNlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0V29yZHNCeVBhcnRpYWxNYXRjaChcbiAgaW5kZXhlZFdvcmRzOiBJbmRleGVkV29yZHMsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIG1heDogbnVtYmVyXG4pOiBXb3JkW10ge1xuICBjb25zdCBxdWVyeVN0YXJ0V2l0aFVwcGVyID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHF1ZXJ5KSA9PT0gcXVlcnk7XG5cbiAgY29uc3QgZmxhdE9iamVjdFZhbHVlcyA9IChvYmplY3Q6IHsgW2ZpcnN0TGV0dGVyOiBzdHJpbmddOiBXb3JkW10gfSkgPT5cbiAgICBPYmplY3QudmFsdWVzKG9iamVjdCkuZmxhdCgpO1xuICBjb25zdCB3b3JkcyA9IFtcbiAgICAuLi5mbGF0T2JqZWN0VmFsdWVzKGluZGV4ZWRXb3Jkcy5jdXJyZW50RmlsZSksXG4gICAgLi4uZmxhdE9iamVjdFZhbHVlcyhpbmRleGVkV29yZHMuY3VzdG9tRGljdGlvbmFyeSksXG4gICAgLi4uZmxhdE9iamVjdFZhbHVlcyhpbmRleGVkV29yZHMuaW50ZXJuYWxMaW5rKSxcbiAgXTtcblxuICBjb25zdCBjYW5kaWRhdGUgPSBBcnJheS5mcm9tKHdvcmRzKVxuICAgIC5tYXAoKHgpID0+IGp1ZGdlQnlQYXJ0aWFsTWF0Y2goeCwgcXVlcnksIHF1ZXJ5U3RhcnRXaXRoVXBwZXIpKVxuICAgIC5maWx0ZXIoKHgpID0+IHgudmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgYXMgPSBsb3dlclN0YXJ0c1dpdGgoYS52YWx1ZSEsIHF1ZXJ5KTtcbiAgICAgIGNvbnN0IGJzID0gbG93ZXJTdGFydHNXaXRoKGIudmFsdWUhLCBxdWVyeSk7XG4gICAgICBpZiAoYXMgIT09IGJzKSB7XG4gICAgICAgIHJldHVybiBicyA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChhLnZhbHVlIS5sZW5ndGggIT09IGIudmFsdWUhLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYS52YWx1ZSEubGVuZ3RoID4gYi52YWx1ZSEubGVuZ3RoID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgaWYgKGEud29yZC5pbnRlcm5hbExpbmsgIT09IGIud29yZC5pbnRlcm5hbExpbmspIHtcbiAgICAgICAgcmV0dXJuIGIud29yZC5pbnRlcm5hbExpbmsgPyAxIDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS5hbGlhcyAhPT0gYi5hbGlhcykge1xuICAgICAgICByZXR1cm4gYS5hbGlhcyA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH0pXG4gICAgLm1hcCgoeCkgPT4geC53b3JkKVxuICAgIC5zbGljZSgwLCBtYXgpO1xuXG4gIC8vIFhYWDogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgZXF1YWxzIHdpdGggbWF4LCBidXQgaXQgaXMgaW1wb3J0YW50IGZvciBwZXJmb3JtYW5jZVxuICByZXR1cm4gdW5pcVdpdGgoXG4gICAgY2FuZGlkYXRlLFxuICAgIChhLCBiKSA9PiBhLnZhbHVlID09PSBiLnZhbHVlICYmIGEuaW50ZXJuYWxMaW5rID09PSBiLmludGVybmFsTGlua1xuICApO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJhc2VuYW1lKHBhdGg6IHN0cmluZywgZXh0Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbmFtZSA9IHBhdGgubWF0Y2goLy4rW1xcXFwvXShbXlxcXFwvXSspW1xcXFwvXT8kLyk/LlsxXSA/PyBwYXRoO1xuICByZXR1cm4gZXh0ICYmIG5hbWUuZW5kc1dpdGgoZXh0KSA/IG5hbWUucmVwbGFjZShleHQsIFwiXCIpIDogbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dG5hbWUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZXh0ID0gYmFzZW5hbWUocGF0aCkuc3BsaXQoXCIuXCIpLnNsaWNlKDEpLnBvcCgpO1xuICByZXR1cm4gZXh0ID8gYC4ke2V4dH1gIDogXCJcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcm5hbWUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhdGgubWF0Y2goLyguKylbXFxcXC9dLiskLyk/LlsxXSA/PyBcIi5cIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVVJMKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihwYXRoLm1hdGNoKG5ldyBSZWdFeHAoXCJeaHR0cHM/Oi8vXCIpKSk7XG59XG4iLCJpbXBvcnQgeyBBcHAsIEZpbGVTeXN0ZW1BZGFwdGVyLCBOb3RpY2UsIHJlcXVlc3QgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IHB1c2hXb3JkLCBXb3JkLCBXb3Jkc0J5Rmlyc3RMZXR0ZXIgfSBmcm9tIFwiLi9zdWdnZXN0ZXJcIjtcbmltcG9ydCB7IENvbHVtbkRlbGltaXRlciB9IGZyb20gXCIuLi9vcHRpb24vQ29sdW1uRGVsaW1pdGVyXCI7XG5pbXBvcnQgeyBpc1VSTCB9IGZyb20gXCIuLi91dGlsL3BhdGhcIjtcblxuZnVuY3Rpb24gZXNjYXBlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBUaGlzIHRyaWNreSBsb2dpY3MgZm9yIFNhZmFyaVxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGFkYXNoaS1haWthd2Evb2JzaWRpYW4tdmFyaW91cy1jb21wbGVtZW50cy1wbHVnaW4vaXNzdWVzLzU2XG4gIHJldHVybiB2YWx1ZVxuICAgIC5yZXBsYWNlKC9cXFxcL2csIFwiX19WYXJpb3VzQ29tcGxlbWVudHNFc2NhcGVfX1wiKVxuICAgIC5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKVxuICAgIC5yZXBsYWNlKC9cXHQvZywgXCJcXFxcdFwiKVxuICAgIC5yZXBsYWNlKC9fX1ZhcmlvdXNDb21wbGVtZW50c0VzY2FwZV9fL2csIFwiXFxcXFxcXFxcIik7XG59XG5cbmZ1bmN0aW9uIHVuZXNjYXBlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBUaGlzIHRyaWNreSBsb2dpY3MgZm9yIFNhZmFyaVxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGFkYXNoaS1haWthd2Evb2JzaWRpYW4tdmFyaW91cy1jb21wbGVtZW50cy1wbHVnaW4vaXNzdWVzLzU2XG4gIHJldHVybiB2YWx1ZVxuICAgIC5yZXBsYWNlKC9cXFxcXFxcXC9nLCBcIl9fVmFyaW91c0NvbXBsZW1lbnRzRXNjYXBlX19cIilcbiAgICAucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIilcbiAgICAucmVwbGFjZSgvXFxcXHQvZywgXCJcXHRcIilcbiAgICAucmVwbGFjZSgvX19WYXJpb3VzQ29tcGxlbWVudHNFc2NhcGVfXy9nLCBcIlxcXFxcIik7XG59XG5cbmZ1bmN0aW9uIGxpbmVUb1dvcmQobGluZTogc3RyaW5nLCBkZWxpbWl0ZXI6IENvbHVtbkRlbGltaXRlcik6IFdvcmQge1xuICBjb25zdCBbdmFsdWUsIGRlc2NyaXB0aW9uLCAuLi5hbGlhc2VzXSA9IGxpbmUuc3BsaXQoZGVsaW1pdGVyLnZhbHVlKTtcbiAgcmV0dXJuIHtcbiAgICB2YWx1ZTogdW5lc2NhcGUodmFsdWUpLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGFsaWFzZXMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHdvcmRUb0xpbmUod29yZDogV29yZCwgZGVsaW1pdGVyOiBDb2x1bW5EZWxpbWl0ZXIpOiBzdHJpbmcge1xuICBjb25zdCBlc2NhcGVkVmFsdWUgPSBlc2NhcGUod29yZC52YWx1ZSk7XG4gIGlmICghd29yZC5kZXNjcmlwdGlvbiAmJiAhd29yZC5hbGlhc2VzKSB7XG4gICAgcmV0dXJuIGVzY2FwZWRWYWx1ZTtcbiAgfVxuICBpZiAoIXdvcmQuYWxpYXNlcykge1xuICAgIHJldHVybiBbZXNjYXBlZFZhbHVlLCB3b3JkLmRlc2NyaXB0aW9uXS5qb2luKGRlbGltaXRlci52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIFtlc2NhcGVkVmFsdWUsIHdvcmQuZGVzY3JpcHRpb24sIC4uLndvcmQuYWxpYXNlc10uam9pbihcbiAgICBkZWxpbWl0ZXIudmFsdWVcbiAgKTtcbn1cblxuZXhwb3J0IGNsYXNzIEN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIge1xuICBwcml2YXRlIHdvcmRzOiBXb3JkW10gPSBbXTtcbiAgd29yZEJ5VmFsdWU6IHsgW3ZhbHVlOiBzdHJpbmddOiBXb3JkIH07XG4gIHdvcmRzQnlGaXJzdExldHRlcjogV29yZHNCeUZpcnN0TGV0dGVyO1xuXG4gIHByaXZhdGUgYXBwOiBBcHA7XG4gIHByaXZhdGUgZmlsZVN5c3RlbUFkYXB0ZXI6IEZpbGVTeXN0ZW1BZGFwdGVyO1xuICBwcml2YXRlIHBhdGhzOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBkZWxpbWl0ZXI6IENvbHVtbkRlbGltaXRlcjtcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGF0aHM6IHN0cmluZ1tdLCBkZWxpbWl0ZXI6IENvbHVtbkRlbGltaXRlcikge1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuZmlsZVN5c3RlbUFkYXB0ZXIgPSBhcHAudmF1bHQuYWRhcHRlciBhcyBGaWxlU3lzdGVtQWRhcHRlcjtcbiAgICB0aGlzLnBhdGhzID0gcGF0aHM7XG4gICAgdGhpcy5kZWxpbWl0ZXIgPSBkZWxpbWl0ZXI7XG4gIH1cblxuICBnZXQgZWRpdGFibGVQYXRocygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMucGF0aHMuZmlsdGVyKCh4KSA9PiAhaXNVUkwoeCkpO1xuICB9XG5cbiAgdXBkYXRlKHBhdGhzOiBzdHJpbmdbXSwgZGVsaW1pdGVyOiBDb2x1bW5EZWxpbWl0ZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhdGhzID0gcGF0aHM7XG4gICAgdGhpcy5kZWxpbWl0ZXIgPSBkZWxpbWl0ZXI7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWRXb3JkcyhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFdvcmRbXT4ge1xuICAgIGNvbnN0IGNvbnRlbnRzID0gaXNVUkwocGF0aClcbiAgICAgID8gYXdhaXQgcmVxdWVzdCh7IHVybDogcGF0aCB9KVxuICAgICAgOiBhd2FpdCB0aGlzLmZpbGVTeXN0ZW1BZGFwdGVyLnJlYWQocGF0aCk7XG5cbiAgICByZXR1cm4gY29udGVudHNcbiAgICAgIC5zcGxpdCgvXFxyXFxufFxcbi8pXG4gICAgICAubWFwKCh4KSA9PiB4LnJlcGxhY2UoLyUlLiolJS9nLCBcIlwiKSlcbiAgICAgIC5maWx0ZXIoKHgpID0+IHgpXG4gICAgICAubWFwKCh4KSA9PiBsaW5lVG9Xb3JkKHgsIHRoaXMuZGVsaW1pdGVyKSk7XG4gIH1cblxuICBhc3luYyByZWZyZXNoQ3VzdG9tV29yZHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5jbGVhcldvcmRzKCk7XG5cbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgdGhpcy5wYXRocykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgd29yZHMgPSBhd2FpdCB0aGlzLmxvYWRXb3JkcyhwYXRoKTtcbiAgICAgICAgd29yZHMuZm9yRWFjaCgoeCkgPT4gdGhpcy53b3Jkcy5wdXNoKHgpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIE9iamVjdEFsbG9jYXRpb25JZ25vcmVkXG4gICAgICAgIG5ldyBOb3RpY2UoXG4gICAgICAgICAgYOKaoCBGYWlsIHRvIGxvYWQgJHtwYXRofSAtLSBWYXJpb3VzIENvbXBsZW1lbnRzIFBsdWdpbiAtLSBcXG4gJHtlfWAsXG4gICAgICAgICAgMFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMud29yZHMuZm9yRWFjaCgoeCkgPT4gdGhpcy5hZGRXb3JkKHgpKTtcbiAgfVxuXG4gIGFzeW5jIGFkZFdvcmRXaXRoRGljdGlvbmFyeShcbiAgICB3b3JkOiBXb3JkLFxuICAgIGRpY3Rpb25hcnlQYXRoOiBzdHJpbmdcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5hZGRXb3JkKHdvcmQpO1xuICAgIGF3YWl0IHRoaXMuZmlsZVN5c3RlbUFkYXB0ZXIuYXBwZW5kKFxuICAgICAgZGljdGlvbmFyeVBhdGgsXG4gICAgICBcIlxcblwiICsgd29yZFRvTGluZSh3b3JkLCB0aGlzLmRlbGltaXRlcilcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRXb3JkKHdvcmQ6IFdvcmQpIHtcbiAgICB0aGlzLndvcmRCeVZhbHVlW3dvcmQudmFsdWVdID0gd29yZDtcbiAgICBwdXNoV29yZCh0aGlzLndvcmRzQnlGaXJzdExldHRlciwgd29yZC52YWx1ZS5jaGFyQXQoMCksIHdvcmQpO1xuICAgIHdvcmQuYWxpYXNlcz8uZm9yRWFjaCgoYSkgPT5cbiAgICAgIHB1c2hXb3JkKHRoaXMud29yZHNCeUZpcnN0TGV0dGVyLCBhLmNoYXJBdCgwKSwgd29yZClcbiAgICApO1xuICB9XG5cbiAgY2xlYXJXb3JkcygpOiB2b2lkIHtcbiAgICB0aGlzLndvcmRzID0gW107XG4gICAgdGhpcy53b3JkQnlWYWx1ZSA9IHt9O1xuICAgIHRoaXMud29yZHNCeUZpcnN0TGV0dGVyID0ge307XG4gIH1cbn1cbiIsImltcG9ydCB7IEFwcCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgZ3JvdXBCeSwgdW5pcSB9IGZyb20gXCIuLi91dGlsL2NvbGxlY3Rpb24taGVscGVyXCI7XG5pbXBvcnQgeyBXb3JkLCBXb3Jkc0J5Rmlyc3RMZXR0ZXIgfSBmcm9tIFwiLi9zdWdnZXN0ZXJcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi90b2tlbml6ZXIvdG9rZW5pemVyXCI7XG5pbXBvcnQgeyBBcHBIZWxwZXIgfSBmcm9tIFwiLi4vYXBwLWhlbHBlclwiO1xuaW1wb3J0IHsgYWxsQWxwaGFiZXRzIH0gZnJvbSBcIi4uL3V0aWwvc3RyaW5nc1wiO1xuXG5leHBvcnQgY2xhc3MgQ3VycmVudEZpbGVXb3JkUHJvdmlkZXIge1xuICBwcml2YXRlIHdvcmRzOiBXb3JkW10gPSBbXTtcbiAgd29yZHNCeUZpcnN0TGV0dGVyOiBXb3Jkc0J5Rmlyc3RMZXR0ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhcHA6IEFwcCxcbiAgICBwcml2YXRlIGFwcEhlbHBlcjogQXBwSGVscGVyLFxuICAgIHByaXZhdGUgdG9rZW5pemVyOiBUb2tlbml6ZXJcbiAgKSB7fVxuXG4gIGFzeW5jIHJlZnJlc2hXb3Jkcyhvbmx5RW5nbGlzaDogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuY2xlYXJXb3JkcygpO1xuXG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5hcHBIZWxwZXIuZ2V0Q3VycmVudEVkaXRvcigpO1xuICAgIGlmICghZWRpdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFRva2VuID0gdGhpcy50b2tlbml6ZXJcbiAgICAgIC50b2tlbml6ZShcbiAgICAgICAgZWRpdG9yLmdldExpbmUoZWRpdG9yLmdldEN1cnNvcigpLmxpbmUpLnNsaWNlKDAsIGVkaXRvci5nZXRDdXJzb3IoKS5jaClcbiAgICAgIClcbiAgICAgIC5sYXN0KCk7XG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuY2FjaGVkUmVhZChmaWxlKTtcbiAgICBjb25zdCB0b2tlbnMgPSBvbmx5RW5nbGlzaFxuICAgICAgPyB0aGlzLnRva2VuaXplci50b2tlbml6ZShjb250ZW50KS5maWx0ZXIoYWxsQWxwaGFiZXRzKVxuICAgICAgOiB0aGlzLnRva2VuaXplci50b2tlbml6ZShjb250ZW50KTtcbiAgICB0aGlzLndvcmRzID0gdW5pcSh0b2tlbnMpXG4gICAgICAuZmlsdGVyKCh4KSA9PiB4ICE9PSBjdXJyZW50VG9rZW4pXG4gICAgICAubWFwKCh4KSA9PiAoe1xuICAgICAgICB2YWx1ZTogeCxcbiAgICAgIH0pKTtcbiAgICB0aGlzLndvcmRzQnlGaXJzdExldHRlciA9IGdyb3VwQnkodGhpcy53b3JkcywgKHgpID0+IHgudmFsdWUuY2hhckF0KDApKTtcbiAgfVxuXG4gIGNsZWFyV29yZHMoKTogdm9pZCB7XG4gICAgdGhpcy53b3JkcyA9IFtdO1xuICAgIHRoaXMud29yZHNCeUZpcnN0TGV0dGVyID0ge307XG4gIH1cbn1cbiIsImltcG9ydCB7IEFwcCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgcHVzaFdvcmQsIFdvcmQsIFdvcmRzQnlGaXJzdExldHRlciB9IGZyb20gXCIuL3N1Z2dlc3RlclwiO1xuaW1wb3J0IHsgQXBwSGVscGVyIH0gZnJvbSBcIi4uL2FwcC1oZWxwZXJcIjtcbmltcG9ydCB7IGV4Y2x1ZGVFbW9qaSB9IGZyb20gXCIuLi91dGlsL3N0cmluZ3NcIjtcblxuZXhwb3J0IGNsYXNzIEludGVybmFsTGlua1dvcmRQcm92aWRlciB7XG4gIHByaXZhdGUgd29yZHM6IFdvcmRbXSA9IFtdO1xuICB3b3Jkc0J5Rmlyc3RMZXR0ZXI6IFdvcmRzQnlGaXJzdExldHRlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcDogQXBwLCBwcml2YXRlIGFwcEhlbHBlcjogQXBwSGVscGVyKSB7fVxuXG4gIHJlZnJlc2hXb3JkcygpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyV29yZHMoKTtcblxuICAgIGNvbnN0IHJlc29sdmVkSW50ZXJuYWxMaW5rV29yZHMgPSB0aGlzLmFwcC52YXVsdFxuICAgICAgLmdldE1hcmtkb3duRmlsZXMoKVxuICAgICAgLm1hcCgoeCkgPT4ge1xuICAgICAgICBjb25zdCBsZXNzRW1vamlWYWx1ZSA9IGV4Y2x1ZGVFbW9qaSh4LmJhc2VuYW1lKTtcbiAgICAgICAgY29uc3QgYWxpYXNlcyA9XG4gICAgICAgICAgeC5iYXNlbmFtZSA9PT0gbGVzc0Vtb2ppVmFsdWVcbiAgICAgICAgICAgID8gdGhpcy5hcHBIZWxwZXIuZ2V0QWxpYXNlcyh4KVxuICAgICAgICAgICAgOiBbbGVzc0Vtb2ppVmFsdWUsIC4uLnRoaXMuYXBwSGVscGVyLmdldEFsaWFzZXMoeCldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiB4LmJhc2VuYW1lLFxuICAgICAgICAgIGFsaWFzZXMsXG4gICAgICAgICAgZGVzY3JpcHRpb246IHgucGF0aCxcbiAgICAgICAgICBpbnRlcm5hbExpbms6IHRydWUsXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHVucmVzb2x2ZWRJbnRlcm5hbExpbmtXb3JkcyA9IHRoaXMuYXBwSGVscGVyXG4gICAgICAuc2VhcmNoUGhhbnRvbUxpbmtzKClcbiAgICAgIC5tYXAoKHRleHQpID0+IHtcbiAgICAgICAgY29uc3QgbGVzc0Vtb2ppVmFsdWUgPSBleGNsdWRlRW1vamkodGV4dCk7XG4gICAgICAgIGNvbnN0IGFsaWFzZXMgPSB0ZXh0ID09PSBsZXNzRW1vamlWYWx1ZSA/IHVuZGVmaW5lZCA6IFtsZXNzRW1vamlWYWx1ZV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgICAgYWxpYXNlcyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOb3QgY3JlYXRlZCB5ZXRcIixcbiAgICAgICAgICBpbnRlcm5hbExpbms6IHRydWUsXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIHRoaXMud29yZHMgPSBbLi4ucmVzb2x2ZWRJbnRlcm5hbExpbmtXb3JkcywgLi4udW5yZXNvbHZlZEludGVybmFsTGlua1dvcmRzXTtcbiAgICBmb3IgKGNvbnN0IHdvcmQgb2YgdGhpcy53b3Jkcykge1xuICAgICAgcHVzaFdvcmQodGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIsIHdvcmQudmFsdWUuY2hhckF0KDApLCB3b3JkKTtcbiAgICAgIHdvcmQuYWxpYXNlcz8uZm9yRWFjaCgoYSkgPT5cbiAgICAgICAgcHVzaFdvcmQodGhpcy53b3Jkc0J5Rmlyc3RMZXR0ZXIsIGEuY2hhckF0KDApLCB3b3JkKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcldvcmRzKCk6IHZvaWQge1xuICAgIHRoaXMud29yZHMgPSBbXTtcbiAgICB0aGlzLndvcmRzQnlGaXJzdExldHRlciA9IHt9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmRleGVkV29yZHMgfSBmcm9tIFwiLi4vdWkvQXV0b0NvbXBsZXRlU3VnZ2VzdFwiO1xuaW1wb3J0IHsgc3VnZ2VzdFdvcmRzLCBzdWdnZXN0V29yZHNCeVBhcnRpYWxNYXRjaCwgV29yZCB9IGZyb20gXCIuL3N1Z2dlc3RlclwiO1xuXG50eXBlIE5hbWUgPSBcInByZWZpeFwiIHwgXCJwYXJ0aWFsXCI7XG5cbnR5cGUgSGFuZGxlciA9IChcbiAgaW5kZXhlZFdvcmRzOiBJbmRleGVkV29yZHMsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIG1heDogbnVtYmVyXG4pID0+IFdvcmRbXTtcblxuZXhwb3J0IGNsYXNzIE1hdGNoU3RyYXRlZ3kge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfdmFsdWVzOiBNYXRjaFN0cmF0ZWd5W10gPSBbXTtcblxuICBzdGF0aWMgcmVhZG9ubHkgUFJFRklYID0gbmV3IE1hdGNoU3RyYXRlZ3koXCJwcmVmaXhcIiwgc3VnZ2VzdFdvcmRzKTtcbiAgc3RhdGljIHJlYWRvbmx5IFBBUlRJQUwgPSBuZXcgTWF0Y2hTdHJhdGVneShcbiAgICBcInBhcnRpYWxcIixcbiAgICBzdWdnZXN0V29yZHNCeVBhcnRpYWxNYXRjaFxuICApO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IocmVhZG9ubHkgbmFtZTogTmFtZSwgcmVhZG9ubHkgaGFuZGxlcjogSGFuZGxlcikge1xuICAgIE1hdGNoU3RyYXRlZ3kuX3ZhbHVlcy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lKG5hbWU6IHN0cmluZyk6IE1hdGNoU3RyYXRlZ3kge1xuICAgIHJldHVybiBNYXRjaFN0cmF0ZWd5Ll92YWx1ZXMuZmluZCgoeCkgPT4geC5uYW1lID09PSBuYW1lKSE7XG4gIH1cblxuICBzdGF0aWMgdmFsdWVzKCk6IE1hdGNoU3RyYXRlZ3lbXSB7XG4gICAgcmV0dXJuIE1hdGNoU3RyYXRlZ3kuX3ZhbHVlcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kaWZpZXIgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxudHlwZSBOYW1lID1cbiAgfCBcIk5vbmVcIlxuICB8IFwiVGFiLCBTaGlmdCtUYWJcIlxuICB8IFwiQ3RybC9DbWQrTiwgQ3RybC9DbWQrUFwiXG4gIHwgXCJDdHJsL0NtZCtKLCBDdHJsL0NtZCtLXCI7XG5pbnRlcmZhY2UgS2V5QmluZCB7XG4gIG1vZGlmaWVyczogTW9kaWZpZXJbXTtcbiAga2V5OiBzdHJpbmcgfCBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3ZhbHVlczogQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzW10gPSBbXTtcblxuICBzdGF0aWMgcmVhZG9ubHkgTk9ORSA9IG5ldyBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMoXG4gICAgXCJOb25lXCIsXG4gICAgeyBtb2RpZmllcnM6IFtdLCBrZXk6IG51bGwgfSxcbiAgICB7IG1vZGlmaWVyczogW10sIGtleTogbnVsbCB9XG4gICk7XG4gIHN0YXRpYyByZWFkb25seSBUQUIgPSBuZXcgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzKFxuICAgIFwiVGFiLCBTaGlmdCtUYWJcIixcbiAgICB7IG1vZGlmaWVyczogW10sIGtleTogXCJUYWJcIiB9LFxuICAgIHsgbW9kaWZpZXJzOiBbXCJTaGlmdFwiXSwga2V5OiBcIlRhYlwiIH1cbiAgKTtcbiAgc3RhdGljIHJlYWRvbmx5IEVNQUNTID0gbmV3IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cyhcbiAgICBcIkN0cmwvQ21kK04sIEN0cmwvQ21kK1BcIixcbiAgICB7IG1vZGlmaWVyczogW1wiTW9kXCJdLCBrZXk6IFwiTlwiIH0sXG4gICAgeyBtb2RpZmllcnM6IFtcIk1vZFwiXSwga2V5OiBcIlBcIiB9XG4gICk7XG4gIHN0YXRpYyByZWFkb25seSBWSU0gPSBuZXcgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzKFxuICAgIFwiQ3RybC9DbWQrSiwgQ3RybC9DbWQrS1wiLFxuICAgIHsgbW9kaWZpZXJzOiBbXCJNb2RcIl0sIGtleTogXCJKXCIgfSxcbiAgICB7IG1vZGlmaWVyczogW1wiTW9kXCJdLCBrZXk6IFwiS1wiIH1cbiAgKTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IG5hbWU6IE5hbWUsXG4gICAgcmVhZG9ubHkgbmV4dEtleTogS2V5QmluZCxcbiAgICByZWFkb25seSBwcmV2aW91c0tleTogS2V5QmluZFxuICApIHtcbiAgICBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMuX3ZhbHVlcy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lKG5hbWU6IHN0cmluZyk6IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cyB7XG4gICAgcmV0dXJuIEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cy5fdmFsdWVzLmZpbmQoKHgpID0+IHgubmFtZSA9PT0gbmFtZSkhO1xuICB9XG5cbiAgc3RhdGljIHZhbHVlcygpOiBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXNbXSB7XG4gICAgcmV0dXJuIEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cy5fdmFsdWVzO1xuICB9XG59XG4iLCJ0eXBlIERlbGltaXRlciA9IFwiXFx0XCIgfCBcIixcIiB8IFwifFwiO1xuXG5leHBvcnQgY2xhc3MgQ29sdW1uRGVsaW1pdGVyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3ZhbHVlczogQ29sdW1uRGVsaW1pdGVyW10gPSBbXTtcblxuICBzdGF0aWMgcmVhZG9ubHkgVEFCID0gbmV3IENvbHVtbkRlbGltaXRlcihcIlRhYlwiLCBcIlxcdFwiKTtcbiAgc3RhdGljIHJlYWRvbmx5IENPTU1BID0gbmV3IENvbHVtbkRlbGltaXRlcihcIkNvbW1hXCIsIFwiLFwiKTtcbiAgc3RhdGljIHJlYWRvbmx5IFBJUEUgPSBuZXcgQ29sdW1uRGVsaW1pdGVyKFwiUGlwZVwiLCBcInxcIik7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihyZWFkb25seSBuYW1lOiBzdHJpbmcsIHJlYWRvbmx5IHZhbHVlOiBEZWxpbWl0ZXIpIHtcbiAgICBDb2x1bW5EZWxpbWl0ZXIuX3ZhbHVlcy5wdXNoKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lKG5hbWU6IHN0cmluZyk6IENvbHVtbkRlbGltaXRlciB7XG4gICAgcmV0dXJuIENvbHVtbkRlbGltaXRlci5fdmFsdWVzLmZpbmQoKHgpID0+IHgubmFtZSA9PT0gbmFtZSkhO1xuICB9XG5cbiAgc3RhdGljIHZhbHVlcygpOiBDb2x1bW5EZWxpbWl0ZXJbXSB7XG4gICAgcmV0dXJuIENvbHVtbkRlbGltaXRlci5fdmFsdWVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2RpZmllciB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG50eXBlIE5hbWUgPSBcIkVudGVyXCIgfCBcIlRhYlwiIHwgXCJDdHJsL0NtZCtFbnRlclwiIHwgXCJBbHQrRW50ZXJcIiB8IFwiU2hpZnQrRW50ZXJcIjtcbmludGVyZmFjZSBLZXlCaW5kIHtcbiAgbW9kaWZpZXJzOiBNb2RpZmllcltdO1xuICBrZXk6IHN0cmluZyB8IG51bGw7XG59XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3RTdWdnZXN0aW9uS2V5IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX3ZhbHVlczogU2VsZWN0U3VnZ2VzdGlvbktleVtdID0gW107XG5cbiAgc3RhdGljIHJlYWRvbmx5IEVOVEVSID0gbmV3IFNlbGVjdFN1Z2dlc3Rpb25LZXkoXCJFbnRlclwiLCB7XG4gICAgbW9kaWZpZXJzOiBbXSxcbiAgICBrZXk6IFwiRW50ZXJcIixcbiAgfSk7XG4gIHN0YXRpYyByZWFkb25seSBUQUIgPSBuZXcgU2VsZWN0U3VnZ2VzdGlvbktleShcIlRhYlwiLCB7XG4gICAgbW9kaWZpZXJzOiBbXSxcbiAgICBrZXk6IFwiVGFiXCIsXG4gIH0pO1xuICBzdGF0aWMgcmVhZG9ubHkgTU9EX0VOVEVSID0gbmV3IFNlbGVjdFN1Z2dlc3Rpb25LZXkoXCJDdHJsL0NtZCtFbnRlclwiLCB7XG4gICAgbW9kaWZpZXJzOiBbXCJNb2RcIl0sXG4gICAga2V5OiBcIkVudGVyXCIsXG4gIH0pO1xuICBzdGF0aWMgcmVhZG9ubHkgQUxUX0VOVEVSID0gbmV3IFNlbGVjdFN1Z2dlc3Rpb25LZXkoXCJBbHQrRW50ZXJcIiwge1xuICAgIG1vZGlmaWVyczogW1wiQWx0XCJdLFxuICAgIGtleTogXCJFbnRlclwiLFxuICB9KTtcbiAgc3RhdGljIHJlYWRvbmx5IFNISUZUX0VOVEVSID0gbmV3IFNlbGVjdFN1Z2dlc3Rpb25LZXkoXCJTaGlmdCtFbnRlclwiLCB7XG4gICAgbW9kaWZpZXJzOiBbXCJTaGlmdFwiXSxcbiAgICBrZXk6IFwiRW50ZXJcIixcbiAgfSk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihyZWFkb25seSBuYW1lOiBOYW1lLCByZWFkb25seSBrZXlCaW5kOiBLZXlCaW5kKSB7XG4gICAgU2VsZWN0U3VnZ2VzdGlvbktleS5fdmFsdWVzLnB1c2godGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5hbWUobmFtZTogc3RyaW5nKTogU2VsZWN0U3VnZ2VzdGlvbktleSB7XG4gICAgcmV0dXJuIFNlbGVjdFN1Z2dlc3Rpb25LZXkuX3ZhbHVlcy5maW5kKCh4KSA9PiB4Lm5hbWUgPT09IG5hbWUpITtcbiAgfVxuXG4gIHN0YXRpYyB2YWx1ZXMoKTogU2VsZWN0U3VnZ2VzdGlvbktleVtdIHtcbiAgICByZXR1cm4gU2VsZWN0U3VnZ2VzdGlvbktleS5fdmFsdWVzO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBBcHAsXG4gIGRlYm91bmNlLFxuICBEZWJvdW5jZXIsXG4gIEVkaXRvcixcbiAgRWRpdG9yUG9zaXRpb24sXG4gIEVkaXRvclN1Z2dlc3QsXG4gIEVkaXRvclN1Z2dlc3RDb250ZXh0LFxuICBFZGl0b3JTdWdnZXN0VHJpZ2dlckluZm8sXG4gIEV2ZW50UmVmLFxuICBLZXltYXBFdmVudEhhbmRsZXIsXG4gIFNjb3BlLFxuICBURmlsZSxcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBjcmVhdGVUb2tlbml6ZXIsIFRva2VuaXplciB9IGZyb20gXCIuLi90b2tlbml6ZXIvdG9rZW5pemVyXCI7XG5pbXBvcnQgeyBUb2tlbml6ZVN0cmF0ZWd5IH0gZnJvbSBcIi4uL3Rva2VuaXplci9Ub2tlbml6ZVN0cmF0ZWd5XCI7XG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQXBwSGVscGVyIH0gZnJvbSBcIi4uL2FwcC1oZWxwZXJcIjtcbmltcG9ydCB7IFdvcmQsIFdvcmRzQnlGaXJzdExldHRlciB9IGZyb20gXCIuLi9wcm92aWRlci9zdWdnZXN0ZXJcIjtcbmltcG9ydCB7IEN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIgfSBmcm9tIFwiLi4vcHJvdmlkZXIvQ3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlclwiO1xuaW1wb3J0IHsgQ3VycmVudEZpbGVXb3JkUHJvdmlkZXIgfSBmcm9tIFwiLi4vcHJvdmlkZXIvQ3VycmVudEZpbGVXb3JkUHJvdmlkZXJcIjtcbmltcG9ydCB7IEludGVybmFsTGlua1dvcmRQcm92aWRlciB9IGZyb20gXCIuLi9wcm92aWRlci9JbnRlcm5hbExpbmtXb3JkUHJvdmlkZXJcIjtcbmltcG9ydCB7IE1hdGNoU3RyYXRlZ3kgfSBmcm9tIFwiLi4vcHJvdmlkZXIvTWF0Y2hTdHJhdGVneVwiO1xuaW1wb3J0IHsgQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzIH0gZnJvbSBcIi4uL29wdGlvbi9DeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXNcIjtcbmltcG9ydCB7IENvbHVtbkRlbGltaXRlciB9IGZyb20gXCIuLi9vcHRpb24vQ29sdW1uRGVsaW1pdGVyXCI7XG5pbXBvcnQgeyBTZWxlY3RTdWdnZXN0aW9uS2V5IH0gZnJvbSBcIi4uL29wdGlvbi9TZWxlY3RTdWdnZXN0aW9uS2V5XCI7XG5pbXBvcnQgeyB1bmlxV2l0aCB9IGZyb20gXCIuLi91dGlsL2NvbGxlY3Rpb24taGVscGVyXCI7XG5cbmV4cG9ydCB0eXBlIEluZGV4ZWRXb3JkcyA9IHtcbiAgY3VycmVudEZpbGU6IFdvcmRzQnlGaXJzdExldHRlcjtcbiAgY3VzdG9tRGljdGlvbmFyeTogV29yZHNCeUZpcnN0TGV0dGVyO1xuICBpbnRlcm5hbExpbms6IFdvcmRzQnlGaXJzdExldHRlcjtcbn07XG5cbi8vIFRoaXMgaXMgYW4gdW5zYWZlIGNvZGUuLiEhXG5pbnRlcmZhY2UgVW5zYWZlRWRpdG9yU3VnZ2VzdEludGVyZmFjZSB7XG4gIHNjb3BlOiBTY29wZSAmIHsga2V5czogKEtleW1hcEV2ZW50SGFuZGxlciAmIHsgZnVuYzogQ2FsbGFibGVGdW5jdGlvbiB9KVtdIH07XG4gIHN1Z2dlc3Rpb25zOiB7XG4gICAgc2VsZWN0ZWRJdGVtOiBudW1iZXI7XG4gICAgdXNlU2VsZWN0ZWRJdGVtKGV2OiBQYXJ0aWFsPEtleWJvYXJkRXZlbnQ+KTogdm9pZDtcbiAgICBzZXRTZWxlY3RlZEl0ZW0oc2VsZWN0ZWQ6IG51bWJlciwgc2Nyb2xsOiBib29sZWFuKTogdm9pZDtcbiAgfTtcbiAgaXNPcGVuOiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlU3VnZ2VzdFxuICBleHRlbmRzIEVkaXRvclN1Z2dlc3Q8V29yZD5cbiAgaW1wbGVtZW50cyBVbnNhZmVFZGl0b3JTdWdnZXN0SW50ZXJmYWNlXG57XG4gIGFwcDogQXBwO1xuICBzZXR0aW5nczogU2V0dGluZ3M7XG4gIGFwcEhlbHBlcjogQXBwSGVscGVyO1xuXG4gIGN1cnJlbnRGaWxlV29yZFByb3ZpZGVyOiBDdXJyZW50RmlsZVdvcmRQcm92aWRlcjtcbiAgY3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlcjogQ3VzdG9tRGljdGlvbmFyeVdvcmRQcm92aWRlcjtcbiAgaW50ZXJuYWxMaW5rV29yZFByb3ZpZGVyOiBJbnRlcm5hbExpbmtXb3JkUHJvdmlkZXI7XG5cbiAgdG9rZW5pemVyOiBUb2tlbml6ZXI7XG4gIGRlYm91bmNlR2V0U3VnZ2VzdGlvbnM6IERlYm91bmNlcjxcbiAgICBbRWRpdG9yU3VnZ2VzdENvbnRleHQsICh0b2tlbnM6IFdvcmRbXSkgPT4gdm9pZF1cbiAgPjtcbiAgZGVib3VuY2VDbG9zZTogRGVib3VuY2VyPFtdPjtcblxuICBydW5NYW51YWxseTogYm9vbGVhbjtcbiAgZGVjbGFyZSBpc09wZW46IGJvb2xlYW47XG5cbiAgY29udGV4dFN0YXJ0Q2g6IG51bWJlcjtcblxuICAvLyB1bnNhZmUhIVxuICBzY29wZTogVW5zYWZlRWRpdG9yU3VnZ2VzdEludGVyZmFjZVtcInNjb3BlXCJdO1xuICBzdWdnZXN0aW9uczogVW5zYWZlRWRpdG9yU3VnZ2VzdEludGVyZmFjZVtcInN1Z2dlc3Rpb25zXCJdO1xuXG4gIGtleW1hcEV2ZW50SGFuZGxlcjogS2V5bWFwRXZlbnRIYW5kbGVyW10gPSBbXTtcbiAgbW9kaWZ5RXZlbnRSZWY6IEV2ZW50UmVmO1xuICBhY3RpdmVMZWFmQ2hhbmdlUmVmOiBFdmVudFJlZjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKFxuICAgIGFwcDogQXBwLFxuICAgIGN1c3RvbURpY3Rpb25hcnlTdWdnZXN0ZXI6IEN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXJcbiAgKSB7XG4gICAgc3VwZXIoYXBwKTtcbiAgICB0aGlzLmFwcEhlbHBlciA9IG5ldyBBcHBIZWxwZXIoYXBwKTtcbiAgICB0aGlzLmN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIgPSBjdXN0b21EaWN0aW9uYXJ5U3VnZ2VzdGVyO1xuICB9XG5cbiAgdHJpZ2dlckNvbXBsZXRlKCkge1xuICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuYXBwSGVscGVyLmdldEN1cnJlbnRFZGl0b3IoKTtcbiAgICBjb25zdCBhY3RpdmVGaWxlID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKTtcbiAgICBpZiAoIWVkaXRvciB8fCAhYWN0aXZlRmlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFhYWDogVW5zYWZlXG4gICAgdGhpcy5ydW5NYW51YWxseSA9IHRydWU7XG4gICAgKHRoaXMgYXMgYW55KS50cmlnZ2VyKGVkaXRvciwgYWN0aXZlRmlsZSwgdHJ1ZSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgbmV3KGFwcDogQXBwLCBzZXR0aW5nczogU2V0dGluZ3MpOiBQcm9taXNlPEF1dG9Db21wbGV0ZVN1Z2dlc3Q+IHtcbiAgICBjb25zdCBpbnMgPSBuZXcgQXV0b0NvbXBsZXRlU3VnZ2VzdChcbiAgICAgIGFwcCxcbiAgICAgIG5ldyBDdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyKFxuICAgICAgICBhcHAsXG4gICAgICAgIHNldHRpbmdzLmN1c3RvbURpY3Rpb25hcnlQYXRocy5zcGxpdChcIlxcblwiKS5maWx0ZXIoKHgpID0+IHgpLFxuICAgICAgICBDb2x1bW5EZWxpbWl0ZXIuZnJvbU5hbWUoc2V0dGluZ3MuY29sdW1uRGVsaW1pdGVyKVxuICAgICAgKVxuICAgICk7XG5cbiAgICBhd2FpdCBpbnMudXBkYXRlU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgIGF3YWl0IGlucy5yZWZyZXNoQ3VzdG9tRGljdGlvbmFyeVRva2VucygpO1xuXG4gICAgaW5zLm1vZGlmeUV2ZW50UmVmID0gYXBwLnZhdWx0Lm9uKFwibW9kaWZ5XCIsIGFzeW5jIChfKSA9PiB7XG4gICAgICBhd2FpdCBpbnMucmVmcmVzaEN1cnJlbnRGaWxlVG9rZW5zKCk7XG4gICAgfSk7XG4gICAgaW5zLmFjdGl2ZUxlYWZDaGFuZ2VSZWYgPSBhcHAud29ya3NwYWNlLm9uKFxuICAgICAgXCJhY3RpdmUtbGVhZi1jaGFuZ2VcIixcbiAgICAgIGFzeW5jIChfKSA9PiB7XG4gICAgICAgIGF3YWl0IGlucy5yZWZyZXNoQ3VycmVudEZpbGVUb2tlbnMoKTtcbiAgICAgICAgaW5zLnJlZnJlc2hJbnRlcm5hbExpbmtUb2tlbnMoKTtcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIEF2b2lkIHRvIHJlZmVyIGluY29tcGxldGUgY2FjaGVcbiAgICBjb25zdCBjYWNoZVJlc29sdmVkUmVmID0gYXBwLm1ldGFkYXRhQ2FjaGUub24oXCJyZXNvbHZlZFwiLCAoKSA9PiB7XG4gICAgICBpbnMucmVmcmVzaEludGVybmFsTGlua1Rva2VucygpO1xuICAgICAgaW5zLmFwcC5tZXRhZGF0YUNhY2hlLm9mZnJlZihjYWNoZVJlc29sdmVkUmVmKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnM7XG4gIH1cblxuICBwcmVkaWN0YWJsZUNvbXBsZXRlKCkge1xuICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuYXBwSGVscGVyLmdldEN1cnJlbnRFZGl0b3IoKTtcbiAgICBpZiAoIWVkaXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcbiAgICBjb25zdCBjdXJyZW50VG9rZW4gPSB0aGlzLnRva2VuaXplclxuICAgICAgLnRva2VuaXplKGVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKS5zbGljZSgwLCBjdXJzb3IuY2gpKVxuICAgICAgLmxhc3QoKTtcbiAgICBpZiAoIWN1cnJlbnRUb2tlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzdWdnZXN0aW9uID0gdGhpcy50b2tlbml6ZXJcbiAgICAgIC50b2tlbml6ZShcbiAgICAgICAgZWRpdG9yLmdldFJhbmdlKHsgbGluZTogTWF0aC5tYXgoY3Vyc29yLmxpbmUgLSA1MCwgMCksIGNoOiAwIH0sIGN1cnNvcilcbiAgICAgIClcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5zbGljZSgxKVxuICAgICAgLmZpbmQoKHgpID0+IHguc3RhcnRzV2l0aChjdXJyZW50VG9rZW4pKTtcbiAgICBpZiAoIXN1Z2dlc3Rpb24pIHtcbiAgICAgIHN1Z2dlc3Rpb24gPSB0aGlzLnRva2VuaXplclxuICAgICAgICAudG9rZW5pemUoXG4gICAgICAgICAgZWRpdG9yLmdldFJhbmdlKGN1cnNvciwge1xuICAgICAgICAgICAgbGluZTogTWF0aC5taW4oY3Vyc29yLmxpbmUgKyA1MCwgZWRpdG9yLmxpbmVDb3VudCgpIC0gMSksXG4gICAgICAgICAgICBjaDogMCxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5maW5kKCh4KSA9PiB4LnN0YXJ0c1dpdGgoY3VycmVudFRva2VuKSk7XG4gICAgfVxuICAgIGlmICghc3VnZ2VzdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVkaXRvci5yZXBsYWNlUmFuZ2UoXG4gICAgICBzdWdnZXN0aW9uLFxuICAgICAgeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IGN1cnNvci5jaCAtIGN1cnJlbnRUb2tlbi5sZW5ndGggfSxcbiAgICAgIHsgbGluZTogY3Vyc29yLmxpbmUsIGNoOiBjdXJzb3IuY2ggfVxuICAgICk7XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy5kZWJvdW5jZUNsb3NlKCk7XG4gIH1cblxuICB1bnJlZ2lzdGVyKCkge1xuICAgIHRoaXMuYXBwLnZhdWx0Lm9mZnJlZih0aGlzLm1vZGlmeUV2ZW50UmVmKTtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub2ZmcmVmKHRoaXMuYWN0aXZlTGVhZkNoYW5nZVJlZik7XG4gIH1cblxuICAvLyBzZXR0aW5ncyBnZXR0ZXJzXG4gIGdldCB0b2tlbml6ZXJTdHJhdGVneSgpOiBUb2tlbml6ZVN0cmF0ZWd5IHtcbiAgICByZXR1cm4gVG9rZW5pemVTdHJhdGVneS5mcm9tTmFtZSh0aGlzLnNldHRpbmdzLnN0cmF0ZWd5KTtcbiAgfVxuXG4gIGdldCBtYXRjaFN0cmF0ZWd5KCk6IE1hdGNoU3RyYXRlZ3kge1xuICAgIHJldHVybiBNYXRjaFN0cmF0ZWd5LmZyb21OYW1lKHRoaXMuc2V0dGluZ3MubWF0Y2hTdHJhdGVneSk7XG4gIH1cblxuICBnZXQgbWluTnVtYmVyVHJpZ2dlcmVkKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc2V0dGluZ3MubWluTnVtYmVyT2ZDaGFyYWN0ZXJzVHJpZ2dlcmVkIHx8XG4gICAgICB0aGlzLnRva2VuaXplclN0cmF0ZWd5LnRyaWdnZXJUaHJlc2hvbGRcbiAgICApO1xuICB9XG4gIC8vIC0tLSBlbmQgLS0tXG5cbiAgZ2V0IGluZGV4ZWRXb3JkcygpOiBJbmRleGVkV29yZHMge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50RmlsZTogdGhpcy5jdXJyZW50RmlsZVdvcmRQcm92aWRlci53b3Jkc0J5Rmlyc3RMZXR0ZXIsXG4gICAgICBjdXN0b21EaWN0aW9uYXJ5OiB0aGlzLmN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIud29yZHNCeUZpcnN0TGV0dGVyLFxuICAgICAgaW50ZXJuYWxMaW5rOiB0aGlzLmludGVybmFsTGlua1dvcmRQcm92aWRlci53b3Jkc0J5Rmlyc3RMZXR0ZXIsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZVNldHRpbmdzKHNldHRpbmdzOiBTZXR0aW5ncykge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLmN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIudXBkYXRlKFxuICAgICAgc2V0dGluZ3MuY3VzdG9tRGljdGlvbmFyeVBhdGhzLnNwbGl0KFwiXFxuXCIpLmZpbHRlcigoeCkgPT4geCksXG4gICAgICBDb2x1bW5EZWxpbWl0ZXIuZnJvbU5hbWUoc2V0dGluZ3MuY29sdW1uRGVsaW1pdGVyKVxuICAgICk7XG4gICAgdGhpcy50b2tlbml6ZXIgPSBjcmVhdGVUb2tlbml6ZXIodGhpcy50b2tlbml6ZXJTdHJhdGVneSk7XG4gICAgdGhpcy5jdXJyZW50RmlsZVdvcmRQcm92aWRlciA9IG5ldyBDdXJyZW50RmlsZVdvcmRQcm92aWRlcihcbiAgICAgIHRoaXMuYXBwLFxuICAgICAgdGhpcy5hcHBIZWxwZXIsXG4gICAgICB0aGlzLnRva2VuaXplclxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5yZWZyZXNoQ3VycmVudEZpbGVUb2tlbnMoKTtcbiAgICB0aGlzLmludGVybmFsTGlua1dvcmRQcm92aWRlciA9IG5ldyBJbnRlcm5hbExpbmtXb3JkUHJvdmlkZXIoXG4gICAgICB0aGlzLmFwcCxcbiAgICAgIHRoaXMuYXBwSGVscGVyXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLnJlZnJlc2hJbnRlcm5hbExpbmtUb2tlbnMoKTtcblxuICAgIHRoaXMuZGVib3VuY2VHZXRTdWdnZXN0aW9ucyA9IGRlYm91bmNlKFxuICAgICAgKGNvbnRleHQ6IEVkaXRvclN1Z2dlc3RDb250ZXh0LCBjYjogKHdvcmRzOiBXb3JkW10pID0+IHZvaWQpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgICAgICBjb25zdCB3b3JkcyA9IHRoaXMudG9rZW5pemVyXG4gICAgICAgICAgLnJlY3Vyc2l2ZVRva2VuaXplKGNvbnRleHQucXVlcnkpXG4gICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgICh4LCBpLCB4cykgPT5cbiAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5OdW1iZXJPZldvcmRzVHJpZ2dlcmVkUGhyYXNlICsgaSAtIDEgPFxuICAgICAgICAgICAgICAgIHhzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICB4LndvcmQubGVuZ3RoID49IHRoaXMubWluTnVtYmVyVHJpZ2dlcmVkICYmXG4gICAgICAgICAgICAgICF4LndvcmQuZW5kc1dpdGgoXCIgXCIpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5tYXAoKHEpID0+XG4gICAgICAgICAgICB0aGlzLm1hdGNoU3RyYXRlZ3lcbiAgICAgICAgICAgICAgLmhhbmRsZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleGVkV29yZHMsXG4gICAgICAgICAgICAgICAgcS53b3JkLFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWF4TnVtYmVyT2ZTdWdnZXN0aW9uc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5tYXAoKHdvcmQpID0+ICh7IC4uLndvcmQsIG9mZnNldDogcS5vZmZzZXQgfSkpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5mbGF0KCk7XG5cbiAgICAgICAgY2IoXG4gICAgICAgICAgdW5pcVdpdGgoXG4gICAgICAgICAgICB3b3JkcyxcbiAgICAgICAgICAgIChhLCBiKSA9PiBhLnZhbHVlID09PSBiLnZhbHVlICYmIGEuaW50ZXJuYWxMaW5rID09PSBiLmludGVybmFsTGlua1xuICAgICAgICAgICkuc2xpY2UoMCwgdGhpcy5zZXR0aW5ncy5tYXhOdW1iZXJPZlN1Z2dlc3Rpb25zKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2hvd0RlYnVnTG9nKFwiR2V0IHN1Z2dlc3Rpb25zXCIsIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnQpO1xuICAgICAgfSxcbiAgICAgIHRoaXMuc2V0dGluZ3MuZGVsYXlNaWxsaVNlY29uZHMsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIHRoaXMuZGVib3VuY2VDbG9zZSA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9LCB0aGlzLnNldHRpbmdzLmRlbGF5TWlsbGlTZWNvbmRzICsgNTApO1xuXG4gICAgdGhpcy5yZWdpc3RlcktleW1hcHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJLZXltYXBzKCkge1xuICAgIC8vIENsZWFyXG4gICAgdGhpcy5rZXltYXBFdmVudEhhbmRsZXIuZm9yRWFjaCgoeCkgPT4gdGhpcy5zY29wZS51bnJlZ2lzdGVyKHgpKTtcbiAgICB0aGlzLmtleW1hcEV2ZW50SGFuZGxlciA9IFtdO1xuXG4gICAgY29uc3QgY3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzID0gQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzLmZyb21OYW1lKFxuICAgICAgdGhpcy5zZXR0aW5ncy5hZGRpdGlvbmFsQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzXG4gICAgKTtcbiAgICBpZiAoY3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzICE9PSBDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMuTk9ORSkge1xuICAgICAgdGhpcy5rZXltYXBFdmVudEhhbmRsZXIucHVzaChcbiAgICAgICAgdGhpcy5zY29wZS5yZWdpc3RlcihcbiAgICAgICAgICBjeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXMubmV4dEtleS5tb2RpZmllcnMsXG4gICAgICAgICAgY3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzLm5leHRLZXkua2V5LFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMuc2V0U2VsZWN0ZWRJdGVtKFxuICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zLnNlbGVjdGVkSXRlbSArIDEsXG4gICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICB0aGlzLnNjb3BlLnJlZ2lzdGVyKFxuICAgICAgICAgIGN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cy5wcmV2aW91c0tleS5tb2RpZmllcnMsXG4gICAgICAgICAgY3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzLnByZXZpb3VzS2V5LmtleSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zLnNldFNlbGVjdGVkSXRlbShcbiAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9ucy5zZWxlY3RlZEl0ZW0gLSAxLFxuICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjb3BlLnVucmVnaXN0ZXIodGhpcy5zY29wZS5rZXlzLmZpbmQoKHgpID0+IHgua2V5ID09PSBcIkVudGVyXCIpISk7XG4gICAgY29uc3Qgc2VsZWN0U3VnZ2VzdGlvbktleSA9IFNlbGVjdFN1Z2dlc3Rpb25LZXkuZnJvbU5hbWUoXG4gICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdFN1Z2dlc3Rpb25LZXlzXG4gICAgKTtcbiAgICBpZiAoc2VsZWN0U3VnZ2VzdGlvbktleSAhPT0gU2VsZWN0U3VnZ2VzdGlvbktleS5FTlRFUikge1xuICAgICAgdGhpcy5rZXltYXBFdmVudEhhbmRsZXIucHVzaChcbiAgICAgICAgdGhpcy5zY29wZS5yZWdpc3RlcihcbiAgICAgICAgICBTZWxlY3RTdWdnZXN0aW9uS2V5LkVOVEVSLmtleUJpbmQubW9kaWZpZXJzLFxuICAgICAgICAgIFNlbGVjdFN1Z2dlc3Rpb25LZXkuRU5URVIua2V5QmluZC5rZXksXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0U3VnZ2VzdGlvbktleSAhPT0gU2VsZWN0U3VnZ2VzdGlvbktleS5UQUIpIHtcbiAgICAgIHRoaXMua2V5bWFwRXZlbnRIYW5kbGVyLnB1c2goXG4gICAgICAgIHRoaXMuc2NvcGUucmVnaXN0ZXIoXG4gICAgICAgICAgU2VsZWN0U3VnZ2VzdGlvbktleS5UQUIua2V5QmluZC5tb2RpZmllcnMsXG4gICAgICAgICAgU2VsZWN0U3VnZ2VzdGlvbktleS5UQUIua2V5QmluZC5rZXksXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmtleW1hcEV2ZW50SGFuZGxlci5wdXNoKFxuICAgICAgdGhpcy5zY29wZS5yZWdpc3RlcihcbiAgICAgICAgc2VsZWN0U3VnZ2VzdGlvbktleS5rZXlCaW5kLm1vZGlmaWVycyxcbiAgICAgICAgc2VsZWN0U3VnZ2VzdGlvbktleS5rZXlCaW5kLmtleSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMudXNlU2VsZWN0ZWRJdGVtKHt9KTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zY29wZS5rZXlzLmZpbmQoKHgpID0+IHgua2V5ID09PSBcIkVzY2FwZVwiKSEuZnVuYyA9ICgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnByb3BhZ2F0ZUVzYztcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgcmVmcmVzaEN1cnJlbnRGaWxlVG9rZW5zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZW5hYmxlQ3VycmVudEZpbGVDb21wbGVtZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRGaWxlV29yZFByb3ZpZGVyLmNsZWFyV29yZHMoKTtcbiAgICAgIHRoaXMuc2hvd0RlYnVnTG9nKFxuICAgICAgICBcIvCfkaIgU2tpcDogSW5kZXggY3VycmVudCBmaWxlIHRva2Vuc1wiLFxuICAgICAgICBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0XG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuY3VycmVudEZpbGVXb3JkUHJvdmlkZXIucmVmcmVzaFdvcmRzKFxuICAgICAgdGhpcy5zZXR0aW5ncy5vbmx5Q29tcGxlbWVudEVuZ2xpc2hPbkN1cnJlbnRGaWxlQ29tcGxlbWVudFxuICAgICk7XG4gICAgdGhpcy5zaG93RGVidWdMb2coXCJJbmRleCBjdXJyZW50IGZpbGUgdG9rZW5zXCIsIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnQpO1xuICB9XG5cbiAgYXN5bmMgcmVmcmVzaEN1c3RvbURpY3Rpb25hcnlUb2tlbnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5lbmFibGVDdXN0b21EaWN0aW9uYXJ5Q29tcGxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyLmNsZWFyV29yZHMoKTtcbiAgICAgIHRoaXMuc2hvd0RlYnVnTG9nKFxuICAgICAgICBcIvCfkaJTa2lwOiBJbmRleCBjdXN0b20gZGljdGlvbmFyeSB0b2tlbnNcIixcbiAgICAgICAgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmN1c3RvbURpY3Rpb25hcnlXb3JkUHJvdmlkZXIucmVmcmVzaEN1c3RvbVdvcmRzKCk7XG4gICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICBcIkluZGV4IGN1c3RvbSBkaWN0aW9uYXJ5IHRva2Vuc1wiLFxuICAgICAgcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFxuICAgICk7XG4gIH1cblxuICByZWZyZXNoSW50ZXJuYWxMaW5rVG9rZW5zKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudCkge1xuICAgICAgdGhpcy5pbnRlcm5hbExpbmtXb3JkUHJvdmlkZXIuY2xlYXJXb3JkcygpO1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICAgIFwi8J+RolNraXA6IEluZGV4IGludGVybmFsIGxpbmsgdG9rZW5zXCIsXG4gICAgICAgIHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcm5hbExpbmtXb3JkUHJvdmlkZXIucmVmcmVzaFdvcmRzKCk7XG4gICAgdGhpcy5zaG93RGVidWdMb2coXCJJbmRleCBpbnRlcm5hbCBsaW5rIHRva2Vuc1wiLCBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0KTtcbiAgfVxuXG4gIG9uVHJpZ2dlcihcbiAgICBjdXJzb3I6IEVkaXRvclBvc2l0aW9uLFxuICAgIGVkaXRvcjogRWRpdG9yLFxuICAgIGZpbGU6IFRGaWxlXG4gICk6IEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbyB8IG51bGwge1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBpZiAoXG4gICAgICAhdGhpcy5zZXR0aW5ncy5jb21wbGVtZW50QXV0b21hdGljYWxseSAmJlxuICAgICAgIXRoaXMuaXNPcGVuICYmXG4gICAgICAhdGhpcy5ydW5NYW51YWxseVxuICAgICkge1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXCJEb24ndCBzaG93IHN1Z2dlc3Rpb25zXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5zZXR0aW5ncy5kaXNhYmxlU3VnZ2VzdGlvbnNEdXJpbmdJbWVPbiAmJlxuICAgICAgdGhpcy5hcHBIZWxwZXIuaXNJTUVPbigpICYmXG4gICAgICAhdGhpcy5ydW5NYW51YWxseVxuICAgICkge1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXCJEb24ndCBzaG93IHN1Z2dlc3Rpb25zIGZvciBJTUVcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50TGluZVVudGlsQ3Vyc29yID1cbiAgICAgIHRoaXMuYXBwSGVscGVyLmdldEN1cnJlbnRMaW5lVW50aWxDdXJzb3IoZWRpdG9yKTtcbiAgICBjb25zdCB0b2tlbnMgPSB0aGlzLnRva2VuaXplci50b2tlbml6ZShjdXJyZW50TGluZVVudGlsQ3Vyc29yLCB0cnVlKTtcbiAgICB0aGlzLnNob3dEZWJ1Z0xvZyhgW29uVHJpZ2dlcl0gdG9rZW5zIGlzICR7dG9rZW5zfWApO1xuXG4gICAgY29uc3QgdG9rZW5pemVkID0gdGhpcy50b2tlbml6ZXIucmVjdXJzaXZlVG9rZW5pemUoY3VycmVudExpbmVVbnRpbEN1cnNvcik7XG4gICAgY29uc3QgY3VycmVudFRva2VuID1cbiAgICAgIHRva2VuaXplZFtcbiAgICAgICAgdG9rZW5pemVkLmxlbmd0aCA+IHRoaXMuc2V0dGluZ3MubWF4TnVtYmVyT2ZXb3Jkc0FzUGhyYXNlXG4gICAgICAgICAgPyB0b2tlbml6ZWQubGVuZ3RoIC0gdGhpcy5zZXR0aW5ncy5tYXhOdW1iZXJPZldvcmRzQXNQaHJhc2VcbiAgICAgICAgICA6IDBcbiAgICAgIF0/LndvcmQ7XG4gICAgdGhpcy5zaG93RGVidWdMb2coYFtvblRyaWdnZXJdIGN1cnJlbnRUb2tlbiBpcyAke2N1cnJlbnRUb2tlbn1gKTtcbiAgICBpZiAoIWN1cnJlbnRUb2tlbikge1xuICAgICAgdGhpcy5ydW5NYW51YWxseSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coYERvbid0IHNob3cgc3VnZ2VzdGlvbnMgYmVjYXVzZSBjdXJyZW50VG9rZW4gaXMgZW1wdHlgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRUb2tlblNlcGFyYXRlZFdoaXRlU3BhY2UgPVxuICAgICAgY3VycmVudExpbmVVbnRpbEN1cnNvci5zcGxpdChcIiBcIikubGFzdCgpID8/IFwiXCI7XG4gICAgaWYgKC9eWzpcXC9eXS8udGVzdChjdXJyZW50VG9rZW5TZXBhcmF0ZWRXaGl0ZVNwYWNlKSkge1xuICAgICAgdGhpcy5ydW5NYW51YWxseSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93RGVidWdMb2coXG4gICAgICAgIGBEb24ndCBzaG93IHN1Z2dlc3Rpb25zIGZvciBhdm9pZGluZyB0byBjb25mbGljdCB3aXRoIHRoZSBvdGhlciBjb21tYW5kcy5gXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY3VycmVudFRva2VuLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgQm9vbGVhbihjdXJyZW50VG9rZW4ubWF0Y2godGhpcy50b2tlbml6ZXIuZ2V0VHJpbVBhdHRlcm4oKSkpXG4gICAgKSB7XG4gICAgICB0aGlzLnJ1bk1hbnVhbGx5ID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcbiAgICAgICAgYERvbid0IHNob3cgc3VnZ2VzdGlvbnMgYmVjYXVzZSBjdXJyZW50VG9rZW4gaXMgVFJJTV9QQVRURVJOYFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5ydW5NYW51YWxseSkge1xuICAgICAgaWYgKGN1cnJlbnRUb2tlbi5sZW5ndGggPCB0aGlzLm1pbk51bWJlclRyaWdnZXJlZCkge1xuICAgICAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcbiAgICAgICAgICBcIkRvbid0IHNob3cgc3VnZ2VzdGlvbnMgYmVjYXVzZSBjdXJyZW50VG9rZW4gaXMgbGVzcyB0aGFuIG1pbk51bWJlclRyaWdnZXJlZCBvcHRpb25cIlxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRva2VuaXplci5zaG91bGRJZ25vcmUoY3VycmVudFRva2VuKSkge1xuICAgICAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcbiAgICAgICAgICBcIkRvbid0IHNob3cgc3VnZ2VzdGlvbnMgYmVjYXVzZSBjdXJyZW50VG9rZW4gc2hvdWxkIGlnbm9yZWRcIlxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNob3dEZWJ1Z0xvZyhcIm9uVHJpZ2dlclwiLCBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0KTtcbiAgICB0aGlzLnJ1bk1hbnVhbGx5ID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgbXVsdGktd29yZCBjb21wbGV0aW9uXG4gICAgdGhpcy5jb250ZXh0U3RhcnRDaCA9IGN1cnNvci5jaCAtIGN1cnJlbnRUb2tlbi5sZW5ndGg7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIGNoOiBjdXJzb3IuY2ggLSAodG9rZW5pemVkLmxhc3QoKT8ud29yZD8ubGVuZ3RoID8/IDApLCAvLyBGb3IgbXVsdGktd29yZCBjb21wbGV0aW9uXG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgfSxcbiAgICAgIGVuZDogY3Vyc29yLFxuICAgICAgcXVlcnk6IGN1cnJlbnRUb2tlbixcbiAgICB9O1xuICB9XG5cbiAgZ2V0U3VnZ2VzdGlvbnMoY29udGV4dDogRWRpdG9yU3VnZ2VzdENvbnRleHQpOiBXb3JkW10gfCBQcm9taXNlPFdvcmRbXT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5kZWJvdW5jZUdldFN1Z2dlc3Rpb25zKGNvbnRleHQsICh3b3JkcykgPT4ge1xuICAgICAgICByZXNvbHZlKHdvcmRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyU3VnZ2VzdGlvbih3b3JkOiBXb3JkLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlID0gY3JlYXRlRGl2KCk7XG4gICAgbGV0IHRleHQgPSB3b3JkLnZhbHVlO1xuICAgIGlmICh3b3JkLmludGVybmFsTGluaykge1xuICAgICAgdGV4dCA9XG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc3VnZ2VzdEludGVybmFsTGlua1dpdGhBbGlhcyAmJiB3b3JkLm1hdGNoZWRBbGlhc1xuICAgICAgICAgID8gYFtbJHt3b3JkLnZhbHVlfXwke3dvcmQubWF0Y2hlZEFsaWFzfV1dYFxuICAgICAgICAgIDogYFtbJHt3b3JkLnZhbHVlfV1dYDtcbiAgICB9XG5cbiAgICBiYXNlLmNyZWF0ZURpdih7XG4gICAgICB0ZXh0OlxuICAgICAgICB0aGlzLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24gJiZcbiAgICAgICAgdGV4dC5pbmNsdWRlcyh0aGlzLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24pXG4gICAgICAgICAgPyBgJHt0ZXh0LnNwbGl0KHRoaXMuc2V0dGluZ3MuZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbilbMF19IC4uLmBcbiAgICAgICAgICA6IHRleHQsXG4gICAgfSk7XG5cbiAgICBpZiAod29yZC5kZXNjcmlwdGlvbikge1xuICAgICAgYmFzZS5jcmVhdGVEaXYoe1xuICAgICAgICBjbHM6IFwidmFyaW91cy1jb21wbGVtZW50c19fc3VnZ2VzdF9fZGVzY3JpcHRpb25cIixcbiAgICAgICAgdGV4dDogYCR7d29yZC5kZXNjcmlwdGlvbn1gLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWwuYXBwZW5kQ2hpbGQoYmFzZSk7XG4gIH1cblxuICBzZWxlY3RTdWdnZXN0aW9uKHdvcmQ6IFdvcmQsIGV2dDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpbnNlcnRlZFRleHQgPSB3b3JkLnZhbHVlO1xuICAgIGlmICh3b3JkLmludGVybmFsTGluaykge1xuICAgICAgaW5zZXJ0ZWRUZXh0ID1cbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zdWdnZXN0SW50ZXJuYWxMaW5rV2l0aEFsaWFzICYmIHdvcmQubWF0Y2hlZEFsaWFzXG4gICAgICAgICAgPyBgW1ske2luc2VydGVkVGV4dH18JHt3b3JkLm1hdGNoZWRBbGlhc31dXWBcbiAgICAgICAgICA6IGBbWyR7aW5zZXJ0ZWRUZXh0fV1dYDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuaW5zZXJ0QWZ0ZXJDb21wbGV0aW9uKSB7XG4gICAgICBpbnNlcnRlZFRleHQgPSBgJHtpbnNlcnRlZFRleHR9IGA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24pIHtcbiAgICAgIGluc2VydGVkVGV4dCA9IGluc2VydGVkVGV4dC5yZXBsYWNlKFxuICAgICAgICB0aGlzLnNldHRpbmdzLmRlbGltaXRlclRvSGlkZVN1Z2dlc3Rpb24sXG4gICAgICAgIFwiXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FyZXQgPSB0aGlzLnNldHRpbmdzLmNhcmV0TG9jYXRpb25TeW1ib2xBZnRlckNvbXBsZW1lbnQ7XG4gICAgY29uc3QgcG9zaXRpb25Ub01vdmUgPSBjYXJldCA/IGluc2VydGVkVGV4dC5pbmRleE9mKGNhcmV0KSA6IC0xO1xuICAgIGlmIChwb3NpdGlvblRvTW92ZSAhPT0gLTEpIHtcbiAgICAgIGluc2VydGVkVGV4dCA9IGluc2VydGVkVGV4dC5yZXBsYWNlKGNhcmV0LCBcIlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmNvbnRleHQuZWRpdG9yO1xuICAgIGVkaXRvci5yZXBsYWNlUmFuZ2UoXG4gICAgICBpbnNlcnRlZFRleHQsXG4gICAgICB7XG4gICAgICAgIC4uLnRoaXMuY29udGV4dC5zdGFydCxcbiAgICAgICAgY2g6IHRoaXMuY29udGV4dFN0YXJ0Q2ggKyB3b3JkLm9mZnNldCEsXG4gICAgICB9LFxuICAgICAgdGhpcy5jb250ZXh0LmVuZFxuICAgICk7XG5cbiAgICBpZiAocG9zaXRpb25Ub01vdmUgIT09IC0xKSB7XG4gICAgICBlZGl0b3Iuc2V0Q3Vyc29yKFxuICAgICAgICBlZGl0b3Iub2Zmc2V0VG9Qb3MoXG4gICAgICAgICAgZWRpdG9yLnBvc1RvT2Zmc2V0KGVkaXRvci5nZXRDdXJzb3IoKSkgLVxuICAgICAgICAgICAgaW5zZXJ0ZWRUZXh0Lmxlbmd0aCArXG4gICAgICAgICAgICBwb3NpdGlvblRvTW92ZVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLmRlYm91bmNlQ2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvd0RlYnVnTG9nKG1lc3NhZ2U6IHN0cmluZywgbXNlYz86IG51bWJlcikge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dMb2dBYm91dFBlcmZvcm1hbmNlSW5Db25zb2xlKSB7XG4gICAgICBpZiAobXNlYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke21lc3NhZ2V9OiAke01hdGgucm91bmQobXNlYyl9W21zXWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBBcHAsIE5vdGljZSwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IFZhcmlvdXNDb21wb25lbnRzIGZyb20gXCIuL21haW5cIjtcbmltcG9ydCB7IFRva2VuaXplU3RyYXRlZ3kgfSBmcm9tIFwiLi90b2tlbml6ZXIvVG9rZW5pemVTdHJhdGVneVwiO1xuaW1wb3J0IHsgTWF0Y2hTdHJhdGVneSB9IGZyb20gXCIuL3Byb3ZpZGVyL01hdGNoU3RyYXRlZ3lcIjtcbmltcG9ydCB7IEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cyB9IGZyb20gXCIuL29wdGlvbi9DeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXNcIjtcbmltcG9ydCB7IENvbHVtbkRlbGltaXRlciB9IGZyb20gXCIuL29wdGlvbi9Db2x1bW5EZWxpbWl0ZXJcIjtcbmltcG9ydCB7IFNlbGVjdFN1Z2dlc3Rpb25LZXkgfSBmcm9tIFwiLi9vcHRpb24vU2VsZWN0U3VnZ2VzdGlvbktleVwiO1xuaW1wb3J0IHsgbWlycm9yTWFwIH0gZnJvbSBcIi4vdXRpbC9jb2xsZWN0aW9uLWhlbHBlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcbiAgLy8gZ2VuZXJhbFxuICBzdHJhdGVneTogc3RyaW5nO1xuICBtYXRjaFN0cmF0ZWd5OiBzdHJpbmc7XG4gIG1heE51bWJlck9mU3VnZ2VzdGlvbnM6IG51bWJlcjtcbiAgbWF4TnVtYmVyT2ZXb3Jkc0FzUGhyYXNlOiBudW1iZXI7XG4gIG1pbk51bWJlck9mQ2hhcmFjdGVyc1RyaWdnZXJlZDogbnVtYmVyO1xuICBtaW5OdW1iZXJPZldvcmRzVHJpZ2dlcmVkUGhyYXNlOiBudW1iZXI7XG4gIGNvbXBsZW1lbnRBdXRvbWF0aWNhbGx5OiBib29sZWFuO1xuICBkZWxheU1pbGxpU2Vjb25kczogbnVtYmVyO1xuICBkaXNhYmxlU3VnZ2VzdGlvbnNEdXJpbmdJbWVPbjogYm9vbGVhbjtcbiAgLy8gRklYTUU6IFJlbmFtZSBhdCBuZXh0IG1ham9yIHZlcnNpb24gdXBcbiAgaW5zZXJ0QWZ0ZXJDb21wbGV0aW9uOiBib29sZWFuO1xuXG4gIC8vIGtleSBjdXN0b21pemF0aW9uXG4gIHNlbGVjdFN1Z2dlc3Rpb25LZXlzOiBzdHJpbmc7XG4gIGFkZGl0aW9uYWxDeWNsZVRocm91Z2hTdWdnZXN0aW9uc0tleXM6IHN0cmluZztcbiAgcHJvcGFnYXRlRXNjOiBib29sZWFuO1xuXG4gIC8vIGN1cnJlbnQgZmlsZSBjb21wbGVtZW50XG4gIGVuYWJsZUN1cnJlbnRGaWxlQ29tcGxlbWVudDogYm9vbGVhbjtcbiAgb25seUNvbXBsZW1lbnRFbmdsaXNoT25DdXJyZW50RmlsZUNvbXBsZW1lbnQ6IGJvb2xlYW47XG5cbiAgLy8gY3VzdG9tIGRpY3Rpb25hcnkgY29tcGxlbWVudFxuICBlbmFibGVDdXN0b21EaWN0aW9uYXJ5Q29tcGxlbWVudDogYm9vbGVhbjtcbiAgY3VzdG9tRGljdGlvbmFyeVBhdGhzOiBzdHJpbmc7XG4gIGNvbHVtbkRlbGltaXRlcjogc3RyaW5nO1xuICBkZWxpbWl0ZXJUb0hpZGVTdWdnZXN0aW9uOiBzdHJpbmc7XG4gIGNhcmV0TG9jYXRpb25TeW1ib2xBZnRlckNvbXBsZW1lbnQ6IHN0cmluZztcblxuICAvLyBpbnRlcm5hbCBsaW5rIGNvbXBsZW1lbnRcbiAgZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudDogYm9vbGVhbjtcbiAgc3VnZ2VzdEludGVybmFsTGlua1dpdGhBbGlhczogYm9vbGVhbjtcblxuICAvLyBkZWJ1Z1xuICBzaG93TG9nQWJvdXRQZXJmb3JtYW5jZUluQ29uc29sZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFNldHRpbmdzID0ge1xuICAvLyBnZW5lcmFsXG4gIHN0cmF0ZWd5OiBcImRlZmF1bHRcIixcbiAgbWF0Y2hTdHJhdGVneTogXCJwcmVmaXhcIixcblxuICBtYXhOdW1iZXJPZlN1Z2dlc3Rpb25zOiA1LFxuICBtYXhOdW1iZXJPZldvcmRzQXNQaHJhc2U6IDMsXG4gIG1pbk51bWJlck9mQ2hhcmFjdGVyc1RyaWdnZXJlZDogMCxcbiAgbWluTnVtYmVyT2ZXb3Jkc1RyaWdnZXJlZFBocmFzZTogMSxcbiAgY29tcGxlbWVudEF1dG9tYXRpY2FsbHk6IHRydWUsXG4gIGRlbGF5TWlsbGlTZWNvbmRzOiAwLFxuICBkaXNhYmxlU3VnZ2VzdGlvbnNEdXJpbmdJbWVPbjogZmFsc2UsXG4gIGluc2VydEFmdGVyQ29tcGxldGlvbjogdHJ1ZSxcblxuICAvLyBrZXkgY3VzdG9taXphdGlvblxuICBzZWxlY3RTdWdnZXN0aW9uS2V5czogXCJFbnRlclwiLFxuICBhZGRpdGlvbmFsQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzOiBcIk5vbmVcIixcbiAgcHJvcGFnYXRlRXNjOiBmYWxzZSxcblxuICAvLyBjdXJyZW50IGZpbGUgY29tcGxlbWVudFxuICBlbmFibGVDdXJyZW50RmlsZUNvbXBsZW1lbnQ6IHRydWUsXG4gIG9ubHlDb21wbGVtZW50RW5nbGlzaE9uQ3VycmVudEZpbGVDb21wbGVtZW50OiBmYWxzZSxcblxuICAvLyBjdXN0b20gZGljdGlvbmFyeSBjb21wbGVtZW50XG4gIGVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50OiBmYWxzZSxcbiAgY3VzdG9tRGljdGlvbmFyeVBhdGhzOiBgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2ZpcnN0MjBob3Vycy9nb29nbGUtMTAwMDAtZW5nbGlzaC9tYXN0ZXIvZ29vZ2xlLTEwMDAwLWVuZ2xpc2gtbm8tc3dlYXJzLnR4dGAsXG4gIGNvbHVtbkRlbGltaXRlcjogXCJUYWJcIixcbiAgZGVsaW1pdGVyVG9IaWRlU3VnZ2VzdGlvbjogXCJcIixcbiAgY2FyZXRMb2NhdGlvblN5bWJvbEFmdGVyQ29tcGxlbWVudDogXCJcIixcblxuICAvLyBpbnRlcm5hbCBsaW5rIGNvbXBsZW1lbnRcbiAgZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudDogdHJ1ZSxcbiAgc3VnZ2VzdEludGVybmFsTGlua1dpdGhBbGlhczogZmFsc2UsXG5cbiAgLy8gZGVidWdcbiAgc2hvd0xvZ0Fib3V0UGVyZm9ybWFuY2VJbkNvbnNvbGU6IGZhbHNlLFxufTtcblxuZXhwb3J0IGNsYXNzIFZhcmlvdXNDb21wbGVtZW50c1NldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgcGx1Z2luOiBWYXJpb3VzQ29tcG9uZW50cztcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBWYXJpb3VzQ29tcG9uZW50cykge1xuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG5cbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiVmFyaW91cyBDb21wbGVtZW50cyAtIFNldHRpbmdzXCIgfSk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJNYWluXCIgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbCkuc2V0TmFtZShcIlN0cmF0ZWd5XCIpLmFkZERyb3Bkb3duKCh0YykgPT5cbiAgICAgIHRjXG4gICAgICAgIC5hZGRPcHRpb25zKFxuICAgICAgICAgIFRva2VuaXplU3RyYXRlZ3kudmFsdWVzKCkucmVkdWNlKFxuICAgICAgICAgICAgKHAsIGMpID0+ICh7IC4uLnAsIFtjLm5hbWVdOiBjLm5hbWUgfSksXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RyYXRlZ3kpXG4gICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdHJhdGVneSA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncyh7IGN1cnJlbnRGaWxlOiB0cnVlIH0pO1xuICAgICAgICB9KVxuICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbCkuc2V0TmFtZShcIk1hdGNoIHN0cmF0ZWd5XCIpLmFkZERyb3Bkb3duKCh0YykgPT5cbiAgICAgIHRjXG4gICAgICAgIC5hZGRPcHRpb25zKFxuICAgICAgICAgIE1hdGNoU3RyYXRlZ3kudmFsdWVzKCkucmVkdWNlKFxuICAgICAgICAgICAgKHAsIGMpID0+ICh7IC4uLnAsIFtjLm5hbWVdOiBjLm5hbWUgfSksXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubWF0Y2hTdHJhdGVneSlcbiAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1hdGNoU3RyYXRlZ3kgPSB2YWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoeyBjdXJyZW50RmlsZTogdHJ1ZSB9KTtcbiAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgfSlcbiAgICApO1xuICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXRjaFN0cmF0ZWd5ID09PSBNYXRjaFN0cmF0ZWd5LlBBUlRJQUwubmFtZSkge1xuICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICB0ZXh0OiBcIuKaoCBgcGFydGlhbGAgaXMgbW9yZSB0aGFuIDEwIHRpbWVzIHNsb3dlciB0aGFuIGBwcmVmaXhgXCIsXG4gICAgICAgIGNsczogXCJ2YXJpb3VzLWNvbXBsZW1lbnRzX19zZXR0aW5nc19fd2FybmluZ1wiLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIk1heCBudW1iZXIgb2Ygc3VnZ2VzdGlvbnNcIilcbiAgICAgIC5hZGRTbGlkZXIoKHNjKSA9PlxuICAgICAgICBzY1xuICAgICAgICAgIC5zZXRMaW1pdHMoMSwgMjU1LCAxKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXhOdW1iZXJPZlN1Z2dlc3Rpb25zKVxuICAgICAgICAgIC5zZXREeW5hbWljVG9vbHRpcCgpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWF4TnVtYmVyT2ZTdWdnZXN0aW9ucyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiTWF4IG51bWJlciBvZiB3b3JkcyBhcyBhIHBocmFzZVwiKVxuICAgICAgLmFkZFNsaWRlcigoc2MpID0+XG4gICAgICAgIHNjXG4gICAgICAgICAgLnNldExpbWl0cygxLCAxMCwgMSlcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubWF4TnVtYmVyT2ZXb3Jkc0FzUGhyYXNlKVxuICAgICAgICAgIC5zZXREeW5hbWljVG9vbHRpcCgpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWF4TnVtYmVyT2ZXb3Jkc0FzUGhyYXNlID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubWF4TnVtYmVyT2ZXb3Jkc0FzUGhyYXNlID4gMSkge1xuICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICB0ZXh0OiBg4pqgIEl0IG1ha2VzIHNsb3dlciBtb3JlIHRoYW4gJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXhOdW1iZXJPZldvcmRzQXNQaHJhc2V9IHRpbWVzYCxcbiAgICAgICAgY2xzOiBcInZhcmlvdXMtY29tcGxlbWVudHNfX3NldHRpbmdzX193YXJuaW5nXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiTWluIG51bWJlciBvZiBjaGFyYWN0ZXJzIGZvciB0cmlnZ2VyXCIpXG4gICAgICAuc2V0RGVzYyhcIkl0IHVzZXMgYSBkZWZhdWx0IHZhbHVlIG9mIFN0cmF0ZWd5IGlmIHNldCAwLlwiKVxuICAgICAgLmFkZFNsaWRlcigoc2MpID0+XG4gICAgICAgIHNjXG4gICAgICAgICAgLnNldExpbWl0cygwLCAxMCwgMSlcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubWluTnVtYmVyT2ZDaGFyYWN0ZXJzVHJpZ2dlcmVkKVxuICAgICAgICAgIC5zZXREeW5hbWljVG9vbHRpcCgpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWluTnVtYmVyT2ZDaGFyYWN0ZXJzVHJpZ2dlcmVkID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJNaW4gbnVtYmVyIG9mIHdvcmRzIGZvciB0cmlnZ2VyXCIpXG4gICAgICAuYWRkU2xpZGVyKChzYykgPT5cbiAgICAgICAgc2NcbiAgICAgICAgICAuc2V0TGltaXRzKDEsIDEwLCAxKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5taW5OdW1iZXJPZldvcmRzVHJpZ2dlcmVkUGhyYXNlKVxuICAgICAgICAgIC5zZXREeW5hbWljVG9vbHRpcCgpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWluTnVtYmVyT2ZXb3Jkc1RyaWdnZXJlZFBocmFzZSA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQ29tcGxlbWVudCBhdXRvbWF0aWNhbGx5XCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb21wbGVtZW50QXV0b21hdGljYWxseSkub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb21wbGVtZW50QXV0b21hdGljYWxseSA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRGVsYXkgbWlsbGktc2Vjb25kcyBmb3IgdHJpZ2dlclwiKVxuICAgICAgLmFkZFNsaWRlcigoc2MpID0+XG4gICAgICAgIHNjXG4gICAgICAgICAgLnNldExpbWl0cygwLCAxMDAwLCAxMClcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsYXlNaWxsaVNlY29uZHMpXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheU1pbGxpU2Vjb25kcyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRGlzYWJsZSBzdWdnZXN0aW9ucyBkdXJpbmcgSU1FIG9uXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICB0Yy5zZXRWYWx1ZShcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlU3VnZ2VzdGlvbnNEdXJpbmdJbWVPblxuICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVTdWdnZXN0aW9uc0R1cmluZ0ltZU9uID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiSW5zZXJ0IHNwYWNlIGFmdGVyIGNvbXBsZXRpb25cIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmluc2VydEFmdGVyQ29tcGxldGlvbikub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pbnNlcnRBZnRlckNvbXBsZXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiS2V5IGN1c3RvbWl6YXRpb25cIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJTZWxlY3QgYSBzdWdnZXN0aW9uIGtleVwiKVxuICAgICAgLmFkZERyb3Bkb3duKCh0YykgPT5cbiAgICAgICAgdGNcbiAgICAgICAgICAuYWRkT3B0aW9ucyhtaXJyb3JNYXAoU2VsZWN0U3VnZ2VzdGlvbktleS52YWx1ZXMoKSwgKHgpID0+IHgubmFtZSkpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNlbGVjdFN1Z2dlc3Rpb25LZXlzKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNlbGVjdFN1Z2dlc3Rpb25LZXlzID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJBZGRpdGlvbmFsIGN5Y2xlIHRocm91Z2ggc3VnZ2VzdGlvbnMga2V5c1wiKVxuICAgICAgLmFkZERyb3Bkb3duKCh0YykgPT5cbiAgICAgICAgdGNcbiAgICAgICAgICAuYWRkT3B0aW9ucyhcbiAgICAgICAgICAgIEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cy52YWx1ZXMoKS5yZWR1Y2UoXG4gICAgICAgICAgICAgIChwLCBjKSA9PiAoeyAuLi5wLCBbYy5uYW1lXTogYy5uYW1lIH0pLFxuICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWRkaXRpb25hbEN5Y2xlVGhyb3VnaFN1Z2dlc3Rpb25zS2V5cylcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hZGRpdGlvbmFsQ3ljbGVUaHJvdWdoU3VnZ2VzdGlvbnNLZXlzID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJQcm9wYWdhdGUgRVNDXCIpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgXCJJdCBpcyBoYW5keSBpZiB5b3UgdXNlIFZpbSBtb2RlIGJlY2F1c2UgeW91IGNhbiBzd2l0Y2ggdG8gTm9ybWFsIG1vZGUgYnkgb25lIEVTQywgd2hldGhlciBpdCBzaG93cyBzdWdnZXN0aW9ucyBvciBub3QuXCJcbiAgICAgIClcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnByb3BhZ2F0ZUVzYykub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm9wYWdhdGVFc2MgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiQ3VycmVudCBmaWxlIGNvbXBsZW1lbnRcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJFbmFibGUgQ3VycmVudCBmaWxlIGNvbXBsZW1lbnRcIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1cnJlbnRGaWxlQ29tcGxlbWVudCkub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVDdXJyZW50RmlsZUNvbXBsZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncyh7IGN1cnJlbnRGaWxlOiB0cnVlIH0pO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQ3VycmVudEZpbGVDb21wbGVtZW50KSB7XG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJPbmx5IGNvbXBsZW1lbnQgRW5nbGlzaCBvbiBjdXJyZW50IGZpbGUgY29tcGxlbWVudFwiKVxuICAgICAgICAuYWRkVG9nZ2xlKCh0YykgPT4ge1xuICAgICAgICAgIHRjLnNldFZhbHVlKFxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub25seUNvbXBsZW1lbnRFbmdsaXNoT25DdXJyZW50RmlsZUNvbXBsZW1lbnRcbiAgICAgICAgICApLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub25seUNvbXBsZW1lbnRFbmdsaXNoT25DdXJyZW50RmlsZUNvbXBsZW1lbnQgPVxuICAgICAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncyh7IGN1cnJlbnRGaWxlOiB0cnVlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJDdXN0b20gZGljdGlvbmFyeSBjb21wbGVtZW50XCIgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRW5hYmxlIEN1c3RvbSBkaWN0aW9uYXJ5IGNvbXBsZW1lbnRcIilcbiAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgIHRjLnNldFZhbHVlKFxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50XG4gICAgICAgICkub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQ3VzdG9tRGljdGlvbmFyeUNvbXBsZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoeyBjdXN0b21EaWN0aW9uYXJ5OiB0cnVlIH0pO1xuICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUN1c3RvbURpY3Rpb25hcnlDb21wbGVtZW50KSB7XG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJDdXN0b20gZGljdGlvbmFyeSBwYXRoc1wiKVxuICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICBcIlNwZWNpZnkgZWl0aGVyIGEgcmVsYXRpdmUgcGF0aCBmcm9tIFZhdWx0IHJvb3Qgb3IgVVJMIGZvciBlYWNoIGxpbmUuXCJcbiAgICAgICAgKVxuICAgICAgICAuYWRkVGV4dEFyZWEoKHRhYykgPT4ge1xuICAgICAgICAgIGNvbnN0IGVsID0gdGFjXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY3VzdG9tRGljdGlvbmFyeVBhdGhzKVxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZGljdGlvbmFyeS5tZFwiKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jdXN0b21EaWN0aW9uYXJ5UGF0aHMgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBlbC5pbnB1dEVsLmNsYXNzTmFtZSA9XG4gICAgICAgICAgICBcInZhcmlvdXMtY29tcGxlbWVudHNfX3NldHRpbmdzX19jdXN0b20tZGljdGlvbmFyeS1wYXRoc1wiO1xuICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfSk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKS5zZXROYW1lKFwiQ29sdW1uIGRlbGltaXRlclwiKS5hZGREcm9wZG93bigodGMpID0+XG4gICAgICAgIHRjXG4gICAgICAgICAgLmFkZE9wdGlvbnMoXG4gICAgICAgICAgICBDb2x1bW5EZWxpbWl0ZXIudmFsdWVzKCkucmVkdWNlKFxuICAgICAgICAgICAgICAocCwgYykgPT4gKHsgLi4ucCwgW2MubmFtZV06IGMubmFtZSB9KSxcbiAgICAgICAgICAgICAge31cbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbHVtbkRlbGltaXRlcilcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2x1bW5EZWxpbWl0ZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJEZWxpbWl0ZXIgdG8gaGlkZSBhIHN1Z2dlc3Rpb25cIilcbiAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgXCJJZiBzZXQgJzs7OycsICdhYmNkOzs7ZWZnJyBpcyBzaG93biBhcyAnYWJjZCcgb24gc3VnZ2VzdGlvbnMsIGJ1dCBjb21wbGVtZW50cyB0byAnYWJjZGVmZycuXCJcbiAgICAgICAgKVxuICAgICAgICAuYWRkVGV4dCgoY2IpID0+IHtcbiAgICAgICAgICBjYi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxpbWl0ZXJUb0hpZGVTdWdnZXN0aW9uKS5vbkNoYW5nZShcbiAgICAgICAgICAgIGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxpbWl0ZXJUb0hpZGVTdWdnZXN0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoXCJDYXJldCBsb2NhdGlvbiBzeW1ib2wgYWZ0ZXIgY29tcGxlbWVudFwiKVxuICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICBcIklmIHNldCAnPENBUkVUPicgYW5kIHRoZXJlIGlzICc8bGk+PENBUkVUPjwvbGk+JyBpbiBjdXN0b20gZGljdGlvbmFyeSwgaXQgY29tcGxlbWVudHMgJzxsaT48L2xpPicgYW5kIG1vdmUgYSBjYXJldCB3aGVyZSBiZXR3ZWVuICc8bGk+JyBhbmQgYDwvbGk+YC5cIlxuICAgICAgICApXG4gICAgICAgIC5hZGRUZXh0KChjYikgPT4ge1xuICAgICAgICAgIGNiLnNldFZhbHVlKFxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY2FyZXRMb2NhdGlvblN5bWJvbEFmdGVyQ29tcGxlbWVudFxuICAgICAgICAgICkub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jYXJldExvY2F0aW9uU3ltYm9sQWZ0ZXJDb21wbGVtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiSW50ZXJuYWwgbGluayBjb21wbGVtZW50XCIgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRW5hYmxlIEludGVybmFsIGxpbmsgY29tcGxlbWVudFwiKVxuICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgdGMuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudCkub25DaGFuZ2UoXG4gICAgICAgICAgYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVJbnRlcm5hbExpbmtDb21wbGVtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoeyBpbnRlcm5hbExpbms6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlSW50ZXJuYWxMaW5rQ29tcGxlbWVudCkge1xuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgIC5zZXROYW1lKFwiU3VnZ2VzdCB3aXRoIGFuIGFsaWFzXCIpXG4gICAgICAgIC5hZGRUb2dnbGUoKHRjKSA9PiB7XG4gICAgICAgICAgdGMuc2V0VmFsdWUoXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdWdnZXN0SW50ZXJuYWxMaW5rV2l0aEFsaWFzXG4gICAgICAgICAgKS5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnN1Z2dlc3RJbnRlcm5hbExpbmtXaXRoQWxpYXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogXCJEZWJ1Z1wiIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlNob3cgbG9nIGFib3V0IHBlcmZvcm1hbmNlIGluIGEgY29uc29sZVwiKVxuICAgICAgLmFkZFRvZ2dsZSgodGMpID0+IHtcbiAgICAgICAgdGMuc2V0VmFsdWUoXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2hvd0xvZ0Fib3V0UGVyZm9ybWFuY2VJbkNvbnNvbGVcbiAgICAgICAgKS5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93TG9nQWJvdXRQZXJmb3JtYW5jZUluQ29uc29sZSA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgdG9nZ2xlTWF0Y2hTdHJhdGVneSgpIHtcbiAgICBzd2l0Y2ggKHRoaXMucGx1Z2luLnNldHRpbmdzLm1hdGNoU3RyYXRlZ3kpIHtcbiAgICAgIGNhc2UgXCJwcmVmaXhcIjpcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWF0Y2hTdHJhdGVneSA9IFwicGFydGlhbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwYXJ0aWFsXCI6XG4gICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1hdGNoU3RyYXRlZ3kgPSBcInByZWZpeFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBPYmplY3RBbGxvY2F0aW9uSWdub3JlZFxuICAgICAgICBuZXcgTm90aWNlKFwi4pqgVW5leHBlY3RlZCBlcnJvclwiKTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gIH1cblxuICBhc3luYyB0b2dnbGVDb21wbGVtZW50QXV0b21hdGljYWxseSgpIHtcbiAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb21wbGVtZW50QXV0b21hdGljYWxseSA9XG4gICAgICAhdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29tcGxlbWVudEF1dG9tYXRpY2FsbHk7XG4gICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gIH1cblxuICBnZXRQbHVnaW5TZXR0aW5nc0FzSnNvblN0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShcbiAgICAgIHtcbiAgICAgICAgdmVyc2lvbjogdGhpcy5wbHVnaW4ubWFuaWZlc3QudmVyc2lvbixcbiAgICAgICAgbW9iaWxlOiAodGhpcy5hcHAgYXMgYW55KS5pc01vYmlsZSxcbiAgICAgICAgc2V0dGluZ3M6IHRoaXMucGx1Z2luLnNldHRpbmdzLFxuICAgICAgfSxcbiAgICAgIG51bGwsXG4gICAgICA0XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQXBwLFxuICBCdXR0b25Db21wb25lbnQsXG4gIERyb3Bkb3duQ29tcG9uZW50LFxuICBNb2RhbCxcbiAgVGV4dEFyZWFDb21wb25lbnQsXG4gIFRleHRDb21wb25lbnQsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgbWlycm9yTWFwIH0gZnJvbSBcIi4uL3V0aWwvY29sbGVjdGlvbi1oZWxwZXJcIjtcbmltcG9ydCB7IFdvcmQgfSBmcm9tIFwiLi4vcHJvdmlkZXIvc3VnZ2VzdGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21EaWN0aW9uYXJ5V29yZFJlZ2lzdGVyTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIGN1cnJlbnREaWN0aW9uYXJ5UGF0aDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBhbGlhc2VzOiBzdHJpbmdbXTtcblxuICB3b3JkVGV4dEFyZWE6IFRleHRBcmVhQ29tcG9uZW50O1xuICBidXR0b246IEJ1dHRvbkNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEFwcCxcbiAgICBkaWN0aW9uYXJ5UGF0aHM6IHN0cmluZ1tdLFxuICAgIGluaXRpYWxWYWx1ZTogc3RyaW5nID0gXCJcIixcbiAgICBvbkNsaWNrQWRkOiAoZGljdGlvbmFyeVBhdGg6IHN0cmluZywgd29yZDogV29yZCkgPT4gdm9pZFxuICApIHtcbiAgICBzdXBlcihhcHApO1xuICAgIHRoaXMuY3VycmVudERpY3Rpb25hcnlQYXRoID0gZGljdGlvbmFyeVBhdGhzWzBdO1xuICAgIHRoaXMudmFsdWUgPSBpbml0aWFsVmFsdWU7XG5cbiAgICB0aGlzLnRpdGxlRWwuc2V0VGV4dChcIkFkZCBhIHdvcmQgdG8gYSBjdXN0b20gZGljdGlvbmFyeVwiKTtcblxuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuXG4gICAgY29udGVudEVsLmNyZWF0ZUVsKFwiaDRcIiwgeyB0ZXh0OiBcIkRpY3Rpb25hcnlcIiB9KTtcbiAgICBuZXcgRHJvcGRvd25Db21wb25lbnQoY29udGVudEVsKVxuICAgICAgLmFkZE9wdGlvbnMobWlycm9yTWFwKGRpY3Rpb25hcnlQYXRocywgKHgpID0+IHgpKVxuICAgICAgLm9uQ2hhbmdlKCh2KSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudERpY3Rpb25hcnlQYXRoID0gdjtcbiAgICAgIH0pO1xuXG4gICAgY29udGVudEVsLmNyZWF0ZUVsKFwiaDRcIiwgeyB0ZXh0OiBcIldvcmRcIiB9KTtcbiAgICB0aGlzLndvcmRUZXh0QXJlYSA9IG5ldyBUZXh0QXJlYUNvbXBvbmVudChjb250ZW50RWwpXG4gICAgICAuc2V0VmFsdWUodGhpcy52YWx1ZSlcbiAgICAgIC5vbkNoYW5nZSgodikgPT4ge1xuICAgICAgICB0aGlzLnZhbHVlID0gdjtcbiAgICAgICAgdGhpcy5idXR0b24uc2V0RGlzYWJsZWQoIXYpO1xuICAgICAgICBpZiAodikge1xuICAgICAgICAgIHRoaXMuYnV0dG9uLnNldEN0YSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYnV0dG9uLnJlbW92ZUN0YSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLndvcmRUZXh0QXJlYS5pbnB1dEVsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWluLXdpZHRoOiAxMDAlO1wiKTtcblxuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImg0XCIsIHsgdGV4dDogXCJEZXNjcmlwdGlvblwiIH0pO1xuICAgIG5ldyBUZXh0Q29tcG9uZW50KGNvbnRlbnRFbClcbiAgICAgIC5vbkNoYW5nZSgodikgPT4ge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdjtcbiAgICAgIH0pXG4gICAgICAuaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1pbi13aWR0aDogMTAwJTtcIik7XG5cbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoNFwiLCB7IHRleHQ6IFwiQWxpYXNlcyAoZm9yIGVhY2ggbGluZSlcIiB9KTtcbiAgICBuZXcgVGV4dEFyZWFDb21wb25lbnQoY29udGVudEVsKVxuICAgICAgLm9uQ2hhbmdlKCh2KSA9PiB7XG4gICAgICAgIHRoaXMuYWxpYXNlcyA9IHYuc3BsaXQoXCJcXG5cIik7XG4gICAgICB9KVxuICAgICAgLmlucHV0RWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtaW4td2lkdGg6IDEwMCU7XCIpO1xuXG4gICAgdGhpcy5idXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KFxuICAgICAgY29udGVudEVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgICAgYXR0cjoge1xuICAgICAgICAgIHN0eWxlOiBcImRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBtYXJnaW4tdG9wOiAxNXB4XCIsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIClcbiAgICAgIC5zZXRCdXR0b25UZXh0KFwiQWRkIHRvIGRpY3Rpb25hcnlcIilcbiAgICAgIC5zZXRDdGEoKVxuICAgICAgLnNldERpc2FibGVkKCF0aGlzLnZhbHVlKVxuICAgICAgLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICBvbkNsaWNrQWRkKHRoaXMuY3VycmVudERpY3Rpb25hcnlQYXRoLCB7XG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICAgICAgYWxpYXNlczogdGhpcy5hbGlhc2VzLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLmJ1dHRvbi5zZXRDdGEoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idXR0b24ucmVtb3ZlQ3RhKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOb3RpY2UsIFBsdWdpbiB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgQXV0b0NvbXBsZXRlU3VnZ2VzdCB9IGZyb20gXCIuL3VpL0F1dG9Db21wbGV0ZVN1Z2dlc3RcIjtcbmltcG9ydCB7XG4gIERFRkFVTFRfU0VUVElOR1MsXG4gIFNldHRpbmdzLFxuICBWYXJpb3VzQ29tcGxlbWVudHNTZXR0aW5nVGFiLFxufSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQ3VzdG9tRGljdGlvbmFyeVdvcmRSZWdpc3Rlck1vZGFsIH0gZnJvbSBcIi4vdWkvQ3VzdG9tRGljdGlvbmFyeVdvcmRSZWdpc3Rlck1vZGFsXCI7XG5pbXBvcnQgeyBBcHBIZWxwZXIgfSBmcm9tIFwiLi9hcHAtaGVscGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhcmlvdXNDb21wb25lbnRzIGV4dGVuZHMgUGx1Z2luIHtcbiAgYXBwSGVscGVyOiBBcHBIZWxwZXI7XG4gIHNldHRpbmdzOiBTZXR0aW5ncztcbiAgc2V0dGluZ1RhYjogVmFyaW91c0NvbXBsZW1lbnRzU2V0dGluZ1RhYjtcbiAgc3VnZ2VzdGVyOiBBdXRvQ29tcGxldGVTdWdnZXN0O1xuXG4gIG9udW5sb2FkKCkge1xuICAgIHN1cGVyLm9udW5sb2FkKCk7XG4gICAgdGhpcy5zdWdnZXN0ZXIudW5yZWdpc3RlcigpO1xuICB9XG5cbiAgYXN5bmMgb25sb2FkKCkge1xuICAgIHRoaXMuYXBwSGVscGVyID0gbmV3IEFwcEhlbHBlcih0aGlzLmFwcCk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJlZGl0b3ItbWVudVwiLCAobWVudSkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuYXBwSGVscGVyLmdldFNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbWVudS5hZGRJdGVtKChpdGVtKSA9PlxuICAgICAgICAgIGl0ZW1cbiAgICAgICAgICAgIC5zZXRUaXRsZShcIkFkZCB0byBjdXN0b20gZGljdGlvbmFyeVwiKVxuICAgICAgICAgICAgLnNldEljb24oXCJzdGFja2VkLWxldmVsc1wiKVxuICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmFkZFdvcmRUb0N1c3RvbURpY3Rpb25hcnkoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG4gICAgdGhpcy5zZXR0aW5nVGFiID0gbmV3IFZhcmlvdXNDb21wbGVtZW50c1NldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpO1xuICAgIHRoaXMuYWRkU2V0dGluZ1RhYih0aGlzLnNldHRpbmdUYWIpO1xuXG4gICAgdGhpcy5zdWdnZXN0ZXIgPSBhd2FpdCBBdXRvQ29tcGxldGVTdWdnZXN0Lm5ldyh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncyk7XG4gICAgdGhpcy5yZWdpc3RlckVkaXRvclN1Z2dlc3QodGhpcy5zdWdnZXN0ZXIpO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcInJlbG9hZC1jdXN0b20tZGljdGlvbmFyaWVzXCIsXG4gICAgICBuYW1lOiBcIlJlbG9hZCBjdXN0b20gZGljdGlvbmFyaWVzXCIsXG4gICAgICBob3RrZXlzOiBbeyBtb2RpZmllcnM6IFtcIk1vZFwiLCBcIlNoaWZ0XCJdLCBrZXk6IFwiclwiIH1dLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWxvYWRDdXN0b21EaWN0aW9uYXJpZXMoKTtcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIE9iamVjdEFsbG9jYXRpb25JZ25vcmVkXG4gICAgICAgIG5ldyBOb3RpY2UoYEZpbmlzaCByZWxvYWQgY3VzdG9tIGRpY3Rpb25hcmllc2ApO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJ0b2dnbGUtbWF0Y2gtc3RyYXRlZ3lcIixcbiAgICAgIG5hbWU6IFwiVG9nZ2xlIE1hdGNoIHN0cmF0ZWd5XCIsXG4gICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnNldHRpbmdUYWIudG9nZ2xlTWF0Y2hTdHJhdGVneSgpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJ0b2dnbGUtY29tcGxlbWVudC1hdXRvbWF0aWNhbGx5XCIsXG4gICAgICBuYW1lOiBcIlRvZ2dsZSBDb21wbGVtZW50IGF1dG9tYXRpY2FsbHlcIixcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0dGluZ1RhYi50b2dnbGVDb21wbGVtZW50QXV0b21hdGljYWxseSgpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJzaG93LXN1Z2dlc3Rpb25zXCIsXG4gICAgICBuYW1lOiBcIlNob3cgc3VnZ2VzdGlvbnNcIixcbiAgICAgIGhvdGtleXM6IFt7IG1vZGlmaWVyczogW1wiTW9kXCJdLCBrZXk6IFwiIFwiIH1dLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5zdWdnZXN0ZXIudHJpZ2dlckNvbXBsZXRlKCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBcImFkZC13b3JkLWN1c3RvbS1kaWN0aW9uYXJ5XCIsXG4gICAgICBuYW1lOiBcIkFkZCBhIHdvcmQgdG8gYSBjdXN0b20gZGljdGlvbmFyeVwiLFxuICAgICAgaG90a2V5czogW3sgbW9kaWZpZXJzOiBbXCJNb2RcIiwgXCJTaGlmdFwiXSwga2V5OiBcIiBcIiB9XSxcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkV29yZFRvQ3VzdG9tRGljdGlvbmFyeSgpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJwcmVkaWN0YWJsZS1jb21wbGVtZW50c1wiLFxuICAgICAgbmFtZTogXCJQcmVkaWN0YWJsZSBjb21wbGVtZW50XCIsXG4gICAgICBob3RrZXlzOiBbeyBtb2RpZmllcnM6IFtcIlNoaWZ0XCJdLCBrZXk6IFwiIFwiIH1dLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5zdWdnZXN0ZXIucHJlZGljdGFibGVDb21wbGV0ZSgpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJjb3B5LXBsdWdpbi1zZXR0aW5nc1wiLFxuICAgICAgbmFtZTogXCJDb3B5IHBsdWdpbiBzZXR0aW5nc1wiLFxuICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoXG4gICAgICAgICAgdGhpcy5zZXR0aW5nVGFiLmdldFBsdWdpblNldHRpbmdzQXNKc29uU3RyaW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgbmV3IE5vdGljZShcIkNvcHkgc2V0dGluZ3Mgb2YgVmFyaW91cyBDb21wbGVtZW50c1wiKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsb2FkU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4uREVGQVVMVF9TRVRUSU5HUywgLi4uKGF3YWl0IHRoaXMubG9hZERhdGEoKSkgfTtcbiAgfVxuXG4gIGFzeW5jIHNhdmVTZXR0aW5ncyhcbiAgICBuZWVkVXBkYXRlVG9rZW5zOiB7XG4gICAgICBjdXJyZW50RmlsZT86IGJvb2xlYW47XG4gICAgICBjdXN0b21EaWN0aW9uYXJ5PzogYm9vbGVhbjtcbiAgICAgIGludGVybmFsTGluaz86IGJvb2xlYW47XG4gICAgfSA9IHt9XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gICAgYXdhaXQgdGhpcy5zdWdnZXN0ZXIudXBkYXRlU2V0dGluZ3ModGhpcy5zZXR0aW5ncyk7XG4gICAgaWYgKG5lZWRVcGRhdGVUb2tlbnMuY3VycmVudEZpbGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuc3VnZ2VzdGVyLnJlZnJlc2hDdXJyZW50RmlsZVRva2VucygpO1xuICAgIH1cbiAgICBpZiAobmVlZFVwZGF0ZVRva2Vucy5jdXN0b21EaWN0aW9uYXJ5KSB7XG4gICAgICBhd2FpdCB0aGlzLnN1Z2dlc3Rlci5yZWZyZXNoQ3VzdG9tRGljdGlvbmFyeVRva2VucygpO1xuICAgIH1cbiAgICBpZiAobmVlZFVwZGF0ZVRva2Vucy5pbnRlcm5hbExpbmspIHtcbiAgICAgIGF3YWl0IHRoaXMuc3VnZ2VzdGVyLnJlZnJlc2hJbnRlcm5hbExpbmtUb2tlbnMoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyByZWxvYWRDdXN0b21EaWN0aW9uYXJpZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zdWdnZXN0ZXIucmVmcmVzaEN1c3RvbURpY3Rpb25hcnlUb2tlbnMoKTtcbiAgfVxuXG4gIGFkZFdvcmRUb0N1c3RvbURpY3Rpb25hcnkoKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRXb3JkID0gdGhpcy5hcHBIZWxwZXIuZ2V0U2VsZWN0aW9uKCk7XG4gICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLnN1Z2dlc3Rlci5jdXN0b21EaWN0aW9uYXJ5V29yZFByb3ZpZGVyO1xuICAgIGNvbnN0IG1vZGFsID0gbmV3IEN1c3RvbURpY3Rpb25hcnlXb3JkUmVnaXN0ZXJNb2RhbChcbiAgICAgIHRoaXMuYXBwLFxuICAgICAgcHJvdmlkZXIuZWRpdGFibGVQYXRocyxcbiAgICAgIHNlbGVjdGVkV29yZCxcbiAgICAgIGFzeW5jIChkaWN0aW9uYXJ5UGF0aCwgd29yZCkgPT4ge1xuICAgICAgICBpZiAocHJvdmlkZXIud29yZEJ5VmFsdWVbd29yZC52YWx1ZV0pIHtcbiAgICAgICAgICBuZXcgTm90aWNlKGDimqAgJHt3b3JkLnZhbHVlfSBhbHJlYWR5IGV4aXN0c2AsIDApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHByb3ZpZGVyLmFkZFdvcmRXaXRoRGljdGlvbmFyeSh3b3JkLCBkaWN0aW9uYXJ5UGF0aCk7XG4gICAgICAgIG5ldyBOb3RpY2UoYEFkZGVkICR7d29yZC52YWx1ZX1gKTtcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgbW9kYWwub3BlbigpO1xuXG4gICAgaWYgKHNlbGVjdGVkV29yZCkge1xuICAgICAgbW9kYWwuYnV0dG9uLmJ1dHRvbkVsLmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZGFsLndvcmRUZXh0QXJlYS5pbnB1dEVsLmZvY3VzKCk7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsicGFyc2VGcm9udE1hdHRlckFsaWFzZXMiLCJNYXJrZG93blZpZXciLCJyZXF1ZXN0IiwiTm90aWNlIiwiRWRpdG9yU3VnZ2VzdCIsImRlYm91bmNlIiwiUGx1Z2luU2V0dGluZ1RhYiIsIlNldHRpbmciLCJNb2RhbCIsIkRyb3Bkb3duQ29tcG9uZW50IiwiVGV4dEFyZWFDb21wb25lbnQiLCJUZXh0Q29tcG9uZW50IiwiQnV0dG9uQ29tcG9uZW50IiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElB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Q0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO0tBQ1IsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxFQUFFO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLElBQUk7S0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEtBQUs7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsS0FBSztRQUNYLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsR0FBRztLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLElBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxJQUFJLEVBQUUsQ0FBQyxLQUFLO1FBQ1osRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxLQUFLO1FBQ1osRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEtBQUs7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsS0FBSztRQUNWLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxLQUFLO1FBQ1YsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsS0FBSztRQUNWLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsS0FBSztRQUNWLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRztLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixFQUFFLEVBQUUsR0FBRztRQUNQLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDUixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsRUFBRSxFQUFFLENBQUMsSUFBSTtRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxJQUFJO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsR0FBRztLQUNSLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztLQUNULENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxFQUFFO1FBQ1IsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxFQUFFO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHO0tBQ1gsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLElBQUk7UUFDWCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxDQUFDLEdBQUc7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLENBQUMsR0FBRztRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLENBQUMsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLElBQUk7S0FDWixDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7S0FDWCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixLQUFLLEVBQUUsQ0FBQyxHQUFHO1FBQ1gsS0FBSyxFQUFFLENBQUMsR0FBRztRQUNYLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNYLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsSUFBSTtRQUNYLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLElBQUk7UUFDWCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRztRQUNYLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO0tBQ1IsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxFQUFFLEVBQUUsRUFBRTtRQUNOLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDUCxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ1AsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsQ0FBQyxJQUFJO0tBQ1YsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLEVBQUU7UUFDTixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxDQUFDLElBQUk7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEtBQUs7UUFDVCxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1IsRUFBRSxFQUFFLENBQUMsSUFBSTtLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxHQUFHLEVBQUUsQ0FBQyxHQUFHO1FBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRztLQUNWLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxDQUFDLEVBQUUsR0FBRztRQUNOLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztLQUNQLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLEdBQUcsRUFBRSxJQUFJO1FBQ1QsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixFQUFFLEVBQUUsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztLQUNQLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsQ0FBQyxFQUFFLElBQUk7UUFDUCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsS0FBSztRQUNULENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxLQUFLO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ1YsQ0FBQyxFQUFFLENBQUMsS0FBSztRQUNULENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxJQUFJO1FBQ1QsR0FBRyxFQUFFLENBQUMsSUFBSTtRQUNWLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxLQUFLO1FBQ1QsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO0tBQ1QsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsRUFBRSxFQUFFLENBQUMsS0FBSztRQUNWLEdBQUcsRUFBRSxDQUFDLElBQUk7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsRUFBRTtRQUNMLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsSUFBSTtRQUNQLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLENBQUMsSUFBSTtRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNULEVBQUUsRUFBRSxDQUFDLEtBQUs7UUFDVixHQUFHLEVBQUUsR0FBRztRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHO0tBQ1IsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUc7UUFDWCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLElBQUk7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLElBQUk7UUFDUixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLENBQUMsR0FBRztRQUNQLENBQUMsRUFBRSxHQUFHO1FB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QztJQUNoQixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDYixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDYixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUU1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pELEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ1osSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNUO1FBQ0QsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDUixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoQjtJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbEIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7QUM3OUNEO0FBQ0EsTUFBTSxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztBQUV0QyxTQUFTLG9CQUFvQixDQUFDLE9BQWUsRUFBRSxXQUFtQjtJQUNoRSxPQUFPLE9BQU87U0FDWCxLQUFLLENBQUMsV0FBVyxDQUFDO1NBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCLE9BQU8sQ0FBUyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUVEOzs7TUFHYSxpQkFBaUI7SUFDNUIsUUFBUSxDQUFDLE9BQWUsRUFBRSxHQUFhO1FBQ3JDLE9BQU8sb0JBQW9CLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDMUU7SUFFRCxpQkFBaUIsQ0FBQyxPQUFlO1FBQy9CLE1BQU0sTUFBTSxHQUFhLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFcEQsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFDRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQ3RCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFDaEQ7Z0JBQ0EsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDUCxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUM5QixNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU07aUJBQzNDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFFRCxPQUFPLEdBQUcsQ0FBQztLQUNaO0lBRUQsY0FBYztRQUNaLE9BQU8saUJBQWlCLENBQUM7S0FDMUI7SUFFRCxZQUFZLENBQUMsR0FBVztRQUN0QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztLQUNqRDs7O1NDbENhLGVBQWUsQ0FBQyxRQUEwQjtJQUN4RCxRQUFRLFFBQVEsQ0FBQyxJQUFJO1FBQ25CLEtBQUssU0FBUztZQUNaLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hDLEtBQUssUUFBUTtZQUNYLE9BQU8sSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUMvQixLQUFLLFVBQVU7WUFDYixPQUFPLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUNqQztZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDNUQ7QUFDSDs7TUNyQmEsZ0JBQWdCO0lBTzNCLFlBQTZCLElBQVUsRUFBVyxnQkFBd0I7UUFBN0MsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFXLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUN4RSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsT0FBTyxRQUFRLENBQUMsSUFBWTtRQUMxQixPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUUsQ0FBQztLQUMvRDtJQUVELE9BQU8sTUFBTTtRQUNYLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDO0tBQ2pDOztBQWhCdUIsd0JBQU8sR0FBdUIsRUFBRSxDQUFDO0FBRXpDLHdCQUFPLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0MseUJBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQyx1QkFBTSxHQUFHLElBQUksZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzs7QUNFckQsTUFBTSxPQUFPLEdBQUcsQ0FDckIsTUFBVyxFQUNYLEtBQXVCLEtBRXZCLE1BQU0sQ0FBQyxNQUFNLENBQ1gsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFDaEMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQzVDLEVBQ0QsRUFBNEIsQ0FDN0IsQ0FBQztTQUVZLElBQUksQ0FBSSxNQUFXO0lBQ2pDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDOUIsQ0FBQztTQUVlLFFBQVEsQ0FBSSxHQUFRLEVBQUUsRUFBaUM7SUFDckUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUNmLENBQUMsT0FBTyxFQUFFLEtBQUssS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQ3pFLENBQUM7QUFDSixDQUFDO1NBZ0NlLFNBQVMsQ0FDdkIsVUFBZSxFQUNmLE9BQXlCO0lBRXpCLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLHNDQUFXLENBQUMsS0FBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMvRTs7TUN4RGEsU0FBUztJQUNwQixZQUFvQixHQUFRO1FBQVIsUUFBRyxHQUFILEdBQUcsQ0FBSztLQUFJO0lBRWhDLFVBQVUsQ0FBQyxJQUFXOztRQUNwQixRQUNFLE1BQUFBLGdDQUF1QixDQUNyQixNQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsMENBQUUsV0FBVyxDQUN2RCxtQ0FBSSxFQUFFLEVBQ1A7S0FDSDtJQUVELDJCQUEyQjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUNDLHFCQUFZLENBQUMsRUFBRTtZQUN6RCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFXLENBQUMsSUFBb0IsQ0FBQztLQUM1RDtJQUVELGdCQUFnQjs7UUFDZCxPQUFPLE1BQUEsTUFBQSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsMENBQUUsTUFBTSxtQ0FBSSxJQUFJLENBQUM7S0FDM0Q7SUFFRCxZQUFZOztRQUNWLE9BQU8sTUFBQSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsMENBQUUsWUFBWSxFQUFFLENBQUM7S0FDaEQ7SUFFRCxjQUFjLENBQUMsTUFBYztRQUMzQixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hEO0lBRUQseUJBQXlCLENBQUMsTUFBYztRQUN0QyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDcEU7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7YUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDaEIsSUFBSSxFQUFFLENBQ1YsQ0FBQztLQUNIOzs7O0lBS0QsT0FBTzs7UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUNBLHFCQUFZLENBQUMsRUFBRTtZQUN6RCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVyxDQUFDLElBQW9CLENBQUM7UUFDekUsTUFBTSxNQUFNLEdBQVMsWUFBWSxDQUFDLE1BQWMsQ0FBQyxFQUFFLENBQUM7O1FBR3BELElBQUksQ0FBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxVQUFVLDBDQUFFLFNBQVMsSUFBRyxDQUFDLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUM7U0FDYjs7UUFHRCxPQUFPLENBQUMsRUFBQyxNQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE9BQU8sMENBQUUsS0FBSywwQ0FBRSxTQUFTLENBQUEsQ0FBQztLQUM1Qzs7O1NDNUNhLFFBQVEsQ0FDdEIsa0JBQXNDLEVBQ3RDLEdBQVcsRUFDWCxJQUFVO0lBRVYsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDekMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxPQUFPO0tBQ1I7SUFFRCxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVEO1NBQ2dCLEtBQUssQ0FDbkIsSUFBVSxFQUNWLEtBQWEsRUFDYixtQkFBNEI7O0lBRTVCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDdEMsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDN0MsTUFBTSxDQUFDLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLE9BQU8sRUFBRSxJQUFJLGtDQUFPLElBQUksS0FBRSxLQUFLLEVBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDaEU7YUFBTTtZQUNMLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN4RDtLQUNGO0lBQ0QsTUFBTSxZQUFZLEdBQUcsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFFLElBQUksWUFBWSxFQUFFO1FBQ2hCLE9BQU87WUFDTCxJQUFJLGtDQUFPLElBQUksS0FBRSxZQUFZLEdBQUU7WUFDL0IsS0FBSyxFQUFFLFlBQVk7WUFDbkIsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDO0tBQ0g7SUFFRCxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDdEMsQ0FBQztTQUVlLFlBQVksQ0FDMUIsWUFBMEIsRUFDMUIsS0FBYSxFQUNiLEdBQVc7O0lBRVgsTUFBTSxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7SUFFbkUsTUFBTSxLQUFLLEdBQUcsbUJBQW1CO1VBQzdCO1lBQ0UsSUFBSSxNQUFBLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDcEQsSUFBSSxNQUFBLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDbEUsSUFBSSxNQUFBLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztZQUN6RCxJQUFJLE1BQUEsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3ZFLElBQUksTUFBQSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3JELElBQUksTUFBQSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsbUNBQUksRUFBRSxDQUFDO1NBQ3BFO1VBQ0Q7WUFDRSxJQUFJLE1BQUEsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztZQUNwRCxJQUFJLE1BQUEsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3pELElBQUksTUFBQSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1lBQ3JELElBQUksTUFBQSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsbUNBQUksRUFBRSxDQUFDO1NBQ3BFLENBQUM7SUFFTixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNoQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUNoRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7U0FDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDVCxJQUFJLENBQUMsQ0FBQyxLQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxLQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZDLE9BQU8sQ0FBQyxDQUFDLEtBQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMvQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLENBQUMsQ0FBQztLQUNWLENBQUM7U0FDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNsQixLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztJQUdqQixPQUFPLFFBQVEsQ0FDYixTQUFTLEVBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQ25FLENBQUM7QUFDSixDQUFDO0FBRUQ7QUFDQTtTQUNnQixtQkFBbUIsQ0FDakMsSUFBVSxFQUNWLEtBQWEsRUFDYixtQkFBNEI7O0lBRTVCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDdEMsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDN0MsTUFBTSxDQUFDLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLE9BQU8sRUFBRSxJQUFJLGtDQUFPLElBQUksS0FBRSxLQUFLLEVBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDaEU7YUFBTTtZQUNMLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUN4RDtLQUNGO0lBRUQsTUFBTSxrQkFBa0IsR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FDOUMsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FDMUIsQ0FBQztJQUNGLElBQUksa0JBQWtCLEVBQUU7UUFDdEIsT0FBTztZQUNMLElBQUksa0NBQU8sSUFBSSxLQUFFLFlBQVksRUFBRSxrQkFBa0IsR0FBRTtZQUNuRCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQztLQUNIO0lBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtRQUNwQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FDeEQ7SUFFRCxNQUFNLG9CQUFvQixHQUFHLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUNoRCxhQUFhLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUN4QixDQUFDO0lBQ0YsSUFBSSxvQkFBb0IsRUFBRTtRQUN4QixPQUFPO1lBQ0wsSUFBSSxrQ0FBTyxJQUFJLEtBQUUsWUFBWSxFQUFFLG9CQUFvQixHQUFFO1lBQ3JELEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDO0tBQ0g7SUFFRCxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDdEMsQ0FBQztTQUVlLDBCQUEwQixDQUN4QyxZQUEwQixFQUMxQixLQUFhLEVBQ2IsR0FBVztJQUVYLE1BQU0sbUJBQW1CLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDO0lBRW5FLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxNQUF5QyxLQUNqRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHO1FBQ1osR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1FBQzdDLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDO1FBQ2xELEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztLQUMvQyxDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDaEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLG1CQUFtQixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUM5RCxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7U0FDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDVCxNQUFNLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxNQUFNLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsQ0FBQyxLQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxLQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZDLE9BQU8sQ0FBQyxDQUFDLEtBQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMvQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLENBQUMsQ0FBQztLQUNWLENBQUM7U0FDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNsQixLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztJQUdqQixPQUFPLFFBQVEsQ0FDYixTQUFTLEVBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQ25FLENBQUM7QUFDSjs7U0MzTGdCLEtBQUssQ0FBQyxJQUFZO0lBQ2hDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZEOztBQ1hBLFNBQVMsTUFBTSxDQUFDLEtBQWE7OztJQUczQixPQUFPLEtBQUs7U0FDVCxPQUFPLENBQUMsS0FBSyxFQUFFLDhCQUE4QixDQUFDO1NBQzlDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQywrQkFBK0IsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsS0FBYTs7O0lBRzdCLE9BQU8sS0FBSztTQUNULE9BQU8sQ0FBQyxPQUFPLEVBQUUsOEJBQThCLENBQUM7U0FDaEQsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7U0FDckIsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7U0FDckIsT0FBTyxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxJQUFZLEVBQUUsU0FBMEI7SUFDMUQsTUFBTSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRSxPQUFPO1FBQ0wsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDdEIsV0FBVztRQUNYLE9BQU87S0FDUixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLElBQVUsRUFBRSxTQUEwQjtJQUN4RCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUN0QyxPQUFPLFlBQVksQ0FBQztLQUNyQjtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ2pCLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDL0Q7SUFDRCxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUMzRCxTQUFTLENBQUMsS0FBSyxDQUNoQixDQUFDO0FBQ0osQ0FBQztNQUVZLDRCQUE0QjtJQVV2QyxZQUFZLEdBQVEsRUFBRSxLQUFlLEVBQUUsU0FBMEI7UUFUekQsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQVV6QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQTRCLENBQUM7UUFDaEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7S0FDNUI7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUM7SUFFRCxNQUFNLENBQUMsS0FBZSxFQUFFLFNBQTBCO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0tBQzVCO0lBRWEsU0FBUyxDQUFDLElBQVk7O1lBQ2xDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7a0JBQ3hCLE1BQU1DLGdCQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7a0JBQzVCLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QyxPQUFPLFFBQVE7aUJBQ1osS0FBSyxDQUFDLFNBQVMsQ0FBQztpQkFDaEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQixHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUM5QztLQUFBO0lBRUssa0JBQWtCOztZQUN0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFbEIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUM3QixJQUFJO29CQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQztnQkFBQyxPQUFPLENBQUMsRUFBRTs7b0JBRVYsSUFBSUMsZUFBTSxDQUNSLGtCQUFrQixJQUFJLHdDQUF3QyxDQUFDLEVBQUUsRUFDakUsQ0FBQyxDQUNGLENBQUM7aUJBQ0g7YUFDRjtZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QztLQUFBO0lBRUsscUJBQXFCLENBQ3pCLElBQVUsRUFDVixjQUFzQjs7WUFFdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQ2pDLGNBQWMsRUFDZCxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQ3hDLENBQUM7U0FDSDtLQUFBO0lBRU8sT0FBTyxDQUFDLElBQVU7O1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQ3JELENBQUM7S0FDSDtJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0tBQzlCOzs7TUN4SFUsdUJBQXVCO0lBSWxDLFlBQ1UsR0FBUSxFQUNSLFNBQW9CLEVBQ3BCLFNBQW9CO1FBRnBCLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFDUixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFOdEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztLQU92QjtJQUVFLFlBQVksQ0FBQyxXQUFvQjs7WUFDckMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWxCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE9BQU87YUFDUjtZQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsT0FBTzthQUNSO1lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVM7aUJBQ2hDLFFBQVEsQ0FDUCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDeEU7aUJBQ0EsSUFBSSxFQUFFLENBQUM7WUFFVixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxNQUFNLE1BQU0sR0FBRyxXQUFXO2tCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO2tCQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssWUFBWSxDQUFDO2lCQUNqQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU07Z0JBQ1gsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pFO0tBQUE7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztLQUM5Qjs7O01DOUNVLHdCQUF3QjtJQUluQyxZQUFvQixHQUFRLEVBQVUsU0FBb0I7UUFBdEMsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFIbEQsVUFBSyxHQUFXLEVBQUUsQ0FBQztLQUdtQztJQUU5RCxZQUFZOztRQUNWLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixNQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSzthQUM3QyxnQkFBZ0IsRUFBRTthQUNsQixHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ0wsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLE9BQU8sR0FDWCxDQUFDLENBQUMsUUFBUSxLQUFLLGNBQWM7a0JBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztrQkFDNUIsQ0FBQyxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE9BQU87Z0JBQ0wsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRO2dCQUNqQixPQUFPO2dCQUNQLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDbkIsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVMLE1BQU0sMkJBQTJCLEdBQUcsSUFBSSxDQUFDLFNBQVM7YUFDL0Msa0JBQWtCLEVBQUU7YUFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSTtZQUNSLE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxNQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssY0FBYyxHQUFHLFNBQVMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsT0FBTztnQkFDUCxXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcseUJBQXlCLEVBQUUsR0FBRywyQkFBMkIsQ0FBQyxDQUFDO1FBQzVFLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlELE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQ3JELENBQUM7U0FDSDtLQUNGO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7S0FDOUI7OztNQzVDVSxhQUFhO0lBU3hCLFlBQTZCLElBQVUsRUFBVyxPQUFnQjtRQUFyQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVcsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoRSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQztJQUVELE9BQU8sUUFBUSxDQUFDLElBQVk7UUFDMUIsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBRSxDQUFDO0tBQzVEO0lBRUQsT0FBTyxNQUFNO1FBQ1gsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDO0tBQzlCOztBQWxCdUIscUJBQU8sR0FBb0IsRUFBRSxDQUFDO0FBRXRDLG9CQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ25ELHFCQUFPLEdBQUcsSUFBSSxhQUFhLENBQ3pDLFNBQVMsRUFDVCwwQkFBMEIsQ0FDM0I7O01DTlUsMkJBQTJCO0lBd0J0QyxZQUNXLElBQVUsRUFDVixPQUFnQixFQUNoQixXQUFvQjtRQUZwQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FBUztRQUU3QiwyQkFBMkIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hEO0lBRUQsT0FBTyxRQUFRLENBQUMsSUFBWTtRQUMxQixPQUFPLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUUsQ0FBQztLQUMxRTtJQUVELE9BQU8sTUFBTTtRQUNYLE9BQU8sMkJBQTJCLENBQUMsT0FBTyxDQUFDO0tBQzVDOztBQXJDdUIsbUNBQU8sR0FBa0MsRUFBRSxDQUFDO0FBRXBELGdDQUFJLEdBQUcsSUFBSSwyQkFBMkIsQ0FDcEQsTUFBTSxFQUNOLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQzVCLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQzdCLENBQUM7QUFDYywrQkFBRyxHQUFHLElBQUksMkJBQTJCLENBQ25ELGdCQUFnQixFQUNoQixFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUM3QixFQUFFLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FDckMsQ0FBQztBQUNjLGlDQUFLLEdBQUcsSUFBSSwyQkFBMkIsQ0FDckQsd0JBQXdCLEVBQ3hCLEVBQUUsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUNoQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FDakMsQ0FBQztBQUNjLCtCQUFHLEdBQUcsSUFBSSwyQkFBMkIsQ0FDbkQsd0JBQXdCLEVBQ3hCLEVBQUUsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUNoQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FDakM7O01DaENVLGVBQWU7SUFPMUIsWUFBNkIsSUFBWSxFQUFXLEtBQWdCO1FBQXZDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVyxVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQ2xFLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsT0FBTyxRQUFRLENBQUMsSUFBWTtRQUMxQixPQUFPLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFFLENBQUM7S0FDOUQ7SUFFRCxPQUFPLE1BQU07UUFDWCxPQUFPLGVBQWUsQ0FBQyxPQUFPLENBQUM7S0FDaEM7O0FBaEJ1Qix1QkFBTyxHQUFzQixFQUFFLENBQUM7QUFFeEMsbUJBQUcsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkMscUJBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDMUMsb0JBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDOztNQ0M1QyxtQkFBbUI7SUF3QjlCLFlBQTZCLElBQVUsRUFBVyxPQUFnQjtRQUFyQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVcsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoRSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsT0FBTyxRQUFRLENBQUMsSUFBWTtRQUMxQixPQUFPLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUUsQ0FBQztLQUNsRTtJQUVELE9BQU8sTUFBTTtRQUNYLE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDO0tBQ3BDOztBQWpDdUIsMkJBQU8sR0FBMEIsRUFBRSxDQUFDO0FBRTVDLHlCQUFLLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7SUFDdkQsU0FBUyxFQUFFLEVBQUU7SUFDYixHQUFHLEVBQUUsT0FBTztDQUNiLENBQUMsQ0FBQztBQUNhLHVCQUFHLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUU7SUFDbkQsU0FBUyxFQUFFLEVBQUU7SUFDYixHQUFHLEVBQUUsS0FBSztDQUNYLENBQUMsQ0FBQztBQUNhLDZCQUFTLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRTtJQUNwRSxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDbEIsR0FBRyxFQUFFLE9BQU87Q0FDYixDQUFDLENBQUM7QUFDYSw2QkFBUyxHQUFHLElBQUksbUJBQW1CLENBQUMsV0FBVyxFQUFFO0lBQy9ELFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNsQixHQUFHLEVBQUUsT0FBTztDQUNiLENBQUMsQ0FBQztBQUNhLCtCQUFXLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxhQUFhLEVBQUU7SUFDbkUsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3BCLEdBQUcsRUFBRSxPQUFPO0NBQ2IsQ0FBQzs7TUNlUyxtQkFDWCxTQUFRQyxzQkFBbUI7SUE4QjNCLFlBQ0UsR0FBUSxFQUNSLHlCQUF1RDtRQUV2RCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFSYix1QkFBa0IsR0FBeUIsRUFBRSxDQUFDO1FBUzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLHlCQUF5QixDQUFDO0tBQy9EO0lBRUQsZUFBZTtRQUNiLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzFCLE9BQU87U0FDUjs7UUFHRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakQ7SUFFRCxPQUFhLEdBQUcsQ0FBQyxHQUFRLEVBQUUsUUFBa0I7O1lBQzNDLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQW1CLENBQ2pDLEdBQUcsRUFDSCxJQUFJLDRCQUE0QixDQUM5QixHQUFHLEVBQ0gsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQzNELGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUNuRCxDQUNGLENBQUM7WUFFRixNQUFNLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkMsTUFBTSxHQUFHLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUUxQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFPLENBQUM7Z0JBQ2xELE1BQU0sR0FBRyxDQUFDLHdCQUF3QixFQUFFLENBQUM7YUFDdEMsQ0FBQSxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ3hDLG9CQUFvQixFQUNwQixDQUFPLENBQUM7Z0JBQ04sTUFBTSxHQUFHLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFDckMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLENBQUM7YUFDakMsQ0FBQSxDQUNGLENBQUM7O1lBRUYsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hELEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO2dCQUNoQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNoRCxDQUFDLENBQUM7WUFFSCxPQUFPLEdBQUcsQ0FBQztTQUNaO0tBQUE7SUFFRCxtQkFBbUI7UUFDakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPO1NBQ1I7UUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVM7YUFDaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3pELElBQUksRUFBRSxDQUFDO1FBQ1YsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUzthQUM1QixRQUFRLENBQ1AsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FDeEU7YUFDQSxPQUFPLEVBQUU7YUFDVCxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ1IsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTO2lCQUN4QixRQUFRLENBQ1AsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3hELEVBQUUsRUFBRSxDQUFDO2FBQ04sQ0FBQyxDQUNIO2lCQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTztTQUNSO1FBRUQsTUFBTSxDQUFDLFlBQVksQ0FDakIsVUFBVSxFQUNWLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUMxRCxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQ3JDLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDdEI7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7S0FDckQ7O0lBR0QsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMxRDtJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQzVEO0lBRUQsSUFBSSxrQkFBa0I7UUFDcEIsUUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLDhCQUE4QjtZQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQ3ZDO0tBQ0g7O0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTztZQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCO1lBQzVELGdCQUFnQixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxrQkFBa0I7WUFDdEUsWUFBWSxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxrQkFBa0I7U0FDL0QsQ0FBQztLQUNIO0lBRUssY0FBYyxDQUFDLFFBQWtCOztZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxDQUN0QyxRQUFRLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDM0QsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQ25ELENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSx1QkFBdUIsQ0FDeEQsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FBQztZQUNGLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksd0JBQXdCLENBQzFELElBQUksQ0FBQyxHQUFHLEVBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FDZixDQUFDO1lBQ0YsTUFBTSxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsc0JBQXNCLEdBQUdDLGlCQUFRLENBQ3BDLENBQUMsT0FBNkIsRUFBRSxFQUEyQjtnQkFDekQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUVoQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUztxQkFDekIsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztxQkFDaEMsTUFBTSxDQUNMLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsR0FBRyxDQUFDLEdBQUcsQ0FBQztvQkFDbkQsRUFBRSxDQUFDLE1BQU07b0JBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGtCQUFrQjtvQkFDeEMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FDeEI7cUJBQ0EsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUNMLElBQUksQ0FBQyxhQUFhO3FCQUNmLE9BQU8sQ0FDTixJQUFJLENBQUMsWUFBWSxFQUNqQixDQUFDLENBQUMsSUFBSSxFQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQ3JDO3FCQUNBLEdBQUcsQ0FBQyxDQUFDLElBQUksc0NBQVcsSUFBSSxLQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFHLENBQUMsQ0FDbEQ7cUJBQ0EsSUFBSSxFQUFFLENBQUM7Z0JBRVYsRUFBRSxDQUNBLFFBQVEsQ0FDTixLQUFLLEVBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQ25FLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQ2pELENBQUM7Z0JBRUYsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7YUFDakUsRUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUMvQixJQUFJLENBQ0wsQ0FBQztZQUVGLElBQUksQ0FBQyxhQUFhLEdBQUdBLGlCQUFRLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNkLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUV6QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7S0FBQTtJQUVPLGVBQWU7O1FBRXJCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRTdCLE1BQU0sMkJBQTJCLEdBQUcsMkJBQTJCLENBQUMsUUFBUSxDQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUNwRCxDQUFDO1FBQ0YsSUFBSSwyQkFBMkIsS0FBSywyQkFBMkIsQ0FBQyxJQUFJLEVBQUU7WUFDcEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2pCLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQzdDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQ3ZDO2dCQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQ2pDLElBQUksQ0FDTCxDQUFDO2dCQUNGLE9BQU8sS0FBSyxDQUFDO2FBQ2QsQ0FDRixFQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQiwyQkFBMkIsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUNqRCwyQkFBMkIsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUMzQztnQkFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUNqQyxJQUFJLENBQ0wsQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQzthQUNkLENBQ0YsQ0FDRixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxDQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUNuQyxDQUFDO1FBQ0YsSUFBSSxtQkFBbUIsS0FBSyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUU7WUFDckQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2pCLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUMzQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFDckM7Z0JBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sSUFBSSxDQUFDO2FBQ2IsQ0FDRixDQUNGLENBQUM7U0FDSDtRQUNELElBQUksbUJBQW1CLEtBQUssbUJBQW1CLENBQUMsR0FBRyxFQUFFO1lBQ25ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQixtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDekMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQ25DO2dCQUNFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLElBQUksQ0FBQzthQUNiLENBQ0YsQ0FDRixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDakIsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDckMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFDL0I7WUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNkLENBQ0YsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssUUFBUSxDQUFFLENBQUMsSUFBSSxHQUFHO1lBQ3RELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7U0FDbkMsQ0FBQztLQUNIO0lBRUssd0JBQXdCOztZQUM1QixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFlBQVksQ0FDZixvQ0FBb0MsRUFDcEMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FDMUIsQ0FBQztnQkFDRixPQUFPO2FBQ1I7WUFFRCxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsNENBQTRDLENBQzNELENBQUM7WUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLDJCQUEyQixFQUFFLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUMzRTtLQUFBO0lBRUssNkJBQTZCOztZQUNqQyxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFlBQVksQ0FDZix3Q0FBd0MsRUFDeEMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FDMUIsQ0FBQztnQkFDRixPQUFPO2FBQ1I7WUFFRCxNQUFNLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzdELElBQUksQ0FBQyxZQUFZLENBQ2YsZ0NBQWdDLEVBQ2hDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQzFCLENBQUM7U0FDSDtLQUFBO0lBRUQseUJBQXlCO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtZQUMvQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FDZixvQ0FBb0MsRUFDcEMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FDMUIsQ0FBQztZQUNGLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLDRCQUE0QixFQUFFLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztLQUM1RTtJQUVELFNBQVMsQ0FDUCxNQUFzQixFQUN0QixNQUFjLEVBQ2QsSUFBVzs7UUFFWCxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFaEMsSUFDRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCO1lBQ3RDLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDWixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQ2pCO1lBQ0EsSUFBSSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsNkJBQTZCO1lBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3hCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDakI7WUFDQSxJQUFJLENBQUMsWUFBWSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDcEQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sc0JBQXNCLEdBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUVyRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDM0UsTUFBTSxZQUFZLEdBQ2hCLE1BQUEsU0FBUyxDQUNQLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0I7Y0FDckQsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QjtjQUN6RCxDQUFDLENBQ04sMENBQUUsSUFBSSxDQUFDO1FBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQywrQkFBK0IsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUMxRSxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsTUFBTSwrQkFBK0IsR0FDbkMsTUFBQSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLG1DQUFJLEVBQUUsQ0FBQztRQUNqRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsRUFBRTtZQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUNmLDBFQUEwRSxDQUMzRSxDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQ0UsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUM1RDtZQUNBLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQ2YsNkRBQTZELENBQzlELENBQUM7WUFDRixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDakQsSUFBSSxDQUFDLFlBQVksQ0FDZixvRkFBb0YsQ0FDckYsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLFlBQVksQ0FDZiw0REFBNEQsQ0FDN0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7O1FBR3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ3RELE9BQU87WUFDTCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBQSxNQUFBLE1BQUEsU0FBUyxDQUFDLElBQUksRUFBRSwwQ0FBRSxJQUFJLDBDQUFFLE1BQU0sbUNBQUksQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7YUFDbEI7WUFDRCxHQUFHLEVBQUUsTUFBTTtZQUNYLEtBQUssRUFBRSxZQUFZO1NBQ3BCLENBQUM7S0FDSDtJQUVELGNBQWMsQ0FBQyxPQUE2QjtRQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTztZQUN6QixJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSztnQkFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hCLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNKO0lBRUQsZ0JBQWdCLENBQUMsSUFBVSxFQUFFLEVBQWU7UUFDMUMsTUFBTSxJQUFJLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSTtnQkFDRixJQUFJLENBQUMsUUFBUSxDQUFDLDRCQUE0QixJQUFJLElBQUksQ0FBQyxZQUFZO3NCQUMzRCxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSTtzQkFDeEMsS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2IsSUFBSSxFQUNGLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCO2dCQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUM7a0JBQ2xELEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07a0JBQy9ELElBQUk7U0FDWCxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDYixHQUFHLEVBQUUsMkNBQTJDO2dCQUNoRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO2FBQzVCLENBQUMsQ0FBQztTQUNKO1FBRUQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QjtJQUVELGdCQUFnQixDQUFDLElBQVUsRUFBRSxHQUErQjtRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixZQUFZO2dCQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsNEJBQTRCLElBQUksSUFBSSxDQUFDLFlBQVk7c0JBQzNELEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUk7c0JBQzFDLEtBQUssWUFBWSxJQUFJLENBQUM7U0FDN0I7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUU7WUFDdkMsWUFBWSxHQUFHLEdBQUcsWUFBWSxHQUFHLENBQUM7U0FDbkM7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUU7WUFDM0MsWUFBWSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQ3ZDLEVBQUUsQ0FDSCxDQUFDO1NBQ0g7UUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDO1FBQy9ELE1BQU0sY0FBYyxHQUFHLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksY0FBYyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoRDtRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxZQUFZLENBQ2pCLFlBQVksa0NBRVAsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQ3JCLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFPLEtBRXhDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNqQixDQUFDO1FBRUYsSUFBSSxjQUFjLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekIsTUFBTSxDQUFDLFNBQVMsQ0FDZCxNQUFNLENBQUMsV0FBVyxDQUNoQixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDcEMsWUFBWSxDQUFDLE1BQU07Z0JBQ25CLGNBQWMsQ0FDakIsQ0FDRixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDdEI7SUFFTyxZQUFZLENBQUMsT0FBZSxFQUFFLElBQWE7UUFDakQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGdDQUFnQyxFQUFFO1lBQ2xELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwRDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RCO1NBQ0Y7S0FDRjs7O0FDaGlCSSxNQUFNLGdCQUFnQixHQUFhOztJQUV4QyxRQUFRLEVBQUUsU0FBUztJQUNuQixhQUFhLEVBQUUsUUFBUTtJQUV2QixzQkFBc0IsRUFBRSxDQUFDO0lBQ3pCLHdCQUF3QixFQUFFLENBQUM7SUFDM0IsOEJBQThCLEVBQUUsQ0FBQztJQUNqQywrQkFBK0IsRUFBRSxDQUFDO0lBQ2xDLHVCQUF1QixFQUFFLElBQUk7SUFDN0IsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQiw2QkFBNkIsRUFBRSxLQUFLO0lBQ3BDLHFCQUFxQixFQUFFLElBQUk7O0lBRzNCLG9CQUFvQixFQUFFLE9BQU87SUFDN0IscUNBQXFDLEVBQUUsTUFBTTtJQUM3QyxZQUFZLEVBQUUsS0FBSzs7SUFHbkIsMkJBQTJCLEVBQUUsSUFBSTtJQUNqQyw0Q0FBNEMsRUFBRSxLQUFLOztJQUduRCxnQ0FBZ0MsRUFBRSxLQUFLO0lBQ3ZDLHFCQUFxQixFQUFFLCtHQUErRztJQUN0SSxlQUFlLEVBQUUsS0FBSztJQUN0Qix5QkFBeUIsRUFBRSxFQUFFO0lBQzdCLGtDQUFrQyxFQUFFLEVBQUU7O0lBR3RDLDRCQUE0QixFQUFFLElBQUk7SUFDbEMsNEJBQTRCLEVBQUUsS0FBSzs7SUFHbkMsZ0NBQWdDLEVBQUUsS0FBSztDQUN4QyxDQUFDO01BRVcsNEJBQTZCLFNBQVFDLHlCQUFnQjtJQUdoRSxZQUFZLEdBQVEsRUFBRSxNQUF5QjtRQUM3QyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3RCO0lBRUQsT0FBTztRQUNMLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFM0IsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXBCLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdDQUFnQyxFQUFFLENBQUMsQ0FBQztRQUV2RSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLElBQUlDLGdCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsS0FDMUQsRUFBRTthQUNDLFVBQVUsQ0FDVCxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsc0NBQVcsQ0FBQyxLQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFHLEVBQ3RDLEVBQUUsQ0FDSCxDQUNGO2FBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUN2QyxRQUFRLENBQUMsQ0FBTyxLQUFLO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZELENBQUEsQ0FBQyxDQUNMLENBQUM7UUFFRixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsS0FDaEUsRUFBRTthQUNDLFVBQVUsQ0FDVCxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUMzQixDQUFDLENBQUMsRUFBRSxDQUFDLHNDQUFXLENBQUMsS0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBRyxFQUN0QyxFQUFFLENBQ0gsQ0FDRjthQUNBLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7YUFDNUMsUUFBUSxDQUFDLENBQU8sS0FBSztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEIsQ0FBQSxDQUFDLENBQ0wsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3JFLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUMxQixJQUFJLEVBQUUsd0RBQXdEO2dCQUM5RCxHQUFHLEVBQUUsd0NBQXdDO2FBQzlDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLDJCQUEyQixDQUFDO2FBQ3BDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FDWixFQUFFO2FBQ0MsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQzthQUNyRCxpQkFBaUIsRUFBRTthQUNuQixRQUFRLENBQUMsQ0FBTyxLQUFLO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztZQUNwRCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbEMsQ0FBQSxDQUFDLENBQ0wsQ0FBQztRQUVKLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQzthQUMxQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQ1osRUFBRTthQUNDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUM7YUFDdkQsaUJBQWlCLEVBQUU7YUFDbkIsUUFBUSxDQUFDLENBQU8sS0FBSztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7WUFDdEQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xDLENBQUEsQ0FBQyxDQUNMLENBQUM7UUFDSixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUF3QixHQUFHLENBQUMsRUFBRTtZQUNyRCxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDMUIsSUFBSSxFQUFFLCtCQUErQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsUUFBUTtnQkFDMUYsR0FBRyxFQUFFLHdDQUF3QzthQUM5QyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQzthQUMvQyxPQUFPLENBQUMsK0NBQStDLENBQUM7YUFDeEQsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUNaLEVBQUU7YUFDQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDO2FBQzdELGlCQUFpQixFQUFFO2FBQ25CLFFBQVEsQ0FBQyxDQUFPLEtBQUs7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsOEJBQThCLEdBQUcsS0FBSyxDQUFDO1lBQzVELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNsQyxDQUFBLENBQUMsQ0FDTCxDQUFDO1FBRUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLGlDQUFpQyxDQUFDO2FBQzFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FDWixFQUFFO2FBQ0MsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ25CLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQzthQUM5RCxpQkFBaUIsRUFBRTthQUNuQixRQUFRLENBQUMsQ0FBTyxLQUFLO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLCtCQUErQixHQUFHLEtBQUssQ0FBQztZQUM3RCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbEMsQ0FBQSxDQUFDLENBQ0wsQ0FBQztRQUVKLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQzthQUNuQyxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ1osRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FDaEUsQ0FBTyxLQUFLO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztnQkFDckQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ2xDLENBQUEsQ0FDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUwsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLGlDQUFpQyxDQUFDO2FBQzFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FDWixFQUFFO2FBQ0MsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO2FBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQzthQUNoRCxpQkFBaUIsRUFBRTthQUNuQixRQUFRLENBQUMsQ0FBTyxLQUFLO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMvQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbEMsQ0FBQSxDQUFDLENBQ0wsQ0FBQztRQUVKLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQzthQUM1QyxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ1osRUFBRSxDQUFDLFFBQVEsQ0FDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsQ0FDbkQsQ0FBQyxRQUFRLENBQUMsQ0FBTyxLQUFLO2dCQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsR0FBRyxLQUFLLENBQUM7Z0JBQzNELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNsQyxDQUFBLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVMLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQzthQUN4QyxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ1osRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FDOUQsQ0FBTyxLQUFLO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztnQkFDbkQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ2xDLENBQUEsQ0FDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUwsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBRTFELElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQzthQUNsQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEtBQ2QsRUFBRTthQUNDLFVBQVUsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQzthQUNuRCxRQUFRLENBQUMsQ0FBTyxLQUFLO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztZQUNsRCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbEMsQ0FBQSxDQUFDLENBQ0wsQ0FBQztRQUVKLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQywyQ0FBMkMsQ0FBQzthQUNwRCxXQUFXLENBQUMsQ0FBQyxFQUFFLEtBQ2QsRUFBRTthQUNDLFVBQVUsQ0FDVCwyQkFBMkIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQ3pDLENBQUMsQ0FBQyxFQUFFLENBQUMsc0NBQVcsQ0FBQyxLQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFHLEVBQ3RDLEVBQUUsQ0FDSCxDQUNGO2FBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUFDO2FBQ3BFLFFBQVEsQ0FBQyxDQUFPLEtBQUs7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMscUNBQXFDLEdBQUcsS0FBSyxDQUFDO1lBQ25FLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNsQyxDQUFBLENBQUMsQ0FDTCxDQUFDO1FBRUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLGVBQWUsQ0FBQzthQUN4QixPQUFPLENBQ04sd0hBQXdILENBQ3pIO2FBQ0EsU0FBUyxDQUFDLENBQUMsRUFBRTtZQUNaLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUNyRCxDQUFPLEtBQUs7Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ2xDLENBQUEsQ0FDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUwsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO1FBRWhFLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQzthQUN6QyxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ1osRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFFBQVEsQ0FDcEUsQ0FBTyxLQUFLO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQztnQkFDekQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEIsQ0FBQSxDQUNGLENBQUM7U0FDSCxDQUFDLENBQUM7UUFFTCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLDJCQUEyQixFQUFFO1lBQ3BELElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2lCQUNyQixPQUFPLENBQUMsb0RBQW9ELENBQUM7aUJBQzdELFNBQVMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1osRUFBRSxDQUFDLFFBQVEsQ0FDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyw0Q0FBNEMsQ0FDbEUsQ0FBQyxRQUFRLENBQUMsQ0FBTyxLQUFLO29CQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyw0Q0FBNEM7d0JBQy9ELEtBQUssQ0FBQztvQkFDUixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3ZELENBQUEsQ0FBQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBQ047UUFFRCxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSw4QkFBOEIsRUFBRSxDQUFDLENBQUM7UUFFckUsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLHFDQUFxQyxDQUFDO2FBQzlDLFNBQVMsQ0FBQyxDQUFDLEVBQUU7WUFDWixFQUFFLENBQUMsUUFBUSxDQUNULElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGdDQUFnQyxDQUN0RCxDQUFDLFFBQVEsQ0FBQyxDQUFPLEtBQUs7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGdDQUFnQyxHQUFHLEtBQUssQ0FBQztnQkFDOUQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQixDQUFBLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVMLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLEVBQUU7WUFDekQsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7aUJBQ3JCLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztpQkFDbEMsT0FBTyxDQUNOLHNFQUFzRSxDQUN2RTtpQkFDQSxXQUFXLENBQUMsQ0FBQyxHQUFHO2dCQUNmLE1BQU0sRUFBRSxHQUFHLEdBQUc7cUJBQ1gsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDO3FCQUNwRCxjQUFjLENBQUMsZUFBZSxDQUFDO3FCQUMvQixRQUFRLENBQUMsQ0FBTyxLQUFLO29CQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7b0JBQ25ELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDbEMsQ0FBQSxDQUFDLENBQUM7Z0JBQ0wsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTO29CQUNsQix3REFBd0QsQ0FBQztnQkFDM0QsT0FBTyxFQUFFLENBQUM7YUFDWCxDQUFDLENBQUM7WUFFTCxJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsS0FDbEUsRUFBRTtpQkFDQyxVQUFVLENBQ1QsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQ0FBVyxDQUFDLEtBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUcsRUFDdEMsRUFBRSxDQUNILENBQ0Y7aUJBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztpQkFDOUMsUUFBUSxDQUFDLENBQU8sS0FBSztnQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztnQkFDN0MsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ2xDLENBQUEsQ0FBQyxDQUNMLENBQUM7WUFFRixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQztpQkFDckIsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO2lCQUN6QyxPQUFPLENBQ04sNkZBQTZGLENBQzlGO2lCQUNBLE9BQU8sQ0FBQyxDQUFDLEVBQUU7Z0JBQ1YsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLFFBQVEsQ0FDbEUsQ0FBTyxLQUFLO29CQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQztvQkFDdkQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNsQyxDQUFBLENBQ0YsQ0FBQzthQUNILENBQUMsQ0FBQztZQUVMLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2lCQUNyQixPQUFPLENBQUMsd0NBQXdDLENBQUM7aUJBQ2pELE9BQU8sQ0FDTixzSkFBc0osQ0FDdko7aUJBQ0EsT0FBTyxDQUFDLENBQUMsRUFBRTtnQkFDVixFQUFFLENBQUMsUUFBUSxDQUNULElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUN4RCxDQUFDLFFBQVEsQ0FBQyxDQUFPLEtBQUs7b0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxHQUFHLEtBQUssQ0FBQztvQkFDaEUsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNsQyxDQUFBLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztTQUNOO1FBRUQsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQzthQUMxQyxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ1osRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLFFBQVEsQ0FDckUsQ0FBTyxLQUFLO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLDRCQUE0QixHQUFHLEtBQUssQ0FBQztnQkFDMUQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3hELENBQUEsQ0FDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUwsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtZQUNyRCxJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQztpQkFDckIsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2lCQUNoQyxTQUFTLENBQUMsQ0FBQyxFQUFFO2dCQUNaLEVBQUUsQ0FBQyxRQUFRLENBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQ2xELENBQUMsUUFBUSxDQUFDLENBQU8sS0FBSztvQkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsNEJBQTRCLEdBQUcsS0FBSyxDQUFDO29CQUMxRCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ2xDLENBQUEsQ0FBQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBQ047UUFFRCxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQzthQUNsRCxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ1osRUFBRSxDQUFDLFFBQVEsQ0FDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQ0FBZ0MsQ0FDdEQsQ0FBQyxRQUFRLENBQUMsQ0FBTyxLQUFLO2dCQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQ0FBZ0MsR0FBRyxLQUFLLENBQUM7Z0JBQzlELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNsQyxDQUFBLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNOO0lBRUssbUJBQW1COztZQUN2QixRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWE7Z0JBQ3hDLEtBQUssUUFBUTtvQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO29CQUMvQyxNQUFNO2dCQUNSLEtBQUssU0FBUztvQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO29CQUM5QyxNQUFNO2dCQUNSOztvQkFFRSxJQUFJSixlQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNuQztZQUNELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNsQztLQUFBO0lBRUssNkJBQTZCOztZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUI7Z0JBQzFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUM7WUFDaEQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xDO0tBQUE7SUFFRCw2QkFBNkI7UUFDM0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUNuQjtZQUNFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPO1lBQ3JDLE1BQU0sRUFBRyxJQUFJLENBQUMsR0FBVyxDQUFDLFFBQVE7WUFDbEMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtTQUMvQixFQUNELElBQUksRUFDSixDQUFDLENBQ0YsQ0FBQztLQUNIOzs7TUN0Y1UsaUNBQWtDLFNBQVFLLGNBQUs7SUFTMUQsWUFDRSxHQUFRLEVBQ1IsZUFBeUIsRUFDekIsZUFBdUIsRUFBRSxFQUN6QixVQUF3RDtRQUV4RCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMscUJBQXFCLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBRTFCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFFMUQsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUMzQixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJQywwQkFBaUIsQ0FBQyxTQUFTLENBQUM7YUFDN0IsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDaEQsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7U0FDaEMsQ0FBQyxDQUFDO1FBRUwsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUlDLDBCQUFpQixDQUFDLFNBQVMsQ0FBQzthQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNwQixRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxFQUFFO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDdEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN6QjtTQUNGLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVwRSxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELElBQUlDLHNCQUFhLENBQUMsU0FBUyxDQUFDO2FBQ3pCLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztTQUN0QixDQUFDO2FBQ0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVyRCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7UUFDOUQsSUFBSUQsMEJBQWlCLENBQUMsU0FBUyxDQUFDO2FBQzdCLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUIsQ0FBQzthQUNELE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJRSx3QkFBZSxDQUMvQixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUN4QixJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLDBEQUEwRDthQUNsRTtTQUNGLENBQUMsQ0FDSDthQUNFLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQzthQUNsQyxNQUFNLEVBQUU7YUFDUixXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3hCLE9BQU8sQ0FBQztZQUNQLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUN6QjtLQUNGOzs7TUNsRmtCLGlCQUFrQixTQUFRQyxlQUFNO0lBTW5ELFFBQVE7UUFDTixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUM3QjtJQUVLLE1BQU07O1lBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUk7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFFO29CQUNsQyxPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQ2hCLElBQUk7cUJBQ0QsUUFBUSxDQUFDLDBCQUEwQixDQUFDO3FCQUNwQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7cUJBQ3pCLE9BQU8sQ0FBQztvQkFDUCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztpQkFDbEMsQ0FBQyxDQUNMLENBQUM7YUFDSCxDQUFDLENBQ0gsQ0FBQztZQUVGLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRTFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNkLEVBQUUsRUFBRSw0QkFBNEI7Z0JBQ2hDLElBQUksRUFBRSw0QkFBNEI7Z0JBQ2xDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDcEQsUUFBUSxFQUFFO29CQUNSLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7O29CQUV0QyxJQUFJVixlQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQztpQkFDakQsQ0FBQTthQUNGLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2QsRUFBRSxFQUFFLHVCQUF1QjtnQkFDM0IsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsUUFBUSxFQUFFO29CQUNSLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2lCQUM3QyxDQUFBO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDZCxFQUFFLEVBQUUsaUNBQWlDO2dCQUNyQyxJQUFJLEVBQUUsaUNBQWlDO2dCQUN2QyxRQUFRLEVBQUU7b0JBQ1IsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLDZCQUE2QixFQUFFLENBQUM7aUJBQ3ZELENBQUE7YUFDRixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNkLEVBQUUsRUFBRSxrQkFBa0I7Z0JBQ3RCLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUMzQyxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDbEMsQ0FBQTthQUNGLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2QsRUFBRSxFQUFFLDRCQUE0QjtnQkFDaEMsSUFBSSxFQUFFLG1DQUFtQztnQkFDekMsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNwRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7aUJBQ2xDLENBQUE7YUFDRixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNkLEVBQUUsRUFBRSx5QkFBeUI7Z0JBQzdCLElBQUksRUFBRSx3QkFBd0I7Z0JBQzlCLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUM3QyxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2lCQUN0QyxDQUFBO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDZCxFQUFFLEVBQUUsc0JBQXNCO2dCQUMxQixJQUFJLEVBQUUsc0JBQXNCO2dCQUM1QixRQUFRLEVBQUU7b0JBQ1IsTUFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsRUFBRSxDQUNoRCxDQUFDO29CQUNGLElBQUlBLGVBQU0sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO2lCQUNwRCxDQUFBO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7S0FBQTtJQUVLLFlBQVk7O1lBQ2hCLElBQUksQ0FBQyxRQUFRLG1DQUFRLGdCQUFnQixJQUFNLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFHLENBQUM7U0FDckU7S0FBQTtJQUVLLFlBQVksQ0FDaEIsbUJBSUksRUFBRTs7WUFFTixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELElBQUksZ0JBQWdCLENBQUMsV0FBVyxFQUFFO2dCQUNoQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUUsQ0FBQzthQUNqRDtZQUNELElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3JDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO2FBQ3REO1lBQ0QsSUFBSSxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO2FBQ2xEO1NBQ0Y7S0FBQTtJQUVLLHdCQUF3Qjs7WUFDNUIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFLENBQUM7U0FDdEQ7S0FBQTtJQUVELHlCQUF5QjtRQUN2QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsNEJBQTRCLENBQUM7UUFDN0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQ0FBaUMsQ0FDakQsSUFBSSxDQUFDLEdBQUcsRUFDUixRQUFRLENBQUMsYUFBYSxFQUN0QixZQUFZLEVBQ1osQ0FBTyxjQUFjLEVBQUUsSUFBSTtZQUN6QixJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNwQyxJQUFJQSxlQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsT0FBTzthQUNSO1lBRUQsTUFBTSxRQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQzNELElBQUlBLGVBQU0sQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNmLENBQUEsQ0FDRixDQUFDO1FBRUYsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWIsSUFBSSxZQUFZLEVBQUU7WUFDaEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7YUFBTTtZQUNMLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3BDO0tBQ0Y7Ozs7OyJ9
