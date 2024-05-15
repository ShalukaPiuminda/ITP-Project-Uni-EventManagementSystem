
import '../Utills/header.css'
function PaymentHeader(){
    return(
        <div>
<div class="navbar">
  <a href="/pay/:id">Cash Payments</a>
  <a href="/addpayment">Card Payments</a>
</div>

        </div>
    )
}
export default PaymentHeader