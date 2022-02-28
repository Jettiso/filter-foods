let foodContainer = document.querySelector(".container");
// GET FOODS
async function getFood() {
    try {
        let response = await fetch(
            "http://localhost:1337/api/foods?populate=categories,image&fields=name,prize"
        );
        let result = await response.json();
        let data = result.data;

        data = data.map((data) => {
            const attributes = data.attributes;
            const name = attributes.name;
            const prize = attributes.prize;
            // category
            const categoryData = attributes.categories;
            let category = categoryData.data;

            category = category.map((category) => {
                const item = category.attributes;
                const name = item.name;

                return name;
            })
            
            // image
            const image = attributes.image;
            let imageData = image.data;
            
            imageData = imageData.map((img) => {
                const attr = img.attributes;
                const formats = attr.formats;
                const imgSmall = formats.small;
                const imgUrl = imgSmall.url;
                const localHost = 'http://localhost:1337';
                const image = `${localHost}${imgUrl}`;

                console.log(imgSmall);
                return image
            })
            return {name,prize,imageData,category};
        })

        return data;
        
    }
        catch (error) {
        console.log(error);
    }
}





// DISPLAY FOODS
function displayFoods(data) {
    let foods = data.map( (item) => {
        return `<div class="card">
        <div class="imgWrapper">
            <img src="${item.imageData}" alt="">
            <h1 class="name">${item.name}</h1>
        </div>
        <h3 class="prize">$${item.prize}</h3>
        <h4 class="category">${item.category}</h4>
    </div>`;
    })

    foods = foods.join('');
    foodContainer.innerHTML = foods;
} 


// DISPLAY ON DOCUMENT LOAD
document.addEventListener('DOMContentLoaded', () => {
    getFood().then((data) => {
        displayFoods(data);
    });
})