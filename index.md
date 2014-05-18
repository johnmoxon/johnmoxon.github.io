---
layout: page
title: Mardown homepage eh? Hello World!
tagline: Supporting tagline
intro:
    title: articles on web development
    tagline: My 2 cents on everything web
    herounit: true
description: Web Development articles
keywords: web development, devops, HTML5, workflow, tooling
---
{% include JB/setup %}

{% assign posts_list = site.posts %}
{% include themes/grayscale/components/posts_list %}
