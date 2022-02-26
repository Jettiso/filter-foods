

async function getFood() {
    let response = await fetch('http://localhost:1337/api/appetizers');
    let result = await response.json();

    console.log(result);
}

getFood();