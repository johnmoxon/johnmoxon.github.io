---
layout: post
title:  "Encoding video for HTML5"
subtitle: "Using the command-line"
date:   2014-04-23 13:38:36
category: "html5"
tags: html5 video encoding
description: "How to streamline video encoding for HTML5 with the use of commandline tools"
keywords: "HTML5, video, encoding, command line, ffmpeg, webm, ogg"
intro:
    title: HTML5 Video baby!
    tagline: How to streamline video encoding for your site
    herounit: true
---
Encoding video for the web is **hard**. At best a time consuming multi-part
process requiring several different bits of software to create the various
formats required to support different browsers. As a I set out to find a streamlined command-line solution.

## State of video in HTML5

Well it ain't pretty but it works... _Kinda..._ Leaving out IE8 support for
HTML5 video is pretty good,

> For a full run down of which browser supports what, check out this ever trusty
[caniuse][caniusevideo] matrix.

## A scripted approach
{% gist johnmoxon/a798474f5d44e505bc71 %}

> Note recent versions of chrome and firefox support both webm and Ogg/Theora video
codecs, so you may only need to provide webm and mp4 versions

## Other articles on HTML5 video
* [Dive into HTML5 - Video][diveintohtml5video]
* [Smooting corporate proxy pains with cntlm][cntlm]

[diveintohtml5video]: http://diveintohtml5.info/video.html
[caniusevideo]: http://caniuse.com/#search=video
