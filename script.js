function checkout() {
  paysafe.checkout.setup(
    "cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ=",
    {
      amount: 5900,
      currency: "USD",
      environment: "TEST",
      companyName: "ROIIM - Prashant",
    },
    function (instance, error, result) {
      if (result.token) {
        console.log(result.token);
        console.log(result.paymentMethod);
        window.location.href = "./success.html";

        if (result.paymentMethod == "Cards") {
          // use AJAX to send result.token to your merchant server to take CC payment
        }
      }
    }
  );
}
