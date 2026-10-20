---
title: "eFriend: the 80s bot that does your money maths (no AI, no cloud, just disco)"
date: 2026-10-20
order: 81
summary: A retro robot lives inside my money app. He is rule-based, a bit shy, loves disco and Star Wars, and tells you if you can afford the thing. You can chat with him right here, at the top of this post.
tags: webapp, finance, privacy, chat, greek
project: expenity
---

<style>
.ef-arcade{border:2px solid var(--fg);border-radius:10px;padding:14px;margin:0 0 28px;background:var(--bg2);box-shadow:0 0 24px rgba(255,176,0,.18)}
.ef-arcade h2{margin:0 0 4px;font-size:1.05rem;letter-spacing:.12em;text-transform:uppercase}
.ef-arcade p{margin:0 0 12px;color:var(--dim)}
.ef-screen{position:relative;width:min(390px,100%);height:min(640px,78vh);margin:0 auto 12px;border:8px solid #000;border-radius:26px;background:#000;overflow:hidden;display:grid;place-items:center;box-shadow:0 0 0 2px var(--fg)}
.ef-screen iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fffaf6}
.ef-coin{font:inherit;color:var(--bg);background:var(--fg);border:0;border-radius:6px;padding:12px 18px;cursor:pointer;letter-spacing:.1em;text-transform:uppercase;animation:efblink 1.2s steps(2) infinite}
.ef-coin:hover{filter:brightness(1.15)}
.ef-arcade .row{display:flex;flex-direction:column;gap:8px;width:min(390px,100%);margin:0 auto}
.ef-arcade .row>*{display:block;box-sizing:border-box;width:100%;margin:0;font:inherit;font-size:.85rem;line-height:1.2;text-align:center;color:var(--fg);background:transparent;border:1px solid var(--fg);border-radius:6px;padding:7px 10px;cursor:pointer;text-decoration:none}
.ef-arcade .row>*:hover{background:var(--fg);color:var(--bg)}
@keyframes efblink{50%{opacity:.55}}
</style>

<div class="ef-arcade" id="arcade">
<h2>&gt; Insert coin: talk to eFriend</h2>
<p>This is the real chat from the app, with a made-up household called Maria. Nothing is saved. Try: <b>a new watch for my girlfriend, 450, in 2 weeks</b>. Or ask him how old he is.</p>
<div class="ef-screen" id="ef-screen" data-src="https://expenity.github.io/expenity/app/?demo=1&amp;ask=1&amp;lang=en"><button type="button" class="ef-coin" id="ef-coin">▶ Insert coin</button></div>
<div class="row"><button type="button" class="alt" id="ef-restart">↻ Restart</button><a href="https://expenity.github.io/expenity/efriend/">Meet him properly</a><a href="https://expenity.github.io/expenity/el/efriend/">Στα ελληνικά</a></div>
</div>
<script>
(function(){var s=document.getElementById('ef-screen'),c=document.getElementById('ef-coin'),r=document.getElementById('ef-restart');if(!s||!c)return;
function load(){s.innerHTML='';var f=document.createElement('iframe');f.src=s.dataset.src;f.title='eFriend chat, live';f.setAttribute('allow','');s.appendChild(f);}
c.addEventListener('click',load);r.addEventListener('click',load);})();
</script>

Everybody is putting an AI chatbot in everything. I put a **bot** in my money app.

A real one. 1984 vintage (his CV says so). **Rule-based, hand-wound and proudly retro.** No cloud brain, no "as a large language model". Just clear rules, a calculator, and a deep love of the 80s. His name is **eFriend**, the "e" is for electronic (and maybe a bit for eighties), and he does one job: he looks at your money and tells you, kindly, **can you afford it, and when**.

It is part of Expenity, the free app that started because my wife Olga wanted an easy way to track expenses. It then got out of hand. This is the out-of-hand part with a disco ball.

## Chat with him (the real thing)

Scroll up, put the coin in. He interviews you like a friend would:

- 🛍️ **What** do you want to buy? **How much** is it? **How soon** do you need it?
- 🧠 Say it all at once: "I want to buy a new watch for my girlfriend, 450, tomorrow". He finds the **watch**, the **girlfriend**, the **price** and the **date** (tomorrow, by Friday, on 15 November, before Christmas, in two weeks…). He only asks what is missing.
- ✏️ He says it back and you can fix him in plain words: "no, it is 1250".
- ⌨️ Asking for a price? The keyboard goes numeric and the number is grouped as you type, like 2.500.
- 🕐 He "types" like a person, then brings you **back to the app** with the answer.
- 👋 If you gave Expenity your name, he uses it. He has **dozens of lines** in English and Greek and tries not to repeat himself.
- 📝 Going round in circles? He offers a **quick form** (what, how much, when). There is also an icon at the top to skip the chat any time.
- 🧹 Lost the thread? **Start over** wipes the chat and he jokes about it. 🕘 **Past chats** are kept on your device, so you can reopen them and ask again.
- ⏱️ A chat lasts five minutes. After that, or if you close the app mid-chat, he falls asleep: "zzz". Wake him up for a fresh one.
- ✨ The sparkle in the text box brings back **24 ideas** and **23 questions** to ask him.

## The answer

- ✅ **Today:** can you buy it now, and how low would your money go afterwards?
- 📅 **Best days:** a calendar, **one month at a time**, opened on the best day, with arrows. Paydays 💶 and bills 🧾 are marked, and every day is coloured from **Best** to **Avoid**.
- 📈 **A graph** of your balance with and without the purchase, with your safety cushion as a dotted line.
- 🎯 **Make it a plan** is at the top, already filled in.
- 🚫 **No safe day in the next four months?** No date at all. He explains why and what would help. He will never point at a red day and say "how about this one?".

## Where the maths comes from

- **Plans, not goals:** he checks plans against your wallets, income dates, bills, real spending, limits and your other plans. Verdicts: **Comfortable**, **On track**, **Tight**, **At risk**, **Unlikely**.
- **Honest about deficits:** if you spend more than you earn, he says so instead of smiling.
- **Priorities and cushion:** drag your plans into order, or let him suggest **only the order**, or **the order and the safety cushion**, and watch him move things around. If your income swings a lot, he suggests a bigger cushion and shows why.
- **Fills things in for you:** spending limits suggested from your real spending, **budget ideas** after about six weeks, and a note before you save an expense that breaks your own limit.
- **Warns you early:** if your money is likely to run short in the next two months, Home names the day, lists the payments before it and gives you a **Move** button.
- **Moves money (on paper):** Suggest, Ask first or Automatic. Nothing real ever moves, it is a tracking system.
- **Everything stays on your device.** No server does his maths.

## His story

He grew up between a cassette player that ate tapes and a calculator with real buttons. He watched the same space adventure every Saturday, practises disco at night (three moves, in the dark, he is a little shy), and his favourite number is **010001100**. Ask him "tell me about yourself" and he tells the whole thing. I wrote it for him. He insists it is all true.

Ask him something he does not know and you get the official answer: **"I ask the questions around here."** It is not AI, it is a lifestyle.

## Go on

- 🎮 [Meet eFriend, with the live chat](https://expenity.github.io/expenity/efriend/)
- 📖 [The eFriend guide](https://expenity.github.io/expenity/docs/efriend/)
- 🆕 [What is new](https://expenity.github.io/expenity/changelog/)
- 📱 [Open Expenity](https://expenity.github.io/expenity/app/)

May the Force be with your budget.
