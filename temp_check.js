
var WN=['\u6728','\u706b','\u571f','\u91d1','\u6c34'];
var WK=['wood','fire','earth','metal','water'];
var WC={'\u6728':'#4a9c6f','\u706b':'#d4735e','\u571f':'#c4a265','\u91d1':'#7a8ba8','\u6c34':'#5b8db8'};
var LB=['\u5e74','\u6708','\u65e5','\u65f6'];
var CC={'\u5409':'#4a9c6f','\u51f6':'#d4735e','\u4e2d\u6027':'#c4a265'};
var OC={'\u5927\u5409':'#4a9c6f','\u5409':'#7a8ba8','\u5e73':'#c4a265','\u51f6':'#d4735e','\u5927\u51f6':'#d45'};
var now = new Date().getFullYear();
function $(id){return document.getElementById(id)}

function calc(){
  var r=BaZi.calculateBaZi({
    year:+$('y').value,month:+$('m').value,day:+$('d').value,
    hour:+$('h').value,minute:+$('mi').value,
    gender:document.querySelector('input[name=g]:checked').value,
    useTrueSolar:$('ts').checked,longitude:$('ts').checked?120:undefined
  });
  render(r);
  saveHistory(+$('y').value,+$('m').value,+$('d').value,+$('h').value,+$('mi').value,document.querySelector('input[name=g]:checked').value);
  showHistory();
}

