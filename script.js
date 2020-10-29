// async function Pay() {
//   let email = document.getElementById("inputEmail4").value;
//   let firstName = document.getElementById("inputFirst4").value;
//   let lastName = document.getElementById("inputLast4").value;
//   let phone = document.getElementById("inputPhone").value;
//   //billing address
//   let address = document.getElementById("inputAddress").value;
//   let city = document.getElementById("inputCity").value;
//   let state = document.getElementById("inputState").value;
//   let country = document.getElementById("inputCountry").value;
//   let zip = document.getElementById("inputZip").value;

//   var token;
//   //amount
//   let amount = document.getElementById("inputAmount").value;
//   $.ajax({
//     url: "ec2-18-211-62-45.compute-1.amazonaws.com:3000/token",
//     type: "POST",
//     contentType: "application/json",
//     data: JSON.stringify({ 'email': email, 'phone': phone, 'firstName': firstName }),
//     success: function (result) {
//       token = result.token;
//       console.log(result);
//       billingAddress = {
//         address: address,
//         city: city,
//         state: state,
//         zip: zip,
//         country: country,
//       };
//       customer = {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         phone: phone,
//         dateOfBirth: {
//           day: 1,
//           month: 6,
//           year: 1989,
//         },
//       };
//       function uuidv4() {
//         return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
//           /[xy]/g,
//           function (c) {
//             var r = (Math.random() * 16) | 0,
//               v = c == "x" ? r : (r & 0x3) | 0x8;
//             return v.toString(16);
//           }
//         );
//       }
//       // console.log(uuidv4());
//       checkout(token, billingAddress, customer, amount, uuidv4());
//     },
//   });
// }

// function checkout(token, billingAddress, customer, amount, uuid) {
//   paysafe.checkout.setup(
//     "cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ=",
//     {
//       amount: amount,
//       currency: "USD",
//       environment: "TEST",
//       companyName: "ROIIM - Prashant",
//       showSaveCardCheckboxes: true,
//       singleUseCustomerToken: token,
//       customer: customer,
//       billingAddress: billingAddress,
//       merchantRefNum: uuid,
//     },
//     function (instance, error, result) {
//       if (result.token) {
//         console.log(result.token);
//         console.log(result.paymentMethod);
//         window.location.href = "./success.html";

//         if (result.paymentMethod == "Cards") {
//           // use AJAX to send result.token to your merchant server to take CC payment
//         }
//       }
//     }
//   );
// }

function Pay() {
  paysafe.checkout.setup(
    "cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ=",
    {
      amount: 5900,
      currency: "USD",
      environment: "TEST",
      companyName: "ROIIM - Prashant",
      showSaveCardCheckboxes: true,
    },
    function (instance, error, result) {
      if (result.token) {
        console.log(result.token);
        console.log(result.paymentMethod);
        //window.location.href = "./success.html";

        if (result.paymentMethod == "Cards") {

          // use AJAX to send result.token to your merchant server to take CC payment
        }
        instance.showSuccessScreen("Your goods are now purchased. Expect them to be delivered in next 5 business days.");         
      } else {

        // tokenization failed

        instance.showFailureScreen("The payment was declined. Please, try again with the same or another payment method.");
      }
    }
  );
}
