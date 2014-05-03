
var O365Auth;
(function (O365Auth) {
    (function (Settings) {
        Settings.clientId = "14cd607b-81ae-4dd2-a95a-f64126b121be";
        Settings.authUri = "https://login.windows.net/common/";
        Settings.redirectUri = "http://localhost:4400/redirectTarget.html";
    })(O365Auth.Settings || (O365Auth.Settings = {}));
    var Settings = O365Auth.Settings;
})(O365Auth || (O365Auth = {}));
