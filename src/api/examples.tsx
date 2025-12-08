/**
 * Example Usage of API Integration
 * 
 * This file demonstrates how to integrate the APIs into your React components.
 * Copy these patterns into your actual pages.
 */

import { useState, useEffect } from 'react';
import {
    getAllAlumni,
    createAlumni,
    deleteAlumni,
    getAllMemories,
    createMemory,
    getAllJobs,
    getAllEvents,
    getAllNews,
    login,
    type Alumni,
    type Memory,
    type Job,
    type Event,
    type News
} from '@/api';

// ============================================
// Example 1: Fetching Alumni Data
// ============================================
export const AlumniListExample = () => {
    const [alumni, setAlumni] = useState<Alumni[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                setLoading(true);
                const data = await getAllAlumni({
                    limit: 10,
                    page: 1,
                    jobId: 1 // Optional: filter by job
                });
                setAlumni(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch alumni');
            } finally {
                setLoading(false);
            }
        };

        fetchAlumni();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Alumni List</h2>
            {alumni.map((person) => (
                <div key={person.id}>
                    <h3>{person.name}</h3>
                    <p>{person.email}</p>
                    <p>{person.course}</p>
                </div>
            ))}
        </div>
    );
};

// ============================================
// Example 2: Creating Alumni with Form
// ============================================
export const CreateAlumniForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        startYear: '',
        endYear: '',
        className: '',
        password: '',
        confirmPassword: '',
        jobId: 1
    });
    const [photo, setPhoto] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            // Create FormData object
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value.toString());
            });

            if (photo) {
                data.append('photos', photo);
            }

            const result = await createAlumni(data);
            console.log('Alumni created:', result);

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                course: '',
                startYear: '',
                endYear: '',
                className: '',
                password: '',
                confirmPassword: '',
                jobId: 1
            });
            setPhoto(null);

            alert('Alumni created successfully!');
        } catch (err: any) {
            console.error('Error creating alumni:', err);
            alert('Failed to create alumni: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />
            {/* Add more fields as needed */}
            <button type="submit" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Alumni'}
            </button>
        </form>
    );
};

// ============================================
// Example 3: Deleting Alumni
// ============================================
export const DeleteAlumniButton = ({ alumniId }: { alumniId: number }) => {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this alumni?')) {
            return;
        }

        try {
            setDeleting(true);
            await deleteAlumni(alumniId);
            alert('Alumni deleted successfully!');
            // Refresh the list or redirect
        } catch (err: any) {
            console.error('Error deleting alumni:', err);
            alert('Failed to delete alumni: ' + err.message);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <button onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
        </button>
    );
};

// ============================================
// Example 4: Fetching Memories
// ============================================
export const MemoriesListExample = () => {
    const [memories, setMemories] = useState<Memory[]>([]);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const data = await getAllMemories({ status: 'active' });
                setMemories(data);
            } catch (err) {
                console.error('Error fetching memories:', err);
            }
        };

        fetchMemories();
    }, []);

    return (
        <div>
            <h2>Memories</h2>
            {memories.map((memory) => (
                <div key={memory.id}>
                    <p>{memory.description}</p>
                    <p>Status: {memory.status}</p>
                </div>
            ))}
        </div>
    );
};

// ============================================
// Example 5: Creating Memory with Multiple Photos
// ============================================
export const CreateMemoryForm = () => {
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<FileList | null>(null);
    const [userId] = useState(1); // Get from auth context

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('status', 'active');
            formData.append('userId', userId.toString());

            // Add multiple photos
            if (photos) {
                Array.from(photos).forEach((photo) => {
                    formData.append('photos', photo);
                });
            }

            const result = await createMemory(formData);
            console.log('Memory created:', result);

            setDescription('');
            setPhotos(null);
            alert('Memory created successfully!');
        } catch (err: any) {
            console.error('Error creating memory:', err);
            alert('Failed to create memory: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setPhotos(e.target.files)}
            />
            <button type="submit">Create Memory</button>
        </form>
    );
};

// ============================================
// Example 6: Login Form
// ============================================
export const LoginFormExample = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await login({ email, password });

            console.log('Logged in:', response.user);
            console.log('Token stored in localStorage');

            // Redirect to dashboard or home
            window.location.href = '/dashboard';
        } catch (err: any) {
            console.error('Login failed:', err);
            alert('Login failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

// ============================================
// Example 7: Fetching Multiple Resources
// ============================================
export const DashboardExample = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch multiple resources in parallel
                const [jobsData, eventsData, newsData] = await Promise.all([
                    getAllJobs(),
                    getAllEvents({ status: 'upcoming' }),
                    getAllNews({ limit: 5 })
                ]);

                setJobs(jobsData);
                setEvents(eventsData);
                setNews(newsData);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div>
            <h2>Dashboard</h2>

            <section>
                <h3>Jobs ({jobs.length})</h3>
                {/* Render jobs */}
            </section>

            <section>
                <h3>Upcoming Events ({events.length})</h3>
                {/* Render events */}
            </section>

            <section>
                <h3>Latest News ({news.length})</h3>
                {/* Render news */}
            </section>
        </div>
    );
};

// ============================================
// Example 8: Update OccupationAlumni.tsx to use real API
// ============================================
// Replace the mockAlumniData in OccupationAlumni.tsx with:
/*
const OccupationAlumni = () => {
  const { occupation } = useParams<{ occupation: string }>();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  const decodedOccupation = occupation ? decodeURIComponent(occupation) : '';

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        // Get the job ID from occupation name (you'll need a mapping)
        const jobId = getJobIdFromOccupation(decodedOccupation);
        const data = await getAllAlumni({ jobId });
        setAlumni(data);
      } catch (err) {
        console.error('Error fetching alumni:', err);
      } finally {
        setLoading(false);
      }
    };

    if (decodedOccupation) {
      fetchAlumni();
    }
  }, [decodedOccupation]);

  if (loading) return <div>Loading...</div>;

  // Rest of your component...
};
*/
