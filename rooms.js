"use strict"; // Enable strict mode

// Use window.onload to ensure the script runs after the page is fully loaded
window.onload = function () {
    function calculateCost() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const checkInDate = new Date(document.getElementById('checkInDate').value);
        const roomType = document.querySelector('input[name="roomType"]:checked').value;
        const nights = parseInt(document.getElementById('nights').value);
        const discount = document.querySelector('input[name="discount"]:checked').value;
        const adults = parseInt(document.getElementById('adults').value);
        const children = parseInt(document.getElementById('children').value);
        const checkOutDate = new Date(document.getElementById('checkOutDate').value);
        const oneDay = 24 * 60 * 60 * 1000;
        const totalNights = Math.round((checkOutDate - checkInDate) / oneDay);

        // Define in-season and out-of-season date ranges
        const inSeasonStart = new Date(checkInDate.getFullYear(), 5, 1); // June 1
        const inSeasonEnd = new Date(checkInDate.getFullYear(), 7, 31); // August 31

        // Calculate the room rate
        let roomRate;
        if (roomType === 'queen') {
            roomRate = checkInDate >= inSeasonStart && checkInDate <= inSeasonEnd ? 250.00 : 150.00;
        } else if (roomType === 'king') {
            roomRate = checkInDate >= inSeasonStart && checkInDate <= inSeasonEnd ? 250.00 : 150.00;
        } else if (roomType === 'suite') {
            roomRate = checkInDate >= inSeasonStart && checkInDate <= inSeasonEnd ? 350.00 : 210.00;
        }

        // Apply discounts
        if (discount === 'aaa' || discount === 'military') {
            roomRate *= discount === 'aaa' ? 0.9 : 0.8;
        }

        // Calculate taxes (12% of the after-discount room cost)
        const taxes = (roomRate * nights) * 0.12;

        // Calculate the total cost
        const totalCost = (roomRate * nights) + taxes;

        // Display the result or error message
        const resultDiv = document.getElementById('result');
        const messageDiv = document.getElementById('messageDiv');

        if (roomType === 'queen' && (adults + children) > 5) {
            messageDiv.innerText = "The room you selected will not hold your party.";
            resultDiv.innerHTML = '';
        } else if (roomType === 'king' && adults > 2) {
            messageDiv.innerText = "The room you selected will not hold your party.";
            resultDiv.innerHTML = '';
        } else if (roomType === 'suite' && (adults + children) > 6) {
            messageDiv.innerText = "The room you selected will not hold your party.";
            resultDiv.innerHTML = '';
        } else {
            messageDiv.innerText = '';
            resultDiv.innerHTML = `
                <p>Room Rate: $${roomRate.toFixed(2)} per night</p>
                <p>Discount: ${discount === 'none' ? 'None' : (discount === 'aaa' ? 'AAA/Senior (10%)' : 'Military (20%)')}</p>
                <p>Discounted Room Rate: $${(roomRate * (discount === 'none' ? 1 : (discount === 'aaa' ? 0.9 : 0.8))).toFixed(2)} per night</p>
                <p>Taxes: $${taxes.toFixed(2)}</p>
                <p>Total Cost: $${totalCost.toFixed(2)}</p>
            `;
        }
    }

    const estimateCostBtn = document.getElementById('estimateCostBtn');
    estimateCostBtn.addEventListener('click', calculateCost);
};
