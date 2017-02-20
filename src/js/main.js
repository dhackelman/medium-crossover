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
                this.storyImage = storyData.image;
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
                    storyImage: this.storyImage,
                    fullName: this.fullName,
                    date: this.date,
                    postWordCount: this.postWordCount,
                    id: this.id,
                    postTitle: this.postTitle,
                    body: this.body
                    //eventually link to body of article
                };
                const html = template(context);
                $('.stories-content-box').prepend(html);
            }

        }

        class SideStoriesTopStories {
            constructor(storyData) {
                this.fullName = storyData.user.name;
                this.image = storyData.user.image;
                this.postTitle = storyData.title;
                this.id = storyData.id;
                this.build();
            }

            build() {
                const source = $('#side-bar-template').html();
                const template = Handlebars.compile(source);
                const context = {
                    fullName: this.fullName,
                    postTitle: this.postTitle,
                    image: this.image,
                    id: this.id
                };
                const html = template(context);
                $('.user-stories-container').prepend(html);
                // $('.authors-picks').prepend(html);
            }
          }

            class SideStoriesAuthorPicks{
            constructor(storyData) {
                this.fullName = storyData.user.name;
                this.image = storyData.user.image;
                this.postTitle = storyData.title;
                this.id = storyData.id;
                this.build();
            }

            build() {
                const source = $('#side-bar-template').html();
                const template = Handlebars.compile(source);
                const context = {
                    fullName: this.fullName,
                    postTitle: this.postTitle,
                    image: this.image,
                    id: this.id
                };
                const html = template(context);
                $('.authors-picks').prepend(html);
            }

        }

        class UserMaker {
            constructor(apple) {
                this.fullName = apple.name;
                this.id = apple.id;
                this.image = apple.image;
                this.description = apple.description;
                this.build();
            }

            build() {
                const source = $('#user-template').html();
                const template = Handlebars.compile(source);
                const context = {
                    fullName: this.fullName,
                    image: this.image,
                    description: this.description,
                    id: this.id
                };
                const html = template(context);
                $('.users-box').prepend(html);
            }

        }

        function bindEvents() {
          buildTemplateWithData();
          writeStoryButton();
          signInSignUp();
          clickCategories();
          closeSignUp();
          createUser();
          authorPostBody();
          // sideBarContentShowEachTopStory();
          // sideBarContentShowAuthorsPick();
          usersTab();
          // deleteThisUser();
        }

        function buildTemplateWithData() {
            $.get("https://medium-crossover.herokuapp.com/posts").then(
                function(response) {
                    for (let i = 0; i < 10; i++) {
                        new IndividualStories(response[i]);
                    }
                    console.log(response);
                });
        }

        function buildTemplateWithRandom() {
            $.get("https://medium-crossover.herokuapp.com/posts").then(
                function(response) {
                    response.sort(function(a, b) {
                        return 0.5 - Math.random();
                    });
                    for (let i = 0; i < 7; i++) {
                        new IndividualStories(response[i]);
                        // populateSideStories(response[i]);
                    }
                    console.log(response);
                });
        }

        function deleteUserProfile() {
            $('.users-box').on('click', '.delete-button', function() {
                event.preventDefault;
                console.log($(this).data('id'));
                // if ($(this).data('id') != arg) {
                //     $(this).toggleClass('hide');
                // }

                // $('.user-in').remove();

            });
        }

        // function deleteUserRequest(arg) {
        //     const settings = {
        //         method: 'DELETE',
        //         url: `https://medium-crossover.herokuapp.com/users${arg}`,
        //         headers: {
        //             "content-type": "application/json;charset=utf-8"
        //         }
        //     };
        //
        //     $.ajax(settings).then((response) => {
        //         console.log(response);
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        // }

        function authorPostBody() {
            $(".stories-content-box").on('click', ".post-container", function() {
                event.preventDefault();
                let articleId = $(this).data('id');
                console.log(articleId);
                replaceMainContent(articleId);
                $('.side-content-bar').toggleClass('hide');
                $('.author-post-body').toggleClass('hide');
                $('.post-container').toggleClass('expand');
            });
        }

        function sideBarContentShow() {
            $('.top-stories-content').on('click', '.post-container-side-style', function() {
                event.preventDefault();
                // console.log(event.target[0].getAttribute('data-id'));
                let articleId = $(this).data('id');
                console.log(articleId);
                replaceMainContent(articleId);
                $('.side-content-bar').toggleClass('hide');
                $('.author-post-body').toggleClass('hide');
                $('.post-container').toggleClass('expand');
            });
        }

        function replaceMainContent(arg) {
            let divLength = $('.stories-content-box').children().length;
            console.log(divLength);
            for (let i = 0; i < divLength; i++) {
                $('.stories-content-box').children().each(function() {
                    if ($(this).data('id') != arg) {
                        $(this).toggleClass('hide');
                    }
                });
            }
        }

        function clickCategories() {
            categoriesButtons.on('click', 'li', function() {
                buildTemplateWithRandom();
            });
        }

        function closeSignUp() {
            closeSignUpDiv.addEventListener('click', function() {
                event.preventDefault();
                signInCont.classList.add('hide');
            });
        }

        function createUser() {
            createUserForm.addEventListener('submit', function() {
                event.preventDefault();
                let userData = {};
                for (let i = 0; i < event.target.length; i++) {
                    userData.name = event.target[0].value;
                    userData.description = event.target[1].value;
                    userData.image = event.target[2].value;
                    userData.image = event.target[3].value;
                }
                console.log(userData);
                sendUserData(userData);
                getNewUsers();
                $('.users-box').toggleClass('hide');
                $('.sign-in-page').toggleClass('hide');
            });
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
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
        }

        function getNewUsers() {
            $.get("https://medium-crossover.herokuapp.com/users/").then(
                function(response) {
                    $('.users-box').empty();
                    for (let i = 0; i < response.length; i++) {
                        // console.log(response);
                        new UserMaker(response[i]);
                    }

                }).catch();
        }

        function usersTab() {
            $('.users-tab').on('click', 'li', function() {
                event.preventDefault();
                getNewUsers();
                $('.users-box').toggleClass('hide');
                $('.stories-content-box').toggleClass('hide');
                $('.side-content-bar').toggleClass('hide');

                console.log('in');
            });
        }


       function placeMainContent() {
         let contentPlacement = ($('.header').position().top + $('.header').height());
         $('.main-content-body').css('margin-top',contentPlacement);
       }


        function populateSideStories(arg) {
            new SideStories(arg);
        }

        function signInSignUp() {
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

        // function deleteUsers() {
        //     $('.users-box').empty();
        // }

        function init() {
          placeMainContent();
          bindEvents();
            // deleteUsers();
        }

        return {
            init: init
        }

    }

    const THING = APP();
    THING.init();

})();
