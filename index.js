//  The TwitchJS library requires that these variables be named "token" and channel"
//  You can generate a token here: https://twitchapps.com/tmi/
let token = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.TOKEN) ? SETTINGS.TWITCH_DATA.TOKEN : null;
let username = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.USERNAME) ? SETTINGS.TWITCH_DATA.USERNAME : null
let channel = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.CHANNEL) ? SETTINGS.TWITCH_DATA.CHANNEL : null;

let LoadSiteContent = async () => {
    loadSiteHeader();
    loadSiteMainArea();
	attemptAutoLogin();
};

let SITE_HEADER = null;
let SITE_MAIN_AREA = null;

let getLocalStorage = () => {
	let storageTSSP = localStorage.getItem('SimpleTwitchBotJS');
	return (storageTSSP ? JSON.parse(storageTSSP) : {});
}

let setLocalStorage = (storageData) => {
	localStorage.setItem("SimpleTwitchBotJS", JSON.stringify(storageData));
}

let loadSiteHeader = () => {
	//  The SiteHeader which will be attached to the top of the screen and persists across all pages
	SITE_HEADER = new SiteHeader({});
	document.body.appendChild(SITE_HEADER.content);
};

let loadSiteMainArea = () => {
	//  The SiteHeader which will be attached to the top of the screen and persists across all pages
	SITE_MAIN_AREA = new SiteMainArea({});
	document.body.appendChild(SITE_MAIN_AREA.content);
};

let attemptAutoLogin = async () => {
	if (!token || !channel) { return; }

	let connectResult = await TwitchController.Connect(channel, token);
	if (!connectResult) { console.warn("Failed to connect with given channel name and oauth token. Please try again."); return; }

	//  Move to the next program state
	SITE_MAIN_AREA.ShowMainAreaUI(connectResult);
};