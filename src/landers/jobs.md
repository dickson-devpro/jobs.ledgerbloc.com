---
title: Grant Offer
slug: grant/
---

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#ffffff">
<title>Congratulations</title>

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
  alt=""
>
</noscript>
<!-- End Meta Pixel Code -->

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --green: #16a34a;
    --green-dark: #10813b;
    --green-soft: #effbf3;
    --green-border: #22c55e;
    --text: #111827;
    --muted: #687892;
    --border: #d9e0e8;
    --disabled: #d9e1ea;
    --alert: #ff6666;
    --page: #f7f8fa;
    --white: #ffffff;
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
  }

  body {
    min-height: 100dvh;
    background: var(--page);
    color: var(--text);
    font-family:
      "Avenir Next",
      "Segoe UI",
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      Arial,
      sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button,
  input {
    font: inherit;
  }

  button {
    -webkit-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  #page {
    min-height: 100dvh;
    width: 100%;
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    width: 100%;
    max-width: 760px;
    background: var(--white);
    border-radius: 42px;
    padding: 54px 36px 45px;
    box-shadow: 0 10px 35px rgba(17, 24, 39, 0.035);
  }

  .headline {
    color: var(--green);
    text-align: center;
    font-size: clamp(42px, 8vw, 76px);
    line-height: 0.98;
    font-weight: 900;
    letter-spacing: -2.8px;
    margin-bottom: 42px;
  }

  .title {
    color: var(--text);
    text-align: center;
    font-size: clamp(30px, 4.3vw, 39px);
    line-height: 1.12;
    font-weight: 750;
    letter-spacing: -1.1px;
    margin-bottom: 25px;
  }

  .subtitle {
    color: var(--muted);
    text-align: center;
    font-size: clamp(19px, 2.8vw, 28px);
    line-height: 1.3;
    font-weight: 500;
    margin-bottom: 50px;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-bottom: 42px;
  }

  .option-wrap {
    position: relative;
    display: block;
    cursor: pointer;
  }

  .option-wrap input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .option {
    min-height: 165px;
    border: 4px solid var(--border);
    border-radius: 38px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 22px;
    padding: 20px;
    transition:
      border-color .16s ease,
      background-color .16s ease,
      transform .12s ease;
  }

  .option:active {
    transform: scale(.992);
  }

  .radio {
    position: relative;
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    border: 4px solid #909090;
    border-radius: 50%;
    background: #fff;
  }

  .radio::after {
    content: "";
    position: absolute;
    width: 19px;
    height: 19px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: transparent;
  }

  .amount {
    font-size: clamp(27px, 4vw, 35px);
    line-height: 1;
    font-weight: 850;
    white-space: nowrap;
    letter-spacing: -0.7px;
    color: #111827;
  }

  .option-wrap input:checked + .option {
    border-color: var(--green-border);
    background: var(--green-soft);
  }

  .option-wrap input:checked + .option .radio {
    border-color: #8d8d8d;
  }

  .option-wrap input:checked + .option .radio::after {
    background: #22c55e;
  }

  #continue-button {
    width: 100%;
    min-height: 136px;
    border: 0;
    border-radius: 40px;
    background: var(--disabled);
    color: #ffffff;
    font-size: clamp(27px, 4vw, 34px);
    line-height: 1;
    font-weight: 900;
    letter-spacing: 1px;
    cursor: not-allowed;
    transition:
      background-color .16s ease,
      transform .12s ease;
  }

  #continue-button:not(:disabled) {
    background: var(--green);
    cursor: pointer;
  }

  #continue-button:not(:disabled):hover {
    background: var(--green-dark);
  }

  #continue-button:not(:disabled):active {
    transform: scale(.992);
  }

  .alert {
    margin-top: 34px;
    color: var(--alert);
    text-align: center;
    font-size: clamp(15px, 2.2vw, 20px);
    line-height: 1.55;
    font-weight: 500;
    letter-spacing: .15px;
  }

  @media (max-width: 640px) {
    #page {
      padding: 8px;
    }

    .card {
      max-width: 560px;
      border-radius: 30px;
      padding: 38px 18px 34px;
    }

    .headline {
      font-size: clamp(42px, 13vw, 64px);
      letter-spacing: -2px;
      margin-bottom: 31px;
    }

    .title {
      font-size: clamp(28px, 7.2vw, 36px);
      margin-bottom: 19px;
    }

    .subtitle {
      font-size: clamp(17px, 4.9vw, 23px);
      margin-bottom: 34px;
    }

    .options {
      gap: 12px;
      margin-bottom: 28px;
    }

    .option {
      min-height: 118px;
      border-radius: 28px;
      border-width: 3px;
      gap: 12px;
      padding: 14px 10px;
    }

    .radio {
      width: 31px;
      height: 31px;
      flex-basis: 31px;
      border-width: 3px;
    }

    .radio::after {
      width: 13px;
      height: 13px;
    }

    .amount {
      font-size: clamp(20px, 5.6vw, 27px);
    }

    #continue-button {
      min-height: 94px;
      border-radius: 28px;
      font-size: clamp(22px, 6vw, 29px);
    }

    .alert {
      margin-top: 25px;
      font-size: clamp(13px, 3.8vw, 17px);
      line-height: 1.5;
    }
  }

  @media (max-width: 390px) {
    .card {
      padding: 31px 13px 28px;
      border-radius: 25px;
    }

    .options {
      gap: 9px;
    }

    .option {
      min-height: 104px;
      border-radius: 24px;
      padding: 10px 7px;
    }

    .radio {
      width: 27px;
      height: 27px;
      flex-basis: 27px;
    }

    .radio::after {
      width: 11px;
      height: 11px;
    }

    .amount {
      font-size: 19px;
    }

    #continue-button {
      min-height: 82px;
      border-radius: 24px;
      font-size: 21px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .option,
    #continue-button {
      transition: none;
    }
  }
