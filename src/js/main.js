(function() {
    "use strict";

    const APP = function() {
      const writeAbutton = document.querySelector('.author-write-story');
      const signInButton = document.querySelector('.sign-in-link');
      const categoriesButtons = $('.categories-menu');
      const postContainer = document.querySelector('.post-container');
      const closeSignUpDiv = document.querySelector('.close-div');
      const signInCont = document.querySelector('.sign-in-page');
      const signInBut = document.querySelector('.author-write-story');
      const createUserForm = document.querySelector('.sign-in-form');
      const createUserButton = document.querySelector('.create-user');

        class IndividualStories {
          constructor(storyData) {
            this.image = storyData.user.image;
            this.fullName = storyData.user.name;
            this.date = storyData.created_at;
            this.postWordCount = storyData.postWordCount;
            this.id = storyData.id;
            this.postTitle = storyData.title;
            this.body = storyData.body;
            //eventual link to body of article
            this.build();
          }


          build() {
            const source = $('#post-template').html();
            const template = Handlebars.compile(source);
            const context = {
              image: this.image,
              fullName: this.fullName,
              date: this.date,
              postWordCount: this.postWordCount,
              id: this.id,
              postTitle: this.postTitle
              //eventually link to body of article
            };
            const html = template(context);
            $('.stories-content-box').prepend(html);
          }

        }

        class SideStories {
          constructor(storyData) {
            this.fullName = storyData.user_id;
            this.postTitle = storyData.title;
            this.build();
          }

          build() {
            const source = $('#side-bar-template').html();
            const template = Handlebars.compile(source);
            const context = {
              fullName: this.fullName,
              postTitle: this.postTitle
            };
            const html = template(context);
            $('.user-stories-container').prepend(html);
            $('.authors-picks').prepend(html);
          }

        }

        class UserMaker {
          constructor(apple) {
            this.fullName = apple.name;
            this.image = apple.image;
            this.build();
          }

          build() {
            const source = $('#user-template').html();
            const template = Handlebars.compile(source);
            const context = {
              fullName: this.fullName,
              image: this.image
            };
            const html = template(context);
            $('.stories-content-box').prepend(html);
          }

        }

        function bindEvents() {
          buildTemplateWithData();
          writeStoryButton();
          signInSignUp();
          clickCategories();
          closeSignUp();
          createUser();
        }

        function buildTemplateWithData() {
          $.get("https://medium-crossover.herokuapp.com/posts").then(
            function (response) {
              for (let i = 0; i < response.length; i++) {
                new IndividualStories(response[i]);
                populateSideStories(response[i]);
            }
            console.log(response);
          });
        }



        function clickCategories() {
          categoriesButtons.on('click', 'li', function() {
            console.log('in');
          });
        }

        function closeSignUp() {
          closeSignUpDiv.addEventListener('click', function() {
            event.preventDefault();
            signInCont.classList.add('hide');
          })
        }

        function createUser() {
          createUserForm.addEventListener('submit', function() {
            event.preventDefault();
            let userData = {};
            console.log(event.target[0].value);
            console.log(event.target[1].value);

            for (let i=0; i<event.target.length; i++) {
              userData.name = event.target[0].value;
              userData.description = event.target[1].value;
              userData.image = event.target[2].value;
            }
            console.log(userData);
            sendUserData(userData);
            getNewUsers();
          })
        }

        function sendUserData(userData) {
            const settings = {
                method: 'POST',
                url: `https://medium-crossover.herokuapp.com/users`,
                headers: {
                    "content-type": "application/json;charset=utf-8"
                },
                data: JSON.stringify(userData)
            };

            $.ajax(settings).then((response) => {
                console.log('success');
            }).catch((error) => {
                console.log(error);
            });
        }

        function getNewUsers(id) {
          $.get("https://medium-crossover.herokuapp.com/users/`${id}`").then(
            function (response) {
              for (let i = 0; i < response.length; i++) {
                console.log(response);
                new UserMaker(response[i]);
            }

          }).catch();
        }

        function populateSideStories(arg) {
          new SideStories (arg);
        }



        function signInSignUp () {
          signInButton.addEventListener('click', () => {
            console.log('in');
            signInCont.classList.remove('hide');
            });
        }

        function writeStoryButton() {
          writeAbutton.addEventListener('click', () => {
            console.log('in');
          });
        }

        function init() {
            bindEvents();
            // loadStories();
        }

        return {
            init: init
        };

    };

    const THING = APP();
    THING.init();

})();
