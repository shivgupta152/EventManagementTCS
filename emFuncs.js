
displayEvents()
showCustomerProfile()
showCustomerEnquiry()
//Func1 EventInfo
function displayEvents(){
     fetch('http://localhost:5000/getBookedEventsList').then(data => data.json()).then(data => {
         arrays = data
         var x = document.getElementById('BookedEventList')

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

 //Func2 EventMangerProfile
function showCustomerProfile() {
    fetch('http://localhost:5000/CustomerProfileInfo').then(data => data.json()).then(data => {
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
            if(arrays[i].Status === "Replied"){
                replyButton.disabled = true;
            }
            if(arrays[i].Status === "Pending"){
                replyButton.disabled = false;
            }
            tabledata4.appendChild(replyButton)

            var tabledata7 = document.createElement('td')
            tabledata7.textContent = arrays[i].Answer
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

