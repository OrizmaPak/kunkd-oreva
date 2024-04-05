// import { usePaystackPayment } from "react-paystack";

// export function usePayment(props: {
//   payload: IBookingPayload[];
//   isMultiple: boolean;
//   onSuccess: () => void;
// }) {
//   const [res, setRes] = useState({
//     ref: "",
//     total: 0,
//   });

//     //   setRes({
//     //     ref: (data.payment_reference || data.payment_reference_id) as string,
//     //     total: (data.total_booking_price * 100) as number,
//     //   });

//   const options = {
//     reference: res.ref,
//     email: userDetails.email,
//     amount: res.total * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//     publicKey: "pk_test_6327a61922f8120205b25f97222c77b6581e6c18",
//   };

//   const initializePayment = usePaystackPayment(options);

//   useEffect(() => {
//     if (!isLoading && res.ref && res.total) {
//       setLoading(true);
//       initializePayment(
//         () => {
//           setLoading(false);
//           showNotification({
//             message: "Property booked successfully",
//             title: "Booking Successfull",
//           });
//           props.onSuccess();
//         },
//         () => {
//           setLoading(false);
//           showNotification({
//             message: "Booking payment canceled",
//             title: "Booking Error",
//           });
//         }
//       );
//     }
//   }, [res.ref, res.total]);

//   return { res, isLoading: isLoading || isBookingLoading, mutate };
// }
