var finalCost = 0;

EventsInForm()
EventManageInForm()
showCustomerProfile()
displayCustomerEvents()
displayCustomerEnquiry()
//func1 EventDisplay
function displayCustomerEvents() {
    fetch('https://event-mang-tcs.herokuapp.com/getBookedEvents').then(data => data.json()).then(data => {
        arrays = data

    var x = document.getElementById('DisplayEvents')
        for(var i = 0 ;i<arrays.length;++i){
            var tablerow = document.createElement('tr');
            var tabledata1 = document.createElement('td')
            tabledata1.textContent = arrays[i].EventName
            var tabledata2 = document.createElement('td')
            tabledata2.textContent = arrays[i].EventManager
            var tabledata3 = document.createElement('td')
            tabledata3.textContent = arrays[i].EventDate
            var tabledata4 = document.createElement('td')
            tabledata4.textContent = arrays[i].EventTime
            var tabledata5 = document.createElement('td')
            tabledata5.textContent = arrays[i].Guest
            tablerow.appendChild(tabledata1)
            tablerow.appendChild(tabledata2)
            tablerow.appendChild(tabledata3)
            tablerow.appendChild(tabledata4)
            tablerow.appendChild(tabledata5)
            x.appendChild(tablerow)
        }

    })
}

//Display Events Option
function EventsInForm() {
    fetch('https://event-mang-tcs.herokuapp.com/getEventList').then(data => data.json()).then(data => {
        arrays = data

        var x = document.getElementById('EventName')
        for(var i = 0;i<arrays.length;++i){
            var option = document.createElement('option')
            option.value=arrays[i].EventName
            option.dataset.price = arrays[i].PricePerGuest
            option.textContent = arrays[i].EventName + " (" + arrays[i].Location + ")"
            option.classList.add('eventSelect')
            x.appendChild(option)
        }


    })



}

//Display EventManagerOptions
function EventManageInForm() {
    fetch('https://event-mang-tcs.herokuapp.com/getEventManagerList').then(data => data.json()).then(data => {
        arrays = data
        var x = document.getElementById('EventManager')
        for(var i = 0;i<arrays.length;++i){
            var option = document.createElement('option')
            option.value=arrays[i].FirstName + arrays[i].LastName  ;
            option.textContent = arrays[i].FirstName+" "  + arrays[i].LastName
            x.appendChild(option)
        }
    })

}

//Func2 Profile
function showCustomerProfile() {
    fetch('https://event-mang-tcs.herokuapp.com/CustomerProfileInfo').then(data => data.json()).then(data => {
        arrays = data
        console.log(arrays)
        document.getElementById('fName').value = arrays[0].FirstName
        document.getElementById('lName').value = arrays[0].LastName
        document.getElementById('dob').value = arrays[0].DOB
        document.getElementById('age').value = arrays[0].Age
        document.getElementById('gender').value = arrays[0].Gender
        document.getElementById('inputAddress').value = arrays[0].Address
        document.getElementById('inputEmail4').value = arrays[0].Email
        document.getElementById('inputPassword4').value = arrays[0].Password
        document.getElementById('inputPassword4').type = "text"
        document.getElementById('HiddenId').value = arrays[0]._id
    })
}

//Func3 EnquiryDisplay
function displayCustomerEnquiry() {
    fetch('https://event-mang-tcs.herokuapp.com/getEnqList').then(data => data.json()).then(data => {
        arrays = data

        var x = document.getElementById('prvEnq')
        for(var i = 0 ;i<arrays.length;++i){
            var tablerow = document.createElement('tr');

            var tabledata1 = document.createElement('td')
            tabledata1.textContent = i+1
            var tabledata2 = document.createElement('td')
            tabledata2.textContent = arrays[i].Subject
            var tabledata3 = document.createElement('td')
            tabledata3.textContent = arrays[i].Status
            var tabledata4 = document.createElement('td')
            tabledata4.textContent = arrays[i].Answer

            tablerow.appendChild(tabledata1)
            tablerow.appendChild(tabledata2)
            tablerow.appendChild(tabledata3)
            tablerow.appendChild(tabledata4)
            x.appendChild(tablerow)
        }

    })
}

$('#GuestNo').on('input', function(){
    var x = document.getElementById('EventName')
    var eventPrice =x.options[x.selectedIndex].getAttribute('data-price')
    console.log(eventPrice * document.getElementById('GuestNo').value)
    document.getElementById('price').textContent = (eventPrice * document.getElementById('GuestNo').value)
})

$('#EventName').on('input', function(){
    var x = document.getElementById('EventName')
    var eventPrice =x.options[x.selectedIndex].getAttribute('data-price')
    console.log(eventPrice * document.getElementById('GuestNo').value)
    document.getElementById('price').textContent = (eventPrice * document.getElementById('GuestNo').value)
})


