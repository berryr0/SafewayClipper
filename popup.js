const SAFEWAY_COUPON_PAGE_URL = "https://www.safeway.com/foru/coupons-deals.html";

function modifyDOM() {
    console.log('Tab script:');
    console.log(document.body);
    return document.body.innerHTML;
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  async function clipCoupons() {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});

    if (tab !== undefined) {
        console.log(tab);
        if (tab.url === SAFEWAY_COUPON_PAGE_URL) {
            const response = await chrome.tabs.sendMessage(tab.id, {message: "clipCoupons"});
            // do something with response here, not outside the function
            console.log(response);
        } else {
            // Open a tab

            await chrome.tabs.create({url: SAFEWAY_COUPON_PAGE_URL});
        }
        
    } else {
        console.log("It is undefined");
    }
    
  }


function clipCouponButtonPressed() {
    clipCoupons();
}

function main() {
    document.getElementById("press-me-btn").addEventListener("click", clipCouponButtonPressed)
}

document.addEventListener('DOMContentLoaded', function() {
    main();
}, false);