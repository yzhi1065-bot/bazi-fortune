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
function correctToTrueSolar(input) {
  if (!input.useTrueSolar || input.longitude === void 0) {
    return { hour: input.hour, minute: input.minute };
  }
  return { hour: input.hour, minute: input.minute };
}

// src/wuxing.ts
function calcFiveElementScore(pillars, hiddenStems) {
  const s = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  for (const p of pillars) {
    s[GAN_WU_XING[p.gan]] += 3;
  }
  for (const p of pillars) {
    s[ZHI_WU_XING[p.zhi]] += 2;
  }
  for (const grp of hiddenStems) {
    for (const h of grp) {
      s[h.element] += 1;
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
var H = { 0: [9], 1: [5, 9, 7], 2: [0, 2, 4], 3: [1], 4: [4, 1, 9], 5: [2, 6, 4], 6: [3, 5, 1], 7: [5, 3, 1], 8: [6, 8, 4], 9: [7], 10: [7, 3, 4], 11: [8, 0] };
function getHiddenStems(zhi) {
  return (H[zhi] ?? []).map((gan) => ({ gan, ganName: TIAN_GAN[gan], element: GAN_WU_XING[gan] }));
}
function getFourPillarHiddenStems(zhis) {
  return zhis.map((z) => getHiddenStems(z));
}

// src/tengods.ts
var MAP = { "0": ["\u52AB\u8D22", "\u6BD4\u80A9"], "1": ["\u4F24\u5B98", "\u98DF\u795E"], "2": ["\u6B63\u8D22", "\u504F\u8D22"], "3": ["\u6B63\u5B98", "\u4E03\u6740"], "4": ["\u6B63\u5370", "\u504F\u5370"] };
function calcTenGod(dg, t) {
  const r = ((Math.floor(t / 2) - Math.floor(dg / 2)) % 5 + 5) % 5;
  const sy = dg % 2 !== t % 2;
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
    for (let i = terms.length - 1; i >= 0; i--) {
      const tm = Math.floor(terms[i] / 100);
      const td = terms[i] % 100;
      const termDate = new Date(year, tm - 1, td);
      if (termDate < birth) {
        diff = Math.round((birth.getTime() - termDate.getTime()) / 864e5);
        break;
      }
    }
    if (diff === 0) {
      const pterms = getSolarTermDays(year - 1, "jie");
      for (let i = pterms.length - 1; i >= 0; i--) {
        const tm = Math.floor(pterms[i] / 100);
        const td = pterms[i] % 100;
        if (tm < 2) continue;
        const termDate = new Date(year - 1, tm - 1, td);
        if (termDate < birth) {
          diff = Math.round((birth.getTime() - termDate.getTime()) / 864e5);
          break;
        }
      }
    }
  }
  return Math.max(0, Math.min(120, Math.floor(diff / 3)));
}
function calcGreatFortunes(sa, mp, dir, dg) {
  const f = [];
  const d = dir.indexOf("\u987A") === 0 ? 1 : -1;
  for (let i = 0; i < 8; i++) {
    const gan = ((mp.gan + d * i) % 10 + 10) % 10;
    const zhi = ((mp.zhi + d * i) % 12 + 12) % 12;
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
  0: [1, "\u7532\u4E59\u5408\u5316\u571F"],
  1: [0, "\u4E59\u7532\u5408\u5316\u571F"],
  2: [3, "\u4E19\u4E01\u5408\u5316\u91D1"],
  3: [2, "\u4E01\u4E19\u5408\u5316\u91D1"],
  4: [5, "\u620A\u5DF1\u5408\u5316\u6C34"],
  5: [4, "\u5DF1\u620A\u5408\u5316\u6C34"],
  6: [7, "\u5E9A\u8F9B\u5408\u5316\u6728"],
  7: [6, "\u8F9B\u5E9A\u5408\u5316\u6728"],
  8: [9, "\u58EC\u7678\u5408\u5316\u706B"],
  9: [8, "\u7678\u58EC\u5408\u5316\u706B"]
};
var Z6 = {
  0: [1, "\u5B50\u4E11\u5408\u5316\u571F"],
  1: [0, "\u4E11\u5B50\u5408\u5316\u571F"],
  2: [11, "\u5BC5\u4EA5\u5408\u5316\u6728"],
  3: [10, "\u536F\u620C\u5408\u5316\u706B"],
  4: [9, "\u8FB0\u9149\u5408\u5316\u91D1"],
  5: [8, "\u5DF3\u7533\u5408\u5316\u6C34"],
  6: [7, "\u5348\u672A\u5408\u5316\u571F"],
  7: [6, "\u672A\u5348\u5408\u5316\u571F"],
  8: [5, "\u7533\u5DF3\u5408\u5316\u6C34"],
  9: [4, "\u9149\u8FB0\u5408\u5316\u91D1"],
  10: [3, "\u620C\u536F\u5408\u5316\u706B"],
  11: [2, "\u4EA5\u5BC5\u5408\u5316\u6728"]
};
var C = { 0: 6, 1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 0, 7: 1, 8: 2, 9: 3, 10: 4, 11: 5 };
var HX = { 0: 7, 1: 6, 2: 5, 3: 4, 4: 3, 5: 2, 6: 1, 7: 0, 8: 11, 9: 10, 10: 9, 11: 8 };
function calcGanCombinations(gans) {
  const r = [];
  for (let i = 0; i < gans.length; i++) for (let j = i + 1; j < gans.length; j++) {
    const p = G5[gans[i]];
    if (p && p[0] === gans[j]) r.push({ type: "\u5929\u5E72\u4E94\u5408", description: p[1], left: TIAN_GAN[gans[i]], right: TIAN_GAN[gans[j]] });
  }
  return r;
}
function calcBranchInteractions(zhis) {
  const r = [];
  for (let i = 0; i < zhis.length; i++) for (let j = i + 1; j < zhis.length; j++) {
    const p = Z6[zhis[i]];
    if (p && p[0] === zhis[j]) r.push({ type: "\u516D\u5408", description: p[1], left: DI_ZHI[zhis[i]], right: DI_ZHI[zhis[j]] });
    if (C[zhis[i]] === zhis[j]) r.push({ type: "\u516D\u51B2", description: DI_ZHI[zhis[i]] + DI_ZHI[zhis[j]] + "\u76F8\u51B2", left: DI_ZHI[zhis[i]], right: DI_ZHI[zhis[j]] });
    if (HX[zhis[i]] === zhis[j]) r.push({ type: "\u516D\u5BB3", description: DI_ZHI[zhis[i]] + DI_ZHI[zhis[j]] + "\u76F8\u5BB3", left: DI_ZHI[zhis[i]], right: DI_ZHI[zhis[j]] });
  }
  const Z3 = [
    [0, 4, 8, "\u7533\u5B50\u8FB0\u5408\u6C34\u5C40"],
    [1, 5, 9, "\u5DF3\u9149\u4E11\u5408\u91D1\u5C40"],
    [2, 6, 10, "\u5BC5\u5348\u620C\u5408\u706B\u5C40"],
    [3, 7, 11, "\u4EA5\u536F\u672A\u5408\u6728\u5C40"]
  ];
  for (const [a, b, c, d] of Z3) {
    if (zhis.includes(a) && zhis.includes(b) && zhis.includes(c)) r.push({ type: "\u4E09\u5408", description: d, left: DI_ZHI[a], right: DI_ZHI[b], third: DI_ZHI[c] });
  }
  if (zhis.includes(1) && zhis.includes(7) && zhis.includes(10)) r.push({ type: "\u4E09\u5211", description: DI_ZHI[1] + DI_ZHI[7] + DI_ZHI[10] + "\u4E09\u5211", left: DI_ZHI[1], right: DI_ZHI[7], third: DI_ZHI[10] });
  if (zhis.includes(0) && zhis.includes(3)) r.push({ type: "\u76F8\u5211", description: DI_ZHI[0] + DI_ZHI[3] + "\u76F8\u5211", left: DI_ZHI[0], right: DI_ZHI[3] });
  for (const z of [4, 6, 9, 11]) {
    if (zhis.filter((v) => v === z).length >= 2) r.push({ type: "\u81EA\u5211", description: DI_ZHI[z] + "\u81EA\u5211", left: DI_ZHI[z] });
  }
  return r;
}
function calcAllInteractions(pillars) {
  return [...calcGanCombinations(pillars.map((p) => p.gan)), ...calcBranchInteractions(pillars.map((p) => p.zhi))];
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
  42662,
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
var MN = ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u8CBC"];
var DN = ["\u521D\u4E00", "\u521D\u4E8C", "\u521D\u4E09", "\u521D\u56DB", "\u521D\u4E94", "\u521D\u516D", "\u521D\u4E03", "\u521D\u516B", "\u521D\u4E5D", "\u521D\u5341", "\u5341\u4E00", "\u5341\u4E8C", "\u5341\u4E09", "\u5341\u56DB", "\u5341\u4E94", "\u5341\u516D", "\u5341\u4E03", "\u5341\u516B", "\u5341\u4E5D", "\u4E8C\u5341", "\u5EFF\u4E00", "\u5EFF\u4E8C", "\u5EFF\u4E09", "\u5EFF\u56DB", "\u5EFF\u4E94", "\u5EFF\u516D", "\u5EFF\u4E03", "\u5EFF\u516B", "\u5EFF\u4E5D", "\u4E09\u5341"];
var TG = ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"];
var DZ = ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"];
function solarToLunar(y, m, d) {
  const idx = y - 1900;
  if (idx < 0 || idx >= LN.length) return fallback(y);
  const info = LN[idx];
  const leapM = info & 15;
  const md = [];
  for (let i = 0; i < 12; i++) md.push(info >> 15 - i & 1 ? 30 : 29);
  const target = new Date(y, m - 1, d);
  const spring = { month: 2, day: 1 };
  const sDate = new Date(y, spring.month - 1, spring.day);
  let off = Math.round((target.getTime() - sDate.getTime()) / 864e5);
  if (off < 0) return solarToLunar(y - 1, m, d);
  let lm = 1, ld = 1, passed = false;
  for (let i = 0; i < 12; i++) {
    if (i + 1 === leapM && !passed && leapM > 0) {
      const leapD = info >> 16 & 1 ? 30 : 29;
      if (off < leapD) {
        lm = leapM;
        ld = off + 1;
        return build(y, lm, ld, true);
      }
      off -= leapD;
      passed = true;
      i--;
      continue;
    }
    if (off < md[i]) {
      lm = i + 1;
      ld = off + 1;
      return build(y, lm, ld, false);
    }
    off -= md[i];
  }
  return build(y, lm, ld, false);
}
function build(y, m, d, leap) {
  return { year: y, lunarYearGz: TG[(y - 4) % 10] + DZ[(y - 4) % 12], month: m, monthName: leap ? "\u95FB" + MN[m - 1] : MN[m - 1], day: d, dayName: DN[d - 1] ?? d + "\u65E5", isLeap: leap, zodiac: SHENG_XIAO[((y - 4) % 12 + 12) % 12] };
}
function fallback(y) {
  return { year: y, lunarYearGz: TG[(y - 4) % 10] + DZ[(y - 4) % 12], month: 1, monthName: "\u672A\u77E5", day: 1, dayName: "\u672A\u77E5", isLeap: false, zodiac: SHENG_XIAO[((y - 4) % 12 + 12) % 12] };
}

// src/shensha.ts
var TIAN_YI = {
  0: [1, 7],
  // 甲→丑未
  4: [1, 7],
  // 戊→丑未
  6: [1, 7],
  // 庚→丑未
  1: [0, 8],
  // 乙→子申
  5: [0, 8],
  // 己→子申
  2: [11, 9],
  // 丙→亥酉
  3: [11, 9],
  // 丁→亥酉
  7: [2, 6],
  // 辛→寅午
  8: [3, 5],
  // 壬→卯巳
  9: [3, 5]
  // 癸→卯巳
};
var WEN_CHANG = {
  0: 5,
  // 甲→巳
  1: 6,
  // 乙→午
  2: 8,
  // 丙→申
  4: 8,
  // 戊→申
  3: 9,
  // 丁→酉
  5: 9,
  // 己→酉
  6: 11,
  // 庚→亥
  7: 0,
  // 辛→子
  8: 2,
  // 壬→寅
  9: 3
  // 癸→卯
};
var TAO_HUA = {
  2: 3,
  6: 3,
  10: 3,
  // 寅午戌→卯
  0: 9,
  4: 9,
  8: 9,
  // 申子辰→酉
  3: 0,
  7: 0,
  11: 0,
  // 亥卯未→子
  1: 6,
  5: 6,
  9: 6
  // 巳酉丑→午
};
var YI_MA = {
  2: 8,
  6: 8,
  10: 8,
  // 寅午戌→申
  0: 2,
  4: 2,
  8: 2,
  // 申子辰→寅
  3: 5,
  7: 5,
  11: 5,
  // 亥卯未→巳
  1: 11,
  5: 11,
  9: 11
  // 巳酉丑→亥
};
var HUA_GAI = {
  2: 10,
  6: 10,
  10: 10,
  // 寅午戌→戌
  0: 4,
  4: 4,
  8: 4,
  // 申子辰→辰
  3: 7,
  7: 7,
  11: 7,
  // 亥卯未→未
  1: 1,
  5: 1,
  9: 1
  // 巳酉丑→丑
};
var JIANG_XING = {
  2: 6,
  6: 6,
  10: 6,
  // 寅午戌→午
  0: 0,
  4: 0,
  8: 0,
  // 申子辰→子
  3: 3,
  7: 3,
  11: 3,
  // 亥卯未→卯
  1: 9,
  5: 9,
  9: 9
  // 巳酉丑→酉
};
function calcShenSha(dg, yz, pillars) {
  const result = [];
  const zhis = pillars.map((p) => p.zhi);
  const ty = TIAN_YI[dg] ?? [];
  for (const z of ty) {
    if (zhis.includes(z)) {
      result.push({ name: "\u5929\u4E59\u8D35\u4EBA", type: "\u5409" });
      break;
    }
  }
  const wc = WEN_CHANG[dg];
  if (zhis.includes(wc)) {
    result.push({ name: "\u6587\u660C\u8D35\u4EBA", type: "\u5409" });
  }
  const th = TAO_HUA[yz];
  if (zhis.includes(th)) {
    result.push({ name: "\u6843\u82B1", type: "\u4E2D\u6027" });
  }
  const ym = YI_MA[yz];
  if (zhis.includes(ym)) {
    result.push({ name: "\u9A7F\u9A6C", type: "\u4E2D\u6027" });
  }
  const hg = HUA_GAI[yz];
  if (zhis.includes(hg)) {
    result.push({ name: "\u534E\u76D6", type: "\u4E2D\u6027" });
  }
  const jx = JIANG_XING[yz];
  if (zhis.includes(jx)) {
    result.push({ name: "\u5C06\u661F", type: "\u5409" });
  }
  return result;
}
function calcShenShaForBranch(dg, yz, zhi) {
  const r = [];
  const ty = TIAN_YI[dg] ?? [];
  if (ty.includes(zhi)) r.push({ name: "\u5929\u4E59\u8D35\u4EBA", type: "\u5409" });
  if (WEN_CHANG[dg] === zhi) r.push({ name: "\u6587\u660C\u8D35\u4EBA", type: "\u5409" });
  if (TAO_HUA[yz] === zhi) r.push({ name: "\u6843\u82B1", type: "\u4E2D\u6027" });
  if (YI_MA[yz] === zhi) r.push({ name: "\u9A7F\u9A6C", type: "\u4E2D\u6027" });
  if (HUA_GAI[yz] === zhi) r.push({ name: "\u534E\u76D6", type: "\u4E2D\u6027" });
  if (JIANG_XING[yz] === zhi) r.push({ name: "\u5C06\u661F", type: "\u5409" });
  return r;
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
  const shenSha = calcShenSha(dp.gan, yp.zhi, pillars);
  const shenShaDetail = zhis.map((z) => calcShenShaForBranch(dp.gan, yp.zhi, z));
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
    solarTermNote: void 0,
    shenSha,
    shenShaDetail
  };
}
export {
  DI_ZHI,
  GAN_WU_XING,
  MONTH_ZHI_FROM_TERM,
  SHENG_XIAO,
  TIAN_GAN,
  ZHI_WU_XING,
  calcAllInteractions,
  calcBranchInteractions,
  calcFiveElementScore,
  calcGanCombinations,
  calcGanTenGods,
  calcShenSha,
  calcShenShaForBranch,
  calcTenGod,
  calcZhiTenGods,
  calculateBaZi,
  getDayMasterInfo,
  getFourPillarHiddenStems,
  getFourPillarNaYin,
  getHiddenStems,
  getNaYin,
  solarToLunar
};
