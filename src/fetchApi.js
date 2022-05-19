export default class fetchApi {
    static likeUrl =
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UUC27nnzGoxTuyIJisKA/likes';

    static setLikes = async (id) => {
      const response = await fetch(this.likeUrl, {
        method: 'POST',
        body: JSON.stringify({
          item_id: id,
        }),
        headers: {
          'Content-type': 'application/JSON',
        },
      });

      const data = await response.text();
      return data;
    };

    static getLikes = async () => {
      const response = await fetch(this.likeUrl);
      const data = await response.json();
      return data;
    };
}