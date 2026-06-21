/**
 * sxwnl 适配器 — 纯 TS 声明 + 内联 Sxwnl 封装类
 * 不 import sxwnl JS 文件（由 index.html 的 <script> 加载）
 * 仅 declare 全局类型，Sxwnl 类直接内联定义
 */
declare var Lunar: any;
declare var SSQ: any;
declare var JD: any;
declare var oba: any;
declare var obb: any;

import type { LunarResult, HuangLiInfo, HourInfo, ZeRiQuery, ZeRiResult } from './types';

// ====== 常量 ======
const TG = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const DZ = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const SX = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
const JQ = ['冬至','小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪'];
const ZS = ['青龙','明堂','天刑','朱雀','金匮','天德','白虎','玉堂','天牢','玄武','司命','勾陈'];
const HD = new Set(['青龙','明堂','金匮','天德','玉堂','司命']);
const JC = ['建','除','满','平','定','执','破','危','成','收','开','闭'];
const PG = ['甲不开仓','乙不栽植','丙不修灶','丁不剃头','戊不受田','己不破券','庚不经络','辛不合酱','壬不泱水','癸不词讼'];
const PZ = ['子不问卜','丑不冠带','寅不祭祀','卯不穿井','辰不哭泣','巳不远行','午不苫盖','未不服药','申不安床','酉不宴客','戌不吃犬','亥不嫁娶'];
const XI = ['东北','西北','西南','正南','东南','东北','西北','西南','正南','东南'];
const CA = ['东北','正东','正南','西南','正北','东北','正东','正南','西南','正北'];
const FU = ['正北','正北','西北','正南','东南','正北','西北','西北','东南','正南'];
const YG2 = ['西南','正西','西北','正北','东北','西南','正西','西北','正北','东北'];
const YI = ['正北','东北','正西','西南','西北','正北','东北','正西','西南','西北'];
const TS = ['正北','东北','东北','正东','东南','东南','正南','西南','西南','正西','西北','西北'];
const XX: Record<number,string> = {0:'虚日鼠',1:'危月燕',2:'室火猪',3:'壁水貐',4:'奎木狼',5:'娄金狗',6:'胃土雉',7:'昴日鸡',8:'毕月乌',9:'觜火猴',10:'参水猿',11:'井木犴'};
const YD: Record<number,number> = {0:0,1:6,2:2,3:8,4:4,5:10,6:0,7:6,8:2,9:8,10:4,11:10};
const TD: Record<number,number> = {0:8,1:6,2:4,3:2,4:0,5:10,6:8,7:6,8:4,9:2,10:0,11:10};
const HOUR_OK = [true,true,false,false,true,true,false,true,false,false,true,false];

// ====== Sxwnl 封装类 ======
export class Sxwnl {
 private _y=0; private _m=0; private _d=0; private _day: any=null; private _lunar: any=null;

 static loaded(): boolean { return typeof Lunar !== 'undefined'; }

 setSolar(y: number, m: number, d: number): void {
  this._y=y; this._m=m; this._d=d;
  if (!Sxwnl.loaded()) throw new Error('sxwnl not loaded');
  this._lunar = new Lunar();
  this._lunar.yueLiCalc(y, m);
  this._day = this._lunar.lun[d - 1];
  if (!this._day) throw new Error(`无效日期: ${y}/${m}/${d}`);
 }

 private _mz(): number {
  let li=-1; for(let i=3;i<24;i+=2) if(SSQ.ZQ[i]<=this._day.d0) li=i;
  return li>0?((li-3)/2+2)%12:2;
 }

 // 干支
 get yearGZ(): string { return TG[(this._y-4)%10]+DZ[(this._y-4)%12]; }
 get monthGZ(): string {
  const mz=this._mz();
  return TG[([2,4,6,8,0][(this._y-4)%5]+(mz-2+12)%12)%10]+DZ[mz];
 }
 get dayGZ(): string {
  try {
   const ec=(window as any).BaZi?.calculateBaZi?.({year:this._y,month:this._m,day:this._d,hour:12,minute:0,gender:'male'});
   if(ec?.pillars) return ec.pillars.day.ganName+ec.pillars.day.zhiName;
  } catch {}
  const diff=Math.round((Date.UTC(this._y,this._m-1,this._d)-Date.UTC(2000,0,1))/86400000)+2;
  return TG[(diff%10+10)%10]+DZ[(diff%12+12)%12];
 }
 get dg(): number { return TG.indexOf(this.dayGZ[0]); }
 get dz(): number { return DZ.indexOf(this.dayGZ[1]); }
 getDaoGZ(h: number): string { return TG[([0,2,4,6,8][this.dg%5]+h%12)%10]+DZ[h%12]; }

 // 节气 / 遁 / 三元
 get jieQi(): string { if(!this._day)return ''; for(let i=0;i<24;i++)if(SSQ.ZQ[i]===this._day.d0)return JQ[i]; return ''; }
 get isYangDun(): boolean { return (this._day?.d0??0)<SSQ.ZQ[12]; }
 get sanYuan(): string {
  let li=-1; for(let i=3;i<24;i+=2) if(SSQ.ZQ[i]<=this._day.d0) li=i;
  const ds=Math.floor(this._day.d0-SSQ.ZQ[li>0?li:3]);
  return ds<5?'上元':ds<10?'中元':'下元';
 }

