let from = document.getElementById('myForm');

from.addEventListener('submit',function(e){
    e.preventDefault()

    let search = document.getElementById('search').value;
    let originalName = search.split(' ').join('');

    fetch("https://api.github.com/users/" + originalName)
    .then((result) => result.json())
    .then((data) => {
        document.getElementById('image').innerHTML=
        `<a href="https://www.github.com/${originalName}" target="_blank">
        <img class="rounded-circle rounded mx-auto d-block" width="200" height="200" src="${data.avatar_url}"/>
        </a>
        `
    
        document.getElementById('table').innerHTML =   
        `
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Location</th>
                <th scope="col">Public Repos</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.location}</td>
                <td>${data.public_repos}</td>
            </tr>
        </tbody>
        `
    });

    fetch(`https://api.github.com/users/${originalName}/repos?per_page=100`)
    .then((result) => result.json())
    .then((data) =>{
        document.getElementById("repos").innerHTML = ``;
        document.getElementById("repos").innerHTML += 
        `
        <thead>
            <tr>
                <th scope="col">Number</th>
                <th scope="col">Repo Name</th>
                <th scope="col">Language</th>
                <th scope="col">Size</th>
                <th scope="col">Stars</th>
                <th scope="col">Github</th>
            </tr>
        </thead>
        `
        Object.keys(data).forEach(function(key) {
            document.getElementById("repos").innerHTML +=
            `
            <tbody>
                <tr>
                    <td>${Number(key) + 1}</td>
                    <td>${data[key].name + 1}</td>
                    <td>${data[key].language == null ? "---" : data[key].language}</td>
                    <td>${Number(data[key].size)/1000} MB</td>
                    <td>${data[key].stargazers_count}</td>
                    <td><a href="${data[key].html_url}" target="_blank"><button class="btn-search">Link</button></a></td>
                </tr>
            </tbody>
            `
        });
    });
});
        