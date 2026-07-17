import CustomerLayout from "../layouts/customer/CustomerLayout";
import CartItem from "../components/customer/cart/CartItem";
import CartSummary from "../components/customer/cart/CartSummary";
import EmptyCart from "../components/customer/cart/EmptyCart";
import LoadingSpinner from "../components/LoadingSpinner";
import useCart from "../hooks/useCart";

export default function Cart() {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <CustomerLayout>
        <LoadingSpinner />
      </CustomerLayout>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <CustomerLayout>
        <EmptyCart />
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>

      <div className="mx-auto max-w-7xl px-8 py-16">

        <h1 className="mb-10 text-4xl font-bold">
          Shopping Cart
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            {cart.items.map((item) => (
              <CartItem
                key={item.cart_item_id}
                item={item}
                onIncrease={() => {}}
                onDecrease={() => {}}
                onRemove={() => {}}
              />
            ))}

          </div>

          <CartSummary total={cart.total} />

        </div>

      </div>

    </CustomerLayout>
  );
}