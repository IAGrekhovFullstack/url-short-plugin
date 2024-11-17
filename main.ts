import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { GetURLService } from 'src/url-short.service';
import { InputURLModal } from 'src/show-modal.service';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'defaults'
}

export default class MyPlugin extends Plugin {

	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('spell-check', 'URL-short', () => {
			const modal = new InputURLModal(
				this.app,
				result => {
					console.log("Result", result)
					const sendRequest = new GetURLService()
					sendRequest.sendRequest(undefined, result)
				}
			)
			modal.open()
		})

		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
