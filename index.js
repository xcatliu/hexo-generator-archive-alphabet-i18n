/* global hexo */
/* eslint camelcase:0, no-param-reassign:0, strict:0 */
'use strict';

const pagination = require('hexo-pagination');
const transliteration = require('transliteration');
const tr = transliteration.transliterate;

const startByNumber = /^[0-9]/;
const startByLetter = /^[A-Z]/;

// when archive disabled pagination, per_page should be 0.
let per_page;

if (hexo.config.archive === 1) {
  per_page = 0;
} else if (typeof hexo.config.per_page === 'undefined') {
  per_page = 10;
} else {
  per_page = hexo.config.per_page;
}

hexo.config.archive_generator = Object.assign({
  per_page,
}, hexo.config.archive_generator);

hexo.extend.filter.register('before_post_render', data => {
  if (typeof data.alphabet !== 'undefined') return data;

  const upperCaseTitle = tr(data.title).toUpperCase();
  if (startByNumber.test(upperCaseTitle)) {
    data.alphabet = '#';
  } else if (startByLetter.test(upperCaseTitle)) {
    data.alphabet = upperCaseTitle[0];
  } else {
    data.alphabet = '_';
  }
  return data;
});

hexo.extend.generator.register('archive', function (locals) {
  const allPosts = locals.posts.sort('alphabet');
  if (!allPosts.length) return [];

  const config = this.config;
  let archiveDir = config.archive_dir;
  if (archiveDir[archiveDir.length - 1] !== '/') archiveDir += '/';

  const paginationDir = config.pagination_dir || 'page';
  const perPage = config.archive_generator.per_page;

  let result = [];

  function generate(path, posts, options) {
    result = result.concat(pagination(path, posts, {
      perPage,
      layout: ['archive', 'index'],
      format: `${paginationDir}/%d/`,
      data: Object.assign({}, options, { archive: true }),
    }));
  }

  config.language.filter(lang => lang !== 'default').forEach(lang => {
    const filtedPosts = allPosts.filter(item => item.lang === lang);
    generate(`${lang}/${archiveDir}`, filtedPosts);
  });

  return result;
});
