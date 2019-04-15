const {html} = require('common-tags');
const stripLanguage = require('../../_filters/strip-language');

/* eslint-disable require-jsdoc */

/**
 * Collapse all topics for a learning path into an array of slugs.
 * @param {Array<Object>} topics An array of topic objects, each containing
 * slugs for the pathItems that make up a learning path.
 * @return {Array} An array of pathItem slugs.
 */
function getPathItemsFromTopics(topics) {
  return topics.reduce(
    (pathItems, topic) => pathItems.concat(topic.pathItems),
    []
  );
}

/**
 * Find the slug for the next pathItem in a learning path.
 * @param {Object} path A learning path.
 * @param {string} slug The current page slug.
 * @return {string} The next pathItem slug or a terminating empty string.
 */
function findNextPathItemBySlug(path, slug) {
  const items = getPathItemsFromTopics(path.topics);
  const idx = items.indexOf(slug);
  return items[idx + 1] || '';
}

/**
 * Find an item in a collection using its slug.
 * @param {Array} collection collection to search.
 * @param {string} slug slug of the item to search for.
 * @return {Object|undefined} The collection item or undefined.
 */
function findCollectionItemBySlug(collection, slug) {
  return collection.find((item) => item.fileSlug === slug);
}

/**
 * Find the next item in a collection using the current item's slug.
 * @param {Array} collection collection to search.
 * @param {string} slug slug of the current item.
 * @return {Object|undefined} The next item in the collection or undefined.
 */
function findNextCollectionItemBySlug(collection, slug) {
  const idx = collection.findIndex((item) => item.fileSlug === slug);
  return collection[idx + 1];
}

module.exports = ({back, backLabel, collection, path, slug}) => {
  let forward;
  let forwardLabel;
  let next;

  // This is gross and should be refactored :(
  // https://github.com/GoogleChrome/web.dev/issues/810

  // If we're looking through the blog there will be a collection and a slug.
  if (!path && collection && slug) {
    next = findNextCollectionItemBySlug(collection, slug);
    // If we're looking through a learning path there will be a path, a
    // collection, and a slug.
  } else if (path && collection && slug) {
    // oof.
    next = findCollectionItemBySlug(
      collection,
      findNextPathItemBySlug(path, slug)
    );
  }

  if (next) {
    forward = stripLanguage(next.url);
    forwardLabel = next.data.title;
  }

  // Otherwise if this is a codelab just render the back button.

  function renderBack(link, label) {
    return html`
      <a
        class="w-article-navigation__link w-article-navigation__link--back"
        href="${link}"
      >
        ${label}
      </a>
    `;
  }

  function renderForward(link, label) {
    return html`
      <a
        class="w-article-navigation__link w-article-navigation__link--forward"
        href="${link}"
      >
        <div class="w-article-navigation__column">
          <h3 class="w-article-navigation__heading">Next article</h3>
          ${label}
        </div>
      </a>
    `;
  }

  return html`
    <nav class="w-article-navigation">
      ${back && backLabel && renderBack(back, backLabel)}
      ${forward && forwardLabel && renderForward(forward, forwardLabel)}
    </nav>
  `;
};
