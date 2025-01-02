
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

//copy button functionality
const copyButton = (text) => `<button class="copy-btn" onclick="copyText('${text}')">Copy</button>`;
function copyText(txt) {
  navigator.clipboard.writeText(txt);
  showNotification("Text Copied Successfully","success")
}
 
//delete button
let deleteButton = `<button class="edit-btn">Delete</button>`;


//fetching data from form(Form Submission Handler)
document.getElementById("submitButton").addEventListener("click", (e) => {
  
  e.preventDefault();
 
  const websiteValue = website.value.trim();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  
  if (!websiteValue || !usernameValue || !passwordValue) {
    showNotification("Please fill all fields", "error");
    return;
  }

  let tableData = localStorage.getItem("tableData");
  if (tableData == null) {
    let json = [];
    json.push({
      website: websiteValue,
      username: usernameValue,
      password: passwordValue
    });
    alert("saved");

    localStorage.setItem("tableData", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("tableData"));
    json.push({
      website: websiteValue,
      username: usernameValue,
      password: passwordValue
    });
    
    localStorage.setItem("tableData", JSON.stringify(json));
  }
//clear form
  website.value="";
  username.value="";
  password.value="";

  showNotification("Data saved successfully", "success");

  addRow();
});

 //delete  functionality
const deleteRow = (index) => {
  let data = JSON.parse(localStorage.getItem("tableData"));
  data.splice(index, 1); // Remove the row at the given index
  localStorage.setItem("tableData", JSON.stringify(data)); // Update localStorage
  showNotification("Entry deleted", "success");
  addRow(); // Refresh the table
};




//adding data to table
const addRow = () => {
  let table = document.querySelector(".displayPass");
  let data = localStorage.getItem("tableData");

  if (data == null) {
    table.innerHTML = "No Data To Show";
  } else {
    table.innerHTML = ` <tr>
               <th>Website</th>
               <th>Username</th>
               <th>Password</th>
               <th>Actions</th>
            </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    arr.forEach((element, index) => {
      str += `<tr>
          <td>${element.website}${copyButton(element.website)}</td>
          <td>${element.username}${copyButton(element.username)}</td>
          <td>••••••••${copyButton(element.password)}</td>
          <td><button class="edit-btn" onclick="deleteRow(${index})">Delete</button></td>
      </tr>`;
  });
  
    table.innerHTML += str;
  }
};



addRow();
