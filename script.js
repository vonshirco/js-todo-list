var app = new function(){
    this.el = document.getElementById('tasks');
    this.tasks = [];

    this.FetchAll = function(){ //The read function, this displays all of our to do list items
        var data = '';
        
        if(this.tasks.length > 0){ //if only items are in the todo list then display items
            for(i=0; i<this.tasks.length; i++){
                data += '<tr>';
                data += '<td>' + (i+1) + ". " + this.tasks[i] + '</td';
                data += '<td></td>';
                data += '<td><button onclick = "app.Edit('+i+')" class = "btn btn-warning">Edit</button></td>';
                data += '<td><button onclick = "app.Delete('+i+')" class = "btn btn-danger">Delete</button></td>';
                data += '</tr>';
            }
        } 
        this.Count(this.tasks.length);
        return this.el.innerHTML = data;
    };

    this.Add = function(){ //The create function, this adds new elements to our to do list
        el = document.getElementById('add-todo');
        var task = el.value; //Get the value
        if(task){ //If their is a task in there add a new value to the array
            this.tasks.push(task.trim());
            //to set the text box back to blank
            el.value = '';
            //to display the new list
            this.FetchAll();
        }
    };

    this.Edit = function(item){ //To edit our to do list
        //Showing the Edit box and change the value
        var el = document.getElementById('edit-todo');
        //this.el.value = this.tasks[item];
        el.value = this.tasks[item];
        document.getElementById('edit-box').style.display = 'block';
        self = this;

        //When the save button is clicked
        document.getElementById('save-edit').onsubmit = function (){
            //Get the value
            var task = el.value;
            if(task){ //if there is a task we edit the value
                self.tasks.splice(item, 1, task.trim());
                self.FetchAll(); //Display the new list
                CloseInput(); //Hide fields
            }
        }
    };

    this.Delete = function(item){ //To delete items
        this.tasks.splice(item, 1); //Delete the current row
        this.FetchAll(); // Display the new List
    };

    //Also to display the amount of items we have in our lists and keep tract of the count
    this.Count = function(data){
        var el = document.getElementById('counter');
        var name = 'Tasks';
        if(data){ //If data exists
            if(data == 1){
                name = 'Task';
            }
            el.innerHTML = data + ' ' + name;
        }else{ //If there are no tasks
            el.innerHTML = "No " + name;  //No Tasks
        }
    };
}

//Calling fetchAll function so that we are always updating the todo list
app.FetchAll();

//To be able to close the edit box we create a function
function CloseInput(){
    document.getElementById('edit-box').style.display = 'none';
}


