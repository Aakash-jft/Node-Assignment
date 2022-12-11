$(function () {
  if (sessionStorage.getItem("user") == null) {
    alert("Please Enter Your Email id");
    window.open("./register.html", "_self");
  }

  let Name = $("#name");
  let Job = $("#job");
  let Salary = $("#salary");
  let id = null;
  let flag = true;

  let arr2 = [];

  function getshow() {
    apiCalls("get");
  }

  function clear() {
    Name.val("");
    Job.val("");
    Salary.val("");
  }

  function employee(name, job, salary) {
    this.name = name;
    this.job = job;
    this.salary = Number(salary);
  }

  function show(arr) {
    $("#table").html(`
    <thead>
          <tr>
            <th>
            Name
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort
              </button>
              <ul class="dropdown-menu " id="name">
                <li><button class="dropdown-item acc" value="name" id="acc" type="button">ASC</button></li>
                <li><button class="dropdown-item dcc" value="name" id="dcc" type="button">DESC</button></li>
                
              </ul>
            </div>
            </th>
            <th>Job
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort
                </button>
                <ul class="dropdown-menu" id="job">
                  <li><button class="dropdown-item acc" value="job" type="button" id="acc">ASC</button></li>
                  <li><button class="dropdown-item dcc" value="job" type="button" id="dcc">DESC</button></li>
                  
                </ul>
              </div>
            </th>
            <th>Salary
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort
                </button>
                <ul class="dropdown-menu" id="salary">
                  <li><button class="dropdown-item acc" value="salary" type="button" id="acc">ASC</button></li>
                  <li><button class="dropdown-item dcc" value="salary" type="button" id="dcc">DESC</button></li>
                  
                </ul>
              </div>
            </th>
            <th>Action
              
               
            </th>
          </tr>
          </thead>`);
    arr.forEach((e) => {
      let tabb = `
      <tbody>
      <tr id="rw-${e.id}"> 
        <td>${e.name}</td>
        <td>${e.job}</td>
        <td>${e.salary}</td>
        <td>
        <button  class="delete btn btn-danger" id ="${e.id}" >delete</button>
        <button  class = "edit btn btn-secondary" id ="${e.id}" class="edit">edit</button>
      </td>
      </tbody>
    </tr>`;

      $("#table").append(tabb);
    });
  }

  employee.prototype.equalsTo = function (x, ...y) {
    // let obj = JSON.stringify(this);
    // let obj2 = JSON.stringify(x);
    console.log(this, x);
    for (let i in this) {
      if (this[i] == y[i] || i == "equalsTo") {
        continue;
      }
      if (this[i] == x[i]) {
        continue;
      } else {
        console.log(this[i], i);
        return false;
      }
    }

    return true;
  };

  function apiCalls(method, data) {
    console.log(typeof sessionStorage.getItem("user"));
    if (method == "get") {
      let request = $.ajax({
        url: "http://localhost:3000/Employee",
        method: "GET",
        mode: "no-cors",
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("user"),
        },
      });

      request.done(function (data) {
        console.log(data);
        // arr2 = JSON.parse(data);
        console.log(data);
        arr2 = [...data];
        show(data);
      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
    } else if (method == "post") {
      console.log(data);
      let request = $.ajax({
        url: "http://localhost:3000/Employee",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("user"),
        },
      });

      request.done(function (data) {
        //   getshow();
        console.log(data);
        // data = JSON.parse(data)
        let tabb = `<tr id="rw-${data.id}"> 
          <td>${data.name}</td>
            <td>${data.job}</td>
            <td>${data.salary}</td>
            <td>
            <button  class="delete btn btn-danger" id ="${data.id}" >delete</button>
            <button  class = "edit btn btn-secondary" id ="${data.id}" class="edit">edit</button>
          </td>
       </tr>`;
        arr2.push(data);

        $("#table").html($("#table").html() + tabb);
      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
    } else if (method == "put") {
      let request = $.ajax({
        url: `http://localhost:3000/Employee/${id}`,
        type: "PUT",
        data: JSON.stringify(data),
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("user"),
        },
        contentType: "application/json",
      });

      request.done(function (data) {
        console.log(data);
        getshow();
      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
    } else if (method == "dele") {
      let request = $.ajax({
        url: `http://localhost:3000/Employee/${id}`,
        method: "DELETE",
        contentType: "text/plain",
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("user"),
        },
      });

      request.done(function (data) {
        $(`#rw-${id}`).remove();
      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
    }
  }

  function Sort(arr, val, sort) {
    if (val == "name") {
      if (sort == "acc") {
        arr.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        console.log(arr);
      } else {
        arr.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
        );
        console.log(arr);
      }
    } else if (val == "job") {
      if (sort == "acc") {
        arr.sort((a, b) =>
          a.job.toLowerCase() > b.job.toLowerCase() ? 1 : -1
        );
        console.log(arr);
      } else {
        arr.sort((a, b) =>
          a.job.toLowerCase() > b.job.toLowerCase() ? -1 : 1
        );
        console.log(arr);
      }
    } else {
      if (sort == "acc") {
        arr.sort((a, b) => (Number(a.salary) > Number(b.salary) ? 1 : -1));
        console.log(arr);
      } else {
        arr.sort((a, b) => (Number(a.salary) > Number(b.salary) ? -1 : 1));
        console.log(arr);
      }
    }

    show(arr);
  }

  async function SortWith(field, order) {
    let json = await fetch(
      `http://localhost:3000/Employees/?_sort=${field}&_order=${order}`
    );
    let data = await json.json();
    show(data);
  }

  function searchData() {
    let obj = new employee(Name.val(), Job.val(), Number(Salary.val()));

    let arr = arr2.filter((e) => {
      if (obj.equalsTo(e, { id })) {
        return e;
      }
    });

    if (!arr.length) {
      alert("Not found");
      clear();
      return;
    }

    if ($("#search").html() == "Search") {
      $("#search").html("Reset");
      show(arr);
    } else {
      $("#search").html("Search");
      clear();
      show(arr2);
    }
  }

  getshow();

  if (arr2.length > 0) {
    show(arr2);
  }

  $("#btn").click(async (e) => {
    if (flag == true) {
      if (Name.val() == "" || Job.val() == "" || Salary.val() == "") {
        alert("Enter valid inputs");
        return;
      }

      let obj = new employee(Name.val(), Job.val(), Number(Salary.val()));

      apiCalls("post", obj);

      clear();
    } else {
      if (Name.val() == "" || Job.val() == "" || Salary.val() == "") {
        alert("Enter valid inputs");
        return;
      }

      let obj = new employee(Name.val(), Job.val(), Salary.val());

      apiCalls("put", obj);

      $("#btn").html("Add");

      clear();

      flag = true;
    }
  });

  $("#search").click(searchData);

  $("#table").on("click", ".delete", async function () {
    console.log(this, this.id);
    id = this.id;
    console.log(id);
    apiCalls("dele");
  });

  $("#table").on("click", ".edit", async function () {
    $("#btn").html("Edit");
    flag = false;
    id = this.id;
    console.log(id);
    let request = $.ajax({
      url: `http://localhost:3000/Employee/${id}`,
      method: "GET",
      headers: {
        authorization: "Bearer " + sessionStorage.getItem("user"),
      },
    });

    request.done(function (data) {
      // data=JSON.parse(data)
      Name.val(data.name);
      Job.val(data.job);
      Salary.val(data.salary);
    });

    request.fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  });

  $("#table").on("click", ".acc", async function () {
    // sortByname(arr2,"acc");
    // console.log("acc");
    Sort(arr2, this.value, "acc");
    // SortWith(this.value,"asc")

    console.log(this.value);
  });
  $("#table").on("click", ".dcc", async function () {
    // sortByname(arr2,"dcc");
    // console.log("dcc");
    Sort(arr2, this.value, "dcc");
    // SortWith(this.value,"desc");
  });
});

// Object.prototype.isEqual = function(x){
//   // let flag = true;
//   // this = JSON.stringify(this);
//   // x = JSON.stringify(x);
//   // for(let i in this){
//   //   if(i=="id"){
//   //     continue;
//   //   }
//   //   if(this[i]!==x[i]){
//   //     return false
//   //   }
//   // }

//   // return true

// }
