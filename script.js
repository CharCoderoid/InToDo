const inputItem = document.getElementById("input-box");
const dateItem = document.getElementById("date-box");
const courseItems = document.getElementById("course");
const taskList = document.getElementById("task-list"); 
const now = document.getElementById("today");
const today = new Date(); 
now.textContent = formatDate(today);

function addItem(){
    const input = inputItem.value.trim();
    const course = courseItems.value;
    const date = dateItem.value;
    
    if (!input || !date){
        alert("Please fill out the task");
        return;
    }
    const dateObj = new Date(`${date}T00:00:00`);
    const formatDue = formatDate(dateObj); 

    const tr = document.createElement("tr");
    tr.innerHTML = ` 
    <tr>
        <td><input type="checkbox" class="checkbox"></td>
        <td class="task" id="task">${input}</td> 
        <td class="course" id="course">${course}</td> 
        <td class="date" id="date">${formatDue}</td> 
    </tr>
    `

    taskList.appendChild(tr);
    inputItem.value = ""; 
    dateItem.value = ""; 

    const check = tr.querySelector(".checkbox"); 

    check.addEventListener("click", function () {
        tr.classList.toggle("completed", check.checked); 
    });

     const editTask = tr.querySelector(".task");
     const taskSpan = tr.querySelector("#task");
     editTask.addEventListener("click", function () {
        const updateTask = document.createElement("input"); 
        updateTask.type = "text";
        updateTask.value = taskSpan.textContent; 

        taskSpan.replaceWith(updateTask);
        updateTask.focus(); 

        function saveTask() {
            const updated = updateTask.value.trim(); 
            if (updated !== ""){
                taskSpan.textContent = updated;
                check.checked = false;
                tr.classList.remove("completed"); 
            }

            updateTask.replaceWith(taskSpan); 
        }

        updateTask.addEventListener("blur", saveTask);
        updateTask.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                saveTask(); 
            }
        });
    });

    const editDate = tr.querySelector(".date");
    const dateSpan = tr.querySelector("#date");
    editDate.addEventListener("click", function () {
        const editInput = document.createElement("input");
        editInput.type = "date"; 
        editInput.value = dateSpan.dataset.rawDate;
        
        dateSpan.replaceWith(editInput); 
        editInput.focus();

        function saveDate() {
            if (editInput.value) {
                const newDateObj = new Date(`${editInput.value}T00:00:00`);
                dateSpan.textContent = formatDate(newDateObj); 
                dateSpan.dataset.rawDate = editInput.value; 
                check.checked = false;
                tr.classList.remove("completed"); 
            }
            editInput.replaceWith(dateSpan); 
        }

        editInput.addEventListener("change", saveDate);
        editInput.addEventListener("blur", saveDate);
    });

    const courseSpan = tr.querySelector(".course");
    courseSpan.addEventListener("click", function () {
        const editSelect = courseItems.cloneNode(true);
        editSelect.removeAttribute("id"); // Avoid duplicate IDs on the page
        editSelect.value = courseSpan.textContent; 

        courseSpan.replaceWith(editSelect);
        editSelect.focus();

        function saveCourse() {
            if (editSelect.value) {
                courseSpan.textContent = editSelect.value;
                check.checked = false;
                tr.classList.remove("completed"); 
            }
            editSelect.replaceWith(courseSpan); 
        }

        editSelect.addEventListener("change", saveCourse);
        editSelect.addEventListener("blur", saveCourse);
    });
}

function formatDate(d){
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    }).format(d); 

    return formattedDate; 
}


