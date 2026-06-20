"use strict";
var BaZi = (() => {
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

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    DI_ZHI: () => DI_ZHI,
    GAN_WU_XING: () => GAN_WU_XING,
    MONTH_ZHI_FROM_TERM: () => MONTH_ZHI_FROM_TERM,
    SHENG_XIAO: () => SHENG_XIAO,
    TIAN_GAN: () => TIAN_GAN,
    ZHI_WU_XING: () => ZHI_WU_XING,
    calcAllInteractions: () => calcAllInteractions,
    calcAnnualShenSha: () => calcAnnualShenSha,
    calcBranchInteractions: () => calcBranchInteractions,
    calcDaYunFuYinFanYin: () => calcDaYunFuYinFanYin,
    calcFiveElementScore: () => calcFiveElementScore,
    calcFortuneWithAnnual: () => calcFortuneWithAnnual,
    calcFourPillarShenSha: () => calcFourPillarShenSha,
    calcFuYinFanYin: () => calcFuYinFanYin,
    calcGanTenGods: () => calcGanTenGods,
    calcLiuNianFuYinFanYin: () => calcLiuNianFuYinFanYin,
    calcNatalWithAnnual: () => calcNatalWithAnnual,
    calcNatalWithFortune: () => calcNatalWithFortune,
    calcShenSha: () => calcShenSha,
    calcShenShaForBranch: () => calcShenShaForBranch,
    calcSinglePillarShenSha: () => calcSinglePillarShenSha,
    calcTenGod: () => calcTenGod,
    calcZhiTenGods: () => calcZhiTenGods,
    calculateBaZi: () => calculateBaZi,
    determineConstitution: () => determineConstitution,
    determinePattern: () => determinePattern,
    getAllPatterns: () => getAllPatterns,
    getConstitutionName: () => getConstitutionName,
    getDayMasterInfo: () => getDayMasterInfo,
    getFourPillarHiddenStems: () => getFourPillarHiddenStems,
    getFourPillarNaYin: () => getFourPillarNaYin,
    getHiddenStems: () => getHiddenStems,
    getLang: () => getLang,
    getNaYin: () => getNaYin,
    lunarToSolar: () => lunarToSolar,
    setLang: () => setLang,
    solarToLunar: () => solarToLunar,
    t: () => t
  });

  // src/types.ts
  var TIAN_GAN = ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"];
  var DI_ZHI = ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"];
  var SHENG_XIAO = ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"];
  var GAN_WU_XING = ["\u6728", "\u6728", "\u706B", "\u706B", "\u571F", "\u571F", "\u91D1", "\u91D1", "\u6C34", "\u6C34"];
  var ZHI_WU_XING = ["\u6C34", "\u571F", "\u6728", "\u6728", "\u571F", "\u706B", "\u706B", "\u571F", "\u91D1", "\u91D1", "\u571F", "\u6C34"];
  var MONTH_ZHI_FROM_TERM = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1];

  // src/calc/year-pillar.ts
  var SD = { 1990: { month: 2, day: 4 }, 2e3: { month: 2, day: 4 }, 2024: { month: 2, day: 4 }, 2025: { month: 2, day: 3 }, 2026: { month: 2, day: 4 }, 1949: { month: 2, day: 4 } };
  function calcYearPillar(year, month, day) {
    const sp = SD[year] ?? { month: 2, day: 4 };
    const after = month > sp.month || month === sp.month && day >= sp.day;
    const ey = after ? year : year - 1;
    const gan = ((ey - 4) % 10 + 10) % 10;
    const zhi = ((ey - 4) % 12 + 12) % 12;
    return { gan, zhi, ganName: TIAN_GAN[gan], zhiName: DI_ZHI[zhi] };
  }

  // src/data/solar-term-table.ts
  var JIE_NAMES = ["\u7ACB\u6625", "\u60CA\u86F0", "\u6E05\u660E", "\u7ACB\u590F", "\u8292\u79CD", "\u5C0F\u6691", "\u7ACB\u79CB", "\u767D\u9732", "\u5BD2\u9732", "\u7ACB\u51AC", "\u5927\u96EA", "\u5C0F\u5BD2"];
  function getSolarTermDays(year, _type) {
    const T = {
      1990: [204, 306, 405, 506, 606, 707, 808, 908, 1008, 1107, 1207, 106],
      2e3: [205, 306, 405, 506, 606, 707, 808, 908, 1008, 1107, 1207, 106],
      2024: [204, 305, 404, 505, 605, 706, 807, 907, 1008, 1107, 1206, 106],
      2025: [203, 305, 404, 505, 605, 707, 807, 907, 1008, 1107, 1207, 105],
      2026: [204, 306, 405, 506, 606, 707, 807, 907, 1008, 1107, 1207, 106],
      1949: [204, 306, 405, 506, 606, 707, 808, 908, 1008, 1107, 1207, 106],
      1989: [204, 304, 405, 505, 606, 706, 808, 908, 1008, 1107, 1207, 105]
    };
    return T[year] ?? [204, 306, 405, 506, 606, 707, 808, 908, 1008, 1107, 1207, 106];
  }
  function findSolarTermIndex(year, month, day) {
    const terms = getSolarTermDays(year, "jie");
    const target = month * 100 + day;
    if (target < terms[0]) {
      const prev = getSolarTermDays(year - 1, "jie");
      for (let i = 11; i >= 0; i--) {
        const tm = Math.floor(prev[i] / 100);
        if (tm < 2 && i < 11) continue;
        if (i >= 10) {
          if (target >= prev[i]) return i;
        }
      }
      return 11;
    }
    for (let i = 11; i >= 0; i--) {
      const tm = Math.floor(terms[i] / 100);
      if (tm < 2 && month < 12) continue;
      if (target >= terms[i]) return i;
    }
    return 0;
  }
  function getSolarTermName(termIdx) {
    return JIE_NAMES[termIdx] ?? "";
  }

  // src/calc/month-pillar.ts
  var WU_HU = {
    0: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
    5: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
    1: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
    6: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
    2: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7],
    7: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7],
    3: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    8: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1],
    9: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]
  };
  function calcMonthPillar(yearGan, year, month, day) {
    const terms = getSolarTermDays(year, "jie");
    const target = month * 100 + day;
    let termIdx = -1;
    const janTerm = terms[11] < 200;
    if (target < terms[0]) {
      const prev = getSolarTermDays(year - 1, "jie");
      for (let i = 11; i >= 10; i--) {
        if (target >= prev[i]) {
          termIdx = i;
          break;
        }
      }
      if (termIdx < 0) termIdx = 11;
    } else {
      for (let i = 11; i >= 0; i--) {
        if ((!janTerm || terms[i] >= 200) && target >= terms[i]) {
          termIdx = i;
          break;
        }
      }
    }
    if (termIdx < 0) termIdx = 0;
    const zhi = MONTH_ZHI_FROM_TERM[termIdx];
    const gan = (WU_HU[yearGan] ?? WU_HU[0])[termIdx];
    return { gan, zhi, ganName: TIAN_GAN[gan], zhiName: DI_ZHI[zhi] };
  }

  // src/calc/day-pillar.ts
  var BASE = new Date(2e3, 0, 1);
  var BASE_GAN = 4;
  var BASE_ZHI = 6;
  function calcDayPillar(year, month, day) {
    const target = new Date(year, month - 1, day);
    const diff = Math.round((target.getTime() - BASE.getTime()) / 864e5);
    const gan = ((BASE_GAN + diff) % 10 + 10) % 10;
    const zhi = ((BASE_ZHI + diff) % 12 + 12) % 12;
    return { gan, zhi, ganName: TIAN_GAN[gan], zhiName: DI_ZHI[zhi] };
  }

  // src/calc/hour-pillar.ts
  var WU_SHU = {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1],
    1: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
    2: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
    3: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7],
    4: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    5: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1],
    6: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
    7: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
    8: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7],
    9: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  };
  function hourToZhi(hour) {
    return Math.floor((hour + 1) % 24 / 2);
  }
  function calcHourPillar(dayGan, hour) {
    const zhi = hourToZhi(hour);
    const gan = (WU_SHU[dayGan] ?? WU_SHU[0])[zhi];
    return { gan, zhi, ganName: TIAN_GAN[gan], zhiName: DI_ZHI[zhi] };
  }
  function calcHourPillarRenFuHong(dayGan, hour, isLateZi, nextDayGan) {
    const zhi = 0;
    let gan;
    if (isLateZi) {
      var _g = nextDayGan !== void 0 ? nextDayGan : (dayGan + 1) % 10;
      gan = (WU_SHU[_g] ?? WU_SHU[0])[0];
    } else {
      gan = (WU_SHU[dayGan] ?? WU_SHU[0])[0];
    }
    return { gan, zhi, ganName: TIAN_GAN[gan], zhiName: DI_ZHI[zhi] };
  }
  function isZiHour(hour) {
    return hour >= 23 || hour < 1;
  }
  function isLateZiHour(hour) {
    return hour >= 23 && hour < 24;
  }

  // src/true-solar.ts
  function equationOfTime(n) {
    const b = 2 * Math.PI * (n - 1) / 365.25;
    const eot = 229.2 * (75e-6 + 1868e-6 * Math.cos(b) - 0.032077 * Math.sin(b) - 0.014615 * Math.cos(2 * b) - 0.04089 * Math.sin(2 * b));
    return eot;
  }
  function dayOfYear(year, month, day) {
    const d = new Date(year, month - 1, day);
    const start = new Date(year, 0, 0);
    return Math.round((d.getTime() - start.getTime()) / 864e5);
  }
  function correctToTrueSolar(input) {
    if (!input.useTrueSolar || input.longitude === void 0) {
      return { hour: input.hour, minute: input.minute };
    }
    const stdMeridian = 120;
    const lon = input.longitude;
    const lmtDelta = (lon - stdMeridian) * 4;
    const doy = dayOfYear(input.year, input.month, input.day);
    const eot = equationOfTime(doy);
    const totalDelta = lmtDelta + eot;
    let totalMinutes = input.hour * 60 + input.minute + totalDelta;
    if (totalMinutes < 0) totalMinutes += 1440;
    if (totalMinutes >= 1440) totalMinutes -= 1440;
    return {
      hour: Math.floor(totalMinutes / 60),
      minute: Math.round(totalMinutes % 60)
    };
  }

  // src/wuxing.ts
  var ZH_TO_EN = { "\u6728": "wood", "\u706B": "fire", "\u571F": "earth", "\u91D1": "metal", "\u6C34": "water" };
  function calcFiveElementScore(pillars, hiddenStems) {
    const s = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
    for (const p of pillars) {
      s[ZH_TO_EN[GAN_WU_XING[p.gan]] ?? "earth"] += 3;
    }
    for (const p of pillars) {
      s[ZH_TO_EN[ZHI_WU_XING[p.zhi]] ?? "earth"] += 2;
    }
    for (const grp of hiddenStems) {
      for (const h of grp) {
        s[ZH_TO_EN[h.element] ?? "earth"] += 1;
      }
    }
    return s;
  }

  // src/nayin.ts
  var NY = ["\u6D77\u4E2D\u91D1", "\u7089\u4E2D\u706B", "\u5927\u6797\u6728", "\u8DEF\u65C1\u571F", "\u5251\u950B\u91D1", "\u5C71\u5934\u706B", "\u6DA7\u4E0B\u6C34", "\u57CE\u5934\u571F", "\u767D\u8721\u91D1", "\u6768\u67F3\u6728", "\u4E95\u6CC9\u6C34", "\u5C4B\u4E0A\u571F", "\u9739\u96F3\u706B", "\u677E\u67CF\u6728", "\u957F\u6D41\u6C34", "\u7802\u77F3\u91D1", "\u5C71\u4E0B\u706B", "\u5E73\u5730\u6728", "\u58C1\u4E0A\u571F", "\u91D1\u7B94\u91D1", "\u8986\u706F\u706B", "\u5929\u6CB3\u6C34", "\u5927\u9A7F\u571F", "\u9497\u948F\u91D1", "\u6851\u67D8\u6728", "\u5927\u6EAA\u6C34", "\u6C99\u4E2D\u571F", "\u5929\u4E0A\u706B", "\u77F3\u69B4\u6728", "\u5927\u6D77\u6C34"];
  function getNaYin(gan, zhi) {
    for (let i = 0; i < 60; i++) {
      if (i % 10 === gan && i % 12 === zhi) return NY[Math.floor(i / 2)];
    }
    return NY[0];
  }
  function getFourPillarNaYin(pillars) {
    return pillars.map((p) => getNaYin(p.gan, p.zhi));
  }

  // src/hidden-stems.ts
  var H = { 0: [9], 1: [5, 9, 7], 2: [0, 2, 4], 3: [1], 4: [4, 1, 9], 5: [2, 6, 4], 6: [3, 5], 7: [5, 3, 1], 8: [6, 8, 4], 9: [7], 10: [4, 7, 3], 11: [8, 0] };
  function getHiddenStems(zhi) {
    return (H[zhi] ?? []).map((gan) => ({ gan, ganName: TIAN_GAN[gan], element: GAN_WU_XING[gan] }));
  }
  function getFourPillarHiddenStems(zhis) {
    return zhis.map((z) => getHiddenStems(z));
  }

  // src/tengods.ts
  var MAP = { "0": ["\u52AB\u8D22", "\u6BD4\u80A9"], "1": ["\u4F24\u5B98", "\u98DF\u795E"], "2": ["\u6B63\u8D22", "\u504F\u8D22"], "3": ["\u6B63\u5B98", "\u4E03\u6740"], "4": ["\u6B63\u5370", "\u504F\u5370"] };
  function calcTenGod(dg, t2) {
    const r = ((Math.floor(t2 / 2) - Math.floor(dg / 2)) % 5 + 5) % 5;
    const sy = dg % 2 !== t2 % 2;
    return MAP[String(r)][sy ? 0 : 1];
  }
  function calcGanTenGods(dg, ps) {
    return { yearGan: calcTenGod(dg, ps[0].gan), monthGan: calcTenGod(dg, ps[1].gan), hourGan: calcTenGod(dg, ps[3].gan) };
  }
  function calcZhiTenGods(dg, ps) {
    const keys = ["yearZhi", "monthZhi", "dayZhi", "hourZhi"];
    const r = { yearZhi: [], monthZhi: [], dayZhi: [], hourZhi: [] };
    for (let i = 0; i < 4; i++) {
      r[keys[i]] = getHiddenStems(ps[i].zhi).map((h) => calcTenGod(dg, h.gan));
    }
    return r;
  }
  function getDayMasterInfo(dg) {
    return { name: TIAN_GAN[dg], element: GAN_WU_XING[dg], yin: dg % 2 !== 0 };
  }

  // src/fortune/great-fortune.ts
  var JIE_PRECISE = {
    // 2024
    "2024/2/4": [16, 27],
    "2024/3/5": [10, 23],
    "2024/4/4": [15, 2],
    "2024/5/5": [8, 10],
    "2024/6/5": [0, 26],
    "2024/7/6": [22, 0],
    "2024/8/7": [8, 9],
    "2024/9/7": [11, 11],
    "2024/10/8": [3, 0],
    "2024/11/7": [6, 20],
    "2024/12/6": [23, 17],
    "2025/1/5": [10, 33],
    // 2025
    "2025/2/3": [22, 10],
    "2025/3/5": [16, 7],
    "2025/4/4": [20, 48],
    "2025/5/5": [13, 56],
    "2025/6/5": [5, 9],
    "2025/7/7": [4, 5],
    "2025/8/7": [9, 52],
    "2025/9/7": [12, 12],
    "2025/10/8": [2, 42],
    "2025/11/7": [5, 20],
    "2025/12/7": [6, 30],
    "2026/1/5": [3, 20],
    // 2026
    "2026/2/4": [4, 15],
    "2026/3/5": [22, 40],
    "2026/4/5": [3, 40],
    "2026/5/5": [19, 25],
    "2026/6/5": [10, 55],
    "2026/6/21": [1, 0],
    "2026/7/7": [10, 5],
    "2026/8/7": [15, 30],
    "2026/9/7": [17, 55],
    "2026/10/8": [8, 25],
    "2026/11/7": [11, 5],
    "2026/12/7": [12, 20],
    // 1986 (from shen88.cn)
    "1986/9/8": [6, 0],
    "1986/10/8": [22, 0],
    "1986/11/7": [8, 0],
    "1986/12/7": [12, 0]
    // Common approx for other years (use mid-points)
  };
  function getJieTime(year, month, day) {
    const key = year + "/" + month + "/" + day;
    const p = JIE_PRECISE[key];
    if (p) return { hour: p[0], minute: p[1] };
    return { hour: 4, minute: 30 };
  }
  function calcFortuneDirection(gy, gender) {
    const yang = gy % 2 === 0;
    return yang && gender === "male" || !yang && gender === "female" ? "\u987A\u6392" : "\u9006\u6392";
  }
  function termToFullDate(year, mmdd) {
    const m = Math.floor(mmdd / 100);
    const d = mmdd % 100;
    return { year, month: m, day: d };
  }
  function findNextJie(birthYear, birthMonth, birthDay, birthHour, birthMin) {
    const birthMins = birthHour * 60 + birthMin;
    for (let y = birthYear; y <= birthYear + 1; y++) {
      const terms = getSolarTermDays(y, "jie");
      for (const mmdd of terms) {
        const { month: m, day: d } = termToFullDate(y, mmdd);
        if (y === birthYear) {
          if (m < birthMonth || m === birthMonth && d < birthDay || m === birthMonth && d === birthDay && getJieTime(y, m, d).hour * 60 + getJieTime(y, m, d).minute <= birthMins) {
            continue;
          }
        }
        const jt = getJieTime(y, m, d);
        return { year: y, month: m, day: d, hour: jt.hour, minute: jt.minute };
      }
    }
    return { year: birthYear + 1, month: 2, day: 4, hour: 4, minute: 30 };
  }
  function findPrevJie(birthYear, birthMonth, birthDay, birthHour, birthMin) {
    const birthMins = birthHour * 60 + birthMin;
    let best = null;
    for (let y = birthYear - 1; y <= birthYear; y++) {
      const terms = getSolarTermDays(y, "jie");
      for (const mmdd of terms) {
        const { month: m, day: d } = termToFullDate(y, mmdd);
        if (y === birthYear) {
          if (m > birthMonth || m === birthMonth && d > birthDay || m === birthMonth && d === birthDay && getJieTime(y, m, d).hour * 60 + getJieTime(y, m, d).minute >= birthMins) {
            continue;
          }
        }
        const jt = getJieTime(y, m, d);
        if (!best || y > best.year || y === best.year && (m > best.month || m === best.month && (d > best.day || d === best.day && jt.hour * 60 + jt.minute > best.hour * 60 + best.minute))) {
          best = { year: y, month: m, day: d, hour: jt.hour, minute: jt.minute };
        }
      }
    }
    return best || { year: birthYear, month: 1, day: 6, hour: 5, minute: 0 };
  }
  function diffMinutes(a, b) {
    const da = new Date(a.year, a.month - 1, a.day, a.hour, a.minute).getTime();
    const db = new Date(b.year, b.month - 1, b.day, b.hour, b.minute).getTime();
    return Math.round(Math.abs(da - db) / 6e4);
  }
  function getJieName(year, month, day) {
    const terms = getSolarTermDays(year, "jie");
    const bd = month * 100 + day;
    let bestIdx = 0, bestDiff = 999;
    for (let i = 0; i < terms.length; i++) {
      const d = Math.abs(terms[i] - bd);
      if (d < bestDiff) {
        bestDiff = d;
        bestIdx = i;
      }
    }
    const mmdd = terms[bestIdx];
    const tm = Math.floor(mmdd / 100);
    const td = mmdd % 100;
    if (tm !== month || td !== day) {
      for (let i = 0; i < terms.length; i++) {
        if (terms[i] === bd) return getSolarTermName(i);
      }
    }
    return getSolarTermName(bestIdx);
  }
  function calcStartAgePrecise(birthYear, birthMonth, birthDay, birthHour, birthMinute, direction) {
    const target = direction === "\u987A\u6392" ? findNextJie(birthYear, birthMonth, birthDay, birthHour, birthMinute) : findPrevJie(birthYear, birthMonth, birthDay, birthHour, birthMinute);
    const totalMin = diffMinutes(
      { year: birthYear, month: birthMonth, day: birthDay, hour: birthHour, minute: birthMinute },
      target
    );
    const YEAR = 4320, MONTH = 360, DAY = 12, SHICHEN = 120;
    const years = Math.floor(totalMin / YEAR);
    let rem = totalMin - years * YEAR;
    const months = Math.floor(rem / MONTH);
    rem -= months * MONTH;
    const days = Math.floor(rem / DAY);
    rem -= days * DAY;
    const hours = Math.floor(rem / SHICHEN);
    rem -= hours * SHICHEN;
    const jiaoYun = new Date(birthYear, birthMonth - 1, birthDay, birthHour, birthMinute + totalMin);
    const jieName = getJieName(target.year, target.month, target.day);
    const fmtJie = target.year + "\u5E74" + target.month + "\u6708" + target.day + "\u65E5 " + String(target.hour).padStart(2, "0") + ":" + String(target.minute).padStart(2, "0");
    const fmtJiao = jiaoYun.getFullYear() + "\u5E74" + (jiaoYun.getMonth() + 1) + "\u6708" + jiaoYun.getDate() + "\u65E5 " + String(jiaoYun.getHours()).padStart(2, "0") + ":" + String(jiaoYun.getMinutes()).padStart(2, "0");
    return {
      years,
      months,
      days,
      hours,
      totalMin,
      jieName,
      jieTime: fmtJie,
      jiaoYunTime: fmtJiao,
      targetYear: target.year,
      targetMonth: target.month,
      targetDay: target.day,
      targetHour: target.hour,
      targetMinute: target.minute
    };
  }
  function calcStartAge(year, month, day, dir) {
    const r = calcStartAgePrecise(year, month, day, 0, 0, dir);
    return r.years;
  }
  function calcGreatFortunes(sa, mp, dir, dg) {
    const f = [];
    const d = dir.indexOf("\u987A") === 0 ? 1 : -1;
    for (let i = 0; i < 8; i++) {
      const gan = ((mp.gan + d * (i + 1)) % 10 + 10) % 10;
      const zhi = ((mp.zhi + d * (i + 1)) % 12 + 12) % 12;
      f.push({
        startAge: sa + i * 10,
        endAge: sa + (i + 1) * 10 - 1,
        gan,
        zhi,
        ganName: TIAN_GAN[gan],
        zhiName: DI_ZHI[zhi],
        tenGod: calcTenGod(dg, gan),
        direction: dir
      });
    }
    return f;
  }
  function calcAnnualFortune(ty, dg) {
    const gan = ((ty - 4) % 10 + 10) % 10;
    const zhi = ((ty - 4) % 12 + 12) % 12;
    return { year: ty, gan, zhi, ganName: TIAN_GAN[gan], zhiName: DI_ZHI[zhi], tenGodGan: calcTenGod(dg, gan), tenGodZhi: calcTenGod(dg, zhi) };
  }

  // src/interaction.ts
  var G5 = {
    0: { p: 5, n: "\u7532\u5DF1\u5408\u5316\u571F" },
    1: { p: 6, n: "\u4E59\u5E9A\u5408\u91D1" },
    2: { p: 7, n: "\u4E19\u8F9B\u5408\u5316\u6C34" },
    3: { p: 8, n: "\u4E01\u58EC\u5408\u5316\u6728" },
    4: { p: 9, n: "\u620A\u7678\u5408\u5316\u706B" },
    5: { p: 0, n: "\u7532\u5DF1\u5408\u5316\u571F" },
    6: { p: 1, n: "\u4E59\u5E9A\u5408\u91D1" },
    7: { p: 2, n: "\u4E19\u8F9B\u5408\u5316\u6C34" },
    8: { p: 3, n: "\u4E01\u58EC\u5408\u5316\u6728" },
    9: { p: 4, n: "\u620A\u7678\u5408\u5316\u706B" }
  };
  var GCHONG = { 0: 6, 6: 0, 1: 7, 7: 1, 2: 8, 8: 2, 3: 9, 9: 3, 4: 5, 5: 4 };
  var SAN_HUI = [
    [2, 3, 4, "\u5BC5\u536F\u8FB0\u4E09\u4F1A\u6728\u5C40"],
    [5, 6, 7, "\u5DF3\u5348\u672A\u4E09\u4F1A\u706B\u5C40"],
    [8, 9, 10, "\u7533\u9149\u620C\u4E09\u4F1A\u91D1\u5C40"],
    [11, 0, 1, "\u4EA5\u5B50\u4E11\u4E09\u4F1A\u6C34\u5C40"]
  ];
  var SAN_HE = [
    [0, 4, 8, "\u7533\u5B50\u8FB0\u4E09\u5408\u6C34\u5C40", "\u6C34"],
    [1, 5, 9, "\u5DF3\u9149\u4E11\u4E09\u5408\u91D1\u5C40", "\u91D1"],
    [2, 6, 10, "\u5BC5\u5348\u620C\u4E09\u5408\u706B\u5C40", "\u706B"],
    [3, 7, 11, "\u4EA5\u536F\u672A\u4E09\u5408\u6728\u5C40", "\u6728"]
  ];
  var BAN_HE = [
    [0, 4, "\u7533\u5B50\u534A\u5408\u6C34"],
    [4, 8, "\u5B50\u8FB0\u534A\u5408\u6C34"],
    [0, 8, "\u7533\u8FB0\u6697\u5408\u6C34"],
    [3, 7, "\u4EA5\u536F\u534A\u5408\u6728"],
    [7, 11, "\u536F\u672A\u534A\u5408\u6728"],
    [3, 11, "\u4EA5\u672A\u6697\u5408\u6728"],
    [2, 6, "\u5BC5\u5348\u534A\u5408\u706B"],
    [6, 10, "\u5348\u620C\u534A\u5408\u706B"],
    [2, 10, "\u5BC5\u620C\u6697\u5408\u706B"],
    [1, 5, "\u5DF3\u9149\u534A\u5408\u91D1"],
    [5, 9, "\u9149\u4E11\u534A\u5408\u91D1"],
    [1, 9, "\u5DF3\u4E11\u6697\u5408\u91D1"]
  ];
  var L_HE = [
    [0, 1, "\u5B50\u4E11\u5408\u5316\u571F"],
    [2, 11, "\u5BC5\u4EA5\u5408\u5316\u6728"],
    [3, 10, "\u536F\u620C\u5408\u5316\u706B"],
    [4, 9, "\u8FB0\u9149\u5408\u5316\u91D1"],
    [5, 8, "\u5DF3\u7533\u5408\u5316\u6C34"],
    [6, 7, "\u5348\u672A\u5408\u5316\u571F"]
  ];
  var L_CHONG = [
    [0, 6, "\u5B50\u5348\u51B2"],
    [1, 7, "\u4E11\u672A\u51B2"],
    [2, 8, "\u5BC5\u7533\u51B2"],
    [3, 9, "\u536F\u9149\u51B2"],
    [4, 10, "\u8FB0\u620C\u51B2"],
    [5, 11, "\u5DF3\u4EA5\u51B2"]
  ];
  var L_HAI = [
    [0, 7, "\u5B50\u672A\u5BB3"],
    [1, 6, "\u4E11\u5348\u5BB3"],
    [2, 5, "\u5BC5\u5DF3\u5BB3"],
    [3, 4, "\u536F\u8FB0\u5BB3"],
    [8, 11, "\u7533\u4EA5\u5BB3"],
    [9, 10, "\u9149\u620C\u5BB3"]
  ];
  var L_PO = [
    [0, 9, "\u5B50\u7834\u9149"],
    [1, 4, "\u4E11\u7834\u8FB0"],
    [2, 11, "\u5BC5\u7834\u4EA5"],
    [3, 6, "\u536F\u7834\u5348"],
    [5, 8, "\u5DF3\u7834\u7533"],
    [7, 10, "\u672A\u7834\u620C"]
  ];
  var XING_PAIRS = [
    [2, 5, "\u5BC5\u5DF3\u76F8\u5211"],
    [5, 8, "\u5DF3\u7533\u76F8\u5211"],
    [2, 8, "\u5BC5\u7533\u76F8\u5211"],
    // 无恩刑
    [1, 7, "\u4E11\u672A\u76F8\u5211"],
    [7, 10, "\u672A\u620C\u76F8\u5211"],
    [1, 10, "\u4E11\u620C\u76F8\u5211"],
    // 恃势刑
    [0, 3, "\u5B50\u536F\u76F8\u5211"],
    [3, 0, "\u536F\u5B50\u76F8\u5211"]
    // 无礼刑
  ];
  var ZI_XING = [4, 6, 9, 11];
  var LU = { 0: 2, 1: 3, 2: 5, 3: 6, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 0 };
  function calcGanHeChong(gans, label, limitLabel) {
    const r = [];
    for (let i = 0; i < gans.length; i++) for (let j = i + 1; j < gans.length; j++) {
      const h = G5[gans[i]];
      if (h && h.p === gans[j]) r.push({ type: label + "\u5929\u5E72\u4E94\u5408", description: h.n, left: TIAN_GAN[gans[i]], right: TIAN_GAN[gans[j]] });
      if (GCHONG[gans[i]] === gans[j]) r.push({ type: label + "\u5929\u5E72\u4E94\u51B2", description: TIAN_GAN[gans[i]] + TIAN_GAN[gans[j]] + "\u76F8\u51B2", left: TIAN_GAN[gans[i]], right: TIAN_GAN[gans[j]] });
    }
    return r;
  }
  function calcBranchInteractions(zhis) {
    return calcZhiAll(zhis, "");
  }
  function calcZhiAll(zhis, label) {
    const r = [];
    const all = label || "";
    for (const [a, b, c, d] of SAN_HUI) {
      if (zhis.includes(a) && zhis.includes(b) && zhis.includes(c))
        r.push({ type: all + "\u4E09\u4F1A", description: d, left: DI_ZHI[a], right: DI_ZHI[b], third: DI_ZHI[c] });
    }
    for (const [a, b, c, d] of SAN_HE) {
      if (zhis.includes(a) && zhis.includes(b) && zhis.includes(c))
        r.push({ type: all + "\u4E09\u5408", description: d, left: DI_ZHI[a], right: DI_ZHI[b], third: DI_ZHI[c] });
    }
    for (const [a, b, d] of BAN_HE) {
      if (zhis.includes(a) && zhis.includes(b)) {
        if (!r.some((x) => x.type === all + "\u534A\u5408" && (x.left === DI_ZHI[a] && x.right === DI_ZHI[b] || x.left === DI_ZHI[b] && x.right === DI_ZHI[a])))
          r.push({ type: all + "\u534A\u5408", description: d, left: DI_ZHI[a], right: DI_ZHI[b] });
      }
    }
    for (const [a, b, d] of L_HE) {
      if (zhis.includes(a) && zhis.includes(b))
        r.push({ type: all + "\u516D\u5408", description: d, left: DI_ZHI[a], right: DI_ZHI[b] });
    }
    for (const [a, b, d] of L_CHONG) {
      if (zhis.includes(a) && zhis.includes(b))
        r.push({ type: all + "\u516D\u51B2", description: d, left: DI_ZHI[a], right: DI_ZHI[b] });
    }
    for (const [a, b, d] of L_HAI) {
      if (zhis.includes(a) && zhis.includes(b))
        r.push({ type: all + "\u516D\u5BB3", description: d, left: DI_ZHI[a], right: DI_ZHI[b] });
    }
    for (const [a, b, d] of L_PO) {
      if (zhis.includes(a) && zhis.includes(b))
        r.push({ type: all + "\u516D\u7834", description: d, left: DI_ZHI[a], right: DI_ZHI[b] });
    }
    for (const [a, b, d] of XING_PAIRS) {
      if (zhis.includes(a) && zhis.includes(b)) {
        if (!r.some((x) => x.type === all + "\u4E09\u5211" && (x.left === DI_ZHI[a] && x.right === DI_ZHI[b] || x.left === DI_ZHI[b] && x.right === DI_ZHI[a])))
          r.push({ type: all + "\u4E09\u5211", description: d, left: DI_ZHI[a], right: DI_ZHI[b] });
      }
    }
    for (const z of ZI_XING) {
      if (zhis.filter((v) => v === z).length >= 2) {
        if (!r.some((x) => x.type === all + "\u81EA\u5211" && x.left === DI_ZHI[z]))
          r.push({ type: all + "\u81EA\u5211", description: DI_ZHI[z] + "\u81EA\u5211", left: DI_ZHI[z] });
      }
    }
    return r;
  }
  function calcLuRen(dg, zhis) {
    const r = [];
    const lz = LU[dg];
    if (lz !== void 0) {
      for (let i = 0; i < zhis.length; i++) {
        if (zhis[i] === lz) r.push({ type: "\u7984", description: "\u65E5\u4E3B\u89C1" + DI_ZHI[lz] + "\u4E3A\u7984", left: TIAN_GAN[dg], right: DI_ZHI[lz] });
      }
    }
    return r;
  }
  function calcAllInteractions(pillars) {
    const gans = pillars.map((p) => p.gan);
    const zhis = pillars.map((p) => p.zhi);
    return [
      ...calcGanHeChong(gans, ""),
      ...calcZhiAll(zhis, ""),
      ...calcLuRen(gans[2], zhis)
    ];
  }
  function calcNatalWithFortune(natalPillars, fortune) {
    const allZhis = [...natalPillars.map((p) => p.zhi), fortune.zhi];
    const allGans = [...natalPillars.map((p) => p.gan), fortune.gan];
    const r = calcZhiAll(allZhis, "\u539F\u8FD0\xB7");
    r.push(...calcGanHeChong(allGans, "\u539F\u8FD0\xB7"));
    return r;
  }
  function calcNatalWithAnnual(natalPillars, annual) {
    const allZhis = [...natalPillars.map((p) => p.zhi), annual.zhi];
    const allGans = [...natalPillars.map((p) => p.gan), annual.gan];
    return [...calcZhiAll(allZhis, "\u6D41\u5E74\xB7"), ...calcGanHeChong(allGans, "\u6D41\u5E74\xB7")];
  }
  function calcFortuneWithAnnual(fortune, annual) {
    return [...calcZhiAll([fortune.zhi, annual.zhi], "\u8FD0\u5C81\xB7"), ...calcGanHeChong([fortune.gan, annual.gan], "\u8FD0\u5C81\xB7")];
  }

  // src/lunar.ts
  var LN = [
    19416,
    19168,
    42352,
    21717,
    53856,
    55632,
    91476,
    22176,
    39632,
    21972,
    19168,
    42422,
    42192,
    53840,
    119381,
    46400,
    54944,
    44450,
    38320,
    84343,
    18800,
    42160,
    46261,
    27216,
    27968,
    109396,
    11104,
    38256,
    21234,
    18800,
    25958,
    54432,
    59984,
    92821,
    23248,
    11104,
    100067,
    37600,
    116951,
    51536,
    54432,
    120998,
    46416,
    22176,
    107956,
    9680,
    37584,
    53938,
    43344,
    46423,
    27808,
    46416,
    86869,
    19872,
    42416,
    83315,
    21168,
    43432,
    59728,
    27296,
    44710,
    43856,
    19296,
    43748,
    42352,
    21088,
    62051,
    55632,
    23383,
    22176,
    38608,
    19925,
    19152,
    42192,
    54484,
    53840,
    54616,
    46400,
    46752,
    103846,
    38320,
    18864,
    43380,
    42160,
    45690,
    27216,
    27968,
    44870,
    43872,
    38256,
    19189,
    18800,
    25776,
    29859,
    59984,
    27480,
    23232,
    43872,
    38613,
    37600,
    51552,
    55636,
    54432,
    55888,
    30034,
    22176,
    43959,
    9680,
    37584,
    51893,
    43344,
    46240,
    47780,
    44368,
    21977,
    19360,
    42416,
    86390,
    21168,
    43312,
    31060,
    27296,
    44368,
    23378,
    19296,
    108198,
    42208,
    53856,
    60005,
    54576,
    23200,
    30371,
    38608,
    19195,
    19152,
    42192,
    118966,
    53840,
    54560,
    56645,
    46496,
    22224,
    21938,
    18864,
    42359,
    42160,
    43600,
    111189,
    27936,
    44448,
    84835
  ];
  var MN = ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"];
  var DN = ["\u521D\u4E00", "\u521D\u4E8C", "\u521D\u4E09", "\u521D\u56DB", "\u521D\u4E94", "\u521D\u516D", "\u521D\u4E03", "\u521D\u516B", "\u521D\u4E5D", "\u521D\u5341", "\u5341\u4E00", "\u5341\u4E8C", "\u5341\u4E09", "\u5341\u56DB", "\u5341\u4E94", "\u5341\u516D", "\u5341\u4E03", "\u5341\u516B", "\u5341\u4E5D", "\u4E8C\u5341", "\u5EFF\u4E00", "\u5EFF\u4E8C", "\u5EFF\u4E09", "\u5EFF\u56DB", "\u5EFF\u4E94", "\u5EFF\u516D", "\u5EFF\u4E03", "\u5EFF\u516B", "\u5EFF\u4E5D", "\u4E09\u5341"];
  var TG = ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"];
  var DZ = ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"];
  function solarToLunar(y, m, d) {
    const idx = y - 1900;
    if (idx < 0 || idx >= LN.length) return fallback(y);
    const target = new Date(y, m - 1, d);
    const ref = new Date(1900, 0, 31);
    let totalDays = Math.round((target.getTime() - ref.getTime()) / 864e5);
    if (totalDays < 0) return fallback(y);
    let lunarYear = 1900;
    let accum = 0;
    for (let yr = 1900; yr <= 2100; yr++) {
      const idx2 = yr - 1900;
      if (idx2 >= LN.length) break;
      const yearDays = lunarYearDays(LN[idx2]);
      if (totalDays < accum + yearDays) {
        lunarYear = yr;
        break;
      }
      accum += yearDays;
      lunarYear = yr + 1;
    }
    const off = totalDays - accum;
    const info = LN[lunarYear - 1900];
    const leapM = info & 15;
    const leapDays = leapM > 0 ? info >> 16 & 1 ? 30 : 29 : 0;
    let remaining = off;
    let lm = 1, ld = 1, isLeap = false, passed = false;
    for (let i = 0; i < 12; i++) {
      const md = info >> 15 - i & 1 ? 30 : 29;
      if (i + 1 === leapM && !passed && leapM > 0) {
        if (remaining < leapDays) {
          lm = leapM;
          ld = remaining + 1;
          isLeap = true;
          break;
        }
        remaining -= leapDays;
        passed = true;
        i--;
        continue;
      }
      if (remaining < md) {
        lm = i + 1;
        ld = remaining + 1;
        break;
      }
      remaining -= md;
    }
    if (lm > 12) {
      lm = 12;
      ld = 1;
    }
    return build(lunarYear, lm, ld, isLeap);
  }
  function build(y, m, d, leap) {
    return { year: y, lunarYearGz: TG[(y - 4) % 10] + DZ[(y - 4) % 12], month: m, monthName: leap ? "\u95F0" + MN[m - 1] : MN[m - 1], day: d, dayName: DN[d - 1] ?? d + "\u65E5", isLeap: leap, zodiac: SHENG_XIAO[((y - 4) % 12 + 12) % 12] };
  }
  function fallback(y) {
    return { year: y, lunarYearGz: TG[(y - 4) % 10] + DZ[(y - 4) % 12], month: 1, monthName: "\u672A\u77E5", day: 1, dayName: "\u672A\u77E5", isLeap: false, zodiac: SHENG_XIAO[((y - 4) % 12 + 12) % 12] };
  }
  function lunarYearDays(info) {
    const leapM = info & 15;
    let total = 0;
    for (let i = 0; i < 12; i++) total += info >> 15 - i & 1 ? 30 : 29;
    if (leapM > 0) total += info >> 16 & 1 ? 30 : 29;
    return total;
  }
  function lunarToSolar(lunarYear, lunarMonth, lunarDay, isLeap) {
    const idx = lunarYear - 1900;
    if (idx < 0 || idx >= LN.length) return null;
    if (lunarMonth < 1 || lunarMonth > 12) return null;
    if (lunarDay < 1 || lunarDay > 30) return null;
    let totalDays = 0;
    for (let y = 1900; y < lunarYear; y++) {
      const info2 = LN[y - 1900];
      totalDays += lunarYearDays(info2);
    }
    const info = LN[idx];
    const leapM = info & 15;
    let monthOk = false;
    for (let m = 1; m <= 12; m++) {
      if (m === lunarMonth && !isLeap) {
        monthOk = true;
        break;
      }
      totalDays += info >> 15 - (m - 1) & 1 ? 30 : 29;
      if (m === leapM && leapM > 0) {
        const leapDays = info >> 16 & 1 ? 30 : 29;
        if (isLeap && m === lunarMonth) {
          monthOk = true;
          break;
        }
        totalDays += leapDays;
      }
    }
    if (!monthOk) return null;
    totalDays += lunarDay - 1;
    const ref = new Date(1900, 0, 31);
    ref.setDate(ref.getDate() + Math.round(totalDays));
    return { year: ref.getFullYear(), month: ref.getMonth() + 1, day: ref.getDate() };
  }

  // src/shensha.ts
  var TIAN_GAN_ARR = ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"];
  var DI_ZHI_ARR = ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"];
  var LU2 = { 0: 2, 1: 3, 2: 5, 3: 6, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 0 };
  var TIAN_YI = { 0: [1, 7], 4: [1, 7], 1: [0, 8], 5: [0, 8], 2: [11, 9], 3: [11, 9], 6: [2, 6], 7: [2, 6], 8: [3, 5], 9: [3, 5] };
  var TAI_JI = { 0: [0, 6], 1: [0, 6], 2: [9, 3], 3: [9, 3], 4: [4, 10, 1, 7], 5: [4, 10, 1, 7], 6: [2, 11], 7: [2, 11], 8: [5, 8], 9: [5, 8] };
  var TIAN_DE_GAN = { 2: 3, 3: -1, 4: 9, 5: 7, 6: -1, 7: 0, 8: 9, 9: -1, 10: 2, 11: 1, 0: -1, 1: 6 };
  var TIAN_DE_ZHI = { 3: 7, 6: 11, 9: 2, 0: 5 };
  var YUE_DE = { 0: 9, 4: 9, 8: 9, 3: 0, 7: 0, 11: 0, 2: 2, 6: 2, 10: 2, 1: 6, 5: 6, 9: 6 };
  var FU_XING = { 0: 2, 2: 2, 4: 2, 6: 2, 8: 2, 1: 8, 3: 8, 5: 8, 7: 8, 9: 8 };
  var WEN_CHANG = { 0: 5, 1: 6, 2: 8, 4: 8, 3: 9, 5: 9, 6: 11, 7: 0, 8: 2, 9: 3 };
  var SAN_QI = { 0: [4, 6], 4: [4, 6], 6: [4, 6], 1: [2, 3], 2: [2, 3], 3: [2, 3] };
  var XUE_TANG = { 0: 11, 1: 6, 2: 2, 3: 9, 4: 2, 5: 9, 6: 5, 7: 0, 8: 8, 9: 3 };
  var CI_GUAN = { 0: 11, 1: 6, 2: 2, 3: 9, 4: 2, 5: 9, 6: 5, 7: 0, 8: 8, 9: 3 };
  var JIN_YU = { 0: 4, 1: 5, 2: 7, 3: 8, 4: 7, 5: 8, 6: 10, 7: 11, 8: 1, 9: 2 };
  var HONG_LUAN = { 0: 3, 1: 2, 2: 1, 3: 0, 4: 11, 5: 10, 6: 9, 7: 8, 8: 7, 9: 6, 10: 5, 11: 4 };
  var TIAN_XI2 = { 0: 9, 1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1, 9: 0, 10: 11, 11: 10 };
  var KUI_GANG = /* @__PURE__ */ new Set(["\u620A\u8FB0", "\u5E9A\u8FB0", "\u5E9A\u620C", "\u58EC\u620C"]);
  var YANG_REN2 = { 0: 3, 1: 2, 2: 6, 3: 5, 4: 6, 5: 5, 6: 9, 7: 8, 8: 0, 9: 11 };
  var KONG_WANG = [[10, 11], [8, 9], [6, 7], [4, 5], [2, 3], [0, 1]];
  var ZAI_SHA = { 2: 0, 6: 0, 10: 0, 3: 9, 7: 9, 11: 9, 0: 6, 4: 6, 8: 6, 1: 3, 5: 3, 9: 3 };
  var JIE_SHA = { 2: 11, 6: 11, 10: 11, 0: 5, 4: 5, 8: 5, 3: 8, 7: 8, 11: 8, 1: 2, 5: 2, 9: 2 };
  var YIN_YANG_CHA_CUO = /* @__PURE__ */ new Set(["\u4E19\u5B50", "\u4E01\u4E11", "\u620A\u5BC5", "\u8F9B\u536F", "\u58EC\u8FB0", "\u7678\u5DF3", "\u4E19\u5348", "\u4E01\u672A", "\u620A\u7533", "\u8F9B\u9149", "\u58EC\u620C", "\u7678\u4EA5"]);
  var SHI_E_DA_BAI = /* @__PURE__ */ new Set(["\u7532\u8FB0", "\u4E59\u5DF3", "\u4E19\u7533", "\u4E01\u4EA5", "\u620A\u620C", "\u5DF1\u4E11", "\u5E9A\u8FB0", "\u8F9B\u5DF3", "\u58EC\u7533", "\u7678\u4EA5"]);
  var SANG_MEN = {};
  for (let i = 0; i < 12; i++) SANG_MEN[i] = (i + 2) % 12;
  var DIAO_KE = {};
  for (let i = 0; i < 12; i++) DIAO_KE[i] = (i + 4) % 12;
  var BING_FU = {};
  for (let i = 0; i < 12; i++) BING_FU[i] = (i + 1) % 12;
  var GOU_JIAO = {};
  for (let i = 0; i < 12; i++) GOU_JIAO[i] = [(i + 3) % 12, (i - 2 + 12) % 12];
  var YUAN_CHEN = { 0: 9, 1: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 10, 7: 0, 8: 1, 9: 2, 10: 3, 11: 11 };
  var SI_DA_KONG_WANG = [[6, 7], [4, 5], [2, 3], [0, 1], [10, 11], [8, 9]];
  var JIE_LU_KONG = { 0: [8, 9], 1: [6, 7], 2: [4, 5], 3: [2, 3], 4: [0, 1], 5: [10, 11], 6: [8, 9], 7: [6, 7], 8: [4, 5], 9: [2, 3] };
  var GU_LUAN = /* @__PURE__ */ new Set(["\u4E59\u5DF3", "\u4E01\u5DF3", "\u8F9B\u4EA5", "\u620A\u7533", "\u7532\u5BC5", "\u4E19\u5348", "\u620A\u5348", "\u58EC\u5B50"]);
  var ZI_YI_MAP = { 0: [2], 2: [5], 3: [8], 6: [11], 9: [7], 10: [10], 11: [1] };
  function calcFourPillarShenSha(pillars, gender, mode = "combined") {
    const TG2 = TIAN_GAN_ARR, DZ2 = DI_ZHI_ARR;
    const result = [[], [], [], []];
    const sets = [/* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set()];
    const gans = pillars.map((p) => p.gan), zhis = pillars.map((p) => p.zhi);
    const dg = gans[2], dz = zhis[2], yg = gans[0], yz = zhis[0], mz = zhis[1];
    const push = (col, nm, ty, src) => {
      if (!sets[col].has(nm)) {
        sets[col].add(nm);
        result[col].push({ name: nm, type: ty, source: src });
      }
    };
    const lz = LU2[dg];
    if (lz != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === lz) push(i, "\u7984\u795E", "\u5409", "\u5171\u7528");
    }
    for (const sg of [dg, yg]) {
      const ty = TIAN_YI[sg] || [];
      for (let i = 0; i < 4; i++) if (ty.includes(zhis[i])) push(i, "\u5929\u4E59\u8D35\u4EBA" + (sg === dg ? "(\u65E5\u5E72)" : "(\u5E74\u5E72)"), "\u5409", "\u5171\u7528");
    }
    const tdG = TIAN_DE_GAN[mz];
    if (tdG !== void 0) {
      if (tdG < 0) {
        const tz = TIAN_DE_ZHI[mz];
        if (tz != null) {
          for (let i = 0; i < 4; i++) if (zhis[i] === tz) push(i, "\u5929\u5FB7\u8D35\u4EBA", "\u5409", "\u5171\u7528");
        }
      } else for (let i = 0; i < 4; i++) if (gans[i] === tdG) push(i, "\u5929\u5FB7\u8D35\u4EBA", "\u5409", "\u5171\u7528");
    }
    if (YUE_DE[mz] != null) {
      for (let i = 0; i < 4; i++) if (gans[i] === YUE_DE[mz]) push(i, "\u6708\u5FB7\u8D35\u4EBA", "\u5409", "\u5171\u7528");
    }
    const tj = TAI_JI[dg] || [];
    for (let i = 0; i < 4; i++) if (tj.includes(zhis[i])) push(i, "\u592A\u6781\u8D35\u4EBA", "\u5409", "\u5171\u7528");
    if (WEN_CHANG[dg] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === WEN_CHANG[dg]) push(i, "\u6587\u660C\u8D35\u4EBA", "\u5409", "\u4F20\u7EDF");
    }
    if (FU_XING[yg] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === FU_XING[yg]) push(i, "\u798F\u661F\u8D35\u4EBA", "\u5409", "\u5171\u7528");
    }
    const sq = SAN_QI[dg] || [];
    for (let i = 0; i < 4; i++) if (sq.includes(zhis[i])) push(i, "\u4E09\u5947\u8D35\u4EBA", "\u5409", "\u4F20\u7EDF");
    if (XUE_TANG[yg] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === XUE_TANG[yg]) push(i, "\u5B66\u5802", "\u5409", "\u4F20\u7EDF");
    }
    if (CI_GUAN[yg] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === CI_GUAN[yg]) push(i, "\u8BCD\u9986", "\u5409", "\u4F20\u7EDF");
    }
    if (JIN_YU[dg] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === JIN_YU[dg]) push(i, "\u91D1\u8206\u8D35\u4EBA", "\u5409", "\u4F20\u7EDF");
    }
    for (const sz of [yz, dz]) {
      const ma = { 0: 2, 4: 2, 8: 2, 3: 5, 7: 5, 11: 5, 2: 8, 6: 8, 10: 8, 1: 11, 5: 11, 9: 11 }[sz];
      if (ma != null) {
        for (let i = 0; i < 4; i++) if (zhis[i] === ma) push(i, "\u9A7F\u9A6C", "\u4E2D\u6027", "\u5171\u7528");
      }
    }
    for (const sz of [yz, dz]) {
      const th = { 0: 9, 4: 9, 8: 9, 3: 0, 7: 0, 11: 0, 2: 3, 6: 3, 10: 3, 1: 6, 5: 6, 9: 6 }[sz];
      if (th != null) {
        for (let i = 0; i < 4; i++) if (zhis[i] === th) {
          push(i, sz === 10 && zhis[i] === 3 ? "\u5899\u5916\u6843\u82B1" : "\u54B8\u6C60\u6843\u82B1", "\u4E2D\u6027", "\u5171\u7528");
        }
      }
    }
    for (const sz of [yz, dz]) {
      const hg = { 0: 4, 4: 4, 8: 4, 3: 7, 7: 7, 11: 7, 2: 10, 6: 10, 10: 10, 1: 1, 5: 1, 9: 1 }[sz];
      if (hg != null) {
        for (let i = 0; i < 4; i++) if (zhis[i] === hg) push(i, "\u534E\u76D6", "\u4E2D\u6027", "\u5171\u7528");
      }
    }
    for (const sz of [yz, dz]) {
      const jx = { 0: 0, 4: 0, 8: 0, 3: 3, 7: 3, 11: 3, 2: 6, 6: 6, 10: 6, 1: 9, 5: 9, 9: 9 }[sz];
      if (jx != null) {
        for (let i = 0; i < 4; i++) if (zhis[i] === jx) push(i, "\u5C06\u661F", "\u4E2D\u6027", "\u4F20\u7EDF");
      }
    }
    const xi = Math.floor((dz - (dg - dg % 2) + 24) % 12 / 2);
    const kw = KONG_WANG[xi] || [];
    for (let i = 0; i < 4; i++) if (kw.includes(zhis[i])) push(i, "\u7A7A\u4EA1", "\u51F6", "\u5171\u7528");
    if (KUI_GANG.has(TG2[dg] + DZ2[dz])) push(2, "\u9B41\u7F61", "\u4E2D\u6027", "\u4F20\u7EDF");
    if (HONG_LUAN[yz] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === HONG_LUAN[yz]) push(i, "\u7EA2\u9E3E", "\u4E2D\u6027", "\u4F20\u7EDF");
    }
    if (TIAN_XI2[yz] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === TIAN_XI2[yz]) push(i, "\u5929\u559C", "\u4E2D\u6027", "\u4F20\u7EDF");
    }
    const yr = YANG_REN2[dg];
    if (yr != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === yr) push(i, "\u7F8A\u5203", "\u51F6", "\u5171\u7528");
    }
    for (const sz of [yz, dz]) {
      const ws = { 0: 11, 4: 11, 8: 11, 3: 2, 7: 2, 11: 2, 2: 5, 6: 5, 10: 5, 1: 8, 5: 8, 9: 8 }[sz];
      if (ws != null) {
        for (let i = 0; i < 4; i++) if (zhis[i] === ws) push(i, "\u4EA1\u795E", "\u51F6", "\u5171\u7528");
      }
    }
    if (ZAI_SHA[yz] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === ZAI_SHA[yz]) push(i, "\u707E\u715E", "\u51F6", "\u4F20\u7EDF");
    }
    if (JIE_SHA[yz] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === JIE_SHA[yz]) push(i, "\u52AB\u715E", "\u51F6", "\u4F20\u7EDF");
    }
    for (const sz of [yz, dz]) {
      const gc = { 0: 5, 4: 5, 8: 5, 3: 8, 7: 8, 11: 8, 2: 11, 6: 11, 10: 11, 1: 2, 5: 2, 9: 2 }[sz];
      const gx = { 0: 2, 4: 2, 8: 2, 3: 5, 7: 5, 11: 5, 2: 8, 6: 8, 10: 8, 1: 11, 5: 11, 9: 11 }[sz];
      if (gc != null) {
        for (let i = 0; i < 4; i++) if (zhis[i] === gc) push(i, "\u5B64\u8FB0", "\u51F6", "\u5171\u7528");
      }
      if (gx != null) {
        for (let i = 0; i < 4; i++) if (zhis[i] === gx) push(i, "\u5BE1\u5BBF", "\u51F6", "\u5171\u7528");
      }
    }
    if (YIN_YANG_CHA_CUO.has(TG2[dg] + DZ2[dz])) push(2, "\u9634\u9633\u5DEE\u9519", "\u51F6", "\u76F2\u6D3E");
    if (SHI_E_DA_BAI.has(TG2[dg] + DZ2[dz])) push(2, "\u5341\u6076\u5927\u8D25", "\u51F6", "\u76F2\u6D3E");
    const isYangYear = yg % 2 === 0, isMale = gender === "male";
    const forward = isYangYear && isMale || !isYangYear && !isMale;
    const gou = forward ? (yz + 3) % 12 : (yz - 3 + 12) % 12, jiao = forward ? (yz - 2 + 12) % 12 : (yz + 2) % 12;
    for (let i = 0; i < 4; i++) {
      if (zhis[i] === gou) push(i, "\u52FE\u715E", "\u51F6", "\u76F2\u6D3E");
      if (zhis[i] === jiao) push(i, "\u7EDE\u715E", "\u51F6", "\u76F2\u6D3E");
    }
    if (YUAN_CHEN[yz] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === YUAN_CHEN[yz]) push(i, "\u5143\u8FB0(\u5927\u8017)", "\u51F6", "\u4F20\u7EDF");
    }
    if (yz === 10 || yz === 11) {
      for (let i = 0; i < 4; i++) if (zhis[i] === 10 || zhis[i] === 11) push(i, "\u5929\u7F57", "\u51F6", "\u4F20\u7EDF");
    }
    if (yz === 4 || yz === 5) {
      for (let i = 0; i < 4; i++) if (zhis[i] === 4 || zhis[i] === 5) push(i, "\u5730\u7F51", "\u51F6", "\u4F20\u7EDF");
    }
    if (SANG_MEN[yz] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === SANG_MEN[yz]) push(i, "\u4E27\u95E8", "\u51F6", "\u76F2\u6D3E");
    }
    if (DIAO_KE[yz] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === DIAO_KE[yz]) push(i, "\u540A\u5BA2", "\u51F6", "\u76F2\u6D3E");
    }
    if (BING_FU[yz] != null) {
      for (let i = 0; i < 4; i++) if (zhis[i] === BING_FU[yz]) push(i, "\u75C5\u7B26", "\u51F6", "\u76F2\u6D3E");
    }
    if (mode === "ren" || mode === "combined") {
      const sdkw = SI_DA_KONG_WANG[xi] || [];
      for (let i = 0; i < 4; i++) if (sdkw.includes(zhis[i])) push(i, "\u56DB\u5927\u7A7A\u4EA1", "\u51F6", "\u76F2\u6D3E");
      for (let i = 0; i < 4; i++) if ((JIE_LU_KONG[gans[i]] || []).includes(zhis[i])) push(i, "\u622A\u8DEF\u7A7A\u4EA1", "\u51F6", "\u76F2\u6D3E");
      if (GU_LUAN.has(TG2[dg] + DZ2[dz])) push(2, "\u5B64\u9E3E\u715E", "\u51F6", "\u76F2\u6D3E");
      for (let i = 0; i < 4; i++) if ((ZI_YI_MAP[yz] || []).includes(zhis[i])) push(i, "\u81EA\u7F22\u715E", "\u51F6", "\u76F2\u6D3E");
    }
    return result;
  }
  function calcFuYinFanYin(pillars) {
    const r = [];
    const g = pillars.map((p) => p.gan), z = pillars.map((p) => p.zhi), n = ["\u5E74", "\u6708", "\u65E5", "\u65F6"];
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
      if (g[i] === g[j] && z[i] === z[j]) r.push({ type: "\u4F0F\u541F", pillarA: i, pillarB: j, desc: n[i] + "\u67F1\u4E0E" + n[j] + "\u67F1\u4F0F\u541F" });
      if ((g[i] + g[j]) % 10 === 0 && (z[i] + z[j]) % 12 === 0) r.push({ type: "\u53CD\u541F", pillarA: i, pillarB: j, desc: n[i] + "\u67F1\u4E0E" + n[j] + "\u67F1\u53CD\u541F" });
    }
    return r;
  }
  function calcDaYunFuYinFanYin(yuanJu, dyGan, dyZhi) {
    const r = [];
    const n = ["\u5E74", "\u6708", "\u65E5", "\u65F6"];
    for (let i = 0; i < 4; i++) {
      if (yuanJu[i].gan === dyGan && yuanJu[i].zhi === dyZhi) r.push({ type: "\u4F0F\u541F", pillarA: i, pillarB: -1, desc: n[i] + "\u67F1\u4E0E\u5927\u8FD0\u4F0F\u541F" });
      if ((yuanJu[i].gan + dyGan) % 10 === 0 && (yuanJu[i].zhi + dyZhi) % 12 === 0) r.push({ type: "\u53CD\u541F", pillarA: i, pillarB: -1, desc: n[i] + "\u67F1\u4E0E\u5927\u8FD0\u53CD\u541F" });
    }
    return r;
  }
  function calcLiuNianFuYinFanYin(yuanJu, yGan, yZhi) {
    return calcDaYunFuYinFanYin(yuanJu, yGan, yZhi);
  }
  function calcSinglePillarShenSha(dg, yg, yz, mz, tGan, tZhi, gender, mode = "combined") {
    const fp = [{ gan: yg, zhi: yz }, { gan: 0, zhi: mz }, { gan: dg, zhi: 0 }, { gan: tGan, zhi: tZhi }];
    return calcFourPillarShenSha(fp, gender, mode)[3] || [];
  }
  function calcShenSha(dg, yg, yz, mz, pillars, monthZhi, gender) {
    const all = [];
    const set = /* @__PURE__ */ new Set();
    const pp = calcFourPillarShenSha(pillars, gender || "male", "combined");
    for (const col of pp) for (const s of col) if (!set.has(s.name)) {
      set.add(s.name);
      all.push(s);
    }
    return all;
  }
  function calcShenShaForBranch(dg, yg, yz, zhi, mz) {
    const fp = [{ gan: yg || 0, zhi: yz || 0 }, { gan: 0, zhi: mz ?? 0 }, { gan: dg || 0, zhi: 0 }, { gan: 0, zhi: zhi || 0 }];
    const r = [];
    const set = /* @__PURE__ */ new Set();
    for (const s of calcFourPillarShenSha(fp, "male", "combined")[3] || []) {
      if (!set.has(s.name)) {
        set.add(s.name);
        r.push(s);
      }
    }
    return r;
  }
  function calcAnnualShenSha(dg, yg, yz, anZhi) {
    return calcShenShaForBranch(dg, yg, yz, anZhi, 0);
  }

  // src/wangshuai.ts
  var WS_MAP = {
    "\u6728": { "\u6728": "\u65FA", "\u706B": "\u76F8", "\u6C34": "\u4F11", "\u91D1": "\u56DA", "\u571F": "\u6B7B" },
    "\u706B": { "\u706B": "\u65FA", "\u571F": "\u76F8", "\u6728": "\u4F11", "\u6C34": "\u56DA", "\u91D1": "\u6B7B" },
    "\u571F": { "\u571F": "\u65FA", "\u91D1": "\u76F8", "\u706B": "\u4F11", "\u6728": "\u56DA", "\u6C34": "\u6B7B" },
    "\u91D1": { "\u91D1": "\u65FA", "\u6C34": "\u76F8", "\u571F": "\u4F11", "\u706B": "\u56DA", "\u6728": "\u6B7B" },
    "\u6C34": { "\u6C34": "\u65FA", "\u6728": "\u76F8", "\u91D1": "\u4F11", "\u571F": "\u56DA", "\u706B": "\u6B7B" }
  };
  var MONTH_ELEMENT_BY_ZHI = {
    2: "\u6728",
    3: "\u6728",
    5: "\u706B",
    6: "\u706B",
    8: "\u91D1",
    9: "\u91D1",
    11: "\u6C34",
    0: "\u6C34",
    4: "\u571F",
    10: "\u571F",
    1: "\u571F",
    7: "\u571F"
  };
  function getWangShuai(element, monthZhi) {
    const monthEl = MONTH_ELEMENT_BY_ZHI[monthZhi] ?? "\u571F";
    return WS_MAP[monthEl]?.[element] ?? "\u4F11";
  }
  var WS_WEIGHT = { "\u65FA": 2, "\u76F8": 1.5, "\u4F11": 1, "\u56DA": 0.5, "\u6B7B": 0.3 };
  function analyzeFiveElements(baseScores, dayMasterElement, monthZhi) {
    const elNames = ["wood", "fire", "earth", "metal", "water"];
    const elChars = ["\u6728", "\u706B", "\u571F", "\u91D1", "\u6C34"];
    const wangShuai = {};
    const weights = {};
    let totalWeight = 0;
    for (let i = 0; i < 5; i++) {
      const el = elChars[i];
      const ws = getWangShuai(el, monthZhi);
      wangShuai[el] = ws;
      weights[elChars[i]] = baseScores[elNames[i]] * WS_WEIGHT[ws];
      totalWeight += weights[elChars[i]];
    }
    const dmWangShuai = getWangShuai(dayMasterElement, monthZhi);
    const isStrong = ["\u65FA", "\u76F8"].includes(dmWangShuai) || ["\u4F11", "\u56DA"].includes(dmWangShuai) && weights[dayMasterElement] / (totalWeight || 1) > 0.25;
    const sorted = [...elChars].sort((a, b) => weights[b] - weights[a]);
    const avgWeight = totalWeight / 5;
    const strongElements = sorted.filter((e) => weights[e] > avgWeight * 1.3);
    const weakElements = sorted.filter((e) => weights[e] < avgWeight * 0.7);
    return {
      scores: baseScores,
      wangShuai,
      weights,
      dayMaster: { element: dayMasterElement, wangShuai: dmWangShuai, isStrong },
      strongElements,
      weakElements
    };
  }

  // src/patterns.ts
  var SHENG = { "\u6728": "\u706B", "\u706B": "\u571F", "\u571F": "\u91D1", "\u91D1": "\u6C34", "\u6C34": "\u6728" };
  var KE = { "\u6728": "\u571F", "\u571F": "\u6C34", "\u6C34": "\u706B", "\u706B": "\u91D1", "\u91D1": "\u6728" };
  var EL_NAMES = ["\u6728", "\u706B", "\u571F", "\u91D1", "\u6C34"];
  var SAN_HE2 = {
    "\u7533\u5B50\u8FB0": "\u6C34",
    "\u4EA5\u536F\u672A": "\u6728",
    "\u5BC5\u5348\u620C": "\u706B",
    "\u5DF3\u9149\u4E11": "\u91D1"
  };
  var SAN_HUI2 = {
    "\u4EA5\u5B50\u4E11": "\u6C34",
    "\u5BC5\u536F\u8FB0": "\u6728",
    "\u5DF3\u5348\u672A": "\u706B",
    "\u7533\u9149\u620C": "\u91D1",
    "\u8FB0\u620C\u4E11\u672A": "\u571F"
  };
  var HIDDEN = {
    0: [9],
    1: [5, 9, 7],
    2: [0, 2, 4],
    3: [1],
    4: [4, 1, 9],
    5: [2, 6, 4],
    6: [3, 5],
    7: [5, 3, 1],
    8: [6, 8, 4],
    9: [7],
    10: [4, 7, 3],
    11: [8, 0]
  };
  function zWx(zhi) {
    return ZHI_WU_XING[zhi];
  }
  function mTenGod(dg, tg) {
    const r = ((Math.floor(tg / 2) - Math.floor(dg / 2)) % 5 + 5) % 5;
    const sy = dg % 2 !== tg % 2;
    const MAP2 = [["\u52AB\u8D22", "\u6BD4\u80A9"], ["\u4F24\u5B98", "\u98DF\u795E"], ["\u6B63\u8D22", "\u504F\u8D22"], ["\u6B63\u5B98", "\u4E03\u6740"], ["\u6B63\u5370", "\u504F\u5370"]];
    return MAP2[r][sy ? 0 : 1];
  }
  function hasHe(stems, pair) {
    return stems.includes(pair[0]) && stems.includes(pair[1]);
  }
  function findSanHe(zhis) {
    const names = zhis.map((z) => DI_ZHI[z]).sort().join("");
    for (const [key, wx] of Object.entries(SAN_HE2)) {
      const k = key.split("").sort().join("");
      if (names.includes(k[0]) && names.includes(k[1]) && names.includes(k[2])) return wx;
    }
    return null;
  }
  function findSanHui(zhis) {
    const names = new Set(zhis.map((z) => DI_ZHI[z]));
    for (const [key, wx] of Object.entries(SAN_HUI2)) {
      const ks = key.split("");
      if (ks.every((k) => names.has(k))) return wx;
    }
    return null;
  }
  function hasSanHeOrHui(zhis, wx) {
    const heEl = findSanHe(zhis);
    const huiEl = findSanHui(zhis);
    return heEl === wx || huiEl === wx;
  }
  function elementWeight(el, fe, hs) {
    let w = fe[{ "\u6728": "wood", "\u706B": "fire", "\u571F": "earth", "\u91D1": "metal", "\u6C34": "water" }[el] || ""] || 0;
    for (const arr of hs) {
      for (const h of arr) {
        if (h.element === el) w += 0.3;
      }
    }
    return w;
  }
  function elementRatio(el, fe, hs) {
    let total = 0, self = 0;
    for (const e of EL_NAMES) {
      const w = elementWeight(e, fe, hs);
      total += w;
      if (e === el) self = w;
    }
    return total > 0 ? self / total : 0;
  }
  function isDangLing(dmEl, mz) {
    const mWx = zWx(mz);
    const wang = { "\u6728": "\u5BC5\u536F", "\u706B": "\u5DF3\u5348", "\u571F": "\u8FB0\u620C\u4E11\u672A", "\u91D1": "\u7533\u9149", "\u6C34": "\u4EA5\u5B50" };
    return (wang[dmEl] || "").includes(DI_ZHI[mz]);
  }
  function hasRoot(dg, zhis, hs) {
    for (let i = 0; i < zhis.length; i++) {
      for (const h of hs[i]) {
        if (h.gan === dg) return true;
      }
    }
    return false;
  }
  function addTrace(parts, group, passed, detail) {
    const icon = passed ? "\u2705\u901A\u8FC7\u2192" : "\u274C\u4E0D\u6210\u7ACB";
    parts.push(`${icon}${group}\u5224\u5B9A${detail}`);
  }
  function determinePattern(bazi) {
    const { pillars, dayMaster, fiveElements: fe, hiddenStems: hs } = bazi;
    const dg = dayMaster.gan;
    const dmEl = dayMaster.element;
    const zhis = [pillars.year.zhi, pillars.month.zhi, pillars.day.zhi, pillars.hour.zhi];
    const stems = [pillars.year.gan, pillars.month.gan, pillars.day.gan, pillars.hour.gan];
    const mz = pillars.month.zhi;
    const traces = [];
    const hePairs = [
      ["\u7532\u5DF1\u5316\u571F\u683C", [0, 5], "\u571F", ["\u8FB0", "\u620C", "\u4E11", "\u672A"]],
      ["\u4E59\u5E9A\u5316\u91D1\u683C", [1, 6], "\u91D1", ["\u7533", "\u9149"]],
      ["\u4E19\u8F9B\u5316\u6C34\u683C", [2, 7], "\u6C34", ["\u4EA5", "\u5B50"]],
      ["\u4E01\u58EC\u5316\u6728\u683C", [3, 8], "\u6728", ["\u5BC5", "\u536F"]],
      ["\u620A\u7678\u5316\u706B\u683C", [4, 9], "\u706B", ["\u5DF3", "\u5348"]]
    ];
    for (const [name, pair, el, months] of hePairs) {
      if (hasHe(stems, pair)) {
        const mzName = DI_ZHI[mz];
        const monthOk = months.includes(mzName) || hasSanHeOrHui(zhis, el);
        const keEl = KE[el];
        const keRatio = elementRatio(keEl, fe, hs);
        const keOk = keRatio < 0.35;
        if (monthOk && keOk) {
          const trace = `\u6708\u652F${mzName}${months.includes(mzName) ? "\u5F53\u4EE4" : ""}\u52A9${el}\uFF0C${keEl}\u6C14\u4E0D\u7834\u5C40`;
          addTrace(traces, name, true, `\uFF1A\u5929\u5E72\u6709${TIAN_GAN[pair[0]]}${TIAN_GAN[pair[1]]}\u76F8\u5408\uFF0C${trace}`);
          return { name, group: "\u4E94\u5408\u5316\u6C14\u683C", priority: 1, trace: traces.join("\n") };
        } else {
          addTrace(traces, name, false, `\uFF1A\u5929\u5E72\u6709\u5408\u4F46${monthOk ? "" : "\u6708\u4EE4\u4E0D\u5F53"}${keOk ? "" : "\uFF0C\u6709\u514B\u7834"}`);
        }
      } else {
        addTrace(traces, name, false, "\uFF1A\u5929\u5E72\u65E0\u6B64\u5408");
      }
    }
    const zhuanWang = [
      { name: "\u66F2\u76F4\u683C", el: "\u6728", stems: "\u7532\u4E59", branches: "\u5BC5\u536F\u8FB0\u4E09\u4F1A\u6728/\u4EA5\u536F\u672A\u4E09\u5408\u6728", ke: "\u91D1" },
      { name: "\u708E\u4E0A\u683C", el: "\u706B", stems: "\u4E19\u4E01", branches: "\u5DF3\u5348\u672A\u4E09\u4F1A\u706B/\u5BC5\u5348\u620C\u4E09\u5408\u706B", ke: "\u6C34" },
      { name: "\u7A3C\u7A51\u683C", el: "\u571F", stems: "\u620A\u5DF1", branches: "\u8FB0\u620C\u4E11\u672A\u56DB\u5E93\u571F", ke: "\u6728" },
      { name: "\u4ECE\u9769\u683C", el: "\u91D1", stems: "\u5E9A\u8F9B", branches: "\u7533\u9149\u620C\u4E09\u4F1A\u91D1/\u5DF3\u9149\u4E11\u4E09\u5408\u91D1", ke: "\u706B" },
      { name: "\u6DA6\u4E0B\u683C", el: "\u6C34", stems: "\u58EC\u7678", branches: "\u4EA5\u5B50\u4E11\u4E09\u4F1A\u6C34/\u7533\u5B50\u8FB0\u4E09\u5408\u6C34", ke: "\u6C34" }
      // ke -> 土
    ];
    zhuanWang[4].ke = "\u571F";
    for (const zw of zhuanWang) {
      if (dmEl !== zw.el) {
        addTrace(traces, zw.name, false, `\uFF1A\u65E5\u4E3B\u975E${zw.stems}`);
        continue;
      }
      const dl = isDangLing(dmEl, mz);
      const zh = hasSanHeOrHui(zhis, dmEl) || dmEl === "\u571F" && !zhis.some((z) => ![1, 4, 7, 10].includes(z));
      const keRatio = elementRatio(zw.ke, fe, hs);
      const keWeak = keRatio < 0.25;
      if (dl && zh && keWeak) {
        const branchDesc = hasSanHeOrHui(zhis, dmEl) ? "\u5730\u652F\u6709\u52A9" : "";
        addTrace(traces, zw.name, true, `\uFF1A\u65E5\u4E3B${dmEl}\u5F97\u4EE4\uFF0C\u5168\u5C40${dmEl}\u52BF\u6781\u65FA\uFF0C${zw.ke}\u5F31`);
        return { name: zw.name, group: "\u4E13\u65FA\u683C\u5C40", priority: 2, trace: traces.join("\n") };
      } else {
        addTrace(traces, zw.name, false, `\uFF1A${dl ? "" : "\u65E5\u4E3B\u4E0D\u5F97\u4EE4"}${zh ? "" : "\uFF0C\u5730\u652F\u4E0D\u6210\u52BF"}${keWeak ? "" : "\uFF0C\u514B\u795E\u4E0D\u5F31"}`);
      }
    }
    const dmHasRoot = hasRoot(dg, zhis, hs);
    const hasHelp = stems.some(function(s) {
      return s === dg;
    });
    const hasPrint = stems.some(function(s) {
      var _r = ((Math.floor(s / 2) - Math.floor(dg / 2)) % 5 + 5) % 5;
      return _r === 4;
    });
    const hasNoHelp = !hasHelp && !hasPrint;
    function hasOnlyWeakRoot(dg2, zhis2, hs2) {
      let strongCount = 0;
      for (let i = 0; i < zhis2.length; i++) {
        for (const h of hs2[i]) {
          if (h.gan === dg2) {
            const idx = (HIDDEN[zhis2[i]] || []).indexOf(dg2);
            if (idx <= 1) strongCount++;
          }
        }
      }
      return strongCount === 0;
    }
    const wealthRatio = elementRatio("\u91D1", fe, hs) + elementRatio("\u6C34", fe, hs);
    function getWealthEl(dm) {
      return KE[dm];
    }
    function getShaEl(dm) {
      return KE[SHENG[dm]];
    }
    function getChildEl(dm) {
      return SHENG[dm];
    }
    function checkCongWealth(isFake) {
      const wEl = getWealthEl(dmEl);
      const wR = elementRatio(wEl, fe, hs);
      if (!hasNoHelp) return false;
      return wR > 0.5 && (isFake ? dmHasRoot && hasOnlyWeakRoot(dg, zhis, hs) : !dmHasRoot);
    }
    function checkCongSha(isFake) {
      const sEl = getShaEl(dmEl);
      const sR = elementRatio(sEl, fe, hs);
      if (!hasNoHelp) return false;
      return sR > 0.5 && (isFake ? dmHasRoot && hasOnlyWeakRoot(dg, zhis, hs) : !dmHasRoot);
    }
    function checkCongChild(isFake) {
      const cEl = getChildEl(dmEl);
      const cR = elementRatio(cEl, fe, hs);
      if (!hasNoHelp) return false;
      return cR > 0.5 && (isFake ? dmHasRoot && hasOnlyWeakRoot(dg, zhis, hs) : !dmHasRoot);
    }
    function checkCongWeak(isFake) {
      const dmR = elementRatio(dmEl, fe, hs);
      if (!hasNoHelp) return false;
      return dmR < 0.25 && (isFake ? dmHasRoot && hasOnlyWeakRoot(dg, zhis, hs) : !dmHasRoot);
    }
    const congChecks = [
      { name: "\u4ECE\u8D22\u683C", fn: checkCongWealth, elDesc: `\u5168\u5C40${getWealthEl(dmEl)}\u65FA` },
      { name: "\u4ECE\u6740\u683C", fn: checkCongSha, elDesc: `\u5168\u5C40${getShaEl(dmEl)}\u65FA` },
      { name: "\u4ECE\u513F\u683C", fn: checkCongChild, elDesc: `\u5168\u5C40${getChildEl(dmEl)}\u65FA` },
      { name: "\u4ECE\u5F31\u683C", fn: checkCongWeak, elDesc: "\u5168\u5C40\u65E0\u52A9" }
    ];
    for (const cc of congChecks) {
      if (cc.fn(false)) {
        addTrace(traces, "\u771F" + cc.name, true, `\uFF1A${cc.elDesc}\uFF0C\u65E5\u4E3B\u65E0\u6839\u65E0\u52A9` + (cc.name === "\u4ECE\u8D22\u683C" ? ",\u987A\u4ECE\u8D22\u52BF\u4E3A\u7528" : cc.name === "\u4ECE\u6740\u683C" ? ",\u987A\u4ECE\u6740\u52BF\u4E3A\u7528" : cc.name === "\u4ECE\u513F\u683C" ? ",\u987A\u52BF\u6CC4\u79C0\u4E3A\u7528" : ",\u5168\u76D8\u65E0\u751F\u6276\u4E4B\u6C14"));
        return { name: "\u771F" + cc.name, group: "\u4ECE\u683C\uFF08\u771F/\u5047\uFF09", priority: 3, trace: traces.join("\n") };
      }
      if (cc.fn(true)) {
        addTrace(traces, "\u5047" + cc.name, true, `\uFF1A${cc.elDesc}\uFF0C\u65E5\u4E3B\u4EC5\u6709\u5FAE\u6839` + (cc.name === "\u4ECE\u8D22\u683C" ? ",\u8FD0\u5236\u6839\u8F6C\u771F\u4ECE" : cc.name === "\u4ECE\u6740\u683C" ? ",\u8FD0\u5236\u6839\u8F6C\u771F\u4ECE" : cc.name === "\u4ECE\u513F\u683C" ? ",\u8FD0\u514B\u6839\u6210\u771F\u4ECE" : ",\u8FD0\u5236\u6839\u8F6C\u771F\u4ECE"));
        return { name: "\u5047" + cc.name, group: "\u4ECE\u683C\uFF08\u771F/\u5047\uFF09", priority: 3, trace: traces.join("\n") };
      }
    }
    for (const cc of congChecks) {
      addTrace(traces, cc.name, false, `\uFF1A\u4E0D\u6EE1\u8DB3\u4ECE${cc.name.replace("\u4ECE", "").replace("\u683C", "")}\u6761\u4EF6`);
    }
    const mainHS = HIDDEN[mz] || [];
    const hsOnStems = [];
    for (let idx = 0; idx < mainHS.length; idx++) {
      const g = mainHS[idx];
      if (stems.includes(g)) {
        const pri = idx === 0 ? "\u672C\u6C14" : idx === 1 ? "\u4E2D\u6C14" : "\u4F59\u6C14";
        hsOnStems.push({ gan: g, name: TIAN_GAN[g], priority: pri });
      }
    }
    hsOnStems.sort((a, b) => {
      const order = { "\u672C\u6C14": 0, "\u4E2D\u6C14": 1, "\u4F59\u6C14": 2 };
      return order[a.priority] - order[b.priority];
    });
    let selectedGan;
    let selectedTrace;
    if (hsOnStems.length > 0) {
      selectedGan = hsOnStems[0].gan;
      selectedTrace = `\u6708\u652F${DI_ZHI[mz]}\u85CF\u5E72\uFF1A${mainHS.map((g) => TIAN_GAN[g]).join("\u3001")}\uFF1B${hsOnStems[0].priority}${TIAN_GAN[selectedGan]}\u900F\u5E72`;
    } else {
      selectedGan = mainHS[0] || 0;
      selectedTrace = `\u6708\u652F${DI_ZHI[mz]}\u5168\u4E0D\u900F\u5E72\uFF0C\u672C\u6C14${TIAN_GAN[selectedGan]}\u5B9A\u683C`;
    }
    const pg = mTenGod(dg, selectedGan);
    const geMap = {
      "\u6B63\u5B98": "\u6B63\u5B98\u683C",
      "\u4E03\u6740": "\u4E03\u6740\u683C",
      "\u6B63\u8D22": "\u6B63\u8D22\u683C",
      "\u504F\u8D22": "\u504F\u8D22\u683C",
      "\u6B63\u5370": "\u6B63\u5370\u683C",
      "\u504F\u5370": "\u504F\u5370\u683C",
      "\u98DF\u795E": "\u98DF\u795E\u683C",
      "\u4F24\u5B98": "\u4F24\u5B98\u683C",
      "\u6BD4\u80A9": "\u5EFA\u7984\u683C",
      "\u52AB\u8D22": "\u7F8A\u5203\u683C"
    };
    const ge = geMap[pg];
    if (ge && pg !== "\u6BD4\u80A9" && pg !== "\u52AB\u8D22") {
      const useDesc = {
        "\u6B63\u5B98": "\u56DB\u5409\u795E\u987A\u7528\uFF0C\u559C\u8D22\u751F\u5B98\u3001\u5370\u62A4\u5B98\uFF1B\u5FCC\u4F24\u5B98\u514B\u5B98",
        "\u4E03\u6740": "\u56DB\u51F6\u795E\u9006\u7528\uFF0C\u559C\u98DF\u795E\u5236\u6740\u3001\u5370\u661F\u5316\u6740\uFF1B\u5FCC\u65E0\u5236\u653B\u8EAB",
        "\u6B63\u8D22": "\u56DB\u5409\u795E\u987A\u7528\uFF0C\u559C\u98DF\u4F24\u751F\u8D22\u3001\u5B98\u62A4\u8D22\uFF1B\u5FCC\u6BD4\u52AB\u593A\u8D22",
        "\u504F\u8D22": "\u56DB\u5409\u795E\u987A\u7528\uFF0C\u559C\u98DF\u4F24\u751F\u8D22\u3001\u5B98\u62A4\u8D22\uFF1B\u5FCC\u6BD4\u52AB\u8017\u8D22",
        "\u5370": "\u56DB\u5409\u795E\u987A\u7528\uFF0C\u559C\u5B98\u6740\u751F\u5370\uFF1B\u5FCC\u8D22\u661F\u7834\u5370",
        "\u98DF\u795E": "\u56DB\u5409\u795E\u987A\u7528\uFF0C\u559C\u751F\u8D22\u6CC4\u79C0\uFF1B\u5FCC\u67AD\u795E\u593A\u98DF",
        "\u4F24\u5B98": "\u56DB\u51F6\u795E\u9006\u7528\uFF0C\u559C\u751F\u8D22\u3001\u914D\u5370\uFF1B\u5FCC\u4F24\u5B98\u89C1\u5B98",
        "\u504F\u5370": "\u56DB\u51F6\u795E\u9006\u7528\uFF0C\u559C\u504F\u8D22\u5236\u8861\u3001\u98DF\u795E\u6CC4\u5370\uFF1B\u5FCC\u504F\u5370\u593A\u98DF"
      };
      const useText = useDesc[pg] || "";
      addTrace(traces, ge, true, `\uFF1A${selectedTrace}\u2192${pg}${useText ? "\uFF0C" + useText : ""}`);
      return { name: ge, group: "\u6B63\u7EDF\u516B\u683C", priority: 4, trace: traces.join("\n") };
    }
    if (pg === "\u6BD4\u80A9") {
      addTrace(traces, "\u5EFA\u7984\u683C", true, `\uFF1A\u6708\u652F${DI_ZHI[mz]}\u4E3A\u65E5\u4E3B\u4E34\u5B98\u7984\u4F4D\uFF0C\u5341\u795E\u6BD4\u80A9\uFF0C\u65E0\u5148\u5929\u6708\u4EE4\u683C\u5C40\uFF0C\u4EE5\u8EAB\u65FA\u8EAB\u5F31\u5B9A\u75C5\u836F\uFF1A\u65FA\u5219\u5236\u6CC4\uFF0C\u5F31\u5219\u5E2E\u6276`);
      return { name: "\u5EFA\u7984\u683C", group: "\u7984\u5203\u5916\u683C", priority: 5, trace: traces.join("\n") };
    }
    if (pg === "\u52AB\u8D22") {
      addTrace(traces, "\u7F8A\u5203\u683C", true, `\uFF1A\u6708\u652F${DI_ZHI[mz]}\u4E3A\u65E5\u4E3B\u5E1D\u65FA\u7F8A\u5203\u4F4D\uFF0C\u5341\u795E\u52AB\u8D22\uFF0C\u75C5\u5728\u5203\u65FA\uFF0C\u9996\u9009\u5B98\u6740\u9A7E\u5203\u5236\u65FA\uFF0C\u6B21\u53D6\u98DF\u4F24\u6CC4\u79C0`);
      return { name: "\u7F8A\u5203\u683C", group: "\u7984\u5203\u5916\u683C", priority: 5, trace: traces.join("\n") };
    }
    if (dg === 6 || dg === 7) {
      if (findSanHe(zhis) === "\u6C34") {
        addTrace(traces, "\u4E95\u680F\u53C9\u683C", true, "\uFF1A\u5E9A\u91D1\u65E5\u4E3B\uFF0C\u7533\u5B50\u8FB0\u4E09\u5408\u6C34\u5C40\uFF0C\u4F24\u5B98\u6CC4\u79C0\u6210\u683C");
        return { name: "\u4E95\u680F\u53C9\u683C", group: "\u7ECF\u5178\u7279\u6B8A\u5916\u683C", priority: 6, trace: traces.join("\n") };
      }
    }
    if (dg === 0 && zhis.filter((z) => z === 0).length >= 2) {
      addTrace(traces, "\u5B50\u9065\u5DF3\u683C", true, "\uFF1A\u7532\u5B50\u65E5\u4E3B\uFF0C\u5730\u652F\u5B50\u9065\u5408\u5DF3\u706B\u5B98\u661F");
      return { name: "\u5B50\u9065\u5DF3\u683C", group: "\u7ECF\u5178\u7279\u6B8A\u5916\u683C", priority: 6, trace: traces.join("\n") };
    }
    if (dg <= 1 && zhis.some((z) => z === 10 || z === 11)) {
      addTrace(traces, "\u516D\u7532\u8D8B\u4E7E\u683C", true, "\uFF1A\u7532\u65E5\u4E3B\uFF0C\u5730\u652F\u89C1\u620C\u4EA5\u4E7E\u5BAB");
      return { name: "\u516D\u7532\u8D8B\u4E7E\u683C", group: "\u7ECF\u5178\u7279\u6B8A\u5916\u683C", priority: 6, trace: traces.join("\n") };
    }
    addTrace(traces, "\u7279\u6B8A\u5916\u683C", false, "\uFF1A\u4E0D\u6EE1\u8DB3\u4EFB\u4F55\u7279\u6B8A\u5916\u683C\u6761\u4EF6");
    addTrace(traces, "\uFF08\u515C\u5E95\uFF09", true, `\uFF1A\u6708\u4EE4\u672C\u6C14${TIAN_GAN[mainHS[0]]}\u5341\u795E${pg}\u5B9A${ge || "\u666E\u901A\u683C\u5C40"}`);
    return { name: ge || "\u666E\u901A\u683C\u5C40", group: "\u6B63\u7EDF\u516B\u683C", priority: 4, trace: traces.join("\n") };
  }
  function getAllPatterns() {
    return [
      { group: "\u3010\u4E94\u5408\u5316\u6C14\u683C\u3011", names: ["\u7532\u5DF1\u5316\u571F\u683C", "\u4E59\u5E9A\u5316\u91D1\u683C", "\u4E19\u8F9B\u5316\u6C34\u683C", "\u4E01\u58EC\u5316\u6728\u683C", "\u620A\u7678\u5316\u706B\u683C"] },
      { group: "\u3010\u4E13\u65FA\u683C\u5C40\u3011", names: ["\u66F2\u76F4\u683C", "\u708E\u4E0A\u683C", "\u7A3C\u7A51\u683C", "\u4ECE\u9769\u683C", "\u6DA6\u4E0B\u683C"] },
      { group: "\u3010\u4ECE\u683C\uFF08\u771F/\u5047\uFF09\u3011", names: ["\u771F\u4ECE\u8D22\u683C", "\u5047\u4ECE\u8D22\u683C", "\u771F\u4ECE\u6740\u683C", "\u5047\u4ECE\u6740\u683C", "\u771F\u4ECE\u513F\u683C", "\u5047\u4ECE\u513F\u683C", "\u771F\u4ECE\u5F31\u683C", "\u5047\u4ECE\u5F31\u683C"] },
      { group: "\u3010\u6B63\u7EDF\u516B\u683C\u3011", names: ["\u6B63\u5B98\u683C", "\u4E03\u6740\u683C", "\u6B63\u8D22\u683C", "\u504F\u8D22\u683C", "\u6B63\u5370\u683C", "\u504F\u5370\u683C", "\u98DF\u795E\u683C", "\u4F24\u5B98\u683C"] },
      { group: "\u3010\u7984\u5203\u5916\u683C\u3011", names: ["\u5EFA\u7984\u683C", "\u7F8A\u5203\u683C"] },
      { group: "\u3010\u7ECF\u5178\u7279\u6B8A\u5916\u683C\u3011", names: ["\u4E95\u680F\u53C9\u683C", "\u5B50\u9065\u5DF3\u683C", "\u516D\u7532\u8D8B\u4E7E\u683C"] }
    ];
  }

  // src/constitution.ts
  function getSeason(mz) {
    const zhiName = DI_ZHI[mz];
    if (["\u5BC5", "\u536F", "\u8FB0"].includes(zhiName)) return "\u6625";
    if (["\u5DF3", "\u5348", "\u672A"].includes(zhiName)) return "\u590F";
    if (["\u7533", "\u9149", "\u620C"].includes(zhiName)) return "\u79CB";
    if (["\u4EA5", "\u5B50", "\u4E11"].includes(zhiName)) return "\u51AC";
    return "\u5B63";
  }
  function getConstitutionElement(dg) {
    const wx = GAN_WU_XING[dg];
    if (wx === "\u6728") return "\u6728";
    if (wx === "\u706B") return "\u706B";
    if (wx === "\u571F") return "\u6E7F";
    if (wx === "\u91D1") return "\u71E5";
    return "\u5BD2";
  }
  function getConstitutionKey(mz, dg) {
    return `${getSeason(mz)}${getConstitutionElement(dg)}`;
  }
  var constitutionMap = {
    "\u6625\u6728": {
      name: "\u6625\u6728\u4F53\u8D28",
      jiBing: "\u6625\u5E94\u809D\u800C\u517B\u751F\uFF0C\u6728\u6C14\u5F53\u4EE4\uFF0C\u809D\u6C14\u5347\u53D1\u592A\u8FC7\u5219\u6613\u9633\u4EA2\u98CE\u52A8\uFF0C\u51FA\u73B0\u7729\u6655\u3001\u5934\u75DB\u3001\u76EE\u8D64\u3001\u6613\u6012\u3001\u5931\u7720\u3001\u8840\u538B\u6CE2\u52A8\uFF1B\u6728\u65FA\u514B\u571F\uFF0C\u813E\u5931\u5065\u8FD0\u5219\u8179\u80C0\u7EB3\u5DEE\u3001\u5927\u4FBF\u5931\u8C03\uFF1B\u809D\u6C14\u90C1\u7ED3\u4E0D\u8212\u5219\u4E24\u80C1\u80C0\u75DB\u3001\u5584\u592A\u606F\u3001\u60C5\u7EEA\u6291\u90C1\u4E0E\u70E6\u8E81\u4EA4\u66FF\u3002\u6625\u5B63\u98CE\u90AA\u504F\u76DB\uFF0C\u4E0E\u4F53\u5185\u90C1\u70ED\u76F8\u640F\uFF0C\u6613\u53D1\u98CE\u75B9\u3001\u76AE\u80A4\u8FC7\u654F\u3001\u76EE\u75D2\u9F3B\u585E\u7B49\u98CE\u70ED\u8868\u8BC1\u3002",
      qingZhi: "\u809D\u5728\u5FD7\u4E3A\u6012\uFF0C\u6625\u6728\u4E4B\u4EBA\u809D\u6C14\u504F\u65FA\uFF0C\u5B9C\u8C03\u7545\u60C5\u5FD7\u3001\u758F\u6CC4\u6709\u5EA6\u3002\u5EFA\u8BAE\u591A\u63A5\u89E6\u81EA\u7136\u3001\u5EAD\u9662\u6563\u6B65\u3001\u542C\u8212\u7F13\u97F3\u4E50\uFF1B\u7EC3\u4E60\u4E66\u6CD5\u3001\u7ED8\u753B\u3001\u56ED\u827A\u7B49\u9759\u5FC3\u6D3B\u52A8\u5236\u7EA6\u809D\u9633\u8FC7\u4EA2\uFF1B\u907F\u514D\u60C5\u7EEA\u66B4\u6012\u4E0E\u538B\u6291\u4EA4\u66FF\uFF0C\u5B66\u4F1A\u5408\u7406\u8868\u8FBE\u4E0D\u6EE1\uFF1B\u4E0E\u4EB2\u53CB\u503E\u8BC9\u3001\u53C2\u52A0\u8F7B\u677E\u793E\u4EA4\u6D3B\u52A8\u758F\u89E3\u809D\u90C1\u3002\u591A\u6B23\u8D4F\u7EFF\u8272\u666F\u7269\u517B\u809D\u660E\u76EE\u3002",
      yinShi: "\u5B9C\u98DF\u8F9B\u7518\u53D1\u6563\u4E4B\u54C1\u52A9\u9633\u6C14\u5347\u53D1\uFF1A\u97ED\u83DC\u3001\u9999\u693F\u3001\u8C46\u82BD\u3001\u8471\u849C\u3001\u9999\u83DC\u3001\u83E0\u83DC\u3001\u82B9\u83DC\uFF1B\u9002\u5F53\u589E\u52A0\u52A8\u7269\u809D\u810F\u8865\u8840\u517B\u809D\u3002\u5FCC\u98DF\u9178\u5473\u6536\u655B\u592A\u8FC7\uFF08\u918B\u3001\u4E4C\u6885\u3001\u5C71\u6942\u5B9C\u5C11\uFF09\uFF0C\u4EE5\u514D\u788D\u809D\u6C14\u5347\u53D1\uFF1B\u5C11\u98DF\u6CB9\u817B\u539A\u5473\u53CA\u714E\u70B8\u70E7\u70E4\uFF0C\u51CF\u8F7B\u813E\u80C3\u8D1F\u62C5\u3002\u5B9C\u996E\u83CA\u82B1\u67B8\u675E\u8336\u758F\u98CE\u6E05\u809D\uFF0C\u73AB\u7470\u82B1\u8336\u758F\u809D\u89E3\u90C1\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4E1C\u5357\u671D\u5411\uFF0C\u591A\u5F00\u7A97\u901A\u98CE\uFF0C\u4FDD\u6301\u7A7A\u6C14\u6D41\u901A\uFF1B\u5BA4\u5185\u5B9C\u653E\u7F6E\u7EFF\u8272\u690D\u7269\uFF08\u5982\u7EFF\u841D\u3001\u6587\u7AF9\u3001\u5BCC\u8D35\u7AF9\uFF09\u52A9\u6728\u6C14\u6761\u8FBE\uFF1B\u907F\u514D\u957F\u671F\u5904\u4E8E\u9634\u6697\u6F6E\u6E7F\u3001\u901A\u98CE\u4E0D\u826F\u73AF\u5883\u3002\u6625\u5B63\u82B1\u7C89\u64AD\u6563\u671F\u5916\u51FA\u4F69\u6234\u53E3\u7F69\uFF0C\u51CF\u5C11\u98CE\u90AA\u4FB5\u88AD\u3002\u529E\u516C\u73AF\u5883\u5149\u7EBF\u660E\u4EAE\u3001\u89C6\u91CE\u5F00\u9614\uFF0C\u907F\u514D\u538B\u6291\u5C40\u4FC3\u7A7A\u95F4\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u4F38\u5C55\u8212\u5C55\u7C7B\u8FD0\u52A8\u52A9\u809D\u6C14\u6761\u8FBE\uFF1A\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u745C\u4F3D\u62C9\u4F38\u3001\u6162\u8DD1\u3001\u5FEB\u8D70\u3001\u7FBD\u6BDB\u7403\u3001\u653E\u98CE\u7B5D\uFF1B\u8FD0\u52A8\u91CF\u4EE5\u5FAE\u6C57\u51FA\u4E3A\u5EA6\uFF0C\u4E0D\u53EF\u5927\u6C57\u6DCB\u6F13\u8017\u6C14\u4F24\u9634\u3002\u6668\u8D77\u68B3\u5934100\u6B21\u3001\u6413\u6469\u4E24\u80C1\u758F\u809D\u7406\u6C14\u3001\u6309\u63C9\u592A\u51B2\u7A74\u758F\u6CC4\u809D\u706B\u3001\u64E6\u6D8C\u6CC9\u5F15\u706B\u5F52\u5143\uFF1B\u907F\u514D\u9AD8\u5F3A\u5EA6\u5BF9\u6297\u6027\u8FD0\u52A8\u5F15\u53D1\u60C5\u7EEA\u6CE2\u52A8\u3002"
    },
    "\u6625\u706B": {
      name: "\u6625\u706B\u4F53\u8D28",
      jiBing: "\u6625\u5E94\u809D\uFF0C\u6728\u751F\u706B\uFF0C\u706B\u6C14\u5185\u4F0F\u5219\u5FC3\u706B\u504F\u4EA2\uFF0C\u51FA\u73B0\u5FC3\u70E6\u5931\u7720\u3001\u53E3\u820C\u751F\u75AE\u3001\u5C0F\u4FBF\u77ED\u8D64\u3001\u9762\u7EA2\u76EE\u8D64\u3001\u53E3\u5E72\u820C\u71E5\uFF1B\u6728\u706B\u5211\u91D1\uFF0C\u80BA\u5931\u6E05\u8083\u5219\u5E72\u54B3\u5C11\u75F0\u3001\u54BD\u5589\u5E72\u75DB\uFF1B\u5FC3\u706B\u4E0B\u79FB\u5C0F\u80A0\u5219\u5C3F\u9891\u5C3F\u6025\u3002\u6625\u5B63\u6C14\u6E29\u56DE\u5347\uFF0C\u706B\u70ED\u4E0E\u5916\u98CE\u76F8\u5408\u6613\u6210\u98CE\u70ED\u611F\u5192\uFF0C\u75C7\u89C1\u53D1\u70ED\u54BD\u75DB\u3001\u9EC4\u75F0\u3001\u76EE\u8D64\u3002",
      qingZhi: "\u5FC3\u5728\u5FD7\u4E3A\u559C\uFF0C\u6625\u706B\u4E4B\u4EBA\u706B\u6027\u708E\u4E0A\uFF0C\u5B9C\u606C\u6DE1\u865A\u65E0\u3001\u6E05\u5FC3\u5BE1\u6B32\u3002\u5EFA\u8BAE\u7EC3\u4E60\u9759\u5750\u51A5\u60F3\u3001\u8179\u5F0F\u547C\u5438\u5E73\u6291\u5FC3\u706B\uFF1B\u907F\u514D\u5927\u559C\u8FC7\u671B\u3001\u60C5\u7EEA\u6FC0\u52A8\u8017\u4F24\u5FC3\u6C14\uFF1B\u51CF\u5C11\u71AC\u591C\uFF0C\u4FDD\u8BC1\u5145\u8DB3\u7761\u7720\u4EE5\u517B\u9634\u5236\u706B\uFF1B\u57F9\u517B\u7434\u68CB\u4E66\u753B\u7B49\u9759\u96C5\u7231\u597D\u8C03\u517B\u5FC3\u795E\u3002\u4E0D\u5B9C\u53C2\u4E0E\u8FC7\u4E8E\u55A7\u95F9\u523A\u6FC0\u7684\u5A31\u4E50\u6D3B\u52A8\u3002",
      yinShi: "\u5B9C\u98DF\u7518\u51C9\u6E05\u6DA6\u4E4B\u54C1\u6E05\u5FC3\u964D\u706B\uFF1A\u82E6\u74DC\u3001\u9EC4\u74DC\u3001\u51AC\u74DC\u3001\u4E1D\u74DC\u3001\u897F\u74DC\u3001\u68A8\u3001\u7518\u8517\u3001\u8378\u8360\u3001\u83B2\u85D5\u3001\u7EFF\u8C46\uFF1B\u9002\u5F53\u98DF\u7528\u767E\u5408\u3001\u83B2\u5B50\u3001\u9EA6\u51AC\u3001\u6C99\u53C2\u7B49\u6ECB\u9634\u6E05\u5FC3\u3002\u5FCC\u98DF\u8F9B\u8FA3\u71E5\u70ED\uFF08\u8FA3\u6912\u3001\u82B1\u6912\u3001\u7F8A\u8089\u3001\u9152\u7C7B\uFF09\uFF0C\u4EE5\u514D\u706B\u4E0A\u6D47\u6CB9\uFF1B\u5C11\u98DF\u6E29\u8865\u4E4B\u54C1\u3002\u5B9C\u996E\u83CA\u82B1\u8336\u3001\u91D1\u94F6\u82B1\u8336\u3001\u7AF9\u53F6\u8336\u6E05\u5FC3\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u6E05\u51C9\u901A\u98CE\uFF0C\u907F\u514D\u897F\u6652\u548C\u95F7\u70ED\uFF1B\u5BA4\u5185\u53EF\u653E\u7F6E\u6C34\u666F\u88C5\u9970\uFF08\u9C7C\u7F38\u3001\u6D41\u6C34\u6446\u4EF6\uFF09\u52A9\u6C34\u706B\u65E2\u6D4E\uFF1B\u7A97\u5E18\u7528\u6DE1\u84DD\u3001\u6D45\u7EFF\u8272\u8C03\u8425\u9020\u5B81\u9759\u6C1B\u56F4\uFF1B\u529E\u516C\u533A\u907F\u514D\u5EA7\u4F4D\u6B63\u5BF9\u7A7A\u8C03\u51FA\u98CE\u53E3\u76F4\u5439\u53D7\u98CE\u90AA\u3002\u7761\u7720\u73AF\u5883\u5B9C\u5B89\u9759\u3001\u660F\u6697\u3001\u51C9\u723D\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u8212\u7F13\u5E73\u548C\u8FD0\u52A8\u5E73\u6291\u5FC3\u706B\uFF1A\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u745C\u4F3D\u51A5\u60F3\u3001\u6563\u6B65\u3001\u6E38\u6CF3\uFF1B\u8FD0\u52A8\u5F3A\u5EA6\u4E2D\u7B49\uFF0C\u4EE5\u51FA\u6C57\u540E\u5FC3\u5883\u5E73\u9759\u4E3A\u5EA6\u3002\u6309\u63C9\u795E\u95E8\u7A74\u5B89\u795E\u5B9A\u5FD7\u3001\u5185\u5173\u7A74\u5B81\u5FC3\u9664\u70E6\u3001\u592A\u51B2\u7A74\u758F\u6CC4\u706B\u6C14\uFF1B\u7761\u524D\u70ED\u6C34\u6CE1\u811A\u5F15\u706B\u4E0B\u884C\uFF1B\u907F\u514D\u70C8\u65E5\u4E0B\u66B4\u6652\u8FD0\u52A8\u8BF1\u53D1\u5FC3\u706B\u3002"
    },
    "\u6625\u6E7F": {
      name: "\u6625\u6E7F\u4F53\u8D28",
      jiBing: "\u6625\u5E94\u809D\uFF0C\u6728\u514B\u571F\uFF0C\u6E7F\u56F0\u813E\u571F\u5219\u8FD0\u5316\u5931\u53F8\uFF0C\u51FA\u73B0\u8118\u8179\u80C0\u6EE1\u3001\u98DF\u6B32\u4E0D\u632F\u3001\u5927\u4FBF\u6E8F\u8584\u9ECF\u817B\u3001\u8EAB\u4F53\u6C89\u91CD\u3001\u5934\u91CD\u5982\u88F9\u3001\u80A2\u4F53\u56F0\u5026\u61D2\u52A8\uFF1B\u6E7F\u963B\u4E2D\u7126\u5219\u53E3\u6DE1\u4E0D\u6E34\u3001\u820C\u82D4\u539A\u817B\uFF1B\u6E7F\u6C14\u4E0B\u6CE8\u5219\u4E0B\u80A2\u6D6E\u80BF\u3001\u5173\u8282\u6C89\u91CD\u9178\u75DB\u3002\u6625\u5B63\u96E8\u6C34\u589E\u591A\uFF0C\u5916\u6E7F\u5F15\u52A8\u5185\u6E7F\uFF0C\u75C7\u72B6\u52A0\u91CD\u3002",
      qingZhi: "\u813E\u5728\u5FD7\u4E3A\u601D\uFF0C\u6625\u6E7F\u4E4B\u4EBA\u6E7F\u56F0\u813E\u571F\uFF0C\u601D\u8651\u8FC7\u5EA6\u5219\u6C14\u7ED3\u4E0D\u8FD0\u3002\u5B9C\u51CF\u5C11\u601D\u8651\uFF0C\u907F\u514D\u591A\u601D\u591A\u8651\u52A0\u91CD\u4F24\u813E\uFF1B\u57F9\u517B\u8C41\u8FBE\u4E50\u89C2\u5FC3\u6001\uFF0C\u4E0D\u5B9C\u94BB\u725B\u89D2\u5C16\uFF1B\u9002\u5F53\u793E\u4EA4\u5A31\u4E50\u5206\u6563\u6CE8\u610F\u529B\uFF1B\u591A\u4E0E\u5F00\u6717\u4E50\u89C2\u4E4B\u4EBA\u76F8\u5904\uFF0C\u907F\u514D\u72EC\u5904\u6C89\u601D\u52A0\u91CD\u90C1\u7ED3\u3002",
      yinShi: "\u5B9C\u98DF\u5065\u813E\u795B\u6E7F\u4E4B\u54C1\uFF1A\u858F\u82E1\u4EC1\u3001\u767D\u6241\u8C46\u3001\u8D64\u5C0F\u8C46\u3001\u832F\u82D3\u3001\u5C71\u836F\u3001\u767D\u672F\u3001\u82A1\u5B9E\u3001\u9648\u76AE\u3001\u51AC\u74DC\u3001\u9CAB\u9C7C\u3001\u7389\u7C73\u987B\uFF1B\u9002\u91CF\u751F\u59DC\u3001\u80E1\u6912\u6E29\u4E2D\u5316\u6E7F\u3002\u5FCC\u98DF\u751F\u51B7\u74DC\u679C\u3001\u51B0\u996E\u3001\u80A5\u7518\u539A\u817B\u3001\u751C\u98DF\u3001\u4E73\u5236\u54C1\u52A9\u6E7F\u751F\u75F0\uFF1B\u5C11\u996E\u9152\u7C7B\u3002\u5B9C\u996E\u9648\u76AE\u666E\u6D31\u8336\u3001\u858F\u7C73\u6C34\u3001\u832F\u82D3\u8336\u5065\u813E\u5229\u6E7F\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u5730\u52BF\u9AD8\u723D\u5E72\u71E5\u671D\u5357\uFF0C\u591A\u901A\u98CE\u9664\u6E7F\uFF1B\u907F\u514D\u5C45\u4F4F\u5728\u4E00\u697C\u6F6E\u6E7F\u3001\u5730\u4E0B\u5BA4\u7B49\u73AF\u5883\uFF1B\u5BA4\u5185\u653E\u7F6E\u9664\u6E7F\u673A\u3001\u7AF9\u70AD\u5305\u5438\u6F6E\uFF1B\u88AB\u8925\u7ECF\u5E38\u667E\u6652\u9632\u6F6E\u3002\u529E\u516C\u73AF\u5883\u907F\u514D\u5EA7\u4F4D\u9760\u8FD1\u996E\u6C34\u673A\u3001\u536B\u751F\u95F4\u7B49\u6F6E\u6E7F\u533A\u57DF\u3002\u6625\u5B63\u9634\u96E8\u5929\u6C14\u51CF\u5C11\u5916\u51FA\uFF0C\u51FA\u95E8\u643A\u5E26\u96E8\u5177\u9632\u5916\u6E7F\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u9002\u5F53\u51FA\u6C57\u7684\u8FD0\u52A8\u52A9\u6E7F\u6C14\u6392\u51FA\uFF1A\u6162\u8DD1\u3001\u5FEB\u8D70\u3001\u722C\u5C71\u3001\u745C\u4F3D\u70ED\u6C57\u6392\u6BD2\u3001\u5065\u8EAB\u623F\u529B\u91CF\u8BAD\u7EC3\uFF1B\u8FD0\u52A8\u540E\u53CA\u65F6\u64E6\u5E72\u6C57\u6C34\u3001\u66F4\u6362\u5E72\u723D\u8863\u7269\uFF0C\u907F\u514D\u6C57\u51FA\u5F53\u98CE\u3002\u6309\u63C9\u8DB3\u4E09\u91CC\u5065\u813E\u548C\u80C3\u3001\u9634\u9675\u6CC9\u5229\u6C34\u6E17\u6E7F\u3001\u4E30\u9686\u5316\u75F0\u795B\u6E7F\uFF1B\u827E\u7078\u5173\u5143\u3001\u6C14\u6D77\u6E29\u9633\u5316\u6E7F\u3002"
    },
    "\u6625\u71E5": {
      name: "\u6625\u71E5\u4F53\u8D28",
      jiBing: "\u6625\u5E94\u809D\uFF0C\u6728\u65FA\u5219\u8017\u6D25\u4F24\u9634\uFF0C\u91D1\u4E0D\u5236\u6728\u5219\u71E5\u8C61\u663E\u73B0\uFF0C\u51FA\u73B0\u76AE\u80A4\u5E72\u71E5\u8131\u5C51\u3001\u53E3\u5E72\u9F3B\u71E5\u3001\u54BD\u5589\u5E72\u75D2\u3001\u5E72\u54B3\u5C11\u75F0\u3001\u5927\u4FBF\u5E72\u7ED3\u3001\u6BDB\u53D1\u67AF\u69C1\uFF1B\u71E5\u4F24\u80BA\u9634\u5219\u9F3B\u8844\u3001\u58F0\u97F3\u5636\u54D1\uFF1B\u71E5\u4F24\u809D\u9634\u5219\u76EE\u6DA9\u5E72\u75D2\u3001\u722A\u7532\u5E72\u88C2\u3002\u6625\u5B63\u591A\u98CE\u52A0\u5267\u6D25\u6DB2\u8017\u6563\u3002",
      qingZhi: "\u809D\u5728\u5FD7\u4E3A\u6012\uFF0C\u6625\u71E5\u4E4B\u4EBA\u9634\u865A\u706B\u65FA\uFF0C\u60C5\u5FD7\u6613\u6025\u8E81\u6613\u6012\u3002\u5B9C\u517B\u9634\u6DA6\u71E5\u3001\u5E73\u5FC3\u9759\u6C14\uFF1B\u5EFA\u8BAE\u8046\u542C\u6D41\u6C34\u58F0\u3001\u96E8\u58F0\u7B49\u81EA\u7136\u767D\u566A\u97F3\u5B89\u795E\uFF1B\u7EC3\u4E60\u6DF1\u547C\u5438\u3001\u51A5\u60F3\u8C03\u606F\u4EE5\u6ECB\u9634\u964D\u706B\uFF1B\u907F\u514D\u60C5\u7EEA\u5267\u70C8\u6CE2\u52A8\u8017\u4F24\u9634\u6DB2\u3002\u591A\u63A5\u89E6\u6C34\u666F\u56ED\u6797\uFF0C\u4EE5\u6C34\u6DA6\u6728\u3002",
      yinShi: "\u5B9C\u98DF\u7518\u5BD2\u6ECB\u6DA6\u4E4B\u54C1\u517B\u9634\u6DA6\u71E5\uFF1A\u68A8\u3001\u94F6\u8033\u3001\u767E\u5408\u3001\u9EA6\u51AC\u3001\u6C99\u53C2\u3001\u7389\u7AF9\u3001\u8702\u871C\u3001\u7518\u8517\u3001\u83B2\u85D5\u3001\u8378\u8360\u3001\u9ED1\u829D\u9EBB\u3001\u6838\u6843\u4EC1\uFF1B\u9002\u5F53\u98DF\u7528\u732A\u76AE\u3001\u9E21\u722A\u7B49\u5BCC\u542B\u80F6\u539F\u86CB\u767D\u98DF\u7269\u6DA6\u80A4\u3002\u5FCC\u98DF\u8F9B\u8FA3\u71E5\u70C8\uFF08\u8FA3\u6912\u3001\u82B1\u6912\u3001\u751F\u59DC\u3001\u7F8A\u8089\uFF09\uFF0C\u5C11\u98DF\u714E\u70B8\u70E7\u70E4\u8017\u4F24\u9634\u6DB2\u3002\u5B9C\u996E\u8702\u871C\u67E0\u6AAC\u6C34\u3001\u9EA6\u51AC\u8336\u3001\u77F3\u659B\u8336\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u9002\u5F53\u6E7F\u5EA6\uFF0845-65%\uFF09\uFF0C\u53EF\u4F7F\u7528\u52A0\u6E7F\u5668\u6216\u653E\u7F6E\u6C34\u76C6\u589E\u6E7F\uFF1B\u5BA4\u5185\u5B9C\u653E\u7F6E\u6C34\u751F\u690D\u7269\u3001\u6D41\u6C34\u88C5\u9970\u6DA6\u71E5\uFF1B\u907F\u514D\u957F\u671F\u5904\u4E8E\u7A7A\u8C03\u623F\u3001\u6696\u6C14\u623F\u7B49\u5E72\u71E5\u73AF\u5883\u3002\u529E\u516C\u684C\u9762\u653E\u7F6E\u5C0F\u578B\u52A0\u6E7F\u5668\uFF1B\u5916\u51FA\u4F69\u6234\u53E3\u7F69\u4FDD\u6301\u53E3\u9F3B\u6E7F\u6DA6\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u548C\u7F13\u8FD0\u52A8\u907F\u514D\u5927\u6C57\u4F24\u9634\uFF1A\u592A\u6781\u62F3\u3001\u745C\u4F3D\u3001\u6563\u6B65\u3001\u6E38\u6CF3\u3001\u6C14\u529F\uFF1B\u8FD0\u52A8\u5F3A\u5EA6\u9002\u5EA6\uFF0C\u4EE5\u8EAB\u4F53\u5FAE\u70ED\u4E0D\u51FA\u5927\u6C57\u4E3A\u5EA6\u3002\u6309\u63C9\u592A\u6E0A\u7A74\u6DA6\u80BA\u3001\u7167\u6D77\u7A74\u6ECB\u9634\u3001\u4E09\u9634\u4EA4\u517B\u9634\u6DA6\u71E5\uFF1B\u7761\u524D\u6D82\u6DA6\u80A4\u9732\u4FDD\u6E7F\uFF1B\u907F\u514D\u5267\u70C8\u8FD0\u52A8\u5927\u6C57\u6DCB\u6F13\u8017\u4F24\u9634\u6DB2\u3002"
    },
    "\u6625\u5BD2": {
      name: "\u6625\u5BD2\u4F53\u8D28",
      jiBing: "\u6625\u5E94\u809D\uFF0C\u5BD2\u6C14\u51DD\u6EDE\u5219\u809D\u6C14\u4E0D\u8212\u3001\u9633\u6C14\u4E0D\u5347\uFF0C\u51FA\u73B0\u754F\u5BD2\u6015\u51B7\u3001\u56DB\u80A2\u4E0D\u6E29\u3001\u9762\u8272\u82CD\u767D\u3001\u7CBE\u795E\u840E\u9761\u3001\u5026\u6020\u55DC\u5367\u3001\u8170\u819D\u9178\u8F6F\u3001\u5C0F\u4FBF\u6E05\u957F\u3001\u5927\u4FBF\u7A00\u6E8F\uFF1B\u5BD2\u51DD\u809D\u8109\u5219\u5C11\u8179\u51B7\u75DB\u3001\u75DB\u7ECF\u3001\u759D\u6C14\uFF1B\u6625\u5B63\u5012\u6625\u5BD2\u66F4\u6613\u8BF1\u53D1\u98CE\u5BD2\u611F\u5192\uFF0C\u9F3B\u585E\u6D41\u6D95\u3001\u5934\u75DB\u8EAB\u75DB\u3002",
      qingZhi: "\u809D\u559C\u6761\u8FBE\u6076\u6291\u90C1\uFF0C\u6625\u5BD2\u4E4B\u4EBA\u9633\u6C14\u4E0D\u8DB3\uFF0C\u60C5\u5FD7\u504F\u4F4E\u6C89\u6291\u90C1\u3002\u5B9C\u632F\u594B\u9633\u6C14\u3001\u9F13\u52A8\u751F\u53D1\u4E4B\u6C14\uFF1B\u5EFA\u8BAE\u591A\u53C2\u52A0\u6237\u5916\u6D3B\u52A8\u63A5\u89E6\u9633\u5149\uFF1B\u4E0E\u79EF\u6781\u4E50\u89C2\u8005\u4EA4\u5F80\uFF0C\u907F\u514D\u72EC\u5904\u4F4E\u6C89\uFF1B\u57F9\u517B\u5174\u8DA3\u7231\u597D\u8F6C\u79FB\u6CE8\u610F\u529B\uFF1B\u53EF\u9002\u5F53\u542C\u6FC0\u6602\u97F3\u4E50\u632F\u594B\u7CBE\u795E\u3002",
      yinShi: "\u5B9C\u98DF\u8F9B\u6E29\u53D1\u6563\u4E4B\u54C1\u52A9\u9633\u9A71\u5BD2\uFF1A\u751F\u59DC\u3001\u8471\u767D\u3001\u5927\u849C\u3001\u97ED\u83DC\u3001\u6842\u76AE\u3001\u82B1\u6912\u3001\u80E1\u6912\u3001\u7F8A\u8089\u3001\u9E21\u8089\u3001\u6838\u6843\u3001\u6842\u5706\uFF1B\u5408\u7406\u98DF\u7528\u6E29\u8865\u836F\u81B3\u5982\u5F53\u5F52\u751F\u59DC\u7F8A\u8089\u6C64\u3002\u5FCC\u98DF\u751F\u51B7\u5BD2\u51C9\uFF08\u51B0\u996E\u3001\u897F\u74DC\u3001\u9999\u8549\u3001\u82E6\u74DC\u3001\u8783\u87F9\uFF09\uFF0C\u4EE5\u514D\u635F\u4F24\u9633\u6C14\u3002\u5B9C\u996E\u59DC\u67A3\u8336\u3001\u8089\u6842\u8336\u6696\u8EAB\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u671D\u5357\u6E29\u6696\u5411\u9633\uFF0C\u591A\u6652\u592A\u9633\uFF1B\u51AC\u5B63\u505A\u597D\u4FDD\u6696\uFF0C\u5C24\u5176\u6CE8\u610F\u8179\u90E8\u3001\u8170\u90E8\u3001\u8DB3\u90E8\u4FDD\u6696\u907F\u514D\u53D7\u5BD2\uFF1B\u5BA4\u5185\u53EF\u4F7F\u7528\u6696\u8272\u8C03\u706F\u5149\u8425\u9020\u6E29\u99A8\u6C1B\u56F4\u3002\u529E\u516C\u5EA7\u4F4D\u907F\u5F00\u7A7A\u8C03\u51FA\u98CE\u53E3\u76F4\u5439\u51B7\u98CE\uFF1B\u6625\u6342\u79CB\u51BB\uFF0C\u4E0D\u5B9C\u8FC7\u65E9\u8131\u53BB\u51AC\u8863\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6709\u6C27\u8FD0\u52A8\u63D0\u5347\u9633\u6C14\uFF1A\u6162\u8DD1\u3001\u5FEB\u8D70\u3001\u8DF3\u7EF3\u3001\u5065\u8EAB\u64CD\u3001\u7403\u7C7B\u8FD0\u52A8\u3001\u722C\u697C\u68AF\uFF1B\u8FD0\u52A8\u5F3A\u5EA6\u4E2D\u7B49\u504F\u4E0A\u4EE5\u5168\u8EAB\u6E29\u6696\u4E3A\u5EA6\u3002\u827E\u7078\u5173\u5143\u3001\u6C14\u6D77\u3001\u547D\u95E8\u3001\u8DB3\u4E09\u91CC\u6E29\u9633\u6563\u5BD2\uFF1B\u7761\u524D\u70ED\u6C34\u6CE1\u811A\u81F3\u5FAE\u6C57\uFF1B\u6309\u63C9\u6D8C\u6CC9\u7A74\u6E29\u80BE\u52A9\u9633\u3001\u5927\u690E\u7A74\u632F\u594B\u9633\u6C14\u3002"
    },
    "\u590F\u6728": {
      name: "\u590F\u6728\u4F53\u8D28",
      jiBing: "\u590F\u5E94\u5FC3\u800C\u517B\u957F\uFF0C\u6728\u751F\u706B\uFF0C\u6728\u6C14\u8FC7\u65FA\u5219\u5FC3\u809D\u706B\u76DB\uFF0C\u51FA\u73B0\u5FC3\u70E6\u6613\u6012\u3001\u5931\u7720\u591A\u68A6\u3001\u5934\u75DB\u7729\u6655\u3001\u9762\u7EA2\u76EE\u8D64\u3001\u53E3\u5E72\u53E3\u82E6\u3001\u80C1\u808B\u80C0\u75DB\uFF1B\u6728\u706B\u5211\u91D1\u5219\u5E72\u54B3\u5C11\u75F0\u3001\u54BD\u5589\u5E72\u75DB\uFF1B\u809D\u706B\u6A2A\u9006\u72AF\u80C3\u5219\u5608\u6742\u6CDB\u9178\u3001\u80C3\u8118\u707C\u75DB\u3002\u708E\u590F\u9AD8\u6E29\u52A0\u91CD\u706B\u70ED\u4E0A\u653B\u4E4B\u52BF\u3002",
      qingZhi: "\u809D\u5728\u5FD7\u4E3A\u6012\uFF0C\u590F\u6728\u4E4B\u4EBA\u809D\u706B\u5939\u5FC3\u706B\uFF0C\u6613\u70E6\u8E81\u66B4\u6012\u3002\u5B9C\u6E05\u5FC3\u964D\u706B\u3001\u8C03\u7545\u60C5\u5FD7\uFF1B\u5EFA\u8BAE\u591A\u5728\u6E05\u6668\u508D\u665A\u51C9\u723D\u65F6\u6237\u5916\u6563\u6B65\uFF1B\u7EC3\u4E60\u4E66\u6CD5\u7ED8\u753B\u7B49\u9759\u5FC3\u6D3B\u52A8\u5236\u7EA6\u706B\u6C14\uFF1B\u907F\u514D\u70C8\u65E5\u9AD8\u6E29\u65F6\u6BB5\u5916\u51FA\uFF0C\u4E2D\u5348\u5C0F\u61A9\u517B\u5FC3\u5B89\u795E\u3002\u4E0D\u5B9C\u53C2\u4E0E\u6FC0\u70C8\u4E89\u8FA9\u548C\u51B2\u7A81\u3002",
      yinShi: "\u5B9C\u98DF\u82E6\u5BD2\u6E05\u6CC4\u4E4B\u54C1\u6CFB\u809D\u706B\uFF1A\u82E6\u74DC\u3001\u82E6\u82E3\u3001\u82B9\u83DC\u3001\u83CA\u82B1\u3001\u8584\u8377\u3001\u7EFF\u8C46\u3001\u83B2\u5B50\u5FC3\uFF1B\u9002\u5F53\u98DF\u7528\u897F\u74DC\u3001\u51AC\u74DC\u3001\u9EC4\u74DC\u6E05\u70ED\u89E3\u6691\u3002\u5FCC\u98DF\u8F9B\u8FA3\u6E29\u8865\uFF08\u8FA3\u6912\u3001\u7F8A\u8089\u3001\u9152\u7C7B\u3001\u5496\u55B1\uFF09\u52A9\u706B\u5347\u9633\uFF1B\u5C11\u98DF\u6CB9\u817B\u539A\u5473\u52A9\u6E7F\u751F\u70ED\u3002\u5B9C\u996E\u83CA\u82B1\u51B3\u660E\u5B50\u8336\u6E05\u809D\u660E\u76EE\u3001\u8584\u8377\u8336\u758F\u98CE\u6E05\u70ED\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u51C9\u723D\u901A\u98CE\uFF0C\u907F\u514D\u897F\u6652\u95F7\u70ED\uFF1B\u4F7F\u7528\u7AF9\u5E18\u3001\u906E\u5149\u7A97\u5E18\u963B\u6321\u5F3A\u5149\uFF1B\u5BA4\u5185\u653E\u7F6E\u7EFF\u690D\u5438\u6536\u70ED\u91CF\u3001\u589E\u6DFB\u6E05\u51C9\u611F\u3002\u529E\u516C\u73AF\u5883\u4FDD\u630126\u2103\u5DE6\u53F3\u6052\u6E29\uFF0C\u907F\u514D\u7A7A\u8C03\u76F4\u5439\u53D7\u98CE\u5BD2\u3002\u590F\u5B63\u5B9C\u7528\u51C9\u5E2D\u3001\u7AF9\u6795\u52A9\u7720\u5B89\u795E\u3002",
      yunDong: "\u5B9C\u9009\u62E9\u51C9\u723D\u65F6\u6BB5\u8FD0\u52A8\uFF08\u6E05\u6668\u6216\u508D\u665A\uFF09\uFF1A\u6E38\u6CF3\u3001\u745C\u4F3D\u3001\u592A\u6781\u62F3\u3001\u6563\u6B65\u3001\u6162\u8DD1\uFF1B\u8FD0\u52A8\u91CF\u9002\u4E2D\uFF0C\u4E0D\u53EF\u5927\u6C57\u6DCB\u6F13\u8017\u6C14\u4F24\u9634\u3002\u6309\u63C9\u592A\u51B2\u7A74\u6E05\u809D\u706B\u3001\u884C\u95F4\u7A74\u6CFB\u5FC3\u706B\u3001\u592A\u9633\u7A74\u7F13\u89E3\u5934\u75DB\uFF1B\u8FD0\u52A8\u540E\u9002\u91CF\u8865\u5145\u6DE1\u76D0\u6C34\u6216\u7EFF\u8C46\u6C64\u9632\u6691\u3002"
    },
    "\u590F\u706B": {
      name: "\u590F\u706B\u4F53\u8D28",
      jiBing: "\u590F\u5E94\u5FC3\uFF0C\u706B\u6C14\u5F53\u4EE4\uFF0C\u5FC3\u706B\u8FC7\u4EA2\u5219\u5FC3\u70E6\u5931\u7720\u3001\u53E3\u820C\u751F\u75AE\u3001\u5C0F\u4FBF\u9EC4\u8D64\u707C\u75DB\u3001\u9762\u7EA2\u76EE\u8D64\u3001\u5927\u4FBF\u5E72\u7ED3\uFF1B\u5FC3\u706B\u79FB\u70ED\u4E8E\u5C0F\u80A0\u5219\u5C3F\u9891\u5C3F\u6025\uFF1B\u58EE\u706B\u98DF\u6C14\u5219\u6C14\u77ED\u4E4F\u529B\u3001\u53E3\u5E72\u591A\u6C57\u3001\u7CBE\u795E\u5026\u6020\u3002\u590F\u5B63\u6691\u70ED\u4E0E\u5FC3\u706B\u76F8\u5408\uFF0C\u6613\u53D1\u4E2D\u6691\u3001\u70ED\u4F24\u98CE\u3001\u75F1\u5B50\u7B49\u6691\u70ED\u8BC1\u3002",
      qingZhi: "\u5FC3\u5728\u5FD7\u4E3A\u559C\uFF0C\u590F\u706B\u4E4B\u4EBA\u706B\u52BF\u4E0A\u708E\uFF0C\u5B9C\u9759\u5FC3\u5B81\u795E\u3001\u6212\u9A84\u6212\u8E81\u3002\u5EFA\u8BAE\u9759\u5750\u51A5\u60F3\u8C03\u606F\u517B\u5FC3\uFF1B\u907F\u514D\u5927\u559C\u8FC7\u671B\u548C\u60C5\u7EEA\u6FC0\u52A8\u8017\u6563\u5FC3\u6C14\uFF1B\u5348\u95F4\u5C0F\u61A9\uFF0811:00-13:00\uFF09\u517B\u5FC3\u5B89\u795E\uFF1B\u542C\u8212\u7F13\u97F3\u4E50\u3001\u770B\u5C71\u6C34\u98CE\u666F\u5E73\u6291\u5FC3\u706B\u3002\u4E0D\u5B9C\u5728\u70C8\u65E5\u9AD8\u6E29\u4E0B\u957F\u65F6\u95F4\u6D3B\u52A8\u3002",
      yinShi: "\u5B9C\u98DF\u7518\u51C9\u6E05\u70ED\u6CFB\u706B\u4E4B\u54C1\uFF1A\u897F\u74DC\u3001\u7EFF\u8C46\u3001\u83B2\u5B50\u5FC3\u3001\u82E6\u74DC\u3001\u51AC\u74DC\u3001\u9EC4\u74DC\u3001\u4E1D\u74DC\u3001\u68A8\u3001\u7518\u8517\u3001\u8378\u8360\u3001\u83B2\u85D5\uFF1B\u9002\u5F53\u98DF\u7528\u767E\u5408\u3001\u94F6\u8033\u3001\u9EA6\u51AC\u6ECB\u9634\u6E05\u5FC3\u3002\u5FCC\u98DF\u8F9B\u8FA3\u71E5\u70ED\uFF08\u8FA3\u6912\u3001\u82B1\u6912\u3001\u7F8A\u8089\u3001\u9152\u7C7B\uFF09\uFF1B\u5C11\u98DF\u714E\u70B8\u70E7\u70E4\u52A9\u706B\u3002\u5B9C\u996E\u91D1\u94F6\u82B1\u8336\u3001\u7AF9\u53F6\u8336\u3001\u8377\u53F6\u8336\u6E05\u6691\u6CFB\u706B\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u51C9\u723D\u901A\u98CE\uFF0C\u4F7F\u7528\u7A7A\u8C03\u6216\u98CE\u6247\u964D\u6E29\u4F46\u907F\u514D\u76F4\u5439\uFF1B\u7A97\u5E18\u7528\u6D45\u8272\u51B7\u8272\u8C03\u963B\u6321\u9633\u5149\u3002\u529E\u516C\u73AF\u5883\u6E29\u5EA6\u9002\u5B9C\uFF0C\u591A\u8865\u5145\u6C34\u5206\u3002\u590F\u5B63\u4E0D\u5B9C\u5C45\u4F4F\u5728\u9876\u697C\u3001\u897F\u6652\u4E25\u91CD\u623F\u95F4\u3002\u5348\u4F11\u4FDD\u8BC1\u5145\u8DB3\u7761\u7720\uFF0C\u591C\u95F4\u5367\u5177\u9009\u900F\u6C14\u51C9\u5E2D\u3002",
      yunDong: "\u5B9C\u9009\u62E9\u6E05\u6668\u6216\u591C\u95F4\u51C9\u723D\u65F6\u6BB5\u8FDB\u884C\u8212\u7F13\u8FD0\u52A8\uFF1A\u6E38\u6CF3\u3001\u745C\u4F3D\u3001\u592A\u6781\u62F3\u3001\u6563\u6B65\u3001\u6C14\u529F\uFF1B\u8FD0\u52A8\u540E\u53CA\u65F6\u8865\u5145\u6C34\u5206\u3002\u6309\u63C9\u795E\u95E8\u7A74\u5B89\u795E\u3001\u5185\u5173\u7A74\u5B81\u5FC3\u3001\u5C11\u5E9C\u7A74\u6E05\u5FC3\u706B\uFF1B\u907F\u514D\u9AD8\u6E29\u65F6\u6BB5\u53CA\u9AD8\u5F3A\u5EA6\u7684\u6237\u5916\u8FD0\u52A8\u9884\u9632\u4E2D\u6691\u3002"
    },
    "\u590F\u6E7F": {
      name: "\u590F\u6E7F\u4F53\u8D28",
      jiBing: "\u590F\u5E94\u5FC3\uFF0C\u706B\u751F\u571F\uFF0C\u6E7F\u70ED\u4EA4\u84B8\u5219\u56F0\u963B\u4E2D\u7126\uFF0C\u51FA\u73B0\u8EAB\u70ED\u4E0D\u626C\u3001\u5348\u540E\u70ED\u751A\u3001\u6C57\u51FA\u4E0D\u7545\u3001\u80F8\u95F7\u8118\u75DE\u3001\u7EB3\u5446\u6CDB\u6076\u3001\u5927\u4FBF\u9ECF\u6EDE\u4E0D\u723D\u3001\u5C0F\u4FBF\u9EC4\u6D4A\u3001\u820C\u82D4\u9EC4\u539A\u817B\uFF1B\u6E7F\u70ED\u4E0B\u6CE8\u5219\u5E26\u4E0B\u9EC4\u7A20\u3001\u9634\u56CA\u6E7F\u75D2\u3001\u4E0B\u80A2\u6C89\u91CD\u3002\u590F\u5B63\u6691\u6E7F\u6C24\u6C32\uFF0C\u5185\u5916\u5408\u90AA\uFF0C\u7F20\u7EF5\u96BE\u6108\u3002",
      qingZhi: "\u813E\u5728\u5FD7\u4E3A\u601D\uFF0C\u590F\u6E7F\u4E4B\u4EBA\u6E7F\u70ED\u56F0\u813E\uFF0C\u6613\u70E6\u95F7\u7126\u8E81\u3002\u5B9C\u4FDD\u6301\u5FC3\u5883\u5E73\u548C\u3001\u51CF\u5C11\u601D\u8651\uFF1B\u6E05\u6DE1\u751F\u6D3B\u964D\u4F4E\u6B32\u671B\uFF0C\u907F\u514D\u590D\u6742\u4EBA\u9645\u5173\u7CFB\u52A0\u91CD\u5FC3\u70E6\uFF1B\u5348\u540E\u6E7F\u70ED\u6700\u91CD\u65F6\u53EF\u77ED\u6682\u5348\u4F11\u907F\u6691\uFF1B\u591A\u542C\u8F7B\u677E\u660E\u5FEB\u7684\u97F3\u4E50\u8212\u7F13\u60C5\u7EEA\u3002",
      yinShi: "\u5B9C\u98DF\u6E05\u70ED\u5316\u6E7F\u4E4B\u54C1\uFF1A\u858F\u82E1\u4EC1\u3001\u8D64\u5C0F\u8C46\u3001\u7EFF\u8C46\u3001\u51AC\u74DC\u3001\u82E6\u74DC\u3001\u4E1D\u74DC\u3001\u846B\u82A6\u3001\u9EC4\u74DC\u3001\u832F\u82D3\u3001\u8377\u53F6\uFF1B\u9002\u91CF\u98DF\u7528\u751F\u59DC\u3001\u9648\u76AE\u5316\u6E7F\u548C\u4E2D\u3002\u5FCC\u98DF\u80A5\u7518\u539A\u5473\u3001\u751C\u98DF\u3001\u4E73\u5236\u54C1\u3001\u751F\u51B7\u74DC\u679C\u52A9\u6E7F\u751F\u70ED\uFF1B\u5C11\u996E\u9152\u7C7B\u5C24\u5176\u662F\u5564\u9152\u3002\u5B9C\u996E\u8377\u53F6\u8336\u3001\u51AC\u74DC\u8336\u3001\u858F\u4EC1\u6C34\u6E05\u70ED\u795B\u6E7F\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u901A\u98CE\u5E72\u71E5\uFF0C\u4F7F\u7528\u9664\u6E7F\u673A\u6216\u7A7A\u8C03\u9664\u6E7F\u6A21\u5F0F\uFF1B\u907F\u514D\u5C45\u4F4F\u5E95\u5C42\u6F6E\u6E7F\u73AF\u5883\uFF1B\u5BA4\u5185\u4E0D\u653E\u8FC7\u591A\u7EFF\u690D\u4EE5\u514D\u589E\u52A0\u6E7F\u5EA6\u3002\u529E\u516C\u73AF\u5883\u4FDD\u6301\u5E72\u723D\uFF0C\u51FA\u6C57\u540E\u53CA\u65F6\u64E6\u5E72\u66F4\u6362\u8863\u7269\u3002\u590F\u5B63\u907F\u514D\u6DCB\u96E8\u6D89\u6C34\uFF0C\u51FA\u95E8\u5907\u4F1E\u9632\u96F7\u96E8\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u80FD\u51FA\u6C57\u7684\u8FD0\u52A8\u6392\u6E7F\uFF1A\u5FEB\u8D70\u3001\u6162\u8DD1\u3001\u5065\u8EAB\u64CD\u3001\u9AD8\u6E29\u745C\u4F3D\u3001\u6E38\u6CF3\uFF1B\u8FD0\u52A8\u540E\u53CA\u65F6\u64E6\u5E72\u6C57\u6C34\u66F4\u6362\u5E72\u723D\u8863\u7269\u3002\u6309\u63C9\u9634\u9675\u6CC9\u5065\u813E\u5229\u6E7F\u3001\u4E30\u9686\u5316\u75F0\u3001\u66F2\u6C60\u6E05\u70ED\u5229\u6E7F\uFF1B\u827E\u7078\u8DB3\u4E09\u91CC\u3001\u4E2D\u8118\u6E29\u9633\u5316\u6E7F\u3002\u907F\u514D\u8FD0\u52A8\u540E\u5373\u5439\u7A7A\u8C03\u6D17\u51B7\u6C34\u6FA1\u3002"
    },
    "\u590F\u71E5": {
      name: "\u590F\u71E5\u4F53\u8D28",
      jiBing: "\u590F\u5E94\u5FC3\uFF0C\u6691\u70ED\u8017\u6D25\u5219\u80BA\u71E5\u6D25\u4E8F\uFF0C\u51FA\u73B0\u5E72\u54B3\u5C11\u75F0\u6216\u75F0\u9ECF\u96BE\u54AF\u3001\u54BD\u5589\u5E72\u75DB\u3001\u9F3B\u5E72\u9F3B\u8844\u3001\u76AE\u80A4\u5E72\u71E5\u7619\u75D2\u3001\u53E3\u6E34\u5F15\u996E\u3001\u5927\u4FBF\u5E72\u7ED3\u5982\u7F8A\u7CAA\uFF1B\u71E5\u70ED\u4F24\u6D25\u5219\u5C0F\u4FBF\u77ED\u5C11\u9EC4\u8D64\u3002\u590F\u5B63\u9AD8\u6E29\u591A\u6C57\uFF0C\u6D25\u6DB2\u5916\u6CC4\uFF0C\u71E5\u8C61\u52A0\u91CD\uFF0C\u4E0E\u6691\u70ED\u76F8\u5408\u4E3A\u6E29\u71E5\u3002",
      qingZhi: "\u5FC3\u5728\u5FD7\u4E3A\u559C\uFF0C\u590F\u71E5\u4E4B\u4EBA\u9634\u6D25\u4E0D\u8DB3\uFF0C\u6613\u5FC3\u70E6\u4E0D\u5B89\u3002\u5B9C\u517B\u9634\u6DA6\u71E5\u3001\u6E05\u5FC3\u5B89\u795E\uFF1B\u5EFA\u8BAE\u5728\u9634\u51C9\u901A\u98CE\u5904\u9759\u5750\u8C03\u606F\uFF1B\u907F\u514D\u9AD8\u6E29\u65F6\u6BB5\u5916\u51FA\u6D3B\u52A8\uFF1B\u4FDD\u8BC1\u5145\u8DB3\u7761\u7720\u517B\u9634\uFF1B\u591A\u63A5\u89E6\u6C34\u666F\u73AF\u5883\u4EE5\u6C34\u6DA6\u91D1\u3002\u4E0D\u5B9C\u60C5\u7EEA\u6FC0\u52A8\u5927\u6C57\u4F24\u9634\u3002",
      yinShi: "\u5B9C\u98DF\u7518\u5BD2\u6ECB\u6DA6\u751F\u6D25\u4E4B\u54C1\uFF1A\u68A8\u3001\u7518\u8517\u3001\u8378\u8360\u3001\u83B2\u85D5\u3001\u897F\u74DC\u3001\u9EC4\u74DC\u3001\u94F6\u8033\u3001\u767E\u5408\u3001\u9EA6\u51AC\u3001\u77F3\u659B\u3001\u8702\u871C\uFF1B\u9002\u5F53\u98DF\u7528\u9E2D\u8089\u3001\u732A\u8089\u76AE\u3001\u9C7C\u8089\u7B49\u6ECB\u9634\u6DA6\u71E5\u3002\u5FCC\u98DF\u8F9B\u6E29\u71E5\u70C8\uFF08\u8FA3\u6912\u3001\u82B1\u6912\u3001\u8334\u9999\u3001\u7F8A\u8089\uFF09\u8017\u4F24\u9634\u6DB2\uFF1B\u5C11\u98DF\u714E\u70B8\u70E7\u70E4\u3001\u5364\u5236\u98DF\u54C1\u3002\u5B9C\u996E\u96EA\u68A8\u94F6\u8033\u7FB9\u3001\u77F3\u659B\u9EA6\u51AC\u8336\u3001\u6C99\u53C2\u7389\u7AF9\u6C64\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u51C9\u723D\u6E7F\u6DA6\uFF0C\u4F7F\u7528\u52A0\u6E7F\u5668\u7EF4\u6301\u6E7F\u5EA650%\u4EE5\u4E0A\uFF1B\u5BA4\u5185\u653E\u7F6E\u6C34\u666F\u88C5\u9970\u3001\u9614\u53F6\u690D\u7269\u589E\u6E7F\uFF1B\u907F\u514D\u957F\u671F\u5904\u4E8E\u7A7A\u8C03\u623F\u5E72\u71E5\u73AF\u5883\u3002\u529E\u516C\u684C\u653E\u7F6E\u5C0F\u578B\u52A0\u6E7F\u5668\u6216\u4E00\u676F\u6C34\u589E\u6E7F\u3002\u591C\u95F4\u7761\u7720\u4F7F\u7528\u52A0\u6E7F\u5668\u4FDD\u6301\u547C\u5438\u9053\u6E7F\u6DA6\u3002",
      yunDong: "\u5B9C\u9009\u62E9\u6E05\u6668\u508D\u665A\u51C9\u723D\u65F6\u8FD0\u52A8\uFF1A\u6563\u6B65\u3001\u592A\u6781\u62F3\u3001\u6E38\u6CF3\u3001\u745C\u4F3D\uFF1B\u907F\u514D\u5927\u6C57\u6DCB\u6F13\u8017\u4F24\u6D25\u6DB2\uFF0C\u4EE5\u5FAE\u6C57\u4E3A\u5EA6\u3002\u6309\u63C9\u592A\u6E0A\u7A74\u6DA6\u80BA\u751F\u6D25\u3001\u7167\u6D77\u7A74\u6ECB\u9634\u6DA6\u71E5\u3001\u4E09\u9634\u4EA4\u517B\u9634\uFF1B\u8FD0\u52A8\u540E\u53CA\u65F6\u8865\u5145\u6E29\u6C34\u548C\u6ECB\u9634\u996E\u54C1\u3002"
    },
    "\u590F\u5BD2": {
      name: "\u590F\u5BD2\u4F53\u8D28",
      jiBing: "\u590F\u5E94\u5FC3\uFF0C\u9633\u6C14\u5916\u6D6E\u5219\u5185\u9633\u76F8\u5BF9\u4E0D\u8DB3\uFF0C\u8D2A\u51C9\u996E\u51B7\u5219\u5BD2\u4F24\u4E2D\u9633\uFF0C\u51FA\u73B0\u8118\u8179\u51B7\u75DB\u3001\u559C\u6E29\u559C\u6309\u3001\u7EB3\u5446\u98DF\u5C11\u3001\u5927\u4FBF\u7A00\u6E8F\u3001\u5C0F\u4FBF\u6E05\u957F\uFF1B\u5BD2\u6E7F\u56F0\u963B\u5219\u80A2\u4F53\u56F0\u91CD\u3001\u5173\u8282\u51B7\u75DB\u3002\u590F\u5B63\u7A7A\u8C03\u8FC7\u5EA6\u3001\u51B7\u996E\u8FC7\u591A\u81F4\u5916\u5BD2\u675F\u8868\u5219\u6076\u5BD2\u65E0\u6C57\u3001\u5934\u75DB\u8EAB\u75DB\u3001\u9F3B\u585E\u6D41\u6E05\u6D95\u3002",
      qingZhi: "\u5FC3\u5728\u5FD7\u4E3A\u559C\uFF0C\u590F\u5BD2\u4E4B\u4EBA\u9633\u6C14\u5185\u865A\uFF0C\u60C5\u5FD7\u504F\u6C89\u9759\u5C11\u52A8\u3002\u5B9C\u632F\u594B\u9633\u6C14\u3001\u4E50\u89C2\u5F00\u6717\uFF1B\u907F\u514D\u957F\u671F\u5904\u4E8E\u7A7A\u8C03\u51B7\u6C14\u73AF\u5883\u5BFC\u81F4\u9633\u6C14\u90C1\u904F\uFF1B\u591A\u4E0E\u4EB2\u53CB\u6B22\u805A\u4EA4\u6D41\u5347\u53D1\u9633\u6C14\uFF1B\u9002\u5F53\u53C2\u4E0E\u70ED\u60C5\u6D0B\u6EA2\u7684\u793E\u4EA4\u6D3B\u52A8\u63D0\u5347\u60C5\u7EEA\u3002\u907F\u514D\u8FC7\u5EA6\u601D\u8651\u5FE7\u6101\u4F24\u9633\u3002",
      yinShi: "\u5B9C\u98DF\u6E29\u4E2D\u6563\u5BD2\u4E4B\u54C1\uFF1A\u751F\u59DC\u3001\u8471\u767D\u3001\u5927\u849C\u3001\u8089\u6842\u3001\u80E1\u6912\u3001\u82B1\u6912\u3001\u7F8A\u8089\u3001\u9E21\u8089\u3001\u9CAB\u9C7C\u3001\u7CEF\u7C73\u3001\u6842\u5706\uFF1B\u9002\u5EA6\u98DF\u7528\u6E29\u70ED\u6027\u8C03\u5473\u54C1\u3002\u5FCC\u98DF\u51B0\u9547\u51B7\u996E\u3001\u751F\u51B7\u74DC\u679C\uFF08\u897F\u74DC\u3001\u82E6\u74DC\u3001\u9EC4\u74DC\u3001\u68A8\uFF09\u5927\u91CF\u98DF\u7528\u4F24\u9633\uFF1B\u5C11\u98DF\u5BD2\u51C9\u6D77\u9C9C\u3002\u5B9C\u996E\u59DC\u67A3\u8336\u3001\u6842\u5706\u7EA2\u67A3\u8336\u3001\u8089\u6842\u5976\u8336\u6696\u4E2D\u6563\u5BD2\u3002",
      huanJing: "\u5C45\u5BA4\u7A7A\u8C03\u6E29\u5EA6\u4E0D\u5B9C\u8FC7\u4F4E\uFF0826-28\u2103\uFF09\uFF0C\u907F\u514D\u7A7A\u8C03\u51B7\u98CE\u76F4\u5439\u8EAB\u4F53\uFF1B\u7761\u7720\u65F6\u76D6\u8584\u88AB\u4FDD\u62A4\u8179\u90E8\u548C\u5173\u8282\u907F\u514D\u53D7\u5BD2\u3002\u590F\u5B63\u4E0D\u5B9C\u5C45\u4F4F\u5728\u9634\u51B7\u6F6E\u6E7F\u5730\u4E0B\u5BA4\u3002\u529E\u516C\u65F6\u5907\u8584\u5916\u5957\u6216\u62AB\u80A9\u9632\u7A7A\u8C03\u51B7\u98CE\u3002\u907F\u514D\u5927\u6C57\u540E\u7ACB\u5373\u8FDB\u5165\u4F4E\u6E29\u7A7A\u8C03\u623F\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6E29\u548C\u6709\u6C27\u8FD0\u52A8\u632F\u594B\u9633\u6C14\uFF1A\u5FEB\u8D70\u3001\u6162\u8DD1\u3001\u5065\u8EAB\u64CD\u3001\u745C\u4F3D\u3001\u7FBD\u6BDB\u7403\uFF1B\u8FD0\u52A8\u81F3\u5168\u8EAB\u5FAE\u6696\u4E3A\u5EA6\u3002\u827E\u7078\u5173\u5143\u3001\u6C14\u6D77\u3001\u8DB3\u4E09\u91CC\u6E29\u9633\u6563\u5BD2\uFF1B\u7761\u524D\u70ED\u6C34\u6CE1\u811A\u81F3\u5FAE\u6C57\uFF1B\u6309\u63C9\u5927\u690E\u7A74\u632F\u594B\u9633\u6C14\u3001\u9633\u9675\u6CC9\u758F\u6CC4\u5BD2\u6E7F\u3002\u8FD0\u52A8\u540E\u6E29\u6C34\u51B2\u6D17\uFF0C\u5FCC\u51B7\u6C34\u6D74\u3002"
    },
    "\u79CB\u6728": {
      name: "\u79CB\u6728\u4F53\u8D28",
      jiBing: "\u79CB\u5E94\u80BA\u800C\u517B\u6536\uFF0C\u91D1\u514B\u6728\uFF0C\u6728\u6C14\u88AB\u90C1\u5219\u809D\u6C14\u4E0D\u8212\uFF0C\u51FA\u73B0\u4E24\u80C1\u80C0\u75DB\u3001\u80F8\u95F7\u5584\u592A\u606F\u3001\u7CBE\u795E\u6291\u90C1\u3001\u6708\u7ECF\u4E0D\u8C03\u3001\u4E73\u623F\u80C0\u75DB\uFF1B\u809D\u90C1\u5316\u706B\u5219\u5934\u75DB\u76EE\u8D64\u3001\u53E3\u5E72\u53E3\u82E6\uFF1B\u809D\u6C14\u6A2A\u9006\u72AF\u80C3\u5219\u80C3\u8118\u80C0\u75DB\u3001\u55F3\u6C14\u7EB3\u5DEE\u3002\u79CB\u71E5\u4F24\u6D25\uFF0C\u809D\u9634\u4E0D\u8DB3\u5219\u76EE\u6DA9\u3001\u722A\u7532\u67AF\u69C1\u3002",
      qingZhi: "\u809D\u5728\u5FD7\u4E3A\u6012\uFF0C\u79CB\u6728\u4E4B\u4EBA\u91D1\u65FA\u514B\u6728\uFF0C\u809D\u6C14\u90C1\u7ED3\u6613\u60B2\u5FE7\u3002\u5B9C\u758F\u809D\u89E3\u90C1\u3001\u8C03\u7545\u60C5\u5FD7\uFF1B\u5EFA\u8BAE\u591A\u767B\u9AD8\u671B\u8FDC\u8212\u5C55\u80F8\u6000\uFF1B\u57F9\u517B\u7434\u68CB\u4E66\u753B\u7B49\u7231\u597D\u9676\u51B6\u60C5\u64CD\uFF1B\u4E0E\u4EB2\u53CB\u503E\u8BC9\u6392\u89E3\u90C1\u7ED3\uFF1B\u7EC3\u4E60\u6DF1\u547C\u5438\u3001\u4F38\u5C55\u8FD0\u52A8\u758F\u6CC4\u809D\u6C14\u3002\u907F\u514D\u72EC\u5904\u5FE7\u6101\u52A0\u91CD\u809D\u90C1\u3002",
      yinShi: "\u5B9C\u98DF\u9178\u7518\u6DA6\u71E5\u67D4\u809D\u4E4B\u54C1\uFF1A\u4E4C\u6885\u3001\u5C71\u6942\u3001\u67B8\u675E\u3001\u9ED1\u829D\u9EBB\u3001\u6851\u845A\u3001\u732A\u809D\u3001\u83E0\u83DC\u3001\u82B9\u83DC\u3001\u767E\u5408\u3001\u68A8\uFF1B\u9002\u5F53\u98DF\u7528\u9178\u5473\u98DF\u7269\u52A9\u809D\u6536\u655B\u3002\u5FCC\u98DF\u8F9B\u8FA3\u71E5\u70C8\uFF08\u8FA3\u6912\u3001\u82B1\u6912\u3001\u751F\u59DC\uFF09\u52A9\u706B\u4F24\u9634\uFF1B\u5C11\u98DF\u714E\u70B8\u70E7\u70E4\u3002\u5B9C\u996E\u67B8\u675E\u83CA\u82B1\u8336\u517B\u809D\u660E\u76EE\u3001\u73AB\u7470\u82B1\u8336\u758F\u809D\u89E3\u90C1\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u9002\u5F53\u6E7F\u5EA6\u9632\u6B62\u79CB\u71E5\u4F24\u809D\uFF1B\u5BA4\u5185\u653E\u7F6E\u7EFF\u8272\u690D\u7269\u758F\u6CC4\u809D\u6C14\uFF1B\u79CB\u5B63\u65E5\u7167\u51CF\u5C11\uFF0C\u6CE8\u610F\u589E\u52A0\u5BA4\u5185\u5149\u7167\u4EAE\u5EA6\u3002\u529E\u516C\u73AF\u5883\u4FDD\u6301\u6574\u6D01\u660E\u5FEB\u51CF\u5C11\u90C1\u7ED3\u611F\u3002\u79CB\u5B63\u5B9C\u767B\u9AD8\u671B\u8FDC\u3001\u5F00\u9614\u80F8\u6000\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u4F38\u5C55\u8212\u5C55\u7C7B\u8FD0\u52A8\u758F\u809D\u89E3\u90C1\uFF1A\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u745C\u4F3D\u62C9\u4F38\u3001\u6162\u8DD1\u3001\u767B\u5C71\uFF1B\u8FD0\u52A8\u81F3\u5FAE\u6C57\u51FA\u4E3A\u5EA6\u3002\u6309\u63C9\u592A\u51B2\u7A74\u758F\u809D\u3001\u7AE0\u95E8\u7A74\u8C03\u809D\u6C14\u3001\u671F\u95E8\u7A74\u7406\u6C14\u89E3\u90C1\uFF1B\u7761\u524D\u63A8\u63C9\u4E24\u80C1\u758F\u809D\u7406\u6C14\u3002\u907F\u514D\u9AD8\u5F3A\u5EA6\u5BF9\u6297\u6027\u8FD0\u52A8\u3002"
    },
    "\u79CB\u706B": {
      name: "\u79CB\u706B\u4F53\u8D28",
      jiBing: "\u79CB\u5E94\u80BA\uFF0C\u71E5\u91D1\u5F53\u4EE4\uFF0C\u706B\u4E0D\u5236\u91D1\u5219\u80BA\u71E5\u6D25\u4E8F\uFF0C\u51FA\u73B0\u5E72\u54B3\u5C11\u75F0\u6216\u75F0\u4E2D\u5E26\u8840\u4E1D\u3001\u54BD\u5589\u5E72\u75D2\u75BC\u75DB\u3001\u9F3B\u5E72\u9F3B\u8844\u3001\u58F0\u97F3\u5636\u54D1\uFF1B\u71E5\u70ED\u5185\u76DB\u5219\u5FC3\u70E6\u5931\u7720\u3001\u5927\u4FBF\u5E72\u7ED3\u3001\u76AE\u80A4\u5E72\u71E5\uFF1B\u80BA\u4E0E\u5927\u80A0\u76F8\u8868\u91CC\uFF0C\u80A0\u71E5\u6D25\u67AF\u5219\u4FBF\u79D8\u3002\u79CB\u71E5\u4E0E\u5185\u70ED\u76F8\u5408\u4E3A\u6E29\u71E5\u3002",
      qingZhi: "\u5FC3\u5728\u5FD7\u4E3A\u559C\uFF0C\u79CB\u706B\u4E4B\u4EBA\u91D1\u706B\u76F8\u4E89\uFF0C\u60C5\u5FD7\u6613\u7126\u8E81\u4E0D\u5B81\u3002\u5B9C\u6E05\u80BA\u6DA6\u71E5\u3001\u5B81\u5FC3\u5B89\u795E\uFF1B\u5EFA\u8BAE\u5728\u51C9\u723D\u6668\u665A\u6563\u6B65\u547C\u5438\u65B0\u9C9C\u7A7A\u6C14\uFF1B\u7EC3\u4E60\u8C03\u606F\u9759\u5750\u517B\u80BA\u9634\uFF1B\u542C\u8212\u7F13\u97F3\u4E50\u6D88\u89E3\u70E6\u8E81\u3002\u907F\u514D\u60C5\u7EEA\u5267\u70C8\u6CE2\u52A8\u8017\u4F24\u6D25\u6DB2\u3002",
      yinShi: "\u5B9C\u98DF\u7518\u5BD2\u6E05\u6DA6\u4E4B\u54C1\u6E05\u80BA\u6DA6\u71E5\uFF1A\u68A8\u3001\u94F6\u8033\u3001\u767E\u5408\u3001\u9EA6\u51AC\u3001\u6C99\u53C2\u3001\u7389\u7AF9\u3001\u8378\u8360\u3001\u83B2\u85D5\u3001\u7518\u8517\u3001\u8702\u871C\u3001\u8C46\u8150\uFF1B\u9002\u5F53\u98DF\u7528\u9E2D\u8089\u3001\u9E2D\u86CB\u6ECB\u9634\u3002\u5FCC\u98DF\u8F9B\u8FA3\u71E5\u70ED\uFF08\u8FA3\u6912\u3001\u82B1\u6912\u3001\u751F\u59DC\u3001\u7F8A\u8089\uFF09\u52A9\u71E5\u4F24\u9634\uFF1B\u5C11\u98DF\u714E\u70B8\u70E7\u70E4\u3002\u5B9C\u996E\u96EA\u68A8\u94F6\u8033\u7FB9\u3001\u9EA6\u51AC\u6C99\u53C2\u8336\u3001\u8702\u871C\u67E0\u6AAC\u6C34\u6DA6\u80BA\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u6E7F\u6DA6\uFF08\u52A0\u6E7F\u5668\u7EF4\u6301\u6E7F\u5EA650-60%\uFF09\uFF0C\u907F\u514D\u5E72\u71E5\u73AF\u5883\u52A0\u91CD\u80BA\u71E5\uFF1B\u5BA4\u5185\u653E\u7F6E\u6C34\u751F\u690D\u7269\u3001\u6D41\u6C34\u6446\u4EF6\u589E\u6E7F\u3002\u529E\u516C\u684C\u653E\u7F6E\u5C0F\u578B\u52A0\u6E7F\u5668\uFF1B\u5916\u51FA\u4F69\u6234\u53E3\u7F69\u9632\u62A4\u53E3\u9F3B\u3002\u79CB\u5B63\u907F\u514D\u957F\u65F6\u95F4\u66B4\u9732\u4E8E\u98CE\u5927\u5E72\u71E5\u73AF\u5883\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u67D4\u548C\u8FD0\u52A8\u914D\u5408\u547C\u5438\u8C03\u517B\u80BA\u6C14\uFF1A\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u6C14\u529F\u3001\u6563\u6B65\u3001\u745C\u4F3D\u547C\u5438\u6CD5\uFF1B\u8FD0\u52A8\u5F3A\u5EA6\u9002\u4E2D\uFF0C\u907F\u514D\u5927\u6C57\u8017\u9634\u3002\u6309\u63C9\u592A\u6E0A\u7A74\u6DA6\u80BA\u3001\u5C3A\u6CFD\u7A74\u6E05\u80BA\u3001\u7167\u6D77\u7A74\u6ECB\u9634\uFF1B\u7EC3\u4E60\u6DF1\u547C\u5438\u5410\u7EB3\u517B\u80BA\u3002"
    },
    "\u79CB\u6E7F": {
      name: "\u79CB\u6E7F\u4F53\u8D28",
      jiBing: "\u79CB\u5E94\u80BA\uFF0C\u91D1\u751F\u6C34\uFF0C\u6E7F\u56F0\u813E\u571F\uFF0C\u571F\u4E0D\u751F\u91D1\u5219\u80BA\u813E\u4E24\u865A\uFF0C\u51FA\u73B0\u54B3\u55FD\u75F0\u591A\u8272\u767D\u6E05\u7A00\u3001\u80F8\u95F7\u6C14\u77ED\u3001\u98DF\u5C11\u7EB3\u5446\u3001\u8179\u80C0\u4FBF\u6E8F\u3001\u9762\u8272\u840E\u9EC4\u3001\u795E\u75B2\u4E4F\u529B\u3001\u80A2\u4F53\u6C89\u91CD\uFF1B\u6E7F\u76DB\u5219\u6D6E\u80BF\uFF1B\u79CB\u5B63\u6E7F\u6C14\u4E0E\u71E5\u90AA\u4EA4\u66FF\uFF0C\u6613\u6210\u5916\u71E5\u5185\u6E7F\u9519\u6742\u4E4B\u8BC1\u3002",
      qingZhi: "\u813E\u5728\u5FD7\u4E3A\u601D\uFF0C\u79CB\u6E7F\u4E4B\u4EBA\u75F0\u6E7F\u56F0\u813E\uFF0C\u6613\u5026\u6020\u5C11\u601D\u3002\u5B9C\u5065\u813E\u76CA\u6C14\u3001\u8C41\u75F0\u5F00\u7A8D\uFF1B\u9002\u5F53\u6668\u7EC3\u5347\u53D1\u9633\u6C14\uFF1B\u907F\u514D\u4E45\u5750\u4E45\u5367\u52A0\u91CD\u6E7F\u56F0\uFF1B\u591A\u4E0E\u670B\u53CB\u4EA4\u6D41\u3001\u53C2\u52A0\u96C6\u4F53\u6D3B\u52A8\u6FC0\u53D1\u6D3B\u529B\u3002\u4E0D\u5B9C\u8FC7\u5EA6\u601D\u8651\u4F24\u813E\u3002",
      yinShi: "\u5B9C\u98DF\u5065\u813E\u795B\u6E7F\u5316\u75F0\u4E4B\u54C1\uFF1A\u858F\u82E1\u4EC1\u3001\u767D\u6241\u8C46\u3001\u832F\u82D3\u3001\u5C71\u836F\u3001\u767D\u672F\u3001\u9648\u76AE\u3001\u534A\u590F\u3001\u51AC\u74DC\u3001\u9CAB\u9C7C\uFF1B\u9002\u91CF\u751F\u59DC\u3001\u80E1\u6912\u6E29\u4E2D\u5316\u6E7F\u3002\u5FCC\u98DF\u751F\u51B7\u74DC\u679C\u3001\u751C\u98DF\u3001\u4E73\u5236\u54C1\u3001\u80A5\u7518\u539A\u5473\u52A9\u6E7F\u751F\u75F0\uFF1B\u5C11\u996E\u9152\u7C7B\u3002\u5B9C\u996E\u9648\u76AE\u666E\u6D31\u8336\u3001\u832F\u82D3\u858F\u7C73\u8336\u5065\u813E\u795B\u6E7F\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u5E72\u723D\u901A\u98CE\uFF0C\u9002\u5F53\u9664\u6E7F\uFF1B\u907F\u514D\u5C45\u4F4F\u6F6E\u6E7F\u73AF\u5883\uFF1B\u5BA4\u5185\u4E0D\u5B9C\u653E\u7F6E\u8FC7\u591A\u7EFF\u690D\u3002\u529E\u516C\u73AF\u5883\u4FDD\u6301\u5E72\u71E5\u901A\u98CE\u3002\u79CB\u5B63\u96E8\u5929\u6CE8\u610F\u9632\u6F6E\u9664\u6E7F\uFF0C\u8863\u7269\u88AB\u8925\u5E38\u667E\u6652\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6709\u6C27\u8FD0\u52A8\u4FC3\u8FDB\u6392\u6E7F\uFF1A\u6162\u8DD1\u3001\u5FEB\u8D70\u3001\u722C\u697C\u68AF\u3001\u5065\u8EAB\u64CD\u3001\u745C\u4F3D\u6392\u6BD2\uFF1B\u8FD0\u52A8\u51FA\u6C57\u6709\u52A9\u4E8E\u6E7F\u6C14\u6392\u51FA\u3002\u6309\u63C9\u4E30\u9686\u5316\u75F0\u795B\u6E7F\u3001\u9634\u9675\u6CC9\u5065\u813E\u5229\u6E7F\u3001\u8DB3\u4E09\u91CC\u548C\u80C3\u5316\u6E7F\uFF1B\u827E\u7078\u4E2D\u8118\u3001\u5173\u5143\u6E29\u9633\u5316\u6E7F\u3002"
    },
    "\u79CB\u71E5": {
      name: "\u79CB\u71E5\u4F53\u8D28",
      jiBing: "\u79CB\u5E94\u80BA\uFF0C\u71E5\u91D1\u5F53\u4EE4\uFF0C\u80BA\u4E3A\u5A07\u810F\u559C\u6DA6\u6076\u71E5\uFF0C\u71E5\u90AA\u72AF\u80BA\u5219\u5E72\u54B3\u65E0\u75F0\u6216\u5C11\u75F0\u3001\u54BD\u5589\u5E72\u75DB\u3001\u9F3B\u5E72\u9F3B\u585E\u3001\u76AE\u80A4\u76B2\u88C2\u8131\u5C51\u3001\u6BDB\u53D1\u5E72\u67AF\u3001\u5927\u4FBF\u5E72\u7ED3\uFF1B\u71E5\u4F24\u80BA\u7EDC\u5219\u75F0\u4E2D\u5E26\u8840\u4E1D\u3002\u79CB\u71E5\u6709\u6E29\u51C9\u4E4B\u5206\uFF1A\u521D\u79CB\u6E29\u71E5\u53D1\u70ED\u54BD\u75DB\uFF0C\u6DF1\u79CB\u51C9\u71E5\u6076\u5BD2\u65E0\u6C57\u3002",
      qingZhi: "\u80BA\u5728\u5FD7\u4E3A\u60B2\uFF0C\u79CB\u71E5\u4E4B\u4EBA\u80BA\u9634\u4E0D\u8DB3\uFF0C\u6613\u751F\u60B2\u5FE7\u60C5\u7EEA\u3002\u5B9C\u517B\u80BA\u6DA6\u71E5\u3001\u5F00\u6717\u8C41\u8FBE\uFF1B\u5EFA\u8BAE\u591A\u767B\u9AD8\u671B\u8FDC\u5F00\u9614\u5FC3\u80F8\uFF1B\u542C\u6109\u60A6\u97F3\u4E50\u6392\u89E3\u60B2\u79CB\u60C5\u7EEA\uFF1B\u53C2\u4E0E\u96C6\u4F53\u6D3B\u52A8\u907F\u514D\u72EC\u5904\u4F24\u611F\u3002\u4E0D\u5B9C\u957F\u671F\u6C89\u6EBA\u4E8E\u60B2\u5FE7\u97F3\u4E50\u548C\u6587\u827A\u4F5C\u54C1\u3002",
      yinShi: "\u5B9C\u98DF\u7518\u5BD2\u6ECB\u6DA6\u4E4B\u54C1\u517B\u80BA\u6DA6\u71E5\uFF1A\u68A8\u3001\u94F6\u8033\u3001\u767E\u5408\u3001\u9EA6\u51AC\u3001\u6C99\u53C2\u3001\u7389\u7AF9\u3001\u963F\u80F6\u3001\u8702\u871C\u3001\u7518\u8517\u3001\u8378\u8360\u3001\u83B2\u85D5\u3001\u829D\u9EBB\u3001\u6838\u6843\uFF1B\u9002\u5F53\u98DF\u7528\u732A\u80BA\u3001\u9E2D\u8089\u4EE5\u810F\u8865\u810F\u3002\u5FCC\u98DF\u8F9B\u8FA3\u71E5\u70C8\uFF08\u8FA3\u6912\u3001\u82B1\u6912\u3001\u8334\u9999\u3001\u7F8A\u8089\uFF09\u8017\u4F24\u80BA\u9634\uFF1B\u5C11\u98DF\u714E\u70B8\u70E7\u70E4\u3002\u5B9C\u996E\u79CB\u68A8\u818F\u3001\u767E\u5408\u94F6\u8033\u7FB9\u3001\u6C99\u53C2\u9EA6\u51AC\u8336\u6DA6\u80BA\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u6E7F\u5EA6\uFF08\u52A0\u6E7F\u5668\uFF09\uFF0C\u907F\u514D\u5927\u98CE\u76F4\u5439\u52A0\u91CD\u5E72\u71E5\uFF1B\u5BA4\u5185\u653E\u7F6E\u82B1\u8349\u3001\u6C34\u666F\u589E\u6E7F\uFF1B\u7A97\u5E18\u7528\u6696\u8272\u8C03\u51CF\u5C11\u8427\u745F\u611F\u3002\u529E\u516C\u684C\u9762\u653E\u7F6E\u5C0F\u578B\u52A0\u6E7F\u5668\u3002\u79CB\u5B63\u5916\u51FA\u4F69\u6234\u53E3\u7F69\u3001\u56F4\u5DFE\u62A4\u9888\u9632\u71E5\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u4EE5\u547C\u5438\u5410\u7EB3\u4E3A\u4E3B\u7684\u8FD0\u52A8\uFF1A\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u516D\u5B57\u8BC0\uFF08\u546C\u5B57\u8BC0\u8865\u80BA\uFF09\u3001\u6563\u6B65\u3001\u6C14\u529F\uFF1B\u8FD0\u52A8\u5F3A\u5EA6\u9002\u4E2D\uFF0C\u907F\u514D\u5927\u6C57\u8017\u9634\u3002\u6309\u63C9\u592A\u6E0A\u7A74\u8865\u80BA\u3001\u4E2D\u5E9C\u7A74\u8C03\u80BA\u6C14\u3001\u5217\u7F3A\u5BA3\u80BA\uFF1B\u6BCF\u65E5\u53E9\u9F7F\u54BD\u6D25\u6DA6\u80BA\u3002"
    },
    "\u79CB\u5BD2": {
      name: "\u79CB\u5BD2\u4F53\u8D28",
      jiBing: "\u79CB\u5E94\u80BA\uFF0C\u91D1\u751F\u6C34\uFF0C\u9633\u6C14\u59CB\u6536\uFF0C\u5BD2\u90AA\u6E10\u751F\uFF0C\u80BA\u6C14\u4E0D\u5229\u5219\u54B3\u55FD\u6C14\u5598\u3001\u75F0\u767D\u6E05\u7A00\u3001\u9F3B\u585E\u6D41\u6E05\u6D95\u3001\u6076\u5BD2\u6015\u51B7\u3001\u80CC\u90E8\u5BD2\u51B7\u3001\u56DB\u80A2\u4E0D\u6E29\uFF1B\u5BD2\u90AA\u51DD\u6EDE\u7ECF\u7EDC\u5219\u5173\u8282\u51B7\u75DB\u3002\u79CB\u5B63\u65E9\u665A\u6E29\u5DEE\u5927\uFF0C\u5BD2\u90AA\u6613\u4ECE\u53E3\u9F3B\u76AE\u6BDB\u5165\u4FB5\uFF0C\u8BF1\u53D1\u611F\u5192\u3001\u6C14\u7BA1\u708E\u3002",
      qingZhi: "\u80BA\u5728\u5FD7\u4E3A\u60B2\uFF0C\u79CB\u5BD2\u4E4B\u4EBA\u9633\u6C14\u4E0D\u8DB3\uFF0C\u6613\u60C5\u7EEA\u4F4E\u843D\u3002\u5B9C\u632F\u594B\u9633\u6C14\u3001\u79EF\u6781\u4E50\u89C2\uFF1B\u5EFA\u8BAE\u591A\u6652\u592A\u9633\u3001\u6237\u5916\u6D3B\u52A8\u5347\u53D1\u9633\u6C14\uFF1B\u4E0E\u70ED\u60C5\u5F00\u6717\u8005\u4EA4\u5F80\u63D0\u5347\u60C5\u7EEA\u3002\u907F\u514D\u72EC\u5904\u9634\u6697\u73AF\u5883\u52A0\u91CD\u4F4E\u843D\u60C5\u7EEA\u3002",
      yinShi: "\u5B9C\u98DF\u6E29\u80BA\u6563\u5BD2\u4E4B\u54C1\uFF1A\u751F\u59DC\u3001\u8471\u767D\u3001\u5927\u849C\u3001\u6842\u679D\u3001\u674F\u4EC1\u3001\u6838\u6843\u3001\u7F8A\u8089\u3001\u9E21\u8089\u3001\u7CEF\u7C73\u3001\u6842\u5706\uFF1B\u9002\u91CF\u98DF\u7528\u8F9B\u6E29\u8C03\u5473\u54C1\u9A71\u5BD2\u3002\u5FCC\u98DF\u751F\u51B7\u5BD2\u51C9\uFF08\u51B0\u996E\u3001\u897F\u74DC\u3001\u68A8\u3001\u82E6\u74DC\u3001\u8783\u87F9\uFF09\u4F24\u80BA\u9633\uFF1B\u5C11\u98DF\u6CB9\u817B\u751F\u75F0\u3002\u5B9C\u996E\u59DC\u7CD6\u82CF\u53F6\u8336\u3001\u8471\u767D\u8C46\u8C49\u6C64\u6563\u5BD2\u5BA3\u80BA\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u6E29\u6696\u5411\u9633\uFF0C\u6CE8\u610F\u80CC\u90E8\u4FDD\u6696\uFF08\u80CC\u90E8\u4E3A\u80BA\u4FDE\u6240\u5728\uFF09\uFF1B\u79CB\u5B63\u65E9\u665A\u6DFB\u8863\u5FA1\u5BD2\uFF0C\u907F\u514D\u53D7\u51C9\uFF1B\u51FA\u95E8\u4F69\u6234\u53E3\u7F69\u3001\u56F4\u5DFE\u4FDD\u6696\u3002\u529E\u516C\u5EA7\u4F4D\u907F\u5F00\u7A7A\u8C03\u98CE\u53E3\u3002\u79CB\u5B63\u505A\u597D\u9888\u90E8\u80CC\u90E8\u4FDD\u6696\u9884\u9632\u611F\u5192\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6E29\u548C\u6709\u6C27\u8FD0\u52A8\u589E\u5F3A\u80BA\u6C14\uFF1A\u6162\u8DD1\u3001\u5FEB\u8D70\u3001\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u722C\u5C71\uFF1B\u8FD0\u52A8\u81F3\u5168\u8EAB\u6E29\u6696\u4E3A\u5EA6\u3002\u827E\u7078\u80BA\u4FDE\u3001\u5927\u690E\u3001\u8DB3\u4E09\u91CC\u6E29\u80BA\u6563\u5BD2\uFF1B\u6309\u63C9\u5927\u690E\u7A74\u9A71\u5BD2\u3001\u98CE\u95E8\u7A74\u62B5\u5FA1\u98CE\u90AA\uFF1B\u7761\u524D\u70ED\u6C34\u6CE1\u811A\u6E29\u9633\u3002"
    },
    "\u51AC\u6728": {
      name: "\u51AC\u6728\u4F53\u8D28",
      jiBing: "\u51AC\u5E94\u80BE\u800C\u517B\u85CF\uFF0C\u6C34\u80FD\u751F\u6728\uFF0C\u6728\u6C14\u6839\u4E8E\u6C34\uFF0C\u80BE\u6C34\u4E0D\u8DB3\u5219\u809D\u6728\u5931\u517B\uFF0C\u51FA\u73B0\u5934\u6655\u8033\u9E23\u3001\u8170\u819D\u9178\u8F6F\u3001\u76EE\u6697\u4E0D\u660E\u3001\u722A\u7532\u67AF\u840E\u3001\u80A2\u4F53\u9EBB\u6728\u3001\u7B4B\u8109\u62D8\u631B\uFF1B\u6C34\u4E0D\u6DB5\u6728\u5219\u809D\u9633\u504F\u4EA2\uFF0C\u5934\u75DB\u7729\u6655\u3001\u8840\u538B\u5347\u9AD8\u3001\u70E6\u8E81\u6613\u6012\u3002\u51AC\u5B63\u5BD2\u51DD\uFF0C\u809D\u8109\u62D8\u6025\u5219\u5C11\u8179\u51B7\u75DB\u3002",
      qingZhi: "\u809D\u5728\u5FD7\u4E3A\u6012\uFF0C\u51AC\u6728\u4E4B\u4EBA\u80BE\u6C34\u4E0D\u8DB3\u3001\u809D\u6728\u5931\u517B\uFF0C\u6613\u6025\u8E81\u4E0E\u75B2\u60EB\u4EA4\u66FF\u3002\u5B9C\u9759\u517B\u809D\u80BE\u3001\u5E73\u548C\u5FC3\u6001\uFF1B\u5EFA\u8BAE\u65E9\u7761\u665A\u8D77\u5F85\u65E5\u51FA\u540E\u6D3B\u52A8\uFF1B\u95ED\u76EE\u517B\u795E\u51CF\u5C11\u809D\u8840\u8017\u635F\uFF1B\u542C\u8212\u7F13\u97F3\u4E50\u8C03\u517B\u60C5\u5FD7\u3002\u907F\u514D\u71AC\u591C\u4F24\u809D\u3001\u6124\u6012\u8017\u9634\u3002",
      yinShi: "\u5B9C\u98DF\u6ECB\u8865\u809D\u80BE\u3001\u517B\u8840\u67D4\u809D\u4E4B\u54C1\uFF1A\u67B8\u675E\u3001\u9ED1\u829D\u9EBB\u3001\u6851\u845A\u3001\u732A\u809D\u3001\u7F8A\u809D\u3001\u83E0\u83DC\u3001\u7EA2\u67A3\u3001\u6842\u5706\u3001\u6838\u6843\u3001\u9ED1\u8C46\uFF1B\u9002\u91CF\u52A8\u7269\u809D\u810F\u4EE5\u5F62\u8865\u5F62\u3002\u5FCC\u98DF\u8F9B\u8FA3\u71E5\u70C8\uFF08\u8FA3\u6912\u3001\u82B1\u6912\u3001\u9152\u7C7B\uFF09\u8017\u4F24\u809D\u9634\uFF1B\u5C11\u98DF\u751F\u51B7\u5BD2\u51C9\u635F\u4F24\u80BE\u9633\u3002\u5B9C\u996E\u67B8\u675E\u83CA\u82B1\u8336\u3001\u6851\u845A\u7EA2\u67A3\u8336\u517B\u809D\u76CA\u80BE\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u6E29\u6696\u8212\u9002\uFF0C\u907F\u514D\u5BD2\u6E7F\u73AF\u5883\u635F\u4F24\u809D\u80BE\u4E4B\u9633\uFF1B\u51AC\u5B63\u6CE8\u610F\u8170\u8179\u90E8\u4FDD\u6696\uFF0C\u4EE5\u514D\u5BD2\u51DD\u809D\u8109\u3002\u529E\u516C\u73AF\u5883\u5149\u7EBF\u5145\u8DB3\u907F\u514D\u9634\u6697\u52A0\u91CD\u6291\u90C1\u3002\u51AC\u5B63\u4E0D\u5B9C\u4E45\u5750\u4E0D\u52A8\uFF0C\u5B9A\u65F6\u8D77\u8EAB\u6D3B\u52A8\u8212\u7B4B\u6D3B\u7EDC\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6E29\u548C\u62C9\u4F38\u8FD0\u52A8\u8212\u5C55\u7B4B\u8109\uFF1A\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u745C\u4F3D\u3001\u6563\u6B65\u3001\u6162\u8DD1\uFF1B\u8FD0\u52A8\u5728\u65E5\u51FA\u540E\u8FDB\u884C\u907F\u514D\u4E25\u5BD2\u523A\u6FC0\u3002\u6309\u63C9\u592A\u51B2\u7A74\u758F\u809D\u3001\u66F2\u6CC9\u7A74\u517B\u809D\u3001\u4E09\u9634\u4EA4\u6ECB\u8865\u809D\u80BE\uFF1B\u7761\u524D\u6E29\u6C34\u6CE1\u811A\u6E29\u901A\u809D\u8109\u3002"
    },
    "\u51AC\u706B": {
      name: "\u51AC\u706B\u4F53\u8D28",
      jiBing: "\u51AC\u5E94\u80BE\uFF0C\u5BD2\u6C34\u514B\u706B\uFF0C\u5FC3\u9633\u4E0D\u8DB3\u5219\u5FC3\u60B8\u6C14\u77ED\u3001\u80F8\u95F7\u80F8\u75DB\u3001\u754F\u5BD2\u80A2\u51B7\u3001\u9762\u8272\u6644\u767D\u3001\u7CBE\u795E\u4E0D\u632F\u3001\u55DC\u7761\u591A\u68A6\uFF1B\u5FC3\u80BE\u4E0D\u4EA4\u5219\u5931\u7720\u5065\u5FD8\u3001\u8170\u819D\u9178\u8F6F\u3001\u591C\u5C3F\u9891\u591A\u3002\u51AC\u5B63\u4E25\u5BD2\uFF0C\u5BD2\u51DD\u5FC3\u8109\u6613\u8BF1\u53D1\u5FC3\u7EDE\u75DB\u3001\u5FC3\u808C\u6897\u6B7B\u7B49\u5FC3\u7CFB\u91CD\u75C7\u3002",
      qingZhi: "\u5FC3\u5728\u5FD7\u4E3A\u559C\uFF0C\u51AC\u706B\u4E4B\u4EBA\u9633\u6C14\u4E0D\u8DB3\uFF0C\u60C5\u5FD7\u504F\u4F4E\u843D\u3002\u5B9C\u632F\u594B\u5FC3\u9633\u3001\u4E50\u89C2\u8C41\u8FBE\uFF1B\u5EFA\u8BAE\u591A\u6652\u592A\u9633\u5347\u53D1\u9633\u6C14\uFF1B\u53C2\u52A0\u70ED\u95F9\u793E\u4EA4\u6D3B\u52A8\u9F13\u821E\u5FC3\u60C5\uFF1B\u542C\u660E\u5FEB\u97F3\u4E50\u6D3B\u8DC3\u60C5\u7EEA\u3002\u907F\u514D\u957F\u671F\u5904\u4E8E\u9634\u51B7\u73AF\u5883\u52A0\u91CD\u5FC3\u9633\u90C1\u904F\u3002",
      yinShi: "\u5B9C\u98DF\u6E29\u9633\u8865\u5FC3\u4E4B\u54C1\uFF1A\u6842\u5706\u3001\u7EA2\u67A3\u3001\u6838\u6843\u3001\u7F8A\u8089\u3001\u9E21\u8089\u3001\u751F\u59DC\u3001\u6842\u76AE\u3001\u7EA2\u8C46\u3001\u7CEF\u7C73\u3001\u83B2\u5B50\uFF1B\u9002\u91CF\u98DF\u7528\u52A8\u7269\u5FC3\u810F\u4EE5\u810F\u8865\u810F\u3002\u5FCC\u98DF\u751F\u51B7\u5BD2\u51C9\uFF08\u51B0\u996E\u3001\u897F\u74DC\u3001\u82E6\u74DC\u3001\u8783\u87F9\uFF09\u635F\u4F24\u5FC3\u9633\uFF1B\u5C11\u98DF\u6CB9\u817B\u539A\u5473\u52A9\u75F0\u6E7F\u963B\u7EDC\u3002\u5B9C\u996E\u6842\u5706\u7EA2\u67A3\u8336\u3001\u59DC\u67A3\u7EA2\u7CD6\u8336\u6E29\u901A\u5FC3\u9633\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u6E29\u6696\u5411\u9633\uFF0C\u6E29\u5EA6\u4FDD\u6301\u572820\u2103\u4EE5\u4E0A\uFF1B\u4F7F\u7528\u6696\u8272\u8C03\u706F\u5149\u8425\u9020\u6E29\u99A8\u6C1B\u56F4\uFF1B\u6CE8\u610F\u80F8\u80CC\u90E8\u4FDD\u6696\uFF08\u5FC3\u4FDE\u6240\u5728\uFF09\u3002\u529E\u516C\u5EA7\u4F4D\u907F\u514D\u6B63\u5BF9\u7A7A\u8C03\u98CE\u53E3\u3002\u51AC\u5B63\u7A7F\u6234\u4FDD\u6696\uFF0C\u5C24\u5176\u80F8\u80CC\u90E8\u548C\u8DB3\u90E8\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6E29\u548C\u6709\u6C27\u8FD0\u52A8\u6FC0\u53D1\u5FC3\u9633\uFF1A\u5FEB\u8D70\u3001\u6162\u8DD1\u3001\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u5065\u8EAB\u64CD\uFF1B\u8FD0\u52A8\u81F3\u5168\u8EAB\u6E29\u6696\u3001\u5FC3\u80F8\u8212\u7545\u4E3A\u5EA6\u3002\u6309\u63C9\u5185\u5173\u7A74\u5B81\u5FC3\u5B89\u795E\u3001\u795E\u95E8\u7A74\u517B\u5FC3\u3001\u81BB\u4E2D\u7A74\u5BBD\u80F8\u7406\u6C14\uFF1B\u827E\u7078\u5FC3\u4FDE\u3001\u5173\u5143\u6E29\u901A\u5FC3\u9633\u3002\u5FCC\u5267\u70C8\u8FD0\u52A8\u5927\u6C57\u8017\u4F24\u5FC3\u6C14\u3002"
    },
    "\u51AC\u6E7F": {
      name: "\u51AC\u6E7F\u4F53\u8D28",
      jiBing: "\u51AC\u5E94\u80BE\uFF0C\u5BD2\u6E7F\u76F8\u5408\u4F24\u53CA\u813E\u80BE\u4E4B\u9633\uFF0C\u51FA\u73B0\u754F\u5BD2\u80A2\u51B7\u3001\u8170\u819D\u51B7\u75DB\u3001\u8118\u8179\u51B7\u80C0\u3001\u5927\u4FBF\u6E8F\u8584\u6216\u4E94\u66F4\u6CC4\u6CFB\u3001\u5C0F\u4FBF\u6E05\u957F\u3001\u80A2\u4F53\u6D6E\u80BF\u3001\u5173\u8282\u6C89\u91CD\u51B7\u75DB\uFF1B\u5BD2\u6E7F\u56F0\u963B\u5219\u8EAB\u4F53\u56F0\u91CD\u5982\u88F9\u3001\u7CBE\u795E\u840E\u9761\u3002\u51AC\u5B63\u5BD2\u6E7F\u6C24\u6C32\uFF0C\u5185\u5916\u5408\u90AA\uFF0C\u75BE\u75C5\u7F20\u7EF5\u96BE\u6108\u3002",
      qingZhi: "\u813E\u80BE\u5728\u5FD7\u4E3A\u601D\u6050\uFF0C\u51AC\u6E7F\u4E4B\u4EBA\u9633\u865A\u6E7F\u76DB\uFF0C\u6613\u5026\u6020\u5C11\u8A00\u3002\u5B9C\u6E29\u9633\u5316\u6E7F\u3001\u632F\u594B\u7CBE\u795E\uFF1B\u591A\u505A\u6237\u5916\u6D3B\u52A8\u6652\u592A\u9633\u80FD\u5347\u9633\u9664\u6E7F\uFF1B\u53C2\u52A0\u96C6\u4F53\u6D3B\u52A8\u907F\u514D\u72EC\u5904\u6291\u90C1\u3002\u4E0D\u5B9C\u4E45\u5750\u4E45\u5367\u52A0\u91CD\u6E7F\u56F0\u3002",
      yinShi: "\u5B9C\u98DF\u6E29\u9633\u5065\u813E\u795B\u6E7F\u4E4B\u54C1\uFF1A\u9644\u5B50\u3001\u5E72\u59DC\u3001\u8089\u6842\u3001\u832F\u82D3\u3001\u767D\u672F\u3001\u858F\u82E1\u4EC1\u3001\u767D\u6241\u8C46\u3001\u5C71\u836F\u3001\u7F8A\u8089\u3001\u9CAB\u9C7C\u3001\u80E1\u6912\uFF1B\u836F\u81B3\u5982\u9644\u5B50\u7096\u7F8A\u8089\u6E29\u9633\u6563\u5BD2\u5316\u6E7F\u3002\u5FCC\u98DF\u751F\u51B7\u5BD2\u51C9\u3001\u751C\u98DF\u3001\u4E73\u5236\u54C1\u3001\u80A5\u8089\u52A9\u6E7F\uFF1B\u5C11\u996E\u9152\u7C7B\u3002\u5B9C\u996E\u59DC\u67A3\u832F\u82D3\u8336\u3001\u8089\u6842\u858F\u7C73\u8336\u6E29\u9633\u5316\u6E7F\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u6E29\u6696\u5E72\u71E5\uFF0C\u4F7F\u7528\u53D6\u6696\u8BBE\u5907\u548C\u9664\u6E7F\u673A\uFF1B\u907F\u514D\u5C45\u4F4F\u9634\u51B7\u6F6E\u6E7F\u73AF\u5883\uFF1B\u88AB\u8925\u5E38\u667E\u6652\u4FDD\u6301\u5E72\u723D\u3002\u51AC\u5B63\u505A\u597D\u8170\u8179\u90E8\u4FDD\u6696\u9632\u6B62\u5BD2\u6E7F\u5165\u4FB5\u3002\u529E\u516C\u73AF\u5883\u4FDD\u6301\u6E29\u6696\u5E72\u71E5\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6709\u6C27\u8FD0\u52A8\u4FC3\u8FDB\u6C14\u8840\u6D41\u901A\u6392\u6E7F\uFF1A\u5FEB\u8D70\u3001\u6162\u8DD1\u3001\u5065\u8EAB\u64CD\u3001\u592A\u6781\u62F3\u3001\u722C\u697C\u68AF\uFF1B\u8FD0\u52A8\u81F3\u5168\u8EAB\u6E29\u6696\u5FAE\u6C57\u3002\u827E\u7078\u5173\u5143\u3001\u547D\u95E8\u3001\u8DB3\u4E09\u91CC\u6E29\u9633\u5316\u6E7F\uFF1B\u6309\u63C9\u9634\u9675\u6CC9\u5229\u6E7F\u3001\u4E30\u9686\u5316\u75F0\uFF1B\u7761\u524D\u70ED\u6C34\u6CE1\u811A\u52A0\u751F\u59DC\u82B1\u6912\u52A9\u6E29\u9633\u6563\u5BD2\u5316\u6E7F\u3002"
    },
    "\u51AC\u71E5": {
      name: "\u51AC\u71E5\u4F53\u8D28",
      jiBing: "\u51AC\u5E94\u80BE\uFF0C\u6C34\u80FD\u6DA6\u71E5\uFF0C\u80BE\u9634\u4E0D\u8DB3\u5219\u71E5\u8C61\u5185\u751F\uFF0C\u51FA\u73B0\u54BD\u5E72\u53E3\u71E5\u3001\u76AE\u80A4\u5E72\u88C2\u8131\u5C51\u3001\u6BDB\u53D1\u67AF\u69C1\u3001\u5927\u4FBF\u5E72\u7ED3\u5982\u7F8A\u7CAA\u3001\u5C0F\u4FBF\u77ED\u5C11\uFF1B\u9634\u865A\u706B\u65FA\u5219\u4E94\u5FC3\u70E6\u70ED\u3001\u76D7\u6C57\u98A7\u7EA2\u3001\u5E72\u54B3\u5C11\u75F0\u3002\u51AC\u5B63\u5BA4\u5185\u6696\u6C14\u52A0\u5267\u6D25\u6DB2\u8017\u4F24\uFF0C\u71E5\u8C61\u66F4\u52A0\u660E\u663E\u3002",
      qingZhi: "\u80BE\u5728\u5FD7\u4E3A\u6050\uFF0C\u51AC\u71E5\u4E4B\u4EBA\u9634\u6DB2\u4E0D\u8DB3\uFF0C\u6613\u5FC3\u70E6\u4E0D\u5B89\u3002\u5B9C\u6ECB\u9634\u6DA6\u71E5\u3001\u5B81\u5FC3\u9759\u517B\uFF1B\u5EFA\u8BAE\u65E9\u7761\u665A\u8D77\u517B\u9634\u85CF\u7CBE\uFF1B\u5BA4\u5185\u4FDD\u6301\u6E7F\u6DA6\u3001\u591A\u996E\u6E29\u6C34\uFF1B\u542C\u8212\u7F13\u97F3\u4E50\u5B89\u795E\u3002\u907F\u514D\u71AC\u591C\u8017\u9634\u3001\u60C5\u7EEA\u6FC0\u52A8\u4F24\u6D25\u3002",
      yinShi: "\u5B9C\u98DF\u6ECB\u9634\u6DA6\u71E5\u3001\u8865\u80BE\u586B\u7CBE\u4E4B\u54C1\uFF1A\u9ED1\u829D\u9EBB\u3001\u6838\u6843\u3001\u6851\u845A\u3001\u67B8\u675E\u3001\u719F\u5730\u3001\u963F\u80F6\u3001\u94F6\u8033\u3001\u767E\u5408\u3001\u9EA6\u51AC\u3001\u6C99\u53C2\u3001\u9E2D\u8089\u3001\u732A\u8089\u3001\u6D77\u53C2\uFF1B\u9002\u91CF\u98DF\u7528\u80BE\u810F\u4EE5\u810F\u8865\u810F\u3002\u5FCC\u98DF\u8F9B\u6E29\u71E5\u70C8\uFF08\u8FA3\u6912\u3001\u82B1\u6912\u3001\u7F8A\u8089\u3001\u9152\u7C7B\uFF09\u8017\u4F24\u9634\u6DB2\u3002\u5B9C\u996E\u9ED1\u829D\u9EBB\u7CCA\u3001\u94F6\u8033\u767E\u5408\u7FB9\u3001\u77F3\u659B\u9EA6\u51AC\u8336\u6ECB\u9634\u6DA6\u71E5\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u6E7F\u5EA6\uFF08\u52A0\u6E7F\u5668\u7EF4\u630150%\u4EE5\u4E0A\uFF09\uFF0C\u907F\u514D\u6696\u6C14\u623F\u8FC7\u5EA6\u5E72\u71E5\uFF1B\u5BA4\u5185\u653E\u7F6E\u6C34\u666F\u3001\u6C34\u751F\u690D\u7269\u589E\u6E7F\u3002\u529E\u516C\u684C\u653E\u7F6E\u52A0\u6E7F\u5668\u6216\u4E00\u676F\u6C34\u3002\u591C\u95F4\u7761\u7720\u4F7F\u7528\u52A0\u6E7F\u5668\u4FDD\u62A4\u547C\u5438\u9053\u3002\u51CF\u5C11\u4F7F\u7528\u7535\u70ED\u6BEF\u4EE5\u514D\u52A0\u91CD\u71E5\u70ED\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u8212\u7F13\u8FD0\u52A8\u907F\u514D\u5927\u6C57\u4F24\u9634\uFF1A\u592A\u6781\u62F3\u3001\u745C\u4F3D\u3001\u6563\u6B65\u3001\u6C14\u529F\u3001\u516B\u6BB5\u9526\uFF1B\u8FD0\u52A8\u5728\u5BA4\u5185\u6E29\u6696\u73AF\u5883\u8FDB\u884C\uFF0C\u907F\u514D\u51B7\u7A7A\u6C14\u523A\u6FC0\u52A0\u91CD\u71E5\u54B3\u3002\u6309\u63C9\u592A\u6E0A\u7A74\u6DA6\u80BA\u3001\u7167\u6D77\u7A74\u6ECB\u9634\u3001\u4E09\u9634\u4EA4\u517B\u9634\uFF1B\u7EC3\u4E60\u6DF1\u547C\u5438\u4EE5\u6DA6\u4E3A\u4E3B\u3002"
    },
    "\u51AC\u5BD2": {
      name: "\u51AC\u5BD2\u4F53\u8D28",
      jiBing: "\u51AC\u5E94\u80BE\uFF0C\u5BD2\u4E3A\u51AC\u4E4B\u4E3B\u6C14\uFF0C\u80BE\u9633\u865A\u8870\u5219\u754F\u5BD2\u80A2\u51B7\u3001\u8170\u819D\u51B7\u75DB\u3001\u7CBE\u795E\u840E\u9761\u3001\u5C0F\u4FBF\u6E05\u957F\u591C\u5C3F\u9891\u591A\u3001\u9633\u75FF\u65E9\u6CC4\u3001\u4E94\u66F4\u6CC4\u6CFB\uFF1B\u5BD2\u51DD\u8840\u8109\u5219\u56DB\u80A2\u672B\u68A2\u51B0\u51B7\u3001\u80A4\u8272\u7D2B\u6697\u3001\u5173\u8282\u51B7\u75DB\u3002\u51AC\u5B63\u5BD2\u90AA\u5F53\u4EE4\uFF0C\u6700\u6613\u4F24\u80BE\u4E2D\u9633\u6C14\uFF0C\u8BF1\u53D1\u54B3\u5598\u3001\u5FC3\u7EDE\u75DB\u7B49\u9648\u75BE\u3002",
      qingZhi: "\u80BE\u5728\u5FD7\u4E3A\u6050\uFF0C\u51AC\u5BD2\u4E4B\u4EBA\u814E\u967D\u4E0D\u8DB3\uFF0C\u6613\u6050\u60E7\u4E0D\u5B89\u3002\u5B9C\u6E29\u80BE\u58EE\u9633\u3001\u5B89\u795E\u5B9A\u5FD7\uFF1B\u5EFA\u8BAE\u591A\u6652\u592A\u9633\u5347\u53D1\u9633\u6C14\uFF1B\u4FDD\u6301\u751F\u6D3B\u89C4\u5F8B\u51CF\u5C11\u6050\u60E7\uFF1B\u4E0E\u4EB2\u53CB\u6E29\u6696\u76F8\u5904\u589E\u6DFB\u5B89\u5168\u611F\u3002\u907F\u514D\u72EC\u5904\u9634\u51B7\u73AF\u5883\u548C\u6050\u60E7\u4FE1\u606F\u523A\u6FC0\u3002",
      yinShi: "\u5B9C\u98DF\u6E29\u80BE\u58EE\u9633\u3001\u6563\u5BD2\u6696\u8EAB\u4E4B\u54C1\uFF1A\u7F8A\u8089\u3001\u9E7F\u8089\u3001\u72D7\u8089\u3001\u6838\u6843\u3001\u6842\u5706\u3001\u97ED\u83DC\u3001\u751F\u59DC\u3001\u8089\u6842\u3001\u82B1\u6912\u3001\u516B\u89D2\u3001\u4E01\u9999\uFF1B\u836F\u81B3\u5982\u5F53\u5F52\u751F\u59DC\u7F8A\u8089\u6C64\u3001\u9644\u5B50\u7096\u7F8A\u8089\u3002\u5FCC\u98DF\u751F\u51B7\u5BD2\u51C9\uFF08\u51B0\u996E\u3001\u897F\u74DC\u3001\u82E6\u74DC\u3001\u8783\u87F9\u3001\u68A8\uFF09\u635F\u4F24\u80BE\u9633\u3002\u5B9C\u996E\u8089\u6842\u59DC\u8336\u3001\u6838\u6843\u7EA2\u67A3\u8336\u6E29\u80BE\u58EE\u9633\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u6E29\u6696\uFF0820\u2103\u4EE5\u4E0A\uFF09\uFF0C\u4F7F\u7528\u6696\u6C14\u3001\u7535\u70ED\u6BEF\u7B49\u53D6\u6696\uFF1B\u6CE8\u610F\u8170\u80CC\u90E8\u548C\u8DB3\u90E8\u4FDD\u6696\u5C24\u4E3A\u5173\u952E\uFF1B\u7A7F\u7740\u4FDD\u6696\u6027\u597D\u8863\u7269\uFF0C\u6234\u5E3D\u56F4\u5DFE\u624B\u5957\u9632\u5BD2\u3002\u529E\u516C\u73AF\u5883\u907F\u514D\u5EA7\u4F4D\u9760\u8FD1\u95E8\u7A97\u51B7\u98CE\u3002\u51AC\u5B63\u5BA4\u5185\u6D3B\u52A8\u4E3A\u4E3B\uFF0C\u5916\u51FA\u6CE8\u610F\u9632\u5BD2\u4FDD\u6696\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6E29\u548C\u8FD0\u52A8\u4FC3\u8FDB\u9633\u6C14\u751F\u53D1\uFF1A\u5FEB\u8D70\u3001\u6162\u8DD1\u3001\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u5065\u8EAB\u64CD\uFF1B\u8FD0\u52A8\u5728\u65E5\u51FA\u540E\u8FDB\u884C\uFF0C\u907F\u98CE\u5BD2\u3002\u827E\u7078\u5173\u5143\u3001\u547D\u95E8\u3001\u80BE\u4FDE\u3001\u8DB3\u4E09\u91CC\u6E29\u8865\u80BE\u9633\uFF1B\u6309\u63C9\u6D8C\u6CC9\u7A74\u6E29\u80BE\u52A9\u9633\u3001\u592A\u6EAA\u7A74\u8865\u80BE\uFF1B\u7761\u524D\u70ED\u6C34\u6CE1\u811A\u81F3\u5FAE\u6C57\u3002"
    },
    "\u5B63\u6728": {
      name: "\u5B63\u6728\u4F53\u8D28",
      jiBing: "\u5B63\u571F\u5E94\u813E\u4E3B\u957F\u590F\uFF0C\u6728\u514B\u571F\uFF0C\u571F\u865A\u6728\u4E58\u5219\u809D\u813E\u4E0D\u548C\uFF0C\u51FA\u73B0\u8118\u8179\u80C0\u6EE1\u3001\u98DF\u5C11\u7EB3\u5446\u3001\u5927\u4FBF\u6E8F\u8584\u3001\u80C1\u808B\u80C0\u75DB\u3001\u55F3\u6C14\u6CDB\u9178\u3001\u70E6\u8E81\u6613\u6012\uFF1B\u813E\u865A\u6E7F\u56F0\u5219\u8EAB\u91CD\u56F0\u5026\u3001\u9762\u8272\u840E\u9EC4\u3001\u820C\u82D4\u767D\u817B\u3002\u56DB\u5B63\u571F\u6708\u6E7F\u6C14\u504F\u91CD\uFF0C\u4E0E\u809D\u6C14\u4E0D\u8212\u76F8\u5408\u4E3A\u809D\u813E\u5931\u8C03\u8BC1\u3002",
      qingZhi: "\u809D\u5728\u5FD7\u4E3A\u6012\uFF0C\u813E\u5728\u5FD7\u4E3A\u601D\uFF0C\u5B63\u6728\u4E4B\u4EBA\u809D\u813E\u4E0D\u548C\uFF0C\u601D\u8651\u4E0E\u6025\u8E81\u4EA4\u66FF\u3002\u5B9C\u758F\u809D\u5065\u813E\u3001\u8C03\u7545\u60C5\u5FD7\uFF1B\u4FDD\u6301\u89C4\u5F8B\u4F5C\u606F\u907F\u514D\u8FC7\u5EA6\u601D\u8651\uFF1B\u4E0E\u4EB2\u53CB\u4EA4\u6D41\u7F13\u89E3\u538B\u529B\u3002\u4E0D\u5B9C\u66B4\u6012\u6216\u957F\u671F\u538B\u6291\u60C5\u7EEA\u3002",
      yinShi: "\u5B9C\u98DF\u758F\u809D\u5065\u813E\u4E4B\u54C1\uFF1A\u9648\u76AE\u3001\u4F5B\u624B\u3001\u7802\u4EC1\u3001\u767D\u6241\u8C46\u3001\u832F\u82D3\u3001\u5C71\u836F\u3001\u5927\u67A3\u3001\u83B2\u5B50\u3001\u5C0F\u7C73\u3001\u9CAB\u9C7C\uFF1B\u9002\u91CF\u98DF\u7528\u751F\u59DC\u6E29\u4E2D\u548C\u80C3\u3002\u5FCC\u98DF\u751F\u51B7\u6CB9\u817B\u3001\u751C\u98DF\u3001\u9ECF\u817B\u96BE\u5316\u98DF\u7269\u59A8\u788D\u813E\u80C3\u8FD0\u5316\u3002\u5B9C\u996E\u9648\u76AE\u666E\u6D31\u8336\u3001\u4F5B\u624B\u73AB\u7470\u82B1\u8336\u758F\u809D\u548C\u80C3\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u5E72\u71E5\u901A\u98CE\uFF0C\u907F\u514D\u6F6E\u6E7F\u73AF\u5883\u52A0\u91CD\u6E7F\u56F0\uFF1B\u5BA4\u5185\u5E03\u7F6E\u6574\u6D01\u660E\u4EAE\u51CF\u5C11\u618B\u95F7\u611F\u3002\u529E\u516C\u73AF\u5883\u4FDD\u6301\u901A\u98CE\u3002\u5B63\u6708\u6E7F\u6C14\u8F83\u91CD\u65F6\u4F7F\u7528\u9664\u6E7F\u673A\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u4F38\u5C55\u548C\u7F13\u8FD0\u52A8\u758F\u809D\u5065\u813E\uFF1A\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u6563\u6B65\u3001\u745C\u4F3D\uFF1B\u8FD0\u52A8\u81F3\u5FAE\u6C57\u51FA\u4E3A\u5EA6\u3002\u6309\u63C9\u592A\u51B2\u7A74\u758F\u809D\u3001\u8DB3\u4E09\u91CC\u5065\u813E\u3001\u9633\u9675\u6CC9\u758F\u6CC4\u809D\u6C14\uFF1B\u907F\u514D\u8FC7\u5EA6\u52B3\u7D2F\u4F24\u813E\u3002"
    },
    "\u5B63\u706B": {
      name: "\u5B63\u706B\u4F53\u8D28",
      jiBing: "\u5B63\u571F\u5E94\u813E\uFF0C\u706B\u751F\u571F\uFF0C\u5FC3\u813E\u706B\u65FA\u5219\u53E3\u820C\u751F\u75AE\u3001\u7259\u9F88\u80BF\u75DB\u3001\u53E3\u81ED\u3001\u5FC3\u70E6\u5931\u7720\u3001\u591A\u98DF\u6613\u9965\u3001\u5C0F\u4FBF\u77ED\u8D64\u3001\u5927\u4FBF\u5E72\u7ED3\uFF1B\u5FC3\u706B\u79FB\u70ED\u4E8E\u813E\u5219\u5507\u53E3\u751F\u75AE\u3002\u56DB\u5B63\u571F\u6708\u6E7F\u70ED\u4EA4\u84B8\uFF0C\u4E0E\u5FC3\u813E\u4E4B\u706B\u76F8\u5408\uFF0C\u6613\u53D1\u53E3\u8154\u6E83\u75A1\u3001\u7259\u9F88\u708E\u7B49\u706B\u70ED\u4E0A\u708E\u8BC1\u5019\u3002",
      qingZhi: "\u5FC3\u5728\u5FD7\u4E3A\u559C\uFF0C\u813E\u5728\u5FD7\u4E3A\u601D\uFF0C\u5B63\u706B\u4E4B\u4EBA\u601D\u8651\u8FC7\u5EA6\u5316\u706B\uFF0C\u6613\u5FC3\u70E6\u7126\u8E81\u3002\u5B9C\u6E05\u5FC3\u964D\u706B\u3001\u51CF\u5C11\u601D\u8651\uFF1B\u5EFA\u8BAE\u5348\u95F4\u5C0F\u61A9\u517B\u5FC3\u5B89\u795E\uFF1B\u907F\u514D\u8FC7\u5EA6\u601D\u8651\u548C\u60C5\u7EEA\u6FC0\u52A8\u3002\u4E0D\u5B9C\u53C2\u4E0E\u8FC7\u4E8E\u5174\u594B\u523A\u6FC0\u6D3B\u52A8\u3002",
      yinShi: "\u5B9C\u98DF\u6E05\u70ED\u6CFB\u706B\u3001\u7518\u51C9\u6ECB\u6DA6\u4E4B\u54C1\uFF1A\u82E6\u74DC\u3001\u83B2\u5B50\u5FC3\u3001\u7EFF\u8C46\u3001\u51AC\u74DC\u3001\u897F\u74DC\u3001\u68A8\u3001\u8378\u8360\u3001\u83B2\u85D5\u3001\u751F\u5730\u3001\u9EA6\u51AC\uFF1B\u9002\u5F53\u98DF\u7528\u767E\u5408\u3001\u94F6\u8033\u6ECB\u9634\u6E05\u5FC3\u3002\u5FCC\u98DF\u8F9B\u8FA3\u6E29\u8865\u3001\u714E\u70B8\u70E7\u70E4\u52A9\u706B\uFF1B\u5C11\u98DF\u6CB9\u817B\u751C\u98DF\u52A9\u6E7F\u751F\u70ED\u3002\u5B9C\u996E\u83B2\u5B50\u5FC3\u8336\u3001\u7AF9\u53F6\u8336\u3001\u82E6\u4E01\u8336\u6E05\u5FC3\u6CFB\u706B\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u901A\u98CE\u51C9\u723D\uFF0C\u907F\u514D\u95F7\u70ED\u73AF\u5883\u52A9\u957F\u706B\u6C14\uFF1B\u5BA4\u5185\u5149\u7EBF\u67D4\u548C\u4E0D\u523A\u773C\u3002\u529E\u516C\u73AF\u5883\u4FDD\u6301\u9002\u5B9C\u6E29\u6E7F\u5EA6\uFF0C\u591A\u996E\u6C34\u3002\u5B63\u571F\u6708\u95F7\u70ED\u65F6\u6CE8\u610F\u9632\u6691\u964D\u6E29\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6E05\u51C9\u8212\u7F13\u8FD0\u52A8\uFF1A\u6E38\u6CF3\u3001\u745C\u4F3D\u3001\u592A\u6781\u62F3\u3001\u6563\u6B65\uFF1B\u907F\u514D\u9AD8\u6E29\u65F6\u6BB5\u548C\u5F3A\u70C8\u9633\u5149\u4E0B\u8FD0\u52A8\u3002\u6309\u63C9\u795E\u95E8\u7A74\u5B89\u795E\u3001\u5185\u5173\u7A74\u5B81\u5FC3\u3001\u66F2\u6C60\u7A74\u6E05\u70ED\uFF1B\u8FD0\u52A8\u540E\u9002\u91CF\u8865\u5145\u6DE1\u76D0\u6C34\u548C\u6E05\u70ED\u996E\u54C1\u3002"
    },
    "\u5B63\u6E7F": {
      name: "\u5B63\u6E7F\u4F53\u8D28",
      jiBing: "\u5B63\u571F\u5E94\u813E\uFF0C\u6E7F\u4E3A\u571F\u4E4B\u6C14\uFF0C\u813E\u559C\u71E5\u6076\u6E7F\uFF0C\u6E7F\u56F0\u813E\u571F\u5219\u8FD0\u5316\u65E0\u6743\uFF0C\u51FA\u73B0\u8118\u8179\u80C0\u6EE1\u3001\u98DF\u5C11\u7EB3\u5446\u3001\u53E3\u6DE1\u4E0D\u6E34\u3001\u5927\u4FBF\u6E8F\u8584\u3001\u9ECF\u6EDE\u4E0D\u723D\u3001\u8EAB\u4F53\u56F0\u91CD\u3001\u5934\u91CD\u5982\u88F9\u3001\u9762\u8272\u840E\u9EC4\u3001\u6D6E\u80BF\uFF1B\u6E7F\u6D4A\u4E0B\u6CE8\u5219\u5E26\u4E0B\u91CF\u591A\u3001\u4E0B\u80A2\u6C89\u91CD\u3002\u56DB\u5B63\u571F\u6708\u6E7F\u6C14\u6700\u76DB\u3002",
      qingZhi: "\u813E\u5728\u5FD7\u4E3A\u601D\uFF0C\u5B63\u6E7F\u4E4B\u4EBA\u601D\u8651\u56F0\u813E\uFF0C\u6613\u5026\u6020\u5FE7\u601D\u3002\u5B9C\u5065\u813E\u5316\u6E7F\u3001\u5F00\u9614\u5FC3\u80F8\uFF1B\u9002\u5F53\u6237\u5916\u6D3B\u52A8\u5347\u53D1\u9633\u6C14\u6D88\u9664\u56F0\u5026\uFF1B\u907F\u514D\u4E45\u5750\u4E45\u5367\u601D\u8651\u8FC7\u5EA6\u4F24\u813E\u3002\u4E0D\u5B9C\u957F\u671F\u72EC\u5904\u6C89\u601D\u3002",
      yinShi: "\u5B9C\u98DF\u5065\u813E\u795B\u6E7F\u4E4B\u54C1\u4E3A\u541B\uFF1A\u858F\u82E1\u4EC1\u3001\u767D\u6241\u8C46\u3001\u832F\u82D3\u3001\u767D\u672F\u3001\u5C71\u836F\u3001\u82A1\u5B9E\u3001\u83B2\u5B50\u3001\u9648\u76AE\u3001\u51AC\u74DC\u3001\u9CAB\u9C7C\u3001\u8D64\u5C0F\u8C46\uFF1B\u5C11\u91CF\u8F9B\u9999\u8C03\u5473\u5982\u751F\u59DC\u3001\u7802\u4EC1\u9192\u813E\u5316\u6E7F\u3002\u5FCC\u98DF\u751F\u51B7\u74DC\u679C\u3001\u51B0\u996E\u3001\u751C\u98DF\u3001\u4E73\u5236\u54C1\u3001\u80A5\u7518\u539A\u5473\u52A9\u6E7F\uFF1B\u5C11\u996E\u9152\u3002\u5B9C\u996E\u832F\u82D3\u858F\u7C73\u8336\u3001\u9648\u76AE\u666E\u6D31\u8336\u5065\u813E\u5229\u6E7F\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u5C45\u4F4F\u9AD8\u5C42\u5E72\u71E5\u3001\u901A\u98CE\u826F\u597D\uFF0C\u4F7F\u7528\u9664\u6E7F\u8BBE\u5907\uFF1B\u907F\u514D\u5730\u4E0B\u5BA4\u3001\u4E00\u697C\u6F6E\u6E7F\u73AF\u5883\uFF1B\u8863\u7269\u88AB\u8925\u5E38\u667E\u6652\u3002\u529E\u516C\u5EA7\u4F4D\u8FDC\u79BB\u996E\u6C34\u533A\u6F6E\u6E7F\u533A\u57DF\u3002\u5B63\u6708\u96E8\u5929\u51CF\u5C11\u5916\u51FA\u9632\u5916\u6E7F\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u51FA\u6C57\u6392\u6E7F\u8FD0\u52A8\uFF1A\u5FEB\u8D70\u3001\u6162\u8DD1\u3001\u722C\u697C\u68AF\u3001\u5065\u8EAB\u64CD\u3001\u9AD8\u6E29\u745C\u4F3D\uFF1B\u8FD0\u52A8\u81F3\u6C57\u51FA\u900F\u6E7F\u4E3A\u4F73\u3002\u6309\u63C9\u8DB3\u4E09\u91CC\u5065\u813E\u3001\u9634\u9675\u6CC9\u5229\u6E7F\u3001\u4E30\u9686\u795B\u75F0\uFF1B\u827E\u7078\u4E2D\u8118\u3001\u5173\u5143\u6E29\u9633\u5316\u6E7F\u3002\u8FD0\u52A8\u540E\u53CA\u65F6\u64E6\u5E72\u6C57\u6C34\u66F4\u6362\u5E72\u8863\u3002"
    },
    "\u5B63\u71E5": {
      name: "\u5B63\u71E5\u4F53\u8D28",
      jiBing: "\u5B63\u571F\u5E94\u813E\uFF0C\u571F\u4E0D\u751F\u91D1\u5219\u80BA\u813E\u4E24\u865A\uFF0C\u51FA\u73B0\u53E3\u5E72\u54BD\u71E5\u3001\u5E72\u54B3\u5C11\u75F0\u3001\u76AE\u80A4\u5E72\u71E5\u3001\u5927\u4FBF\u5E72\u7ED3\u3001\u98DF\u6B32\u4E0D\u632F\u3001\u8179\u80C0\u3001\u795E\u75B2\u4E4F\u529B\uFF1B\u813E\u9634\u4E0D\u8DB3\u5219\u53E3\u5507\u5E72\u88C2\u3001\u820C\u7EA2\u5C11\u82D4\u3002\u56DB\u5B63\u571F\u6708\u71E5\u6E7F\u4EA4\u66FF\uFF0C\u813E\u9634\u4E0E\u80BA\u6D25\u5E76\u4E8F\uFF0C\u6D25\u6DB2\u4E0D\u5E03\u5219\u71E5\u8C61\u4E1B\u751F\u3002",
      qingZhi: "\u813E\u5728\u5FD7\u4E3A\u601D\uFF0C\u5B63\u71E5\u4E4B\u4EBA\u9634\u6D25\u4E0D\u8DB3\uFF0C\u6613\u5FC3\u70E6\u4E0D\u5B89\u3002\u5B9C\u5065\u813E\u6DA6\u71E5\u3001\u5B89\u795E\u5B9A\u5FD7\uFF1B\u65E9\u7761\u65E9\u8D77\u4FDD\u6301\u4F5C\u606F\u89C4\u5F8B\uFF1B\u591A\u996E\u6E29\u6C34\u6ECB\u6DA6\u3002\u907F\u514D\u601D\u8651\u8FC7\u5EA6\u8017\u4F24\u813E\u9634\u3002\u4E0D\u5B9C\u957F\u671F\u5904\u4E8E\u5E72\u71E5\u73AF\u5883\u3002",
      yinShi: "\u5B9C\u98DF\u5065\u813E\u6DA6\u71E5\u4E4B\u54C1\uFF1A\u5C71\u836F\u3001\u767D\u6241\u8C46\u3001\u83B2\u5B50\u3001\u767E\u5408\u3001\u94F6\u8033\u3001\u9EA6\u51AC\u3001\u6C99\u53C2\u3001\u7389\u7AF9\u3001\u8702\u871C\u3001\u68A8\u3001\u7518\u8517\u3001\u77F3\u659B\uFF1B\u9002\u91CF\u98DF\u7528\u732A\u809A\u3001\u9E2D\u8089\u5065\u813E\u6ECB\u9634\u3002\u5FCC\u98DF\u8F9B\u6E29\u71E5\u70C8\u3001\u714E\u70B8\u70E7\u70E4\u8017\u4F24\u813E\u9634\u3002\u5B9C\u996E\u5C71\u836F\u767E\u5408\u7CA5\u3001\u77F3\u659B\u9EA6\u51AC\u8336\u3001\u94F6\u8033\u7FB9\u5065\u813E\u6DA6\u71E5\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u4FDD\u6301\u9002\u5B9C\u6E7F\u5EA6\uFF0C\u4F7F\u7528\u52A0\u6E7F\u5668\u589E\u6E7F\uFF1B\u5BA4\u5185\u653E\u7F6E\u6C34\u751F\u690D\u7269\u6539\u5584\u5E72\u71E5\u3002\u529E\u516C\u73AF\u5883\u591A\u996E\u6C34\u4FDD\u6E7F\u3002\u5B63\u571F\u6708\u6CE8\u610F\u4FDD\u6E7F\u62A4\u80A4\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u67D4\u548C\u8FD0\u52A8\u8C03\u517B\u80BA\u813E\uFF1A\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\u3001\u6563\u6B65\u3001\u6C14\u529F\uFF1B\u8FD0\u52A8\u5F3A\u5EA6\u9002\u5EA6\uFF0C\u907F\u514D\u5927\u6C57\u4F24\u9634\u3002\u6309\u63C9\u592A\u6E0A\u7A74\u6DA6\u80BA\u3001\u4E09\u9634\u4EA4\u6ECB\u9634\u5065\u813E\u3001\u8DB3\u4E09\u91CC\u548C\u80C3\uFF1B\u8FD0\u52A8\u540E\u9002\u91CF\u8865\u5145\u6E29\u6C34\u3002"
    },
    "\u5B63\u5BD2": {
      name: "\u5B63\u5BD2\u4F53\u8D28",
      jiBing: "\u5B63\u571F\u5E94\u813E\uFF0C\u813E\u9633\u4E0D\u8DB3\u5219\u5BD2\u6E7F\u5185\u751F\uFF0C\u51FA\u73B0\u8118\u8179\u51B7\u75DB\u3001\u559C\u6E29\u559C\u6309\u3001\u7EB3\u5C11\u8179\u80C0\u3001\u5927\u4FBF\u7A00\u6E8F\u3001\u56DB\u80A2\u4E0D\u6E29\u3001\u795E\u75B2\u4E4F\u529B\u3001\u9762\u8272\u65E0\u534E\uFF1B\u813E\u9633\u865A\u8870\u5219\u6C34\u6E7F\u4E0D\u5316\uFF0C\u80A2\u4F53\u6D6E\u80BF\u3001\u5C0F\u4FBF\u4E0D\u5229\u3002\u56DB\u5B63\u571F\u6708\u4E4B\u4EA4\uFF0C\u5BD2\u6E7F\u4E0E\u813E\u865A\u76F8\u5408\uFF0C\u6613\u53D1\u6162\u6027\u6CC4\u6CFB\u3001\u6C34\u80BF\u3002",
      qingZhi: "\u813E\u5728\u5FD7\u4E3A\u601D\uFF0C\u5B63\u5BD2\u4E4B\u4EBA\u813E\u9633\u4E0D\u632F\uFF0C\u6613\u5FE7\u601D\u5C11\u8A00\u3002\u5B9C\u6E29\u9633\u5065\u813E\u3001\u4E50\u89C2\u5F00\u6717\uFF1B\u591A\u6652\u592A\u9633\u5347\u53D1\u9633\u6C14\uFF1B\u9002\u5F53\u793E\u4EA4\u6D3B\u52A8\u6D3B\u8DC3\u6C14\u6C1B\u3002\u907F\u514D\u8FC7\u5EA6\u601D\u8651\u5FE7\u4F24\u4F24\u813E\u9633\u3002\u4E0D\u5B9C\u4E45\u5750\u9634\u51B7\u73AF\u5883\u3002",
      yinShi: "\u5B9C\u98DF\u6E29\u4E2D\u5065\u813E\u3001\u6563\u5BD2\u5316\u6E7F\u4E4B\u54C1\uFF1A\u5E72\u59DC\u3001\u8089\u6842\u3001\u82B1\u6912\u3001\u80E1\u6912\u3001\u7F8A\u8089\u3001\u9CAB\u9C7C\u3001\u7CEF\u7C73\u3001\u6842\u5706\u3001\u7EA2\u67A3\u3001\u83B2\u5B50\u3001\u5C71\u836F\uFF1B\u836F\u81B3\u5982\u751F\u59DC\u7096\u7F8A\u8089\u6E29\u4E2D\u6563\u5BD2\u3002\u5FCC\u98DF\u751F\u51B7\u5BD2\u51C9\u3001\u74DC\u679C\u51B7\u996E\u4F24\u813E\u9633\uFF1B\u5C11\u98DF\u6CB9\u817B\u96BE\u5316\u788D\u813E\u3002\u5B9C\u996E\u59DC\u67A3\u8336\u3001\u6842\u76AE\u7EA2\u8336\u6E29\u4E2D\u5065\u813E\u3002",
      huanJing: "\u5C45\u5BA4\u5B9C\u6E29\u6696\u5E72\u71E5\uFF0C\u6CE8\u610F\u8179\u90E8\u4FDD\u6696\uFF1B\u4F7F\u7528\u6696\u5B9D\u5B9D\u6216\u70ED\u6C34\u888B\u6E29\u6696\u813E\u80C3\u533A\u57DF\u3002\u529E\u516C\u5EA7\u4F4D\u907F\u98CE\u4FDD\u6696\u3002\u5B63\u6708\u4E4B\u4EA4\u6C14\u6E29\u53D8\u5316\u5927\uFF0C\u6CE8\u610F\u53CA\u65F6\u6DFB\u8863\u9632\u5BD2\u3002",
      yunDong: "\u5B9C\u8FDB\u884C\u6E29\u548C\u8FD0\u52A8\u6E29\u9633\u5065\u813E\uFF1A\u5FEB\u8D70\u3001\u6162\u8DD1\u3001\u592A\u6781\u62F3\u3001\u516B\u6BB5\u9526\uFF1B\u8FD0\u52A8\u81F3\u5168\u8EAB\u6E29\u6696\u4E3A\u5EA6\u3002\u6309\u63C9\u8DB3\u4E09\u91CC\u548C\u80C3\u3001\u4E2D\u8118\u6E29\u4E2D\u3001\u5173\u5143\u6E29\u9633\uFF1B\u827E\u7078\u795E\u9619\u3001\u6C14\u6D77\u3001\u8DB3\u4E09\u91CC\u6E29\u813E\u6563\u5BD2\u3002\u7761\u524D\u70ED\u6C34\u6CE1\u811A\u81F3\u5FAE\u6C57\u3002"
    }
  };
  function determineConstitution(monthZhi, dayGan) {
    const key = getConstitutionKey(monthZhi, dayGan);
    return constitutionMap[key] || null;
  }
  function getConstitutionName(monthZhi, dayGan) {
    const item = determineConstitution(monthZhi, dayGan);
    return item ? item.name : "\u672A\u5339\u914D";
  }

  // src/analysis.ts
  var SHENG2 = { "\u6728": "\u706B", "\u706B": "\u571F", "\u571F": "\u91D1", "\u91D1": "\u6C34", "\u6C34": "\u6728" };
  var KE2 = { "\u6728": "\u571F", "\u571F": "\u6C34", "\u6C34": "\u706B", "\u706B": "\u91D1", "\u91D1": "\u6728" };
  var EL_NAMES2 = ["\u6728", "\u706B", "\u571F", "\u91D1", "\u6C34"];
  var HIDDEN_SCORE = {
    0: [[9, 100]],
    1: [[5, 60], [9, 30], [7, 10]],
    2: [[0, 60], [2, 30], [4, 10]],
    3: [[1, 100]],
    4: [[4, 60], [1, 30], [9, 10]],
    5: [[2, 60], [6, 30], [4, 10]],
    6: [[3, 70], [5, 30]],
    7: [[5, 60], [3, 30], [1, 10]],
    8: [[6, 60], [8, 30], [4, 10]],
    9: [[7, 100]],
    10: [[4, 60], [7, 30], [3, 10]],
    11: [[8, 70], [0, 30]]
  };
  var TIAO_HOU = {
    2: ["\u706B", "\u571F"],
    3: ["\u706B", "\u571F"],
    5: ["\u6C34", "\u91D1"],
    6: ["\u6C34", "\u91D1"],
    8: ["\u706B", "\u6C34"],
    9: ["\u706B", "\u6C34"],
    11: ["\u706B", "\u571F"],
    0: ["\u706B", "\u571F"],
    4: ["\u706B", "\u6C34"],
    7: ["\u6C34", "\u706B"],
    10: ["\u6C34", "\u706B"],
    1: ["\u706B", "\u6C34"]
  };
  var CHANG_SHENG_CS = {
    0: [2, 3, 5, 6, 8, 9, 11, 0, 2, 3],
    1: [6, 7, 9, 10, 0, 1, 3, 4, 6, 7],
    2: [5, 6, 8, 9, 11, 0, 2, 3, 5, 6],
    3: [8, 9, 11, 0, 2, 3, 5, 6, 8, 9],
    4: [5, 6, 8, 9, 11, 0, 2, 3, 5, 6],
    5: [8, 9, 11, 0, 2, 3, 5, 6, 8, 9],
    6: [3, 4, 6, 7, 9, 10, 0, 1, 3, 4],
    7: [0, 1, 3, 4, 6, 7, 9, 10, 0, 1],
    8: [9, 10, 0, 1, 3, 4, 6, 7, 9, 10],
    9: [5, 6, 8, 9, 11, 0, 2, 3, 5, 6]
  };
  var LU_ZHI = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
  var DI_WANG_ZHI = [3, 2, 6, 5, 6, 5, 9, 8, 0, 11];
  var IS_WET_SOIL = (z) => z === 4 || z === 1;
  var IS_DRY_SOIL = (z) => z === 10 || z === 7;
  var IS_GRAVE = (z) => IS_WET_SOIL(z) || IS_DRY_SOIL(z);
  var GRAVE_ROOT_MULT = { 4: 0.6, 1: 0.6, 10: 0.5, 7: 0.5 };
  function getChangShengIndex(gan, zhi) {
    const arr = CHANG_SHENG_CS[gan] || [];
    for (let i = 0; i < arr.length; i++) if (arr[i] === zhi) return i;
    return -1;
  }
  function isJue(gan, zhi) {
    return getChangShengIndex(gan, zhi) === 9;
  }
  var TONG_GUAN = { "\u91D1\u6728": "\u6C34", "\u6728\u91D1": "\u6C34", "\u6C34\u706B": "\u6728", "\u706B\u6C34": "\u6728", "\u706B\u91D1": "\u571F", "\u91D1\u706B": "\u571F", "\u571F\u6728": "\u706B", "\u6728\u571F": "\u706B", "\u6C34\u571F": "\u91D1", "\u571F\u6C34": "\u91D1" };
  function book(name, ch) {
    return `\u300A${name}${ch ? "\xB7" + ch : ""}\u300B`;
  }
  function getStemNature(gan) {
    const notes = [];
    if (gan === 0 || gan === 1) {
      if (gan === 0) {
        notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u7532\u6728")}\u7532\u6728\u53C2\u5929\uFF0C\u6D3B\u6728\u559C\u5E9A\u58EC\u7678\u4E19\u4E01\uFF0C\u5FCC\u7533\u9149\u91D1\u4F24\u6839\uFF1B\u6B7B\u6728\u559C\u5E9A\u96D5\u7422\uFF0C\u5FCC\u58EC\u7678\u6C34\u6CDB\u3002`);
        return { like: ["\u5E9A", "\u58EC", "\u7678", "\u4E19", "\u4E01"], dislike: ["\u8F9B"], desc: "\u7532\u6728", notes };
      }
      notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u4E59\u6728")}\u4E59\u6728\u82B1\u8349\uFF0C\u6D3B\u6728\u559C\u58EC\u7678\u6ECB\u6DA6\u4E19\u4E01\u7167\u8000\uFF0C\u4E59\u89C1\u7678\u4E19\u591A\u8D35\uFF1B\u6B7B\u6728\u559C\u5E9A\u8F9B\u96D5\u7422\u3002`);
      return { like: ["\u7678", "\u4E19", "\u58EC", "\u4E01"], dislike: ["\u5E9A", "\u8F9B"], desc: "\u4E59\u6728", notes };
    }
    if (gan === 2 || gan === 3) {
      if (gan === 2) {
        notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u4E19\u706B")}\u4E19\u706B\u592A\u9633\uFF0C\u865A\u900F\u559C\u58EC\u6C34\u6D77\u65E5\u76F8\u6620\uFF0C\u5FCC\u7678\u6C34\u853D\u65E5\uFF1B\u6709\u6839\u559C\u6728\u751F\u706B\u3002`);
        return { like: ["\u58EC", "\u7532", "\u4E59"], dislike: ["\u7678"], desc: "\u4E19\u706B", notes };
      }
      notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u4E01\u706B")}\u4E01\u706B\u706F\u70DB\uFF0C\u865A\u900F\u559C\u58EC\u6C34\u5929\u6CB3\u63A7\u706B\uFF0C\u5FCC\u5730\u652F\u901A\u6839\u4E19\u706B\u593A\u5149\uFF1B\u6709\u6839\u559C\u6728\u751F\u6276\u3002`);
      return { like: ["\u58EC", "\u7532", "\u4E59"], dislike: ["\u4E19"], desc: "\u4E01\u706B", notes };
    }
    if (gan === 4 || gan === 5) {
      if (gan === 4) {
        notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u620A\u571F")}\u620A\u571F\u539A\u571F\uFF0C\u559C\u7532\u6728\u758F\u571F\u3001\u5E9A\u8F9B\u6CC4\u79C0\u3001\u58EC\u6C34\u6DA6\u901A\uFF1B\u590F\u5FCC\u706B\u591A\u518D\u751F\uFF0C\u51AC\u559C\u706B\u6696\u5C40\u3002`);
        return { like: ["\u7532", "\u5E9A", "\u8F9B", "\u58EC"], dislike: ["\u4E19", "\u4E01"], desc: "\u620A\u571F", notes };
      }
      notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u5DF1\u571F")}\u5DF1\u571F\u7530\u56ED\uFF0C\u559C\u8F9B\u91D1\u5410\u79C0\u3001\u4E59\u6728\u8015\u8018\u3001\u7678\u6C34\u6DA6\u517B\uFF1B\u590F\u5FCC\u71E5\u3001\u51AC\u559C\u6696\u3002`);
      return { like: ["\u8F9B", "\u4E59", "\u7678"], dislike: ["\u4E19", "\u4E01"], desc: "\u5DF1\u571F", notes };
    }
    if (gan === 6 || gan === 7) {
      if (gan === 6) {
        notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u5E9A\u91D1")}\u5E9A\u91D1\u987D\u77FF\uFF0C\u559C\u4E01\u706B\u953B\u9020\u3001\u58EC\u7678\u6CC4\u79C0\uFF1B\u5FCC\u620A\u5DF1\u539A\u571F\u57CB\u91D1\u3001\u71E5\u571F\u8106\u91D1\u4E0D\u5229\u3002`);
        return { like: ["\u4E01", "\u58EC", "\u7678"], dislike: ["\u620A", "\u5DF1"], desc: "\u5E9A\u91D1", notes };
      }
      notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u8F9B\u91D1")}\u8F9B\u91D1\u73E0\u7389\uFF0C\u559C\u4E19\u706B\u96D5\u7422\u653E\u5149\u3001\u58EC\u7678\u6CC4\u79C0\uFF1B\u5FCC\u620A\u5DF1\u57CB\u91D1\u3001\u71E5\u571F\u8106\u91D1\u3002`);
      return { like: ["\u4E19", "\u58EC", "\u7678"], dislike: ["\u620A", "\u5DF1"], desc: "\u8F9B\u91D1", notes };
    }
    if (gan === 8 || gan === 9) {
      if (gan === 8) {
        notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u58EC\u6C34")}\u58EC\u6C34\u6C5F\u6CB3\uFF0C\u865A\u900F\u559C\u5E9A\u53D1\u6E90\u3001\u620A\u7B51\u5824\u3001\u7532\u6CC4\u79C0\uFF1B\u6709\u6839\u559C\u91D1\u6C34\u751F\u6276\u3002`);
        return { like: ["\u5E9A", "\u620A", "\u7532"], dislike: ["\u4E19", "\u4E01"], desc: "\u58EC\u6C34", notes };
      }
      notes.push(`${book("\u7A77\u901A\u5B9D\u9274", "\u7678\u6C34")}\u7678\u6C34\u96E8\u9732\uFF0C\u865A\u900F\u559C\u8F9B\u6E90\u5934\u3001\u4E59\u6DA6\u6728\uFF1B\u6709\u6839\u559C\u91D1\u6C34\u6301\u7EED\u3002`);
      return { like: ["\u8F9B", "\u4E59"], dislike: ["\u620A", "\u5DF1"], desc: "\u7678\u6C34", notes };
    }
    return { like: [], dislike: [], desc: "", notes: [] };
  }
  function evalDeLing(dmEl, mz) {
    const ws = getWangShuai(dmEl, mz);
    const m = { 0: "\u5B50", 1: "\u4E11", 2: "\u5BC5", 3: "\u536F", 4: "\u8FB0", 5: "\u5DF3", 6: "\u5348", 7: "\u672A", 8: "\u7533", 9: "\u9149", 10: "\u620C", 11: "\u4EA5" };
    if (ws === "\u65FA") return { score: 40, note: `${book("\u4E09\u547D\u901A\u4F1A", "\u8BBA\u4E94\u884C\u65FA\u76F8\u4F11\u56DA\u6B7B")}\u65E5\u4E3B${dmEl}\u751F\u4E8E${m[mz]}\u6708\u5F53\u4EE4\u4E3A\u65FA\uFF0C\u5F97\u4EE4+40` };
    if (ws === "\u76F8") return { score: 25, note: `${book("\u4E09\u547D\u901A\u4F1A", "\u8BBA\u4E94\u884C\u65FA\u76F8\u4F11\u56DA\u6B7B")}\u65E5\u4E3B${dmEl}\u751F\u4E8E${m[mz]}\u6708\u5F97\u76F8\u4EE4\uFF0C\u5F97\u4EE4+25` };
    if (ws === "\u4F11") return { score: 0, note: `${book("\u4E09\u547D\u901A\u4F1A", "\u8BBA\u4E94\u884C\u65FA\u76F8\u4F11\u56DA\u6B7B")}\u65E5\u4E3B${dmEl}\u751F\u4E8E${m[mz]}\u6708\u4F11\u56DA\u5931\u4EE4+0` };
    if (ws === "\u56DA") return { score: -10, note: `\u65E5\u4E3B${dmEl}\u751F\u4E8E${m[mz]}\u6708\u56DA-10` };
    return { score: -20, note: `\u65E5\u4E3B${dmEl}\u751F\u4E8E${m[mz]}\u6708\u6B7B-20` };
  }
  function evalDeDi(dmGan, dmEl, zhis) {
    const notes = [];
    let score = 0;
    const lu = LU_ZHI[dmGan], dw = DI_WANG_ZHI[dmGan];
    const labels = ["\u5E74", "\u6708", "\u65E5", "\u65F6"];
    const posW = [10, 40, 20, 5];
    for (let i = 0; i < zhis.length; i++) {
      const z = zhis[i];
      let pts = 0, desc = "";
      if (z === lu) {
        pts = posW[i] * 2;
        desc = "\u7984(\u5F3A\u6839)*2";
      } else if (z === dw) {
        pts = posW[i] * 2;
        desc = "\u7F8A\u5203(\u5F3A\u6839)*2";
      } else if (IS_GRAVE(z)) {
        const hg = HIDDEN_SCORE[z] || [];
        let hasBenQi = false;
        for (const [g, sc] of hg) {
          if (g === dmGan) {
            pts = Math.round(posW[i] * sc * GRAVE_ROOT_MULT[z] / 100);
            desc = "\u5893\u5E93" + DI_ZHI[z] + (IS_WET_SOIL(z) ? "(\u6E7F\u571F)" : "(\u71E5\u571F)") + (z === 4 ? "\u6C34\u5E93" : z === 1 ? "\u91D1\u5E93" : z === 10 ? "\u706B\u5E93" : "\u6728\u5E93");
            hasBenQi = true;
            break;
          }
        }
        if (!hasBenQi) {
          if ((dmEl === "\u706B" || dmEl === "\u571F") && IS_DRY_SOIL(z)) {
            pts = Math.round(posW[i] * 0.4);
            desc = "\u71E5\u571F\u52A9" + dmEl;
          } else if (dmEl === "\u6C34" && IS_WET_SOIL(z)) {
            pts = Math.round(posW[i] * 0.3);
            desc = "\u6E7F\u571F\u52A9\u6C34";
          } else if (dmEl === "\u91D1" && IS_WET_SOIL(z)) {
            pts = Math.round(posW[i] * 0.3);
            desc = "\u6E7F\u571F\u751F\u91D1";
          }
        }
      } else {
        const hg = HIDDEN_SCORE[z] || [];
        for (const [g, sc] of hg) {
          if (g === dmGan) {
            pts = Math.round(posW[i] * sc / 100);
            desc = "\u85CF\u5E72\u672C\u6C14\u6839";
            break;
          }
        }
      }
      if (pts > 0) {
        score += pts;
        notes.push(`${labels[i]}\u652F${DI_ZHI[z]}${desc}+${pts}`);
      }
    }
    if (notes.length === 0) notes.push(`${book("\u4E09\u547D\u901A\u4F1A", "\u8BBA\u6839\u57FA")}\u56DB\u67F1\u65E0\u901A\u6839\uFF0C\u5F97\u57300`);
    return { score, notes };
  }
  function evalDeShi(dmEl, gans) {
    const notes = [];
    let same = 0, opp = 0;
    for (let i = 0; i < gans.length; i++) {
      if (i === 2) continue;
      const el = GAN_WU_XING[gans[i]];
      const wt = [15, 20, 15][i < 2 ? i : i - 1];
      if (el === dmEl || SHENG2[dmEl] === el) same += wt;
      else if (KE2[dmEl] === el || SHENG2[el] === dmEl || KE2[el] === dmEl) opp += wt;
    }
    if (same > opp * 1.5) notes.push(`${book("\u4E09\u547D\u901A\u4F1A", "\u8BBA\u515A\u4F17")}\u5370\u6BD4\u515A\u4F17\u52BF\u5F3A(\u540C${same}/\u5F02${opp})`);
    else if (opp > same * 1.5) notes.push(`${book("\u4E09\u547D\u901A\u4F1A", "\u8BBA\u515A\u4F17")}\u514B\u6CC4\u8017\u52BF\u5927(\u540C${same}/\u5F02${opp})`);
    else notes.push(`\u52BF\u529B\u5747\u8861(\u540C${same}/\u5F02${opp})`);
    return { same, opp, notes };
  }
  function evalTianSui(dmEl, mz, zhis) {
    let adj = 0;
    const cold = [11, 0, 1], hot = [5, 6, 7];
    const coldDz = [11, 0, 1, 7, 10], hotDz = [5, 6, 2, 3];
    let cc = 0, hc = 0;
    for (const z of zhis) {
      if (coldDz.includes(z)) cc++;
      if (hotDz.includes(z)) hc++;
    }
    let wetCount = 0, dryCount = 0;
    for (const z of zhis) {
      if (IS_WET_SOIL(z)) wetCount++;
      if (IS_DRY_SOIL(z)) dryCount++;
    }
    let graveNote = "";
    if (wetCount >= 2) {
      adj -= 5;
      graveNote = `\u6E7F\u571F${wetCount}\u91CD(\u8FB0\u4E11)\u5BD2\u6E7F-5`;
    }
    if (dryCount >= 2) {
      adj += 5;
      graveNote = `\u71E5\u571F${dryCount}\u91CD(\u620C\u672A)\u71E5\u70ED+5`;
    }
    if (cold.includes(mz)) {
      if (dmEl === "\u706B" || dmEl === "\u571F") adj += 10;
      adj -= cc * 3;
      if (cc >= 3) adj -= 10;
      if (wetCount >= 2) adj -= 5;
      let note = `${book("\u6EF4\u5929\u9AD3", "\u5BD2\u6696\u71E5\u6E7F")}\u5BD2\u51AC${cc >= 2 ? "\u5BD2\u91CD" : "\u504F\u5BD2"}`;
      if (graveNote) note += "\uFF1B" + graveNote;
      note += `\u5408\u8BA1${adj}`;
      return { adj, note };
    }
    if (hot.includes(mz)) {
      if (dmEl === "\u6C34") adj += 8;
      adj -= hc * 2;
      if (hc >= 3) adj -= 8;
      if (dryCount >= 2) adj += 5;
      let note = `${book("\u6EF4\u5929\u9AD3", "\u5BD2\u6696\u71E5\u6E7F")}\u708E\u590F${hc >= 2 ? "\u71E5\u70ED" : "\u504F\u70ED"}`;
      if (graveNote) note += "\uFF1B" + graveNote;
      note += `\u5408\u8BA1${adj}`;
      return { adj, note };
    }
    if (graveNote) return { adj, note: `${book("\u6EF4\u5929\u9AD3", "\u5BD2\u6696\u71E5\u6E7F")}${graveNote}` };
    return { adj: 0, note: `\u5BD2\u6696\u9002\u4E2D` };
  }
  function calcDynAdjust(dmGan, dmEl, zhis, allGans, dayZhi) {
    const notes = [];
    let adj = 0;
    const pairs = [[0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]];
    const harms = [[0, 7], [1, 6], [2, 5], [3, 4], [8, 11], [9, 10]];
    const breaks = [[0, 9], [1, 4], [2, 11], [3, 6], [5, 8], [7, 10]];
    const lHe = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
    const labels = ["\u5E74", "\u6708", "\u65E5", "\u65F6"];
    const lu = LU_ZHI[dmGan], dw = DI_WANG_ZHI[dmGan];
    const isStrongRoot = (z) => z === lu || z === dw;
    const isWeakRoot = (z) => {
      const hg = HIDDEN_SCORE[z] || [];
      for (const [g] of hg) if (g === dmGan) return true;
      return false;
    };
    const comboScore = {};
    function isCombo(i) {
      return comboScore[i] && comboScore[i] > 0;
    }
    function markCombo(i, j) {
      comboScore[i] = (comboScore[i] || 0) + 1;
      comboScore[j] = (comboScore[j] || 0) + 1;
    }
    const sanHui = [[2, 3, 4, "\u5BC5\u536F\u8FB0", "\u6728"], [5, 6, 7, "\u5DF3\u5348\u672A", "\u706B"], [8, 9, 10, "\u7533\u9149\u620C", "\u91D1"], [11, 0, 1, "\u4EA5\u5B50\u4E11", "\u6C34"]];
    for (const [a, b, c, desc, el] of sanHui) {
      if (zhis.includes(a) && zhis.includes(b) && zhis.includes(c)) {
        if (el === dmEl || el === SHENG2[dmEl]) {
          adj += 30;
          notes.push(`\u4E09\u4F1A${desc}${el}\u5C40\u751F\u6276\u65E5\u4E3B+30`);
        } else if (el === KE2[dmEl]) {
          adj -= 12;
          notes.push(`\u4E09\u4F1A${desc}${el}\u5C40\u514B\u8017\u65E5\u4E3B-12`);
        }
      }
    }
    const sanHe = [[0, 4, 8, "\u7533\u5B50\u8FB0", "\u6C34"], [2, 6, 10, "\u5BC5\u5348\u620C", "\u706B"], [3, 7, 11, "\u4EA5\u536F\u672A", "\u6728"], [1, 5, 9, "\u5DF3\u9149\u4E11", "\u91D1"]];
    for (const [a, b, c, desc, el] of sanHe) {
      if (zhis.includes(a) && zhis.includes(b) && zhis.includes(c)) {
        if (el === dmEl || el === SHENG2[dmEl]) {
          adj += 20;
          notes.push(`\u4E09\u5408${desc}${el}\u5C40\u751F\u6276\u65E5\u4E3B+20`);
        } else if (el === KE2[dmEl]) {
          adj -= 10;
          notes.push(`\u4E09\u5408${desc}${el}\u5C40\u514B\u8017\u65E5\u4E3B-10`);
        }
      }
    }
    const gongHe = [[0, 8, "\u7533\u8FB0"], [3, 7, "\u4EA5\u672A"], [2, 10, "\u5BC5\u620C"], [1, 9, "\u5DF3\u4E11"]];
    for (const [a, b, desc] of gongHe) {
      if (zhis.includes(a) && zhis.includes(b)) {
        adj += 5;
        notes.push(`\u62F1\u5408${desc}\u6697\u4E2D\u52A9\u76CA+5`);
      }
    }
    for (let i = 0; i < zhis.length; i++) {
      for (const [a, b] of lHe) {
        for (let j = i + 1; j < zhis.length; j++) {
          if (zhis[i] === a && zhis[j] === b || zhis[i] === b && zhis[j] === a) {
            if (isStrongRoot(zhis[i]) || isStrongRoot(zhis[j])) {
              adj += 25;
              notes.push(`\u516D\u5408${DI_ZHI[zhis[i]]}${DI_ZHI[zhis[j]]}\u5408\u51FA\u65E5\u4E3B\u7984\u5203\u6839+25`);
            } else {
              adj += 5;
              notes.push(`\u516D\u5408${DI_ZHI[zhis[i]]}${DI_ZHI[zhis[j]]}\u95F4\u63A5\u5F97\u76CA+5`);
            }
            markCombo(i, j);
          }
        }
      }
    }
    const anHe = [[6, 11], [2, 1], [3, 8]];
    for (let i = 0; i < zhis.length; i++) {
      for (const [a, b] of anHe) {
        for (let j = i + 1; j < zhis.length; j++) {
          if (zhis[i] === a && zhis[j] === b || zhis[i] === b && zhis[j] === a) {
            adj += 3;
            notes.push(`\u6697\u5408${DI_ZHI[zhis[i]]}${DI_ZHI[zhis[j]]}\u6697\u4E2D\u52A9\u529B+3`);
          }
        }
      }
    }
    if (dayZhi !== void 0) {
      const gzSelf = { 0: [6], 2: [10], 3: [11], 4: [0], 5: [11], 7: [5], 8: [6], 9: [5] };
      const selfZhis = gzSelf[dmGan] || [];
      if (selfZhis.includes(dayZhi)) {
        adj += 8;
        notes.push(`\u5E72\u652F\u81EA\u5408(${TIAN_GAN[dmGan]}${DI_ZHI[dayZhi]})\u52A0\u5F3A\u65E5\u4E3B+8`);
      }
    }
    for (let i = 0; i < zhis.length; i++) {
      if (isCombo(i)) {
        continue;
      }
      for (const [a, b] of pairs) {
        for (let j = i + 1; j < zhis.length; j++) {
          if (zhis[i] === a && zhis[j] === b || zhis[i] === b && zhis[j] === a) {
            if (zhis[i] === 4 && zhis[j] === 10 || zhis[i] === 10 && zhis[j] === 4) {
              adj += 4;
              notes.push(`\u8FB0\u620C\u51B2\u5F00\u706B\u6C34\u5E93\u85CF\u5E72\u900F\u51FA+4`);
              if (dmEl === "\u91D1" || dmEl === "\u6C34") {
                adj -= 3;
                notes.push(`\u71E5\u571F\u620C\u8106\u91D1\u514B\u6C34-3`);
              }
              if (dmEl === "\u706B") {
                adj += 3;
                notes.push(`\u71E5\u571F\u620C\u52A9\u706B+3`);
              }
              continue;
            }
            if (zhis[i] === 1 && zhis[j] === 7 || zhis[i] === 7 && zhis[j] === 1) {
              adj += 4;
              notes.push(`\u4E11\u672A\u51B2\u5F00\u6728\u91D1\u5E93\u85CF\u5E72\u900F\u51FA+4`);
              if (dmEl === "\u91D1") {
                adj += 2;
                notes.push(`\u4E11\u91D1\u5E93\u900F\u51FA\u52A9\u91D1+2`);
              }
              if (dmEl === "\u6728") {
                adj += 2;
                notes.push(`\u672A\u6728\u5E93\u900F\u51FA\u52A9\u6728+2`);
              }
              continue;
            }
            const sRoot = isStrongRoot(zhis[i]), wRoot = isWeakRoot(zhis[j]);
            if (sRoot && !wRoot) {
              adj -= 15;
              notes.push(`${DI_ZHI[zhis[i]]}\u65FA\u6839\u88AB\u51B2\u62D4-15`);
            } else if (isStrongRoot(zhis[j]) && !isStrongRoot(zhis[i])) {
              adj -= 10;
              notes.push(`${DI_ZHI[zhis[j]]}\u5F3A\u6839\u88AB\u51B2\u8017-10`);
            } else {
              adj -= 3;
              notes.push(`${DI_ZHI[zhis[i]]}${DI_ZHI[zhis[j]]}\u51B2\u8F7B\u5FAE\u6270\u52A8-3`);
            }
          }
        }
      }
    }
    const xingP = [[1, 7, "\u4E11\u672A\u5211"], [7, 10, "\u672A\u620C\u5211"], [1, 10, "\u4E11\u620C\u5211"], [2, 5, "\u5BC5\u5DF3\u5211"], [5, 8, "\u5DF3\u7533\u5211"], [2, 8, "\u5BC5\u7533\u5211"], [0, 3, "\u5B50\u536F\u5211"]];
    for (let i = 0; i < zhis.length; i++) {
      for (const [a, b, desc] of xingP) {
        for (let j = i + 1; j < zhis.length; j++) {
          if (zhis[i] === a && zhis[j] === b || zhis[i] === b && zhis[j] === a) {
            if (isStrongRoot(zhis[i]) || isStrongRoot(zhis[j])) {
              adj -= 5;
              notes.push(`${desc}\u6839\u6C14\u53D7\u8017-5`);
            } else {
              adj -= 2;
              notes.push(`${desc}\u8F7B\u5FAE\u8017\u6C14-2`);
            }
          }
        }
      }
    }
    for (let i = 0; i < zhis.length; i++) {
      if ([4, 6, 9, 11].includes(zhis[i])) {
        for (let j = i + 1; j < zhis.length; j++) {
          if (zhis[i] === zhis[j]) {
            adj -= 3;
            notes.push(`${DI_ZHI[zhis[i]]}\u81EA\u5211\u8017\u6C14-3`);
          }
        }
      }
    }
    for (let i = 0; i < zhis.length; i++) {
      for (const [a, b] of harms) {
        for (let j = i + 1; j < zhis.length; j++) {
          if (zhis[i] === a && zhis[j] === b || zhis[i] === b && zhis[j] === a) {
            if (isStrongRoot(zhis[i]) || isStrongRoot(zhis[j])) {
              adj -= 4;
              notes.push(`${DI_ZHI[zhis[i]]}${DI_ZHI[zhis[j]]}\u5BB3\u6697\u8017\u6839-4`);
            } else {
              adj -= 2;
              notes.push(`${DI_ZHI[zhis[i]]}${DI_ZHI[zhis[j]]}\u5BB3\u5FAE\u635F-2`);
            }
          }
        }
      }
    }
    for (let i = 0; i < zhis.length; i++) {
      for (const [a, b] of breaks) {
        for (let j = i + 1; j < zhis.length; j++) {
          if (zhis[i] === a && zhis[j] === b || zhis[i] === b && zhis[j] === a) {
            if (isWeakRoot(zhis[i]) || isWeakRoot(zhis[j])) {
              adj -= 6;
              notes.push(`${DI_ZHI[zhis[i]]}${DI_ZHI[zhis[j]]}\u7834\u5E9F\u5F31\u6839-6`);
            } else {
              adj -= 2;
              notes.push(`${DI_ZHI[zhis[i]]}${DI_ZHI[zhis[j]]}\u7834\u5FAE\u635F-2`);
            }
          }
        }
      }
    }
    for (let i = 0; i < zhis.length; i++) {
      if (isJue(dmGan, zhis[i])) {
        if (isStrongRoot(zhis[i])) {
          adj -= 20;
          notes.push(`${DI_ZHI[zhis[i]]}\u7EDD\u4F4D(\u5F3A\u6839)\u5927\u5E45\u51CF\u529B-20`);
        } else if (isWeakRoot(zhis[i])) {
          adj -= 10;
          notes.push(`${DI_ZHI[zhis[i]]}\u7EDD\u4F4D(\u5F31\u6839)\u51CF\u529B-10`);
        } else {
          adj -= 3;
          notes.push(`${DI_ZHI[zhis[i]]}\u7EDD\u4F4D-3`);
        }
      }
    }
    if (zhis.length >= 4) {
      const dz = zhis[2], hz = zhis[3];
      if (dz === hz) {
        adj -= 4;
        notes.push(`\u65E5\u65F6\u76F8\u540C'\u60A3'\u81EA\u635F-4`);
      }
      for (const [a, b] of pairs) {
        if (dz === a && hz === b || dz === b && hz === a) {
          adj -= 3;
          notes.push(`\u65E5\u65F6\u51B2\u6218'\u60A3'-3`);
          break;
        }
      }
    }
    return { adj, notes };
  }
  function detectSpecial(dmEl, gans, zhis, zhiGans) {
    let same = 0, opp = 0;
    for (let i = 0; i < gans.length; i++) {
      if (i === 2) continue;
      const e = GAN_WU_XING[gans[i]];
      if (e === dmEl || SHENG2[dmEl] === e) same++;
      else opp++;
    }
    for (let i = 0; i < zhis.length; i++) {
      const hg = HIDDEN_SCORE[zhis[i]] || [];
      for (const [g] of hg) {
        const e = GAN_WU_XING[g];
        if (e === dmEl || SHENG2[dmEl] === e) same++;
        else if (KE2[dmEl] === e || SHENG2[e] === dmEl) opp++;
      }
    }
    if (same >= opp * 3 && opp <= 2) return { is: true, type: "\u4E13\u65FA", note: `${book("\u5B50\u5E73\u771F\u8BE0", "\u8BBA\u4ECE\u5316")}\u5168\u5C40${same}\u540C/${opp}\u5F02\u4E13\u65FA\u683C` };
    if (opp >= same * 3 && same <= 2) return { is: true, type: "\u4ECE\u683C", note: `${book("\u5B50\u5E73\u771F\u8BE0", "\u8BBA\u4ECE\u5316")}\u5168\u5C40${opp}\u5F02/${same}\u540C\u4ECE\u683C` };
    return { is: false, type: "\u666E\u901A", note: `${book("\u5B50\u5E73\u771F\u8BE0")}\u52BF\u529B\u5747\u8861\u666E\u901A\u683C\u5C40` };
  }
  function getTongGuanFn(totals) {
    const r = [];
    const pairs = [["\u91D1", "\u6728"], ["\u6C34", "\u706B"], ["\u706B", "\u91D1"], ["\u6728", "\u571F"], ["\u571F", "\u6C34"]];
    for (const [a, b] of pairs) if ((totals[a] || 0) > 100 && (totals[b] || 0) > 100) {
      const tg = TONG_GUAN[a + b];
      if (tg) r.push(tg);
    }
    return r;
  }
  function totalsFn(dm, _fe, pillars, hiddenStems) {
    const t2 = { "\u6728": 0, "\u706B": 0, "\u571F": 0, "\u91D1": 0, "\u6C34": 0 };
    for (const p of pillars || []) t2[GAN_WU_XING[p.gan]] += 20;
    for (const grp of hiddenStems || []) for (const h of grp) t2[h.element] += 10;
    return t2;
  }
  function inferDeities(dayMasterElement, _isStrong, wangShuai, fiveElements, monthZhi, pillars, hiddenStems) {
    const dm = dayMasterElement;
    const dmGan = pillars?.[2]?.gan ?? 0;
    const allZhis = pillars?.map((p) => p.zhi) ?? [];
    const allGans = pillars?.map((p) => p.gan) ?? [];
    const zhiGans = hiddenStems?.map((h) => h.map((x) => x.gan)) ?? [];
    const mz = monthZhi ?? 0;
    const dz = pillars?.[2]?.zhi ?? 0;
    const deLing = evalDeLing(dm, mz);
    const deDi = evalDeDi(dmGan, dm, allZhis);
    const deShi = evalDeShi(dm, allGans);
    const staticScore = deLing.score + deDi.score + (deShi.same - deShi.opp) * 0.3;
    const tianSui = evalTianSui(dm, mz, allZhis);
    const dyn = calcDynAdjust(dmGan, dm, allZhis, allGans, dz);
    const ws = getWangShuai(dm, mz);
    let wsAdj = 0;
    if (ws === "\u65FA") wsAdj = 20;
    else if (ws === "\u76F8") wsAdj = 10;
    else if (ws === "\u6B7B" || ws === "\u56DA") wsAdj = -10;
    let totalScore = staticScore + tianSui.adj + wsAdj + dyn.adj;
    const special = detectSpecial(dm, allGans, allZhis, zhiGans);
    const isSpecial = special.is;
    let strengthLevel;
    if (isSpecial && special.type === "\u4E13\u65FA") strengthLevel = "\u65FA\u6781(\u4ECE\u5F3A)";
    else if (isSpecial && special.type === "\u4ECE\u683C") strengthLevel = "\u5F31\u6781(\u4ECE\u5F31)";
    else if (totalScore >= 80) strengthLevel = "\u592A\u65FA";
    else if (totalScore >= 35) strengthLevel = "\u504F\u65FA";
    else if (totalScore >= -10) strengthLevel = "\u4E2D\u548C";
    else if (totalScore >= -50) strengthLevel = "\u504F\u5F31";
    else if (totalScore >= -90) strengthLevel = "\u592A\u5F31";
    else strengthLevel = "\u5F31\u6781(\u4ECE\u5F31)";
    const isStrong = strengthLevel === "\u504F\u65FA" || strengthLevel === "\u592A\u65FA" || strengthLevel === "\u65FA\u6781(\u4ECE\u5F3A)";
    const tiaoHouList = TIAO_HOU[mz] ?? ["\u706B"];
    const tongGuanList = getTongGuanFn(totalsFn(dm, fiveElements, pillars, hiddenStems));
    let useful = [];
    let harmful = [];
    let steps = [];
    const stemNature = getStemNature(dmGan);
    var patternResult = null;
    try {
      if (pillars && pillars.length >= 4) {
        var _miniDM = { gan: dmGan, element: dm };
        var _miniP = { year: pillars[0], month: pillars[1], day: pillars[2], hour: pillars[3] };
        var _miniHS = hiddenStems || [];
        if (_miniP.year) patternResult = determinePattern({ dayMaster: _miniDM, pillars: _miniP, fiveElements: fiveElements || {}, hiddenStems: _miniHS });
      }
    } catch (_pe) {
    }
    var patName = patternResult ? patternResult.name : "";
    var patGroup = patternResult ? patternResult.group : "";
    if (patName) {
      steps.push("\u672C\u5C40" + patName);
      useful = [];
      harmful = [];
    }
    for (const t2 of tongGuanList) if (t2 && !useful.includes(t2)) useful.push(t2);
    for (const t2 of tiaoHouList) {
      if (t2 && !useful.includes(t2)) {
        useful.push(t2);
        steps.push("\u683C\u5C40\u5185\u8C03\u5019\u53D6" + t2);
      }
    }
    if (isSpecial) {
      const shen = SHENG2[dm], same = dm, keWo = KE2[dm];
      const woKe = KE2[dm], woSheng = SHENG2[dm];
      if (special.type === "\u4E13\u65FA") {
        for (const _e of [shen, same]) if (_e && !useful.includes(_e)) useful.push(_e);
        for (const _e of [keWo, woKe, woSheng]) if (_e && !harmful.includes(_e)) harmful.push(_e);
        steps.push("\u4E13\u65FA\u683C\u987A\u52BF\u53D6" + shen + same);
      } else {
        for (const _e of [woKe, woSheng]) if (_e && !useful.includes(_e)) useful.push(_e);
        for (const _e of [shen, same]) if (_e && !harmful.includes(_e)) harmful.push(_e);
        steps.push("\u4ECE\u683C\u987A\u52BF\u53D6\u7528");
      }
      steps.push("\u3010\u7279\u6B8A\u683C\u5C40>\u6B63\u7EDF\u516B\u683C\u3011");
    } else if (patGroup === "\u6B63\u7EDF\u516B\u683C" && patName) {
      var _shen = SHENG2[dm], _ke = KE2[dm], _woSheng = SHENG2[dm];
      if (["\u6B63\u5B98\u683C", "\u6B63\u8D22\u683C", "\u504F\u8D22\u683C", "\u6B63\u5370\u683C", "\u98DF\u795E\u683C"].includes(patName)) {
        if (patName === "\u6B63\u5B98\u683C") {
          for (const _e of [_ke, _woSheng]) if (_e && !useful.includes(_e)) useful.push(_e);
          for (const _e of [_shen, KE2[_shen]]) if (_e && !harmful.includes(_e)) harmful.push(_e);
          steps.push("\u6B63\u5B98\u683C\u987A\u7528\uFF1A\u559C\u8D22\u751F\u5B98\u3001\u5370\u62A4\u5B98\uFF1B\u5FCC\u4F24\u5B98\u514B\u5B98\u3001\u5B98\u6740\u6DF7\u6742");
        } else if (patName === "\u6B63\u8D22\u683C" || patName === "\u504F\u8D22\u683C") {
          for (const _e of [_woSheng, SHENG2[_ke]]) if (_e && !useful.includes(_e)) useful.push(_e);
          for (const _e of [dm, KE2[_shen]]) if (_e && !harmful.includes(_e)) harmful.push(_e);
          steps.push("\u8D22\u683C\u987A\u7528\uFF1A\u559C\u98DF\u4F24\u751F\u8D22\u3001\u5B98\u62A4\u8D22\uFF1B\u5FCC\u6BD4\u52AB\u593A\u8D22");
        } else if (patName === "\u6B63\u5370\u683C") {
          for (const _e of [KE2[dm], dm]) if (_e && !useful.includes(_e)) useful.push(_e);
          for (const _e of [SHENG2[_ke]]) if (_e && !harmful.includes(_e)) harmful.push(_e);
          steps.push("\u5370\u683C\u987A\u7528\uFF1A\u559C\u5B98\u6740\u751F\u5370\u3001\u6BD4\u52AB\u62A4\u5370\uFF1B\u5FCC\u8D22\u661F\u7834\u5370");
        } else if (patName === "\u98DF\u795E\u683C") {
          for (const _e of [_ke, SHENG2[_ke]]) if (_e && !useful.includes(_e)) useful.push(_e);
          for (const _e of [KE2[SHENG2[dm]]]) if (_e && !harmful.includes(_e)) harmful.push(_e);
          steps.push("\u98DF\u795E\u683C\u987A\u7528\uFF1A\u559C\u98DF\u795E\u751F\u8D22\uFF1B\u5FCC\u67AD\u795E\u593A\u98DF");
        }
      } else {
        if (patName === "\u4E03\u6740\u683C") {
          for (const _e of [_woSheng, KE2[_ke]]) if (_e && !useful.includes(_e)) useful.push(_e);
          for (const _e of [_ke, KE2[_woSheng]]) if (_e && !harmful.includes(_e)) harmful.push(_e);
          steps.push("\u4E03\u6740\u683C\u9006\u7528\uFF1A\u559C\u98DF\u795E\u5236\u6740\u3001\u5370\u5316\u6740\uFF1B\u5FCC\u8D22\u6ECB\u6740\u3001\u65E0\u5236\u653B\u8EAB");
        } else if (patName === "\u4F24\u5B98\u683C") {
          for (const _e of [_ke, _shen]) if (_e && !useful.includes(_e)) useful.push(_e);
          for (const _e of [KE2[_woSheng]]) if (_e && !harmful.includes(_e)) harmful.push(_e);
          steps.push("\u4F24\u5B98\u683C\u9006\u7528\uFF1A\u559C\u4F24\u5B98\u751F\u8D22\u3001\u5370\u5236\u4F24\uFF1B\u5FCC\u4F24\u5B98\u89C1\u5B98");
        } else if (patName === "\u504F\u5370\u683C") {
          for (const _e of [SHENG2[_ke], _woSheng]) if (_e && !useful.includes(_e)) useful.push(_e);
          for (const _e of [KE2[_shen]]) if (_e && !harmful.includes(_e)) harmful.push(_e);
          steps.push("\u504F\u5370\u683C\u9006\u7528\uFF1A\u559C\u504F\u8D22\u5236\u8861\u3001\u98DF\u795E\u6CC4\u5370\uFF1B\u5FCC\u504F\u5370\u593A\u98DF");
        }
      }
      steps.push(patName + "\u7531\u683C\u5C40\u75C5\u836F\u63A8\u5BFC\uFF0C\u975E\u6276\u6291\u5224\u5B9A");
      if (patName === "\u7F8A\u5203\u683C") {
        steps.push("\u3010\u54C1\u7EA7\uFF1A\u75C5\u91CD\u836F\u8F7B\u683C\u5C40\u3011\u7F8A\u5203\u706B\u52BF\u8FDC\u5927\u4E8E\u5236\u5203\u91D1\u6C34\uFF0C\u5203\u91CD\u836F\u8F7B");
      } else if (patName === "\u5EFA\u7984\u683C") {
        steps.push("\u3010\u54C1\u7EA7\uFF1A\u7984\u683C\u8EAB" + strengthLevel + "\u3011\u65E0\u4E13\u5C5E\u75C5\u6839\uFF0C\u4EE5\u5168\u5C40\u5E73\u8861\u5B9A\u9AD8\u4E0B");
      } else {
        var _zwS = strengthLevel;
        if (_zwS === "\u504F\u65FA" || _zwS === "\u592A\u65FA" || _zwS === "\u4E2D\u548C") {
          steps.push("\u3010\u54C1\u7EA7\uFF1A\u75C5\u836F\u5747\u8861/\u4E0A\u7B49\u683C\u5C40\u3011");
        } else if (_zwS === "\u504F\u5F31" || _zwS === "\u592A\u5F31") {
          steps.push("\u3010\u54C1\u7EA7\uFF1A\u836F\u91CD\u75C5\u8F7B/\u4E2D\u7B49\u504F\u4E0B\u683C\u5C40\u3011");
        } else {
          steps.push("\u3010\u54C1\u7EA7\uFF1A\u968F\u7279\u6B8A\u683C\u5C40\u8D70\u52BF\u5B9A\u3011");
        }
      }
    } else if (patGroup === "\u7984\u5203\u5916\u683C") {
      if (patName === "\u5EFA\u7984\u683C") {
        if (isStrong) {
          for (const _e of [KE2[dm], _woSheng, SHENG2[_ke]]) if (_e && !useful.includes(_e)) useful.push(_e);
          for (const _e of [dm, SHENG2[dm]]) if (_e && !harmful.includes(_e)) harmful.push(_e);
          steps.push("\u5EFA\u7984\u683C\u8EAB\u65FA\uFF1A\u53D6\u5B98\u6740\u98DF\u4F24\u8D22\u5236\u6CC4\u4E3A\u836F");
        } else {
          for (const _e of [SHENG2[dm], dm]) if (_e && !useful.includes(_e)) useful.push(_e);
          for (const _e of [KE2[dm], _woSheng]) if (_e && !harmful.includes(_e)) harmful.push(_e);
          steps.push("\u5EFA\u7984\u683C\u8EAB\u5F31\uFF1A\u53D6\u5370\u6BD4\u6276\u52A9\u4E3A\u836F");
        }
      } else {
        for (const _e of [KE2[dm], _woSheng]) if (_e && !useful.includes(_e)) useful.push(_e);
        for (const _e of [dm, SHENG2[dm]]) if (_e && !harmful.includes(_e)) harmful.push(_e);
        steps.push("\u7F8A\u5203\u683C\uFF1A\u9996\u9009\u5B98\u6740\u9A7E\u5203\uFF0C\u6B21\u98DF\u4F24\u6CC4\u79C0");
      }
    } else {
      const keWo = KE2[dm], woSheng = SHENG2[dm], shen = SHENG2[dm], same = dm;
      if (strengthLevel === "\u504F\u65FA" || strengthLevel === "\u592A\u65FA") {
        for (const e of [keWo, woSheng, keWo]) if (e && !useful.includes(e)) useful.push(e);
        for (const e of [shen, same]) if (e && !harmful.includes(e)) harmful.push(e);
        steps.push("\u65FA\u8870\u6276\u6291\uFF1A\u8EAB\u65FA\u53D6\u514B\u6CC4\u8017");
      } else if (strengthLevel === "\u504F\u5F31" || strengthLevel === "\u592A\u5F31") {
        for (const e of [shen, same]) if (e && !useful.includes(e)) useful.push(e);
        for (const e of [keWo, woSheng, keWo]) if (e && !harmful.includes(e)) harmful.push(e);
        steps.push("\u65FA\u8870\u6276\u6291\uFF1A\u8EAB\u5F31\u53D6\u5370\u6BD4");
      } else steps.push("\u65E5\u4E3B\u4E2D\u548C");
    }
    for (const e of harmful) {
      const i = useful.indexOf(e);
      if (i >= 0) useful.splice(i, 1);
    }
    const neutralSet = EL_NAMES2.filter((e) => !useful.includes(e) && !harmful.includes(e));
    if (harmful.length === 0 && neutralSet.length > 0) harmful.push(neutralSet[0]);
    let _s1 = "\u7B2C\u4E00\u6BB5\uFF1A\u300A\u4E09\u547D\u901A\u4F1A\u300B\u9759\u6001\u529B\u91CF\u7EDF\u8BA1\uFF08\u4EC5\u53C2\u8003\uFF0C\u4E0D\u5B9A\u559C\u5FCC\uFF09";
    _s1 += "\n\u5F97\u4EE4\uFF1A" + deLing.note;
    _s1 += "\n\u5F97\u5730\uFF1A" + deDi.notes.join("\n");
    _s1 += "\n\u5F97\u52BF\uFF1A" + deShi.notes.join("\n");
    _s1 += "\n\u9759\u6001\u603B\u5206\uFF1A" + Math.round(deLing.score + deDi.score + (deShi.same - deShi.opp) * 0.3) + "\u5206\uFF08\u5F97\u4EE4" + deLing.score + "/\u5F97\u5730" + deDi.score + "/\u5F97\u52BF" + (deShi.same - deShi.opp) * 0.3 + "\uFF09";
    _s1 += "\n\u5C0F\u7ED3\uFF1A\u65E5\u4E3B" + (dm || "") + "\u52BF" + strengthLevel;
    let _s2 = "\u7B2C\u4E8C\u6BB5\uFF1A\u3010\u6838\u5FC3\u51B3\u7B56\u3011\u300A\u5B50\u5E73\u771F\u8BE0\u300B\u683C\u5C40\u75C5\u836F\u5B9A\u7528\u795E\uFF08\u5168\u5C40\u6700\u9AD8\u4F18\u5148\u7EA7\uFF09";
    _s2 += "\n\u672C\u5C40\u5B9A\u683C\uFF1A" + patName + "\u3010" + patGroup + "\u3011";
    _s2 += "\n" + steps.join("\n");
    _s2 += "\n\uFF08\u8C03\u5019\u8BF4\u660E\uFF1A\u683C\u5C40\u5185\u62E9\u4F18\uFF0C\u975E\u63A8\u7FFB\u683C\u5C40\u7528\u795E\uFF09";
    let _s3 = "\u7B2C\u4E09\u6BB5\uFF1A\u300A\u6EF4\u5929\u9AD3\u300B\u52A8\u6001\u4F5C\u7528+\u683C\u5C40\u5185\u8C03\u5019\u4FEE\u6B63";
    _s3 += "\n" + tianSui.note;
    _s3 += "\n" + (dyn.notes.length ? dyn.notes.join("\n") : "\u65E0\u663E\u8457\u4E92\u52A8");
    _s3 += "\n\u52A8\u6001\u4FEE\u6B63\u5408\u8BA1\uFF1A" + (dyn.adj >= 0 ? "+" : "") + dyn.adj + "\u5206";
    _s3 += "\n\u4FEE\u6B63\u540E\u603B\u5206\uFF1A" + Math.round(totalScore) + "\u5206";
    let _s4 = "\u7B2C\u56DB\u6BB5\uFF1A\u300A\u7A77\u901A\u5B9D\u9274\u300B\u65E5\u5E72\u672C\u6027\u6821\u6B63\uFF0C\u6700\u7EC8\u6572\u5B9A\u56DB\u795E";
    _s4 += "\n\u65E5\u5E72\u6821\u9A8C\uFF1A" + (stemNature.notes.length ? stemNature.notes.join("\n") : "\u683C\u5C40\u7528\u795E\u4E0E\u65E5\u5E72\u5148\u5929\u559C\u5FCC\u4E00\u81F4");
    _s4 += "\n\n\u3010\u56DB\u795E\u603B\u89C8\u3011";
    _s4 += "\n\u7B2C\u4E00\u6838\u5FC3\u7528\u795E\uFF1A" + useful.slice(0, 2).join("/");
    _s4 += "\n\u8F85\u52A9\u559C\u795E\uFF1A" + (useful.slice(2).length ? useful.slice(2).join("/") : "\u65E0");
    _s4 += "\n\u5934\u53F7\u5FCC\u795E\uFF1A" + (harmful.length ? harmful.slice(0, 2).join("/") : "\u65E0");
    _s4 += "\n\u4E2D\u6027\u95F2\u795E\uFF1A" + (neutralSet.length ? neutralSet.join("/") : "\u65E0");
    let _s5 = "\u7B2C\u4E94\u6BB5\uFF1A\u4EFB\u4ED8\u7EA2\u76F2\u6D3E\u4F53\u7528\u505A\u529F+\u5C81\u8FD0\u603B\u7ED3\uFF08\u9884\u7559\uFF09";
    _s5 += "\n\u7528\uFF08\u4E8B\u4E1A\u540D\u5229\uFF09\uFF1A\u6708\u4EE4" + patName.replace("\u683C", "") + "\u683C\u5C40\u7528\u795E\u4E3A" + (useful.slice(0, 2).length ? useful.slice(0, 2).join("/") : "\u65E0");
    _s5 += "\n\u539F\u5C40\u6001\u52BF\uFF1A" + strengthLevel + "\uFF08" + Math.round(totalScore) + "\u5206\uFF09";
    _s5 += "\n\uFF08\u6CE8\uFF1A\u672C\u6BB5\u5F85\u8865\u5145\u8BE6\u7EC6\u505A\u529F\u5206\u6790\u4E0E\u5C81\u8FD0\u5E94\u671F\uFF09";
    const bookNotes = [_s1, _s2, _s3, _s4];
    var _cx = determineConstitution(mz, dmGan);
    if (_cx) {
      var _s6 = "\n\n\u7B2C\u516D\u6BB5\uFF1A\u5148\u5929\u7980\u8D4B\u4F53\u8D28\u4E13\u9879\u5206\u6790\uFF08\u300A\u5185\u7ECF\u300B\u5E72\u652F\u7980\u8D4B\u5BF9\u5E94\uFF09\n";
      _s6 += "1\u3001\u5148\u5929\u7980\u8D4B\u5206\u578B\uFF1A\u3010" + _cx.name + "\u3011\n";
      _s6 += "2\u3001\u4F53\u8D28\u6838\u5FC3\u75C5\u673A\uFF1A" + _cx.jiBing + "\n";
      _s6 += "3\u3001\u60C5\u5FD7\u8C03\u517B\u5EFA\u8BAE\uFF1A" + _cx.qingZhi + "\n";
      _s6 += "4\u3001\u996E\u98DF\u5B9C\u5FCC\u65B9\u6848\uFF1A" + _cx.yinShi + "\n";
      _s6 += "5\u3001\u5C45\u4F4F\u73AF\u5883\u8C03\u6574\u6307\u5357\uFF1A" + _cx.huanJing + "\n";
      _s6 += "6\u3001\u8FD0\u52A8\u3001\u7406\u7597\u5B9C\u5FCC\u8BF4\u660E\uFF1A" + _cx.yunDong + "\n";
      bookNotes.push(_s6);
    }
    return {
      dayMaster: { element: dm, strength: isStrong ? "\u504F\u65FA" : "\u504F\u5F31", level: strengthLevel, isStrong },
      strengthScore: Math.round(totalScore),
      strengthLevel,
      tiaoHou: [...new Set(tiaoHouList)],
      tongGuan: [...new Set(tongGuanList)],
      mainUseful: useful.slice(0, 2),
      secondaryUseful: useful.slice(2),
      usefulDeities: [...new Set(useful)],
      harmfulDeities: [...new Set(harmful)],
      harmfulMain: harmful.slice(0, 2),
      harmfulSecondary: harmful.slice(2),
      neutralDeities: neutralSet,
      strategy: bookNotes.join("\n\n"),
      advice: `\u5FCC${harmful.slice(0, 2).join("\u3001")}\u8FC7\u65FA\u6D41\u5E74`,
      isSpecialPattern: isSpecial
    };
  }
  function analyzeAnnualFortune(annual, dayGan, monthZhi, allPillars, _natalTenGodMap, deityAnalysis, currentFortune) {
    const notes = [];
    const anGanChar = TIAN_GAN[annual.gan];
    const anZhiChar = DI_ZHI[annual.zhi];
    const tgStr = annual.tenGodGan || "";
    const ganHeNotes = [];
    const gans = allPillars.map((p) => p.gan);
    for (let i = 0; i < gans.length; i++) {
      const h = { 0: { p: 5 }, 1: { p: 6 }, 2: { p: 7 }, 3: { p: 8 }, 4: { p: 9 }, 5: { p: 0 }, 6: { p: 1 }, 7: { p: 2 }, 8: { p: 3 }, 9: { p: 4 } }[annual.gan];
      if (h && h.p === gans[i]) ganHeNotes.push(`${anGanChar}\u4E0E${allPillars[i].ganName}\u5408`);
    }
    const zhis = allPillars.map((p) => p.zhi);
    const branchNotes = [];
    const labels = ["\u5E74", "\u6708", "\u65E5", "\u65F6"];
    for (let i = 0; i < zhis.length; i++) {
      const is = calcBranchInteractions([zhis[i], annual.zhi]);
      for (const it of is) {
        if (it.type.includes("\u516D\u51B2")) branchNotes.push(`${labels[i]}\u652F${DI_ZHI[zhis[i]]}\u4E0E\u6D41\u5E74${anZhiChar}\u51B2`);
        else if (it.type.includes("\u516D\u5408")) branchNotes.push(`${labels[i]}\u652F${DI_ZHI[zhis[i]]}\u4E0E\u6D41\u5E74${anZhiChar}\u5408`);
        else if (it.type.includes("\u5211")) branchNotes.push(`${labels[i]}\u652F${DI_ZHI[zhis[i]]}\u4E0E\u6D41\u5E74${anZhiChar}\u5211`);
      }
    }
    let score = 0;
    if (["\u6B63\u5370", "\u504F\u5370", "\u6B63\u5B98", "\u6B63\u8D22"].includes(tgStr)) score += 1;
    if (["\u4E03\u6740", "\u52AB\u8D22", "\u4F24\u5B98"].includes(tgStr)) score -= 1;
    if (branchNotes.some((n) => n.includes("\u51B2"))) score -= 1;
    if (branchNotes.some((n) => n.includes("\u5211"))) score -= 1;
    if (ganHeNotes.length) score += 1;
    if (deityAnalysis) {
      const anEl = GAN_WU_XING[annual.gan];
      if (deityAnalysis.usefulDeities.includes(anEl)) score += 2;
      else if (deityAnalysis.harmfulDeities.includes(anEl)) score -= 2;
    }
    score = Math.max(-5, Math.min(5, score));
    const overall = score >= 3 ? "\u5927\u5409" : score >= 1 ? "\u5409" : score >= -1 ? "\u5E73" : score >= -3 ? "\u51F6" : "\u5927\u51F6";
    const summaries = { "\u5927\u5409": "\u6D41\u5E74\u5927\u5409", "\u5409": "\u6D41\u5E74\u5409\u5229", "\u5E73": "\u6D41\u5E74\u5E73\u7A33", "\u51F6": "\u6D41\u5E74\u4E0D\u5229", "\u5927\u51F6": "\u6D41\u5E74\u51F6\u9669" };
    return { year: annual.year, ganZhi: anGanChar + anZhiChar, dayMasterEffect: `${anGanChar}\u4E3A\u65E5\u4E3B\u4E4B${tgStr}`, ganHe: ganHeNotes, branchInteractions: branchNotes, shenShaActivated: [], tenGodEffect: tgStr, deityEffect: score >= 1 ? "\u7528\u795E\u5E74" : score <= -1 ? "\u5FCC\u795E\u5E74" : "\u5E73", overall, summary: `${summaries[overall]}(${score >= 0 ? "+" : ""}${score})`, score };
  }
  function calcFortuneYears(ff, birthYear, preciseOffset) {
    const years = [];
    const shift = preciseOffset !== void 0 && preciseOffset > 3 ? 1 : 0;
    const startY = ff.startAge + birthYear + shift;
    const endY = ff.endAge + birthYear + shift;
    for (let y = startY; y <= endY; y++) years.push(y);
    return years;
  }
  function analyzeFortuneInteractions(greatFortunes, currentYear, dayGan, allPillars, birthYear, deityAnalysis, preciseMonths) {
    return greatFortunes.map((ff) => {
      const years = calcFortuneYears(ff, birthYear, preciseMonths);
      const annInteractions = years.map((y) => {
        const ag = ((y - 4) % 10 + 10) % 10, az = ((y - 4) % 12 + 12) % 12;
        const agC = TIAN_GAN[ag], azC = DI_ZHI[az];
        let ganHe = "\u65E0";
        const h = { 0: { p: 5 }, 1: { p: 6 }, 2: { p: 7 }, 3: { p: 8 }, 4: { p: 9 }, 5: { p: 0 }, 6: { p: 1 }, 7: { p: 2 }, 8: { p: 3 }, 9: { p: 4 } }[ag];
        if (h && h.p === ff.gan) ganHe = `${agC}\u5408\u5927\u8FD0${ff.ganName}`;
        else if (h) {
          for (const p of allPillars) {
            if (h.p === p.gan) {
              ganHe = `${agC}\u5408\u547D\u5C40${p.ganName}`;
              break;
            }
          }
        }
        const bi = calcBranchInteractions([ff.zhi, az]);
        const zhiInt = bi.length ? bi.map((i) => i.type).join(",") : "\u65E0\u7279\u6B8A";
        const tg = calcTenGod(dayGan, ag);
        const fortuneEff = calcTenGod(dayGan, ff.gan);
        const anEl = GAN_WU_XING[ag];
        const isUseful = deityAnalysis ? deityAnalysis.usefulDeities.includes(anEl) : false;
        const isHarmful = deityAnalysis ? deityAnalysis.harmfulDeities.includes(anEl) : false;
        let color = "#555";
        if (isUseful) color = "#4a9c6f";
        else if (isHarmful) color = "#d4735e";
        return { year: y, ganZhi: agC + azC, ganHe, zhiInteraction: zhiInt, shenSha: "", tenGod: tg, fortuneEffect: `${fortuneEff}\u8FD0\u9047${tg}\u5E74`, isUsefulYear: isUseful, color, yangRen: "", lu: "", ganHeDetail: ganHe, zhiDetail: zhiInt };
      });
      return { decade: `${ff.ganName}${ff.zhiName}\u8FD0(${ff.startAge}-${ff.endAge}\u5C81)`, ageRange: `${ff.startAge}-${ff.endAge}`, pillar: `${ff.ganName}${ff.zhiName}`, direction: ff.direction, annualInteractions: annInteractions };
    });
  }

  // src/i18n.ts
  var DICT = {
    "\u516B\u5B57\u6392\u76D8": { zh: "\u516B\u5B57\u6392\u76D8", en: "Ba Zi - Four Pillars" },
    "Ba Zi - Four Pillars of Destiny": { zh: "Ba Zi - Four Pillars of Destiny", en: "Ba Zi - Four Pillars of Destiny" },
    "\u51FA\u751F\u4FE1\u606F": { zh: "\u51FA\u751F\u4FE1\u606F", en: "Birth Info" },
    "\u5E74": { zh: "\u5E74", en: "Yr" },
    "\u6708": { zh: "\u6708", en: "Mo" },
    "\u65E5": { zh: "\u65E5", en: "Dy" },
    "\u65F6": { zh: "\u65F6", en: "Hr" },
    "\u5206": { zh: "\u5206", en: "Min" },
    "\u7537": { zh: "\u7537", en: "Male" },
    "\u5973": { zh: "\u5973", en: "Female" },
    "\u771F\u592A\u9633\u65F6": { zh: "\u771F\u592A\u9633\u65F6", en: "True Solar" },
    "\u5F00\u59CB\u6392\u76D8": { zh: "\u5F00\u59CB\u6392\u76D8", en: "Calculate" },
    "\u56DB\u67F1": { zh: "\u56DB\u67F1", en: "Four Pillars" },
    "\u57FA\u672C\u4FE1\u606F": { zh: "\u57FA\u672C\u4FE1\u606F", en: "Info" },
    "\u65E5\u4E3B": { zh: "\u65E5\u4E3B", en: "Day Master" },
    "\u751F\u8096": { zh: "\u751F\u8096", en: "Zodiac" },
    "\u4E94\u884C\u65FA\u8870": { zh: "\u4E94\u884C\u65FA\u8870", en: "5 Element Strength" },
    "\u8EAB\u5F3A": { zh: "\u8EAB\u5F3A", en: "Strong" },
    "\u8EAB\u5F31": { zh: "\u8EAB\u5F31", en: "Weak" },
    "\u7528\u795E\u5FCC\u795E": { zh: "\u7528\u795E\u5FCC\u795E", en: "Useful/Harmful Deity" },
    "\u7528\u795E": { zh: "\u7528\u795E", en: "Useful" },
    "\u5FCC\u795E": { zh: "\u5FCC\u795E", en: "Harmful" },
    "\u95F2\u795E": { zh: "\u95F2\u795E", en: "Neutral" },
    "\u5341\u795E": { zh: "\u5341\u795E", en: "10 Gods" },
    "\u795E\u715E": { zh: "\u795E\u715E", en: "Stars" },
    "\u5408\u51B2\u5211\u5BB3": { zh: "\u5408\u51B2\u5211\u5BB3", en: "Interactions" },
    "\u6D41\u5E74\u8BE6\u89E3": { zh: "\u6D41\u5E74\u8BE6\u89E3", en: "Annual Forecast" },
    "\u5927\u8FD0": { zh: "\u5927\u8FD0", en: "Great Fortune" },
    "\u6D41\u5E74": { zh: "\u6D41\u5E74", en: "Annual" },
    "\u8D77\u8FD0": { zh: "\u8D77\u8FD0", en: "Start Age" },
    "\u987A\u6392": { zh: "\u987A\u6392", en: "Forward" },
    "\u9006\u6392": { zh: "\u9006\u6392", en: "Reverse" },
    "\u5F53\u524D": { zh: "\u5F53\u524D", en: "Current" },
    "\u70B9\u51FB\u5C55\u5F00\u4E92\u52A8": { zh: "(\u70B9\u51FB\u5C55\u5F00\u4E92\u52A8)", en: "(click to expand)" },
    "\u6D41\u5E74\u4E92\u52A8": { zh: "\u6D41\u5E74\u4E92\u52A8", en: "Year Details" },
    "\u65E5\u4E3B\u6548\u5E94": { zh: "\u65E5\u4E3B\u6548\u5E94", en: "DM Effect" },
    "\u4E94\u884C\u5C5E\u6027": { zh: "\u4E94\u884C\u5C5E\u6027", en: "Element" },
    "\u795E\u715E\u6FC0\u6D3B": { zh: "\u795E\u715E\u6FC0\u6D3B", en: "Stars Active" },
    "\u7EFC\u5408\u8BC4\u4EF7": { zh: "\u7EFC\u5408\u8BC4\u4EF7", en: "Rating" },
    "\u8BC4\u5206": { zh: "\u8BC4\u5206", en: "Score" },
    "\u5929\u5408": { zh: "\u5929\u5408", en: "Stem Combos" },
    "\u5730\u652F": { zh: "\u5730\u652F", en: "Branch" },
    "\u8282\u6C14": { zh: "\u8282\u6C14", en: "Solar Term" },
    "\u5F53\u524D\u8282\u6C14": { zh: "\u5F53\u524D\u8282\u6C14", en: "Current Term" },
    "\u519C\u5386": { zh: "\u519C\u5386", en: "Lunar Date" },
    "\u519C\u5386\u5E74": { zh: "\u519C\u5386\u5E74", en: "Lunar Year" },
    "\u519C\u5386\u65E5\u671F": { zh: "\u519C\u5386\u65E5\u671F", en: "Lunar Day" },
    "\u652F\u85CF\u5E72": { zh: "\u652F\u85CF\u5E72", en: "Hidden Stems" },
    "\u795E\u715E\u660E\u7EC6": { zh: "\u795E\u715E\u660E\u7EC6", en: "Star Details" },
    "\u5C55\u5F00\u8BE6\u60C5": { zh: "\u5C55\u5F00\u8BE6\u60C5", en: "Show Details" },
    "\u6536\u8D77\u8BE6\u60C5": { zh: "\u6536\u8D77\u8BE6\u60C5", en: "Hide Details" },
    "\u5386\u53F2\u8BB0\u5F55": { zh: "\u5386\u53F2\u8BB0\u5F55", en: "History" },
    "\u6E05\u7A7A\u5386\u53F2": { zh: "\u6E05\u7A7A\u5386\u53F2", en: "Clear History" },
    "\u7ECF\u5EA6": { zh: "\u7ECF\u5EA6", en: "Longitude" },
    "\u5BFC\u51FAPDF": { zh: "\u5BFC\u51FAPDF", en: "Export PDF" },
    "\u7528\u795E\u5E74": { zh: "\u7528\u795E\u5E74", en: "Good Year" },
    "\u5FCC\u795E\u5E74": { zh: "\u5FCC\u795E\u5E74", en: "Tough Year" },
    "\u5F53\u524D\u8282\u6C14\uFF1A": { zh: "\u5F53\u524D\u8282\u6C14\uFF1A", en: "Term: " },
    "\u8D77\u8FD0\uFF1A": { zh: "\u8D77\u8FD0\uFF1A", en: "Start: " },
    "\u5C81": { zh: "\u5C81", en: "yrs" },
    "\u5C81\u3001": { zh: "\u5C81\u3001", en: "yrs " },
    "\u65E0\u7279\u6B8A": { zh: "\u65E0\u7279\u6B8A", en: "none" },
    "\u65E0": { zh: "\u65E0", en: "none" },
    "\u59D3\u540D": { zh: "\u59D3\u540D", en: "Name" },
    "\u5728": { zh: "\u5728", en: " at " },
    "\u67F1": { zh: "\u67F1", en: " Pillar" },
    "\u65E5\u671F": { zh: "\u65E5\u671F", en: "Date" },
    "\u4E3B\u661F": { zh: "\u4E3B\u661F", en: "Main Star" },
    "\u661F\u8FD0": { zh: "\u661F\u8FD0", en: "Stage" },
    "\u81EA\u5750": { zh: "\u81EA\u5750", en: "Self Sit" },
    "\u7A7A\u4EA1": { zh: "\u7A7A\u4EA1", en: "Empty" },
    "\u5206\u4EAB": { zh: "\u5206\u4EAB", en: "Share" },
    // Ten Gods
    "\u6B63\u5B98": { zh: "\u6B63\u5B98", en: "Direct Officer" },
    "\u4E03\u6740": { zh: "\u4E03\u6740", en: "Seven Kill" },
    "\u6B63\u5370": { zh: "\u6B63\u5370", en: "Direct Seal" },
    "\u504F\u5370": { zh: "\u504F\u5370", en: "Indirect Seal" },
    "\u6B63\u8D22": { zh: "\u6B63\u8D22", en: "Direct Wealth" },
    "\u504F\u8D22": { zh: "\u504F\u8D22", en: "Indirect Wealth" },
    "\u6BD4\u80A9": { zh: "\u6BD4\u80A9", en: "Peer" },
    "\u52AB\u8D22": { zh: "\u52AB\u8D22", en: "Rob Wealth" },
    "\u98DF\u795E": { zh: "\u98DF\u795E", en: "Food God" },
    "\u4F24\u5B98": { zh: "\u4F24\u5B98", en: "Hurt Officer" },
    // WuXing
    "\u6728": { zh: "\u6728", en: "Wood" },
    "\u706B": { zh: "\u706B", en: "Fire" },
    "\u571F": { zh: "\u571F", en: "Earth" },
    "\u91D1": { zh: "\u91D1", en: "Metal" },
    "\u6C34": { zh: "\u6C34", en: "Water" },
    // WangShuai
    "\u65FA": { zh: "\u65FA", en: "Prosper" },
    "\u76F8": { zh: "\u76F8", en: "Flourish" },
    "\u4F11": { zh: "\u4F11", en: "Rest" },
    "\u56DA": { zh: "\u56DA", en: "Imprison" },
    "\u6B7B": { zh: "\u6B7B", en: "Dead" },
    // YinYang
    "\u9633": { zh: "\u9633", en: "Yang" },
    "\u9634": { zh: "\u9634", en: "Yin" },
    "(\u9633)": { zh: "(\u9633)", en: "(Yang)" },
    "(\u9634)": { zh: "(\u9634)", en: "(Yin)" },
    // Na Yin lookup
    "\u8DEF\u65C1\u571F": { zh: "\u8DEF\u65C1\u571F", en: "Roadside Earth" },
    "\u6D77\u4E2D\u91D1": { zh: "\u6D77\u4E2D\u91D1", en: "Sea Metal" },
    "\u7089\u4E2D\u706B": { zh: "\u7089\u4E2D\u706B", en: "Furnace Fire" },
    "\u5927\u6797\u6728": { zh: "\u5927\u6797\u6728", en: "Forest Wood" },
    "\u4E95\u6CC9\u6C34": { zh: "\u4E95\u6CC9\u6C34", en: "Well Water" },
    "\u5251\u950B\u91D1": { zh: "\u5251\u950B\u91D1", en: "Sword Metal" },
    "\u57CE\u5934\u571F": { zh: "\u57CE\u5934\u571F", en: "City Earth" },
    "\u767D\u8721\u91D1": { zh: "\u767D\u8721\u91D1", en: "Wax Metal" },
    "\u6768\u67F3\u6728": { zh: "\u6768\u67F3\u6728", en: "Willow Wood" },
    "\u9739\u96F3\u706B": { zh: "\u9739\u96F3\u706B", en: "Thunder Fire" },
    "\u677E\u67CF\u6728": { zh: "\u677E\u67CF\u6728", en: "Pine Wood" },
    "\u7802\u77F3\u91D1": { zh: "\u7802\u77F3\u91D1", en: "Gravel Metal" },
    "\u58C1\u4E0A\u571F": { zh: "\u58C1\u4E0A\u571F", en: "Wall Earth" },
    "\u5E73\u5730\u6728": { zh: "\u5E73\u5730\u6728", en: "Plain Wood" },
    "\u9497\u948F\u91D1": { zh: "\u9497\u948F\u91D1", en: "Hairpin Metal" },
    "\u5C71\u4E0B\u706B": { zh: "\u5C71\u4E0B\u706B", en: "Mountain Fire" },
    "\u6851\u67D8\u6728": { zh: "\u6851\u67D8\u6728", en: "Mulberry Wood" },
    "\u5927\u6EAA\u6C34": { zh: "\u5927\u6EAA\u6C34", en: "Stream Water" },
    "\u6C99\u4E2D\u571F": { zh: "\u6C99\u4E2D\u571F", en: "Sand Earth" },
    "\u5929\u4E0A\u706B": { zh: "\u5929\u4E0A\u706B", en: "Sky Fire" },
    "\u77F3\u69B4\u6728": { zh: "\u77F3\u69B4\u6728", en: "Pomegranate Wood" },
    "\u5927\u6D77\u6C34": { zh: "\u5927\u6D77\u6C34", en: "Ocean Water" },
    "\u8986\u706F\u706B": { zh: "\u8986\u706F\u706B", en: "Lamp Fire" },
    "\u5929\u6CB3\u6C34": { zh: "\u5929\u6CB3\u6C34", en: "Sky River" },
    "\u5927\u9A7F\u571F": { zh: "\u5927\u9A7F\u571F", en: "Post Earth" },
    "\u91D1\u7B94\u91D1": { zh: "\u91D1\u7B94\u91D1", en: "Gold Leaf" },
    "\u6DA7\u4E0B\u6C34": { zh: "\u6DA7\u4E0B\u6C34", en: "Ravine Water" },
    "\u5C71\u5934\u706B": { zh: "\u5C71\u5934\u706B", en: "Hill Fire" },
    "\u5C4B\u4E0A\u571F": { zh: "\u5C4B\u4E0A\u571F", en: "Roof Earth" },
    "\u957F\u6D41\u6C34": { zh: "\u957F\u6D41\u6C34", en: "Flowing Water" }
  };
  function t(key, lang) {
    return DICT[key]?.[lang] ?? key;
  }
  function setLang(lang) {
    window.__LANG = lang;
    document.documentElement.lang = lang === "en" ? "en" : "zh";
  }
  function getLang() {
    return window.__LANG || "zh";
  }

  // src/index.ts
  function calculateBaZi(input) {
    const ts = correctToTrueSolar(input);
    const hour = ts.hour;
    const yp = calcYearPillar(input.year, input.month, input.day);
    const mp = calcMonthPillar(yp.gan, input.year, input.month, input.day);
    var _ziType = null;
    var _ziMode = null;
    var _dp = calcDayPillar(input.year, input.month, input.day);
    var _hp = null;
    var _useRFH = input.useRenFuHongZi === true;
    if (isZiHour(hour)) {
      if (_useRFH) {
        _ziMode = "\u65E9\u665A\u5B50\u6392\u76D8";
        if (isLateZiHour(hour)) {
          _ziType = "\u665A\u5B50\u65F6";
          var _ndNext = new Date(input.year, input.month - 1, input.day + 1);
          var _nextDp = calcDayPillar(_ndNext.getFullYear(), _ndNext.getMonth() + 1, _ndNext.getDate());
          _hp = calcHourPillarRenFuHong(_dp.gan, hour, true, _nextDp.gan);
        } else {
          _ziType = "\u65E9\u5B50\u65F6";
          var _pd = new Date(input.year, input.month - 1, input.day - 1);
          var _pdp = calcDayPillar(_pd.getFullYear(), _pd.getMonth() + 1, _pd.getDate());
          _dp = _pdp;
          _hp = calcHourPillar(_dp.gan, hour);
        }
      } else {
        _ziMode = "\u4F20\u7EDF\u6392\u76D8";
        if (isLateZiHour(hour)) {
          _hp = calcHourPillar(_dp.gan, hour);
        } else {
          _hp = calcHourPillar(_dp.gan, hour);
        }
      }
    } else {
      _hp = calcHourPillar(_dp.gan, hour);
    }
    const dp = _dp;
    const hp = _hp;
    const pillars = [yp, mp, dp, hp];
    const pObj = { year: yp, month: mp, day: dp, hour: hp };
    const dm = getDayMasterInfo(dp.gan);
    const zodiac = SHENG_XIAO[yp.zhi];
    const eightChars = pillars.map((p) => p.ganName + p.zhiName).join(" ");
    const naYin = getFourPillarNaYin(pillars);
    const zhis = pillars.map((p) => p.zhi);
    const hs = getFourPillarHiddenStems(zhis);
    const hsWithGod = hs.map((g) => g.map((h) => ({ ...h, tenGod: calcTenGod(dp.gan, h.gan) })));
    const fe = calcFiveElementScore(pillars, hsWithGod);
    const ganGods = calcGanTenGods(dp.gan, pillars);
    const zhiGods = calcZhiTenGods(dp.gan, pillars);
    const dir = calcFortuneDirection(yp.gan, input.gender);
    const sa = calcStartAge(input.year, input.month, input.day, dir);
    let preciseMonths = 0;
    try {
      const p = calcStartAgePrecise(input.year, input.month, input.day, input.hour || 0, input.minute || 0, dir);
      preciseMonths = p.months;
    } catch (e) {
    }
    const gf = calcGreatFortunes(sa, mp, dir, dp.gan);
    const cy = (/* @__PURE__ */ new Date()).getFullYear();
    const af = calcAnnualFortune(cy, dp.gan);
    const interactions = calcAllInteractions(pillars);
    const lunar = solarToLunar(input.year, input.month, input.day);
    if (lunar) {
      lunar.year = yp.gan && yp.zhi >= 0 ? input.year : input.year - 1;
    }
    if (lunar) {
      lunar.lunarYearGz = yp.ganName + yp.zhiName;
    }
    const shenSha = calcShenSha(dp.gan, yp.gan, yp.zhi, mp.zhi, pillars, mp.zhi);
    const shenShaDetail = zhis.map((z) => calcShenShaForBranch(dp.gan, yp.gan, yp.zhi, z, mp.zhi));
    const termIdx = findSolarTermIndex(input.year, input.month, input.day);
    const wuXingAnalysis = analyzeFiveElements(fe, dm.element, mp.zhi);
    const deityAnalysis = inferDeities(dm.element, wuXingAnalysis.dayMaster.isStrong, wuXingAnalysis.wangShuai, fe, mp.zhi, pillars, hsWithGod);
    const curFf = gf.find((ff) => cy - input.year >= ff.startAge && cy - input.year <= ff.endAge);
    const annualDetail = analyzeAnnualFortune(af, dp.gan, mp.zhi, pillars, {}, deityAnalysis, curFf);
    const fortuneInteraction = analyzeFortuneInteractions(gf, cy, dp.gan, pillars, input.year, deityAnalysis, preciseMonths);
    const solarTermNote = getSolarTermName(termIdx);
    return {
      input,
      pillars: pObj,
      eightChars,
      dayMaster: { gan: dp.gan, name: dm.name, element: dm.element, yin: dm.yin },
      zodiac,
      fiveElements: fe,
      naYin,
      tenGods: { ...ganGods, ...zhiGods },
      hiddenStems: hsWithGod,
      greatFortunes: gf,
      annualFortune: af,
      annualTenGod: af.tenGodGan,
      interactions,
      lunarDate: lunar,
      solarTermNote,
      shenSha,
      shenShaDetail,
      wuXingAnalysis,
      deityAnalysis,
      annualDetail,
      fortuneInteraction,
      ziType: _ziType,
      ziMode: _ziMode
    };
  }
  return __toCommonJS(src_exports);
})();
