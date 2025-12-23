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
      <div className="flex items-center justify-center min-h-[80vh]">
        <HeroCarousel />
      </div>

      {/* About Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Ansar Group of Institutions</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Established in 2002, the Ansar Group of Institutions was founded on a powerful vision—to deliver quality education that nurtures not only academic excellence but also strong values and character. What began as a modest initiative has today evolved into one of Kerala's most respected residential and non-residential educational campuses.
              </p>
              <p>
                At Ansar, education goes beyond textbooks. The focus is on empowering hardworking and dedicated students with knowledge, confidence, and moral strength, enabling them to compete successfully at the highest levels.
              </p>
            </div>
            <button
              onClick={() => navigate("/about")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              See More →
            </button>
          </div>
          <div className="relative h-64 lg:h-96 w-full">
            <img
              src="/images/library.png"
              alt="Ansar Group of Institutions"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Principal's Message Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Principal's Message</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <img
              src="/images/principal.png"
              alt="Principal"
              className="w-full h-auto rounded-3xl shadow-lg object-cover aspect-[4/3]"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <p className="text-gray-600">
              Ansar Higher Secondary School has, within a remarkably short span of time, emerged as a centre of excellence in the field of education. With a clear vision and an unwavering commitment to quality, the institution continues to earn the trust and confidence of students, parents, and the wider community.
            </p>
            <p className="text-gray-600">
              At Ansar, we believe that every child possesses unique talents and limitless potential. Our mission is to help students identify these talents and develop them to the fullest...
            </p>
            <div className="mt-6">
              <p className="font-bold text-gray-900">Ismail Parambath</p>
              <p className="text-gray-500">Principal</p>
            </div>
            <button
              onClick={() => navigate("/about")}
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              See More →
            </button>
          </div>
        </div>
      </div>

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
