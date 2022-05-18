export default class Movies {
  static movieUrl = 'https://api.tvmaze.com/search/shows?q=game';

  static updateLikes = () => {
    fetchApi.getLikes().then((data) => {
      data.forEach((item) => {
        const boxIcon = document.getElementById(`${item.item_id}`);
        if (boxIcon) {
          boxIcon.nextElementSibling.innerHTML = `${item.likes} likes`;
        }
      });
    });
  };

  static setEventLikes = () => {
    const likeIcon = document.querySelectorAll('.like-icon');
    likeIcon.forEach((e) => {
      e.addEventListener('click', () => {
        fetchApi.setLikes(parseInt(e.id, 10)).then(() => {
          this.updateLikes();
        });
      });
    });
  };

  static handleForm = (id) => {
    const username = document.querySelector('.name-user');
    const comment = document.querySelector('.comment');
    const addComment = document.querySelector('.send-comment');
    addComment.addEventListener('click', (e) => {
      e.preventDefault();

      commentsUrl
        .setComments(id, username.value, comment.value)
        .then((data) => {
          if (data === 'Created') {
            this.renderComments(id);
            username.value = '';
            comment.value = '';
          }
        });
    });
  };

  static renderComments = (idMovie) => {
    commentsUrl.getComments(idMovie).then((data) => {
      const list = document.querySelector('.comments-list');
      const title = document.querySelector('.title-comment');
      title.textContent = `Comments (${commentsUrl.counterComments(data)})`;
      list.innerHTML = '';
      data.forEach((item) => {
        const listItem = document.createElement('li');

        listItem.textContent = `${item.creation_date} ${item.username} : ${item.comment}`;
        list.appendChild(listItem);
      });
    });
  };

  static getMovies = async () => {
    const response = await fetch(this.movieUrl);
    const data = await response.json();
    const movieContainer = document.querySelector('.movie-container');

    data.forEach((item) => {
      if (item.show.image !== null) {
        const div = document.createElement('div');
        div.classList.add('div-container');
        div.innerHTML = `<img src="${item.show.image.medium}" alt="">
      <div class="media flex main-space-between">
        <li>${item.show.name}</li>
        <div class="likes-container">
          <box-icon color="red" animation="tada-hover" id=${item.show.id} class="like-icon" name='heart'></box-icon>
          <p>0 Likes</p>
        </div>
      </div>      
      <button id="${item.show.id}" class="button">Comments</button>`;
        movieContainer.appendChild(div);
      }
    });
    this.setEventLikes();
    this.updateLikes();

    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = event.target.getAttribute('id');
        const allData = data.filter(
          (item) => item.show.id === parseInt(id, 10),
        )[0].show;
        const template = `<div class="card-wrapper">
        <div class="card">
          <div class="card-header">
            <div class="close">
              <i class="fas fa-times"></i>
            </div>
            <h2 class="card-title text-center">${allData.name}</h2>
            <div class="card-image flex main-center">
              <img src="${allData.image.medium}" alt="character">
            </div>
            
          </div>
          <div class="card-content">
            <div class="flex">
              
              <ul class="description">
                <li><p>Genre:</p> <span>${allData.genres.toString() || 'No available'}</span></li>
                <li><p>Language:</p> <span>${allData.language || 'No available'}</span></li>
                <li> <p>Premiered:</p> <span>${allData.premiered || 'No available'}</span></li>
                <li> <p>Rating:</p> <span>${allData.rating.average || 'No available'}</span></li>
                <li> <p>Official site:</p> <span><a class="link" href="${allData.officialSite}">link</a></span></li>
              </ul>  
            </div>
            <div class="summary">
              <h3>Summary</h3>
              ${allData.summary}
            </div>
            
          </div>
          <div class="d-comments">
            <h3 class="title-comment">Comments (0)</h3>
            <ul class="comments-list"></ul>
          </div>
          
          <div class="formulary">
          <h3>Add comments</h3>
          <form class = "btn-send" action="">
            <input class="name-user" type="text" placeholder="Your name">
            <input class="comment" type="text" placeholder="Your comment">
            <button class="send-comment button" type="submit">Send</button>
          </form>
          </div>
        </div>
      </div>`;
        document.body.insertAdjacentHTML('beforeend', template);

        const close = document.querySelectorAll('.close');
        close.forEach((item) => {
          item.addEventListener('click', () => {
            document.querySelector('.card-wrapper').remove();
          });
        });
        this.renderComments(button.id);
        this.handleForm(button.id);
      });
    });
  };
}
