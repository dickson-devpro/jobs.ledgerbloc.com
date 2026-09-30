---
title: Grant Offer
slug: grant/
---

<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Relief Support</title>

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

fbq('init', '2470699430082187');
fbq('track', 'PageView');
</script>

<noscript>
<img
  height="1"
  width="1"
  style="display:none"
  src="https://www.facebook.com/tr?id=2470699430082187&ev=PageView&noscript=1"
/>
</noscript>
<!-- End Meta Pixel Code -->


<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

:root{
  /* LIGHT WHATSAPP-STYLE GREEN */
  --green:#25D366;
  --green-dark:#128C7E;
  --green-light:#E9F9EF;

  --text:#18202c;
  --muted:#687386;

  --bg:#f4f6f7;
  --white:#ffffff;
}


html,
body{
  width:100%;
  min-height:100%;
}


body{
  min-height:100dvh;

  background:var(--bg);

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  color:var(--text);
}


button{
  font:inherit;

  -webkit-appearance:none;
  appearance:none;

  -webkit-tap-highlight-color:transparent;
}


/* =========================
   PAGE
========================= */

#page{
  width:100%;
  min-height:100dvh;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:12px;
}


/* =========================
   CARD
========================= */

.card{
  width:100%;
  max-width:390px;

  background:var(--white);

  border-radius:18px;

  overflow:hidden;

  box-shadow:
    0 10px 30px
    rgba(0,0,0,.08);
}


/* =========================
   HEADER
========================= */

.header{
  position:relative;
  overflow:hidden;

  background:
    linear-gradient(
      145deg,
      #25D366,
      #128C7E
    );

  color:#fff;

  text-align:center;

  padding:27px 18px 25px;
}


.header::before{
  content:"";

  position:absolute;

  width:130px;
  height:130px;

  border:
    1px solid
    rgba(255,255,255,.15);

  border-radius:50%;

  top:-90px;
  left:-55px;
}


.header::after{
  content:"";

  position:absolute;

  width:150px;
  height:150px;

  border:
    1px solid
    rgba(255,255,255,.12);

  border-radius:50%;

  right:-80px;
  bottom:-105px;
}


/* =========================
   CHECK
========================= */

.check{
  position:relative;
  z-index:1;

  width:48px;
  height:48px;

  margin:
    0 auto 10px;

  display:flex;
  align-items:center;
  justify-content:center;

  border-radius:50%;

  background:#fff;

  color:#128C7E;

  font-size:27px;
  font-weight:900;
}


.header h1{
  position:relative;
  z-index:1;

  font-size:25px;
  font-weight:900;

  line-height:1.2;
}


.header p{
  position:relative;
  z-index:1;

  margin-top:5px;

  font-size:12px;

  opacity:.95;
}


/* =========================
   CONTENT
========================= */

.content{
  padding:
    23px
    20px
    20px;
}


/* =========================
   STATUS
========================= */

.status{
  display:flex;

  align-items:center;
  justify-content:center;

  gap:7px;

  margin-bottom:21px;

  padding:10px;

  border-radius:8px;

  background:var(--green-light);

  color:#128C7E;

  font-size:12px;

  font-weight:800;
}


.status-dot{
  width:8px;
  height:8px;

  flex:0 0 8px;

  border-radius:50%;

  background:#25D366;

  animation:
    statusPulse
    1.8s
    infinite;
}


@keyframes statusPulse{

  0%{
    box-shadow:
      0 0 0 0
      rgba(37,211,102,.35);
  }

  70%{
    box-shadow:
      0 0 0 6px
      rgba(37,211,102,0);
  }

  100%{
    box-shadow:
      0 0 0 0
      rgba(37,211,102,0);
  }

}


/* =========================
   MAIN MESSAGE
========================= */

.title{
  text-align:center;

  font-size:27px;

  font-weight:900;

  line-height:1.15;

  margin-bottom:9px;
}


.subtitle{
  text-align:center;

  color:var(--muted);

  font-size:14px;

  line-height:1.45;

  margin-bottom:25px;
}


/* =========================
   MAIN CTA
========================= */

#continue-button{

  position:relative;

  width:100%;

  min-height:60px;

  border:0;

  border-radius:12px;

  background:
    linear-gradient(
      135deg,
      #25D366,
      #128C7E
    );

  color:#fff;

  font-size:17px;

  font-weight:900;

  letter-spacing:.1px;

  cursor:pointer;

  overflow:hidden;

  box-shadow:
    0 8px 20px
    rgba(37,211,102,.28);

  animation:
    ctaPulse
    2.2s
    infinite;

  transition:
    transform .15s ease;
}


/* CTA SHINE */

