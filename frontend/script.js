document.addEventListener("DOMContentLoaded", () => {
    const eventListContainer = document.getElementById('event-list'); // Make sure you have an element with this ID in your HTML

    // Fetch events from your backend API
    fetch('http://localhost:5000/api/events')
        .then(response => response.json())
        .then(data => {
            console.log("Events fetched from backend:", data);
            
            if (data.message === "success" && data.data.length > 0) {
                // Optional: Render events on the webpage if eventListContainer exists
                data.data.forEach(event => {
                    console.log(event.title);
                });
            }
        })
        .catch(error => console.error('Error fetching events:', error));
});