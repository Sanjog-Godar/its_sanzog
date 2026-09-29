with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('<article class="proj"', '<article class="proj" data-scroll data-scroll-class="in-view"')
c = c.replace('<div class="sk">', '<div class="sk" data-scroll data-scroll-class="in-view">')
c = c.replace('<div class="about-grid">', '<div class="about-grid" data-scroll data-scroll-class="in-view">')
c = c.replace('<div class="about-services">', '<div class="about-services" data-scroll data-scroll-class="in-view">')
c = c.replace('<div class="head" data-r="">', '<div class="head" data-scroll data-scroll-class="in-view">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Done')
