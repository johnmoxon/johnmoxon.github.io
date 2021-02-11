---
layout: error
title: Test form
sitemap: false
robots: false
published: false
date: February 10, 2021 10:06 PM
permalink: /test-form.html
---

<form method="POST" action="https://jmoxon-blog-comments.herokuapp.com/v3/entry/github/johnmoxon/johnmoxon.github.io/stage/comments">
  <input name="options[redirect]" type="hidden" value="/">
  <input name="options[slug]" type="hidden" value="test-slug">
  <label>Name: <input name="fields[name]" type="text"></label><br>
  <label>Email: <input name="fields[email]" type="email"></label><br>
  <label>Message: <br><textarea name="fields[message]" rows="12" cols="36"></textarea></label><br>
  <input type="submit" value="Submit">
</form>