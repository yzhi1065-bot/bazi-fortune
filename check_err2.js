
(function(){var s='',n=50;for(var i=0;i<n;i++)s+='<div class=star style=top:'+(Math.random()*100)+'%;left:'+(Math.random()*100)+'%;--s:'+(.8+Math.random()*2)+'px;--d:'+(2+Math.random()*4)+'s></div>';document.getElementById('stars').innerHTML=s})();

var now=(new Date).getFullYear(),lang='zh',userName='姓名',GC={0:'g2',1:'g2',2:'g3',3:'g3',4:'g5',5:'g5',6:'g1',7:'g1',8:'g4',9:'g4'};var GB={0:'g4',1:'g5',2:'g2',3:'g2',4:'g5',5:'g3',6:'g3',7:'g5',8:'g1',9:'g1',10:'g5',11:'g4'};
var CS=[['长生','沐浴','冠带','临官','帝旺','衰','病','死','墓','绝','胎','养'],['死','病','衰','帝旺','临官','冠带','沐浴','长生','养','胎','绝','墓'],['长生','沐浴','冠带','临官','帝旺','衰','病','死','墓','绝','胎','养'],['死','病','衰','帝旺','临官','冠带','沐浴','长生','养','胎','绝','墓'],['长生','沐浴','冠带','临官','帝旺','衰','病','死','墓','绝','胎','养'],['死','病','衰','帝旺','临官','冠带','沐浴','长生','养','胎','绝','墓'],['长生','沐浴','冠带','临官','帝旺','衰','病','死','墓','绝','胎','养'],['死','病','衰','帝旺','临官','冠带','沐浴','长生','养','胎','绝','墓'],['长生','沐浴','冠带','临官','帝旺','衰','病','死','墓','绝','胎','养'],['死','病','衰','帝旺','临官','冠带','沐浴','长生','养','胎','绝','墓']];
var KW='戌亥申酉午未辰巳寅卯子丑';var LB=['年','月','日','时'];
function $(i){return document.getElementById(i)}
function __(s){try{return BaZi.t(s,lang)}catch(e){return s}}
function toggleLang(){lang=lang==='zh'?'en':'zh';start()}
function gc(n){return GC[n]||'g5'}
function zc(n){return GB[n]||'g5'}

function calc(){
  var y=+$('y').value,m=+$('m').value,d=+$('d').value,h=+$('h').value,mi=+$('mi').value,g=document.querySelector('input[name=g]:checked').value;
  userName=$('fn').value||userName;saveRec();mainRender(BaZi.calculateBaZi({year:y,month:m,day:d,hour:h,minute:mi,gender:g}));
}
function start(){try{mainRender(BaZi.calculateBaZi({year:+$('y').value||1990,month:+$('m').value||8,day:+$('d').value||27,hour:+$('h').value||15,minute:+$('mi').value||30,gender:(document.querySelector('input[name=g]:checked')||{}).value||'male'}))}catch(e){mainRender(BaZi.calculateBaZi({year:1990,month:8,day:27,hour:15,minute:30,gender:'male'}))}}

function saveRec(){try{var a=JSON.parse(localStorage.getItem('bz')||'[]'),k=userName+'|'+$('y').value+'-'+$('m').value+'-'+$('d').value;a=a.filter(function(x){return x.k!==k});a.unshift({k:k,n:userName,y:+$('y').value,m:+$('m').value,d:+$('d').value,h:+$('h').value,mi:+$('mi').value,g:document.querySelector('input[name=g]:checked').value,t:Date.now()});if(a.length>50)a=a.slice(0,50);localStorage.setItem('bz',JSON.stringify(a))}catch(e){}}
function delRec(i){if(!confirm('删除这条记录？'))return;try{var a=JSON.parse(localStorage.getItem('bz')||'[]');a.splice(i,1);localStorage.setItem('bz',JSON.stringify(a));var el=document.getElementById('hr_'+i);if(el)el.remove();var cnt=document.getElementById('hcCnt');if(cnt){var n=parseInt(cnt.textContent)||0;cnt.textContent=' ('+Math.max(0,n-1)+')'}}catch(e){}}
function clrRec(){if(!confirm('清空所有历史记录？'))return;localStorage.removeItem('bz');var hl=document.getElementById('hl');if(hl)hl.innerHTML='';var cnt=document.getElementById('hcCnt');if(cnt)cnt.textContent=''}
function loadRec(i){try{var a=JSON.parse(localStorage.getItem('bz')||'[]'),x=a[i];if(!x)return;$('fn').value=x.n||'';$('y').value=x.y;$('m').value=x.m;$('d').value=x.d;$('h').value=x.h;$('mi').value=x.mi;userName=x.n||'';var el=document.querySelector('input[name=g][value="'+x.g+'"]');if(el)el.checked=true;calc()}catch(e){}}

