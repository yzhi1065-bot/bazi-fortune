/**
 * sxwnl 适配器 — Sxwnl 封装类 + solarToLunar/getHuangLi/searchZeRi
 * 基于 sxwnl 寿星万年历
 */
declare var Lunar: any;
declare var SSQ: any;
declare var JD: any;
declare var oba: any;
declare var obb: any;

import type { LunarResult, HuangLiInfo, ZeRiQuery, ZeRiResult } from './types';

const TGAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const DZ = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const SHI_CHEN = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const JQ = ['冬至','小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪'];
const HD = ['青龙','明堂','金匮','天德','玉堂','司命'];

export class Sxwnl {
  private lun: any; private _y=0; private _m=0; private _d=0; private _day: any=null;
  static loaded(): boolean { return typeof Lunar!=='undefined'; }
  setSolar(y: number, m: number, d: number): void {
    this._y=y; this._m=m; this._d=d;
    if(!Sxwnl.loaded()) throw new Error('sxwnl not loaded');
    this.lun=new Lunar(); this.lun.yueLiCalc(y,m);
    this._day=this.lun.lun[d-1];
  }
  private _mz(): number {
    let li=-1; for(let i=3;i<24;i+=2) if(SSQ.ZQ[i]<=this._day.d0) li=i;
    return li>0?((li-3)/2+2)%12:2;
  }
  get yearGZ(): string { return TGAN[(this._y-4)%10]+DZ[(this._y-4)%12]; }
  get monthGZ(): string {
    const mz=this._mz();
    return TGAN[([2,4,6,8,0][(this._y-4)%5]+(mz-2+12)%12)%10]+DZ[mz];
  }
  get dayGZ(): string {
    const ec=typeof BaZi!=='undefined'?BaZi.calculateBaZi({year:this._y,month:this._m,day:this._d,hour:12,minute:0,gender:'male'}):null;
    if(ec&&ec.pillars) return ec.pillars.day.ganName+ec.pillars.day.zhiName;
    const diff=Math.round((new Date(Date.UTC(this._y,this._m-1,this._d)).getTime()-new Date(Date.UTC(2000,0,1)).getTime())/86400000)+2;
    return TGAN[(diff%10+10)%10]+DZ[(diff%12+12)%12];
  }
  get dg(): number { return TGAN.indexOf(this.dayGZ[0]); }
  get dz(): number { return DZ.indexOf(this.dayGZ[1]); }
  getDaoGZ(h: number): string {
    const o=[0,2,4,6,8][this.dg%5]; const hi=h%12;
    return TGAN[(o+hi)%10]+DZ[hi];
  }
  get jieQi(): string { const jd=this._day?.d0; if(jd===undefined)return ''; for(let i=0;i<24;i++) if(SSQ.ZQ[i]===jd) return JQ[i]; return ''; }
  get isYangDun(): boolean { return (this._day?.d0||0)<SSQ.ZQ[12]; }
  get sanYuan(): string {
    let li=-1; for(let i=3;i<24;i+=2) if(SSQ.ZQ[i]<=this._day.d0) li=i;
    const ds=Math.floor(this._day.d0-SSQ.ZQ[li>0?li:3]);
    return ds<5?'上元':ds<10?'中元':'下元';
  }
  get chongSha(): string {
    const cz=[6,7,8,9,10,11,0,1,2,3,4,5][this.dz];
    const dir=['北','西南','东北','东','东南','西北','南','西南','东北','西','西北','东南'];
    const SX=['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
    return `冲${SX[cz]}煞${dir[cz]}`;
  }
  get shen(): string { return ['青龙','明堂','天刑','朱雀','金匮','天德','白虎','玉堂','天牢','玄武','司命','勾陈'][this.dz]; }
  get isHuangDao(): boolean { return HD.includes(this.shen); }
  get shierZhi(): string {
    const jc=['建','除','满','平','定','执','破','危','成','收','开','闭'];
    const ms=[2,3,4,5,6,7,8,9,10,11,0,1];
    return jc[(this.dz-ms[(this._mz()-2+12)%12]+12)%12];
  }
  get pengZu(): string {
    const g=['甲不开仓','乙不栽植','丙不修灶','丁不剃头','戊不受田','己不破券','庚不经络','辛不合酱','壬不泱水','癸不词讼'][this.dg]||'';
    const z=['子不问卜','丑不冠带','寅不祭祀','卯不穿井','辰不哭泣','巳不远行','午不苫盖','未不服药','申不安床','酉不宴客','戌不吃犬','亥不嫁娶'][this.dz]||'';
    return g+' '+z;
  }
  get xiShen(): string { return ['东北','西北','西南','正南','东南','东北','西北','西南','正南','东南'][this.dg]; }
  get caiShen(): string { return ['东北','正东','正南','西南','正北','东北','正东','正南','西南','正北'][this.dg]; }
  get fuShen(): string { return ['正北','正北','西北','正南','东南','正北','西北','西北','东南','正南'][this.dg]; }
  get yangGui(): string { return ['西南','正西','西北','正北','东北','西南','正西','西北','正北','东北'][this.dg]; }
  get yinGui(): string { return ['正北','东北','正西','西南','西北','正北','东北','正西','西南','西北'][this.dg]; }
  get taiShen(): string { return ['正北','东北','东北','正东','东南','东南','正南','西南','西南','正西','西北','西北'][this._y%12]; }
  get jiJi(): string {
    const mz=this._mz(), dg=this.dg, dz=this.dz;
    const yd:{[k:number]:number}={0:0,1:6,2:2,3:8,4:4,5:10,6:0,7:6,8:2,9:8,10:4,11:10};
    const td:{[k:number]:number}={0:8,1:6,2:4,3:2,4:0,5:10,6:8,7:6,8:4,9:2,10:0,11:10};
    const g=[]; if(dz===yd[mz])g.push('月德'); if(dz===td[mz])g.push('天德'); return g.join(' ');
  }
  get xiongSha(): string { return [1,7].includes(this.dz)?'四离':''; }
  get yiList(): string[] {
    const jc=this.shierZhi; const r:string[]=[];
    if(['除','满','平','定','执','成','开'].includes(jc))r.push('祭祀');
    if(['建','满','定','成','开'].includes(jc))r.push('嫁娶');
    if(['除','定','成','开'].includes(jc))r.push('出行');
    return r;
  }
  get jiList(): string[] {
    const jc=this.shierZhi; const r:string[]=[];
    if(['破','闭'].includes(jc))r.push('开市');
    if(['建','破'].includes(jc))r.push('动土');
    return r;
  }
  get hourJiXing(): string[] {
    const ok=[true,true,false,false,true,true,false,true,false,false,true,false];
    return Array.from({length:12},(_,i)=>ok[(this.dz+i)%12]?'吉':'凶');
  }
  get hourYi(): string[][] { return [[],[],['祈福','求嗣'],['开市','立券'],['修造','动土'],['出行','求财'],['祭祀','祈福'],['修造','入宅'],['出行','求财'],['开市','立券'],['修造','动土'],['嫁娶','入宅']]; }
  get hourJi(): string[][] { return [[],['出行'],['开市'],['祭祀'],['出行'],['开市'],['开市'],['出行'],['开市'],['祭祀'],['出行'],['祭祀']]; }
}

export function solarToLunar(y: number, m: number, d: number): LunarResult {
  const c=new Sxwnl(); c.setSolar(y,m,d);
  return { solarY:y, solarM:m, solarD:d, lunarY:c.lunarYear, lunarM:c.lunarMonth, lunarD:c.lunarDay,
    isLeapMonth:!!c.Lleap, yearPillar:c.yearGZ, monthPillar:c.monthGZ, dayPillar:c.dayGZ,
    solarTerm:c.jieQi, isYangDun:c.isYangDun, sanYuan:c.sanYuan,
    yiList:c.yiList, jiList:c.jiList, chongSha:c.chongSha };
}

export function getHuangLi(y: number, m: number, d: number): HuangLiInfo {
  const c=new Sxwnl(); c.setSolar(y,m,d);
  const ca=c.chongSha.match(/冲(.+?)煞/)?.[1]||'';
  return { yearGZ:c.yearGZ, monthGZ:c.monthGZ, dayGZ:c.dayGZ,
    lunarMonth:c.Lmc, lunarDay:c.Ldc, lunarLeap:!!c.Lleap, solarTerm:c.jieQi,
    chongSha:c.chongSha, chongAnimal:ca,
    valueGod:c.shen, jianChu:c.shierZhi, isHuangDao:c.isHuangDao,
    pengZu:c.pengZu, xingSu:'',
    good:c.yiList, bad:c.jiList,
    luckyGods:c.jiJi.split(' ').filter(Boolean),
    evilGods:c.xiongSha.split(' ').filter(Boolean),
    xiShen:c.xiShen, caiShen:c.caiShen, fuShen:c.fuShen,
    yangGui:c.yangGui, yinGui:c.yinGui, taiShen:c.taiShen,
    hourList:Array.from({length:12},(_,h)=>({
      hourIndex:h, hourGZ:c.getDaoGZ(h), hourName:SHI_CHEN[h],
      isGood:c.hourJiXing[h]==='吉', hourYi:c.hourYi[h], hourJi:c.hourJi[h],
    })),
    isYangDun:c.isYangDun, sanYuan:c.sanYuan };
}

export function searchZeRi(q: ZeRiQuery): ZeRiResult[] {
  const r: ZeRiResult[] = []; let cur=new Date(q.startY,q.startM-1,q.startD);
  const end=new Date(q.endY,q.endM-1,q.endD);
  while(cur<=end){
    const y=cur.getFullYear(),m=cur.getMonth()+1,d=cur.getDate();
    try{
      const hl=getHuangLi(y,m,d);
      const mg=hl.good.filter(g=>g.includes(q.targetWork));
      if(mg.length===0||(q.avoidAnimal&&hl.chongAnimal===q.avoidAnimal)||(q.needHuangDao&&!hl.isHuangDao)){cur.setDate(d+1);continue;}
      r.push({dateStr:`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`,
        lunarStr:`${hl.yearGZ}年${hl.lunarLeap?'闰':''}${hl.lunarMonth}月${hl.lunarDay}`,
        dayGZ:hl.dayGZ, jianChu:hl.jianChu, valueGod:hl.valueGod, chongSha:hl.chongSha, matchGood:mg, isHuangDao:hl.isHuangDao, fullHuangLi:hl });
    }catch(e){}
    cur.setDate(d+1);
  }
  return r;
}
