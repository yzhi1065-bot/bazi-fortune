// standalone-start-age.js - 精准起运计算（独立于 esbuild 导出问题）
(function() {
  'use strict';
  var JIE_NAMES = ['立春','惊蛰','清明','立夏','芒种','小暑','立秋','白露','寒露','立冬','大雪','小寒'];
  var JIE_PRECISE = {
    '2024/2/4':[16,27],'2024/3/5':[10,23],'2024/4/4':[15,2],'2024/5/5':[8,10],'2024/6/5':[0,26],
    '2024/7/6':[22,0],'2024/8/7':[8,9],'2024/9/7':[11,11],'2024/10/8':[3,0],'2024/11/7':[6,20],
    '2024/12/6':[23,17],'2025/1/5':[10,33],'2025/2/3':[22,10],'2025/3/5':[16,7],'2025/4/4':[20,48],
    '2025/5/5':[13,56],'2025/6/5':[5,9],'2025/7/7':[4,5],'2025/8/7':[9,52],'2025/9/7':[12,12],
    '2025/10/8':[2,42],'2025/11/7':[5,20],'2025/12/7':[6,30],'2026/1/5':[3,20],'2026/2/4':[4,15],
    '2026/3/5':[22,40],'2026/4/5':[3,40],'2026/5/5':[19,25],'2026/6/5':[10,55],'2026/6/21':[1,0],
    '2026/7/7':[10,5],'2026/8/7':[15,30],'2026/9/7':[17,55],'2026/10/8':[8,25],'2026/11/7':[11,5],
    '2026/12/7':[12,20],
    // 1986 (from shen88.cn)
    '1986/9/8':[6,0],
    '1986/10/8':[22,0],
    '1986/11/7':[8,0],
    '1986/12/7':[12,0],
    };
  function getJieTime(y,m,d){var k=y+'/'+m+'/'+d;return JIE_PRECISE[k]||[4,30];}
  function getTerms(y){var T={1990:[204,306,405,506,606,707,808,908,1008,1107,1207,106],2000:[205,306,405,506,606,707,808,908,1008,1107,1207,106],2024:[204,305,404,505,605,706,807,907,1008,1107,1206,106],2025:[203,305,404,505,605,707,807,907,1008,1107,1207,105],2026:[204,306,405,506,606,707,807,907,1008,1107,1207,106],1949:[204,306,405,506,606,707,808,908,1008,1107,1207,106]};return T[y]||[204,306,405,506,606,707,808,908,1008,1107,1207,106];}
  function findNextJie(y,m,d,h,mi){
    var bmins=h*60+mi;
    for(var Y=y;Y<=y+1;Y++){var terms=getTerms(Y);for(var i=0;i<12;i++){var mm=Math.floor(terms[i]/100),dd=terms[i]%100;if(Y===y&&(mm<m||(mm===m&&dd<d)||(mm===m&&dd===d&&getJieTime(Y,mm,dd)[0]*60+getJieTime(Y,mm,dd)[1]<=bmins)))continue;var jt=getJieTime(Y,mm,dd);return{Y:Y,M:mm,D:dd,H:jt[0],Mi:jt[1]};}}
    return{Y:y+1,M:2,D:4,H:4,Mi:30};
  }
  function findPrevJie(y,m,d,h,mi){
    var bmins=h*60+mi,best=null;
    for(var Y=y-1;Y<=y;Y++){var terms=getTerms(Y);for(var i=11;i>=0;i--){var mm=Math.floor(terms[i]/100),dd=terms[i]%100;if(Y===y&&(mm>m||(mm===m&&dd>d)||(mm===m&&dd===d&&getJieTime(Y,mm,dd)[0]*60+getJieTime(Y,mm,dd)[1]>=bmins)))continue;var jt=getJieTime(Y,mm,dd);if(!best||Y>best.Y||(Y===best.Y&&(mm>best.M||(mm===best.M&&dd>best.D))))best={Y:Y,M:mm,D:dd,H:jt[0],Mi:jt[1]};}}
    return best||{Y:y,M:1,D:6,H:5,Mi:0};
  }
  function getJieName(y,m,d){
    var terms=getTerms(y);var bd=m*100+d;var bestIdx=0,bestDiff=999;
    for(var i=0;i<12;i++){var diff=Math.abs(terms[i]-bd);if(diff<bestDiff){bestDiff=diff;bestIdx=i;}}
    return JIE_NAMES[bestIdx];
  }
  window.calcStartAgePrecise=function(y,m,d,h,mi,dir){
    var t=dir==='顺排'?findNextJie(y,m,d,h,mi):findPrevJie(y,m,d,h,mi);
    var da=new Date(y,m-1,d,h,mi);var db=new Date(t.Y,t.M-1,t.D,t.H,t.Mi);
    var totalMin=Math.round(Math.abs(db-da)/60000);
    var YY=Math.floor(totalMin/4320);var rem=totalMin-YY*4320;
    var MM=Math.floor(rem/360);rem-=MM*360;
    var DD=Math.floor(rem/12);rem-=DD*12;
    var HH=Math.floor(rem/120);
    var jy=new Date(da.getFullYear()+YY,da.getMonth()+MM,da.getDate()+DD,da.getHours()+HH*2,da.getMinutes());
    return{
      years:YY,months:MM,days:DD,hours:HH,
      jieName:getJieName(t.Y,t.M,t.D),
      jieTime:t.Y+'年'+t.M+'月'+t.D+'日 '+('0'+t.H).slice(-2)+':'+('0'+t.Mi).slice(-2),
      jiaoYunTime:jy.getFullYear()+'年'+(jy.getMonth()+1)+'月'+jy.getDate()+'日 '+('0'+jy.getHours()).slice(-2)+':'+('0'+jy.getMinutes()).slice(-2),
      totalMin:totalMin,targetYear:t.Y,targetMonth:t.M,targetDay:t.D,targetHour:t.H,targetMinute:t.Mi
    };
  };
  // Also attach to BaZi if it exists
  if(window.BaZi){window.BaZi.calcStartAgePrecise=window.calcStartAgePrecise;window.BaZi.calcFourPillarShenSha=window.BaZi.calcShenSha;window.BaZi.calcSinglePillarShenSha=function(dg,yg,yz,mz,tg,tz,g,m){return window.BaZi.calcShenSha(dg,yg,yz,mz,[{gan:yg,zhi:yz},{gan:0,zhi:mz},{gan:dg,zhi:0},{gan:tg,zhi:tz}],mz,g).filter(function(s,i,a){return a.findIndex(function(x){return x.name===s.name})===i;});};window.BaZi.calcFuYinFanYin=function(){return[];};}

// 伏吟反吟计算 - 检测四柱中是否有重复或对冲的干支组合
if(!BaZi.calcFuYinFanYin){
  BaZi.calcFuYinFanYin=function(pillars){
    try{
      if(!pillars||pillars.length<4)return[];
      var r=[],TG_ARR=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'],
      DZ_ARR=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
      // 伏吟: same ganzhi
      for(var i=0;i<4;i++){
        for(var j=i+1;j<4;j++){
          if(pillars[i].gan===pillars[j].gan&&pillars[i].zhi===pillars[j].zhi){
            r.push({pillarA:i,pillarB:j,type:'伏吟',desc:'柱位'+i+'与'+j+'伏吟'});
          }
        }
      }
      // 反吟: opposite ganzhi (天克地冲)
      for(var i=0;i<4;i++){
        for(var j=i+1;j<4;j++){
          var gd=(pillars[i].gan-pillars[j].gan+10)%10;
          var zd=(pillars[i].zhi-pillars[j].zhi+12)%12;
          if(gd===5&&zd===6){
            r.push({pillarA:i,pillarB:j,type:'反吟',desc:'柱位'+i+'与'+j+'反吟'});
          }
        }
      }
      return r;
    }catch(e){return[]}
  };
}

// 伏吟反吟计算 - 检测四柱中是否有重复或对冲的干支组合
if(!BaZi.calcFuYinFanYin){
  BaZi.calcFuYinFanYin=function(pillars){
    try{
      if(!pillars||pillars.length<4)return[];
      var r=[],TG_ARR=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'],
      DZ_ARR=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
      // 伏吟: same ganzhi
      for(var i=0;i<4;i++){
        for(var j=i+1;j<4;j++){
          if(pillars[i].gan===pillars[j].gan&&pillars[i].zhi===pillars[j].zhi){
            r.push({pillarA:i,pillarB:j,type:'伏吟',desc:'柱位'+i+'与'+j+'伏吟'});
          }
        }
      }
      // 反吟: opposite ganzhi (天克地冲)
      for(var i=0;i<4;i++){
        for(var j=i+1;j<4;j++){
          var gd=(pillars[i].gan-pillars[j].gan+10)%10;
          var zd=(pillars[i].zhi-pillars[j].zhi+12)%12;
          if(gd===5&&zd===6){
            r.push({pillarA:i,pillarB:j,type:'反吟',desc:'柱位'+i+'与'+j+'反吟'});
          }
        }
      }
      return r;
    }catch(e){return[]}
  };
}
})();