</style>
</head>

<body>
  <div id="page">
    <main class="card">
      <h1 class="headline">Congratulations</h1>

      <h2 class="title">How much do you need?</h2>

      <p class="subtitle">Choose below And Continue:</p>

      <div class="options" role="radiogroup" aria-label="Choose an amount">

        <label class="option-wrap">
          <input type="radio" name="amount" value="50000">
          <span class="option">
            <span class="radio" aria-hidden="true"></span>
            <span class="amount">₦50,000</span>
          </span>
        </label>

        <label class="option-wrap">
          <input type="radio" name="amount" value="100000">
          <span class="option">
            <span class="radio" aria-hidden="true"></span>
            <span class="amount">₦100,000</span>
          </span>
        </label>

      </div>

      <button id="continue-button" type="button" disabled>
        CONTINUE
      </button>

      <p class="alert">
        ALERT: Choose an amount, stay on the next page until you see a
        message asking for account number, or scroll down.
      </p>
    </main>
  </div>

<script>
(function () {
  var links = [
    "https://jobs.ledgerbloc.com/how-to-file-us-business-taxes-as-a-non-resident-owner-form-5472-1120"
  ];

  var radios = document.querySelectorAll('input[name="amount"]');
  var button = document.getElementById('continue-button');

  function getRandomUrl() {
    return links[Math.floor(Math.random() * links.length)];
  }

  function updateButton() {
    var selected = document.querySelector('input[name="amount"]:checked');
    button.disabled = !selected;
  }

  radios.forEach(function (radio) {
    radio.addEventListener('change', updateButton);
  });

  button.addEventListener('click', function () {
    if (button.disabled) return;

    var selected = document.querySelector('input[name="amount"]:checked');
    var destination = getRandomUrl();

    if (typeof fbq === 'function') {
      fbq('trackCustom', 'SupportContinueClicked', {
        content_name: 'Relief Support',
        amount: selected ? selected.value : ''
      });
    }

    setTimeout(function () {
      if (destination) {
        window.location.href = destination;
      }
    }, 150);
  });

  updateButton();
})();
</script>
</body>
</html>
