let hpCharacters = [];
    function myFunction() {
        var x = document.getElementById("search-bar");
        var y = document.getElementById("nav-list");
            if (x.style.display === "none") {
                x.style.display = "block";
                y.style.display = "none";
            } else {
                x.style.display = "none";
                y.style.display = "flex";
                const searchBar = document.getElementById('searchBar');
                searchBar.addEventListener('keyup', (e) => {
                    const searchString = e.target.value.toLowerCase();
                    console.log(searchString)
                    const dishesList = document.getElementById('dishesList');
                    const filteredDishes = hpCharacters.filter((dish) => {
                        return (
                            dish.dishName.toLowerCase().includes(searchString) ||
                            dish.price.toLowerCase().includes(searchString)
                        );
                    });
                    if(searchString != '') {
                        displayCharacters(filteredDishes);
                    } else {
                        displayCharacters([])
                    }
                })
            }
    }

    const loadCharacters = async () => {
        try {
            const res = await fetch('dishes.json');
            hpCharacters = await res.json();
        } catch (err) {
            console.error(err);
        }
    };

    const displayCharacters = (dish) => {
        const htmlString = dish
            .map((dish) => {
                return `
                <a href="/Shop">
                    <li class="dishes row">
                        <div class="col-6">
                            <h2>${dish.dishName}</h2>
                            <p>Price: ${dish.price} VNĐ</p>
                        </div>
                        <div class="col-6 row">
                            <div class="col-3"></div>
                            <img class="col-6" src="${dish.dishImg}"></img>
                            <div class="col-3"></div>
                        </div>
                    </li>
                </a>
            `;
            })
            .join('');
        dishesList.innerHTML = htmlString;
    };
    

    loadCharacters();