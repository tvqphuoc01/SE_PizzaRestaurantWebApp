let promoCodeArr = [];
let checkPromo = 0;
function addPromo() {
    var promoCode = document.getElementById("promo").value;
    var total = document.getElementById("totals");
    var button = document.getElementById("promoButton");
    var discount = document.getElementById("discount");
    var offer = document.getElementById("Offer");
    var totalsInput = document.getElementById("totalsInput");
    var total1 = total.innerHTML;
    var totalBeforeDiscount = "";
    for (let i = 0; i < total1.length; i++) {
        if(total1[i] !== ' ' && total1[i] !== '.') {
            totalBeforeDiscount += total1[i];
        }
    }
    totalBeforeDiscount = parseFloat(totalBeforeDiscount);
    var finalTotal = totalBeforeDiscount;
    for (let i = 0; i < promoCodeArr.length; i++) {
        if(promoCode === promoCodeArr[0] && checkPromo === 0) {
            finalTotal = totalBeforeDiscount - (totalBeforeDiscount / 100) * 10;
            checkPromo++;
        }
        if(promoCode === promoCodeArr[1] && checkPromo === 0) {
            finalTotal = totalBeforeDiscount - (totalBeforeDiscount / 100) * 20;
            offer.textContent = "20%";
            checkPromo++;
        }
    }
    finalTotal = finalTotal + " VND";
    total = document.getElementById("totals").textContent = finalTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    totalsInput.value = finalTotal;
    if (checkPromo !== 0) {
        button.style.display = "none";
        discount.style.display = "block";
    }
}

const loadPromo = async () => {
    try {
        const res = await fetch('promoCode.json');
        promoCodeArr = await res.json();
    } catch (err) {
        console.error(err);
    }
};

checkPromo = 0;
loadPromo();