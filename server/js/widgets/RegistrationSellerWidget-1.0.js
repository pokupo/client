var RegistrationSellerWidget = function () {
    var self = this;
    self.widgetName = 'RegistrationSellerWidget';
    self.version = 1.0;
    self.minWidgetVersion = 1.0;
    self.maxWidgetVersion = 2.0;
    self.minTmplVersion = 1.0;
    self.maxTmplVersion = 2.0;
    self.settings = {
        containerFormId: null,
        tmpl: {
            path: null,
            id: {
                step1: null,
                step2: null,
                step3: null,
                step4: null
            }
        },
        animate: null,
        inputParameters: {},
        style: null,
        customContainer: null
    };
    self.InitWidget = function () {
        self.settings.containerFormId = Config.Containers.registrationSeller.widget;
        self.settings.customContainer = Config.Containers.registrationSeller.customClass;
        self.settings.tmpl = Config.RegistrationSeller.tmpl;
        self.settings.style = Config.RegistrationSeller.style;
        self.SetInputParameters();
        self.RegisterEvents();
        self.CheckRouteRegistrationSeller();
        self.SetPosition();
    };
    self.SetInputParameters = function () {
        var input = {};
        if (Config.Base.sourceParameters == 'string') {
            var temp = JSCore.ParserInputParameters(/RegistrationSellerWidget/);
            if (temp.registrationSeller) {
                input = temp.registrationSeller;
            }
        }
        if (Config.Base.sourceParameters == 'object' && typeof WParameters !== 'undefined' && WParameters.registrationSeller) {
            input = WParameters.registrationSeller;
        }

        if (!$.isEmptyObject(input)) {
            if (input.animate)
                self.settings.animate = input.animate;
        }
        self.settings.inputParameters = input;
    };
    self.CheckRouteRegistrationSeller = function () {
        if (Routing.route == 'registration_seller') {
            self.BaseLoad.Tmpl(self.settings.tmpl, function () {
                if (Routing.params.step == 1)
                    self.Step.Step1();
                if (Routing.params.step == 2)
                    self.Step.Step2();
                if (Routing.params.step == 3)
                    self.Step.Step3();
            });
        }
        else
            self.WidgetLoader(true);
    };
    self.RegisterEvents = function () {
        EventDispatcher.AddEventListener('widget.change.route', function () {
            self.CheckRouteRegistrationSeller();
        });

        EventDispatcher.AddEventListener('RegistrationSellerWidget.step1.register', function (step1) {
            self.WidgetLoader(false);

            var params = [];
            if (step1.nameSeller())
                params.push('name_seller=' + encodeURIComponent(step1.nameSeller()));
            if (step1.phone())
                params.push('phone_seller=' + step1.phone().replace(/\s/g, ''));
            if (step1.email())
                params.push('email_seller=' + step1.email());
            if (params.length > 0)
                var str = '?' + params.join('&');
            self.BaseLoad.Registration(str, function (data) {
                if(data.result == 'ok'){
                    Parameters.cache.regSeller.step1 = step1;
                    Routing.SetHash('registration_shop', 'Регистрация нового аккаунта', {step: 2});
                }
            });

        });
    };
    self.Step = {
        Step1: function () {
            self.InsertContainer.Step1();
            self.Fill.Step1();
        },
        Step2: function () {
            self.InsertContainer.Step2();
            self.Fill.Step2();
        },
        Step3: function () {
            self.InsertContainer.Step3();
            self.Fill.Step3();
        }
    };
    self.InsertContainer = {
        EmptyWidget: function () {
            var temp = $("#" + self.settings.containerFormId).find(self.SelectCustomContent().join(', ')).clone();
            $("#" + self.settings.containerFormId).empty().html(temp);
        },
        Step1: function () {
            self.InsertContainer.EmptyWidget();
            $("#" + self.settings.containerFormId).append($('script#' + self.GetTmplName('step1')).html()).children().hide();
        },
        Step2: function () {
            self.InsertContainer.EmptyWidget();
            $("#" + self.settings.containerFormId).append($('script#' + self.GetTmplName('step2')).html()).children().hide();
        },
        Step3: function () {
            self.InsertContainer.EmptyWidget();
            $("#" + self.settings.containerFormId).append($('script#' + self.GetTmplName('step3')).html()).children().hide();
        }
    };
    self.Fill = {
        Step1: function () {
            var form = Parameters.cache.regShop.step1;
            if ($.isEmptyObject(form)) {
                RegistrationSellerFormViewModel.prototype.Back = function () {
                    Parameters.cache.history.pop();
                    var link = Parameters.cache.history.pop();
                    if (link)
                        Routing.SetHash(link.route, link.title, link.data, true);
                    else
                        Routing.SetHash('default', 'Домашняя', {});
                };
                form = new RegistrationSellerFormViewModel();
            }
            self.Render.Step1(form);
        },
        Step2: function () {
            if (Routing.params.name_seller && Routing.params.mail_token) {
                RegistrationSellerFormViewModel.prototype.Back = function() {
                    Parameters.cache.history.pop();
                    var link = Parameters.cache.history.pop();
                    if (link)
                        Routing.SetHash(link.route, link.title, link.data, true);
                    else
                        Routing.SetHash('default', 'Домашняя', {});
                };
                var step1 = new RegistrationSellerFormViewModel();
                step1.nameSeller(Routing.params.username);
                Parameters.cache.regSeller.step1 = step1;
            }

            RegistrationConfirmFormViewModel.prototype.Back = function() {
                EventDispatcher.DispatchEvent('RegistrationSellerWidget.step1.view');
            };
            var form = new RegistrationConfirmFormViewModel(Parameters.cache.regSeller.step1);
            form.submitEvent('RegistrationSellerWidget.step2.checking');
            
            if (Routing.params.name_seller && Routing.params.mail_token) {
                form.mailToken(Routing.params.mail_token);
                EventDispatcher.DispatchEvent('RegistrationSellerWidget.step2.checking', form);
            }
            
            self.Render.Step2(form);
        },
        Step3: function () {
//            var form = Parameters.cache.reg.step3;
//            if ($.isEmptyObject(form)){
//                RegistrationProfileFormViewModel.prototype.Back = function() {
//                    EventDispatcher.DispatchEvent('RegistrationWidget.step2.view');
//                };
//                RegistrationProfileFormViewModel.prototype.SpecifyLater = function() {
//                    EventDispatcher.DispatchEvent('RegistrationWidget.step3.later');
//                };
//                form = new RegistrationProfileFormViewModel();
//                form.submitEvent('RegistrationWidget.step3.checking');
//            }
            self.Render.Step3();
        }
    };
    self.Render = {
        Step1: function (form) {
            if ($("#" + self.settings.containerFormId).length > 0) {
                try {
                    ko.cleanNode($("#" + self.settings.containerFormId)[0]);
                    ko.applyBindings(form, $("#" + self.settings.containerFormId)[0]);
                    self.WidgetLoader(true, self.settings.containerFormId);
                    if (self.settings.animate)
                        self.settings.animate();
                }
                catch (e) {
                    self.Exeption('Ошибка шаблона [' + self.GetTmplName('step1') + ']');
                    if (self.settings.tmpl.custom) {
                        delete self.settings.tmpl.custom;
                        self.BaseLoad.Tmpl(self.settings.tmpl, function () {
                            self.InsertContainer.Step1();
                            self.Render.Step1(form);
                        });
                    }
                    else {
                        self.InsertContainer.EmptyWidget();
                        self.WidgetLoader(true, self.settings.containerFormId);
                    }
                }
            }
        },
        Step2: function (form) {
            if ($("#" + self.settings.containerFormId).length > 0) {
                try {
                    ko.cleanNode($("#" + self.settings.containerFormId)[0]);
                    ko.applyBindings(form, $("#" + self.settings.containerFormId)[0]);
                    self.WidgetLoader(true, self.settings.containerFormId);
                    if (self.settings.animate)
                        self.settings.animate();
                }
                catch (e) {
                    self.Exeption('Ошибка шаблона [' + self.GetTmplName('step2') + ']');
                    if (self.settings.tmpl.custom) {
                        delete self.settings.tmpl.custom;
                        self.BaseLoad.Tmpl(self.settings.tmpl, function () {
                            self.InsertContainer.Step2();
                            self.Render.Step2(form);
                        });
                    }
                    else {
                        self.InsertContainer.EmptyWidget();
                        self.WidgetLoader(true, self.settings.containerFormId);
                    }
                }
            }
        },
        Step3: function (form) {
            if ($("#" + self.settings.containerFormId).length > 0) {
                try {
                    ko.cleanNode($("#" + self.settings.containerFormId)[0]);
                    ko.applyBindings(form, $("#" + self.settings.containerFormId)[0]);
                    self.WidgetLoader(true, self.settings.containerFormId);
                    if (self.settings.animate)
                        self.settings.animate();
                }
                catch (e) {
                    self.Exeption('Ошибка шаблона [' + self.GetTmplName('step3') + ']');
                    if (self.settings.tmpl.custom) {
                        delete self.settings.tmpl.custom;
                        self.BaseLoad.Tmpl(self.settings.tmpl, function () {
                            self.InsertContainer.Step3();
                            self.Render.Step3(form);
                        });
                    }
                    else {
                        self.InsertContainer.EmptyWidget();
                        self.WidgetLoader(true, self.settings.containerFormId);
                    }
                }
            }
        }
    };
    self.SetPosition = function () {
        if (self.settings.inputParameters['position'] == 'absolute') {
            for (var key in self.settings.inputParameters) {
                if (self.settings.style[key])
                    self.settings.style[key] = self.settings.inputParameters[key];
            }
            $().ready(function () {
                for (var i = 0; i <= Config.Containers.registration.length - 1; i++) {
                    $("#" + Config.Containers.registration[i]).css(self.settings.style);
                }
            });
        }
    };
};

