with open('about-professional.css', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

c = c.replace('.about-grid.is-inview, .about-services.is-inview, .head.is-inview {', '.about-grid.in-view, .about-services.in-view, .head.in-view {')

with open('about-professional.css', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed CSS animation trigger class')
