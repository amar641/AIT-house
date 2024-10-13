const chatBox = document.getElementById('chat-box');
const inputContainer = document.getElementById('input-container');

// House system data
const houseSystem = {
    "Chhatrapati Shivaji Maharaj": {
        trivia: "Named after the great Maratha warrior king, this house stands for leadership and valor.",
        facultyIC: "Prof MB Lonare",
        facultyRepresentatives: [
            "Mr. Vijay Karra", 
            "Mr. Sandeep Sampleti", 
            "Dr. SM Gaikwad", 
            "Prakash K"
        ],
        beMentors: [
            { name: "Piyush", contact: "7905061506" },
            { name: "Anushna Panwar", contact: "9971081972" }
        ],
        captain: { name: "Pratham Kumar", contact: "7037719984" },
        viceCaptain: [
            { name: "Shivang Kumar", contact: "6395962392" },
            { name: "Khushi Yadav", contact: "9256517911" }
        ]
    },
    "Raja Krishnadevaraya": {
        trivia: "This house is inspired by the Vijayanagara emperor, a symbol of wisdom and strength.",
        facultyIC: "Dr. Pritee Purohit",
        facultyRepresentatives: [
            "Mr. Sukumar Chaughule", 
            "Mr. Yuvraj Gholap", 
            "Ms. Sita Yadav", 
            "A Jirgale"
        ],
        beMentors: [
            { name: "Shivram", contact: "9351447398" },
            { name: "Ritika", contact: "8983829429" }
        ],
        captain: { name: "Rohit Kumar", contact: "9462007939" },
        viceCaptain: [
            { name: "Piyush Saini", contact: "9599478220" },
            { name: "Kritika", contact: "6267007012" }
        ]
    },
    "Maharana Pratap": {
        trivia: "Inspired by the fearless Rajput warrior Maharana Pratap, this house symbolizes bravery and resilience.",
        facultyIC: "Dr. Ashwini Sapkal",
        facultyRepresentatives: [
            "Mr. Girish Kapse", 
            "Ms. Sushma Shirke", 
            "Mr. Anand Ramgude", 
            "Rohan Sonawane"
        ],
        beMentors: [
            { name: "Pranay Puniya", contact: "7851847604" },
            { name: "Aditi More", contact: "9501501733" }
        ],
        captain: { name: "Krishan Kumar", contact: "8949189900" },
        viceCaptain: [
            { name: "Shivam Sharma", contact: "8354909643" },
            { name: "Ritika Kumari", contact: "8224693065" }
        ]
    },
    "Samrat Ashoka": {
        trivia: "Named after Emperor Ashoka, this house embodies peace, knowledge, and strength.",
        facultyIC: "Prof JB Jawale",
        facultyRepresentatives: [
            "Dr. Dipika Birari", 
            "Mr. Anup Kadam", 
            "Ms. Gouri Bhasale", 
            "Pravin Sangle"
        ],
        beMentors: [
            { name: "Ayush Ojha", contact: "6264389700" },
            { name: "Akriti Singh", contact: "7457924466" }
        ],
        captain: { name: "Ankit Yadav", contact: "7494920441" },
        viceCaptain: [
            { name: "Akash Singh", contact: "9571266507" },
            { name: "Sunandha", contact: "9571067672" }
        ]
    }
};

let userSelections = {};

// Append bot message
function botMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Append user message
function userMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Clear input container and inject new buttons
function injectButtons(buttons) {
    inputContainer.innerHTML = '';  // Clear existing buttons
    buttons.forEach(btn => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = btn.label;
        buttonElement.onclick = () => btn.callback(btn.label);
        inputContainer.appendChild(buttonElement);
    });
}

// Start the chatbot
function startChat() {
    botMessage("👋 Hi there! Welcome to the House Information Bot! 🎉");
    botMessage("Which house would you like to know more about today?");

    const houseButtons = Object.keys(houseSystem).map(house => ({
        label: house,
        callback: handleHouseSelection
    }));
    injectButtons(houseButtons);
}

// Handle house selection
function handleHouseSelection(house) {
    userSelections.house = house;
    userMessage(house);

    const selectedHouse = houseSystem[house];
    
    botMessage(`Wow! You selected the <strong>${house}</strong> house!`);
    botMessage(`${selectedHouse.trivia}`);
    botMessage("Would you like to know about their Faculty IC first or jump straight to the Captains and Vice Captains?");
    
    const detailButtons = [
        { label: "Faculty IC", callback: () => showFacultyIC(house) },
        { label: "Captains", callback: () => showCaptains(house) }
    ];
    injectButtons(detailButtons);
}

// Show Faculty IC information
function showFacultyIC(house) {
    const selectedHouse = houseSystem[house];
    userMessage("Faculty IC");
    botMessage(`The Faculty IC of <strong>${house}</strong> is <strong>${selectedHouse.facultyIC}</strong>.`);
    
    botMessage("Would you like to hear about the Faculty Representatives next?");
    injectButtons([{ label: "Yes", callback: () => showFacultyReps(house) }, { label: "No", callback: () => showCaptains(house) }]);
}

// Show Faculty Representatives
function showFacultyReps(house) {
    const selectedHouse = houseSystem[house];
    userMessage("Yes");
    botMessage(`The Faculty Representatives of <strong>${house}</strong> are: <br> ${selectedHouse.facultyRepresentatives.join(', ')}`);
    
    botMessage("Would you like to proceed to the Captains and Vice Captains?");
    injectButtons([{ label: "Yes", callback: () => showCaptains(house) }, { label: "No", callback: endChat }]);
}

// Show Captains and Vice Captains
function showCaptains(house) {
    const selectedHouse = houseSystem[house];
    userMessage("Captains");
    botMessage(`<strong>Captain:</strong> ${selectedHouse.captain.name} (${selectedHouse.captain.contact})`);
    botMessage(`<strong>Vice Captains:</strong> ${selectedHouse.viceCaptain.map(vc => `${vc.name} (${vc.contact})`).join(', ')}`);
    
    botMessage("Would you like to know about the BE Mentors?");
    injectButtons([{ label: "Yes", callback: () => showBEMentors(house) }, { label: "No", callback: endChat }]);
}

// Show BE Mentors
function showBEMentors(house) {
    const selectedHouse = houseSystem[house];
    userMessage("Yes");
    botMessage(`The BE Mentors for <strong>${house}</strong> are: <br> ${selectedHouse.beMentors.map(m => `${m.name} (${m.contact})`).join(', ')}`);
    
    botMessage("That's all the information about the house. Would you like to view another house?");
    const restartButtons = [{ label: "Yes", callback: startChat }, { label: "No", callback: endChat }];
    injectButtons(restartButtons);
}

// End the chat
// End the chat and redirect to the previous page
// End the chat and go back to the previous page
function endChat() {
    userMessage("No");
    botMessage("Thank you for using the House Information Bot! Have a great day! 👋");

    // Clear buttons
    inputContainer.innerHTML = '';

    // Redirect back to the previous page after 2 seconds
    setTimeout(() => {
        window.history.back();  // Go back to the previous page
    }, 1000);  // 2 seconds delay before redirecting
}



// Initialize chat on page load
startChat();
