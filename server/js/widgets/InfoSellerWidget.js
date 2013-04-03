window.InfoSellerWidget = function(){
    var self = this;
    self.widgetName = 'InfoSellerWidget';
    self.settings = {
        tmplPath : null,
        tmplId : null,
        inputParameters : {},
        container : null,
        style : null,
        infoSeller : {}
    };
    self.InitWidget = function(){
        self.settings.tmplPath = Config.InfoSeller.tmpl.path;
        self.settings.tmplId = Config.InfoSeller.tmpl.tmplId;
        self.settings.style = Config.InfoSeller.style;
        self.RegisterEvents();
        self.Loader();
    };
    self.Loader = function(){
        Loader.InsertContainer(self.settings.container);
    };
    self.SetParameters = function(data){
        self.settings.container = data.element;

        for(var key in data.options.params){
            if(key == 'tmpl' && data.options.params['tmpl'])
                self.settings.tmplPath = 'infoSeller/' + data.options.params['tmpl'] + '.html';
            else
                self.settings.infoSeller[key] = data.options.params[key];
        }
    };
    self.RegisterEvents = function(){
        if(JSLoader.loaded){
            self.BaseLoad.Tmpl(self.settings.tmplPath, function(){
                EventDispatcher.DispatchEvent('InfoSellerWidget.onload.tmpl')
            });
        }
        else{
            EventDispatcher.AddEventListener('onload.scripts', function (data){ 
                self.BaseLoad.Tmpl(self.settings.tmplPath, function(){
                    EventDispatcher.DispatchEvent('InfoSellerWidget.onload.tmpl')
                });
            });
        }
        
        EventDispatcher.AddEventListener('InfoSellerWidget.onload.tmpl', function (data){
            if(self.settings.infoSeller['data'])
                self.Fill(self.settings.infoSeller['data'])
            else{
                window.console && console.log('No data on the Seller');
                self.WidgetLoader(true);
            }
        });
        
        EventDispatcher.AddEventListener('InfoSellerWidget.fill.block', function (data){
            self.Render(data);
        });
    };
    self.Fill = function(data){
        var info = new InfoSellerViewModel(data);
        self.Render(info);
    };
    self.Render = function(data){
        $(self.settings.container).empty().append($('script#' + self.settings.tmplId).html());
        ko.applyBindings(data, $(self.settings.container).children()[0]);
    }
}

var InfoSellerViewModel = function(data){
    var self = this;
    self.sellerId = data.seller.id;
    self.nameSeller = data.seller.name_seller;
    self.websiteSeller = data.seller.website;
    self.shopId = data.shop.id;
    self.nameShop = data.shop.name_shop;
    self.emailSupportShop = data.shop.email_support;
    self.mailtoShop = 'mailto:' + self.emailSupportShop;
    self.phonesSupportShop = data.shop.phones_support;
    self.siteSupportShop = data.shop.site_support;
    self.skypeSupportShop = data.shop.skype_support;
    self.icqSupportShop = data.shop.icq_support;
    self.ratingShop = data.shop.rating_shop;
    self.positiveOpinion = data.shop.positive_opinion;
    self.negativeOpinion = data.shop.negative_opinion;
    self.useCart = data.shop.use_cart;
    self.routeLogoShop = Parameters.pathToImages + data.shop.route_logo_shop;
    self.allGoods = data.shop.all_goods;
    self.operators = data.operator;
    
    self.ClickOperator = function(data, event){
        alert('operator id=' + data.id);
    }
}

