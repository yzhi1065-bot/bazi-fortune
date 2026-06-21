/**
 * 寿星万年历加载器
 * 在浏览器中通过 <script> 顺序加载 sxwnl 各模块
 * 
 * 加载顺序（不可改变）：
 *   1. sxwnl-eph0.js  (JD天体计算基础库 + 星表, 271KB)
 *   2. sxwnl-eph.js   (星历计算)
 *   3. sxwnl-jw.js    (经文解码)
 *   4. sxwnl-lunar.js (Lunar/SSQ/oba/obb + 农历计算)
 * 
 * 本层仅做 TS 类型声明，sxwnl 核心代码以全局变量形式暴露。
 */

export function isSxwnlLoaded(): boolean {
  return typeof Lunar !== 'undefined' && typeof SSQ !== 'undefined';
}

/** 加载 sxwnl 四份脚本（仅前端浏览器环境使用） */
export function loadSxwnlScripts(basePath: string = 'src/calendar/'): Promise<void> {
  if (isSxwnlLoaded()) return Promise.resolve();
  const scripts = ['sxwnl-eph0.js', 'sxwnl-eph.js', 'sxwnl-jw.js', 'sxwnl-lunar.js'];
  return new Promise((resolve, reject) => {
    let i = 0;
    function loadNext() {
      if (i >= scripts.length) { resolve(); return; }
      const s = document.createElement('script');
      s.src = basePath + scripts[i];
      s.onload = () => { i++; loadNext(); };
      s.onerror = reject;
      document.head.appendChild(s);
    }
    loadNext();
  });
}
