/**
 * sxwnl 适配器 — 统一封装层
 * 将 sxwnl 三份 JS 的全局 API 封装为可调用的 TS 模块。
 * 
 * 浏览器中需在 bundle.iife.js 之前按顺序加载：
 *   sxwnl-eph0.js    (271KB) — JD 基础 + 星表
 *   sxwnl-eph.js     (62KB)  — 星历
 *   sxwnl-jw.js      (58KB)  — 经文
 *   sxwnl-lunar.js   (67KB)  — Lunar/SSQ/oba/obb + 农历
 */

// 声明 sxwnl 全局
declare var Lunar: any;
declare var SSQ: any;
declare var JD: any;
declare var oba: any;
declare var obb: any;

import type { FourPillar, LunarResult, HuangLiInfo, ZeRiQuery, ZeRiResult } from './types';

// ============== 常量 ==============
const TGAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const DZ = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const SX = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
const SHI_CHEN = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const JIE_QI = ['冬至','小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪'];

// ============== 封装类 ==============
export class Sxwnl {
  private lun: any;
  private _year = 0;
  private _month = 0;
  private _day = 0;
  private _dayData: any = null;
  private _lunarMonth = '';
  private _lunarDay = '';
  private _isLeap = false;
  private _lunarYear = 0;

  /** 设置公历日期并计算 sxwnl */
  setSolar(y: number, m: number, d: number): void {
    this._year = y; this._month = m; this._day = d;
    if (typeof Lunar === 'undefined') throw new Error('sxwnl 未加载');
    this.lun = new Lunar();
    this.lun.yueLiCalc(y, m);
    this._dayData = this.lun.lun[d - 1];
    if (!this._dayData) throw new Error(`无效日期: ${y}/${m}/${d}`);
    this._lunarMonth = this._dayData.Lmc || '';
    this._lunarDay = this._dayData.Ldc || '';
    this._isLeap = this._dayData.Lleap === '闰';
    this._lunarYear = this._dayData.Lyear0 || y;
  }

  // ============ 基础属性 ============
  get solarY(): number { return this._year; }
  get solarM(): number { return this._month; }
  get solarD(): number { return this._day; }
  get lunarYear(): number { return this._lunarYear; }
  get lunarMonth(): number { return (['正','二','三','四','五','六','七','八','九','十','冬','腊'].indexOf(this._lunarMonth) || 0) + 1; }
  get lunarDay(): number { return this._dayData ? this._dayData.Ldi + 1 : 0; }
  get Lmc(): string { return (this._isLeap ? '闰' : '') + this._lunarMonth; }
  get Ldc(): string { return this._lunarDay; }
  get Lleap(): boolean { return this._isLeap; }

