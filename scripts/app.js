const allNextBtns = document.querySelectorAll(".step-buttons > .next-btn");
const allBackBtns = document.querySelectorAll(".step-buttons > .back-btn");
const allContentPages = document.querySelectorAll(".content-page");
const allSteps = document.querySelectorAll(".step-container > .step");
let isCheckLogin = true;
let finishData = {
    planTitle: "",
    planPrice: "",
    itemData: [],
};

allNextBtns.forEach((nextBtn, index) => {
    nextBtn.addEventListener("click", function () {
        checkLogin();
        if (isCheckLogin) {
            allContentPages[index].classList.add("hide");
            allContentPages[index + 1].classList.remove("hide");
            allSteps[index + 1]?.classList.add("active");
        }
        if (index == 0) {
            selectPlan();
        }
        if (index == 2) {
            finishingUp();
        }
    });
});

allBackBtns.forEach((backBtn, index) => {
    backBtn.addEventListener("click", function () {
        allContentPages[index + 1].classList.add("hide");
        allContentPages[index].classList.remove("hide");
        allSteps[index + 1]?.classList.remove("active");
    });
});

function checkLogin() {
    //* constants erorrs
    const nameError = document.querySelector(".name-label .name-error");
    const emailError = document.querySelector(".email-label .email-error");
    const phoneError = document.querySelector(".phone-label .phone-error");

    //* constants inputs
    const nameInput = document.querySelector(".name-label input");
    const emailInput = document.querySelector(".email-label input");
    const phoneInput = document.querySelector(".phone-label input");

    //* constants Regex
    const nameRegex =
        /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (
        !nameRegex.test(nameInput.value) ||
        !emailRegex.test(emailInput.value) ||
        !phoneRegex.test(phoneInput.value)
    ) {
        isCheckLogin = false;
        if (!nameRegex.test(nameInput.value)) {
            nameError.innerHTML = "Name is invalid";
        }
        if (!emailRegex.test(emailInput.value)) {
            emailError.innerHTML = "Email is invalid";
        }
        if (!phoneRegex.test(phoneInput.value)) {
            phoneError.innerHTML = "Phone is invalid";
        }
    } else {
        nameError.innerHTML = "";
        emailError.innerHTML = "";
        phoneError.innerHTML = "";
        isCheckLogin = true;
    }
}

const switchBtn = document.querySelector("#switch");
const planMonthly = document.querySelector(".plan-monthly");
const planYearly = document.querySelector(".plan-yearly");
const allPlansPrice = document.querySelectorAll(".plan > span");
const allPickItemsInputs = document.querySelectorAll(".pick-item > input");

function changePlan() {
    console.log("click " + switchBtn.checked);
    if (!switchBtn.checked) {
        planMonthly.style.color = "var(--denim, #022959)";
        planYearly.style.color = "var(--grey, #9699aa)";
        allPlansPrice[0].textContent = "$9/mo";
        allPlansPrice[1].textContent = "$12/mo";
        allPlansPrice[2].textContent = "$15/mo";
    }
    // yearly selected
    else {
        planYearly.style.color = "var(--denim, #022959)";
        planMonthly.style.color = "var(--grey, #9699aa)";
        allPlansPrice[0].textContent = "$90/yr";
        allPlansPrice[1].textContent = "$120/yr";
        allPlansPrice[2].textContent = "$150/yr";
    }
}

switchBtn.addEventListener("click", function () {
    changePlan();
    selectPlan();
});

function selectPlan() {
    const allPlans = document.querySelectorAll(".plan");
    allPlans.forEach((plan) => {
        if (plan.classList.contains("selected")) {
            let planTitle = plan.querySelector("h3");
            let planPrice = plan.querySelector("span");
            finishData.planTitle = planTitle.textContent;
            finishData.planPrice = planPrice.textContent;
            console.log(finishData);
        }
        plan.addEventListener("click", function () {
            allPlans.forEach((plan) => plan.classList.remove("selected"));
            plan.classList.add("selected");
            let planTitle = plan.querySelector("h3");
            let planPrice = plan.querySelector("span");
            finishData.planTitle = planTitle.textContent;
            finishData.planPrice = planPrice.textContent;
            console.log(finishData);
        });
    });

    pickAdd(switchBtn.checked);
}

