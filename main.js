$(document).ready(function () {
  $("button").click(function (event) {
    event.preventDefault();
    Pay();
  });
});
async function Pay() {
  let email = document.getElementById("inputEmail4").value;
  let firstName = document.getElementById("inputFirst4").value;
  let lastName = document.getElementById("inputLast4").value;
  let phone = document.getElementById("inputPhone").value;
  //billing address
  let address = document.getElementById("inputAddress").value;
  let city = document.getElementById("inputCity").value;
  let state = document.getElementById("inputState").value;
  let zip = document.getElementById("inputZip").value;
  let country = document.getElementById("inputCountry").value;

  var token;
  //amount
  let amount = document.getElementById("inputAmount").value;
  $.ajax({
    url: "http://ec2-3-88-109-190.compute-1.amazonaws.com:80/token",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email: email, phone: phone, firstName: firstName }),
    success: function (result) {
      token = result.token;
      billingAddress = {
        city: city,
        street: address,
        zip: zip,
        country: country,
        state: state,
      };
      customer = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        dateOfBirth: {
          day: 21,
          month: 7,
          year: 1993,
        },
      };

      function uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            var r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        );
      }
      checkout(token, billingAddress, customer, amount, uuidv4());
    },
  });
}
function checkout(token, billingAddress, customer, amount, uuid) {
  paysafe.checkout.setup(
    "cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ=",
    {
      currency: "USD",
      amount: parseInt(amount) * 100,
      singleUseCustomerToken: token,

      customer: customer,
      billingAddress: billingAddress,
      paymentMethodDetails: {
        paysafecard: {
          consumerId: "1232323",
        },
      },
      environment: "TEST",
      merchantRefNum: uuid,
      canEditAmount: false,
      payout: false,
      payoutConfig: {
        maximumAmount: 10000,
      },
    },
    function (instance, error, result) {
      if (result && result.paymentHandleToken) {
        $.ajax({
          type: "POST",
          url: "http://ec2-3-88-109-190.compute-1.amazonaws.com:80/payment",
          contentType: "application/json",
          data: JSON.stringify({
            token: result.paymentHandleToken,
            amount: result.amount,
          }),
          success: (data) => {
            if (data.data == "COMPLETED") {
              instance.showSuccessScreen("Payment Successful!");
            } else {
              instance.showFailureScreen(
                "Payment was declined. Try again with the same or another payment method."
              );
            }
            setTimeout(function () {
              window.location.replace(window.location.href);
            }, 5000);
          },
        });
      } else {
        console.log("error");
        alert("Please keep in mind -----" + error.detailedMessage);
        console.error(error);
        // Handle the error
      }
    },
    function (stage, expired) {
      switch (stage) {
        case "PAYMENT_HANDLE_NOT_CREATED": // Handle the scenario
        case "PAYMENT_HANDLE_CREATED": // Handle the scenario
        case "PAYMENT_HANDLE_REDIRECT": // Handle the scenario
        case "PAYMENT_HANDLE_PAYABLE": // Handle the scenario
        default: // Handle the scenario
      }
    }
  );
}
