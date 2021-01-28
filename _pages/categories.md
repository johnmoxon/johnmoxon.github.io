---
layout: page
title: Categories
header: Posts By Category
group: navigation
permalink: /categories/
---
{% comment %} {% include JB/setup %} {% endcomment %}

# Posts by category

<ul class="tag-box-full list-unstyled list-inline">
{% assign categories_list = site.categories %}
{% comment %} {% include JB/categories_list %} {% endcomment %}
</ul>


{% for category in site.categories %}
<div class="posts-by-category posts-by-category-{{category[0]}}">
  <h2 id="{{ category[0] }}-ref">{{ category[0] | join: "/" }}</h2>
  <ul class="list-unstyled category-posts-list">
  {% assign pages_list = category[1] %}
  {% comment %}Limit number of posts shown under each category{% endcomment %}
  {% assign limit = site.defaults.max_num_category_posts %}
  {% comment %} {% include JB/pages_list %} {% endcomment %}
  </ul>
  <a href="{{category[0]}}" class="btn btn-default">see more {{ category[0] }} posts &raquo;</a>
</div>
{% endfor %}
