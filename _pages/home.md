---
layout: page
title: Articles
intro:
    title: It's a matter of waste 
    tagline: Tales of technology, fintech and digital leadership in ever changing times 
    herounit: true
description: Web Development articles
keywords: web development, devops, HTML5, workflow, tooling
sitemap:
    priority: 1.0
permalink: /
---
{% include JB/setup %}

{% assign posts_list = site.posts %}
{% include themes/jmblog/components/posts_list %}
