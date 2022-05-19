export default class commentsUrl {
    static setComments = async (id, username, comment) => {
      const response = await fetch(this.commentsUrl, {
        method: 'POST',
        body: JSON.stringify({
          item_id: id,
          username,
          comment,
        }),
        headers: {
          'Content-type': 'application/JSON',
        },
      });

      const data = await response.text();
      return data;
    };
}