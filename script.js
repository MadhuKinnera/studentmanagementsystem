
let students=JSON.parse(localStorage.getItem("students")) || [];
let lectures=JSON.parse(localStorage.getItem("lectures")) || [];
let assignments=JSON.parse(localStorage.getItem("assignments")) || [];
//console.log(students)
//Parent Class for all users
class User{

    constructor(name,id){
        this.name=name;
        this.id=id;
    }

    //signup Method for Users
    signup(username,password){
      let isValidated=(this.#validateUsername(username) && this.#validatePassword(password));
      if(isValidated) {
        this.username=username;
        this.password=password;
        console.log("singup successful..");
        alert("signup Successfull")
        students.push(this);
        localStorage.setItem("students",JSON.stringify(students));
      }
      else{
        console.log("signup failed");
      }
      console.log(students)

    }

    //private methods
     #validateUsername(username){
     if(username!="")
        return true;
    else{
        alert("enter a Valid Username..!");
        return false;
    }
     }
     #validatePassword(password){
        if(password!="")
        return true;

        else{
            alert("Enter correct Password..!");
            return false;
        }
     }












}

class Student extends User{
    
    constructor(name,id){
       super(name,id);
    }

    checkStudentLogin(username,password){
        console.log("in checkStudentLogin")
        
        let isLogin=()=>{
            console.log(students);
            let flag=0;
            students.forEach((ele)=>{
                if(ele.username==username && ele.password==password){
                 let profile=ele;
                 localStorage.setItem("profile",JSON.stringify(profile));
                 
                   console.log(profile);
                   flag=1;
                }
              });
              return flag;
        }

        if(isLogin()){
            console.log("logged in student.html opening.");
            alert("Login Success")
                window.location.href="profile.html"
              
           
        }
        else{
            alert("Invalid Creditials")
            console.log("login failed")
        }
    
           
    
    }


    profileDetails(){
    let profile=JSON.parse(localStorage.getItem("profile"));
    console.log(profile);
    let name=document.getElementById("showname");
    name.innerText=profile.name;
    let id=document.getElementById("showid");
    id.innerText=profile.id;
    let username=document.getElementById("showusername");
    username.innerText=profile.username;
    let password=document.getElementById("showpassword");
    password.innerText=profile.password;
    
        
    }

    
    displayStudents(){
        let tbody=document.querySelector("tbody");
        students.forEach((ele)=>{
            let tr=document.createElement("tr");
            let td1=document.createElement("td");
            let td2=document.createElement("td");
            let td3=document.createElement("td");
            let td4=document.createElement("td");
            td1.innerText=ele.name;
            td2.innerText=ele.id;
            td3.innerText=ele.username;
            td4.innerText=ele.password;
            tr.append(td1,td2,td3,td4);
            tbody.append(tr);
        })
    }



}



class Admin extends User{
    constructor(name,id){
        super(name,id);
    }


    checkAdminLogin(username,password){
        if(username=="Admin" && password=="123"){
            console.log("in admin login ");
            console.log("login successful");
            alert("Admin Login Successful")
            console.log("opening admin page");
            window.location.href="userlist.html"
        }
        else{
            console.log("Admin Login Failed");
            alert("Admin Login Failed..");
        }
        
    }
}



let addStudent=(e)=>{
    e.preventDefault();
    let name=document.getElementById("name").value;
    let id=document.getElementById("id").value;
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    let s1=new Student(name,id);
        s1.signup(username,password);
}


let checkLogin= (e)=>{
    e.preventDefault();
    let user=document.getElementById("loginUser").value;
    //console.log(user);
    if(user=="admin"){
       
        checkAdminLogin();
    }
    else{
        checkStudentLogin();
    }

}

let checkStudentLogin=()=>{
    let username=document.getElementById("loginUserName").value;
    let password=document.getElementById("loginPassword").value;
    console.log(username,password);
    let s1=new Student();
    s1.checkStudentLogin(username,password);
}


let checkAdminLogin=()=>{
    let username=document.getElementById("loginUserName").value;
    let password=document.getElementById("loginPassword").value;
    console.log(username,password);
    let a=new Admin();
    a.checkAdminLogin(username,password);
}


let seeProfiles=()=>{
    let s1=new Student();
    s1.profileDetails();
}


// let displayStudents =()=>{
//     let s1=new Student();
//     s1.displayStudents();
// }
let profile=JSON.parse(localStorage.getItem("profile"));
let changeDetails=()=>{
    window.location.href="signup.html";
}




