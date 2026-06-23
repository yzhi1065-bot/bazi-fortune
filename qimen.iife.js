"use strict";
var QiMen = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/qimen/index.js
  var qimen_exports = {};
  __export(qimen_exports, {
    calcChangSheng: () => calcChangSheng,
    calcPan: () => calcPan,
    formatPan: () => formatPan,
    getKeYing: () => getKeYing
  });

  // src/qimen/data.js
  var TIAN_GAN = ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"];
  var DI_ZHI = ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"];
  var SHI_CHEN = [
    { name: "\u5B50\u65F6", zhi: "\u5B50", index: 0, hours: [23, 0] },
    // 23:00-00:59
    { name: "\u4E11\u65F6", zhi: "\u4E11", index: 1, hours: [1, 2] },
    { name: "\u5BC5\u65F6", zhi: "\u5BC5", index: 2, hours: [3, 4] },
    { name: "\u536F\u65F6", zhi: "\u536F", index: 3, hours: [5, 6] },
    { name: "\u8FB0\u65F6", zhi: "\u8FB0", index: 4, hours: [7, 8] },
    { name: "\u5DF3\u65F6", zhi: "\u5DF3", index: 5, hours: [9, 10] },
    { name: "\u5348\u65F6", zhi: "\u5348", index: 6, hours: [11, 12] },
    { name: "\u672A\u65F6", zhi: "\u672A", index: 7, hours: [13, 14] },
    { name: "\u7533\u65F6", zhi: "\u7533", index: 8, hours: [15, 16] },
    { name: "\u9149\u65F6", zhi: "\u9149", index: 9, hours: [17, 18] },
    { name: "\u620C\u65F6", zhi: "\u620C", index: 10, hours: [19, 20] },
    { name: "\u4EA5\u65F6", zhi: "\u4EA5", index: 11, hours: [21, 22] }
  ];
  function getHourShiChen(hour24) {
    for (const sc of SHI_CHEN) {
      if (sc.hours.includes(hour24)) return sc;
    }
    return SHI_CHEN[0];
  }
  var LO_SHU = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];
  var PALACE_INFO = {
    1: { name: "\u574E", direction: "\u5317", wuXing: "\u6C34", isZheng: true },
    2: { name: "\u5764", direction: "\u897F\u5357", wuXing: "\u571F", isZheng: false },
    3: { name: "\u9707", direction: "\u4E1C", wuXing: "\u6728", isZheng: true },
    4: { name: "\u5DFD", direction: "\u4E1C\u5357", wuXing: "\u6728", isZheng: false },
    5: { name: "\u4E2D", direction: "\u4E2D", wuXing: "\u571F", isZheng: false },
    6: { name: "\u4E7E", direction: "\u897F\u5317", wuXing: "\u91D1", isZheng: false },
    7: { name: "\u5151", direction: "\u897F", wuXing: "\u91D1", isZheng: true },
    8: { name: "\u826E", direction: "\u4E1C\u5317", wuXing: "\u571F", isZheng: false },
    9: { name: "\u79BB", direction: "\u5357", wuXing: "\u706B", isZheng: true }
  };
  var STARS = {
    1: "\u5929\u84EC",
    2: "\u5929\u82AE",
    3: "\u5929\u51B2",
    4: "\u5929\u8F85",
    5: "\u5929\u79BD",
    6: "\u5929\u5FC3",
    7: "\u5929\u67F1",
    8: "\u5929\u4EFB",
    9: "\u5929\u82F1"
  };
  var DOORS_MAP = {
    1: "\u4F11",
    2: "\u6B7B",
    3: "\u4F24",
    4: "\u675C",
    6: "\u5F00",
    7: "\u60CA",
    8: "\u751F",
    9: "\u666F"
  };
  var DOOR_WU_XING = {
    "\u4F11": "\u6C34",
    "\u6B7B": "\u571F",
    "\u4F24": "\u6728",
    "\u675C": "\u6728",
    "\u5F00": "\u91D1",
    "\u60CA": "\u91D1",
    "\u751F": "\u571F",
    "\u666F": "\u706B"
  };
  var DOOR_PALACE = { "\u4F11": 1, "\u6B7B": 2, "\u4F24": 3, "\u675C": 4, "\u5F00": 6, "\u60CA": 7, "\u751F": 8, "\u666F": 9 };
  var YI_ORDER = ["\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678", "\u4E01", "\u4E19", "\u4E59"];
  var XUN_KONG_WANG = {
    "\u7532\u5B50": ["\u620C", "\u4EA5"],
    "\u7532\u620C": ["\u7533", "\u9149"],
    "\u7532\u7533": ["\u5348", "\u672A"],
    "\u7532\u5348": ["\u8FB0", "\u5DF3"],
    "\u7532\u8FB0": ["\u5BC5", "\u536F"],
    "\u7532\u5BC5": ["\u5B50", "\u4E11"]
  };
  var MA_XING = {
    "\u5BC5": "\u7533",
    "\u5348": "\u7533",
    "\u620C": "\u7533",
    "\u7533": "\u5BC5",
    "\u5B50": "\u5BC5",
    "\u8FB0": "\u5BC5",
    "\u5DF3": "\u4EA5",
    "\u9149": "\u4EA5",
    "\u4E11": "\u4EA5",
    "\u4EA5": "\u5DF3",
    "\u536F": "\u5DF3",
    "\u672A": "\u5DF3"
  };
  var YANG_DUN_TERMS = ["\u51AC\u81F3", "\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD"];
  var YIN_DUN_TERMS = ["\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA"];
  var YANG_DUN_JU = {
    "\u51AC\u81F3": [1, 7, 4],
    "\u5C0F\u5BD2": [2, 8, 5],
    "\u5927\u5BD2": [3, 9, 6],
    "\u7ACB\u6625": [8, 5, 2],
    "\u96E8\u6C34": [9, 6, 3],
    "\u60CA\u86F0": [1, 7, 4],
    "\u6625\u5206": [3, 9, 6],
    "\u6E05\u660E": [4, 1, 7],
    "\u8C37\u96E8": [5, 2, 8],
    "\u7ACB\u590F": [4, 1, 7],
    "\u5C0F\u6EE1": [5, 2, 8],
    "\u8292\u79CD": [6, 3, 9]
  };
  var YIN_DUN_JU = {
    "\u590F\u81F3": [9, 3, 6],
    "\u5C0F\u6691": [8, 2, 5],
    "\u5927\u6691": [7, 1, 4],
    "\u7ACB\u79CB": [2, 5, 8],
    "\u5904\u6691": [1, 4, 7],
    "\u767D\u9732": [9, 3, 6],
    "\u79CB\u5206": [7, 1, 4],
    "\u5BD2\u9732": [6, 9, 3],
    "\u971C\u964D": [5, 8, 2],
    "\u7ACB\u51AC": [6, 9, 3],
    "\u5C0F\u96EA": [5, 8, 2],
    "\u5927\u96EA": [4, 7, 1]
  };
  var LO_SHU_CLOCKWISE = [1, 8, 3, 4, 9, 2, 7, 6];
  var LO_SHU_COUNTERCLOCKWISE = [1, 6, 7, 2, 9, 4, 3, 8];
  function clockwiseSteps(from, to) {
    if (from === to) return 0;
    const order = LO_SHU_CLOCKWISE;
    const startIdx = order.indexOf(from);
    for (let i = 0; i < 8; i++) {
      if (order[(startIdx + i) % 8] === to) return i;
    }
    return 0;
  }
  function counterclockwiseSteps(from, to) {
    if (from === to) return 0;
    const order = LO_SHU_COUNTERCLOCKWISE;
    const startIdx = order.indexOf(from);
    for (let i = 0; i < 8; i++) {
      if (order[(startIdx + i) % 8] === to) return i;
    }
    return 0;
  }

  // src/qimen/calendar.js
  function dateToJD(year, month, day) {
    let y = year, m = month;
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
  }
  var BASE_JD = 24603105e-1;
  var BASE_SEX = 0;
  function jdToSexagenary(jd) {
    const diff = Math.floor(jd - BASE_JD);
    return (diff % 60 + 60 + BASE_SEX) % 60;
  }
  function calcYearGanZhi(year, beforeSpring) {
    const actualYear = beforeSpring ? year - 1 : year;
    const offset = ((actualYear - 4) % 60 + 60) % 60;
    return {
      gan: TIAN_GAN[offset % 10],
      zhi: DI_ZHI[offset % 12],
      ganIndex: offset % 10,
      zhiIndex: offset % 12,
      sexagenary: offset
    };
  }
  function calcMonthGanZhi(yearGanIdx, monthZhiOffset) {
    const firstGanTable = [2, 4, 6, 8, 0];
    const firstGan = firstGanTable[yearGanIdx % 5];
    const ganIdx = (firstGan + monthZhiOffset) % 10;
    const zhiIdx = (2 + monthZhiOffset) % 12;
    return {
      gan: TIAN_GAN[ganIdx],
      zhi: DI_ZHI[zhiIdx],
      ganIndex: ganIdx,
      zhiIndex: zhiIdx
    };
  }
  function calcDayGanZhi(year, month, day) {
    const jd = dateToJD(year, month, day);
    const sex = jdToSexagenary(jd);
    return {
      gan: TIAN_GAN[sex % 10],
      zhi: DI_ZHI[sex % 12],
      ganIndex: sex % 10,
      zhiIndex: sex % 12,
      sexagenary: sex
    };
  }
  function calcHourGanZhi(dayGan, shiChenIndex) {
    const dayIdx = TIAN_GAN.indexOf(dayGan);
    const firstGanTable = [0, 2, 4, 6, 8];
    const firstGan = firstGanTable[dayIdx % 5];
    const ganIdx = (firstGan + shiChenIndex) % 10;
    return {
      gan: TIAN_GAN[ganIdx],
      zhi: DI_ZHI[shiChenIndex % 12],
      ganIndex: ganIdx,
      zhiIndex: shiChenIndex % 12
    };
  }
  function getSexagenaryIndex(ganIdx, zhiIdx) {
    if (ganIdx % 2 !== zhiIdx % 2) return -1;
    for (let i = zhiIdx; i < 60; i += 12) {
      if (i % 10 === ganIdx) return i;
    }
    return -1;
  }
  function getXunShouGan(hourGan, hourZhi) {
    const ganIdx = TIAN_GAN.indexOf(hourGan);
    const zhiIdx = DI_ZHI.indexOf(hourZhi);
    const sexIdx = getSexagenaryIndex(ganIdx, zhiIdx);
    if (sexIdx < 0) return { gan: "\u7532", zhi: "\u5B50", zhiIdx: 0, name: "\u7532\u5B50" };
    const xunStart = Math.floor(sexIdx / 10) * 10;
    const xunZhiIdx = xunStart % 12;
    return {
      gan: "\u7532",
      zhi: DI_ZHI[xunZhiIdx],
      zhiIdx: xunZhiIdx,
      name: "\u7532" + DI_ZHI[xunZhiIdx]
    };
  }

  // src/qimen/solarTerms.js
  var TERM_NAMES = ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"];
  var TERM_LONGITUDE = Array.from({ length: 24 }, (_, i) => (285 + i * 15) % 360);
  function jdToDate(jd) {
    const Z = Math.floor(jd + 0.5);
    let A;
    if (Z < 2299161) {
      A = Z;
    } else {
      const alpha = Math.floor((Z - 186721625e-2) / 36524.25);
      A = Z + 1 + alpha - Math.floor(alpha / 4);
    }
    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);
    const dayFrac = B - D - Math.floor(30.6001 * E);
    const day = Math.floor(dayFrac);
    const month = E < 14 ? E - 1 : E - 13;
    const year = month > 2 ? C - 4716 : C - 4715;
    return { year, month, day, hour: Math.round((dayFrac - day) * 24) };
  }
  function dateToJD2(year, month, day) {
    let y = year, m = month;
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
  }
  function sunTrueLongitude(jd) {
    const T = (jd - 2451545) / 36525;
    const M = (357.5291 + 35999.0503 * T - 1559e-7 * T * T - 48e-8 * T * T * T) * Math.PI / 180;
    const C = (1.9148 - 0.0157 * T - 14e-6 * T * T) * Math.sin(M) + (0.02 - 1e-4 * T) * Math.sin(2 * M) + 3e-4 * Math.sin(3 * M);
    const L0 = (280.4665 + 36000.7698 * T) % 360;
    let lambda = L0 + C;
    const omega = (125.04 - 1934.136 * T) * Math.PI / 180;
    const nutation = -56e-4 * Math.cos(omega) + 48e-4 * Math.cos(2 * omega);
    lambda += nutation;
    lambda -= 57e-4;
    return (lambda % 360 + 360) % 360;
  }
  function findSolarTermJD(year, termIndex) {
    const targetLong = TERM_LONGITUDE[termIndex];
    const baseJD = dateToJD2(year, 1, 1);
    const roughOffset = (targetLong - 285 + 360) % 360 / 360 * 365.2422;
    let jd = baseJD + roughOffset - 3;
    let step = 10;
    let lo = jd, hi = jd + step;
    let loLon = sunTrueLongitude(lo);
    let hiLon = sunTrueLongitude(hi);
    for (let i = 0; i < 5; i++) {
      if (Math.abs(hiLon - loLon) < 180) {
        if (loLon <= targetLong && targetLong <= hiLon) break;
        if (hiLon < targetLong) {
          lo = hi;
          loLon = hiLon;
          hi += step;
          hiLon = sunTrueLongitude(hi);
        } else {
          hi = lo;
          hiLon = loLon;
          lo -= step;
          loLon = sunTrueLongitude(lo);
        }
      } else {
        if (loLon <= targetLong + 360 && targetLong + 360 <= hiLon + 360) break;
        lo = hi;
        loLon = hiLon;
        hi += step;
        hiLon = sunTrueLongitude(hi);
      }
    }
    if (loLon > targetLong) {
      [lo, hi] = [hi, lo];
      [loLon, hiLon] = [hiLon, loLon];
    }
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      const midLon = sunTrueLongitude(mid);
      if (Math.abs(midLon - targetLong) < 1e-8) {
        jd = mid;
        break;
      }
      let offset = targetLong - midLon;
      if (offset > 180) offset -= 360;
      if (offset < -180) offset += 360;
      if (offset > 0) {
        lo = mid;
        loLon = midLon;
      } else {
        hi = mid;
        hiLon = midLon;
      }
      jd = (lo + hi) / 2;
    }
    return jd;
  }
  function calcYearSolarTerms(year) {
    const result = [];
    for (let i = 0; i < 24; i++) {
      const jd = findSolarTermJD(year, i);
      const date = jdToDate(jd);
      result.push({
        index: i,
        name: TERM_NAMES[i],
        month: date.month,
        day: date.day,
        hour: date.hour,
        jd
      });
    }
    return result;
  }
  function getNearestSolarTerm(year, month, day) {
    const terms = calcYearSolarTerms(year);
    const inputJD = dateToJD2(year, month, day);
    let nearest = null;
    for (let i = terms.length - 1; i >= 0; i--) {
      if (terms[i].jd <= inputJD) {
        nearest = terms[i];
        break;
      }
    }
    if (!nearest) {
      const prevTerms = calcYearSolarTerms(year - 1);
      nearest = prevTerms[prevTerms.length - 1];
    }
    return nearest;
  }

  // src/qimen/fourPillars.js
  var SOLAR_TERM_OFFSET = [
    11,
    11,
    // 小寒→丑, 大寒→丑
    0,
    0,
    // 立春→寅, 雨水→寅
    1,
    1,
    // 惊蛰→卯, 春分→卯
    2,
    2,
    // 清明→辰, 谷雨→辰
    3,
    3,
    // 立夏→巳, 小满→巳
    4,
    4,
    // 芒种→午, 夏至→午
    5,
    5,
    // 小暑→未, 大暑→未
    6,
    6,
    // 立秋→申, 处暑→申
    7,
    7,
    // 白露→酉, 秋分→酉
    8,
    8,
    // 寒露→戌, 霜降→戌
    9,
    9,
    // 立冬→亥, 小雪→亥
    10,
    10
    // 大雪→子, 冬至→子
  ];
  function getNextDayGan(y,m,d){var n=new Date(y,m-1,d+1);return calcDayGanZhi(n.getFullYear(),n.getMonth()+1,n.getDate()).gan}
