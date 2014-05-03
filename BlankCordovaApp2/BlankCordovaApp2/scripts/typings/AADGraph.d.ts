declare module Microsoft.WindowsAzure.ActiveDirectory.Extensions {
    class Request {
        public requestUri: string;
        public headers: {
            [name: string]: string;
        };
        public method: string;
        public data: any;
        constructor(requestUri: string);
    }
    class DataContext {
        private _getAccessTokenFn;
        private _extraQueryParameters;
        private _serviceRootUri;
        constructor(serviceRootUri: string, extraQueryParameters?: string, getAccessTokenFn?: () => Utility.IPromise<string>);
        public serviceRootUri : string;
        public extraQueryParameters : string;
        private ajax(request);
        public read(path: string): Utility.IPromise<string>;
        public readUrl(url: string): Utility.IPromise<string>;
        public request(request: Request): Utility.IPromise<string>;
        private augmentRequest(request);
    }
    class PagedEnumerable<T> {
        private _path;
        private _context;
        private _resultFn;
        private _data;
        constructor(context: DataContext, path: string, resultFn: (dataContext: DataContext, path: string, data: any) => T[], data?: T[]);
        public path : string;
        public uri : string;
        public context : DataContext;
        public currentPage : T[];
        public getNextPage(): Utility.IPromise<PagedEnumerable<T>>;
    }
    class QueryableSet<T> {
        private _context;
        private _entity;
        private _path;
        constructor(context: DataContext, path: string, entity?: any);
        public context : DataContext;
        public entity : any;
        public path : string;
        public getPath(prop: string): string;
    }
    class RestShallowObjectFetcher {
        private _context;
        private _path;
        constructor(context: DataContext, path: string);
        public context : DataContext;
        public path : string;
        public getPath(prop: string): string;
    }
    class ComplexTypeBase {
    }
    class EntityBase {
        private _context;
        private _path;
        constructor(context: DataContext, path: string);
        public context : DataContext;
        public path : string;
        public getPath(prop: string): string;
    }
    function isUndefined(v: any): boolean;
}
declare module Microsoft.WindowsAzure.ActiveDirectory {
    class AadGraphClient {
        private _context;
        public context : Extensions.DataContext;
        private getPath(prop);
        constructor(serviceRootUri: string, getAccessTokenFn: () => Utility.IPromise<string>);
        public ApplicationRefs : ApplicationRefCollection;
        private _applicationRefs;
        public DirectoryObjects : DirectoryObjectCollection;
        private _directoryObjects;
        public EnabledFeatures : EnabledFeatureCollection;
        private _enabledFeatures;
        public LoginTenantBranding : LoginTenantBrandingCollection;
        private _loginTenantBranding;
        public ImpersonationAccessGrants : ImpersonationAccessGrantCollection;
        private _impersonationAccessGrants;
        public SubscribedSkus : SubscribedSkuCollection;
        private _subscribedSkus;
        public SoftDeletedDirectoryObjects : DirectoryObjectCollection;
        private _softDeletedDirectoryObjects;
        public activateService(serviceTypeName: string): Utility.IPromise<boolean>;
        public getObjectsByObjectIds(objectIds: string[]): Utility.IPromise<DirectoryObject[]>;
        public getServicePrincipalsByAppIds(appIds: string[]): Utility.IPromise<DirectoryObject[]>;
        public isMemberOf(groupId: string, memberId: string): Utility.IPromise<boolean>;
        public consentToApp(clientAppId: string, onBehalfOfAll: boolean, tags: string[], checkOnly: boolean): Utility.IPromise<void>;
        public revokeUserConsentToApp(clientAppId: string): Utility.IPromise<void>;
    }
    class DirectoryObjectFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<DirectoryObject>;
        public checkMemberGroups(groupIds: string[]): Utility.IPromise<string[]>;
        public getMemberGroups(securityEnabledOnly: boolean): Utility.IPromise<string[]>;
    }
    interface IDirectoryObjectCollection {
        value: IDirectoryObject[];
    }
    interface IDirectoryObject {
        objectType: string;
        objectId: string;
        softDeletionTimestamp: string;
    }
    class DirectoryObject extends Extensions.EntityBase {
        constructor(context: Extensions.DataContext, path: string, data: IDirectoryObject);
        public _odataType: string;
        public objectType : string;
        private _objectType;
        public objectId : string;
        private _objectId;
        public softDeletionTimestamp : Date;
        private _softDeletionTimestamp;
        public createdOnBehalfOf : DirectoryObject;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObject;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public checkMemberGroups(groupIds: string[]): Utility.IPromise<string[]>;
        public getMemberGroups(securityEnabledOnly: boolean): Utility.IPromise<string[]>;
        static parseDirectoryObject(context: Extensions.DataContext, path: string, data: IDirectoryObject): DirectoryObject;
        static parseDirectoryObjectCollection(context: Extensions.DataContext, path: string, data: IDirectoryObject[]): DirectoryObject[];
        public getRequestBody(excludeArrays: boolean): IDirectoryObject;
    }
    class ApplicationFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public notifications : NotificationCollection;
        private _notifications;
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<Application>;
        public restore(identifierUris: string[]): Utility.IPromise<Application>;
    }
    interface IApplicationCollection {
        value: IApplication[];
    }
    interface IApplication extends IDirectoryObject {
        appId: string;
        appMetadata: IAppMetadata;
        appPermissions: IAppPermission[];
        availableToOtherTenants: boolean;
        displayName: string;
        errorUrl: string;
        homepage: string;
        identifierUris: string[];
        keyCredentials: IKeyCredential[];
        mainLogo: string;
        logoutUrl: string;
        passwordCredentials: IPasswordCredential[];
        publicClient: boolean;
        replyUrls: string[];
        requiredResourceAccess: IRequiredResourceAccess[];
        resourceApplicationSet: string;
        samlMetadataUrl: string;
        webApi: boolean;
        webApp: boolean;
    }
    class Application extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IApplication);
        public _odataType: string;
        public appId : string;
        private _appId;
        public appMetadata : AppMetadata;
        private _appMetadata;
        public appPermissions : AppPermission[];
        private _appPermissions;
        public availableToOtherTenants : boolean;
        private _availableToOtherTenants;
        public displayName : string;
        private _displayName;
        public errorUrl : string;
        private _errorUrl;
        public homepage : string;
        private _homepage;
        public identifierUris : string[];
        private _identifierUris;
        public keyCredentials : KeyCredential[];
        private _keyCredentials;
        public mainLogo : string;
        private _mainLogo;
        public logoutUrl : string;
        private _logoutUrl;
        public passwordCredentials : PasswordCredential[];
        private _passwordCredentials;
        public publicClient : boolean;
        private _publicClient;
        public replyUrls : string[];
        private _replyUrls;
        public requiredResourceAccess : RequiredResourceAccess[];
        private _requiredResourceAccess;
        public resourceApplicationSet : string;
        private _resourceApplicationSet;
        public samlMetadataUrl : string;
        private _samlMetadataUrl;
        public webApi : boolean;
        private _webApi;
        public webApp : boolean;
        private _webApp;
        public notifications : NotificationCollection;
        private _notifications;
        public restore(identifierUris: string[]): Utility.IPromise<Application>;
        static parseApplication(context: Extensions.DataContext, path: string, data: IApplication): Application;
        static parseApplicationCollection(context: Extensions.DataContext, path: string, data: IApplication[]): Application[];
        public getRequestBody(excludeArrays: boolean): IApplication;
    }
    class UserFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public impersonationAccessGrants : ImpersonationAccessGrantCollection;
        private _impersonationAccessGrants;
        public registeredDevices : DirectoryObjectCollection;
        private _registeredDevices;
        public ownedDevices : DirectoryObjectCollection;
        private _ownedDevices;
        public directAccessGrants : DirectAccessGrantCollection;
        private _directAccessGrants;
        public pendingMemberOf : DirectoryObjectCollection;
        private _pendingMemberOf;
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<User>;
        public assignLicense(addLicenses: AssignedLicense[], removeLicenses: string[]): Utility.IPromise<User>;
    }
    interface IUserCollection {
        value: IUser[];
    }
    interface IUser extends IDirectoryObject {
        accountEnabled: boolean;
        alternativeSecurityIds: IAlternativeSecurityId[];
        appMetadata: IAppMetadata;
        assignedLicenses: IAssignedLicense[];
        assignedPlans: IAssignedPlan[];
        city: string;
        country: string;
        department: string;
        dirSyncEnabled: boolean;
        displayName: string;
        extensionAttribute1: string;
        extensionAttribute2: string;
        extensionAttribute3: string;
        extensionAttribute4: string;
        extensionAttribute5: string;
        facsimileTelephoneNumber: string;
        givenName: string;
        immutableId: string;
        jobTitle: string;
        lastDirSyncTime: string;
        mail: string;
        mailNickname: string;
        mobile: string;
        netId: string;
        otherMails: string[];
        passwordPolicies: string;
        passwordProfile: IPasswordProfile;
        physicalDeliveryOfficeName: string;
        postalCode: string;
        preferredLanguage: string;
        primarySMTPAddress: string;
        provisionedPlans: IProvisionedPlan[];
        provisioningErrors: IProvisioningError[];
        proxyAddresses: string[];
        sipProxyAddress: string;
        smtpAddresses: string[];
        state: string;
        streetAddress: string;
        surname: string;
        telephoneNumber: string;
        thumbnailPhoto: string;
        usageLocation: string;
        userPrincipalName: string;
        userType: string;
    }
    class User extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IUser);
        public _odataType: string;
        public accountEnabled : boolean;
        private _accountEnabled;
        public alternativeSecurityIds : AlternativeSecurityId[];
        private _alternativeSecurityIds;
        public appMetadata : AppMetadata;
        private _appMetadata;
        public assignedLicenses : AssignedLicense[];
        private _assignedLicenses;
        public assignedPlans : AssignedPlan[];
        private _assignedPlans;
        public city : string;
        private _city;
        public country : string;
        private _country;
        public department : string;
        private _department;
        public dirSyncEnabled : boolean;
        private _dirSyncEnabled;
        public displayName : string;
        private _displayName;
        public extensionAttribute1 : string;
        private _extensionAttribute1;
        public extensionAttribute2 : string;
        private _extensionAttribute2;
        public extensionAttribute3 : string;
        private _extensionAttribute3;
        public extensionAttribute4 : string;
        private _extensionAttribute4;
        public extensionAttribute5 : string;
        private _extensionAttribute5;
        public facsimileTelephoneNumber : string;
        private _facsimileTelephoneNumber;
        public givenName : string;
        private _givenName;
        public immutableId : string;
        private _immutableId;
        public jobTitle : string;
        private _jobTitle;
        public lastDirSyncTime : Date;
        private _lastDirSyncTime;
        public mail : string;
        private _mail;
        public mailNickname : string;
        private _mailNickname;
        public mobile : string;
        private _mobile;
        public netId : string;
        private _netId;
        public otherMails : string[];
        private _otherMails;
        public passwordPolicies : string;
        private _passwordPolicies;
        public passwordProfile : PasswordProfile;
        private _passwordProfile;
        public physicalDeliveryOfficeName : string;
        private _physicalDeliveryOfficeName;
        public postalCode : string;
        private _postalCode;
        public preferredLanguage : string;
        private _preferredLanguage;
        public primarySMTPAddress : string;
        private _primarySMTPAddress;
        public provisionedPlans : ProvisionedPlan[];
        private _provisionedPlans;
        public provisioningErrors : ProvisioningError[];
        private _provisioningErrors;
        public proxyAddresses : string[];
        private _proxyAddresses;
        public sipProxyAddress : string;
        private _sipProxyAddress;
        public smtpAddresses : string[];
        private _smtpAddresses;
        public state : string;
        private _state;
        public streetAddress : string;
        private _streetAddress;
        public surname : string;
        private _surname;
        public telephoneNumber : string;
        private _telephoneNumber;
        public thumbnailPhoto : string;
        private _thumbnailPhoto;
        public usageLocation : string;
        private _usageLocation;
        public userPrincipalName : string;
        private _userPrincipalName;
        public userType : string;
        private _userType;
        public impersonationAccessGrants : ImpersonationAccessGrantCollection;
        private _impersonationAccessGrants;
        public registeredDevices : DirectoryObjectCollection;
        private _registeredDevices;
        public ownedDevices : DirectoryObjectCollection;
        private _ownedDevices;
        public directAccessGrants : DirectAccessGrantCollection;
        private _directAccessGrants;
        public pendingMemberOf : DirectoryObjectCollection;
        private _pendingMemberOf;
        public assignLicense(addLicenses: AssignedLicense[], removeLicenses: string[]): Utility.IPromise<User>;
        static parseUser(context: Extensions.DataContext, path: string, data: IUser): User;
        static parseUserCollection(context: Extensions.DataContext, path: string, data: IUser[]): User[];
        public getRequestBody(excludeArrays: boolean): IUser;
    }
    interface IAssignedLicenseCollection {
        value: IAssignedLicense[];
    }
    interface IAssignedLicense {
        disabledPlans: string[];
        skuId: string;
    }
    class AssignedLicense extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IAssignedLicense);
        public _odataType: string;
        public disabledPlans : string[];
        private _disabledPlans;
        public skuId : string;
        private _skuId;
        static parseAssignedLicense(context: Extensions.DataContext, data: IAssignedLicense): AssignedLicense;
        static parseAssignedLicenseCollection(context: Extensions.DataContext, data: IAssignedLicense[]): AssignedLicense[];
        public getRequestBody(excludeArrays: boolean): IAssignedLicense;
    }
    class ApplicationRefFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public exec(): Utility.IPromise<ApplicationRef>;
    }
    interface IApplicationRefCollection {
        value: IApplicationRef[];
    }
    interface IApplicationRef {
        appId: string;
        appPermissions: IAppPermission[];
        availableToOtherTenants: boolean;
        displayName: string;
        errorUrl: string;
        homepage: string;
        identifierUris: string[];
        mainLogo: string;
        logoutUrl: string;
        publisherName: string;
        publicClient: boolean;
        replyUrls: string[];
        requiredResourceAccess: IRequiredResourceAccess[];
        resourceApplicationSet: string;
        samlMetadataUrl: string;
        webApi: boolean;
        webApp: boolean;
    }
    class ApplicationRef extends Extensions.EntityBase {
        constructor(context: Extensions.DataContext, path: string, data: IApplicationRef);
        public _odataType: string;
        public appId : string;
        private _appId;
        public appPermissions : AppPermission[];
        private _appPermissions;
        public availableToOtherTenants : boolean;
        private _availableToOtherTenants;
        public displayName : string;
        private _displayName;
        public errorUrl : string;
        private _errorUrl;
        public homepage : string;
        private _homepage;
        public identifierUris : string[];
        private _identifierUris;
        public mainLogo : string;
        private _mainLogo;
        public logoutUrl : string;
        private _logoutUrl;
        public publisherName : string;
        private _publisherName;
        public publicClient : boolean;
        private _publicClient;
        public replyUrls : string[];
        private _replyUrls;
        public requiredResourceAccess : RequiredResourceAccess[];
        private _requiredResourceAccess;
        public resourceApplicationSet : string;
        private _resourceApplicationSet;
        public samlMetadataUrl : string;
        private _samlMetadataUrl;
        public webApi : boolean;
        private _webApi;
        public webApp : boolean;
        private _webApp;
        static parseApplicationRef(context: Extensions.DataContext, path: string, data: IApplicationRef): ApplicationRef;
        static parseApplicationRefCollection(context: Extensions.DataContext, path: string, data: IApplicationRef[]): ApplicationRef[];
        public getRequestBody(excludeArrays: boolean): IApplicationRef;
    }
    interface IAppPermissionCollection {
        value: IAppPermission[];
    }
    interface IAppPermission {
        claimValue: string;
        description: string;
        directAccessGrantTypes: string[];
        displayName: string;
        impersonationAccessGrantTypes: IImpersonationAccessGrantType[];
        isDisabled: boolean;
        origin: string;
        permissionId: string;
        resourceScopeType: string;
        userConsentDescription: string;
        userConsentDisplayName: string;
    }
    class AppPermission extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IAppPermission);
        public _odataType: string;
        public claimValue : string;
        private _claimValue;
        public description : string;
        private _description;
        public directAccessGrantTypes : string[];
        private _directAccessGrantTypes;
        public displayName : string;
        private _displayName;
        public impersonationAccessGrantTypes : ImpersonationAccessGrantType[];
        private _impersonationAccessGrantTypes;
        public isDisabled : boolean;
        private _isDisabled;
        public origin : string;
        private _origin;
        public permissionId : string;
        private _permissionId;
        public resourceScopeType : string;
        private _resourceScopeType;
        public userConsentDescription : string;
        private _userConsentDescription;
        public userConsentDisplayName : string;
        private _userConsentDisplayName;
        static parseAppPermission(context: Extensions.DataContext, data: IAppPermission): AppPermission;
        static parseAppPermissionCollection(context: Extensions.DataContext, data: IAppPermission[]): AppPermission[];
        public getRequestBody(excludeArrays: boolean): IAppPermission;
    }
    interface IImpersonationAccessGrantTypeCollection {
        value: IImpersonationAccessGrantType[];
    }
    interface IImpersonationAccessGrantType {
        impersonated: string;
        impersonator: string;
    }
    class ImpersonationAccessGrantType extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IImpersonationAccessGrantType);
        public _odataType: string;
        public impersonated : string;
        private _impersonated;
        public impersonator : string;
        private _impersonator;
        static parseImpersonationAccessGrantType(context: Extensions.DataContext, data: IImpersonationAccessGrantType): ImpersonationAccessGrantType;
        static parseImpersonationAccessGrantTypeCollection(context: Extensions.DataContext, data: IImpersonationAccessGrantType[]): ImpersonationAccessGrantType[];
        public getRequestBody(excludeArrays: boolean): IImpersonationAccessGrantType;
    }
    interface IRequiredResourceAccessCollection {
        value: IRequiredResourceAccess[];
    }
    interface IRequiredResourceAccess {
        resourceAppId: string;
        requiredAppPermissions: IRequiredAppPermission[];
    }
    class RequiredResourceAccess extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IRequiredResourceAccess);
        public _odataType: string;
        public resourceAppId : string;
        private _resourceAppId;
        public requiredAppPermissions : RequiredAppPermission[];
        private _requiredAppPermissions;
        static parseRequiredResourceAccess(context: Extensions.DataContext, data: IRequiredResourceAccess): RequiredResourceAccess;
        static parseRequiredResourceAccessCollection(context: Extensions.DataContext, data: IRequiredResourceAccess[]): RequiredResourceAccess[];
        public getRequestBody(excludeArrays: boolean): IRequiredResourceAccess;
    }
    interface IRequiredAppPermissionCollection {
        value: IRequiredAppPermission[];
    }
    interface IRequiredAppPermission {
        permissionId: string;
        directAccessGrant: boolean;
        impersonationAccessGrants: string[];
    }
    class RequiredAppPermission extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IRequiredAppPermission);
        public _odataType: string;
        public permissionId : string;
        private _permissionId;
        public directAccessGrant : boolean;
        private _directAccessGrant;
        public impersonationAccessGrants : string[];
        private _impersonationAccessGrants;
        static parseRequiredAppPermission(context: Extensions.DataContext, data: IRequiredAppPermission): RequiredAppPermission;
        static parseRequiredAppPermissionCollection(context: Extensions.DataContext, data: IRequiredAppPermission[]): RequiredAppPermission[];
        public getRequestBody(excludeArrays: boolean): IRequiredAppPermission;
    }
    class NotificationFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<Notification>;
    }
    interface INotificationCollection {
        value: INotification[];
    }
    interface INotification extends IDirectoryObject {
        callbackUri: string;
        filters: string[];
    }
    class Notification extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: INotification);
        public _odataType: string;
        public callbackUri : string;
        private _callbackUri;
        public filters : string[];
        private _filters;
        static parseNotification(context: Extensions.DataContext, path: string, data: INotification): Notification;
        static parseNotificationCollection(context: Extensions.DataContext, path: string, data: INotification[]): Notification[];
        public getRequestBody(excludeArrays: boolean): INotification;
    }
    interface IAppMetadataCollection {
        value: IAppMetadata[];
    }
    interface IAppMetadata {
        version: number;
        data: IAppMetadataEntry[];
    }
    class AppMetadata extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IAppMetadata);
        public _odataType: string;
        public version : number;
        private _version;
        public data : AppMetadataEntry[];
        private _data;
        static parseAppMetadata(context: Extensions.DataContext, data: IAppMetadata): AppMetadata;
        static parseAppMetadataCollection(context: Extensions.DataContext, data: IAppMetadata[]): AppMetadata[];
        public getRequestBody(excludeArrays: boolean): IAppMetadata;
    }
    interface IAppMetadataEntryCollection {
        value: IAppMetadataEntry[];
    }
    interface IAppMetadataEntry {
        key: string;
        value: string;
    }
    class AppMetadataEntry extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IAppMetadataEntry);
        public _odataType: string;
        public key : string;
        private _key;
        public value : string;
        private _value;
        static parseAppMetadataEntry(context: Extensions.DataContext, data: IAppMetadataEntry): AppMetadataEntry;
        static parseAppMetadataEntryCollection(context: Extensions.DataContext, data: IAppMetadataEntry[]): AppMetadataEntry[];
        public getRequestBody(excludeArrays: boolean): IAppMetadataEntry;
    }
    interface IKeyCredentialCollection {
        value: IKeyCredential[];
    }
    interface IKeyCredential {
        customKeyIdentifier: string;
        endDate: string;
        keyId: string;
        startDate: string;
        type: string;
        usage: string;
        value: string;
    }
    class KeyCredential extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IKeyCredential);
        public _odataType: string;
        public customKeyIdentifier : string;
        private _customKeyIdentifier;
        public endDate : Date;
        private _endDate;
        public keyId : string;
        private _keyId;
        public startDate : Date;
        private _startDate;
        public type : string;
        private _type;
        public usage : string;
        private _usage;
        public value : string;
        private _value;
        static parseKeyCredential(context: Extensions.DataContext, data: IKeyCredential): KeyCredential;
        static parseKeyCredentialCollection(context: Extensions.DataContext, data: IKeyCredential[]): KeyCredential[];
        public getRequestBody(excludeArrays: boolean): IKeyCredential;
    }
    interface IPasswordCredentialCollection {
        value: IPasswordCredential[];
    }
    interface IPasswordCredential {
        customKeyIdentifier: string;
        endDate: string;
        keyId: string;
        startDate: string;
        value: string;
    }
    class PasswordCredential extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IPasswordCredential);
        public _odataType: string;
        public customKeyIdentifier : string;
        private _customKeyIdentifier;
        public endDate : Date;
        private _endDate;
        public keyId : string;
        private _keyId;
        public startDate : Date;
        private _startDate;
        public value : string;
        private _value;
        static parsePasswordCredential(context: Extensions.DataContext, data: IPasswordCredential): PasswordCredential;
        static parsePasswordCredentialCollection(context: Extensions.DataContext, data: IPasswordCredential[]): PasswordCredential[];
        public getRequestBody(excludeArrays: boolean): IPasswordCredential;
    }
    class CollaborationSpaceFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<CollaborationSpace>;
    }
    interface ICollaborationSpaceCollection {
        value: ICollaborationSpace[];
    }
    interface ICollaborationSpace extends IDirectoryObject {
        accountEnabled: boolean;
        allowAccessTo: string[];
        displayName: string;
        description: string;
        mail: string;
        mailNickname: string;
        userPrincipalName: string;
        changeMarker: string;
        provisioningSince: string;
    }
    class CollaborationSpace extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: ICollaborationSpace);
        public _odataType: string;
        public accountEnabled : boolean;
        private _accountEnabled;
        public allowAccessTo : string[];
        private _allowAccessTo;
        public displayName : string;
        private _displayName;
        public description : string;
        private _description;
        public mail : string;
        private _mail;
        public mailNickname : string;
        private _mailNickname;
        public userPrincipalName : string;
        private _userPrincipalName;
        public changeMarker : string;
        private _changeMarker;
        public provisioningSince : Date;
        private _provisioningSince;
        static parseCollaborationSpace(context: Extensions.DataContext, path: string, data: ICollaborationSpace): CollaborationSpace;
        static parseCollaborationSpaceCollection(context: Extensions.DataContext, path: string, data: ICollaborationSpace[]): CollaborationSpace[];
        public getRequestBody(excludeArrays: boolean): ICollaborationSpace;
    }
    class ContactFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<Contact>;
    }
    interface IContactCollection {
        value: IContact[];
    }
    interface IContact extends IDirectoryObject {
        city: string;
        country: string;
        department: string;
        dirSyncEnabled: boolean;
        displayName: string;
        facsimileTelephoneNumber: string;
        givenName: string;
        jobTitle: string;
        lastDirSyncTime: string;
        mail: string;
        mailNickname: string;
        mobile: string;
        physicalDeliveryOfficeName: string;
        postalCode: string;
        provisioningErrors: IProvisioningError[];
        proxyAddresses: string[];
        sipProxyAddress: string;
        state: string;
        streetAddress: string;
        surname: string;
        telephoneNumber: string;
        thumbnailPhoto: string;
    }
    class Contact extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IContact);
        public _odataType: string;
        public city : string;
        private _city;
        public country : string;
        private _country;
        public department : string;
        private _department;
        public dirSyncEnabled : boolean;
        private _dirSyncEnabled;
        public displayName : string;
        private _displayName;
        public facsimileTelephoneNumber : string;
        private _facsimileTelephoneNumber;
        public givenName : string;
        private _givenName;
        public jobTitle : string;
        private _jobTitle;
        public lastDirSyncTime : Date;
        private _lastDirSyncTime;
        public mail : string;
        private _mail;
        public mailNickname : string;
        private _mailNickname;
        public mobile : string;
        private _mobile;
        public physicalDeliveryOfficeName : string;
        private _physicalDeliveryOfficeName;
        public postalCode : string;
        private _postalCode;
        public provisioningErrors : ProvisioningError[];
        private _provisioningErrors;
        public proxyAddresses : string[];
        private _proxyAddresses;
        public sipProxyAddress : string;
        private _sipProxyAddress;
        public state : string;
        private _state;
        public streetAddress : string;
        private _streetAddress;
        public surname : string;
        private _surname;
        public telephoneNumber : string;
        private _telephoneNumber;
        public thumbnailPhoto : string;
        private _thumbnailPhoto;
        static parseContact(context: Extensions.DataContext, path: string, data: IContact): Contact;
        static parseContactCollection(context: Extensions.DataContext, path: string, data: IContact[]): Contact[];
        public getRequestBody(excludeArrays: boolean): IContact;
    }
    interface IProvisioningErrorCollection {
        value: IProvisioningError[];
    }
    interface IProvisioningError {
        errorDetail: string;
        resolved: boolean;
        service: string;
        timestamp: string;
    }
    class ProvisioningError extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IProvisioningError);
        public _odataType: string;
        public errorDetail : string;
        private _errorDetail;
        public resolved : boolean;
        private _resolved;
        public service : string;
        private _service;
        public timestamp : Date;
        private _timestamp;
        static parseProvisioningError(context: Extensions.DataContext, data: IProvisioningError): ProvisioningError;
        static parseProvisioningErrorCollection(context: Extensions.DataContext, data: IProvisioningError[]): ProvisioningError[];
        public getRequestBody(excludeArrays: boolean): IProvisioningError;
    }
    class DeviceFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public registeredOwners : DirectoryObjectCollection;
        private _registeredOwners;
        public registeredUsers : DirectoryObjectCollection;
        private _registeredUsers;
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<Device>;
    }
    interface IDeviceCollection {
        value: IDevice[];
    }
    interface IDevice extends IDirectoryObject {
        accountEnabled: boolean;
        alternativeSecurityIds: IAlternativeSecurityId[];
        approximateLastLogonTimestamp: string;
        deviceId: string;
        deviceObjectVersion: number;
        deviceOSType: string;
        deviceOSVersion: string;
        devicePhysicalIds: string[];
        dirSyncEnabled: boolean;
        displayName: string;
        lastDirSyncTime: string;
    }
    class Device extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IDevice);
        public _odataType: string;
        public accountEnabled : boolean;
        private _accountEnabled;
        public alternativeSecurityIds : AlternativeSecurityId[];
        private _alternativeSecurityIds;
        public approximateLastLogonTimestamp : Date;
        private _approximateLastLogonTimestamp;
        public deviceId : string;
        private _deviceId;
        public deviceObjectVersion : number;
        private _deviceObjectVersion;
        public deviceOSType : string;
        private _deviceOSType;
        public deviceOSVersion : string;
        private _deviceOSVersion;
        public devicePhysicalIds : string[];
        private _devicePhysicalIds;
        public dirSyncEnabled : boolean;
        private _dirSyncEnabled;
        public displayName : string;
        private _displayName;
        public lastDirSyncTime : Date;
        private _lastDirSyncTime;
        public registeredOwners : DirectoryObjectCollection;
        private _registeredOwners;
        public registeredUsers : DirectoryObjectCollection;
        private _registeredUsers;
        static parseDevice(context: Extensions.DataContext, path: string, data: IDevice): Device;
        static parseDeviceCollection(context: Extensions.DataContext, path: string, data: IDevice[]): Device[];
        public getRequestBody(excludeArrays: boolean): IDevice;
    }
    interface IAlternativeSecurityIdCollection {
        value: IAlternativeSecurityId[];
    }
    interface IAlternativeSecurityId {
        type: number;
        identityProvider: string;
        key: string;
    }
    class AlternativeSecurityId extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IAlternativeSecurityId);
        public _odataType: string;
        public type : number;
        private _type;
        public identityProvider : string;
        private _identityProvider;
        public key : string;
        private _key;
        static parseAlternativeSecurityId(context: Extensions.DataContext, data: IAlternativeSecurityId): AlternativeSecurityId;
        static parseAlternativeSecurityIdCollection(context: Extensions.DataContext, data: IAlternativeSecurityId[]): AlternativeSecurityId[];
        public getRequestBody(excludeArrays: boolean): IAlternativeSecurityId;
    }
    class DeviceConfigurationFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<DeviceConfiguration>;
    }
    interface IDeviceConfigurationCollection {
        value: IDeviceConfiguration[];
    }
    interface IDeviceConfiguration extends IDirectoryObject {
        publicIssuerCertificates: string[];
        cloudPublicIssuerCertificates: string[];
        registrationQuota: number;
        maximumRegistrationInactivityPeriod: number;
    }
    class DeviceConfiguration extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IDeviceConfiguration);
        public _odataType: string;
        public publicIssuerCertificates : string[];
        private _publicIssuerCertificates;
        public cloudPublicIssuerCertificates : string[];
        private _cloudPublicIssuerCertificates;
        public registrationQuota : number;
        private _registrationQuota;
        public maximumRegistrationInactivityPeriod : number;
        private _maximumRegistrationInactivityPeriod;
        static parseDeviceConfiguration(context: Extensions.DataContext, path: string, data: IDeviceConfiguration): DeviceConfiguration;
        static parseDeviceConfigurationCollection(context: Extensions.DataContext, path: string, data: IDeviceConfiguration[]): DeviceConfiguration[];
        public getRequestBody(excludeArrays: boolean): IDeviceConfiguration;
    }
    class DirectoryLinkChangeFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<DirectoryLinkChange>;
    }
    interface IDirectoryLinkChangeCollection {
        value: IDirectoryLinkChange[];
    }
    interface IDirectoryLinkChange extends IDirectoryObject {
        associationType: string;
        sourceObjectId: string;
        sourceObjectType: string;
        sourceObjectUri: string;
        targetObjectId: string;
        targetObjectType: string;
        targetObjectUri: string;
    }
    class DirectoryLinkChange extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IDirectoryLinkChange);
        public _odataType: string;
        public associationType : string;
        private _associationType;
        public sourceObjectId : string;
        private _sourceObjectId;
        public sourceObjectType : string;
        private _sourceObjectType;
        public sourceObjectUri : string;
        private _sourceObjectUri;
        public targetObjectId : string;
        private _targetObjectId;
        public targetObjectType : string;
        private _targetObjectType;
        public targetObjectUri : string;
        private _targetObjectUri;
        static parseDirectoryLinkChange(context: Extensions.DataContext, path: string, data: IDirectoryLinkChange): DirectoryLinkChange;
        static parseDirectoryLinkChangeCollection(context: Extensions.DataContext, path: string, data: IDirectoryLinkChange[]): DirectoryLinkChange[];
        public getRequestBody(excludeArrays: boolean): IDirectoryLinkChange;
    }
    class DirectAccessGrantFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<DirectAccessGrant>;
    }
    interface IDirectAccessGrantCollection {
        value: IDirectAccessGrant[];
    }
    interface IDirectAccessGrant extends IDirectoryObject {
        creationTimestamp: string;
        permissionId: string;
        principalDisplayName: string;
        principalId: string;
        principalType: string;
        resourceDisplayName: string;
        resourceId: string;
    }
    class DirectAccessGrant extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IDirectAccessGrant);
        public _odataType: string;
        public creationTimestamp : Date;
        private _creationTimestamp;
        public permissionId : string;
        private _permissionId;
        public principalDisplayName : string;
        private _principalDisplayName;
        public principalId : string;
        private _principalId;
        public principalType : string;
        private _principalType;
        public resourceDisplayName : string;
        private _resourceDisplayName;
        public resourceId : string;
        private _resourceId;
        static parseDirectAccessGrant(context: Extensions.DataContext, path: string, data: IDirectAccessGrant): DirectAccessGrant;
        static parseDirectAccessGrantCollection(context: Extensions.DataContext, path: string, data: IDirectAccessGrant[]): DirectAccessGrant[];
        public getRequestBody(excludeArrays: boolean): IDirectAccessGrant;
    }
    class GroupFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public directAccessGrants : DirectAccessGrantCollection;
        private _directAccessGrants;
        public pendingMembers : DirectoryObjectCollection;
        private _pendingMembers;
        public allowAccessTo : DirectoryObjectCollection;
        private _allowAccessTo;
        public hasAccessTo : DirectoryObjectCollection;
        private _hasAccessTo;
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<Group>;
    }
    interface IGroupCollection {
        value: IGroup[];
    }
    interface IGroup extends IDirectoryObject {
        exchangeResources: string[];
        description: string;
        dirSyncEnabled: boolean;
        displayName: string;
        groupType: string;
        isPublic: boolean;
        lastDirSyncTime: string;
        mail: string;
        mailNickname: string;
        mailEnabled: boolean;
        provisioningErrors: IProvisioningError[];
        proxyAddresses: string[];
        securityEnabled: boolean;
        sharepointResources: string[];
    }
    class Group extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IGroup);
        public _odataType: string;
        public exchangeResources : string[];
        private _exchangeResources;
        public description : string;
        private _description;
        public dirSyncEnabled : boolean;
        private _dirSyncEnabled;
        public displayName : string;
        private _displayName;
        public groupType : string;
        private _groupType;
        public isPublic : boolean;
        private _isPublic;
        public lastDirSyncTime : Date;
        private _lastDirSyncTime;
        public mail : string;
        private _mail;
        public mailNickname : string;
        private _mailNickname;
        public mailEnabled : boolean;
        private _mailEnabled;
        public provisioningErrors : ProvisioningError[];
        private _provisioningErrors;
        public proxyAddresses : string[];
        private _proxyAddresses;
        public securityEnabled : boolean;
        private _securityEnabled;
        public sharepointResources : string[];
        private _sharepointResources;
        public directAccessGrants : DirectAccessGrantCollection;
        private _directAccessGrants;
        public pendingMembers : DirectoryObjectCollection;
        private _pendingMembers;
        public allowAccessTo : DirectoryObjectCollection;
        private _allowAccessTo;
        public hasAccessTo : DirectoryObjectCollection;
        private _hasAccessTo;
        static parseGroup(context: Extensions.DataContext, path: string, data: IGroup): Group;
        static parseGroupCollection(context: Extensions.DataContext, path: string, data: IGroup[]): Group[];
        public getRequestBody(excludeArrays: boolean): IGroup;
    }
    class RoleFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<Role>;
    }
    interface IRoleCollection {
        value: IRole[];
    }
    interface IRole extends IDirectoryObject {
        description: string;
        displayName: string;
        isSystem: boolean;
        roleDisabled: boolean;
    }
    class Role extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IRole);
        public _odataType: string;
        public description : string;
        private _description;
        public displayName : string;
        private _displayName;
        public isSystem : boolean;
        private _isSystem;
        public roleDisabled : boolean;
        private _roleDisabled;
        static parseRole(context: Extensions.DataContext, path: string, data: IRole): Role;
        static parseRoleCollection(context: Extensions.DataContext, path: string, data: IRole[]): Role[];
        public getRequestBody(excludeArrays: boolean): IRole;
    }
    class RoleTemplateFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<RoleTemplate>;
    }
    interface IRoleTemplateCollection {
        value: IRoleTemplate[];
    }
    interface IRoleTemplate extends IDirectoryObject {
        description: string;
        displayName: string;
    }
    class RoleTemplate extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IRoleTemplate);
        public _odataType: string;
        public description : string;
        private _description;
        public displayName : string;
        private _displayName;
        static parseRoleTemplate(context: Extensions.DataContext, path: string, data: IRoleTemplate): RoleTemplate;
        static parseRoleTemplateCollection(context: Extensions.DataContext, path: string, data: IRoleTemplate[]): RoleTemplate[];
        public getRequestBody(excludeArrays: boolean): IRoleTemplate;
    }
    class ServicePrincipalFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public impersonationAccessGrants : ImpersonationAccessGrantCollection;
        private _impersonationAccessGrants;
        public directAccessGrants : DirectAccessGrantCollection;
        private _directAccessGrants;
        public directAccessGrantedTo : DirectAccessGrantCollection;
        private _directAccessGrantedTo;
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<ServicePrincipal>;
    }
    interface IServicePrincipalCollection {
        value: IServicePrincipal[];
    }
    interface IServicePrincipal extends IDirectoryObject {
        accountEnabled: boolean;
        appId: string;
        appMetadata: IAppMetadata;
        appOwnerTenantId: string;
        appPermissions: IAppPermission[];
        authenticationPolicy: IServicePrincipalAuthenticationPolicy;
        displayName: string;
        errorUrl: string;
        explicitAccessGrantRequired: boolean;
        homepage: string;
        keyCredentials: IKeyCredential[];
        logoutUrl: string;
        passwordCredentials: IPasswordCredential[];
        publisherName: string;
        replyUrls: string[];
        resourceApplicationSet: string;
        samlMetadataUrl: string;
        servicePrincipalNames: string[];
        tags: string[];
        webApi: boolean;
        webApp: boolean;
    }
    class ServicePrincipal extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: IServicePrincipal);
        public _odataType: string;
        public accountEnabled : boolean;
        private _accountEnabled;
        public appId : string;
        private _appId;
        public appMetadata : AppMetadata;
        private _appMetadata;
        public appOwnerTenantId : string;
        private _appOwnerTenantId;
        public appPermissions : AppPermission[];
        private _appPermissions;
        public authenticationPolicy : ServicePrincipalAuthenticationPolicy;
        private _authenticationPolicy;
        public displayName : string;
        private _displayName;
        public errorUrl : string;
        private _errorUrl;
        public explicitAccessGrantRequired : boolean;
        private _explicitAccessGrantRequired;
        public homepage : string;
        private _homepage;
        public keyCredentials : KeyCredential[];
        private _keyCredentials;
        public logoutUrl : string;
        private _logoutUrl;
        public passwordCredentials : PasswordCredential[];
        private _passwordCredentials;
        public publisherName : string;
        private _publisherName;
        public replyUrls : string[];
        private _replyUrls;
        public resourceApplicationSet : string;
        private _resourceApplicationSet;
        public samlMetadataUrl : string;
        private _samlMetadataUrl;
        public servicePrincipalNames : string[];
        private _servicePrincipalNames;
        public tags : string[];
        private _tags;
        public webApi : boolean;
        private _webApi;
        public webApp : boolean;
        private _webApp;
        public impersonationAccessGrants : ImpersonationAccessGrantCollection;
        private _impersonationAccessGrants;
        public directAccessGrants : DirectAccessGrantCollection;
        private _directAccessGrants;
        public directAccessGrantedTo : DirectAccessGrantCollection;
        private _directAccessGrantedTo;
        static parseServicePrincipal(context: Extensions.DataContext, path: string, data: IServicePrincipal): ServicePrincipal;
        static parseServicePrincipalCollection(context: Extensions.DataContext, path: string, data: IServicePrincipal[]): ServicePrincipal[];
        public getRequestBody(excludeArrays: boolean): IServicePrincipal;
    }
    interface IServicePrincipalAuthenticationPolicyCollection {
        value: IServicePrincipalAuthenticationPolicy[];
    }
    interface IServicePrincipalAuthenticationPolicy {
        defaultPolicy: string;
        allowedPolicies: string[];
    }
    class ServicePrincipalAuthenticationPolicy extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IServicePrincipalAuthenticationPolicy);
        public _odataType: string;
        public defaultPolicy : string;
        private _defaultPolicy;
        public allowedPolicies : string[];
        private _allowedPolicies;
        static parseServicePrincipalAuthenticationPolicy(context: Extensions.DataContext, data: IServicePrincipalAuthenticationPolicy): ServicePrincipalAuthenticationPolicy;
        static parseServicePrincipalAuthenticationPolicyCollection(context: Extensions.DataContext, data: IServicePrincipalAuthenticationPolicy[]): ServicePrincipalAuthenticationPolicy[];
        public getRequestBody(excludeArrays: boolean): IServicePrincipalAuthenticationPolicy;
    }
    class TenantDetailFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public createdOnBehalfOf : DirectoryObjectFetcher;
        private _createdOnBehalfOf;
        public createdObjects : DirectoryObjectCollection;
        private _createdObjects;
        public manager : DirectoryObjectFetcher;
        private _manager;
        public directReports : DirectoryObjectCollection;
        private _directReports;
        public members : DirectoryObjectCollection;
        private _members;
        public memberOf : DirectoryObjectCollection;
        private _memberOf;
        public owners : DirectoryObjectCollection;
        private _owners;
        public ownedObjects : DirectoryObjectCollection;
        private _ownedObjects;
        public exec(): Utility.IPromise<TenantDetail>;
    }
    interface ITenantDetailCollection {
        value: ITenantDetail[];
    }
    interface ITenantDetail extends IDirectoryObject {
        assignedPlans: IAssignedPlan[];
        city: string;
        companyLastDirSyncTime: string;
        companyTags: string[];
        country: string;
        countryLetterCode: string;
        dirSyncEnabled: boolean;
        displayName: string;
        marketingNotificationEmails: string[];
        postalCode: string;
        preferredLanguage: string;
        provisionedPlans: IProvisionedPlan[];
        provisioningErrors: IProvisioningError[];
        state: string;
        street: string;
        technicalNotificationMails: string[];
        telephoneNumber: string;
        tenantType: string;
        verifiedDomains: IVerifiedDomain[];
    }
    class TenantDetail extends DirectoryObject {
        constructor(context: Extensions.DataContext, path: string, data: ITenantDetail);
        public _odataType: string;
        public assignedPlans : AssignedPlan[];
        private _assignedPlans;
        public city : string;
        private _city;
        public companyLastDirSyncTime : Date;
        private _companyLastDirSyncTime;
        public companyTags : string[];
        private _companyTags;
        public country : string;
        private _country;
        public countryLetterCode : string;
        private _countryLetterCode;
        public dirSyncEnabled : boolean;
        private _dirSyncEnabled;
        public displayName : string;
        private _displayName;
        public marketingNotificationEmails : string[];
        private _marketingNotificationEmails;
        public postalCode : string;
        private _postalCode;
        public preferredLanguage : string;
        private _preferredLanguage;
        public provisionedPlans : ProvisionedPlan[];
        private _provisionedPlans;
        public provisioningErrors : ProvisioningError[];
        private _provisioningErrors;
        public state : string;
        private _state;
        public street : string;
        private _street;
        public technicalNotificationMails : string[];
        private _technicalNotificationMails;
        public telephoneNumber : string;
        private _telephoneNumber;
        public tenantType : string;
        private _tenantType;
        public verifiedDomains : VerifiedDomain[];
        private _verifiedDomains;
        static parseTenantDetail(context: Extensions.DataContext, path: string, data: ITenantDetail): TenantDetail;
        static parseTenantDetailCollection(context: Extensions.DataContext, path: string, data: ITenantDetail[]): TenantDetail[];
        public getRequestBody(excludeArrays: boolean): ITenantDetail;
    }
    interface IAssignedPlanCollection {
        value: IAssignedPlan[];
    }
    interface IAssignedPlan {
        assignedTimestamp: string;
        capabilityStatus: string;
        service: string;
        servicePlanId: string;
    }
    class AssignedPlan extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IAssignedPlan);
        public _odataType: string;
        public assignedTimestamp : Date;
        private _assignedTimestamp;
        public capabilityStatus : string;
        private _capabilityStatus;
        public service : string;
        private _service;
        public servicePlanId : string;
        private _servicePlanId;
        static parseAssignedPlan(context: Extensions.DataContext, data: IAssignedPlan): AssignedPlan;
        static parseAssignedPlanCollection(context: Extensions.DataContext, data: IAssignedPlan[]): AssignedPlan[];
        public getRequestBody(excludeArrays: boolean): IAssignedPlan;
    }
    interface IProvisionedPlanCollection {
        value: IProvisionedPlan[];
    }
    interface IProvisionedPlan {
        capabilityStatus: string;
        provisioningStatus: string;
        service: string;
    }
    class ProvisionedPlan extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IProvisionedPlan);
        public _odataType: string;
        public capabilityStatus : string;
        private _capabilityStatus;
        public provisioningStatus : string;
        private _provisioningStatus;
        public service : string;
        private _service;
        static parseProvisionedPlan(context: Extensions.DataContext, data: IProvisionedPlan): ProvisionedPlan;
        static parseProvisionedPlanCollection(context: Extensions.DataContext, data: IProvisionedPlan[]): ProvisionedPlan[];
        public getRequestBody(excludeArrays: boolean): IProvisionedPlan;
    }
    interface IVerifiedDomainCollection {
        value: IVerifiedDomain[];
    }
    interface IVerifiedDomain {
        capabilities: string;
        default: boolean;
        id: string;
        initial: boolean;
        name: string;
        type: string;
    }
    class VerifiedDomain extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IVerifiedDomain);
        public _odataType: string;
        public capabilities : string;
        private _capabilities;
        public default : boolean;
        private _default;
        public id : string;
        private _id;
        public initial : boolean;
        private _initial;
        public name : string;
        private _name;
        public type : string;
        private _type;
        static parseVerifiedDomain(context: Extensions.DataContext, data: IVerifiedDomain): VerifiedDomain;
        static parseVerifiedDomainCollection(context: Extensions.DataContext, data: IVerifiedDomain[]): VerifiedDomain[];
        public getRequestBody(excludeArrays: boolean): IVerifiedDomain;
    }
    interface IPasswordProfileCollection {
        value: IPasswordProfile[];
    }
    interface IPasswordProfile {
        password: string;
        forceChangePasswordNextLogin: boolean;
    }
    class PasswordProfile extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IPasswordProfile);
        public _odataType: string;
        public password : string;
        private _password;
        public forceChangePasswordNextLogin : boolean;
        private _forceChangePasswordNextLogin;
        static parsePasswordProfile(context: Extensions.DataContext, data: IPasswordProfile): PasswordProfile;
        static parsePasswordProfileCollection(context: Extensions.DataContext, data: IPasswordProfile[]): PasswordProfile[];
        public getRequestBody(excludeArrays: boolean): IPasswordProfile;
    }
    class EnabledFeatureFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public exec(): Utility.IPromise<EnabledFeature>;
    }
    interface IEnabledFeatureCollection {
        value: IEnabledFeature[];
    }
    interface IEnabledFeature {
        featureId: string;
        featureName: string;
    }
    class EnabledFeature extends Extensions.EntityBase {
        constructor(context: Extensions.DataContext, path: string, data: IEnabledFeature);
        public _odataType: string;
        public featureId : string;
        private _featureId;
        public featureName : string;
        private _featureName;
        static parseEnabledFeature(context: Extensions.DataContext, path: string, data: IEnabledFeature): EnabledFeature;
        static parseEnabledFeatureCollection(context: Extensions.DataContext, path: string, data: IEnabledFeature[]): EnabledFeature[];
        public getRequestBody(excludeArrays: boolean): IEnabledFeature;
    }
    class LoginTenantBrandingFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public exec(): Utility.IPromise<LoginTenantBranding>;
    }
    interface ILoginTenantBrandingCollection {
        value: ILoginTenantBranding[];
    }
    interface ILoginTenantBranding {
        backgroundColor: string;
        bannerLogo: string;
        bannerLogoUrl: string;
        boilerPlateText: string;
        illustration: string;
        illustrationUrl: string;
        locale: string;
        metadataUrl: string;
        tileLogo: string;
        tileLogoUrl: string;
        userIdLabel: string;
    }
    class LoginTenantBranding extends Extensions.EntityBase {
        constructor(context: Extensions.DataContext, path: string, data: ILoginTenantBranding);
        public _odataType: string;
        public backgroundColor : string;
        private _backgroundColor;
        public bannerLogo : string;
        private _bannerLogo;
        public bannerLogoUrl : string;
        private _bannerLogoUrl;
        public boilerPlateText : string;
        private _boilerPlateText;
        public illustration : string;
        private _illustration;
        public illustrationUrl : string;
        private _illustrationUrl;
        public locale : string;
        private _locale;
        public metadataUrl : string;
        private _metadataUrl;
        public tileLogo : string;
        private _tileLogo;
        public tileLogoUrl : string;
        private _tileLogoUrl;
        public userIdLabel : string;
        private _userIdLabel;
        static parseLoginTenantBranding(context: Extensions.DataContext, path: string, data: ILoginTenantBranding): LoginTenantBranding;
        static parseLoginTenantBrandingCollection(context: Extensions.DataContext, path: string, data: ILoginTenantBranding[]): LoginTenantBranding[];
        public getRequestBody(excludeArrays: boolean): ILoginTenantBranding;
    }
    class ImpersonationAccessGrantFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public exec(): Utility.IPromise<ImpersonationAccessGrant>;
    }
    interface IImpersonationAccessGrantCollection {
        value: IImpersonationAccessGrant[];
    }
    interface IImpersonationAccessGrant {
        clientId: string;
        consentType: string;
        expiryTime: string;
        objectId: string;
        principalId: string;
        resourceId: string;
        scope: string;
        startTime: string;
    }
    class ImpersonationAccessGrant extends Extensions.EntityBase {
        constructor(context: Extensions.DataContext, path: string, data: IImpersonationAccessGrant);
        public _odataType: string;
        public clientId : string;
        private _clientId;
        public consentType : string;
        private _consentType;
        public expiryTime : Date;
        private _expiryTime;
        public objectId : string;
        private _objectId;
        public principalId : string;
        private _principalId;
        public resourceId : string;
        private _resourceId;
        public scope : string;
        private _scope;
        public startTime : Date;
        private _startTime;
        static parseImpersonationAccessGrant(context: Extensions.DataContext, path: string, data: IImpersonationAccessGrant): ImpersonationAccessGrant;
        static parseImpersonationAccessGrantCollection(context: Extensions.DataContext, path: string, data: IImpersonationAccessGrant[]): ImpersonationAccessGrant[];
        public getRequestBody(excludeArrays: boolean): IImpersonationAccessGrant;
    }
    class SubscribedSkuFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public exec(): Utility.IPromise<SubscribedSku>;
    }
    interface ISubscribedSkuCollection {
        value: ISubscribedSku[];
    }
    interface ISubscribedSku {
        capabilityStatus: string;
        consumedUnits: number;
        objectId: string;
        prepaidUnits: ILicenseUnitsDetail;
        servicePlans: IServicePlanInfo[];
        skuId: string;
        skuPartNumber: string;
    }
    class SubscribedSku extends Extensions.EntityBase {
        constructor(context: Extensions.DataContext, path: string, data: ISubscribedSku);
        public _odataType: string;
        public capabilityStatus : string;
        private _capabilityStatus;
        public consumedUnits : number;
        private _consumedUnits;
        public objectId : string;
        private _objectId;
        public prepaidUnits : LicenseUnitsDetail;
        private _prepaidUnits;
        public servicePlans : ServicePlanInfo[];
        private _servicePlans;
        public skuId : string;
        private _skuId;
        public skuPartNumber : string;
        private _skuPartNumber;
        static parseSubscribedSku(context: Extensions.DataContext, path: string, data: ISubscribedSku): SubscribedSku;
        static parseSubscribedSkuCollection(context: Extensions.DataContext, path: string, data: ISubscribedSku[]): SubscribedSku[];
        public getRequestBody(excludeArrays: boolean): ISubscribedSku;
    }
    interface ILicenseUnitsDetailCollection {
        value: ILicenseUnitsDetail[];
    }
    interface ILicenseUnitsDetail {
        enabled: number;
        suspended: number;
        warning: number;
    }
    class LicenseUnitsDetail extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: ILicenseUnitsDetail);
        public _odataType: string;
        public enabled : number;
        private _enabled;
        public suspended : number;
        private _suspended;
        public warning : number;
        private _warning;
        static parseLicenseUnitsDetail(context: Extensions.DataContext, data: ILicenseUnitsDetail): LicenseUnitsDetail;
        static parseLicenseUnitsDetailCollection(context: Extensions.DataContext, data: ILicenseUnitsDetail[]): LicenseUnitsDetail[];
        public getRequestBody(excludeArrays: boolean): ILicenseUnitsDetail;
    }
    interface IServicePlanInfoCollection {
        value: IServicePlanInfo[];
    }
    interface IServicePlanInfo {
        servicePlanId: string;
        servicePlanName: string;
    }
    class ServicePlanInfo extends Extensions.ComplexTypeBase {
        constructor(context: Extensions.DataContext, data: IServicePlanInfo);
        public _odataType: string;
        public servicePlanId : string;
        private _servicePlanId;
        public servicePlanName : string;
        private _servicePlanName;
        static parseServicePlanInfo(context: Extensions.DataContext, data: IServicePlanInfo): ServicePlanInfo;
        static parseServicePlanInfoCollection(context: Extensions.DataContext, data: IServicePlanInfo[]): ServicePlanInfo[];
        public getRequestBody(excludeArrays: boolean): IServicePlanInfo;
    }
    class ApplicationRefCollection extends Extensions.QueryableSet<ApplicationRef> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getApplicationRef(appId: any): ApplicationRefFetcher;
        public getApplicationRefCollection(): Utility.IPromise<Extensions.PagedEnumerable<ApplicationRef>>;
        public addApplicationRef(item: ApplicationRef): Utility.IPromise<ApplicationRef>;
    }
    class DirectoryObjectCollection extends Extensions.QueryableSet<DirectoryObject> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getDirectoryObject(objectId: any): DirectoryObjectFetcher;
        public getDirectoryObjectCollection(): Utility.IPromise<Extensions.PagedEnumerable<DirectoryObject>>;
        public addDirectoryObject(item: DirectoryObject): Utility.IPromise<DirectoryObject>;
        public asApplicationCollection(): Utility.IPromise<Extensions.PagedEnumerable<Application>>;
        public asUserCollection(): Utility.IPromise<Extensions.PagedEnumerable<User>>;
        public asNotificationCollection(): Utility.IPromise<Extensions.PagedEnumerable<Notification>>;
        public asCollaborationSpaceCollection(): Utility.IPromise<Extensions.PagedEnumerable<CollaborationSpace>>;
        public asContactCollection(): Utility.IPromise<Extensions.PagedEnumerable<Contact>>;
        public asDeviceCollection(): Utility.IPromise<Extensions.PagedEnumerable<Device>>;
        public asDeviceConfigurationCollection(): Utility.IPromise<Extensions.PagedEnumerable<DeviceConfiguration>>;
        public asDirectoryLinkChangeCollection(): Utility.IPromise<Extensions.PagedEnumerable<DirectoryLinkChange>>;
        public asDirectAccessGrantCollection(): Utility.IPromise<Extensions.PagedEnumerable<DirectAccessGrant>>;
        public asGroupCollection(): Utility.IPromise<Extensions.PagedEnumerable<Group>>;
        public asRoleCollection(): Utility.IPromise<Extensions.PagedEnumerable<Role>>;
        public asRoleTemplateCollection(): Utility.IPromise<Extensions.PagedEnumerable<RoleTemplate>>;
        public asServicePrincipalCollection(): Utility.IPromise<Extensions.PagedEnumerable<ServicePrincipal>>;
        public asTenantDetailCollection(): Utility.IPromise<Extensions.PagedEnumerable<TenantDetail>>;
    }
    class EnabledFeatureCollection extends Extensions.QueryableSet<EnabledFeature> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getEnabledFeature(featureId: any): EnabledFeatureFetcher;
        public getEnabledFeatureCollection(): Utility.IPromise<Extensions.PagedEnumerable<EnabledFeature>>;
        public addEnabledFeature(item: EnabledFeature): Utility.IPromise<EnabledFeature>;
    }
    class LoginTenantBrandingCollection extends Extensions.QueryableSet<LoginTenantBranding> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getLoginTenantBranding(locale: any): LoginTenantBrandingFetcher;
        public getLoginTenantBrandingCollection(): Utility.IPromise<Extensions.PagedEnumerable<LoginTenantBranding>>;
        public addLoginTenantBranding(item: LoginTenantBranding): Utility.IPromise<LoginTenantBranding>;
    }
    class ImpersonationAccessGrantCollection extends Extensions.QueryableSet<ImpersonationAccessGrant> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getImpersonationAccessGrant(objectId: any): ImpersonationAccessGrantFetcher;
        public getImpersonationAccessGrantCollection(): Utility.IPromise<Extensions.PagedEnumerable<ImpersonationAccessGrant>>;
        public addImpersonationAccessGrant(item: ImpersonationAccessGrant): Utility.IPromise<ImpersonationAccessGrant>;
    }
    class SubscribedSkuCollection extends Extensions.QueryableSet<SubscribedSku> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getSubscribedSku(objectId: any): SubscribedSkuFetcher;
        public getSubscribedSkuCollection(): Utility.IPromise<Extensions.PagedEnumerable<SubscribedSku>>;
        public addSubscribedSku(item: SubscribedSku): Utility.IPromise<SubscribedSku>;
    }
    class NotificationCollection extends Extensions.QueryableSet<Notification> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getNotification(objectId: any): NotificationFetcher;
        public getNotificationCollection(): Utility.IPromise<Extensions.PagedEnumerable<Notification>>;
        public addNotification(item: Notification): Utility.IPromise<Notification>;
    }
    class DirectAccessGrantCollection extends Extensions.QueryableSet<DirectAccessGrant> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getDirectAccessGrant(objectId: any): DirectAccessGrantFetcher;
        public getDirectAccessGrantCollection(): Utility.IPromise<Extensions.PagedEnumerable<DirectAccessGrant>>;
        public addDirectAccessGrant(item: DirectAccessGrant): Utility.IPromise<DirectAccessGrant>;
    }
}
