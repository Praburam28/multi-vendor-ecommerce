import { useLocation } from "react-router-dom";
import { useState } from "react";

import CustomerLayout from "../layouts/customer/CustomerLayout";

import PaymentMethods from "../components/customer/payment/PaymentMethods";
import CardPayment from "../components/customer/payment/CardPayment";
import PaymentSuccess from "../components/customer/payment/PaymentSuccess";
import PaymentFailed from "../components/customer/payment/PaymentFailed";

import { makePayment } from "../services/paymentService";

export default function Payment() {

  const { state } = useLocation();

  const orderId = state?.orderId;

  const total = state?.total || 0;

  const [method, setMethod] = useState("card");

  const [status, setStatus] = useState("");

  const pay = async () => {

    try {

      const paymentMethodMap = {
  card: "Card",
  upi: "UPI",
  netbanking: "Net Banking",
  cod: "Cash on Delivery",
};

const result = await makePayment(
  orderId,
  paymentMethodMap[method]
);

      if (result.payment_status === "Paid") {

        setStatus("success");

      } else {

        setStatus("failed");

      }

    } catch {

      setStatus("failed");

    }

  };

  return (

    <CustomerLayout>

      <div className="mx-auto max-w-5xl px-8 py-16">

        {

          status === "success"

            ? <PaymentSuccess />

            : status === "failed"

              ? <PaymentFailed />

              :

              <div className="grid gap-10 md:grid-cols-2">

                <PaymentMethods

                  method={method}

                  setMethod={setMethod}

                />

                <CardPayment

                  total={total}

                  onPay={pay}

                />

              </div>

        }

      </div>

    </CustomerLayout>

  );

}