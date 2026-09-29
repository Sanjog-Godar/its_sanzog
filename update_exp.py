import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_exp_html = """      <!-- Experience Section -->

      <section id="experience" class="sec wrap" data-scroll-section>

        <div class="head" data-scroll data-scroll-speed="0.5">
          <p class="eyebrow mono">Career Path</p>
          <h2>Work <em>experience</em></h2>
        </div>

        <div class="exp-timeline">
          
          <div class="exp-item" data-scroll data-scroll-class="in-view">
            <div class="exp-date">
              <span>2025 &mdash; Present</span>
            </div>
            <div class="exp-content">
              <div class="exp-header">
                <h3>Mobile Application Developer</h3>
                <span class="exp-company">Websoft Technology Nepal Pvt Ltd.</span>
              </div>
              <div class="exp-desc">
                <p>Developing robust, cross-platform Android applications using Flutter for various client projects.</p>
                <ul>
                  <li>Architected and built new feature modules, integrating RESTful APIs and Firebase services.</li>
                  <li>Conducted performance profiling, bug fixing, and strict UI polishing for production releases.</li>
                  <li>Collaborated tightly with design teams and backend engineers to ensure timely delivery of sprint goals.</li>
                </ul>
              </div>
              <div class="exp-skills">
                <span>Flutter</span>
                <span>Dart</span>
                <span>REST API</span>
                <span>Firebase</span>
              </div>
            </div>
          </div>

        </div>

      </section>"""

# Use regex to replace everything from <!-- Experience Section --> up to the end of its </section>
pattern = re.compile(r'<!-- Experience Section -->.*?</section>', re.DOTALL)
new_content = pattern.sub(new_exp_html, content, count=1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Experience section updated.")
