class SiteMainArea {
    constructor(options) {
        this.options = options;
        this.elements = { ControlScreen: null, ChatContainer: null, };
        this.content = this.generateContent();
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteMainArea", style: {}, });
        let centeredMainArea = new Container({ id: "CenteredMainArea", style: { margin: "auto", width: "920px", height: "100%", overflow: "hidden", }, });
        container.appendChild(centeredMainArea.content);

        this.elements.ControlScreen = new ControlScreen({});
        centeredMainArea.appendChild(this.elements.ControlScreen.content);

        //  Create the twitch chat stream early so we can pass it into other classes
        this.elements.ChatContainer = new TwitchChatScreen({});
        this.elements.ChatContainer.setHidden(true);
        centeredMainArea.appendChild(this.elements.ChatContainer.content);

        this.setOnChatMessage();

        return container.content;
    }

    setOnChatMessage() {
        TwitchController.AddTwitchMessageCallback("PRIVMSG", (message) => {
            let messageLower = message.message.toLowerCase();
            
            //  Print out the message to show we've received it
            console.log("PRIVMSG: ", message);

            //  Check for help commands. If any response is required, send each message separated by a short timer.
            let helpResponse = parseHelpCommand(messageLower);
            if (helpResponse.success) {
                let sendHelpResponse = null;
                sendHelpResponse = (helpResponse) => {
                    TwitchController.SendChatMessage(channel, helpResponse.reply[0]);
                    helpResponse.reply.shift();
                    if (sendHelpResponse && (helpResponse.reply.length !== 0)) { setTimeout(() => sendHelpResponse(helpResponse), 500); }
                };
                sendHelpResponse(helpResponse);
            }
        });
    }

    ShowMainAreaUI(show) {
        this.elements.ControlScreen.setHidden(!show);
        this.elements.ChatContainer.content.style.display = show ? "block" : "none";
    }
}