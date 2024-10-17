// Initialize EmailJS with your User ID
(function(){
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const project = document.getElementById("project").value;

    // EmailJS service and template IDs
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        project: project
    }).then(function(response) {
        document.getElementById("response-message").innerHTML = "<p>Message sent successfully!</p>";
        console.log("SUCCESS!", response.status, response.text);
        document.getElementById("contact-form").reset(); // Reset form
    }, function(error) {
        document.getElementById("response-message").innerHTML = "<p>Failed to send message. Please try again later.</p>";
        console.log("FAILED...", error);
    });
});
