type GraphqlRes = {
    code: number;
    message: string;
    data: {
        [prop: string]: any
    }
}