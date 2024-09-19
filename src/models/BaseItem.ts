import { action, observable } from 'mobx';

export interface IBaseItem {
    loading: boolean;
    startLoading(): void;
    endLoading(): void;
}

export class BaseItem implements IBaseItem {
    @observable public loading: boolean = false;
    @observable public hasError: boolean = false;
    @observable public error: string = "";

    @action
    public startLoading(): void {
        this.loading = true;
    }

    @action
    public endLoading(): void {
        this.loading = false;
    }

    @action
    public setError(text: string) {
        this.error = text;
        this.hasError = true;
        console.log(this.error);
    }

    @action
    public clearError() {
        this.hasError = false;
    }
}