function render(r){
  var p=r.pillars,ps=[p.year,p.month,p.day,p.hour],fe=r.fiveElements;
  var total=WK.reduce(function(s,k){return s+fe[k]},0)||1;
  var WXS=r.wuXingAnalysis, DA=r.deityAnalysis, AD=r.annualDetail, FI=r.fortuneInteraction;
  var h='';

  h+='<div class="card"><div class="card-title">四柱'+(r.solarTermNote?'<span class="badge">'+r.solarTermNote+'</span>':'')+'</div><div class="grid4">';
  for(var i=0;i<4;i++)h+='<div class="box"><div class="bchars">'+ps[i].ganName+ps[i].zhiName+'</div><div class="bl">'+LB[i]+'</div><div class="bny">'+r.naYin[i]+'</div></div>';
  h+='</div></div>';

  h+='<div class="card"><div class="card-title">基本信息 · '+r.eightChars+'</div><div class="ig2">';
  h+='<div class="ii"><div class="il">日主</div><div class="iv">'+r.dayMaster.name+r.dayMaster.element+(r.dayMaster.yin?'(阴)':'(阳)')+'</div></div>';
  h+='<div class="ii"><div class="il">生肖</div><div class="iv">'+r.zodiac+'</div></div></div>';
  h+='<div class="wxb">';
  for(var i=0;i<5;i++){var pct=Math.round(fe[WK[i]]/total*100);h+='<div class="wxs" style="width:'+pct+'%;background:'+WC[WN[i]]+';font-size:'+(pct>8?'10px':'0')+'">'+(pct>8?WN[i]+fe[WK[i]]:'')+'</div>';}
  h+='</div></div>';

  if(WXS){h+='<div class="card"><div class="card-title">五行旺衰</div><div style="font-size:12px;color:#555;line-height:1.8">日主：'+WXS.dayMaster.element+'在'+WXS.dayMaster.wangShuai+'　'+(WXS.dayMaster.isStrong?'[身强]':'[身弱]')+'　|　'+WN.map(function(el){return el+':'+WXS.wangShuai[el]}).join('　')+'</div></div>';}

  if(DA){h+='<div class="card"><div class="card-title">用神忌神</div><div style="font-size:12px;color:#555;line-height:1.8">';
  h+='<span style="color:#4a9c6f;font-weight:600">用神：</span>'+DA.usefulDeities.join('、');
  if(DA.harmfulDeities.length)h+='　<span style="color:#d4735e;font-weight:600">忌神：</span>'+DA.harmfulDeities.join('、');
  h+='<br><span style="color:#888;font-size:11px">'+DA.strategy+'</span>';
  h+='</div></div>';}

  h+='<div class="card"><div class="card-title">十神·神煞·合冲刑害</div><div class="ten">';
  h+='年干：'+r.tenGods.yearGan+'　月干：'+r.tenGods.monthGan+'　时干：'+r.tenGods.hourGan+'</div>';
  h+='<div style="margin:6px 0">';for(var i=0;i<r.shenSha.length;i++){var s=r.shenSha[i];h+='<span class="tag" style="background:'+(CC[s.type]||'#f0ebe6')+'20;color:'+(CC[s.type]||'#555')+'">'+s.name+'</span>';}
  for(var i=0;i<r.interactions.length;i++){var it=r.interactions[i];h+='<span class="tag">'+(it.third?it.left+it.right+it.third:it.left+it.right)+' '+it.type+'</span>';}
  h+='</div></div>';

  // Annual detail
  if(AD){h+='<div class="card"><div class="card-title">流年详解 · '+now+' '+AD.ganZhi+'</div><div class="ig2">';
  h+='<div class="ii"><div class="il">日主效应</div><div class="iv">'+AD.dayMasterEffect+'</div></div>';
  h+='<div class="ii"><div class="il">五行属性</div><div class="iv" style="color:'+(AD.deityEffect==='用神年'?'#4a9c6f':AD.deityEffect==='忌神年'?'#d4735e':'#555')+'">'+AD.deityEffect+'</div></div>';
  h+='<div class="ii"><div class="il">神煞激活</div><div class="iv" style="font-size:11px">'+(AD.shenShaActivated.length?AD.shenShaActivated.join('、'):'无')+'</div></div>';
  h+='<div class="ii"><div class="il">综合评价</div><div class="iv" style="color:'+(OC[AD.overall]||'#555')+'">'+AD.overall+' (评分'+AD.score+')</div></div>';
  h+='</div><div style="font-size:11px;color:#888;line-height:1.6;margin-top:6px">'+AD.summary;
  if(AD.ganHe.length)h+='<br>天合: '+AD.ganHe.join('、');
  if(AD.branchInteractions.length)h+='<br>地支: '+AD.branchInteractions.slice(0,4).join('、');
  h+='</div></div>';}

  h+='<div class="card"><div class="card-title">大运 <span style="font-size:10px;color:#999">（点击展开流年互动）</span></div><div style="font-size:11px;color:#888;margin-bottom:8px">起运：'+r.greatFortunes[0].startAge+'岁、'+r.greatFortunes[0].direction+'</div><table class="ftab">';
  var __age=now-r.input.year;
  for(var i=0;i<r.greatFortunes.length;i++){var ft=r.greatFortunes[i];var isCurrent=__age>=ft.startAge&&__age<=ft.endAge;
  h+='<tr style="cursor:pointer;'+(isCurrent?'background:#f5f0eb':'')+'" onclick="toggleFi('+i+')"><td style="font-weight:600">'+ft.ganName+ft.zhiName+'</td><td style="color:#8b4513">'+ft.tenGod+'</td><td style="color:#999;text-align:right">'+ft.startAge+'-'+ft.endAge+'岁'+(isCurrent?' ←当前':'')+'</td></tr>';
  h+='<tr id="fi_'+i+'" style="display:none"><td colspan="3" style="padding:0"><div style="padding:8px;background:#faf8f6;border-radius:6px;font-size:11px">';
  if(FI&&FI[i]){var fi=FI[i];h+='<div style="font-weight:600;margin-bottom:4px;color:#666">流年互动</div>';
  for(var j=0;j<fi.annualInteractions.length;j++){var ai=fi.annualInteractions[j];
  h+='<div style="display:flex;padding:2px 0;color:'+ai.color+'"><span style="width:50px">'+ai.year+'</span><span style="width:50px">'+ai.ganZhi+'</span><span style="flex:1;font-size:10px">';
  if(ai.zhiInteraction!=='无特殊')h+='地'+ai.zhiInteraction;
  if(ai.ganHe!=='无')h+=(ai.zhiInteraction!=='无特殊'?' | ':'')+ai.ganHe;
  h+='</span><span style="width:90px;text-align:right">'+ai.fortuneEffect+'</span></div>';}
  h+='<div style="font-size:9px;color:#aaa;margin-top:4px">绿=用神年 红=忌神年</div>';}
  h+='</div></td></tr>';}
  h+='</table></div>';}

  h+='<button class="toggle" onclick="td()">展开详情 ▼</button><div id="dt" class="tgl">';

  if(r.lunarDate){h+='<div class="card"><div class="card-title">农历</div><div class="ig2"><div class="ii"><div class="il">农历日期</div><div class="iv">'+r.lunarDate.monthName+r.lunarDate.dayName+'</div></div><div class="ii"><div class="il">农历年</div><div class="iv">'+r.lunarDate.lunarYearGz+'年</div></div></div></div>';}

  h+='<div class="card"><div class="card-title">支藏干</div><div class="ten">'+LB.map(function(l,i){return l+'支'+ps[i].zhiName+': '+r.tenGods[['yearZhi','monthZhi','dayZhi','hourZhi'][i]].join('、')}).join(' | ')+'</div></div>';

  h+='<div class="card"><div class="card-title">神煞明细</div><div style="font-size:12px;color:#555;line-height:1.8">';
  for(var i=0;i<4;i++){var ss=r.shenShaDetail[i];if(ss.length)h+=LB[i]+'支['+ps[i].zhiName+']: '+ss.map(function(s){return s.name}).join(', ')+'<br>';}
  h+='</div></div>';

  h+='<div class="card"><div class="card-title">节气·真太阳时</div><div style="font-size:12px;color:#555">当前节气：'+r.solarTermNote+(r.input.useTrueSolar?'<br>经度：'+r.input.longitude+'°E':'')+'</div></div>';

  h+='</div>';
  $('r').innerHTML=h;$('subtitle').textContent='BaZi · '+r.eightChars;
}

