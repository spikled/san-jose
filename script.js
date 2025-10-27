let events = [
    {
        id: '1',
        title: '🏆 INABANGA CHRISTMAS CUP 2025',
        date: '2025-11-15',
        location: 'Barangay San Jose, Inabanga',
        description: 'Get ready to represent our barangay with pride! Join us for the upcoming INABANGA CHRISTMAS CUP 2025!\n\nInterested players for Basketball, Volleyball Men & Women are requested to coordinate with the Team Coach, Sports Coordinator or SK Chairperson for the requirements.\n\nGuidelines: 15-30 yrs old\n\nKey Dates:\n• Submission: October 31, 2025\n• League Opening: November 9, 2025\n• Start of the Game: November 15, 2025\n\nContact:\n• Team Coach - Joseph Betinol\n• Sports Coordinator - James Wally\n• SK Chairperson - Vhamae Sendrijas Lawas'
    }
];
let editingId = null;
let submissions = [];
let isAdminLoggedIn = false;

// Admin credentials (You should change these!)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function renderEvents() {
    const grid = document.getElementById('eventsGrid');
    
    if (events.length === 0) {
        grid.innerHTML = '<div class="no-events">No events scheduled yet. Add your first event above!</div>';
        return;
    }

    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    grid.innerHTML = sortedEvents.map(event => `
        <div class="event-card">
            <div class="event-date">${formatDate(event.date)}</div>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-location">📍 ${event.location}</div>
            <p class="event-description">${event.description.replace(/\n/g, '<br>')}</p>
        </div>
    `).join('');
}

function renderSubmissions() {
    const list = document.getElementById('submissionsList');
    
    if (submissions.length === 0) {
        list.innerHTML = '<p style="color: #64748b; text-align: center;">No teams registered yet. Be the first to register!</p>';
        return;
    }

    list.innerHTML = submissions.map(sub => `
        <div class="submission-card">
            <h4>${sub.teamName}</h4>
            <p><strong>Captain:</strong> ${sub.captainName}</p>
            <p><strong>Contact:</strong> ${sub.contactNumber}</p>
            <span class="sport-badge ${sub.sport.toLowerCase().includes('basketball') ? 'basketball' : 'volleyball'}">
                ${sub.sport}
            </span>
        </div>
    `).join('');
}

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teamName = document.getElementById('teamName').value;
    const captainName = document.getElementById('captainName').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const sport = document.getElementById('sport').value;

    const submission = {
        id: Date.now().toString(),
        teamName,
        captainName,
        contactNumber,
        sport,
        timestamp: new Date().toLocaleString()
    };

    submissions.push(submission);
    this.reset();
    renderSubmissions();

    // Show success message
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);

    // Scroll to submissions
    document.getElementById('submissionsList').scrollIntoView({ behavior: 'smooth' });
});

renderEvents();
renderSubmissions();
