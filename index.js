let LoadSiteContent = async () => {
    loadSiteHeader();
    loadSiteMainArea();
	checkAutoLogin();
};

let SITE_HEADER = null;
let SITE_MAIN_AREA = null;

let getStorageTSSP = () => {
	let storageTSSP = localStorage.getItem('SimpleTwitchBotJS');
	return (storageTSSP ? JSON.parse(storageTSSP) : { channelName: "", oauth: "", folderPath: "" });
}

let setStorageTSSP = (storageData) => {
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

let checkAutoLogin = async () => {
	if (!URL_OPTIONS || !URL_OPTIONS.autoLogin) { return; }
	if (!token || !channel) { return; }

	let connectResult = await TwitchController.Connect(channel, token);
	if (!connectResult) { console.warn("Failed to connect with given channel name and oauth token. Please try again."); return; }

	//  Move to the next program state
	SITE_HEADER.removeLoginHeaderButton();
	SITE_MAIN_AREA.ShowMainAreaUI(connectResult);
};