let showUsers=()=>{
    let userlist=document.getElementById("userlist");
    userlist.innerHTML=null;
    students.forEach((ele)=>{
        let tr=document.createElement("tr");
        let name=document.createElement("td");
        name.innerText=ele.name;
        let id=document.createElement("td");
        id.innerText=ele.id;
        let username=document.createElement("td");
        username.innerText=ele.username;
        let password=document.createElement("td");
        password.innerText=ele.password;
        
        let remove=document.createElement("p");
        remove.innerText="REMOVE";
        remove.style.color="red";
        remove.onclick=()=>{
            removeUser(ele);
        }
        

        tr.append(name,id,username,password,remove);
        userlist.append(tr);
});


let removeUser=(element)=>{
    console.log("removing user");
    console.log(element);
       let x= students.filter((ele)=>{
            return element.name!==ele.name;
        })
       students=x;
       localStorage.setItem("students",JSON.stringify(students));
       showUsers();
     }


}


let showLectures=()=>{
    let showLectures=document.getElementById("showLectures");
    showLectures.innerHTML=null;
    lectures.forEach((ele)=>{
        let tr=document.createElement("tr");
        let name=document.createElement("td");
        name.innerText=ele.name;
        let date=document.createElement("td");
        date.innerText=ele.date;
        let subject=document.createElement("td");
        subject.innerText=ele.subject;

        let remove=document.createElement("p");
        remove.innerText="REMOVE";
        remove.style.color="red";
        remove.onclick=()=>{
            removeLecture(ele);
        }

        tr.append(name,date,subject,remove);
        showLectures.append(tr);

        

    });


    
let removeLecture=(element)=>{
    console.log("removing lecture");
    console.log(element);
       let x= lectures.filter((ele)=>{
            return element.name!==ele.name;
        })
       lectures=x;
       console.log(x);
       localStorage.setItem("lectures",JSON.stringify(lectures));
       showLectures();
     }


}



let showLectures2=()=>{
    let showLectures=document.getElementById("showLectures");
    showLectures.innerHTML=null;
    lectures.forEach((ele)=>{
        let tr=document.createElement("tr");
        let name=document.createElement("td");
        name.innerText=ele.name;
        let date=document.createElement("td");
        date.innerText=ele.date;
        let subject=document.createElement("td");
        subject.innerText=ele.subject;

        tr.append(name,date,subject);
        showLectures.append(tr);
    });
}

let showAssignments=()=>{
    let showAssignments=document.getElementById("showAssignments");
    showAssignments.innerHTML=null;
    console.log(assignments);
    assignments.forEach((ele)=>{
        let tr=document.createElement("tr");
        let name=document.createElement("td");
        name.innerText=ele.name;
        let date=document.createElement("td");
        date.innerText=ele.date;
        let subject=document.createElement("td");
        subject.innerText=ele.subject;

        let remove=document.createElement("p");
        remove.innerText="REMOVE";
        remove.style.color="red";
        remove.onclick=()=>{
            removeAssignment(ele);
        }

        tr.append(name,date,subject,remove);
        showAssignments.append(tr);


    
    });




    let removeAssignment=(element)=>{
        console.log("removing assignment");
        console.log(element);
           let x= assignments.filter((ele)=>{
                return element.name!==ele.name;
            })
           assignments=x;
           localStorage.setItem("assignments",JSON.stringify(assignments));
           showAssignments();
         }
}





let showAssignments2=()=>{
    let showAssignments=document.getElementById("showAssignments");
    showAssignments.innerHTML=null;
    console.log(assignments);
    assignments.forEach((ele)=>{
        let tr=document.createElement("tr");
        let name=document.createElement("td");
        name.innerText=ele.name;
        let date=document.createElement("td");
        date.innerText=ele.date;
        let subject=document.createElement("td");
        subject.innerText=ele.subject;

        tr.append(name,date,subject);
        showAssignments.append(tr);
    });
}



let addLecture=(e)=>{
e.preventDefault();
let name=document.getElementById("lectureName").value;
let date=document.getElementById("lectureDate").value;
let subject=document.getElementById("lectureSubject").value;
let obj={};
obj.name=name;
obj.date=date;
obj.subject=subject;

lectures.push(obj);
localStorage.setItem("lectures",JSON.stringify(lectures));
showLectures();

}

let addAssignment=(e)=>{
    e.preventDefault();
    let name=document.getElementById("assignmentName").value;
    let date=document.getElementById("assignmentDate").value;
    let subject=document.getElementById("assignmentSubject").value;
    let obj={};
    obj.name=name;
    obj.date=date;
    obj.subject=subject;
    
    assignments.push(obj);
    localStorage.setItem("assignments",JSON.stringify(assignments));
    showAssignments();
    }



