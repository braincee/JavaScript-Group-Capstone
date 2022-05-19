import fetchApi from './fetchApi.js';

export default class Movies {
  static url = 'https://api.tvmaze.com/search/shows?q=boys';

  static clickLikes = () => {
    const likeIcon = document.querySelectorAll('.like-icon');
    likeIcon.forEach((element) => {
      element.addEventListener('click', () => {
        fetchApi.setLikes(parseInt(element.id, 10)).then(() => {
          this.newLikes();
        });
      });
    });
  };

  static newLikes = () => {
    fetchApi.getLikes().then((data) => {
      data.forEach((item) => {
        const boxicon = document.getElementById(`${item.item_id}`);
        if (boxicon) {
          boxicon.nextElementSibling.innerHTML = `${item.likes} likes`;
        }
      });
    });
  };

  static counterMovies = async () => {
    const response = await fetch(this.url);
    const data = await response.json();
    let count = 0;
    data.forEach((item) => {
      if (item.show.image !== null) {
        count += 1;
      }
      const title = document.querySelector('.title');
      if (title) title.textContent = `Top (${count})Rating Movies `;
    });

    return count;
  };

  static displayComment = (id) => {
    const username = document.querySelector('.user-name');
    const comment = document.querySelector('.comment');
    const buttonAdd = document.querySelector('.add-comment');
    buttonAdd.addEventListener("click", (e) => {
      e.preventDefault();

      commentsUrl.setComments(id, username.value, comment.value)
        .then((data) => {
          if (data === "Created") {
            this.countComment(id);
            username.value = "";
            comment.value = "";
          }
        });
    });
  };

  static displayMovies = async () => {
    const response = await fetch(this.url);
    const data = await response.json();
    const movieContainer = document.querySelector('.movie-container');

    data.forEach((item) => {
      if (item.show.image !== null) {
        const div = document.createElement('div');
        div.classList.add('each-movie');
        div.innerHTML = `<img src="${item.show.image.medium}" alt="movie-image">
      <div class="each">
        <li>${item.show.name}</li>
        <div class="likes">
          <box-icon color="orange" animation="burst-hover" id=${item.show.id} type="solid" class="like-icon" name='like'></box-icon>
          <p>0 Likes</p>
        </div>
      </div>      
      <button id="${item.show.id}" class="button">Comments</button>`;
        movieContainer.appendChild(div);
      }
    });
    this.clickLikes();
    this.newLikes();

    const commentBtn = document.querySelectorAll('.button');

    commentBtn.forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = event.target.getAttribute('id');
        const popUp = data.filter(
          (item) => item.show.id === parseInt(id, 10),)[0].show;
        const popupDisplay = `<div class="popup-display">
        <div class="popup">
          <div>
            <div class="fa-times">
              <i class="fas fa-times"></i>
            </div>
            <h2 class ="text-center">${popUp.name}</h2>
            <div class="popup-image flex main-center">
              <img src="${popUp.image.medium}" alt="character">
            </div>
            
          </div>
          <div class="card-content">
            <div class="flex">
              
              <ul class="details">
                <li><p>Genre:</p> <span>${
                  popUp.genres.toString() || 'No available'}</span></li>
                <li><p>Language:</p> <span>${popUp.language || 'No available'}</span></li>
                <li> <p>Premiered:</p> <span>${popUp.premiered || 'No available'}</span></li>
                <li> <p>Rating:</p> <span>${popUp.rating.average || 'No available'}</span></li>
                <li> <p>Official site:</p> <span><a class="link" href="${popUp.officialSite}">Watch</a></span></li>
              </ul>  
            </div>
            <div class="summary">
              <h5>Summary</h5>
              <p>${popUp.summary}</p>
            </div>
            <div class="d-comments">
            <h5 class="comment-count">Comments 0</h5>
            <ul class="display-comments"></ul>
          </div>
          </div>
         
          
          <div>
          <h5 class="text-center">Add comments</h5>
          <form class = "btn-send" action="">
            <input class="user-name" type="text" placeholder="Your name ...">
            <input class="comment" type="text" placeholder="Your comment ...">
            <button class="add-comment button" type="submit">Send</button>
          </form>
          </div>
        </div>
      </div>`;
        document.body.insertAdjacentHTML('beforeend', popupDisplay);

        const timesBtn = document.querySelectorAll('.fa-times');
        timesBtn.forEach((item) => {
          item.addEventListener('click', () => {
            document.querySelector('.popup-display').remove();
          });
        });
        this.countComment(button.id);
        this.displayComment(button.id);
      });
    });
  };
}
