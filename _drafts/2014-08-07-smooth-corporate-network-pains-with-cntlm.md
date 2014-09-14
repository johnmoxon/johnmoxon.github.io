---
layout: post
title:  "Smooth corporate network pains with cntlm"
date:   2014-08-07 12:22:55
category: workflow
tags: ["cntlm"]
description: ""
keywords: "all, blogs, need, keywords"
---

If you've ever worked for a professional organisation with a corporate firewall and proxy (particularly in a Microsoft NTML environment), you know that it can be a real pain. Setting up your preferred toolset and workflow can hit roadblock after roadblock.  Your apps don't work, git pull fails, your everyday workflow grinds to a halt, your productivity is hitting an all time low.

Internet browsers and some applications are kind enough to observe your OS proxy configuration, but what about the apps that don't?  More troublesome still is a corporate proxy that does not allow simple authentication, this can result in a barrage of authentication popups requiring you to re-enter your username and password again and again... So frustrating!...

## CNTLM is pain relief

Cntlm is a locally run service you can install on your computer - a proxy for your proxy.  It won't fix everything but it certainly takes the edge off that pain. Cntlm intercepts TCP/IP traffic and makes sure it is routed to your office proxy with the properly wrapped authentication making the whole experience a little bit sweeter.












[brew]: http://brew.sh/
