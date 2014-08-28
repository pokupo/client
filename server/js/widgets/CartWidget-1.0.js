var CartWidget = function(){
    var self = this;
    self.widgetName = 'CartWidget';
    self.version = 1.0;
    self.minWidgetVersion = 1.0;
    self.maxWidgetVersion = 2.0;
    self.minTmplVersion = 1.0;
    self.maxTmplVersion = 2.0;
    self.settings = {
        title : null,
        tmpl :{
            path : null,
            id : null
        },
        inputParameters : {},
        containerId : null,
        showBlocks : null,
        style : null,
        customContainer : null
    };
    self.InitWidget = function(){
        self.settings.containerId = Config.Containers.cart.widget;
        self.settings.customContainer = Config.Containers.cart.customClass;
        self.settings.title = Config.Cart.title;
        self.settings.tmpl = Config.Cart.tmpl;
        self.settings.style = Config.Cart.style;
        self.settings.showBlocks = Config.Cart.showBlocks;
        self.RegisterEvents();
        self.SetInputParameters();
        self.LoadTmpl();
        self.SetPosition();
    };
    self.SetInputParameters = function(){
        var input = {};
        if(Config.Base.sourceParameters == 'string'){
            var temp = JSCore.ParserInputParameters(/CartWidget/);
            if(temp.cart){
                input = temp.cart;
            }
        }
        if(Config.Base.sourceParameters == 'object' && typeof WParameters !== 'undefined' && WParameters.cart){
            input = WParameters.cart;
        }
        
        if(!$.isEmptyObject(input)){
            if(input.show){
                for(var key in input.show){
                     self.settings.showBlocks[key] = input.show[key];
                }
            }
        }
        self.settings.inputParameters = input;
    };
    self.InsertContainer = {
        EmptyWidget : function(){
            var temp = $("#" + self.settings.containerId).find(self.SelectCustomContent().join(', ')).clone();
            $("#" + self.settings.containerId).empty().html(temp);
        },
        Main : function(){
            self.InsertContainer.EmptyWidget();
            $('#' + self.settings.containerId).append($('script#' + self.settings.tmpl.id).html()).children().hide();
        }
    };
    self.CheckRoute = function(){
        if(Routing.IsDefault() && self.HasDefaultContent()){
            self.WidgetLoader(true);
        }
        else{
            self.BaseLoad.CartInfo('', function(data){
                EventDispatcher.DispatchEvent('CartWidget.onload.info', data);
            });
        }
    };
    self.LoadTmpl = function(){
        self.BaseLoad.Tmpl(self.settings.tmpl, function(){
            EventDispatcher.DispatchEvent('CartWidget.onload.tmpl')
        });
    };
    self.RegisterEvents = function(){ 
        EventDispatcher.AddEventListener('CartWidget.onload.tmpl', function (){
            self.CheckRoute();
        });
        
        EventDispatcher.AddEventListener('CartWidget.onload.info', function(data){
            self.InsertContainer.Main();
            self.Fill(data);
        })
        
        EventDispatcher.AddEventListener('widget.authentication.ok', function(){
            self.BaseLoad.CartInfo('', function(data){
                EventDispatcher.DispatchEvent('CartWidget.onload.info', data);
            });
        });
        
        EventDispatcher.AddEventListener('widget.change.route', function (data){
            self.LoadTmpl();
        });
        
        EventDispatcher.AddEventListener('widgets.cart.infoUpdate', function(data){
             self.LoadTmpl();
        });
    };
    self.Fill = function(data){
        var info = new CartViewModel();
        info.AddContent(data);
        self.Render(info);
    };
    self.Render = function(data){ 
        try{
            ko.applyBindings(data, $('#' + self.settings.containerId)[0]);
            self.WidgetLoader(true, self.settings.containerId);
        }
        catch(e){
            self.Exeption('Ошибка шаблона [' + self.GetTmplName() + ']');
            if(self.settings.tmpl.custom){
                delete self.settings.tmpl.custom;
                self.BaseLoad.Tmpl(self.settings.tmpl, function(){
                    self.InsertContainer.Main();
                    self.Render(data);
                });
            }
            else{
                self.InsertContainer.EmptyWidget();
                self.WidgetLoader(true, self.settings.containerId);
            }
        }
    };
    self.SetPosition = function(){
        if(self.settings.inputParameters['position'] == 'absolute'){
            for(var key in self.settings.inputParameters){
                if(self.settings.style[key])
                    self.settings.style[key] = self.settings.inputParameters[key];
            }
            $().ready(function(){
                if($("#" + self.settings.containerId).length > 0){
                    $("#" + self.settings.containerId).css(self.settings.style);
                }
            });
        }
    };
};

var CartViewModel = function(){
    var self = this;
    self.title = Config.Cart.title;
    self.ShowTitle = ko.computed(function(){
        if(Config.Cart.showBlocks.title == 'never')
            return false;
        if(Config.Cart.showBlocks.title == 'always')
            return true;
        if(Config.Cart.showBlocks.title == 'empty'){
            return true;
        }
        return false;
    }, this);
    self.count = ko.observable(0);
    self.ShowCount = ko.computed(function(){
        if(Config.Cart.showBlocks.count && self.count() > 0)
            return true;
        return false;
    },this);
    self.baseCost = ko.observable(0);
    self.ShowBaseCost = ko.computed(function(){
        if(Config.Cart.showBlocks.baseCost && self.baseCost() > 0 && self.baseCost() > self.finalCost())
            return true;
        return false;
    },this);
    self.finalCost = ko.observable(0);
    self.ShowFinalCost = ko.computed(function(){
        if(Config.Cart.showBlocks.finalCost && self.finalCost() > 0)
            return true;
        return false;
    },this);
    
    self.AddContent = function(data){
        if(!data.err){
            self.count(data.count);
            self.baseCost(data.base_cost);
            self.finalCost(data.final_cost);
        }
    };
    self.ClickCart = function(){
        if(self.count() > 0){
            Parameters.cache.lastPage = Parameters.cache.history[Parameters.cache.history.length-1];
            Routing.SetHash('cart', Config.CartGoods.title, {});
        }
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