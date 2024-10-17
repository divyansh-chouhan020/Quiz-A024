function extractGitHubUsername(githubUrl) {
    // Regular expression to capture the username part of the GitHub URL
    const usernamePattern = /https:\/\/github\.com\/([a-zA-Z0-9_-]+)/;
    
    // Execute the regex on the GitHub URL
    const match = githubUrl.match(usernamePattern);
    
    if (match && match[1]) {
        return match[1].toLowerCase();  // Return the username
    } else {
        return null;  //No match found
    }
}
function checkImageExists(url) {
    // Checks if the image with the github username exists in the images directory
    const img = new Image();
    return new Promise((resolve)=>{
        img.onload = function() {
            //Resource is available
            resolve(true);
        };
        
        img.onerror = function() {
            // Resource is not available
            resolve(false);
        };
        img.src = url;
    })
   
}


function extractGitHubUsername(githubUrl) {
    // Regular expression to capture the username part of the GitHub URL
    const usernamePattern = /https:\/\/github\.com\/([a-zA-Z0-9_-]+)/;
    
    // Executing the regex on the GitHub URL
    const match = githubUrl.match(usernamePattern);
    
    if (match && match[1]) {
        // Username converted to lowercase
        return match[1].toLowerCase();  
    } else {
        return null;  //No match found
    }
}
async function fetchContributorData() {
        try {
            
            const response = await fetch('../contribution/content.md');
            const markdown = await response.text();
            console.log(markdown);

            // Extract contributors using regex
            const contributorPattern = /- \*\*Name\*\*: (.+)\n- \*\*Role\*\*: (.+)\n- \*\*Institution\*\*: (.+)\n- \*\*GitHub Link\*\*: (https:\/\/github\.com\/[^\s]+)/g;
                
            const contributors = [...markdown.matchAll(contributorPattern)];
            const container = document.getElementById('contributors');

            contributors.forEach(async contributor => {
                const name = contributor[1];
                    const role = contributor[2];
                    const institution = contributor[3];
                    const githubUrl = contributor[4];
                    const username = extractGitHubUsername(githubUrl)
                    let avatarUrl=`../contribution/images/${username}.jpg`
                    const exists= await checkImageExists(avatarUrl)
                        if (!exists) {
                            console.log("Image does not exist, using default avatar.");
                            // when the image is not available use Github Avatar
                           avatarUrl= `${githubUrl}.png?size=100`;
                        }
                    


                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${avatarUrl}" alt="Avatar of ${name}">
                    <h3>${name}</h3>
                    <a href="${githubUrl}" target="_blank">Github</a>
                `;
                container.appendChild(card);
           
        });
        } catch (error) {
            console.error("Error fetching README:", error);
        }
    }

    // Call the function to load contributors on page load
    window.onload = fetchContributorData;