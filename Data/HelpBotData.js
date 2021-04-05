const helpBotOptions = { raidTrigger: false };
const helpCommand = "!help";

let parseHelpCommand = (message) => {
    let isHelpCommand = (message.substr(0, helpCommand.length) === helpCommand);
    if (!isHelpCommand) { return { success: false, reason: "Message is a " + helpCommand + " command", reply: [ "Failed to parse help command." ] }; }

    if (message === helpCommand || message === helpCommand + " ") {
        return { success: true, reply: [ "HELP: SimpleTwitchJSBot (that's me!) is a simple way to implement a Javascript Chat Bot in your Twitch channel. Ask me about a specific subject by using the command '" + helpCommand + " SUBJECT'. For a list of help subjects, type '" + helpCommand + " subjects'" ] };
    }

    let hasSubject = (message.substr(0, 6) === (helpCommand + " ")) && (message.length > 6);
    if (!hasSubject) { return { success: false, reason: helpCommand + " command is improperly formatted", reply: [ "Failed to parse help command." ] }; }
    let helpSubject = message.substr(6, message.length - 6).toLowerCase();
    
    switch (helpSubject) {
        case "subject":
        case "subjects":
        case "?":
            return { success: true, reply: [
                "HELP Subjects I can currently tell you about: [help, channel, username, token, URL vars, auto login]",
            ], };

        case "help":
            return { success: true, reply: [
                "If you need to implement a simple helper bot that answers questions, check HelpBotData.js in the project to see how " + helpCommand + " messages are processed.",
                "Basically, the script checks if the message begins with '" + helpCommand + "' and from there processes responses based on the keywords that follow.",
            ], };

        case "channel":
            return { success: true, reply: [
                "If you want to use this by loading it through OBS or just save yourself some time loading it normally, you can use URL variables. One of which is 'channel'.",
                "By adding the URL variable 'channel' in the URL, you can specify the channel to listen to, which will auto-fill the login box and set the Twitch Controller variable.",
            ], };

        case "username":
            return { success: true, reply: [
                "If you want to use this by loading it through OBS or just save yourself some time loading it normally, you can use URL variables. One of which is 'username'.",
                "By adding the URL variable 'username' in the URL, you can specify the username you expect your bot to have (the bot is actually loaded through the token).",
            ], };

        case "token":
            return { success: true, reply: [
                "If you want to use this by loading it through OBS or just save yourself some time loading it normally, you can use URL variables. One of which is 'token'.",
                "By specifying the Twitch oauth of whatever account you want the bot to run through, you allow the program to save off the Twitch Controller variable and auto-fill in the Login box.",
                "NOTE: You don't supply the entire oauth that is generated for you. Instead, select everything after the ':' symbol. You can generate a new oauth by clicking the question mark in the Login Box.",
            ], };

        case "url":
        case "url vars":
            return { success: true, reply: [
                "If you want to use this by loading it through OBS or just save yourself some time loading it normally, you can use URL variables. These are channel, token, username, and autoLogin.",
                "Check the details of each by using " + helpCommand + " and then the term... but in general, your URL will look like this:",
                "PROJECT_FOLDER/index.htm?channel=DrewTheBear&token=asoifnasifnicnasihf3975rfqa89vansf&username=BrigsbyBot&autoLogin=true",
            ], };

        case "autologin":
        case "auto login":
            return { success: true, reply: [
                "If you want to use this by loading it through OBS or just save yourself some time loading it normally, you can use URL variables. One of which is 'autoLogin'",
                "By adding the URL variable 'autoLogin' in the URL, you can specify it as 'true' to have the project attempt to autoLogin as soon as the page loads.",
                "Please note that if you put autoLogin in the URL, it is expected you also have put in a username, channel, and token",
            ], };

        default:
            return { success: true, reply: [
                "The help command does not have an entry for string [" + helpSubject +"]. Please contact me if you think it should be added or if you have any questions.",
            ], };
    }
}