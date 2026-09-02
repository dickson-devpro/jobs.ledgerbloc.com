---
title: Jobs landing page
slug: grant/
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Congratulations</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --red: #8f1111;
      --red-dark: #680909;
      --green: #087443;
      --green-dark: #055b34;
      --green-light: #edf8f2;
      --red-light: #fff3f3;
      --text: #18202c;
      --muted: #687386;
      --border: #e2e5e9;
      --white: #ffffff;
    }

    html,
    body {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    body {
      min-height: 100dvh;
      background: #f3f5f7;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--text);
    }

    button {
      font-family: Arial, Helvetica, sans-serif;
      -webkit-appearance: none;
      appearance: none;
      -webkit-tap-highlight-color: transparent;
    }

    #lp-wrap {
      width: 100%;
      height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      overflow: hidden;
    }

    #lp-card {
      width: 100%;
      max-width: 400px;
      max-height: calc(100dvh - 20px);
      background: #fff;
      border: 1px solid #e1e4e8;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.09);
    }

    #lp-header {
      position: relative;
      overflow: hidden;
      background: linear-gradient(145deg, var(--red), var(--red-dark));
      color: #fff;
      text-align: center;
      padding: 18px 15px 17px;
    }

    #lp-header::before {
      content: "";
      position: absolute;
      width: 120px;
      height: 120px;
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 50%;
      top: -78px;
      left: -48px;
    }

    #lp-header::after {
      content: "";
      position: absolute;
      width: 130px;
      height: 130px;
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 50%;
      right: -65px;
      bottom: -90px;
    }

    .lp-check {
      position: relative;
      z-index: 1;
      width: 34px;
      height: 34px;
      margin: 0 auto 7px;
      border-radius: 50%;
      background: #fff;
      color: var(--green);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      font-weight: 900;
    }

    .lp-header-main {
      position: relative;
      z-index: 1;
      font-size: 19px;
      font-weight: 900;
      line-height: 1.2;
    }

    .lp-header-sub {
      position: relative;
      z-index: 1;
      margin-top: 3px;
      color: #ffe3e3;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .4px;
    }

    #lp-content {
      padding: 17px 17px 15px;
      text-align: center;
    }

    .lp-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      margin-bottom: 11px;
      padding: 7px 9px;
      border-radius: 7px;
      background: var(--green-light);
      color: var(--green);
      font-size: 11px;
      font-weight: 800;
    }

    .lp-status-dot {
      width: 7px;
      height: 7px;
      flex: 0 0 7px;
      border-radius: 50%;
      background: var(--green);
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(8,116,67,.35);
      }

      70% {
        box-shadow: 0 0 0 5px rgba(8,116,67,0);
      }

      100% {
        box-shadow: 0 0 0 0 rgba(8,116,67,0);
      }
    }

    #lp-title {
      color: var(--text);
      font-size: 24px;
      font-weight: 900;
      line-height: 1.15;
      margin-bottom: 5px;
    }

    .lp-subtitle {
      color: var(--muted);
      font-size: 12px;
      line-height: 1.35;
      margin-bottom: 13px;
    }

    #lp-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
    }

    .lp-amount-button,
    #lp-continue-button {
      width: 100%;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 900;
      cursor: pointer;
      text-align: center;
    }

    .lp-amount-button {
      position: relative;
      height: 58px;
      border: 1.5px solid var(--border);
      border-radius: 10px;
      background: #fff;
      color: var(--red);
      font-size: 20px;
      font-weight: 900;
      transition:
        transform .15s ease,
        background .15s ease,
        border-color .15s ease;
    }

    .lp-amount-button:hover {
      border-color: var(--red);
      background: var(--red-light);
    }

    .lp-amount-button:active {
      transform: scale(.97);
    }

    .lp-amount-button.selected {
      background: var(--green);
      border-color: var(--green);
      color: #fff;
    }

    .lp-amount-button.selected::after {
      content: "✓";
      position: absolute;
      top: 5px;
      right: 6px;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: #fff;
      color: var(--green);
      font-size: 10px;
      line-height: 17px;
      font-weight: 900;
    }

    /*
      This is the tracker text.
      The visitor sees only the amount.
    */

    .fb-hidden-text {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    #lp-continue-button {
      height: 53px;
      border: 0;
      border-radius: 10px;
      background: linear-gradient(
        135deg,
        var(--green),
        var(--green-dark)
      );
      color: #fff;
      font-size: 16px;
      letter-spacing: .2px;
      box-shadow: 0 7px 16px rgba(8,116,67,.20);
      animation: ctaGlow 2.2s infinite;
    }

    #lp-continue-button:active {
      transform: scale(.98);
    }

    @keyframes ctaGlow {
      0%,
      100% {
        box-shadow: 0 7px 16px rgba(8,116,67,.18);
      }

      50% {
        box-shadow: 0 8px 21px rgba(8,116,67,.32);
      }
    }

    .lp-bottom-note {
      margin-top: 7px;
      color: #89919c;
      font-size: 10px;
      line-height: 1.3;
    }

    .lp-bottom-note span {
      color: var(--green);
      font-weight: 900;
    }

    @media (max-width: 380px) {

      #lp-wrap {
        padding: 7px;
      }

      #lp-card {
        max-width: 360px;
        max-height: calc(100dvh - 14px);
        border-radius: 16px;
      }

      #lp-header {
        padding: 14px 12px 13px;
      }

      .lp-check {
        width: 29px;
        height: 29px;
        font-size: 16px;
        margin-bottom: 5px;
      }

      .lp-header-main {
        font-size: 17px;
      }

      .lp-header-sub {
        font-size: 9px;
      }

      #lp-content {
        padding: 13px 13px 11px;
      }

      .lp-status {
        margin-bottom: 9px;
        padding: 6px 7px;
        font-size: 10px;
      }

      #lp-title {
        font-size: 22px;
      }

      .lp-subtitle {
        font-size: 11px;
        margin-bottom: 10px;
      }

      #lp-grid {
        gap: 7px;
        margin-bottom: 8px;
      }

      .lp-amount-button {
        height: 50px;
        font-size: 18px;
      }

      #lp-continue-button {
        height: 48px;
        font-size: 15px;
      }

      .lp-bottom-note {
        font-size: 9px;
      }
    }

    @media (max-height: 600px) {

      #lp-wrap {
        padding: 5px;
      }

      #lp-card {
        max-height: calc(100dvh - 10px);
      }

      #lp-header {
        padding: 11px;
      }

      .lp-check {
        width: 26px;
        height: 26px;
        font-size: 14px;
        margin-bottom: 3px;
      }

      .lp-header-main {
        font-size: 15px;
      }

      .lp-header-sub {
        font-size: 8px;
      }

      #lp-content {
        padding: 9px 12px 8px;
      }

      .lp-status {
        margin-bottom: 6px;
        padding: 4px;
        font-size: 9px;
      }

      #lp-title {
        font-size: 19px;
        margin-bottom: 2px;
      }

      .lp-subtitle {
        font-size: 10px;
        margin-bottom: 6px;
      }

      #lp-grid {
        gap: 5px;
        margin-bottom: 6px;
      }

      .lp-amount-button {
        height: 43px;
        font-size: 16px;
      }

      #lp-continue-button {
        height: 43px;
        font-size: 14px;
      }

      .lp-bottom-note {
        display: none;
      }
    }
  </style>
