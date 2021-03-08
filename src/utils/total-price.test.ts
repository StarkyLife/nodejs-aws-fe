import { CartItem } from 'models/CartItem';

import { calculateTotalPrice } from './total-price';

describe('Total price calculation', () => {
    type TestItems = {
        count: number;
        price: number;
    };

    function assertTotalPriceCalculation(
        items: TestItems[] | undefined,
        expectedTotalPrice: ReturnType<typeof calculateTotalPrice>,
    ) {
        const cartItems = items?.map<CartItem>((i) => ({
            count: i.count,
            product: {
                id: 'random',
                title: 'random-title',
                price: i.price,
            },
        }));

        expect(calculateTotalPrice(cartItems))
            .toBe(expectedTotalPrice);
    }

    it('should return `0` given no items', () => {
        assertTotalPriceCalculation([], 0);
        assertTotalPriceCalculation(undefined, 0);
    });

    it('should calculateTotalPrice', () => {
        assertTotalPriceCalculation([{
            count: 1,
            price: 1,
        }], 1);
        assertTotalPriceCalculation([{
            count: 2,
            price: 2,
        }], 4);
        assertTotalPriceCalculation([{
            count: 5,
            price: 10,
        }], 50);
        assertTotalPriceCalculation([
            { count: 1, price: 1 },
            { count: 1, price: 1 },
        ], 2);
        assertTotalPriceCalculation([
            { count: 4, price: 10 },
            { count: 10, price: 5 },
            { count: 100, price: 5 },
        ], 590);
    });
});
