let from = document.getElementById('myForm');

from.addEventListener('submit',function(e){
    e.preventDefault()

    let search = document.getElementById('search').value
    let originalName = search.split(' ').join('')
    document.getElementById("result").innerHTML = ""
    //alert(search);
    //alert(originalName);
    fetch("https://api.github.com/users/"+originalName)
    .then((result) => result.json())
    .then((data) => {
        console.log(data)
        // console.log(data.name)
        document.getElementById("result").innerHTML = `<a target="_blank" href="https://www.github.com/${originalName}"> <img src="${data.avatar_url}"/></a>`
        // document.getElementById("result").innerHTML = `<img src="${data.avatar_url}"/>`
        // document.getElementById("result").innerHTML = `<a target="_blank" href="https://www.github.com/${originalName}"></a>`
    })
});