document.addEventListener('DOMContentLoaded', function () {
  const cardContainer = document.getElementById('songs');

  // Function to create a song card
  function createSongCard(song) {
    const card = document.createElement('div');
    card.classList.add('card');

    // Create image element
    const songImg = document.createElement('img');
    songImg.src = song.imageUrl;
    songImg.alt = song.title; // Update this line to use song.title
    songImg.classList.add('card-image');
    // Open the song URL in a new tab on image click
    songImg.addEventListener('click', function () {
      window.open(song.url, '_blank');
    });
    card.appendChild(songImg);

    // Create heading for the song name
    const songName = document.createElement('h3');
    songName.textContent = song.title; // Update this line to use song.title
    card.appendChild(songName);

    // Create time element for the year recorded
    const yearRecorded = document.createElement('time');
    yearRecorded.textContent = song.year;
    card.appendChild(yearRecorded);

    // Create span element for the duration
    const duration = document.createElement('span');
    duration.textContent = formatDuration(song.duration);
    card.appendChild(duration);

    // Append the card to the container
    cardContainer.appendChild(card);
  }

  // Iterate through songs and create cards
  songs.forEach(song => {
    createSongCard(song);
  });

  // Function to format song duration (in seconds) to minutes:seconds
  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
});
