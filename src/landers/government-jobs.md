---
title: GOVERNMENT JOBS
slug: jobs
---

<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1284065979244898');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1284065979244898&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->

<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#ffffff">
<title>Are you looking for a job in Nigeria?</title>
<style>
*{box-sizing:border-box;margin:0}
html,body{height:100%}
body{
  display:flex;
  align-items:center;
  justify-content:center;
  padding:24px;
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  background:#fff;
  color:#111
}
.wrap{
  width:100%;
  max-width:360px;
  text-align:center
}
h1{
  font-size:1.9rem;
  font-weight:700;
  line-height:1.2;
  margin-bottom:32px
}
.btns{
  display:flex;
  gap:14px;
  margin-bottom:28px
}
.choice{
  flex:1;
  padding:16px;
  font:inherit;
  font-size:1.15rem;
  font-weight:700;
  color:#111;
  background:#fff;
  border:2px solid #ccc;
  border-radius:12px;
  cursor:pointer
}
.choice.selected{
  color:#008751;
  background:#f0fdf4;
  border-color:#008751
}
.cta{
  width:100%;
  padding:18px;
  font:inherit;
  font-size:1.25rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.5px;
  color:#fff;
  background:#008751;
  border:0;
  border-radius:12px;
  cursor:pointer
}
.cta:disabled{
  background:#bbb;
  cursor:not-allowed
}
button:focus-visible{
  outline:3px solid #008751;
  outline-offset:3px
}
</style>
</head>

<body>

<main class="wrap">
  <h1>Are you looking for a job in Nigeria?</h1>

  <div class="btns">
    <button class="choice" onclick="pick(this)">YES</button>
    <button class="choice" onclick="pick(this)">NO</button>
  </div>

  <button id="go" class="cta" disabled onclick="go()">Apply Now</button>
</main>

<script>
function pick(el){
  document.querySelectorAll('.choice').forEach(function(b){
    b.classList.remove('selected');
  });

  el.classList.add('selected');
  document.getElementById('go').disabled = false;
}

var urls = [
  "https://jobs.ledgerbloc.com/cost-of-uk-private-health-insurance-explained/",
  "https://jobs.ledgerbloc.com/down-payment-requirements-by-loan-type/",
  "https://jobs.ledgerbloc.com/eb-2-niw-attorney-when-you-need-one-what-it-costs/",
  "https://jobs.ledgerbloc.com/first-time-home-buyer-mortgage-requirements/",
  "https://jobs.ledgerbloc.com/germany-job-seeker-visa-work-visa-requirements/",
  "https://jobs.ledgerbloc.com/h-visa-types-explained-h1b-h2a-h2b/",
  "https://jobs.ledgerbloc.com/home-loans-bad-credit-what-lenders-accept/",
  "https://jobs.ledgerbloc.com/how-to-contact-consult-immigration-attorney/",
  "https://jobs.ledgerbloc.com/how-to-file-us-tax-return-step-by-step/",
  "https://jobs.ledgerbloc.com/how-to-get-mortgage-thin-credit-file/",
  "https://jobs.ledgerbloc.com/how-to-get-us-employer-identification-number/",
  "https://jobs.ledgerbloc.com/how-to-pay-us-tax-from-overseas/",
  "https://jobs.ledgerbloc.com/how-to-verify-immigration-attorney-is-licensed/",
  "https://jobs.ledgerbloc.com/immigration-lawyer-for-partner-spouse-visa/",
  "https://jobs.ledgerbloc.com/mortgage-insurance-premium-pmi-explained/",
  "https://jobs.ledgerbloc.com/state-vs-federal-income-tax-us-guide/",
  "https://jobs.ledgerbloc.com/uk-immigration-lawyers-london-what-to-expect/",
  "https://jobs.ledgerbloc.com/us-income-tax-brackets-rates-explained/",
  "https://jobs.ledgerbloc.com/us-tax-filing-for-citizens-living-abroad/",
  "https://jobs.ledgerbloc.com/us-tax-forms-explained-w2-1099-1040/",
  "https://jobs.ledgerbloc.com/us-tax-reporting-obligations-non-residents/"
];

function go(){
  var randomUrl = urls[Math.floor(Math.random() * urls.length)];
  window.open(randomUrl, "_blank", "noopener");
}
</script>

</body>
</html>
