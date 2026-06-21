// 四柱干支
export interface FourPillar {
  gan: number;      // 天干索引 0-9
  zhi: number;      // 地支索引 0-11
  ganName: string;  // 天干名 甲-癸
  zhiName: string;  // 地支名 子-亥
}

// 农历结果
export interface LunarResult {
  solarYear: number;
  solarMonth: number;
  solarDay: number;
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  isLeapMonth: boolean;
  lunarMonthName?: string;
  lunarDayName?: string;
  yearPillar?: FourPillar;
  monthPillar?: FourPillar;
  dayPillar?: FourPillar;
  solarTerm?: string;
  isYangDun?: boolean;
  sanYuan?: string;
  yiList?: string[];
  jiList?: string[];
  chongSha?: string;
}

// 黄历信息
export interface HuangLiInfo {
  yearGZ: string;
  monthGZ: string;
  dayGZ: string;
  lunarMonth: string;
  lunarDay: string;
  lunarLeap: boolean;
  solarTerm: string;
  chongSha: string;
  chongAnimal: string;
  valueGod: string;
  jianChu: string;
  pengZu: string[];
  good: string[];
  bad: string[];
  luckyGods: string[];
  evilGods: string[];
  xiShen: string;
  caiShen: string;
  fuShen: string;
  yangGui: string;
  yinGui: string;
  taiShen: string;
  hourList: Array<{
    hourIndex: number;
    hourGZ: string;
    hourName: string;
    isGood: boolean;
    hourYi: string[];
    hourJi: string[];
  }>;
  isYangDun: boolean;
  sanYuan: string;
}

// 择日查询
export interface ZeRiQuery {
  startY: number;
  startM: number;
  startD: number;
  endY: number;
  endM: number;
  endD: number;
  targetWork: string;
  avoidAnimal?: string;
  needHuangDao?: boolean;
}

// 择日结果
export interface ZeRiResult {
  dateStr: string;
  lunarStr: string;
  dayGZ: string;
  jianChu: string;
  valueGod: string;
  chongSha: string;
  matchGood: string[];
  isHuangDao: boolean;
  fullHuangLi: HuangLiInfo;
}