var RegistrationSellerFormViewModel = function () {
    var self = this;
    self.nameSeller = ko.observable(null);
    self.errorNameSeller = ko.observable(null);

    self.email = ko.observable(null);
    self.errorEmail = ko.observable(null);

    self.cssPhone = 'phone';
    self.phone = ko.observable(null);
    self.errorPhone = ko.observable(null);

    self.isChecked = ko.observable(false);
    self.errorIsChecked = ko.observable(null);

    self.SubmitForm = function () {
        if (self.ValidationForm()) {
            EventDispatcher.DispatchEvent('RegistrationSellerWidget.step1.register', self);
        }
    };
    self.ValidationForm = function () {
        var test = true;
        if (!self.NameValidation())
            test = false;
        if (!self.EmailValidation())
            test = false;
        if (!self.PhoneValidation())
            test = false;
        if (!self.IsCheckedValidation())
            test = false;

        return test;
    };
    self.NameValidation = function () {
        if (!self.nameSeller()) {
            self.errorNameSeller(Config.RegistrationSeller.error.username.empty);
            return false;
        }
        if (self.nameSeller().length < 3) {
            self.errorNameSeller(Config.RegistrationSeller.error.username.minLength);
            return false;
        }
        if (self.nameSeller().length > 40) {
            self.errorNameSeller(Config.RegistrationSeller.error.username.maxLength);
            return false;
        }
        if (!Config.RegistrationSeller.regular.username.test(self.nameSeller())) {
            self.errorNameSeller(Config.Registration.error.username.regular);
            return false;
        }
        self.errorNameSeller(null);
        return true;
    };
    self.EmailValidation = function () {
        if (!self.email()) {
            self.errorEmail(Config.Registration.error.email.empty);
            return false;
        }
        if (self.email().length > 64) {
            self.errorEmail(Config.Registration.error.email.maxLength);
            return false;
        }
        if (!Config.Registration.regular.email.test(self.email())) {
            self.errorEmail(Config.Registration.error.email.regular);
            return false;
        }
        self.errorEmail(null);
        return true;
    };
    self.PhoneValidation = function () {
        if (self.phone()) {
            if (!Config.Registration.regular.phone.test($.trim(self.phone()))) {
                self.errorPhone(Config.Registration.error.phone.regular);
                return false;
            }
        }
        self.errorPhone(null);
        return true;
    };
    self.IsCheckedValidation = function () {
        if (!self.isChecked()) {
            self.errorIsChecked(Config.Registration.error.isChecked.empty);
            return false;
        }

        self.errorIsChecked(null);
        return true;
    };
    self.RestoreAccess = function () {

    };
    self.agreement = 'http://' + window.location.hostname + '/rules';
    self.police = 'http://' + window.location.hostname + '/police';
    self.refund = 'http://' + window.location.hostname + '/refund';
};


var TestRegistrationSeller = {
    Init: function () {
        if (typeof Widget == 'function') {
            RegistrationSellerWidget.prototype = new Widget();
            var reg = new RegistrationSellerWidget();
            reg.Init(reg);
        }
        else {
            setTimeout(function () {
                TestRegistrationSeller.Init()
            }, 100);
        }
    }
}

TestRegistrationSeller.Init();

