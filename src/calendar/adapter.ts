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
    // 优先使用 BaZi 引擎计算（准确）
    const bz = typeof BaZi !== 'undefined' ? BaZi.calculateBaZi({year:this._year,month:this._month,day:this._day,hour:12,minute:0,gender:'male'}) : null;
    if(bz&&bz.pillars) return bz.pillars.day.ganName+bz.pillars.day.zhiName;
    // 降级计算（参考 2000-01-01 甲子）
    const ref = new Date(Date.UTC(2000,0,1));
    const now = new Date(Date.UTC(this._year, this._month-1, this._day));
    const diff = Math.round((now.getTime()-ref.getTime())/86400000) + 2;
    const g = (diff%10+10)%10;
    const z = (diff%12+12)%12;
    return TGAN[g]+DZ[z];
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
