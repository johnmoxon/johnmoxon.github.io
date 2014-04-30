---
layout: page
title: Mardown homepage eh? Hello World!
tagline: Supporting tagline
intro:
    title: articles on web development
    tagline: My 2 cents on everything web
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li data-file="{{ BASE_PATH }}{{ post.url }}" data-target=".content" data-words="{{ post.content | number_of_words }}" class="post" >
      <a href="{{ BASE_PATH }}{{ post.url }}">
        <h2>{{ post.title }}</h2>
      </a>
      <span class="post-date">{{ post.date | date_to_string }} - <span class="eta">calculating reading time...</span></span>
      {{ post.excerpt }}
      <span><a href="{{ BASE_PATH }}{{ post.url }}" title="{{ post.title }}">Read more</a></span>
    </li>
  {% endfor %}
</ul>
