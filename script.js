var API_KEY_MERCHANT_TEST =
  "cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ=";

function Pay() {
  paysafe.checkout.setup(
    API_KEY_MERCHANT_TEST,
    {
      currency: "USD", // 4 currencies currently supported by Paysafe Checkout - "USD", "CAD", "EUR", "GBP"
      amount: 10000, // This qualifies as USD $ 100.00. Multiply Payment Amount by 100 and supply here.
      payout: false, // payout: true --> for Withdrawal (standalone credits); payout: false --> for Payments/Deposit
      payoutConfig: {
        // payoutConfig section required only when payout: true [for Withdrawal cases].
        maximumAmount: 100000000,
      },
      locale: "en_US",
      simulator: "EXTERNAL",
      imageUrl:
        "https://hosted.paysafe.com/checkout/resource/demo-store/images/logo.png", // Supply Your Logo URL here.
      environment: "TEST", // environment: "LIVE" --> Production, "TEST" --> test environment for customers to try out Checkout & its features
      buttonColor: "#66cc99", // feel free to change the color of buttons (RGB value)
      companyName: "Example Paysafe Merchant", // Supply Your Company Name here
      holderName: "John Smith", // Supply Customer's Name here
      customer: {
        firstName: "John",
        lastName: "Dee",
        email: "johndee@paysafe.com",
        phone: "1234567890",
        dateOfBirth: {
          day: 1,
          month: 7,
          year: 1990,
        },
      },
      billingAddress: {
        // Supply customer's billing Address here.
        nickName: "John Dee",
        street: "20735 Stevens Creek Blvd",
        street2: "Montessori",
        city: "Cupertino",
        zip: "95014",
        country: "US",
        state: "CA",
      },
      merchantRefNum:
        "Supply Merchant Ref Num Here. (Unique For Every Transaction)", // Will be unique and must keep changing every transaction
      canEditAmount: true, // Makes the payment amount editable on Checkout screen. Make it false to open Checkout with a fixed non-editable amount.
      merchantDescriptor: {
        dynamicDescriptor: "XYZ",
        phone: "1234567890",
      },
      displayPaymentMethods: [
        "neteller",
        "skrill",
        "paysafecard",
        "paysafecash",
        "instantach",
        "paypal",
        "card",
        "vippreferred",
        "sightline",
        "ach",
        "eft",
      ],
      // displayPaymentMethods : Array serves two purposes. You can use it to restrict the payment methods that a customer can see.
      // You can also use it to order the payment methods based on your preference.
      // If this field is present, the customer will only see those payment methods in the order specified, hence,
      // Ensure that you provide all payment methods if you are using it only for the purpose of payment method ordering.
      paymentMethodDetails: {
        // Please read the Checkout Objects Documentation on developer.paysafe.com .....
        paysafecard: {
          // .... for details on paymentMethodDetails (including all supported mandatory and optional fields)
          consumerId: "123456",
        },
        paysafecash: {
          consumerId: "123456",
        },
        sightline: {
          consumerId: "12341231256",
          SSN: "123456789",
          last4ssn: "6789",
          //accountId: "1009688222"  // Supply Account ID only if multiple accounts are configured with same payment method
        },
        vippreferred: {
          consumerId: "120288765",
          //accountId: "1679688456"  // Supply Account ID only if multiple accounts are configured with same payment method
        },
        card: {
          //accountId: "1009688230"  // Supply Account ID only if multiple accounts are configured with same payment method
        },
        skrill: {
          consumerId: "greg_neteller@mailinator.com",
          emailSubject: "Payout for Greg Neteller",
          emailMessage: "You Have Received Payout of $100.",
        },
        instantach: {
          consumerId: "john.doe@email.com",
          paymentId: "3aeb9c63-6386-46a3-9f8e-f452e722228a",
          emailSubject: "Instant ACH Payout",
          emailMessage: "Your Instant ACH Payout request has been processed",
        },
        neteller: {
          consumerId: "netellertest_EUR@neteller.com",
          recipientDescription: "logo_url_alt_text",
          logoUrl: "http://www.paysafe.com/icon.jpg",
        },
      },
    },
    function (instance, error, result) {
      if (result) {
        alert(JSON.stringify(result, null, 4));
      } else {
        alert(error);
      }
      if (result.token) {
        alert("Payment Token (Returned By Paysafe GW): " + result.token);
        // pass this token to server to make the payment or payout using Paysafe Payments API.
      }
    },
    function (stage, expired) {
      alert("Payment Handle Stage :: " + stage);
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
