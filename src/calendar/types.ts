export interface FourPillar {
 year: string;
 month: string;
 day: string;
 hour: string;
}

export interface LunarResult {
 solarY: number;
 solarM: number;
 solarD: number;
 lunarY: number;
 lunarM: number;
 lunarD: number;
 isLeapMonth: boolean;
 yearPillar: string;
 monthPillar: string;
 dayPillar: string;
 solarTerm: string;
 isYangDun: boolean;
 sanYuan: string;
 yiList: string[];
 jiList: string[];
 chongSha: string;
}

export interface HuangLiInfo {
 // 基础
 yearGZ: string
 monthGZ: string
 dayGZ: string
 lunarMonth: string
 lunarDay: string
 lunarLeap: boolean
 solarTerm: string

 // 冲煞
 chongSha: string
 chongAnimal: string

 // 值日、建除、黄道
 valueGod: string
 jianChu: string
 isHuangDao: boolean // 是否黄道吉日

 // 传统内容
 pengZu: string // 彭祖百忌
 xingSu: string // 二十八星宿

 // 宜忌
 good: string[]
 bad: string[]

 // 神煞
 luckyGods: string[] // 吉神
 evilGods: string[] // 凶神

 // 方位
 xiShen: string
 caiShen: string
 fuShen: string
 yangGui: string
 yinGui: string
 taiShen: string

 // 十二时辰
 hourList: Array<{
 hourIndex: number
 hourGZ: string
 hourName: string
 isGood: boolean
 hourYi: string[]
 hourJi: string[]
 }>

 // 奇门
 isYangDun: boolean
 sanYuan: string
}

export interface ZeRiQuery {
 startY: number
 startM: number
 startD: number
 endY: number
 endM: number
 endD: number
 targetWork: string
 avoidAnimal?: string
 needHuangDao?: boolean
}

export interface ZeRiResult {
 dateStr: string
 lunarStr: string
 dayGZ: string
 jianChu: string
 valueGod: string
 chongSha: string
 matchGood: string[]
 isHuangDao: boolean
 fullHuangLi: HuangLiInfo
}
