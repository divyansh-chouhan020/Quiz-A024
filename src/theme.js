// theme.js
(function () {
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode'); // Add dark mode class if set
    }

    // Toggle theme on button click
    document.getElementById('theme-toggle').addEventListener('click', function () {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        // Save the preference in local storage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
})();

