declare module '*.scss' {
    interface Styles {
        [key: string]: string;
    }
    const styles: Styles;
    export = styles;
}
