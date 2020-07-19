showCarousel()
//showCarouselData
function showCarousel() {
    fetch('https://event-mang-tcs.herokuapp.com/getCarouselImages').then(data => data.json()).then(data => {
        arrays = data

        var x = document.getElementById('carousel-indicator')
        var x2 = document.getElementById('carousel-inner')

        for(var i =0;i<arrays.length;++i)
        {
            var listItem = document.createElement('li')
            listItem.dataset.target =  '#carouselExampleIndicators';
            listItem.setAttribute('data-slide-to', i)

            var innerDiv = document.createElement('div')
            innerDiv.id = arrays[i].SlideNo
            var img = document.createElement('img')
            img.classList.add('d-block')
            img.classList.add('w-100')
            innerDiv.classList.add('carousel-item')
            img.src = arrays[i].Images
            img.alt = arrays[i].SlideNo

            if(i === 0) {
                listItem.classList.add('active')
                innerDiv.classList.add('active')
            }
            x.appendChild(listItem)
            innerDiv.appendChild(img)
            x2.appendChild(innerDiv)

        }

    })
}
