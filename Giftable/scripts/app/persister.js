window.persisters = (function () {
    var username = localStorage.getItem('username');
    var accessToken = localStorage.getItem('accessToken');

    var UsersPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        login: function (username, password) {
            var user = {
                username: username,
                authCode: CryptoJS.SHA1(password).toString()
            };

            return httpRequest.postJSON("api/auth/token", user)
            .then(function (data) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('username', data.username);
                return data;
            });
        },
        register: function (username, password, email) {
            var user = {
                username: username,
                authCode: CryptoJS.SHA1(password).toString(),
                email: email
            };
            
            return httpRequest.postJSON(this.apiUrl + "register", user)
            .then(function (data) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('username', data.username);
                return data.username;
            });
        },
        logout: function () {
            if (!accessToken) {
                navigator.notification.alert("User is not signed in!",
                                             function () {
                                             }, "Logout failed", 'OK');
                return;
            }
            var headers = {
                "X-accessToken": localStorage.getItem('accessToken')
            };

            accessToken = "";
            username = "";
            localStorage.removeItem('accessToken');
            localStorage.removeItem('username');
            
            return httpRequest.putJSON(this.apiUrl + "logout", {}, headers);
        },
        currentUser: function () {
            return localStorage.getItem('username');
        },
        isLoggedIn: function() {
            return localStorage.getItem('username') !== "";
        }
    });

    var GiftsPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        newGift: function (name, latitude, longitude, image, url) {
            var data = {
                name: name,
                latitude: latitude, 
                longitude: longitude, 
                image: image,
                url: url
            };
            var headers = {
                "X-accessToken": localStorage.getItem('accessToken')
            };
            return httpRequest.postJSON(this.apiUrl + "new-gift", data, headers);
        },
        suggestGift: function(name, latitude, longitude, image, url, suggestedBy, suggestedFor) {
            var data = {
                name: name,
                latitude: latitude, 
                longitude: longitude, 
                image: image,
                url: url,
                suggestedBy: suggestedBy,
                suggestedFor: suggestedFor
            };
            var headers = {
                "X-accessToken": localStorage.getItem('accessToken')
            };
            return httpRequest.postJSON(this.apiUrl + "suggest-gift", data, headers);
        },
        wishlist: function () {
            var headers = {
                "X-accessToken": localStorage.getItem('accessToken')
            };
            return httpRequest.getJSON(this.apiUrl + "wishlist", headers);
        },
        suggestedlist: function () {
            var headers = {
                "X-accessToken": localStorage.getItem('accessToken')
            };
            return httpRequest.getJSON(this.apiUrl + "suggested-list", headers);
        },
        getUnseen: function () {
            var headers = {
                "X-accessToken": localStorage.getItem('accessToken')
            };
            return httpRequest.getJSON(this.apiUrl + "get-unseen", headers);
        },
    });
    
    var DataPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
            this.users = new UsersPersister(apiUrl + "users/");
            this.gifts = new GiftsPersister(apiUrl + "gifts/");
        }
    });

    return {
        get: function (apiUrl) {
            return new DataPersister(apiUrl);
        }
    };
})();