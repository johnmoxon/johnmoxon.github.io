---
layout: page
title: Categories
header: Posts By Category
group: navigation
permalink: /
---
{% include JB/setup %}

# Posts by category

<ul class="tag_box list-unstyled list-inline">
{% assign categories_list = site.categories %}
{% include JB/categories_list %}
</ul>


{% for category in site.categories %}
<div class="posts-by-category posts-by-category-{{category[0]}}">
  <h2 id="{{ category[0] }}-ref">{{ category[0] | join: "/" }}</h2>
  <ul class="list-unstyled category-posts-list">
  {% assign pages_list = category[1] %}
  {% comment %}Limit number of posts shown under each category{% endcomment %}
  {% assign limit = site.defaults.max_num_category_posts %}
  {% include JB/pages_list %}
  </ul>
  <a href="{{category[0]}}" class="btn btn-default">see more {{ category[0] }} posts &raquo;</a>
</div>
{% endfor %}

