class ControlScreen {
    constructor(options) {
        this.options = options;
        this.elements = { };
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({ id: "ControlScreen", style: { width: "920px", height: "100%", backgroundColor: "rgb(64, 64 ,64)", padding: "6px", color: "rgb(200, 200, 200)" }, });

        return container.content;
    }
    
    setHidden(hidden) { this.content.style.display = hidden ? "none" : ""; }
}