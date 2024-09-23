const ItemGenerator = ({ length = 5}) => {
    return Array.from({ length: length }, (_, index) => index + 1);
}

export default ItemGenerator