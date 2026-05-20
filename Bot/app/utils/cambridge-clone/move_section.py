import re

with open("index.html", "r") as f:
    content = f.read()

# Find the instructors-section
instructors_match = re.search(r'<section class="instructors-section">.*?</section>\n', content, re.DOTALL)
if not instructors_match:
    print("Instructors section not found")
    exit(1)

instructors_html = instructors_match.group(0)

# Remove instructors-section
content = content.replace(instructors_html, "")

# Find the achievers-section
achievers_match = re.search(r'<section class="achievers-section">.*?</section>\n', content, re.DOTALL)
if not achievers_match:
    print("Achievers section not found")
    exit(1)

# Insert instructors right after achievers
content = content.replace(achievers_match.group(0), achievers_match.group(0) + "\n" + instructors_html)

with open("index.html", "w") as f:
    f.write(content)

print("Done")
