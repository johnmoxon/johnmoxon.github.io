---
layout: post
title:  "Encoding video for HTML5"
subtitle: "Using the command-line"
date:   2014-04-23 13:38:36
category: "html5"
tags: html5 video encoding
description: "How to streamline video encoding for HTML5 with commandline scripts"
keywords: "HTML5, video, encoding, command line, ffmpeg, webm, ogg"
intro:
    title: HTML5 Video baby!
    tagline: How to streamline video encoding for your site
    herounit: true
sitemap:
    priority: 0.6
---
Encoding video for the web can be pretty difficult, at best a time consuming multi-part
process requiring you to output at least 3 different video formats, required to support
different browsers. [Miro video coverter][miro] (via [Dive into HTML5 video](http://diveintohtml5.info/video.html#miro)) can make this job pretty simple. Download it for Mac or Windows, throw
in any input video you like, select the right output and hit convert! Repeat times 3. Still if you're not happy with the quality of the output or you want to make your video **converting** part of your automated work flow... Sorry, this aint the tool for you :disappointed:

## State of video in HTML5

Well it ain't pretty but it works... _Kinda..._ Leaving asside for now IE8, support for
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
[miro]: http://www.mirovideoconverter.com/
