interface Store<T> {
    set: (data: T) => void;
    clear: () => void;
}



export default Store;