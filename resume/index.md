---
layout: page
title: Resume
tags: [resume, cv]
comments: false
---

{% comment %}
  TODO: The resume link comes from `resume_url` in _config.yml.
  Set it to your Google Drive share link and the link below appears automatically.
{% endcomment %}
{% if site.resume_url and site.resume_url != "" %}
My latest resume: <a href="{{ site.resume_url }}" target="_blank" rel="noopener">View on Google Drive</a>
{% else %}
Resume coming soon.
{% endif %}
