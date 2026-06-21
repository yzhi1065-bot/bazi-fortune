// ====== 四柱 ======
export interface FourPillar {
 year: string  // "丙午"
 month: string
 day: string
 hour: string
}

// ====== 农历结果 ======
export interface LunarResult {
 solarY: number
 solarM: number
 solarD: number
 lunarY: number
 lunarM: number
 lunarD: number
 isLeapMonth: boolean
 yearPillar: string
 monthPillar: string
 dayPillar: string
 solarTerm: string
 isYangDun: boolean
 sanYuan: string
 yiList: string[]
 jiList: string[]
 chongSha: string
}

// ====== 黄历 ======
export interface HuangLiInfo {
 // 基础干支
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

 // 值神、建除、黄道
 valueGod: string
 jianChu: string
 isHuangDao: boolean

 // 传统内容
 pengZu: string     // "丙不修灶 寅不祭祀"
 xingSu: string     // 二十八星宿 "角木蛟"

 // 宜忌
 good: string[]
 bad: string[]

 // 吉神凶神
 luckyGods: string[]
 evilGods: string[]

 // 方位
 xiShen: string
 caiShen: string
 fuShen: string
 yangGui: string
 yinGui: string
 taiShen: string

 // 十二时辰
 hourList: HourInfo[]

 // 奇门
 isYangDun: boolean
 sanYuan: string
}

// ====== 时辰 ======
export interface HourInfo {
 hourIndex: number  // 0-11
 hourGZ: string     // "甲午"
 hourName: string   // "子"
 isGood: boolean
 hourYi: string[]
 hourJi: string[]
}

// ====== 择日查询 ======
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

// ====== 择日结果 ======
export interface ZeRiResult {
 dateStr: string      // "2026-06-21"
 lunarStr: string     // "丙午年五月廿一"
 dayGZ: string
 jianChu: string
 valueGod: string
 chongSha: string
 matchGood: string[]
 isHuangDao: boolean
 fullHuangLi: HuangLiInfo
}
