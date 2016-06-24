# hexo-generator-archive-alphabet-i18n

Generate i18n alphabetical archive for Hexo.

It will generate a `:lang/archive.html` for each language, the archive page is sorted by alphabet.

> Impressed by [hexo-generator-archive-alphabet] and [hexo-generator-archive].

It's the i18n version of [hexo-generator-archive-alphabet].

**NOTICE**: You can only choose one of the two plugins, [hexo-generator-archive] or hexo-generator-archive-alphabet-i18n.

**NOTICE**: You should probably need to modify your theme's archive template to adapt this plugin. See [Usage](#usage) for more information.

A live site using this plugin: http://js-index.com/

And the GitHub repo for that site: https://github.com/xcatliu/js-index

For an non-i18n version of this plugin: https://github.com/xcatliu/hexo-generator-archive-alphabet

## Installation

```shell
$ npm install hexo-generator-archive-alphabet-i18n --save
```

## Usage

After using this plugin, every posts will come up with an additional property `alphabet`, which means the first letter of the title of the post.

There are several rules of `alphabet`, let's see some examples:

Title       | `alphabet` | Explanation
----------- | ---------- | -----------
Hello World | H          | The normal one
banana      | B          | `alphabet` will always be uppercase
1 world     | #          | If first letter is number, then alphabet will be `#`
你好中国     | N          | If first letter is unicode character, then `alphabet` will be the translated first letter
\_tail      | _          | If first letter is other character, then `alphabet` will be `_`
.dotfile    | _          | As above

Tip: You can easily compare the `alphabet`, it will return a common sense result:

```js
'#' < 'A' // true
'A' < 'B' // true
'Z' < '_' // true
```

You should probably need to modify your theme's archive template to adapt this plugin.

Or you can choose a theme that support this plugin. Like https://github.com/xcatliu/hexo-theme-wiki-i18n

Here is an example archive template:

```html
<!DOCTYPE html>
<html>
  <body>
    <div class="container">
    <%
    var lastAlphabet = '';
    page.posts.forEach(post => {
      if (typeof post.alphabet === 'undefined') post.alphabet = '_';
      if (lastAlphabet !== post.alphabet) {
        lastAlphabet = post.alphabet; %>
        <h3 class="words-title"><%= lastAlphabet %></h3>
      <% } %>
      <a class="word" href="<%= url_for(post.path) %>">
        <%= post.title %>
      </a>
    <% }) %>
    </div>
  </body>
</html>
```

See ??? for more details.

## Options

```yml
archive_generator:
  per_page: 10
```

- per_page: Posts displayed per page. (0 = disable pagination)

[hexo-generator-archive]: https://github.com/hexojs/hexo-generator-archive
[hexo-generator-archive-alphabet]: https://github.com/xcatliu/hexo-generator-archive-alphabet
