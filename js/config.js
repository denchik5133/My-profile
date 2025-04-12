// Configuration object for the portfolio site
const config = {
    // Basic Information
    siteTitle: "Developer Portfolio",
    logo: "assets/logo.png",
    avatar: "assets/avatar.png", 
    nickname: "denchik",
    typingTexts: [
        "Game Modding Enthusiast",
        "Creative Problem Solver",
        "Technology Enthusiast",
        "Continuous Learner"
    ],
    description: "Passionate developer in web development and game modification. With a strong desire to create interesting projects and constantly develop my skills.",
    
    // About Section
    about: [
        "Hi, I'm a developer who started programming at the age of 17. For the past 6 years, I've been exploring different areas including web development and game modding in my spare time.",
        "I enjoy creating unique add-ons for various games, especially those that use Lua for modifications. My focus is on improving gameplay and exploring the creative possibilities these add-ons provide.",
        "When I'm not coding, I like to relax by playing various games. Not only do games serve as a great way to relax, but they also inspire me to work as a developer. I believe that every experience, whether it be coding or gaming, contributes to my growth and understanding of technology.",
        "I am always eager to learn new skills and take on interesting projects that challenge my creative and technical abilities."
    ],
    
    // Social Links
    social: [
        { name: "GitHub", icon: "fab fa-github", url: "https://github.com/denchik5133" },
        { name: "Discord", icon: "fab fa-discord", url: "https://discord.gg/CND6B5sH3j" },
        { name: "Steam", icon: "fab fa-steam", url: "https://steamcommunity.com/profiles/76561198405398290" },
    ],
    
    // Skills
    skills: [
        {
            name: "JavaScript",
            percentage: "30",
            description: "The primary language for web development. Creating complex interactive interfaces."
        },
        {
            name: "HTML/CSS",
            percentage: "45",
            description: "Creating adaptive and modern web interfaces using Flexbox, Grid and CSS animations."
        },
        {
            name: "Lua",
            percentage: "55",
            description: "Creating modifications and addons for games, especially for Garry's Mod and other Source games."
        },
        {
            name: "PHP",
            percentage: "40",
            description: "PHP is used to develop the server-side logic of web applications, allowing you to create dynamic web pages and interact with databases efficiently."
        },
        {
            name: "SQL",
            percentage: "30",
            description: "Database design, query optimization and administration of MySQL and PostgreSQL."
        },
        {
            name: "UI/UX Design",
            percentage: "50",
            description: "Creating prototypes and mockups of interfaces in Figma with a focus on user experience. Developing dynamic and responsive UI with a component-based approach."
        }
    ],

    games: [
        {
            title: "Garry's Mod",
            icon: "fas fa-gamepad",
            description: "A physics sandbox with endless possibilities for creativity and fun.",
            platform: "Steam",
            hours: "8,500+"
        },
        {
            title: "Among Us",
            icon: "fas fa-user-astronaut",
            description: "Find the impostor before they eliminate everyone.",
            platform: "Steam",
            hours: "400+"
        },
        {
            title: "Counter-Strike",
            icon: "fas fa-crosshairs",
            description: "Tactical first-person shooter that requires strategy and teamwork.",
            platform: "Steam",
            hours: "6,000+"
        },
        {
            title: "Portal 2",
            icon: "fas fa-robot",
            description: "Competitive 5v5 tactical shooter with unique character abilities.",
            platform: "Steam",
            hours: "1,200+"
        },
        {
            title: "GTA V",
            icon: "fas fa-car",
            description: "Open-world action-adventure game with a rich narrative and diverse gameplay.",
            platform: "Steam, Epic Games",
            hours: "1,500+"
        },
        {
            title: "Destiny 2",
            icon: "fas fa-space-shuttle",
            description: "A first-person puzzle game in which players use a portal gun to solve challenges and overcome obstacles. The game offers an exciting story and unique gameplay based on physics.",
            platform: "Steam",
            hours: "2000+"
        },
        {
            title: "Metro Exodus",
            icon: "fas fa-subway",
            description: "Part of the Metro series, this game is a story-driven first-person shooter set in a post-apocalyptic world. Players explore destroyed cities and underground tunnels, facing dangerous enemies and making difficult decisions. Includes survival elements and a deep story.",
            platform: "Steam",
            hours: "3000+"
        },
        {
            title: "Left 4 Dead 2",
            icon: "fas fa-solid fa-biohazard",
            description: "Cooperative first-person shooter focusing on teamwork to survive against zombies.",
            platform: "Steam",
            hours: "4,500+"
        },
    ],
    
    // Background Configuration
    background: {
        type: "particles", // dark, gradient, image, video, particles
        blur: 1,
        image: "https://images.unsplash.com/photo-1607743386760-88f10e489096?auto=format&fit=crop&w=1920&q=80",
        video: "",
        effects: {
            snow: false,
            rain: false
        },
        options: {
            particles: {
                number: { value: 80 },
                color: { value: "#0078D7" },
                opacity: { value: 0.5 },
                size: { value: 3 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#FF6B00",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2
                }
            }
        },
        holidayThemes: true
    },
    
    // Theme Settings
    theme: {
        primary: "#0078D7", // Blue
        secondary: "#FF6B00", // Orange
        background: "#0e1016", // Dark background
        surface: "#171923", // Card/panel color
        textPrimary: "#ffffff", // White text
        textSecondary: "#b3b3b3" // Gray text
    },
    
    // Footer
    footerText: "© 2024 All Rights Reserved | Made with ❤️ by denchik"
};