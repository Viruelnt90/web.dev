module.exports = {
  // Tags are inherited by all posts.
  tags: ['pathItem', 'lighthouse-best-practices'],
  path: {
    // Slug is used by landing pages like / and /learn to link to this path.
    // Because it affects urls, the slug should never be translated.
    slug: 'lighthouse-best-practices',
    cover: '/images/collections/lighthouse-best-practices.svg',
    title: 'Best Practices audits',
    description:
      'Improve code health of your web page following these best practices',
    overview: `These checks highlight opportunities
    to improve the overall code health of your web app.`,
    topics: [
      {
        title: 'General best practices',
        pathItems: ['doctype', 'errors-in-console', 'image-aspect-ratio'],
      },
      {
        title: 'Make your page fast',
        pathItems: [
          'uses-http2',
          'no-document-write',
          'uses-passive-event-listeners',
        ],
      },
      {
        title: 'Make your page secure',
        pathItems: [
          'is-on-https',
          'external-anchors-use-rel-noopener',
          'no-vulnerable-libraries',
        ],
      },
      {
        title: 'Create a good user experience',
        pathItems: [
          'geolocation-on-start',
          'notification-on-start',
          'password-inputs-can-be-pasted-into',
        ],
      },
      {
        title: 'Avoid deprecated technologies',
        pathItems: ['appcache-manifest', 'deprecations'],
      },
      {
        title: 'Diagnostic audits',
        pathItems: ['js-libraries'],
      },
    ],
  },
};
