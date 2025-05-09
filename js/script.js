// Full list of epic songs - Array of objects (with title and liked status)
const epicMix = [
  { title: "Time to Pretend", liked: false },
  { title: "O-o-oh Child", liked: false },
  { title: "Wish You Were Here", liked: false },
  { title: "Heroes", liked: false },
  { title: "I Put a Spell on You", liked: false },
  { title: "Call Me", liked: false },
  { title: "Paper Planes", liked: false },
  { title: "Jolene", liked: false },
  { title: "You Don't Own Me", liked: false },
  { title: "Fast Car", liked: false },
  { title: "Run the World (Girls)", liked: false },
  { title: "Superstition", liked: false },
  { title: "Sweet Child o' Mine", liked: false },
  { title: "Bohemian Rhapsody", liked: false },
  { title: "Like a Rolling Stone", liked: false },
  { title: "Smells Like Teen Spirit", liked: false },
  { title: "Respect", liked: false },
  { title: "Good Vibrations", liked: false },
  { title: "Johnny B. Goode", liked: false },
  { title: "Purple Haze", liked: false },
  { title: "Bridge Over Troubled Water", liked: false },
  { title: "London Calling", liked: false },
  { title: "Walk This Way", liked: false },
  { title: "Hotel California", liked: false },
  { title: "Imagine", liked: false },
  { title: "What's Going On", liked: false },
  { title: "Born to Run", liked: false },
  { title: "Layla", liked: false },
  { title: "Stairway to Heaven", liked: false },
  { title: "Billie Jean", liked: false },
  { title: "Like a Prayer", liked: false },
  { title: "Hey Jude", liked: false },
  { title: "Hound Dog", liked: false },
  { title: "Let It Be", liked: false },
  { title: "What'd I Say", liked: false },
  { title: "Super Freak", liked: false },
  { title: "Every Breath You Take", liked: false },
  { title: "Crazy in Love", liked: false },
  { title: "Rolling in the Deep", liked: false },
  { title: "Happy", liked: false },
  { title: "Shape of You", liked: false },
  { title: "Blinding Lights", liked: false },
  { title: "At Seventeen", liked: false },
  { title: "Faith", liked: false },
  { title: "Oh Happy Day", liked: false },
];

// Get references to DOM elements
const mixList = document.querySelector(".mix");
const showListButton = document.querySelector(".show-list");
const shuffleButton = document.querySelector(".shuffle-list");
const sortButton = document.querySelector(".sort-az"); // Get the new sort button
const total = document.querySelector(".total");
const searchInput = document.querySelector("#search-input"); // Get reference to the search input

// Variable to store the currently displayed 10 songs
let currentDisplayedMix = []; // Declare the variable to hold the displayed list data


// Function to shuffle an array using Fisher-Yates (Knuth) algorithm
// Returns a new shuffled array, does not modify the original
const shuffleArray = function (array) {
    const arrayCopy = [...array]; // Create a shallow copy to work with
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]; // Swap elements
    }
    return arrayCopy; // Return the shuffled copy
};

// Function to shuffle the full list and select the first 'numItems'
const shuffleAndSelectSubset = function (array, numItems) {
    const shuffled = shuffleArray(array); // Shuffle the entire array
    return shuffled.slice(0, numItems); // Return the first 'numItems' elements
};

// Function to display the songs in the list element
const mixInfo = function (mix) {
  // Clear existing list items before adding new ones
  mixList.innerHTML = "";

  // Determine if we are on a large screen based on the CSS media query breakpoint
  const isLargeScreen = window.innerWidth >= 800;

  // The mix passed here will be the array of song objects to display
  mix.forEach(function (song, index) {
    let li = document.createElement("li");
    li.classList.add("song");

    // Determine the display number based on screen size and index
    let displayNumber;
    if (isLargeScreen) {
      // For large screens (two columns), apply the 1-5, 6-10 numbering
      if (index % 2 === 0) { // Even index (0, 2, 4, 6, 8) -> Left column (1-5)
        displayNumber = (index / 2) + 1;
      } else { // Odd index (1, 3, 5, 7, 9) -> Right column (6-10)
        displayNumber = ((index - 1) / 2) + 6;
      }
    } else {
      // For small screens, use standard sequential numbering
      displayNumber = index + 1;
    }


    // Determine initial icon class based on song.liked state
    const likeIconClass = song.liked ? 'fas fa-heart' : 'far fa-heart';
    // Keep the like-button class for event delegation
    const likeButtonClass = 'like-button';


    // Generate the HTML for the list item, including the calculated number, title, and like icon
    li.innerHTML = `
      <span class="song-number">${displayNumber}.</span>
      <span class="song-title">${song.title}</span> <span class="like-container"> <i class="${likeIconClass} ${likeButtonClass}" data-song-title="${song.title}"></i> </span>
    `;
    mixList.append(li);
  });
};

