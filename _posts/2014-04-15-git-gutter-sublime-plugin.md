---
layout: post
title:  "Git Gutter Sublime Plugin"
date:   2014-02-12 12:22:55
tags: git corporate
description: "all blog posts need descriptions"
keywords: "all, blogs, need, keywords"
---

There are a few plugins for sublime text that I just can't live without, [GitGutter][gitgutter] is very quickly becoming a must-have development aid in my development workflow.  A simple idea that uses diff style icons in the gutter of your sublime text window to show you where you have added new/modified or deleted lines of code since your last commit.

If your already using Git ([and you should be!](http://insertwhyusegitlink)) then this plugin will become invaluable very quickly.   One of the major advantages of using Git over another version control system like SVN is that you can commit your work locally many times before pushing it to a remote repository, allowing you to leverage the power of version control without having to push unfinished code to a shared repository.

GitGutter allows you to keep an eye on how much of your file you have edited, so you can better decide when it's time to do a commit.

![GitGutter in action](http://imagepath/images/git-gutter-in-action.jpg)

## Installing GitGutter
Installing GitGutter is easy using the excellent [SublimeText package control plugin](https://sublime.wbond.net/installation) by Will Bond.  If you don't already have package control installed... **do it now!** Seriously, there are other ways to install SublimeText plugins, but nothing comes close the intuitive in-editor experience that Package Control has acheieved.

To install launch the command pallate:

> [Cmd + Shift + p] (Mac) or...
>
> [Ctrl + Shift + p] (Win)

and type `install` and hit return.  This should select the _Package Control: Install Package_ option. Just type `GitGutter` and hit return and within seconds... **Voila!** Git Gutter is installed.

![Launch the command pallate and type 'GitGutter'](http://gitgutterimage.jpg)

When I installed the plugin I already had a file open with uncommited git changes and the gutter icons appeared striaght away without restarting SublimeText.

> [Also see getting package manager working in a corporate environment](http://jmoxon.net/other-article-i-need-to-write)

## Pair with Sublime Git for Super-smooth workflow

Another great plugin the [SublimeText Git](https://github.com/kemayo/sublime-text-git/wiki) addon which allows you to run `git commit`, `git push` and other git commands directly from Sublime's command palatte.

## Other articles for improving your SublimeText workflow
* [Perfect Workflow in Sublime Text - Tuts Plus][perfectSublimeWorflow]
* [Smooting corporate proxy pains with cntlm][cntlm]


[gitgutter]: http://wbond.net/packages/gitgutter
[perfectSublimeWorflow]: http://code.tutsplus.com/articles/perfect-workflow-in-sublime-text-free-course--net-27293
[cntlm]: http://setting-up-cntlm-link
