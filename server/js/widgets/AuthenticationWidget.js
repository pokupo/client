var AuthenticationWidget = function(){
    var self = this;
    self.widgetName = 'AuthenticationWidget';
    self.settings = {
        containerFormId : null,
        tmpl: {
            path : null,
            id : null
        },
        inputParameters : {},
        https : null,
        style : null,
        customContainer: null
    };
    self.InitWidget = function(){
        self.settings.containerFormId = Config.Containers.authentication.widget; 
        self.settings.customContainer = Config.Containers.authentication.customClass;
        self.settings.tmpl = Config.Authentication.tmpl;
        self.settings.https = Config.Authentication.https;
        self.settings.style = Config.Authentication.style;
        self.SetInputParameters();
        self.RegisterEvents();
        self.SetPosition();
    };
    self.SetInputParameters = function(){
        var input = {};
        if(Config.Base.sourceParameters == 'string'){
            var temp = JSCore.ParserInputParameters(/AuthenticationWidget.js/);
            if(temp.authentication){
                input = temp.authentication;
            }
        }
        if(Config.Base.sourceParameters == 'object' && typeof WParameters !== 'undefined' && WParameters.authentication){
            input = WParameters.authentication;
        }
        if(!$.isEmptyObject(input)){
            if(input.https){
                self.settings.https = input.https;
                Parameters.cache.https = input.https;
            }
            if(input.container && input.container.widget){
                self.settings.containerFormId = input.container.widget; 
            }
        }
        self.settings.inputParameters = input;
    };
    self.CheckAuthenticationRoute = function(){
        if(Routing.route == 'login'){
            self.SelectTypeContent();
        }
        else
            self.WidgetLoader(true);
    };
    self.LoadTmpl = function(){
        self.BaseLoad.Tmpl(self.settings.tmpl, function(){
            self.CheckAuthenticationRoute();
        });
    };
    self.RegisterEvents = function(){
        if(JSLoader.loaded){
            self.LoadTmpl();
        }
        else{
            EventDispatcher.AddEventListener('onload.scripts', function (data){
                self.LoadTmpl();
            });
        }
        
        EventDispatcher.AddEventListener('widget.change.route', function (){
            self.CheckAuthenticationRoute();
        });
        
        EventDispatcher.AddEventListener('AuthenticationWidget.authentication.submit', function (data){
           self.BaseLoad.Login(data.username, data.password, data.rememberMe, function(request){
               EventDispatcher.DispatchEvent('widget.authentication.test', {data:data, request:request});
           })
        });
        
        EventDispatcher.AddEventListener('widget.authentication.test', function(data){
            if(data.request.err){
                data.data.error = "Ошибка в логине или пароле";
                self.Render.Authentication(data.data);
            }
            else{
                EventDispatcher.DispatchEvent('widget.authentication.ok', data);
            }
        });
        
        EventDispatcher.AddEventListener('widget.authentication.ok', function(){
            if(Routing.route != 'registration'){
                var last = Parameters.cache.lastPage;
                if(last.route == 'login' || !last.route)
                    Routing.SetHash('default', 'Домашняя', {});
                else
                    Routing.SetHash(last.route, last.title, last.data);
            }
        });
    };
    self.SelectTypeContent = function(){
        if(Routing.route == 'login'){
            self.InsertContainer.Authentication();
            self.Fill.Authentication();
        }
    };
    self.InsertContainer = {
        EmptyWidget : function(){
            var temp = $("#" + self.settings.containerFormId).find(self.SelectCustomContent().join(', ')).clone();
            $("#" + self.settings.containerFormId).empty().html(temp);
        },
        Authentication : function(){
            self.InsertContainer.EmptyWidget();
            $("#" + self.settings.containerFormId).append($('script#' + self.settings.tmpl.id).html());
        }
    };
    self.Fill = {
        Authentication : function(){
            var form = new AuthenticationViewModel();
            form.subminEvent('AuthenticationWidget.authentication.submit');
            self.Render.Authentication(form);
        }
    };
    self.Render = {
        Authentication : function(form){
            if($("#" + self.settings.containerFormId).length > 0){
                ko.applyBindings(form, $("#" + self.settings.containerFormId)[0]);
            }
            self.WidgetLoader(true, self.settings.containerFormId);
        }
    };
    self.SetPosition = function(){
        if(self.settings.inputParameters['position'] == 'absolute'){
            for(var key in self.settings.inputParameters){
                if(self.settings.style[key])
                    self.settings.style[key] = self.settings.inputParameters[key];
            }
            $().ready(function(){
                for(var i=0; i<=Config.Containers.authentication.length-1; i++){
                    $("#" + Config.Containers.authentication[i]).css(self.settings.style);
                }
            });
        }
    };
};

var TestAuthentication = {
    Init : function(){
        if(typeof Widget == 'function'){
            AuthenticationWidget.prototype = new Widget();
            var auth = new AuthenticationWidget();
            auth.Init(auth);
        }
        else{
            setTimeout(function(){TestAuthentication.Init()}, 100);
        }
    }
}

TestAuthentication.Init();

