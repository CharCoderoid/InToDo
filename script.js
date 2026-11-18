const inputItem = document.getElementById("input-box");
const dateItem = document.getElementById("date-box");
const courseItems = document.getElementById("course");
const taskList = document.getElementById("list-spot"); 

function addItem(){
    const input = inputItem.value.trim();
    const course = courseItems.value;
    const date = dateItem.value;
    
    if (!input || !date){
        alert("Please fill out the task");
        return;
    }
    
    const formatDue = formatDate(date); 
    
    const li = document.createElement("li");
    li.innerHTML = ` 
    <label>
        <input type="checkbox"> 
        <span class="task">${input}</span> |
        <span class="course">${course}</span> |
        <span class="date">${formatDue}</span> 
    </label>
    `

    taskList.appendChild(li);
    inputItem.value = ""; 
    dateItem.value = ""; 
}

function formatDate(d){
    const dateObj = new Date(`${d}T00:00:00`);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    }).format(dateObj); 

    return formattedDate; 
    
}