</head>

<body>

  <div id="lp-wrap">

    <div id="lp-card">

      <div id="lp-header">

        <div class="lp-check">
          ✓
        </div>

        <div class="lp-header-main">
          CONGRATULATIONS
        </div>

        <div class="lp-header-sub">
          YOU ARE QUALIFIED
        </div>

      </div>

      <div id="lp-content">

        <div class="lp-status">
          <span class="lp-status-dot"></span>
          Application window currently open
        </div>

        <div id="lp-title">
          How much do you need?
        </div>

        <div class="lp-subtitle">
          Select the amount that best matches what you need.
        </div>

        <form id="lp-form">

          <div id="lp-grid">

            <button
              class="lp-amount-button"
              type="submit"
              data-amount="50000"
              data-amount-label="₦50K">

              <span class="fb-hidden-text">APPLY NOW</span>₦50K

            </button>

            <button
              class="lp-amount-button"
              type="submit"
              data-amount="100000"
              data-amount-label="₦100K">

              <span class="fb-hidden-text">APPLY NOW</span>₦100K

            </button>

            <button
              class="lp-amount-button"
              type="submit"
              data-amount="200000"
              data-amount-label="₦200K">

              <span class="fb-hidden-text">APPLY NOW</span>₦200K

            </button>

            <button
              class="lp-amount-button"
              type="submit"
              data-amount="300000"
              data-amount-label="₦300K">

              <span class="fb-hidden-text">APPLY NOW</span>₦300K

            </button>

            <button
              class="lp-amount-button"
              type="submit"
              data-amount="400000"
              data-amount-label="₦400K">

              <span class="fb-hidden-text">APPLY NOW</span>₦400K

            </button>

            <button
              class="lp-amount-button"
              type="submit"
              data-amount="500000"
              data-amount-label="₦500K">

              <span class="fb-hidden-text">APPLY NOW</span>₦500K

            </button>

          </div>

          <button
            id="lp-continue-button"
            type="submit">

            CONTINUE NOW

          </button>

        </form>

        <div class="lp-bottom-note">
          <span>✓</span> Continue to view the available information
        </div>

      </div>

    </div>

  </div>

  <script>

    (function () {

      var links = [

        "https://jobs.classpawa.com/best-brokerage-accounts-for-non-resident-aliens-in-the-usa-2026",

        "https://jobs.classpawa.com/best-brokerage-accounts-for-non-resident-aliens-in-the-usa-2026",

        "https://jobs.classpawa.com/best-brokerage-accounts-for-non-resident-aliens-in-the-usa-2026",

        "https://jobs.classpawa.com/best-brokerage-accounts-for-non-resident-aliens-in-the-usa-2026",

        "https://jobs.classpawa.com/best-brokerage-accounts-for-non-resident-aliens-in-the-usa-2026",

        "https://jobs.classpawa.com/best-brokerage-accounts-for-non-resident-aliens-in-the-usa-2026"

      ];


      function getRandomUrl() {

        return links[
          Math.floor(
            Math.random() * links.length
          )
        ];

      }


      var form =
        document.getElementById("lp-form");


      form.addEventListener(
        "submit",
        function (event) {

          event.preventDefault();


          var clickedButton =
            event.submitter;


          if (
            clickedButton &&
            clickedButton.classList.contains(
              "lp-amount-button"
            )
          ) {

            document
              .querySelectorAll(
                ".lp-amount-button"
              )
              .forEach(
                function (button) {

                  button.classList.remove(
                    "selected"
                  );

                }
              );


            clickedButton.classList.add(
              "selected"
            );


            if (typeof fbq === "function") {

              fbq(
                "trackCustom",
                "AmountSelected",
                {
                  amount:
                    clickedButton.getAttribute(
                      "data-amount"
                    ),

                  amount_label:
                    clickedButton.getAttribute(
                      "data-amount-label"
                    ),

                  currency: "NGN"
                }
              );

            }

          }


          if (
            clickedButton &&
            clickedButton.id ===
              "lp-continue-button"
          ) {

            if (typeof fbq === "function") {

              fbq(
                "trackCustom",
                "ContinueClicked",
                {
                  currency: "NGN"
                }
              );

            }

          }


          var destination =
            getRandomUrl();


          setTimeout(
            function () {

              window.location.href =
                destination;

            },
            150
          );

        }
      );

    })();

  </script>

</body>
</html>
