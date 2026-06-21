<template>
<div class="hl-wrap" style="max-width:900px;margin:0 auto;padding:16px;font-family:'Noto Sans SC',sans-serif;color:#333">

 <!-- ═══ 顶部：公历 + 农历 + 四柱 + 节气 + 黄道标识 ═══ -->
 <div class="hl-header" style="border-bottom:2px solid #c4a265;padding-bottom:12px;margin-bottom:16px">
  <div style="font-size:22px;font-weight:700;color:#222">
   {{ selY }}年{{ selM }}月{{ selD }}日 公历
  </div>
  <div style="font-size:17px;color:#666;margin-top:4px">
   农历 {{ hl.lunarLeap ? '闰' : '' }}{{ hl.lunarMonth }}月{{ hl.lunarDay }}
  </div>
  <div style="margin-top:8px;font-size:15px;display:flex;flex-wrap:wrap;gap:10px">
   <span style="color:#8b6914;font-weight:600">{{ hl.yearGZ }}年 {{ hl.monthGZ }}月 {{ hl.dayGZ }}日</span>
   <span style="color:#2e7d32">节气：{{ hl.solarTerm || '—' }}</span>
   <span :style="{color:hl.isHuangDao?'#c4a265':'#999',fontWeight:600}">
    {{ hl.isHuangDao ? '【黄道吉日】' : '【黑道凶日】' }}
   </span>
  </div>
 </div>

 <!-- ═══ 宜/忌 ═══ -->
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
  <div style="background:#e8f5e9;border-radius:8px;padding:10px">
   <h3 style="color:#2e7d32;font-size:14px;margin:0 0 6px">✅ 宜</h3>
   <div>
    <span v-for="g in hl.good" :key="g"
     style="display:inline-block;background:#c8e6c9;color:#1b5e20;padding:2px 8px;border-radius:12px;font-size:12px;margin:2px"
    >{{ g }}</span>
    <span v-if="!hl.good.length" style="color:#999;font-size:12px">—</span>
   </div>
  </div>
  <div style="background:#f5f5f5;border-radius:8px;padding:10px">
   <h3 style="color:#666;font-size:14px;margin:0 0 6px">❌ 忌</h3>
   <div>
    <span v-for="b in hl.bad" :key="b"
     style="display:inline-block;background:#e0e0e0;color:#555;padding:2px 8px;border-radius:12px;font-size:12px;margin:2px"
    >{{ b }}</span>
    <span v-if="!hl.bad.length" style="color:#999;font-size:12px">—</span>
   </div>
  </div>
 </div>

 <!-- ═══ 冲煞/建除/值神/彭祖/星宿 ═══ -->
 <div style="background:#faf8f5;border:1px solid #e0d5c5;border-radius:8px;padding:12px;margin-bottom:14px;font-size:13px;line-height:2">
  <div><b style="color:#c4a265">冲煞</b>：<span style="color:#d4735e">{{ hl.chongSha }}</span></div>
  <div><b style="color:#c4a265">建除</b>：{{ hl.jianChu }}　<b style="color:#c4a265">值神</b>：{{ hl.valueGod }}（{{ hl.isHuangDao ? '黄道' : '黑道' }}）</div>
  <div><b style="color:#c4a265">彭祖百忌</b>：<span style="color:#e65100">{{ hl.pengZu }}</span></div>
  <div><b style="color:#c4a265">二十八星宿</b>：{{ hl.xingSu }}</div>
 </div>

 <!-- ═══ 吉神/凶神 ═══ -->
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
  <div style="background:#e3f2fd;border-radius:8px;padding:10px">
   <h4 style="color:#1565c0;font-size:13px;margin:0 0 4px">吉神宜趋</h4>
   <span style="font-size:12px;color:#555">{{ hl.luckyGods.join('、') || '—' }}</span>
  </div>
  <div style="background:#fbe9e7;border-radius:8px;padding:10px">
   <h4 style="color:#bf360c;font-size:13px;margin:0 0 4px">凶神宜忌</h4>
   <span style="font-size:12px;color:#555">{{ hl.evilGods.join('、') || '—' }}</span>
  </div>
 </div>

 <!-- ═══ 方位 ═══ -->
 <div style="border:1px solid #e0d5c5;border-radius:8px;padding:12px;margin-bottom:14px">
  <h4 style="font-size:13px;font-weight:600;color:#c4a265;margin:0 0 8px">今日吉利方位</h4>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-size:12px">
   <div><b>喜神</b>：{{ hl.xiShen }}</div>
   <div><b>财神</b>：{{ hl.caiShen }}</div>
   <div><b>福神</b>：{{ hl.fuShen }}</div>
   <div><b>阳贵神</b>：{{ hl.yangGui }}</div>
   <div><b>阴贵神</b>：{{ hl.yinGui }}</div>
   <div><b>胎神</b>：{{ hl.taiShen }}</div>
  </div>
 </div>

 <!-- ═══ 十二时辰 ═══ -->
 <div style="margin-bottom:24px">
  <h4 style="font-size:14px;font-weight:600;margin:0 0 8px;color:#333">十二时辰吉凶表</h4>
  <table style="width:100%;border-collapse:collapse;font-size:12px;text-align:center">
   <thead>
    <tr style="background:#f5f0eb">
     <th style="padding:6px;border:1px solid #ddd">时辰</th>
     <th style="padding:6px;border:1px solid #ddd">干支</th>
     <th style="padding:6px;border:1px solid #ddd">吉凶</th>
     <th style="padding:6px;border:1px solid #ddd">宜</th>
     <th style="padding:6px;border:1px solid #ddd">忌</th>
    </tr>
   </thead>
   <tbody>
    <tr v-for="h in hl.hourList" :key="h.hourIndex">
     <td style="padding:5px;border:1px solid #eee">{{ h.hourName }}时</td>
     <td style="padding:5px;border:1px solid #eee">{{ h.hourGZ }}</td>
     <td style="padding:5px;border:1px solid #eee;font-weight:600"
      :style="{color:h.isGood?'#2e7d32':'#d32f2f'}"
     >{{ h.isGood ? '吉' : '凶' }}</td>
     <td style="padding:5px;border:1px solid #eee;font-size:11px">{{ h.hourYi.join('、') || '—' }}</td>
     <td style="padding:5px;border:1px solid #eee;font-size:11px">{{ h.hourJi.join('、') || '—' }}</td>
    </tr>
   </tbody>
  </table>
 </div>

 <hr style="border:0;border-top:1px solid #ddd;margin:24px 0">

 <!-- ═══ 择日筛选 ═══ -->
 <h3 style="font-size:18px;margin:0 0 12px">择吉日筛选</h3>

 <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:14px">
  <label>起始：<input v-model.number="sY" type="number" style="width:64px">-<input v-model.number="sM" style="width:40px">-<input v-model.number="sD" style="width:40px"></label>
  <label>结束：<input v-model.number="eY" type="number" style="width:64px">-<input v-model.number="eM" style="width:40px">-<input v-model.number="eD" style="width:40px"></label>
  <label>办事：
   <select v-model="workType" style="padding:3px">
    <option>嫁娶</option><option>开业</option><option>动土</option><option>入宅</option><option>出行</option>
   </select>
  </label>
  <label>避冲生肖：<input v-model="avoid" style="width:60px"></label>
  <label><input v-model="onlyHuangDao" type="checkbox"> 仅黄道吉日</label>
  <button @click="doSearch" style="background:#c4a265;color:#fff;border:none;padding:6px 16px;border-radius:4px;cursor:pointer;font-size:13px">查询吉日</button>
 </div>

 <!-- ═══ 结果列表 ═══ -->
 <div v-if="zeRiList.length" style="margin-top:8px">
  <div style="font-size:14px;color:#666;margin-bottom:8px">筛选结果（共{{ zeRiList.length }}条）</div>
  <div v-for="item in zeRiList" :key="item.dateStr" @click="openDetail(item)"
   style="border:1px solid #e0d5c5;border-radius:6px;padding:10px;margin-bottom:6px;cursor:pointer;background:#fefcf9"
  >
   <div style="font-size:14px;font-weight:600;color:#333">{{ item.dateStr }}｜{{ item.lunarStr }}</div>
   <div style="font-size:12px;color:#666;margin-top:4px">
    {{ item.dayGZ }}｜值神：{{ item.valueGod }}｜冲煞：{{ item.chongSha }}｜匹配宜：{{ item.matchGood.join('、') }}
   </div>
   <div v-if="item.isHuangDao" style="color:#c4a265;font-size:12px;font-weight:600;margin-top:2px">黄道吉日</div>
  </div>
 </div>
 <div v-else style="color:#999;font-size:13px;margin-top:10px">暂无符合条件的吉日</div>

 <!-- ═══ 弹窗 ═══ -->
 <div v-if="showDialog" @click.self="showDialog=false"
  style="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:1000">
  <div style="background:#fff;border-radius:12px;padding:20px;max-width:700px;width:90%;max-height:85vh;overflow-y:auto">
   <div v-if="currDetail.fullHuangLi" class="hl-wrap">
    <div style="border-bottom:2px solid #c4a265;padding-bottom:10px;margin-bottom:12px">
     <div style="font-size:18px;font-weight:700">{{ currDetail.dateStr }}</div>
     <div style="margin-top:4px;font-size:14px;color:#666">
      {{ currDetail.fullHuangLi.yearGZ }}年 {{ currDetail.fullHuangLi.monthGZ }}月 {{ currDetail.fullHuangLi.dayGZ }}日
      农历{{ currDetail.fullHuangLi.lunarLeap?'闰':'' }}{{ currDetail.fullHuangLi.lunarMonth }}月{{ currDetail.fullHuangLi.lunarDay }}
      ｜节气：{{ currDetail.fullHuangLi.solarTerm }}
     </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
     <div style="background:#e8f5e9;border-radius:6px;padding:8px"><b style="color:#2e7d32">宜</b> {{ currDetail.fullHuangLi.good.join('、')||'—' }}</div>
     <div style="background:#f5f5f5;border-radius:6px;padding:8px"><b style="color:#666">忌</b> {{ currDetail.fullHuangLi.bad.join('、')||'—' }}</div>
    </div>
    <div style="font-size:12px;line-height:2">冲煞：{{ currDetail.fullHuangLi.chongSha }}｜值神：{{ currDetail.fullHuangLi.valueGod }}｜建除：{{ currDetail.fullHuangLi.jianChu }}｜彭祖：{{ currDetail.fullHuangLi.pengZu }}</div>
   </div>
   <button @click="showDialog=false" style="margin-top:12px;background:#e0d5c5;border:none;padding:6px 16px;border-radius:4px;cursor:pointer;font-size:12px">关闭</button>
  </div>
 </div>

