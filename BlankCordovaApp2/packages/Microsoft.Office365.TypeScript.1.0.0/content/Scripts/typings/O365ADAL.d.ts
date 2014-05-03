declare module O365Auth {
    class Token {
        private _id_token;
        private _context;
        private _clientId;
        private _redirectUri;
        private _resourceId;
        constructor(raw_id_token: string, context: Context, resourceId: string, clientId?: string, redirectUri?: string);
        private getDeferred<T>();
        public getAccessTokenFn(resourceId?: string): () => Microsoft.Utility.IPromise<string>;
        public getAccessToken(resourceId: string): Microsoft.Utility.IPromise<string>;
        public audience : string;
        public family_name : string;
        public given_name : string;
        public identity_provider : string;
        public tenant_id : string;
        public unique_name : string;
        public upn : string;
    }
    var deferred: <T>() => Microsoft.Utility.IDeferred<T>;
    class Context {
        private _authUri;
        private _redirectUri;
        private _cacheManager;
        constructor(authUri?: string, redirectUri?: string);
        private getDeferred<T>();
        private ajax(url, data?, verb?);
        private post(url, data);
        private getParameterByName(url, name);
        private getAccessTokenFromRefreshToken(resourceId, refreshToken, clientId);
        public getAccessToken(resourceId: string, clientId?: string, redirectUri?: string): Microsoft.Utility.IPromise<string>;
        public getIdToken(resourceId: string, clientId?: string, redirectUri?: string): Microsoft.Utility.IPromise<Token>;
        public logOut(clientId?: string): Microsoft.Utility.IPromise<void>;
    }
}
