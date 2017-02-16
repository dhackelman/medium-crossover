(function() {
    "use strict";

    const APP = function() {

        function init() {
            console.log('in');
        }

        return {
            init: init
        };

    };

    const THING = APP();
    THING.init();

})();
