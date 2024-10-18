async function fetchContributorsFromContentMD(owner, repo, path) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.raw', // This header ensures you get the raw content of the file
    },
  });

  if (response.ok) {
    const readmeContent = await response.text();
    const contributorPattern =
      /- \*\*Name\*\*: (.+)\n- \*\*Role\*\*: (.+)\n- \*\*Institution\*\*: (.+)\n- \*\*GitHub Link\*\*: (https:\/\/github\.com\/[^\s]+)/g;

    const contributors = [...readmeContent.matchAll(contributorPattern)];
    return contributors;

    // You can now parse and display the readme content
    // return readmeContent
  } else {
    console.error('Failed to fetch the README.md');
  }
}
async function fetchContributorImageLink(owner, repo, path, username) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.raw', // This header ensures you get the raw content of the file
    },
  });

  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const regex = new RegExp(
    `^${username}\\.(?:${imageExtensions.join('|')})$`,
    'i'
  );

  if (response.ok) {
    const images = await response.text();
    const imagesArray = JSON.parse(images);
    const matchedImage = imagesArray.find(image => regex.test(image.name));
    if (matchedImage) {
      return matchedImage.download_url;
    }
  } else {
    console.error('Failed to fetch the README.md');
  }
}
function extractGitHubUsername(githubUrl) {
  // Regular expression to capture the username part of the GitHub URL
  const usernamePattern = /https:\/\/github\.com\/([a-zA-Z0-9_-]+)/;

  // Execute the regex on the GitHub URL
  const match = githubUrl.match(usernamePattern);

  if (match && match[1]) {
    return match[1].toLowerCase(); // Return the username
  } else {
    return null; //No match found
  }
}
function checkImageExists(url) {
  // Checks if the image with the github username exists in the images directory
  const img = new Image();
  return new Promise(resolve => {
    img.onload = function () {
      //Resource is available
      resolve(true);
    };

    img.onerror = function () {
      // Resource is not available
      resolve(false);
    };
    img.src = url;
  });
}

async function fetchContributorData() {
  try {
    const contributors = await fetchContributorsFromContentMD(
      'MoazamAli45',
      'Quiz-AppHactoberfest2024',
      'contribution/content.md'
    );

    const container = document.getElementById('contributors');
    const searchInput = document.getElementById('search-input');

    // Store contributors data in a local variable
    const contributorsData = contributors.map(contributor => ({
      name: contributor[1],
      role: contributor[2],
      githubUrl: contributor[4],
      username: extractGitHubUsername(contributor[4]),
    }));

    // Function to display contributors
    function displayContributors(filteredContributors) {
      container.innerHTML = ''; // Clear existing contributors
      filteredContributors.forEach(async contributor => {
        let avatarUrl = await fetchContributorImageLink(
          'MoazamAli45',
          'Quiz-AppHactoberfest2024',
          'contribution/images',
          contributor.username
        );

        if (avatarUrl == undefined) {
          // Use GitHub Avatar as fallback
          avatarUrl = `${contributor.githubUrl}.png?size=100`;
        }

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${avatarUrl}" alt="Avatar of ${contributor.name}">
          <h3>${contributor.name}</h3>
          <h4>${contributor.role}</h4>
          <a href="${contributor.githubUrl}" target="_blank">Github</a>
        `;
        container.appendChild(card);
      });
    }

    // Initial display of contributors
    displayContributors(contributorsData);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredContributors = contributorsData.filter(contributor =>
        contributor.name.toLowerCase().includes(searchTerm) || 
        contributor.role.toLowerCase().includes(searchTerm)
      );
      displayContributors(filteredContributors);
    });

  } catch (error) {
    console.error('Error fetching README:', error);
  }
}

// Call the function to load contributors on page load
window.onload = fetchContributorData;
