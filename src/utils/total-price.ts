import { CartItem } from 'models/CartItem';

export function calculateTotalPrice(items: CartItem[] | undefined) {
    return items?.reduce(
        (total, item) => item.count * item.product.price + total,
        0,
    ) ?? 0;
}
