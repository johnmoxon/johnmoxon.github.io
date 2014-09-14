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
Encoding *test* video for the web can be pretty difficult, at best a time consuming
process requiring you to output up to 3 different video codecs required to support popular browsers. _For a full explanation of video/audio codec and container formats check out this awesome in-depth article over at [**dive into html5 video**](http://diveintohtml5.info/video.html#video-codecs)_

[Miro video coverter][miro] (via [Dive into HTML5](http://diveintohtml5.info/video.html#miro)) can make this job pretty simple. Download it for Mac or Windows, throw in any input video you like, select the right output and hit convert! Repeat times 3. Still if you're not happy with the quality of the output or you want to make your video **conversion process** part of an automated work flow... Sorry, this aint the tool for you :disappointed:

## State of video in HTML5

Well it ain't pretty but it works... _Kinda..._ Leaving aside for now IE8 (You'll need some fall backs and polyfills in place if you want to support this browser), support for HTML5 video is actually pretty good.  The `<video>` element itself is supported in [most modern browsers](http://beta.caniuse.com/#feat=video), the tricky bit comes when choosing your video container and codec.  The `<video>` element can link to any type of video, **there is no standard**. It's down to the developer to know what video and audio codecs are supported by each browser, luckily `<video>` will allow you to reference multiple video sources and the browser will play the first one it understands.

For a good general coverage I chose to output the following video/audio codecs:

* Theora+Vorbis+Ogg
* H.264+AAC+MP4
* WebM

> Check out this [caniuse][caniusevideo] matrix for full browser support details.

## Enough already give me the script...

**Woah there!** slow down firstly a bit of setup.  Lets get the prerequisites out of the way. This has been primarily tested on a Mac with dependencies installed using the excellent Mac package manager _[brew][brew]_. Installing these packages on a linux-based system should be a fairly similar process, switch out [brew][brew] for your package manager of choice.  I haven't tested this script on a windows environment, but if you're feeling daring why not give [Chocolatey](https://chocolatey.org/ "Chocolatey windows package manager") a go.

### Prerequisites

* Handbrake Cli
* ffmpeg with libvpx and libvorbis
* ffmpeg2theora

Lets get started, open up a terminal and get typing, first we add a brew-tap to install Handbrake Cli:

```bash
$ brew tap sceaga/tap;
$ brew install handbrakecli;
```

install the other dependencies:

```bash
$ brew install ffmpeg --with-libvpx --with-libvorbis
$ brew install ffmpeg2theora
```

## The Script

The credit for this script goes squarely to @markupboy's [html5video.sh script](https://gist.github.com/markupboy/816610) which I've forked and adapted to output a screencap from the input video after a specified number of seconds.

{% gist johnmoxon/a798474f5d44e505bc71 %}

### Usage

```bash
# Input parameters
# ./html5video.sh infile.mp4 {number of seconds to take screencap after}

# Example
./html5video.sh mybigvideo.mp4 22
```

> **Note:** recent versions of chrome and firefox support both webm and Ogg/Theora video
codecs, so you may only need to provide webm and mp4 versions

## Other articles on HTML5 video
* [Dive into HTML5 - Video][diveintohtml5video]
* [Smoothing corporate proxy pains with cntlm][cntlm]

[diveintohtml5video]: http://diveintohtml5.info/video.html
[caniusevideo]: http://beta.caniuse.com/#feat=video,webm,ogv,mpeg4
[miro]: http://www.mirovideoconverter.com/
[brew]: http://brew.sh/
