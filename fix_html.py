with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('<div class="head" data-scroll data-scroll-speed="0.5">', '<div class="head" data-scroll data-scroll-speed="0.5" data-scroll-class="in-view">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed HTML head animation attribute')
