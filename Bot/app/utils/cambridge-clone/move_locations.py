import re

with open("index.html", "r") as f:
    content = f.read()

# Find locations-section
locations_match = re.search(r'<section class="locations-section">.*?</section>\n', content, re.DOTALL)
if not locations_match:
    print("Locations section not found")
    exit(1)

locations_html = locations_match.group(0)

# Remove locations-section
content = content.replace(locations_html, "")

# Find achievers-section
achievers_match = re.search(r'<section class="achievers-section">.*?</section>\n', content, re.DOTALL)
if not achievers_match:
    print("Achievers section not found")
    exit(1)

# Insert locations right after achievers (so it's before instructors)
content = content.replace(achievers_match.group(0), achievers_match.group(0) + "\n" + locations_html)

with open("index.html", "w") as f:
    f.write(content)

print("Done")
