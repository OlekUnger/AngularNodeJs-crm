declare var M

export class MaterialServce {
    static toast(message: string) {
        M.toast({html: message});
    }
}