function mainRender(r){
  var p=r.pillars,ps=[p.year,p.month,p.day,p.hour],ld=r.lunarDate,FT=r.greatFortunes,FI=r.fortuneInteraction,WXS=r.wuXingAnalysis,DA=r.deityAnalysis;
  var age=now-r.input.year,tg=r.input.gender==='male'?'乾造':'坤造',gc2=r.input.gender==='male'?'元男':'元女';
  var h='';
  h+='<div class=tl><button onclick=window.print()>\uD83D\uDCC4 '+__('导出PDF')+'</button><button onclick=toggleLang()>'+(lang==='zh'?'EN':'中')+'</button></div>';
  h+='<div class=fc><div class=ft>'+__('出生信息')+'</div><div class=fr>';
  h+='<div class=fg style=flex:1.3><label>'+__('姓名')+'</label><input type=text id=fn value="'+userName+'"></div>';
  h+='<div class=fg style=flex:.8><label>'+__('年')+'</label><input type=number id=y value=1990 min=1900></div>';
  h+='<div class=fg style=flex:.6><label>'+__('月')+'</label><input type=number id=m value=8 min=1 max=12></div>';
  h+='<div class=fg style=flex:.6><label>'+__('日')+'</label><input type=number id=d value=27 min=1 max=31></div>';
  h+='<div class=fg style=flex:.6><label>'+__('时')+'</label><input type=number id=h value=15 min=0 max=23></div>';
  h+='<div class=fg style=flex:.6><label>'+__('分')+'</label><input type=number id=mi value=30 min=0 max=59></div>';
  h+='</div><div class=gr><label><input type=radio name=g value=male checked>'+__('男')+'</label><label><input type=radio name=g value=female>'+__('女')+'</label><label style=margin-left:auto;font-size:11px;color:#786a5e><input type=checkbox id=ts> '+__('真太阳时')+'</label></div>';
  h+='<button class=btn onclick=calc()>'+__('开始排盘')+'</button></div>';

  h+='<div class=ic><div class=zc>'+r.zodiac+'</div><div class=it>';
  h+='<div class=up><input type=text value="'+userName+'" oninput="userName=this.value;$(\'fn\').value=this.value"></div>';
  h+='<div class=ll>'+__('农历')+'：'+ld.lunarYearGz+__('年')+' '+ld.monthName+ld.dayName+' '+r.input.hour+__('时')+' '+tg+'</div>';
  h+='<div class=sl><span>'+__('阳历')+'：'+r.input.year+__('年')+r.input.month+__('月')+r.input.day+__('日')+'</span><span>'+r.input.hour+':'+('0'+r.input.minute).slice(-2)+':00</span></div></div>';
  h+='<div class=ia><button onclick=window.print()>\uD83D\uDCC4</button><button onclick=calc()>\uD83D\uDD04</button></div></div>';

  var mainStars=[r.tenGods.yearGan,r.tenGods.monthGan,gc2,r.tenGods.hourGan];
  var kongVals=ps.map(function(p){for(var si=p.gan;si>=0;si-=60){if(si%10===p.gan&&si%12===p.zhi)return KW.substr(Math.floor(si/10)*2,2)}return ''});
  var csStages=ps.map(function(p){return CS[p.gan]?.[p.zhi]||''});
  h+='<div class=tw><table class=pt><thead><tr><th>'+__('日期')+'</th>'+LB.map(function(l){return'<th>'+l+__('柱')+'</th>'}).join('')+'</tr></thead><tbody>';
  h+='<tr class=hl><td>'+__('主星')+'</td>'+mainStars.map(function(s){return'<td style=color:#c4a265;font-weight:700;font-size:17px>'+s+'</td>'}).join('')+'</tr>';
  h+='<tr><td>'+__('天干')+'</td>';for(var i=0;i<4;i++){h+='<td><span class="'+gc(ps[i].gan)+'" style=font-size:18px;font-weight:600>'+ps[i].ganName+'</span><span class=sm>'+BaZi.GAN_WU_XING[ps[i].gan]+'</span></td>';}
  h+='</tr><tr><td>'+__('地支')+'</td>';for(var i=0;i<4;i++){h+='<td><span class="'+zc(ps[i].zhi)+'" style=font-size:18px;font-weight:600>'+ps[i].zhiName+'</span><span class=sm>'+BaZi.ZHI_WU_XING[ps[i].zhi]+'</span></td>';}
  h+='</tr><tr><td>'+__('藏干')+'<br><span style=font-size:8px;color:#6a5e50>'+__('主星')+'</span></td>';
  for(var i=0;i<4;i++)h+='<td>'+(r.hiddenStems[i].map(function(hx){return'<span style=display:block;font-size:10px;line-height:1.6><span class="'+gc(hx.gan)+'" style=font-weight:600>'+hx.ganName+'</span>'+hx.element+'<span style=color:#c4a265;margin-left:3px>'+hx.tenGod+'</span></span>'}).join('')||'-')+'</td>';
  h+='</tr><tr><td>'+__('星运')+'</td>';for(var i=0;i<4;i++){h+='<td style=color:#887a6e>'+(WXS?.wangShuai[BaZi.GAN_WU_XING[ps[i].gan]]||'')+'</td>';}
  h+='</tr><tr><td>'+__('自坐')+'</td>';for(var i=0;i<4;i++)h+='<td style=color:#887a6e>'+csStages[i]+'</td>';
  h+='</tr><tr><td>'+__('空亡')+'</td>';for(var i=0;i<4;i++)h+='<td>'+(kongVals[i]?'<span style=color:#6a5e50>'+kongVals[i]+'</span>':'-')+'</td>';
  h+='</tr><tr><td>'+__('纳音')+'</td>';for(var i=0;i<4;i++)h+='<td style=color:#9a8a7a>'+r.naYin[i]+'</td>';
  h+='</tr><tr><td>'+__('神煞')+'</td>';for(var i=0;i<4;i++){h+='<td class=ss>'+(r.shenShaDetail[i].map(function(s){return'<em>'+s.name+'</em>'}).join('')||'')+'</td>';}
  h+='</tr></tbody></table></div>';

  if(WXS){h+='<div class=fc><div class=ft>'+__('五行旺衰')+'</div><div style=font-size:11px;color:#9a8a7a;line-height:1.7>'+__('日主')+'：'+WXS.dayMaster.element+__('在')+WXS.dayMaster.wangShuai+' '+(WXS.dayMaster.isStrong?'['+__('身强')+']':'['+__('身弱')+']')+' | '+['木','火','土','金','水'].map(function(e){return __(e)+':'+WXS.wangShuai[e]}).join(' ')+'</div></div>';}
  if(DA){h+='<div class=fc><div class=ft>'+__('用神忌神')+'</div><div style=font-size:11px;color:#9a8a7a;line-height:1.7><span style=color:#4a9c6f>'+__('用神')+'：</span>'+DA.usefulDeities.join('、')+(DA.harmfulDeities.length?' <span style=color:#d4735e>'+__('忌神')+'：</span>'+DA.harmfulDeities.join('、'):'')+'<br><span style=color:#786a5e;font-size:10px>'+DA.strategy+'</span></div></div>';}

  if(r.annualDetail){var ad=r.annualDetail;h+='<div class=fc><div class=ft>\u6d41\u5e74\u8be6\u89e3 '+(new Date).getFullYear()+' '+(r.annualFortune?r.annualFortune.ganName+r.annualFortune.zhiName:'')+'</div><div style=font-size:11px;color:#9a8a7a;line-height:1.7><span>\u65e5\u4e3b\u6548\u5e94\uff1a'+ad.dayMasterEffect+'</span><br><span>\u7efc\u5408\u8bc4\u5206\uff1a'+ad.overall+' ('+ad.summary+')</span></div></div>';}\n  if(r.annualDetail){var ad=r.annualDetail;h+='<div class=fc><div class=ft>流年详解 '+(new Date).getFullYear()+' '+(r.annualFortune?r.annualFortune.ganName+r.annualFortune.zhiName:'')+'</div><div style=font-size:11px;color:#9a8a7a;line-height:1.7><span>日主效应：'+ad.dayMasterEffect+'</span><br><span>综合评分：'+ad.overall+' ('+ad.summary+')</span></div></div>';}
  h+='<div class=fc><div class=ft>'+__('大运')+' <span style=font-size:10px;color:#786a5e;font-weight:400>('+__('点击展开互动')+')</span></div>';
  h+='<div style=font-size:10px;color:#786a5e;margin-bottom:6px>'+__('起运')+'：'+FT[0].startAge+__('岁、')+FT[0].direction+'</div><table style=width:100%;font-size:11px;border-collapse:collapse>';
  for(var i=0;i<FT.length;i++){var ft=FT[i],ic=age>=ft.startAge&&age<=ft.endAge;
  h+='<tr style=cursor:pointer'+(ic?';background:rgba(196,162,101,.08)':'')+' onclick=tf('+i+')><td style=padding:5px 6px;border-bottom:1px solid rgba(180,140,100,.06);font-weight:600;color:#e0d8d0>'+ft.ganName+ft.zhiName+'</td><td style=padding:5px 6px;border-bottom:1px solid rgba(180,140,100,.06);color:#c4a265>'+ft.tenGod+'</td><td style=padding:5px 6px;border-bottom:1px solid rgba(180,140,100,.06);color:#786a5e;text-align:right>'+ft.startAge+'-'+ft.endAge+__('岁')+(ic?' <span style=color:#c4a265>\u2190'+__('当前')+'</span>':'')+'</td></tr>';
  h+='<tr id=fi_'+i+' style=display:none><td colspan=3 style=padding:0><div style=padding:6px;background:rgba(255,255,255,.02);border-radius:4px;font-size:10px>';
  if(FI&&FI[i]){var fi=FI[i];h+='<div style=font-weight:600;margin-bottom:2px;color:#786a5e>'+__('流年互动')+'</div>';
  for(var j=0;j<fi.annualInteractions.length;j++){var ai=fi.annualInteractions[j];
  h+='<div style=display:flex;padding:2px 0;color:'+ai.color+';font-weight:'+(ai.isUsefulYear?'600':'400')+'><span style=width:40px>'+ai.year+'</span><span style=width:40px>'+ai.ganZhi+'</span><span style=flex:1;font-size:9px>';
  if(ai.zhiInteraction!=='无特殊')h+=__('地支')+ai.zhiInteraction;
  if(ai.ganHe!=='无')h+=(ai.zhiInteraction!=='无特殊'?' | ':'')+ai.ganHe;
  h+='</span><span style=width:60px;text-align:right;font-size:9px>'+ai.fortuneEffect+'</span></div>';}
  h+='<div style=font-size:8px;color:#786a5e;margin-top:2px>'+__('用神年')+'=绿 '+__('忌神年')+'=红</div>';}
  h+='</div></td></tr>';}
  h+='</table></div>';

  try{var hist=JSON.parse(localStorage.getItem('bz')||'[]');
  if(hist.length){h+='<div class=fc><div class=ft style=cursor:pointer id=hc>'+__('历史记录')+' <span style=font-size:10px;color:#786a5e;font-weight:400> ('+hist.length+')</span></div><div id=hl>';
  for(var i=0;i<Math.min(hist.length,30);i++){var x=hist[i];
  h+='<div class=hrec id=hr_'+i+'><span class=nm onclick=loadRec('+i+')>'+(x.n||'?')+'</span><span class=tm onclick=loadRec('+i+')>'+x.y+'-'+('0'+x.m).slice(-2)+'-'+('0'+x.d).slice(-2)+' '+x.h+':'+('0'+x.mi).slice(-2)+'</span><span class=gd>'+(x.g==='female'?'女':'男')+'</span><span class=dl onclick="delRec('+i+')">\u2715</span></div>';}
  h+='<div style=padding:5px;color:#6a5e50;cursor:pointer;text-align:center;font-size:10px onclick=clrRec()>\uD83D\uDDD1 '+__('清空历史')+'</div></div></div>';}}catch(e){}

  $('app').innerHTML=h;
  var hcEl=$(hc);if(hcEl){hcEl.onclick=function(){var e=$(hl);if(e)e.style.display=e.style.display==='none'?'block':'none'}}
}

function tf(i){var e=$('fi_'+i);if(!e)return;if(e.style.display!=='none'){e.style.display='none';return;}for(var j=0;j<8;j++){var el=$('fi_'+j);if(el)el.style.display='none';}e.style.display='table-row';}
start();
