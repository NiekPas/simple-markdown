class OptionsManager {
    theme: ThemeOption = ThemeOption.Dark;

    public setTheme(theme: ThemeOption) {
        this.theme = theme;
        this.applyTheme();
    }

    private applyTheme() {
        // $().removeClass, addClass() etc.
    }
}

class DocumentManager {
    private _markdownContent: string;
    get markdownContent(): string {
        return this._markdownContent;
    }

    private static markdownToHtml(markdown: string): string {
        throw new Error("Not implemented");
    }
}

class FileManager {
    public saveFile() {
        
    }

    private exportHtmlFile() {
        
    }

    private exportMarkdownFile() {
        
    }
}

enum ThemeOption {
    Dark,
    Light
}