import commentsUrl from '../commentsUrl.js';

test('Display number of comments', () => {
  const arr = [
    {
      comment: 'Nice Adventure Movie',
      creation_date: '2022-05-19',
      username: 'Kwesi',
    },
    {
      username: 'Nii',
      creation_date: '2022-05-19',
      comment: 'Great Movie',
    },
    {
      username: 'Forest Gump',
      comment: 'Great Movie',
      creation_date: '2022-05-19',
    },
  ];
  const counter = commentsUrl.counterComments(arr);
  expect(counter).toBe(3);
});