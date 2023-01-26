export function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // get is going to be called by the class it belongs to, so this refers to the class itself
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };

    return adjDescriptor;
}