</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getHuangLi, searchZeRi, type HuangLiInfo, type ZeRiResult } from '@/calendar'

// ── 当前查看日期 ──
const selY = ref(2026)
const selM = ref(6)
const selD = ref(21)
const hl = ref<HuangLiInfo>({} as HuangLiInfo)

// ── 择日参数 ──
const sY = ref(2026)
const sM = ref(6)
const sD = ref(21)
const eY = ref(2026)
const eM = ref(7)
const eD = ref(20)
const workType = ref('嫁娶')
const avoid = ref('')
const onlyHuangDao = ref(true)
const zeRiList = ref<ZeRiResult[]>([])

// ── 弹窗 ──
const showDialog = ref(false)
const currDetail = ref<ZeRiResult>({} as ZeRiResult)

// ── 加载当日黄历 ──
function loadHuangLi() {
  hl.value = getHuangLi(selY.value, selM.value, selD.value)
}
loadHuangLi()

// ── 查询吉日 ──
function doSearch() {
  zeRiList.value = searchZeRi({
    startY: sY.value, startM: sM.value, startD: sD.value,
    endY: eY.value, endM: eM.value, endD: eD.value,
    targetWork: workType.value,
    avoidAnimal: avoid.value || undefined,
    needHuangDao: onlyHuangDao.value,
  })
}

// ── 打开弹窗 ──
function openDetail(item: ZeRiResult) {
  currDetail.value = item
  showDialog.value = true
}
</script>
