declare module 'App/Http/Controllers/*' {
    type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head';
    type RouteDefinition = () => { url: string; method: Method };

    export const index: RouteDefinition;
    export const show: (id?: number | string) => RouteDefinition;
    export const store: RouteDefinition;
    export const update: (id?: number | string) => RouteDefinition;
    export const destroy: (id?: number | string) => RouteDefinition;
}
