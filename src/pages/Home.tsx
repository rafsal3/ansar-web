import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "@/components/HeroCarousel";
import AlumniByOccupation from "@/components/AlumniByOccupation";
import Facilities from "@/components/Facilities";
import { getAllNews, News } from "@/api/newsApi";
import { getAllEvents, Event } from "@/api/eventsApi";
import { API_BASE_URL } from "@/api/apiClient";
import "./Home.css";



const Home = () => {
  const navigate = useNavigate();
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [latestEvents, setLatestEvents] = useState<Event[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch latest 3 news
    const fetchNews = async () => {
      try {
        setLoadingNews(true);
        const response = await getAllNews({ limit: 3, page: 1, status: 'publish' });
        setLatestNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsError("Failed to load news");
      } finally {
        setLoadingNews(false);
      }
    };

    // Fetch latest 3 events
    const fetchEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await getAllEvents({ limit: 3, page: 1 });
        setLatestEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEventsError("Failed to load events");
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchNews();
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <HeroCarousel />
      <AlumniByOccupation />
      <Facilities />

      {/* Latest News Section */}
      <section className="latest-news-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Latest News</h2>
            <button
              className="see-more-btn see-more-desktop"
              onClick={() => navigate("/news")}
            >
              See More →
            </button>
          </div>

          {loadingNews ? (
            <div className="loading-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card"></div>
              ))}
            </div>
          ) : newsError ? (
            <div className="error-message">{newsError}</div>
          ) : latestNews.length === 0 ? (
            <div className="empty-message">No news available at the moment.</div>
          ) : (
            <div className="cards-grid">
              {latestNews.map((news) => (
                <div
                  key={news.id}
                  className="news-card"
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  <div className="card-image-wrapper">
                    {news.images && news.images.length > 0 ? (
                      <img
                        src={`${API_BASE_URL}${news.images[0].imageUrl}`}
                        alt={news.title}
                        className="card-image"
                      />
                    ) : (
                      <div className="card-image-placeholder">
                        <span>📰</span>
                      </div>
                    )}
                    <div className="card-category">{news.category}</div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{news.title}</h3>
                    <div className="card-meta">
                      <span className="card-date">{formatDate(news.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            className="see-more-btn see-more-mobile"
            onClick={() => navigate("/news")}
          >
            See More →
          </button>
        </div>
      </section>

      {/* Latest Events Section */}
      <section className="latest-events-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <button
              className="see-more-btn see-more-desktop"
              onClick={() => navigate("/events")}
            >
              See More →
            </button>
          </div>

          {loadingEvents ? (
            <div className="loading-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card"></div>
              ))}
            </div>
          ) : eventsError ? (
            <div className="error-message">{eventsError}</div>
          ) : latestEvents.length === 0 ? (
            <div className="empty-message">No events scheduled at the moment.</div>
          ) : (
            <div className="cards-grid">
              {latestEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-card"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <div className="card-image-wrapper">
                    {event.image ? (
                      <img
                        src={`${API_BASE_URL}${event.image}`}
                        alt={event.name}
                        className="card-image"
                      />
                    ) : (
                      <div className="card-image-placeholder">
                        <span>📅</span>
                      </div>
                    )}
                    <div className={`event-status ${event.status}`}>
                      {event.status === "upcoming" ? "Upcoming" : "Completed"}
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{event.name}</h3>
                    <div className="card-meta">
                      <span className="card-date">📍 {event.location}</span>
                      <span className="card-date">{formatDate(event.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            className="see-more-btn see-more-mobile"
            onClick={() => navigate("/events")}
          >
            See More →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