  // ============ 干支 ============
  /** 年柱 */
  get yearGZ(): string {
    const g = (this._year - 4) % 10, z = (this._year - 4) % 12;
    return TGAN[(g + 10) % 10] + DZ[(z + 12) % 12];
  }
  /** 月柱（基于节气） */
  get monthGZ(): string {
    const yg = (this._year - 4) % 10;
    const jd = this._dayData?.d0 || 0;
    let li = -1;
    for (let i = 3; i < 24; i += 2) { if (SSQ.ZQ[i] <= jd) li = i; }
    const mz = li > 0 ? ((li - 3) / 2 + 2) % 12 : 2;
    const jG = [2, 4, 6, 8, 0][(yg + 10) % 5];
    const mg = (jG + (mz - 2 + 12) % 12) % 10;
    return TGAN[mg] + DZ[mz];
  }
  /** 日柱 */
  get dayGZ(): string {
    const ref = new Date(2000, 0, 1); // 已知2000-01-01 甲子
    const now = new Date(this._year, this._month - 1, this._day);
    const diff = Math.round((now.getTime() - ref.getTime()) / 86400000);
    const g = ((diff + 0) % 10 + 10) % 10;
    const z = ((diff + 0) % 12 + 12) % 12;
    return TGAN[g] + DZ[z];
  }
  get yearPillar(): FourPillar {
    const g = (this._year - 4) % 10, z = (this._year - 4) % 12;
    return { gan: (g + 10) % 10, zhi: (z + 12) % 12, ganName: TGAN[(g + 10) % 10], zhiName: DZ[(z + 12) % 12] };
  }
  get monthPillar(): FourPillar {
    const yg = (this._year - 4) % 10;
    const jd = this._dayData?.d0 || 0;
    let li = -1;
    for (let i = 3; i < 24; i += 2) { if (SSQ.ZQ[i] <= jd) li = i; }
    const mz = li > 0 ? ((li - 3) / 2 + 2) % 12 : 2;
    const jG = [2, 4, 6, 8, 0][(yg + 10) % 5];
    const mg = (jG + (mz - 2 + 12) % 12) % 10;
    return { gan: mg, zhi: mz, ganName: TGAN[mg], zhiName: DZ[mz] };
  }
  get dayPillar(): FourPillar {
    const ref = new Date(2000, 0, 1);
    const now = new Date(this._year, this._month - 1, this._day);
    const diff = Math.round((now.getTime() - ref.getTime()) / 86400000);
    const g = ((diff + 0) % 10 + 10) % 10;
    const z = ((diff + 0) % 12 + 12) % 12;
    return { gan: g, zhi: z, ganName: TGAN[g], zhiName: DZ[z] };
  }
  get dGan(): number { return this.dayPillar.gan; }
  get dZhi(): number { return this.dayPillar.zhi; }

  /** 获取某时辰的时柱 */
  getHourGZ(hourIndex: number): string {
    const dg = this.dGan;
    const hz = hourIndex % 12;
    const offset = [0, 2, 4, 6, 8][dg % 5];
    const hg = (offset + hz) % 10;
    return TGAN[hg] + DZ[hz];
  }

  // ============ 节气 ============
  get jieQi(): string {
    const jd = this._dayData?.d0;
    if (jd === undefined) return '';
    for (let i = 0; i < 24; i++) { if (SSQ.ZQ[i] === jd) return JIE_QI[i]; }
    return '';
  }

  // ============ 阴阳遁 ============
  getYD(): string {
    const jd = this._dayData?.d0 || 0;
    return jd < SSQ.ZQ[12] ? '阳遁' : '阴遁';
  }

  // ============ 三元 ============
  get sanYuan(): string {
    const jd = this._dayData?.d0 || 0;
    let li = -1;
    for (let i = 3; i < 24; i += 2) { if (SSQ.ZQ[i] <= jd) li = i; }
    const jieJd = li >= 0 ? SSQ.ZQ[li] : jd;
    const days = Math.floor(jd - jieJd);
    if (days < 5) return '上元';
    if (days < 10) return '中元';
    return '下元';
  }

  // ============ 冲煞 ============
  get chongSha(): string {
    const chong = [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5];
    const dirs = ['北', '西南', '东北', '东', '东南', '西北', '南', '西南', '东北', '西', '西北', '东南'];
    const cz = chong[this.dZhi];
    return `冲${SX[cz]}煞${dirs[cz]}`;
  }

