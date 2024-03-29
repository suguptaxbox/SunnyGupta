var O365Auth;
(function (O365Auth) {
    var Token = (function () {
        function Token(raw_id_token, context, resourceId, clientId, redirectUri) {
            var encoded_id_token = raw_id_token.split('.')[1].replace('-', '+').replace('_', '/'), decoded_id_token = Microsoft.Utility.decodeBase64AsString(encoded_id_token);

            this._id_token = JSON.parse(decoded_id_token);
            this._context = context;
            this._clientId = clientId || O365Auth.Settings.clientId;
            this._redirectUri = redirectUri || O365Auth.Settings.redirectUri;
            this._resourceId = resourceId;
        }
        Token.prototype.getDeferred = function () {
            if (O365Auth.deferred) {
                return O365Auth.deferred();
            }

            return new Microsoft.Utility.Deferred();
        };

        Token.prototype.getAccessTokenFn = function (resourceId) {
            return function () {
                return this.getAccessToken(resourceId || this._resourceId);
            }.bind(this);
        };

        Token.prototype.getAccessToken = function (resourceId) {
            var deferred = this.getDeferred();

            this._context.getAccessToken(resourceId, this._clientId, this._redirectUri).then(function (token) {
                deferred.resolve(token);
            }, function (reason) {
                deferred.reject(reason);
            });

            return deferred;
        };

        Object.defineProperty(Token.prototype, "audience", {
            get: function () {
                return this._id_token.aud;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Token.prototype, "family_name", {
            get: function () {
                return this._id_token.family_name;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Token.prototype, "given_name", {
            get: function () {
                return this._id_token.given_name;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Token.prototype, "identity_provider", {
            get: function () {
                return this._id_token.iss;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Token.prototype, "tenant_id", {
            get: function () {
                return this._id_token.tid;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Token.prototype, "unique_name", {
            get: function () {
                return this._id_token.unique_name;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Token.prototype, "upn", {
            get: function () {
                return this._id_token.upn;
            },
            enumerable: true,
            configurable: true
        });
        return Token;
    })();
    O365Auth.Token = Token;

    var CacheManager = (function () {
        function CacheManager() {
            this._client_id_key = 'client_id';
            this._access_tokens_key = 'access_tokens';
            this._refresh_token_key = 'refresh_token';
            this._id_token_key = 'id_token';
            try  {
                var cache_entry = window.localStorage.getItem(this._client_id_key);

                if (cache_entry === null || cache_entry.length === 0) {
                    cache_entry = '{}';
                }

                this._cache_entry = JSON.parse(cache_entry);

                if (!this._cache_entry || typeof this._cache_entry === 'string') {
                    this._cache_entry = {};
                }
            } catch (e) {
                this._cache_entry = {};
            }
        }
        CacheManager.prototype.save = function () {
            try  {
                window.localStorage.setItem(this._client_id_key, JSON.stringify(this._cache_entry));
            } catch (e) {
            }
        };

        CacheManager.prototype.clearAll = function () {
            this._cache_entry = {};
            this.save();
        };

        CacheManager.prototype.clear = function (client_id) {
            this._cache_entry[client_id] = undefined;
            this.save();
        };

        CacheManager.prototype.getAccessToken = function (client_id, resource_id) {
            this._cache_entry[client_id] = this._cache_entry[client_id] || {};
            this._cache_entry[client_id][this._access_tokens_key] = this._cache_entry[client_id][this._access_tokens_key] || {};
            if (this._cache_entry[client_id][this._access_tokens_key][resource_id] && typeof this._cache_entry[client_id][this._access_tokens_key][resource_id].expires_in === 'string') {
                this._cache_entry[client_id][this._access_tokens_key][resource_id].expires_in = new Date(this._cache_entry[client_id][this._access_tokens_key][resource_id].expires_in);
            }
            return this._cache_entry[client_id][this._access_tokens_key][resource_id];
        };

        CacheManager.prototype.getRefreshToken = function (client_id) {
            this._cache_entry[client_id] = this._cache_entry[client_id] || {};
            return this._cache_entry[client_id][this._refresh_token_key];
        };

        CacheManager.prototype.getIdToken = function (client_id) {
            this._cache_entry[client_id] = this._cache_entry[client_id] || {};
            return this._cache_entry[client_id][this._id_token_key];
        };

        CacheManager.prototype.setAccessToken = function (client_id, resource_id, access_token) {
            this._cache_entry[client_id] = this._cache_entry[client_id] || {};
            this._cache_entry[client_id][this._access_tokens_key] = this._cache_entry[client_id][this._access_tokens_key] || {};
            this._cache_entry[client_id][this._access_tokens_key][resource_id] = access_token;
            this.save();
        };

        CacheManager.prototype.setRefreshToken = function (client_id, refresh_token) {
            this._cache_entry[client_id] = this._cache_entry[client_id] || {};
            this._cache_entry[client_id][this._refresh_token_key] = refresh_token;
            this.save();
        };

        CacheManager.prototype.setIdToken = function (client_id, id_token) {
            this._cache_entry[client_id] = this._cache_entry[client_id] || {};
            this._cache_entry[client_id][this._id_token_key] = id_token;
            this.save();
        };
        return CacheManager;
    })();

    O365Auth.deferred;

    var Context = (function () {
        function Context(authUri, redirectUri) {
            this._redirectUri = 'http://localhost/';
            this._cacheManager = new CacheManager();
            if (!authUri) {
                if (O365Auth.Settings.authUri) {
                    this._authUri = O365Auth.Settings.authUri;
                } else {
                    throw new Microsoft.Utility.Exception('No authUri provided nor found in O365Auth.authUri');
                }
            } else {
                this._authUri = authUri;
            }
            if (this._authUri.charAt(this._authUri.length - 1) !== '/') {
                this._authUri += '/';
            }
            if (!redirectUri) {
                if (O365Auth.Settings.redirectUri) {
                    this._redirectUri = O365Auth.Settings.redirectUri;
                }
            } else {
                this._redirectUri = redirectUri;
            }
        }
        Context.prototype.getDeferred = function () {
            if (O365Auth.deferred) {
                return O365Auth.deferred();
            }

            return new Microsoft.Utility.Deferred();
        };

        Context.prototype.ajax = function (url, data, verb) {
            var deferred = new Microsoft.Utility.Deferred(), xhr = new XMLHttpRequest();

            if (!verb) {
                verb = 'GET';
            }

            xhr.open(verb.toUpperCase(), url, true);

            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.setRequestHeader('Accept', '*/*');

            xhr.onreadystatechange = function (e) {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        deferred.resolve(xhr.responseText);
                    } else {
                        deferred.reject(xhr);
                    }
                } else {
                    deferred.notify(xhr.readyState);
                }
            };

            xhr.send(data);

            return deferred;
        };

        Context.prototype.post = function (url, data) {
            return this.ajax(url, data, 'POST');
        };

        Context.prototype.getParameterByName = function (url, name) {
            var qmark = url.indexOf('?');

            if (qmark <= 0) {
                return '';
            }

            var regex = new RegExp('[\\?&]' + name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]') + '=([^&#]*)'), results = regex.exec(url.substr(qmark));

            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };

        Context.prototype.getAccessTokenFromRefreshToken = function (resourceId, refreshToken, clientId) {
            var deferred = this.getDeferred(), url = this._authUri + 'oauth2/token', data = 'grant_type=refresh_token&refresh_token=' + refreshToken + '&client_id=' + clientId + (resourceId ? '&resource=' + resourceId : '');

            this.post(url, data).then(function (result) {
                var jsonResult = JSON.parse(result), access_token = {
                    token: jsonResult.access_token,
                    expires_in: new Date((new Date()).getTime() + (jsonResult.expires_in - 300) * 1000)
                };

                this._cacheManager.setAccessToken(clientId, resourceId, access_token);

                deferred.resolve(access_token.token);
            }.bind(this), function (xhr) {
                deferred.reject(new Microsoft.Utility.Exception(xhr));
            });

            return deferred;
        };

        Context.prototype.getAccessToken = function (resourceId, clientId, redirectUri) {
            var deferred = this.getDeferred();

            if (!clientId) {
                if (O365Auth.Settings.clientId) {
                    clientId = O365Auth.Settings.clientId;
                } else {
                    deferred.reject(new Microsoft.Utility.Exception('clientId was not provided nor found in O365Auth.clientId'));
                    return deferred;
                }
            }

            if (!redirectUri) {
                redirectUri = this._redirectUri;
            }

            var access_token = this._cacheManager.getAccessToken(clientId, resourceId);

            if (access_token && access_token.expires_in > new Date()) {
                deferred.resolve(access_token.token);
                return deferred;
            }

            var refresh_token = this._cacheManager.getRefreshToken(clientId);

            if (refresh_token) {
                return this.getAccessTokenFromRefreshToken(resourceId, refresh_token, clientId);
            }

            var authorizationUri = this._authUri + 'oauth2/authorize?response_type=code&resource=' + resourceId + '&client_id=' + clientId + '&redirect_uri=' + encodeURIComponent(redirectUri);

            var onRedirect = function (e) {
                var loadUri = e.url;

                if (loadUri.substr(0, redirectUri.length).toLowerCase() === redirectUri.toLowerCase()) {
                    ref.close();

                    var code = this.getParameterByName(loadUri, 'code'), error = this.getParameterByName(loadUri, 'error_description');

                    if (code) {
                        var url = this._authUri + 'oauth2/token', data = 'grant_type=authorization_code&code=' + code + '&client_id=' + clientId + '&redirect_uri=' + encodeURIComponent(redirectUri);

                        this.post(url, data).then(function (result) {
                            var jsonResult = JSON.parse(result), access_token = {
                                token: jsonResult.access_token,
                                expires_in: new Date((new Date()).getTime() + (jsonResult.expires_in - 300) * 1000)
                            };

                            this._cacheManager.setAccessToken(clientId, resourceId, access_token);
                            this._cacheManager.setIdToken(clientId, jsonResult.id_token);
                            this._cacheManager.setRefreshToken(clientId, jsonResult.refresh_token);

                            deferred.resolve(access_token.token);
                        }.bind(this), function (xhr) {
                            deferred.reject(new Microsoft.Utility.HttpException(xhr));
                        });
                    } else if (error) {
                        deferred.reject(new Microsoft.Utility.Exception(error));
                    }
                }
            }.bind(this);

            var ref = window.open(authorizationUri, '_blank', 'location=yes');

            if (!ref) {
                deferred.reject(new Microsoft.Utility.Exception('The logon dialog was blocked by popup blocker'));
            } else {
                ref.addEventListener('loadstart', onRedirect);

                if (window["tinyHippos"]) {
                    window["__rippleFireEvent"] = onRedirect;
                }
            }

            return deferred;
        };

        Context.prototype.getIdToken = function (resourceId, clientId, redirectUri) {
            var deferred = this.getDeferred();

            if (!clientId) {
                if (O365Auth.Settings.clientId) {
                    clientId = O365Auth.Settings.clientId;
                } else {
                    deferred.reject(new Microsoft.Utility.Exception('clientId was not provided nor found in O365Auth.clientId'));
                    return deferred;
                }
            }

            if (!redirectUri) {
                redirectUri = this._redirectUri;
            }

            var id_token = this._cacheManager.getIdToken(clientId);

            if (id_token) {
                deferred.resolve(new Token(id_token, this, resourceId, clientId, redirectUri));
                return deferred;
            }

            this.getAccessToken(resourceId, clientId, redirectUri).then(function (value) {
                var id_token = this._cacheManager.getIdToken(clientId);
                deferred.resolve(new Token(id_token, this, resourceId, clientId, redirectUri));
            }.bind(this), function (reason) {
                deferred.reject(new Microsoft.Utility.HttpException(reason));
            });

            return deferred;
        };

        Context.prototype.logOut = function (clientId) {
            var deferred = this.getDeferred(), url = this._authUri + 'oauth2/logout?post_logout_redirect_uri=' + this._redirectUri;

            if (!clientId) {
                if (O365Auth.Settings.clientId) {
                    clientId = O365Auth.Settings.clientId;
                } else {
                    deferred.reject(new Microsoft.Utility.Exception('clientId was not provided nor found in O365Auth.clientId'));
                    return deferred;
                }
            }

            this.ajax(url).then(function (result) {
                deferred.resolve();
            }.bind(this), function (xhr) {
                deferred.reject(new Microsoft.Utility.HttpException(xhr));
            });

            this._cacheManager.clear(clientId);

            return deferred;
        };
        return Context;
    })();
    O365Auth.Context = Context;
})(O365Auth || (O365Auth = {}));
//# sourceMappingURL=ADAL.js.map
