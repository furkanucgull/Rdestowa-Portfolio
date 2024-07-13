// utils/fakeData.js

const fakePosts = [
  {
    slug: 'post-1',
    title: 'Furkan Üçgül',
    image: '/images/furkan.JPEG',
    preview: 'Adana - Turkey ☾✩',
    content: 'Content section',
    date: '2023-12-05T19:13:08.113Z',
  },
  {
    slug: 'post-2',
    title: 'Camilla Carbonero',
    image: '/images/cami.JPEG',
    preview: '? - Italy',
    content: 'Content section',
    date: '2021-11-04T19:13:08.113Z',
  },
  {
    slug: 'post-3',
    title: 'Masha Chemruk',
    image: '/images/masha.JPEG',
    preview: '? - Belarus',
    content: 'Content for section',
    date: '2021-11-04T19:13:08.113Z',
  },
  {
    slug: 'post-4',
    title: 'Katerina Topi',
    image: '/images/katerina.JPEG',
    preview: ' ? - Greece',
    content: 'Content for section',
    date: '2021-11-04T19:13:08.113Z',
  },
  {
    slug: 'post-5',
    title: 'Gwen Darien',
    image: '/images/gwen.JPEG',
    preview: '?  - France',
    content: 'Content section',
    date: '2021-11-04T19:13:08.113Z',
  },
];

export function getFakePosts(fields = []) {
  return fakePosts.map((post) => {
    const filteredPost = {};
    fields.forEach((field) => {
      if (post[field]) {
        filteredPost[field] = post[field];
      }
    });
    return filteredPost;
  });
}

export function getFakePostBySlug(slug, fields = []) {
  const post = fakePosts.find((post) => post.slug === slug);
  if (!post) {
    return null;
  }
  const filteredPost = {};
  fields.forEach((field) => {
    if (post[field]) {
      filteredPost[field] = post[field];
    }
  });
  return filteredPost;
}
