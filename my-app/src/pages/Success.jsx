import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { userRequest } from "../requestMethod";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/cartRedux";
import Confetti from "react-confetti";

const Success = () => {
  const location = useLocation();

  const data = location.state.stripeData;
  const products = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: products.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: products.total,
          address: data.billing_details.address,
        });

        setOrderId(res.data._id);
      } catch (e) {
        console.log(e);
        console.log(location.state);
        console.log("Error while submitting the order :(");
      }
    };
    data && createOrder();
  }, [products, data, currentUser]);

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
  }, []);

  const handleGoToHomepage = () => {
    dispatch(resetCart());
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showConfetti && <Confetti />}
      <img src="https://images.vexels.com/media/users/3/199964/isolated/preview/ae782cab8ae7e722febb5869c09574cc-happy-delivery-boy-character.png" />
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/" style={{ textDecoration: "none" }}>
        <button
          style={{
            padding: 10,
            marginTop: 20,

            border: "none",
            backgroundColor: "#0f0f0f",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleGoToHomepage}
        >
          Go to Homepage
        </button>
      </Link>
    </div>
  );
};

export default Success;
