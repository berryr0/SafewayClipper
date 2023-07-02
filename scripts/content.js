// Get all the clip coupon buttons
// and the load more button
function getClipCouponButtons(buttons) {
    let clipButtons = [];
    let loadButton = undefined;
    for (let i = 0; i < buttons.length; i++) {
        let buttonText = buttons[i].innerText;

        if (buttonText === "Clip Coupon") {
            clipButtons.push(buttons[i]);
        } else if (buttonText === "Load more") {
            loadButton = buttons[i];
        }
    }

    return [clipButtons, loadButton];
}

function clipCoupons() {
    console.log(document.body);
            let buttons = document.getElementsByTagName('button');

            let loadMoreButton, clipCouponButtons;
            let limt = 100;
            let attemptNum = 0;
            do {
                [clipCouponButtons, loadMoreButton] = getClipCouponButtons(buttons);
                // Clip all the coupons 
                for (let i = 0; i < clipCouponButtons.length; i++) {
                    clipCouponButtons[i].click();
                }

                // Load more Coupons
                if (loadMoreButton !== undefined) {
                    loadMoreButton.click();
                }

                attemptNum++;
            } while (loadMoreButton !== undefined && attemptNum < limt);
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");

        if (request.message === "clipCoupons") {
            clipCoupons();
        }
    }
  );