function pickAdd(isChecked) {
    const allPickItemsPrice = document.querySelectorAll(".pick-item > span");
    if (isChecked) {
        allPickItemsPrice[0].textContent = "+$10/yr";
        allPickItemsPrice[1].textContent = "+$20/yr";
        allPickItemsPrice[2].textContent = "+$20/yr";
        finishData.itemData.map((item) => {
            item.itemPrice = item?.itemPrice.replace();
            item.itemPrice = item?.itemPrice.replace("1", "10");
            item.itemPrice = item?.itemPrice.replace("2", "20");
            item.itemPrice = item?.itemPrice.replace("/mo", "/yr");
        });
    }
    else {
        allPickItemsPrice[0].textContent = "+$1/mo";
        allPickItemsPrice[1].textContent = "+$2/mo";
        allPickItemsPrice[2].textContent = "+$2/mo";
        finishData.itemData.map((item) => {
            item.itemPrice = item?.itemPrice.replace("10", "1");
            item.itemPrice = item?.itemPrice.replace("20", "2");
            item.itemPrice = item?.itemPrice.replace("/yr", "/mo");
        });
    }
    pickItemsPrice();
}

function pickItemsPrice() {
    const allPickItems = document.querySelectorAll(".pick-item");
    allPickItems.forEach((pickItem) => {
        pickItem.addEventListener("click", function () {
            let itemTitle = pickItem.querySelector("h4");
            let itemPrice = pickItem.querySelector("span");
            let itemInput = pickItem.querySelector("input");
            if (itemInput.checked) {
                itemInput.checked = false;
                itemTitle.style.color = "var(--grey, #9699aa)";
                itemPrice.style.color = "var(--grey, #9699aa)";
                finishData.itemData = finishData.itemData.filter(
                    (item) => item.itemTitle != itemTitle.textContent
                );
            } else {
                itemInput.checked = true;
                itemTitle.style.color = "var(--denim, #022959)";
                itemPrice.style.color = "var(--denim, #022959)";
                finishData.itemData.push({
                    itemTitle: itemTitle.textContent,
                    itemPrice: itemPrice.textContent,
                });
            }
            console.log(finishData);
        });
    });
}

function finishingUp() {
    let totalCount = 0;
    let firstFinishItem = document.querySelectorAll(".finish-item")[0];
    let firstFinishItemPlanPrice = firstFinishItem.querySelector("span");
    let firstFinishItemPlanTitle = firstFinishItem.querySelector("h4");
    let changeText = firstFinishItem.querySelector("p");
    let finishAddOnsCard = document.querySelector(".finish-add-ons");
    let totalSpan = document.querySelector(".total-container > span");

    firstFinishItemPlanPrice.innerHTML = finishData.planPrice;
    totalCount += Number(finishData.planPrice.slice(1, -3));
    firstFinishItemPlanTitle.innerHTML = finishData.planTitle;

    finishAddOnsCard.innerHTML = "";
    finishData.itemData.forEach((item) => {
        console.log(item);
        totalCount += Number(item.itemPrice.slice(2, -3));
        finishAddOnsCard.innerHTML += `
      <div class="finish-item">
        <p>${item.itemTitle}</p>
        <span>${item.itemPrice.slice(1)}</span>
      </div>
    `;
    });
    totalSpan.innerHTML = `+$${totalCount}`;

    changeText.addEventListener("click", function () {
        allContentPages[3].classList.add("hide");
        allContentPages[1].classList.remove("hide");
    });
}
