const input = document.querySelector('input');
const searchButton = document.querySelector('#searchButton');
const userInformationBG = document.querySelector('.user');
const switchTheme = document.querySelector('#switchTheme');

const data = {
    username: document.querySelector('.username a'),
    name: document.querySelector('.name'),
    bio: document.querySelector('.bio'),
    joinDate: document.querySelector('.joinDate'),
    repos: document.querySelector('#repos'),
    followers: document.querySelector('#followers'),
    following: document.querySelector('#following'),
    location: document.querySelector('.location'),
    socialMedia: document.querySelector('.social'),
    website: document.querySelector('.website a'),
    company: document.querySelector('.company'),
    profile: document.querySelector('.profilePhoto img')
}


const displayInfo = async () => {
    try{
        const url = `https://api.github.com/users/${input.value}`;
        const response = await axios.get(url);
        userInformation(response.data);
    }catch(e){
        input.value = '';
        input.setAttribute('placeholder','This user does not exist')
    }
}

searchButton.addEventListener('click', displayInfo);


const userInformation = (userData) => {

    const { avatar_url, login, name, bio, created_at, public_repos, followers, following, location, twitter_username, blog, company } = userData;
    
    styleBackground(userInformationBG);

    data.profile.setAttribute('src', avatar_url);
    data.username.textContent = login;
    data.username.setAttribute('href', `https://github.com/${login}`);
    data.name.textContent = name ?? 'This user has no name set';
    data.bio.textContent = bio ?? 'This profile has no bio';
    const date = created_at.split('T').shift().split('-');
    data.joinDate.textContent = `Joined on ${date[0]}`;
    data.repos.textContent = public_repos;
    data.followers.textContent = followers
    data.following.textContent = following;
    data.location.textContent = location ?? 'Not Available';
    data.socialMedia.textContent = twitter_username ?? 'Not Available';
    data.company.textContent = company ?? 'Not Available';
    data.website.textContent = (blog === '') ? 'Not Available' : 'Website';
    data.website.setAttribute('href', (blog  === '') ? '#' : blog);
    notAvailable(new Array(data.location, data.website, data.socialMedia, data.company));
    addIcons(data.location, data.website, data.socialMedia, data.company);
}

const addIcons = (location, website, socialMedia, company) => {
    const icons = {
        location: { class: ['fa-solid', 'fa-location-dot'], element: location },
        website: { class: ['fa-solid', 'fa-link'], element: website },
        socialMedia: { class: ['fa-brands', 'fa-twitter'], element: socialMedia },
        company: { class: ['fa-solid', 'fa-building'], element: company }
    };

    Object.values(icons).forEach((icon) => {
        const iconElement = document.createElement('i');
        iconElement.classList.add(...icon.class);
        icon.element.prepend(iconElement);
    })
}

const notAvailable = (arr) => {
    arr.forEach((element) => {
        if(element.textContent === 'Not Available'){
            element.style.opacity = 0.7;
        }
        else{
            element.style.opacity = 1;
        }
    })
} 


const styleBackground = (background) => {
    background.style.animation = 'effect 1.2s ease-in';
    background.style.opacity = 1; 
}

window.addEventListener('keypress', (event) => {
    event.key === 'Enter' ? displayInfo() : null;
})


switchTheme.textContent = 'LIGHT';
let isLight = false;
const icon = document.createElement('i');
icon.classList.add('fa-regular', 'fa-sun');
switchTheme.insertAdjacentElement('afterbegin', icon);

switchTheme.addEventListener('click', () => {
    document.body.style.animation = 'effect 0.7s ease-in-out';
    icon.classList.remove('fa-regular', 'fa-sun', 'fa-solid', 'fa-moon');
    (!isLight) ? lightTheme() : darkTheme();

    setTimeout(() => {
        document.body.style.animation = '';
    },600)
})


const setTheme = (isLight, theme, content, iconClass, iconSubClass, icon) => {
    (isLight) ? document.body.classList.add(theme) : document.body.classList.remove(theme);
    switchTheme.textContent = content;
    icon.classList.add(iconClass, iconSubClass);
    switchTheme.insertAdjacentElement('afterbegin', icon);
}
    
const lightTheme = () => {
    isLight = true;
    setTheme(isLight, 'light-theme', 'DARK', 'fa-solid', 'fa-moon', icon);
}

const darkTheme = () => {
    isLight = false;
    setTheme(isLight, 'light-theme', 'LIGHT', 'fa-regular', 'fa-sun', icon);
}