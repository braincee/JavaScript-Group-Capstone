const commentsURL = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UUC27nnzGoxTuyIJisKA/comments";

export default class commentsAPI {
    static setComments = async () => {
        const response = await fetch ((commentsURL), {
         method: 'POST',
         body: JSON.stringify({
             username,
             comment,
             item_id: id,
         }),
         headers: {
             'Content-type': 'application/JSON',
         },

        });
        const data = await response.text();
        return data;
    };

    static getComments = async (id) => {
        const response = await fetch(`${commentsURL}?item_id=${id}`);
        const data = await response.json();
        return data;
    };

    static counterComments = (data) => {
        let count = 0;
        for (let i = 0; i < data.lenth; i++) {
            count = count + 1;
        }
        return count;
    }
}