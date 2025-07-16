document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("coin-list");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNjIzOTc0LCJpYXQiOjE3NTI2MjAzNzQsImp0aSI6IjJiZDFlMjdjOGIzOTQ1MDg5YmEyYmI5YTgyMjBlYjA2IiwidXNlcl9pZCI6MX0.OqfYhoDhN4BXBih2NtPwd5XsKiXchkfl6g7Asxx8xH8";

  if (!token) {
    console.warn("توکن موجود نیست.");
    return;
  }

  fetch("http://localhost:8000/currencies/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error("خطا در دریافت دیتا");
      return res.json();
    })
    .then(data => {
      populateConverterSelects(data);

      data.forEach(coin => {
        const box = document.createElement("div");
        box.className =
          "bg-gray-800 rounded-xl p-6 shadow-xl w-[90%] sm:w-80 lg:w-[28rem] flex items-center justify-between hover:scale-105 transition-transform duration-300";

        const current = coin.current_price ?? 0;
        const last = coin.last_price ?? 0;
        const change = last !== 0 ? (((current - last) / last) * 100).toFixed(2) : 0;
        const changeHTML = `
          <div class="text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}">
            <span class="inline-block" dir="ltr">
              ${change > 0 ? '+' : ''}${change}%
            </span>
          </div>
        `;

        box.innerHTML = `
          <div class="flex items-center gap-4 w-full" dir="ltr">
            <!-- آواتار -->
            <div class="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <img src="${coin.avatar}" alt="${coin.symbol}" class="min-w-full min-h-full object-cover" />
            </div>

            <!-- نام ارز -->
            <div class="flex flex-col text-left">
              <div class="text-lg lg:text-xl font-semibold">${coin.title}</div>
              <div class="text-sm lg:text-base text-gray-400">${coin.symbol}</div>
            </div>

            <!-- قیمت -->
            <div class="ml-auto text-left">
              <div class="text-lg lg:text-2xl font-bold">${coin.current_price.toLocaleString()}</div>
              <div class="text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}">
                <span class="inline-block" dir="ltr">
                  ${change > 0 ? '+' : ''}${change}%
                </span>
              </div>
            </div>
          </div>
        `;

        container.appendChild(box);
      });
    })
    .catch(err => {
      console.error("خطا:", err);
      container.innerHTML = `<div class="text-red-500 text-center w-full">خطا در دریافت اطلاعات</div>`;
    });
});


let coinMap = {};

function populateConverterSelects(data) {
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");

  data.forEach(coin => {
    coinMap[coin.symbol] = coin.current_price;

    const option1 = new Option(`${coin.title} (${coin.symbol})`, coin.symbol);
    const option2 = new Option(`${coin.title} (${coin.symbol})`, coin.symbol);

    fromSelect.add(option1);
    toSelect.add(option2);
  });

  fromSelect.value = "USD";
  toSelect.value = "IRR";
}

document.getElementById("convertBtn").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (!amount || !coinMap[from] || !coinMap[to]) return;

  const result = (amount * coinMap[from]) / coinMap[to];
  console.log(result);
  document.getElementById("result").innerText = `${result.toFixed(2)} ${to}`;
});


function showSection(sectionId) {
  document.getElementById("coin-list").classList.add("hidden");
  document.getElementById("converter").classList.add("hidden");

  document.getElementById(sectionId).classList.remove("hidden");
}

console.log(coinMap)