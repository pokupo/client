var AnimateAddToCart = function() {
    if($('#' + Config.Cart.cartId).length){
        var imageElement = document.getElementById('goodsToCart');
        var imageToFly = $(imageElement);
        var width = imageToFly.width();
        var height = imageToFly.height();
        var position = imageToFly.offset();
        var flyImage = imageToFly.clone().insertBefore(imageToFly);
    
        var cartPosition = $('#' + Config.Cart.cartId).offset();

        flyImage.appendTo('body').css({
            "position": "absolute",
            "left": position.left,
            "top": position.top,
            "z-index": 10000,
            "width": width,
            "height": height
        });
        flyImage.animate({
            width: 0,
            height: 0,
            left: cartPosition.left,
            top: cartPosition.top
        }, 600, 'linear');

        setTimeout(function() {
            flyImage.remove()
        }, 600);
    }
}