var curAge = new Date().getFullYear() - (+$('y').value);
var open=false;
function toggleFi(i){
  var e=document.getElementById('fi_'+i);
  if(!e)return;
  var isVis=e.style.display!=='none';
  // Hide all
  for(var j=0;j<8;j++){var el=document.getElementById('fi_'+j);if(el)el.style.display='none';}
  if(!isVis)e.style.display='table-row';
}
function td(){var e=$('dt');open=!open;e.className='tgl'+(open?' o':'');e.previousElementSibling.textContent=open?'收起详情 ▲':'展开详情 ▼';}
function saveHistory(y2,m2,d2,h2,mi2,g2){
  var arr=JSON.parse(localStorage.getItem('bz')||'[]');
  var key=y2+'-'+m2+'-'+d2+' '+h2+':'+mi2+' '+g2;
  arr=arr.filter(function(x){return x.k!==key});
  arr.unshift({k:key,y:y2,m:m2,d:d2,h:h2,mi:mi2,g:g2,t:Date.now()});
  if(arr.length>20)arr=arr.slice(0,20);
  localStorage.setItem('bz',JSON.stringify(arr));
}
function showHistory(){
  var h=JSON.parse(localStorage.getItem('bz')||'[]');
  if(!h.length){$('rl').style.display='none';return;}
  $('rl').style.display='block';
  var html='<div class="card"><div class="card-title" style="cursor:pointer" onclick="var e=this.nextElementSibling;e.style.display=e.style.display==\'none\'?\'block\':\'none\'">历史记录 ▼</div><div style="display:block;font-size:12px;color:#555">';
  for(var i=0;i<h.length;i++){
    html+='<div style="padding:5px 6px;cursor:pointer;border-bottom:1px solid #f0ebe6" onclick="loadHistory('+i+')">'+h[i].k+' ('+new Date(h[i].t).toLocaleString().slice(5,16)+')</div>';
  }
  html+='<div style="padding:5px 6px;font-size:11px;color:#999;cursor:pointer;text-align:center" onclick="localStorage.removeItem(\'bz\');showHistory();">清空历史</div>';
  html+='</div></div>';
  $('rl').innerHTML=html;
}
window.loadHistory=function(i){
  var h=JSON.parse(localStorage.getItem('bz')||'[]');
  if(!h[i])return;
  var x=h[i];
  $('y').value=x.y;$('m').value=x.m;$('d').value=x.d;
  $('h').value=x.h;$('mi').value=x.mi;
  document.querySelector('input[name=g][value="'+x.g+'"]').checked=true;
  calc();
};
setTimeout(calc,50);
