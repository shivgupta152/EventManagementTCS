displayEvents()
function displayEvents() {
fetch('https://event-mang-tcs.herokuapp.com/getEventList').then(data => data.json()).then(data => {
    arrays = data
    var x = document.getElementById('eventList')

    for(var i = 0 ;i<arrays.length;++i){
        var y = document.createElement('div')
        y.classList.add('eventCard')
        y.classList.add('col-md-6')
        y.style.cursor = "pointer"
        y.onclick = callLogin
        var z = document.createElement('div')
        z.classList.add('flip-card')

        var inner = document.createElement('div')
        inner.classList.add('flip-card-inner')

        var front = document.createElement('div')
        front.classList.add('flip-card-front')

        var back = document.createElement('div')
        back.classList.add('flip-card-back')

        var front1 = document.createElement('h1')
        front1.textContent= arrays[i].EventName
        front1.classList.add('top')
        var img = document.createElement('img')
        img.src=arrays[i].Images;
        img.alt=arrays[i].EventName;
        var front2 = document.createElement('div')
        var leftLoc  = document.createElement('h1')
        leftLoc.textContent = arrays[i].Location
        leftLoc.classList.add('float-left')
        var rightMax  = document.createElement('h1')
        rightMax.textContent = "MaxGuest : " + arrays[i].MaxGuest
        rightMax.classList.add('float-right')
        front2.classList.add('bottom-left')

        var back1 =document.createElement('div')
        var desc = document.createElement('p')
        desc.textContent = arrays[i].Description
        desc.classList.add('paraDesc')
        var caption = document.createElement('h2')
        caption.classList.add('bottom')
        caption.textContent = "Price Per Guest : " + arrays[i].PricePerGuest

        front2.appendChild(leftLoc)
        front2.appendChild(rightMax)
        front.appendChild(img)
        front.appendChild(front2)
        front.appendChild(front1)

        back1.appendChild(desc)
        back1.appendChild(caption)
        back.appendChild(back1)

        inner.appendChild(front)
        inner.appendChild(back)

        z.appendChild(inner)
        y.appendChild(z)
        x.appendChild(y)
    }
  })
}
