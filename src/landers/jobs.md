---
title: Grant Offer
slug: grant/
---

```html
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
  --green: #087443;
  --green-dark: #055b34;
  --green-light: #eef8f3;
  --text: #17202b;
  --muted: #687386;
  --border: #e2e6ea;
  --bg: #f5f7f8;
  --white: #fff;
}

html,
body {
  width: 100%;
  min-height: 100%;
}

body {
  min-height: 100dvh;
  background: var(--bg);
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text);
}

button {
  font: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
}

#page {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.card {
  width: 100%;
  max-width: 390px;
  background: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(0,0,0,.07);
}

/* HEADER */

.header {
  background: var(--green);
  color: #fff;
  text-align: center;
  padding: 22px 18px;
}

.check {
  width: 38px;
  height: 38px;
  margin: 0 auto 9px;
  border-radius: 50%;
  background: #fff;
  color: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  font-weight: 900;
}

.header h1 {
  font-size: 21px;
  line-height: 1.2;
  font-weight: 900;
}

.header p {
  margin-top: 4px;
  font-size: 11px;
  opacity: .85;
  font-weight: 700;
}

/* CONTENT */

.content {
  padding: 20px 18px 18px;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-bottom: 17px;
  padding: 8px 10px;
  border-radius: 7px;
  background: var(--green-light);
  color: var(--green);
  font-size: 11px;
  font-weight: 800;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
}

.title {
  text-align: center;
  font-size: 23px;
  line-height: 1.2;
  font-weight: 900;
  margin-bottom: 5px;
}

.subtitle {
  text-align: center;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 18px;
}

/* AMOUNTS */

.amount-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin-bottom: 14px;
}

.amount {
  height: 58px;
  border: 1.5px solid var(--border);
  border-radius: 9px;
  background: #fff;
  color: var(--green);
  font-size: 19px;
  font-weight: 900;
  cursor: pointer;
  transition: .15s ease;
}

.amount:active {
  transform: scale(.97);
}

.amount.selected {
  background: var(--green);
  border-color: var(--green);
  color: #fff;
}

/* CTA */

.continue {
  width: 100%;
  height: 53px;
  border: 0;
  border-radius: 9px;
  background: var(--green);
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
}

.continue:active {
  transform: scale(.98);
}

.continue:disabled {
  opacity: .45;
  cursor: not-allowed;
}

.note {
  text-align: center;
  margin-top: 10px;
  color: #89919c;
  font-size: 10px;
}

/* SMALL SCREENS */

@media (max-width: 380px) {

  #page {
    padding: 10px;
  }

  .header {
    padding: 18px 15px;
  }

  .check {
    width: 33px;
    height: 33px;
    font-size: 18px;
    margin-bottom: 7px;
  }

  .header h1 {
    font-size: 19px;
  }

  .content {
    padding: 16px 14px;
  }

  .title {
    font-size: 21px;
  }

  .amount {
    height: 52px;
    font-size: 17px;
  }

  .continue {
    height: 49px;
  }
}
</style>
</head>

<body>

<div id="page">

  <div class="card">

    <header class="header">
      <div class="check">✓</div>
      <h1>Congratulations!</h1>
      <p>You are qualified to continue</p>
    </header>

    <main class="content">

      <div class="status">
        <span class="status-dot"></span>
        Application window is open
      </div>

      <h2 class="title">How much do you need?</h2>

      <p class="subtitle">
        Select the amount that best matches your needs.
      </p>

      <form id="form">

        <div class="amount-grid">

          <button
            class="amount"
            type="button"
            data-amount="50000"
            data-label="₦50K">
            ₦50K
          </button>

          <button
            class="amount"
            type="button"
            data-amount="100000"
            data-label="₦100K">
            ₦100K
          </button>

          <button
            class="amount"
            type="button"
            data-amount="200000"
            data-label="₦200K">
            ₦200K
          </button>

          <button
            class="amount"
            type="button"
            data-amount="300000"
            data-label="₦300K">
            ₦300K
          </button>

          <button
            class="amount"
            type="button"
            data-amount="400000"
            data-label="₦400K">
            ₦400K
          </button>

          <button
            class="amount"
            type="button"
            data-amount="500000"
            data-label="₦500K">
            ₦500K
          </button>

        </div>

        <button
          id="continue"
          class="continue"
          type="submit"
          disabled>
          CONTINUE
        </button>

      </form>

      <div class="note">
        Select an amount to continue
      </div>

    </main>

  </div>

</div>

<script>
(function () {

  /* ADD DESTINATION URLS HERE */
  var links = [
    
  ];

  var selectedAmount = null;

  var amountButtons = document.querySelectorAll(".amount");
  var form = document.getElementById("form");
  var continueButton = document.getElementById("continue");

  function getRandomUrl() {

    if (!links.length) {
      return "";
    }

    return links[
      Math.floor(Math.random() * links.length)
    ];
  }

  amountButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      amountButtons.forEach(function (item) {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      selectedAmount = button;

      continueButton.disabled = false;

      if (typeof fbq === "function") {

        fbq("trackCustom", "AmountSelected", {
          amount: button.getAttribute("data-amount"),
          amount_label: button.getAttribute("data-label"),
          currency: "NGN"
        });

      }

    });

  });

  form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!selectedAmount) {
      return;
    }

    if (typeof fbq === "function") {

      fbq("trackCustom", "ContinueClicked", {
        amount: selectedAmount.getAttribute("data-amount"),
        amount_label: selectedAmount.getAttribute("data-label"),
        currency: "NGN"
      });

    }

    var destination = getRandomUrl();

    if (destination) {
      window.location.href = destination;
    }

  });

})();
</script>

</body>
</html>
```
