document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.querySelector('input[name="bill"]');
  const personInput = document.querySelector('input[name="person"]');
  const tipCustomInput = document.querySelector('input[name="select--custom"]');
  const tipList = document.querySelector("ul");
  const resetButton = document.querySelector(".description__button--reset");
  const tipMoneyElement = document.querySelector(
    ".description__money.money--tip"
  );
  const totalMoneyElement = document.querySelector(
    ".description__money.money--total"
  );

  let valueTip = 0;

  function preventInvalidInput(event) {
    const invalidChars = /[-eE]+/;
    const pastedText = event.clipboardData
      ? event.clipboardData.getData("text/plain")
      : "";
    const keyCode = event.keyCode || event.which;

    if (pastedText && invalidChars.test(pastedText)) {
      event.preventDefault();
    } else if (
      invalidChars.test(event.key) &&
      ![8, 37, 38, 39, 40].includes(keyCode)
    ) {
      event.preventDefault();
    }
  }

  function updateMoneyValues() {
    const billValue = parseFloat(billInput.value);
    const tipPercentage = parseFloat(valueTip);
    console.log(valueTip);
    const numberOfPeople = parseInt(personInput.value);

    if (
      isNaN(billValue) ||
      isNaN(tipPercentage) ||
      isNaN(numberOfPeople) ||
      numberOfPeople === 0
    ) {
      tipMoneyElement.textContent = `$0.00`;
      totalMoneyElement.textContent = `$0.00`;
    } else {
      console.log("vao");
      const tipAmount = billValue * (tipPercentage / 100);
      const totalBillPerson = (billValue + tipAmount) / numberOfPeople;
      tipMoneyElement.textContent = `$${(tipAmount / numberOfPeople).toFixed(
        2
      )}`;

      totalMoneyElement.textContent = `$${totalBillPerson.toFixed(2)}`;
    }
  }

  tipList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "LI") {
      const tipValue = target.getAttribute("value");
      target.classList.toggle("active");

      const customInput = document.querySelector(
        'input[name="select--custom"]'
      );
      if (target.classList.contains("active")) {
        customInput.disabled = true;
        customInput.value = "";
        valueTip = tipValue;
      } else {
        customInput.disabled = false;
        valueTip = 0;
      }
      updateMoneyValues();
    }
  });

  billInput.addEventListener("paste", preventInvalidInput);
  billInput.addEventListener("keydown", preventInvalidInput);
  personInput.addEventListener("paste", preventInvalidInput);
  personInput.addEventListener("keydown", preventInvalidInput);
  tipCustomInput.addEventListener("paste", preventInvalidInput);
  tipCustomInput.addEventListener("keydown", preventInvalidInput);
  billInput.addEventListener("input", (event) => {
    billInput.value = event.target.value;
    updateMoneyValues();
  });
  personInput.addEventListener("input", (event) => {
    personInput.value = event.target.value;
    updateMoneyValues();
  });
  tipCustomInput.addEventListener("input", (event) => {
    valueTip = event.target.value;
    updateMoneyValues();
  });
  resetButton.addEventListener("click", (event) => {
    billInput.value = 0;
    personInput.value = 0;
    valueTip = 0;
    tipCustomInput.value = ''
    tipList
      .querySelectorAll("li.active")
      .forEach((li) => li.classList.remove("active"));
    updateMoneyValues();

    // Add 'active' class to the reset button
    resetButton.classList.add("active");
    setTimeout(() => resetButton.classList.remove("active"), 100);
  });
});
