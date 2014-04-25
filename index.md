---
layout: page
title: Mardown homepage eh? Hello World!
tagline: Supporting tagline
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li>
      <a href="{{ BASE_PATH }}{{ post.url }}">
        <h2>{{ post.title }}</h2>
      </a>
      <span>{{ post.date | date_to_string }}</span>
      <p>{{ post.excerpt }}</p>
      <span><a href="{{ BASE_PATH }}{{ post.url }}" title="{{ post.title }}">Read more</a></span>
    </li>
  {% endfor %}
</ul>
