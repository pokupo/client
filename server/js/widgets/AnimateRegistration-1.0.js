var AnimateRegistration = function () {
    PKP.UI.init();
    if (Routing.route == 'registration') {
        var step = Routing.params.step;
        var progress = 0;
        var current = step / 4;

        var canvas = document.getElementById('progressCircle');
        var circle = new ProgressCircle({
            canvas: canvas,
        });

        circle.addEntry({
            fillColor: '#ffa800',
            progressListener: function () {
                return progress;
            }
        }).start(30);

        var intervalId;
        if (progress < current) {
            intervalId = setInterval(function () {
                if (progress < current) {
                    progress = progress + 0.015;
                } else {
                    clearInterval(intervalId);
                }
//                progress = (progress < current) ? progress + 0.015 : progress;
            }, 30);

        } else {
            intervalId = setInterval(function () {
                if (progress > current) {
                    progress = progress - 0.015;
                } else {
                    clearInterval(intervalId);
                }
            }, 30);
        }
    }
};

