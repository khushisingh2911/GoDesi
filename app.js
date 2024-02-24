document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const selectedArtist = document.getElementById("selected-artist");
  const songCardsContainer = document.getElementById("songs");

  // Function to create and display social media links with icons
  function displaySocialLinks(artist) {
      const socialLinksElement = document.getElementById('social-links');
      socialLinksElement.innerHTML = ''; // Clear any existing content

      artist.urls.forEach(link => {
          const listItem = document.createElement('li');
          const anchor = document.createElement('a');
          anchor.href = link.url;
          anchor.target = '_blank';
          const socialMediaName = link.name.toLowerCase();
          const iconClass = socialMediaName === 'instagram' ? 'fab fa-instagram' : 'fab fa-twitter';
          anchor.innerHTML = `<i class="${iconClass}"></i> ${link.name}`;
          listItem.appendChild(anchor);
          socialLinksElement.appendChild(listItem);
      });
  }

  // Function to display songs for a selected artist
  function showArtistSongs(artist) {
      selectedArtist.textContent = artist.name;
      songCardsContainer.innerHTML = "";

      // Call displaySocialLinks to add the social media links with icons
      displaySocialLinks(artist);

      const artistSongs = songs.filter(
          (song) => song.artistId === artist.artistId && !song.explicit
      );

      artistSongs.forEach((song) => {
          const songCard = createSongCard(song);
          songCardsContainer.appendChild(songCard);
      });
  }

  // Function to create a song card
  function createSongCard(song) {
      const card = document.createElement('div');
      card.classList.add('card');

      const songImg = document.createElement('img');
      songImg.src = song.imageUrl;
      songImg.alt = song.title;
      songImg.classList.add('card-image');
      songImg.addEventListener('click', () => window.open(song.url, '_blank'));
      card.appendChild(songImg);

      const songName = document.createElement('h2');
      songName.textContent = song.title;
      card.appendChild(songName);

      const yearRecorded = document.createElement('time');
      yearRecorded.textContent = song.year;
      card.appendChild(yearRecorded);

      const duration = document.createElement('span');
      duration.textContent = formatDuration(song.duration);
      card.appendChild(duration);

      return card;
  }

  // Function to format song duration from seconds to M:SS format
  function formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Add buttons for each artist to the menu
  artists.forEach((artist) => {
      const artistButton = document.createElement("button");
      artistButton.classList.add('artist-button');
      artistButton.textContent = artist.name;
      artistButton.addEventListener("click", () => showArtistSongs(artist));
      menu.appendChild(artistButton);
  });

  // Display the songs for the first artist by default
  if (artists.length > 0) {
      showArtistSongs(artists[0]);
  }
});
