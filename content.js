document.addEventListener('DOMContentLoaded', function () {
  const chartContainer = document.getElementById('chart');
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Function to generate the contributions chart
function generateChart() {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const passedDays = Math.floor((currentDate - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  chartContainer.innerHTML = '';
  let dayCounter = 1;

  months.forEach((month, index) => {
    const daysInMonth = new Date(currentDate.getFullYear(), index + 1, 0).getDate();

    const monthRow = document.createElement('div');
    monthRow.classList.add('month-row');

    const monthName = document.createElement('div');
    monthName.classList.add('month-name');
    monthName.textContent = month;
    monthRow.appendChild(monthName);

    for (let i = 1; i <= daysInMonth; i++, dayCounter++) {
      const day = document.createElement('div');
      day.classList.add('day');
      if (dayCounter <= passedDays) {
        day.classList.add('passed');
      } else {
        day.classList.add('remaining');
      }
      monthRow.appendChild(day);
    }

    chartContainer.appendChild(monthRow);
  });
}

  // Function to render bookmarks horizontally or vertically
  function renderBookmarks(bookmarks, parentElement, isVertical = false) {
    parentElement.innerHTML = ""; // Clear previous content
    bookmarks.forEach((bookmark) => {
      const listItem = document.createElement("li");

      if (bookmark.url) {
        // Render bookmarks as links
        const link = document.createElement("a");
        link.href = bookmark.url;
        link.textContent = bookmark.title || "Unnamed Bookmark";
        link.target = "_blank";

        listItem.appendChild(link);
      } else if (bookmark.children) {
        // Render folders with click interaction
        const folderIcon = document.createElement("i");
        folderIcon.className = "fas fa-folder";
        const folderName = document.createElement("span");
        folderName.textContent = bookmark.title || "Unnamed Folder";

        listItem.appendChild(folderIcon);
        listItem.appendChild(folderName);

        listItem.addEventListener("click", () => {
          const verticalContainer = document.getElementById("vertical-container");
          const categoryContent = document.getElementById("category-content");
        
          // Toggle the active class to show/hide the vertical container
          if (verticalContainer.classList.contains("active")) {
            verticalContainer.classList.remove("active");
          } else {
            // Show vertical container and populate it with folder content
            document.querySelector("#vertical-container h3").textContent = bookmark.title || "Unnamed Folder";
            renderBookmarks(bookmark.children, categoryContent, true);
            verticalContainer.classList.add("active");
          }
        });
      }

      parentElement.appendChild(listItem);
    });
  }

  // Fetch and render bookmarks
  chrome.bookmarks.getTree((tree) => {
    const bookmarksBar = document.getElementById("bookmarks-bar");
    const topLevelBookmarks = tree[0].children.find((node) => node.title === "Bookmarks");

    if (topLevelBookmarks) {
      renderBookmarks(topLevelBookmarks.children, bookmarksBar);
    } else {
      console.error("No 'Bookmarks' folder found.");
    }
  });

  // Generate the contributions chart
  generateChart();
});