# Events

`HadesBotService` has a number of methods you can override to handle the
various Discord.js client events:

## logging

- async **onDebug**(...args: any[])
- async **onError**(...args: any[])
- async **onWarn**(...args: any[])

## channels

- async **onChannelCreate**(channel: Channel)
- async **onChannelDelete**(channel: Channel)
- async **onChannelPinsUpdate**(channel: Channel, time: Date)
- async **onChannelUpdate**(oldChannel: Channel, newChannel: Channel)

## connection

- async **onReady**()
- async **onReconnecting**()
- async **onDisconnect**(event: CloseEvent)

## emoji

- async **onEmojiCreate**(emoji: Emoji)
- async **onEmojiDelete**(emoji: Emoji)
- async **onEmojiUpdate**(emoji: Emoji)

## bans

- async **onGuildBanAdd**(guild: Guild, user: User)
- async **onGuildBanRemove**(guild: Guild, user: User)

## bot guilds

- async **onGuildCreate**(guild: Guild)
- async **onGuildDelete**(guild: Guild)
- async **onGuildUnavailable**(guild: Guild)

## guild members

- async **onGuildMemberAdd**(member: GuildMember)
- async **onGuildMemberAvailable**(member: GuildMember)
- async **onGuildMemberRemove**(member: GuildMember)
- async **onGuildMemberSpeaking**(member: GuildMember, isSpeaking: boolean)
- async **onGuildMemberUpdate**(oldMember: GuildMember, newMember: GuildMember)
- async **onGuildMembersChunk**(members: GuildMember[], guild: Guild)
- async **onGuildUpdate**(oldGuild: Guild, newGuild: Guild)

## messages

- async **onMessage**(message: Message)
- async **onMessageDelete**(message: Message)
- async **onMessageDeleteBulk**(messages: Collection<Snowflake, Message>)
- async **onMessageReactionAdd**(reaction: MessageReaction, user: User)
- async **onMessageReactionRemove**(reaction: MessageReaction, user: User)
- async **onMessageReactionRemoveAll**(message: Message)
- async **onMessageUpdate**(oldMessage: Message, newMessage: Message)

## prescence

- async **onPresenceUpdate**(oldMember: GuildMember, newMember: GuildMember)
- async **onTypingStart**(channel: Channel, user: User)
- async **onTypingStop**(channel: Channel, user: User)

## roles

- async **onRoleCreate**(role: Role)
- async **onRoleDelete**(role: Role)
- async **onRoleUpdate**(oldRole: Role, newRole: Role)

## users

- async **onUserNoteUpdate**(user: User, oldNote: string, newNote: string)
- async **onUserUpdate**(oldUser: User, newUser: User)
- async **onVoiceStateUpdate**(oldMember: GuildMember, newMember: GuildMember)
