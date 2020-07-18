//Add a EM


showEM()
displayBookedEvents()
displayEvents()
showCarousel()
showCustomerEnquiry()
showCustomerProfile()
//display EM's
function showEM() {

    fetch('http://localhost:5000/getEventManagerList').then(data => data.json()).then(data => {
        arrays = data
        var x = document.getElementById('EMBody')

        for(var i = 0 ;i<arrays.length;++i){
            var tablerow = document.createElement('tr');
            var tabledata0 = document.createElement('td')
            var checkInput = document.createElement('input')
            checkInput.id =arrays[i]._id
            checkInput.value = arrays[i]._id
            checkInput.name = 'checkBoxName'
            checkInput.classList.add('selector')
            checkInput.type = 'checkbox'
            checkInput.onclick =  bothOps
            tabledata0.appendChild(checkInput);
            var tabledata1 = document.createElement('td')
            tabledata1.textContent = arrays[i].FirstName + " " + arrays[i].LastName
            var tabledata2 = document.createElement('td')
            tabledata2.textContent = arrays[i].Age
            var tabledata3 = document.createElement('td')
            tabledata3.textContent = arrays[i].Address
            var tabledata4 = document.createElement('td')
            tabledata4.textContent = arrays[i].DOB
            tablerow.appendChild(tabledata0)
            tablerow.appendChild(tabledata1)
            tablerow.appendChild(tabledata2)
            tablerow.appendChild(tabledata3)
            tablerow.appendChild(tabledata4)
            x.appendChild(tablerow)
        }
    })
}

//diplay BookedEvents
function displayBookedEvents(){
    fetch('http://localhost:5000/getBookedEventsAdmin').then(data => data.json()).then(data => {
        arrays = data
        var x = document.getElementById('BookedEventList')

        if(arrays.length === 0){
            x.style.display = "none"
            var b = document.getElementById('BookedEvents')
            var a = document.createElement('h6')
            a.textContent = "No Event is Booked"
            b.appendChild(a)
            return
        }
        for(var i = 0 ;i<arrays.length;++i){
            var tablerow = document.createElement('tr');
            var tabledata0 = document.createElement('td')
            tabledata0.textContent = arrays[i].CustomerUserName
            var tabledata1 = document.createElement('td')
            tabledata1.textContent = arrays[i].EventName
            var tabledata2 = document.createElement('td')
            tabledata2.textContent = arrays[i].EventDate
            var tabledata3 = document.createElement('td')
            tabledata3.textContent = arrays[i].EventTime
            var tabledata4 = document.createElement('td')
            tabledata4.textContent = arrays[i].Guest
            tablerow.appendChild(tabledata0)
            tablerow.appendChild(tabledata1)
            tablerow.appendChild(tabledata2)
            tablerow.appendChild(tabledata3)
            tablerow.appendChild(tabledata4)
            x.appendChild(tablerow)
        }
    })



}

//
function displayEvents() {
    fetch('http://localhost:5000/getEventList').then(data => data.json()).then(data => {
        arrays = data
        var x = document.getElementById('EventList')


        for(var i = 0 ;i<arrays.length;++i){
            var tablerow = document.createElement('tr');
            var tabledata0 = document.createElement('td')
            tabledata0.textContent = i+1
            var tabledata1 = document.createElement('td')
            tabledata1.textContent = arrays[i].EventName
            var tabledata4 = document.createElement('td')
            var img = document.createElement('img')
            img.id = "eventTableImg"
            img.src = arrays[i].Images;
            console.log(arrays[i].Images)
            tabledata4.appendChild(img)
            var tabledata2 = document.createElement('td')
            tabledata2.textContent = arrays[i].PricePerGuest
            var tabledata3 = document.createElement('td')
            var checkInput = document.createElement('input')
            checkInput.classList.add('EventSelector')
            checkInput.id = arrays[i]._id
            checkInput.type = 'checkbox'
            checkInput.onclick = bothEventOps
            tabledata3.appendChild(checkInput);
            tablerow.appendChild(tabledata3);
            tablerow.appendChild(tabledata0)
            tablerow.appendChild(tabledata1)
            tablerow.appendChild(tabledata4)
            tablerow.appendChild(tabledata2)
            x.appendChild(tablerow)
        }



    })

}

//onAddEventManager
function onshowDiv(){

    document.getElementById('addEm').style.display = "block";
    document.getElementById('updEM').style.display = "none"

}

//onDeleteManager
function onUpdateEM() {

    document.getElementById('updEM').style.display = "block"
    document.getElementById('addEm').style.display = "none";
    
}

