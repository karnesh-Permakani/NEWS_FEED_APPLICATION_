const apiKey = "YOUR_API_KEY_HERE"; // Replace with your NewsAPI key
const newsContainer = document.getElementById("newsContainer");
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const loading = document.getElementById("loading");

async function getNews(query = "latest") {
  loading.classList.remove("hidden");
  newsContainer.innerHTML = "";
  try {
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2025-09-09&sortBy=publishedAt&apiKey=42a7686c9957427a8940ceec8e319fcd`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.articles?.length > 0) {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = `<p style="text-align:center;">No results found for "<b>${query}</b>".</p>`;
    }
  } catch (error) {
    newsContainer.innerHTML = `<p style="text-align:center;color:red;">Error fetching news. Please try again later.</p>`;
  } finally {
    loading.classList.add("hidden");
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = articles.map(article => `
    <div class="article">
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" alt="">
      <h2>${article.title}</h2>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read more →</a>
    </div>
  `).join("");
}

searchBtn.addEventListener("click", () => {
  const query = searchBox.value.trim();
  getNews(query || "latest");
});

// Allow pressing Enter to search
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

getNews(); // Load default news on start
