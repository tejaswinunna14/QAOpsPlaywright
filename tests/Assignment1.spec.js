import {test, expect} from '@playwright/test';

test('assignment', async({page})=>
{
    //step1
    const email = "tejaswinunna@gmail.com";
    const passsword = "Tejaswi@123";
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByPlaceholder("••••••").fill(passsword);
    await page.getByRole("button", {name:'Sign In'}).click();
    await expect(page.getByRole("link", {name:'Browse Events →'})).toBeVisible();

    //step2
    await page.locator("div a[href='/admin/events']").first().click();
    await page.getByPlaceholder("Event title").fill("Movie Release");
    await page.getByPlaceholder("Describe the event…").fill("I am super excited to be the part of movie release event");
    await page.getByPlaceholder("e.g. Bangalore").fill("Hyderabad");
    await page.getByPlaceholder("Venue name & address").fill("New Function Hall");
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-11-20T23:00');
    await page.getByPlaceholder("0.00").fill("1000");
    await page.getByPlaceholder("e.g. 500").fill("50");
    await page.getByRole("button", {name:'+ Add Event'}).click();

    //step3
    await page.locator("#nav-events").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("#event-card").first()).toBeVisible();
    const movieCard = page.locator("#event-card").filter({ hasText: "Movie Release" });
    await expect(movieCard).toBeVisible();
    await movieCard.getByRole("link", { name: "Book Now" }).click();

    //step4
    const seatText = await movieCard.getByText(/seats available|seats left/i).innerText();
    const seatsBeforeBooking = parseInt(seatText.split(" ")[0], 10);
    console.log("Seats before booking:", seatsBeforeBooking);

    //step5
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByPlaceholder("Your full name").fill("Anu");
    await page.getByPlaceholder("you@email.com").fill("anu@gmail.com");
    await page.locator("#phone").fill("8247677865");
    await page.locator("#confirm-booking").click();

    //step6
    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log(bookingRef);

    // Step 7: Verify booking in My Bookings page
    await page.locator("div a[href*='bookings']").first().click();
    await page.waitForLoadState("networkidle");
    const bookingCards = page.locator("#booking-card");
    const eventTitle = "Movie Release";
    const bookingCard = bookingCards.filter({hasText: bookingRef.trim()});
    await expect(bookingCard).toBeVisible();
    await expect(bookingCard).toContainText(eventTitle);
    
    // Step 8: Verify the available seat count after booking
    await page.locator("#nav-events").click();
    await page.waitForLoadState("networkidle");
    const movieCardAfterBooking = page.locator("#event-card").filter({ hasText: eventTitle });
    await expect(movieCardAfterBooking).toBeVisible();
    const seatCount = await movieCardAfterBooking.getByText(/seats available|seats left/i).innerText();
    const seatsAfterBooking = parseInt(seatCount.split(" ")[0], 10);
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

});