declare module '*.sass' {
    interface Styles {
        [key: string]: string;
    }
    const styles: Styles;
    export = styles;
}
