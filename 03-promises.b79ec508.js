!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var r=n("h6c0i"),i={form:document.querySelector("form.form"),delay:document.querySelector('[name="delay"]'),step:document.querySelector('[name="step"]'),amount:document.querySelector('[name="amount"]'),submitBtn:document.querySelector("button")};function a(e,t){return new Promise((function(o,n){var r=Math.random()>.3;setTimeout((function(){r?o({position:e,delay:t}):n({position:e,delay:t})}),t)}))}i.form.addEventListener("submit",(function(e){e.preventDefault(),i.submitBtn.disabled=!0;var t=Number.parseInt(i.delay.value);t<4&&(t=4,i.delay.value=4,r.Notify.info("First delay should be longer than 3ms. Automatically corrected."));var o=Number(i.step.value);o<4&&(o=4,r.Notify.info("Step interval should be longer than 3ms. Automatically corrected."));var n=Number(i.amount.value);n<1&&(n=1,r.Notify.info("Number of steps should be one at least. Automatically corrected."));n>100&&(n=100,r.Notify.info("It's hard to fulfill so many promises! Let's cut them to 100"));setTimeout((function(){i.submitBtn.disabled=!1}),t+n*o);for(var u=1;u<=n;u++){a(u,t+u*o).then((function(e){var t=e.position,o=e.delay;r.Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(o,"ms. Making promises is easy!"))})).catch((function(e){var t=e.position,o=e.delay;r.Notify.failure("❌ Rejected promise ".concat(t," in ").concat(o,"ms. It's hard to take your word!"))}))}}))}();
//# sourceMappingURL=03-promises.b79ec508.js.map