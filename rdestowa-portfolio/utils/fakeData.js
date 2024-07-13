// utils/fakeData.js

export const getFakePosts = (fields = []) => {
  const fakePosts = [
    {
      slug: 'post-1',
      title: 'First Fake Post',
      image: 'https://placehold.it/600x400',
      preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      author: 'John Doe',
      date: '2023-01-01',
    },
    {
      slug: 'post-2',
      title: 'Second Fake Post',
      image: 'https://placehold.it/600x400',
      preview: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Jane Smith',
      date: '2023-02-01',
    },
  ];

  const items = fakePosts.map((post) => {
    const item = {};
    fields.forEach((field) => {
      if (post[field]) {
        item[field] = post[field];
      }
    });
    return item;
  });

  return items;
};