function showCustomerProfile() {
    fetch('http://localhost:5000/CustomerProfileInfo').then(data => data.json()).then(data => {
        arrays = data
        console.log(arrays)
        document.getElementById('fNameAdmin').value = arrays[0].FirstName
        document.getElementById('lNameAdmin').value = arrays[0].LastName
        document.getElementById('dobAdmin').value = arrays[0].DOB
        document.getElementById('ageAdmin').value = arrays[0].Age
        document.getElementById('genderAdmin').value = arrays[0].Gender
        document.getElementById('inputAddressAdmion').value = arrays[0].Address
        document.getElementById('inputEmail4Admin').value = arrays[0].Email
        document.getElementById('inputPassword4Admin').value = arrays[0].Password
        document.getElementById('inputPassword4Admin').type = "text"
        document.getElementById('HiddenId').value = arrays[0]._id
    })
}

//onAddEvent
function onAddEvent() {
    document.getElementById('addEvent').style.display = "block"
    document.getElementById('UpdateEvent').style.display = "none"
}

//onUpdateEvent
function onshowEventUpdDiv(){

    document.getElementById('addEvent').style.display = "none";
    document.getElementById('UpdateEvent').style.display = "block"

}

//showCarouselData
function showCarousel() {
    fetch('http://localhost:5000/getCarouselImages').then(data => data.json()).then(data => {
        arrays = data

        if(arrays.length === 0) {
            document.getElementById('CarouselTable').style.display = 'none';
            return;
        }

        var x = document.getElementById('CarouselTable')

        for(var i=0;i<arrays.length;++i){

            var tablerow = document.createElement('tr');
            var tabledata0 = document.createElement('td')
            var checkInput = document.createElement('input')
            checkInput.id =arrays[i]._id
            checkInput.value = arrays[i]._id
            checkInput.name = 'checkBoxName'
            checkInput.classList.add('CarouselSelector')
            checkInput.type = 'checkbox'
            checkInput.onclick =  bothCaroOps
            tabledata0.appendChild(checkInput);
            var tabledata1 = document.createElement('td')
            tabledata1.textContent = arrays[i].SlideNo
            var tabledata2 = document.createElement('td')
            var img = document.createElement('img')
            img.classList.add('CarouselTableImages')
            img.src = arrays[i].Images
            img.alt = arrays[i].SlideNo
            tabledata2.appendChild(img)

            tablerow.appendChild(tabledata0)
            tablerow.appendChild(tabledata1)
            tablerow.appendChild(tabledata2)
            x.appendChild(tablerow)


        }

    })

}
//Func3 Enq from Customer
//Func3 Enq from Customer
function showCustomerEnquiry() {
    fetch('http://localhost:5000/getFullEnqList').then(data => data.json()).then(data => {
        arrays = data

        var x = document.getElementById('prvEnq')
        for(var i = 0 ;i<arrays.length;++i){
            var tablerow = document.createElement('tr');
            var tabledata1 = document.createElement('td')
            tabledata1.textContent = i+1
            var tabledata5 = document.createElement('td')
            tabledata5.textContent = arrays[i].CustomerName
            var tabledata2 = document.createElement('td')
            tabledata2.textContent = arrays[i].Subject
            var tabledata3 = document.createElement('td')
            tabledata3.textContent = arrays[i].Enquiry
            var tabledata6 = document.createElement('td')
            tabledata6.textContent = arrays[i].Status
            var tabledata4 = document.createElement('td')
            var replyButton = document.createElement('button')
            replyButton.textContent = "Reply"
            replyButton.classList.add('btn')
            replyButton.classList.add('btn-success')
            replyButton.id = "reply"+(i+1);
            replyButton.setAttribute('onclick','sendReply("'+arrays[i].CustomerName+'","'+arrays[i]._id+'")')
            replyButton.dataset.toggle = "modal"
            // replyButton.dataset.target = '#exampleModalCenter'
            replyButton.dataset.customerId = arrays[i].CustomerName


            var tabledata7 = document.createElement('td')
            tabledata7.textContent = arrays[i].Answer

            if(arrays[i].Status === "Replied"){
                replyButton.disabled = true;
            }
            if(arrays[i].Status === "Pending"){
                replyButton.disabled = false;
            }

            tabledata4.appendChild(replyButton)
            tablerow.appendChild(tabledata1)
            tablerow.appendChild(tabledata5)
            tablerow.appendChild(tabledata2)
            tablerow.appendChild(tabledata3)
            tablerow.appendChild(tabledata6)
            tablerow.appendChild(tabledata7)
            tablerow.appendChild(tabledata4)
            x.appendChild(tablerow)

        }
    })
}

function sendReply(customerId,objectId) {

    $('#exampleModalCenter').modal('show')

    document.getElementById('HiddenIdReply').value  =  objectId;



}

