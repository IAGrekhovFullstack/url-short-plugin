export class CopyToClipboard {
    async copy(text: string) {
        await navigator.clipboard.writeText(text)
    }
}