  // ============ 值神 ============
  get shen(): string {
    const zs = ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];
    return zs[this.dZhi];
  }

  // ============ 建除 ============
  get shierZhi(): string {
    const jc = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
    const mz = (() => {
      const jd = this._dayData?.d0 || 0;
      let li = -1;
      for (let i = 3; i < 24; i += 2) { if (SSQ.ZQ[i] <= jd) li = i; }
      return li > 0 ? ((li - 3) / 2 + 2) % 12 : 2;
    })();
    const ms = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1];
    const sz = ms[(mz - 2 + 12) % 12];
    return jc[(this.dZhi - sz + 12) % 12];
  }

  // ============ 彭祖百忌 ============
  get pengZu(): string[] {
    const gan: Record<number, string> = {0:'甲不开仓',1:'乙不栽植',2:'丙不修灶',3:'丁不剃头',4:'戊不受田',5:'己不破券',6:'庚不经络',7:'辛不合酱',8:'壬不泱水',9:'癸不词讼'};
    const zhi: Record<number, string> = {0:'子不问卜',1:'丑不冠带',2:'寅不祭祀',3:'卯不穿井',4:'辰不哭泣',5:'巳不远行',6:'午不苫盖',7:'未不服药',8:'申不安床',9:'酉不宴客',10:'戌不吃犬',11:'亥不嫁娶'};
    return [gan[this.dGan] || '', zhi[this.dZhi] || ''];
  }

  // ============ 方位 ============
  get xiShen(): string { return ['东北','西北','西南','正南','东南','东北','西北','西南','正南','东南'][this.dGan]; }
  get caiShen(): string { return ['东北','正东','正南','西南','正北','东北','正东','正南','西南','正北'][this.dGan]; }
  get fuShen(): string { return ['正北','正北','西北','正南','东南','正北','西北','西北','东南','正南'][this.dGan]; }
  get yangGui(): string { return ['西南','正西','西北','正北','东北','西南','正西','西北','正北','东北'][this.dGan]; }
  get yinGui(): string { return ['正北','东北','正西','西南','西北','正北','东北','正西','西南','西北'][this.dGan]; }
  get taiShen(): string { return ['正北','东北','东北','正东','东南','东南','正南','西南','西南','正西','西北','西北'][this._year % 12]; }

  // ============ 吉神凶神 ============
  get jiJi(): string {
    const mz = this.monthPillar.zhi;
    const dg = this.dGan, dz = this.dZhi;
    const gods: string[] = [];
    const yd: Record<number, number> = {0:0,1:6,2:2,3:8,4:4,5:10,6:0,7:6,8:2,9:8,10:4,11:10};
    const td: Record<number, number> = {0:8,1:6,2:4,3:2,4:0,5:10,6:8,7:6,8:4,9:2,10:0,11:10};
    if (dz === yd[mz]) gods.push('月德');
    if (dz === td[mz]) gods.push('天德');
    const sea = Math.floor(mz / 3) % 4;
    if ((sea === 0 && dg === 4 && dz === 2) || (sea === 1 && dg === 0 && dz === 6) ||
        (sea === 2 && dg === 4 && dz === 8) || (sea === 3 && dg === 0 && dz === 0)) gods.push('天赦');
    return gods.join(' ');
  }
  get xiongSha(): string {
    const dg = this.dGan, dz = this.dZhi;
    const evils: string[] = [];
    if (dz === 1 || dz === 7) evils.push('四离');
    if (dz === 0 || dz === 6) evils.push('四绝');
    return evils.join(' ');
  }

  // ============ 宜忌 ============
  get yiList(): string[] {
    const items: string[] = [];
    if (['除', '满', '平', '定', '执', '成', '开'].includes(this.shierZhi)) items.push('祭祀');
    if (['建', '满', '定', '成', '开'].includes(this.shierZhi)) items.push('嫁娶');
    if (['除', '定', '成', '开'].includes(this.shierZhi)) items.push('出行');
    return items;
  }
  get jiList(): string[] {
    const items: string[] = [];
    if (['破', '闭'].includes(this.shierZhi)) items.push('开市');
    if (['建', '破'].includes(this.shierZhi)) items.push('动土');
    return items;
  }

  // ============ 时辰吉凶 ============
  get hourJiXing(): string[] {
    return Array.from({ length: 12 }, (_, i) => {
      const zs = ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];
      const ok = [true, true, false, false, true, true, false, true, false, false, true, false];
      const idx = (this.dZhi + i) % 12;
      return ok[idx] ? '吉' : '凶';
    });
  }
  get hourYi(): string[][] { return [[],[],['祈福','求嗣'],['开市','立券'],['修造','动土'],['出行','求财'],['祭祀','祈福'],['修造','入宅'],['出行','求财'],['开市','立券'],['修造','动土'],['嫁娶','入宅']]; }
  get hourJi(): string[][] { return [[],['出行'],['开市'],['祭祀'],['出行'],['开市'],['开市'],['出行'],['开市'],['祭祀'],['出行'],['祭祀']]; }
}

