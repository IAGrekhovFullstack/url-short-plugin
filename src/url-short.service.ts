import { Notice } from "obsidian"
import { CopyToClipboard } from "./copy-clipboard.service"

export class GetURLService {

    copy: CopyToClipboard = new CopyToClipboard()

    private async makeRequest(url: string): Promise<any> {
        try {
            const responce = await fetch(url)
            if (!responce.ok) throw new Error(`Ошибка сетевого запроса: ${responce.status}`)
            return responce.text()
        }
        catch (error) {
            alert(`Ошибка при выполнении сетевого запроса: ${error}`)
        }
    }

    async sendRequest(urlSeviceCheck: string = 'https://clck.ru/--', link: string) {
        const url = `${urlSeviceCheck}?url=${link}`
        const responce = await this.makeRequest(url)
        new Notice(`Link copy to clipboard: ${responce}`)
        this.copy.copy(responce)
    }
}