//<<<Database>>>
let tasksDatabase = [];

//<<<Client Side JavaScript>>>

//Changing Sort/Filter radio button label background based on radio button checked
{
let sort_filter_options = document.querySelectorAll('input[type="radio"][name="sort-filter-radio"]');
  sort_filter_options.forEach(option=> option.addEventListener('change', function(){
    let checkedElement = document.querySelector('input[type="radio"][name="sort-filter-radio"]:checked');
      checkedValue = checkedElement.value;
      document.querySelectorAll('label[id*="-radio-label"]').forEach(label=>  label.style.backgroundColor = "antiquewhite");
      document.querySelector(`#${checkedValue}-radio-label`).style.backgroundColor = "rgb(245, 211, 167)";
      console.log(checkedValue);

      //Enabling disabling sort/filter controls based on radio button checked
      //First hiding all controls
      document.querySelectorAll('#filter-dropdown, #sort-dropdown, #filter-text').forEach(el=>el.style.display = "none");
      if(checkedValue==='sort')
      {
        document.getElementById('sort-dropdown').style.display="inline";
        changeSortOrder();
      }
      else if (checkedValue==='filter')
      {
        document.getElementById('filter-dropdown').style.display="inline";
        document.getElementById('filter-text').style.display="inline";
        changeFilterCriteria();
      }
    }));
  }
  //Changing 'Sort By' dropdown changes ToDo table sort order
  {
    document.querySelector('#sort-dropdown').addEventListener('change', changeSortOrder);
    
  function changeSortOrder()
  {
    let sortDropdownValue = document.querySelector('#sort-dropdown').value;
    if(sortDropdownValue === 'Sort By Task Name')
    {
      console.log('Sort By Name');
      let currentTasksAfterSortingByName = sortTasksByNameAPI();
      syncToDoTable(currentTasksAfterSortingByName);
    }
    else if(sortDropdownValue === 'Sort By Task Priority')
    {
      console.log('Sort By Priority');
      let currentTasksAfterSortingByPriority = sortTasksByPriorityAPI();;
      syncToDoTable(currentTasksAfterSortingByPriority);
    }
  }
}
//Changing 'Filter By' dropdown changes 'Filter text' placeholder and filter criteria
{
  document.querySelector('#filter-dropdown').addEventListener('change', changeFilterCriteria);

  function changeFilterCriteria()
  {
    let filterDropdownValue = document.querySelector('#filter-dropdown').value;
    if(filterDropdownValue === 'Filter On Task Name')
    {
      console.log('Filter On Name');
      filterOnTaskNameAPI();
    }
    else if(filterDropdownValue === 'Filter On Task Priority')
    {
      console.log('Filter On Priority');
      filterOnTaskPriorityAPI();
    }
  } 
}
//Add Task button handler
{
  document.getElementById('task-add-form').addEventListener('submit', function(event){
    let taskName = document.getElementById('taskName').value;
    let taskPriority = document.getElementById('taskPriority').value;
    let currentTasksAfterAdding = addTaskAPI(taskName, taskPriority);
    syncToDoTable(currentTasksAfterAdding);
    event.preventDefault();
  });
}
//Get current tasks from API and write to table
{
  let currentTasks = getCurrentTasksAPI();
  syncToDoTable(currentTasks);

  function syncToDoTable(tasksToSync)
  {
    let toDoTable = document.getElementById('todo-table-body');
    let toDoTableHTML = '';
    if(tasksToSync.length>0)
    {
      tasksToSync.forEach(function(task, index)
      {
        let taskName = task.taskName;
        let taskPriority = task.taskPriority;
        toDoTableHTML += getTableRow(index, taskName, taskPriority);
      });
    }
    else toDoTableHTML += getTableRow(-1);
    
    toDoTable.innerHTML = toDoTableHTML;
  }
    function getTableRow(index, taskName, taskPriority)
    {
      let row;
      if(index===-1)
        row = `<tr><td>All Caught Up! 🏆</td><td></td><td></td></tr>`;
      else
        row = `<tr><td>${taskName}</td><td>${taskPriority}</td><td><input type="checkbox" id="delete-task-${index}"</td></tr>`;
      return row;
    }
}


//<<<Server Side JavaScript>>>

function addTaskAPI(taskName, taskPriority)
{
  tasksDatabase.push({"taskName": taskName, "taskPriority": taskPriority});
  return tasksDatabase;
}

function sortTasksByNameAPI()
{
  return tasksDatabase.sort((a, b) => (a.taskName < b.taskName) ? -1 : 1);
}

function sortTasksByPriorityAPI()
{
  return tasksDatabase.sort((a, b) => (a.taskPriority < b.taskPriority) ? -1 : 1);
}

function filterOnTaskNameAPI()
{
  
}

function filterOnTaskPriorityAPI()
{

}

function getCurrentTasksAPI()
{
  return tasksDatabase;
}
