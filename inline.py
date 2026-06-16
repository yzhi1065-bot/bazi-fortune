import os
src = r'C:\Users\25338\lobsterai\project\bazi-engine\ui'
with open(os.path.join(src, 'bundle.iife.js'), 'rb') as f:
    js = f.read()
with open(os.path.join(src, 'index.html'), 'r', encoding='utf8') as f:
    html = f.read()
js_str = js.decode('utf8')
# Escape </script> within JS code
js_str = js_str.replace('</script>', '<\/script>')
count = js_str.count('<\\/script>') if '\\/' in js_str else js_str.count('<\\/script>')
html = html.replace('<script src="bundle.iife.js"></script>', '<script>' + js_str + '</script>')
with open(os.path.join(src, 'bazi.html'), 'w', encoding='utf8') as f:
    f.write(html)
size = os.path.getsize(os.path.join(src, 'bazi.html'))
print(f'OK {size} bytes')
