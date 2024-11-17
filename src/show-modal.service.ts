import { Modal, App, Setting } from "obsidian";

export class InputURLModal extends Modal {
    constructor(app: App, onSubmit: (result: string) => void) {
        super(app)
        this.setTitle('Enter URL for Short')

        let url: string;

        new Setting(this.contentEl)
            .setName('URL:')
            .addText(
                text => text.onChange(
                    value => url = value
                )
            )
        new Setting(this.contentEl)
            .addButton(
                button => button
                    .setButtonText('Submit')
                    .setCta()
                    .onClick(
                        () => {
                            this.close()
                            onSubmit(url)
                        }
                    )
            )
    }
}