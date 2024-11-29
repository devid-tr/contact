let pixabayApiKey = import.meta.env.VITE_PIXABAY_API_KEY;
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = pixabayApiKey;
    const keywords = ['galaxy', 'nebula', 'stars', 'cosmos', 'planets', 'aurora', 'milky way', 'supernova', 'space'];
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

    const fetchImage = async () => {
        try {
            const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${randomKeyword}&image_type=photo&orientation=horizontal&per_page=3`);
            const data = await response.json();

            if (data.hits && data.hits.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.hits.length);
                const imageUrl = data.hits[randomIndex].largeImageURL;
                let image=document.querySelector('.image')
                image.style.backgroundImage = `url(${imageUrl})`;
            } else {
                console.error('No images found for the specified keywords.');
            }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    fetchImage();
});


import { Client, Databases, ID } from "appwrite";

let projectId='672ba41900048b82db32'
let databaseId='672ba57200092ef16cd6'
let collectionId='67483d8b0027af59a89c'

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId)

const databases = new Databases(client);

let contactForm = document.getElementById('contact-form')
let contact_container=document.querySelector('.contactContainer')
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value
    let data = `name: ${name}\nemail: ${email}\nmessage: ${message}\n`
    try {
        await databases.createDocument(
            databaseId,
            collectionId,
            ID.unique(),
            { "docs": data }
        );
        contact_container.classList.add('somecss');
        contact_container.innerHTML = `<h2>Thank you for reaching out!</h2>  <p>We'll get back to you soon!</p>`;
    } catch (error) {
        contact_container.classList.add('somecss');
        contact_container.innerHTML = `<h2>Oops! Something went wrong.</h2> <p>Please try again later.</p>`;
    }
})