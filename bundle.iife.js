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
    calcFiveElementScore: () => calcFiveElementScore,
    calcFortuneWithAnnual: () => calcFortuneWithAnnual,
    calcGanTenGods: () => calcGanTenGods,
    calcNatalWithAnnual: () => calcNatalWithAnnual,
    calcNatalWithFortune: () => calcNatalWithFortune,
    calcShenSha: () => calcShenSha,
    calcShenShaForBranch: () => calcShenShaForBranch,
    calcTenGod: () => calcTenGod,
    calcZhiTenGods: () => calcZhiTenGods,
    calculateBaZi: () => calculateBaZi,
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
  function calcFortuneDirection(gy, gender) {
    const yang = gy % 2 === 0;
    return yang && gender === "male" || !yang && gender === "female" ? "\u987A\u6392" : "\u9006\u6392";
  }
  function calcStartAge(year, month, day, dir) {
    const terms = getSolarTermDays(year, "jie");
    const birth = new Date(year, month - 1, day);
    let diff = 0;
    if (dir.indexOf("\u987A") === 0) {
      for (let i = 0; i < terms.length; i++) {
        const tm = Math.floor(terms[i] / 100);
        const td = terms[i] % 100;
        const ty = tm >= 2 ? year : year + 1;
        const termDate = new Date(ty, tm - 1, td);
        if (termDate > birth) {
          diff = Math.round((termDate.getTime() - birth.getTime()) / 864e5);
          break;
        }
      }
      if (diff === 0) {
        const first = terms[0];
        const termDate = new Date(year + 1, Math.floor(first / 100) - 1, first % 100);
        diff = Math.round((termDate.getTime() - birth.getTime()) / 864e5);
      }
    } else {
      let prevDate = null;
      let prevDiff = Infinity;
      for (let i = 0; i < terms.length; i++) {
        const tm = Math.floor(terms[i] / 100);
        const td = terms[i] % 100;
        const ty = tm >= 2 ? year : year + 1;
        const termDate = new Date(ty, tm - 1, td);
        const d = birth.getTime() - termDate.getTime();
        if (d > 0 && d < prevDiff) {
          prevDiff = d;
          prevDate = termDate;
        }
      }
      if (!prevDate) {
        const pterms = getSolarTermDays(year - 1, "jie");
        for (let i = 0; i < pterms.length; i++) {
          const tm = Math.floor(pterms[i] / 100);
          const td = pterms[i] % 100;
          if (tm < 2) continue;
          const termDate = new Date(year - 1, tm - 1, td);
          const d = birth.getTime() - termDate.getTime();
          if (d > 0 && d < prevDiff) {
            prevDiff = d;
            prevDate = termDate;
          }
        }
      }
      if (prevDate) diff = Math.round(prevDiff / 864e5);
    }
    return Math.max(0, Math.min(120, Math.floor(diff / 3)));
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
  var TIAN_YI = {
    0: [1, 7],
    4: [1, 7],
    // 甲戊→丑未
    1: [0, 8],
    5: [0, 8],
    // 乙己→子申
    2: [11, 9],
    3: [11, 9],
    // 丙丁→亥酉
    6: [2, 6],
    7: [2, 6],
    // 庚辛→寅午 (was 6:[1,7] - fixed!)
    8: [3, 5],
    9: [3, 5]
    // 壬癸→卯巳
  };
  var TAI_JI = {
    0: [0, 6],
    1: [0, 6],
    2: [9, 3],
    3: [9, 3],
    4: [4, 10, 1, 7],
    5: [4, 10, 1, 7],
    6: [2, 11],
    7: [2, 11],
    8: [5, 8],
    9: [5, 8]
  };
  var YUE_DE = { 2: 2, 6: 2, 10: 2, 3: 0, 7: 0, 11: 0, 0: 8, 4: 8, 8: 8, 1: 6, 5: 6, 9: 6 };
  var FU_XING = { 0: 2, 2: 2, 4: 2, 6: 2, 8: 2, 1: 8, 3: 8, 5: 8, 7: 8, 9: 8 };
  var WEN_CHANG = { 0: 5, 1: 6, 2: 8, 4: 8, 3: 9, 5: 9, 6: 11, 7: 0, 8: 2, 9: 3 };
  var TAO_HUA = { 2: 3, 6: 3, 10: 3, 0: 9, 4: 9, 8: 9, 3: 0, 7: 0, 11: 0, 1: 6, 5: 6, 9: 6 };
  var YI_MA = { 2: 8, 6: 8, 10: 8, 0: 2, 4: 2, 8: 2, 3: 5, 7: 5, 11: 5, 1: 11, 5: 11, 9: 11 };
  var HONG_YAN = { 0: 6, 1: 8, 2: 2, 3: 7, 4: 4, 5: 4, 6: 10, 7: 9, 8: 0, 9: 3 };
  var XUE_TANG = { 0: 11, 1: 6, 2: 2, 3: 9, 4: 2, 5: 9, 6: 5, 7: 0, 8: 8, 9: 3 };
  var HUA_GAI = { 2: 10, 6: 10, 10: 10, 0: 4, 4: 4, 8: 4, 3: 7, 7: 7, 11: 7, 1: 1, 5: 1, 9: 1 };
  var GU_CHEN = { 0: 2, 1: 2, 11: 2, 2: 5, 3: 5, 4: 5, 5: 8, 6: 8, 7: 8, 8: 11, 9: 11, 10: 11 };
  var GUA_XIU = { 0: 10, 1: 10, 11: 10, 2: 1, 3: 1, 4: 1, 5: 4, 6: 4, 7: 4, 8: 7, 9: 7, 10: 7 };
  var TONG_ZI = { 0: [2, 3], 1: [6], 2: [6], 3: [2, 3], 4: [4, 5], 5: [4, 5], 6: [8, 9], 7: [8, 9], 8: [11, 0], 9: [11, 0] };
  var ZAI_SHA = { 2: 0, 6: 0, 10: 0, 3: 9, 7: 9, 11: 9, 0: 6, 4: 6, 8: 6, 1: 3, 5: 3, 9: 3 };
  var SANG_MEN = { 0: 2, 1: 3, 2: 4, 3: 5, 4: 6, 5: 7, 6: 8, 7: 9, 8: 10, 9: 11, 10: 0, 11: 1 };
  var YANG_REN = { 0: 3, 1: 2, 2: 6, 3: 5, 4: 6, 5: 5, 6: 9, 7: 8, 8: 0, 9: 11 };
  var JIE_SHA = { 2: 11, 6: 11, 10: 11, 0: 5, 4: 5, 8: 5, 3: 8, 7: 8, 11: 8, 1: 2, 5: 2, 9: 2 };
  var WANG_SHEN = { 2: 5, 6: 5, 10: 5, 0: 11, 4: 11, 8: 11, 3: 2, 7: 2, 11: 2, 1: 8, 5: 8, 9: 8 };
  var JIN_YU = { 0: 4, 1: 5, 2: 7, 3: 8, 4: 7, 5: 8, 6: 10, 7: 11, 8: 1, 9: 2 };
  var TIAN_XI = { 0: 9, 1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1, 9: 0, 10: 11, 11: 10 };
  var JIANG_XING = { 2: 6, 6: 6, 10: 6, 0: 0, 4: 0, 8: 0, 3: 3, 7: 3, 11: 3, 1: 9, 5: 9, 9: 9 };
  function calcShenSha(dg, yg, yz, mz, pillars, monthZhi) {
    const r = [];
    const zhis = pillars.map((p) => p.zhi);
    const gans = pillars.map((p) => p.gan);
    const push = (name, type) => {
      if (!r.some((s) => s.name === name)) r.push({ name, type });
    };
    const ty = TIAN_YI[dg] ?? [];
    if (ty.some((z) => zhis.includes(z))) push("\u5929\u4E59\u8D35\u4EBA", "\u5409");
    const tj = TAI_JI[dg] ?? [];
    if (tj.some((z) => zhis.includes(z))) push("\u592A\u6781\u8D35\u4EBA", "\u5409");
    const mzM = monthZhi ?? pillars[1].zhi;
    const ydGan = YUE_DE[mzM];
    if (ydGan !== void 0 && gans.some((g) => g === ydGan)) push("\u6708\u5FB7\u8D35\u4EBA", "\u5409");
    if (dg % 2 === 0 && zhis.some((z) => [0, 6, 3, 9].includes(z))) push("\u5FB7\u79C0\u8D35\u4EBA", "\u5409");
    if (FU_XING[yg] !== void 0 && zhis.includes(FU_XING[yg])) push("\u798F\u661F\u8D35\u4EBA", "\u5409");
    if (zhis.includes(WEN_CHANG[dg] ?? -1)) push("\u6587\u660C\u8D35\u4EBA", "\u5409");
    if (zhis.includes(TAO_HUA[yz] ?? -1)) push("\u6843\u82B1", "\u4E2D\u6027");
    if (zhis.includes(YI_MA[yz] ?? -1)) push("\u9A7F\u9A6C", "\u4E2D\u6027");
    if (zhis.includes(HONG_YAN[dg] ?? -1)) push("\u7EA2\u8273\u715E", "\u4E2D\u6027");
    if (zhis.includes(XUE_TANG[yg] ?? -1)) push("\u5B66\u5802", "\u5409");
    if (zhis.includes(HUA_GAI[yz] ?? -1)) push("\u534E\u76D6", "\u4E2D\u6027");
    if (zhis.includes(GU_CHEN[yz] ?? -1)) push("\u5B64\u8FB0", "\u51F6");
    if (zhis.includes(GUA_XIU[yz] ?? -1)) push("\u5BE1\u5BBF", "\u51F6");
    const tz = TONG_ZI[dg] ?? [];
    if (tz.some((z) => zhis.includes(z))) push("\u7AE5\u5B50\u715E", "\u51F6");
    if (zhis.includes(ZAI_SHA[yz] ?? -1)) push("\u707E\u715E", "\u51F6");
    if (zhis.includes(SANG_MEN[yz] ?? -1)) push("\u4E27\u95E8", "\u51F6");
    if (zhis.includes(YANG_REN[dg] ?? -1)) push("\u7F8A\u5203", "\u51F6");
    if (zhis.includes(JIE_SHA[yz] ?? -1)) push("\u52AB\u715E", "\u51F6");
    if (zhis.includes(WANG_SHEN[yz] ?? -1)) push("\u4EA1\u795E", "\u51F6");
    if (zhis.includes(JIN_YU[dg] ?? -1)) push("\u91D1\u8206", "\u5409");
    if (zhis.includes(TIAN_XI[yz] ?? -1)) push("\u5929\u559C", "\u5409");
    if (zhis.includes(JIANG_XING[yz] ?? -1)) push("\u5C06\u661F", "\u5409");
    return r;
  }
  function calcShenShaForBranch(dg, yg, yz, zhi, mz) {
    const r = [];
    const push = (n, t2) => {
      r.push({ name: n, type: t2 });
    };
    if ((TIAN_YI[dg] ?? []).includes(zhi)) push("\u5929\u4E59\u8D35\u4EBA", "\u5409");
    if ((TAI_JI[dg] ?? []).includes(zhi)) push("\u592A\u6781\u8D35\u4EBA", "\u5409");
    if (WEN_CHANG[dg] === zhi) push("\u6587\u660C\u8D35\u4EBA", "\u5409");
    if (TAO_HUA[yz] === zhi) push("\u6843\u82B1", "\u4E2D\u6027");
    if (YI_MA[yz] === zhi) push("\u9A7F\u9A6C", "\u4E2D\u6027");
    if (HUA_GAI[yz] === zhi) push("\u534E\u76D6", "\u4E2D\u6027");
    if (JIANG_XING[yz] === zhi) push("\u5C06\u661F", "\u5409");
    if (JIE_SHA[yz] === zhi) push("\u52AB\u715E", "\u51F6");
    if (WANG_SHEN[yz] === zhi) push("\u4EA1\u795E", "\u51F6");
    if (JIN_YU[dg] === zhi) push("\u91D1\u8206", "\u5409");
    if (TIAN_XI[yz] === zhi) push("\u5929\u559C", "\u5409");
    if (HONG_YAN[dg] === zhi) push("\u7EA2\u8273\u715E", "\u4E2D\u6027");
    if (XUE_TANG[yg] === zhi) push("\u5B66\u5802", "\u5409");
    if (FU_XING[yg] === zhi) push("\u798F\u661F\u8D35\u4EBA", "\u5409");
    if (GU_CHEN[yz] === zhi) push("\u5B64\u8FB0", "\u51F6");
    if (GUA_XIU[yz] === zhi) push("\u5BE1\u5BBF", "\u51F6");
    if (ZAI_SHA[yz] === zhi) push("\u707E\u715E", "\u51F6");
    if (SANG_MEN[yz] === zhi) push("\u4E27\u95E8", "\u51F6");
    if (YANG_REN[dg] === zhi) push("\u7F8A\u5203", "\u51F6");
    if ((TAI_JI[dg] ?? []).includes(zhi) && !["\u5929\u4E59\u8D35\u4EBA", "\u6587\u660C\u8D35\u4EBA"].includes("")) push("\u592A\u6781\u8D35\u4EBA", "\u5409");
    const myz = mz ?? 0;
    const ydGan = YUE_DE[myz];
    if (ydGan !== void 0 && zhi === ydGan) {
    }
    if (dg % 2 === 0 && [0, 6, 3, 9].includes(zhi)) push("\u5FB7\u79C0\u8D35\u4EBA", "\u5409");
    const tz = TONG_ZI[dg] ?? [];
    if (tz.includes(zhi)) push("\u7AE5\u5B50\u715E", "\u51F6");
    return r;
  }
  function calcAnnualShenSha(dg, yg, yz, anZhi) {
    return calcShenShaForBranch(dg, yg, yz, anZhi);
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

  // src/analysis.ts
  var SHENG = { "\u6728": "\u706B", "\u706B": "\u571F", "\u571F": "\u91D1", "\u91D1": "\u6C34", "\u6C34": "\u6728" };
  var KE = { "\u6728": "\u571F", "\u571F": "\u6C34", "\u6C34": "\u706B", "\u706B": "\u91D1", "\u91D1": "\u6728" };
  var EL_NAMES = ["\u6728", "\u706B", "\u571F", "\u91D1", "\u6C34"];
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
  var TONG_GUAN = {
    "\u91D1\u6728": "\u6C34",
    "\u6728\u91D1": "\u6C34",
    "\u6C34\u706B": "\u6728",
    "\u706B\u6C34": "\u6728",
    "\u706B\u91D1": "\u571F",
    "\u91D1\u706B": "\u571F",
    "\u571F\u6728": "\u706B",
    "\u6728\u571F": "\u706B",
    "\u6C34\u571F": "\u91D1",
    "\u571F\u6C34": "\u91D1"
  };
  function sameCamp(el, dm) {
    return el === dm || SHENG[dm] === el;
  }
  function oppCamp(el, dm) {
    const keWo = KE[dm], woSheng = SHENG[dm], woKe = KE[dm];
    return el === keWo || el === woSheng || el === woKe;
  }
  function getLuZhi(gan) {
    return [2, 3, 5, 6, 5, 6, 8, 9, 11, 0][gan];
  }
  function getDiWangZhi(gan) {
    return [3, 2, 6, 5, 6, 5, 9, 8, 0, 11][gan];
  }
  function getChangShengZhi(gan) {
    return [11, 6, 2, 9, 2, 9, 5, 0, 8, 3][gan];
  }
  function calcRootScore(gan, zhiz, zhiGans) {
    let score = 0;
    const lu = getLuZhi(gan);
    const dw = getDiWangZhi(gan);
    const cs = getChangShengZhi(gan);
    const posWeight = [10, 40, 20, 5];
    for (let zi = 0; zi < zhiz.length; zi++) {
      const z = zhiz[zi];
      let weight = posWeight[zi] || 5;
      if (z === lu || z === dw) score += weight * 2;
      else if (z === cs) score += weight;
      else if (zhiGans[zi] && zhiGans[zi].includes(gan)) score += weight * 0.5;
    }
    return score;
  }
  function cuiClassifyStrength(dmEl, dmGan, monthZhi, allZhis, zhiGans, allGans, totals) {
    let sameScore = 0, oppScore = 0;
    const dm = dmEl;
    for (let i = 0; i < allGans.length; i++) {
      if (i === 2) continue;
      const el = GAN_WU_XING[allGans[i]];
      const weight = [10, 15, 0, 10][i];
      if (sameCamp(el, dm)) sameScore += weight;
      else if (oppCamp(el, dm)) oppScore += weight;
    }
    const zhiWeight = [10, 40, 20, 5];
    for (let zi = 0; zi < allZhis.length; zi++) {
      const z = allZhis[zi];
      const hg = HIDDEN_SCORE[z] || [];
      for (const [gan, score] of hg) {
        const el = GAN_WU_XING[gan];
        const pts = score * zhiWeight[zi] / 100;
        if (sameCamp(el, dm)) sameScore += pts;
        else if (oppCamp(el, dm)) oppScore += pts;
      }
    }
    const rootScore = calcRootScore(dmGan, allZhis, zhiGans);
    sameScore += rootScore;
    const ws = getWangShuai(dm, monthZhi);
    if (ws === "\u65FA") sameScore += 15;
    else if (ws === "\u76F8") sameScore += 5;
    else if (ws === "\u6B7B" || ws === "\u56DA") sameScore -= 5;
    const diff = sameScore - oppScore;
    const total = sameScore + oppScore;
    const ratio = total > 0 ? sameScore / total : 0.5;
    let level;
    if (ratio >= 0.85) level = "\u65FA\u6781(\u4ECE\u5F3A)";
    else if (ratio >= 0.7) level = "\u592A\u65FA";
    else if (ratio >= 0.58) level = "\u504F\u65FA";
    else if (ratio >= 0.42) level = "\u4E2D\u548C";
    else if (ratio >= 0.3) level = "\u504F\u5F31";
    else if (ratio >= 0.15) level = "\u592A\u5F31";
    else level = "\u5F31\u6781(\u4ECE\u5F31)";
    const isStrong = level === "\u504F\u65FA" || level === "\u592A\u65FA" || level === "\u65FA\u6781(\u4ECE\u5F3A)" || level === "\u4E2D\u548C";
    return { level, score: Math.round(sameScore - oppScore), isStrong };
  }
  function detectSpecialPattern(totals, dm) {
    const shen = SHENG[dm], same = dm;
    const shenScore = (totals[shen] || 0) + (totals[same] || 0);
    const keWo = KE[dm], woKe = KE[dm], woSheng = SHENG[dm];
    const keXieHao = (totals[keWo] || 0) + (totals[woKe] || 0) + (totals[woSheng] || 0);
    const totalAll = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
    if (shenScore / totalAll > 0.7 && keXieHao < 50) return true;
    if (keXieHao / totalAll > 0.75 && shenScore < 50) return true;
    return false;
  }
  function getTiaoHou(monthZhi) {
    return TIAO_HOU[monthZhi] ?? ["\u706B"];
  }
  function getTongGuan(totals) {
    const r = [];
    const pairs = [["\u91D1", "\u6728"], ["\u6C34", "\u706B"], ["\u706B", "\u91D1"], ["\u6728", "\u571F"], ["\u571F", "\u6C34"]];
    for (const [a, b] of pairs) {
      if ((totals[a] || 0) > 100 && (totals[b] || 0) > 100) {
        const tg = TONG_GUAN[a + b];
        if (tg) r.push(tg);
      }
    }
    return r;
  }
  function inferDeities(dayMasterElement, _isStrong, wangShuai, fiveElements, monthZhi, pillars, hiddenStems) {
    const mz = monthZhi ?? 0;
    const dm = dayMasterElement;
    const dmGan = pillars?.[2]?.gan ?? 0;
    const allZhis = pillars?.map((p) => p.zhi) ?? [];
    const allGans = pillars?.map((p) => p.gan) ?? [];
    const zhiGans = hiddenStems?.map((h) => h.map((x) => x.gan)) ?? [];
    const totals = { "\u6728": 0, "\u706B": 0, "\u571F": 0, "\u91D1": 0, "\u6C34": 0 };
    for (let i = 0; i < 5; i++)
      totals[EL_NAMES[i]] += fiveElements[["wood", "fire", "earth", "metal", "water"][i]] || 0;
    for (const p of pillars || []) totals[GAN_WU_XING[p.gan]] += 20;
    for (const grp of hiddenStems || [])
      for (const h of grp) totals[h.element] += 10;
    const slData = cuiClassifyStrength(dm, dmGan, mz, allZhis, zhiGans, allGans, totals);
    const isSpecial = detectSpecialPattern(totals, dm);
    const tiaoHou = getTiaoHou(mz);
    const tongGuan = getTongGuan(totals);
    const useful = [];
    const harmful = [];
    if (isSpecial) {
      const shen = SHENG[dm], same = dm;
      const keWo = KE[dm], woSheng = SHENG[dm], woKe = KE[dm];
      const shenScore = (totals[shen] || 0) + (totals[same] || 0);
      const keXieHao = (totals[keWo] || 0) + (totals[woKe] || 0) + (totals[woSheng] || 0);
      if (shenScore > keXieHao) {
        useful.push(shen, same);
        harmful.push(keWo, woKe, woSheng);
      } else {
        if ((totals[woKe] || 0) > (totals[keWo] || 0) && (totals[woKe] || 0) > (totals[woSheng] || 0))
          useful.push(woKe, woSheng);
        else if ((totals[keWo] || 0) > (totals[woKe] || 0) && (totals[keWo] || 0) > (totals[woSheng] || 0))
          useful.push(keWo, woKe);
        else
          useful.push(woSheng, woKe);
        harmful.push(shen, same);
      }
    }
    if (!isSpecial) {
      for (const t2 of tiaoHou) if (!useful.includes(t2)) useful.push(t2);
      for (const t2 of tongGuan) if (!useful.includes(t2)) useful.push(t2);
      if (slData.level === "\u504F\u65FA") {
        const keWo = KE[dm], woSheng = SHENG[dm], woKe = KE[dm];
        for (const el of [keWo, woSheng, woKe]) if (el && !useful.includes(el)) useful.push(el);
        const shen = SHENG[dm], same = dm;
        for (const el of [shen, same]) if (el && !harmful.includes(el)) harmful.push(el);
      } else if (slData.level === "\u592A\u65FA") {
        const woSheng = SHENG[dm];
        if (!useful.includes(woSheng)) useful.unshift(woSheng);
        harmful.push(SHENG[dm], dm, KE[dm]);
      } else if (slData.level === "\u65FA\u6781(\u4ECE\u5F3A)") {
      } else if (slData.level === "\u504F\u5F31") {
        const shen = SHENG[dm], same = dm;
        for (const el of [shen, same]) if (el && !useful.includes(el)) useful.push(el);
        const keWo = KE[dm], woSheng = SHENG[dm], woKe = KE[dm];
        for (const el of [keWo, woSheng, woKe]) if (el && !harmful.includes(el)) harmful.push(el);
      } else if (slData.level === "\u592A\u5F31") {
        const keWo = KE[dm], woSheng = SHENG[dm], woKe = KE[dm];
        for (const el of [keWo, woSheng, woKe]) if (el && !useful.includes(el)) useful.push(el);
        const shen = SHENG[dm], same = dm;
        for (const el of [shen, same]) if (el && !harmful.includes(el)) harmful.push(el);
      } else if (slData.level === "\u5F31\u6781(\u4ECE\u5F31)") {
      }
    }
    for (const e of harmful) {
      const idx = useful.indexOf(e);
      if (idx >= 0) useful.splice(idx, 1);
    }
    const neutralSet = EL_NAMES.filter((e) => !useful.includes(e) && !harmful.includes(e));
    const uSet = [...new Set(useful)];
    const hSet = [...new Set(harmful)];
    const strategy = isSpecial ? `[\u4ECE\u683C] \u65E5\u4E3B${slData.level}\uFF0C\u5168\u5C40\u987A\u52BF\u3002\u7528\u795E:${uSet.join("\u3001")}\uFF0C\u5FCC\u795E:${hSet.join("\u3001")}\u3002` : slData.level === "\u4E2D\u548C" ? `[\u4E2D\u548C] \u65E5\u4E3B\u4E2D\u548C\uFF0C\u968F\u5927\u8FD0\u6D41\u8F6C\u3002\u5F53\u524D\u8C03\u5019:${tiaoHou.join("\u3001")}\u3002` : slData.level === "\u504F\u65FA" || slData.level === "\u592A\u65FA" ? `[${slData.level}] \u7528\u795E:${uSet.join("\u3001")}\uFF0C\u5FCC\u795E:${hSet.join("\u3001")}\u3002\u8C03\u5019:${tiaoHou.join("\u3001")}\u3002` : `[${slData.level}] \u7528\u795E:${uSet.join("\u3001")}\uFF0C\u5FCC\u795E:${hSet.join("\u3001")}\u3002\u8C03\u5019:${tiaoHou.join("\u3001")}\u3002`;
    return {
      dayMaster: { element: dm, strength: slData.isStrong ? "\u504F\u65FA/\u592A\u65FA" : "\u504F\u5F31/\u592A\u5F31", level: slData.level, isStrong: slData.isStrong },
      strengthScore: slData.score,
      strengthLevel: slData.level,
      tiaoHou: [...new Set(tiaoHou)],
      tongGuan: [...new Set(tongGuan)],
      mainUseful: uSet.slice(0, 2),
      secondaryUseful: uSet.slice(2),
      usefulDeities: uSet,
      harmfulDeities: hSet,
      harmfulMain: hSet.slice(0, 2),
      harmfulSecondary: hSet.slice(2),
      neutralDeities: neutralSet,
      strategy,
      advice: `\u6CE8\u610F${hSet.slice(0, 2).join("\u3001")}\u8FC7\u65FA\u7684\u6D41\u5E74`,
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
      const interactions = calcBranchInteractions([zhis[i], annual.zhi]);
      for (const it of interactions) {
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
    const summaries = {
      "\u5927\u5409": "\u6D41\u5E74\u5927\u5409\uFF0C\u8BF8\u4E8B\u987A\u9042\uFF0C\u5B9C\u79EF\u6781\u8FDB\u53D6",
      "\u5409": "\u6D41\u5E74\u5409\u5229\uFF0C\u8FD0\u52BF\u4E0A\u626C\uFF0C\u628A\u63E1\u673A\u4F1A\u53EF\u6709\u6240\u4F5C\u4E3A",
      "\u5E73": "\u6D41\u5E74\u5E73\u7A33\uFF0C\u6309\u90E8\u5C31\u73ED\uFF0C\u5B9C\u7A33\u4E2D\u6C42\u8FDB",
      "\u51F6": "\u6D41\u5E74\u4E0D\u5229\uFF0C\u8C28\u8A00\u614E\u884C\uFF0C\u6CE8\u610F\u5065\u5EB7\u4E0E\u4EBA\u9645\u5173\u7CFB",
      "\u5927\u51F6": "\u6D41\u5E74\u51F6\u9669\uFF0C\u6295\u8D44\u8C28\u614E\uFF0C\u6CE8\u610F\u5B89\u5168\u4E0E\u7EA0\u7EB7"
    };
    return {
      year: annual.year,
      ganZhi: anGanChar + anZhiChar,
      dayMasterEffect: `${anGanChar}\u4E3A\u65E5\u4E3B\u4E4B${tgStr}`,
      ganHe: ganHeNotes,
      branchInteractions: branchNotes,
      shenShaActivated: [],
      tenGodEffect: tgStr,
      deityEffect: score >= 1 ? "\u7528\u795E\u5E74" : score <= -1 ? "\u5FCC\u795E\u5E74" : "\u5E73",
      overall,
      summary: `${summaries[overall]}\uFF08\u8BC4\u5206${score >= 0 ? "+" : ""}${score}\uFF09`,
      score
    };
  }
  function calcFortuneYears(ff, birthYear) {
    const years = [];
    for (let y = ff.startAge + birthYear; y <= ff.endAge + birthYear; y++) years.push(y);
    return years;
  }
  function analyzeFortuneInteractions(greatFortunes, currentYear, dayGan, allPillars, birthYear, deityAnalysis) {
    return greatFortunes.map((ff) => {
      const years = calcFortuneYears(ff, birthYear);
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
        const yr = [3, 2, 6, 5, 6, 5, 9, 8, 0, 11][ag] || -1;
        const yangRen = yr === az ? "\u7F8A\u5203" : "";
        const lz = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0][ag];
        const lu = lz === az ? "\u7984" : "";
        return { year: y, ganZhi: agC + azC, ganHe, zhiInteraction: zhiInt, shenSha: "", tenGod: tg, fortuneEffect: `${fortuneEff}\u8FD0\u9047${tg}\u5E74`, isUsefulYear: isUseful, color, yangRen, lu, ganHeDetail: ganHe, zhiDetail: zhiInt };
      });
      return { decade: `${ff.ganName}${ff.zhiName}\u8FD0 (${ff.startAge}-${ff.endAge}\u5C81)`, ageRange: `${ff.startAge}-${ff.endAge}`, pillar: `${ff.ganName}${ff.zhiName}`, direction: ff.direction, annualInteractions: annInteractions };
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
    const dp = calcDayPillar(input.year, input.month, input.day);
    const hp = calcHourPillar(dp.gan, hour);
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
    const fortuneInteraction = analyzeFortuneInteractions(gf, cy, dp.gan, pillars, input.year, deityAnalysis);
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
      fortuneInteraction
    };
  }
  return __toCommonJS(src_exports);
})();
