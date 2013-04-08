var CartWidget = function(){
    var self = this;
    self.widgetName = 'CartWidget';
    self.settings = {
        title : null,
        tmplPath : null,
        tmplId : null,
        inputParameters : {},
        containerId : null,
        showBlocks : null,
        style : null
    };
    self.InitWidget = function(){
        self.settings.containerId = Config.Containers.cart;
        self.settings.title = Config.Cart.title;
        self.settings.tmplPath = Config.Cart.tmpl.path;
        self.settings.tmplId = Config.Cart.tmpl.tmplId;
        self.settings.style = Config.Cart.style;
        self.settings.showBlocks = Config.Cart.showBlocks;
        self.RegisterEvents();
        self.SetInputParameters();
        self.SetPosition();
    };
    self.SetInputParameters = function(){
        self.settings.inputParameters = JSCore.ParserInputParameters(/CartWidget.js/);
        if(self.settings.inputParameters['params']){
            var input = JSON.parse(self.settings.inputParameters['params']);
            self.settings.inputParameters = input;
            if(input.show){
                for(var key in input.show){
                     self.settings.showBlocks[key] = input.show[key];
                }
            }
            if(input.tmpl){
                self.settings.tmplPath = 'userInformation/' + input.tmpl + '.html';
            }
        }
    };
    self.RegisterEvents = function(){
        if(JSLoader.loaded){
            self.BaseLoad.Tmpl(self.settings.tmplPath, function(){
                EventDispatcher.DispatchEvent('CartWidget.onload.tmpl')
            });
        }
        else{
            EventDispatcher.AddEventListener('onload.scripts', function (data){ 
                self.BaseLoad.Tmpl(self.settings.tmplPath, function(){
                    EventDispatcher.DispatchEvent('CartWidget.onload.tmpl')
                });
            });
        }
        
        EventDispatcher.AddEventListener('CartWidget.onload.tmpl', function (){
            self.BaseLoad.CartInfo('', function(data){
                EventDispatcher.DispatchEvent('CartWidget.onload.info', data);
            });
        });
        
        EventDispatcher.AddEventListener('CartWidget.onload.info', function(data){
            self.Fill(data);
        })
        
        EventDispatcher.AddEventListener('widget.authentication.ok', function(){
            self.BaseLoad.CartInfo('', function(data){
                EventDispatcher.DispatchEvent('CartWidget.onload.info', data);
            });
        });
    };
    self.Fill = function(data){
        var info = new CartViewModel();
        info.AddContent(data);
        self.Render(info);
    };
    self.Render = function(data){
        $('#' + self.settings.containerId).empty().append($('script#' + self.settings.tmplId).html());
        ko.applyBindings(data, $('#' + self.settings.containerId)[0]);
        self.WidgetLoader(true);
    };
    self.SetPosition = function(){
        if(self.settings.inputParameters['position'] == 'absolute'){
            for(var key in self.settings.inputParameters){
                if(self.settings.style[key])
                    self.settings.style[key] = self.settings.inputParameters[key];
            }
            $().ready(function(){
                for(var i=0; i<=self.settings.containerId.length-1; i++){
                    $("#" + self.settings.containerId[i]).css(self.settings.style);
                }
            });
        }
    };
};

var CartViewModel = function(){
    var self = this;
    self.title = Config.Cart.title;
    self.ShowTitle = function(){
        if(Config.showBlock.title == 'never')
            return false;
        if(Config.showBlock.title == 'always')
            return true;
        if(Config.showBlock.title == 'empty'){
            return true;
        }
    };
    self.count = 0;
    self.ShowCount = function(){
        console.log(Config.showBlock.count);
        if(Config.showBlock.count)
            return true;
        return false;
    };
    self.baseCost = 0;
    self.ShowBaseCost = function(){
        if(Config.showBlock.baseCost)
            return true;
        return false;
    };
    self.finalCost = 0;
    self.ShowFinalCost = function(){
        if(Config.showBlock.finalCost)
            return true;
        return false;
    };
    
    self.AddContent = function(data){
        self.count = data.count;
        self.baseCost = data.base_cost;
        self.finalCost = data.final_cost;
    };
};

var TestCart = {
    Init : function(){
        if(typeof Widget == 'function'){
            CartWidget.prototype = new Widget();
            var cart = new CartWidget();
            cart.Init(cart);
        }
        else{
            setTimeout(function(){TestCart.Init()}, 100);
        }
    }
}

TestCart.Init();