function calcFourPillars(year, month, day, hour24) {
    const sc = getHourShiChen(hour24);
    const shiChenIndex = sc.index;
    const solarTerm = getNearestSolarTerm(year, month, day);
    const springTerms = calcYearSolarTerms(year);
    const springJD = springTerms[2].jd;
    const currentJD = dateToJD(year, month, day);
    const isBeforeSpring = currentJD < springJD;
    const yGanZhi = calcYearGanZhi(year, isBeforeSpring);
    const monthZhiOffset = SOLAR_TERM_OFFSET[solarTerm.index];
    const mGanZhi = calcMonthGanZhi(yGanZhi.ganIndex, monthZhiOffset);
    const dGanZhi = calcDayGanZhi(year, month, day);
    // 晚子时(23:00-00:00): 时干用明日日干
    var _useNextDay = (shiChenIndex === 0 && hour24 >= 23);
    var _dayGanForHour = _useNextDay ? getNextDayGan(year,month,day) : dGanZhi.gan;
    const hGanZhi = calcHourGanZhi(_dayGanForHour, shiChenIndex);
    return {
      year: { ...yGanZhi },
      month: { ...mGanZhi },
      day: { ...dGanZhi },
      hour: { ...hGanZhi },
      shiChenName: sc.name,
      shiChenIndex,
      solarTermName: solarTerm.name,
      isBeforeSpring,
      springJD
      // 调试用
    };
  }

  // src/qimen/dunJu.js
  function getYuanLevel(dayGan, dayZhi) {
    const ganIdx = TIAN_GAN.indexOf(dayGan);
    const zhiIdx = DI_ZHI.indexOf(dayZhi);
    const isFuTou = ganIdx === 0 || ganIdx === 5;
    if ([0, 6, 3, 9].includes(zhiIdx)) return 0;
    if ([2, 8, 5, 11].includes(zhiIdx)) return 1;
    return 2;
  }
  function calcYuanByFuTou(year, month, day) {
    const terms = calcYearSolarTerms(year);
    const inputJD = dateToJD2(year, month, day);
    let nearestTerm = null;
    for (let i = terms.length - 1; i >= 0; i--) {
      if (terms[i].jd <= inputJD) {
        nearestTerm = terms[i];
        break;
      }
    }
    if (!nearestTerm) {
      const prevTerms = calcYearSolarTerms(year - 1);
      nearestTerm = prevTerms[prevTerms.length - 1];
    }
    const termStartJD = nearestTerm.jd;
    // Find NEXT fuTou (Jia/Ji day) AFTER solar term start
    var nextFuTouJD = -1;
    var nextFuTouGan = "";
    var nextFuTouZhi = "";
    for (var offset = 0; offset < 30; offset++) {
      var checkJD = termStartJD + offset;
      var Z = Math.floor(checkJD + 0.5);
      var A;
      if (Z < 2299161) A = Z;
      else {
        var alpha = Math.floor((Z - 186721625e-2) / 36524.25);
        A = Z + 1 + alpha - Math.floor(alpha / 4);
      }
      var B = A + 1524;
      var C = Math.floor((B - 122.1) / 365.25);
      var D = Math.floor(365.25 * C);
      var E = Math.floor((B - D) / 30.6001);
      var d = B - D - Math.floor(30.6001 * E);
      var m = E < 14 ? E - 1 : E - 13;
      var y = m > 2 ? C - 4716 : C - 4715;
      var dayGZ = calcDayGanZhi(y, m, d);
      if (dayGZ.gan === "\u7532" || dayGZ.gan === "\u5DF1") {
        nextFuTouJD = checkJD;
        nextFuTouGan = dayGZ.gan;
        nextFuTouZhi = dayGZ.zhi;
        break;
      }
    }
    if (nextFuTouJD < 0) return 0;
    var diff = Math.floor(inputJD - nextFuTouJD + 0.5);
    var fuTouZhiIdx = DI_ZHI.indexOf(nextFuTouZhi);
    // fuTou di zhi determines base yuan: 子午卯酉=上, 寅申巳亥=中, 辰戌丑未=下
    var baseYuan = 0;
    if ([0, 6, 3, 9].indexOf(fuTouZhiIdx) >= 0) baseYuan = 0;      // 子午卯酉
    else if ([2, 8, 5, 11].indexOf(fuTouZhiIdx) >= 0) baseYuan = 1;  // 寅申巳亥
    else baseYuan = 2;                                                 // 辰戌丑未
    if (diff >= 0) {
      if (diff < 5) return 0;       // 上元
      if (diff < 10) return 1;      // 中元
      return 2;                      // 下元
    } else {
      // 残元: days BEFORE first fuTou -> previous yuan
      return (baseYuan - 1 + 3) % 3;
    }
  }
  function getYuanLevel2(diff) {
    if (diff < 5) return 0;
    if (diff < 10) return 1;
    return 2;
  }function calcDunJu(year, month, day, hour24) {
    const solarTerm = getNearestSolarTerm(year, month, day);
    const termName = solarTerm.name;
    const isYangDun = YANG_DUN_TERMS.includes(termName);
    const isYinDun = YIN_DUN_TERMS.includes(termName);
    const yuanLevel = calcYuanByFuTou(year, month, day);
    const yuanNames = ["\u4E0A\u5143", "\u4E2D\u5143", "\u4E0B\u5143"];
    let juNumber;
    if (isYangDun) {
      juNumber = YANG_DUN_JU[termName][yuanLevel];
    } else {
      juNumber = YIN_DUN_JU[termName][yuanLevel];
    }
    return {
      isYangDun,
      isYinDun,
      termName,
      yuanLevel,
      yuanName: yuanNames[yuanLevel],
      juNumber,
      termIndex: solarTerm.index
    };
  }

  // src/qimen/earthPan.js
  function calcEarthPan(isYangDun, juNumber) {
    const earthPan = /* @__PURE__ */ new Map();
    let startPalace = juNumber;
    const palaceOrder = [];
    if (isYangDun) {
      for (let i = 1; i <= 9; i++) {
        palaceOrder.push(i);
      }
    } else {
      for (let i = 9; i >= 1; i--) {
        palaceOrder.push(i);
      }
    }
    const startIdx = palaceOrder.indexOf(startPalace);
    for (let i = 0; i < 9; i++) {
      const palaceNum = palaceOrder[(startIdx + i) % 9];
      const yi = YI_ORDER[i];
      earthPan.set(palaceNum, {
        yi,
        palace: palaceNum,
        ...PALACE_INFO[palaceNum]
      });
    }
    return earthPan;
  }

  // src/qimen/heavenPan.js
  function calcHeavenPan(isYangDun, earthPan, hourGanZhi, xunShou) {
    const XUN_TO_YI2 = { "\u7532\u5B50": "\u620A", "\u7532\u620C": "\u5DF1", "\u7532\u7533": "\u5E9A", "\u7532\u5348": "\u8F9B", "\u7532\u8FB0": "\u58EC", "\u7532\u5BC5": "\u7678" };
    const xunYi = XUN_TO_YI2[xunShou.name];
    let zhiFuStar = "";
    let zhiFuOriginalPalace = 0;
    for (const [palace, data] of earthPan) {
      if (data.yi === xunYi) {
        zhiFuStar = STARS[palace];
        zhiFuOriginalPalace = palace;
        break;
      }
    }
    let hourGanPalace = 0;
    let searchGan = hourGanZhi.gan;
    if (searchGan === "\u7532") {
      const XUN_TO_YI3 = { "\u7532\u5B50": "\u620A", "\u7532\u620C": "\u5DF1", "\u7532\u7533": "\u5E9A", "\u7532\u5348": "\u8F9B", "\u7532\u8FB0": "\u58EC", "\u7532\u5BC5": "\u7678" };
      searchGan = XUN_TO_YI3[xunShou.name];
    }
    for (const [palace, data] of earthPan) {
      if (data.yi === searchGan) {
        hourGanPalace = palace;
        break;
      }
    }
    const zhiFuPalace = hourGanPalace;
    var fromPalace = zhiFuOriginalPalace === 5 ? 2 : zhiFuOriginalPalace;
    var toPalace = zhiFuPalace === 5 ? 2 : zhiFuPalace;
    let steps = 0;
    if (isYangDun) {
      steps = clockwiseSteps(fromPalace, toPalace);
    } else {
      steps = counterclockwiseSteps(fromPalace, toPalace);
    }
    const heavenPan = /* @__PURE__ */ new Map();
    const starOrder = isYangDun ? LO_SHU_CLOCKWISE : LO_SHU_COUNTERCLOCKWISE;
    let tianRuiNewPalace = 0;
    for (let p = 1; p <= 9; p++) {
      if (p === 5) continue;
      const starName = STARS[p];
      const orderIdx = starOrder.indexOf(p);
      const newIdx = (orderIdx + steps) % 8;
      const newPalace = starOrder[newIdx];
      if (p === 2) tianRuiNewPalace = newPalace;
      heavenPan.set(newPalace, {
        star: starName,
        originalPalace: p
      });
    }
    if (tianRuiNewPalace > 0) {
      const existing = heavenPan.get(tianRuiNewPalace) || {};
      heavenPan.set(tianRuiNewPalace, {
        star: existing.star ? `${existing.star}\u79BD` : "\u5929\u82AE\u79BD",
        originalPalace: existing.originalPalace || 2
      });
    }
    return {
      heavenPan,
      zhiFuStar,
      zhiFuPalace,
      zhiFuOriginalPalace,
      rotationSteps: steps
    };
  }

  // src/qimen/eightDoors.js
  var XUN_TO_YI = { "\u7532\u5B50": "\u620A", "\u7532\u620C": "\u5DF1", "\u7532\u7533": "\u5E9A", "\u7532\u5348": "\u8F9B", "\u7532\u8FB0": "\u58EC", "\u7532\u5BC5": "\u7678" };
  var XUN_START_ZHI = { "\u7532\u5B50": 1, "\u7532\u620C": 11, "\u7532\u7533": 9, "\u7532\u5348": 7, "\u7532\u8FB0": 5, "\u7532\u5BC5": 3 };
  var DOOR_CYCLE = ["\u4F11", "\u751F", "\u4F24", "\u675C", "\u666F", "\u6B7B", "\u60CA", "\u5F00"];
  var DOOR_HOME = { "\u4F11": 1, "\u6B7B": 2, "\u4F24": 3, "\u675C": 4, "\u5F00": 6, "\u60CA": 7, "\u751F": 8, "\u666F": 9 };
  var WALK_PATH = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var SPREAD_PATH = [2, 7, 6, 1, 8, 3, 4, 9];
  function calcEightDoors(isYangDun, earthPan, hourGanZhi, xunShou) {
    const xunYi = XUN_TO_YI[xunShou.name] || xunShou.gan;
    let xunShouPalace = 0;
    for (const [palace, val] of earthPan) {
      if (val.yi === xunYi) {
        xunShouPalace = palace;
        break;
      }
    }
    if (xunShouPalace === 5) xunShouPalace = 2;
    const zhiShiDoor = DOORS_MAP[xunShouPalace] || "";
    const zhiShiHome = DOOR_HOME[zhiShiDoor] || xunShouPalace;
    const hourZhi1 = hourGanZhi && hourGanZhi.zhiIndex !== void 0 ? hourGanZhi.zhiIndex + 1 : 1;
    const xunStartZhi = XUN_START_ZHI[xunShou.name] || 1;
    var steps;
    if (isYangDun) {
      steps = (hourZhi1 - xunStartZhi + 12) % 12;  // yang: shichen - xunshou
    } else {
      steps = (xunStartZhi - hourZhi1 + 12) % 12;  // yin: xunshou - shichen
    }
    const homeIdx = WALK_PATH.indexOf(zhiShiHome);
    let resultIdx = (homeIdx + steps) % 9;  // shijia zhuanpan: always clockwise
    let zhiShiResultPalace = WALK_PATH[resultIdx];
    if (zhiShiResultPalace === 5) zhiShiResultPalace = 2;
    const zhiShiDoorIdx = DOOR_CYCLE.indexOf(zhiShiDoor);
    const spreadStartIdx = SPREAD_PATH.indexOf(zhiShiResultPalace);
    const doorPan = /* @__PURE__ */ new Map();
    for (let i = 0; i < 8; i++) {
      const palaceNum = SPREAD_PATH[(spreadStartIdx + i) % 8];
      const doorIdx = (zhiShiDoorIdx + i) % 8;
      doorPan.set(palaceNum, { door: DOOR_CYCLE[doorIdx], isZhiShi: doorIdx === zhiShiDoorIdx });
    }
    doorPan.set(5, { door: "", isZhiShi: false });
    return { doorPan, zhiShiDoor, zhiShiPalace: zhiShiResultPalace, zhiShiOriginalPalace: zhiShiHome };
  }

  // src/qimen/eightSpirits.js
  var SPIRITS = ["\u503C\u7B26", "\u817E\u86C7", "\u592A\u9634", "\u516D\u5408", "\u767D\u864E", "\u7384\u6B66", "\u4E5D\u5730", "\u4E5D\u5929"];
  function calcEightSpirits(isYangDun, zhiFuPalace) {
    const luoShuOrder = isYangDun ? LO_SHU_CLOCKWISE : LO_SHU_COUNTERCLOCKWISE;
    const zhiFuIdx = luoShuOrder.indexOf(zhiFuPalace === 5 ? 2 : zhiFuPalace);
    const spiritPan = /* @__PURE__ */ new Map();
    for (let i = 0; i < 8; i++) {
      const palaceNum = luoShuOrder[(zhiFuIdx + i) % 8];
      spiritPan.set(palaceNum, { spirit: SPIRITS[i] });
    }
    spiritPan.set(5, { spirit: "" });
    return spiritPan;
  }

  // src/qimen/extras.js
  function calcKongWang(xunShouName) {
    return XUN_KONG_WANG[xunShouName] || [];
  }
  function calcMaXing(hourZhi) {
    return MA_XING[hourZhi] || "";
  }
  function isPalaceKongWang(palaceNum, kongWangZhi) {
    const PALACE_ZHI2 = {
      1: "\u5B50",
      2: "\u672A\u7533",
      3: "\u536F",
      4: "\u8FB0\u5DF3",
      6: "\u620C\u4EA5",
      7: "\u9149",
      8: "\u4E11\u5BC5",
      9: "\u5348"
    };
    const zhiInPalace = PALACE_ZHI2[palaceNum] || "";
    return kongWangZhi.some((kz) => zhiInPalace.includes(kz));
  }
  function isPalaceMaXing(palaceNum, maXingZhi) {
    if (!maXingZhi) return false;
    const PALACE_ZHI2 = {
      1: "\u5B50",
      2: "\u672A\u7533",
      3: "\u536F",
      4: "\u8FB0\u5DF3",
      6: "\u620C\u4EA5",
      7: "\u9149",
      8: "\u4E11\u5BC5",
      9: "\u5348"
    };
    const zhiInPalace = PALACE_ZHI2[palaceNum] || "";
    return zhiInPalace.includes(maXingZhi);
  }
  function calcJiXing(earthlyStem, palaceNum) {
    const JI_XING_MAP = { "\u620A": 3, "\u5DF1": 2, "\u5E9A": 8, "\u8F9B": 9, "\u58EC": 4, "\u7678": 4 };
    return JI_XING_MAP[earthlyStem] === palaceNum;
  }
  function calcRuMu(stem, palaceNum) {
    if (!stem) return false;
    const RU_MU_MAP = {
      "\u7532": 2,
      "\u4E59": 6,
      "\u4E19": 6,
      "\u4E01": 8,
      "\u620A": 6,
      "\u5DF1": 8,
      "\u5E9A": 8,
      "\u8F9B": 4,
      "\u58EC": 4,
      "\u7678": 2
    };
    return RU_MU_MAP[stem] === palaceNum;
  }
  function calcMenPo(doorName, palaceNum) {
    if (!doorName || !palaceNum || palaceNum === 5) return false;
    const doorWX = DOOR_WU_XING[doorName];
    const palaceWX = PALACE_INFO[palaceNum]?.wuXing;
    if (!doorWX || !palaceWX) return false;
    const KE_MAP = { "\u6728": "\u571F", "\u571F": "\u6C34", "\u6C34": "\u706B", "\u706B": "\u91D1", "\u91D1": "\u6728" };
    return KE_MAP[doorWX] === palaceWX;
  }
  function calcGejuForCell(heavenlyStem, earthlyStem, doorName, palaceNum) {
    const markers = [];
    if (earthlyStem && calcJiXing(earthlyStem, palaceNum)) {
      markers.push("\u5211");
    }
    if (heavenlyStem && calcRuMu(heavenlyStem, palaceNum)) {
      markers.push("\u5893");
    } else if (earthlyStem && calcRuMu(earthlyStem, palaceNum)) {
      markers.push("\u5893");
    }
    if (calcMenPo(doorName, palaceNum)) {
      markers.push("\u8FEB");
    }
    return markers;
  }
  function isWuBuYu(dayGan, hourGan) {
    const WU_BU_YU = {
      "\u7532": "\u5E9A",
      "\u4E59": "\u8F9B",
      "\u4E19": "\u58EC",
      "\u4E01": "\u7678",
      "\u620A": "\u7532",
      "\u5DF1": "\u4E59",
      "\u5E9A": "\u4E19",
      "\u8F9B": "\u4E01",
      "\u58EC": "\u620A",
      "\u7678": "\u5DF1"
    };
    return WU_BU_YU[dayGan] === hourGan;
  }
  function isTianWang(hourGan) {
    return hourGan === "\u7678";
  }
  function calcExtras(fourPillars, xunShou) {
    const kongWang = calcKongWang(xunShou.name);
    const maXingZhi = calcMaXing(fourPillars.hour.zhi);
    const wuBuYu = isWuBuYu(fourPillars.day.gan, fourPillars.hour.gan);
    const tianWang = isTianWang(fourPillars.hour.gan);
    const CHONG_PALACE = { 1: 9, 2: 8, 3: 7, 4: 6, 6: 4, 7: 3, 8: 2, 9: 1, 5: 5 };
    return {
      kongWang,
      // 空亡地支
      kongWangZhi: kongWang,
      maXingZhi,
      // 马星地支
      wuBuYu,
      // 是否五不遇时
      tianWang,
      // 是否天网四张
      fuYinPalaces: [],
      // 伏吟宫（运行时填入）
      fanYinPalaces: []
      // 反吟宫（运行时填入）
    };
  }

  // src/qimen/changSheng.js
  var CS_NAMES = ["\u957F\u751F", "\u6C90\u6D74", "\u51A0\u5E26", "\u4E34\u5B98", "\u5E1D\u65FA", "\u8870", "\u75C5", "\u6B7B", "\u5893", "\u7EDD", "\u80CE", "\u517B"];
  var CS_SHORT = ["\u751F", "\u6C90", "\u51A0", "\u5B98", "\u65FA", "\u8870", "\u75C5", "\u6B7B", "\u5893", "\u7EDD", "\u80CE", "\u517B"];
  var CS_START = {
    "\u7532": 11,
    // 亥
    "\u4E59": 6,
    // 午
    "\u4E19": 2,
    // 寅
    "\u4E01": 9,
    // 酉
    "\u620A": 2,
    // 寅（同丙）
    "\u5DF1": 9,
    // 酉（同丁）
    "\u5E9A": 5,
    // 巳
    "\u8F9B": 0,
    // 子
    "\u58EC": 8,
    // 申
    "\u7678": 3
    // 卯
  };
  var YANG_GAN = ["\u7532", "\u4E19", "\u620A", "\u5E9A", "\u58EC"];
  function getChangShengIndex(gan, zhiIndex) {
    const start = CS_START[gan];
    if (start === void 0 || zhiIndex < 0 || zhiIndex > 11) return -1;
    const isYang = YANG_GAN.includes(gan);
    if (isYang) {
      return (zhiIndex - start + 12) % 12;
    } else {
      return (start - zhiIndex + 12) % 12;
    }
  }
  var PALACE_ZHI = {
    1: 0,
    // 坎→子
    2: 8,
    // 坤→申
    3: 3,
    // 震→卯
    4: 5,
    // 巽→巳
    6: 11,
    // 乾→亥
    7: 9,
    // 兑→酉
    8: 2,
    // 艮→寅
    9: 6
    // 离→午
  };
  function calcStemChangSheng(gan, palace) {
    if (palace === 5 || !gan) return { index: -1, name: "", short: "" };
    const zhiIdx = PALACE_ZHI[palace];
    if (zhiIdx === void 0) return { index: -1, name: "", short: "" };
    const idx = getChangShengIndex(gan, zhiIdx);
    return {
      index: idx,
      name: idx >= 0 ? CS_NAMES[idx] : "",
      short: idx >= 0 ? CS_SHORT[idx] : ""
    };
  }

  // src/qimen/keYing.js
  var SHI_GAN_KE_YING = {
    // （一）戊组
    "\u620A\u620A": "\u9752\u9F99\u4F0F\u541F\uFF1A\u963B\u6EDE\u95ED\u585E\uFF0C\u5B9C\u9759\u5B88\uFF0C\u4E3B\u52A8\u7834\u8D22\u53CD\u590D",
    "\u620A\u4E59": "\u9752\u9F99\u548C\u4F1A\uFF1A\u5409\u51F6\u968F\u95E8\uFF0C\u5409\u95E8\u8C0B\u8D35\u987A\u5229\uFF0C\u51F6\u95E8\u662F\u975E\u7F20\u8EAB",
    "\u620A\u4E19": "\u9752\u9F99\u8FD4\u9996\uFF1A\u5927\u5409\uFF0C\u6C42\u8D22\u8C16\u8D35\u5347\u8FC1\uFF1B\u5893\u8FEB\u51FB\u5211\u5219\u5409\u4E8B\u6210\u51F6",
    "\u620A\u4E01": "\u9752\u9F99\u8000\u660E\uFF1A\u5229\u6C42\u5B98\u3001\u89C1\u8D35\u4EBA\u3001\u6587\u4E66\uFF1B\u9022\u5893\u8FEB\u62DB\u5C0F\u4EBA\u662F\u975E",
    "\u620A\u5DF1": "\u8D35\u4EBA\u5165\u72F1\uFF1A\u516C\u79C1\u963B\u6EDE\u3001\u53D7\u4EBA\u7275\u5236\u3001\u8BA1\u5212\u6401\u7F6E",
    "\u620A\u5E9A": "\u503C\u7B26\u98DE\u5BAB\uFF1A\u5409\u4E8B\u4E0D\u6210\u3001\u51F6\u707E\u52A0\u91CD\uFF0C\u6C42\u8D22\u75C5\u707E\u7686\u51F6\uFF0C\u5B9C\u6362\u65B9\u4F4D",
    "\u620A\u8F9B": "\u9752\u9F99\u6298\u8DB3\uFF1A\u5409\u95E8\u53EF\u7F13\u8C0B\uFF0C\u51F6\u95E8\u5931\u8D22\u3001\u817F\u811A\u4F24\u75C5\u3001\u78D5\u78B0\u707E",
    "\u620A\u58EC": "\u9752\u9F99\u5165\u5929\u7262\uFF1A\u9634\u9633\u8BF8\u4E8B\u96BE\u6210\u3001\u5B64\u72EC\u538B\u6291\u3001\u4E8B\u591A\u963B\u9694",
    "\u620A\u7678": "\u9752\u9F99\u534E\u76D6\uFF1A\u5409\u95E8\u62DB\u798F\u5229\u4FEE\u884C\u9690\u85CF\uFF0C\u51F6\u95E8\u707E\u7978\u8FDE\u7EF5",
    // （二）乙组
    "\u4E59\u620A": "\u9634\u5BB3\u9633\u95E8\uFF1A\u5229\u5973\u6027\u3001\u79C1\u4E0B\u8C0B\u5212\uFF1B\u51F6\u95E8\u7834\u8D22\u4F24\u8EAB\uFF0C\u4E0D\u5229\u4E8E\u7537\u6027\u4E3B\u4E8B",
    "\u4E59\u4E59": "\u65E5\u5947\u4F0F\u541F\uFF1A\u5B89\u5206\u5B88\u5DF1\uFF0C\u4E0D\u5B9C\u6C42\u804C\u8FDC\u884C\uFF0C\u65E7\u4E8B\u7EA0\u7F20",
    "\u4E59\u4E19": "\u5947\u4EEA\u987A\u9042\uFF1A\u5409\u661F\u4E3B\u5347\u804C\u5408\u4F5C\uFF1B\u51F6\u661F\u592B\u59BB\u5206\u79BB\u3001\u610F\u89C1\u76F8\u608B",
    "\u4E59\u4E01": "\u5947\u4EEA\u76F8\u4F50\uFF1A\u6587\u4E66\u3001\u8003\u8BD5\u3001\u7B7E\u7EA6\u5927\u5409\uFF0C\u767E\u4E8B\u987A\u9042",
    "\u4E59\u5DF1": "\u65E5\u5947\u5165\u5893\uFF1A\u6666\u6697\u4E0D\u660E\uFF0C\u8C0B\u5212\u843D\u7A7A\uFF0C\u51F6\u95E8\u5B98\u975E\u7F20\u8EAB",
    "\u4E59\u5E9A": "\u65E5\u5947\u88AB\u5211\uFF1A\u8D22\u4EA7\u4E89\u593A\u3001\u592B\u59BB\u77DB\u76FE\u3001\u53E3\u820C\u8BC9\u8BBC",
    "\u4E59\u8F9B": "\u9752\u9F99\u9003\u8D70\uFF1A\u7834\u8D22\u3001\u4EB2\u4EBA\u79BB\u6563\u3001\u5974\u4EC6\u80CC\u53DB\u3001\u59FB\u7F18\u7834\u88C2",
    "\u4E59\u58EC": "\u65E5\u5947\u5165\u5730\uFF1A\u5C0A\u5351\u5931\u5E8F\u3001\u6697\u4E2D\u6709\u4EBA\u7B97\u8BA1\u3001\u5B98\u975E\u6F5C\u4F0F",
    "\u4E59\u7678": "\u65E5\u5947\u5730\u7F51\uFF1A\u5B9C\u85CF\u8EB2\u907F\u707E\uFF0C\u516C\u5F00\u884C\u4E8B\u5FC5\u62DB\u7978",
    // （三）丙组
    "\u4E19\u620A": "\u9E1F\u8DCC\u7A74\uFF1A\u9876\u7EA7\u5409\u683C\uFF0C\u8C0B\u5927\u4E8B\u3001\u521B\u4E1A\u3001\u6C42\u8D22\u3001\u8FDC\u884C\u7686\u5927\u5229",
    "\u4E19\u4E59": "\u65E5\u6708\u5E76\u884C\uFF1A\u516C\u79C1\u8C0B\u4E3A\u7686\u987A\uFF0C\u5408\u4F5C\u3001\u5A5A\u5AC1\u5409",
    "\u4E19\u4E19": "\u6708\u5947\u608B\u5E08\uFF1A\u6587\u4E66\u9057\u5931\u3001\u7968\u636E\u7EA0\u7EB7\u3001\u635F\u8017\u7834\u8D22",
    "\u4E19\u4E01": "\u661F\u5947\u6731\u96C0\uFF1A\u8D35\u4EBA\u6587\u4E66\u5927\u5409\uFF0C\u9022\u4E09\u5409\u95E8\u4E3A\u5929\u901A\u683C\u5C40",
    "\u4E19\u5DF1": "\u706B\u608B\u5165\u5211\uFF1A\u7262\u72F1\u3001\u6587\u4E66\u5361\u963B\uFF1B\u5409\u95E8\u5C0F\u4E8B\u53EF\u6210\uFF0C\u51F6\u95E8\u5211\u4F24",
    "\u4E19\u5E9A": "\u8367\u5165\u592A\u767D\uFF1A\u95E8\u6237\u635F\u8017\u3001\u76D7\u8D3C\u7834\u8D22\u3001\u4E8B\u4E1A\u8870\u8D25\u3001\u5927\u51F6",
    "\u4E19\u8F9B": "\u4E19\u8F9B\u76F8\u5408\uFF1A\u8C0B\u4E8B\u53EF\u6210\uFF0C\u4E45\u75C5\u597D\u8F6C\uFF0C\u5316\u89E3\u7EA0\u7EB7",
    "\u4E19\u58EC": "\u706B\u5165\u5929\u7F57\uFF1A\u5BA2\u65B9\u5403\u4E8F\uFF0C\u662F\u975E\u4E0D\u65AD\uFF0C\u4E0D\u5B9C\u4E3B\u52A8\u51FA\u51FB",
    "\u4E19\u7678": "\u534E\u76D6\u608B\u5E08\uFF1A\u5973\u4EBA\u574F\u4E8B\u3001\u707E\u7978\u63A5\u8FDE\u53D1\u751F\u3001\u6697\u4E2D\u53D7\u635F",
    // （四）丁组
    "\u4E01\u620A": "\u9752\u9F99\u8F6C\u5149\uFF1A\u8D35\u4EBA\u63D0\u62D4\u3001\u5347\u8FC1\u3001\u8C03\u89E3\u77DB\u76FE\u3001\u559C\u4E8B\u5C06\u81F3",
    "\u4E01\u4E59": "\u4EBA\u901A\u5409\u683C\uFF1A\u9690\u79D8\u8C0B\u5212\u3001\u5A5A\u59FB\u3001\u79C1\u4E0B\u4EA4\u6613\u5927\u5409\uFF0C\u8D35\u4EBA\u76F8\u52A9",
    "\u4E01\u4E19": "\u661F\u968F\u6708\u8F6C\uFF1A\u8D8A\u7EA7\u5347\u5B98\u3001\u5916\u4EBA\u5E2E\u6276\uFF0C\u5229\u8C08\u5224\u5408\u4F5C",
    "\u4E01\u4E01": "\u6731\u96C0\u4F0F\u541F\uFF1A\u6587\u4E66\u53CD\u590D\u3001\u53E3\u820C\u4E89\u5435\u3001\u4FE1\u606F\u51FA\u9519",
    "\u4E01\u5DF1": "\u706B\u5165\u5893\u5E93\uFF1A\u5C0F\u4E8B\u62D6\u5EF6\uFF0C\u8BC1\u636E\u4E0D\u8DB3\uFF0C\u8C0B\u5212\u85CF\u9690\u60A3",
    "\u4E01\u5E9A": "\u7389\u5973\u5211\u592A\u767D\uFF1A\u5973\u6027\u5F15\u53D1\u5B98\u975E\u3001\u611F\u60C5\u7834\u88C2\u3001\u8D22\u7269\u53D7\u635F",
    "\u4E01\u8F9B": "\u6731\u96C0\u5165\u72F1\uFF1A\u7F6A\u4EBA\u5F97\u91CA\u3001\u7EA0\u7EB7\u548C\u89E3\uFF0C\u5E38\u4EBA\u662F\u975E\u7F20\u8EAB",
    "\u4E01\u58EC": "\u6731\u96C0\u6295\u6C5F\uFF1A\u6587\u4E66\u9057\u5931\u3001\u5408\u540C\u4F5C\u5E9F\u3001\u53E3\u820C\u6D88\u6563\u53C8\u590D\u53D1",
    "\u4E01\u7678": "\u6731\u96C0\u6295\u6C5F\u540C\u65AD\uFF1A\u97F3\u4FE1\u5168\u65E0\u3001\u6C9F\u901A\u53D7\u963B\u3001\u865A\u5047\u6D88\u606F",
    // （五）己组
    "\u5DF1\u620A": "\u72AC\u5165\u9752\u9F99\uFF1A\u5974\u4EC6\u4F5C\u4E71\u3001\u4E0B\u5C5E\u80CC\u53DB\u3001\u53D7\u4EBA\u62D6\u7D2F",
    "\u5DF1\u4E59": "\u5730\u5947\u9022\u9634\uFF1A\u79C1\u4E8B\u9690\u79D8\u3001\u5730\u4EA7\u8C0B\u5212\uFF1B\u51F6\u95E8\u6697\u85CF\u9690\u60A3",
    "\u5DF1\u4E19": "\u706B\u608B\u5730\u6237\uFF1A\u7537\u4EBA\u60F9\u707E\u3001\u53E3\u820C\u5B98\u975E\u3001\u9690\u79C1\u66DD\u5149",
    "\u5DF1\u4E01": "\u6731\u96C0\u5165\u5893\uFF1A\u6587\u4E66\u7F20\u8BBC\u3001\u5408\u540C\u9677\u9631\u3001\u8BC1\u636E\u4E0D\u6E05",
    "\u5DF1\u5DF1": "\u5730\u4F0F\u541F\uFF1A\u65E7\u4E8B\u91CD\u6765\u3001\u538B\u6291\u505C\u6EDE\u3001\u539F\u5730\u8E0F\u6B65\u65E0\u8FDB\u5C55",
    "\u5DF1\u5E9A": "\u5211\u683C\u53CD\u540D\uFF1A\u8BC9\u8BBC\u8D25\u8BC9\u3001\u53D7\u4EBA\u8BCF\u9661\u3001\u540D\u8A89\u53D7\u635F",
    "\u5DF1\u8F9B": "\u6E38\u9B42\u5165\u5893\uFF1A\u5C0F\u4EBA\u6697\u4E2D\u4F5C\u795F\u3001\u9B3C\u602A\u865A\u60CA\u3001\u7761\u7720\u4E0D\u5B89",
    "\u5DF1\u58EC": "\u5730\u7F51\u9AD8\u5F20\uFF1A\u7537\u5973\u79C1\u60C5\u60F9\u7978\u3001\u7834\u8D22\u3001\u7EA0\u7F20\u4E0D\u6E05",
    "\u5DF1\u7678": "\u5730\u5211\u7384\u6B66\uFF1A\u7537\u5973\u6DEB\u7978\u3001\u5077\u76D7\u7834\u8D22\u3001\u6697\u4E2D\u7B97\u8BA1",
    // （六）庚组
    "\u5E9A\u620A": "\u592A\u767D\u4F0F\u5BAB\uFF1A\u5BA2\u65B9\u5927\u8D25\u3001\u4EC7\u4EBA\u4E0A\u95E8\u3001\u6C42\u8D22\u635F\u8017\u3001\u6362\u5730\u65B9\u5B89",
    "\u5E9A\u4E59": "\u592A\u767D\u9022\u661F\uFF1A\u5229\u5973\u6027\u5316\u89E3\u77DB\u76FE\uFF0C\u7537\u4E3B\u4E8B\u906D\u5C0F\u4EBA\u963B\u788D",
    "\u5E9A\u4E19": "\u592A\u767D\u5165\u8367\uFF1A\u8D3C\u5FC5\u6765\uFF0C\u9632\u76D7\u62A2\u3001\u7834\u8D22\u3001\u707E\u7978\u4E3B\u52A8\u627E\u4E0A\u95E8",
    "\u5E9A\u4E01": "\u592A\u767D\u53D7\u5236\uFF1A\u8D35\u4EBA\u5316\u89E3\u4EC7\u6028\u3001\u5B98\u53F8\u7F13\u548C\u3001\u654C\u4EBA\u7F29\u9000",
    "\u5E9A\u5DF1": "\u592A\u767D\u9022\u5211\uFF1A\u7262\u72F1\u3001\u4F24\u6B8B\u3001\u503A\u52A1\u7EA0\u7EB7\u96BE\u4EE5\u4E86\u7ED3",
    "\u5E9A\u5E9A": "\u592A\u767D\u4F0F\u541F\uFF1A\u4EC7\u4EBA\u91CD\u9022\u3001\u4E89\u6597\u3001\u65E7\u6028\u590D\u53D1\u3001\u51FA\u884C\u53D7\u963B",
    "\u5E9A\u8F9B": "\u767D\u864E\u51FA\u529B\uFF1A\u5175\u5203\u76F8\u4E89\u3001\u51B2\u7A81\u6D41\u8840\u3001\u9000\u8BA9\u53EF\u514D\u707E",
    "\u5E9A\u58EC": "\u592A\u767D\u64D2\u86C7\uFF1A\u5211\u72F1\u516C\u5E73\u3001\u7EA0\u7EB7\u6709\u65AD\uFF0C\u5F3A\u4E89\u4E24\u8D25\u4FF1\u4F24",
    "\u5E9A\u7678": "\u5927\u683C\uFF1A\u8F66\u884C\u8239\u884C\u5927\u51F6\u3001\u6B7B\u4F24\u635F\u8017\u3001\u51FA\u884C\u5927\u5FCC",
    // （七）辛组
    "\u8F9B\u620A": "\u56F0\u9F99\u88AB\u4F24\uFF1A\u5B98\u53F8\u7834\u8D25\u3001\u5984\u52A8\u62DB\u707E\uFF0C\u9759\u5B88\u907F\u7978",
    "\u8F9B\u4E59": "\u767D\u864E\u72C2\u97A0\uFF1A\u5BB6\u7834\u4EBA\u6563\u3001\u8F66\u8239\u635F\u4F24\u3001\u957F\u8F88\u4E0D\u548C\uFF0C\u5927\u51F6",
    "\u8F9B\u4E19": "\u5E72\u5408\u608B\u5E08\uFF1A\u6C42\u8D22\u8D77\u8BBC\u3001\u6674\u65F1\u96E8\u6D9D\u3001\u8BA1\u5212\u4E2D\u9014\u53D8\u5366",
    "\u8F9B\u4E01": "\u72F1\u795E\u5F97\u5947\uFF1A\u7ECF\u5546\u7FFB\u500D\u83B7\u5229\u3001\u56DA\u5F92\u8D66\u514D\u3001\u96BE\u4E8B\u5316\u89E3",
    "\u8F9B\u5DF1": "\u5165\u72F1\u81EA\u5211\uFF1A\u4E0B\u5C5E\u80CC\u53DB\u3001\u6709\u51A4\u96BE\u8BC9\u3001\u81EA\u6211\u5185\u8017",
    "\u8F9B\u5E9A": "\u767D\u864E\u51FA\u529B\uFF1A\u5200\u5251\u51B2\u7A81\u3001\u4E3B\u5BA2\u76F8\u6B8B\uFF0C\u4E0D\u53EF\u5F3A\u786C\u5BF9\u5CD9",
    "\u8F9B\u8F9B": "\u4F0F\u541F\u5929\u5EAD\uFF1A\u65E7\u4E8B\u5B98\u53F8\u590D\u8D77\u3001\u72AF\u9519\u8FFD\u8D23\u3001\u540D\u58F0\u53D7\u635F",
    "\u8F9B\u58EC": "\u51F6\u86C7\u5165\u72F1\uFF1A\u4E24\u7537\u4E89\u5973\u3001\u8BC9\u8BBC\u4E0D\u4F11\u3001\u5148\u884C\u52A8\u7406\u4E8F",
    "\u8F9B\u7678": "\u5929\u7262\u534E\u76D6\uFF1A\u89C6\u7EBF\u8499\u853D\u3001\u8FDB\u9000\u4E24\u96BE\u3001\u505A\u4E8B\u5904\u5904\u51FA\u9519",
    // （八）壬组
    "\u58EC\u620A": "\u5C0F\u86C7\u5316\u9F99\uFF1A\u4E8B\u4E1A\u53D8\u52A8\u5347\u8FC1\u3001\u8FDC\u884C\u5F97\u5229\u3001\u6362\u73AF\u5883\u53D1\u5C55",
    "\u58EC\u4E59": "\u5C0F\u86C7\u5F97\u5947\uFF1A\u5973\u4EBA\u5E2E\u6276\u3001\u6C42\u8D22\u6709\u8D22\uFF0C\u9690\u79D8\u4E4B\u4E8B\u987A\u5229",
    "\u58EC\u4E19": "\u6C34\u5165\u706B\u7F51\uFF1A\u9634\u4EBA\u5B98\u975E\u3001\u7537\u5973\u79C1\u60C5\u60F9\u7978\u3001\u662F\u975E\u4E0D\u65AD",
    "\u58EC\u4E01": "\u5E72\u5408\u6731\u96C0\uFF1A\u8D35\u4EBA\u8C03\u89E3\u53E3\u820C\u3001\u5408\u540C\u91CD\u65B0\u4FEE\u8BA2",
    "\u58EC\u5DF1": "\u86C7\u5165\u5730\u7F57\uFF1A\u5916\u4EBA\u7B97\u8BA1\u3001\u7EA0\u7F20\u4E0D\u4F11\u3001\u503A\u52A1\u7F20\u8EAB",
    "\u58EC\u5E9A": "\u592A\u767D\u64D2\u86C7\uFF1A\u76D7\u8D3C\u73B0\u5F62\u3001\u5B98\u53F8\u7406\u6E05\u3001\u5F3A\u884C\u52A8\u5219\u53D7\u635F",
    "\u58EC\u8F9B": "\u87A2\u86C7\u76F8\u7F20\uFF1A\u7EA0\u7EB7\u53CD\u590D\u3001\u7761\u7720\u60CA\u60B8\u3001\u5C0F\u4E8B\u653E\u5927",
    "\u58EC\u58EC": "\u5929\u7262\u4F0F\u541F\uFF1A\u7262\u72F1\u3001\u594B\u6CE2\u52B3\u5FC3\u3001\u8BF8\u4E8B\u62D6\u5EF6\u65E0\u8FDB\u5C55",
    "\u58EC\u7678": "\u5929\u7F57\u5730\u7F51\uFF1A\u5185\u5916\u7686\u56F0\u3001\u8FDB\u9000\u65E0\u8DEF\uFF0C\u51E1\u4E8B\u9690\u5FCD",
    // （九）癸组
    "\u7678\u620A": "\u5929\u7F51\u5165\u9752\u9F99\uFF1A\u516C\u79C1\u7686\u963B\u6EDE\u3001\u53D7\u4EBA\u7275\u5236\u3001\u8BA1\u5212\u96BE\u4EE5\u843D\u5730",
    "\u7678\u4E59": "\u534E\u76D6\u9022\u661F\uFF1A\u901A\u85CF\u907F\u707E\u3001\u4FEE\u884C\u3001\u79C1\u4E0B\u8C0B\u5212\u5927\u5409",
    "\u7678\u4E19": "\u534E\u76D6\u608B\u5E08\uFF1A\u5973\u4EBA\u4F5C\u795F\u3001\u597D\u4E8B\u53D8\u574F\u4E8B\u3001\u6697\u4E2D\u7834\u574F",
    "\u7678\u4E01": "\u87A2\u86C7\u592E\u4FA8\uFF1A\u6587\u4E66\u53E3\u820C\u3001\u865A\u5047\u4F20\u8A00\u3001\u60CA\u5413\u865A\u707E",
    "\u7678\u5DF1": "\u5730\u5211\u7384\u6B66\uFF1A\u5077\u76D7\u3001\u79C1\u60C5\u3001\u7834\u8D22\u3001\u5C0F\u4EBA\u6697\u5904\u9677\u5BB3",
    "\u7678\u5E9A": "\u592A\u767D\u5165\u7F51\uFF1A\u76D7\u8D3C\u88AB\u64D2\u3001\u4EC7\u4EBA\u843D\u7F51\uFF0C\u8BC9\u8BBC\u5DF1\u65B9\u5F97\u5229",
    "\u7678\u8F9B": "\u5929\u7F51\u51B2\u5211\uFF1A\u7262\u72F1\u4F24\u6B8B\u3001\u53E3\u820C\u96BE\u5E73\u3001\u51FA\u884C\u591A\u963B\u6EDE",
    "\u7678\u58EC": "\u590D\u89C1\u5929\u7F57\uFF1A\u7EA0\u7F20\u5FAA\u73AF\u3001\u707E\u7978\u63A5\u8FDE\u3001\u65E0\u6CD5\u8131\u8EAB",
    "\u7678\u7678": "\u5929\u7F51\u4F0F\u541F\uFF1A\u5927\u51F6\uFF0C\u7262\u72F1\u3001\u7834\u8D22\u3001\u88AB\u56F0\uFF0C\u4E0D\u5B9C\u884C\u52A8"
  };

  // src/qimen/index.js
  function calcPan(year, month, day, hour) {
    const fourPillars = calcFourPillars(year, month, day, hour);
    const dunJu = calcDunJu(year, month, day, hour);
    const earthPan = calcEarthPan(dunJu.isYangDun, dunJu.juNumber);
    const xunShou = getXunShouGan(fourPillars.hour.gan, fourPillars.hour.zhi);
    const heavenResult = calcHeavenPan(dunJu.isYangDun, earthPan, fourPillars.hour, xunShou);
    const doorResult = calcEightDoors(dunJu.isYangDun, earthPan, fourPillars.hour, xunShou, heavenResult);
    const spiritPan = calcEightSpirits(dunJu.isYangDun, heavenResult.zhiFuPalace);
    const extras = calcExtras(fourPillars, xunShou);
    var CHONG_PALACE = { 1: 9, 9: 1, 2: 8, 8: 2, 3: 7, 7: 3, 4: 6, 6: 4, 5: 5 };
    const cells = [];
    for (let palace = 1; palace <= 9; palace++) {
      const earthData = earthPan.get(palace) || {};
      const heavenData = heavenResult.heavenPan.get(palace) || {};
      const doorData = doorResult.doorPan.get(palace) || {};
      const spiritData = spiritPan.get(palace) || {};
      const isKong = isPalaceKongWang(palace, extras.kongWang);
      const isMa = isPalaceMaXing(palace, extras.maXingZhi);
      var isStarFuYin = heavenData.originalPalace === palace;
      var isStarFanYin = heavenData.originalPalace && CHONG_PALACE[heavenData.originalPalace] === palace;
      var doorOriPalace = DOOR_PALACE[doorData.door] || 0;
      var isDoorFuYin = doorOriPalace === palace;
      var isDoorFanYin = doorOriPalace && CHONG_PALACE[doorOriPalace] === palace;
      const palaceInfo = PALACE_INFO[palace];
      cells.push({
        palace,
        name: palaceInfo.name,
        direction: palaceInfo.direction,
        wuXing: palaceInfo.wuXing,
        isZheng: palaceInfo.isZheng,
        // 天盘
        star: heavenData.star || "",
        // 八门
        door: doorData.door || "",
        isZhiShi: doorData.isZhiShi || false,
        // 八神
        spirit: spiritData.spirit || "",
        // 三奇六仪（天盘干/地盘干）
        heavenlyStem: "",
        // 天盘干（需要后续从天盘三奇六仪计算）
        earthlyYi: earthData.yi || "",
        // 标注
        isEmpty: isKong,
        isHorse: isMa,
        isFuYin: isStarFuYin,
        isFanYin: isStarFanYin,
        isStarFuYin,
        isStarFanYin,
        isDoorFuYin,
        isDoorFanYin,
        isWuBuYu: false,
        jiXing: false,
        ruMu: false,
        menPo: false,
        geju: [],
        notes: [],
        // 长生状态
        hChangSheng: { index: -1, name: "", short: "" },
        eChangSheng: { index: -1, name: "", short: "" },
        isShiGan: false
      });
    }
    cells.find(function(c) {
      return c.palace === 5;
    }).star = "\u5929\u79BD";
    for (const cell of cells) {
      if (cell.star) {
        let starNames = [cell.star];
        if (cell.star.includes("\u79BD") && cell.star !== "\u5929\u79BD") {
          starNames = [cell.star.replace("\u79BD", ""), "\u5929\u79BD"];
        }
        const stems = [];
        for (const sn of starNames) {
          for (const [palace, name] of Object.entries(STARS)) {
            if (name === sn) {
              const originalEarth = earthPan.get(parseInt(palace));
              if (originalEarth && originalEarth.yi) {
                stems.push(originalEarth.yi);
              }
              break;
            }
          }
        }
        cell.heavenlyStem = stems.filter((s) => s).join(", ");
        if (cell.palace === 5 && !cell.heavenlyStem && cell.earthlyYi) cell.heavenlyStem = cell.earthlyYi;
      }
    }
    for (const cell of cells) {
      const stems = cell.heavenlyStem ? cell.heavenlyStem.split(/[,，]\s*/).map((s) => s.trim()).filter(Boolean) : [];
      const hasRuMu = stems.some((s) => calcRuMu(s, cell.palace)) || calcRuMu(cell.earthlyYi, cell.palace);
      if (calcJiXing(cell.earthlyYi, cell.palace)) cell.jiXing = true;
      if (hasRuMu) cell.ruMu = true;
      if (calcMenPo(cell.door, cell.palace)) cell.menPo = true;
      cell.geju = calcGejuForCell(cell.heavenlyStem, cell.earthlyYi, cell.door, cell.palace);
    }
    var shiGan = fourPillars.hour.gan;
    for (const cell of cells) {
      if (cell.palace === 5) {
        cell.star = "\u5929\u79BD";
        cell.hChangSheng = calcStemChangSheng(cell.heavenlyStem || cell.earthlyYi || "\u620A", 5);
        cell.eChangSheng = cell.hChangSheng;
      } else {
        if (cell.heavenlyStem) {
          var hStems = cell.heavenlyStem.split(/[,，]\s*/);
          var hStage = calcStemChangSheng(hStems[0], cell.palace);
          cell.hChangSheng = hStage;
        }
        if (cell.earthlyYi) {
          var eStem = cell.earthlyYi;
          cell.eChangSheng = calcStemChangSheng(eStem, cell.palace);
        }
        if (cell.heavenlyStem && cell.heavenlyStem.indexOf(shiGan) >= 0) {
          cell.isShiGan = true;
        }
      }
    }
    const notes = [];
    if (extras.wuBuYu) notes.push("\u4E94\u4E0D\u9047\u65F6");
    if (extras.tianWang) notes.push("\u5929\u7F51\u56DB\u5F20");
    const midCell = cells.find(function(c) {
      return c.palace === 5;
    });
    const midStem = midCell ? midCell.earthlyYi || "" : "";
    if (midStem) {
      var cell2 = cells.find(function(c) {
        return c.palace === 2;
      });
      if (cell2) cell2.zhongGongStem = midStem;
    }
    var isAllStarFuYin = (cells.find(function(c) {
      return c.palace === heavenResult.zhiFuPalace;
    }) || {}).isStarFuYin || false;
    var isAllDoorFuYin = (cells.find(function(c) {
      return c.palace === doorResult.zhiShiPalace;
    }) || {}).isDoorFuYin || false;
    if (isAllStarFuYin && isAllDoorFuYin) notes.push("\u5168\u5C40\u4F0F\u541F");
    var isAllStarFanYin = CHONG_PALACE[heavenResult.zhiFuOriginalPalace] === heavenResult.zhiFuPalace;
    var isAllDoorFanYin = CHONG_PALACE[doorResult.zhiShiPalace] === doorResult.zhiShiOriginalPalace;
    if (isAllStarFanYin || isAllDoorFanYin) {
      var label = isAllStarFanYin && isAllDoorFanYin ? "\u5168\u5C40\u53CD\u541F" : isAllStarFanYin ? "\u661F\u53CD\u541F" : "\u95E8\u53CD\u541F";
      notes.push(label);
    }
    var shiGanPalace = cells.find(function(c) {
      return c.isShiGan;
    });
    var shiGanPalaceNum = shiGanPalace ? shiGanPalace.palace : 0;
    var shiGanEarthPalaceNum = 0;
    var hourGan = fourPillars.hour.gan;
    for (const [palace, val] of earthPan) {
      if (val.yi === hourGan) {
        shiGanEarthPalaceNum = palace;
        break;
      }
    }
    if (shiGanEarthPalaceNum === 5) shiGanEarthPalaceNum = 2;
    const sc = getHourShiChen(hour);
    return {
      input: { year, month, day, hour },
      timeLabel: `${year}\u5E74${month}\u6708${day}\u65E5 ${sc.name}`,
      solarTerm: dunJu.termName,
      currentTerm: dunJu.termName,
      isYangDun: dunJu.isYangDun,
      isYinDun: dunJu.isYinDun,
      dunType: dunJu.isYangDun ? "\u9633\u9041" : "\u9634\u9041",
      juNumber: dunJu.juNumber,
      yuanName: dunJu.yuanName,
      dunLabel: `${dunJu.isYangDun ? "\u9633" : "\u9634"}\u9041${dunJu.juNumber}\u5C40 ${dunJu.yuanName}`,
      fourPillars: {
        year: `${fourPillars.year.gan}${fourPillars.year.zhi}`,
        month: `${fourPillars.month.gan}${fourPillars.month.zhi}`,
        day: `${fourPillars.day.gan}${fourPillars.day.zhi}`,
        hour: `${fourPillars.hour.gan}${fourPillars.hour.zhi}`
      },
      zhiFu: heavenResult.zhiFuStar,
      zhiFuPalace: heavenResult.zhiFuPalace,
      zhiShi: doorResult.zhiShiDoor + "\u95E8",
      zhiShiPalace: doorResult.zhiShiPalace,
      xunShou: xunShou.name,
      kongWang: extras.kongWangZhi.join("\u3001"),
      maXing: extras.maXingZhi,
      notes,
      shiGan: hourGan,
      shiGanPalace: shiGanPalaceNum,
      shiGanEarthPalace: shiGanEarthPalaceNum,
      cells,
      loShu: LO_SHU
    };
  }
  function calcChangSheng(gan, palace) {
    return calcStemChangSheng(gan, palace);
  }
  function getKeYing(hg, eg) {
    var k = hg + eg;
    return SHI_GAN_KE_YING[k] || null;
  }
  function formatPan(pan) {
    const lines = [];
    lines.push(`\u3010${pan.timeLabel}\u3011`);
    lines.push(`\u8282\u6C14\uFF1A${pan.solarTerm}`);
    lines.push(`\u5B9A\u5C40\uFF1A${pan.dunLabel}`);
    lines.push(`\u56DB\u67F1\uFF1A${pan.fourPillars.year} ${pan.fourPillars.month} ${pan.fourPillars.day} ${pan.fourPillars.hour}`);
    lines.push(`\u503C\u7B26\uFF1A${pan.zhiFu}\uFF08${pan.zhiFuPalace}\u5BAB\uFF09 \u503C\u4F7F\uFF1A${pan.zhiShi}\uFF08${pan.zhiShiPalace}\u5BAB\uFF09`);
    lines.push(`\u65EC\u9996\uFF1A${pan.xunShou}  \u7A7A\u4EA1\uFF1A${pan.kongWang}  \u9A6C\u661F\uFF1A${pan.maXing}`);
    if (pan.notes.length) lines.push(`\u7279\u6B8A\uFF1A${pan.notes.join("\u3001")}`);
    lines.push("");
    lines.push("\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510");
    const rows = [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ];
    for (const row of rows) {
      lines.push("\u2502       \u2502       \u2502       \u2502");
      const line2 = row.map((p) => {
        const c = pan.cells.find((x) => x.palace === p);
        return `${c.name}${c.door}`.padEnd(7);
      }).join("\u2502");
      lines.push(`\u2502${line2}\u2502`);
      const line3 = row.map((p) => {
        const c = pan.cells.find((x) => x.palace === p);
        return `${c.star}`.padEnd(7);
      }).join("\u2502");
      lines.push(`\u2502${line3}\u2502`);
      const line4 = row.map((p) => {
        const c = pan.cells.find((x) => x.palace === p);
        return `${c.heavenlyStem}${c.earthlyYi}`.padEnd(7);
      }).join("\u2502");
      lines.push(`\u2502${line4}\u2502`);
      const line5 = row.map((p) => {
        const c = pan.cells.find((x) => x.palace === p);
        return `${c.spirit}${c.isEmpty ? "\u7A7A" : ""}${c.isHorse ? "\u9A6C" : ""}`.padEnd(7);
      }).join("\u2502");
      lines.push(`\u2502${line5}\u2502`);
      lines.push("\u2502       \u2502       \u2502       \u2502");
      if (row[2] !== 6) lines.push("\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524");
    }
    lines.push("\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518");
    return lines.join("\n");
  }
  return __toCommonJS(qimen_exports);
})();
