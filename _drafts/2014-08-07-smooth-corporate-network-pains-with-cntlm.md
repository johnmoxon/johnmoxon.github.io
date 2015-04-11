---
layout: post
title:  "Smooth corporate network pains with cntlm"
date:   2014-08-07 12:22:55
category: workflow
type: article
tags: ["cntlm"]
description: "How to setup a local proxy to wrap http requests with NTLM authentication"
keywords: "all, blogs, need, keywords"
---

If you've ever worked for a professional organisation with a corporate firewall and proxy (particularly in a Microsoft NTML environment), you know that it can be a real pain. Setting up your preferred toolset and workflow can hit roadblock after roadblock.  Your apps don't work, git commands fail, your everyday workflow grinds to a halt, your productivity is hitting an all time low.

Internet browsers and some applications are kind enough to observe your OS proxy configuration, but what about the apps that don't?  More troublesome still is a corporate proxy that does not allow simple authentication, this can result in a barrage of authentication popups requiring you to re-enter your username and password again and again... So frustrating!...

## CNTLM is pain relief

Cntlm is a locally run service you can install on your machine - a proxy for your proxy.  It won't fix everything but it certainly takes the edge off that pain. Cntlm intercepts TCP/IP traffic and makes sure it is routed to your office proxy with the properly wrapped authentication making the whole experience a little bit sweeter.

## Setting up

I've tested this on both a mac and an Ubuntu machine.  I have colleagues who have Cntlm running on Windows, but I won't be going into how to set that up here.  The credit for setup goes squarely to @\_oho and his [excellent writeup](http://blog.hoachuck.biz/blog/2013/03/21/howto-set-cntlm-on-mac-os-x/ "Excellent cntlm how-to guid for mac") had me up and running in no time. Thanks!

If you're game enough to compile and run from source then go ahead and grab the files from [http://cntlm.sourceforge.net/](http://cntlm.sourceforge.net/).  I opted to install via the awesome brew package manager with the command below:

```bash
brew install cntlm
```
> homebrew for Mac is an awesome package manager, that handles updates and dependencies like yum or apt-get.  Check out my article on [getting started with brew](/article-i-havent-written-yet)














[brew]: http://brew.sh/
