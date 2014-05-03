var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Microsoft;
(function (Microsoft) {
    (function (Utility) {
        (function (EncodingHelpers) {
            function getKeyExpression(entityKeys) {
                var entityInstanceKey = '(';

                if (entityKeys.length == 1) {
                    entityInstanceKey += formatLiteral(entityKeys[0]);
                } else {
                    var addComma = false;
                    for (var i = 0; i < entityKeys.length; i++) {
                        if (addComma) {
                            entityInstanceKey += ',';
                        } else {
                            addComma = true;
                        }

                        entityInstanceKey += entityKeys[i].name + '=' + formatLiteral(entityKeys[i]);
                    }
                }

                entityInstanceKey += ')';

                return entityInstanceKey;
            }
            EncodingHelpers.getKeyExpression = getKeyExpression;

            function formatLiteral(literal) {
                /// <summary>Formats a value according to Uri literal format</summary>
                /// <param name="value">Value to be formatted.</param>
                /// <param name="type">Edm type of the value</param>
                /// <returns type="string">Value after formatting</returns>
                var result = "" + formatRowLiteral(literal.value, literal.type);

                result = encodeURIComponent(result.replace("'", "''"));

                switch ((literal.type)) {
                    case "Edm.Binary":
                        return "X'" + result + "'";
                    case "Edm.DateTime":
                        return "datetime" + "'" + result + "'";
                    case "Edm.DateTimeOffset":
                        return "datetimeoffset" + "'" + result + "'";
                    case "Edm.Decimal":
                        return result + "M";
                    case "Edm.Guid":
                        return "guid" + "'" + result + "'";
                    case "Edm.Int64":
                        return result + "L";
                    case "Edm.Float":
                        return result + "f";
                    case "Edm.Double":
                        return result + "D";
                    case "Edm.Geography":
                        return "geography" + "'" + result + "'";
                    case "Edm.Geometry":
                        return "geometry" + "'" + result + "'";
                    case "Edm.Time":
                        return "time" + "'" + result + "'";
                    case "Edm.String":
                        return "'" + result + "'";
                    default:
                        return result;
                }
            }
            EncodingHelpers.formatLiteral = formatLiteral;

            function formatRowLiteral(value, type) {
                switch (type) {
                    case "Edm.Binary":
                        return Microsoft.Utility.decodeBase64AsHexString(value);
                    default:
                        return value;
                }
            }
        })(Utility.EncodingHelpers || (Utility.EncodingHelpers = {}));
        var EncodingHelpers = Utility.EncodingHelpers;

        function findProperties(o) {
            var aPropertiesAndMethods = [];

            do {
                aPropertiesAndMethods = aPropertiesAndMethods.concat(Object.getOwnPropertyNames(o));
            } while(o = Object.getPrototypeOf(o));

            for (var a = 0; a < aPropertiesAndMethods.length; ++a) {
                for (var b = a + 1; b < aPropertiesAndMethods.length; ++b) {
                    if (aPropertiesAndMethods[a] === aPropertiesAndMethods[b]) {
                        aPropertiesAndMethods.splice(a--, 1);
                    }
                }
            }

            return aPropertiesAndMethods;
        }
        Utility.findProperties = findProperties;

        function decodeBase64AsHexString(base64) {
            var decoded = decodeBase64(base64), hexValue = "", hexValues = "0123456789ABCDEF";

            for (var j = 0; j < decoded.length; j++) {
                var byte = decoded[j];
                hexValue += hexValues[byte >> 4];
                hexValue += hexValues[byte & 0x0F];
            }

            return hexValue;
        }
        Utility.decodeBase64AsHexString = decodeBase64AsHexString;

        function decodeBase64(base64) {
            var decoded = [];

            if (window.atob !== undefined) {
                var binaryStr = window.atob(base64);
                for (var i = 0; i < binaryStr.length; i++) {
                    decoded.push(binaryStr.charCodeAt(i));
                }
                return decoded;
            }

            for (var index = 0; index < base64.length; index += 4) {
                var sextet1 = getBase64Sextet(base64[index]);
                var sextet2 = getBase64Sextet(base64[index + 1]);
                var sextet3 = (index + 2 < base64.length) ? getBase64Sextet(base64[index + 2]) : null;
                var sextet4 = (index + 3 < base64.length) ? getBase64Sextet(base64[index + 3]) : null;
                decoded.push((sextet1 << 2) | (sextet2 >> 4));
                if (sextet3)
                    decoded.push(((sextet2 & 0xF) << 4) | (sextet3 >> 2));
                if (sextet4)
                    decoded.push(((sextet3 & 0x3) << 6) | sextet4);
            }

            return decoded;
        }
        Utility.decodeBase64 = decodeBase64;

        function decodeBase64AsString(base64) {
            var decoded = decodeBase64(base64), decoded_string;

            decoded.forEach(function (value, index, decoded_access_token) {
                if (!decoded_string) {
                    decoded_string = String.fromCharCode(value);
                } else {
                    decoded_string += String.fromCharCode(value);
                }
            });

            return decoded_string;
        }
        Utility.decodeBase64AsString = decodeBase64AsString;

        function getBase64Sextet(character) {
            var code = character.charCodeAt(0);

            if (code >= 65 && code <= 90)
                return code - 65;

            if (code >= 97 && code <= 122)
                return code - 71;

            if (code >= 48 && code <= 57)
                return code + 4;

            if (character === "+")
                return 62;

            if (character === "/")
                return 63;

            return null;
        }

        var Exception = (function () {
            function Exception(message, innerException) {
                this._message = message;
                if (innerException) {
                    this._innerException = innerException;
                }
            }
            Object.defineProperty(Exception.prototype, "message", {
                get: function () {
                    return this._message;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Exception.prototype, "innerException", {
                get: function () {
                    return this._innerException;
                },
                enumerable: true,
                configurable: true
            });
            return Exception;
        })();
        Utility.Exception = Exception;

        var HttpException = (function (_super) {
            __extends(HttpException, _super);
            function HttpException(XHR, innerException) {
                _super.call(this, XHR.statusText, innerException);
                this.getHeaders = this.getHeadersFn(XHR);
            }
            HttpException.prototype.getHeadersFn = function (xhr) {
                return function (headerName) {
                    if (headerName && headerName.length > 0) {
                        return xhr.getResponseHeader(headerName);
                    } else {
                        return xhr.getAllResponseHeaders();
                    }
                    ;
                };
            };

            Object.defineProperty(HttpException.prototype, "xhr", {
                get: function () {
                    return this._xhr;
                },
                enumerable: true,
                configurable: true
            });
            return HttpException;
        })(Exception);
        Utility.HttpException = HttpException;

        var DeferredState;
        (function (DeferredState) {
            DeferredState[DeferredState["UNFULFILLED"] = 0] = "UNFULFILLED";
            DeferredState[DeferredState["RESOLVED"] = 1] = "RESOLVED";
            DeferredState[DeferredState["REJECTED"] = 2] = "REJECTED";
        })(DeferredState || (DeferredState = {}));

        var Deferred = (function () {
            function Deferred() {
                this._fulfilled = function (value) {
                };
                this._rejected = function (reason) {
                };
                this._progress = function (progress) {
                };
                this._state = 0 /* UNFULFILLED */;
            }
            Deferred.prototype.then = function (onFulfilled, onRejected, onProgress) {
                switch (this._state) {
                    case 0 /* UNFULFILLED */:
                        if (onFulfilled && typeof onFulfilled === 'function') {
                            var fulfilled = this._fulfilled;
                            this._fulfilled = function (value) {
                                fulfilled(value);
                                onFulfilled(value);
                            };
                        }
                        if (onRejected && typeof onRejected === 'function') {
                            var rejected = this._rejected;
                            this._rejected = function (reason) {
                                rejected(reason);
                                onRejected(reason);
                            };
                        }
                        if (onProgress && typeof onProgress === 'function') {
                            var progress = this._progress;
                            this._progress = function (progress) {
                                progress(progress);
                                onProgress(progress);
                            };
                        }
                        break;
                    case 1 /* RESOLVED */:
                        if (onFulfilled && typeof onFulfilled === 'function') {
                            try  {
                                onFulfilled(this._value);
                            } catch (e) {
                            }
                        }
                        break;
                    case 2 /* REJECTED */:
                        if (onRejected && typeof onRejected === 'function') {
                            try  {
                                onRejected(this._reason);
                            } catch (e) {
                            }
                        }
                        break;
                }

                return this;
            };

            Deferred.prototype.detach = function () {
                this._fulfilled = function (value) {
                };
                this._rejected = function (reason) {
                };
                this._progress = function (progress) {
                };
            };

            Deferred.prototype.resolve = function (value) {
                if (this._state != 0 /* UNFULFILLED */) {
                    throw new Microsoft.Utility.Exception("Invalid deferred state = " + this._state);
                }
                this._value = value;
                try  {
                    this._fulfilled(value);
                } catch (e) {
                }
                this.detach();
                this._state = 1 /* RESOLVED */;
            };

            Deferred.prototype.reject = function (reason) {
                if (this._state != 0 /* UNFULFILLED */) {
                    throw new Microsoft.Utility.Exception("Invalid deferred state = " + this._state);
                }
                this._reason = reason;
                try  {
                    this._rejected(reason);
                } catch (e) {
                }
                this.detach();
                this._state = 2 /* REJECTED */;
            };

            Deferred.prototype.notify = function (progress) {
                if (this._state != 0 /* UNFULFILLED */) {
                    throw new Microsoft.Utility.Exception("Invalid deferred state = " + this._state);
                }
                try  {
                    this._progress(progress);
                } catch (e) {
                }
            };
            return Deferred;
        })();
        Utility.Deferred = Deferred;
    })(Microsoft.Utility || (Microsoft.Utility = {}));
    var Utility = Microsoft.Utility;
})(Microsoft || (Microsoft = {}));
//# sourceMappingURL=UTILITY.js.map
