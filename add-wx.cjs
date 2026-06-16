const fs = require('fs');
let html = fs.readFileSync('ui/index.html', 'utf8');
// Insert 五行旺衰 card after the 基本信息card (which has the wx-bar)
const insert = `r.wuXingAnalysis?React.createElement('div',{className:'card'},
  React.createElement('div',{className:'card-title'},'\\u4e94\\u884c\\u65fa\\u8870'),
  React.createElement('div',{style:{fontSize:12,color:'#555',lineHeight:1.8}},
    '\\u65e5\\u4e3b\\uff1a'+r.wuXingAnalysis.dayMaster.element+'\\u5728'+r.wuXingAnalysis.dayMaster.wangShuai+'\\u3000'+
    (r.wuXingAnalysis.dayMaster.isStrong?'[\\u8eab\\u5f3a]':'[\\u8eab\\u5f31]')+
    '\\u3000|\\u3000'+['\\u6728','\\u706b','\\u571f','\\u91d1','\\u6c34'].map(function(el){
      return el+':'+r.wuXingAnalysis.wangShuai[el]
    }).join('\\u3000'))):null,`;
// Insert after the wx-bar section which ends a few lines after the wx-bar div
html = html.replace(
  "r.annualFortune?React.createElement('div',{className:'card'}",
  insert + "r.annualFortune?React.createElement('div',{className:'card'}"
);
fs.writeFileSync('ui/index.html', html);
console.log('OK');
