var Config = {
    Base : {
        hostApi : "http://dev.pokupo.ru", // урл API
        catalogPathApi : "/api/catalog/", // префикс API каталога 
        goodsPathApi : "/api/goods/", // префикс API товаров
        userPathApi : "/api/user/", // префикс API пользователя
        cartPathApi : "/api/cart/", // префикс API корзины
        pathToImages : "http://dev.pokupo.ru/images", // путь к папке с изображениями
        routIconAuction : "http://dev.pokupo.ru/images/ico_30.png", // иконка аукциона
        sortingBlockContainer : '.sorting_block', // id раскрывающегося списка сортировки товаров
        containerIdForTmpl : "container_tmpl", // id контейнера в который будут загружены все шаблоны
        loading : "/loading50.gif", // иконка загрузщика
        title : 'Pokupo', // заголовок страницы по умолчанию
        cookie : {
           previously_viewed : 'previously_viewed'  // id просмотренных товаров
        }
    },
    Containers : {  
        catalog : 'catalog', // id контейнера каталога 
        search  : 'search_block', // id контейнера формы поиска 
        breadCrumbs : ['breadCrumb_1','breadCrumb_2'], // id контейнеров хлебных крошек
        content : 'content', // id контейнера контента
        searchResult : ['advanced_search', 'content'], // id контейнеров расширенной формы и результатов поиска
        goods : 'content', // id контейнера информации о товаре
        userInformation : 'user_information', // id контейнера информации о пользователе
        authentication : ['content', 'catalog'], //id контейнеров авторизации
        cart : 'cart_information', // id контейнера корзины
        cartGoods : 'content' // id контейнера реестра товаров корзины
    },
    Goods : {
        tmpl: {
            path : "goods/goodsTmpl.html", // файл шаблона
            tmplId : "goodsTmpl" // id шаблона виджета карточки товара по умолчанию
        },
        showBlocks : ['main', 'description'], // блоки отображаемые по умолчанию
        moreBlocks : {
            description : 'Описание', // заголовок блока "Описание товара"
            shipping : 'Условия доставки', // заголовок блока "Условия доставки"
            opinion : 'Отзывы покупателей' // заголовок блока "Отзывы покупателей"
        },
        message : {
            maxIsReached : "Достигнут максисум" // сообщение о том что достигнут максимум при выборе кол-ва товара
        },
        share : {
            element: 'share',  // id блока в котором будут размещены ссылки на соц сети
            elementStyle: {
                'quickServices': ['vkontakte', 'odnoklassniki', 'facebook', 'twitter', 'gplus'] // массив подключаемых соц сетей в формате http://api.yandex.ru/share/
            }
        },
        galleryId : "jcarousel", // id галереи
        style : { // стиль блока
            'position' : 'absolute', 
            'top' : '0px', 
            'left' : '5%', 
            'width' : '100%', 
            'height' : '50px', 
            'background' : '#ddd'
        }
    },
    Catalog : {
        tmpl : {
            path : "catalog/catalogTmpl.html", // путь к шаблонам
            tmplId : "catalogTmpl" // id шаблона виджета каталога по умолчанию
        },
        style : { // стиль блока
            'position' : 'absolute', 
            'top' : '100px', 
            'left' : '5%', 
            'width' : '20%', 
            'height' : '200px', 
            'background' : '#ddd'
        }
    },
    BreadCrumbs : {
        tmpl: {
            path : "breadCrumb/breadCrumbTmpl.html", // путь к шаблонам
            tmplId : "breadCrumbTmpl", // id шаблона виджета хлебных крошек по умолчанию
            tmplSelectListId : "breadCrumbSelectListTmpl" // id шаблона выпадающего списка
        },
        style : { // стиль блока
            'position' : 'absolute', 
            'top' : '0px', 
            'left' : '5%', 
            'width' : '100%', 
            'height' : '50px', 
            'background' : '#ddd'
        }
    },
    Content : {
        message : {
            noGoods : 'В этом разделе товаров не найдено...', // cообщение в случае если в разделе нет товаров
            filter : 'Товаров по ключу "%%filterName%%" не найдено' // сообщение в случае отсутствия товаров после фильтрации
        },
        tmpl: {
            pathBlock : "content/blockTmpl.html", // файл шаблона промо блоков
            pathList : "content/contentTmpl.html", // файл шаблона реестра товаров
            blockSliderTmpl : "blockSliderTmpl", // id шаблона слайдера (промо)
            blockCaruselTmpl : "blockCaruselTmpl", // id шаблона карусели (промо)
            blockTileTmpl : "blockTileTmpl", // id шаблона плитки (промо)
            contentTableTmpl : "contentTableTmpl", // id шаблона таблицы
            contentListTmpl : "contentListTmpl", // id шаблона списка
            contentTileTmpl : "contentTileTmpl", // id шаблона плитки
            noResultsTmpl : "contentNoResultsTmpl" // id шаблона товаров не найдено
        },
        countGoodsInBlock : 6,  // кол-во товаров выводимых в блоке по умолчанию
        listPerPage : [10, 20, 50], // массив списка фильтра кол-ва товаров на странице
        orderBy : 'name', // сортировка по умолчанию
        style : { // стиль блока 
            'position' : 'absolute', 
            'top' : '50px', 
            'left' : '5%', 
            'width' : '100%', 
            'height' : '600px', 
            'background' : '#ddd'
        }
    },
    Search : {
        tmpl : {
            path : "search/searchTmpl.html", // путь к шаблонам
            tmplId : "searchTmpl" // id шаблона формы поиска по умолчанию
        },
        style : {// стиль блока
            'position' : 'absolute', 
            'top' : '0px', 
            'left' : '5%', 
            'width' : '100%', 
            'height' : '50px', 
            'background' : '#ddd'
        }
    },
    SearchResult : {
        tmpl: {
            path : "searchResult/advancedSearchFormTmpl.html", // файл шаблонов расширенной формы и результатов поиска
            advancedSearchFormTmpl : "advancedSearchFormTmpl", // id шаблона расширенной формы
            contentTableTmpl : "searchResultTableTmpl", // id шаблона таблицы
            contentListTmpl : "searchResultListTmpl", // id шаблона списка
            contentTileTmpl : "searchResultTileTmpl", // id шаблона плитки
            noResultsTmpl : "searchResultErrorTmpl" // id шаблона товаров не найдено
        },
        idAdvancedSearchForm : "advancedSearch", // id расширенной формы
        listPerPage : [10, 20, 50], // массив списка фильтра кол-ва товаров на странице
        listTypeSearch : { // тип поиска 
            any : 'Любое из слов',
            all : 'Все слова'
        },
        listTypeSeller : { // тип продавцов
            '' : "Все продавцы",
            person : 'Частное лицо',
            company : 'Компания'
        },
        style : {// стиль блока
            'position' : 'absolute', 
            'top' : '0px', 
            'left' : '5%', 
            'width' : '100%', 
            'height' : '50px', 
            'background' : '#ddd'
        }
    },
    RelatedGoods : {
        tmpl:{
            path : "relatedGoods/relatedGoodsTmpl.html", // файл шаблонов связанных товаров
            contentTableTmpl : "relatedGoodsTableTmpl", // id шаблона таблицы
            contentListTmpl : "relatedGoodsListTmpl", // id шаблона списка
            contentTileTmpl : "relatedGoodsTileTmpl", // id шаблона плитки
            contentSliderTmpl : "relatedGoodsSliderTmpl", // id шаблона слайдера
            contentCaruselTmpl : "relatedGoodsCaruselTmpl" // id шаблона карусели
        },
        countGoodsInBlock : 6, // максимальное кол-во товаров в блоке
        countGoodsTileInStr : 5, // кол-во плиток в строке 
        orderBy : 'rating', // сортировка
        start : 0, // начальная позиция в запросе
        typeView : 'carousel' // тип отображения по умолчанию
    },
    InfoSeller : {
        tmpl: {
            tmplId : "infoSellerTmpl", // id шаблона информации о продавце
            path : "infoSeller/infoSellerTmpl.html" // файл шаблона информации о продавце
        }
    },
    UserInformation : {
        tmpl : {
            path : "userInformation/userInformationTmpl.html", // файл шаблонов
            infoTmplId : "userInformationTmpl", //id шаблона вывода информации о пользователе
            authTmplId : "authorizationLinkTmpl" //id шаблона с сылками войти/регистрация
        },
        showBlocks : ['login'], 
        style : {// стиль блока
            'position' : 'absolute', 
            'top' : '0px', 
            'left' : '5%', 
            'width' : '100%', 
            'height' : '50px', 
            'background' : '#ddd'
        }
    },
    Authentication : {
        tmpl : {
            path : "authentication/authenticationTmpl.html", // файл шаблонов
            authFormTmplId : "authenticationFormTmpl", //id шаблона формы авторизации
            authSidebarTmplId : "authenticationSidebarTmpl", //id шаблона левого блока
            regFormTmplId : "registrationFromTmpl", //id шаблона формы регистрации
            regSidebarTmplId : "registrationSidebarTmpl" //id шаблона левого блока
        },
        regular : { // регулярные выражения полей
            username : /^[a-zа-я]+$/,
            email : /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/,
            phone : /^\d+$/,
            fname : /^[a-zа-я]+$/,
            sname : /^[a-zа-я]+$/,
            mnae : /^[a-zа-я]+$/
        },
        error : { // сообщения об ошибках при валидации формы регистрации
            username : {
                empty : 'Поле обязательно для заполнения',
                minLength : 'Минимум 4 символа',
                maxLength : 'Максимум 40 символов',
                regular : 'Только буквы латинского или русского алфавита'
            },
            email : {
                empty : 'Поле обязательно для заполнения',
                regular : 'Строка не является адресом электронной почты'
            },
            password : {
                empty : 'Поле обязательно для заполнения',
                minLength : 'Минимум 6 символов',
                maxLength : 'Максимум 64 символа',
                equal : 'Пароли не совпадают'
            },
            phone : {
                minLength : 'Минимум 11 символа',
                maxLength : 'Максимум 15 символов',
                regular : 'Только цифры'
            },
            fname : {
                minLength : 'Минимум 2 символа',
                maxLength : 'Максимум 20 символов',
                regular : 'Только буквы латинского или русского алфавита'
            },
            sname : {
                minLength : 'Минимум 2 символа',
                maxLength : 'Максимум 20 символов',
                regular : 'Только буквы латинского или русского алфавита'
            },
            mname : {
                minLength : 'Минимум 2 символа',
                maxLength : 'Максимум 20 символов',
                regular : 'Только буквы латинского или русского алфавита'
            }
        },
        style : {// стиль блока
            'position' : 'absolute', 
            'top' : '0px', 
            'left' : '5%', 
            'width' : '100%', 
            'height' : '50px', 
            'background' : '#ddd'
        }
    },
    Cart : {
        cartId : 'cart', // id корзины товара
        title : 'Корзина', // заголовок блока
        showBlocks : {
            "title" : 'never', // показывать название «Корзина» - всегда(always)/никогда(never)/когда пустая(empty)
            "count" : false, // отображать кол-во товара
            "baseCost" : false, // отображать сумму без скидок
            "finalCost" : false // отображать конечную сумму
        },
        tmpl : {
            path : "cart/cartTmpl.html", // файл шаблонов
            tmplId : "cartTmpl", //id шаблона формы авторизации
        },
        style : {// стиль блока
            'position' : 'absolute', 
            'top' : '0px', 
            'left' : '5%', 
            'width' : '100%', 
            'height' : '50px', 
            'background' : '#ddd'
        }
    },
    CartGoods : {
        title : 'Моя корзина',
        tmpl : {
            path : "cartGoods/cartGoodsTmpl.html", // файл шаблонов
            tmplId : "cartGoodsTmpl", //id шаблона формы авторизации
        },
        style : {// стиль блока
            'position' : 'absolute', 
            'top' : '0px', 
            'left' : '5%', 
            'width' : '100%', 
            'height' : '50px', 
            'background' : '#ddd'
        }
    },
    Paging : {
        currentPage : 1, 
        itemsPerPage : 20,
        numDisplayEntries : 3,
        numEdgeEntries : 3,
        prevText : ' ',
        nextText : ' ',
        ellipseText : '...',
        prevShowAlways :false,
        nextShowAlways :false,
        cssCurrent : 'curent',
        cssItem : 'item_li',
        cssPrev : 'first',
        cssNext : 'last',
        startContent : 0
    }
};


