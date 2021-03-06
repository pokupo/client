var AuthenticationViewModel = function(){
    var self= this;
    self.username = null;
    self.password = null;
    self.rememberMe = null;
    self.error = null;
    self.subminEvent = ko.observable();
    
    self.Login = function(data){
        self.username = $(data.username).val();
        self.password = $(data.password).val();
        self.rememberMe = $(data.remember_me).is(':checked') ? 'on' : 'off';
        EventDispatcher.DispatchEvent(self.subminEvent(), self);
    };
    self.ClickZPayment = function(){
        
    };
    self.ForgotPassword = function(){
        window.location.href = 'https://' + window.location.hostname + '/resetting/request'
    };
    self.CloseForm = function(){
        var last = Parameters.cache.lastPage;
        if(last.route == 'login' || !last.route)
            Routing.SetHash('default', 'Домашняя', {});
        else
            Routing.SetHash(last.route, last.title, last.data);
    };
};

