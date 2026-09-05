---
title: GOVERNMENT JOBS
slug: jobs
---

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
body{display:flex;align-items:center;justify-content:center;padding:24px;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;background:#fff;color:#111}
.wrap{width:100%;max-width:360px;text-align:center}
h1{font-size:1.9rem;font-weight:700;line-height:1.2;margin-bottom:32px}
.btns{display:flex;gap:14px;margin-bottom:28px}
.choice{flex:1;padding:16px;font:inherit;font-size:1.15rem;font-weight:700;color:#111;background:#fff;border:2px solid #ccc;border-radius:12px;cursor:pointer}
.choice.selected{color:#008751;background:#f0fdf4;border-color:#008751}
.cta{width:100%;padding:18px;font:inherit;font-size:1.25rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#fff;background:#008751;border:0;border-radius:12px;cursor:pointer}
.cta:disabled{background:#bbb;cursor:not-allowed}
button:focus-visible{outline:3px solid #008751;outline-offset:3px}
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
  document.querySelectorAll('.choice').forEach(function(b){b.classList.remove('selected')});
  el.classList.add('selected');
  document.getElementById('go').disabled=false;
}
function go(){window.open("https://hire.spurblitz.com/how-to-hire-foreign-workers-legally/","_blank","noopener")}
</script>
</body>
</html>
