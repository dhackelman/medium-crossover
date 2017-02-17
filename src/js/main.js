(function() {
    "use strict";

    const APP = function() {
      const writeAbutton = document.querySelector('.author-write-story');
      const signInButton = document.querySelector('.sign-in-link');
      const categoriesButtons = $('.categories-menu');
      const postContainer = document.querySelector('.post-container');

        class IndividualStories {
          constructor(storyData) {
            this.image = storyData.image;
            this.fullName = storyData.fullName;
            this.date = storyData.date;
            this.postWordCount = storyData.postWordCount;
            this.id = storyData.id;
            this.postTitle = storyData.postTitle;
            this.favorited = storyData.favorited;
            this.responded = storyData.responded;
            //eventual link to body of article
            this.build();
          }


          build() {
            const source = $('#post-template');
            const template = Handlebars.compile(source);
            const context = {
              image: this.image,
              fullName: this.fullName,
              date: this.date,
              postWordCount: this.postWordCount,
              id: this.id,
              postTitle: this.postTitle,
              favorited: this.favorited,
              responded: this.responded
              //eventually link to body of article
            }
            $('post-container').prepend(html);
          }

        }
        function bindEvents() {
          buildTemplateWithData();
          writeStoryButton();
          signInSignUp();
          clickCategories();
        }

        function buildTemplateWithData() {
          const settings = {
              "async": true,
              "crossDomain": true,
              "url": `https://medium-crossover.herokuapp.com/posts`,
              "method": "GET",
              "headers": {
                "Access-Control-Allow-Origin":"*"
              }
          };
          $.ajax(settings).then(function(response) {
              // for (let i = 0; i < response.length; i++) {
              //     new IndividualStories(response[i]);
              // }
              console.log(response);
          });
        }

        function clickCategories() {
          categoriesButtons.on('click', 'li', function() {
            console.log('in');
          });
        }



        function signInSignUp () {
          signInButton.addEventListener('click', () => {
            console.log('in');
          })
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
