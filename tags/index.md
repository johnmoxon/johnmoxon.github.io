---
layout: page
title: Tags
header: Posts By Tag
group: navigation
permalink: /
---
{% include JB/setup %}

# Posts by tag

<ul class="tag_box list-unstyled list-inline">
{% assign tags_list = site.tags %}
{% include JB/tags_list %}
</ul>



{% for tag in site.tags %}
<div class="posts-by-tag posts-by-tag-{{tag[0]}}">
<h2 id="{{ tag[0] }}-ref">{{ tag[0] }}</h2>


<ul class="list-unstyled tag-posts-list">
{% assign pages_list = tag[1] %}
{% include JB/pages_list %}
</ul>
</div>
{% endfor %}