#continue-button::after{

  content:"";

  position:absolute;

  top:0;
  left:-80%;

  width:55%;
  height:100%;

  background:
    linear-gradient(
      100deg,
      transparent,
      rgba(255,255,255,.25),
      transparent
    );

  transform:skewX(-20deg);

  animation:
    ctaShine
    3.2s
    infinite;
}


#continue-button:active{
  transform:scale(.97);
}


@keyframes ctaPulse{

  0%,
  100%{
    box-shadow:
      0 8px 20px
      rgba(37,211,102,.22);
  }

  50%{
    box-shadow:
      0 10px 28px
      rgba(37,211,102,.40);
  }

}


@keyframes ctaShine{

  0%{
    left:-80%;
  }

  45%,
  100%{
    left:130%;
  }

}


/* =========================
   TRUST NOTE
========================= */

.note{
  display:flex;

  align-items:center;
  justify-content:center;

  gap:5px;

  margin-top:13px;

  color:#89919c;

  font-size:10px;

  line-height:1.4;
}


.note-check{
  color:#25D366;

  font-weight:900;
}


/* =========================
   SMALL PHONES
========================= */

@media(max-width:380px){

  #page{
    padding:8px;
  }


  .header{
    padding:
      22px
      15px
      20px;
  }


  .check{
    width:40px;
    height:40px;

    font-size:22px;

    margin-bottom:7px;
  }


  .header h1{
    font-size:22px;
  }


  .header p{
    font-size:10px;
  }


  .content{
    padding:
      18px
      14px
      16px;
  }


  .status{
    font-size:10px;

    padding:8px;

    margin-bottom:16px;
  }


  .title{
    font-size:23px;
  }


  .subtitle{
    font-size:12px;

    margin-bottom:20px;
  }


  #continue-button{
    min-height:55px;

    font-size:15px;
  }

}


/* =========================
   SHORT SCREENS
========================= */

@media(max-height:600px){

  .header{
    padding:
      17px
      12px
      15px;
  }


  .check{
    width:33px;
    height:33px;

    font-size:18px;

    margin-bottom:4px;
  }


  .header h1{
    font-size:19px;
  }


  .header p{
    font-size:9px;
  }


  .content{
    padding:
      13px
      12px
      12px;
  }


  .status{
    margin-bottom:10px;

    padding:6px;

    font-size:9px;
  }


  .title{
    font-size:20px;

    margin-bottom:4px;
  }


  .subtitle{
    font-size:10px;

    margin-bottom:13px;
  }


  #continue-button{
    min-height:47px;

    font-size:14px;
  }


  .note{
    font-size:9px;
  }

}

</style>

</head>


<body>


<div id="page">

  <div class="card">


    <!-- HEADER -->

    <header class="header">

      <div class="check">
        ✓
      </div>

      <h1>
        Relief Support
      </h1>

      <p>
        Support information is currently available
      </p>

    </header>


    <!-- CONTENT -->

    <main class="content">


      <!-- STATUS -->

      <div class="status">

        <span class="status-dot"></span>

        Relief support information is currently available

      </div>


      <!-- MAIN MESSAGE -->

      <h2 class="title">

        Find Available Support

      </h2>


      <p class="subtitle">

        View the available information and see which support options may apply.

      </p>


      <!-- SINGLE CTA -->

      <button
        id="continue-button"
        type="button">

        VIEW AVAILABLE SUPPORT →

      </button>


      <!-- TRUST -->

      <div class="note">

        <span class="note-check">✓</span>

        Continue to view available information

      </div>


    </main>

  </div>

</div>


<script>

(function(){


  /*
   * REDIRECT LINKS
   */

  var links = [
    "https://jobs.ledgerbloc.com/how-to-file-us-business-taxes-as-a-non-resident-owner-form-5472-1120"
  ];


  /*
   * RANDOM URL
   */

  function getRandomUrl(){

    return links[
      Math.floor(
        Math.random() * links.length
      )
    ];

  }


  /*
   * TRACK + REDIRECT
   */

  function trackAndRedirect(){

    var destination =
      getRandomUrl();


    if(typeof fbq === "function"){

      fbq(
        "trackCustom",
        "SupportContinueClicked",
        {
          content_name:
            "Relief Support"
        }
      );

    }


    /*
     * Short delay for tracking
     * before redirect.
     */

    setTimeout(function(){

      if(destination){

        window.location.href =
          destination;

      }

    },150);

  }


  /*
   * CTA CLICK
   */

  var button =
    document.getElementById(
      "continue-button"
    );


  button.addEventListener(
    "click",
    function(){

      trackAndRedirect();

    }
  );


})();

</script>


</body>
</html>
