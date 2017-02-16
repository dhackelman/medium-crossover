(function() {
    "use strict";

    // $(document).ready(() => {


    const APP = function() {




        function init() {
            console.log('in');
        }

        return {
            init: init
        };

    }; //end APP

    // }); //end docready

    const THING = APP();
    THING.init();

})(); //end iife
