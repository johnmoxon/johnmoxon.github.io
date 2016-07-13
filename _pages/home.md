---
layout: page
title: Articles
intro:
    title: Travel, technology and a digital life
    tagline: My 2 cents on everything online
    herounit: true
description: Web Development articles
keywords: web development, devops, HTML5, workflow, tooling
sitemap:
    priority: 1.0
permalink: /
---
{% include JB/setup %}

{% assign posts_list = site.posts %}
{% include themes/grayscale/components/posts_list %}