// Display the total number of songs AVAILABLE in the full list
// Update the text to reflect selecting 10 songs
total.innerText = `Selecting 10 songs from ${epicMix.length} available!`;


// Event listener for the "Show me!" button
// This shuffles the full list, gets a random 10, stores them, and displays with fade-in
// Event listener for the "Show me!" button
showListButton.addEventListener("click", function () {
  mixList.classList.remove("hidden"); // Fade in the list
  showListButton.classList.add("hide"); // Hide this button
  shuffleButton.classList.remove("hide"); // Show Shuffle button
  sortButton.classList.remove("hide"); // Show Sort button
  searchInput.classList.remove("hide"); // Show the search input field!

  // Shuffle the full list and get a random 10 songs
  const tenSongs = shuffleAndSelectSubset(epicMix, 10);
  currentDisplayedMix = tenSongs; // Store the displayed mix
  mixInfo(currentDisplayedMix); // Display these 10 songs
});

// Event listener for the "Shuffle!" button
// This shuffles the full list, gets a *new* random 10, stores them, and displays
shuffleButton.addEventListener("click", function () {
  // Shuffle the full list and get a new random 10 songs
  const tenSongs = shuffleAndSelectSubset(epicMix, 10);
  currentDisplayedMix = tenSongs; // *** Store the new displayed mix ***
  mixInfo(currentDisplayedMix); // Display these new 10 songs
});

// Event listener for the "Sort A-Z" button
// This sorts the currently displayed mix alphabetically by title and re-displays
sortButton.addEventListener("click", function () {
    // Sort the currentDisplayedMix array alphabetically by the 'title' property
    currentDisplayedMix.sort((a, b) => {
        const titleA = a.title.toUpperCase(); // Get titles and convert to uppercase for case-insensitive sort
        const titleB = b.title.toUpperCase();

        if (titleA < titleB) {
            return -1; // If titleA comes alphabetically before titleB
        }
        if (titleA > titleB) {
            return 1; // If titleA comes alphabetically after titleB
        }
        return 0; // If titles are the same
    });

    // Display the now sorted list
    mixInfo(currentDisplayedMix);
});

// Event listener for the like button clicks (already implemented)
mixList.addEventListener("click", function(event) {
     const clickedElement = event.target;
    const likeButton = clickedElement.closest('.like-button'); // Use closest to find the like button element

    if (likeButton) {
        event.preventDefault(); // Prevent default action (if any)

        // Get the song title from the data attribute on the like button element
        const songTitle = likeButton.dataset.songTitle;

        // Find the corresponding song object in the main epicMix array
        const song = epicMix.find(s => s.title === songTitle);

        if (song) {
            // Toggle the 'liked' state for the song object in our data
            song.liked = !song.liked;

            // --- Update the visual state of the icon in the DOM ---
            if (song.liked) {
                // If liked, change to solid heart
                likeButton.classList.remove('far'); // Remove outline class
                likeButton.classList.add('fas'); // Add solid class
                // like count update logic removed
            } else {
                // If unliked, change back to outline heart
                likeButton.classList.remove('fas'); // Remove solid class
                likeButton.classList.add('far'); // Add outline class
                // like count update logic removed
            }
        }
    }
});

// Add event listener to the search input for filtering
searchInput.addEventListener("input", function(event) {
  const inputValue = event.target.value.toLowerCase(); // Get the input value and convert to lowercase

  // Filter the currently displayed mix based on the input value
  const filteredMix = currentDisplayedMix.filter(song => {
      // Check if the song title includes the input value (case-insensitive)
      return song.title.toLowerCase().includes(inputValue);
  });

  // Display either the full current mix (if input is empty) or the filtered mix
  if (inputValue === "") {
      mixInfo(currentDisplayedMix); // If input is empty, show the full current mix
  } else {
      mixInfo(filteredMix); // If input has text, show the filtered mix
  }
});

// It's good practice to also update the numbering if the window is resized
window.addEventListener("resize", function() {
    // Only re-render if the mix list is currently visible
    if (!mixList.classList.contains('hidden') && currentDisplayedMix.length > 0) {
        mixInfo(currentDisplayedMix);
    }
});

// Note: The list starts hidden by default due to the "hidden" class in HTML.
// It's displayed by clicking the "Show me!" button.
