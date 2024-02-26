
const route =(event)=>{
    //const path = event.target.getAttribute('data-path');
    event = event || window.event;
    console.log(event.target.href);
    console.log(event.target.pathname);
    event.preventDefault();
    window.history.pushState({},"",event.target.href);
    handleChange();
};

const routes ={
    404: '404.html',
    '/': 'home.html',
    '/about': 'about.html',
    '/contact': 'contact.html'
};

const handleChange = async()=>{
    const root = document.getElementById('root');
    const path = routes[window.location.pathname] || "";

    if(path){
        console.log(`Path is ${path}`)
        // fetch(`${path}`).then((data)=> data.text())
        // .then((htmll)=> root.innerHTML = htmll);
        const html = await fetch(path).then((data) => data.text());
        document.getElementById("root").innerHTML = html;
        document.title = path.substring(0,1).toUpperCase() + path.substring(1) + " - Page";
    }else{
        console.log(`Path is not found`);
        const html = await fetch("404.html").then((data) => data.text());
        document.getElementById("root").innerHTML = html;
        document.title = "404 - Page Not Found";
    
    }

}

window.onpopstate = handleChange;
window.route = route;
handleChange();