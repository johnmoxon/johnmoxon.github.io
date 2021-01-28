---
layout: page
title: Tags
header: Posts By Tag
group: navigation
permalink: /tags/
---
{% comment %} {% include JB/setup %} {% endcomment %}

# Posts by tag

<ul class="tag-box-full list-unstyled list-inline">
{% assign tags_list = site.tags %}
{% comment %} {% include JB/tags_list %} {% endcomment %}
</ul>



{% for tag in site.tags %}
<div class="posts-by-tag posts-by-tag-{{tag[0]}}">
<h2 id="{{ tag[0] }}-ref">{{ tag[0] }}</h2>


<ul class="list-unstyled tag-posts-list">
{% assign pages_list = tag[1] %}
{% comment %} {% include JB/pages_list %} {% endcomment %}
</ul>
</div>
{% endfor %}