// ============== 导出函数 ==============
export function solarToLunar(y: number, m: number, d: number): LunarResult {
  const cal = new Sxwnl();
  cal.setSolar(y, m, d);
  return {
    solarYear: y, solarMonth: m, solarDay: d,
    lunarYear: cal.lunarYear,
    lunarMonth: cal.lunarMonth,
    lunarDay: cal.lunarDay,
    isLeapMonth: cal.Lleap,
    yearPillar: cal.yearPillar,
    monthPillar: cal.monthPillar,
    dayPillar: cal.dayPillar,
    solarTerm: cal.jieQi,
    isYangDun: cal.getYD() === '阳遁',
    sanYuan: cal.sanYuan,
    yiList: cal.yiList,
    jiList: cal.jiList,
    chongSha: cal.chongSha,
    lunarMonthName: cal.Lmc,
    lunarDayName: cal.Ldc,
  } as any;
}

export function getHuangLi(y: number, m: number, d: number): HuangLiInfo {
  const cal = new Sxwnl();
  cal.setSolar(y, m, d);
  const chongAnimal = cal.chongSha.match(/冲(.+?)煞/)?.[1] || '';
  const luckyGods = cal.jiJi.split(' ').filter(Boolean);
  const evilGods = cal.xiongSha.split(' ').filter(Boolean);
  const hourList = Array.from({ length: 12 }, (_, h) => ({
    hourIndex: h, hourGZ: cal.getHourGZ(h), hourName: SHI_CHEN[h],
    isGood: cal.hourJiXing[h] === '吉',
    hourYi: cal.hourYi[h] || [], hourJi: cal.hourJi[h] || [],
  }));
  return {
    yearGZ: cal.yearGZ, monthGZ: cal.monthGZ, dayGZ: cal.dayGZ,
    lunarMonth: cal.Lmc, lunarDay: cal.Ldc, lunarLeap: cal.Lleap,
    solarTerm: cal.jieQi,
    chongSha: cal.chongSha, chongAnimal,
    valueGod: cal.shen, jianChu: cal.shierZhi, pengZu: cal.pengZu,
    good: cal.yiList, bad: cal.jiList,
    luckyGods, evilGods,
    xiShen: cal.xiShen, caiShen: cal.caiShen, fuShen: cal.fuShen,
    yangGui: cal.yangGui, yinGui: cal.yinGui, taiShen: cal.taiShen,
    hourList,
    isYangDun: cal.getYD() === '阳遁', sanYuan: cal.sanYuan,
  };
}

/** 区间择日 */
export function searchZeRi(query: ZeRiQuery): ZeRiResult[] {
  const { targetWork, avoidAnimal, needHuangDao } = query;
  const result: ZeRiResult[] = [];
  const huangDao = ['青龙', '明堂', '金匮', '天德', '玉堂', '司命'];
  let y = query.startY, m = query.startM, d = query.startD;
  const end = new Date(query.endY, query.endM - 1, query.endD).getTime();
  while (new Date(y, m - 1, d).getTime() <= end) {
    try {
      const hl = getHuangLi(y, m, d);
      const matchGood = hl.good.filter(g => g.includes(targetWork));
      if (matchGood.length === 0) { d++; continue; }
      if (avoidAnimal && hl.chongAnimal === avoidAnimal) { d++; continue; }
      const isHd = huangDao.includes(hl.valueGod);
      if (needHuangDao && !isHd) { d++; continue; }
      result.push({
        dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        lunarStr: `${hl.yearGZ}年 ${hl.lunarMonth}月${hl.lunarDay}`,
        dayGZ: hl.dayGZ, jianChu: hl.jianChu, valueGod: hl.valueGod,
        chongSha: hl.chongSha, matchGood, isHuangDao: isHd, fullHuangLi: hl,
      });
    } catch (e) { /* 无效日期跳过 */ }
    d++;
    if (d > 31) { d = 1; m++; }
    if (m > 12) { m = 1; y++; }
  }
  return result;
}
