declare module Exchange.Extensions {
    interface Observable {
        changed: boolean;
        addChangedListener(eventFn: (changed: any) => void): any;
        removeChangedListener(eventFn: (changed: any) => void): any;
    }
    class ObservableBase<T> implements Observable {
        private _changed;
        private _changedListeners;
        constructor();
        public changed : boolean;
        public addChangedListener(eventFn: (changed: T) => void): void;
        public removeChangedListener(eventFn: (changed: T) => void): void;
    }
    class ObservableCollection<T extends Observable> extends ObservableBase<ObservableCollection<T>> {
        private _array;
        private _changedListener;
        constructor(...items: T[]);
        public item(n: number): T;
        /**
        * Removes the last element from an array and returns it.
        */
        public pop(): T;
        /**
        * Removes the first element from an array and returns it.
        */
        public shift(): T;
        /**
        * Appends new elements to an array, and returns the new length of the array.
        * @param items New elements of the Array.
        */
        public push(...items: T[]): number;
        /**
        * Removes elements from an array, returning the deleted elements.
        * @param start The zero-based location in the array from which to start removing elements.
        * @param deleteCount The number of elements to remove.
        * @param items Elements to insert into the array in place of the deleted elements.
        */
        public splice(start: number, deleteCount: number): T[];
        /**
        * Inserts new elements at the start of an array.
        * @param items  Elements to insert at the start of the Array.
        */
        public unshift(...items: T[]): number;
        /**
        * Performs the specified action for each element in an array.
        * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
        * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
        */
        public forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        /**
        * Calls a defined callback function on each element of an array, and returns an array that contains the results.
        * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
        * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
        */
        public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        /**
        * Returns the elements of an array that meet the condition specified in a callback function.
        * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
        * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
        */
        public filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
        /**
        * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
        * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
        * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
        */
        public reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        /**
        * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
        * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
        * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
        */
        public reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        /**
        * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
        */
        public length : number;
    }
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
        constructor(serviceRootUri: string, extraQueryParameters?: string, getAccessTokenFn?: () => Microsoft.Utility.IPromise<string>);
        public serviceRootUri : string;
        public extraQueryParameters : string;
        private ajax(request);
        public read(path: string): Microsoft.Utility.IPromise<string>;
        public readUrl(url: string): Microsoft.Utility.IPromise<string>;
        public request(request: Request): Microsoft.Utility.IPromise<string>;
        private augmentRequest(request);
    }
    class PagedEnumerable<T> {
        private _path;
        private _context;
        private _resultFn;
        private _data;
        constructor(context: DataContext, path: string, resultFn: (dataContext: DataContext, data: any) => T[], data?: T[]);
        public path : string;
        public context : DataContext;
        public currentPage : T[];
        public getNextPage(): Microsoft.Utility.IPromise<PagedEnumerable<T>>;
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
    class ComplexTypeBase extends ObservableBase<ComplexTypeBase> {
        constructor();
    }
    class EntityBase extends ObservableBase<EntityBase> {
        private _context;
        private _path;
        constructor(context?: DataContext, path?: string);
        public context : DataContext;
        public path : string;
        public getPath(prop: string): string;
    }
    function isUndefined(v: any): boolean;
}
declare module Exchange {
    class Client {
        private _context;
        public context : Extensions.DataContext;
        private getPath(prop);
        constructor(serviceRootUri: string, getAccessTokenFn: () => Microsoft.Utility.IPromise<string>);
        public Users : UserCollection;
        private _Users;
        public Me : UserFetcher;
        private _Me;
    }
    interface IRecipientCollection {
        value: IRecipient[];
    }
    interface IRecipient {
        Name: string;
        Address: string;
    }
    class Recipient extends Extensions.ComplexTypeBase {
        constructor(data?: IRecipient);
        public _odataType: string;
        public Name : string;
        private _Name;
        public NameChanged : boolean;
        private _NameChanged;
        public Address : string;
        private _Address;
        public AddressChanged : boolean;
        private _AddressChanged;
        static parseRecipient(data: IRecipient): Recipient;
        static parseRecipientCollection(data: IRecipient[]): Extensions.ObservableCollection<Recipient>;
        public getRequestBody(): IRecipient;
    }
    interface IAttendeeCollection {
        value: IAttendee[];
    }
    interface IAttendee extends IRecipient {
        Status: IResponseStatus;
        Type: string;
    }
    class Attendee extends Recipient {
        constructor(data?: IAttendee);
        public _odataType: string;
        public Status : ResponseStatus;
        private _Status;
        public StatusChanged : boolean;
        private _StatusChanged;
        private _StatusChangedListener;
        public Type : AttendeeType;
        private _Type;
        public TypeChanged : boolean;
        private _TypeChanged;
        static parseAttendee(data: IAttendee): Attendee;
        static parseAttendeeCollection(data: IAttendee[]): Extensions.ObservableCollection<Attendee>;
        public getRequestBody(): IAttendee;
    }
    interface IItemBodyCollection {
        value: IItemBody[];
    }
    interface IItemBody {
        ContentType: string;
        Content: string;
    }
    class ItemBody extends Extensions.ComplexTypeBase {
        constructor(data?: IItemBody);
        public _odataType: string;
        public ContentType : BodyType;
        private _ContentType;
        public ContentTypeChanged : boolean;
        private _ContentTypeChanged;
        public Content : string;
        private _Content;
        public ContentChanged : boolean;
        private _ContentChanged;
        static parseItemBody(data: IItemBody): ItemBody;
        static parseItemBodyCollection(data: IItemBody[]): Extensions.ObservableCollection<ItemBody>;
        public getRequestBody(): IItemBody;
    }
    interface ILocationCollection {
        value: ILocation[];
    }
    interface ILocation {
        DisplayName: string;
    }
    class Location extends Extensions.ComplexTypeBase {
        constructor(data?: ILocation);
        public _odataType: string;
        public DisplayName : string;
        private _DisplayName;
        public DisplayNameChanged : boolean;
        private _DisplayNameChanged;
        static parseLocation(data: ILocation): Location;
        static parseLocationCollection(data: ILocation[]): Extensions.ObservableCollection<Location>;
        public getRequestBody(): ILocation;
    }
    interface IResponseStatusCollection {
        value: IResponseStatus[];
    }
    interface IResponseStatus extends IRecipient {
        Response: string;
        Time: string;
    }
    class ResponseStatus extends Recipient {
        constructor(data?: IResponseStatus);
        public _odataType: string;
        public Response : ResponseType;
        private _Response;
        public ResponseChanged : boolean;
        private _ResponseChanged;
        public Time : Date;
        private _Time;
        public TimeChanged : boolean;
        private _TimeChanged;
        static parseResponseStatus(data: IResponseStatus): ResponseStatus;
        static parseResponseStatusCollection(data: IResponseStatus[]): Extensions.ObservableCollection<ResponseStatus>;
        public getRequestBody(): IResponseStatus;
    }
    interface IRecurrencePatternCollection {
        value: IRecurrencePattern[];
    }
    interface IRecurrencePattern {
        Type: string;
        Interval: number;
        DayOfMonth: number;
        Month: number;
        DaysOfWeek: System.DayOfWeek[];
        FirstDayOfWeek: string;
        Index: string;
    }
    class RecurrencePattern extends Extensions.ComplexTypeBase {
        constructor(data?: IRecurrencePattern);
        public _odataType: string;
        public Type : RecurrencePatternType;
        private _Type;
        public TypeChanged : boolean;
        private _TypeChanged;
        public Interval : number;
        private _Interval;
        public IntervalChanged : boolean;
        private _IntervalChanged;
        public DayOfMonth : number;
        private _DayOfMonth;
        public DayOfMonthChanged : boolean;
        private _DayOfMonthChanged;
        public Month : number;
        private _Month;
        public MonthChanged : boolean;
        private _MonthChanged;
        public DaysOfWeek : System.DayOfWeek[];
        private _DaysOfWeek;
        public DaysOfWeekChanged : boolean;
        private _DaysOfWeekChanged;
        public FirstDayOfWeek : System.DayOfWeek;
        private _FirstDayOfWeek;
        public FirstDayOfWeekChanged : boolean;
        private _FirstDayOfWeekChanged;
        public Index : WeekIndex;
        private _Index;
        public IndexChanged : boolean;
        private _IndexChanged;
        static parseRecurrencePattern(data: IRecurrencePattern): RecurrencePattern;
        static parseRecurrencePatternCollection(data: IRecurrencePattern[]): Extensions.ObservableCollection<RecurrencePattern>;
        public getRequestBody(): IRecurrencePattern;
    }
    interface IRecurrenceRangeCollection {
        value: IRecurrenceRange[];
    }
    interface IRecurrenceRange {
        Type: string;
        StartDate: string;
        EndDate: string;
        NumberOfOccurrences: number;
    }
    class RecurrenceRange extends Extensions.ComplexTypeBase {
        constructor(data?: IRecurrenceRange);
        public _odataType: string;
        public Type : RecurrenceRangeType;
        private _Type;
        public TypeChanged : boolean;
        private _TypeChanged;
        public StartDate : Date;
        private _StartDate;
        public StartDateChanged : boolean;
        private _StartDateChanged;
        public EndDate : Date;
        private _EndDate;
        public EndDateChanged : boolean;
        private _EndDateChanged;
        public NumberOfOccurrences : number;
        private _NumberOfOccurrences;
        public NumberOfOccurrencesChanged : boolean;
        private _NumberOfOccurrencesChanged;
        static parseRecurrenceRange(data: IRecurrenceRange): RecurrenceRange;
        static parseRecurrenceRangeCollection(data: IRecurrenceRange[]): Extensions.ObservableCollection<RecurrenceRange>;
        public getRequestBody(): IRecurrenceRange;
    }
    interface IPatternedRecurrenceCollection {
        value: IPatternedRecurrence[];
    }
    interface IPatternedRecurrence {
        Pattern: IRecurrencePattern;
        Range: IRecurrenceRange;
    }
    class PatternedRecurrence extends Extensions.ComplexTypeBase {
        constructor(data?: IPatternedRecurrence);
        public _odataType: string;
        public Pattern : RecurrencePattern;
        private _Pattern;
        public PatternChanged : boolean;
        private _PatternChanged;
        private _PatternChangedListener;
        public Range : RecurrenceRange;
        private _Range;
        public RangeChanged : boolean;
        private _RangeChanged;
        private _RangeChangedListener;
        static parsePatternedRecurrence(data: IPatternedRecurrence): PatternedRecurrence;
        static parsePatternedRecurrenceCollection(data: IPatternedRecurrence[]): Extensions.ObservableCollection<PatternedRecurrence>;
        public getRequestBody(): IPatternedRecurrence;
    }
    class EntityFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
    }
    interface IEntityCollection {
        value: IEntity[];
    }
    interface IEntity {
        Id: string;
    }
    class Entity extends Extensions.EntityBase {
        constructor(context?: Extensions.DataContext, path?: string, data?: IEntity);
        public _odataType: string;
        public Id : string;
        private _Id;
        public IdChanged : boolean;
        private _IdChanged;
        public Update(): Microsoft.Utility.IPromise<Entity>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseEntity(context: Extensions.DataContext, path: string, data: IEntity): Entity;
        static parseEntityCollection(context: Extensions.DataContext, path: string, data: IEntity[]): Entity[];
        public getRequestBody(): IEntity;
    }
    class UserFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public Folders : FolderCollection;
        private _Folders;
        public Messages : MessageCollection;
        private _Messages;
        public RootFolder : FolderFetcher;
        private _RootFolder;
        public Inbox : FolderFetcher;
        private _Inbox;
        public Drafts : FolderFetcher;
        private _Drafts;
        public SentItems : FolderFetcher;
        private _SentItems;
        public DeletedItems : FolderFetcher;
        private _DeletedItems;
        public Calendars : CalendarCollection;
        private _Calendars;
        public Calendar : CalendarFetcher;
        private _Calendar;
        public CalendarGroups : CalendarGroupCollection;
        private _CalendarGroups;
        public Events : EventCollection;
        private _Events;
        public Contacts : ContactCollection;
        private _Contacts;
        public ContactFolders : ContactFolderCollection;
        private _ContactFolders;
        public exec(): Microsoft.Utility.IPromise<User>;
    }
    interface IUserCollection {
        value: IUser[];
    }
    interface IUser extends IEntity {
        DisplayName: string;
        Alias: string;
        MailboxGuid: string;
    }
    class User extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IUser);
        public _odataType: string;
        public DisplayName : string;
        private _DisplayName;
        public DisplayNameChanged : boolean;
        private _DisplayNameChanged;
        public Alias : string;
        private _Alias;
        public AliasChanged : boolean;
        private _AliasChanged;
        public MailboxGuid : string;
        private _MailboxGuid;
        public MailboxGuidChanged : boolean;
        private _MailboxGuidChanged;
        public Folders : FolderCollection;
        private _Folders;
        public Messages : MessageCollection;
        private _Messages;
        public RootFolder : FolderFetcher;
        private _RootFolder;
        public Inbox : FolderFetcher;
        private _Inbox;
        public Drafts : FolderFetcher;
        private _Drafts;
        public SentItems : FolderFetcher;
        private _SentItems;
        public DeletedItems : FolderFetcher;
        private _DeletedItems;
        public Calendars : CalendarCollection;
        private _Calendars;
        public Calendar : CalendarFetcher;
        private _Calendar;
        public CalendarGroups : CalendarGroupCollection;
        private _CalendarGroups;
        public Events : EventCollection;
        private _Events;
        public Contacts : ContactCollection;
        private _Contacts;
        public ContactFolders : ContactFolderCollection;
        private _ContactFolders;
        public Update(): Microsoft.Utility.IPromise<User>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseUser(context: Extensions.DataContext, path: string, data: IUser): User;
        static parseUserCollection(context: Extensions.DataContext, path: string, data: IUser[]): User[];
        public getRequestBody(): IUser;
    }
    class FolderFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public ChildFolders : FolderCollection;
        private _ChildFolders;
        public Messages : MessageCollection;
        private _Messages;
        public exec(): Microsoft.Utility.IPromise<Folder>;
        public Copy(DestinationId: string): Microsoft.Utility.IPromise<Folder>;
        public Move(DestinationId: string): Microsoft.Utility.IPromise<Folder>;
    }
    interface IFolderCollection {
        value: IFolder[];
    }
    interface IFolder extends IEntity {
        ParentFolderId: string;
        DisplayName: string;
        ClassName: string;
        TotalCount: number;
        ChildFolderCount: number;
        UnreadItemCount: number;
    }
    class Folder extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IFolder);
        public _odataType: string;
        public ParentFolderId : string;
        private _ParentFolderId;
        public ParentFolderIdChanged : boolean;
        private _ParentFolderIdChanged;
        public DisplayName : string;
        private _DisplayName;
        public DisplayNameChanged : boolean;
        private _DisplayNameChanged;
        public ClassName : string;
        private _ClassName;
        public ClassNameChanged : boolean;
        private _ClassNameChanged;
        public TotalCount : number;
        private _TotalCount;
        public TotalCountChanged : boolean;
        private _TotalCountChanged;
        public ChildFolderCount : number;
        private _ChildFolderCount;
        public ChildFolderCountChanged : boolean;
        private _ChildFolderCountChanged;
        public UnreadItemCount : number;
        private _UnreadItemCount;
        public UnreadItemCountChanged : boolean;
        private _UnreadItemCountChanged;
        public ChildFolders : FolderCollection;
        private _ChildFolders;
        public Messages : MessageCollection;
        private _Messages;
        public Copy(DestinationId: string): Microsoft.Utility.IPromise<Folder>;
        public Move(DestinationId: string): Microsoft.Utility.IPromise<Folder>;
        public Update(): Microsoft.Utility.IPromise<Folder>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseFolder(context: Extensions.DataContext, path: string, data: IFolder): Folder;
        static parseFolderCollection(context: Extensions.DataContext, path: string, data: IFolder[]): Folder[];
        public getRequestBody(): IFolder;
    }
    class ItemFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public Attachments : AttachmentCollection;
        private _Attachments;
    }
    interface IItemCollection {
        value: IItem[];
    }
    interface IItem extends IEntity {
        ChangeKey: string;
        ClassName: string;
        Subject: string;
        Body: IItemBody;
        BodyPreview: string;
        Importance: string;
        Categories: string[];
        HasAttachments: boolean;
    }
    class Item extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IItem);
        public _odataType: string;
        public ChangeKey : string;
        private _ChangeKey;
        public ChangeKeyChanged : boolean;
        private _ChangeKeyChanged;
        public ClassName : string;
        private _ClassName;
        public ClassNameChanged : boolean;
        private _ClassNameChanged;
        public Subject : string;
        private _Subject;
        public SubjectChanged : boolean;
        private _SubjectChanged;
        public Body : ItemBody;
        private _Body;
        public BodyChanged : boolean;
        private _BodyChanged;
        private _BodyChangedListener;
        public BodyPreview : string;
        private _BodyPreview;
        public BodyPreviewChanged : boolean;
        private _BodyPreviewChanged;
        public Importance : Importance;
        private _Importance;
        public ImportanceChanged : boolean;
        private _ImportanceChanged;
        public Categories : string[];
        private _Categories;
        public CategoriesChanged : boolean;
        private _CategoriesChanged;
        public HasAttachments : boolean;
        private _HasAttachments;
        public HasAttachmentsChanged : boolean;
        private _HasAttachmentsChanged;
        public Attachments : AttachmentCollection;
        private _Attachments;
        public Update(): Microsoft.Utility.IPromise<Item>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseItem(context: Extensions.DataContext, path: string, data: IItem): Item;
        static parseItemCollection(context: Extensions.DataContext, path: string, data: IItem[]): Item[];
        public getRequestBody(): IItem;
    }
    class MessageFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public Attachments : AttachmentCollection;
        private _Attachments;
        public exec(): Microsoft.Utility.IPromise<Message>;
        public Copy(DestinationId: string): Microsoft.Utility.IPromise<Message>;
        public Move(DestinationId: string): Microsoft.Utility.IPromise<Message>;
        public CreateReply(): Microsoft.Utility.IPromise<Message>;
        public CreateReplyAll(): Microsoft.Utility.IPromise<Message>;
        public CreateForward(): Microsoft.Utility.IPromise<Message>;
        public Reply(Comment: string): Microsoft.Utility.IPromise<void>;
        public ReplyAll(Comment: string): Microsoft.Utility.IPromise<void>;
        public Forward(Comment: string, ToRecipients: Recipient[]): Microsoft.Utility.IPromise<void>;
        public Send(): Microsoft.Utility.IPromise<void>;
    }
    interface IMessageCollection {
        value: IMessage[];
    }
    interface IMessage extends IItem {
        ParentFolderId: string;
        From: IRecipient;
        Sender: IRecipient;
        ToRecipients: IRecipient[];
        CcRecipients: IRecipient[];
        BccRecipients: IRecipient[];
        ReplyTo: IRecipient[];
        ConversationId: string;
        UniqueBody: IItemBody;
        DateTimeReceived: string;
        DateTimeSent: string;
        IsDeliveryReceiptRequested: boolean;
        IsReadReceiptRequested: boolean;
        IsDraft: boolean;
        IsRead: boolean;
        EventId: string;
        MeetingMessageType: string;
        DateTimeCreated: string;
        LastModifiedTime: string;
    }
    class Message extends Item {
        constructor(context?: Extensions.DataContext, path?: string, data?: IMessage);
        public _odataType: string;
        public ParentFolderId : string;
        private _ParentFolderId;
        public ParentFolderIdChanged : boolean;
        private _ParentFolderIdChanged;
        public From : Recipient;
        private _From;
        public FromChanged : boolean;
        private _FromChanged;
        private _FromChangedListener;
        public Sender : Recipient;
        private _Sender;
        public SenderChanged : boolean;
        private _SenderChanged;
        private _SenderChangedListener;
        public ToRecipients : Extensions.ObservableCollection<Recipient>;
        private _ToRecipients;
        public ToRecipientsChanged : boolean;
        private _ToRecipientsChanged;
        private _ToRecipientsChangedListener;
        public CcRecipients : Extensions.ObservableCollection<Recipient>;
        private _CcRecipients;
        public CcRecipientsChanged : boolean;
        private _CcRecipientsChanged;
        private _CcRecipientsChangedListener;
        public BccRecipients : Extensions.ObservableCollection<Recipient>;
        private _BccRecipients;
        public BccRecipientsChanged : boolean;
        private _BccRecipientsChanged;
        private _BccRecipientsChangedListener;
        public ReplyTo : Extensions.ObservableCollection<Recipient>;
        private _ReplyTo;
        public ReplyToChanged : boolean;
        private _ReplyToChanged;
        private _ReplyToChangedListener;
        public ConversationId : string;
        private _ConversationId;
        public ConversationIdChanged : boolean;
        private _ConversationIdChanged;
        public UniqueBody : ItemBody;
        private _UniqueBody;
        public UniqueBodyChanged : boolean;
        private _UniqueBodyChanged;
        private _UniqueBodyChangedListener;
        public DateTimeReceived : Date;
        private _DateTimeReceived;
        public DateTimeReceivedChanged : boolean;
        private _DateTimeReceivedChanged;
        public DateTimeSent : Date;
        private _DateTimeSent;
        public DateTimeSentChanged : boolean;
        private _DateTimeSentChanged;
        public IsDeliveryReceiptRequested : boolean;
        private _IsDeliveryReceiptRequested;
        public IsDeliveryReceiptRequestedChanged : boolean;
        private _IsDeliveryReceiptRequestedChanged;
        public IsReadReceiptRequested : boolean;
        private _IsReadReceiptRequested;
        public IsReadReceiptRequestedChanged : boolean;
        private _IsReadReceiptRequestedChanged;
        public IsDraft : boolean;
        private _IsDraft;
        public IsDraftChanged : boolean;
        private _IsDraftChanged;
        public IsRead : boolean;
        private _IsRead;
        public IsReadChanged : boolean;
        private _IsReadChanged;
        public EventId : string;
        private _EventId;
        public EventIdChanged : boolean;
        private _EventIdChanged;
        public MeetingMessageType : MeetingMessageType;
        private _MeetingMessageType;
        public MeetingMessageTypeChanged : boolean;
        private _MeetingMessageTypeChanged;
        public DateTimeCreated : Date;
        private _DateTimeCreated;
        public DateTimeCreatedChanged : boolean;
        private _DateTimeCreatedChanged;
        public LastModifiedTime : Date;
        private _LastModifiedTime;
        public LastModifiedTimeChanged : boolean;
        private _LastModifiedTimeChanged;
        public Copy(DestinationId: string): Microsoft.Utility.IPromise<Message>;
        public Move(DestinationId: string): Microsoft.Utility.IPromise<Message>;
        public CreateReply(): Microsoft.Utility.IPromise<Message>;
        public CreateReplyAll(): Microsoft.Utility.IPromise<Message>;
        public CreateForward(): Microsoft.Utility.IPromise<Message>;
        public Reply(Comment: string): Microsoft.Utility.IPromise<void>;
        public ReplyAll(Comment: string): Microsoft.Utility.IPromise<void>;
        public Forward(Comment: string, ToRecipients: Recipient[]): Microsoft.Utility.IPromise<void>;
        public Send(): Microsoft.Utility.IPromise<void>;
        public Update(): Microsoft.Utility.IPromise<Message>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseMessage(context: Extensions.DataContext, path: string, data: IMessage): Message;
        static parseMessageCollection(context: Extensions.DataContext, path: string, data: IMessage[]): Message[];
        public getRequestBody(): IMessage;
    }
    class AttachmentFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
    }
    interface IAttachmentCollection {
        value: IAttachment[];
    }
    interface IAttachment extends IEntity {
        Name: string;
        ContentType: string;
        Size: number;
        IsInline: boolean;
        LastModifiedTime: string;
    }
    class Attachment extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IAttachment);
        public _odataType: string;
        public Name : string;
        private _Name;
        public NameChanged : boolean;
        private _NameChanged;
        public ContentType : string;
        private _ContentType;
        public ContentTypeChanged : boolean;
        private _ContentTypeChanged;
        public Size : number;
        private _Size;
        public SizeChanged : boolean;
        private _SizeChanged;
        public IsInline : boolean;
        private _IsInline;
        public IsInlineChanged : boolean;
        private _IsInlineChanged;
        public LastModifiedTime : Date;
        private _LastModifiedTime;
        public LastModifiedTimeChanged : boolean;
        private _LastModifiedTimeChanged;
        public Update(): Microsoft.Utility.IPromise<Attachment>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseAttachment(context: Extensions.DataContext, path: string, data: IAttachment): Attachment;
        static parseAttachmentCollection(context: Extensions.DataContext, path: string, data: IAttachment[]): Attachment[];
        public getRequestBody(): IAttachment;
    }
    class FileAttachmentFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public exec(): Microsoft.Utility.IPromise<FileAttachment>;
    }
    interface IFileAttachmentCollection {
        value: IFileAttachment[];
    }
    interface IFileAttachment extends IAttachment {
        ContentId: string;
        ContentLocation: string;
        IsContactPhoto: boolean;
        ContentBytes: string;
    }
    class FileAttachment extends Attachment {
        constructor(context?: Extensions.DataContext, path?: string, data?: IFileAttachment);
        public _odataType: string;
        public ContentId : string;
        private _ContentId;
        public ContentIdChanged : boolean;
        private _ContentIdChanged;
        public ContentLocation : string;
        private _ContentLocation;
        public ContentLocationChanged : boolean;
        private _ContentLocationChanged;
        public IsContactPhoto : boolean;
        private _IsContactPhoto;
        public IsContactPhotoChanged : boolean;
        private _IsContactPhotoChanged;
        public ContentBytes : string;
        private _ContentBytes;
        public ContentBytesChanged : boolean;
        private _ContentBytesChanged;
        public Update(): Microsoft.Utility.IPromise<FileAttachment>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseFileAttachment(context: Extensions.DataContext, path: string, data: IFileAttachment): FileAttachment;
        static parseFileAttachmentCollection(context: Extensions.DataContext, path: string, data: IFileAttachment[]): FileAttachment[];
        public getRequestBody(): IFileAttachment;
    }
    class ItemAttachmentFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public Item : ItemFetcher;
        private _Item;
        public exec(): Microsoft.Utility.IPromise<ItemAttachment>;
    }
    interface IItemAttachmentCollection {
        value: IItemAttachment[];
    }
    interface IItemAttachment extends IAttachment {
    }
    class ItemAttachment extends Attachment {
        constructor(context?: Extensions.DataContext, path?: string, data?: IItemAttachment);
        public _odataType: string;
        public Item : ItemFetcher;
        private _Item;
        public Update(): Microsoft.Utility.IPromise<ItemAttachment>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseItemAttachment(context: Extensions.DataContext, path: string, data: IItemAttachment): ItemAttachment;
        static parseItemAttachmentCollection(context: Extensions.DataContext, path: string, data: IItemAttachment[]): ItemAttachment[];
        public getRequestBody(): IItemAttachment;
    }
    class CalendarFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public Events : EventCollection;
        private _Events;
        public exec(): Microsoft.Utility.IPromise<Calendar>;
    }
    interface ICalendarCollection {
        value: ICalendar[];
    }
    interface ICalendar extends IEntity {
        Name: string;
        ChangeKey: string;
    }
    class Calendar extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: ICalendar);
        public _odataType: string;
        public Name : string;
        private _Name;
        public NameChanged : boolean;
        private _NameChanged;
        public ChangeKey : string;
        private _ChangeKey;
        public ChangeKeyChanged : boolean;
        private _ChangeKeyChanged;
        public Events : EventCollection;
        private _Events;
        public Update(): Microsoft.Utility.IPromise<Calendar>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseCalendar(context: Extensions.DataContext, path: string, data: ICalendar): Calendar;
        static parseCalendarCollection(context: Extensions.DataContext, path: string, data: ICalendar[]): Calendar[];
        public getRequestBody(): ICalendar;
    }
    class CalendarGroupFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public Calendars : CalendarCollection;
        private _Calendars;
        public exec(): Microsoft.Utility.IPromise<CalendarGroup>;
    }
    interface ICalendarGroupCollection {
        value: ICalendarGroup[];
    }
    interface ICalendarGroup extends IEntity {
        Name: string;
        ChangeKey: string;
        ClassId: string;
    }
    class CalendarGroup extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: ICalendarGroup);
        public _odataType: string;
        public Name : string;
        private _Name;
        public NameChanged : boolean;
        private _NameChanged;
        public ChangeKey : string;
        private _ChangeKey;
        public ChangeKeyChanged : boolean;
        private _ChangeKeyChanged;
        public ClassId : string;
        private _ClassId;
        public ClassIdChanged : boolean;
        private _ClassIdChanged;
        public Calendars : CalendarCollection;
        private _Calendars;
        public Update(): Microsoft.Utility.IPromise<CalendarGroup>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseCalendarGroup(context: Extensions.DataContext, path: string, data: ICalendarGroup): CalendarGroup;
        static parseCalendarGroupCollection(context: Extensions.DataContext, path: string, data: ICalendarGroup[]): CalendarGroup[];
        public getRequestBody(): ICalendarGroup;
    }
    class EventFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public Calendar : CalendarFetcher;
        private _Calendar;
        public Attachments : AttachmentCollection;
        private _Attachments;
        public exec(): Microsoft.Utility.IPromise<Event>;
        public Accept(Comment: string): Microsoft.Utility.IPromise<void>;
        public Decline(Comment: string): Microsoft.Utility.IPromise<void>;
        public TentativelyAccept(Comment: string): Microsoft.Utility.IPromise<void>;
    }
    interface IEventCollection {
        value: IEvent[];
    }
    interface IEvent extends IItem {
        Start: string;
        End: string;
        Location: ILocation;
        ShowAs: string;
        IsAllDay: boolean;
        IsCancelled: boolean;
        IsOrganizer: boolean;
        ResponseRequested: boolean;
        Type: string;
        SeriesId: string;
        Attendees: IAttendee[];
        Recurrence: IPatternedRecurrence;
    }
    class Event extends Item {
        constructor(context?: Extensions.DataContext, path?: string, data?: IEvent);
        public _odataType: string;
        public Start : Date;
        private _Start;
        public StartChanged : boolean;
        private _StartChanged;
        public End : Date;
        private _End;
        public EndChanged : boolean;
        private _EndChanged;
        public Location : Location;
        private _Location;
        public LocationChanged : boolean;
        private _LocationChanged;
        private _LocationChangedListener;
        public ShowAs : FreeBusyStatus;
        private _ShowAs;
        public ShowAsChanged : boolean;
        private _ShowAsChanged;
        public IsAllDay : boolean;
        private _IsAllDay;
        public IsAllDayChanged : boolean;
        private _IsAllDayChanged;
        public IsCancelled : boolean;
        private _IsCancelled;
        public IsCancelledChanged : boolean;
        private _IsCancelledChanged;
        public IsOrganizer : boolean;
        private _IsOrganizer;
        public IsOrganizerChanged : boolean;
        private _IsOrganizerChanged;
        public ResponseRequested : boolean;
        private _ResponseRequested;
        public ResponseRequestedChanged : boolean;
        private _ResponseRequestedChanged;
        public Type : EventType;
        private _Type;
        public TypeChanged : boolean;
        private _TypeChanged;
        public SeriesId : string;
        private _SeriesId;
        public SeriesIdChanged : boolean;
        private _SeriesIdChanged;
        public Attendees : Extensions.ObservableCollection<Attendee>;
        private _Attendees;
        public AttendeesChanged : boolean;
        private _AttendeesChanged;
        private _AttendeesChangedListener;
        public Recurrence : PatternedRecurrence;
        private _Recurrence;
        public RecurrenceChanged : boolean;
        private _RecurrenceChanged;
        private _RecurrenceChangedListener;
        public Calendar : CalendarFetcher;
        private _Calendar;
        public Accept(Comment: string): Microsoft.Utility.IPromise<void>;
        public Decline(Comment: string): Microsoft.Utility.IPromise<void>;
        public TentativelyAccept(Comment: string): Microsoft.Utility.IPromise<void>;
        public Update(): Microsoft.Utility.IPromise<Event>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseEvent(context: Extensions.DataContext, path: string, data: IEvent): Event;
        static parseEventCollection(context: Extensions.DataContext, path: string, data: IEvent[]): Event[];
        public getRequestBody(): IEvent;
    }
    class ContactFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public Attachments : AttachmentCollection;
        private _Attachments;
        public exec(): Microsoft.Utility.IPromise<Contact>;
    }
    interface IContactCollection {
        value: IContact[];
    }
    interface IContact extends IItem {
        ParentFolderId: string;
        Birthday: string;
        FileAs: string;
        DisplayName: string;
        GivenName: string;
        Initials: string;
        MiddleName: string;
        NickName: string;
        Surname: string;
        Title: string;
        Generation: string;
        EmailAddress1: string;
        EmailAddress2: string;
        EmailAddress3: string;
        ImAddress1: string;
        ImAddress2: string;
        ImAddress3: string;
        JobTitle: string;
        CompanyName: string;
        Department: string;
        OfficeLocation: string;
        Profession: string;
        BusinessHomePage: string;
        AssistantName: string;
        Manager: string;
        HomePhone1: string;
        HomePhone2: string;
        BusinessPhone1: string;
        BusinessPhone2: string;
        MobilePhone1: string;
        OtherPhone: string;
        DateTimeCreated: string;
        LastModifiedTime: string;
    }
    class Contact extends Item {
        constructor(context?: Extensions.DataContext, path?: string, data?: IContact);
        public _odataType: string;
        public ParentFolderId : string;
        private _ParentFolderId;
        public ParentFolderIdChanged : boolean;
        private _ParentFolderIdChanged;
        public Birthday : Date;
        private _Birthday;
        public BirthdayChanged : boolean;
        private _BirthdayChanged;
        public FileAs : string;
        private _FileAs;
        public FileAsChanged : boolean;
        private _FileAsChanged;
        public DisplayName : string;
        private _DisplayName;
        public DisplayNameChanged : boolean;
        private _DisplayNameChanged;
        public GivenName : string;
        private _GivenName;
        public GivenNameChanged : boolean;
        private _GivenNameChanged;
        public Initials : string;
        private _Initials;
        public InitialsChanged : boolean;
        private _InitialsChanged;
        public MiddleName : string;
        private _MiddleName;
        public MiddleNameChanged : boolean;
        private _MiddleNameChanged;
        public NickName : string;
        private _NickName;
        public NickNameChanged : boolean;
        private _NickNameChanged;
        public Surname : string;
        private _Surname;
        public SurnameChanged : boolean;
        private _SurnameChanged;
        public Title : string;
        private _Title;
        public TitleChanged : boolean;
        private _TitleChanged;
        public Generation : string;
        private _Generation;
        public GenerationChanged : boolean;
        private _GenerationChanged;
        public EmailAddress1 : string;
        private _EmailAddress1;
        public EmailAddress1Changed : boolean;
        private _EmailAddress1Changed;
        public EmailAddress2 : string;
        private _EmailAddress2;
        public EmailAddress2Changed : boolean;
        private _EmailAddress2Changed;
        public EmailAddress3 : string;
        private _EmailAddress3;
        public EmailAddress3Changed : boolean;
        private _EmailAddress3Changed;
        public ImAddress1 : string;
        private _ImAddress1;
        public ImAddress1Changed : boolean;
        private _ImAddress1Changed;
        public ImAddress2 : string;
        private _ImAddress2;
        public ImAddress2Changed : boolean;
        private _ImAddress2Changed;
        public ImAddress3 : string;
        private _ImAddress3;
        public ImAddress3Changed : boolean;
        private _ImAddress3Changed;
        public JobTitle : string;
        private _JobTitle;
        public JobTitleChanged : boolean;
        private _JobTitleChanged;
        public CompanyName : string;
        private _CompanyName;
        public CompanyNameChanged : boolean;
        private _CompanyNameChanged;
        public Department : string;
        private _Department;
        public DepartmentChanged : boolean;
        private _DepartmentChanged;
        public OfficeLocation : string;
        private _OfficeLocation;
        public OfficeLocationChanged : boolean;
        private _OfficeLocationChanged;
        public Profession : string;
        private _Profession;
        public ProfessionChanged : boolean;
        private _ProfessionChanged;
        public BusinessHomePage : string;
        private _BusinessHomePage;
        public BusinessHomePageChanged : boolean;
        private _BusinessHomePageChanged;
        public AssistantName : string;
        private _AssistantName;
        public AssistantNameChanged : boolean;
        private _AssistantNameChanged;
        public Manager : string;
        private _Manager;
        public ManagerChanged : boolean;
        private _ManagerChanged;
        public HomePhone1 : string;
        private _HomePhone1;
        public HomePhone1Changed : boolean;
        private _HomePhone1Changed;
        public HomePhone2 : string;
        private _HomePhone2;
        public HomePhone2Changed : boolean;
        private _HomePhone2Changed;
        public BusinessPhone1 : string;
        private _BusinessPhone1;
        public BusinessPhone1Changed : boolean;
        private _BusinessPhone1Changed;
        public BusinessPhone2 : string;
        private _BusinessPhone2;
        public BusinessPhone2Changed : boolean;
        private _BusinessPhone2Changed;
        public MobilePhone1 : string;
        private _MobilePhone1;
        public MobilePhone1Changed : boolean;
        private _MobilePhone1Changed;
        public OtherPhone : string;
        private _OtherPhone;
        public OtherPhoneChanged : boolean;
        private _OtherPhoneChanged;
        public DateTimeCreated : Date;
        private _DateTimeCreated;
        public DateTimeCreatedChanged : boolean;
        private _DateTimeCreatedChanged;
        public LastModifiedTime : Date;
        private _LastModifiedTime;
        public LastModifiedTimeChanged : boolean;
        private _LastModifiedTimeChanged;
        public Update(): Microsoft.Utility.IPromise<Contact>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseContact(context: Extensions.DataContext, path: string, data: IContact): Contact;
        static parseContactCollection(context: Extensions.DataContext, path: string, data: IContact[]): Contact[];
        public getRequestBody(): IContact;
    }
    class ContactFolderFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public Contacts : ContactCollection;
        private _Contacts;
        public ChildFolders : ContactFolderCollection;
        private _ChildFolders;
        public exec(): Microsoft.Utility.IPromise<ContactFolder>;
    }
    interface IContactFolderCollection {
        value: IContactFolder[];
    }
    interface IContactFolder extends IEntity {
        ParentFolderId: string;
        DisplayName: string;
    }
    class ContactFolder extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IContactFolder);
        public _odataType: string;
        public ParentFolderId : string;
        private _ParentFolderId;
        public ParentFolderIdChanged : boolean;
        private _ParentFolderIdChanged;
        public DisplayName : string;
        private _DisplayName;
        public DisplayNameChanged : boolean;
        private _DisplayNameChanged;
        public Contacts : ContactCollection;
        private _Contacts;
        public ChildFolders : ContactFolderCollection;
        private _ChildFolders;
        public Update(): Microsoft.Utility.IPromise<ContactFolder>;
        public Delete(): Microsoft.Utility.IPromise<void>;
        static parseContactFolder(context: Extensions.DataContext, path: string, data: IContactFolder): ContactFolder;
        static parseContactFolderCollection(context: Extensions.DataContext, path: string, data: IContactFolder[]): ContactFolder[];
        public getRequestBody(): IContactFolder;
    }
    enum BodyType {
        Text = 0,
        HTML = 1,
    }
    enum Importance {
        Normal = 0,
        Low = 1,
        High = 2,
    }
    enum AttendeeType {
        Required = 0,
        Optional = 1,
        Resource = 2,
    }
    enum ResponseType {
        None = 0,
        Organizer = 1,
        TentativelyAccepted = 2,
        Accepted = 3,
        Declined = 4,
        NotResponded = 5,
    }
    enum EventType {
        SingleInstance = 0,
        Occurrence = 1,
        Exception = 2,
        SeriesMaster = 3,
    }
    enum FreeBusyStatus {
        Unknown = 0,
        Free = 1,
        Tentative = 2,
        Busy = 3,
        Oof = 4,
        WorkingElsewhere = 5,
    }
    enum MeetingMessageType {
        None = 0,
        MeetingRequest = 1,
        MeetingCancelled = 2,
        MeetingAccepted = 3,
        MeetingTenativelyAccepted = 4,
        MeetingDeclined = 5,
    }
    enum RecurrencePatternType {
        Daily = 0,
        Weekly = 1,
        AbsoluteMonthly = 2,
        RelativeMonthly = 3,
        AbsoluteYearly = 4,
        RelativeYearly = 5,
    }
    enum RecurrenceRangeType {
        EndDate = 0,
        NoEnd = 1,
        Numbered = 2,
    }
    enum WeekIndex {
        First = 0,
        Second = 1,
        Third = 2,
        Fourth = 3,
        Last = 4,
    }
    class UserCollection extends Extensions.QueryableSet<User> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getUser(Id: any): UserFetcher;
        public getUserCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<User>>;
        public addUser(item: User): Microsoft.Utility.IPromise<User>;
    }
    class FolderCollection extends Extensions.QueryableSet<Folder> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getFolder(Id: any): FolderFetcher;
        public getFolderCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<Folder>>;
        public addFolder(item: Folder): Microsoft.Utility.IPromise<Folder>;
    }
    class MessageCollection extends Extensions.QueryableSet<Message> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getMessage(Id: any): MessageFetcher;
        public getMessageCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<Message>>;
        public addMessage(item: Message): Microsoft.Utility.IPromise<Message>;
    }
    class CalendarCollection extends Extensions.QueryableSet<Calendar> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getCalendar(Id: any): CalendarFetcher;
        public getCalendarCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<Calendar>>;
        public addCalendar(item: Calendar): Microsoft.Utility.IPromise<Calendar>;
    }
    class CalendarGroupCollection extends Extensions.QueryableSet<CalendarGroup> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getCalendarGroup(Id: any): CalendarGroupFetcher;
        public getCalendarGroupCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<CalendarGroup>>;
        public addCalendarGroup(item: CalendarGroup): Microsoft.Utility.IPromise<CalendarGroup>;
    }
    class EventCollection extends Extensions.QueryableSet<Event> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getEvent(Id: any): EventFetcher;
        public getEventCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<Event>>;
        public addEvent(item: Event): Microsoft.Utility.IPromise<Event>;
    }
    class ContactCollection extends Extensions.QueryableSet<Contact> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getContact(Id: any): ContactFetcher;
        public getContactCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<Contact>>;
        public addContact(item: Contact): Microsoft.Utility.IPromise<Contact>;
    }
    class ContactFolderCollection extends Extensions.QueryableSet<ContactFolder> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getContactFolder(Id: any): ContactFolderFetcher;
        public getContactFolderCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<ContactFolder>>;
        public addContactFolder(item: ContactFolder): Microsoft.Utility.IPromise<ContactFolder>;
    }
    class AttachmentCollection extends Extensions.QueryableSet<Attachment> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getAttachment(Id: any): AttachmentFetcher;
        public getAttachmentCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<Attachment>>;
        public addAttachment(item: Attachment): Microsoft.Utility.IPromise<Attachment>;
        public asFileAttachmentCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<FileAttachment>>;
        public asItemAttachmentCollection(): Microsoft.Utility.IPromise<Extensions.PagedEnumerable<ItemAttachment>>;
    }
}
declare module System {
    enum DayOfWeek {
        Sunday = 0,
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday = 5,
        Saturday = 6,
    }
}