 // 冲煞
 get chongSha(): string {
  const c=[6,7,8,9,10,11,0,1,2,3,4,5][this.dz];
  return `冲${SX[c]}煞${['北','西南','东北','东','东南','西北','南','西南','东北','西','西北','东南'][c]}`;
 }
 get chongAnimal(): string { return SX[[6,7,8,9,10,11,0,1,2,3,4,5][this.dz]]; }

 // 值神 / 黄道
 get shen(): string { return ZS[this.dz]; }
 get isHuangDao(): boolean { return HD.has(this.shen); }

 // 建除
 get shierZhi(): string {
  return JC[(this.dz-[2,3,4,5,6,7,8,9,10,11,0,1][(this._mz()-2+12)%12]+12)%12];
 }

 // 彭祖 / 星宿
 get pengZu(): string { return PG[this.dg]+' '+PZ[this.dz]; }
 get xingSu(): string { return XX[this.dz%12]??''; }

 // 方位
 get xiShen(): string { return XI[this.dg]; }
 get caiShen(): string { return CA[this.dg]; }
 get fuShen(): string { return FU[this.dg]; }
 get yangGui(): string { return YG2[this.dg]; }
 get yinGui(): string { return YI[this.dg]; }
 get taiShen(): string { return TS[this._y%12]; }

 // 吉凶神
 get luckyGods(): string[] {
  const r:string[]=[];const dz=this.dz,mz=this._mz();
  if(dz===YD[mz]) r.push('月德');
  if(dz===TD[mz]) r.push('天德');
  return r;
 }
 get evilGods(): string[] { return [1,7].includes(this.dz)?['四离']:[]; }

 // 宜忌
 get good(): string[] {
  const j=this.shierZhi; const r:string[]=[];
  if(['除','满','平','定','执','成','开'].includes(j)) r.push('祭祀');
  if(['建','满','定','成','开'].includes(j)) r.push('嫁娶');
  if(['除','定','成','开'].includes(j)) r.push('出行');
  return r;
 }
 get bad(): string[] {
  const j=this.shierZhi; const r:string[]=[];
  if(['破','闭'].includes(j)) r.push('开市');
  if(['建','破'].includes(j)) r.push('动土');
  return r;
 }

 // 时辰
 get hourList(): HourInfo[] {
  return Array.from({length:12},(_,i)=>({
   hourIndex:i, hourGZ:this.getDaoGZ(i), hourName:DZ[i],
   isGood:HOUR_OK[(this.dz+i)%12],
   hourYi:[] as string[], hourJi:[] as string[],
  }));
 }
}

// ====== solarToLunar ======
export function solarToLunar(y:number,m:number,d:number): LunarResult {
 const c=new Sxwnl(); c.setSolar(y,m,d);
 return { solarY:y, solarM:m, solarD:d,
  lunarY:c.lunarYear, lunarM:c.lunarMonth, lunarD:c.lunarDay, isLeapMonth:!!c.Lleap,
  yearPillar:c.yearGZ, monthPillar:c.monthGZ, dayPillar:c.dayGZ,
  solarTerm:c.jieQi, isYangDun:c.isYangDun, sanYuan:c.sanYuan,
  yiList:c.good, jiList:c.bad, chongSha:c.chongSha };
}

// ====== getHuangLi ======
export function getHuangLi(y:number,m:number,d:number): HuangLiInfo {
 const c=new Sxwnl(); c.setSolar(y,m,d);
 return {
  yearGZ:c.yearGZ, monthGZ:c.monthGZ, dayGZ:c.dayGZ,
  lunarMonth:c.Lmc, lunarDay:c.Ldc, lunarLeap:!!c.Lleap,
  solarTerm:c.jieQi, chongSha:c.chongSha, chongAnimal:c.chongAnimal,
  valueGod:c.shen, jianChu:c.shierZhi, isHuangDao:c.isHuangDao,
  pengZu:c.pengZu, xingSu:c.xingSu,
  good:c.good, bad:c.bad, luckyGods:c.luckyGods, evilGods:c.evilGods,
  xiShen:c.xiShen, caiShen:c.caiShen, fuShen:c.fuShen,
  yangGui:c.yangGui, yinGui:c.yinGui, taiShen:c.taiShen,
  hourList:c.hourList, isYangDun:c.isYangDun, sanYuan:c.sanYuan,
 };
}

// ====== searchZeRi ======
export function searchZeRi(q:ZeRiQuery): ZeRiResult[] {
 const r:ZeRiResult[]=[];
 const cur=new Date(q.startY,q.startM-1,q.startD);
 const end=new Date(q.endY,q.endM-1,q.endD);
 while(cur<=end){
  const y=cur.getFullYear(),m=cur.getMonth()+1,d=cur.getDate();
  try{
   const hl=getHuangLi(y,m,d);
   const mg=hl.good.filter(g=>g.includes(q.targetWork));
   if(!mg.length||(q.avoidAnimal&&hl.chongAnimal===q.avoidAnimal)||(q.needHuangDao&&!hl.isHuangDao)){
    cur.setDate(cur.getDate()+1); continue;
   }
   r.push({ dateStr:`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`,
    lunarStr:`${hl.yearGZ}年${hl.lunarLeap?'闰':''}${hl.lunarMonth}月${hl.lunarDay}`,
    dayGZ:hl.dayGZ, jianChu:hl.jianChu, valueGod:hl.valueGod,
    chongSha:hl.chongSha, matchGood:mg, isHuangDao:hl.isHuangDao, fullHuangLi:hl });
  }catch(e){}
  cur.setDate(cur.getDate()+1);
 }
 return r;
}
