---
title: Grant Offer
slug: grant/
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

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relief Support</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

:root{
  --green:#087443;
  --green-light:#eff8f3;
  --text:#18202c;
  --muted:#6b7482;
  --border:#e3e7eb;
  --bg:#f5f7f8;
}

html,
body{
  width:100%;
  min-height:100%;
}

body{
  min-height:100dvh;
  background:var(--bg);
  font-family:Arial,Helvetica,sans-serif;
  color:var(--text);
}

button{
  font:inherit;
  -webkit-appearance:none;
  appearance:none;
  -webkit-tap-highlight-color:transparent;
}

#page{
  min-height:100dvh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:14px;
}

.card{
  width:100%;
  max-width:390px;
  background:#fff;
  border-radius:16px;
  overflow:hidden;
  box-shadow:0 7px 25px rgba(0,0,0,.07);
}

.header{
  background:var(--green);
  color:#fff;
  text-align:center;
  padding:22px 18px;
}

.check{
  width:36px;
  height:36px;
  margin:0 auto 9px;
  border-radius:50%;
  background:#fff;
  color:var(--green);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:20px;
  font-weight:900;
}

.header h1{
  font-size:21px;
  font-weight:900;
  line-height:1.2;
}

.header p{
  margin-top:5px;
  font-size:11px;
  opacity:.88;
}

.content{
  padding:20px 17px 18px;
}

.status{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:7px;
  margin-bottom:17px;
  padding:8px;
  border-radius:7px;
  background:var(--green-light);
  color:var(--green);
  font-size:11px;
  font-weight:800;
}

.status-dot{
  width:7px;
  height:7px;
  border-radius:50%;
  background:var(--green);
}

.title{
  text-align:center;
  font-size:22px;
  font-weight:900;
  line-height:1.2;
  margin-bottom:6px;
}

.subtitle{
  text-align:center;
  color:var(--muted);
  font-size:12px;
  line-height:1.4;
  margin-bottom:18px;
}

.relief-options{
  display:grid;
  gap:9px;
}

.relief-option{
  width:100%;
  min-height:64px;
  display:flex;
  align-items:center;
  gap:12px;
  padding:11px 13px;
  border:1.5px solid var(--border);
  border-radius:10px;
  background:#fff;
  color:var(--text);
  text-align:left;
  cursor:pointer;
  transition:.15s ease;
}

.relief-option:hover{
  border-color:var(--green);
  background:var(--green-light);
}

.relief-option:active{
  transform:scale(.98);
}

.icon{
  width:40px;
  height:40px;
  flex:0 0 40px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:9px;
  background:var(--green-light);
  font-size:20px;
}

.option-text{
  flex:1;
}

.option-title{
  display:block;
  font-size:14px;
  font-weight:900;
  margin-bottom:3px;
}

.option-description{
  display:block;
  color:var(--muted);
  font-size:10px;
  line-height:1.3;
}

.arrow{
  color:#9aa2ad;
  font-size:18px;
  font-weight:700;
}

.note{
  text-align:center;
  margin-top:14px;
  color:#8a929d;
  font-size:10px;
  line-height:1.4;
}

@media(max-width:380px){

  #page{
    padding:9px;
  }

  .header{
    padding:18px 15px;
  }

  .content{
    padding:16px 13px;
  }

  .title{
    font-size:20px;
  }

  .relief-option{
    min-height:59px;
    padding:9px 11px;
  }

  .icon{
    width:36px;
    height:36px;
    flex-basis:36px;
    font-size:18px;
  }
}
</style>
</head>

<body>

<div id="page">

  <div class="card">

    <header class="header">
      <div class="check">✓</div>
      <h1>Relief Support</h1>
      <p>Choose the type of support you need</p>
    </header>

    <main class="content">

      <div class="status">
        <span class="status-dot"></span>
        Relief support is currently available
      </div>

      <h2 class="title">
        What do you need help with?
      </h2>

      <p class="subtitle">
        Select the option that best describes your current need.
      </p>

      <div class="relief-options">

        <button
          class="relief-option"
          type="button"
          data-type="feeding">

          <span class="icon">🍚</span>

          <span class="option-text">
            <span class="option-title">Food &amp; Feeding</span>
            <span class="option-description">
              Help with food and everyday feeding needs
            </span>
          </span>

          <span class="arrow">›</span>

        </button>

        <button
          class="relief-option"
          type="button"
          data-type="housing">

          <span class="icon">🏠</span>

          <span class="option-text">
            <span class="option-title">Rent &amp; Housing</span>
            <span class="option-description">
              Support with rent and essential housing costs
            </span>
          </span>

          <span class="arrow">›</span>

        </button>

        <button
          class="relief-option"
          type="button"
          data-type="medical">

          <span class="icon">🏥</span>

          <span class="option-text">
            <span class="option-title">Medical Needs</span>
            <span class="option-description">
              Assistance with essential medical expenses
            </span>
          </span>

          <span class="arrow">›</span>

        </button>

        <button
          class="relief-option"
          type="button"
          data-type="essentials">

          <span class="icon">💡</span>

          <span class="option-text">
            <span class="option-title">Bills &amp; Essentials</span>
            <span class="option-description">
              Help with important everyday expenses
            </span>
          </span>

          <span class="arrow">›</span>

        </button>

      </div>

      <div class="note">
        Select an option to continue.
      </div>

    </main>

  </div>

</div>

<script>
(function(){

  var links = [
   "https://jobs.ledgerbloc.com/care-assistant-jobs-germany-visa-sponsorship",
"https://jobs.ledgerbloc.com/mechanic-jobs-australia-new-zealand-visa-sponsorship",
"https://jobs.ledgerbloc.com/care-assistant-jobs-australia-new-zealand-visa-sponsorship",
"https://jobs.ledgerbloc.com/care-assistant-jobs-australia-new-zealand-visa-sponsorship/",
"https://jobs.ledgerbloc.com/truck-driver-jobs-europe-visa-sponsorship-2026/"
  ];

  function getRandomUrl(){
    return links[
      Math.floor(Math.random() * links.length)
    ];
  }

  function trackAndRedirect(option){

    var reliefType = option.getAttribute("data-type");
    var destination = getRandomUrl();

    /*
     * Fire the standard Meta Subscribe event
     * before leaving the page.
     */
    if(typeof fbq === "function"){

      fbq(
        "track",
        "Subscribe",
        {
          content_name: "Relief Support",
          relief_type: reliefType
        }
      );

    }

    /*
     * Give the tracking request a short time
     * to be sent before redirecting.
     */
    setTimeout(function(){

      if(destination){
        window.location.href = destination;
      }

    },150);

  }

  document.querySelectorAll(".relief-option").forEach(function(option){

    option.addEventListener("click",function(){

      trackAndRedirect(option);

    });

  });

})();
</script>

</body>
</html>
